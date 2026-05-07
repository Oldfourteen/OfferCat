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

@Service
public class StudentProfileServiceImpl implements StudentProfileService {

    @Autowired
    private CompetitionAwardMapper competitionAwardMapper;

    @Autowired
    private CertificateQualificationMapper certificateQualificationMapper;

    @Autowired
    private ProjectExperienceMapper projectExperienceMapper;

    @Autowired
    private InternshipExperienceMapper internshipExperienceMapper;

    // --- Competition Award ---
    @Override
    public List<CompetitionAward> getCompetitionAwards(Long studentId) {
        return competitionAwardMapper.getByStudentId(studentId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCompetitionAward(CompetitionAward award) {
        competitionAwardMapper.insert(award);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCompetitionAward(CompetitionAward award) {
        competitionAwardMapper.update(award);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteCompetitionAward(Long awardId, Long studentId) {
        competitionAwardMapper.delete(awardId, studentId);
    }

    // --- Certificate Qualification ---
    @Override
    public List<CertificateQualification> getCertificates(Long studentId) {
        return certificateQualificationMapper.getByStudentId(studentId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addCertificate(CertificateQualification cert) {
        certificateQualificationMapper.insert(cert);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateCertificate(CertificateQualification cert) {
        certificateQualificationMapper.update(cert);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteCertificate(Long certId, Long studentId) {
        certificateQualificationMapper.delete(certId, studentId);
    }

    // --- Project Experience ---
    @Override
    public List<ProjectExperience> getProjectExperiences(Long studentId) {
        return projectExperienceMapper.getByStudentId(studentId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void addProjectExperience(ProjectExperience project) {
        projectExperienceMapper.insert(project);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateProjectExperience(ProjectExperience project) {
        projectExperienceMapper.update(project);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteProjectExperience(Long projectId, Long studentId) {
        projectExperienceMapper.delete(projectId, studentId);
    }

    // --- Internship Experience ---
    @Override
    public List<InternshipExperience> getInternshipExperiences(Long studentId) {
        return internshipExperienceMapper.getByStudentId(studentId);
    }

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
