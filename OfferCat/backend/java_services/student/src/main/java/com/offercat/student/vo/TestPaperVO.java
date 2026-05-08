package com.offercat.student.vo;

import lombok.Data;

/**
 * 测试试卷VO
 * 功能：表示测试试卷的VO信息
 */
@Data
public class TestPaperVO {
    private Long paperId;
    private String paperName;
    private String company;
    private Integer paperType;
    private Integer questionCount;
    /** 可以加一个首字母用来展示Logo，如 "MI" -> 小米 */
    private String companyLogoText;
}
