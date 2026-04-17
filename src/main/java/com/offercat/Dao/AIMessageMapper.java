package com.offercat.dao;

import org.apache.ibatis.annotations.Mapper;

import com.offercat.entity.AiConsult;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 15:45
 * @mail: oldfourteen41@gmail.com
 * @info: 
 */

@Mapper
public interface AIMessageMapper {


    //保存AI的一条对话，无论是人问的还是AI回答的
    int insertConsult(AiConsult aiConsult);

    List<AiConsult> selectHistoryByUserId(Long userId);
}
