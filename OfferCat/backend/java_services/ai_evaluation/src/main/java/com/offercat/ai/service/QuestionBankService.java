package com.offercat.ai.service;

import com.offercat.ai.dto.request.QuestionBankRequest;
import com.offercat.ai.dto.request.SubmitAnswerRequest;
import com.offercat.ai.dto.response.QuestionBankResponse;
import com.offercat.ai.dto.response.SubmitAnswerResponse;
import java.util.List;

/**
 * 题库服务接口
 * 用来处理题库相关的业务逻辑
 */
public interface QuestionBankService {
    /**
     * 获取PDF题库数据
     */
    QuestionBankResponse getQuestions(QuestionBankRequest request);
    /**
     * 提交答案
     */
    SubmitAnswerResponse submitAnswer(SubmitAnswerRequest request);
    /**
     * 生成PDF题库
     */
    byte[] generatePdf(QuestionBankRequest request);
    /**
     * 初始化PDF题库数据
     */
    void initializeQuestionBank();
    /**
     * 获取所有专业
     */
    List<String> getAllSubjects();
}
