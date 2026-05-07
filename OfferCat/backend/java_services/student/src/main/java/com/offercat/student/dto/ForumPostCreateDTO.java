package com.offercat.student.dto;

import lombok.Data;
import java.util.List;

@Data
public class ForumPostCreateDTO {
    private Long userId; // 可选，如果为空可以给默认1L测试
    private String title;
    private String content;
    private List<String> images;
}
