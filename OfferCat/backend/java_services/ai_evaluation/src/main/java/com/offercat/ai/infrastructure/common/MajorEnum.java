package com.offercat.ai.infrastructure.common;

import lombok.Getter;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 20:38
 * @mail: oldfourteen41@gmail.com
 * @info: 专业枚举
 */
@Getter
public enum MajorEnum {
    CS("computer", "计算机科学与技术"),
    ACC("accounting", "会计学"),
    MKT("marketing", "市场营销"),
    LAW("law", "法学"),
    EE("ee", "电气工程及其自动化"),
    ENG("english", "英语"),
    MED("medicine", "临床医学"),
    FIN("finance", "金融学"),
    SE("software","软件工程"),
    DATA("bigdata", "数据科学与大数据技术");


    private final String code;
    private final String name;

    MajorEnum(String code, String name){
        this.code = code;
        this.name = name;
    }

    public static String getNameByCode(String codeOrName){
        for(MajorEnum major : values()){
            if(major.getCode().equalsIgnoreCase(codeOrName) || major.getName().equalsIgnoreCase(codeOrName)){
                return major.getName();
            }
        }
        // 如果没有匹配到，默认返回第一个或者可以抛出异常
        return CS.getName();
    }
}