package com.offercat.ai._service;

import com.offercat.ai.dao.AIMessageMapper;
import com.offercat.ai.entity.AiConsult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * AI 云端咨询记录：用户最多保留 10 条；每月 15 日删除未保留记录中每人最旧的 10 条。
 */
@Service
public class AiConsultRetentionService {

    private static final Logger log = LoggerFactory.getLogger(AiConsultRetentionService.class);

    public static final int MAX_RETAINED_PER_USER = 10;
    public static final int MONTHLY_DELETE_PER_USER = 10;

    private final AIMessageMapper aiMessageMapper;

    public AiConsultRetentionService(AIMessageMapper aiMessageMapper) {
        this.aiMessageMapper = aiMessageMapper;
    }

    /**
     * 设置单条云端咨询是否保留
     * 输入：用户ID、咨询记录ID、是否保留
     * 输出：无；记录不存在或非法操作时抛出 IllegalArgumentException，超过每人保留上限时抛出 IllegalStateException
     */
    @Transactional
    public void setRetained(long userId, long consultId, boolean retained) {
        AiConsult row = aiMessageMapper.selectByIdAndUserId(consultId, userId);
        if (row == null) {
            throw new IllegalArgumentException("记录不存在");
        }
        int current = row.getRetained() != null && row.getRetained() == 1 ? 1 : 0;
        int next = retained ? 1 : 0;
        if (current == next) {
            return;
        }
        if (next == 1) {
            int count = aiMessageMapper.countRetainedByUserId(userId);
            if (current == 0 && count >= MAX_RETAINED_PER_USER) {
                throw new IllegalStateException("最多保留10条对话");
            }
        }
        int updated = aiMessageMapper.updateRetained(consultId, userId, next);
        if (updated == 0) {
            throw new IllegalArgumentException("更新失败");
        }
    }

    /**
     * 每月 15 日 03:00（服务器默认时区）执行；每个用户删除未保留记录中最旧的若干条。
     */
    @Scheduled(cron = "0 0 3 15 * ?")
    @Transactional
    public void monthlyPurgeNonRetained() {
        log.info("AI consult monthly purge started");
        List<Long> userIds = aiMessageMapper.selectUserIdsHavingDeletableConsults();
        int totalDeleted = 0;
        for (Long userId : userIds) {
            if (userId == null) {
                continue;
            }
            List<Long> ids = aiMessageMapper.selectOldestDeletableConsultIds(userId, MONTHLY_DELETE_PER_USER);
            if (ids != null && !ids.isEmpty()) {
                totalDeleted += aiMessageMapper.deleteByIds(ids);
            }
        }
        log.info("AI consult monthly purge finished, removed {} rows", totalDeleted);
    }
}
