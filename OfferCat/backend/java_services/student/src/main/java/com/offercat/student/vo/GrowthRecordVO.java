package com.offercat.student.vo;

import lombok.Data;
import java.time.LocalDateTime;

/**
 * 成长记录VO
 * 功能：表示成长记录的VO信息
 */
@Data
public class GrowthRecordVO {
    private Long studentId;
    private Integer resumeCount;
    private Integer interviewCount;
    private Integer practiceCount;
    private Integer collectionCount;
    private Integer continuousCheckinDays;
    
    /** 用户是否已签到今日 */
    private Boolean checkedInToday;
}
