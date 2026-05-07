-- ----------------------------
-- 论坛帖子模块数据库修复脚本
-- 包含 forum_posts、forum_post_likes、forum_comment 三个表的创建
-- ----------------------------

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 1. 帖子表
-- ----------------------------
DROP TABLE IF EXISTS `forum_posts`;
CREATE TABLE `forum_posts` (
  `post_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '帖子ID',
  `user_id` BIGINT NOT NULL COMMENT '发布用户ID',
  `title` VARCHAR(255) DEFAULT NULL COMMENT '帖子标题',
  `content` TEXT NOT NULL COMMENT '帖子内容',
  `images` VARCHAR(2000) DEFAULT NULL COMMENT '图片URL列表（JSON格式）',
  `like_count` INT DEFAULT 0 COMMENT '点赞数',
  `collect_count` INT DEFAULT 0 COMMENT '收藏数',
  `comment_count` INT DEFAULT 0 COMMENT '评论数',
  `view_count` INT DEFAULT 0 COMMENT '浏览数',
  `status` TINYINT DEFAULT 1 COMMENT '状态：1正常，0已删除',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛帖子表';

-- ----------------------------
-- 2. 帖子点赞表
-- ----------------------------
DROP TABLE IF EXISTS `forum_post_likes`;
CREATE TABLE `forum_post_likes` (
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞记录ID',
  `post_id` BIGINT NOT NULL COMMENT '帖子ID',
  `user_id` BIGINT NOT NULL COMMENT '用户ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  UNIQUE KEY `uk_post_user` (`post_id`, `user_id`),
  INDEX `idx_post_id` (`post_id`),
  INDEX `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子点赞记录