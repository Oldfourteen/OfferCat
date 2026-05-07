package com.offercat.ai._service.implement;

import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.colors.DeviceRgb;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.borders.SolidBorder;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import com.offercat.ai._service.AiInterviewService;
import com.offercat.ai._service.AiServiceClient;
import com.offercat.ai.dao.*;
import com.offercat.ai.entity.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class AiInterviewServiceImplement implements AiInterviewService {

    // 面试会话数据访问对象
    private final InterviewSessionMapper sessionMapper;
    // 答题记录数据访问对象
    private final StudentAnswerRecordMapper answerRecordMapper;
    // 评估报告数据访问对象
    private final AiReportMapper reportMapper;
    // AI服务客户端
    private final AiServiceClient aiServiceClient;
    // 对话计数器服务
    private final ConversationCounterService conversationCounterService;

    /*
     * 初始化面试会话
     * 输入：学生ID、目标岗位、面试模式、总题目数
     * 输出：创建的面试会话对象
     * 实现：创建会话对象，设置默认值，保存到数据库
     */
    @Override
    public InterviewSession initSession(Long studentId, String targetPosition, Integer mode, Integer totalQuestions) {
        // 创建会话对象
        InterviewSession session = new InterviewSession();
        // 设置学生ID
        session.setStudentId(studentId);
        // 设置目标岗位
        session.setTargetPosition(targetPosition);
        // 设置面试模式，默认1（模拟面试）
        session.setInterviewMode(mode != null ? mode : 1);
        // 设置总题目数，默认10题
        session.setTotalQuestions(totalQuestions != null ? totalQuestions : 10);
        // 初始已答题数为0
        session.setAnsweredQuestions(0);
        // 初始难度级别为2（中等）
        session.setDifficultyLevel(2);
        // 初始状态为1（进行中）
        session.setSessionStatus(1);
        // 设置初始面试阶段为笔试
        session.setCurrentStage("WRITTEN");
        // 设置开始时间
        session.setStartTime(LocalDateTime.now());
        // 设置创建时间
        session.setCreateTime(LocalDateTime.now());
        // 设置更新时间
        session.setUpdateTime(LocalDateTime.now());
        // 保存到数据库
        sessionMapper.insert(session);
        // 初始化对话计数器
        conversationCounterService.initCounter(session.getSessionId());
        // 返回创建的会话
        return session;
    }

    /*
     * 获取学生的面试历史记录
     * 输入：学生ID
     * 输出：面试会话列表，按创建时间倒序
     * 实现：直接调用数据库查询方法
     */
    @Override
    public List<InterviewSession> getSessionHistory(Long studentId) {
        // 查询学生的所有面试会话，按创建时间倒序
        return sessionMapper.findByStudentIdOrderByCreateTimeDesc(studentId);
    }

    /*
     * 获取单个面试会话
     * 输入：会话ID
     * 输出：面试会话对象
     * 实现：根据ID查询数据库
     */
    @Override
    public InterviewSession getSession(Long sessionId) {
        // 根据ID查询会话
        return sessionMapper.findById(sessionId);
    }

    /*
     * 结束面试会话
     * 输入：会话ID
     * 输出：更新后的面试会话对象
     * 实现：查询会话，更新状态为已结束，设置结束时间
     */
    @Override
    public InterviewSession endSession(Long sessionId) {
        // 根据ID查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话存在且状态是进行中
        if (session != null && session.getSessionStatus() == 1) {
            // 设置状态为已结束
            session.setSessionStatus(0);
            // 设置结束时间
            session.setEndTime(LocalDateTime.now());
            // 更新时间
            session.setUpdateTime(LocalDateTime.now());
            // 保存更新
            sessionMapper.update(session);
            // 移除对话计数器
            conversationCounterService.removeCounter(sessionId);
        }
        // 返回更新后的会话
        return session;
    }

    /*
     * 获取面试题目列表
     * 输入：会话ID、题目数量
     * 输出：题目列表
     * 实现：调用AI API生成题目
     */
    @Override
    public List<AiQuestionBank> getQuestions(Long sessionId, Integer count) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回空列表
        if (session == null) {
            return Collections.emptyList();
        }
        
        // 调用AI API生成题目
        List<AiQuestionBank> questions = generateQuestionsByAi(session, count != null ? count : session.getTotalQuestions());
        // 返回题目列表
        return questions;
    }

    /*
     * 获取下一道面试题目
     * 输入：会话ID
     * 输出：题目对象
     * 实现：调用AI API生成下一道题目
     */
    @Override
    public AiQuestionBank getNextQuestion(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在或已答完所有题目，返回null
        if (session == null || session.getAnsweredQuestions() >= session.getTotalQuestions()) {
            return null;
        }
        
        // 调用AI API生成下一道题目
        List<AiQuestionBank> questions = generateQuestionsByAi(session, 1);
        // 如果有题目，返回第一题
        if (!questions.isEmpty()) {
            return questions.get(0);
        }
        // 没有题目返回null
        return null;
    }

    /*
     * 提交面试答案
     * 输入：会话ID、题目ID、用户答案
     * 输出：答题记录对象
     * 实现：查询会话，创建答题记录，调用AI评分，保存记录并更新已答题数
     */
    @Override
    public StudentAnswerRecord submitAnswer(Long sessionId, Long questionId, String userAnswer) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在或已结束，返回null
        if (session == null || session.getSessionStatus() == 0) {
            return null;
        }

        // 创建答题记录
        StudentAnswerRecord record = new StudentAnswerRecord();
        // 设置学生ID
        record.setStudentId(session.getStudentId());
        // 设置题目ID
        record.setQuestionId(questionId);
        // 设置用户答案
        record.setUserAnswer(userAnswer);
        // 设置答题时间
        record.setAnswerTime(LocalDateTime.now());

        // 调用AI服务进行评分
        String aiResult = aiServiceClient.evaluateAnswer(
                "面试题目",
                userAnswer,
                "核心要点"
        );

        // 设置AI评分（暂时设为0，实际由AI返回）
        record.setAiScore(0);
        // 设置AI反馈
        record.setAiFeedback(aiResult);

        // 保存答题记录
        answerRecordMapper.insert(record);
        // 增加已答题数
        sessionMapper.incrementAnswered(sessionId);
        // 增加对话计数
        conversationCounterService.incrementCounter(sessionId);

        // 返回答题记录
        return record;
    }

    /*
     * 发送面试消息（用于实时对话）
     * 输入：会话ID、消息内容
     * 输出：AI回复内容
     * 实现：调用AI API生成回复，增加对话计数
     */
    @Override
    public String sendMessage(Long sessionId, String message) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在或已结束，返回错误信息
        if (session == null || session.getSessionStatus() == 0) {
            return "会话不存在或已结束";
        }

        // 调用AI API生成回复
        String aiResponse = aiServiceClient.evaluateAnswer(
                "面试对话",
                message,
                "对话上下文"
        );
        // 增加对话计数
        conversationCounterService.incrementCounter(sessionId);
        // 返回AI回复
        return aiResponse;
    }

    /*
     * 获取对话计数
     * 输入：会话ID
     * 输出：当前对话计数
     */
    @Override
    public int getMessageCount(Long sessionId) {
        return conversationCounterService.getCounter(sessionId);
    }

    /*
     * 获取会话的答题记录
     * 输入：会话ID
     * 输出：答题记录列表
     * 实现：查询会话，然后查询该学生的所有答题记录
     */
    @Override
    public List<StudentAnswerRecord> getSessionAnswers(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回空列表
        if (session == null) {
            return Collections.emptyList();
        }
        // 查询该学生的所有答题记录
        return answerRecordMapper.findByStudentId(session.getStudentId());
    }

    /*
     * 生成面试评估报告
     * 输入：会话ID
     * 输出：评估报告对象
     * 实现：查询会话和答题记录，调用AI生成报告，保存报告并结束会话
     */
    @Override
    public AiReport generateReport(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回null
        if (session == null) {
            return null;
        }
        // 查询该学生的答题记录
        List<StudentAnswerRecord> answers = answerRecordMapper.findByStudentId(session.getStudentId());
        // 如果没有答题记录，返回null
        if (answers.isEmpty()) {
            return null;
        }

        // 创建评估报告
        AiReport report = new AiReport();
        // 设置学生ID
        report.setStudentId(session.getStudentId());

        // 调用AI服务生成评估报告
        String aiResult = aiServiceClient.generateInterviewReport(sessionId, null);

        // 设置总分（暂时设为0，实际由AI返回）
        report.setTotalScore(0);
        // 设置优势（使用AI返回的结果）
        report.setAdvantage(aiResult);
        // 设置不足（暂时为空，实际由AI返回）
        report.setDisadvantage("");
        // 设置职业建议（暂时为空，实际由AI返回）
        report.setCareerSuggest("");
        // 设置创建时间
        report.setCreateTime(LocalDateTime.now());

        // 检查是否已有报告
        AiReport existing = reportMapper.findByStudentId(session.getStudentId());
        if (existing != null) {
            // 如果有，更新报告
            report.setReportId(existing.getReportId());
            reportMapper.update(report);
        } else {
            // 如果没有，插入新报告
            reportMapper.insert(report);
        }

        // 结束面试会话
        endSession(sessionId);
        // 返回生成的报告
        return report;
    }

    /*
     * 获取面试评估报告
     * 输入：会话ID
     * 输出：评估报告对象
     * 实现：查询会话，然后查询该学生的评估报告
     */
    @Override
    public AiReport getReport(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回null
        if (session == null) {
            return null;
        }
        // 查询该学生的评估报告
        return reportMapper.findByStudentId(session.getStudentId());
    }

    /*
     * 导出面试报告为PDF
     * 输入：会话ID
     * 输出：PDF文件的字节数组
     * 实现：查询会话、报告和答题记录，使用iText生成PDF文档
     */
    @Override
    public byte[] exportReportToPdf(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回null
        if (session == null) {
            return null;
        }

        // 查询评估报告
        AiReport report = reportMapper.findByStudentId(session.getStudentId());
        // 查询答题记录
        List<StudentAnswerRecord> answers = answerRecordMapper.findByStudentId(session.getStudentId());

        // 创建输出流
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        try {
            // 创建PDF写入器
            PdfWriter writer = new PdfWriter(outputStream);
            // 创建PDF文档
            PdfDocument pdfDoc = new PdfDocument(writer);
            // 创建文档对象，设置A4页面
            Document document = new Document(pdfDoc, PageSize.A4);
            // 设置页边距
            document.setMargins(36, 36, 36, 36);

            // 加载中文字体
            PdfFont font = getAvailableFont();
            PdfFont boldFont = getAvailableFont();

            // 检查字体是否加载成功
            if (font == null || boldFont == null) {
                log.error("字体加载失败，无法生成PDF");
                return null;
            }

            // 定义颜色
            DeviceRgb titleColor = new DeviceRgb(26, 82, 118);
            DeviceRgb sectionColor = new DeviceRgb(52, 73, 94);
            DeviceRgb lightGray = new DeviceRgb(245, 245, 245);
            DeviceRgb greenColor = new DeviceRgb(39, 174, 96);
            DeviceRgb redColor = new DeviceRgb(231, 76, 60);

            // 添加标题
            document.add(new Paragraph("面 试 评 估 报 告")
                    .setFontSize(24)
                    .setFont(boldFont)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setFontColor(titleColor)
                    .setMarginBottom(20));

            // 创建信息表格
            Table infoTable = new Table(UnitValue.createPercentArray(new float[]{1, 1}))
                    .setWidth(UnitValue.createPercentValue(100))
                    .setMarginBottom(20);

            // 添加信息行
            addInfoCell(infoTable, "学生ID", String.valueOf(session.getStudentId()), font);
            addInfoCell(infoTable, "目标岗位", session.getTargetPosition(), font);
            addInfoCell(infoTable, "面试模式", getModeText(session.getInterviewMode()), font);
            addInfoCell(infoTable, "面试状态", getStatusText(session.getSessionStatus()), font);
            addInfoCell(infoTable, "总题目数", String.valueOf(session.getTotalQuestions()), font);
            addInfoCell(infoTable, "已答题数", String.valueOf(session.getAnsweredQuestions()), font);

            // 添加表格到文档
            document.add(infoTable);

            // 如果有评估报告
            if (report != null) {
                // 添加综合评估标题
                addSectionTitle(document, "■ 综合评估", sectionColor);

                // 创建评分表格
                Table scoreTable = new Table(1).setWidth(UnitValue.createPercentValue(100));
                Cell scoreCell = new Cell()
                        .setBackgroundColor(lightGray)
                        .setPadding(15)
                        .setBorder(new SolidBorder(new DeviceRgb(220, 220, 220), 1));

                // 获取总分
                int totalScore = report.getTotalScore() != null ? report.getTotalScore() : 0;
                // 根据分数确定等级
                String scoreLevel = totalScore >= 80 ? "优秀" : totalScore >= 60 ? "良好" : "需提升";

                // 添加评分信息
                scoreCell.add(new Paragraph("综合评分: " + totalScore + " 分 (" + scoreLevel + ")")
                        .setFontSize(18)
                        .setFont(boldFont)
                        .setFontColor(totalScore >= 60 ? greenColor : redColor)
                        .setTextAlignment(TextAlignment.CENTER)
                        .setMarginBottom(10));
                scoreTable.addCell(scoreCell);
                document.add(scoreTable);

                // 添加优势分析
                if (report.getAdvantage() != null && !report.getAdvantage().isEmpty()) {
                    addSectionTitle(document, "■ 优势分析", sectionColor);
                    addContentParagraph(document, report.getAdvantage(), font, lightGray);
                }

                // 添加不足之处
                if (report.getDisadvantage() != null && !report.getDisadvantage().isEmpty()) {
                    addSectionTitle(document, "■ 不足之处", sectionColor);
                    addContentParagraph(document, report.getDisadvantage(), font, lightGray);
                }

                // 添加职业建议
                if (report.getCareerSuggest() != null && !report.getCareerSuggest().isEmpty()) {
                    addSectionTitle(document, "■ 职业建议", sectionColor);
                    addContentParagraph(document, report.getCareerSuggest(), font, lightGray);
                }
            }

            // 如果有答题记录
            if (!answers.isEmpty()) {
                // 添加答题详情标题
                addSectionTitle(document, "■ 答题详情", sectionColor);

                // 创建答题表格
                Table answerTable = new Table(UnitValue.createPercentArray(new float[]{3, 1, 2}))
                        .setWidth(UnitValue.createPercentValue(100));

                // 添加表格表头
                addTableHeader(answerTable, new String[]{"题目", "评分", "点评"}, sectionColor);

                // 遍历答题记录
                for (StudentAnswerRecord answer : answers) {
                    // 题目内容（实际应该从AI生成的题目中获取）
                    String questionContent = "面试题目 " + answer.getQuestionId();

                    // 添加题目内容
                    answerTable.addCell(createTextCell(questionContent, font, 9));
                    // 添加评分
                    answerTable.addCell(createTextCell(
                            answer.getAiScore() != null ? answer.getAiScore() + "分" : "-",
                            font, 9));
                    // 添加点评
                    answerTable.addCell(createTextCell(
                            answer.getAiFeedback() != null ? answer.getAiFeedback() : "-",
                            font, 9));
                }
                // 添加表格到文档
                document.add(answerTable);
            }

            // 添加报告生成时间
            document.add(new Paragraph("\n报告生成时间: " +
                            LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .setFontSize(8)
                    .setTextAlignment(TextAlignment.RIGHT)
                    .setFontColor(ColorConstants.GRAY)
                    .setMarginTop(20));

            // 关闭文档
            document.close();

        } catch (Exception e) {
            // 记录错误
            log.error("导出面试报告PDF失败", e);
            // 返回null
            return null;
        }

        // 返回PDF字节数组
        return outputStream.toByteArray();
    }

    /*
     * 调用AI API生成题目
     * 输入：面试会话、题目数量
     * 输出：题目列表
     * 实现：调用AI服务生成题目
     */
    private List<AiQuestionBank> generateQuestionsByAi(InterviewSession session, int count) {
        // 调用AI API生成题目
        String prompt = String.format("为%s岗位生成%d道面试题目，题目应涵盖技术能力、沟通能力、问题解决能力等方面，每道题目需要包含题目内容和参考答案", session.getTargetPosition(), count);
        String aiResponse = aiServiceClient.generateQuestions(prompt);
        
        // 解析AI返回的题目
        return parseQuestionsFromAIResponse(aiResponse, session.getStudentId());
    }
    
    /*
     * 解析AI返回的题目
     * 输入：AI响应内容、学生ID
     * 输出：题目列表
     */
    private List<AiQuestionBank> parseQuestionsFromAIResponse(String aiResponse, Long studentId) {
        List<AiQuestionBank> questions = new ArrayList<>();
        
        try {
            // 简单解析逻辑，实际应用中可能需要更复杂的解析
            String[] questionTexts = aiResponse.split("\n\n");
            
            for (int i = 0; i < questionTexts.length; i++) {
                String questionText = questionTexts[i].trim();
                if (!questionText.isEmpty()) {
                    AiQuestionBank question = new AiQuestionBank();
                    question.setQuestionContent(questionText);
                    question.setCreateTime(LocalDateTime.now());
                    questions.add(question);
                }
            }
        } catch (Exception e) {
            log.error("解析AI题目失败", e);
        }
        
        return questions;
    }

    private String getModeText(Integer mode) {
        // 如果模式为空，返回未知
        if (mode == null) return "未知";
        // 根据模式代码返回对应的中文描述
        switch (mode) {
            case 1: return "模拟面试";
            case 2: return "真题练习";
            case 3: return "专项训练";
            default: return "未知";
        }
    }


    private String getStatusText(Integer status) {
        // 如果状态为空，返回未知
        if (status == null) return "未知";
        // 根据状态代码返回对应的中文描述
        switch (status) {
            case 0: return "已结束";
            case 1: return "进行中";
            default: return "未知";
        }
    }

    /*
     * 向表格添加信息单元格
     * 输入：表格对象、标签、值、字体
     * 实现：创建单元格，添加内容，添加到表格
     */
    private void addInfoCell(Table table, String label, String value, PdfFont font) {
        // 创建单元格
        Cell cell = new Cell()
                .setBorder(Border.NO_BORDER)
                .setPadding(5);
        // 添加内容
        cell.add(new Paragraph(label + ": " + value).setFontSize(10).setFont(font));
        // 添加到表格
        table.addCell(cell);
    }

    /*
     * 添加章节标题
     * 输入：文档对象、标题、颜色
     * 实现：创建段落，设置样式，添加到文档
     */
    private void addSectionTitle(Document document, String title, DeviceRgb color) {
        // 创建段落
        document.add(new Paragraph(title)
                .setFontSize(14)
                .setFontColor(color)
                .setMarginTop(15)
                .setMarginBottom(5));
    }

    /*
     * 添加内容段落
     * 输入：文档对象、内容、字体、背景颜色
     * 实现：创建表格，添加内容单元格，添加到文档
     */
    private void addContentParagraph(Document document, String content, PdfFont font, DeviceRgb bgColor) {
        // 创建表格
        Table table = new Table(1).setWidth(UnitValue.createPercentValue(100));
        // 创建单元格
        Cell cell = new Cell()
                .add(new Paragraph(content).setFontSize(10).setFont(font))
                .setBackgroundColor(bgColor)
                .setPadding(10)
                .setBorder(new SolidBorder(new DeviceRgb(220, 220, 220), 1));
        // 添加单元格到表格
        table.addCell(cell);
        // 添加表格到文档
        document.add(table);
    }

    /*
     * 添加表格表头
     * 输入：表格对象、表头数组、背景颜色
     * 实现：遍历表头数组，创建表头单元格，添加到表格
     */
    private void addTableHeader(Table table, String[] headers, DeviceRgb bgColor) {
        // 遍历表头数组
        for (String header : headers) {
            // 创建表头单元格
            Cell cell = new Cell()
                    .add(new Paragraph(header).setFontSize(9).setTextAlignment(TextAlignment.CENTER))
                    .setBackgroundColor(bgColor)
                    .setFontColor(ColorConstants.WHITE)
                    .setPadding(5);
            // 添加到表格
            table.addCell(cell);
        }
    }

    /*
     * 创建文本单元格
     * 输入：文本内容、字体、字体大小
     * 输出：单元格对象
     * 实现：创建单元格，添加文本内容
     */
    private Cell createTextCell(String text, PdfFont font, int fontSize) {
        // 创建单元格
        return new Cell()
                .add(new Paragraph(text).setFontSize(fontSize).setFont(font))
                .setPadding(5);
    }
    
    /**
     * 获取可用的字体
     * @return 可用的字体
     */
    private PdfFont getAvailableFont() {
        String[][] fontOptions = {
            {"STSong-Light", "UniGB-UCS2-H"},
            {"SimHei"},
            {"Microsoft YaHei"},
            {"PingFang SC"},
            {"Helvetica"},
            {"Times-Roman"}
        };

        for (String[] fontOption : fontOptions) {
            try {
                if (fontOption.length == 1) {
                    return PdfFontFactory.createFont(fontOption[0]);
                } else {
                    return PdfFontFactory.createFont(fontOption[0], fontOption[1]);
                }
            } catch (Exception e) {
                log.debug("字体 {} 加载失败，尝试下一个", fontOption[0]);
            }
        }

        log.error("所有字体加载失败");
        throw new RuntimeException("字体加载失败");
    }

    /*
     * 获取当前面试阶段
     * 输入：会话ID
     * 输出：当前面试阶段
     * 实现：查询会话，返回当前阶段
     */
    @Override
    public String getCurrentStage(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话存在，返回当前阶段
        if (session != null) {
            return session.getCurrentStage();
        }
        // 会话不存在，返回null
        return null;
    }

    /*
     * 更新面试阶段
     * 输入：会话ID，面试阶段
     * 输出：更新后的面试会话对象
     * 实现：查询会话，更新阶段，保存到数据库
     */
    @Override
    public InterviewSession updateStage(Long sessionId, String stage) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话存在
        if (session != null) {
            // 更新阶段
            session.setCurrentStage(stage);
            // 更新时间
            session.setUpdateTime(LocalDateTime.now());
            // 保存到数据库
            sessionMapper.update(session);
        }
        // 返回更新后的会话
        return session;
    }

    /*
     * 进入下一面试阶段
     * 输入：会话ID
     * 输出：更新后的面试会话对象
     * 实现：查询会话，获取当前阶段，确定下一阶段，更新阶段
     */
    @Override
    public InterviewSession nextStage(Long sessionId) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回null
        if (session == null) {
            return null;
        }
        
        // 获取当前阶段
        String currentStage = session.getCurrentStage();
        // 确定下一阶段
        String nextStage = getNextStage(currentStage);
        
        // 如果有下一阶段
        if (nextStage != null) {
            // 更新阶段
            session.setCurrentStage(nextStage);
            // 更新时间
            session.setUpdateTime(LocalDateTime.now());
            // 保存到数据库
            sessionMapper.update(session);
        }
        
        // 返回更新后的会话
        return session;
    }

    /*
     * 生成阶段面试问题
     * 输入：会话ID，面试阶段
     * 输出：问题内容
     * 实现：根据面试阶段调用AI生成问题
     */
    @Override
    public String generateStageQuestion(Long sessionId, String stage) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回null
        if (session == null) {
            return null;
        }
        
        // 根据阶段生成问题
        String prompt = generateStagePrompt(session, stage);
        // 调用AI服务生成问题
        String aiResponse = aiServiceClient.generateQuestions(prompt);
        
        // 返回问题内容
        return aiResponse;
    }

    /*
     * 评估阶段面试答案
     * 输入：会话ID，面试阶段，用户答案
     * 输出：评估结果
     * 实现：根据面试阶段调用AI评估答案
     */
    @Override
    public String evaluateStageAnswer(Long sessionId, String stage, String userAnswer) {
        // 查询会话
        InterviewSession session = sessionMapper.findById(sessionId);
        // 如果会话不存在，返回null
        if (session == null) {
            return null;
        }
        
        // 根据阶段生成评估提示
        String prompt = generateEvaluationPrompt(session, stage, userAnswer);
        // 调用AI服务评估答案
        String aiResponse = aiServiceClient.evaluateAnswer("面试问题", userAnswer, prompt);
        
        // 返回评估结果
        return aiResponse;
    }

    /*
     * 获取下一面试阶段
     * 输入：当前面试阶段
     * 输出：下一面试阶段
     * 实现：根据面试流程返回下一阶段
     */
    private String getNextStage(String currentStage) {
        // 定义面试阶段的顺序
        Map<String, String> stageOrder = new HashMap<>();
        stageOrder.put("WRITTEN", "TECH_1");
        stageOrder.put("TECH_1", "TECH_2");
        stageOrder.put("TECH_2", "TECH_3_OR_MANAGER");
        stageOrder.put("TECH_3_OR_MANAGER", "HR");
        stageOrder.put("HR", "OFFER");
        stageOrder.put("OFFER", null);
        
        // 返回下一阶段
        return stageOrder.get(currentStage);
    }

    /*
     * 生成阶段问题提示
     * 输入：面试会话，面试阶段
     * 输出：提示内容
     * 实现：根据面试阶段生成对应的提示
     */
    private String generateStagePrompt(InterviewSession session, String stage) {
        switch (stage) {
            case "WRITTEN":
                return String.format("为%s岗位生成笔试题目，包括选择题、编程题等，覆盖基础知识和技能", session.getTargetPosition());
            case "TECH_1":
                return String.format("为%s岗位生成技术一面题目，包括基础知识快问快答和简历核验", session.getTargetPosition());
            case "TECH_2":
                return String.format("为%s岗位生成技术二面题目，包括项目深挖和系统设计", session.getTargetPosition());
            case "TECH_3_OR_MANAGER":
                return String.format("为%s岗位生成技术三面/主管面题目，包括跨团队协作和业务理解", session.getTargetPosition());
            case "HR":
                return "生成HR面试题目，包括求职动机、职业规划、稳定性和期望对齐等方面";
            case "OFFER":
                return "生成offer沟通确认的相关问题，包括薪资、入职时间等";
            default:
                return String.format("为%s岗位生成面试题目", session.getTargetPosition());
        }
    }

    /*
     * 生成阶段评估提示
     * 输入：面试会话，面试阶段，用户答案
     * 输出：提示内容
     * 实现：根据面试阶段生成对应的评估提示
     */
    private String generateEvaluationPrompt(InterviewSession session, String stage, String userAnswer) {
        switch (stage) {
            case "WRITTEN":
                return "评估笔试答案的正确性、完整性和思路清晰程度";
            case "TECH_1":
                return "评估技术一面答案的准确性、基础知识掌握程度和沟通能力";
            case "TECH_2":
                return "评估技术二面答案的深度、系统设计能力和问题解决能力";
            case "TECH_3_OR_MANAGER":
                return "评估技术三面/主管面答案的综合能力、协作能力和业务理解";
            case "HR":
                return "评估HR面试答案的动机匹配度、稳定性和沟通能力";
            case "OFFER":
                return "评估offer沟通的合理性和期望对齐度";
            default:
                return "评估面试答案的质量和匹配度";
        }
    }
}