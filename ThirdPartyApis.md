# OfferCat 项目第三方 API 接口汇总文档

本文档总结了 OfferCat 项目中所使用的所有第三方 API 接口，包括接口的作用、配置位置以及在代码中的具体调用位置。

## 1. DeepSeek API
用于 AI 聊天和文本生成（支持同步对话与流式对话）。

- **配置位置**: 
  - `application.yml`: `OfferCat/backend/java_services/ai_evaluation/src/main/resources/application.yml` (配置项包含 `base-url: https://api.deepseek.com`, `model`, `api-key`)
- **调用位置**:
  - **接口类**: `DeepSeekChatServices.java` (`OfferCat/backend/java_services/ai_evaluation/src/main/java/com/offercat/ai/_service/deepseek/DeepSeekChatServices.java`)
  - **同步调用**: 使用 `RestTemplate` 发送 POST 请求到 `{base}/v1/chat/completions`。
  - **流式调用**: 使用 `OkHttp` + `SSE` 发送 POST 请求到 `{base}/v1/chat/completions` (Accept: text/event-stream)。

## 2. 百度智能云 AppBuilder Cloud Search
用于提供联网搜索功能，为 AI 对话注入实时上下文。

- **配置位置**:
  - `application.yml`: `OfferCat/backend/java_services/ai_evaluation/src/main/resources/application.yml` (配置项包含 `base-url: https://gw.baidubce.com/rpc/2.0/cloud_search/v1/search`, `api-key`)
- **调用位置**:
  - **接口类**: `BaiduSearchService.java` (`OfferCat/backend/java_services/ai_evaluation/src/main/java/com/offercat/ai/_service/baidu/BaiduSearchService.java`)
  - **直接调用**: 使用 `RestTemplate` 发送 POST 请求。
  - **间接引用**: 在 `DeepSeekChatServices.java` 的同步和流式对话流程中被调用，用于在发送给大模型前获取补充知识。

## 3. 硅基流动 SiliconFlow - 视觉 OCR (Chat Completions)
通过多模态聊天接口用于图文识别和 OCR 场景。

- **配置位置**:
  - `application.yml`: `OfferCat/backend/java_services/ai_evaluation/src/main/resources/application.yml` (配置项包含 `base-url: https://api.siliconflow.cn`, `api-key` 以及 OCR 模型名称)
- **调用位置**:
  - **接口类**: `OcrSpaceServiceImplement.java` (`OfferCat/backend/java_services/ai_evaluation/src/main/java/com/offercat/ai/_service/implement/OcrSpaceServiceImplement.java`)
  - **调用细节**: 使用 `RestTemplate` 发送 POST 请求到 `{base}/v1/chat/completions`，并在多模态消息中携带图片的 Base64 编码数据。

## 4. 硅基流动 SiliconFlow - 语音识别 ASR (Audio Transcriptions)
用于将语音转换为文字（ASR）。

- **配置位置**:
  - `application.yml`: `OfferCat/backend/java_services/ai_evaluation/src/main/resources/application.yml` (ASR 相关的模型和参数)
- **调用位置**:
  - **接口类**: `SiliconFlowAsrServiceImplement.java` (`OfferCat/backend/java_services/ai_evaluation/src/main/java/com/offercat/ai/_service/implement/SiliconFlowAsrServiceImplement.java`)
  - **调用细节**: 组装目标 URL 为 `{base}/v1/audio/transcriptions`，通过 `OkHttp` 发送 `multipart/form-data` 的 POST 请求。

## 5. 阿里云短信服务 (Dypnsapi)
用于发送和校验短信验证码。

- **依赖与配置位置**:
  - **Maven依赖**: `OfferCat/backend/java_services/user/pom.xml` (引入 `aliyun-java-sdk-core`, `aliyun-java-sdk-dypnsapi`)
  - **属性配置**: `OfferCat/backend/java_services/deploy/config/application-prod.yml` (`aliyun.dypns.*`)
  - **配置类**: `AliyunDypnsProperties.java` 和 `AliyunDypnsClientConfig.java` (位于 `OfferCat/backend/java_services/user/src/main/java/com/offercat/user/infrastructure/config/`)
- **调用位置**:
  - **接口类**: `AliyunDypnsSmsVerificationService.java` (`OfferCat/backend/java_services/user/src/main/java/com/offercat/user/infrastructure/service/impl/AliyunDypnsSmsVerificationService.java`)
  - **发送验证码**: 构造 `SendSmsVerifyCode` 请求并调用阿里云 OpenAPI 处理结果。
  - **校验验证码**: 构造 `CheckSmsVerifyCode` 请求并调用阿里云 OpenAPI 进行判定。

---
*注：本地服务（如 Eureka 注册中心、本地 Python 部署的 PDF 服务等）属于内部调用，不计入外部第三方接口。*