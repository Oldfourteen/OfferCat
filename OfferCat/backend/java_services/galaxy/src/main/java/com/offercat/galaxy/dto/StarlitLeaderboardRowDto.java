package com.offercat.galaxy.dto;

import lombok.Data;

@Data
public class StarlitLeaderboardRowDto {
    private Long userId;
    private String displayName;
    private Long totalStars;
}
