package com.offercat.ai.dao;

import com.offercat.ai.entity.AiQuestionBank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/*
 * AI题库数据访问接口
 * 功能：操作题库相关的数据库操作
 * 实现：使用MyBatis框架，提供题目查询等方法
 */
@Mapper
public interface AiQuestionBankMapper {

    /*
     * 根据ID查询题目
     * 输入：题目ID
     * 输出：题目对象
     */
    AiQuestionBank findById(Long id);

    /*
     * 插入题目
     * 输入：题目对象
     * 输出：影响的行数
     */
    int insert(AiQuestionBank question);

    /*
     * 更新题目
     * 输入：题目对象
     * 输出：影响的行数
     */
    int update(AiQuestionBank question);

    /*
     * 删除题目
     * 输入：题目ID
     * 输出：影响的行数
     */
    int deleteById(Long id);

    /*
     * 按条件查询题目
     * 输入：岗位、难度、类型
     * 输出：题目列表
     */
    List<AiQuestionBank> findByConditions(
            @Param("position") String position,
            @Param("difficulty") Integer difficulty,
            @Param("type") Integer type);
}
