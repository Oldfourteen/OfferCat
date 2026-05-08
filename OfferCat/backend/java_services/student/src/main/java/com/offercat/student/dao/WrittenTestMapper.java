package com.offercat.student.dao;

import com.offercat.student.entity.StudentWrittenTestRecord;
import com.offercat.student.entity.WrittenTestQuestionBank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface WrittenTestMapper {
    /**
     * 根据问题ID获取书面测试问题
     * @param questionId 问题ID
     * @return 书面测试问题对象
     */
    WrittenTestQuestionBank getQuestionById(@Param("questionId") Long questionId);

    /**
     * 根据测试试卷ID获取所有书面测试问题
     * @param paperId 测试试卷ID
     * @return 书面测试问题列表
     */
    java.util.List<WrittenTestQuestionBank> getQuestionsByPaperId(@Param("paperId") Long paperId);

    /**
     * 插入学生书面测试记录
     * @param record 学生书面测试记录对象
     */
    void insertStudentRecord(StudentWrittenTestRecord record);
}
