package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.service.GrowthRecordService;
import com.offercat.student.vo.GrowthRecordVO;
import com.offercat.student.vo.CheckinResultVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 成长档案控制器
 * 功能：处理成长档案相关的请求
 */
@RestController
@RequestMapping("/growth")
@CrossOrigin(origins = "*")
public class GrowthRecordController {
    /**
     * 成长档案服务
     */
    @Autowired
    private GrowthRecordService growthRecordService;

    /**
     * 获取学生的成长档案统计信息（简历生成次数、面试次数、收藏数等）
     * 
     * @param studentId 学生ID
     * @return 成长档案统计VO
     */
    @GetMapping("/stats")
    public ResponseResult<GrowthRecordVO> getStats(@RequestParam("studentId") Long studentId) {
        GrowthRecordVO stats = growthRecordService.getGrowthRecordStats(studentId);
        return ResponseResult.success(stats);
    }

    /**
     * 学生打卡
     * 连续打卡，从零开始，一旦中间遗漏一天就会归零
     * 
     * @param studentId 学生ID
     * @return 打卡结果（包含连续天数和累计天数）
     */
    @PostMapping("/checkin")
    public ResponseResult<CheckinResultVO> checkIn(@RequestParam("studentId") Long studentId) {
        CheckinResultVO result = growthRecordService.checkIn(studentId);
        return ResponseResult.success(result);
    }

    /**
     * 获取本周打卡状态
     * 
     * @param studentId 学生ID
     * @return 长度为7的Boolean数组，代表周一到周日
     */
    @GetMapping("/checkin/weekly")
    public ResponseResult<List<Boolean>> getWeeklyCheckinStatus(@RequestParam("studentId") Long studentId) {
        List<Boolean> status = growthRecordService.getWeeklyCheckinStatus(studentId);
        return ResponseResult.success(status);
    }

    /**
     * 收藏题库
     * 
     * @param studentId 学生ID
     * @param questionId 题目ID
     * @param questionType 题目来源类型: 1-AI题库 2-雷达图题库 3-笔试题库 4-面试题库
     * @return 收藏结果
     */
    @PostMapping("/collect")
    public ResponseResult<Void> collectQuestion(@RequestParam("studentId") Long studentId, 
                                                @RequestParam("questionId") Long questionId,
                                                @RequestParam("questionType") Integer questionType) {
        growthRecordService.collectQuestion(studentId, questionId, questionType);
        return ResponseResult.success(null);
    }
}
