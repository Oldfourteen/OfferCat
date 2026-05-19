package com.offercat.student.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ForumInboxMsgVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long msgId;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long senderId;
    private String senderName;
    private String senderAvatar;

    /** 前端展示昵称：与 senderName 相同 */
    public String getUserName() {
        return senderName;
    }

    /** 前端展示头像字段 */
    public String getAvatar() {
        return senderAvatar;
    }

    private Integer msgType;
    private String actionText;
    /** 预览文本（评论内容截取等） */
    private String snippet;
    @JsonSerialize(using = ToStringSerializer.class)
    private Long commentId;

    /** 冗余帖子内容与 ID，便于跳转 */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long postId;
    private String postPreview;

    /** 前端 replyInbox likesInbox badge class */
    private String type;

    /** 前端部分页面使用相对时间，仍返回原始时间 */
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createTime;

    @JsonSerialize(using = ToStringSerializer.class)
    public Long getUserId() {
        return senderId;
    }

    public String getAuthorAvatar() {
        return senderAvatar;
    }

    public String getAuthorName() {
        return senderName;
    }

    public String getContent() {
        return snippet;
    }
}
