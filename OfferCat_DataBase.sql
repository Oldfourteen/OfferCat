CREATE DATABASE offercat;
USE offercat; 
SET NAMES utf8mb4; 
SET FOREIGN_KEY_CHECKS = 0; 
 
-- ---------------------------- 
-- 1. 用户表 
-- ---------------------------- 
DROP TABLE IF EXISTS `user`; 
CREATE TABLE `user` ( 
  `user_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '用户唯一ID', 
  `password` VARCHAR(100) NOT NULL COMMENT '加密密码', 
  `nickname` VARCHAR(30) DEFAULT NULL COMMENT '姓名/昵称', 
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像URL', 
  `gender` TINYINT DEFAULT 0 COMMENT '0未知 1男 2女', 
  `phone` VARCHAR(11) DEFAULT NULL COMMENT '手机号', 
  `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱', 
  `real_name` VARCHAR(20) DEFAULT NULL COMMENT '真实姓名', 
  `id_card` VARCHAR(18) DEFAULT NULL COMMENT '身份证号', 
  `school` VARCHAR(50) DEFAULT NULL COMMENT '学校', 
  `user_role` TINYINT NOT NULL COMMENT '1学生 4管理员', 
  `user_status` TINYINT DEFAULT 1 COMMENT '1正常 0禁用', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间', 
  INDEX `idx_user_role` (`user_role`), 
  INDEX `idx_phone` (`phone`), 
  INDEX `idx_email` (`email`), 
  CONSTRAINT `chk_email_format` CHECK (`email` IS NULL OR `email` REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$') 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统用户表'; 

-- ---------------------------- 
-- 2. 学生表 
-- ---------------------------- 
DROP TABLE IF EXISTS `student`; 
CREATE TABLE `student` ( 
  `student_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '学生ID', 
  `user_id` BIGINT NOT NULL COMMENT '用户ID', 
  `school` VARCHAR(50) DEFAULT NULL COMMENT '学校', 
  `college` VARCHAR(50) DEFAULT NULL COMMENT '学院', 
  `grade` VARCHAR(20) DEFAULT NULL COMMENT '年级', 
  `class_name` VARCHAR(30) DEFAULT NULL COMMENT '班级', 
  `major` VARCHAR(50) DEFAULT NULL COMMENT '专业', 
  `company_id` BIGINT DEFAULT NULL COMMENT '实习企业', 
  `age` TINYINT DEFAULT NULL COMMENT '年龄', 
  `education` VARCHAR(20) DEFAULT NULL COMMENT '学历', 
  `bio` VARCHAR(25) DEFAULT NULL COMMENT '个人简介(限制25字)', 
  `job_status` VARCHAR(20) DEFAULT NULL COMMENT '求职状态(如:求职中,观望中)', 
  `job_direction` VARCHAR(8) DEFAULT NULL COMMENT '求职方向(限制8字)', 
  `intent_city` VARCHAR(4) DEFAULT NULL COMMENT '意向城市(限制4字)', 
  `expected_salary` VARCHAR(10) DEFAULT NULL COMMENT '期望薪资(限制10字)', 
  `radar_id` BIGINT DEFAULT NULL COMMENT '雷达评估ID', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  UNIQUE KEY `uk_user_id` (`user_id`), 
  INDEX `idx_major` (`major`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生信息表'; 
 
-- ---------------------------- 
-- 3. 角色表 
-- ---------------------------- 
DROP TABLE IF EXISTS `role`; 
CREATE TABLE `role` ( 
  `role_id` TINYINT PRIMARY KEY AUTO_INCREMENT COMMENT '角色ID', 
  `role_name` VARCHAR(20) NOT NULL COMMENT '角色名称', 
  `role_desc` VARCHAR(50) DEFAULT NULL COMMENT '角色描述' 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统角色表'; 
 
-- ---------------------------- 
-- 4. 权限表 
-- ---------------------------- 
DROP TABLE IF EXISTS `permission`; 
CREATE TABLE `permission` ( 
  `perm_id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '权限ID', 
  `perm_name` VARCHAR(30) NOT NULL COMMENT '权限名称', 
  `perm_key` VARCHAR(50) NOT NULL UNIQUE COMMENT '权限标识键' 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='权限表'; 
 
-- ---------------------------- 
-- 5. 角色权限关联表 
-- ---------------------------- 
DROP TABLE IF EXISTS `role_permission`; 
CREATE TABLE `role_permission` ( 
  `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID', 
  `role_id` TINYINT NOT NULL COMMENT '角色ID', 
  `perm_key` VARCHAR(50) NOT NULL COMMENT '权限标识键', 
  UNIQUE KEY `uk_role_perm` (`role_id`,`perm_key`), 
  FOREIGN KEY (`role_id`) REFERENCES `role`(`role_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`perm_key`) REFERENCES `permission`(`perm_key`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色权限关联表'; 
 
-- ---------------------------- 
-- 6. 简历表 (独立，包含个人基本信息)
-- ---------------------------- 
DROP TABLE IF EXISTS `resume`; 
CREATE TABLE `resume` ( 
  `resume_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '简历ID', 
  `resume_name` VARCHAR(100) DEFAULT NULL COMMENT '简历名称', 
  `user_id` BIGINT NOT NULL COMMENT '用户ID', 
  `real_name` VARCHAR(20) DEFAULT NULL COMMENT '姓名', 
  `gender` TINYINT DEFAULT 0 COMMENT '性别 0未知 1男 2女', 
  `phone` VARCHAR(11) DEFAULT NULL COMMENT '手机号', 
  `email` VARCHAR(50) DEFAULT NULL COMMENT '邮箱', 
  `photo` VARCHAR(255) DEFAULT NULL COMMENT '照片URL', 
  `campus_experience` TEXT DEFAULT NULL COMMENT '在校经历', 
  `work_experience` TEXT DEFAULT NULL COMMENT '工作经历', 
  `project_experience` TEXT DEFAULT NULL COMMENT '项目经验', 
  `self_evaluation` TEXT DEFAULT NULL COMMENT '自我评价', 
  `ai_score` DECIMAL(5,2) DEFAULT NULL COMMENT 'AI评分', 
  `ai_evaluation` TEXT DEFAULT NULL COMMENT 'AI评估内容', 
  `resume_status` TINYINT DEFAULT 1 COMMENT '简历状态 1正常 0禁用', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间', 
  INDEX `idx_user_id` (`user_id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='简历表'; 
 
-- ---------------------------- 
-- 6.1 简历技能熟练程度表 
-- ---------------------------- 
DROP TABLE IF EXISTS `resume_skill`; 
CREATE TABLE `resume_skill` ( 
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '主键ID', 
  `resume_id` BIGINT NOT NULL COMMENT '简历ID', 
  `skill_name` VARCHAR(50) NOT NULL COMMENT '技能名称', 
  `proficiency` TINYINT NOT NULL COMMENT '熟练程度：1-初学，2-一般，3-掌握，4-熟练，5-精通', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  INDEX `idx_resume_id` (`resume_id`), 
  FOREIGN KEY (`resume_id`) REFERENCES `resume`(`resume_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='简历技能熟练程度表'; 

-- ---------------------------- 
-- 7. 雷达评估表 (已更新，包含7个能力数值字段) 
-- ---------------------------- 
DROP TABLE IF EXISTS `radar_evaluation`; 
CREATE TABLE `radar_evaluation` ( 
  `radar_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '雷达图ID', 
  `student_id` BIGINT NOT NULL COMMENT '学生ID', 
  `professional_ability` TINYINT DEFAULT 0 COMMENT '专业能力', 
  `project_experience` TINYINT DEFAULT 0 COMMENT '项目经验', 
  `competition_results` TINYINT DEFAULT 0 COMMENT '竞赛成果', 
  `academic_background` TINYINT DEFAULT 0 COMMENT '学历背景', 
  `soft_skills` TINYINT DEFAULT 0 COMMENT '软技能', 
  `industry_cognition` TINYINT DEFAULT 0 COMMENT '行业认知', 
  `stress_execution` TINYINT DEFAULT 0 COMMENT '抗压与执行力',
  `total_score` DECIMAL(5,2) DEFAULT NULL COMMENT '总分', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  UNIQUE KEY `uk_student_id` (`student_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='能力雷达评估表'; 
 
-- ---------------------------- 
-- 8. 私信表 
-- ---------------------------- 
--DROP TABLE IF EXISTS `message`; 
--CREATE TABLE `message` ( 
--  `msg_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '消息ID', 
--  `from_user_id` BIGINT NOT NULL COMMENT '发送方用户ID', 
--  `to_user_id` BIGINT NOT NULL COMMENT '接收方用户ID', 
--  `content` TEXT NOT NULL COMMENT '消息内容', 
--  `img_url` VARCHAR(255) DEFAULT NULL COMMENT '图片URL', 
--  `msg_status` TINYINT DEFAULT 1 COMMENT '消息状态 1正常 0删除', 
--  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间', 
--  INDEX `idx_from_to` (`from_user_id`,`to_user_id`), 
--  FOREIGN KEY (`from_user_id`) REFERENCES `user`(`user_id`), 
--  FOREIGN KEY (`to_user_id`) REFERENCES `user`(`user_id`) 
--) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='私信表'; 
 
-- ---------------------------- 
-- 9. AI顾问对话表 
-- ---------------------------- 
DROP TABLE IF EXISTS `ai_consult`; 
CREATE TABLE `ai_consult` ( 
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '对话ID', 
  `user_id` BIGINT NOT NULL COMMENT '用户ID', 
  `user_content` TEXT NOT NULL COMMENT '用户提问内容', 
  `ai_content` TEXT NOT NULL COMMENT 'AI回复内容', 
  `ai_avatar` VARCHAR(255) DEFAULT NULL COMMENT 'AI头像URL', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '对话时间', 
  `user_images` JSON DEFAULT NULL COMMENT '用户发送的图片列表',
  `ai_images` JSON DEFAULT NULL COMMENT 'AI生成的图片列表',
  `retained` TINYINT NOT NULL DEFAULT 0 COMMENT '1=用户保留不参与每月15日清理',
  INDEX `idx_user_id` (`user_id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI顾问对话表'; 
 
-- ---------------------------- 
-- 10. AI提问答题题库表 
-- ---------------------------- 
DROP TABLE IF EXISTS `ai_question_bank`; 
CREATE TABLE `ai_question_bank` ( 
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '题库ID（主键）', 
  `question_type` TINYINT NOT NULL COMMENT '题目类型 1-求职常识题 2-专业技能题 3-面试模拟题 4-职业规划题 5-AI评估附加题', 
  `question_content` TEXT NOT NULL COMMENT '提问内容（题干）', 
  `core_point` VARCHAR(255) NOT NULL COMMENT '要点核心（题干考察重点，用于AI评分参考）', 
  `answer` TEXT NOT NULL COMMENT '标准参考答案', 
  `difficulty_level` TINYINT DEFAULT 2 COMMENT '难度等级 1-简单 2-中等 3-困难（用于AI梯度出题）', 
  `subject` VARCHAR(50) DEFAULT NULL COMMENT '所属科目/领域（如：计算机、会计、汉语言，适配不同专业学生）', 
  `score` TINYINT DEFAULT 5 COMMENT '题目分值（用于AI综合评分统计）', 
  `ai_tag` VARCHAR(100) DEFAULT NULL COMMENT 'AI标签（如：简历优化、面试技巧、专业基础，用于AI精准匹配提问）', 
  `is_enable` TINYINT DEFAULT 1 COMMENT '启用状态 1-启用（可被AI调用） 0-禁用（暂不使用）', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '题目创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT='题目更新时间', 
  INDEX `idx_question_type` (`question_type`), 
  INDEX `idx_subject` (`subject`), 
  INDEX `idx_ai_tag` (`ai_tag`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI提问答题题库表'; 
 
-- ---------------------------- 
-- 11. 学生答题记录表 
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
 
-- ---------------------------- 
-- 12. AI综合评估报告表 
-- ---------------------------- 
DROP TABLE IF EXISTS `ai_report`; 
CREATE TABLE `ai_report` ( 
  `report_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '报告ID', 
  `student_id` BIGINT NOT NULL COMMENT '学生ID', 
  `total_score` TINYINT DEFAULT 0 COMMENT '总分', 
  `advantage` TEXT DEFAULT NULL COMMENT '优势分析', 
  `disadvantage` TEXT DEFAULT NULL COMMENT '劣势分析', 
  `career_suggest` TEXT DEFAULT NULL COMMENT '职业建议', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '生成时间', 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI评估报告表'; 
 
-- ---------------------------- 
-- 13. 系统公告表 
-- ---------------------------- 
DROP TABLE IF EXISTS `notice`; 
CREATE TABLE `notice` ( 
  `notice_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '公告ID', 
  `title` VARCHAR(100) NOT NULL COMMENT '公告标题', 
  `content` TEXT NOT NULL COMMENT '公告内容', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间' 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统公告表'; 
 
-- ---------------------------- 
-- 14. 雷达图评估问卷题库表 (已更新)
-- ---------------------------- 
DROP TABLE IF EXISTS `radar_question`; 
CREATE TABLE `radar_question` ( 
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '问卷题目ID', 
  `content` TEXT NOT NULL COMMENT '题目内容', 
  `option_a` VARCHAR(255) NOT NULL COMMENT '选项A内容', 
  `score_a_prof` TINYINT DEFAULT 0 COMMENT '选A对"专业能力"加分', 
  `score_a_proj` TINYINT DEFAULT 0 COMMENT '选A对"项目经验"加分', 
  `score_a_comp` TINYINT DEFAULT 0 COMMENT '选A对"竞赛成果"加分', 
  `score_a_acad` TINYINT DEFAULT 0 COMMENT '选A对"学历背景"加分', 
  `score_a_soft` TINYINT DEFAULT 0 COMMENT '选A对"软技能"加分', 
  `score_a_indu` TINYINT DEFAULT 0 COMMENT '选A对"行业认知"加分', 
  `score_a_exec` TINYINT DEFAULT 0 COMMENT '选A对"抗压与执行力"加分',
  `option_b` VARCHAR(255) NOT NULL COMMENT '选项B内容', 
  `score_b_prof` TINYINT DEFAULT 0 COMMENT '选B对"专业能力"加分', 
  `score_b_proj` TINYINT DEFAULT 0 COMMENT '选B对"项目经验"加分', 
  `score_b_comp` TINYINT DEFAULT 0 COMMENT '选B对"竞赛成果"加分', 
  `score_b_acad` TINYINT DEFAULT 0 COMMENT '选B对"学历背景"加分', 
  `score_b_soft` TINYINT DEFAULT 0 COMMENT '选B对"软技能"加分', 
  `score_b_indu` TINYINT DEFAULT 0 COMMENT '选B对"行业认知"加分', 
  `score_b_exec` TINYINT DEFAULT 0 COMMENT '选B对"抗压与执行力"加分',
  `option_c` VARCHAR(255) DEFAULT NULL COMMENT '选项C内容', 
  `score_c_prof` TINYINT DEFAULT 0 COMMENT '选C对"专业能力"加分', 
  `score_c_proj` TINYINT DEFAULT 0 COMMENT '选C对"项目经验"加分', 
  `score_c_comp` TINYINT DEFAULT 0 COMMENT '选C对"竞赛成果"加分', 
  `score_c_acad` TINYINT DEFAULT 0 COMMENT '选C对"学历背景"加分', 
  `score_c_soft` TINYINT DEFAULT 0 COMMENT '选C对"软技能"加分', 
  `score_c_indu` TINYINT DEFAULT 0 COMMENT '选C对"行业认知"加分', 
  `score_c_exec` TINYINT DEFAULT 0 COMMENT '选C对"抗压与执行力"加分',
  `option_d` VARCHAR(255) DEFAULT NULL COMMENT '选项D内容', 
  `score_d_prof` TINYINT DEFAULT 0 COMMENT '选D对"专业能力"加分', 
  `score_d_proj` TINYINT DEFAULT 0 COMMENT '选D对"项目经验"加分', 
  `score_d_comp` TINYINT DEFAULT 0 COMMENT '选D对"竞赛成果"加分', 
  `score_d_acad` TINYINT DEFAULT 0 COMMENT '选D对"学历背景"加分', 
  `score_d_soft` TINYINT DEFAULT 0 COMMENT '选D对"软技能"加分', 
  `score_d_indu` TINYINT DEFAULT 0 COMMENT '选D对"行业认知"加分', 
  `score_d_exec` TINYINT DEFAULT 0 COMMENT '选D对"抗压与执行力"加分',
  `status` TINYINT DEFAULT 1 COMMENT '状态 1启用 0禁用', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间' 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='雷达图评估问卷题库表(支持多维度赋分)'; 
 
-- ---------------------------- 
-- 15. 雷达图评估问卷用户答题记录表 (已更新)
-- ---------------------------- 
DROP TABLE IF EXISTS `radar_question_record`; 
CREATE TABLE `radar_question_record` ( 
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '记录ID', 
  `student_id` BIGINT NOT NULL COMMENT '答题学生ID', 
  `question_id` BIGINT NOT NULL COMMENT '题目ID', 
  `selected_option` CHAR(1) NOT NULL COMMENT '用户选择的选项(A/B/C/D)', 
  `score_gained_prof` TINYINT DEFAULT 0 COMMENT '该题实际获得的"专业能力"分值', 
  `score_gained_proj` TINYINT DEFAULT 0 COMMENT '该题实际获得的"项目经验"分值', 
  `score_gained_comp` TINYINT DEFAULT 0 COMMENT '该题实际获得的"竞赛成果"分值', 
  `score_gained_acad` TINYINT DEFAULT 0 COMMENT '该题实际获得的"学历背景"分值', 
  `score_gained_soft` TINYINT DEFAULT 0 COMMENT '该题实际获得的"软技能"分值', 
  `score_gained_indu` TINYINT DEFAULT 0 COMMENT '该题实际获得的"行业认知"分值', 
  `score_gained_exec` TINYINT DEFAULT 0 COMMENT '该题实际获得的"抗压与执行力"分值',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题时间', 
  INDEX `idx_student` (`student_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`question_id`) REFERENCES `radar_question`(`question_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='雷达图评估问卷答题记录表'; 
 
-- ---------------------------- 
-- 16. 论坛帖子表 
-- ---------------------------- 
DROP TABLE IF EXISTS `forum_post`; 
CREATE TABLE `forum_post` ( 
  `post_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '帖子ID', 
  `user_id` BIGINT NOT NULL COMMENT '发布人用户ID', 
  `title` VARCHAR(100) NOT NULL COMMENT '帖子标题', 
  `content` TEXT NOT NULL COMMENT '帖子文本内容', 
  `images` VARCHAR(2000) DEFAULT NULL COMMENT '帖子图片(最多9张，存储JSON数组或逗号分隔的URL)', 
  `like_count` INT DEFAULT 0 COMMENT '获赞数量(用于排序)', 
  `collect_count` INT DEFAULT 0 COMMENT '收藏数量', 
  `comment_count` INT DEFAULT 0 COMMENT '评论数量', 
  `status` TINYINT DEFAULT 1 COMMENT '状态 1正常 0隐藏/删除', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发布时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间', 
  INDEX `idx_user_id` (`user_id`), 
  INDEX `idx_like_count` (`like_count` DESC), 
  INDEX `idx_create_time` (`create_time` DESC), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛帖子表'; 
 
-- ---------------------------- 
-- 17. 帖子收藏表 
-- ---------------------------- 
DROP TABLE IF EXISTS `forum_post_collect`; 
CREATE TABLE `forum_post_collect` ( 
  `collect_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '收藏ID', 
  `user_id` BIGINT NOT NULL COMMENT '收藏人ID', 
  `post_id` BIGINT NOT NULL COMMENT '帖子ID', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间', 
  UNIQUE KEY `uk_user_post` (`user_id`, `post_id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`post_id`) REFERENCES `forum_post`(`post_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子收藏表'; 
 
-- ---------------------------- 
-- 18. 帖子点赞表 
-- ---------------------------- 
DROP TABLE IF EXISTS `forum_post_like`; 
CREATE TABLE `forum_post_like` ( 
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞ID', 
  `user_id` BIGINT NOT NULL COMMENT '点赞人ID', 
  `post_id` BIGINT NOT NULL COMMENT '帖子ID', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间', 
  UNIQUE KEY `uk_user_post_like` (`user_id`, `post_id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`post_id`) REFERENCES `forum_post`(`post_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子点赞记录表'; 
 
-- ---------------------------- 
-- 19. 论坛评论表 
-- ---------------------------- 
DROP TABLE IF EXISTS `forum_comment`; 
CREATE TABLE `forum_comment` ( 
  `comment_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '评论ID', 
  `post_id` BIGINT NOT NULL COMMENT '归属帖子ID', 
  `user_id` BIGINT NOT NULL COMMENT '评论人ID', 
  `parent_id` BIGINT DEFAULT 0 COMMENT '父评论ID(0表示直接评论帖子，非0表示回复某条评论)', 
  `reply_to_user_id` BIGINT DEFAULT NULL COMMENT '被回复人ID(如果是追评的话)', 
  `content` TEXT NOT NULL COMMENT '评论内容', 
  `like_count` INT DEFAULT 0 COMMENT '评论点赞数', 
  `status` TINYINT DEFAULT 1 COMMENT '状态 1正常 0删除', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间', 
  INDEX `idx_post_id` (`post_id`), 
  INDEX `idx_parent_id` (`parent_id`), 
  FOREIGN KEY (`post_id`) REFERENCES `forum_post`(`post_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛评论表(支持父子层级)'; 
 
-- ---------------------------- 
-- 20. 互动消息提醒表 
-- ---------------------------- 
DROP TABLE IF EXISTS `sys_message`; 
CREATE TABLE `sys_message` ( 
  `msg_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '消息ID', 
  `receiver_id` BIGINT NOT NULL COMMENT '消息接收人ID', 
  `sender_id` BIGINT NOT NULL COMMENT '动作触发人ID', 
  `msg_type` TINYINT NOT NULL COMMENT '消息类型 1-点赞帖子 2-评论帖子 3-回复评论', 
  `target_id` BIGINT NOT NULL COMMENT '目标ID(如帖子ID或评论ID，用于跳转)', 
  `content` VARCHAR(255) DEFAULT NULL COMMENT '消息附带内容(如评论的截取文本)', 
  `is_read` TINYINT DEFAULT 0 COMMENT '是否已读 0未读 1已读', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '消息产生时间', 
  INDEX `idx_receiver_read` (`receiver_id`, `is_read`), 
  FOREIGN KEY (`receiver_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`sender_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='互动消息提醒表'; 
 
-- ---------------------------- 
-- 21. AI职业画像表 
-- ---------------------------- 
DROP TABLE IF EXISTS `career_portrait`; 
CREATE TABLE `career_portrait` ( 
  `portrait_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '画像ID', 
  `user_id` BIGINT NOT NULL COMMENT '关联用户ID', 
  `image_url` VARCHAR(255) NOT NULL COMMENT 'AI生成的画像图片URL', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '生成时间', 
  UNIQUE KEY `uk_user_id` (`user_id`), 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI职业画像表'; 
 
-- ---------------------------- 
-- 22. 简历PDF文件表 
-- ---------------------------- 
DROP TABLE IF EXISTS `resume_pdf`; 
CREATE TABLE `resume_pdf` ( 
  `pdf_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT 'PDF文件ID', 
  `student_id` BIGINT NOT NULL COMMENT '归属学生ID', 
  `resume_id` BIGINT NOT NULL COMMENT '关联简历ID', 
  `file_url` VARCHAR(500) NOT NULL COMMENT '生成的PDF文件存储路径或URL', 
  `file_name` VARCHAR(100) DEFAULT NULL COMMENT 'PDF文件名', 
  `file_size` INT DEFAULT NULL COMMENT '文件大小(字节)', 
  `file_version` INT DEFAULT 1 COMMENT '版本号(用于版本管理)', 
  `file_hash` VARCHAR(64) DEFAULT NULL COMMENT '文件哈希值(用于去重和校验)', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '生成时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间', 
  INDEX `idx_student_id` (`student_id`), 
  INDEX `idx_resume_id` (`resume_id`), 
  INDEX `idx_file_hash` (`file_hash`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`resume_id`) REFERENCES `resume`(`resume_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='简历PDF文件存储表'; 
 
-- ---------------------------- 
-- 22.5. 套卷表 
-- ---------------------------- 
DROP TABLE IF EXISTS `test_paper`; 
CREATE TABLE `test_paper` (
  `paper_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '套卷ID',
  `paper_name` VARCHAR(100) NOT NULL COMMENT '套卷名称(如：2024 年秋招 - 小米集团 - 软件开发岗 - 第二批笔试)',
  `company` VARCHAR(50) DEFAULT NULL COMMENT '所属公司',
  `paper_type` TINYINT NOT NULL COMMENT '套卷类型 1-笔试 2-面试',
  `question_count` INT DEFAULT 0 COMMENT '题目数量',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_company_name` (`company`, `paper_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='套卷表';

-- ---------------------------- 
-- 23. 笔试题题库表 
-- ---------------------------- 
DROP TABLE IF EXISTS `written_test_question_bank`; 
CREATE TABLE `written_test_question_bank` ( 
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '笔试题ID', 
  `paper_id` BIGINT DEFAULT NULL COMMENT '归属套卷ID',
  `major` VARCHAR(50) NOT NULL COMMENT '所属专业', 
  `paper_set` VARCHAR(10) NOT NULL COMMENT '套题名称(如A, B)', 
  `question_type` VARCHAR(50) NOT NULL COMMENT '题目类型(如单选题)', 
  `question_content` TEXT NOT NULL COMMENT '提问内容（题干）', 
  `option_a` VARCHAR(255) NOT NULL COMMENT '选项A内容', 
  `option_b` VARCHAR(255) NOT NULL COMMENT '选项B内容', 
  `option_c` VARCHAR(255) NOT NULL COMMENT '选项C内容', 
  `option_d` VARCHAR(255) NOT NULL COMMENT '选项D内容', 
  `correct_answer` CHAR(1) NOT NULL COMMENT '正确答案(A/B/C/D)', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '题目创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '题目更新时间', 
  INDEX `idx_major_paper` (`major`, `paper_set`),
  INDEX `idx_paper_id` (`paper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='笔试题题库表'; 

-- ---------------------------- 
-- 24. 学生笔试题答题记录表 
-- ---------------------------- 
DROP TABLE IF EXISTS `student_written_test_record`; 
CREATE TABLE `student_written_test_record` ( 
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '答题记录ID', 
  `student_id` BIGINT NOT NULL COMMENT '答题学生ID', 
  `paper_record_id` BIGINT DEFAULT NULL COMMENT '归属的套卷答题记录ID', 
  `question_id` BIGINT NOT NULL COMMENT '笔试题目ID', 
  `user_answer` CHAR(1) NOT NULL COMMENT '用户选择的答案(A/B/C/D)', 
  `is_correct` TINYINT DEFAULT 0 COMMENT '是否正确 1正确 0错误', 
  `total_score` INT DEFAULT 0 COMMENT '本次答题总分', 
  `answer_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题时间', 
  INDEX `idx_student` (`student_id`), 
  INDEX `idx_paper_record` (`paper_record_id`), 
  INDEX `idx_question` (`question_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`question_id`) REFERENCES `written_test_question_bank`(`question_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`paper_record_id`) REFERENCES `student_paper_record`(`paper_record_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生笔试题答题记录表'; 

-- ---------------------------- 
-- 25. 面试题题库表 
-- ---------------------------- 
DROP TABLE IF EXISTS `interview_question_bank`; 
CREATE TABLE `interview_question_bank` ( 
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '面试题ID', 
  `paper_id` BIGINT DEFAULT NULL COMMENT '归属套卷ID',
  `major` VARCHAR(50) NOT NULL COMMENT '所属专业', 
  `question_type` VARCHAR(50) NOT NULL COMMENT '题目类型(如常规题, 行为题, 业务题)', 
  `question_content` TEXT NOT NULL COMMENT '面试提问内容', 
  `core_point` VARCHAR(255) NOT NULL COMMENT '要点核心(考察重点)', 
  `reference_answer` TEXT NOT NULL COMMENT '参考答案', 
  `difficulty_level` TINYINT DEFAULT 2 COMMENT '难度等级 1-简单 2-中等 3-困难', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '题目创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '题目更新时间', 
  INDEX `idx_major_type` (`major`, `question_type`),
  INDEX `idx_paper_id` (`paper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='面试题题库表'; 

-- ---------------------------- 
-- 26. 学生面试题答题记录表 
-- ---------------------------- 
DROP TABLE IF EXISTS `student_interview_record`; 
CREATE TABLE `student_interview_record` ( 
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '面试答题记录ID', 
  `student_id` BIGINT NOT NULL COMMENT '答题学生ID', 
  `paper_record_id` BIGINT DEFAULT NULL COMMENT '归属的套卷答题记录ID', 
  `question_id` BIGINT NOT NULL COMMENT '面试题目ID', 
  `user_answer` TEXT NOT NULL COMMENT '用户回答内容', 
  `ai_score` TINYINT DEFAULT 0 COMMENT 'AI评分', 
  `ai_feedback` TEXT DEFAULT NULL COMMENT 'AI反馈评价', 
  `total_score` INT DEFAULT 0 COMMENT '本次答题总分', 
  `answer_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题时间', 
  INDEX `idx_student` (`student_id`), 
  INDEX `idx_paper_record` (`paper_record_id`), 
  INDEX `idx_question` (`question_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`question_id`) REFERENCES `interview_question_bank`(`question_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`paper_record_id`) REFERENCES `student_paper_record`(`paper_record_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生面试题答题记录表'; 

-- ---------------------------- 
-- 27. 学生题目收藏表 
-- ---------------------------- 
DROP TABLE IF EXISTS `student_question_collect`; 
CREATE TABLE `student_question_collect` ( 
  `collect_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '收藏记录ID', 
  `student_id` BIGINT NOT NULL COMMENT '收藏学生ID', 
  `question_id` BIGINT NOT NULL COMMENT '题目ID', 
  `question_type` TINYINT NOT NULL COMMENT '题目来源类型: 1-AI题库(ai_question_bank) 2-雷达图题库(radar_question) 3-笔试题库(written_test_question_bank) 4-面试题库(interview_question_bank)', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间', 
  INDEX `idx_student` (`student_id`), 
  UNIQUE KEY `uk_student_question` (`student_id`, `question_type`, `question_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生题目收藏表'; 


-- ---------------------------- 
-- 28. 学生套卷答题总分记录表 
-- ---------------------------- 
DROP TABLE IF EXISTS `student_paper_record`; 
CREATE TABLE `student_paper_record` ( 
  `paper_record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '套卷答题记录ID', 
  `student_id` BIGINT NOT NULL COMMENT '答题学生ID', 
  `paper_type` TINYINT NOT NULL COMMENT '套卷类型 1-笔试题套卷 2-面试题套卷', 
  `paper_name` VARCHAR(100) DEFAULT NULL COMMENT '套卷名称或标识(例如：Java基础笔试A卷)', 
  `total_score` INT DEFAULT 0 COMMENT '该套卷答题总得分', 
  `total_questions` INT DEFAULT 0 COMMENT '该套卷题目总数(例如30题)', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '答题完成时间', 
  INDEX `idx_student_type` (`student_id`, `paper_type`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生套卷答题总分记录表'; 

-- ---------------------------- 
-- 29. 学生成长档案表 
-- ---------------------------- 
DROP TABLE IF EXISTS `growth_record`; 
CREATE TABLE `growth_record` ( 
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '成长档案ID', 
  `student_id` BIGINT NOT NULL COMMENT '归属学生ID', 
  `resume_count` INT DEFAULT 0 COMMENT '我的简历(生成的简历个数)', 
  `interview_count` INT DEFAULT 0 COMMENT '面试的次数', 
  `practice_count` INT DEFAULT 0 COMMENT '题库练习次数(面试题和笔试题作答总和)', 
  `collection_count` INT DEFAULT 0 COMMENT '题库收藏数', 
  `continuous_checkin_days` INT DEFAULT 0 COMMENT '连续打卡时间(天数)', 
  `last_checkin_date` DATE DEFAULT NULL COMMENT '最后打卡日期',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间', 
  UNIQUE KEY `uk_student_id` (`student_id`), 
  INDEX `idx_checkin_days` (`continuous_checkin_days` DESC), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学生成长档案表'; 

-- ---------------------------- 
-- 30. 竞赛奖项表 
-- ---------------------------- 
DROP TABLE IF EXISTS `competition_award`; 
CREATE TABLE `competition_award` ( 
  `award_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '奖项ID', 
  `student_id` BIGINT NOT NULL COMMENT '归属学生ID', 
  `competition_name` VARCHAR(100) NOT NULL COMMENT '竞赛名称', 
  `award_grade` VARCHAR(50) DEFAULT NULL COMMENT '获奖等级(如：省一等奖)',
  `award_time` VARCHAR(20) DEFAULT NULL COMMENT '获奖时间(如：2023-09)', 
  `achievement_desc` TEXT DEFAULT NULL COMMENT '成果说明', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  INDEX `idx_student_id` (`student_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='竞赛奖项表'; 

-- ---------------------------- 
-- 31. 证书资质表 
-- ---------------------------- 
DROP TABLE IF EXISTS `certificate_qualification`; 
CREATE TABLE `certificate_qualification` ( 
  `cert_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '证书ID', 
  `student_id` BIGINT NOT NULL COMMENT '归属学生ID', 
  `cert_name` VARCHAR(100) NOT NULL COMMENT '证书名称', 
  `score_or_grade` VARCHAR(50) DEFAULT NULL COMMENT '分数或等级', 
  `obtain_time` VARCHAR(20) DEFAULT NULL COMMENT '获取时间(如：2023-09)', 
  `supplementary_desc` TEXT DEFAULT NULL COMMENT '补充说明', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  INDEX `idx_student_id` (`student_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='证书资质表'; 

-- ---------------------------- 
-- 32. 项目经历表 
-- ---------------------------- 
DROP TABLE IF EXISTS `project_experience`; 
CREATE TABLE `project_experience` ( 
  `project_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '项目ID', 
  `student_id` BIGINT NOT NULL COMMENT '归属学生ID', 
  `project_name` VARCHAR(100) NOT NULL COMMENT '项目名称', 
  `tech_stack` VARCHAR(255) DEFAULT NULL COMMENT '技术栈', 
  `responsibility` TEXT DEFAULT NULL COMMENT '你的职责', 
  `project_highlights` TEXT DEFAULT NULL COMMENT '项目亮点', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  INDEX `idx_student_id` (`student_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目经历表'; 

-- ---------------------------- 
-- 33. 实习经历表 
-- ---------------------------- 
DROP TABLE IF EXISTS `internship_experience`; 
CREATE TABLE `internship_experience` ( 
  `internship_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '实习ID', 
  `student_id` BIGINT NOT NULL COMMENT '归属学生ID', 
  `company` VARCHAR(100) NOT NULL COMMENT '公司', 
  `position_name` VARCHAR(100) NOT NULL COMMENT '岗位名称', 
  `time_period` VARCHAR(100) DEFAULT NULL COMMENT '时间区间', 
  `experience_desc` TEXT DEFAULT NULL COMMENT '经历说明', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间', 
  INDEX `idx_student_id` (`student_id`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='实习经历表'; 

-- ---------------------------- 
-- 34. 每日打卡明细表
-- ---------------------------- 
DROP TABLE IF EXISTS `growth_checkin_record`; 
CREATE TABLE `growth_checkin_record` ( 
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT, 
  `student_id` BIGINT NOT NULL, 
  `checkin_date` DATE NOT NULL, 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP, 
  UNIQUE KEY `uk_student_date` (`student_id`, `checkin_date`), 
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='每日打卡明细表';

-- ----------------------------
-- 35. 面试会话表（AI模拟面试核心表）
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


USE offercat;

-- 如果之前没有这个表，直接执行下面完整的建表语句即可
CREATE TABLE IF NOT EXISTS `ai_question_bank` ( 
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

USE offercat;

-- 调查问卷题目表（无外键、无依赖、独立可用）
CREATE TABLE `questionnaire_question` (
    `id` INT PRIMARY KEY AUTO_INCREMENT COMMENT '题目ID',
    `section` VARCHAR(50) NOT NULL COMMENT '所属部分',
    `question_order` INT NOT NULL COMMENT '题目顺序 1-40',
    `question_text` TEXT NOT NULL COMMENT '题干',
    `option_a` VARCHAR(500) NOT NULL COMMENT 'A选项',
    `option_b` VARCHAR(500) NOT NULL COMMENT 'B选项',
    `option_c` VARCHAR(500) NOT NULL COMMENT 'C选项',
    `option_d` VARCHAR(500) NOT NULL COMMENT 'D选项',
    `scores_a` JSON NOT NULL COMMENT 'A七维分数',
    `scores_b` JSON NOT NULL,
    `scores_c` JSON NOT NULL,
    `scores_d` JSON NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='问卷题目表（40题完整版）';

-- 插入全部 40 题
INSERT INTO questionnaire_question (section, question_order, question_text, option_a, option_b, option_c, option_d, scores_a, scores_b, scores_c, scores_d) VALUES
-- 1
('专业知识与学习', 1, '你对本专业核心课程的掌握程度如何？',
'专业前10%，能灵活应用', '中等偏上，能应对考试', '勉强及格，理解不深', '很多课程没学好',
'[8,4,2,6,0,2,2]', '[4,2,0,3,0,0,0]', '[0,0,0,-2,-1,-2,-2]', '[-6,-4,-2,-5,-2,-4,-3]'),
-- 2
('专业知识与学习', 2, '你每周投入多少小时进行本专业的课外自主学习？',
'10小时以上', '5-10小时', '1-5小时', '几乎不自学',
'[6,4,2,2,3,3,4]', '[3,2,1,1,1,1,2]', '[0,0,0,0,-1,0,-1]', '[-5,-3,-2,-2,-3,-2,-4]'),
-- 3
('专业知识与学习', 3, '你是否经常主动查阅本专业的前沿文献或行业报告？',
'每周都会', '每月几次', '很少，只等老师布置', '从不',
'[5,2,1,0,2,6,2]', '[2,0,0,0,0,3,0]', '[0,-1,0,0,-1,-1,-2]', '[-3,-2,-2,-1,-2,-5,-3]'),
-- 4
('专业知识与学习', 4, '你在专业课程中是否有过主动提问或参与课堂讨论？',
'经常，且能提出有深度的问题', '偶尔', '很少', '从不',
'[3,2,0,1,5,2,1]', '[1,0,0,0,2,0,0]', '[0,-1,0,0,-1,-1,-1]', '[-2,-2,0,-1,-4,-2,-2]'),
-- 5
('专业知识与学习', 5, '你是否参加过本专业相关的讲座、学术会议或企业开放日？',
'参加过5次以上，并主动交流', '参加过2-4次', '参加过1次', '从未参加过',
'[2,2,0,0,3,6,1]', '[1,0,0,0,1,3,0]', '[0,0,0,0,0,1,0]', '[-2,-1,-1,0,-2,-4,-2]'),
-- 6
('专业知识与学习', 6, '你的平均学分绩点（GPA）在专业内大致处于什么水平？',
'前20%', '20%-50%', '50%-80%', '后20%',
'[4,1,2,8,0,1,2]', '[2,0,0,4,0,0,0]', '[0,0,0,0,-1,-1,-1]', '[-4,-2,-2,-6,-2,-2,-3]'),
-- 7
('专业知识与学习', 7, '你是否有过挂科或补考经历？',
'从未挂科', '挂过1门', '挂过2门', '挂过3门及以上',
'[2,1,0,3,1,0,2]', '[-2,-1,0,-2,-1,-1,-1]', '[-5,-2,-1,-4,-2,-2,-3]', '[-8,-4,-2,-6,-3,-3,-5]'),
-- 8
('专业知识与学习', 8, '你是否获得了本专业相关的奖学金（校级及以上）？',
'国家级/省级奖学金', '校级一等奖学金', '校级其他奖学金', '从未获得',
'[5,2,6,4,1,2,2]', '[3,1,4,2,0,1,1]', '[1,0,2,1,0,0,0]', '[0,0,0,-1,-1,-1,-1]'),

-- 9-16 实践与实习
('实践与实习', 9, '你是否有过与本专业相关的实习经历？',
'有2段以上，且每段超过2个月', '有1段，超过2个月', '有实习但少于2个月', '无任何实习',
'[3,8,1,2,4,6,4]', '[2,6,0,1,2,4,2]', '[0,2,0,0,1,1,0]', '[-3,-6,-2,-2,-3,-5,-3]'),
('实践与实习', 10, '你参与过的专业相关实践项目数量？',
'5个以上', '3-4个', '1-2个', '0个',
'[4,6,2,0,2,2,3]', '[2,4,1,0,1,1,2]', '[0,2,0,0,0,0,0]', '[-4,-6,-2,-1,-2,-2,-3]'),
('实践与实习', 11, '在实践项目中，你通常承担什么角色？',
'负责人/组长', '核心执行者', '普通参与者', '无项目经历',
'[2,6,1,0,6,2,5]', '[3,4,0,0,2,1,3]', '[0,2,0,0,0,0,0]', '[-2,-4,-2,0,-3,-2,-3]'),
('实践与实习', 12, '你的实践项目是否解决了真实问题？',
'是，有实际用户或企业需求', '是，但限于校内', '仅为课程作业', '无项目',
'[2,7,1,0,2,5,3]', '[1,4,0,0,1,2,1]', '[0,1,0,0,0,0,0]', '[-2,-4,-1,0,-2,-3,-2]'),
('实践与实习', 13, '你是否有过跨专业合作经历？',
'有，且担任协调角色', '有，作为普通成员', '有过但很少', '从未',
'[1,4,0,0,6,2,3]', '[0,2,0,0,3,1,1]', '[0,0,0,0,1,0,0]', '[-2,-2,-1,0,-4,-1,-2]'),
('实践与实习', 14, '你是否独立完成过专业作品？',
'是，且被采用或获奖', '是，质量较高', '是，但较简单', '否',
'[4,7,3,1,2,3,4]', '[2,4,1,0,1,1,2]', '[0,2,0,0,0,0,0]', '[-3,-5,-2,-1,-2,-2,-3]'),
('实践与实习', 15, '你是否使用过行业标准工具/软件？',
'熟练使用多种', '会基本功能', '只听说过', '完全没用过',
'[5,6,1,0,1,4,2]', '[2,3,0,0,0,2,1]', '[0,0,0,0,0,0,0]', '[-3,-4,-1,0,-1,-3,-2]'),
('实践与实习', 16, '你是否主动寻找过实习机会？',
'是，成功获得过', '是，但未成功', '想过但没行动', '从未尝试',
'[2,5,0,0,3,5,4]', '[1,1,0,0,1,2,2]', '[0,-1,0,0,-1,-1,-1]', '[-2,-4,-1,0,-3,-4,-3]'),

-- 17-22 成果与荣誉
('成果与荣誉', 17, '你是否获得过专业相关竞赛奖项？',
'国家级/国际级', '省级', '校级', '无竞赛经历',
'[4,3,8,2,2,3,3]', '[2,2,5,1,1,2,2]', '[1,1,2,0,0,1,1]', '[-2,-2,-4,-1,-2,-2,-2]'),
('成果与荣誉', 18, '你是否拥有本专业相关资格证书？',
'高级/执业', '中级', '初级', '无',
'[5,4,7,2,0,5,3]', '[3,2,4,1,0,3,2]', '[1,1,2,0,0,1,1]', '[-2,-2,-3,-1,-1,-3,-2]'),
('成果与荣誉', 19, '你是否发表过论文或参与科研项目？',
'第一作者/主持', '参与', '有经历未发表', '无',
'[4,5,7,3,2,4,4]', '[2,3,4,1,1,2,2]', '[0,1,1,0,0,1,1]', '[-2,-3,-3,-1,-2,-2,-2]'),
('成果与荣誉', 20, '你是否获得过非学术荣誉？',
'省级及以上', '校级', '院级', '从未',
'[1,2,4,1,5,2,3]', '[0,1,2,0,3,1,2]', '[0,0,1,0,1,0,1]', '[-1,-1,-2,0,-3,-1,-2]'),
('成果与荣誉', 21, '你是否参加过技能培训并获证书？',
'3次以上', '1-2次', '参加未完成', '从未',
'[3,3,2,0,1,3,2]', '[1,1,1,0,0,1,1]', '[0,0,0,0,0,0,0]', '[-2,-2,-1,0,-1,-2,-2]'),
('成果与荣誉', 22, '你是否有专利、软著？',
'第一发明人', '参与', '申请中', '无',
'[4,5,8,2,1,3,3]', '[2,3,5,1,0,2,2]', '[1,1,2,0,0,1,1]', '[-2,-2,-3,-1,-1,-2,-2]'),

-- 23-30 软技能
('软技能与职业素养', 23, '你在团队合作中的表现？',
'主动协调，促进达成共识', '配合完成分内工作', '被动执行', '经常冲突',
'[1,2,0,0,8,2,2]', '[0,1,0,0,4,0,1]', '[-1,0,0,0,-2,-1,-2]', '[-3,-2,0,0,-6,-2,-4]'),
('软技能与职业素养', 24, '你是否曾担任学生干部？',
'校级/院级负责人', '班级/社团干事', '普通成员', '未参与',
'[1,3,2,0,7,2,4]', '[0,1,1,0,4,0,2]', '[0,0,0,0,1,0,0]', '[-1,-1,-1,0,-3,-1,-2]'),
('软技能与职业素养', 25, '你表达观点是否清晰？',
'经常被称赞', '基本清楚', '有时说不清', '非常不善于',
'[1,2,0,0,7,2,1]', '[0,0,0,0,3,0,0]', '[-1,-1,0,0,-1,-1,-1]', '[-3,-3,-1,0,-5,-3,-2]'),
('软技能与职业素养', 26, '你是否主动帮助同学？',
'经常，效果好', '偶尔', '很少', '从不',
'[1,1,0,0,6,0,1]', '[0,0,0,0,2,0,0]', '[0,0,0,0,-1,0,-1]', '[-1,-1,0,0,-4,-1,-2]'),
('软技能与职业素养', 27, '你是否了解本专业岗位要求？',
'非常清楚', '大概知道', '只知名称', '完全不清楚',
'[2,3,1,0,2,8,2]', '[0,1,0,0,0,4,0]', '[-1,0,0,0,-1,0,-1]', '[-3,-2,-1,0,-2,-6,-2]'),
('软技能与职业素养', 28, '你是否有清晰职业规划？',
'详细计划并执行', '有方向无计划', '想过没行动', '从未考虑',
'[1,2,0,0,2,7,4]', '[0,0,0,0,0,3,1]', '[-1,-1,0,0,-1,-1,-1]', '[-3,-2,-1,0,-2,-5,-3]'),
('软技能与职业素养', 29, '你是否做过求职准备？',
'系统准备3个月以上', '偶尔准备', '想过没开始', '毫无准备',
'[1,3,0,0,2,6,5]', '[0,1,0,0,0,2,2]', '[-1,0,0,0,-1,-1,-1]', '[-3,-2,-1,0,-3,-5,-4]'),
('软技能与职业素养', 30, '你是否有持续学习习惯？',
'每周坚持', '每月几次', '考前突击', '从不',
'[5,3,2,0,3,3,4]', '[2,1,1,0,1,1,2]', '[0,-1,0,0,-1,-1,-1]', '[-5,-4,-2,-1,-4,-4,-5]'),

-- 31-36 抗压与执行力
('抗压与执行力', 31, '你能否按时高质量完成多项任务？',
'总能', '多数可以', '经常延期', '无法应对',
'[2,2,0,0,2,0,7]', '[0,0,0,0,0,0,3]', '[-1,-1,0,0,-1,0,-2]', '[-3,-3,-1,0,-3,-1,-6]'),
('抗压与执行力', 32, '遇到挫折你的反应？',
'总结原因继续努力', '沮丧后恢复', '情绪低落', '直接放弃',
'[2,2,1,0,2,1,6]', '[0,0,0,0,0,0,2]', '[-1,-1,-1,0,-2,0,-2]', '[-3,-3,-2,0,-4,-2,-7]'),
('抗压与执行力', 33, '能否坚持数月目标？',
'成功自律完成', '偶尔松懈', '半途而废', '从未尝试',
'[3,3,2,1,2,2,7]', '[1,1,0,0,0,0,3]', '[-1,-1,-1,0,-1,-1,-2]', '[-2,-2,-1,0,-2,-2,-4]'),
('抗压与执行力', 34, '是否有运动放松习惯？',
'每周3次以上', '偶尔', '很少', '从不',
'[0,0,0,0,2,0,6]', '[0,0,0,0,0,0,2]', '[0,0,0,0,-1,0,-1]', '[-1,-1,0,0,-2,0,-4]'),
('抗压与执行力', 35, '是否为任务牺牲娱乐？',
'经常高效完成', '偶尔能坚持', '很少，宁愿放弃', '从不',
'[1,2,0,0,0,0,5]', '[0,1,0,0,0,0,2]', '[-1,-1,0,0,-1,0,-2]', '[-2,-2,0,0,-1,0,-3]'),
('抗压与执行力', 36, '是否提前规划任务？',
'总是严格执行', '有时规划', '很少', '从不',
'[1,2,0,0,2,0,6]', '[0,0,0,0,0,0,2]', '[-1,-1,0,0,-1,0,-1]', '[-2,-2,0,0,-2,0,-4]'),

-- 37-40 有效性检测
('有效性检测', 37, '本题请直接选择C',
'A', 'B', 'C', 'D',
'[0,0,0,0,0,0,0]', '[0,0,0,0,0,0,0]', '[0,0,0,0,0,0,0]', '[0,0,0,0,0,0,0]'),
('有效性检测', 38, '你是否获得过专业相关竞赛奖项？',
'获国家级奖项', '获省级奖项', '参加未获奖', '未参加',
'[0,0,0,0,0,0,0]', '[0,0,0,0,0,0,0]', '[0,0,0,0,0,0,0]', '[0,0,0,0,0,0,0]'),
('有效性检测', 39, '我从未认真对待考试作业',
'非常同意', '同意', '不同意', '非常不同意',
'[-3,-2,-2,-4,-2,-2,-3]', '[-1,-1,-1,-2,-1,-1,-1]', '[1,0,0,1,0,0,0]', '[2,1,1,2,1,1,2]'),
('有效性检测', 40, '对于本次问卷，我是认真且如实作答的',
'完全符合，认真作答','基本符合，偶尔随意','不太符合，随便选的','完全不符合，乱填一气',
'[0,0,0,0,0,0,0]','[0,0,0,0,0,0,0]','[0,0,0,0,0,0,0]','[0,0,0,0,0,0,0]');


-- ---------------------------- 
-- 初始化系统角色 
-- ---------------------------- 
INSERT INTO `role` VALUES 
(1,'学生','普通学生'), 
(4,'管理员','系统管理员');

-- ---------------------------- 
-- 初始化测试数据 
-- ---------------------------- 
-- 测试账号：手机号 13800000000，密码 123456（明文仅便于本地初始化；首次密码登录成功后会由后端自动升级为 BCrypt）
INSERT INTO `user` (user_id, nickname, password, phone, user_role, user_status) VALUES (1, '测试用户', '123456', '13800000000', 1, 1);
INSERT INTO `forum_post` (post_id, user_id, title, content) VALUES (1, 1, '这是一个测试帖子', '这是帖子的内容');
 
 
SET FOREIGN_KEY_CHECKS = 1;
 

-- 为 localhost  
GRANT ALL PRIVILEGES ON *.* TO 'vx_admin'@'localhost' WITH GRANT OPTION;
FLUSH PRIVILEGES;

USE offercat;

-- 将保存内容的字段修改为 TEXT（支持65535个字符）或 LONGTEXT（支持42亿个字符）
ALTER TABLE ai_consult MODIFY COLUMN ai_content LONGTEXT;
ALTER TABLE ai_consult MODIFY COLUMN user_content TEXT;

USE offercat;

CREATE TABLE `ai_consult` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `user_id` bigint(20) NOT NULL COMMENT '用户ID',
  `user_content` text COLLATE utf8mb4_unicode_ci COMMENT '用户内容',
  `ai_content` longtext COLLATE utf8mb4_unicode_ci COMMENT 'AI内容',
  `ai_avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'AI头像',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='AI顾问对话表';

USE offercat;
ALTER TABLE ai_consult 
ADD COLUMN user_images JSON DEFAULT NULL COMMENT '用户发送的图片列表',
ADD COLUMN ai_images JSON DEFAULT NULL COMMENT 'AI生成的图片列表';

ALTER TABLE ai_consult 
ADD COLUMN retained TINYINT NOT NULL DEFAULT 0 COMMENT '1=用户保留不参与每月15日清理';


USE offercat;
DROP TABLE IF EXISTS `ai_consult`;

-- 选择你正在使用的 offercat 数据库
USE offercat;

-- 1. 创建论坛帖子表
CREATE TABLE IF NOT EXISTS `forum_post` (
  `post_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '帖子ID',
  `user_id` BIGINT NOT NULL COMMENT '发布人用户ID',
  `title` VARCHAR(100) NOT NULL COMMENT '帖子标题',
  `content` TEXT NOT NULL COMMENT '帖子文本内容',
  `images` VARCHAR(2000) DEFAULT NULL COMMENT '帖子图片(最多9张，存储JSON数组或逗号分隔的URL)',
  `like_count` INT DEFAULT 0 COMMENT '获赞数量(用于排序)',
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

-- 2. 创建帖子收藏表
CREATE TABLE IF NOT EXISTS `forum_post_collect` (
  `collect_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '收藏ID',
  `user_id` BIGINT NOT NULL COMMENT '收藏人ID',
  `post_id` BIGINT NOT NULL COMMENT '帖子ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '收藏时间',
  UNIQUE KEY `uk_user_post` (`user_id`, `post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子收藏表';

-- 3. 创建帖子点赞表
CREATE TABLE IF NOT EXISTS `forum_post_like` (
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞ID',
  `user_id` BIGINT NOT NULL COMMENT '点赞人ID',
  `post_id` BIGINT NOT NULL COMMENT '帖子ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  UNIQUE KEY `uk_user_post_like` (`user_id`, `post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子点赞记录表';

-- 4. 创建论坛评论表
CREATE TABLE IF NOT EXISTS `forum_comment` (
  `comment_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '评论ID',
  `post_id` BIGINT NOT NULL COMMENT '归属帖子ID',
  `user_id` BIGINT NOT NULL COMMENT '评论人ID',
  `parent_id` BIGINT DEFAULT 0 COMMENT '父评论ID(0表示直接评论帖子，非0表示回复某条评论)',
  `reply_to_user_id` BIGINT DEFAULT NULL COMMENT '被回复人ID(如果是追评的话)',
  `content` TEXT NOT NULL COMMENT '评论内容',
  `like_count` INT DEFAULT 0 COMMENT '评论点赞数',
  `status` TINYINT DEFAULT 1 COMMENT '状态 1正常 0删除',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '评论时间',
  INDEX `idx_post_id` (`post_id`),
  INDEX `idx_parent_id` (`parent_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛评论表(支持父子层级)';

-- 5. 创建互动消息提醒表（用于点赞/评论通知）
CREATE TABLE IF NOT EXISTS `sys_message` (
  `msg_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '消息ID',
  `receiver_id` BIGINT NOT NULL COMMENT '消息接收人ID',
  `sender_id` BIGINT NOT NULL COMMENT '动作触发人ID',
  `msg_type` TINYINT NOT NULL COMMENT '消息类型 1-点赞帖子 2-评论帖子 3-回复评论',
  `target_id` BIGINT NOT NULL COMMENT '目标ID(如帖子ID或评论ID，用于跳转)',
  `content` VARCHAR(255) DEFAULT NULL COMMENT '消息附带内容(如评论的截取文本)',
  `is_read` TINYINT DEFAULT 0 COMMENT '是否已读 0未读 1已读',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '消息产生时间',
  INDEX `idx_receiver_read` (`receiver_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='互动消息提醒表';

USE offercat;

