package com.offercat.ai._service;

/*
 * AI服务客户端接口
 * 功能：定义与AI服务交互的方法
 * 实现：由AiServiceClientImpl实现具体逻辑
 */
public interface AiServiceClient {

    /*
     * 生成简历
     * 输入：目标岗位、学生信息
     * 输出：生成的简历内容
     */
    String generateResume(String targetPosition, String studentInfo);

    /*
     * 诊断简历
     * 输入：简历内容、目标岗位
     * 输出：诊断结果
     */
    String diagnoseResume(String resumeContent, String targetPosition);

    /*
     * 润色简历
     * 输入：简历内容
     * 输出：润色后的简历文本
     */
    String polishResume(String resumeContent);

    /*
     * 评估答案
     * 输入：题目、用户答案、核心要点
     * 输出：评估结果
     */
    String evaluateAnswer(String question, String answer, String keyPoints);

    /*
     * 生成面试报告
     * 输入：会话ID、答案记录
     * 输出：面试报告内容
     */
    String generateInterviewReport(Long sessionId, Object answerRecords);
    
    /*
     * 生成面试题目
     * 输入：提示内容
     * 输出：题目内容
     */
    String generateQuestions(String prompt);
}