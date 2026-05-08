package com.offercat.student.dao;

import com.offercat.student.entity.CompetitionAward;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;
/**
 * 竞赛奖励映射器
 * 功能：提供竞赛奖励相关的数据库操作
 */
@Mapper
/**
 * 竞赛奖励映射器
 * 功能：提供竞赛奖励相关的数据库操作
 */
public interface CompetitionAwardMapper {
    /**
     * 根据学生 ID 获取竞赛奖励列表
     * @param studentId 学生 ID
     * @return 竞赛奖励列表
     */
    List<CompetitionAward> getByStudentId(@Param("studentId") Long studentId);
    int insert(CompetitionAward award);
    int update(CompetitionAward award);
    int delete(@Param("awardId") Long awardId, @Param("studentId") Long studentId);
}
