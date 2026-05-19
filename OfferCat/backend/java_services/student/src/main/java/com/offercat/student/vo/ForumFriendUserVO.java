package com.offercat.student.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

@Data
public class ForumFriendUserVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;

    /** 私信页参数 name */
    private String name;

    /** 昵称 */
    private String nickname;
    private String avatar;
    private String tagText;
    private String lastSeen;
    private String bio;
}
