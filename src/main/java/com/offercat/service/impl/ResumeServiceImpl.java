package com.offercat.service.impl;

import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import com.offercat.Dao.ResumeMapper;
import com.offercat.entity.Resume;
import com.offercat.service.ResumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.List;

/**
 * 简历服务实现类
 * 实现简历相关的业务逻辑，包括PDF导出功能
 */
@Service
public class ResumeServiceImpl implements ResumeService {
    
    @Autowired
    private ResumeMapper resumeMapper;
    
    @Override
    /**
     * 获取学生简历列表
     * 使用Redis缓存提高查询性能，缓存键为"list_" + studentId
     * @param studentId 学生ID
     * @return 简历列表
     */
    @Cacheable(value = "resumeCache", key = "'list_' + #studentId")
    public List<Resume> getResumeList(Long studentId) {
        return resumeMapper.findByStudentId(studentId);
    }
    
    @Override
    /**
     * 获取简历详情
     * 使用Redis缓存提高查询性能，缓存键为"detail_" + resumeId
     * @param resumeId 简历ID
     * @return 简历详情，如果不存在返回null
     */
    @Cacheable(value = "resumeCache", key = "'detail_' + #resumeId")
    public Resume getResumeById(Long resumeId) {
        return resumeMapper.findById(resumeId);
    }
    
    @Override
    /**
     * 创建新简历
     * 设置简历的创建时间、更新时间和默认状态（草稿）
     * 创建成功后清除所有缓存数据
     * @param resume 简历信息
     * @return 创建的简历信息
     */
    @CacheEvict(value = "resumeCache", allEntries = true)
    public Resume createResume(Resume resume) {
        LocalDateTime now = LocalDateTime.now();
        resume.setCreateTime(now);
        resume.setUpdateTime(now);
        resume.setResumeStatus(1); // 默认状态为草稿
        
        resumeMapper.insert(resume);
        return resume;
    }
    
    @Override
    /**
     * 更新简历信息
     * 验证简历是否存在，保留创建时间，更新修改时间
     * 更新成功后清除所有缓存数据
     * @param resume 简历信息
     * @return 更新后的简历信息，如果简历不存在返回null
     */
    @CacheEvict(value = "resumeCache", allEntries = true)
    public Resume updateResume(Resume resume) {
        Resume existing = resumeMapper.findById(resume.getResumeId());
        if (existing != null) {
            resume.setCreateTime(existing.getCreateTime()); // 保留原始创建时间
            resume.setUpdateTime(LocalDateTime.now()); // 更新修改时间
            resumeMapper.update(resume);
            return resume;
        }
        return null;
    }
    
    @Override
    /**
     * 删除简历
     * 删除成功后清除所有缓存数据
     * @param resumeId 简历ID
     * @return 是否删除成功
     */
    @CacheEvict(value = "resumeCache", allEntries = true)
    public boolean deleteResume(Long resumeId) {
        int result = resumeMapper.deleteById(resumeId);
        return result > 0;
    }
    
    @Override
    /**
     * 导出简历为PDF文件
     * 使用iText7库生成PDF文档，包含简历的关键信息
     * @param resumeId 简历ID
     * @return PDF文件的字节数组，如果简历不存在返回null
     */
    public byte[] exportResumeToPdf(Long resumeId) {
        // 查询简历信息
        Resume resume = resumeMapper.findById(resumeId);
        if (resume == null) {
            return null;
        }
        
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        
        try {
            // 创建PDF文档对象
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);
            
            // 设置默认字体
            PdfFont font = PdfFontFactory.createFont();
            document.setFont(font);
            
            // 添加简历标题
            Paragraph title = new Paragraph("个人简历")
                .setFontSize(20)
                .setTextAlignment(TextAlignment.CENTER)
                .setBold();
            document.add(title);
            
            // 添加专业技能部分
            if (resume.getSkills() != null && !resume.getSkills().isEmpty()) {
                document.add(new Paragraph("\n专业技能").setFontSize(16).setBold());
                document.add(new Paragraph(resume.getSkills()).setFont(font));
            }
            
            // 添加项目经历部分
            if (resume.getProjectExperience() != null && !resume.getProjectExperience().isEmpty()) {
                document.add(new Paragraph("\n项目经历").setFontSize(16).setBold());
                document.add(new Paragraph(resume.getProjectExperience()).setFont(font));
            }
            
            // 添加综合评价部分
            if (resume.getSelfEvaluation() != null && !resume.getSelfEvaluation().isEmpty()) {
                document.add(new Paragraph("\n综合评价").setFontSize(16).setBold());
                document.add(new Paragraph(resume.getSelfEvaluation()).setFont(font));
            }
            
            // 添加AI评估部分
            if (resume.getAiScore() != null) {
                document.add(new Paragraph("\nAI评估").setFontSize(16).setBold());
                document.add(new Paragraph("评估分数: " + resume.getAiScore()).setFont(font));
                
                if (resume.getAiEvaluation() != null && !resume.getAiEvaluation().isEmpty()) {
                    document.add(new Paragraph("评估意见: " + resume.getAiEvaluation()).setFont(font));
                }
            }
            
            // 关闭文档，确保内容写入输出流
            document.close();
            
        } catch (Exception e) {
            // 记录异常信息，确保服务稳定性
            e.printStackTrace();
        }
        
        return outputStream.toByteArray();
    }
}