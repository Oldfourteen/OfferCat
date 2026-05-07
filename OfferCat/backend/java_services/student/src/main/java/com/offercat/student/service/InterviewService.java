package com.offercat.student.service;

import com.offercat.student.dto.SubmitInterviewAnswerDTO;
import com.offercat.student.vo.InterviewQuestionVO;

public interface InterviewService {

    /**
     * Get an interview question for a student
     */
    InterviewQuestionVO getQuestionForStudent(Long studentId, Long questionId);

    /**
     * Get all interview questions for a paper
     */
    java.util.List<InterviewQuestionVO> getPaperQuestionsForStudent(Long studentId, Long paperId);

    /**
     * Submit an interview answer and save the record
     */
    void submitAnswer(SubmitInterviewAnswerDTO dto);
}
