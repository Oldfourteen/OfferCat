package com.offercat.dao;

import com.offercat.entity.RadarEvaluation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

/**
 * 雷达评估Mapper接口
 * 用于雷达评估数据的CRUD操作
 */
@Mapper
public interface RadarEvaluationMapper {
    
    /**
     * 根据学生ID获取雷达评估
     * @param studentId 学生ID
     * @return 雷达评估信息
     */
    RadarEvaluation findByStudentId(@Param("studentId") Long studentId);
    
    /**
     * 插入雷达评估
     * @param radarEvaluation 雷达评估信息
     * @return 插入成功的记录数
     */
    int insert(RadarEvaluation radarEvaluation);
    
    /**
     * 更新雷达评估
     * @param radarEvaluation 雷达评估信息
     * @return 更新成功的记录数
     */
    int update(RadarEvaluation radarEvaluation);
    
    /**
     * 删除雷达评估
     * @param radarId 雷达评估ID
     * @return 删除成功的记录数
     */
    int deleteById(@Param("radarId") Long radarId);
}