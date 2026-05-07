package com.offercat.ai.dao;

import com.offercat.ai.entity.StudentQuestionRecord;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 学生问题记录Mapper接口
 */
@Mapper
public interface StudentQuestionRecordMapper {
    int insert(StudentQuestionRecord record);
    
    List<StudentQuestionRecord> findByStudentId(@Param("studentId") Long studentId);
    
    StudentQuestionRecord findByStudentIdAndQuestionId(
            @Param("studentId") Long studentId,
            @Param("questionId") Long questionId);
}
