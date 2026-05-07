package com.offercat.student.dao;

import com.offercat.student.entity.StudentWrittenTestRecord;
import com.offercat.student.entity.WrittenTestQuestionBank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface WrittenTestMapper {
    /**
     * Get a written test question by ID
     */
    WrittenTestQuestionBank getQuestionById(@Param("questionId") Long questionId);

    /**
     * Get all questions by paper ID
     */
    java.util.List<WrittenTestQuestionBank> getQuestionsByPaperId(@Param("paperId") Long paperId);

    /**
     * Insert a student's answer record
     */
    void insertStudentRecord(StudentWrittenTestRecord record);
}
