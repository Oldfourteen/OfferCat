package com.offercat.student.dto;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class ForumPostCreateDTO {
    /** insert 回填 */
    private Long postId;

    private Long userId;
    private String title;
    private String content;
    private List<String> images;
    /** 入库用 JSON（由服务端组装） */
    private String imagesJson;
    /** 被 @ 提醒的用户列表 */
    private List<Long> mentionUserIds = new ArrayList<>();
}
