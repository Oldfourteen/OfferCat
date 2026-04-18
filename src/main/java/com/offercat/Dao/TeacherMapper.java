package com.offercat.Dao;

import com.offercat.entity.Teacher;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

/**
@author: blue
@date: 2026/4/17 - 20:13
@mail: 3590038173@qq.com
@info:
*/
@Mapper
public interface TeacherMapper {
    @Insert("INSERT INTO teacher(user_id, position, work_no, create_time) " +
            "VALUES(#{userId}, #{position}, #{workNo}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "teacherId")
    int insert(Teacher teacher);

    @Select("SELECT * FROM teacher WHERE user_id = #{userId}")
    Teacher selectByUserId(Long userId);
}
