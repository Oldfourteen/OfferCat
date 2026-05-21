package com.offercat.ai.dao;

import com.offercat.ai.entity.AiUserSession;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface AiUserSessionMapper {
    @Select("SELECT user_id, conversations_json, update_time FROM ai_user_session WHERE user_id = #{userId}")
    @Results(id = "AiUserSessionMap", value = {
            @Result(property = "userId", column = "user_id"),
            @Result(property = "conversationsJson", column = "conversations_json"),
            @Result(property = "updateTime", column = "update_time")
    })
    AiUserSession selectByUserId(Long userId);

    @Insert("INSERT INTO ai_user_session(user_id, conversations_json) VALUES(#{userId}, #{conversationsJson})")
    int insert(AiUserSession session);

    @Update("UPDATE ai_user_session SET conversations_json = #{conversationsJson} WHERE user_id = #{userId}")
    int update(AiUserSession session);

    /** 原子 upsert，避免并发 sync 时重复 INSERT 触发主键冲突 */
    @Insert("INSERT INTO ai_user_session(user_id, conversations_json) VALUES(#{userId}, #{conversationsJson}) "
            + "ON DUPLICATE KEY UPDATE conversations_json = #{conversationsJson}")
    int upsert(AiUserSession session);
}