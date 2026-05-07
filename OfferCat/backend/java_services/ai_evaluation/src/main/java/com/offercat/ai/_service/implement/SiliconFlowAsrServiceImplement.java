package com.offercat.ai._service.implement;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.offercat.ai.dto.response.AsrTranscribeResponse;
import lombok.RequiredArgsConstructor;
import okhttp3.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;
import java.util.concurrent.TimeUnit;

/**
 * @author: Ofteen
 * @data: 2026/4/23 - 08:48
 * @mail: oldfourteen41@gmail.com
 * @info:
 */

@Service
@RequiredArgsConstructor
public class SiliconFlowAsrServiceImplement {
    //硅基流动里的ASR语音转文字技术 服务实现
    private final ObjectMapper objectMapper;

    //需要调用的API密钥
    @Value("${siliconFlow.api-key}")
    private String apiKey;

    @Value("${siliconFlow.base-url:https://api.siliconflow.cn}")
    private String baseUrl;

    @Value("${siliconFlow.asr.transcriptions-path:/v1/audio/transcriptions}")
    private String transcriptionsPath;

    @Value("${siliconFlow.asr.model:FunAudioLLM/SenseVoiceSmall}")
    private String model;

    private final OkHttpClient okHttpClient = new OkHttpClient.Builder()
            .connectTimeout(30, TimeUnit.SECONDS)
            .writeTimeout(30, TimeUnit.SECONDS)
            .readTimeout(60, TimeUnit.SECONDS)
            .build();

    public AsrTranscribeResponse transcribe(MultipartFile file){
        if (file == null || file.isEmpty()){
            throw new IllegalArgumentException("语音输入不能为空！");
        }
        //文档限制小于50MB
        if(file.getSize() > 50L * 1024 * 1024){
            throw new IllegalArgumentException("音频文件过大，超出最大支持的50MB");
        }

        String url = baseUrl + transcriptionsPath;

        try {
            String originalFilename = file.getOriginalFilename();
            String filename = (originalFilename != null && !originalFilename.isEmpty() && originalFilename.contains("."))
                    ? originalFilename : "audio.mp3";
            
            String contentTypeStr = file.getContentType();
            if (contentTypeStr == null || contentTypeStr.isEmpty()) {
                contentTypeStr = "audio/mpeg";
            }
            MediaType mediaType = MediaType.parse(contentTypeStr);

            RequestBody fileBody = RequestBody.create(file.getBytes(), mediaType);

            MultipartBody requestBody = new MultipartBody.Builder()
                    .setType(MultipartBody.FORM)
                    .addFormDataPart("file", filename, fileBody)
                    .addFormDataPart("model", model)
                    .addFormDataPart("response_format", "json")
                    .build();

            Request request = new Request.Builder()
                    .url(url)
                    .post(requestBody)
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .build();

            try (Response response = okHttpClient.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    String errorBody = response.body() != null ? response.body().string() : "";
                    throw new RuntimeException("语音识别API调用失败: HTTP " + response.code() + " - " + errorBody);
                }

                String responseBodyStr = response.body() != null ? response.body().string() : "{}";
                Map body = objectMapper.readValue(responseBodyStr, Map.class);
                String text = body == null ? null : (String) body.get("text");
                String traceId = response.header("x-siliconcloud-trace-id");

                return AsrTranscribeResponse.builder()
                        .text(text == null ? "" : text)
                        .traceId(traceId)
                        .build();
            }
        } catch (Exception e) {
            throw new RuntimeException("语音识别请求异常: " + e.getMessage(), e);
        }
    }
}