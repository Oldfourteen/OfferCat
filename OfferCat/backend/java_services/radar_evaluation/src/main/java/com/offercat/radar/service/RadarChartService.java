package com.offercat.radar.service;

import com.offercat.radar.dto.request.RadarChartRequest;
import com.offercat.radar.dto.response.RadarChartResponse;
import com.offercat.radar.entity.RadarEvaluation;
import com.offercat.radar.integration.CxxRadarClient;
import com.offercat.radar.integration.PythonRadarChartClient;
import com.offercat.radar.service.RadarEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

/**
 * @author: Ofteen
 * @date: 2026/4/22 - 01:19
 * @mail: oldfourteen41@gmail.com
 * @info:
 */
@Service
@RequiredArgsConstructor
public class RadarChartService {

    private final CxxRadarClient cxxRadarClient;
    private final PythonRadarChartClient pythonRadarChartClient;
    private final RadarEvaluationService radarEvaluationService;

    public RadarChartResponse generate(RadarChartRequest request) {
        List<String> answers = request.getAnswers();
        // C++ 端按40题设计了 做一个校验
        if (answers == null || answers.size() != 40) {
            return RadarChartResponse.builder()
                    .studentId(request.getStudentId())
                    .valid(false)
                    .message("答案数量必须为40题，请检查前端提交数据")
                    .build();
        }

        CxxRadarClient.CxxRadarResponse cppResp = null;
        try {
            cppResp = cxxRadarClient.score(answers);
            System.out.println("[RadarChart] C++服务返回: valid=" + (cppResp != null ? cppResp.isValid() : "null")
                    + ", fullScores=" + (cppResp != null ? cppResp.getFullScores() : "null"));
        } catch (Exception e) {
            // 将异常信息返回给前端，方便服务器上直接排错
            System.err.println("[RadarChart] C++请求异常: " + e.getMessage());
            e.printStackTrace();
            return RadarChartResponse.builder()
                    .studentId(request.getStudentId())
                    .valid(false)
                    .message("C++ 请求异常: " + e.getClass().getSimpleName() + " - " + e.getMessage())
                    .build();
        }
        if (cppResp == null) {
            return RadarChartResponse.builder()
                    .studentId(request.getStudentId())
                    .valid(false)
                    .message("C++ 服务返回了空数据，请检查 C++ 服务日志")
                    .build();
        }

        if (!cppResp.isValid()) {
            return RadarChartResponse.builder()
                    .studentId(request.getStudentId())
                    .valid(false)
                    .message("问卷无效，请重新填写")
                    .build();
        }

        String imgBase64 = null;
        List<com.offercat.radar.dto.response.DimensionScore> top5 = null;
        List<Integer> fullScores = cppResp.getFullScores();

        if (fullScores == null || fullScores.size() != 7) {
            System.err.println("[RadarChart] C++服务返回的fullScores异常: " + fullScores);
            return RadarChartResponse.builder()
                    .studentId(request.getStudentId())
                    .valid(false)
                    .message("C++ 服务返回的评分数据异常，请检查 C++ 服务配置")
                    .build();
        }

        // 1. 存入数据库
        try {
            RadarEvaluation evaluation = new RadarEvaluation();
            evaluation.setStudentId(request.getStudentId());
            evaluation.setProfessionalAbility(fullScores.get(0));
            evaluation.setProjectExperience(fullScores.get(1));
            evaluation.setCompetitionResults(fullScores.get(2));
            evaluation.setAcademicBackground(fullScores.get(3));
            evaluation.setSoftSkills(fullScores.get(4));
            evaluation.setIndustryCognition(fullScores.get(5));
            evaluation.setStressExecution(fullScores.get(6));
            evaluation.setCreateTime(LocalDateTime.now());

            // 自动计算并保存（如果没有存在记录则插入，有则更新）
            radarEvaluationService.saveRadarEvaluation(evaluation);
            System.out.println("[RadarChart] 数据库保存成功, studentId=" + request.getStudentId());
        } catch (Exception e) {
            // 数据库或缓存操作失败不应影响返回结果，记录日志即可
            System.err.println("[RadarChart] 保存雷达评估数据失败: " + e.getMessage());
            e.printStackTrace();
        }

        // 2. 调用 Python 获取雷达图
        try {
            PythonRadarChartClient.PythonRadarResponse pythonResp = pythonRadarChartClient.generateChart(fullScores);
            if (pythonResp != null) {
                imgBase64 = pythonResp.getImageBase64();
                if (imgBase64 != null && !imgBase64.startsWith("data:image/")) {
                    imgBase64 = "data:image/png;base64," + imgBase64;
                }
                top5 = pythonResp.getTop5();
            }
        } catch (Exception ignored) {
            //python 图片生成失败
        }

        return RadarChartResponse.builder()
                .studentId(request.getStudentId())
                .valid(true)
                .top5(top5)
                .ranarImageBase64(imgBase64)
                .professionalAbility(fullScores.get(0))
                .projectExperience(fullScores.get(1))
                .competitionResults(fullScores.get(2))
                .academicBackground(fullScores.get(3))
                .softSkills(fullScores.get(4))
                .industryCognition(fullScores.get(5))
                .stressExecution(fullScores.get(6))
                .message(imgBase64 == null ? "评分计算完成（雷达图生成失败或未配置）" : "评分计算完成")
                .build();
    }
}
