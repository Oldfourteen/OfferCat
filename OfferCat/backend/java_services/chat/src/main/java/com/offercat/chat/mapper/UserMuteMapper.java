package com.offercat.chat.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.offercat.chat.entity.UserMute;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 用户禁言Mapper接口
 * 功能：提供用户禁言记录的数据库操作
 */
@Mapper
public interface UserMuteMapper extends BaseMapper<UserMute> {

    /**
     * 查询用户当前有效的禁言记录
     *
     * @param userId 用户ID
     * @return 禁言记录
     */
    @Select("SELECT * FROM user_mute WHERE user_id = #{userId} AND status = 1 AND (end_time IS NULL OR end_time > NOW()) ORDER BY create_time DESC LIMIT 1")
    UserMute selectCurrentMuteByUserId(@Param("userId") Long userId);

    /**
     * 查询所有有效的禁言记录
     *
     * @return 禁言记录列表
     */
    @Select("SELECT * FROM user_mute WHERE status = 1 AND (end_time IS NULL OR end_time > NOW())")
    List<UserMute> selectAllActiveMutes();

    /**
     * 更新禁言记录状态
     *
     * @param id     记录ID
     * @param status 状态
     * @return 更新数量
     */
    int updateStatus(@Param("id") Long id, @Param("status") Integer status);

    /**
     * 解禁过期的禁言记录
     *
     * @param now 当前时间
     * @return 更新数量
     */
    int expireMuteRecords(@Param("now") LocalDateTime now);
}