package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class CertificateQualification {
    private Long certId;
    private Long studentId;
    private String certName;
    private String scoreOrGrade;
    private String obtainTime;
    private String supplementaryDesc;
    private LocalDateTime createTime;
}
