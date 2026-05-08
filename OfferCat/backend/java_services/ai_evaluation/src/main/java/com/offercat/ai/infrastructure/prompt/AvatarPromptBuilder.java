package com.offercat.ai.infrastructure.prompt;

import com.offercat.ai.dto.request.ImageGenerationRequest;

/**
 * 头像提示词构建器
 * 用来构建头像生成的提示词
 */

/**
 * @author: Ofteen
 * @data: 2026/4/21 - 21:25
 * @mail: oldfourteen41@gmail.com
 * @info: 构建生成的Prompt
 */

public class AvatarPromptBuilder {
    /**
     * 构建头像生成的提示词
     * @param basePrompt 基础提示词
     * @param request 生成请求
     * @return 完整的提示词
     */
    public static String buildPrompt(String basePrompt, ImageGenerationRequest request) {
        StringBuilder prompt = new StringBuilder(basePrompt == null ? "" : basePrompt);
        
        String style = request.getStyle();
        if (style != null && !style.isBlank()) {
            switch (style.toLowerCase()) {
                case "professional":
                    prompt.append(", wearing professional business attire, formal suit, elegant and clean background");
                    break;
                case "casual":
                    prompt.append(", wearing smart casual workplace outfit, relaxed but professional, bright and warm office background");
                    break;
                case "tech":
                    prompt.append(", wearing minimalist tech-style clothing, hoodie or plain t-shirt, modern tech company background, geek vibe");
                    break;
                case "art":
                    prompt.append(", wearing creative and stylish outfit, artistic vibe, colorful and abstract design studio background");
                    break;
                case "custom":
                    // 自定义风格时不附加固定风格提示词
                    break;
                default:
                    break;
            }
        }
        /**
         * 自定义提示词
         * 用来添加自定义的提示词
         */
        String customPrompt = request.getCustomPrompt();
        if (customPrompt != null && !customPrompt.isBlank()) {
            prompt.append(", ").append(customPrompt);
        }
        
        return prompt.toString();
    }
}
