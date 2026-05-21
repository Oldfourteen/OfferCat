package com.offercat.student.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface UserIdentityMapper {
    @Select("SELECT user_id FROM `user` WHERE user_id = #{id} LIMIT 1")
    Long findUserId(@Param("id") Long id);

    @Select("SELECT user_id FROM `student` WHERE student_id = #{studentId} LIMIT 1")
    Long findUserIdByStudentId(@Param("studentId") Long studentId);

    @Select("SELECT student_id FROM `student` WHERE user_id = #{userId} LIMIT 1")
    Long findStudentIdByUserId(@Param("userId") Long userId);

    @Update("UPDATE forum_private_message SET sender_id = #{toId} WHERE sender_id = #{fromId}")
    int migrateSenderId(@Param("fromId") Long fromId, @Param("toId") Long toId);

    @Update("UPDATE forum_private_message SET receiver_id = #{toId} WHERE receiver_id = #{fromId}")
    int migrateReceiverId(@Param("fromId") Long fromId, @Param("toId") Long toId);
}

