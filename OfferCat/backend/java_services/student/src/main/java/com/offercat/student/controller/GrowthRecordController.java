package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.SubmitPracticeDTO;
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
@RequestMapping({"/growth", "/student/growth", "/student/profile/growth"})
@CrossOrigin(origins = "*")
public class GrowthRecordController {
    /**
     * 成长档案服务
     */
    @Autowired
    private GrowthRecordService growthRecordService;

    /**
     * 获取学生的成长档案统计信息（简历生成次数、面试次数、收藏数等）
     * studentId 与 userId 二选一（或同时传）；缺 studentId 时服务端按 userId→student 表解析，避免 H5 缓存丢 studentId 导致长期为 0。
     */
    @GetMapping("/stats")
    public ResponseResult<GrowthRecordVO> getStats(
            @RequestParam(value = "studentId", required = false) Long studentId,
            @RequestParam(value = "userId", required = false) Long userId) {
        Long sid = growthRecordService.resolveStudentId(studentId, userId);
        if (sid == null) {
            return ResponseResult.error(400, "缺少有效的 studentId 或 userId，或未找到对应学生档案");
        }
        GrowthRecordVO stats = growthRecordService.getGrowthRecordStats(sid);
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
    public ResponseResult<CheckinResultVO> checkIn(
            @RequestParam(value = "studentId", required = false) Long studentId,
            @RequestParam(value = "userId", required = false) Long userId) {
        Long sid = growthRecordService.resolveStudentId(studentId, userId);
        if (sid == null) {
            return ResponseResult.error(400, "缺少有效的 studentId 或 userId，或未找到对应学生档案");
        }
        CheckinResultVO result = growthRecordService.checkIn(sid);
        return ResponseResult.success(result);
    }

    /**
     * 获取本周打卡状态
     * 
     * @param studentId 学生ID
     * @return 长度为7的Boolean数组，代表周一到周日
     */
    @GetMapping("/checkin/weekly")
    public ResponseResult<List<Boolean>> getWeeklyCheckinStatus(
            @RequestParam(value = "studentId", required = false) Long studentId,
            @RequestParam(value = "userId", required = false) Long userId) {
        Long sid = growthRecordService.resolveStudentId(studentId, userId);
        if (sid == null) {
            return ResponseResult.error(400, "缺少有效的 studentId 或 userId，或未找到对应学生档案");
        }
        List<Boolean> status = growthRecordService.getWeeklyCheckinStatus(sid);
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
    public ResponseResult<Void> collectQuestion(@RequestParam(value = "studentId", required = false) Long studentId,
                                                @RequestParam(value = "userId", required = false) Long userId,
                                                @RequestParam("questionId") Long questionId,
                                                @RequestParam("questionType") Integer questionType) {
        Long sid = growthRecordService.resolveStudentId(studentId, userId);
        if (sid == null) {
            return ResponseResult.error(400, "缺少有效的 studentId 或 userId，或未找到对应学生档案");
        }
        growthRecordService.collectQuestion(sid, questionId, questionType);
        return ResponseResult.success(null);
    }

    @PostMapping("/practice/submit")
    public ResponseResult<Void> submitPractice(@RequestBody SubmitPracticeDTO dto) {
        if (dto == null) {
            return ResponseResult.error(400, "请求体不能为空");
        }
        Long sid = growthRecordService.resolveStudentId(dto.getStudentId(), dto.getUserId());
        if (sid == null) {
            return ResponseResult.error(400, "缺少有效的 studentId 或 userId，或未找到对应学生档案");
        }
        growthRecordService.submitPracticeSession(
                sid,
                dto.getPaperId(),
                dto.getPaperType(),
                dto.getTotalCount(),
                dto.getAnsweredCount(),
                dto.getCorrectCount()
        );
        return ResponseResult.success(null);
    }
}
