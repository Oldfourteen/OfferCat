package com.offercat.Dao;

import com.offercat.entity.Student;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

/**
@author: blue
@date: 2026/4/17 - 20:08
@mail: 3590038173@qq.com
@info:
*/
@Mapper
public interface StudentMapper {
    @Insert("INSERT INTO student(user_id, grade, class_name, major, age, education, create_time) " +
            "VALUES(#{userId}, #{grade}, #{className}, #{major}, #{age}, #{education}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "studentId")
    int insert(Student student);

    @Select("SELECT * FROM student WHERE user_id = #{userId}")
    Student selectByUserId(Long userId);
}