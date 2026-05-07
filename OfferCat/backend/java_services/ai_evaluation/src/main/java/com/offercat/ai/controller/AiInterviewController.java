package com.offercat.ai.controller;

import com.offercat.ai._service.AiInterviewService;
import com.offercat.ai.entity.InterviewSession;
import com.offercat.ai.entity.StudentAnswerRecord;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * AI面试控制器
 * 功能：处理AI面试相关的HTTP请求
 * 实现：提供面试会话、题目、答案提交等接口
 */
@RestController
@RequestMapping("/api/ai/interview")
public class AiInterviewController {

    // AI面试服务
    private final AiInterviewService aiInterviewService;

    /*
     * 构造函数
     * 输入：AI面试服务
     */
    public AiInterviewController(AiInterviewService aiInterviewService) {
        this.aiInterviewService = aiInterviewService;
    }

    /*
     * 初始化面试会话
     * 输入：学生ID、目标岗位、面试模式、总题目数
     * 输出：创建的面试会话对象
     */
    @PostMapping("/session/init")
    public InterviewSession initSession(
            @RequestParam Long studentId,
            @RequestParam String targetPosition,
            @RequestParam(required = false) Integer mode,
            @RequestParam(required = false) Integer totalQuestions) {
        return aiInterviewService.initSession(studentId, targetPosition, mode, totalQuestions);
    }

    /*
     * 获取面试历史记录
     * 输入：学生ID
     * 输出：面试会话列表
     */
    @GetMapping("/session/history")
    public List<InterviewSession> getSessionHistory(@RequestParam Long studentId) {
        return aiInterviewService.getSessionHistory(studentId);
    }

    /*
     * 获取单个面试会话
     * 输入：会话ID
     * 输出：面试会话对象
     */
    @GetMapping("/session/{sessionId}")
    public InterviewSession getSession(@PathVariable Long sessionId) {
        return aiInterviewService.getSession(sessionId);
    }

    /*
     * 结束面试会话
     * 输入：会话ID
     * 输出：更新后的面试会话对象
     */
    @PostMapping("/session/{sessionId}/end")
    public InterviewSession endSession(@PathVariable Long sessionId) {
        return aiInterviewService.endSession(sessionId);
    }

    /*
     * 获取面试题目列表
     * 输入：会话ID、题目数量
     * 输出：题目列表
     */
    @GetMapping("/questions")
    public List<?> getQuestions(
            @RequestParam Long sessionId,
            @RequestParam(required = false) Integer count) {
        return aiInterviewService.getQuestions(sessionId, count);
    }

    /*
     * 获取下一道面试题目
     * 输入：会话ID
     * 输出：题目对象
     */
    @GetMapping("/question/next")
    public Object getNextQuestion(@RequestParam Long sessionId) {
        return aiInterviewService.getNextQuestion(sessionId);
    }

    /*
     * 提交面试答案
     * 输入：会话ID、题目ID、用户答案
     * 输出：答题记录对象
     */
    @PostMapping("/answer/submit")
    public StudentAnswerRecord submitAnswer(
            @RequestParam Long sessionId,
            @RequestParam Long questionId,
            @RequestParam String userAnswer) {
        return aiInterviewService.submitAnswer(sessionId, questionId, userAnswer);
    }

    /*
     * 发送面试消息（用于实时对话）
     * 输入：会话ID、消息内容
     * 输出：AI回复内容
     */
    @PostMapping("/message/send")
    public String sendMessage(
            @RequestParam Long sessionId,
            @RequestParam String message) {
        return aiInterviewService.sendMessage(sessionId, message);
    }

    /*
     * 获取对话计数
     * 输入：会话ID
     * 输出：当前对话计数
     */
    @GetMapping("/message/count")
    public int getMessageCount(@RequestParam Long sessionId) {
        return aiInterviewService.getMessageCount(sessionId);
    }

    /*
     * 获取会话的答题记录
     * 输入：会话ID
     * 输出：答题记录列表
     */
    @GetMapping("/answers")
    public List<StudentAnswerRecord> getSessionAnswers(@RequestParam Long sessionId) {
        return aiInterviewService.getSessionAnswers(sessionId);
    }

    /*
     * 生成面试评估报告
     * 输入：会话ID
     * 输出：评估报告对象
     */
    @PostMapping("/report/generate")
    public Object generateReport(@RequestParam Long sessionId) {
        return aiInterviewService.generateReport(sessionId);
    }

    /*
     * 获取面试评估报告
     * 输入：会话ID
     * 输出：评估报告对象
     */
    @GetMapping("/report")
    public Object getReport(@RequestParam Long sessionId) {
        return aiInterviewService.getReport(sessionId);
    }

    /*
     * 导出面试报告为PDF
     * 输入：会话ID
     * 输出：PDF文件的字节数组
     */
    @GetMapping("/report/export")
    public byte[] exportReportToPdf(@RequestParam Long sessionId) {
        return aiInterviewService.exportReportToPdf(sessionId);
    }

    /*
     * 获取当前面试阶段
     * 输入：会话ID
     * 输出：当前面试阶段
     */
    @GetMapping("/stage/current")
    public String getCurrentStage(@RequestParam Long sessionId) {
        return aiInterviewService.getCurrentStage(sessionId);
    }

    /*
     * 更新面试阶段
     * 输入：会话ID、面试阶段
     * 输出：更新后的面试阶段
     */
    @PostMapping("/stage/update")
    public String updateStage(
            @RequestParam Long sessionId,
            @RequestParam String stage) {
        return aiInterviewService.updateStage(sessionId, stage).getCurrentStage();
    }

}