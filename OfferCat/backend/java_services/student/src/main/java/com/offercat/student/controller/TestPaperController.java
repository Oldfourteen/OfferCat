package com.offercat.student.controller;

import com.offercat.student.common.PageResult;
import com.offercat.student.common.ResponseResult;
import com.offercat.student.dto.TestPaperSearchDTO;
import com.offercat.student.service.TestPaperService;
import com.offercat.student.vo.TestPaperVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * 套卷控制器
 * 功能：提供套卷相关的 API 接口
 */
@RestController
@RequestMapping("/student/test-paper")
public class TestPaperController {

    @Autowired
    private TestPaperService testPaperService;

    /**
     * 搜索套卷列表 (笔试真题/面试真题)
     */
    @PostMapping("/search")
    public ResponseResult<PageResult<TestPaperVO>> searchPapers(@RequestBody TestPaperSearchDTO searchDTO) {
        try {
            PageResult<TestPaperVO> pageResult = testPaperService.searchPapers(searchDTO);
            return ResponseResult.success(pageResult);
        } catch (Exception e) {
            return ResponseResult.error(500, "Search failed: " + e.getMessage());
        }
    }
}
