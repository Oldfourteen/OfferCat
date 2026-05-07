package com.offercat.student.dao;

import com.offercat.student.entity.CertificateQualification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CertificateQualificationMapper {
    List<CertificateQualification> getByStudentId(@Param("studentId") Long studentId);
    int insert(CertificateQualification cert);
    int update(CertificateQualification cert);
    int delete(@Param("certId") Long certId, @Param("studentId") Long studentId);
}
