-- ======================================================
-- 专业星系 · 个人星图持久化（offercat）
-- 与 starlit_question_bank.sql 中的 user_starlit_progress 配合使用
-- ======================================================

CREATE DATABASE IF NOT EXISTS `offercat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `offercat`;

CREATE TABLE IF NOT EXISTS `user_personal_galaxy` (
  `user_id` BIGINT NOT NULL COMMENT '用户ID，对应 user.user_id',
  `galaxy_json` JSON NOT NULL COMMENT 'PersonalGalaxyV1：majors、fusions、updatedAt',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_personal_galaxy_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户个人专业星图（展示/设计保存）';
