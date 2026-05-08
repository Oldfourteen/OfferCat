package com.offercat.student.controller;

import com.offercat.student.common.PageResult;
import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.service.ForumPostService;
import com.offercat.student.vo.ForumPostVO;
import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.vo.ForumCommentVO;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.offercat.student.dto.LikeRequestDTO;
import com.offercat.student.dto.ForumPostCreateDTO;
    /**
     * 论坛帖子控制器
     * 功能：处理论坛帖子相关的请求
     */
@RestController
@RequestMapping("/forum/post")
@CrossOrigin(origins = "*")
public class ForumPostController {
    /**
     * 论坛帖子服务
     */
    @Autowired
    private ForumPostService forumPostService;
    /**
     * 论坛图片目录
     */
    @Value("${file.forum-images-dir}")
    private String forumImagesDir;

    /**
     * 搜索论坛帖子
     * 支持标题和内容的模糊搜索，以及分页和排序
     * @param searchDTO 搜索参数对象
     * @return 分页的帖子列表
     */
    @PostMapping("/search")
    public ResponseResult<PageResult<ForumPostVO>> searchPosts(@RequestBody ForumPostSearchDTO searchDTO) {
        PageResult<ForumPostVO> result = forumPostService.searchPosts(searchDTO);
        return ResponseResult.success(result);
    }

    /**
     * 上传帖子图片
     */
    @PostMapping("/uploadImage")
    public ResponseResult<String> uploadImage(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseResult.error("文件不能为空");
        }
        try {
            File dir = new File(forumImagesDir);
            if (!dir.exists()) {
                dir.mkdirs();
            }
            String originalFilename = file.getOriginalFilename();
            String suffix = originalFilename != null && originalFilename.contains(".")
                    ? originalFilename.substring(originalFilename.lastIndexOf("."))
                    : ".png";
            String newFilename = UUID.randomUUID().toString() + suffix;
            File dest = new File(dir, newFilename);
            file.transferTo(dest);
            /**
             * 这里返回可以直接访问的相对路径，
             * 因为前端ai配文等逻辑可能强依赖于/api/ai/photo/**的网关路由，为了统一存放在photo下，此处将返回路径调整为该路由格式
             */
            return ResponseResult.success("/api/ai/photo/" + newFilename);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseResult.error("图片上传失败: " + e.getMessage());
        }
    }

    /**
     * 获取帖子详情
     */
    @GetMapping("/detail/{postId}")
    public ResponseResult<ForumPostVO> getPostDetail(@PathVariable("postId") Long postId) {
        ForumPostVO result = forumPostService.getPostDetail(postId);
        return ResponseResult.success(result);
    }

    /**
     * 点赞帖子
     */
    @PostMapping("/like/{postId}")
    public ResponseResult<Void> likePost(@PathVariable("postId") Long postId, @RequestBody LikeRequestDTO dto) {
        forumPostService.likePost(postId, dto.getUserId().intValue());
        return ResponseResult.success();
    }

    /**
     * 取消点赞帖子
     */
    @PostMapping("/unlike/{postId}")
    public ResponseResult<Void> unlikePost(@PathVariable("postId") Long postId, @RequestBody LikeRequestDTO dto) {
        forumPostService.unlikePost(postId, dto.getUserId().intValue());
        return ResponseResult.success();
    }

    /**
     * 获取帖子评论
     */
    @GetMapping("/{postId}/comments")
    public ResponseResult<List<ForumCommentVO>> getComments(@PathVariable("postId") Long postId) {
        List<ForumCommentVO> result = forumPostService.getComments(postId);
        return ResponseResult.success(result);
    }

    /**
     * 添加评论
     */
    @PostMapping("/comment")
    public ResponseResult<Void> addComment(@RequestBody ForumCommentDTO dto) {
        forumPostService.addComment(dto);
        return ResponseResult.success();
    }

    /**
     * 发布帖子
     */
    @PostMapping("/create")
    public ResponseResult<Void> createPost(@RequestBody ForumPostCreateDTO dto) {
        if (dto.getContent() == null || dto.getContent().trim().length() < 5) {
            return ResponseResult.error(400, "帖子内容最少需要5个字");
        }
        if (dto.getContent().trim().length() > 200) {
            return ResponseResult.error(400, "帖子内容最多不能超过200字");
        }
        try {
            forumPostService.createPost(dto);
            return ResponseResult.success();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseResult.error(500, "发布失败: " + e.getMessage());
        }
    }

    /**
     * 删除帖子
     */
    @DeleteMapping("/delete/{postId}")
    public ResponseResult<Void> deletePost(@PathVariable("postId") Long postId, @RequestParam("userId") Long userId) {
        try {
            forumPostService.deletePost(postId, userId);
            return ResponseResult.success();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseResult.error(500, e.getMessage());
        }
    }
}
