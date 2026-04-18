package com.offercat.service.implement;

import com.offercat.Dao.*;
import com.offercat.dto.request.*;
import com.offercat.dto.response.AuthResponse;
import com.offercat.entity.*;
import com.offercat.infrastructure.common.ResponseResult;
import com.offercat.infrastructure.service.EmailService;
import com.offercat.infrastructure.service.SmsService;
import com.offercat.service.AuthService;
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
 * 认证服务实现类 (更新)
 * 处理用户注册、登录、验证码发送及身份信息完善逻辑
 */
@Service
@Slf4j
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private CompanyInfoMapper companyInfoMapper;

    @Autowired
    private CompanyAccountMapper companyAccountMapper;

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
        String key = CODE_PREFIX + request.getTarget();
        redisTemplate.opsForValue().set(key, code, CODE_EXPIRE, TimeUnit.MINUTES);
        
        // 3. 调用基础设施层发送验证码
        boolean sent;
        if ("phone".equals(request.getType())) {
            sent = smsService.sendSms(request.getTarget(), code);
        } else {
            sent = emailService.sendEmail(request.getTarget(), code);
        }
        
        if (!sent) {
            return ResponseResult.error("验证码发送失败，请稍后再试");
        }
        
        log.info("已成功向 {} 发送验证码", request.getTarget());
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
        String key = CODE_PREFIX + request.getTarget();
        String cachedCode = redisTemplate.opsForValue().get(key);
        if (cachedCode == null || !cachedCode.equals(request.getCode())) {
            return ResponseResult.error("验证码错误或已过期");
        }
        
        // 2. 校验两次密码是否一致
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            return ResponseResult.error("两次输入的密码不一致");
        }

        // 3. 检查是否已注册 (根据类型查询手机或邮箱)
        User user = "phone".equals(request.getRegisterType()) ? 
                    userMapper.selectByPhone(request.getTarget()) : 
                    userMapper.selectByEmail(request.getTarget());
        
        if (user != null) {
            return ResponseResult.error("该账号已注册，请直接登录");
        }

        // 4. 创建新用户
        user = new User();
        user.setUsername(request.getTarget()); // 默认使用注册目标作为主账号名
        user.setPassword(request.getPassword()); // 注意：此处应使用加密存储，演示暂用明文
        user.setNickname(request.getNickname());
        if ("phone".equals(request.getRegisterType())) {
            user.setPhone(request.getTarget());
        } else {
            user.setEmail(request.getTarget());
        }
        user.setUserRole(0); // 初始角色设为0，表示尚未选择身份
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
            user = userMapper.selectByUsername(request.getTarget());
        }

        if (user == null) {
            return ResponseResult.error("用户不存在，请先注册");
        }

        // 根据登录类型执行不同的校验逻辑
        if ("password".equals(request.getLoginType())) {
            // 模式1：密码登录
            if (!user.getPassword().equals(request.getPassword())) {
                return ResponseResult.error("密码错误");
            }
        } else if ("code".equals(request.getLoginType())) {
            // 模式2：验证码登录
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
        if (user.getUserRole() == null || user.getUserRole() == 0) {
            return false;
        }
        
        switch (user.getUserRole()) {
            case 1: // 学生模式：查询 student 表
                return studentMapper.selectByUserId(user.getUserId()) != null;
            case 2: // 教师模式：查询 teacher 表
                return teacherMapper.selectByUserId(user.getUserId()) != null;
            case 3: // 企业模式：查询企业账号表
                return companyAccountMapper.selectByUserId(user.getUserId()) != null;
            case 4: // 管理员模式：默认完整
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
     * 完善教师信息
     */
    @Override
    @Transactional
    public ResponseResult<Void> completeTeacherInfo(TeacherInfoRequest request) {
        User user = userMapper.selectById(request.getUserId());
        if (user == null) return ResponseResult.error("用户不存在");

        user.setUserRole(2); // 设为教师角色
        user.setRealName(request.getRealName());
        user.setSchool(request.getSchool());
        userMapper.updateRoleAndInfo(user);

        Teacher teacher = new Teacher();
        teacher.setUserId(request.getUserId());
        teacher.setPosition(request.getPosition());
        teacher.setWorkNo(request.getWorkNo());
        teacher.setCreateTime(LocalDateTime.now());
        teacherMapper.insert(teacher);

        return ResponseResult.success();
    }

    /**
     * 完善企业信息
     * 1. 创建企业本体信息 (company_info)
     * 2. 创建用户与企业的关联账号 (company_account)
     */
    @Override
    @Transactional
    public ResponseResult<Void> completeCompanyInfo(CompanyInfoRequest request) {
        User user = userMapper.selectById(request.getUserId());
        if (user == null) return ResponseResult.error("用户不存在");

        user.setUserRole(3); // 设为企业角色
        userMapper.updateRoleAndInfo(user);

        // 创建企业基础信息
        CompanyInfo companyInfo = new CompanyInfo();
        companyInfo.setCompanyName(request.getCompanyName());
        companyInfo.setCreditCode(request.getCreditCode());
        companyInfo.setBusinessScope(request.getBusinessScope());
        companyInfo.setAddress(request.getAddress());
        companyInfo.setContactPhone(request.getContactPhone());
        companyInfo.setCreateTime(LocalDateTime.now());
        companyInfoMapper.insert(companyInfo);

        // 创建企业账号(关联当前用户)
        CompanyAccount companyAccount = new CompanyAccount();
        companyAccount.setUserId(request.getUserId());
        companyAccount.setCompanyId(companyInfo.getCompanyId());
        companyAccount.setPosition(request.getPosition());
        companyAccount.setIsAdmin(request.getIsAdmin());
        companyAccount.setStatus(1);
        companyAccount.setCreateTime(LocalDateTime.now());
        companyAccountMapper.insert(companyAccount);

        return ResponseResult.success();
    }
}
