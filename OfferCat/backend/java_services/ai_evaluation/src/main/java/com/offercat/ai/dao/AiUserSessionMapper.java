package com.offercat.ai.dao;

import com.offercat.ai.entity.AiUserSession;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface AiUserSessionMapper {
    @Select("SELECT * FROM ai_user_session WHERE user_id = #{userId}")
    AiUserSession selectByUserId(Long userId);

    @Insert("INSERT INTO ai_user_session(user_id, conversations_json) VALUES(#{userId}, #{conversationsJson})")
    int insert(AiUserSession session);

    @Update("UPDATE ai_user_session SET conversations_json = #{conversationsJson} WHERE user_id = #{userId}")
    int update(AiUserSession session);
}