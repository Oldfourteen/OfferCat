package com.offercat.student.dao;

import com.offercat.student.entity.InternshipExperience;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 实习经历映射器
 * 功能：提供实习经历相关的数据库操作
 */
@Mapper
public interface InternshipExperienceMapper {
    /**
     * 根据学生 ID 获取实习经历列表
     * @param studentId 学生 ID
     * @return 实习经历列表
     */ 
    List<InternshipExperience> getByStudentId(@Param("studentId") Long studentId);
    int insert(InternshipExperience internship);
    int update(InternshipExperience internship);
    int delete(@Param("internshipId") Long internshipId, @Param("studentId") Long studentId);
}
