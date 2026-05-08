package com.offercat.ai.dao;

import com.offercat.ai.entity.InterviewSession;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 面试会话数据访问接口
 * 功能：操作面试会话相关的数据库操作
 * 实现：使用MyBatis框架，提供会话的增删改查方法
 */
@Mapper
public interface InterviewSessionMapper {

    /**
     * 根据ID查询会话
     * 输入：会话ID
     * 输出：会话对象
     */
    InterviewSession findById(Long id);

    /**     
     * 根据学生ID查询会话列表
     * 输入：学生ID
     * 输出：会话列表，按创建时间倒序
     */
    List<InterviewSession> findByStudentIdOrderByCreateTimeDesc(Long studentId);

    /**
     * 插入会话
     * 输入：会话对象
     * 输出：影响的行数
     */
    int insert(InterviewSession session);

    /**
     * 更新会话
     * 输入：会话对象
     * 输出：影响的行数
     */
    int update(InterviewSession session);

    /**
     * 删除会话
     * 输入：会话ID
     * 输出：影响的行数
     */
    int deleteById(Long id);

    /**
     * 增加已答题数
     * 输入：会话ID
     * 输出：影响的行数
     */
    int incrementAnswered(Long sessionId);

    /**
     * 更新面试阶段
     * 输入：会话ID，面试阶段
     * 输出：影响的行数
     */
    int updateStage(Long sessionId, String stage);
}
