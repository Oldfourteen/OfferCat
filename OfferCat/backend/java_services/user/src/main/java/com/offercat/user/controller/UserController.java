package com.offercat.user.controller;

import com.offercat.user.dao.StudentMapper;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.dto.request.UserProfileRequest;
import com.offercat.user.entity.Student;
import com.offercat.user.entity.User;
import com.offercat.user.infrastructure.common.ResponseResult;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户控制器
 * 提供用户相关接口
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class UserController {
    /** 用户映射器 */
    @Autowired
    private UserMapper userMapper;
    /** 学生映射器 */
    @Autowired
    private StudentMapper studentMapper;
    /** 保存用户个人信息 */
    @PostMapping("/profile")
    @Transactional
    public ResponseResult<Map<String, Object>> saveProfile(@RequestBody @Valid UserProfileRequest request) {
        /** 打印接收到的请求体，用于调试 */
        System.out.println("Received profile request: " + request);
        User user = userMapper.selectById(request.getUserId());
        if (user == null) {
            return ResponseResult.error("用户不存在");
        }
        /** 更新用户个人信息 */
        User userToUpdate = new User();
        userToUpdate.setUserId(request.getUserId());
        userToUpdate.setNickname(request.getNickname());
        userToUpdate.setGender(request.getGender());
        userToUpdate.setAvatar(request.getAvatar());
        userToUpdate.setRealName(request.getRealName());
        userToUpdate.setPhone(request.getPhone());
        userToUpdate.setEmail(request.getEmail());
        userMapper.updateProfileInfo(userToUpdate);
        /** 更新学生个人信息 */
        Long studentId;
        Student existing = studentMapper.selectByUserId(request.getUserId());
        if (existing == null) {
            Student student = new Student();
            student.setUserId(request.getUserId());
            student.setGrade(request.getGrade());
            student.setMajor(request.getMajor());
            student.setAge(request.getAge() != null ? request.getAge() : 20);
            student.setClassName("");
            student.setEducation("本科");
            student.setJobStatus(request.getJobStatus());
            student.setBio(request.getBio());
            student.setJobDirection(request.getDesiredPosition());
            student.setIntentCity(request.getDesiredCity());
            student.setExpectedSalary(request.getExpectedSalary());
            student.setCreateTime(LocalDateTime.now());
            studentMapper.insert(student);
            studentId = student.getStudentId();
        } else {
            existing.setGrade(request.getGrade());
            existing.setMajor(request.getMajor());
            if (request.getAge() != null) {
                existing.setAge(request.getAge());
            }
            existing.setJobStatus(request.getJobStatus());
            existing.setBio(request.getBio());
            existing.setJobDirection(request.getDesiredPosition());
            existing.setIntentCity(request.getDesiredCity());
            existing.setExpectedSalary(request.getExpectedSalary());
            studentMapper.update(existing);
            studentId = existing.getStudentId();
        }
        /** 返回更新后的学生ID */
               Map<String, Object> result = new HashMap<>();
        result.put("studentId", studentId);
        return ResponseResult.success(result);
    }
}
