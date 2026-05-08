package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 证书资质实体类
 * 功能：表示学生获得的证书资质信息
 */
@Data
public class CertificateQualification {
    // 证书资质ID
    private Long certId;
    // 学生ID
    private Long studentId;
    // 证书名称
    private String certName;
    // 证书成绩或等级
    private String scoreOrGrade;
    // 获得证书时间
    private String obtainTime;
    // 证书补充描述
    private String supplementaryDesc;
    // 创建时间
    private LocalDateTime createTime;
}
