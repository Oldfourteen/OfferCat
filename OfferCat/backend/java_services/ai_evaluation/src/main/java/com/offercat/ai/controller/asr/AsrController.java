package com.offercat.ai.controller.asr;

import com.offercat.ai._service.implement.SiliconFlowAsrServiceImplement;
import com.offercat.ai.dto.response.AsrTranscribeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 09:10
 * @mail: oldfourteen41@gmail.com
 * @info:
 */
@RestController
@RequestMapping("/api/ai/asr")
@RequiredArgsConstructor
public class AsrController {
    private final SiliconFlowAsrServiceImplement asrService;

    //上传音频 -> ASR -> 返回文本

    @PostMapping(value="/transcribe", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<AsrTranscribeResponse> transcribe(@RequestPart("file")MultipartFile file){
        return ResponseEntity.ok(asrService.transcribe((file)));
    }
}
