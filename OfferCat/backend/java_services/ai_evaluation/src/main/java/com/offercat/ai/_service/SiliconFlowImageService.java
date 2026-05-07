package com.offercat.ai._service;

import com.offercat.ai.dto.request.ImageGenerationRequest;
import com.offercat.ai.dto.response.ImageGenerationResponse;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author: Ofteen
 * @data: 2026/4/21 - 20:12
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

public interface SiliconFlowImageService {
    ImageGenerationResponse generateJobAvatar(MultipartFile image, ImageGenerationRequest request);
}
