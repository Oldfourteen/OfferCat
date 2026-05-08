package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.SubmitWrittenAnswerDTO;
import com.offercat.student.service.WrittenTestService;
import com.offercat.student.vo.WrittenTestQuestionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
/**
 * 书面测试控制器
 * 功能：提供书面测试相关的 API 接口
 */
@RestController
@RequestMapping("/student/written-test")
public class WrittenTestController {

    @Autowired
    private WrittenTestService writtenTestService;

    /**
     * 获取随机选项的书面测试问题
     * @param studentId 学生 ID
     * @param questionId 问题 ID
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
     * 获取特定套卷的所有问题
     * @param studentId 学生 ID
     * @param paperId 套卷 ID
     * @return 随机选项的书面测试问题列表
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
     * 提交书面测试答案
     * @param dto SubmitWrittenAnswerDTO 包含选中的随机选项
     * @return 成功消息 
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
