package com.offercat.radar.dao;

import com.offercat.radar.entity.RadarEvaluation;
import org.apache.ibatis.annotations.Mapper;

/**
 * 雷达评估数据访问接口
 * 功能：操作雷达评估相关的数据库操作
 * 实现：使用MyBatis框架，提供评估的增删改查方法
 */
@Mapper
public interface RadarEvaluationMapper {

    /**
     * 根据ID查询评估
     * 输入：评估ID
     * 输出：评估对象
     */
    RadarEvaluation findById(Long id);

    /**
     * 根据学生ID查询评估
     * 输入：学生ID
     * 输出：评估对象
     */
    RadarEvaluation findByStudentId(Long studentId);

    /**
     * 插入评估
     * 输入：评估对象
     * 输出：影响的行数
     */
    int insert(RadarEvaluation evaluation);

    /**
     * 更新评估
     * 输入：评估对象
     * 输出：影响的行数
     */
    int update(RadarEvaluation evaluation);

    /**
     * 删除评估
     * 输入：评估ID
     * 输出：影响的行数
     */
    int deleteById(Long id);
}
