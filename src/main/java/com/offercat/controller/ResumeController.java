package com.offercat.controller;

import com.offercat.infrastructure.common.ResponseResult;
import com.offercat.entity.Resume;
import com.offercat.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 简历控制器
 * 提供简历管理相关的RESTful API接口，包括PDF导出功能
 */
@RestController
@RequestMapping("/v1/resume")
@CrossOrigin(origins = "*")
public class ResumeController {
    
    @Autowired
    private ResumeService resumeService;
    
    /**
     * 获取学生简历列表
     * @param studentId 学生ID
     * @return 简历列表
     */
    @GetMapping("/list/{studentId}")
    public ResponseResult<List<Resume>> getResumeList(@PathVariable Long studentId) {
        List<Resume> resumes = resumeService.getResumeList(studentId);
        return ResponseResult.success(resumes);
    }
    
    /**
     * 获取简历详情
     * @param resumeId 简历ID
     * @return 简历详情
     */
    @GetMapping("/{resumeId}")
    public ResponseResult<Resume> getResumeById(@PathVariable Long resumeId) {
        Resume resume = resumeService.getResumeById(resumeId);
        if (resume != null) {
            return ResponseResult.success(resume);
        } else {
            return ResponseResult.notFound("简历不存在");
        }
    }
    
    /**
     * 创建简历
     * @param resume 简历信息
     * @return 创建的简历
     */
    @PostMapping
    public ResponseResult<Resume> createResume(@RequestBody Resume resume) {
        try {
            Resume created = resumeService.createResume(resume);
            return ResponseResult.success(created);
        } catch (Exception e) {
            return ResponseResult.internalError("创建简历失败：" + e.getMessage());
        }
    }
    
    /**
     * 更新简历
     * @param resume 简历信息
     * @return 更新后的简历
     */
    @PutMapping
    public ResponseResult<Resume> updateResume(@RequestBody Resume resume) {
        try {
            Resume updated = resumeService.updateResume(resume);
            if (updated != null) {
                return ResponseResult.success(updated);
            } else {
                return ResponseResult.notFound("简历不存在");
            }
        } catch (Exception e) {
            return ResponseResult.internalError("更新简历失败：" + e.getMessage());
        }
    }
    
    /**
     * 删除简历
     * @param resumeId 简历ID
     * @return 删除结果
     */
    @DeleteMapping("/{resumeId}")
    public ResponseResult<Void> deleteResume(@PathVariable Long resumeId) {
        boolean success = resumeService.deleteResume(resumeId);
        if (success) {
            return ResponseResult.success();
        } else {
            return ResponseResult.notFound("简历不存在");
        }
    }
    
    /**
     * 导出简历为PDF
     * @param resumeId 简历ID
     * @return PDF文件
     */
    @GetMapping("/export/{resumeId}")
    public ResponseEntity<byte[]> exportResumeToPdf(@PathVariable Long resumeId) {
        byte[] pdfBytes = resumeService.exportResumeToPdf(resumeId);
        
        if (pdfBytes == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body("简历不存在".getBytes());
        }
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "resume_" + resumeId + ".pdf");
        
        return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
    }
}