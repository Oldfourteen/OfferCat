package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dao.ForumPostMapper;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.service.ForumPostService;
import com.offercat.student.vo.ForumPostVO;
import com.offercat.user.dao.UserMapper;
import com.offercat.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 管理员论坛管理控制器
 */
@RestController
@RequestMapping("/api/admin/forum")
@CrossOrigin(origins = "*")
public class AdminForumController {

    @Autowired
    private ForumPostService forumPostService;
    
    @Autowired
    private ForumPostMapper forumPostMapper;
    
    @Autowired
    private UserMapper userMapper;

    /**
     * 搜索所有帖子（管理员权限）
     */
    @PostMapping("/search-all")
    public ResponseResult<List<ForumPostVO>> searchAllPosts(@RequestBody(required = false) ForumPostSearchDTO searchDTO) {
        if (searchDTO == null) {
            searchDTO = new ForumPostSearchDTO();
        }
        searchDTO.setPageNum(1);
        searchDTO.setPageSize(1000);
        
        var result = forumPostService.searchPosts(searchDTO);
        return ResponseResult.success(result.getRecords());
    }

    /**
     * 管理员删除帖子（无需验证用户权限）
     */
    @DeleteMapping("/delete/{postId}")
    public ResponseResult<Void> adminDeletePost(@PathVariable Long postId) {
        // 直接删除，管理员权限
        forumPostMapper.deletePost(postId, null);
        return ResponseResult.success();
    }

    /**
     * 根据手机号搜索用户
     */
    @GetMapping("/search-user")
    public ResponseResult<User> searchUserByPhone(@RequestParam String phone) {
        User user = userMapper.selectByPhone(phone);
        if (user == null) {
            return ResponseResult.error(404, "用户不存在");
        }
        return ResponseResult.success(user);
    }

    /**
     * 获取所有管理员列表
     */
    @GetMapping("/admins")
    public ResponseResult<List<User>> getAllAdmins() {
        List<User> admins = userMapper.selectAllAdmins();
        return ResponseResult.success(admins);
    }

    /**
     * 获取所有普通用户列表
     */
    @GetMapping("/students")
    public ResponseResult<List<User>> getAllStudents() {
        List<User> students = userMapper.selectAllStudents();
        return ResponseResult.success(students);
    }

    /**
     * 将指定用户设为管理员
     */
    @PostMapping("/promote/{userId}")
    public ResponseResult<Void> promoteToAdmin(@PathVariable Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return ResponseResult.error(404, "用户不存在");
        }
        user.setUserRole(4);
        userMapper.updateProfileInfo(user);
        return ResponseResult.success();
    }

    /**
     * 将指定用户降级为普通用户
     */
    @PostMapping("/demote/{userId}")
    public ResponseResult<Void> demoteToStudent(@PathVariable Long userId) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return ResponseResult.error(404, "用户不存在");
        }
        user.setUserRole(1);
        userMapper.updateProfileInfo(user);
        return ResponseResult.success();
    }
}
