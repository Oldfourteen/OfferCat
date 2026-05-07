package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.SubmitInterviewAnswerDTO;
import com.offercat.student.service.InterviewService;
import com.offercat.student.vo.InterviewQuestionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student/interview")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    /**
     * Get an interview question for the student
     *
     * @param studentId  Student ID
     * @param questionId Question ID
     * @return InterviewQuestionVO
     */
    @GetMapping("/question")
    public ResponseResult<InterviewQuestionVO> getQuestion(
            @RequestParam("studentId") Long studentId,
            @RequestParam("questionId") Long questionId) {
        
        try {
            InterviewQuestionVO vo = interviewService.getQuestionForStudent(studentId, questionId);
            return ResponseResult.success(vo);
        } catch (Exception e) {
            return ResponseResult.error(500, "Failed to get question: " + e.getMessage());
        }
    }

    /**
     * Get all interview questions for a specific test paper
     *
     * @param studentId Student ID
     * @param paperId   Paper ID
     * @return List of InterviewQuestionVO
     */
    @GetMapping("/paper-questions")
    public ResponseResult<java.util.List<InterviewQuestionVO>> getPaperQuestions(
            @RequestParam("studentId") Long studentId,
            @RequestParam("paperId") Long paperId) {
        try {
            java.util.List<InterviewQuestionVO> list = interviewService.getPaperQuestionsForStudent(studentId, paperId);
            return ResponseResult.success(list);
        } catch (Exception e) {
            return ResponseResult.error(500, "Failed to get paper questions: " + e.getMessage());
        }
    }

    /**
     * Submit an answer to an interview question
     *
     * @param dto SubmitInterviewAnswerDTO
     * @return Success message
     */
    @PostMapping("/submit")
    public ResponseResult<String> submitAnswer(@RequestBody SubmitInterviewAnswerDTO dto) {
        try {
            interviewService.submitAnswer(dto);
            return ResponseResult.success("Answer submitted successfully");
        } catch (Exception e) {
            return ResponseResult.error(500, "Failed to submit answer: " + e.getMessage());
        }
    }
}
