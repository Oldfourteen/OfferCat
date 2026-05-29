package com.offercat.student.service.impl;

import com.offercat.student.dao.GrowthRecordMapper;
import com.offercat.student.entity.GrowthRecord;
import com.offercat.student.service.GrowthRecordService;
import com.offercat.student.vo.GrowthRecordVO;
import com.offercat.student.vo.CheckinResultVO;
import com.offercat.student.vo.PracticeSessionVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
/**
 * 成长记录服务实现类
 * 功能：表示成长记录服务实现
 */
@Service
public class GrowthRecordServiceImpl implements GrowthRecordService {
    /**
     * 成长记录映射器
     */
    @Autowired
    private GrowthRecordMapper growthRecordMapper;

    /**
     * 根据打卡明细从今日（或昨日）向前统计连续天数，与周历展示一致。
     */
    private int computeContinuousCheckinDays(Long studentId, LocalDate today) {
        LocalDate start = today.minusDays(400);
        List<LocalDate> checkinDates = growthRecordMapper.getCheckinDatesBetween(studentId, start, today);
        if (checkinDates == null || checkinDates.isEmpty()) {
            return 0;
        }
        Set<LocalDate> checkinSet = new HashSet<>(checkinDates);
        LocalDate cursor = checkinSet.contains(today) ? today : today.minusDays(1);
        if (!checkinSet.contains(cursor)) {
            return 0;
        }
        int streak = 0;
        while (checkinSet.contains(cursor)) {
            streak++;
            cursor = cursor.minusDays(1);
        }
        return streak;
    }

    private boolean hasCheckedInToday(Long studentId, LocalDate today) {
        List<LocalDate> todayOnly = growthRecordMapper.getCheckinDatesBetween(studentId, today, today);
        return todayOnly != null && !todayOnly.isEmpty();
    }

    @Override
    public Long resolveStudentId(Long studentId, Long userId) {
        if (userId != null && userId > 0) {
            Long sid = growthRecordMapper.selectStudentIdByUserId(userId);
            if (sid != null && sid > 0) {
                return sid;
            }
        }
        if (studentId != null && studentId > 0) {
            return studentId;
        }
        return null;
    }

    /**
     * 获取成长记录统计数据
     * @param studentId 学生ID
     * @return 成长记录统计数据VO
     */
    @Override
    public GrowthRecordVO getGrowthRecordStats(Long studentId) {
        GrowthRecord record = growthRecordMapper.getByStudentId(studentId);
        
        /**
         * 动态计算最新的统计数据
         */
        int resumeCount = growthRecordMapper.countPdfResumes(studentId);
        int interviewCount = growthRecordMapper.countAiInterviews(studentId);
        int collectionCount = growthRecordMapper.countCollections(studentId);
        int practiceCount = growthRecordMapper.countWrittenTestRecords(studentId) +
                growthRecordMapper.countInterviewTestRecords(studentId) +
                growthRecordMapper.sumPracticeAnsweredCount(studentId);

        LocalDate today = LocalDate.now();
        boolean checkedInToday = hasCheckedInToday(studentId, today);
        int continuousDays = computeContinuousCheckinDays(studentId, today);
        /**
         * 检查是否签到
         */
        if (record == null) {
            // 不存在则创建一条默认记录
            record = new GrowthRecord();
            record.setStudentId(studentId);
            record.setResumeCount(resumeCount);
            record.setInterviewCount(interviewCount);
            record.setPracticeCount(practiceCount);
            record.setCollectionCount(collectionCount);
            record.setContinuousCheckinDays(continuousDays);
            record.setLastCheckinDate(checkedInToday ? today : null);
            growthRecordMapper.insertGrowthRecord(record);
        } else {
            /**
             * 更新数据库（连续天数以打卡明细为准，避免与周历不一致）
             */
            GrowthRecord updateRecord = new GrowthRecord();
            updateRecord.setStudentId(studentId);
            updateRecord.setResumeCount(resumeCount);
            updateRecord.setInterviewCount(interviewCount);
            updateRecord.setPracticeCount(practiceCount);
            updateRecord.setCollectionCount(collectionCount);
            updateRecord.setContinuousCheckinDays(continuousDays);
            if (checkedInToday) {
                updateRecord.setLastCheckinDate(today);
            }
            growthRecordMapper.updateGrowthRecord(updateRecord);
        }

        /**
         * 计算累计打卡天数
         */
        int totalDays = growthRecordMapper.countTotalCheckins(studentId);

        /**
         * 构建VO返回
         */
        GrowthRecordVO vo = new GrowthRecordVO();
        vo.setStudentId(studentId);
        vo.setResumeCount(resumeCount);
        vo.setInterviewCount(interviewCount);
        vo.setPracticeCount(practiceCount);
        vo.setCollectionCount(collectionCount);
        vo.setContinuousCheckinDays(continuousDays);
        vo.setTotalCheckinDays(totalDays);
        vo.setCheckedInToday(checkedInToday);

        return vo;
    }

    @Override
    public void submitPracticeSession(Long studentId,
                                      String paperId,
                                      Integer paperType,
                                      Integer totalCount,
                                      Integer answeredCount,
                                      Integer correctCount,
                                      String sessionId,
                                      String title,
                                      java.time.LocalDateTime submittedAt) {
        if (studentId == null || studentId <= 0) {
            throw new IllegalArgumentException("studentId 无效");
        }
        if (paperId == null || paperId.trim().isEmpty()) {
            throw new IllegalArgumentException("paperId 不能为空");
        }
        int t = totalCount == null ? 0 : totalCount;
        int a = answeredCount == null ? 0 : answeredCount;
        int c = correctCount == null ? 0 : correctCount;
        if (t < 0 || a < 0 || c < 0) {
            throw new IllegalArgumentException("统计数据不能为负数");
        }
        int wrong = Math.max(a - c, 0);
        int accuracy = t > 0 ? (int) Math.round((c * 100.0) / t) : 0;
        growthRecordMapper.insertPracticeSession(
                studentId,
                paperId.trim(),
                paperType,
                t,
                a,
                c,
                wrong,
                accuracy,
                sessionId,
                title,
                submittedAt
        );
        getGrowthRecordStats(studentId);
    }

    @Override
    public List<PracticeSessionVO> listPracticeSessions(Long studentId, Integer paperType, Integer limit) {
        if (studentId == null || studentId <= 0) {
            throw new IllegalArgumentException("studentId 无效");
        }
        int lim = (limit == null || limit <= 0) ? 50 : Math.min(limit, 200);
        return growthRecordMapper.listPracticeSessions(studentId, paperType, lim);
    }
    /**
     * 签到成长记录
     * @param studentId 学生ID
     * @return 打卡结果（包含连续天数和累计天数）
     */
    @Override
    public CheckinResultVO checkIn(Long studentId) {
        GrowthRecord record = growthRecordMapper.getByStudentId(studentId);
        LocalDate today = LocalDate.now();

        if (record == null) {
            record = new GrowthRecord();
            record.setStudentId(studentId);
            record.setResumeCount(growthRecordMapper.countPdfResumes(studentId));
            record.setInterviewCount(growthRecordMapper.countAiInterviews(studentId));
            record.setPracticeCount(growthRecordMapper.countWrittenTestRecords(studentId) +
                                    growthRecordMapper.countInterviewTestRecords(studentId));
            record.setCollectionCount(growthRecordMapper.countCollections(studentId));
            record.setContinuousCheckinDays(0);
            record.setLastCheckinDate(null);
            growthRecordMapper.insertGrowthRecord(record);
        }

        if (hasCheckedInToday(studentId, today)) {
            int continuousDays = computeContinuousCheckinDays(studentId, today);
            int totalDays = growthRecordMapper.countTotalCheckins(studentId);
            CheckinResultVO result = new CheckinResultVO();
            result.setContinuousCheckinDays(continuousDays);
            result.setTotalCheckinDays(totalDays);
            return result;
        }

        growthRecordMapper.insertCheckinRecord(studentId, today);

        int continuousDays = computeContinuousCheckinDays(studentId, today);
        int totalDays = growthRecordMapper.countTotalCheckins(studentId);

        GrowthRecord updateRecord = new GrowthRecord();
        updateRecord.setStudentId(studentId);
        updateRecord.setContinuousCheckinDays(continuousDays);
        updateRecord.setLastCheckinDate(today);
        growthRecordMapper.updateGrowthRecord(updateRecord);

        CheckinResultVO result = new CheckinResultVO();
        result.setContinuousCheckinDays(continuousDays);
        result.setTotalCheckinDays(totalDays);
        return result;
    }
    /**
     * 获取本周签到状态
     * @param studentId 学生ID
     * @return 本周签到状态列表
     */
    @Override
    public List<Boolean> getWeeklyCheckinStatus(Long studentId) {
        LocalDate today = LocalDate.now();
        /**
         * 获取本周一的日期
         */
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        /**
         * 获取本周日的日期
         */
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        List<LocalDate> checkinDates = growthRecordMapper.getCheckinDatesBetween(studentId, startOfWeek, endOfWeek);
        
        List<Boolean> weeklyStatus = new ArrayList<>(7);
        for (int i = 0; i < 7; i++) {
            LocalDate currentDay = startOfWeek.plusDays(i);
            weeklyStatus.add(checkinDates.contains(currentDay));
        }
        return weeklyStatus;
    }
    /**
     * 收藏题库题目
     * @param studentId 学生ID
     * @param questionId 题目ID
     * @param questionType 题目类型
     */
    @Override
    public void collectQuestion(Long studentId, Long questionId, Integer questionType) {
        growthRecordMapper.insertQuestionCollect(studentId, questionId, questionType);
        
        /**
         * 调用 stats 接口，动态同步最新的题库收藏数到 growth_record 表中，并保证记录一定存在
         */
        getGrowthRecordStats(studentId);
    }

    @Override
    public void uncollectQuestion(Long studentId, Long questionId, Integer questionType) {
        growthRecordMapper.deleteQuestionCollect(studentId, questionId, questionType);
        getGrowthRecordStats(studentId);
    }

    @Override
    public List<Long> listCollectedQuestionIds(Long studentId, Integer questionType) {
        return growthRecordMapper.listQuestionCollectIds(studentId, questionType);
    }
}
