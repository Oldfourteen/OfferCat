SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `forum_post` (
  `post_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '帖子ID',
  `user_id` BIGINT NOT NULL COMMENT '发布人用户ID',
  `title` VARCHAR(100) NOT NULL COMMENT '帖子标题',
  `content` TEXT NOT NULL COMMENT '帖子文本内容',
  `images` VARCHAR(2000) DEFAULT NULL COMMENT '帖子图片(存储JSON数组或逗号分隔的URL)',
  `like_count` INT DEFAULT 0 COMMENT '获赞数量',
  `collect_count` INT DEFAULT 0 COMMENT '收藏数量',
  `comment_count` INT DEFAULT 0 COMMENT '评论数量',
  `view_count` INT DEFAULT 0 COMMENT '浏览数量',
  `status` TINYINT DEFAULT 1 COMMENT '状态 1正常 0隐藏/删除',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_like_count` (`like_count` DESC),
  INDEX `idx_create_time` (`create_time` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛帖子表';

CREATE TABLE IF NOT EXISTS `forum_post_like` (
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞ID',
  `user_id` BIGINT NOT NULL COMMENT '点赞人ID',
  `post_id` BIGINT NOT NULL COMMENT '帖子ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  UNIQUE KEY `uk_user_post_like` (`user_id`, `post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子点赞记录表';

CREATE TABLE IF NOT EXISTS `forum_comment` (
  `comment_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '评论ID',
  `post_id` BIGINT NOT NULL COMMENT '归属帖子ID',
  `user_id` BIGINT NOT NULL COMMENT '评论人ID',
  `content` TEXT NOT NULL COMMENT '评论内容',
  `status` TINYINT DEFAULT 1 COMMENT '状态 1正常 0删除',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  INDEX `idx_post_id` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛评论表';

SET FOREIGN_KEY_CHECKS = 1;
