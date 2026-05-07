package com.offercat.student.dao;

import com.offercat.student.entity.GrowthRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface GrowthRecordMapper {

    /**
     * 根据学生ID获取成长档案
     */
    GrowthRecord getByStudentId(@Param("studentId") Long studentId);

    /**
     * 插入成长档案
     */
    void insertGrowthRecord(GrowthRecord record);

    /**
     * 更新成长档案（只更新非空字段）
     */
    void updateGrowthRecord(GrowthRecord record);

    /**
     * 统计PDF简历生成次数
     */
    int countPdfResumes(@Param("studentId") Long studentId);

    /**
     * 统计AI面试次数（根据AI对话表统计用户输入"开始面试"的次数）
     */
    int countAiInterviews(@Param("studentId") Long studentId);

    /**
     * 统计题库收藏数
     */
    int countCollections(@Param("studentId") Long studentId);

    /**
     * 统计学生笔试题答题记录数
     */
    int countWrittenTestRecords(@Param("studentId") Long studentId);

    /**
     * 统计学生面试题答题记录数
     */
    int countInterviewTestRecords(@Param("studentId") Long studentId);

    /**
     * 收藏题库
     */
    void insertQuestionCollect(@Param("studentId") Long studentId, @Param("questionId") Long questionId, @Param("questionType") Integer questionType);

    /**
     * 插入每日打卡记录
     */
    void insertCheckinRecord(@Param("studentId") Long studentId, @Param("checkinDate") java.time.LocalDate checkinDate);

    /**
     * 获取指定时间范围内的打卡日期列表
     */
    java.util.List<java.time.LocalDate> getCheckinDatesBetween(@Param("studentId") Long studentId, @Param("startDate") java.time.LocalDate startDate, @Param("endDate") java.time.LocalDate endDate);
}
