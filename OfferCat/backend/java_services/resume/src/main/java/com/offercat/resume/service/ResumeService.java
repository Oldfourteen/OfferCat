package com.offercat.resume.service;

import com.offercat.resume.entity.Resume;
import com.offercat.resume.entity.dto.PdfExportConfig;
import com.offercat.resume.entity.dto.ResumeDiagnoseRequest;
import com.offercat.resume.entity.dto.ResumeDiagnoseResult;
import com.offercat.resume.entity.dto.ResumeGenerateRequest;
import com.offercat.resume.entity.dto.ResumeHighlightResponse;
import com.offercat.resume.entity.dto.ResumeStatsResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * 简历服务接口
 * 功能：定义简历相关的服务方法
 * 实现：由ResumeServiceImpl实现具体逻辑
 */
public interface ResumeService {

    /**
     * 创建简历
     * 输入：简历对象
     * 输出：创建的简历对象
     */
    Resume createResume(Resume resume);

    /**
     * 更新简历
     * 输入：简历对象
     * 输出：更新后的简历对象
     */
    Resume updateResume(Resume resume);

    /**
     * 删除简历
     * 输入：简历ID
     * 输出：是否删除成功
     */
    boolean deleteResume(Long id);

    /**
     * 获取单个简历
     * 输入：简历ID
     * 输出：简历对象
     */
    Resume getResume(Long id);

    /**
     * 获取用户的简历列表
     * 输入：用户ID
     * 输出：简历列表
     */
    List<Resume> getResumeList(Long userId);

    /**
     * 启用简历
     * 输入：简历ID
     * 输出：更新后的简历对象
     */
    Resume enableResume(Long id);

    /**
     * 禁用简历
     * 输入：简历ID
     * 输出：更新后的简历对象
     */
    Resume disableResume(Long id);

    /**
     * AI生成简历
     * 输入：生成请求对象
     * 输出：生成的简历对象
     */
    Resume generateResume(ResumeGenerateRequest request);

    /**
     * AI诊断简历
     * 输入：诊断请求对象
     * 输出：诊断结果
     */
    ResumeDiagnoseResult diagnoseResume(ResumeDiagnoseRequest request);

    /**
     * 导出简历为PDF（使用Java本地生成）
     * 输入：简历ID
     * 输出：PDF文件的字节数组
     */
    byte[] exportResumeToPdf(Long id);

    /**
     * 导出简历为PDF（使用Java本地生成，自定义配置）
     * 输入：简历ID、PDF导出配置
     * 输出：PDF文件的字节数组
     */
    byte[] exportResumeToPdf(Long id, PdfExportConfig config);

    /**
     * 使用C++服务导出简历为PDF
     * 输入：简历ID、关键词列表
     * 输出：PDF文件的字节数组
     */
    byte[] exportResumeToPdfWithCpp(Long id, String[] keywords);

    /**
     * 使用C++服务导出简历为PDF（可指定高亮引擎）
     * 输入：简历ID、关键词列表、高亮引擎（naive/ac）
     * 输出：PDF文件的字节数组
     */
    byte[] exportResumeToPdfWithCpp(Long id, String[] keywords, String highlightEngine);

    /**
     * 使用C++服务对简历进行关键词高亮
     * 输入：简历ID、关键词列表
     * 输出：高亮结果响应对象
     */
    ResumeHighlightResponse highlightResume(Long id, String[] keywords);

    /**
     * 获取简历统计数据
     * 输入：用户ID
     * 输出：简历统计响应对象
     */
    ResumeStatsResponse getResumeStats(Long userId);

    /**
     * 上传附件简历
     * 输入：用户ID、文件
     * 输出：上传的简历对象
     */
    Resume uploadResume(Long userId, MultipartFile file);

    /**
     * 上传简历头像
     * 输入：简历ID、头像文件
     * 输出：更新后的简历对象
     */
    Resume uploadResumeAvatar(Long resumeId, MultipartFile file);

    /**
     * 获取简历头像
     * 输入：简历ID
     * 输出：头像文件字节数组
     */
    byte[] getResumeAvatar(Long resumeId);
}
