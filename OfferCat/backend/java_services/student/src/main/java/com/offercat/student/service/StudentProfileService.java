package com.offercat.student.service;

import com.offercat.student.entity.CertificateQualification;
import com.offercat.student.entity.CompetitionAward;
import com.offercat.student.entity.InternshipExperience;
import com.offercat.student.entity.ProjectExperience;

import java.util.List;

/**
 * 学生个人资料服务接口
 * 功能：提供学生个人资料的增删改查操作
 */
public interface StudentProfileService {

    /**
     * 获取学生竞赛奖励列表
     * @param studentId 学生ID
     * @return 竞赛奖励列表
     */
    List<CompetitionAward> getCompetitionAwards(Long studentId);
    void addCompetitionAward(CompetitionAward award);
    void updateCompetitionAward(CompetitionAward award);
    void deleteCompetitionAward(Long awardId, Long studentId);

    /**
     * 获取学生证书资质列表
     * @param studentId 学生ID
     * @return 证书资质列表
     */
    List<CertificateQualification> getCertificates(Long studentId);
    void addCertificate(CertificateQualification cert);
    void updateCertificate(CertificateQualification cert);
    void deleteCertificate(Long certId, Long studentId);

    /**
     * 获取学生项目经历列表
     * @param studentId 学生ID
     * @return 项目经历列表
     * @param studentId 学生ID
     * @return 实习经历列表
     */
    void addProjectExperience(ProjectExperience project);
    void updateProjectExperience(ProjectExperience project);
    void deleteProjectExperience(Long projectId, Long studentId);

    /**
     * 获取学生实习经历列表
     * @param studentId 学生ID
     * @return 实习经历列表
     */
    List<InternshipExperience> getInternshipExperiences(Long studentId);
    void addInternshipExperience(InternshipExperience internship);
    void updateInternshipExperience(InternshipExperience internship);
    void deleteInternshipExperience(Long internshipId, Long studentId);
    /**
     * 获取学生项目经历
     * @param studentId 学生ID
     * @return 项目经历VO列表
     */
    List<ProjectExperience> getProjectExperiences(Long studentId);
}
