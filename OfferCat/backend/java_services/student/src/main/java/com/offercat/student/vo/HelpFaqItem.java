package com.offercat.student.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 帮助中心常见问题项
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class HelpFaqItem {
    private String question;
    private String answer;
}
