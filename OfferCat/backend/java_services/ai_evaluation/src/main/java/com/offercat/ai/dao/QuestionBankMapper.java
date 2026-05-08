package com.offercat.ai.dao;

import com.offercat.ai.entity.QuestionBank;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 题库Mapper接口
 */
@Mapper
public interface QuestionBankMapper {
    /**
     * 根据科目和题目类型查询题目列表
     * 输入：科目，题目类型
     * 输出：题目列表
     */
    List<QuestionBank> findBySubjectAndType(@Param("subject") String subject, @Param("questionType") Integer questionType);
    
    /**
     * 根据ID查询题目
     * 输入：题目ID
     * 输出：题目对象
     */
    QuestionBank findById(@Param("questionId") Long questionId);
    
    /**
     * 插入题目
     * 输入：题目对象
     * 输出：影响的行数
     */ 
    int insert(QuestionBank questionBank);
    
    /**
     * 批量插入题目
     * 输入：题目列表
     * 输出：影响的行数
     */ 
   
    int batchInsert(List<QuestionBank> questions);
    
    /**
     * 根据科目和题目类型统计题目数量
     * 输入：科目，题目类型
     * 输出：题目数量
     */
    int countBySubjectAndType(@Param("subject") String subject, @Param("questionType") Integer questionType);
}
