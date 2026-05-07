package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.SubmitWrittenAnswerDTO;
import com.offercat.student.service.WrittenTestService;
import com.offercat.student.vo.WrittenTestQuestionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student/written-test")
public class WrittenTestController {

    @Autowired
    private WrittenTestService writtenTestService;

    /**
     * Get a written test question with randomized options for the student
     *
     * @param studentId  Student ID
     * @param questionId Question ID
     * @return Randomized WrittenTestQuestionVO
     */
    @GetMapping("/question")
    public ResponseResult<WrittenTestQuestionVO> getQuestion(
            @RequestParam("studentId") Long studentId,
            @RequestParam("questionId") Long questionId) {
        
        try {
            WrittenTestQuestionVO vo = writtenTestService.getQuestionForStudent(studentId, questionId);
            return ResponseResult.success(vo);
        } catch (Exception e) {
            return ResponseResult.error(500, "Failed to get question: " + e.getMessage());
        }
    }

    /**
     * Get all questions for a specific test paper
     *
     * @param studentId Student ID
     * @param paperId   Paper ID
     * @return List of randomized WrittenTestQuestionVO
     */
    @GetMapping("/paper-questions")
    public ResponseResult<java.util.List<WrittenTestQuestionVO>> getPaperQuestions(
            @RequestParam("studentId") Long studentId,
            @RequestParam("paperId") Long paperId) {
        try {
            java.util.List<WrittenTestQuestionVO> list = writtenTestService.getPaperQuestionsForStudent(studentId, paperId);
            return ResponseResult.success(list);
        } catch (Exception e) {
            return ResponseResult.error(500, "Failed to get paper questions: " + e.getMessage());
        }
    }

    /**
     * Submit an answer to a written test question
     *
     * @param dto SubmitWrittenAnswerDTO containing selected randomized option
     * @return Success message
     */
    @PostMapping("/submit")
    public ResponseResult<String> submitAnswer(@RequestBody SubmitWrittenAnswerDTO dto) {
        try {
            writtenTestService.submitAnswer(dto);
            return ResponseResult.success("Answer submitted successfully");
        } catch (Exception e) {
            return ResponseResult.error(500, "Failed to submit answer: " + e.getMessage());
        }
    }
}
