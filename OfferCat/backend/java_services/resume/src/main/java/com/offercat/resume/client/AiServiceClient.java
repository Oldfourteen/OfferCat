package com.offercat.resume.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

/*
 * AI服务客户端接口
 * 功能：定义与AI服务交互的方法
 * 实现：通过Feign调用AI服务
 */
@FeignClient(name = "ai-evaluation-service")
public interface AiServiceClient {

    /*
     * 生成简历
     * 输入：目标岗位、学生信息
     * 输出：生成的简历内容
     */
    @PostMapping("/api/ai/resume/generate")
    String generateResume(@RequestParam("targetPosition") String targetPosition, @RequestParam("studentInfo") String studentInfo);

    /*
     * 诊断简历
     * 输入：简历内容、目标岗位
     * 输出：诊断结果
     */
    @PostMapping("/api/ai/resume/diagnose")
    String diagnoseResume(@RequestParam("resumeContent") String resumeContent, @RequestParam("targetPosition") String targetPosition);
}
