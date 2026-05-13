package com.offercat.ai.dao;

import com.offercat.ai.entity.AiConsult;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

/**
 * @author: Ofteen
 * @data: 2026/4/17 - 15:45
 * @mail: oldfourteen41@gmail.com
 * @info: AI消息Mapper
 */
@Mapper
public interface AIMessageMapper {
    //保存AI的一条对话，无论是人问的还是AI回答的
    @Insert("INSERT INTO ai_consult(user_id, user_content, ai_content, user_images, ai_images, retained, create_time) " +
            "VALUES(#{userId}, #{userContent}, #{aiContent}, #{userImages}, #{aiImages}, 0, #{createTime})")
    int insertConsult(AiConsult aiConsult);
    /**
     * 根据用户ID查询AI咨询历史记录
     */
    @Select("SELECT * FROM ai_consult WHERE user_id = #{userId} ORDER BY create_time DESC")
    List<AiConsult> selectHistoryByUserId(Long userId);

    @Select("SELECT * FROM ai_consult WHERE id = #{consultId} AND user_id = #{userId}")
    AiConsult selectByIdAndUserId(@Param("consultId") Long consultId, @Param("userId") Long userId);

    @Select("SELECT COUNT(*) FROM ai_consult WHERE user_id = #{userId} AND IFNULL(retained, 0) = 1")
    int countRetainedByUserId(Long userId);

    @Update("UPDATE ai_consult SET retained = #{retained} WHERE id = #{id} AND user_id = #{userId}")
    int updateRetained(@Param("id") Long id, @Param("userId") Long userId, @Param("retained") int retained);

    @Select("SELECT DISTINCT user_id FROM ai_consult WHERE IFNULL(retained, 0) = 0")
    List<Long> selectUserIdsHavingDeletableConsults();

    @Select("SELECT id FROM ai_consult WHERE user_id = #{userId} AND IFNULL(retained, 0) = 0 ORDER BY create_time ASC LIMIT #{limit}")
    List<Long> selectOldestDeletableConsultIds(@Param("userId") Long userId, @Param("limit") int limit);

    @Delete("<script>DELETE FROM ai_consult WHERE id IN <foreach item=\"id\" collection=\"ids\" open=\"(\" separator=\",\" close=\")\">#{id}</foreach></script>")
    int deleteByIds(@Param("ids") List<Long> ids);
}