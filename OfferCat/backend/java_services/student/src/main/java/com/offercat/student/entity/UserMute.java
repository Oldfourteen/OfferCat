package com.offercat.student.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserMute {
    private Long id;
    private Long userId;
    private Long duration;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String reason;
    private Long operatorId;
    private Integer status;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
