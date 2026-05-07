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

@Service
public class TestPaperServiceImpl implements TestPaperService {

    @Autowired
    private TestPaperMapper testPaperMapper;

    @Override
    public PageResult<TestPaperVO> searchPapers(TestPaperSearchDTO searchDTO) {
        int pageNum = searchDTO.getPageNum() == null || searchDTO.getPageNum() < 1 ? 1 : searchDTO.getPageNum();
        int pageSize = searchDTO.getPageSize() == null || searchDTO.getPageSize() < 1 ? 10 : searchDTO.getPageSize();
        int offset = (pageNum - 1) * pageSize;

        long total = testPaperMapper.countPapers(searchDTO.getKeyword(), searchDTO.getPaperType());
        List<TestPaper> list = total == 0 ? List.of() : testPaperMapper.searchPapersPage(searchDTO.getKeyword(), searchDTO.getPaperType(), offset, pageSize);

        List<TestPaperVO> voList = list.stream().map(paper -> {
            TestPaperVO vo = new TestPaperVO();
            BeanUtils.copyProperties(paper, vo);
            
            // Generate a simple company logo text (e.g. "MI" for 小米 or just first char)
            // Ideally this would map to a proper dictionary or logo URL, but generating a text placeholder here
            if (paper.getCompany() != null && paper.getCompany().contains("小米")) {
                vo.setCompanyLogoText("MI");
            } else if (paper.getCompany() != null && !paper.getCompany().isEmpty()) {
                vo.setCompanyLogoText(paper.getCompany().substring(0, 1));
            } else {
                vo.setCompanyLogoText("CO");
            }
            
            return vo;
        }).collect(Collectors.toList());

        return new PageResult<>(total, voList, pageNum, pageSize);
    }
}
