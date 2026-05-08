package com.offercat.student.service.impl;

import com.offercat.student.dao.CertificateQualificationMapper;
import com.offercat.student.dao.CompetitionAwardMapper;
import com.offercat.student.dao.InternshipExperienceMapper;
import com.offercat.student.dao.ProjectExperienceMapper;
import com.offercat.student.entity.CertificateQualification;
import com.offercat.student.entity.CompetitionAward;
import com.offercat.student.entity.InternshipExperience;
import com.offercat.student.entity.ProjectExperience;
import com.offercat.student.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 学生个人档案服务实现类
 * 功能：提供学生个人档案相关服务
 */
@Service
public class StudentProfileServiceImpl implements StudentProfileService {
    /**
     * 获取学生个人档案
     * @param studentId 学生ID
     * @return 学生个人档案VO
     */
    @Autowired
    private CompetitionAwardMapper competitionAwardMapper;
    /**
     * 获取学生证书资质
     * @param studentId 学生ID
     * @return 证书资质VO列表
     */
    @Autowired
    private CertificateQualificationMapper certificateQualificationMapper;
    /**
     * 获取学生项目经历
     * @param studentId 学生ID
     * @return 项目经历VO列表
     */
    @Autowired
    private ProjectExperienceMapper projectExperienceMapper;
    /**
     * 获取学生实习经历
     * @param studentId 学生ID
     * @return 实习经历VO列表
     */
    @Autowired
    private InternshipExperienceMapper internshipExperienceMapper;

    /**
     * 获取学生竞赛获奖记录
     * @param studentId 学生ID
     * @return 竞赛获奖记录VO列表
     * @param questionId 题目ID
     * @return 面试题目VO
     */
    @Override
    public List<CompetitionAward> getCompetitionAwards(Long studentId) {
        return competitionAwardMapper.getByStudentId(studentId);
    }
    /**
     * 添加学生竞赛获奖记录
     * @param award 竞赛获奖记录
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCompetitionAward(CompetitionAward award) {
        competitionAwardMapper.insert(award);
    }
    /**
     * 更新学生竞赛获奖记录
     * @param award 竞赛获奖记录
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCompetitionAward(CompetitionAward award) {
        competitionAwardMapper.update(award);
    }
    /**
     * 删除学生竞赛获奖记录
     * @param awardId 竞赛获奖记录ID
     * @param studentId 学生ID
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteCompetitionAward(Long awardId, Long studentId) {
        competitionAwardMapper.delete(awardId, studentId);
    }

    /**
     * 获取学生证书资质
     * @param studentId 学生ID
     * @return 证书资质VO列表
     */
    @Override
    public List<CertificateQualification> getCertificates(Long studentId) {
        return certificateQualificationMapper.getByStudentId(studentId);
    }
    /**
     * 添加学生证书资质
     * @param cert 证书资质
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCertificate(CertificateQualification cert) {
        certificateQualificationMapper.insert(cert);
    }
    /**
     * 更新学生证书资质
     * @param cert 证书资质
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCertificate(CertificateQualification cert) {
        certificateQualificationMapper.update(cert);
    }
    /**
     * 删除学生证书资质
     * @param certId 证书资质ID
     * @param studentId 学生ID
     */
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteCertificate(Long certId, Long studentId) {
        certificateQualificationMapper.delete(certId, studentId);
    }

    /**
     * 获取学生项目经历
     * @param studentId 学生ID
     * @return 项目经历VO列表
     */
    @Override
    public List<ProjectExperience> getProjectExperiences(Long studentId) {
        return projectExperienceMapper.getByStudentId(studentId);
    }
    /**
     * 添加学生项目经历
     * @param project 项目经历
     */

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addProjectExperience(ProjectExperience project) {
        projectExperienceMapper.insert(project);
    }
    /**
     * 更新学生项目经历
     * @param project 项目经历
     */

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateProjectExperience(ProjectExperience project) {
        projectExperienceMapper.update(project);
    }
    /**
     * 删除学生项目经历
     * @param projectId 项目经历ID
     * @param studentId 学生ID
     */

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteProjectExperience(Long projectId, Long studentId) {
        projectExperienceMapper.delete(projectId, studentId);
    }

    /**
     * 获取学生实习经历
     * @param studentId 学生ID
     * @return 实习经历VO列表
     */
    @Override
    public List<InternshipExperience> getInternshipExperiences(Long studentId) {
        return internshipExperienceMapper.getByStudentId(studentId);
    }
    /**
     * 添加学生实习经历
     * @param internship 实习经历
     */

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addInternshipExperience(InternshipExperience internship) {
        internshipExperienceMapper.insert(internship);
    }
    
    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateInternshipExperience(InternshipExperience internship) {
        internshipExperienceMapper.update(internship);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteInternshipExperience(Long internshipId, Long studentId) {
        internshipExperienceMapper.delete(internshipId, studentId);
    }
}
