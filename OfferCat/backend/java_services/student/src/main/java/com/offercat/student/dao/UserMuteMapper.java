package com.offercat.student.dao;

import com.offercat.student.entity.UserMute;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface UserMuteMapper {

    @Select("SELECT * FROM user_mute WHERE user_id = #{userId} AND status = 1 "
            + "AND (end_time IS NULL OR end_time > NOW()) ORDER BY create_time DESC LIMIT 1")
    UserMute selectCurrentMuteByUserId(@Param("userId") Long userId);

    @Select("SELECT * FROM user_mute WHERE status = 1 AND (end_time IS NULL OR end_time > NOW())")
    List<UserMute> selectAllActiveMutes();

    @Insert("INSERT INTO user_mute (user_id, duration, start_time, end_time, reason, operator_id, status, create_time, update_time) "
            + "VALUES (#{userId}, #{duration}, #{startTime}, #{endTime}, #{reason}, #{operatorId}, #{status}, #{createTime}, #{updateTime})")
    @Options(useGeneratedKeys = true, keyProperty = "id")
    int insert(UserMute mute);

    @Update("UPDATE user_mute SET status = #{status}, update_time = NOW() WHERE id = #{id}")
    int updateStatus(@Param("id") Long id, @Param("status") Integer status);
}
