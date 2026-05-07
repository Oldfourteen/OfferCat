package com.offercat.student.dao;

import com.offercat.student.entity.InterviewQuestionBank;
import com.offercat.student.entity.StudentInterviewRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface InterviewMapper {
    /**
     * Get an interview question by ID
     */
    InterviewQuestionBank getQuestionById(@Param("questionId") Long questionId);

    /**
     * Get all questions by paper ID
     */
    java.util.List<InterviewQuestionBank> getQuestionsByPaperId(@Param("paperId") Long paperId);

    /**
     * Insert a student's interview record
     */
    void insertStudentRecord(StudentInterviewRecord record);
}
