package com.offercat.chat.service;

/**
 * 管理员服务接口
 * 功能：提供管理员相关的业务逻辑处理
 */
public interface AdminService {

    /**
     * 禁言用户
     *
     * @param userId   用户ID
     * @param duration 禁言时长（秒），-1表示永久禁言
     * @param operatorId 操作管理员ID
     * @param reason   禁言原因
     * @return 是否禁言成功
     */
    boolean muteUser(Long userId, Long duration, Long operatorId, String reason);

    /**
     * 解禁用户
     *
     * @param userId 用户ID
     * @return 是否解禁成功
     */
    boolean unmuteUser(Long userId);

    /**
     * 删除帖子
     *
     * @param postId 帖子ID
     * @return 是否删除成功
     */
    boolean deletePost(Long postId);

    /**
     * 获取所有被禁言的用户列表
     *
     * @return 禁言用户列表
     */
    java.util.List<java.util.Map<String, Object>> getMutedUsers();