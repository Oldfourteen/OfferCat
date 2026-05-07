package com.offercat.student.entity;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TestPaper {
    private Long paperId;
    private String paperName;
    private String company;
    private Integer paperType; // 1-笔试 2-面试
    private Integer questionCount;
    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}
