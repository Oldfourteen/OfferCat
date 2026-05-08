package com.offercat.ai.dao;

import com.offercat.ai.entity.StudentAnswerRecord;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 学生答题记录数据访问接口
 * 功能：操作学生答题记录相关的数据库操作
 * 实现：使用MyBatis框架，提供答题记录的增删改查方法
 */
@Mapper
public interface StudentAnswerRecordMapper {

    /**
     * 根据ID查询答题记录
     * 输入：记录ID
     * 输出：答题记录对象
     */
    StudentAnswerRecord findById(Long id);

    /**
     * 根据学生ID查询答题记录列表
     * 输入：学生ID
     * 输出：答题记录列表
     */
    List<StudentAnswerRecord> findByStudentId(Long studentId);

    /**
     * 插入答题记录
     * 输入：答题记录对象
     * 输出：影响的行数
     */
    int insert(StudentAnswerRecord record);

    /**
     * 更新答题记录
     * 输入：答题记录对象
     * 输出：影响的行数
     */
    int update(StudentAnswerRecord record);

    /**
     * 删除答题记录
     * 输入：记录ID
     * 输出：影响的行数
     */
    int deleteById(Long id);
}
