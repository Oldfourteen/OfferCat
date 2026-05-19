package com.offercat.student.dto;

import lombok.Data;

@Data
public class ForumFriendRespondDTO {
    private Long requestId;
    /** 通常为被申请人(to_user)，用于鉴权 */
    private Long userId;
    private Boolean accept;
}
