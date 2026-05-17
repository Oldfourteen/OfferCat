/*
 * 大学生求职AI评估平台 - 题库数据库表结构
 * 包含：专业、题目、答题记录等
 * 可直接运行创建
*/

CREATE DATABASE IF NOT EXISTS `offercat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `offercat`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- 1. 专业枚举表（可选，用于关联）
-- ----------------------------
DROP TABLE IF EXISTS `major`;
CREATE TABLE `major` (
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '专业ID',
  `major_name` VARCHAR(50) NOT NULL COMMENT '专业名称',
  `major_code` VARCHAR(20) NOT NULL UNIQUE COMMENT '专业代码',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '专业描述',
  `status` TINYINT DEFAULT 1 COMMENT '状态：1启用，0禁用',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专业表';

-- ----------------------------
-- 初始化专业数据
-- ----------------------------
INSERT INTO `major` (`major_name`, `major_code`, `description`) VALUES
('计算机科学与技术', 'computer', '计算机科学与技术专业题库'),
('会计学', 'accounting', '会计学专业题库'),
('市场营销', 'marketing', '市场营销专业题库'),
('法学', 'law', '法学专业题库'),
('电气工程及其自动化', 'ee', '电气工程及其自动化专业题库'),
('英语', 'english', '英语专业题库'),
('临床医学', 'medicine', '临床医学专业题库'),
('金融学', 'finance', '金融学专业题库'),
('软件工程', 'software', '软件工程专业题库'),
('数据科学与大数据技术', 'bigdata', '数据科学与大数据技术专业题库');

-- ----------------------------
-- 2. 题库表
-- ----------------------------
DROP TABLE IF EXISTS `question_bank`;
CREATE TABLE `question_bank` (
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '题目ID',
  `major_id` INT NOT NULL COMMENT '所属专业ID',
  `question_set` VARCHAR(10) NOT NULL COMMENT '题库套题：A或B',
  `question_no` INT NOT NULL COMMENT '题目编号（1-60）',
  `question_type` VARCHAR(20) DEFAULT 'single_choice' COMMENT '题目类型：single_choice单选题',
  `question_content` TEXT NOT NULL COMMENT '题目内容',
  `option_a` VARCHAR(500) NOT NULL COMMENT '选项A',
  `option_b` VARCHAR(500) NOT NULL COMMENT '选项B',
  `option_c` VARCHAR(500) NOT NULL COMMENT '选项C',
  `option_d` VARCHAR(500) NOT NULL COMMENT '选项D',
  `correct_answer` CHAR(1) NOT NULL COMMENT '正确答案：A/B/C/D',
  `difficulty_level` INT DEFAULT 2 COMMENT '难度等级：1简单，2中等，3困难',
  `variation` VARCHAR(50) DEFAULT NULL COMMENT '题目变体标记',
  `is_enabled` TINYINT DEFAULT 1 COMMENT '启用状态：1启用，0禁用',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_major_id` (`major_id`),
  INDEX `idx_question_set` (`question_set`),
  INDEX `idx_major_set_no` (`major_id`, `question_set`, `question_no`),
  FOREIGN KEY (`major_id`) REFERENCES `major`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='专业题库表';

-- ----------------------------
-- 3. 学生答题记录表
-- ----------------------------
DROP TABLE IF EXISTS `student_question_record`;
CREATE TABLE `student_question_record` (
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID',
  `student_id` BIGINT NOT NULL COMMENT '学生ID',
  `major_id` INT NOT NULL COMMENT '专业ID',
  `question_set` VARCHAR(10) NOT NULL COMMENT '题库套题：A或B',
  `question_no` INT NOT NULL COMMENT '题目编号',
  `selected_answer` CHAR(1) DEFAULT NULL COMMENT '学生选择的答案',
  `is_correct` TINYINT DEFAULT 0 COMMENT '是否正确：1正确，0错误',
  `answered_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题时间',
  INDEX `idx_student_major_set` (`student_id`, `major_id`, `question_set`),
  FOREIGN KEY (`major_id`) REFERENCES `major`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生答题记录表';

SET FOREIGN_KEY_CHECKS = 1;
