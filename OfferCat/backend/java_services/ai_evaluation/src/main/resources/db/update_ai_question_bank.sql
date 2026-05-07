-- 大学生求职AI评估平台 - 题库数据库表结构完整创建脚本
-- 包含：1. 题库表 ai_question_bank  2. 答题记录表 student_answer_record

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ---------------------------- 
-- 1. AI提问答题题库表 
-- ---------------------------- 
DROP TABLE IF EXISTS `ai_question_bank`; 
CREATE TABLE `ai_question_bank` ( 
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '题库ID（主键）', 
  `question_type` TINYINT NOT NULL COMMENT '题目类型 1-求职常识题 2-专业技能题 3-面试模拟题 4-职业规划题 5-AI评估附加题', 
  `question_content` TEXT NOT NULL COMMENT '提问内容（题干）', 
  `option_a` VARCHAR(500) DEFAULT NULL COMMENT '选项A',
  `option_b` VARCHAR(500) DEFAULT NULL COMMENT '选项B',
  `option_c` VARCHAR(500) DEFAULT NULL COMMENT '选项C',
  `option_d` VARCHAR(500) DEFAULT NULL COMMENT '选项D',
  `core_point` VARCHAR(255) NOT NULL COMMENT '要点核心（题干考察重点，用于AI评分参考）', 
  `answer` TEXT NOT NULL COMMENT '标准参考答案', 
  `difficulty_level` TINYINT DEFAULT 2 COMMENT '难度等级 1-简单 2-中等 3-困难（用于AI梯度出题）', 
  `subject` VARCHAR(50) DEFAULT NULL COMMENT '所属科目/领域（如：计算机、会计、汉语言，适配不同专业学生）', 
  `score` TINYINT DEFAULT 5 COMMENT '题目分值（用于AI综合评分统计）', 
  `ai_tag` VARCHAR(100) DEFAULT NULL COMMENT 'AI标签（如：简历优化、面试技巧、专业基础，用于AI精准匹配提问）', 
  `is_enable` TINYINT DEFAULT 1 COMMENT '启用状态 1-启用（可被AI调用） 0-禁用（暂不使用）', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '题目创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '题目更新时间', 
  INDEX `idx_question_type` (`question_type`), 
  INDEX `idx_subject` (`subject`), 
  INDEX `idx_ai_tag` (`ai_tag`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI提问答题题库表'; 

-- ---------------------------- 
-- 2. 学生答题记录表 
-- ----------------------------
DROP TABLE IF EXISTS `student_answer_record`; 
CREATE TABLE `student_answer_record` ( 
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '答题记录ID', 
  `student_id` BIGINT NOT NULL COMMENT '学生ID', 
  `question_id` BIGINT NOT NULL COMMENT '题目ID', 
  `user_answer` TEXT NOT NULL COMMENT '用户答案', 
  `ai_score` TINYINT DEFAULT 0 COMMENT 'AI评分', 
  `ai_feedback` TEXT DEFAULT NULL COMMENT 'AI反馈评价', 
  `answer_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题时间', 
  INDEX `idx_student_question` (`student_id`,`question_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`question_id`) REFERENCES `ai_question_bank`(`question_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生答题记录表';

SET FOREIGN_KEY_CHECKS = 1;
