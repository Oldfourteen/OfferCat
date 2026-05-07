package com.offercat.ai._service;

import com.offercat.ai.entity.*;

import java.util.List;

/*
 * AI面试服务接口
 * 功能：定义面试相关的服务方法
 * 实现：由AiInterviewServiceImpl实现具体逻辑
 */
public interface AiInterviewService {

    /*
     * 初始化面试会话
     * 输入：学生ID、目标岗位、面试模式、总题目数
     * 输出：创建的面试会话对象
     */
    InterviewSession initSession(Long studentId, String targetPosition, Integer mode, Integer totalQuestions);

    /*
     * 获取学生的面试历史记录
     * 输入：学生ID
     * 输出：面试会话列表，按创建时间倒序
     */
    List<InterviewSession> getSessionHistory(Long studentId);

    /*
     * 获取单个面试会话
     * 输入：会话ID
     * 输出：面试会话对象
     */
    InterviewSession getSession(Long sessionId);

    /*
     * 结束面试会话
     * 输入：会话ID
     * 输出：更新后的面试会话对象
     */
    InterviewSession endSession(Long sessionId);

    /*
     * 获取面试题目列表
     * 输入：会话ID、题目数量
     * 输出：题目列表
     */
    List<AiQuestionBank> getQuestions(Long sessionId, Integer count);

    /*
     * 获取下一道面试题目
     * 输入：会话ID
     * 输出：题目对象
     */
    AiQuestionBank getNextQuestion(Long sessionId);

    /*
     * 提交面试答案
     * 输入：会话ID、题目ID、用户答案
     * 输出：答题记录对象
     */
    StudentAnswerRecord submitAnswer(Long sessionId, Long questionId, String userAnswer);

    /*
     * 发送面试消息（用于实时对话）
     * 输入：会话ID、消息内容
     * 输出：AI回复内容
     */
    String sendMessage(Long sessionId, String message);

    /*
     * 获取对话计数
     * 输入：会话ID
     * 输出：当前对话计数
     */
    int getMessageCount(Long sessionId);

    /*
     * 获取会话的答题记录
     * 输入：会话ID
     * 输出：答题记录列表
     */
    List<StudentAnswerRecord> getSessionAnswers(Long sessionId);

    /*
     * 生成面试评估报告
     * 输入：会话ID
     * 输出：评估报告对象
     */
    AiReport generateReport(Long sessionId);

    /*
     * 获取面试评估报告
     * 输入：会话ID
     * 输出：评估报告对象
     */
    AiReport getReport(Long sessionId);

    /*
     * 导出面试报告为PDF
     * 输入：会话ID
     * 输出：PDF文件的字节数组
     */
    byte[] exportReportToPdf(Long sessionId);

    /*
     * 获取当前面试阶段
     * 输入：会话ID
     * 输出：当前面试阶段
     */
    String getCurrentStage(Long sessionId);

    /*
     * 更新面试阶段
     * 输入：会话ID，面试阶段
     * 输出：更新后的面试阶段
     */
    InterviewSession updateStage(Long sessionId, String stage);

    /*
     * 评估阶段面试答案
     * 输入：会话ID，面试阶段，用户答案
     * 输出：评估结果
     */
    String evaluateStageAnswer(Long sessionId, String stage, String userAnswer);

    String generateStageQuestion(Long sessionId, String stage);

    InterviewSession nextStage(Long sessionId);

}