package com.offercat.student.service;

import com.offercat.student.vo.GrowthRecordVO;
import com.offercat.student.vo.CheckinResultVO;
/**
 * 学生成长档案服务接口
 * 功能：提供学生成长档案的增删改查操作
 */
public interface GrowthRecordService {

    /**
     * 优先使用 studentId；缺省时按 userId 查 {@code student} 表主键。
     *
     * @return 有效 student_id，无法解析时返回 null
     */
    Long resolveStudentId(Long studentId, Long userId);
    
    /**
     * 获取学生成长档案统计信息，并同步最新的数据
     *
     * @param studentId 学生ID
     * @return 统计信息
     */
    GrowthRecordVO getGrowthRecordStats(Long studentId);

    /**
     * 学生打卡
     *
     * @param studentId 学生ID
     * @return 打卡结果（包含连续天数和累计天数）
     */
    CheckinResultVO checkIn(Long studentId);

    /**
     * 收藏题库
     * 
     * @param studentId 学生ID
     * @param questionId 题目ID
     * @param questionType 题目类型
     */
    void collectQuestion(Long studentId, Long questionId, Integer questionType);
    /**
     * 获取学生本周的打卡状态
     * @param studentId 学生ID
     * @return 长度为7的Boolean数组，代表周一到周日
     */
    java.util.List<Boolean> getWeeklyCheckinStatus(Long studentId);
}
