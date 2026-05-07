package com.offercat.student.dto;

import lombok.Data;

@Data
public class ForumCommentDTO {
    private Long postId;
    private Long userId; // 如果可以从token获取则不需要，但为了方便这里保留
    private String content;
}
