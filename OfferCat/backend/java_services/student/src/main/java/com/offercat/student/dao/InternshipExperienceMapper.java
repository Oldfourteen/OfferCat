package com.offercat.student.dao;

import com.offercat.student.entity.InternshipExperience;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface InternshipExperienceMapper {
    List<InternshipExperience> getByStudentId(@Param("studentId") Long studentId);
    int insert(InternshipExperience internship);
    int update(InternshipExperience internship);
    int delete(@Param("internshipId") Long internshipId, @Param("studentId") Long studentId);
}
