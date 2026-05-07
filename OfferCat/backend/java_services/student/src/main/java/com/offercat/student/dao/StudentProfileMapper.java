package com.offercat.student.dao;

import com.offercat.student.dto.StudentProfileDTO;
import com.offercat.student.vo.StudentProfileVO;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StudentProfileMapper {

    /**
     * 获取学生个人档案信息（包含基础User信息和Student信息）
     *
     * @param studentId 学生ID
     * @return 个人档案VO
     */
    StudentProfileVO getStudentProfile(@Param("studentId") Long studentId);

    /**
     * 更新 User 表信息
     *
     * @param dto 个人档案DTO
     */
    void updateUserByStudentId(StudentProfileDTO dto);

    /**
     * 更新 Student 表信息
     *
     * @param dto 个人档案DTO
     */
    void updateStudentProfile(StudentProfileDTO dto);
}
