package com.offercat.ai.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/24 - 01:26
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Data
public class AiChatModeRequest {
    @NotNull
    private Long userId;

    @NotBlank
    private String majorCode;

    /**
     * AIHR / RESUME_POLISH / GROUP_INTERVIEW / JOB_MATCH
     */
    private String mode;

    @NotBlank
    private String question;
    
    private java.util.List<String> userImages;
}
