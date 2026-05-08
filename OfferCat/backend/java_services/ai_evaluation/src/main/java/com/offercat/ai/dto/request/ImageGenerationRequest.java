package com.offercat.ai.dto.request;

import lombok.Data;

/**
 * @author: Ofteen
 * @data: 2026/4/21 - 20:03
 * @mail: oldfourteen41@gmail.com
 * @info: 模型和数据的相关传参内容 （请求） 这些跟JSON挂钩 举例：
 * {
 *   "prompt": "把图片里的文字改成：你好世界",
 *   "image": "data:image/png;base64,xxxx",
 *   "numInferenceSteps": 50,
 *   "cfg": 4.0
 * }
 *
 * {
 *   "prompt": "把图1的人物融合到图2场景里，保持脸一致",
 *   "image": "data:image/png;base64,xxx",
 *   "image2": "data:image/png;base64,yyy"
 * }
 */

@Data
public class ImageGenerationRequest {
    //用户只能上传一张图片（URL或Base64）
    private String image;
    
    // 前端传来的风格
    private String style;
    
    // 用户自定义的提示词（可选）
    private String customPrompt;
}