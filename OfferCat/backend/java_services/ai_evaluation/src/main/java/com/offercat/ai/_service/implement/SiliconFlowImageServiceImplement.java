package com.offercat.ai._service.implement;

import com.offercat.ai._service.SiliconFlowImageService;
import com.offercat.ai.dto.request.ImageGenerationRequest;
import com.offercat.ai.dto.response.ImageGenerationResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.*;

@Slf4j
@Service
public class SiliconFlowImageServiceImplement implements SiliconFlowImageService {

    @Value("${siliconFlow.api-key}")
    private String apiKey;

    @Value("${siliconFlow.base-url}")
    private String baseUrl;

    @Value("${siliconFlow.model:Qwen/Qwen-Image-Edit-2509}")
    private String model;

    // 业务固定提示词（用户不可控）
    @Value("${avatar.prompt.base}")
    private String avatarBasePrompt;

    @Value("${avatar.prompt.negative}")
    private String avatarNegativePrompt;

    @Value("${avatar.generation.num-inference-steps:50}")
    private Integer numInferenceSteps;

    @Value("${avatar.generation.cfg:4.0}")
    private Double cfg;

    private final RestTemplate restTemplate;

    public SiliconFlowImageServiceImplement(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public ImageGenerationResponse generateJobAvatar(MultipartFile image, ImageGenerationRequest request) {
        ImageGenerationResponse out = new ImageGenerationResponse();

        // 入口防御：只允许 1 张图
        if (image == null || image.isEmpty()) {
            out.setError("必须上传 1 张正面照（image）");
            return out;
        }

        // 本地保存路径
        String uploadDir = "D:/offercat/userface";
        File dir = new File(uploadDir);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        try {
            // 保存原图
            String origFilename = image.getOriginalFilename();
            String extension = origFilename != null && origFilename.contains(".") 
                    ? origFilename.substring(origFilename.lastIndexOf(".")) 
                    : ".jpg";
            String uuid = UUID.randomUUID().toString().replace("-", "");
            String localOrigFilename = "orig_" + uuid + extension;
            File localOrigFile = new File(dir, localOrigFilename);
            image.transferTo(localOrigFile);

            // 将 MultipartFile 转换为 base64 给大模型
            String base64Image = Base64.getEncoder().encodeToString(java.nio.file.Files.readAllBytes(localOrigFile.toPath()));
            String mimeType = image.getContentType() != null ? image.getContentType() : "image/jpeg";
            String imageUrl = "data:" + mimeType + ";base64," + base64Image;

            Map<String, Object> body = new HashMap<>();
            body.put("model", model);

            // 构建带有风格和自定义要求的 Prompt
            String finalPrompt = com.offercat.ai.infrastructure.prompt.AvatarPromptBuilder.buildPrompt(avatarBasePrompt, request);
            
            // SiliconFlow 文档字段：prompt + negative_prompt
            body.put("prompt", finalPrompt);
            body.put("negative_prompt", avatarNegativePrompt);

            // 单图输入
            body.put("image", imageUrl);

            // Qwen/Qwen-Image 系列常用参数（文档允许）
            body.put("num_inference_steps", numInferenceSteps);
            body.put("cfg", cfg);

            // 注意：文档明确 Qwen/Qwen-Image-Edit-2509 不支持 image_size，这里不要传 image_size
            // 注意：这里也绝对不要传 image2/image3（你已经从 DTO 里移除了）

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiKey);

            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

            String url = baseUrl + "/v1/images/generations";
            ResponseEntity<Map> resp = restTemplate.postForEntity(url, entity, Map.class);

            // trace id（排障用）
            out.setTraceId(resp.getHeaders().getFirst("x-siliconcloud-trace-id"));

            Map respBody = resp.getBody();
            if (respBody == null) {
                out.setError("SiliconFlow API 响应为空");
                return out;
            }

            Object seed = respBody.get("seed");
            if (seed instanceof Number) out.setSeed(((Number) seed).longValue());

            Object timings = respBody.get("timings");
            if (timings instanceof Map) {
                Object inference = ((Map) timings).get("inference");
                if (inference instanceof Number) out.setInferenceMs(((Number) inference).longValue());
            }

            List<String> urls = new ArrayList<>();
            Object images = respBody.get("images");
            if (images instanceof List) {
                for (Object img : (List) images) {
                    if (img instanceof Map) {
                        Object u = ((Map) img).get("url");
                        if (u != null) {
                            String remoteUrl = String.valueOf(u);
                            try {
                                // 下载生成的图片到本地 D:/offercat/userface
                                URL netUrl = new URL(remoteUrl);
                                java.net.URLConnection conn = netUrl.openConnection();
                                conn.setConnectTimeout(10000);
                                conn.setReadTimeout(30000);
                                InputStream is = conn.getInputStream();
                                String genFilename = "gen_" + uuid + ".png";
                                File genFile = new File(dir, genFilename);
                                try (FileOutputStream fos = new FileOutputStream(genFile)) {
                                    byte[] buffer = new byte[4096];
                                    int len;
                                    while ((len = is.read(buffer)) != -1) {
                                        fos.write(buffer, 0, len);
                                    }
                                }
                                is.close();
                                // 返回映射后的本地 URL
                                urls.add("/api/ai/userface/" + genFilename);
                            } catch (Exception e) {
                                log.error("下载生成的图片失败: {}", remoteUrl, e);
                                // 下载失败则降级使用远程 URL
                                urls.add(remoteUrl);
                            }
                        }
                    }
                }
            }
            out.setUrls(urls);

            if (urls.isEmpty()) {
                out.setError("SiliconFlow 返回 images 为空或未解析到 url");
            }

            return out;

        } catch (Exception e) {
            log.error("调用 SiliconFlow images/generations 失败", e);
            out.setError("调用 SiliconFlow 失败：" + e.getMessage());
            return out;
        }
    }
}