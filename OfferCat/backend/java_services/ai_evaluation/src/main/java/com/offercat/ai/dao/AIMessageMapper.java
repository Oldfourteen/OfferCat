package com.offercat.ai.dao;

import com.offercat.ai.entity.AiConsult;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 15:45
 * @mail: oldfourteen41@gmail.com
 * @info: AI消息Mapper
 */
@Mapper
public interface AIMessageMapper {
    //保存AI的一条对话，无论是人问的还是AI回答的
    @Insert("INSERT INTO ai_consult(user_id, user_content, ai_content, user_images, ai_images, create_time) " +
            "VALUES(#{userId}, #{userContent}, #{aiContent}, #{userImages}, #{aiImages}, #{createTime})")
    int insertConsult(AiConsult aiConsult);
    /**
     * 根据用户ID查询AI咨询历史记录
     */
    @Select("SELECT * FROM ai_consult WHERE user_id = #{userId} ORDER BY create_time DESC")
    List<AiConsult> selectHistoryByUserId(Long userId);
}