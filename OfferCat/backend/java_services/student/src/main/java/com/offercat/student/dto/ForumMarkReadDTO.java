package com.offercat.student.dto;

import lombok.Data;

@Data
public class ForumMarkReadDTO {
    private Long userId;
    /** replies：评论/回复/@/赞评论 likes：点赞帖子与收藏帖子 all：站内互动消息全开 */
    private String scope;
}
