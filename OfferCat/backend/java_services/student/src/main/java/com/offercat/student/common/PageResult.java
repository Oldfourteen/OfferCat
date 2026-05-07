package com.offercat.student.common;

import lombok.Data;
import java.util.List;

@Data
public class PageResult<T> {
    private long total;
    private List<T> records;
    private int pageNum;
    private int pageSize;

    public PageResult(long total, List<T> records, int pageNum, int pageSize) {
        this.total = total;
        this.records = records;
        this.pageNum = pageNum;
        this.pageSize = pageSize;
    }
}
