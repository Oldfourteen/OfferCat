package com.offercat.student.dao;

import com.offercat.student.entity.ProjectExperience;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 项目经验映射器
 * 功能：提供项目经验相关的数据库操作
 */
@Mapper
public interface ProjectExperienceMapper {
    List<ProjectExperience> getByStudentId(@Param("studentId") Long studentId);
    int insert(ProjectExperience project);
    int update(ProjectExperience project);
    int delete(@Param("projectId") Long projectId, @Param("studentId") Long studentId);
}
