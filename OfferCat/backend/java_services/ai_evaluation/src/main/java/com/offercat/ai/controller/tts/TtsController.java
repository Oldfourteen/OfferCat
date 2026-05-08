package com.offercat.ai.controller.tts;

import com.offercat.ai._service.implement.SiliconFlowTtsServiceImplement;
import com.offercat.ai.dto.request.TtsSpeakRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 15:33
 * @mail: oldfourteen41@gmail.com
 * @info: TTS对外接口，给DeepSeekChat页面朗读按钮用
 */

@RestController
@RequestMapping("/api/ai/tts")
@RequiredArgsConstructor
public class TtsController {
    /**
     * TTS服务
     */
    private final SiliconFlowTtsServiceImplement ttsService;
    /**
     * 朗读文本
     */
    @PostMapping("/speak")
    public ResponseEntity<?> speak(@Valid @RequestBody TtsSpeakRequest req){
        try{
            ResponseEntity<byte[]> resp = ttsService.speak(req);
            /**
             * 检查响应是否为空
             */
            if (resp.getBody() == null || resp.getBody().length == 0) {
                throw new RuntimeException("TTS 服务返回了空的音频数据");
            }
            byte[] bytes = resp.getBody();

            /**
             * 从请求里判断返回格式 默认MP3
             */

            String fmt = (req.getResponseFormat() == null || req.getResponseFormat().isBlank())
            ? "mp3" : req.getResponseFormat().toLowerCase();
            /**
             * 根据返回格式设置MIME类型
             */
            MediaType mediaType = switch (fmt) {
                case "wav" -> MediaType.parseMediaType("audio/wav");
                case "opus" -> MediaType.parseMediaType("audio/opus");
                case "pcm" -> MediaType.parseMediaType("audio/pcm");
                default -> MediaType.parseMediaType("audio/mpeg");
            };
            /**
             * 设置响应头
             */
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(mediaType);
            /**
             * 把追踪ID传给前端，方便查看硅基流动请求
             */
            String traceId = resp.getHeaders().getFirst("x-siliconcloud-trace-id");
            if(traceId != null) headers.add("x-siliconcloud-trace-id",traceId);

            /**
             * 让前端更容易下载播放
             */
            headers.setContentDisposition(ContentDisposition.inline().filename("tts" + fmt).build());
            /**
             * 返回音频数据
             */
            return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
        }catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }catch (Exception e){
            return ResponseEntity.internalServerError().body(Map.of("error","TTS失败" + e.getMessage()));
        }
    }
}
