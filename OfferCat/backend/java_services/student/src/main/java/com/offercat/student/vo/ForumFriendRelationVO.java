package com.offercat.student.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.Data;

@Data
public class ForumFriendRelationVO {
    @JsonSerialize(using = ToStringSerializer.class)
    private Long requestId;

    private String relationStatus;
}
