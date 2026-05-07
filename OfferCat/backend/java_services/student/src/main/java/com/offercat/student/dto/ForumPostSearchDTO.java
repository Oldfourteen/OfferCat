package com.offercat.student.dto;

import lombok.Data;

@Data
public class ForumPostSearchDTO {
    /**
     * 搜索关键字（匹配标题和内容）
     */
    private String keyword;
    
    /**
     * 排序字段：create_time(默认), like_count, comment_count
     */
    private String sortBy = "create_time";
    
    /**
     * 排序方向：desc(默认), asc
     */
    private String sortDirection = "desc";
    
    /**
     * 页码，默认1
     */
    private Integer pageNum = 1;
    
    /**
     * 每页数量，默认10
     */
    private Integer pageSize = 10;
}
