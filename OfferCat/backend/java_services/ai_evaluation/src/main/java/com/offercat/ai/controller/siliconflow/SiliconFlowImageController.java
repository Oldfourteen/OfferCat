package com.offercat.ai.controller.siliconflow;

import com.offercat.ai._service.SiliconFlowImageService;
import com.offercat.ai.dto.request.ImageGenerationRequest;
import com.offercat.ai.dto.response.ImageGenerationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author: Ofteen
 * @data: 2026/4/21 - 21:07
 * @mail: oldfourteen41@gmail.com
 * @info: 硅基流动生图的控制层，负责和前端直接反馈
 */

@RestController
@RequestMapping("api/ai/images")
@RequiredArgsConstructor
public class SiliconFlowImageController {
    /**
     * 硅基流动生图服务
     */
    private final SiliconFlowImageService siliconFlowImageService;
    /**
     * 生成岗位头像
     */
    @PostMapping("/job-avatar")
    public ImageGenerationResponse generations(
            @RequestParam("image") MultipartFile image,
            @RequestParam(value = "style", required = false) String style,
            @RequestParam(value = "customPrompt", required = false) String customPrompt
    ) {
        /**
         * 生成岗位头像
         */
        ImageGenerationRequest request = new ImageGenerationRequest();
        request.setStyle(style);
        request.setCustomPrompt(customPrompt);
        return siliconFlowImageService.generateJobAvatar(image, request);
    }
}
