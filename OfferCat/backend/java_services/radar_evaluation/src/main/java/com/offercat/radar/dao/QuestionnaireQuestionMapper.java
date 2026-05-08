package com.offercat.radar.dao;

import com.offercat.radar.entity.QuestionnaireQuestion;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import java.util.List;
/**
 * 问卷问题映射器
 */
 
@Mapper
public interface QuestionnaireQuestionMapper {
    /**
     * 获取所有问题
     * 输出：所有问题列表
     */
    @Select("SELECT * FROM questionnaire_question ORDER BY question_order ASC")
    @Results({
        @Result(property = "id", column = "id"),
        @Result(property = "section", column = "section"),
        @Result(property = "questionOrder", column = "question_order"),
        @Result(property = "questionText", column = "question_text"),
        @Result(property = "optionA", column = "option_a"),
        @Result(property = "optionB", column = "option_b"),
        @Result(property = "optionC", column = "option_c"),
        @Result(property = "optionD", column = "option_d"),
        @Result(property = "scoresA", column = "scores_a"),
        @Result(property = "scoresB", column = "scores_b"),
        @Result(property = "scoresC", column = "scores_c"),
        @Result(property = "scoresD", column = "scores_d")
    })
    /**
     * 获取所有问题
     * 输出：所有问题列表
     */
    List<QuestionnaireQuestion> selectAllQuestions();
}
