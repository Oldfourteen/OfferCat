package com.offercat.student.service;

import com.offercat.student.dto.SubmitWrittenAnswerDTO;
import com.offercat.student.vo.WrittenTestQuestionVO;
/**
 * 写作测试服务接口
 * 功能：提供写作测试的增删改查操作
 */
public interface WrittenTestService {
    
    /**
     * 获取学生写作测试问题
     * @param studentId 学生ID
     * @param questionId 问题ID
     * @return 问题VO
     */
    WrittenTestQuestionVO getQuestionForStudent(Long studentId, Long questionId);

    /**
     * 获取学生写作测试问题列表
     * @param studentId 学生ID
     * @param paperId 套卷ID
     * @return 问题VO列表
     */
    java.util.List<WrittenTestQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId);

    /**
     * 提交学生写作测试答案
     * @param dto 提交答案DTO
     * @return 无返回值
     */
    void submitAnswer(SubmitWrittenAnswerDTO dto);
}
