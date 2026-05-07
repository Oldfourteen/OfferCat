package com.offercat.resume.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 简历PDF文件存储表实体类
 * 对应数据库resume_pdf表
 */
@Data
public class ResumePdf {
    /**
     * PDF文件ID
     */
    private Long pdfId;
    
    /**
     * 归属学生ID
     */
    private Long studentId;
    
    /**
     * 关联简历ID
     */
    private Long resumeId;
    
    /**
     * 生成的PDF文件存储路径或URL
     */
    private String fileUrl;
    
    /**
     * PDF文件名
     */
    private String fileName;
    
    /**
     * 文件大小(字节)
     */
    private Integer fileSize;
    
    /**
     * 版本号(用于版本管理)
     */
    private Integer fileVersion;
    
    /**
     * 文件哈希值(用于去重和校验)
     */
    private String fileHash;
    
    /**
     * 生成时间
     */
    private LocalDateTime createTime;
    
    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}