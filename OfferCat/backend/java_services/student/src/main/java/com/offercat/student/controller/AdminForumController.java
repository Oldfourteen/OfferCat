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

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

/**
 * 管理员论坛管理控制器
 */
@RestController
@RequestMapping("/admin/forum")
@CrossOrigin(origins = "*")
public class AdminForumController {

    @Autowired
    private ForumPostService forumPostService;
    
    @Autowired
    private ForumPostMapper forumPostMapper;
    
    @Autowired
    private UserMapper userMapper;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private void assertAdmin(Long operatorUserId) {
        if (operatorUserId == null) {
            throw new IllegalArgumentException("缺少operatorUserId");
        }
        User op = userMapper.selectById(operatorUserId);
        if (op == null) {
            throw new IllegalArgumentException("操作者不存在");
        }
        if (op.getUserStatus() != null && op.getUserStatus() != 1) {
            throw new IllegalStateException("操作者账号不可用");
        }
        if (op.getUserRole() == null || op.getUserRole() != 4) {
            throw new IllegalStateException("无管理员权限");
        }
    }

    @PostMapping("/debug/seed-teddy")
    public ResponseResult<User> seedTeddy(@RequestParam(value = "operatorUserId", required = false) Long operatorUserId) {
        try {
            List<User> admins = userMapper.selectAllAdmins();
            boolean hasAdmin = admins != null && !admins.isEmpty();
            if (hasAdmin) {
                assertAdmin(operatorUserId);
            }

            final String phone = "15092730328";
            final String nickname = "Teddy";
            User existing = userMapper.selectByPhone(phone);
            if (existing != null) {
                return ResponseResult.success(existing);
            }

            User u = new User();
            u.setPassword(passwordEncoder.encode("Teddy123456"));
            u.setNickname(nickname);
            u.setPhone(phone);
            u.setEmail(null);
            u.setUserRole(hasAdmin ? 1 : 4);
            u.setUserStatus(1);
            u.setCreateTime(LocalDateTime.now());
            userMapper.insert(u);
            return ResponseResult.success(u);
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "seed失败: " + e.getMessage());
        }
    }

    /**
     * 搜索所有帖子（管理员权限）
     */
    @PostMapping("/search-all")
    public ResponseResult<List<ForumPostVO>> searchAllPosts(
            @RequestParam("operatorUserId") Long operatorUserId,
            @RequestBody(required = false) ForumPostSearchDTO searchDTO) {
        try {
            assertAdmin(operatorUserId);
            if (searchDTO == null) {
                searchDTO = new ForumPostSearchDTO();
            }
            searchDTO.setPageNum(1);
            searchDTO.setPageSize(1000);
            var result = forumPostService.searchPosts(searchDTO);
            return ResponseResult.success(result.getRecords());
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "查询失败: " + e.getMessage());
        }
    }

    /**
     * 管理员删除帖子（无需验证用户权限）
     */
    @DeleteMapping("/delete/{postId}")
    public ResponseResult<Void> adminDeletePost(
            @RequestParam("operatorUserId") Long operatorUserId,
            @PathVariable("postId") Long postId) {
        try {
            assertAdmin(operatorUserId);
            forumPostMapper.deletePost(postId, null);
            return ResponseResult.success();
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "删除失败: " + e.getMessage());
        }
    }

    @PostMapping("/delete/{postId}")
    public ResponseResult<Void> adminDeletePostCompat(
            @RequestParam("operatorUserId") Long operatorUserId,
            @PathVariable("postId") Long postId) {
        return adminDeletePost(operatorUserId, postId);
    }

    /**
     * 根据手机号搜索用户
     */
    @GetMapping("/search-user")
    public ResponseResult<User> searchUserByPhone(
            @RequestParam("operatorUserId") Long operatorUserId,
            @RequestParam String phone) {
        try {
            assertAdmin(operatorUserId);
            User user = userMapper.selectByPhone(phone);
            if (user == null) {
                return ResponseResult.error(404, "用户不存在");
            }
            return ResponseResult.success(user);
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "查询失败: " + e.getMessage());
        }
    }

    @GetMapping("/user-suggest")
    public ResponseResult<List<User>> userSuggest(
            @RequestParam("operatorUserId") Long operatorUserId,
            @RequestParam(value = "keyword", required = false) String keyword,
            @RequestParam(value = "role", required = false) Integer role,
            @RequestParam(value = "limit", required = false, defaultValue = "10") Integer limit) {
        try {
            assertAdmin(operatorUserId);
            String k = keyword == null ? "" : keyword.trim();
            if (k.isEmpty()) {
                return ResponseResult.success(Collections.emptyList());
            }
            int l = Math.min(Math.max(limit != null ? limit : 10, 1), 20);

            Long numeric = null;
            if (k.length() <= 18 && k.chars().allMatch(Character::isDigit)) {
                try {
                    numeric = Long.parseLong(k);
                } catch (NumberFormatException ignored) {
                    numeric = null;
                }
            }

            String prefix = k + "%";
            String contains = "%" + k + "%";

            List<User> list = userMapper.searchUserSuggestions(k, numeric, prefix, contains, l, role);
            return ResponseResult.success(list);
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "查询失败: " + e.getMessage());
        }
    }

    /**
     * 获取所有管理员列表
     */
    @GetMapping("/admins")
    public ResponseResult<List<User>> getAllAdmins(@RequestParam("operatorUserId") Long operatorUserId) {
        try {
            assertAdmin(operatorUserId);
            List<User> admins = userMapper.selectAllAdmins();
            return ResponseResult.success(admins);
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "查询失败: " + e.getMessage());
        }
    }

    /**
     * 获取所有普通用户列表
     */
    @GetMapping("/students")
    public ResponseResult<List<User>> getAllStudents(@RequestParam("operatorUserId") Long operatorUserId) {
        try {
            assertAdmin(operatorUserId);
            List<User> students = userMapper.selectAllStudents();
            return ResponseResult.success(students);
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "查询失败: " + e.getMessage());
        }
    }

    /**
     * 将指定用户设为管理员
     */
    @PostMapping("/promote/{userId}")
    public ResponseResult<Void> promoteToAdmin(
            @RequestParam("operatorUserId") Long operatorUserId,
            @PathVariable("userId") Long userId) {
        try {
            assertAdmin(operatorUserId);
            User user = userMapper.selectById(userId);
            if (user == null) {
                return ResponseResult.error(404, "用户不存在");
            }
            if (user.getUserStatus() != null && user.getUserStatus() != 1) {
                return ResponseResult.error(400, "目标用户账号不可用");
            }
            userMapper.updateUserRole(userId, 4);
            return ResponseResult.success();
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "操作失败: " + e.getMessage());
        }
    }

    /**
     * 将指定用户降级为普通用户
     */
    @PostMapping("/demote/{userId}")
    public ResponseResult<Void> demoteToStudent(
            @RequestParam("operatorUserId") Long operatorUserId,
            @PathVariable("userId") Long userId) {
        try {
            assertAdmin(operatorUserId);
            User user = userMapper.selectById(userId);
            if (user == null) {
                return ResponseResult.error(404, "用户不存在");
            }
            if (user.getUserRole() != null && user.getUserRole() == 4) {
                List<User> admins = userMapper.selectAllAdmins();
                if (admins != null && admins.size() <= 1) {
                    return ResponseResult.error(400, "至少需要保留1位管理员");
                }
            }
            userMapper.updateUserRole(userId, 1);
            return ResponseResult.success();
        } catch (IllegalArgumentException e) {
            return ResponseResult.error(401, e.getMessage());
        } catch (IllegalStateException e) {
            return ResponseResult.error(403, e.getMessage());
        } catch (Exception e) {
            return ResponseResult.error(500, "操作失败: " + e.getMessage());
        }
    }
}
