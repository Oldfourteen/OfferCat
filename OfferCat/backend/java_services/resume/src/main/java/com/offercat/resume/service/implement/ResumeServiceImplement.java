package com.offercat.resume.service.implement;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.kernel.pdf.canvas.PdfCanvas;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.offercat.resume.client.AiServiceClient;
import com.offercat.resume.dao.ResumeMapper;
import com.offercat.resume.entity.Resume;
import com.offercat.resume.entity.dto.PdfExportConfig;
import com.offercat.resume.entity.dto.ResumeDiagnoseRequest;
import com.offercat.resume.entity.dto.ResumeDiagnoseResult;
import com.offercat.resume.entity.dto.ResumeGenerateRequest;
import com.offercat.resume.entity.dto.ResumeStatsResponse;
import com.offercat.resume.service.ResumeService;
import org.springframework.web.multipart.MultipartFile;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

/**
 * 简历服务实现类
 * 功能：提供简历相关的业务逻辑
 */
@Slf4j
@Service
@RequiredArgsConstructor// 注入 final 类型的字段
public class ResumeServiceImplement implements ResumeService {
    /**
     * 简历数据访问层
     */

    private final ResumeMapper resumeMapper;// 注入简历数据访问层
    private final AiServiceClient aiServiceClient;// 注入AI服务客户端

    /**
     * 创建简历
     * 输入：简历对象
     * 输出：创建的简历对象
     */
    @Override
    public Resume createResume(Resume resume) {// 创建简历
        resume.setResumeStatus(1);
        resume.setCreateTime(LocalDateTime.now());
        resume.setUpdateTime(LocalDateTime.now());
        resumeMapper.insert(resume);
        return resume;
    }

    /**
     * 更新简历
     * 输入：简历对象
     * 输出：更新后的简历对象
     */
    @Override
    public Resume updateResume(Resume resume) {// 更新简历
        resume.setUpdateTime(LocalDateTime.now());
        resumeMapper.update(resume);
        return resume;
    }

    /**
     * 删除简历
     * 输入：简历ID
     * 输出：是否删除成功
     */
    @Override
    public boolean deleteResume(Long id) {// 删除简历
        int result = resumeMapper.deleteById(id);
        return result > 0;
    }

    /**
     * 获取简历
     * 输入：简历ID
     * 输出：简历对象
     */
    @Override
    public Resume getResume(Long id) {// 获取简历
        return resumeMapper.findById(id);
    }

    /**
     * 获取简历列表
     * 输入：用户ID
     * 输出：简历列表
     */
    @Override
    public List<Resume> getResumeList(Long userId) {// 获取简历列表
        return resumeMapper.findByUserId(userId);
    }

    /**
     * 启用简历
     * 输入：简历ID
     * 输出：启用后的简历对象
     */
    @Override
    public Resume enableResume(Long id) {// 启用简历
        Resume resume = resumeMapper.findById(id);
        if (resume != null) {
            resume.setResumeStatus(1);
            resume.setUpdateTime(LocalDateTime.now());
            resumeMapper.update(resume);
        }
        return resume;
    }

    /**
     * 禁用简历
     * 输入：简历ID
     * 输出：禁用后的简历对象
     */
    @Override
    public Resume disableResume(Long id) {// 禁用简历
        Resume resume = resumeMapper.findById(id);
        if (resume != null) {
            resume.setResumeStatus(0);
            resume.setUpdateTime(LocalDateTime.now());
            resumeMapper.update(resume);
        }
        return resume;
    }

    /**
     * 生成简历
     * 输入：生成简历请求
     * 输出：生成的简历对象
     */
    @Override
    public Resume generateResume(ResumeGenerateRequest request) {// 生成简历
        String aiResult = aiServiceClient.generateResume(
                request.getTargetPosition(),
                request.getStudentInfo()
        );

        Resume resume = new Resume();
        resume.setUserId(request.getStudentId());
        resume.setAiEvaluation(aiResult);// AI评估结果
        resume.setResumeStatus(1);// 状态：启用
        resume.setCreateTime(LocalDateTime.now());
        resume.setUpdateTime(LocalDateTime.now());

        resumeMapper.insert(resume);
        return resume;
    }

    /**
     * 诊断简历
     * 输入：诊断简历请求
     * 输出：诊断结果
     */
    @Override
    public ResumeDiagnoseResult diagnoseResume(ResumeDiagnoseRequest request) {// 诊断简历  
        Resume resume = resumeMapper.findById(request.getResumeId());
        if (resume == null) {
            return null;
        }

        String resumeContent = buildResumeContent(resume);// 构建简历内容
        if (resumeContent == null) {
            return null;
        }
        String aiResult = aiServiceClient.diagnoseResume(
                resumeContent,
                request.getTargetPosition()
        );

        ResumeDiagnoseResult result = new ResumeDiagnoseResult();// 诊断结果
        result.setResumeId(request.getResumeId());// 简历ID
        
        /**
         * 从AI返回的结果中提取分数
         */
        Integer score = extractScoreFromAiResult(aiResult);
        result.setScore(score);
        result.setDiagnosis(aiResult);
        result.setSuggestions("根据AI分析结果进行优化");

        resume.setAiScore(score.doubleValue());
        resume.setAiEvaluation(aiResult);// AI评估结果
        resume.setUpdateTime(LocalDateTime.now());
        resumeMapper.update(resume);

        return result;
    }

    /**
     * 导出简历PDF
     * 输入：简历ID
     * 输出：PDF字节数组
     */
    @Override
    public byte[] exportResumeToPdf(Long id) {// 导出简历PDF
        return exportResumeToPdf(id, PdfExportConfig.defaultA4Config());
    }

    /**
     * 导出简历PDF
     * 输入：简历ID和导出配置
     * 输出：PDF字节数组
     */
    @Override
    public byte[] exportResumeToPdf(Long id, PdfExportConfig config) {/** 导出简历PDF */
        
        Resume resume = resumeMapper.findById(id);
        if (resume == null) {
            return null;
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();/** 输出流 */
        /**
         * 导出简历PDF
         */
        
        try {
            PdfWriter writer = new PdfWriter(outputStream);/** PDF写入器 */
            PdfDocument pdfDoc = new PdfDocument(writer);/** PDF文档 */

            Document document = createDocument(pdfDoc, config);/** 创建文档 */      

                                    PdfFont font = PdfFontFactory.createFont(config.getFontName(), config.getFontEncoding(), com.itextpdf.kernel.font.PdfFontFactory.EmbeddingStrategy.PREFER_EMBEDDED);

            DeviceRgb titleColor = parseHexColor(config.getTitleColor());// 标题颜色
            DeviceRgb sectionColor = parseHexColor(config.getSectionTitleColor());// 章节标题颜色
            DeviceRgb lightGray = parseHexColor(config.getSectionBgColor());// 章节背景颜色

            Float titleFontSize = config.getTitleFontSize() != null ? config.getTitleFontSize() : 24f;// 标题字体大小
            Float bodyFontSize = config.getBodyFontSize() != null ? config.getBodyFontSize() : 10f;// 正文字体大小  
            Float sectionTitleFontSize = config.getSectionTitleFontSize() != null ? config.getSectionTitleFontSize() : 14f;

            document.add(new Paragraph(config.getResumeTitle())
                    .setFontSize(titleFontSize)// 标题字体大小
                    .setFont(font)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(titleColor)
                    .setMarginBottom(20));

            Table infoTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginBottom(20);

            addInfoCell(infoTable, "创建时间", resume.getCreateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), font, bodyFontSize);
            addInfoCell(infoTable, "更新时间", resume.getUpdateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")), font, bodyFontSize);

            document.add(infoTable);/** 添加个人信息表格 */

            addSection(document, "在校经历", resume.getCampusExperience(), sectionColor, lightGray, font, bodyFontSize, sectionTitleFontSize);
            addSection(document, "工作经历", resume.getWorkExperience(), sectionColor, lightGray, font, bodyFontSize, sectionTitleFontSize);
            addSection(document, "项目经验", resume.getProjectExperience(), sectionColor, lightGray, font, bodyFontSize, sectionTitleFontSize);
            addSection(document, "自我评价", resume.getSelfEvaluation(), sectionColor, lightGray, font, bodyFontSize, sectionTitleFontSize);

            Boolean showAiEvaluation = config.getShowAiEvaluation() != null ? config.getShowAiEvaluation() : true;
            if (showAiEvaluation && resume.getAiEvaluation() != null && !resume.getAiEvaluation().isEmpty()) {
                addSection(document, "AI评估", resume.getAiEvaluation(), sectionColor, lightGray, font, bodyFontSize, sectionTitleFontSize);
            }

            Boolean showGenerationTime = config.getShowGenerationTime() != null ? config.getShowGenerationTime() : true;
            if (showGenerationTime) {
                document.add(new Paragraph("\n生成时间: " +
                                LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                        .setFontSize(8)
                        .setTextAlignment(TextAlignment.RIGHT)
                        .setFontColor(ColorConstants.GRAY)
                        .setMarginTop(20));
            }

            document.close();

        } catch (Exception e) {
            log.error("导出简历PDF失败", e);/** 导出简历PDF失败 */
            return null;
        }

        return outputStream.toByteArray();/** 返回输出流中的字节数组 */
    }
    /**
     * 创建文档
     * 输入：PDF文档和导出配置
     * 输出：文档对象
     */
    private Document createDocument(PdfDocument pdfDoc, PdfExportConfig config) {// 创建文档
        PageSize pageSize = determinePageSize(config);// 纸张大小
        Document document = new Document(pdfDoc, pageSize);

        Float marginLeft = config.getMarginLeft() != null ? config.getMarginLeft() : 36f;
        Float marginRight = config.getMarginRight() != null ? config.getMarginRight() : 36f;
        Float marginTop = config.getMarginTop() != null ? config.getMarginTop() : 36f;
        Float marginBottom = config.getMarginBottom() != null ? config.getMarginBottom() : 36f;

        document.setMargins(marginTop, marginRight, marginBottom, marginLeft);
        return document;
    }
    /*
     * 确定纸张大小
     * 输入：导出配置
     * 输出：纸张大小
     */
    private PageSize determinePageSize(PdfExportConfig config) {
        String pageSize = config.getPageSize();
        if (pageSize == null) {
            return PageSize.A4;
        }

        switch (pageSize.toUpperCase()) {
            case "A5":
                return PageSize.A5;
            case "A4":
            default:
                return PageSize.A4;
            case "A3":
                return PageSize.A3;
            case "LETTER":
                return PageSize.LETTER;
            case "LEGAL":
                return PageSize.LEGAL;
        }
    }
    /*
     * 解析十六进制颜色
     * 输入：十六进制颜色字符串
     * 输出：DeviceRgb对象
     */
    private DeviceRgb parseHexColor(String hexColor) {// 解析十六进制颜色

        if (hexColor == null || hexColor.isEmpty()) {
            return new DeviceRgb(128, 128, 128);
        }
        try {
            if (hexColor.startsWith("#")) {
                hexColor = hexColor.substring(1);
            }
            int r = Integer.parseInt(hexColor.substring(0, 2), 16);
            int g = Integer.parseInt(hexColor.substring(2, 4), 16);
            int b = Integer.parseInt(hexColor.substring(4, 6), 16);
            return new DeviceRgb(r, g, b);
        } catch (Exception e) {
            return new DeviceRgb(128, 128, 128);
        }
    }
    /*
     * 构建简历内容
     * 输入：简历对象
     * 输出：简历内容字符串
     */
    private String buildResumeContent(Resume resume) {// 构建简历内容
        StringBuilder content = new StringBuilder();
        content.append("在校经历：").append(resume.getCampusExperience()).append("\n");
        content.append("工作经历：").append(resume.getWorkExperience()).append("\n");
        content.append("项目经验：").append(resume.getProjectExperience()).append("\n");
        content.append("自我评价：").append(resume.getSelfEvaluation());
        return content.toString();
    }
    
    /*
     * 从AI返回的结果中提取分数
     * 输入：AI返回的结果
     * 输出：分数
     */
    private Integer extractScoreFromAiResult(String aiResult) {
        if (aiResult == null || aiResult.isEmpty()) {
            return 0;
        }
        
        /** 尝试从AI返回的结果中提取分数 
        *假设AI返回的结果中包含"评分：XX分"或"分数：XX"等格式 */
        try {
            // 查找分数模式
            String[] patterns = {"评分：", "分数：", "score:", "评分:", "分数:"};
            
            for (String pattern : patterns) {
                int index = aiResult.indexOf(pattern);
                if (index != -1) {
                    int startIndex = index + pattern.length();
                    int endIndex = startIndex;
                    
                    /** 提取数字 */
                    while (endIndex < aiResult.length() && 
                           (Character.isDigit(aiResult.charAt(endIndex)) || aiResult.charAt(endIndex) == '.')) {
                        endIndex++;
                    }
                    
                    String scoreStr = aiResult.substring(startIndex, endIndex).trim();
                    if (!scoreStr.isEmpty()) {
                        double score = Double.parseDouble(scoreStr);
                        /** 确保分数在0-100之间 */
                        if (score > 100) {
                            score = 100;
                        }
                        return (int) score;
                    }
                }
            }
            
            /** 如果没有找到明确的分数，根据内容质量给出一个估算分数
            * 这里使用简单的启发式方法 */
            int estimatedScore = 70; // 基础分
            
            if (aiResult.contains("优秀") || aiResult.contains("很好")) {
                estimatedScore = 85;
            } else if (aiResult.contains("良好") || aiResult.contains("不错")) {
                estimatedScore = 75;
            } else if (aiResult.contains("一般") || aiResult.contains("需要改进")) {
                estimatedScore = 60;
            } else if (aiResult.contains("较差") || aiResult.contains("问题较多")) {
                estimatedScore = 45;
            }
            
            return estimatedScore;
            
        } catch (Exception e) {
            log.error("提取分数失败，使用默认分数", e);
            return 70; // 默认分数
        }
    }

    /**
     * 添加个人信息表格单元格
     * 输入：表格、标签、值、字体、字体大小
     * 输出：无
     */
    private void addInfoCell(Table table, String label, String value, PdfFont font, Float fontSize) {
        Cell cell = new Cell()
                .setBorder(Border.NO_BORDER)// 无边框
                .setPadding(5);
        cell.add(new Paragraph(label + ": " + (value != null ? value : "-")).setFontSize(fontSize).setFont(font));
        table.addCell(cell);// 添加个人信息表格单元格
    }



    /**
     * 添加章节
     * 输入：文档、章节标题、章节内容、章节颜色、背景颜色、字体、加粗字体、体大小、章节标题字体大小
     * 输出：无
     */
    private void addSection(Document document, String title, String content,
                           DeviceRgb sectionColor, DeviceRgb bgColor,
                           PdfFont font,
                           Float bodyFontSize, Float sectionTitleFontSize) {
        if (content != null && !content.isEmpty()) {
            document.add(new Paragraph("■ " + title)// 章节标题
                    .setFont(font)
                    .setFontSize(sectionTitleFontSize)// 章节标题字体大小
                    .setFontColor(sectionColor)
                    .setMarginTop(15)
                    .setMarginBottom(5));
            
            /** 添加章节内容表格 */
            
            Table table = new Table(1).setWidth(UnitValue.createPercentValue(100));
            Cell cell = new Cell()
                    .add(new Paragraph(content).setFontSize(bodyFontSize).setFont(font))
                    .setBackgroundColor(bgColor)
                    .setPadding(10)
                    .setBorder(new SolidBorder(new DeviceRgb(220, 220, 220), 1));
            table.addCell(cell);
            document.add(table);
        }
    }
    /**
     * 获取学生简历统计信息
     * 输入：学生ID
     * 输出：简历统计信息对象
     */
    @Override
    public ResumeStatsResponse getResumeStats(Long userId) {
        ResumeStatsResponse response = new ResumeStatsResponse();
        
        /** 获取用户的简历列表 */
        List<Resume> resumes = resumeMapper.findByUserId(userId);
        
        /** 计算总简历数 */
        response.setTotalResumes(resumes.size());
        
        /** 计算近30天练习数 */
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        long recentDeliveries = resumes.stream()
                .filter(resume -> resume.getUpdateTime().isAfter(thirtyDaysAgo))
                .count();
        response.setRecentDeliveries((int) recentDeliveries);
        
        /** 计算简历完善度 */
        if (resumes.isEmpty()) {
            response.setCompletion(0);
        } else {
            /** 取最新的简历计算完善度 */
            Resume latestResume = resumes.stream()
                    .max((r1, r2) -> r1.getUpdateTime().compareTo(r2.getUpdateTime()))
                    .orElse(null);
            
            /** 计算简历完善度 */
            if (latestResume != null) {
                int completion = 0;
                int totalFields = 4; // 在校经历、项目经验、自我评价、照片
                
                if (latestResume.getCampusExperience() != null && !latestResume.getCampusExperience().isEmpty()) {
                    completion++;
                }
                if (latestResume.getProjectExperience() != null && !latestResume.getProjectExperience().isEmpty()) {
                    completion++;
                }
                if (latestResume.getSelfEvaluation() != null && !latestResume.getSelfEvaluation().isEmpty()) {
                    completion++;
                }
                if (latestResume.getPhoto() != null && !latestResume.getPhoto().isEmpty()) {
                    completion++;
                }
                
                response.setCompletion((completion * 100) / totalFields);
            } else {
                response.setCompletion(0);
            }
        }
        
        return response;
    }
    /**
     * 上传简历
     * 输入：学生ID、简历文件
     * 输出：上传的简历对象
     */
    @Override
    public Resume uploadResume(Long userId, MultipartFile file) {
        /** 验证文件类型 */
        String contentType = file.getContentType();
        if (!contentType.equals("application/pdf") && !contentType.equals("application/msword") && !contentType.equals("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
            throw new IllegalArgumentException("只支持 PDF 和 Word 格式的文件");
        }
        
        /** 生成文件存储路径 */
        String fileName = file.getOriginalFilename();
        String uploadDir = "g:/uploads/resumes/" + userId;
        File dir = new File(uploadDir);
        
        /** 创建目录（如果不存在） */
        if (!dir.exists()) {
            if (!dir.mkdirs()) {
                log.error("创建目录失败: {}", uploadDir);
                throw new RuntimeException("创建存储目录失败");
            }
        }
        
        /** 完整的文件路径 */
        String filePath = uploadDir + "/" + fileName;
        File destFile = new File(filePath);
        
        /** 保存文件 */
        try {
            log.info("保存文件: {}", filePath);
            file.transferTo(destFile);
        } catch (Exception e) {
            log.error("文件上传失败", e);
            throw new RuntimeException("文件上传失败", e);
        }
        
        /** 创建简历记录 */
        Resume resume = new Resume();
        resume.setUserId(userId);
        resume.setProjectExperience("附件简历");
        resume.setSelfEvaluation("附件简历");
        resume.setResumeStatus(1);
        resume.setCreateTime(LocalDateTime.now());
        resume.setUpdateTime(LocalDateTime.now());
        
        /** 保存到数据库 */
        resumeMapper.insert(resume);
        
        return resume;
    }
}