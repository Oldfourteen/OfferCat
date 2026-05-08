package com.offercat.student.service;

import com.offercat.student.common.PageResult;
import com.offercat.student.dto.TestPaperSearchDTO;
import com.offercat.student.vo.TestPaperVO;
/**
 * 套卷服务接口
 * 功能：提供套卷的增删改查操作
 */
public interface TestPaperService {
    /**
     * 分页搜索套卷
     */
    PageResult<TestPaperVO> searchPapers(TestPaperSearchDTO searchDTO);
}
