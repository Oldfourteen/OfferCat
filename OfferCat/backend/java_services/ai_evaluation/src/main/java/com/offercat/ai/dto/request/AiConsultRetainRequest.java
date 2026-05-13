package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 设置单条 AI 咨询记录是否保留（不参与每月清理）
 */
@Data
public class AiConsultRetainRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long consultId;

    @NotNull
    private Boolean retained;
}
