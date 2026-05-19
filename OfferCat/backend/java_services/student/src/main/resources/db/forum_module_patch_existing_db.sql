-- 已有库增量：执行前请先备份。
-- 若为新库可直接使用根目录 OfferCat_DataBase.sql 全量脚本。

ALTER TABLE `forum_comment`
  ADD COLUMN `reply_to_comment_id` BIGINT DEFAULT NULL COMMENT '直接被回复的评论ID(楼中楼)' AFTER `parent_id`;

ALTER TABLE `sys_message`
  ADD COLUMN `post_id` BIGINT DEFAULT NULL COMMENT '冗余帖子ID' AFTER `target_id`;

DROP TABLE IF EXISTS `forum_comment_like`;
CREATE TABLE `forum_comment_like` (
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞记录ID',
  `comment_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_comment` (`user_id`, `comment_id`),
  INDEX `idx_comment` (`comment_id`),
  FOREIGN KEY (`comment_id`) REFERENCES `forum_comment`(`comment_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛评论点赞表';

DROP TABLE IF EXISTS `forum_friend_request`;
CREATE TABLE `forum_friend_request` (
  `request_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `from_user_id` BIGINT NOT NULL,
  `to_user_id` BIGINT NOT NULL,
  `status` TINYINT NOT NULL DEFAULT 0 COMMENT '0待处理 1已同意 2已拒绝',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_pair` (`from_user_id`, `to_user_id`),
  INDEX `idx_to_status` (`to_user_id`, `status`),
  FOREIGN KEY (`from_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`to_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛好友申请表';
