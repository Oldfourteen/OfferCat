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
    List<QuestionBank> findBySubjectAndType(@Param("subject") String subject, @Param("questionType") Integer questionType);
    
    QuestionBank findById(@Param("questionId") Long questionId);
    
    int insert(QuestionBank questionBank);
    
    int batchInsert(List<QuestionBank> questions);
    
    int countBySubjectAndType(@Param("subject") String subject, @Param("questionType") Integer questionType);
}
