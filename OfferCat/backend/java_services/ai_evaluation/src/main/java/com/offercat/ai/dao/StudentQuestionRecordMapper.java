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
    /**
     * 根据学生ID查询问题记录列表
     * 输出：问题记录列表
     */
    List<StudentQuestionRecord> findByStudentId(@Param("studentId") Long studentId);
    /**
     * 根据学生ID和题目ID查询问题记录
     * 输入：学生ID、题目ID
     * 输出：问题记录对象
     */
    StudentQuestionRecord findByStudentIdAndQuestionId(
            @Param("studentId") Long studentId,
            @Param("questionId") Long questionId);
}
