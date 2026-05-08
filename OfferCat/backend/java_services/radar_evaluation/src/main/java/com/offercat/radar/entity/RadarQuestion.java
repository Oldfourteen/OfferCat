package com.offercat.radar.entity;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 雷达图评估问卷题库表实体类
 * 对应数据库radar_question表
 */
@Data
public class RadarQuestion {
    // 问卷题目ID
    private Long questionId;
    
    // 题目内容
    private String content;
    
    // 选项A内容
    private String optionA;
    
    // 选A对"专业能力"加分
    private Integer scoreAProf;
    
    // 选A对"项目经验"加分
    private Integer scoreAProj;
    
    // 选A对"竞赛成果"加分
    private Integer scoreAComp;
    
    // 选A对"学历背景"加分
    private Integer scoreAAcad;
    
    // 选A对"软技能"加分
    private Integer scoreASoft;
    
    // 选A对"行业认知"加分
    private Integer scoreAIndu;
    
    // 选项B内容
    private String optionB;
    
    // 选B对"专业能力"加分
    private Integer scoreBProf;
    
    // 选B对"项目经验"加分
    private Integer scoreBProj;
    
    // 选B对"竞赛成果"加分
    private Integer scoreBComp;
    
    // 选B对"学历背景"加分
    private Integer scoreBAcad;
    
    // 选B对"软技能"加分
    private Integer scoreBSoft;
    
    // 选B对"行业认知"加分
    private Integer scoreBIndu;
    
    // 选项C内容
    private String optionC;
    
    // 选C对"专业能力"加分
    private Integer scoreCProf;
    
    // 选C对"项目经验"加分
    private Integer scoreCProj;
    
    // 选C对"竞赛成果"加分
    private Integer scoreCComp;
    
    // 选C对"学历背景"加分
    private Integer scoreCAcad;
    
    // 选C对"软技能"加分
    private Integer scoreCSoft;
    
    // 选C对"行业认知"加分
    private Integer scoreCIndu;
    
    // 选项D内容
    private String optionD;
    
    // 选D对"专业能力"加分
    private Integer scoreDProf;
    
    // 选D对"项目经验"加分
    private Integer scoreDProj;
    
    // 选D对"竞赛成果"加分
    private Integer scoreDComp;
    
    // 选D对"学历背景"加分
    private Integer scoreDAcad;
    
    // 选D对"软技能"加分
    private Integer scoreDSoft;
    
    // 选D对"行业认知"加分
    private Integer scoreDIndu;
    
    // 状态 1启用 0禁用
    private Integer status;
    
    // 创建时间
    private LocalDateTime createTime;
    
    // 更新时间
    private LocalDateTime updateTime;
}