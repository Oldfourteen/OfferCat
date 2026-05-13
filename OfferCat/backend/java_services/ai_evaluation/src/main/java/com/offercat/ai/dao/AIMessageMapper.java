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

    /**
     * 按主键与用户校验后查询单条咨询（用于保留标记等按用户隔离的更新）
     */
    @Select("SELECT * FROM ai_consult WHERE id = #{consultId} AND user_id = #{userId}")
    AiConsult selectByIdAndUserId(@Param("consultId") Long consultId, @Param("userId") Long userId);

    /**
     * 统计该用户已标记为保留（retained=1）的咨询条数，用于「最多保留 10 条」校验
     */
    @Select("SELECT COUNT(*) FROM ai_consult WHERE user_id = #{userId} AND IFNULL(retained, 0) = 1")
    int countRetainedByUserId(Long userId);

    /**
     * 更新指定咨询记录的保留标记（必须 id、user_id 同时匹配）
     */
    @Update("UPDATE ai_consult SET retained = #{retained} WHERE id = #{id} AND user_id = #{userId}")
    int updateRetained(@Param("id") Long id, @Param("userId") Long userId, @Param("retained") int retained);

    /**
     * 查出仍存在「未保留」咨询的用户 ID，供按月清理任务遍历
     */
    @Select("SELECT DISTINCT user_id FROM ai_consult WHERE IFNULL(retained, 0) = 0")
    List<Long> selectUserIdsHavingDeletableConsults();

    /**
     * 某用户未保留记录中按创建时间最旧的一批 id（LIMIT），用于批量删除
     */
    @Select("SELECT id FROM ai_consult WHERE user_id = #{userId} AND IFNULL(retained, 0) = 0 ORDER BY create_time ASC LIMIT #{limit}")
    List<Long> selectOldestDeletableConsultIds(@Param("userId") Long userId, @Param("limit") int limit);

    /**
     * 按 id 列表批量删除咨询记录（仅应由定时任务在无保留约束的数据上使用）
     */
    @Delete("<script>DELETE FROM ai_consult WHERE id IN <foreach item=\"id\" collection=\"ids\" open=\"(\" separator=\",\" close=\")\">#{id}</foreach></script>")
    int deleteByIds(@Param("ids") List<Long> ids);
}