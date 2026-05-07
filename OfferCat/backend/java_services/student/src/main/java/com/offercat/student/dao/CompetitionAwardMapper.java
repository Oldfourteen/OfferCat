package com.offercat.student.dao;

import com.offercat.student.entity.CompetitionAward;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import java.util.List;

@Mapper
public interface CompetitionAwardMapper {
    List<CompetitionAward> getByStudentId(@Param("studentId") Long studentId);
    int insert(CompetitionAward award);
    int update(CompetitionAward award);
    int delete(@Param("awardId") Long awardId, @Param("studentId") Long studentId);
}
