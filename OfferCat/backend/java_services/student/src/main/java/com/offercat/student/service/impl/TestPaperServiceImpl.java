package com.offercat.student.service.impl;

import com.offercat.student.common.PageResult;
import com.offercat.student.dao.TestPaperMapper;
import com.offercat.student.dto.TestPaperSearchDTO;
import com.offercat.student.entity.TestPaper;
import com.offercat.student.service.TestPaperService;
import com.offercat.student.vo.TestPaperVO;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 测试试卷服务实现类
 * 功能：表示测试试卷服务实现
 */
@Service
public class TestPaperServiceImpl implements TestPaperService {
    /**
     * 测试试卷Mapper
     */
    @Autowired
    private TestPaperMapper testPaperMapper;
        /**
         * 搜索测试试卷
         * @param searchDTO 搜索DTO
         * @return 测试试卷VO分页结果
         */
    @Override
    public PageResult<TestPaperVO> searchPapers(TestPaperSearchDTO searchDTO) {
        int pageNum = searchDTO.getPageNum() == null || searchDTO.getPageNum() < 1 ? 1 : searchDTO.getPageNum();
        int pageSize = searchDTO.getPageSize() == null || searchDTO.getPageSize() < 1 ? 10 : searchDTO.getPageSize();
        int offset = (pageNum - 1) * pageSize;
        /**
         * 计算总记录数
         */
        long total = testPaperMapper.countPapers(searchDTO.getKeyword(), searchDTO.getPaperType());
        List<TestPaper> list = total == 0 ? List.of() : testPaperMapper.searchPapersPage(searchDTO.getKeyword(), searchDTO.getPaperType(), offset, pageSize);
        /**
         * 转换为VO试卷列表
         */
        List<TestPaperVO> voList = list.stream().map(paper -> {
            TestPaperVO vo = new TestPaperVO();
            BeanUtils.copyProperties(paper, vo);
            
       /**
         * 生成公司logo文本
         */
            if (paper.getCompany() != null && paper.getCompany().contains("小米")) {
                vo.setCompanyLogoText("MI");
            } else if (paper.getCompany() != null && !paper.getCompany().isEmpty()) {
                vo.setCompanyLogoText(paper.getCompany().substring(0, 1));
            } else {
                vo.setCompanyLogoText("CO");
            }
            
            return vo;
        }).collect(Collectors.toList());
        /**
         * 返回分页结果
         */
        return new PageResult<>(total, voList, pageNum, pageSize);
    }
}
