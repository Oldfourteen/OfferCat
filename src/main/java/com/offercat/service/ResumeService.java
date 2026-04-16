package com.offercat.service;

import com.offercat.entity.Resume;

import java.util.List;

/**
 * 简历服务接口
 * 提供简历相关的业务逻辑处理
 */
public interface ResumeService {
    
    /**
     * 获取学生简历列表
     * @param studentId 学生ID
     * @return 简历列表
     */
    List<Resume> getResumeList(Long studentId);
    
    /**
     * 获取简历详情
     * @param resumeId 简历ID
     * @return 简历详情
     */
    Resume getResumeById(Long resumeId);
    
    /**
     * 创建简历
     * @param resume 简历信息
     * @return 创建的简历
     */
    Resume createResume(Resume resume);
    
    /**
     * 更新简历
     * @param resume 简历信息
     * @return 更新后的简历
     */
    Resume updateResume(Resume resume);
    
    /**
     * 删除简历
     * @param resumeId 简历ID
     * @return 是否删除成功
     */
    boolean deleteResume(Long resumeId);
    
    /**
     * 导出简历为PDF
     * @param resumeId 简历ID
     * @return PDF文件的字节数组
     */
    byte[] exportResumeToPdf(Long resumeId);
}