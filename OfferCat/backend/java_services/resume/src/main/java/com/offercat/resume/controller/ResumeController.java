package com.offercat.resume.controller;

import com.offercat.resume.entity.Resume;
import com.offercat.resume.entity.dto.ResumeDiagnoseRequest;
import com.offercat.resume.entity.dto.ResumeDiagnoseResult;
import com.offercat.resume.entity.dto.ResumeGenerateRequest;
import com.offercat.resume.entity.dto.ResumeStatsResponse;
import com.offercat.resume.service.ResumeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/*
 * 简历控制器
 * 功能：处理简历相关的HTTP请求
 * 实现：提供简历的CRUD、AI生成、AI诊断等接口
 */
@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    // 简历服务
    private final ResumeService resumeService;

    /*
     * 创建简历
     * 输入：简历对象
     * 输出：创建的简历对象
     */
    @PostMapping("/create")
    public ResponseEntity<Resume> createResume(@RequestBody Resume resume) {
        // 调用服务创建简历
        Resume createdResume = resumeService.createResume(resume);
        // 返回创建的简历
        return ResponseEntity.ok(createdResume);
    }

    /*
     * 更新简历
     * 输入：简历对象
     * 输出：更新后的简历对象
     */
    @PutMapping("/update")
    public ResponseEntity<Resume> updateResume(@RequestBody Resume resume) {
        // 调用服务更新简历
        Resume updatedResume = resumeService.updateResume(resume);
        // 返回更新后的简历
        return ResponseEntity.ok(updatedResume);
    }

    /*
     * 删除简历
     * 输入：简历ID
     * 输出：是否删除成功
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Boolean> deleteResume(@PathVariable Long id) {
        // 调用服务删除简历
        boolean result = resumeService.deleteResume(id);
        // 返回删除结果
        return ResponseEntity.ok(result);
    }

    /*
     * 获取单个简历
     * 输入：简历ID
     * 输出：简历对象
     */
    @GetMapping("/get/{id}")
    public ResponseEntity<Resume> getResume(@PathVariable Long id) {
        // 调用服务获取简历
        Resume resume = resumeService.getResume(id);
        // 返回简历
        return ResponseEntity.ok(resume);
    }

    /*
     * 获取用户的简历列表
     * 输入：用户ID
     * 输出：简历列表
     */
    @GetMapping("/list/{userId}")
    public ResponseEntity<List<Resume>> getResumeList(@PathVariable Long userId) {
        // 调用服务获取简历列表
        List<Resume> resumes = resumeService.getResumeList(userId);
        // 返回简历列表
        return ResponseEntity.ok(resumes);
    }

    /*
     * 启用简历
     * 输入：简历ID
     * 输出：更新后的简历对象
     */
    @PostMapping("/enable/{id}")
    public ResponseEntity<Resume> enableResume(@PathVariable Long id) {
        // 调用服务启用简历
        Resume resume = resumeService.enableResume(id);
        // 返回更新后的简历
        return ResponseEntity.ok(resume);
    }

    /*
     * 禁用简历
     * 输入：简历ID
     * 输出：更新后的简历对象
     */
    @PostMapping("/disable/{id}")
    public ResponseEntity<Resume> disableResume(@PathVariable Long id) {
        // 调用服务禁用简历
        Resume resume = resumeService.disableResume(id);
        // 返回更新后的简历
        return ResponseEntity.ok(resume);
    }

    /*
     * AI生成简历
     * 输入：生成请求对象
     * 输出：生成的简历对象
     */
    @PostMapping("/ai/generate")
    public ResponseEntity<Resume> generateResume(@RequestBody ResumeGenerateRequest request) {
        // 调用服务生成简历
        Resume resume = resumeService.generateResume(request);
        // 返回生成的简历
        return ResponseEntity.ok(resume);
    }

    /*
     * AI诊断简历
     * 输入：诊断请求对象
     * 输出：诊断结果
     */
    @PostMapping("/ai/diagnose")
    public ResponseEntity<ResumeDiagnoseResult> diagnoseResume(@RequestBody ResumeDiagnoseRequest request) {
        // 调用服务诊断简历
        ResumeDiagnoseResult result = resumeService.diagnoseResume(request);
        // 返回诊断结果
        return ResponseEntity.ok(result);
    }

    /*
     * 导出简历为PDF
     * 输入：简历ID
     * 输出：PDF文件字节数组
     */
    @GetMapping("/export/pdf/{id}")
    public ResponseEntity<byte[]> exportResumeToPdf(@PathVariable Long id) {
        // 调用服务导出PDF
        byte[] pdfBytes = resumeService.exportResumeToPdf(id);
        // 如果PDF生成成功
        if (pdfBytes != null) {
            // 设置响应头
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "简历.pdf");
            headers.setContentLength(pdfBytes.length);
            // 返回PDF文件
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);
        } else {
            // PDF生成失败
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /*
     * 获取简历统计数据
     * 输入：用户ID
     * 输出：简历统计响应对象
     */
    @GetMapping("/stats/{userId}")
    public ResponseEntity<ResumeStatsResponse> getResumeStats(@PathVariable Long userId) {
        // 调用服务获取简历统计数据
        ResumeStatsResponse stats = resumeService.getResumeStats(userId);
        // 返回统计数据
        return ResponseEntity.ok(stats);
    }

    /*
     * 上传附件简历
     * 输入：用户ID、文件
     * 输出：上传的简历对象
     */
    @PostMapping("/upload")
    public ResponseEntity<Resume> uploadResume(@RequestParam Long userId, @RequestParam MultipartFile file) {
        // 调用服务上传简历
        Resume resume = resumeService.uploadResume(userId, file);
        // 返回上传的简历
        return ResponseEntity.ok(resume);
    }
}
