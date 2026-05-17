package com.offercat.galaxy.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendResponse {
    private List<Suggestion> suggestions;
    private String note;
    private String algorithm;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Suggestion {
        private String nodeId;
        private String reason;
    }
}
