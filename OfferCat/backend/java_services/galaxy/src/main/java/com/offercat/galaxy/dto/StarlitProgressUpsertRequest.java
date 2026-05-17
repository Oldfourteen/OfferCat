package com.offercat.galaxy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class StarlitProgressUpsertRequest {
    @NotNull
    private Long userId;

    /** 稳定键，如 major_electrical__major_law:0 */
    @NotBlank
    private String packKey;

    @Min(0)
    private int starsLit;

    private Integer lastQuestionNo;
}
