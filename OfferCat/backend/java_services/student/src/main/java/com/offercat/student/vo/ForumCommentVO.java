package com.offercat.student.vo;

import lombok.Data;
import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Data
public class ForumCommentVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long commentId;
    
    @JsonSerialize(using = ToStringSerializer.class)
    private Long postId;
    
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;
    private String authorName;
    private String authorAvatar;
    private String content;
    
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;
}
