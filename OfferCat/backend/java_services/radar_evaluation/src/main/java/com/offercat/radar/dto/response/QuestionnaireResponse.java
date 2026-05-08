package com.offercat.radar.dto.response;

import lombok.Data;
import java.util.List;
/**
 *  雷达评估问卷响应参数
 */

@Data
public class QuestionnaireResponse {
    // 问卷ID
    private Integer id;
    // 问卷标题
    private String title;
    // 选项选项列表
    private List<Option> options;

    @Data
    public static class Option {
        // 选项标签
        private String label;
        // 选项文本 
        private String text;
        public Option(String label, String text) {
            this.label = label;
            this.text = text;
        }
    }
}
