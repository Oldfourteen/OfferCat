package com.offercat.galaxy.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StarlitLeaderboardResponse {
    private List<Row> rows;
    private long selfTotalStars;
    private Long selfRank;
    private long canvasTotalStars;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Row {
        private int rank;
        private long userId;
        private String displayName;
        private long totalStars;
        private boolean self;
    }
}
