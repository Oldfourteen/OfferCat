package com.offercat.student.dao;

import com.offercat.student.entity.InterviewQuestionBank;
import com.offercat.student.entity.StudentInterviewRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
/**
 * 面试问题映射器
 * 功能：提供面试问题相关的数据库操作
 */
@Mapper
public interface InterviewMapper {
    /**
     * 根据面试问题 ID 获取面试问题
     */
    InterviewQuestionBank getQuestionById(@Param("questionId") Long questionId);

    /**
     * 根据测试试卷 ID 获取所有面试问题
     */
    java.util.List<InterviewQuestionBank> getQuestionsByPaperId(@Param("paperId") Long paperId);

    /**
     * 插入学生面试记录
     * @param record 学生面试记录
     */
    void insertStudentRecord(StudentInterviewRecord record);
}
