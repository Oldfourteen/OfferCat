package com.offercat.user.controller;

import com.offercat.user.infrastructure.common.ResponseResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.UUID;

/**
 * 头像上传控制器
 * 提供头像上传接口
 */
@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class AvatarController {
    /** 头像上传目录 */
    
    @Value("${file.avatar-dir}")
    private String avatarDir;
    /** 头像上传接口 */
    @PostMapping("/uploadAvatar")
    public ResponseResult<String> uploadAvatar(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseResult.error("文件不能为空");
        }
        try {
            /** 确保服务器上的目录存在 */
            File dir = new File(avatarDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }

            /** 生成一个随机的唯一文件名 */
            String originalFilename = file.getOriginalFilename();
            String suffix = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".png";
            String newFilename = UUID.randomUUID().toString() + suffix;

            /** 将文件写入到服务器物理目录 */
            File dest = new File(dir, newFilename);
            file.transferTo(dest);

            /** 返回相对路径给前端 */
            return ResponseResult.success("/user/avatars/" + newFilename);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseResult.error("头像上传失败: " + e.getMessage());
        }
    }
}
