package com.offercat.student.service;

import com.offercat.student.entity.CertificateQualification;
import com.offercat.student.entity.CompetitionAward;
import com.offercat.student.entity.InternshipExperience;
import com.offercat.student.entity.ProjectExperience;

import java.util.List;

public interface StudentProfileService {

    // --- Competition Award ---
    List<CompetitionAward> getCompetitionAwards(Long studentId);
    void addCompetitionAward(CompetitionAward award);
    void updateCompetitionAward(CompetitionAward award);
    void deleteCompetitionAward(Long awardId, Long studentId);

    // --- Certificate Qualification ---
    List<CertificateQualification> getCertificates(Long studentId);
    void addCertificate(CertificateQualification cert);
    void updateCertificate(CertificateQualification cert);
    void deleteCertificate(Long certId, Long studentId);

    // --- Project Experience ---
    List<ProjectExperience> getProjectExperiences(Long studentId);
    void addProjectExperience(ProjectExperience project);
    void updateProjectExperience(ProjectExperience project);
    void deleteProjectExperience(Long projectId, Long studentId);

    // --- Internship Experience ---
    List<InternshipExperience> getInternshipExperiences(Long studentId);
    void addInternshipExperience(InternshipExperience internship);
    void updateInternshipExperience(InternshipExperience internship);
    void deleteInternshipExperience(Long internshipId, Long studentId);
}
