package com.offercat.student.service;

import com.offercat.student.dto.SubmitInterviewAnswerDTO;
import com.offercat.student.vo.InterviewQuestionVO;
/**
 * 面试服务接口
 * 功能：提供面试的增删改查操作
 */
public interface InterviewService {

    /**
     * 获取学生面试问题
     */
    InterviewQuestionVO getQuestionForStudent(Long studentId, Long questionId);

    /**
     * 获取学生面试问题列表
     */
    java.util.List<InterviewQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId);

    /**
     * 提交面试答案
     */
    void submitAnswer(SubmitInterviewAnswerDTO dto);
}
