package com.offercat.student.dto;

import lombok.Data;
import java.util.List;
/**
 * 论坛帖子创建DTO
 * 功能：提供论坛帖子创建相关的数据传输对象
 */
@Data
public class ForumPostCreateDTO {
    // 创建用户ID
    private Long userId; 
    // 帖子标题
    private String title;
    // 帖子内容
    private String content;
    // 帖子图片列表
    private List<String> images;
}
