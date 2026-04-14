package com.offercat.Dao;

import com.offercat.entity.Resume;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 简历Mapper接口
 * 用于简历数据的CRUD操作
 */
@Mapper
public interface ResumeMapper {
    
    /**
     * 根据学生ID获取简历列表
     * @param studentId 学生ID
     * @return 简历列表
     */
    List<Resume> findByStudentId(@Param("studentId") Long studentId);
    
    /**
     * 根据ID获取简历详情
     * @param resumeId 简历ID
     * @return 简历信息
     */
    Resume findById(@Param("resumeId") Long resumeId);
    
    /**
     * 插入简历
     * @param resume 简历信息
     * @return 插入成功的记录数
     */
    int insert(Resume resume);
    
    /**
     * 更新简历
     * @param resume 简历信息
     * @return 更新成功的记录数
     */
    int update(Resume resume);
    
    /**
     * 删除简历
     * @param resumeId 简历ID
     * @return 删除成功的记录数
     */
    int deleteById(@Param("resumeId") Long resumeId);
}