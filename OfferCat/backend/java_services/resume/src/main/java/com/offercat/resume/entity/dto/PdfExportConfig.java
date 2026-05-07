package com.offercat.resume.entity.dto;

import lombok.Data;

/**
 * PDF导出配置DTO
 * 功能：提供简历PDF导出时的各种可配置参数
 */
@Data
public class PdfExportConfig {
    /**
     * 纸张大小：A4、A5、或自定义
     */
    private String pageSize = "A4";

    /**
     * 纸张宽度（磅）
     */
    private Float pageWidth;

    /**
     * 纸张高度（磅）
     */
    private Float pageHeight;

    /**
     * 左边距（磅）
     */
    private Float marginLeft = 36f;

    /**
     * 右边距（磅）
     */
    private Float marginRight = 36f;

    /**
     * 上边距（磅）
     */
    private Float marginTop = 36f;

    /**
     * 下边距（磅）
     */
    private Float marginBottom = 36f;

    /**
     * 正文字体名称
     */
            private String fontName = "fonts/SIMSUN.TTC,0";

    /**
     * 字体编码
     */
            private String fontEncoding = "Identity-H";

    /**
     * 正文字体大小
     */
    private Float bodyFontSize = 10f;

    /**
     * 标题字体大小
     */
    private Float titleFontSize = 24f;

    /**
     * 章节标题字体大小
     */
    private Float sectionTitleFontSize = 14f;

    /**
     * 标题颜色
     */
    private String titleColor = "1A5276";

    /**
     * 章节标题颜色
     */
    private String sectionTitleColor = "34495E";

    /**
     * 章节背景颜色
     */
    private String sectionBgColor = "F5F5F5";

    /**
     * 简历标题文本
     */
    private String resumeTitle = "简 历";

    /**
     * 是否显示AI评估章节
     */
    private Boolean showAiEvaluation = true;

    /**
     * 是否显示生成时间
     */
    private Boolean showGenerationTime = true;

    // 默认A4配置
    public static PdfExportConfig defaultA4Config() {
        PdfExportConfig config = new PdfExportConfig();
        config.setPageSize("A4");
        config.setMarginLeft(36f);
        config.setMarginRight(36f);
        config.setMarginTop(36f);
        config.setMarginBottom(36f);
        config.setTitleColor("1A5276");
        config.setSectionTitleColor("34495E");
        config.setSectionBgColor("F5F5F5");
        return config;
    }
    // 默认A5配置
    public static PdfExportConfig defaultA5Config() {
        PdfExportConfig config = new PdfExportConfig();
        config.setPageSize("A5");
        config.setMarginLeft(24f);
        config.setMarginRight(24f);
        config.setMarginTop(24f);
        config.setMarginBottom(24f);
        config.setBodyFontSize(9f);
        config.setTitleFontSize(20f);
        config.setSectionTitleFontSize(12f);
        config.setTitleColor("1A5276");
        config.setSectionTitleColor("34495E");
        config.setSectionBgColor("F5F5F5");
        return config;
    }
}