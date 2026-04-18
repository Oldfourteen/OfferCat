package com.offercat.Dao;

import com.offercat.entity.User;
import org.apache.ibatis.annotations.*;

/**
@author: blue
@date: 2026/4/17 - 20:06
@mail: 3590038173@qq.com
@info:
*/
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM user WHERE username = #{username}")
    User selectByUsername(String username);

    @Select("SELECT * FROM user WHERE phone = #{phone}")
    User selectByPhone(String phone);

    @Select("SELECT * FROM user WHERE email = #{email}")
    User selectByEmail(String email);

    @Insert("INSERT INTO user(username, password, nickname, phone, email, user_role, user_status, create_time) " +
            "VALUES(#{username}, #{password}, #{nickname}, #{phone}, #{email}, #{userRole}, #{userStatus}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "userId")
    int insert(User user);

    @Update("UPDATE user SET user_role = #{userRole}, real_name = #{realName}, " +
            "id_card = #{idCard}, school = #{school}, update_time = NOW() " +
            "WHERE user_id = #{userId}")
    int updateRoleAndInfo(User user);

    @Update("UPDATE user SET password = #{password}, update_time = NOW() WHERE user_id = #{userId}")
    int updatePassword(@Param("userId") Long userId, @Param("password") String password);

    @Select("SELECT * FROM user WHERE user_id = #{userId}")
    User selectById(Long userId);
}
