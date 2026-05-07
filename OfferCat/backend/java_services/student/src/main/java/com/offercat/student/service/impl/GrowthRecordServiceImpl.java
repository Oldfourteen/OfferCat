package com.offercat.student.service.impl;

import com.offercat.student.dao.GrowthRecordMapper;
import com.offercat.student.entity.GrowthRecord;
import com.offercat.student.service.GrowthRecordService;
import com.offercat.student.vo.GrowthRecordVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

import java.time.DayOfWeek;
import java.util.ArrayList;
import java.util.List;

@Service
public class GrowthRecordServiceImpl implements GrowthRecordService {

    @Autowired
    private GrowthRecordMapper growthRecordMapper;

    @Override
    public GrowthRecordVO getGrowthRecordStats(Long studentId) {
        GrowthRecord record = growthRecordMapper.getByStudentId(studentId);
        
        // 动态计算最新的统计数据
        int resumeCount = growthRecordMapper.countPdfResumes(studentId);
        int interviewCount = growthRecordMapper.countAiInterviews(studentId);
        int collectionCount = growthRecordMapper.countCollections(studentId);
        int practiceCount = growthRecordMapper.countWrittenTestRecords(studentId) + 
                            growthRecordMapper.countInterviewTestRecords(studentId);

        LocalDate today = LocalDate.now();
        int continuousDays = 0;
        boolean checkedInToday = false;

        if (record == null) {
            // 不存在则创建一条默认记录
            record = new GrowthRecord();
            record.setStudentId(studentId);
            record.setResumeCount(resumeCount);
            record.setInterviewCount(interviewCount);
            record.setPracticeCount(practiceCount);
            record.setCollectionCount(collectionCount);
            record.setContinuousCheckinDays(0);
            record.setLastCheckinDate(null);
            growthRecordMapper.insertGrowthRecord(record);
        } else {
            // 判断是否断签
            if (record.getLastCheckinDate() != null) {
                long daysBetween = ChronoUnit.DAYS.between(record.getLastCheckinDate(), today);
                int recordDays = record.getContinuousCheckinDays() == null ? 0 : record.getContinuousCheckinDays();
                if (daysBetween == 0) {
                    checkedInToday = true;
                    continuousDays = recordDays;
                } else if (daysBetween == 1) {
                    continuousDays = recordDays;
                } else {
                    // 断签，归零
                    continuousDays = 0;
                }
            }
            
            // 更新数据库
            GrowthRecord updateRecord = new GrowthRecord();
            updateRecord.setStudentId(studentId);
            updateRecord.setResumeCount(resumeCount);
            updateRecord.setInterviewCount(interviewCount);
            updateRecord.setPracticeCount(practiceCount);
            updateRecord.setCollectionCount(collectionCount);
            updateRecord.setContinuousCheckinDays(continuousDays);
            growthRecordMapper.updateGrowthRecord(updateRecord);
        }

        // 构建VO返回
        GrowthRecordVO vo = new GrowthRecordVO();
        vo.setStudentId(studentId);
        vo.setResumeCount(resumeCount);
        vo.setInterviewCount(interviewCount);
        vo.setPracticeCount(practiceCount);
        vo.setCollectionCount(collectionCount);
        vo.setContinuousCheckinDays(continuousDays);
        vo.setCheckedInToday(checkedInToday);

        return vo;
    }

    @Override
    public int checkIn(Long studentId) {
        GrowthRecord record = growthRecordMapper.getByStudentId(studentId);
        LocalDate today = LocalDate.now();
        
        if (record == null) {
            // 没有记录，直接初始化并打卡
            record = new GrowthRecord();
            record.setStudentId(studentId);
            record.setResumeCount(growthRecordMapper.countPdfResumes(studentId));
            record.setInterviewCount(growthRecordMapper.countAiInterviews(studentId));
            record.setPracticeCount(growthRecordMapper.countWrittenTestRecords(studentId) + 
                                    growthRecordMapper.countInterviewTestRecords(studentId));
            record.setCollectionCount(growthRecordMapper.countCollections(studentId));
            record.setContinuousCheckinDays(1);
            record.setLastCheckinDate(today);
            growthRecordMapper.insertGrowthRecord(record);
            growthRecordMapper.insertCheckinRecord(studentId, today);
            return 1;
        }

        int continuousDays = record.getContinuousCheckinDays() == null ? 0 : record.getContinuousCheckinDays();
        if (record.getLastCheckinDate() != null) {
            long daysBetween = ChronoUnit.DAYS.between(record.getLastCheckinDate(), today);
            if (daysBetween == 0) {
                // 今天已经打过卡了，不做操作，返回原打卡天数
                return continuousDays;
            } else if (daysBetween == 1) {
                // 连续打卡
                continuousDays += 1;
            } else {
                // 漏签了，重新开始计算
                continuousDays = 1;
            }
        } else {
            // 第一次打卡
            continuousDays = 1;
        }

        // 更新数据库
        GrowthRecord updateRecord = new GrowthRecord();
        updateRecord.setStudentId(studentId);
        updateRecord.setContinuousCheckinDays(continuousDays);
        updateRecord.setLastCheckinDate(today);
        growthRecordMapper.updateGrowthRecord(updateRecord);
        growthRecordMapper.insertCheckinRecord(studentId, today);

        return continuousDays;
    }

    @Override
    public List<Boolean> getWeeklyCheckinStatus(Long studentId) {
        LocalDate today = LocalDate.now();
        // 获取本周一的日期
        LocalDate startOfWeek = today.with(DayOfWeek.MONDAY);
        // 获取本周日的日期
        LocalDate endOfWeek = today.with(DayOfWeek.SUNDAY);

        List<LocalDate> checkinDates = growthRecordMapper.getCheckinDatesBetween(studentId, startOfWeek, endOfWeek);
        
        List<Boolean> weeklyStatus = new ArrayList<>(7);
        for (int i = 0; i < 7; i++) {
            LocalDate currentDay = startOfWeek.plusDays(i);
            weeklyStatus.add(checkinDates.contains(currentDay));
        }
        return weeklyStatus;
    }

    @Override
    public void collectQuestion(Long studentId, Long questionId, Integer questionType) {
        growthRecordMapper.insertQuestionCollect(studentId, questionId, questionType);
        
        // 调用 stats 接口，动态同步最新的题库收藏数到 growth_record 表中，并保证记录一定存在
        getGrowthRecordStats(studentId);
    }
}
