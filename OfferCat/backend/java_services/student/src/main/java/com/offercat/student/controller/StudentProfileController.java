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
/**
 * 学生个人控制器
 * 功能：提供学生个人相关的 API 接口
 */
@RestController
@RequestMapping("/student/profile")
public class StudentProfileController {
    /**
     * 学生个人服务
     */

    @Autowired
    private StudentProfileService studentProfileService;

    /**
     * 获取学生竞赛奖项列表
     * @param studentId 学生 ID
     * @return 竞赛奖项列表
     */
    @GetMapping("/competition/list")
    public ResponseResult<List<CompetitionAward>> getCompetitionAwards(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getCompetitionAwards(studentId));
    }
    /**
     * 添加学生竞赛奖项
     * @param award 竞赛奖项
     * @return 添加结果
     */
    @PostMapping("/competition/add")
    public ResponseResult<String> addCompetitionAward(@RequestBody CompetitionAward award) {
        studentProfileService.addCompetitionAward(award);
        return ResponseResult.success("添加成功");
    }
    /**
     * 更新学生竞赛奖项
     * @param award 竞赛奖项
     * @return 更新结果
     */
    @PutMapping("/competition/update")
    public ResponseResult<String> updateCompetitionAward(@RequestBody CompetitionAward award) {
        studentProfileService.updateCompetitionAward(award);
        return ResponseResult.success("更新成功");
    }
    /**
     * 删除学生竞赛奖项
     * @param awardId 竞赛奖项 ID
     * @param studentId 学生 ID
     * @return 删除结果
     */
    @DeleteMapping("/competition/delete")
    public ResponseResult<String> deleteCompetitionAward(@RequestParam("awardId") Long awardId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteCompetitionAward(awardId, studentId);
        return ResponseResult.success("删除成功");
    }
    /**
     * 获取学生证书资质列表
     * @param studentId 学生 ID
     * @return 证书资质列表
     */
    @GetMapping("/certificate/list")
    public ResponseResult<List<CertificateQualification>> getCertificates(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getCertificates(studentId));
    }
    /**
     * 添加学生证书资质
     * @param cert 证书资质
     * @return 添加结果
     */
    @PostMapping("/certificate/add")
    public ResponseResult<String> addCertificate(@RequestBody CertificateQualification cert) {
        studentProfileService.addCertificate(cert);
        return ResponseResult.success("添加成功");
    }
    /**
     * 更新学生证书资质
     * @param cert 证书资质
     * @return 更新结果
     */
    @PutMapping("/certificate/update")
    public ResponseResult<String> updateCertificate(@RequestBody CertificateQualification cert) {
        studentProfileService.updateCertificate(cert);
        return ResponseResult.success("更新成功");
    }
    /**
     * 删除学生证书资质
     * @param certId 证书资质 ID
     * @param studentId 学生 ID
     * @return 删除结果
     */
    @DeleteMapping("/certificate/delete")
    public ResponseResult<String> deleteCertificate(@RequestParam("certId") Long certId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteCertificate(certId, studentId);
        return ResponseResult.success("删除成功");
    }
    /**
     * 获取学生项目经历列表
     * @param studentId 学生 ID
     * @return 项目经历列表
     */
    @GetMapping("/project/list")
    public ResponseResult<List<ProjectExperience>> getProjectExperiences(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getProjectExperiences(studentId));
    }
    /**
     * 添加学生项目经历
     * @param project 项目经历
     * @return 添加结果
     */
    @PostMapping("/project/add")
    public ResponseResult<String> addProjectExperience(@RequestBody ProjectExperience project) {
        studentProfileService.addProjectExperience(project);
        return ResponseResult.success("添加成功");
    }
    /**
     * 更新学生项目经历
     * @param project 项目经历
     * @return 更新结果
     */
    @PutMapping("/project/update")
    public ResponseResult<String> updateProjectExperience(@RequestBody ProjectExperience project) {
        studentProfileService.updateProjectExperience(project);
        return ResponseResult.success("更新成功");
    }
    /**
     * 删除学生项目经历
     * @param projectId 项目经历 ID
     * @param studentId 学生 ID
     * @return 删除结果
     */
    @DeleteMapping("/project/delete")
    public ResponseResult<String> deleteProjectExperience(@RequestParam("projectId") Long projectId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteProjectExperience(projectId, studentId);
        return ResponseResult.success("删除成功");
    }
    /**
     * 获取学生实习经历列表
     * @param studentId 学生 ID
     * @return 实习经历列表
     */
    @GetMapping("/internship/list")
    public ResponseResult<List<InternshipExperience>> getInternshipExperiences(@RequestParam("studentId") Long studentId) {
        return ResponseResult.success(studentProfileService.getInternshipExperiences(studentId));
    }
    /**
     * 添加学生实习经历
     * @param internship 实习经历
     * @return 添加结果
     */
    @PostMapping("/internship/add")
    public ResponseResult<String> addInternshipExperience(@RequestBody InternshipExperience internship) {
        studentProfileService.addInternshipExperience(internship);
        return ResponseResult.success("添加成功");
    }
    /**
     * 更新学生实习经历
     * @param internship 实习经历
     * @return 更新结果
     */
    @PutMapping("/internship/update")
    public ResponseResult<String> updateInternshipExperience(@RequestBody InternshipExperience internship) {
        studentProfileService.updateInternshipExperience(internship);
        return ResponseResult.success("更新成功");
    }
    /**
     * 删除学生实习经历
     * @param internshipId 实习经历 ID
     * @param studentId 学生 ID
     * @return 删除结果
     */
    @DeleteMapping("/internship/delete")
    public ResponseResult<String> deleteInternshipExperience(@RequestParam("internshipId") Long internshipId, @RequestParam("studentId") Long studentId) {
        studentProfileService.deleteInternshipExperience(internshipId, studentId);
        return ResponseResult.success("删除成功");
    }
}
