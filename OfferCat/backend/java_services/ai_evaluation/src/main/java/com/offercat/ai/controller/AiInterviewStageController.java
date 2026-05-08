package com.offercat.ai.controller;

import com.offercat.ai._service.AiInterviewService;
import com.offercat.ai.dto.request.InterviewStageAnswerRequest;
import com.offercat.ai.dto.request.InterviewStageRequest;
import com.offercat.ai.dto.response.InterviewStageResponse;
import com.offercat.ai.entity.InterviewSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * 面试阶段控制器
 * 功能：处理模拟面试流程的相关请求
 * 实现：提供面试阶段的管理和操作接口
 */
@Slf4j
@RestController
@RequestMapping("/api/ai/interview/stage")
@RequiredArgsConstructor
public class AiInterviewStageController {

    /**
     * 面试服务
     */
    private final AiInterviewService interviewService;

    /**
     * 获取当前面试阶段
     * 输入：会话ID
     * 输出：当前面试阶段
     */
    @GetMapping("/current/{sessionId}")
    public InterviewStageResponse getCurrentStage(@PathVariable Long sessionId) {
        String currentStage = interviewService.getCurrentStage(sessionId);
        InterviewSession session = interviewService.getSession(sessionId);
        return InterviewStageResponse.builder()
                .session(session)
                .currentStage(currentStage)
                .message("获取当前面试阶段成功")
                .build();
    }

    /**
     * 更新面试阶段
     * 输入：会话ID，面试阶段
     * 输出：更新后的面试会话对象
     */
    @PutMapping("/update")
    public InterviewStageResponse updateStage(@RequestBody InterviewStageRequest request) {
        InterviewSession session = interviewService.updateStage(request.getSessionId(), request.getStage());
        return InterviewStageResponse.builder()
                .session(session)
                .currentStage(session.getCurrentStage())
                .message("更新面试阶段成功")
                .build();
    }

    /**
     * 进入下一面试阶段
     * 输入：会话ID
     * 输出：更新后的面试会话对象
     */
    @PostMapping("/next/{sessionId}")
    public InterviewStageResponse nextStage(@PathVariable Long sessionId) {
        InterviewSession session = interviewService.nextStage(sessionId);
        return InterviewStageResponse.builder()
                .session(session)
                .currentStage(session.getCurrentStage())
                .message("进入下一面试阶段成功")
                .build();
    }

    /**
     * 生成阶段面试问题
     * 输入：会话ID，面试阶段
     * 输出：问题内容
     */
    @GetMapping("/question")
    public InterviewStageResponse generateStageQuestion(@RequestParam Long sessionId, @RequestParam String stage) {
        String question = interviewService.generateStageQuestion(sessionId, stage);
        return InterviewStageResponse.builder()
                .stageQuestion(question)
                .message("生成阶段面试问题成功")
                .build();
    }

    /**
     * 评估阶段面试答案
     * 输入：会话ID，面试阶段，用户答案
     * 输出：评估结果
     */
    @PostMapping("/evaluate")
    public InterviewStageResponse evaluateStageAnswer(@RequestBody InterviewStageAnswerRequest request) {
        String evaluation = interviewService.evaluateStageAnswer(
                request.getSessionId(), 
                request.getStage(), 
                request.getUserAnswer()
        );
        return InterviewStageResponse.builder()
                .evaluationResult(evaluation)
                .message("评估阶段面试答案成功")
                .build();
    }
}
