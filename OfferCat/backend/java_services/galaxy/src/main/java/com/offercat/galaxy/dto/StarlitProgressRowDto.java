package com.offercat.galaxy.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StarlitProgressRowDto {
    private String packKey;
    private int starsLit;
    private Integer lastQuestionNo;
}
