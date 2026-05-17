package com.offercat.galaxy.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StarlitQuestionDto {
    private int questionNo;
    private String stem;
    private List<String> options;
    /** 0~3，对应 options 下标 */
    private int correctIndex;
}
