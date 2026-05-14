package com.offercat.chat.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * 用户禁言实体类
 * 功能：存储用户禁言记录
 * 说明：记录用户被禁言的时长、原因和到期时间
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@TableName("user_mute")
public class UserMute {

    /**
     * 记录ID（主键）
     */
    @TableId(value = "id", type = IdType.AUTO)
    private Long id;

    /**
     * 用户ID
     */
    private Long userId;

    /**
     * 禁言时长（秒），-1表示永久禁言
     */
    private Long duration;

    /**
     * 禁言开始时间
     */
    private LocalDateTime startTime;

    /**
     * 禁言结束时间（null表示永久禁言）
     */
    private LocalDateTime endTime;

    /**
     * 禁言原因
     */
    private String reason;

    /**
     * 操作管理员ID
     */
    private Long operatorId;

    /**
     * 状态：0-无效（已解禁），1-有效
     */
    private Integer status;

    /**
     * 创建时间
     */
    private LocalDateTime createTime;

    /**
     * 更新时间
     */
    private LocalDateTime updateTime;
}