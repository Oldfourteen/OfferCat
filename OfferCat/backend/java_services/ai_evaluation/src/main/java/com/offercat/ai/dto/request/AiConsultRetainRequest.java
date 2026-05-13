package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * 设置单条 AI 咨询记录是否保留（不参与每月清理）
 */
@Data
public class AiConsultRetainRequest {
    // 用户ID
    @NotNull
    private Long userId;

    // 咨询记录主键（ai_consult.id）
    @NotNull
    private Long consultId;

    // true 表示保留（不参与每月批量清理）；false 表示可被清理
    @NotNull
    private Boolean retained;
}
