package com.offercat.galaxy.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface PersonalGalaxyMapper {

    String selectGalaxyJson(@Param("userId") long userId);

    int upsert(@Param("userId") long userId, @Param("galaxyJson") String galaxyJson);

    int delete(@Param("userId") long userId);
}
