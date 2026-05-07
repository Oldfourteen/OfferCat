-- ----------------------------
-- 面试会话表
-- ----------------------------
DROP TABLE IF EXISTS `interview_session`;
CREATE TABLE `interview_session` (
  `session_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '会话ID',
  `student_id` BIGINT NOT NULL COMMENT '学生ID',
  `target_position` VARCHAR(50) DEFAULT NULL COMMENT '目标岗位',
  `interview_mode` TINYINT DEFAULT 1 COMMENT '面试模式 1-模拟面试 2-真题练习 3-专项训练',
  `total_questions` INT DEFAULT 10 COMMENT '总题目数',
  `answered_questions` INT DEFAULT 0 COMMENT '已答题目数',
  `difficulty_level` TINYINT DEFAULT 2 COMMENT '当前难度 1-简单 2-中等 3-困难',
  `session_status` TINYINT DEFAULT 1 COMMENT '会话状态 0-已结束 1-进行中',
  `current_stage` VARCHAR(50) DEFAULT 'WRITTEN' COMMENT '当前面试阶段',
  `start_time` DATETIME DEFAULT NULL COMMENT '开始时间',
  `end_time` DATETIME DEFAULT NULL COMMENT '结束时间',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_student_id` (`student_id`),
  INDEX `idx_status` (`session_status`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='面试会话表';

-- ----------------------------
-- 初始化面试会话状态数据
-- ----------------------------
INSERT INTO `interview_session` VALUES
(1, 1, 'Java开发工程师', 1, 10, 5, 2, 1, NOW(), NULL, NOW(), NOW()),
(2, 1, '前端开发工程师', 2, 5, 0, 1, 0, NOW(), NOW(), NOW(), NOW());
