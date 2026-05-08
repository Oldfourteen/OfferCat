package com.offercat.student.dao;

import com.offercat.student.entity.TestPaper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 测试试卷映射器
 * 功能：提供测试试卷相关的数据库操作
 */
@Mapper
public interface TestPaperMapper {
    /**
     * 根据关键字和类型搜索套卷
     * @param keyword 搜索关键字（可匹配公司名或套卷名称）
     * @param paperType 套卷类型 1-笔试 2-面试
     * @param offset 偏移量
     * @param pageSize 每页条数
     * @return 套卷列表（分页）
     */
    List<TestPaper> searchPapersPage(@Param("keyword") String keyword,
                                     @Param("paperType") Integer paperType,
                                     @Param("offset") int offset,
                                     @Param("pageSize") int pageSize);

    /**
     * 根据关键字和类型统计套卷总数
     */
    long countPapers(@Param("keyword") String keyword, @Param("paperType") Integer paperType);
    
    /**
     * 获取套卷详情
     */
    TestPaper getPaperById(@Param("paperId") Long paperId);
}
