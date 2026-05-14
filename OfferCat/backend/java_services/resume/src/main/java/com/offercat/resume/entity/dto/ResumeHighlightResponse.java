package com.offercat.resume.entity.dto;

import lombok.Data;

import java.util.Map;

/**
 * 简历高亮响应DTO
 * 功能：封装C++服务返回的高亮结果
 * 说明：包含高亮片段信息和HTML内容
 */
@Data
public class ResumeHighlightResponse {

    /**
     * 单位说明：utf8_byte
     */
    private String unit;

    /**
     * 高亮片段映射，key为段落ID，value为片段列表
     * 每个片段包含：start(起始位置), end(结束位置), word(关键词)
     */
    private Map<String, Object> spansById;

    /**
     * 高亮后的HTML内容映射，key为段落ID
     */
    private Map<String, String> htmlById;
}