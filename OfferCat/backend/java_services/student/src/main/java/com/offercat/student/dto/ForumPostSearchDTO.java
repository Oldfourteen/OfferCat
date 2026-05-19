package com.offercat.student.dto;

import lombok.Data;

@Data
public class ForumPostSearchDTO {
    private String keyword;

    /** create_time（默认）、like_count、comment_count */
    private String sortBy = "create_time";

    private String sortDirection = "desc";

    private Integer pageNum = 1;

    private Integer pageSize = 10;

    /** 当前登录用户，用于回填点赞与收藏状态 */
    private Long viewerUserId;

    /** all：全部帖子；friends：仅好友帖子（需先有互相「同意」的申请记录） */
    private String feedTab = "all";

    /** 用于指定查询某些用户的帖子（例如个人主页查询自己的帖子） */
    private java.util.List<Long> friendIds;
}
