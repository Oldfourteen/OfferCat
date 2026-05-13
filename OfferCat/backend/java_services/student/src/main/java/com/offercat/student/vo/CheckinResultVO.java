package com.offercat.student.vo;

import lombok.Data;

/**
 * 打卡结果VO
 * 功能：表示打卡操作的返回结果
 */
@Data
public class CheckinResultVO {
    /** 连续打卡天数 */
    private Integer continuousCheckinDays;
    /** 累计打卡天数 */
    private Integer totalCheckinDays;
}