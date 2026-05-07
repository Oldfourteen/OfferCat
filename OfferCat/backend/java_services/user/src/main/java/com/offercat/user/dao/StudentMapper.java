package com.offercat.user.dao;


import org.apache.ibatis.annotations.*;

/**
@author: blue
@date: 2026/4/17 - 20:08
@mail: 3590038173@qq.com
@info: 学生Mapper
*/
@Mapper
public interface StudentMapper {
    @Insert("INSERT INTO `student`(user_id, school, college, grade, class_name, major, company_id, age, education, bio, job_status, job_direction, intent_city, expected_salary, radar_id, create_time) " +
            "VALUES(#{userId}, #{school}, #{college}, #{grade}, #{className}, #{major}, #{companyId}, #{age}, #{education}, #{bio}, #{jobStatus}, #{jobDirection}, #{intentCity}, #{expectedSalary}, #{radarId}, #{createTime})")
    @Options(useGeneratedKeys = true, keyProperty = "studentId")
    int insert(com.offercat.user.entity.Student student);

    @Select("SELECT * FROM `student` WHERE user_id = #{userId}")
    com.offercat.user.entity.Student selectByUserId(Long userId);

    @Update("UPDATE `student` SET school = #{school}, college = #{college}, grade = #{grade}, class_name = #{className}, major = #{major}, " +
            "company_id = #{companyId}, age = #{age}, education = #{education}, bio = #{bio}, job_status = #{jobStatus}, " +
            "job_direction = #{jobDirection}, intent_city = #{intentCity}, expected_salary = #{expectedSalary}, radar_id = #{radarId} " +
            "WHERE user_id = #{userId}")
    int update(com.offercat.user.entity.Student student);
}