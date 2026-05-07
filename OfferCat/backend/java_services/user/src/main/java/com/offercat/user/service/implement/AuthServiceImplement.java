package com.offercat.user.service.implement;

import com.offercat.user.dao.*;
import com.offercat.user.dto.request.*;
import com.offercat.user.dto.response.AuthResponse;
import com.offercat.user.entity.*;
import com.offercat.user.infrastructure.common.ResponseResult;
import com.offercat.user.infrastructure.service.EmailService;
import com.offercat.user.infrastructure.service.SmsService;
import com.offercat.user.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

/**
 * 认证服务实现类
 * 处理用户注册、登录、验证码发送及身份信息完善逻辑
 */
@Service
@Slf4j
public class AuthServiceImplement implements AuthService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private StringRedisTemplate redisTemplate;

    @Autowired
    private SmsService smsService;

    @Autowired
    private EmailService emailService;

    // Redis 中验证码的前缀和过期时间
    private static final String CODE_PREFIX = "auth:code:";
    private static final long CODE_EXPIRE = 5; // 5分钟过期

    /**
     * 发送验证码逻辑
     * 1. 生成6位随机数
     * 2. 以目标(手机号/邮箱)为键存入 Redis，设置5分钟有效期
     * 3. 控制台打印日志模拟发送（实际需对接第三方SDK）
     */
    @Override
    public ResponseResult<Void> sendVerificationCode(SendCodeRequest request) {
        // 1. 生成6位随机验证码
        String code = String.format("%06d", new Random().nextInt(1000000));
        
        // 2. 存入 Redis
        String key = CODE_PREFIX + request.getPhone();
        redisTemplate.opsForValue().set(key, code, CODE_EXPIRE, TimeUnit.MINUTES);
        
        // 3. 调用基础设施层发送验证码 (仅支持手机号)
        boolean sent = smsService.sendSms(request.getPhone(), code);
        
        if (!sent) {
            return ResponseResult.error("验证码发送失败，请稍后再试");
        }
        
        log.info("已成功向 {} 发送验证码", request.getPhone());
        return ResponseResult.success();
    }

    /**
     * 用户注册逻辑
     * 1. 从 Redis 校验验证码是否匹配
     * 2. 校验两次密码输入
     * 3. 检查手机号/邮箱是否已被占用
     * 4. 插入 user 表，初始化基础数据
     * 5. 注册成功后清理验证码并执行自动登录
     */
    @Override
    @Transactional
    public ResponseResult<AuthResponse> register(RegisterRequest request) {
        // 1. 校验验证码
        String key = CODE_PREFIX + request.getPhone();
        String cachedCode = redisTemplate.opsForValue().get(key);
        if (cachedCode == null || !cachedCode.equals(request.getCode())) {
            return ResponseResult.error("验证码错误或已过期");
        }
        
        // 2. 校验两次密码是否一致
        if (request.getConfirmPassword() != null && !request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseResult.error("两次输入的密码不一致");
        }

        // 如果邮箱为空字符串，则设置为 null，以满足数据库约束
        if (request.getEmail() != null && request.getEmail().trim().isEmpty()) {
            request.setEmail(null);
        }

        // 3. 检查是否已注册 (手机号和邮箱都必须唯一)
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

        // 4. 创建新用户
        user = new User();
        user.setPassword(getMD5(request.getPassword())); // 使用 MD5 加密存储
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        user.setUserRole(1); // 默认角色设为1(学生)
        user.setUserStatus(1);
        user.setCreateTime(LocalDateTime.now());
        userMapper.insert(user);

        // 5. 注册成功后清理验证码
        redisTemplate.delete(key);

        // 6. 注册完自动执行登录逻辑并返回 Token
        return loginAfterAuth(user);
    }

    /**
     * 用户登录逻辑 (双模式)
     * 1. 根据手机/邮箱/用户名查找用户
     * 2. 模式A-密码登录：对比数据库密码
     * 3. 模式B-验证码登录：校验 Redis 验证码
     * 4. 登录成功后清理验证码
     */
    @Override
    public ResponseResult<AuthResponse> login(LoginRequest request) {
        // 多维度查找用户
        User user = userMapper.selectByPhone(request.getTarget());
        if (user == null) {
            user = userMapper.selectByEmail(request.getTarget());
        }

        if (user == null) {
            return ResponseResult.error("用户不存在，请先注册");
        }

        // 手机号必须绑定
        if (user.getPhone() == null || user.getPhone().trim().isEmpty()) {
            return ResponseResult.error("当前账号未绑定手机号，禁止登录");
        }

        // 登录的角色也除去企业和教师，仅允许学生和管理员登录
        if (user.getUserRole() == null || (user.getUserRole() != 1 && user.getUserRole() != 4)) {
            return ResponseResult.error("当前角色禁止登录系统");
        }

        // 根据登录类型执行不同的校验逻辑
        if ("password".equals(request.getLoginType())) {
            // 模式1：密码登录
            if (!getMD5(request.getPassword()).equals(user.getPassword())) {
                return ResponseResult.error("密码错误");
            }
        } else if ("code".equals(request.getLoginType())) {
            // 模式2：验证码登录 (仅支持手机号)
            if (user.getPhone() == null || !user.getPhone().equals(request.getTarget())) {
                return ResponseResult.error("验证码登录仅支持使用手机号");
            }
            String key = CODE_PREFIX + request.getTarget();
            String cachedCode = redisTemplate.opsForValue().get(key);
            if (cachedCode == null || !cachedCode.equals(request.getCode())) {
                return ResponseResult.error("验证码错误或已过期");
            }
            // 登录成功清理验证码
            redisTemplate.delete(key);
        } else {
            return ResponseResult.error("不支持的登录类型");
        }

        // 执行统一的后续登录处理
        return loginAfterAuth(user);
    }

    /**
     * 统一处理登录/注册成功后的业务
     * 1. 检查用户的身份信息(学生/教师/企业)是否已完善
     * 2. 生成模拟 Token (UUID)
     */
    private ResponseResult<AuthResponse> loginAfterAuth(User user) {
        boolean isComplete = checkInfoComplete(user);
        
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

    /**
     * MD5 加密方法
     * @param password 原始密码
     * @return 加密后的密码
     */
    private String getMD5(String password) {
        try {
            java.security.MessageDigest md = java.security.MessageDigest.getInstance("MD5");
            byte[] array = md.digest(password.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : array) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (Exception e) {
            log.error("MD5 加密失败", e);
            return password; // 加密失败时返回原始密码
        }
    }

    // 教师与企业完善接口已移除
}