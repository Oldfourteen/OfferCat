package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.SubmitInterviewAnswerDTO;
import com.offercat.student.service.InterviewService;
import com.offercat.student.vo.InterviewQuestionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 面试控制器
 * 功能：处理面试相关的请求
 */
@RestController
@RequestMapping("/student/interview")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    /**
     * 获取面试问题
     *
     * @param studentId  学生ID
     * @param questionId 问题ID
     * @return 面试问题VO对象
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
     * 获取测试试卷的所有面试问题
     *
     * @param studentId 学生ID
     * @param paperId   测试试卷ID
     * @return 面试问题VO列表
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
     * 提交面试答案
     *
     * @param dto SubmitInterviewAnswerDTO对象
     * @return 成功消息
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
