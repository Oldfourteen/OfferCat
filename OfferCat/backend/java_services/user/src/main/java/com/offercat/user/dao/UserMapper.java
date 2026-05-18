package com.offercat.user.dao;

import com.offercat.user.entity.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

/**
 * @author: blue
 * @date: 2026/4/17 - 20:06
 * @mail: 3590038173@qq.com
 * @info: 用户Mapper
 *
 * 【安全规范】防 SQL 注入方案：
 * 1. 所有 SQL 均使用 MyBatis 的 #{} 参数化预编译绑定
 * 2. 严禁使用 ${} 直接拼接用户输入，防止 SQL 注入攻击
 */
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM `user` WHERE phone = #{phone}")
    User selectByPhone(String phone);
        /** 根据邮箱查询用户 */
    @Select("SELECT * FROM `user` WHERE email = #{email}")
    User selectByEmail(String email);
        /** 插入用户 */
    @Insert("INSERT INTO `user`(password, nickname, phone, email, user_role, user_status, create_time) " +
            "VALUES(#{password}, #{nickname}, #{phone}, #{email}, #{userRole}, #{userStatus}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "userId")
    int insert(User user);
        /** 更新用户角色和信息 */
    @Update("UPDATE `user` SET user_role = #{userRole}, real_name = #{realName}, " +
            "id_card = #{idCard}, school = #{school}, update_time = NOW() " +
            "WHERE user_id = #{userId}")
    int updateRoleAndInfo(User user);
        /** 更新用户密码 */
    @Update("UPDATE `user` SET password = #{password}, update_time = NOW() WHERE user_id = #{userId}")
    int updatePassword(@Param("userId") Long userId, @Param("password") String password);
        /** 根据用户ID归一为非管理员为学生：仅管理员(4)保持，其余/null/其它→1 */
    @Update("UPDATE `user` SET user_role = 1, update_time = NOW() WHERE user_id = #{userId} AND COALESCE(user_role, -1) != 4")
    int normalizeToStudentUnlessAdmin(@Param("userId") Long userId);
        /** 根据用户ID查询用户信息 */
    @Select("SELECT * FROM `user` WHERE user_id = #{userId}")
    User selectById(Long userId);
        /** 更新用户个人信息 */
    @Update({"<script>",
            "UPDATE `user`",
            "<set>",
            "<if test='nickname != null'>nickname = #{nickname},</if>",
            "<if test='gender != null'>gender = #{gender},</if>",
            "<if test='avatar != null'>avatar = #{avatar},</if>",
            "<if test='realName != null'>real_name = #{realName},</if>",
            "<if test='school != null'>school = #{school},</if>",
            "<if test='idCard != null'>id_card = #{idCard},</if>",
            "<if test='phone != null'>phone = #{phone},</if>",
            "<if test='email != null'>email = #{email},</if>",
            "update_time = NOW()",
            "</set>",
            "WHERE user_id = #{userId}",
            "</script>"})
    int updateProfileInfo(User user);
    
    /** 查询所有管理员用户 */
    @Select("SELECT * FROM `user` WHERE user_role = 4 AND user_status = 1")
    List<User> selectAllAdmins();
    
    /** 查询所有普通用户 */
    @Select("SELECT * FROM `user` WHERE user_role = 1 AND user_status = 1")
    List<User> selectAllStudents();
    
    /** 根据手机号搜索用户 */
    @Select("SELECT * FROM `user` WHERE phone = #{phone}")
    User selectUserByPhone(String phone);
    
    /** 批量更新用户角色为管理员 */
    @Update("UPDATE `user` SET user_role = 4, update_time = NOW() WHERE user_role = 1")
    int updateAllToAdmin();
}
