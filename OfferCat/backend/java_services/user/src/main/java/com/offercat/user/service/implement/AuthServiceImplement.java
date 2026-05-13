package com.offercat.user.service.implement;

import com.offercat.user.dao.*;
import com.offercat.user.dto.request.*;
import com.offercat.user.dto.response.AuthResponse;
import com.offercat.user.entity.*;
import com.offercat.user.infrastructure.common.ResponseResult;
import com.offercat.user.infrastructure.service.EmailService;
import com.offercat.user.infrastructure.service.SmsVerificationService;
import com.offercat.user.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;
import java.util.regex.Pattern;

/**
 * 认证服务实现类
 * 处理用户注册、登录、验证码发送及身份信息完善逻辑
 */
@Service
@Slf4j
public class AuthServiceImplement implements AuthService {
    /** 用户数据访问层 */
       @Autowired
    private UserMapper userMapper;
    /** 学生数据访问层 */
    @Autowired
    private StudentMapper studentMapper;
    /** 短信验证码（阿里云号码认证下发与核验） */
    @Autowired
    private SmsVerificationService smsVerificationService;
    /** 邮箱服务 */
    @Autowired
    private EmailService emailService;

    /** BCrypt 密码加密器 */
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    /** 32 位十六进制 MD5，用于兼容历史库中的 MD5 密码 */
    private static final Pattern MD5_HEX = Pattern.compile("^[a-fA-F0-9]{32}$");
    /** 64 位十六进制 SHA-256，用于兼容部分历史/第三方存储 */
    private static final Pattern SHA256_HEX = Pattern.compile("^[a-fA-F0-9]{64}$");

    /**
     * 发送验证码：由阿里云号码认证生成验证码并下发短信，本地不落库、不写 Redis。
     */
    @Override
    public ResponseResult<Void> sendVerificationCode(SendCodeRequest request) {
        boolean sent = smsVerificationService.sendVerificationCode(request.getPhone());

        if (!sent) {
            return ResponseResult.error("验证码发送失败，请稍后再试");
        }

        log.info("已向 {} 发起短信验证码（阿里云号码认证）", request.getPhone());
        return ResponseResult.success();
    }

    /**
     * 用户注册逻辑
     * 1. 调用阿里云 CheckSmsVerifyCode 校验验证码
     * 2. 校验两次密码输入
     * 3. 检查手机号/邮箱是否已被占用
     * 4. 插入 user 表，初始化基础数据
     * 5. 注册成功后执行自动登录
     */
    @Override
    @Transactional
    public ResponseResult<AuthResponse> register(RegisterRequest request) {
        if (!smsVerificationService.verifyCode(request.getPhone(), request.getCode())) {
            return ResponseResult.error("验证码错误或已过期");
        }
        
        /**  校验两次密码是否一致 */
        if (request.getConfirmPassword() != null && !request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseResult.error("两次输入的密码不一致");
        }

        /**  处理邮箱为空字符串的情况 */
        if (request.getEmail() != null && request.getEmail().trim().isEmpty()) {
            request.setEmail(null);
        }

        /**  检查是否已注册 (手机号和邮箱都必须唯一) */
        User user = userMapper.selectByPhone(request.getPhone());
        if (user != null) {
            return ResponseResult.error("该手机号已注册，请直接登录");
        }

        if (request.getEmail() != null && !request.getEmail().trim().isEmpty()) {
            User emailUser = userMapper.selectByEmail(request.getEmail());
            if (emailUser != null) {
                return ResponseResult.error("该邮箱已被注册，请直接登录");
            }
        }

        /** 创建新用户 */
        user = new User();
        user.setPassword(passwordEncoder.encode(request.getPassword())); // 【安全规范】使用 BCrypt 哈希存储密码
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setUserRole(1); // 默认角色设为1(学生)
        user.setUserStatus(1);
        user.setCreateTime(LocalDateTime.now());
        userMapper.insert(user);

        /**  注册完自动执行登录逻辑并返回 Token */
        return loginAfterAuth(user);
    }

    /**
     * 用户登录逻辑 (双模式)
     * 1. 根据手机/邮箱/用户名查找用户
     * 2. 模式A-密码登录：对比数据库密码
     * 3. 模式B-验证码登录：阿里云 CheckSmsVerifyCode
     * 4. 登录成功后返回 Token（验证码消耗由阿里云侧处理）
     */
    @Override
    public ResponseResult<AuthResponse> login(LoginRequest request) {
        String target = request.getTarget() != null ? request.getTarget().trim() : "";
        // 多维度查找用户
        User user = userMapper.selectByPhone(target);
        if (user == null) {
            user = userMapper.selectByEmail(target);
        }

        if (user == null) {
            return ResponseResult.error("用户不存在，请先注册");
        }

        /**  手机号必须绑定 */
        if (user.getPhone() == null || user.getPhone().trim().isEmpty()) {
            return ResponseResult.error("当前账号未绑定手机号，禁止登录");
        }

        /**  登录的角色也除去企业和教师，仅允许学生和管理员登录 */
        if (user.getUserRole() == null || (user.getUserRole() != 1 && user.getUserRole() != 4)) {
            return ResponseResult.error("当前角色禁止登录系统");
        }

        // 根据登录类型执行不同的校验逻辑
        /**  模式1：密码登录 */
        if ("password".equals(request.getLoginType())) {
            if (!verifyPassword(user, request.getPassword())) {
                return ResponseResult.error("密码错误");
            }
        } else if ("code".equals(request.getLoginType())) {
            /**  模式2：验证码登录 (仅支持手机号) */
            if (user.getPhone() == null || !user.getPhone().equals(target)) {
                return ResponseResult.error("验证码登录仅支持使用手机号");
            }
            if (!smsVerificationService.verifyCode(target, request.getCode())) {
                return ResponseResult.error("验证码错误或已过期");
            }
        } else {
            return ResponseResult.error("不支持的登录类型");
        }

        // 执行统一的后续登录处理
        return loginAfterAuth(user);
    }

    /**
     * 校验密码（BCrypt 为单向哈希，没有「解密」步骤，只能用 matches 验证明文与哈希是否匹配）。
     * 兼容：Spring 委派前缀、首尾空白、旧版 $2$ 前缀、Base64/Hex 包装的 bcrypt 串、MD5/SHA-256 十六进制、明文。
     */
    private boolean verifyPassword(User user, String rawPassword) {
        String raw = rawPassword == null ? "" : rawPassword.strip();
        String stored = user.getPassword();
        if (raw.isEmpty() || stored == null || stored.isEmpty()) {
            return false;
        }
        stored = stripDelegatingPasswordPrefix(stored.strip());
        if (stored.isEmpty()) {
            return false;
        }
        stored = normalizeLegacyBcryptPrefix(stored);
        stored = tryDecodeHexWrappedBcrypt(stored);
        stored = tryDecodeBase64WrappedBcrypt(stored);

        if (isBcryptHash(stored)) {
            try {
                boolean ok = passwordEncoder.matches(raw, stored);
                if (!ok && stored.length() < 59) {
                    log.warn("userId={} bcrypt 哈希长度过短(len={})，请检查库表 password 字段长度是否截断(建议≥60)",
                            user.getUserId(), stored.length());
                }
                return ok;
            } catch (IllegalArgumentException ex) {
                log.warn("userId={} bcrypt 校验异常: {}", user.getUserId(), ex.getMessage());
                return false;
            }
        }
        if (MD5_HEX.matcher(stored).matches()) {
            if (md5Hex(raw).equalsIgnoreCase(stored)) {
                return persistBcryptPassword(user, raw);
            }
            return false;
        }
        if (SHA256_HEX.matcher(stored).matches()) {
            if (sha256Hex(raw).equalsIgnoreCase(stored)) {
                return persistBcryptPassword(user, raw);
            }
            return false;
        }
        if (raw.equals(stored)) {
            return persistBcryptPassword(user, raw);
        }
        return false;
    }

    private boolean persistBcryptPassword(User user, String rawPlain) {
        String encoded = passwordEncoder.encode(rawPlain);
        userMapper.updatePassword(user.getUserId(), encoded);
        user.setPassword(encoded);
        return true;
    }

    private static String stripDelegatingPasswordPrefix(String stored) {
        if (stored == null || !stored.startsWith("{")) {
            return stored;
        }
        int end = stored.indexOf('}');
        if (end > 0 && end < stored.length() - 1) {
            return stored.substring(end + 1);
        }
        return stored;
    }

    private static boolean isBcryptHash(String stored) {
        return stored.startsWith("$2a$")
                || stored.startsWith("$2b$")
                || stored.startsWith("$2y$");
    }

    /** 极旧 bcrypt 使用 $2$，Spring 的 BCrypt 实现按 $2a$ 处理 */
    private static String normalizeLegacyBcryptPrefix(String stored) {
        if (stored != null && stored.startsWith("$2$") && stored.length() > 3) {
            return "$2a$" + stored.substring(3);
        }
        return stored;
    }

    /** 部分系统将 bcrypt 原文再做十六进制存储（长度通常≥120） */
    private static String tryDecodeHexWrappedBcrypt(String stored) {
        if (stored == null || isBcryptHash(stored) || (stored.length() % 2) != 0) {
            return stored;
        }
        if (stored.length() < 100 || !stored.matches("^[0-9a-fA-F]+$")) {
            return stored;
        }
        try {
            int n = stored.length() / 2;
            byte[] out = new byte[n];
            for (int i = 0; i < n; i++) {
                int hi = Character.digit(stored.charAt(i * 2), 16);
                int lo = Character.digit(stored.charAt(i * 2 + 1), 16);
                if (hi < 0 || lo < 0) {
                    return stored;
                }
                out[i] = (byte) ((hi << 4) | lo);
            }
            String decoded = new String(out, StandardCharsets.UTF_8).strip();
            return isBcryptHash(decoded) ? decoded : stored;
        } catch (Exception ex) {
            return stored;
        }
    }

    /** 部分系统将 bcrypt 原文再做 Base64 存储 */
    private static String tryDecodeBase64WrappedBcrypt(String stored) {
        if (stored == null || isBcryptHash(stored) || stored.length() < 50) {
            return stored;
        }
        String compact = stored.replaceAll("\\s+", "");
        try {
            byte[] bin = tryBase64Decode(compact);
            if (bin == null || bin.length < 20) {
                return stored;
            }
            String decoded = new String(bin, StandardCharsets.UTF_8).strip();
            return isBcryptHash(decoded) ? decoded : stored;
        } catch (Exception ex) {
            return stored;
        }
    }

    private static byte[] tryBase64Decode(String compact) {
        try {
            return Base64.getDecoder().decode(compact);
        } catch (IllegalArgumentException ignored) {
            // ignore
        }
        try {
            return Base64.getMimeDecoder().decode(compact);
        } catch (IllegalArgumentException ignored) {
            // ignore
        }
        return null;
    }

    private static String md5Hex(String plain) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            byte[] dig = md.digest(plain.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(32);
            for (byte b : dig) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("MD5 not available", e);
        }
    }

    private static String sha256Hex(String plain) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] dig = md.digest(plain.getBytes(StandardCharsets.UTF_8));
            StringBuilder sb = new StringBuilder(64);
            for (byte b : dig) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException("SHA-256 not available", e);
        }
    }

    /**
     * 统一处理登录/注册成功后的业务
     * 1. 检查用户的身份信息(学生/教师/企业)是否已完善
     * 2. 生成模拟 Token (UUID)
     */
    private ResponseResult<AuthResponse> loginAfterAuth(User user) {
        boolean isComplete = checkInfoComplete(user);

        // 不在接口响应中返回密码哈希（BCrypt 也绝不应「解密」回传）
        user.setPassword(null);

        // 查询并附带完整的学生档案信息给前端
        if (user.getUserRole() != null && user.getUserRole() == 1) {
            Student student = studentMapper.selectByUserId(user.getUserId());
            user.setProfile(student);
        }

        String token = UUID.randomUUID().toString(); // 演示用 UUID，生产环境建议用 JWT

        AuthResponse authResponse = AuthResponse.builder()
                .token(token)
                .user(user)
                .isComplete(isComplete)
                .build();

        return ResponseResult.success(authResponse);
    }

    /**
     * 检查用户身份信息是否完整
     * 根据 user_role 字段去对应的明细表(student/teacher/company_account)中查询
     */
    private boolean checkInfoComplete(User user) {
        if (user.getUserRole() == null) {
            return false;
        }
        
        switch (user.getUserRole()) {
            case 1: // 学生模式：查询 student 表
                return studentMapper.selectByUserId(user.getUserId()) != null;
            case 4: // 管理员模式：无需完善额外信息
                return true;
            default:
                return false;
        }
    }

    /**
     * 完善学生信息
     * 1. 更新 user 表中的角色和基础信息(姓名、身份证、学校)
     * 2. 在 student 表中插入详细档案
     */
    @Override
    @Transactional
    public ResponseResult<Void> completeStudentInfo(StudentInfoRequest request) {
        User user = userMapper.selectById(request.getUserId());
        if (user == null) return ResponseResult.error("用户不存在");

        user.setUserRole(1); // 设为学生角色
        user.setRealName(request.getRealName());
        user.setIdCard(request.getIdCard());
        user.setSchool(request.getSchool());
        userMapper.updateRoleAndInfo(user);

        Student student = new Student();
        student.setUserId(request.getUserId());
        student.setGrade(request.getGrade());
        student.setClassName(request.getClassName());
        student.setMajor(request.getMajor());
        student.setAge(request.getAge());
        student.setEducation(request.getEducation());
        student.setCreateTime(LocalDateTime.now());
        studentMapper.insert(student);

        return ResponseResult.success();
    }

    // 教师与企业完善接口已移除
}