package com.offercat.ai.controller;

import com.offercat.ai._service.AiServiceClient;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfReader;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.kernel.pdf.canvas.parser.PdfTextExtractor;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Map;

/**
 * AI简历控制器
 * 功能：处理简历相关的AI请求
 * 实现：提供简历生成、诊断等接口
 */
@RestController
@RequestMapping("/api/ai/resume")
public class AiResumeController {

    /**
     * AI服务客户端
     */
    private final AiServiceClient aiServiceClient;

    /**
     * 构造函数，初始化AI服务客户端
     * 输入：AI服务客户端实例
     */
    public AiResumeController(AiServiceClient aiServiceClient) {
        // 初始化AI服务客户端
        this.aiServiceClient = aiServiceClient;
    }

    /**
     * 生成简历
     * 输入：目标岗位、学生信息
     * 输出：生成的简历内容
     */
    @PostMapping("/generate")
    public ResponseEntity<String> generateResume(
            @RequestParam String targetPosition,
            @RequestParam String studentInfo) {
        /**
         * 调用AI服务生成简历
         */
        String result = aiServiceClient.generateResume(targetPosition, studentInfo);
        /**
         * 返回生成的简历
         */
        return ResponseEntity.ok(result);
    }

    /**
     * 诊断简历
     * 输入：简历内容、目标岗位
     * 输出：诊断结果
     */
    @PostMapping("/diagnose")
    public ResponseEntity<String> diagnoseResume(
            @RequestParam String resumeContent,
            @RequestParam String targetPosition) {
        /**
         * 调用AI服务诊断简历
         */
        String result = aiServiceClient.diagnoseResume(resumeContent, targetPosition);
        /**
         * 返回诊断结果
         */
        return ResponseEntity.ok(result);
        }
    

    /**
     * 润色PDF简历
     * 输入：PDF文件
     * 输出：润色后的简历文本
     */
    @PostMapping("/polish-pdf")
    public ResponseEntity<String> polishPdfResume(@RequestParam MultipartFile file) {
        try {
            /**
             * 验证文件类型
             */
            String contentType = file.getContentType();
            if (contentType == null || !contentType.equals("application/pdf")) {
                return ResponseEntity.badRequest().body("只支持 PDF 格式的文件");
            }

            /**
             * 提取PDF文本
             */
            StringBuilder textBuilder = new StringBuilder();
            try (InputStream is = file.getInputStream();
                 PdfDocument pdfDoc = new PdfDocument(new PdfReader(is))) {
                int numberOfPages = pdfDoc.getNumberOfPages();
                for (int i = 1; i <= numberOfPages; i++) {
                    textBuilder.append(PdfTextExtractor.getTextFromPage(pdfDoc.getPage(i))).append("\n");
                }
            }

            String resumeContent = textBuilder.toString();
            if (resumeContent.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("无法从PDF中提取文本");
            }

            /**
             * 调用AI服务润色简历
             */
            String result = aiServiceClient.polishResume(resumeContent);
            /**
             * 返回润色后的简历
             */ 
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("处理PDF文件失败：" + e.getMessage());
        }
    }

    /**
     * 获取可用的中文字体
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
        /**
         * 遍历字体选项，尝试加载可用的字体
         */
        for (String[] fontOption : fontOptions) {
            try {
                if (fontOption.length == 1) {
                    return PdfFontFactory.createFont(fontOption[0]);
                } else {
                    return PdfFontFactory.createFont(fontOption[0], fontOption[1]);
                }
            } catch (Exception e) {
                /**
                 * 忽略加载失败的字体，尝试下一个
                 */
            }
        }
        throw new RuntimeException("字体加载失败");
    }

    /**
     * 根据润色文本生成PDF简历
     * 输入：润色后的文本
     * 输出：生成的PDF文件二进制流
     */
    @PostMapping("/generate-pdf")
    public ResponseEntity<byte[]> generatePdfFromText(@RequestBody Map<String, String> payload) {
        String text = payload.get("text");
        if (text == null || text.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        /**
         * 生成PDF文件
         */
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            PdfWriter writer = new PdfWriter(outputStream);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc, PageSize.A4);
            document.setMargins(36, 36, 36, 36);
            
            PdfFont font = getAvailableFont();

            /**
             * 添加标题
             */
            Paragraph title = new Paragraph("AI 润色简历")
                    .setFont(font)
                    .setFontSize(20)
                    .setBold()
                    .setTextAlignment(TextAlignment.CENTER)
                    .setMarginBottom(20);
            document.add(title);

            /**
             * 文本内容
             */
            Paragraph content = new Paragraph(text)
                    .setFont(font)
                    .setFontSize(12)
                    .setMarginBottom(20);
            document.add(content);

            document.close();
            
            byte[] pdfBytes = outputStream.toByteArray();
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "polished_resume.pdf");
            headers.setContentLength(pdfBytes.length);
            /**
             * 返回生成的PDF文件
             */
            return new ResponseEntity<>(pdfBytes, headers, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
}
