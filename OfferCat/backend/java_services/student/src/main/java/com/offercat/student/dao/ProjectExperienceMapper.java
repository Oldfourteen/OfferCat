package com.offercat.student.dao;

import com.offercat.student.entity.ProjectExperience;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface ProjectExperienceMapper {
    List<ProjectExperience> getByStudentId(@Param("studentId") Long studentId);
    int insert(ProjectExperience project);
    int update(ProjectExperience project);
    int delete(@Param("projectId") Long projectId, @Param("studentId") Long studentId);
}
