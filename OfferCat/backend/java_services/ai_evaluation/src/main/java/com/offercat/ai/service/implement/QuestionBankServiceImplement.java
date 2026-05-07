package com.offercat.ai.service.implement;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.TextAlignment;
import com.offercat.ai.dao.QuestionBankMapper;
import com.offercat.ai.dao.StudentQuestionRecordMapper;
import com.offercat.ai.dto.request.QuestionBankRequest;
import com.offercat.ai.dto.request.SubmitAnswerRequest;
import com.offercat.ai.dto.response.QuestionBankResponse;
import com.offercat.ai.dto.response.SubmitAnswerResponse;
import com.offercat.ai.entity.QuestionBank;
import com.offercat.ai.entity.StudentQuestionRecord;
import com.offercat.ai.service.QuestionBankService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class QuestionBankServiceImplement implements QuestionBankService {

    private final QuestionBankMapper questionBankMapper;
    private final StudentQuestionRecordMapper studentQuestionRecordMapper;

    @Value("${question.bank.path:g:/mirror_v2_myself/back_v1/question_bank}")
    private String questionBankPath;

    @Override
    public QuestionBankResponse getQuestions(QuestionBankRequest request) {
        List<QuestionBank> questions = questionBankMapper.findBySubjectAndType(
                request.getSubject(), request.getQuestionType());

        if (questions.isEmpty()) {
            return QuestionBankResponse.builder()
                    .studentId(request.getStudentId())
                    .subject(request.getSubject())
                    .questionType(request.getQuestionType())
                    .totalQuestions(0)
                    .questions(new ArrayList<>())
                    .message("题库为空或未初始化")
                    .build();
        }

        List<QuestionBankResponse.QuestionItem> questionItems = questions.stream()
                .map(q -> QuestionBankResponse.QuestionItem.builder()
                        .questionId(q.getQuestionId())
                        .questionContent(q.getQuestionContent())
                        .optionA(q.getOptionA())
                        .optionB(q.getOptionB())
                        .optionC(q.getOptionC())
                        .optionD(q.getOptionD())
                        .build())
                .collect(Collectors.toList());

        return QuestionBankResponse.builder()
                .studentId(request.getStudentId())
                .subject(request.getSubject())
                .questionType(request.getQuestionType())
                .totalQuestions(questions.size())
                .questions(questionItems)
                .message("获取题目成功")
                .build();
    }

    @Override
    public SubmitAnswerResponse submitAnswer(SubmitAnswerRequest request) {
        QuestionBank question = questionBankMapper.findById(request.getQuestionId());
        // 检查题目是否存在
        if (question == null) {
            return SubmitAnswerResponse.builder()
                    .studentId(request.getStudentId())
                    .questionId(request.getQuestionId())
                    .selectedAnswer(request.getSelectedAnswer())
                    .message("题目不存在")
                    .build();
        }
        // 检查用户答案是否为空
        if (request.getSelectedAnswer().isEmpty()) {
            return SubmitAnswerResponse.builder()
                    .studentId(request.getStudentId())
                    .questionId(request.getQuestionId())
                    .selectedAnswer(request.getSelectedAnswer())
                    .message("请选择答案")
                    .build();
        }
        boolean isCorrect = question.getAnswer().equalsIgnoreCase(request.getSelectedAnswer());

        StudentQuestionRecord record = new StudentQuestionRecord();
        record.setStudentId(request.getStudentId());
        record.setQuestionId(request.getQuestionId());
        record.setUserAnswer(request.getSelectedAnswer().toUpperCase());
        record.setAiScore(isCorrect ? 100 : 0);
        record.setAiFeedback(isCorrect ? "回答正确！" : "回答错误");
        record.setAnswerTime(LocalDateTime.now());

        studentQuestionRecordMapper.insert(record);

        return SubmitAnswerResponse.builder()
                .studentId(request.getStudentId())
                .questionId(request.getQuestionId())
                .selectedAnswer(request.getSelectedAnswer().toUpperCase())
                .correctAnswer(question.getAnswer())
                .isCorrect(isCorrect)
                .explanation("正确答案: " + question.getAnswer())
                .message(isCorrect ? "回答正确！" : "回答错误，正确答案是 " + question.getAnswer())
                .build();
    }
    // 生成PDF文件
    // 输入：题目类型
    // 输出：PDF文件字节数组
    @Override
    public byte[] generatePdf(QuestionBankRequest request) {
        List<QuestionBank> questions = questionBankMapper.findBySubjectAndType(
                request.getSubject(), request.getQuestionType());

        if (questions.isEmpty()) {
            return null;
        }

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            // 生成PDF文件
        try {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            String titleText = (request.getSubject() != null ? request.getSubject() : "通用") + 
                    " 题库" + (request.getQuestionType() != null ? "-类型" + request.getQuestionType() : "");
            Paragraph title = new Paragraph(titleText)
                    .setFontSize(20)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            document.add(title);
                // 添加题目信息
            Paragraph info = new Paragraph("共 " + questions.size() + " 道题目")
                    .setFontSize(12)
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(30);
            document.add(info);
            // 添加题目
            int questionNo = 1;
            for (QuestionBank question : questions) {
                Paragraph questionPara = new Paragraph()
                        .add(questionNo++ + ". " + question.getQuestionContent())
                        .setFontSize(12)
                        .setBold()
                        .setMarginTop(15)
                        .setMarginBottom(10);
                document.add(questionPara);

                addOptionCell(document, "A. " + question.getOptionA());
                addOptionCell(document, "B. " + question.getOptionB());
                addOptionCell(document, "C. " + question.getOptionC());
                addOptionCell(document, "D. " + question.getOptionD());
            }
                // 关闭文档
            document.close();
            return outputStream.toByteArray();

        } catch (Exception e) {
            log.error("生成PDF失败", e);
            return null;
        }
    }
    // 添加选项单元格
    // 输入：文档对象，选项文本
    // 输出：无
       private void addOptionCell(Document document, String text) {
        Paragraph optionPara = new Paragraph(text)
                .setFontSize(11)
                .setMarginLeft(20)
                .setMarginBottom(5);
        document.add(optionPara);
    }
    // 初始化题库数据
    // 输入：无
    // 输出：无
    @Override
    public void initializeQuestionBank() {
        log.info("开始初始化题库数据...");

        List<QuestionBank> existingQuestions = questionBankMapper.findBySubjectAndType(null, null);
        if (!existingQuestions.isEmpty()) {
            log.info("题库数据已存在，跳过初始化");
            return;
        }
        // 初始化题库数据
        // 从文件系统读取题库文件
        List<String> majorFiles = Arrays.asList(
                "计算机科学与技术_题库A_60题.txt",
                "计算机科学与技术_题库B_60题.txt",
                "会计学_题库A_60题.txt",
                "会计学_题库B_60题.txt",
                "市场营销_题库A_60题.txt",
                "市场营销_题库B_60题.txt",
                "法学_题库A_60题.txt",
                "法学_题库B_60题.txt",
                "电气工程及其自动化_题库A_60题.txt",
                "电气工程及其自动化_题库B_60题.txt",
                "英语_题库A_60题.txt",
                "英语_题库B_60题.txt",
                "临床医学_题库A_60题.txt",
                "临床医学_题库B_60题.txt",
                "金融学_题库A_60题.txt",
                "金融学_题库B_60题.txt",
                "软件工程_题库A_60题.txt",
                "软件工程_题库B_60题.txt",
                "数据科学与大数据技术_题库A_60题.txt",
                "数据科学与大数据技术_题库B_60题.txt"
        );

        for (String fileName : majorFiles) {
            try {
                parseAndSaveQuestions(fileName);
            } catch (Exception e) {
                log.error("解析文件失败: " + fileName, e);
            }
        }

        log.info("题库数据初始化完成");
    }
    // 解析并保存题库数据

    private void parseAndSaveQuestions(String fileName) throws Exception {
        String fullPath = questionBankPath + "/" + fileName;
        java.io.File file = new java.io.File(fullPath);
        if (!file.exists()) {
            log.warn("文件不存在: " + fullPath);
            return;
        }
        // 读取文件内容
        String content = new String(java.nio.file.Files.readAllBytes(file.toPath()), "UTF-8");
        String[] lines = content.split("\n");
        // 提取专业、套题、题型
        String subject = extractSubject(lines[0]);
        String questionSet = extractQuestionSet(lines[1]);
        Integer questionType = questionSet.equals("A") ? 1 : 2; // 1=A套题, 2=B套题

        if (questionBankMapper.countBySubjectAndType(subject, questionType) > 0) {
            log.info("专业 " + subject + " 题库" + questionSet + " 已存在，跳过");
            return;
        }
        // 解析题库数据
        List<QuestionBank> questions = new ArrayList<>();
        Pattern questionPattern = Pattern.compile("^(\\d+)\\.\\s*(.+)$");
        Pattern answerPattern = Pattern.compile("^答案：([A-D])$");
        Pattern optionPattern = Pattern.compile("^([A-D])\\.(.+)$");
        // 解析题库数据
        String currentQuestion = null;
        Map<String, String> options = new java.util.HashMap<>();
        String correctAnswer = null;
        // 解析题库数据
        for (int i = 2; i < lines.length; i++) {
            String line = lines[i].trim();
            if (line.isEmpty()) continue;

            if (line.startsWith("专业：") || line.startsWith("套题：") || 
                line.startsWith("题型：") || line.startsWith("题量：")) {
                continue;
            }
            // 解析问题
            Matcher questionMatcher = questionPattern.matcher(line);
            if (questionMatcher.matches()) {
                if (currentQuestion != null && correctAnswer != null) {
                    questions.add(createQuestion(subject, questionType, currentQuestion, options, correctAnswer));
                }
                String questionText = questionMatcher.group(2);
                currentQuestion = questionText;
                options.clear();
                correctAnswer = null;
                continue;
            }
            // 解析答案
            Matcher answerMatcher = answerPattern.matcher(line);
            if (answerMatcher.matches()) {
                correctAnswer = answerMatcher.group(1);
                continue;
            }
            // 解析选项
            Matcher optionMatcher = optionPattern.matcher(line);
            if (optionMatcher.matches()) {
                String optionKey = optionMatcher.group(1);
                String optionValue = optionMatcher.group(2).trim();
                options.put(optionKey, optionValue);
            }
        }
        // 处理最后一个问题
        if (currentQuestion != null && correctAnswer != null) {
            questions.add(createQuestion(subject, questionType, currentQuestion, options, correctAnswer));
        }

        if (!questions.isEmpty()) {
            questionBankMapper.batchInsert(questions);
            log.info("已导入专业 " + subject + " 题库" + questionSet + "，共 " + questions.size() + " 题");
        }
    }
        // 提取专业、套题、题型
    private String extractSubject(String line) {
        return line.replace("专业：", "").trim();
    }

    private String extractQuestionSet(String line) {
        return line.replace("套题：", "").trim();
    }

    private QuestionBank createQuestion(String subject, Integer questionType, 
                                       String questionContent, Map<String, String> options,
                                       String correctAnswer) {
        QuestionBank question = new QuestionBank();
        question.setQuestionType(questionType);
        question.setQuestionContent(questionContent);
        question.setCorePoint("知识点");
        question.setAnswer(correctAnswer);
        question.setDifficultyLevel(2);
        question.setSubject(subject);
        question.setScore(5);
        question.setAiTag("专业基础");
        question.setIsEnable(1);
        question.setOptionA(options.getOrDefault("A", ""));
        question.setOptionB(options.getOrDefault("B", ""));
        question.setOptionC(options.getOrDefault("C", ""));
        question.setOptionD(options.getOrDefault("D", ""));
        return question;
    }
        // 获取所有专业
       @Override
    public List<String> getAllSubjects() {
        List<QuestionBank> questions = questionBankMapper.findBySubjectAndType(null, null);
        return questions.stream()
                .map(QuestionBank::getSubject)
                .distinct()
                .collect(Collectors.toList());
    }
}
