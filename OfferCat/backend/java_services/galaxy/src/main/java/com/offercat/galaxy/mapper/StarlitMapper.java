package com.offercat.galaxy.mapper;

import com.offercat.galaxy.dto.StarlitLeaderboardRowDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface StarlitMapper {

    Long selectPackIdByKey(@Param("packKey") String packKey);

    int upsertProgress(
            @Param("userId") long userId,
            @Param("packId") long packId,
            @Param("starsLit") int starsLit,
            @Param("lastQuestionNo") Integer lastQuestionNo);

    long sumStarsByUser(@Param("userId") long userId);

    long sumStarsByUserAndPackKeys(@Param("userId") long userId, @Param("packKeys") List<String> packKeys);

    List<StarlitLeaderboardRowDto> selectLeaderboard(
            @Param("limit") int limit, @Param("packKeys") List<String> packKeys);

    List<com.offercat.galaxy.dto.StarlitQuestionRow> selectQuestionsByPackId(@Param("packId") long packId);

    List<com.offercat.galaxy.dto.StarlitProgressRowDto> selectProgressByUser(@Param("userId") long userId);
}
