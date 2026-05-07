package com.offercat.student.controller;

import com.offercat.student.common.ResponseResult;
import com.offercat.student.entity.CertificateQualification;
import com.offercat.student.entity.CompetitionAward;
import com.offercat.student.entity.InternshipExperience;
import com.offercat.student.entity.ProjectExperience;
import com.offercat.student.service.StudentProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/profile")
public class StudentProfileController {

    @Autowired
    private StudentProfileService studentProfileService;

    // ==========================================
    // 竞赛奖项 (Competition Award)
    // ==========================================

    @GetMapping("/competition/list")
    public ResponseResult<List<CompetitionAward>> getCompetitionAwards(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getCompetitionAwards(studentId));
    }

    @PostMapping("/competition/add")
    public ResponseResult<String> addCompetitionAward(@RequestBody CompetitionAward award) {
        studentProfileService.addCompetitionAward(award);
        return ResponseResult.success("添加成功");
    }

    @PutMapping("/competition/update")
    public ResponseResult<String> updateCompetitionAward(@RequestBody CompetitionAward award) {
        studentProfileService.updateCompetitionAward(award);
        return ResponseResult.success("更新成功");
    }

    @DeleteMapping("/competition/delete")
    public ResponseResult<String> deleteCompetitionAward(@RequestParam("awardId") Long awardId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteCompetitionAward(awardId, studentId);
        return ResponseResult.success("删除成功");
    }

    // ==========================================
    // 证书资质 (Certificate Qualification)
    // ==========================================

    @GetMapping("/certificate/list")
    public ResponseResult<List<CertificateQualification>> getCertificates(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getCertificates(studentId));
    }

    @PostMapping("/certificate/add")
    public ResponseResult<String> addCertificate(@RequestBody CertificateQualification cert) {
        studentProfileService.addCertificate(cert);
        return ResponseResult.success("添加成功");
    }

    @PutMapping("/certificate/update")
    public ResponseResult<String> updateCertificate(@RequestBody CertificateQualification cert) {
        studentProfileService.updateCertificate(cert);
        return ResponseResult.success("更新成功");
    }

    @DeleteMapping("/certificate/delete")
    public ResponseResult<String> deleteCertificate(@RequestParam("certId") Long certId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteCertificate(certId, studentId);
        return ResponseResult.success("删除成功");
    }

    // ==========================================
    // 项目经历 (Project Experience)
    // ==========================================

    @GetMapping("/project/list")
    public ResponseResult<List<ProjectExperience>> getProjectExperiences(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getProjectExperiences(studentId));
    }

    @PostMapping("/project/add")
    public ResponseResult<String> addProjectExperience(@RequestBody ProjectExperience project) {
        studentProfileService.addProjectExperience(project);
        return ResponseResult.success("添加成功");
    }

    @PutMapping("/project/update")
    public ResponseResult<String> updateProjectExperience(@RequestBody ProjectExperience project) {
        studentProfileService.updateProjectExperience(project);
        return ResponseResult.success("更新成功");
    }

    @DeleteMapping("/project/delete")
    public ResponseResult<String> deleteProjectExperience(@RequestParam("projectId") Long projectId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteProjectExperience(projectId, studentId);
        return ResponseResult.success("删除成功");
    }

    // ==========================================
    // 实习经历 (Internship Experience)
    // ==========================================

    @GetMapping("/internship/list")
    public ResponseResult<List<InternshipExperience>> getInternshipExperiences(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getInternshipExperiences(studentId));
    }

    @PostMapping("/internship/add")
    public ResponseResult<String> addInternshipExperience(@RequestBody InternshipExperience internship) {
        studentProfileService.addInternshipExperience(internship);
        return ResponseResult.success("添加成功");
    }

    @PutMapping("/internship/update")
    public ResponseResult<String> updateInternshipExperience(@RequestBody InternshipExperience internship) {
        studentProfileService.updateInternshipExperience(internship);
        return ResponseResult.success("更新成功");
    }

    @DeleteMapping("/internship/delete")
    public ResponseResult<String> deleteInternshipExperience(@RequestParam("internshipId") Long internshipId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteInternshipExperience(internshipId, studentId);
        return ResponseResult.success("删除成功");
    }
}
