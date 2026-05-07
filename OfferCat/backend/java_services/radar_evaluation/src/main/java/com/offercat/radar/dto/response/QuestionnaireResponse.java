package com.offercat.radar.dto.response;

import lombok.Data;
import java.util.List;

@Data
public class QuestionnaireResponse {
    private Integer id;
    private String title;
    private List<Option> options;

    @Data
    public static class Option {
        private String label;
        private String text;

        public Option(String label, String text) {
            this.label = label;
            this.text = text;
        }
    }
}
