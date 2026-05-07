package com.offercat.student.service;

import com.offercat.student.dto.SubmitWrittenAnswerDTO;
import com.offercat.student.vo.WrittenTestQuestionVO;

public interface WrittenTestService {
    
    /**
     * Get a randomized written test question for a student
     */
    WrittenTestQuestionVO getQuestionForStudent(Long studentId, Long questionId);

    /**
     * Get all questions for a paper with randomized options
     */
    java.util.List<WrittenTestQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId);

    /**
     * Submit a student's answer, check correctness, and save the record
     */
    void submitAnswer(SubmitWrittenAnswerDTO dto);
}
