package com.offercat.student.common;

import lombok.Data;
import java.util.List;

/**
 * 分页结果类
 * 功能：封装分页查询结果，包含总记录数、记录列表、当前页码、每页记录数
 * @param <T> 分页记录类型
 */
@Data
public class PageResult<T> {
    /**
     * 总记录数
     */
    private long total;
    /**
     * 分页记录列表
     */
    private List<T> records;
    /**
     * 当前页码
     */
    private int pageNum;
    /**
     * 每页记录数
     */
    private int pageSize;
    
    public PageResult(long total, List<T> records, int pageNum, int pageSize) {
        this.total = total;
        this.records = records;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
    }
}
