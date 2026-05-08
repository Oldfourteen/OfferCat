package com.offercat.ai.dao;

import com.offercat.ai.entity.AiReport;
import org.apache.ibatis.annotations.Mapper;

/**
 * AI评估报告数据访问接口
 * 功能：操作评估报告相关的数据库操作
 * 实现：使用MyBatis框架，提供报告的增删改查方法
 */
@Mapper
public interface AiReportMapper {

    /**
     * 根据ID查询报告
     * 输入：报告ID
     * 输出：报告对象
     */
    AiReport findById(Long id);

    /**
     * 根据学生ID查询报告
     * 输入：学生ID
     * 输出：报告对象
     */
    AiReport findByStudentId(Long studentId);

    /**
     * 插入报告
     * 输入：报告对象
     * 输出：影响的行数
     */
    int insert(AiReport report);

    /**
     * 更新报告
     * 输入：报告对象
     * 输出：影响的行数
     */
    int update(AiReport report);

    /**
     * 删除报告
     * 输入：报告ID
     * 输出：影响的行数
     */
    int deleteById(Long id);
}
