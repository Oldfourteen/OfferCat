package com.offercat.student.dao;

import com.offercat.student.entity.CertificateQualification;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 证书认证映射器
 * 功能：提供证书认证相关的数据库操作
 */
@Mapper
/**
 * 证书认证映射器
 * 功能：提供证书认证相关的数据库操作
 */
public interface CertificateQualificationMapper {
    /**
     * 根据学生 ID 获取证书认证列表
     * @param studentId 学生 ID
     * @return 证书认证列表
     */
    List<CertificateQualification> getByStudentId(@Param("studentId") Long studentId);
    int insert(CertificateQualification cert);
    int update(CertificateQualification cert);
    int delete(@Param("certId") Long certId, @Param("studentId") Long studentId);
}
