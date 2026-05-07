package com.offercat.student.service;

import com.offercat.student.common.PageResult;
import com.offercat.student.dto.TestPaperSearchDTO;
import com.offercat.student.vo.TestPaperVO;

public interface TestPaperService {
    /**
     * 分页搜索套卷
     */
    PageResult<TestPaperVO> searchPapers(TestPaperSearchDTO searchDTO);
}
