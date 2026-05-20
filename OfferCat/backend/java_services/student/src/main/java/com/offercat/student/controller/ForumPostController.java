package com.offercat.student.controller;

import com.offercat.student.common.PageResult;
import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.ForumCommentDTO;
import com.offercat.student.dto.ForumPostCreateDTO;
import com.offercat.student.dto.ForumPostSearchDTO;
import com.offercat.student.dto.LikeRequestDTO;
import com.offercat.student.service.ForumPostService;
import com.offercat.student.vo.ForumCommentVO;
import com.offercat.student.vo.ForumPostVO;
import com.offercat.shared.sensitive.SensitiveWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/forum/post")
@CrossOrigin(origins = "*")
public class ForumPostController {

    @Autowired
    private ForumPostService forumPostService;

    @Autowired
    private SensitiveWordService sensitiveWordService;

    @Value("${file.forum-images-dir}")
    private String forumImagesDir;

    @PostMapping("/search")
    public ResponseResult<PageResult<ForumPostVO>> searchPosts(@RequestBody ForumPostSearchDTO searchDTO) {
        PageResult<ForumPostVO> result = forumPostService.searchPosts(searchDTO);
        return ResponseResult.success(result);
    }

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
            return ResponseResult.success("/api/forum/images/" + newFilename);
        } catch (IOException e) {
            return ResponseResult.error("图片上传失败: " + e.getMessage());
        }
    }

    @GetMapping("/detail/{postId}")
    public ResponseResult<ForumPostVO> getPostDetail(
            @PathVariable("postId") Long postId,
            @RequestParam(value = "viewerUserId", required = false) Long viewerUserId) {
        ForumPostVO result = forumPostService.getPostDetail(postId, viewerUserId);
        if (result == null) {
            return ResponseResult.error(404, "帖子不存在或已被删除");
        }
        return ResponseResult.success(result);
    }

    @PostMapping("/view/{postId}")
    public ResponseResult<Void> recordView(@PathVariable("postId") Long postId) {
        forumPostService.recordView(postId);
        return ResponseResult.success();
    }

    @PostMapping("/like/{postId}")
    public ResponseResult<Void> likePost(@PathVariable("postId") Long postId, @RequestBody LikeRequestDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        forumPostService.likePost(postId, dto.getUserId());
        return ResponseResult.success();
    }

    @PostMapping("/unlike/{postId}")
    public ResponseResult<Void> unlikePost(@PathVariable("postId") Long postId, @RequestBody LikeRequestDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        forumPostService.unlikePost(postId, dto.getUserId());
        return ResponseResult.success();
    }

    @PostMapping("/collect/{postId}")
    public ResponseResult<Void> collect(@PathVariable("postId") Long postId, @RequestBody LikeRequestDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        forumPostService.collectPost(postId, dto.getUserId());
        return ResponseResult.success();
    }

    @PostMapping("/uncollect/{postId}")
    public ResponseResult<Void> uncollect(@PathVariable("postId") Long postId, @RequestBody LikeRequestDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        forumPostService.uncollectPost(postId, dto.getUserId());
        return ResponseResult.success();
    }

    @GetMapping("/{postId}/comments")
    public ResponseResult<List<ForumCommentVO>> getComments(
            @PathVariable("postId") Long postId,
            @RequestParam(value = "viewerUserId", required = false) Long viewerUserId) {
        List<ForumCommentVO> result = forumPostService.getComments(postId, viewerUserId);
        return ResponseResult.success(result);
    }

    @PostMapping("/comment")
    public ResponseResult<Void> addComment(@RequestBody ForumCommentDTO dto) {
        if (dto == null || dto.getContent() == null || dto.getContent().isBlank()) {
            return ResponseResult.error("评论内容不能为空");
        }
        if (sensitiveWordService.containsSensitiveWord(dto.getContent())) {
            dto.setContent(sensitiveWordService.getReplacementText());
        }
        forumPostService.addComment(dto);
        return ResponseResult.success();
    }

    @DeleteMapping("/comment/{commentId}")
    public ResponseResult<Void> deleteComment(
            @PathVariable("commentId") Long commentId,
            @RequestParam("userId") Long userId) {
        try {
            forumPostService.deleteComment(commentId, userId);
            return ResponseResult.success();
        } catch (Exception e) {
            return ResponseResult.error(e.getMessage());
        }
    }

    @PostMapping("/comment/like/{commentId}")
    public ResponseResult<Void> likeComment(@PathVariable("commentId") Long commentId,
                                            @RequestBody LikeRequestDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        forumPostService.likeComment(commentId, dto.getUserId());
        return ResponseResult.success();
    }

    @PostMapping("/comment/unlike/{commentId}")
    public ResponseResult<Void> unlikeComment(@PathVariable("commentId") Long commentId,
                                              @RequestBody LikeRequestDTO dto) {
        if (dto == null || dto.getUserId() == null) {
            return ResponseResult.error("用户ID不能为空");
        }
        forumPostService.unlikeComment(commentId, dto.getUserId());
        return ResponseResult.success();
    }

    @PostMapping("/create")
    public ResponseResult<Void> createPost(@RequestBody ForumPostCreateDTO dto) {
        if (dto.getContent() == null || dto.getContent().trim().length() < 5) {
            return ResponseResult.error(400, "帖子内容最少需要5个字");
        }
        if (dto.getContent().trim().length() > 200) {
            return ResponseResult.error(400, "帖子内容最多不能超过200字");
        }
        if (sensitiveWordService.containsSensitiveWord(dto.getContent())) {
            dto.setContent(sensitiveWordService.getReplacementText());
        }
        try {
            forumPostService.createPost(dto);
            return ResponseResult.success();
        } catch (Exception e) {
            return ResponseResult.error(500, "发布失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/delete/{postId}")
    public ResponseResult<Void> deletePost(@PathVariable("postId") Long postId, @RequestParam("userId") Long userId) {
        try {
            forumPostService.deletePost(postId, userId);
            return ResponseResult.success();
        } catch (Exception e) {
            return ResponseResult.error(500, e.getMessage());
        }
    }
}
