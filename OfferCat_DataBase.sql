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
  `job_intention` VARCHAR(100) DEFAULT NULL COMMENT '求职意向', 
  `certificates` JSON DEFAULT NULL COMMENT '证书列表（JSON格式）', 
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
  `reply_to_comment_id` BIGINT DEFAULT NULL COMMENT '直接被回复的评论ID(楼中楼)',
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
-- 19.5 论坛评论点赞表 
-- ---------------------------- 
DROP TABLE IF EXISTS `forum_comment_like`; 
CREATE TABLE `forum_comment_like` ( 
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞记录ID', 
  `comment_id` BIGINT NOT NULL COMMENT '评论ID', 
  `user_id` BIGINT NOT NULL COMMENT '点赞人ID', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间', 
  UNIQUE KEY `uk_user_comment` (`user_id`, `comment_id`), 
  INDEX `idx_comment` (`comment_id`), 
  FOREIGN KEY (`comment_id`) REFERENCES `forum_comment`(`comment_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛评论点赞表';

-- ---------------------------- 
-- 19.6 论坛好友申请表 
-- ---------------------------- 
DROP TABLE IF EXISTS `forum_friend_request`; 
CREATE TABLE `forum_friend_request` ( 
  `request_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '申请ID', 
  `from_user_id` BIGINT NOT NULL COMMENT '申请人ID', 
  `to_user_id` BIGINT NOT NULL COMMENT '被申请人ID', 
  `status` TINYINT NOT NULL DEFAULT 0 COMMENT '0待处理 1已同意 2已拒绝', 
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间', 
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间', 
  UNIQUE KEY `uk_pair` (`from_user_id`, `to_user_id`), 
  INDEX `idx_to_status` (`to_user_id`, `status`), 
  FOREIGN KEY (`from_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE, 
  FOREIGN KEY (`to_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛好友申请表';

-- ---------------------------- 
-- 20. 互动消息提醒表 
-- ---------------------------- 
DROP TABLE IF EXISTS `sys_message`; 
CREATE TABLE `sys_message` ( 
  `msg_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '消息ID', 
  `receiver_id` BIGINT NOT NULL COMMENT '消息接收人ID', 
  `sender_id` BIGINT NOT NULL COMMENT '动作触发人ID', 
  `msg_type` TINYINT NOT NULL COMMENT '消息类型 1-点赞帖子 2-评论帖子 3-回复评论 4-@提及 5-点赞评论 6-收藏帖子', 
  `target_id` BIGINT NOT NULL COMMENT '目标ID(如帖子ID或评论ID，用于跳转)', 
  `post_id` BIGINT DEFAULT NULL COMMENT '冗余帖子ID(用于消息列表展示帖子预览)', 
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

DROP TABLE IF EXISTS `forum_private_message`;
CREATE TABLE `forum_private_message` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '私信ID',
  `sender_id` BIGINT NOT NULL COMMENT '发送者ID',
  `receiver_id` BIGINT NOT NULL COMMENT '接收者ID',
  `content` TEXT NOT NULL COMMENT '私信内容',
  `is_read` TINYINT DEFAULT 0 COMMENT '是否已读 0-未读 1-已读',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  INDEX `idx_sender_receiver` (`sender_id`, `receiver_id`),
  INDEX `idx_receiver_read` (`receiver_id`, `is_read`),
  FOREIGN KEY (`sender_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`receiver_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛私信表';

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
 
SET FOREIGN_KEY_CHECKS = 1;


-- 为 localhost 创建同名用户
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

USE offercat;
ALTER TABLE ai_consult 
ADD COLUMN retained TINYINT DEFAULT 0 COMMENT '用户标记保留：1 表示不参与每月 15 日的批量清理；0 表示可被清理';


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
  `reply_to_comment_id` BIGINT DEFAULT NULL COMMENT '直接被回复的评论ID(楼中楼)',
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
  `msg_type` TINYINT NOT NULL COMMENT '消息类型 1-点赞帖子 2-评论帖子 3-回复评论 4-@提及 5-点赞评论 6-收藏帖子',
  `target_id` BIGINT NOT NULL COMMENT '目标ID(如帖子ID或评论ID，用于跳转)',
  `post_id` BIGINT DEFAULT NULL COMMENT '冗余帖子ID(用于消息列表展示帖子预览)',
  `content` VARCHAR(255) DEFAULT NULL COMMENT '消息附带内容(如评论的截取文本)',
  `is_read` TINYINT DEFAULT 0 COMMENT '是否已读 0未读 1已读',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '消息产生时间',
  INDEX `idx_receiver_read` (`receiver_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='互动消息提醒表';

USE offercat;
ALTER TABLE forum_post ADD COLUMN view_count INT DEFAULT 0 COMMENT '浏览数量' AFTER comment_count;

ALTER TABLE forum_post ADD COLUMN view_count INT DEFAULT 0 COMMENT '浏览数量' AFTER comment_count;

ALTER TABLE forum_posts ADD COLUMN title VARCHAR(255) DEFAULT NULL COMMENT '帖子标题' AFTER user_id;

USE offercat;
DESCRIBE forum_post;


USE offercat;

SHOW TABLES LIKE 'growth_record';
SHOW TABLES LIKE 'growth_checkin_record';
SHOW TABLES LIKE 'student_question_collect';
SHOW TABLES LIKE 'student_written_test_record';
SHOW TABLES LIKE 'student_interview_record';
SHOW TABLES LIKE 'ai_consult';
SHOW TABLES LIKE 'resume_pdf';
SHOW TABLES LIKE 'resume';
SHOW TABLES LIKE 'interview_session';

SELECT student_id, user_id FROM student WHERE student_id=19 OR user_id=21;

SELECT DATABASE();
SHOW TABLES LIKE 'growth_record';
SHOW TABLES LIKE 'growth_checkin_record';

USE offercat;

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

DROP TABLE IF EXISTS `growth_checkin_record`;
CREATE TABLE `growth_checkin_record` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `checkin_date` DATE NOT NULL,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_student_date` (`student_id`, `checkin_date`),
  INDEX `idx_student_id` (`student_id`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='每日打卡明细表';

SHOW TABLES LIKE 'growth_record';
SHOW TABLES LIKE 'growth_checkin_record';


USE offercat;

SHOW TABLES LIKE 'growth_record';
SHOW TABLES LIKE 'growth_checkin_record';

SHOW TABLES LIKE 'student_question_collect';
SHOW TABLES LIKE 'student_written_test_record';
SHOW TABLES LIKE 'student_interview_record';

SHOW TABLES LIKE 'resume_pdf';
SHOW TABLES LIKE 'resume';
SHOW TABLES LIKE 'ai_consult';
SHOW TABLES LIKE 'interview_session';

SELECT student_id, user_id FROM student WHERE student_id=19;


USE offercat;

CREATE TABLE IF NOT EXISTS `written_test_question_bank` (
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `paper_id` BIGINT DEFAULT NULL,
  `major` VARCHAR(50) NOT NULL,
  `paper_set` VARCHAR(10) NOT NULL,
  `question_type` VARCHAR(50) NOT NULL,
  `question_content` TEXT NOT NULL,
  `option_a` VARCHAR(255) NOT NULL,
  `option_b` VARCHAR(255) NOT NULL,
  `option_c` VARCHAR(255) NOT NULL,
  `option_d` VARCHAR(255) NOT NULL,
  `correct_answer` CHAR(1) NOT NULL,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_major_paper` (`major`, `paper_set`),
  INDEX `idx_paper_id` (`paper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `interview_question_bank` (
  `question_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `paper_id` BIGINT DEFAULT NULL,
  `major` VARCHAR(50) NOT NULL,
  `question_type` VARCHAR(50) NOT NULL,
  `question_content` TEXT NOT NULL,
  `core_point` VARCHAR(255) NOT NULL,
  `reference_answer` TEXT NOT NULL,
  `difficulty_level` TINYINT DEFAULT 2,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_major_type` (`major`, `question_type`),
  INDEX `idx_paper_id` (`paper_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_paper_record` (
  `paper_record_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `paper_type` TINYINT NOT NULL,
  `paper_name` VARCHAR(100) DEFAULT NULL,
  `total_score` INT DEFAULT 0,
  `total_questions` INT DEFAULT 0,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student_type` (`student_id`, `paper_type`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_question_collect` (
  `collect_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `question_id` BIGINT NOT NULL,
  `question_type` TINYINT NOT NULL,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student` (`student_id`),
  UNIQUE KEY `uk_student_question` (`student_id`, `question_type`, `question_id`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_written_test_record` (
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `paper_record_id` BIGINT DEFAULT NULL,
  `question_id` BIGINT NOT NULL,
  `user_answer` CHAR(1) NOT NULL,
  `is_correct` TINYINT DEFAULT 0,
  `total_score` INT DEFAULT 0,
  `answer_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student` (`student_id`),
  INDEX `idx_paper_record` (`paper_record_id`),
  INDEX `idx_question` (`question_id`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE,
  FOREIGN KEY (`question_id`) REFERENCES `written_test_question_bank`(`question_id`) ON DELETE CASCADE,
  FOREIGN KEY (`paper_record_id`) REFERENCES `student_paper_record`(`paper_record_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `student_interview_record` (
  `record_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `paper_record_id` BIGINT DEFAULT NULL,
  `question_id` BIGINT NOT NULL,
  `user_answer` TEXT NOT NULL,
  `ai_score` TINYINT DEFAULT 0,
  `ai_feedback` TEXT DEFAULT NULL,
  `total_score` INT DEFAULT 0,
  `answer_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student` (`student_id`),
  INDEX `idx_paper_record` (`paper_record_id`),
  INDEX `idx_question` (`question_id`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE,
  FOREIGN KEY (`question_id`) REFERENCES `interview_question_bank`(`question_id`) ON DELETE CASCADE,
  FOREIGN KEY (`paper_record_id`) REFERENCES `student_paper_record`(`paper_record_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

USE offercat;

CREATE TABLE IF NOT EXISTS `student_practice_session` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `paper_id` VARCHAR(64) NOT NULL,
  `paper_type` TINYINT NOT NULL COMMENT '1-笔试 2-面试',
  `total_count` INT DEFAULT 0,
  `answered_count` INT DEFAULT 0,
  `correct_count` INT DEFAULT 0,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student_time` (`student_id`, `create_time`),
  FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='题库练习会话汇总表';

CREATE TABLE IF NOT EXISTS `student_practice_session` (
  `id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `student_id` BIGINT NOT NULL,
  `paper_id` VARCHAR(64) NOT NULL,
  `paper_type` TINYINT DEFAULT NULL,
  `total_count` INT DEFAULT 0,
  `answered_count` INT DEFAULT 0,
  `correct_count` INT DEFAULT 0,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_student_time` (`student_id`, `create_time`),
  CONSTRAINT `fk_student_practice_session_student`
    FOREIGN KEY (`student_id`) REFERENCES `student`(`student_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

ALTER TABLE `growth_record`
  ADD COLUMN `total_checkin_days` INT DEFAULT 0 COMMENT '累计打卡时间(天数)' AFTER `continuous_checkin_days`;
	
	SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `forum_post` (
  `post_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `content` TEXT NOT NULL,
  `images` VARCHAR(2000) DEFAULT NULL,
  `like_count` INT DEFAULT 0,
  `collect_count` INT DEFAULT 0,
  `comment_count` INT DEFAULT 0,
  `view_count` INT DEFAULT 0,
  `status` TINYINT DEFAULT 1,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_user_id` (`user_id`),
  INDEX `idx_like_count` (`like_count` DESC),
  INDEX `idx_create_time` (`create_time` DESC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `forum_post_like` (
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `user_id` BIGINT NOT NULL,
  `post_id` BIGINT NOT NULL,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_post_like` (`user_id`, `post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `forum_comment` (
  `comment_id` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `post_id` BIGINT NOT NULL,
  `user_id` BIGINT NOT NULL,
  `content` TEXT NOT NULL,
  `status` TINYINT DEFAULT 1,
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_post_id` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE DATABASE IF NOT EXISTS `offercat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE offercat;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ======================================================
-- 表1：题库包
-- ======================================================
CREATE TABLE IF NOT EXISTS `starlit_pack` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '题库包ID',
  `pack_key` VARCHAR(128) NOT NULL COMMENT '稳定业务键，如 major_electrical__major_law:0',
  `pack_no` INT DEFAULT NULL COMMENT '导入批次序号',
  `title` VARCHAR(200) NOT NULL COMMENT '岗位标题',
  `major_a_code` VARCHAR(64) NOT NULL COMMENT '学科A编码',
  `major_b_code` VARCHAR(64) NOT NULL COMMENT '学科B编码',
  `subtitle` VARCHAR(200) DEFAULT NULL COMMENT '展示副标题',
  `question_count` TINYINT UNSIGNED NOT NULL DEFAULT 50 COMMENT '套题题量',
  `status` TINYINT NOT NULL DEFAULT 1 COMMENT '1启用 0停用',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_starlit_pack_key` (`pack_key`),
  KEY `idx_starlit_pack_majors` (`major_a_code`, `major_b_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='点亮星辰-题库包';

-- ======================================================
-- 表2：题目
-- ======================================================
CREATE TABLE IF NOT EXISTS `starlit_question` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `pack_id` BIGINT UNSIGNED NOT NULL,
  `question_no` TINYINT UNSIGNED NOT NULL,
  `stem` TEXT NOT NULL,
  `option_a` VARCHAR(500) NOT NULL,
  `option_b` VARCHAR(500) NOT NULL,
  `option_c` VARCHAR(500) NOT NULL,
  `option_d` VARCHAR(500) NOT NULL,
  `correct_answer` CHAR(1) NOT NULL,
  `answer_note` VARCHAR(500) DEFAULT NULL,
  `is_enabled` TINYINT NOT NULL DEFAULT 1,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_starlit_pack_question_no` (`pack_id`, `question_no`),
  KEY `idx_starlit_question_pack` (`pack_id`),
  CONSTRAINT `fk_starlit_question_pack` FOREIGN KEY (`pack_id`) REFERENCES `starlit_pack` (`id`) ON DELETE CASCADE,
  CONSTRAINT `chk_starlit_correct_answer` CHECK (`correct_answer` IN ('A', 'B', 'C', 'D'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='点亮星辰-题目';

-- ======================================================
-- 表3：用户进度
-- ======================================================
CREATE TABLE IF NOT EXISTS `user_starlit_progress` (
  `user_id` BIGINT NOT NULL COMMENT '对应 user.user_id',
  `pack_id` BIGINT UNSIGNED NOT NULL,
  `stars_lit` SMALLINT UNSIGNED NOT NULL DEFAULT 0 COMMENT '已点亮星数，上限由对应包的 question_count 约束',
  `last_question_no` TINYINT UNSIGNED DEFAULT NULL,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `pack_id`),
  KEY `idx_starlit_progress_pack` (`pack_id`),
  CONSTRAINT `fk_starlit_progress_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_starlit_progress_pack` FOREIGN KEY (`pack_id`) REFERENCES `starlit_pack` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='点亮星辰-用户进度';

SET FOREIGN_KEY_CHECKS = 1;

-- ======================================================
-- 数据导入：专业1 ~ 专业10
-- ======================================================

-- 专业1：电力法规工程师（电气工程×法学） pack_key: major_electrical__major_law:0
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_law:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_law:0', 1, '电力法规工程师', 'major_electrical', 'major_law', '电气工程×法学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '《中华人民共和国电力法》自哪一年起施行？', '1995年', '1996年', '1998年', '2000年', 'B', NULL),
(@pack_id, 2, '根据《电力法》，电力事业应当适应国民经济和社会发展的需要，并适当先行发展。这体现了什么原则？', '市场经济原则', '适当超前发展原则', '环境保护优先原则', '用户至上原则', 'B', NULL),
(@pack_id, 3, '下列哪项不属于电力企业的基本义务？', '依法供电', '保证供电质量', '向所有用户提供免费电力', '安全供电', 'C', NULL),
(@pack_id, 4, '电力管理部门委托的机构可以行使的行政处罚权上限是？', '警告', '罚款数额由委托部门决定', '吊销营业执照', '停电', 'B', '《电力法》第6条'),
(@pack_id, 5, '电力建设项目不符合电力发展规划、产业政策的，由电力管理部门责令停止建设，并处以罚款。该行为属于？', '民事违法', '行政违法', '刑事犯罪', '合同违约', 'B', NULL),
(@pack_id, 6, '根据《电力法》，谁负责全国电力的监督管理？', '国家发改委', '国务院能源主管部门', '国家电网公司', '中国电力企业联合会', 'B', NULL),
(@pack_id, 7, '电力企业与用户之间的供用电合同属于？', '行政合同', '民事合同', '劳动合同', '特许经营协议', 'B', NULL),
(@pack_id, 8, '下列哪种行为可能构成电力法中的“危害供电、用电安全”？', '私自增容用电', '在电线上晾晒衣物', '绕越计量装置用电', '以上都是', 'D', NULL),
(@pack_id, 9, '电力管理部门对电力企业进行监督检查时，有权采取的措施不包括？', '进入现场检查', '查阅复制有关文件', '扣押企业负责人', '要求企业说明情况', 'C', NULL),
(@pack_id, 10, '违反《电力法》规定，未取得供电营业许可从事供电业务的，电力管理部门可没收违法所得，并处以违法所得多少倍的罚款？', '1倍以下', '1倍以上5倍以下', '5倍以上10倍以下', '10倍以上', 'B', NULL),
(@pack_id, 11, '《电网调度管理条例》的适用范围不包括？', '省级电网', '跨省电网', '孤立运行的余热发电厂自用电网', '城市配电网', 'C', '条例适用于联网运行的电网，孤立小电网可参照'),
(@pack_id, 12, '电网调度机构应当遵循的原则是？', '公平、公正、公开', '安全、优质、经济', '局部服从全局', '以上都是', 'B', NULL),
(@pack_id, 13, '并网运行的发电厂或机组，必须服从谁的统一调度？', '发电企业上级公司', '电网调度机构', '地方政府', '用户代表', 'B', NULL),
(@pack_id, 14, '调度指令分为哪两种类型？', '操作指令和调整指令', '逐项指令和综合指令', '即时指令和预发指令', '紧急指令和普通指令', 'B', NULL),
(@pack_id, 15, '当电网发生严重故障威胁电网安全时，调度员可以采取的措施是？', '立即拉闸限电，无需事先通知', '必须报告上级后才能操作', '自行决定并执行紧急限电，事后报告', '通知所有用户停止用电', 'C', NULL),
(@pack_id, 16, '并网协议中必须包含的内容是？', '发电量分成比例', '调度管辖范围和调度关系', '设备保险责任', '员工福利标准', 'B', NULL),
(@pack_id, 17, '下列哪种行为属于违反调度纪律？', '不执行调度指令但立即说明理由', '执行调度指令时发生误操作', '无故拖延执行调度指令', '因设备故障无法执行并报告', 'C', NULL),
(@pack_id, 18, '对于拒不执行调度指令的发电企业，调度机构可以？', '直接将其解列', '报告电力监管部门处理', '予以罚款', '起诉至法院', 'B', '调度机构无权自行罚款或解列，需报告处理'),
(@pack_id, 19, '根据《安全生产法》，电力企业主要负责人对本单位安全生产工作的主要职责不包括？', '建立安全生产责任制', '保证安全投入', '直接参与每一起检修工作', '组织制定应急预案', 'C', NULL),
(@pack_id, 20, '电力企业从业人员有权拒绝？', '执行安全操作规程', '参加安全培训', '违章指挥和强令冒险作业', '佩戴个人防护用品', 'C', NULL),
(@pack_id, 21, '《电力安全工作规程》规定，电气设备操作后，应进行什么操作以防止误送电？', '悬挂“禁止合闸”标示牌', '锁上操作把手', '装设接地线', '以上都是', 'D', NULL),
(@pack_id, 22, '在全部停电或部分停电的电气设备上工作，保证安全的技术措施顺序是？', '停电→验电→装设接地线→悬挂标示牌', '验电→停电→装设接地线→悬挂标示牌', '装设接地线→停电→验电→悬挂标示牌', '悬挂标示牌→停电→验电→装设接地线', 'A', NULL),
(@pack_id, 23, '电力企业发生生产安全事故后，单位负责人接到报告应当？', '一小时内报告当地应急管理部门', '立即组织抢救并保护现场，同时报告', '先调查原因再报告', '自行处理后不上报', 'B', NULL),
(@pack_id, 24, '哪种情况下，工作票可以延长有效期？', '工作负责人提出申请，经签发人同意', '任何情况下不可延长', '工作班成员一致同意即可', '只需调度同意', 'A', NULL),
(@pack_id, 25, '根据《安全生产法》，电力企业未为从业人员提供符合标准的劳动防护用品的，责令限期改正，逾期未改正的，罚款额度为？', '5万元以下', '5万元以上20万元以下', '20万元以上50万元以下', '50万元以上', 'B', NULL),
(@pack_id, 26, '“四不放过”原则中，不包括？', '事故原因未查清不放过', '责任人未处理不放过', '整改措施未落实不放过', '媒体未报道不放过', 'D', NULL),
(@pack_id, 27, '根据《电力设施保护条例》，架空电力线路保护区范围：1-10千伏线路两侧向外延伸多少米？', '3米', '5米', '10米', '15米', 'B', NULL),
(@pack_id, 28, '在电力电缆线路保护区内禁止？', '种植低矮灌木', '临时堆放少量土方', '使用机械挖掘', '铺设人行道', 'C', NULL),
(@pack_id, 29, '任何单位或个人在架空电力线路保护区内不得？', '放风筝', '钓鱼', '修建建筑物', '以上都是', 'D', NULL),
(@pack_id, 30, '对危害电力设施的行为，电力企业有权？', '当场逮捕行为人', '强制拆除违法建筑', '制止并报告有关部门', '私自罚款', 'C', NULL),
(@pack_id, 31, '在电力设施周围500米范围内进行爆破作业的，必须？', '征得电力设施产权人同意并采取安全措施', '无需同意，只需报告', '禁止一切爆破', '只要距设施300米外即可', 'A', NULL),
(@pack_id, 32, '电力设施遭到破坏后，电力企业可以依法向破坏者主张？', '行政罚款', '赔偿损失', '刑事拘留', '吊销许可证', 'B', NULL),
(@pack_id, 33, '下列哪种行为属于保护电力设施的行为？', '发现杆塔倾斜立即报告', '在铁塔基础周围取土', '擅自砍伐线路下的树木', '向电力线路抛掷物体', 'A', NULL),
(@pack_id, 34, '《中华人民共和国可再生能源法》自2006年1月1日起施行，主要规范的可再生能源不包括？', '风能', '太阳能', '核能', '生物质能', 'C', NULL),
(@pack_id, 35, '电网企业应当全额收购其电网覆盖范围内的什么电量？', '所有发电量', '可再生能源并网发电项目的上网电量', '火电厂的富余电量', '用户自备电厂的余电', 'B', NULL),
(@pack_id, 36, '国家对可再生能源发电实行什么制度？', '固定电价补贴制度', '电价竞价制度', '特许经营权招标制度', '以上均可', 'A', '可再生能源法规定电网企业按政府确定的标杆电价全额收购'),
(@pack_id, 37, '可再生能源发展基金的主要来源包括？', '国家财政拨款', '可再生能源电价附加', '社会捐赠', 'A和B', 'D', NULL),
(@pack_id, 38, '违反可再生能源法规定，电网企业未全额收购可再生能源电量造成损失的，应当？', '仅承担行政责任', '承担赔偿责任', '由发电企业自行承担', '无需承担责任', 'B', NULL),
(@pack_id, 39, '下列哪种情况可以不适用全额保障性收购？', '风光资源不足时的低出力', '电网安全约束导致的限电', '发电企业自身原因无法发电', '以上都是', 'D', '法律明确排除非电网原因和不可抗力'),
(@pack_id, 40, '可再生能源发电项目的补贴资金通常采用何种方式发放？', '事后按实际发电量拨付', '事前一次性补贴', '项目投资额比例返还', '减免所得税', 'A', NULL),
(@pack_id, 41, '电力企业合规报告中，“风险矩阵”通常用哪两个维度评估风险等级？', '发生概率与影响程度', '法律层级与处罚力度', '企业规模与行业排名', '员工数量与资产总额', 'A', NULL),
(@pack_id, 42, '撰写电力法规合规报告时，首要步骤是？', '提出整改建议', '识别适用的法律法规清单', '编写封面和目录', '汇总历史罚款记录', 'B', NULL),
(@pack_id, 43, '合规报告中的“整改计划”应当包含？', '责任部门、完成时限、具体措施', '仅列出问题清单', '建议解雇相关员工', '外部律师的免责声明', 'A', NULL),
(@pack_id, 44, '下列哪种图表最适合在合规报告中展示近三年违规次数变化趋势？', '饼图', '折线图', '散点图', '雷达图', 'B', NULL),
(@pack_id, 45, '电力企业合规报告通常需要提交给？', '董事会或合规委员会', '所有员工公开', '客户代表', '新闻媒体', 'A', NULL),
(@pack_id, 46, '报告中引用法律法规条文时，正确的格式是？', '《电力法》第X条', '电力法X条', '根据相关法律', '法释[2020]X号', 'A', NULL),
(@pack_id, 47, '合规报告中的“风险评估”不应包含以下哪项？', '风险发生的可能性打分', '风险影响的财务量化估算', '竞争对手的违规情况', '现有控制措施的效力评估', 'C', NULL),
(@pack_id, 48, '电力企业合规报告通常以什么周期编制？', '每年一次', '每季度一次', '每半年一次', '视监管要求而定，通常年度或半年度', 'D', NULL),
(@pack_id, 49, '撰写合规报告时，对于已发现的违规行为，应当遵循什么原则？', '隐瞒不报，内部处理', '如实披露，并分析原因和改进措施', '仅披露轻微违规', '等待监管部门检查后再写入', 'B', NULL),
(@pack_id, 50, '合规报告最后的“管理声明”通常由谁签署？', '合规专员', '公司法定代表人或合规负责人', '外部审计师', '基层员工代表', 'B', NULL);
COMMIT;

-- 专业2：能源法律顾问（电气工程×法学） pack_key: major_electrical__major_law:1
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_law:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_law:1', 2, '能源法律顾问', 'major_electrical', 'major_law', '电气工程×法学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '《中华人民共和国能源法》立法目的不包括？', '保障能源安全', '促进能源节约', '规定所有能源价格上限', '保护生态环境', 'C', NULL),
(@pack_id, 2, '根据《能源法》，国家对能源发展的基本方针是？', '以煤为主，多元发展', '节约优先、立足国内、绿色低碳、创新驱动', '全面依赖进口', '完全市场化取消监管', 'B', NULL),
(@pack_id, 3, '下列哪项不属于能源法律顾问日常审核的典型文件？', '购电协议', '员工考勤表', '能源项目EPC合同', '燃料供应合同', 'B', NULL),
(@pack_id, 4, '能源法律顾问在项目前期尽职调查中，最应关注的法律风险是？', '项目用地合规性', '当地气候条件', '设备颜色', '员工食堂标准', 'A', NULL),
(@pack_id, 5, '《节约能源法》规定，能源生产经营单位不得向本单位职工无偿提供能源，否则视为？', '合法福利', '变相增加职工收入', '违反节能法，应予以处罚', '行业惯例', 'C', NULL),
(@pack_id, 6, '能源法律顾问审查天然气购销合同时，照付不议（Take-or-Pay）条款的核心风险是？', '气价波动', '买方即使未提气也需支付最低气款', '运输责任', '质量争议', 'B', NULL),
(@pack_id, 7, '国家能源局的主要法律地位是？', '国务院直属事业单位', '国务院部委管理的国家局（由国家发改委管理）', '央企', '行业协会', 'B', NULL),
(@pack_id, 8, '能源法律顾问在项目谈判中，针对不可抗力条款最需要争取的内容是？', '扩大不可抗力范围至所有价格波动', '明确不可抗力期间的合同履行责任及费用分担', '删除不可抗力条款', '将不可抗力效力延至合同终止后五年', 'B', NULL),
(@pack_id, 9, '长期购售电协议（PPA）中，能量价格通常由哪两部分组成？', '固定容量费 + 变动电量费', '燃料费 + 环境费', '税金 + 利润', '线损 + 税收', 'A', NULL),
(@pack_id, 10, '审核PPA中的“调度指令服从”条款，法律顾问应重点关注？', '电网调度是否享有无限制的指令权', '发电机组颜色', '员工住宿安排', '付款币种', 'A', NULL),
(@pack_id, 11, '某风电企业与电网公司签订PPA，约定“按实际发电量结算，但电网可因安全原因限电”，该条款对发电企业最主要风险是？', '电价波动', '限电导致收益下降，且无补偿机制', '风机寿命缩短', '税务问题', 'B', NULL),
(@pack_id, 12, '电力交易合同中，若双方约定争议由“香港国际仲裁中心”管辖，适用法律通常会选择？', '中国法律', '香港法律', '英国法', '美国纽约州法', 'C', '国际能源合同多数选英国法'),
(@pack_id, 13, '合同审核时发现“违约金每日万分之五”是否过高？中国司法实践中，违约金超过实际损失多少可被调减？', '20%', '30%', '50%', '100%', 'B', '超过造成损失的30%，一般可认定为过高'),
(@pack_id, 14, '“照付不议”条款在天然气合同中保护的是哪一方？', '买方', '卖方', '管道公司', '政府', 'B', NULL),
(@pack_id, 15, '绿电交易合同中，“绿色电力证书”的权属转移应如何约定？', '随电量同时转移', '单独约定交付时间和方式', '不转移，卖方保留', '由政府自动划转', 'B', NULL),
(@pack_id, 16, '审核电力交易合同的“终止条款”时，最重要的考量是？', '终止程序是否简单', '终止后的未结算电量如何处理及资产归还', '终止是否需要公证', '终止后员工安置', 'B', NULL),
(@pack_id, 17, '某央企作为购电方，要求将合同适用法律定为“中华人民共和国法律”，争议解决定为“被告所在地法院”，这对发电企业（往往为民营）？', '有利', '不利，可能增加异地诉讼成本', '无影响', '取决于发电企业规模', 'B', NULL),
(@pack_id, 18, '电力交易合同中的“并网调度协议”通常应由哪方主导起草？', '发电企业', '电网公司', '地方政府', '第三方咨询', 'B', NULL),
(@pack_id, 19, 'EPC合同中文全称是？', '工程设计采购施工总承包', '工程监理合同', '运营维护合同', '融资租赁合同', 'A', NULL),
(@pack_id, 20, '光伏电站EPC合同中，如果约定“性能考核未达标，承包方需支付合同总价20%的违约金”，法律顾问应考虑？', '该违约金是否过高需要调整', '直接接受', '改为100%', '删除考核条款', 'A', NULL),
(@pack_id, 21, 'EPC合同中“变更令”需经哪方签发才有效？', '业主代表', '施工队队长', '当地村长', '供应商', 'A', NULL),
(@pack_id, 22, '红皮书（施工合同）与银皮书（EPC交钥匙合同）最大区别是？', '业主承担的风险程度不同，银皮书下承包商承担更多风险', '合同颜色不同', '适用国家不同', '合同语言不同', 'A', NULL),
(@pack_id, 23, '在海上风电EPC项目中，地质条件不可预见风险通常由谁承担？', '业主', '承包商', '保险公司', '设计院', 'A', '银皮书除外，通常EPC银皮书承包商承担，但可约定例外'),
(@pack_id, 24, 'EPC合同中，“里程碑付款”应依据什么进行支付？', '日历时间', '实际完成的工程节点（如基础浇筑完成）并经确认', '承包商单方通知', '业主财务状况', 'B', NULL),
(@pack_id, 25, '审核EPC合同中的“分包限制”条款，法律顾问应注意？', '是否允许承包商分包主体工程', '分包商是否需要业主批准', '分包商资质要求', '以上都是', 'D', NULL),
(@pack_id, 26, '某EPC合同约定“缺陷责任期为24个月”，从什么时候起算？', '合同生效日', '工程竣工日', '工程移交日', '收到预付款日', 'C', NULL),
(@pack_id, 27, '如果EPC项目所在地法律变动导致成本增加，按照FIDIC银皮书，通常由谁承担？', '业主', '承包商', '双方平摊', '政府补偿', 'A', 'FIDIC银皮书第13.7条：法律变更由业主承担'),
(@pack_id, 28, '下列哪项不属于EPC合同的核心附件？', '技术规范', '投标人食堂菜单', '价格清单', '性能保证指标', 'B', NULL),
(@pack_id, 29, '可再生能源电价附加补助资金（国补）的核查重点是？', '项目是否纳入补贴目录', '实际发电量是否真实', '上网电价是否符合政策', '以上都是', 'D', NULL),
(@pack_id, 30, '对于分布式光伏发电项目，目前普遍适用的补贴政策是？', '固定度电补贴（已大部分退坡）', '投资总额一次性补贴', '税收减免', '绿证交易收入', 'A', '多数已平价，少数仍有地方补贴'),
(@pack_id, 31, '根据企业所得税法，符合条件的公共基础设施项目（如风电）享受“三免三减半”优惠，其起算时间是？', '项目取得第一笔生产经营收入年度', '项目核准年度', '项目开工建设年度', '项目并网发电年度', 'A', NULL),
(@pack_id, 32, '某储能项目是否适用“三免三减半”？按现行政策？', '适用，属于公共基础设施', '不直接适用，但可通过独立电站储能纳入', '完全免税', '无任何优惠', 'B', '需根据具体类型判断，独立储能电站可参照'),
(@pack_id, 33, '能源法律顾问在审查项目合资协议时，应关注能否享受西部大开发税收优惠，其企业所得税税率可降至？', '25%', '20%', '15%', '10%', 'C', NULL),
(@pack_id, 34, '骗取可再生能源补贴的法律后果可能包括？', '退回补贴、罚款、取消补贴资格', '仅退回补贴', '仅警告', '仅刑事处罚', 'A', NULL),
(@pack_id, 35, '增值税方面，风力发电产品的即征即退比例通常为？', '30%', '50%', '70%', '100%', 'B', NULL),
(@pack_id, 36, '下列哪种收入不属于能源企业的应税收入？', '售电收入', '碳交易配额出售收入', '政府无偿拨付的环保专项补助（有文件指定用途）', '违约金收入', 'C', '不征税收入，但需专款专用'),
(@pack_id, 37, '中国全国碳排放权交易市场于哪一年正式启动上线交易？', '2017年', '2019年', '2021年', '2023年', 'C', '2021年7月16日'),
(@pack_id, 38, '碳配额的法律性质通常被认为是？', '物权', '行政许可赋予的排放权，类似准物权', '债权', '知识产权', 'B', NULL),
(@pack_id, 39, '重点排放单位未按时足额清缴配额的，处罚措施是？', '责令改正+罚款2-3万元', '处清缴截止日前一年市场均价5-10倍罚款', '吊销营业执照', '直接关停', 'B', '《碳排放权交易管理办法》'),
(@pack_id, 40, '碳排放核查中，企业虚报数据的行为属于？', '合同违约', '行政违法', '刑事诈骗（情节严重时）', 'B和C都可能', 'D', NULL),
(@pack_id, 41, '法律顾问在审核碳配额购买协议时，最应关注的交付风险是？', '配额交割登记在注册登记簿上的时间', '协议封面设计', '打印纸张质量', '双方公司LOGO', 'A', NULL),
(@pack_id, 42, '碳抵消机制（如CCER）项目开发中，方法学的主要法律功能是？', '确定减排量计算的法律依据', '制定合同模板', '规定仲裁地点', '无关紧要', 'A', NULL),
(@pack_id, 43, '欧盟碳边境调节机制（CBAM）目前覆盖的行业不包括？', '水泥', '电力', '钢铁', '玩具', 'D', NULL),
(@pack_id, 44, '国际能源项目中最常见的争议解决方式是？', '诉讼（法院）', '国际商会仲裁（ICC）', '双方谈判', '政府裁决', 'B', NULL),
(@pack_id, 45, '香港国际仲裁中心（HKIAC）与新加坡国际仲裁中心（SIAC）相比，以下说法正确的是？', '两者规则完全相同', 'HKIAC更受中国企业欢迎，因接近内地', 'SIAC费用更高', 'HKIAC不接受国际案件', 'B', NULL),
(@pack_id, 46, '仲裁裁决的承认和执行依据《纽约公约》，中国加入时做了“商事保留”，意思是？', '仅承认和执行商事仲裁裁决', '不承认任何外国裁决', '仅承认投资仲裁', '必须经最高法院核准', 'A', NULL),
(@pack_id, 47, '能源项目合同中，如果约定“先调解后仲裁”，调解期限届满未成方可仲裁，这一条款的法律效力？', '无效，因调解不是法定前置', '有效，但仲裁庭可决定是否受调解期限约束', '必然导致仲裁协议无效', '仅适用于国内争议', 'B', NULL),
(@pack_id, 48, '下列哪种能源争议通常需要适用行政诉讼？', '电价补贴纠纷', '电网公司拒绝并网（属于行政行为还是民事行为？有争议）', '行政处罚不服', '设备采购质量争议', 'C', NULL),
(@pack_id, 49, '在能源仲裁中，选择仲裁员时，法律顾问应优先考虑仲裁员的？', '国籍', '能源行业经验和法律专业能力', '年龄', '性别', 'B', NULL),
(@pack_id, 50, '仲裁庭作出部分裁决后，一方不履行，另一方可申请？', '法院强制执行部分裁决', '仲裁庭重新审理', '政府协调', '只能等最终裁决', 'A', '部分裁决与最终裁决具有同等效力');
COMMIT;

-- 专业3：智能电网合规专员（电气工程×法学） pack_key: major_electrical__major_law:2
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_law:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_law:2', 3, '智能电网合规专员', 'major_electrical', 'major_law', '电气工程×法学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '根据《个人信息保护法》，处理敏感个人信息应当取得个人的什么同意？', '默示同意', '单独同意', '推定同意', '无需同意', 'B', NULL),
(@pack_id, 2, '智能电网中采集的用户用电数据（15分钟间隔）属于哪类个人信息？', '非个人信息', '敏感个人信息（可推断生活习惯）', '一般个人信息', '公共信息', 'B', '可反映居家作息，属于敏感信息'),
(@pack_id, 3, 'GDPR中规定的“数据最小化原则”在智能电网中的应用是？', '尽可能多采集数据', '仅采集特定目的所必需的数据', '数据永久保存', '数据可任意共享', 'B', NULL),
(@pack_id, 4, '以下哪种行为违反了中国《个人信息保护法》关于数据出境的规定？', '将用户用电数据存储在国内服务器', '向境外司法机构提供未经审批的用户数据', '数据匿名化后用于科研', '用户授权后向第三方提供', 'B', NULL),
(@pack_id, 5, '智能电表采集数据的存储期限，按照“告知同意”原则，最长应？', '无限期保存', '保存至用户注销或目的达成后合理期限', '保存100年', '保存至用户去世', 'B', NULL),
(@pack_id, 6, '用户要求删除其用电历史数据，智能电网运营商在什么情况下可以拒绝？', '数据已匿名化且无法识别个人', '用户欠费', '用户投诉过', '用户更换过地址', 'A', '匿名化后不再属于个人信息'),
(@pack_id, 7, 'GDPR规定的“被遗忘权”在智能电网情境下主要体现在？', '用户要求彻底删除所有数据', '用户要求停止采集', '用户要求数据转移', '用户要求数据加密', 'A', NULL),
(@pack_id, 8, '智能电网数据隐私影响评估（DPIA）在什么情况下必须进行？', '任何时候', '处理敏感个人信息或大规模监控时', '仅当用户投诉', '仅当政府要求', 'B', NULL),
(@pack_id, 9, '根据《网络安全法》，关键信息基础设施的运营者在境内运营中收集的个人信息应当存储在？', '境外任意地点', '中国境内', '用户指定地点', '任何云平台', 'B', NULL),
(@pack_id, 10, '智能电网企业委托第三方处理用户数据，合同必须包含的内容不包括？', '处理目的和期限', '数据安全保护义务', '第三方可以自由转委托', '违约责任', 'C', NULL),
(@pack_id, 11, '某智能电网APP未经用户同意收集用电数据用于商业分析，可能面临的最高行政处罚罚款是？', '10万元', '50万元', '5000万元或上一年度营业额5%', '100万元', 'C', '个保法情节严重'),
(@pack_id, 12, '以下哪项不属于数据隐私保护技术措施？', '假名化', '差分隐私', '将数据打印张贴在公告栏', '同态加密', 'C', NULL),
(@pack_id, 13, 'IEC 61850标准主要规定了什么？', '电能质量', '变电站通信网络和系统', '高压绝缘', '继电保护定值', 'B', NULL),
(@pack_id, 14, 'DL/T 645协议用于什么设备？', '输电线路', '多功能电能表通信', '变压器', '断路器', 'B', NULL),
(@pack_id, 15, '中国智能电网标准体系中的“SG-ERP”指的是？', '智能电网-企业资源计划', '智能电网-高效可靠电力', '智能电网-绿色能源', '智能电网-资产管理系统', 'A', NULL),
(@pack_id, 16, '智能变电站中，SV（采样值）报文的时间同步精度要求通常为？', '1秒', '4微秒', '1毫秒', '100毫秒', 'B', 'IEC 61850-9-2'),
(@pack_id, 17, '以下哪项标准是关于智能电网互操作性的？', 'IEC 61968（CIM）', 'IEEE 802.11', 'ISO 9001', 'OHSAS 18001', 'A', NULL),
(@pack_id, 18, '智能电表必须符合的国家标准系列主要是？', 'GB/T 17215', 'GB 7251', 'GB 50016', 'GB/T 19001', 'A', NULL),
(@pack_id, 19, '对智能电网通信设备进行电磁兼容测试的主要依据标准是？', 'GB/T 17626系列', 'ISO 14001', 'IEC 62305', 'IEEE 1588', 'A', NULL),
(@pack_id, 20, '智能电网中高级量测体系（AMI）的核心通信标准是？', 'Modbus', 'ZigBee Smart Energy 2.0', 'Profibus', 'HART', 'B', NULL),
(@pack_id, 21, '合规专员在审查智能电表采购技术规范时，必须确保电表支持哪个加密算法？', 'MD5', 'SM2/SM4（国密算法）', 'DES', 'RC4', 'B', '国家电网强制要求'),
(@pack_id, 22, '以下关于电网调度自动化系统GB/T 13729标准的描述，正确的是？', '适用于远动终端设备', '适用于低压开关', '适用于家用插座', '适用于核电站', 'A', NULL),
(@pack_id, 23, '中国“网络安全等级保护”制度（等保2.0）将安全保护等级划分为几级？', '3级', '4级', '5级', '6级', 'C', '第一级到第五级'),
(@pack_id, 24, '省级智能电网调度控制系统通常应达到等保几级？', '第一级', '第二级', '第三级', '第四级', 'C', '关键基础设施通常三级'),
(@pack_id, 25, '等保2.0的核心标准是？', 'GB/T 22239', 'GB/T 22080', 'GB/T 19001', 'GB/T 24001', 'A', NULL),
(@pack_id, 26, '以下哪项不属于等保2.0的“安全通用要求”中的技术部分？', '安全物理环境', '安全通信网络', '安全区域边界', '公司员工着装规范', 'D', NULL),
(@pack_id, 27, '智能电网中，生产控制大区与管理信息大区之间应采取什么隔离措施？', '逻辑隔离', '物理单向隔离（正向隔离装置）', '不隔离', '防火墙双向通信', 'B', '电力监控系统安全防护规定'),
(@pack_id, 28, '等保定级后，系统建设整改完成应进行？', '自我评价', '等级测评（由具备资质的测评机构）', '只备案即可', '销毁资料', 'B', NULL),
(@pack_id, 29, '违反等保制度导致严重后果的，单位可能面临？', '仅警告', '罚款、停业整顿、负责人处分', '吊销执照', '无需处罚', 'B', NULL),
(@pack_id, 30, '等保2.0中“可信验证”要求主要针对？', '用户密码', '系统启动和运行过程的完整性', '数据备份', '日志审计', 'B', NULL),
(@pack_id, 31, '智能电网中，哪些设备属于“生产控制大区”的典型设备？', '办公电脑', '调度自动化系统服务器', '营销业务系统', '公司门户网站', 'B', NULL),
(@pack_id, 32, '等保测评周期，第三级系统要求多久测评一次？', '每年一次', '每两年一次', '每半年一次', '每三年一次', 'A', NULL),
(@pack_id, 33, '美国出口管制条例（EAR）中针对智能电网设备中可能涉及“新兴技术”的ECCN编码，其主要管制原因是？', '价格垄断', '国家安全', '环保要求', '劳工权益', 'B', NULL),
(@pack_id, 34, '若中国智能电网企业从美国进口含有受控技术的芯片，需要遵守美国什么规则？', 'FCPA', 'EAR', 'HIPAA', 'SOX', 'B', NULL),
(@pack_id, 35, '欧盟出口管制法规中，军民两用物项清单包括下列哪类智能电网组件？', '家用插座', '高级加密通信模块', '普通电缆', '标准继电器', 'B', NULL),
(@pack_id, 36, '如果智能电网企业被列入美国实体清单，可能面临的后果是？', '不能再从美国供应商获得任何受管制物项', '仍需正常供货', '可自由进口武器', '不受影响', 'A', NULL),
(@pack_id, 37, '以下哪个国家行为可能触发美国次级制裁（对第三国企业）？', '与伊朗电力交易且涉及美国原产技术', '与加拿大交易', '与澳大利亚交易', '与日本交易', 'A', NULL),
(@pack_id, 38, '出口管制合规专员在审查国际智能电网项目时，应当首先确认？', '产品是否含有受控物项及最终用途是否敏感', '项目利润', '当地语言', '员工肤色', 'A', NULL),
(@pack_id, 39, '向俄罗斯出口智能电网高级量测系统，目前可能受到哪类制裁？', '无限制', '欧盟和美国均实施严格管制', '只限制农产品', '只限制武器', 'B', NULL),
(@pack_id, 40, '违反出口管制的法律后果可能包括？', '高额罚款和负责人刑事责任', '仅警告', '仅补税', '免于处罚', 'A', NULL),
(@pack_id, 41, '智能电网合规审计的第一步通常是？', '出具审计报告', '制定审计计划和范围', '直接罚款', '解雇员工', 'B', NULL),
(@pack_id, 42, '合规审计中，抽样检查智能电表的密钥管理记录，目的是验证？', '电表外观', '密钥生成、分发、销毁是否符合规定', '电表安装数量', '用户满意度', 'B', NULL),
(@pack_id, 43, '审计发现某配电终端未按期更新固件导致存在已知漏洞，属于哪种类型的不合规？', '制度缺陷', '执行缺陷', '法律空白', '不可抗力', 'B', NULL),
(@pack_id, 44, '合规审计报告中的“纠正措施计划”应包含？', '责任人、整改措施、完成时限', '仅问题描述', '建议开除员工', '推迟审计', 'A', NULL),
(@pack_id, 45, '智能电网合规审计的第三方机构通常应具备什么资质？', '任何咨询公司', '中国合格评定国家认可委员会（CNAS）认可的检查机构', '律师事务所', '广告公司', 'B', NULL),
(@pack_id, 46, '以下哪项是审计证据的有效形式？', '系统日志截图', '员工口头保证', '推测', '匿名举报信无佐证', 'A', NULL),
(@pack_id, 47, '审计发现某智能电网供应商存在数据泄露风险，审计员应当？', '在报告中如实记录并提出紧急风险提示', '隐瞒', '自行修复', '仅私下警告', 'A', NULL),
(@pack_id, 48, '合规审计中“穿行测试”的目的是？', '测试系统性能', '验证一个完整业务流程是否按设计运行', '测试网络速度', '测试员工打字', 'B', NULL),
(@pack_id, 49, '智能电网合规审计的最终报告应提交给？', '公司管理层和合规委员会', '所有员工', '客户', '公众', 'A', NULL),
(@pack_id, 50, '审计结束后，企业应建立跟踪机制，确保？', '整改措施在约定时限内完成并验证', '审计报告销毁', '不再进行下一次审计', '审计员被解雇', 'A', NULL);
COMMIT;

-- 专业4：电力行业财务分析师（电气工程×会计学） pack_key: major_electrical__major_accounting:0
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_accounting:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_accounting:0', 4, '电力行业财务分析师', 'major_electrical', 'major_accounting', '电气工程×会计学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '火力发电企业中，购入的燃煤在未投入锅炉前应计入哪个会计科目？', '原材料', '燃料', '在建工程', '库存商品', 'A', '火电企业设“原材料-燃料”明细'),
(@pack_id, 2, '发电企业的“电网接入费”应计入？', '管理费用', '固定资产（资本化）', '销售费用', '营业外支出', 'B', NULL),
(@pack_id, 3, '水电站的大坝折旧通常采用什么方法？', '年限平均法', '产量法（按发电量）', '双倍余额递减法', '年数总和法', 'B', NULL),
(@pack_id, 4, '电力企业收到的可再生能源电价附加补贴，应计入？', '主营业务收入', '营业外收入', '其他收益', '资本公积', 'C', '政府补助，计入其他收益'),
(@pack_id, 5, '电网企业的输电线路日常维护费应计入？', '管理费用', '主营业务成本-输配电成本', '财务费用', '营业外支出', 'B', NULL),
(@pack_id, 6, '核电站计提的核退役准备金，属于？', '预计负债', '应付账款', '长期借款', '所有者权益', 'A', NULL),
(@pack_id, 7, '电力企业售电收入的确认时点是？', '签订合同时', '用户实际用电且结算电量确认后', '收到电费时', '开具发票时', 'B', NULL),
(@pack_id, 8, '下列哪项不计入电力企业的“主营业务成本”？', '燃料费', '购电费', '捐赠支出', '职工薪酬（生产人员）', 'C', NULL),
(@pack_id, 9, '电力企业CO₂排放配额的会计处理，若无偿取得，通常确认为？', '无形资产', '存货', '交易性金融资产', '不确认，表外登记', 'A', '按公允价值确认无形资产和递延收益'),
(@pack_id, 10, '某风电企业将风机基础建设支出资本化，其折旧年限通常为？', '5年', '10-15年', '20-25年', '50年', 'C', '风机设计寿命20-25年'),
(@pack_id, 11, '某火电厂年发电量50亿度，燃煤成本30亿元，则单位燃料成本为？', '0.06元/度', '0.6元/度', '0.006元/度', '6元/度', 'B', '30亿/50亿=0.6元/度'),
(@pack_id, 12, '某燃机电厂采用两部制电价，容量电价主要补偿？', '燃料成本', '固定成本（折旧、人员等）', '环保成本', '财务费用', 'B', NULL),
(@pack_id, 13, '水电厂的变动成本主要是？', '水资源费', '折旧', '大修费用', '库区维护费', 'A', '水资源费、库区基金等与发电量相关'),
(@pack_id, 14, '某光伏电站年发电小时数1200小时，装机100MW，总投资4亿元，按20年直线折旧无残值，年折旧多少？', '1000万元', '2000万元', '4000万元', '8000万元', 'B', '4亿/20=2000万元'),
(@pack_id, 15, '以下哪种方法最精确地核算电网企业的输配电成本？', '完全成本法', '作业成本法（按电压等级和线路归集）', '变动成本法', '标准成本法', 'B', NULL),
(@pack_id, 16, '电力企业的“厂用电率”如何影响成本？', '厂用电率越高，单位供电成本越低', '厂用电率越高，单位供电成本越高', '无影响', '仅影响收入', 'B', '厂用电不计入上网电量，但消耗燃料'),
(@pack_id, 17, '某电厂年发电量100亿度，厂用电率5%，则供电量为？', '95亿度', '100亿度', '105亿度', '90亿度', 'A', NULL),
(@pack_id, 18, '燃气发电企业的成本中，燃料成本占比通常为？', '20-30%', '40-50%', '60-70%', '80-90%', 'C', NULL),
(@pack_id, 19, '在项目财务评价中，“平准化度电成本（LCOE）”的计算公式为？', '总成本/总发电量', '生命周期的成本现值/生命周期发电量现值', '初始投资/年发电量', '年运营成本/年发电量', 'B', NULL),
(@pack_id, 20, '储能项目的成本核算中，除初始投资外，最重要的变动成本是？', '充电电费', '人工费', '土地租金', '保险', 'A', NULL),
(@pack_id, 21, '电力企业“机组启停成本”属于？', '固定成本', '半变动成本', '完全变动成本', '沉没成本', 'B', NULL),
(@pack_id, 22, '火力发电企业脱硫脱硝成本应计入？', '管理费用', '主营业务成本-环保费用', '营业外支出', '其他业务成本', 'B', NULL),
(@pack_id, 23, '在电力项目财务模型中，计算净现值（NPV）使用的折现率通常为？', '无风险利率', '加权平均资本成本（WACC）', '内部收益率', '银行贷款利率', 'B', NULL),
(@pack_id, 24, '某风电项目初始投资10亿元，年净现金流1.5亿元，永续经营，WACC=8%，其NPV约为？', '10亿元', '8.75亿元', '18.75亿元', '0亿元', 'B', '1.5/0.08=18.75，减初始10=8.75'),
(@pack_id, 25, '内部收益率（IRR）指的是使NPV等于零的？', '利率', '时间', '现金流', '投资额', 'A', NULL),
(@pack_id, 26, '某光伏项目投资回收期为6年，运营期为20年，以下说法正确的是？', '6年后项目开始盈利', '6年内累计现金流等于初始投资', '项目在第6年现金流为正', '项目IRR为0', 'B', NULL),
(@pack_id, 27, '在敏感性分析中，通常将哪个变量作为横轴？', '不确定因素的变化率', '项目净现值', '时间', '项目收入', 'A', NULL),
(@pack_id, 28, '某项目债务融资比例为70%，股权融资30%，债务利率5%，股权期望回报12%，所得税率25%，则税后WACC约为？', '7.8%', '8.5%', '10.2%', '5.8%', 'A', NULL),
(@pack_id, 29, '财务模型中，用于计算偿债备付率（DSCR）的分母是？', '当年应还本息额', '当年净利润', '当年折旧', '当年收入', 'A', NULL),
(@pack_id, 30, '某电力项目融资模型中，如果DSCR小于1，表示？', '现金流不足以偿还当期债务', '项目盈利良好', '项目已还清债务', '无需关注', 'A', NULL),
(@pack_id, 31, '在项目财务模型中，“流动资金”通常包括？', '燃料库存、应收账款、现金', '固定资产', '无形资产', '长期投资', 'A', NULL),
(@pack_id, 32, '某火电项目年收入10亿元，年运营成本6亿元，折旧2亿元，利息1亿元，税率25%，则净利润为？', '1亿元', '0.75亿元', '2亿元', '1.5亿元', 'B', '利润总额=10-6-2-1=1，税后0.75'),
(@pack_id, 33, '中国输配电价改革的“准许成本加合理收益”模式中，准许收益的计算基数是？', '总资产', '有效资产', '净资产', '在建工程', 'B', NULL),
(@pack_id, 34, '省级电网输配电价定价办法中，权益资本收益率通常参照？', '10年期国债收益率+风险溢价', '银行贷款基准利率', '消费者物价指数', '行业平均利润', 'A', NULL),
(@pack_id, 35, '输配电价实行“两部制”包括？', '电量电价和容量电价', '峰时电价和谷时电价', '基本电价和力率调整电费', '线损电价和基金附加', 'A', NULL),
(@pack_id, 36, '第一批输配电价改革试点省份不包括？', '深圳', '内蒙古西部', '云南', '西藏', 'D', NULL),
(@pack_id, 37, '输配电价监管周期一般为？', '1年', '3年', '5年', '10年', 'B', NULL),
(@pack_id, 38, '政府核定的输配电价中，交叉补贴如何处理？', '取消所有交叉补贴', '逐步减少，保留合理补贴', '全部由财政承担', '由电网企业自行消化', 'B', NULL),
(@pack_id, 39, '某省核定输配电准许收入50亿元，售电量500亿度，则平均输配电价（不含线损）为？', '0.05元/度', '0.1元/度', '0.5元/度', '1元/度', 'B', NULL),
(@pack_id, 40, '以下哪项不属于输配电价成本监审核减的项目？', '职工福利超标部分', '未经核准的投资', '合理的设备折旧', '无关业务的成本分摊', 'C', NULL),
(@pack_id, 41, '在Excel中，计算项目内部收益率的函数是？', 'NPV', 'IRR', 'PV', 'RATE', 'B', NULL),
(@pack_id, 42, 'VBA中声明一个整型变量的语句是？', 'Dim i As Integer', 'Int i', 'var i = 0', 'int i;', 'A', NULL),
(@pack_id, 43, '以下VBA代码片段：For i = 1 to 10 Step 2，循环执行次数为？', '5次', '10次', '2次', '1次', 'A', '1,3,5,7,9'),
(@pack_id, 44, 'Excel中，=XIRR(values, dates, guess)函数区别于IRR的特点是？', '考虑不等间隔现金流', '只考虑正现金流', '不需要guess', '只能用于日数据', 'A', NULL),
(@pack_id, 45, 'VBA中引用工作表单元格区域正确的写法是？', 'Range("A1:B10")', 'Cells(1,1).Range', 'Sheets(1).Range(1,1)', 'Range[A1:B10]', 'A', NULL),
(@pack_id, 46, '在财务建模中，以下哪个函数用于计算直线折旧？', 'SLN', 'DB', 'DDB', 'SYD', 'A', NULL),
(@pack_id, 47, 'VBA中，Workbooks("Model.xlsx").Close SaveChanges:=True的作用是？', '关闭文件并保存更改', '仅关闭不保存', '保存后不关闭', '打开文件', 'A', NULL),
(@pack_id, 48, '在Excel数据表中，创建可动态更新的下拉列表应使用？', '数据验证-序列', '条件格式', '筛选', '分类汇总', 'A', NULL),
(@pack_id, 49, 'VBA中处理错误使用语句？', 'On Error GoTo', 'Try...Catch', 'ErrorHandler', 'Catch Error', 'A', NULL),
(@pack_id, 50, '财务分析师要自动化生成多个情景的NPV表，最高效的方法是？', '手动输入每个情景', '使用VBA循环遍历输入变量，输出结果表', '使用Excel的合并计算', '逐个情景保存不同文件', 'B', NULL);
COMMIT;

-- 专业5：能源项目成本控制（电气工程×会计学） pack_key: major_electrical__major_accounting:1
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_accounting:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_accounting:1', 5, '能源项目成本控制', 'major_electrical', 'major_accounting', '电气工程×会计学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在光伏电站项目前期，使用已建成类似项目的单位造价（元/W）进行估算，这种方法称为？', '参数估算法', '类比估算法', '自下而上估算法', '三点估算法', 'B', NULL),
(@pack_id, 2, '某风电项目采用“自下而上”成本估算，其准确性通常？', '高于类比估算', '低于类比估算', '与类比估算相同', '无法比较', 'A', NULL),
(@pack_id, 3, '在项目可行性研究阶段，成本估算的允许误差范围通常为？', '±5%', '±10%～±20%', '±30%～±50%', '±100%', 'B', NULL),
(@pack_id, 4, '以下哪项不是成本估算的直接输入？', '工作分解结构（WBS）', '资源价格', '项目工期', '公司员工生日', 'D', NULL),
(@pack_id, 5, '利用历史数据建立数学模型预测成本的方法属于？', '专家判断', '参数估算', '类比估算', '储备分析', 'B', NULL),
(@pack_id, 6, '某储能项目，电池成本占60%，BMS占10%，安装费占15%，其他占15%。若电池价格下降20%，则总成本下降约？', '6%', '12%', '18%', '20%', 'B', '60%×20% = 12%'),
(@pack_id, 7, '项目成本估算中的“应急储备”用于？', '已知-未知风险', '未知-未知风险', '项目利润', '管理层奖金', 'A', NULL),
(@pack_id, 8, '对工程量清单进行单价×数量的累加，这种成本估算方法是？', '类比估算', '自下而上（详细估算）', '参数估算', '三点估算', 'B', NULL),
(@pack_id, 9, '“三点估算”中的最可能成本、乐观成本和悲观成本，通常采用什么分布计算期望？', '正态分布', '三角分布或贝塔分布', '均匀分布', '指数分布', 'B', NULL),
(@pack_id, 10, '某风电场项目，WBS中“风机基础”的成本估算应主要依据？', '混凝土和钢筋的市场价及用量', '项目经理经验', '竞争对手报价', '历史项目总造价乘以比例', 'A', NULL),
(@pack_id, 11, '挣值管理中，BCWP（已完成工作预算成本）通常代表？', '实际成本', '挣值', '计划价值', '完工预算', 'B', NULL),
(@pack_id, 12, '某项目计划到第3个月完成预算1000万元，实际完成工作预算900万元，实际花费1100万元。成本绩效指数CPI为？', '0.82', '0.90', '1.10', '1.22', 'A', 'CPI = EV/AC = 900/1100 = 0.818'),
(@pack_id, 13, '若SPI=0.8，表示项目？', '成本超支', '进度超前', '进度滞后', '成本节约', 'C', NULL),
(@pack_id, 14, '某风电项目完工预算BAC=1亿元，当前EV=5000万元，AC=6000万元，若后续CPI保持不变，则完工估算EAC为？', '1亿元', '1.2亿元', '1.1亿元', '1.5亿元', 'B', 'EAC = BAC/CPI = 1亿/0.833≈1.2亿'),
(@pack_id, 15, '挣值管理中，成本偏差CV的计算公式是？', 'EV - AC', 'EV - PV', 'AC - EV', 'PV - EV', 'A', NULL),
(@pack_id, 16, '某项目进度偏差SV为负值，说明？', '成本超支', '成本节约', '进度滞后', '进度超前', 'C', NULL),
(@pack_id, 17, '如果要预测项目最终完工成本，且未来绩效将按计划执行（不再按当前CPI），应使用公式？', 'EAC = AC + (BAC - EV)', 'EAC = BAC/CPI', 'EAC = AC + (BAC - EV)/CPI', 'EAC = BAC', 'A', '典型偏差修正'),
(@pack_id, 18, '挣值管理中的“完工尚需绩效指数TCPI”用于？', '衡量剩余工作需要多高的效率才能按预算完成', '计算已完成工作的价值', '预测项目工期', '计算实际成本', 'A', NULL),
(@pack_id, 19, '某项目EV=400万，PV=450万，AC=420万，该项目状态是？', '进度落后，成本超支', '进度落后，成本节约', '进度超前，成本超支', '进度超前，成本节约', 'A', 'SV=-50落后，CV=-20超支'),
(@pack_id, 20, '挣值管理不适用于以下哪种情况？', '可量化工作进度', '无法合理分解WBS', '需要客观衡量绩效', '大型复杂项目', 'B', NULL),
(@pack_id, 21, '项目成本预算的基准是？', '成本估算', '工作分解结构', '项目进度计划', '以上都是', 'D', NULL),
(@pack_id, 22, '制定预算时，将应急储备与管理储备的区别是？', '应急储备用于已知风险，管理储备用于未知风险', '管理储备用于已知风险', '两者相同', '应急储备不在基准内', 'A', NULL),
(@pack_id, 23, '某光伏项目总预算5000万元，其中管理储备200万元，则项目成本基准为？', '5200万元', '5000万元', '4800万元', '4700万元', 'C', '基准=总预算-管理储备'),
(@pack_id, 24, '以下哪项不是预算编制的输入？', '成本管理计划', '活动成本估算', '项目章程', '员工家庭住址', 'D', NULL),
(@pack_id, 25, '项目预算中的“资金限制平衡”是指？', '根据可用资金调整工作进度', '无限增加资金', '压缩应急储备', '提高项目利润', 'A', NULL),
(@pack_id, 26, '某项目计划每月支出：第1月200万，第2月300万，第3月500万，到第3月底累计计划预算为？', '500万', '800万', '1000万', '1200万', 'C', NULL),
(@pack_id, 27, '在资本预算中，通常不包含以下哪项费用？', '设备购置费', '安装工程费', '日常办公文具费（属于运营费用）', '勘察设计费', 'C', NULL),
(@pack_id, 28, '能源项目前期开发费用（如测风、地勘）应计入？', '项目资本成本', '期间费用或开发成本（符合资本化条件前费用化）', '财务费用', '营业外支出', 'B', NULL),
(@pack_id, 29, '预算编制中“滚动式规划”的特点是？', '近期工作详细，远期工作粗略', '所有阶段同样详细', '只做下个月预算', '每年重新开始', 'A', NULL),
(@pack_id, 30, '项目预算获批后，成本控制专员发现某项活动需要额外100万元，首先应？', '直接使用管理储备', '提出变更请求', '削减其他活动预算', '忽略', 'B', NULL),
(@pack_id, 31, '项目变更导致成本增加，成本控制专员需首先？', '计算变更对总预算的影响', '拒绝变更', '立即支付额外费用', '通知施工队停工', 'A', NULL),
(@pack_id, 32, '变更订单（Change Order）正式生效前必须获得谁的批准？', '施工队长', '业主或授权代表', '供应商', '监理工程师（通常需业主授权）', 'B', NULL),
(@pack_id, 33, '某风电项目基础设计变更，增加混凝土200m³，单价500元/m³，人工增加5万元，间接费率10%，则变更总价约为？', '10万元', '15万元', '16.5万元', '20万元', 'C', '200*500=10万，人工5万，小计15万，间接费1.5万，合计16.5万'),
(@pack_id, 34, '以下哪种情况最容易导致成本超支的变更？', '提前通知的变更', '施工中紧急变更且无竞争报价', '业主主动提出的变更', '设计优化变更', 'B', NULL),
(@pack_id, 35, '变更订单中应明确的内容不包括？', '变更范围和图纸', '工期影响', '项目经理喜好', '费用及支付方式', 'C', NULL),
(@pack_id, 36, '累计变更订单金额超过合同价一定比例时，通常需要？', '重新招标', '签订补充协议并经更高层级批准', '终止合同', '仲裁', 'B', NULL),
(@pack_id, 37, '某EPC合同约定变更费用按“成本+固定百分比”计算，这对业主的风险是？', '承包商可能虚报成本', '业主完全无风险', '变更处理速度慢', '不利于质量控制', 'A', NULL),
(@pack_id, 38, '为控制变更成本，最好在哪个阶段识别并减少变更？', '设计阶段', '施工阶段', '竣工阶段', '运维阶段', 'A', NULL),
(@pack_id, 39, '海上风电项目相比于陆上风电，最主要的额外成本项是？', '风机价格', '海上施工与海缆、升压站', '土地征用', '保险', 'B', NULL),
(@pack_id, 40, '核电站退役成本通常占初始投资的？', '5-10%', '10-20%', '25-35%', '50%以上', 'B', NULL),
(@pack_id, 41, '某光热电站（CSP）带储热，其成本结构中占比最高的是？', '集热场', '储热系统', '发电岛', '土地', 'A', NULL),
(@pack_id, 42, '抽水蓄能电站的成本中，上下水库的造价主要取决于？', '地形地质条件', '机组容量', '输电线长度', '环保要求', 'A', NULL),
(@pack_id, 43, '生物质电厂的燃料成本通常为每度电？', '0.1-0.2元', '0.3-0.5元', '0.6-0.8元', '1元以上', 'B', '取决于秸秆/林业废弃物价格'),
(@pack_id, 44, '电力送出工程（输电线路及间隔）的成本通常由谁承担？', '发电企业全额承担', '电网公司承担', '政府和电网分摊，部分由发电企业垫付后回收', '地方政府', 'C', NULL),
(@pack_id, 45, '某分布式光伏项目，占比最大的非技术成本是？', '组件价格', '逆变器', '屋顶租赁费或开发费', '电缆', 'C', NULL),
(@pack_id, 46, '以下哪项属于能源项目的“软成本”？', '风机塔筒', '光伏支架', '项目前期开发费、许可费、管理费', '变压器', 'C', NULL),
(@pack_id, 47, '储能项目的“循环老化成本”通常如何计量？', '每充放电一次的成本', '年度固定成本', '按容量分摊', '与使用无关', 'A', NULL),
(@pack_id, 48, '某燃煤电厂超低排放改造成本，其回收主要通过？', '环保电价补贴', '电费涨价', '政府直接拨款', '碳交易收益', 'A', NULL),
(@pack_id, 49, '项目成本控制中，“全生命周期成本”包括？', '初始投资+运营成本+退役处置成本', '仅初始投资', '仅运营成本', '仅财务成本', 'A', NULL),
(@pack_id, 50, '成本控制专员发现某风电项目实际吊装费超出预算30%，最可能的直接原因是？', '吊车租赁价格上涨或天气导致延期', '风机价格上涨', '设计变更', '税率调整', 'A', NULL);
COMMIT;

-- 专业6：资产折旧专员（电气工程×会计学） pack_key: major_electrical__major_accounting:2
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_accounting:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_accounting:2', 6, '资产折旧专员', 'major_electrical', 'major_accounting', '电气工程×会计学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '电力企业中，下列哪项不应确认为固定资产？', '输电铁塔', '正在安装尚未交付的变压器', '已投入使用的发电机组', '办公用电脑', 'B', '在建工程，未达到预定可使用状态'),
(@pack_id, 2, '固定资产确认的两个核心条件是？', '价值超过5000元，使用超过1年', '经济利益很可能流入企业，成本可靠计量', '有形资产，用于生产', '已付款，已入库', 'B', NULL),
(@pack_id, 3, '某电力企业购入一套继电保护装置，单价3000元，预计使用3年。按企业会计准则，通常应？', '确认为固定资产', '计入当期损益或低值易耗品', '确认为无形资产', '计入长期待摊费用', 'B', '重要性原则，低于固定金额标准'),
(@pack_id, 4, '电网企业的架空输电线路，其构成固定资产的单元通常是？', '每一基铁塔', '一条完整线路作为一个资产', '按电压等级汇总', '按行政区域汇总', 'B', NULL),
(@pack_id, 5, '电力企业的土地使用权应确认为？', '固定资产', '无形资产', '投资性房地产', '存货', 'B', NULL),
(@pack_id, 6, '下列哪项属于电力企业的“融资租入固定资产”？', '以经营租赁租入的吊车', '租赁期满所有权转移的发电机组', '借入的设备', '他人赠送的设备', 'B', NULL),
(@pack_id, 7, '固定资产分类中，发电企业的“水工建筑物”包括？', '大坝、溢洪道、进水口', '水轮机', '发电机', '主变压器', 'A', NULL),
(@pack_id, 8, '企业购入需要安装的变压器，应先计入哪个科目？', '固定资产', '在建工程', '工程物资', '原材料', 'B', NULL),
(@pack_id, 9, '固定资产原值不包括？', '购买价款', '运输费', '安装调试费', '增值税进项税额（一般纳税人可抵扣）', 'D', '可抵扣增值税不计入原值'),
(@pack_id, 10, '电力企业技改支出替换旧设备部件，旧部件账面价值应如何处理？', '继续保留', '终止确认，计入当期损益', '转入资本公积', '冲减新部件原值', 'B', NULL),
(@pack_id, 11, '某变压器原值120万元，预计残值率5%，折旧年限10年，采用直线法，年折旧额为？', '11.4万元', '12万元', '10.8万元', '11万元', 'A', '120×95%÷10=11.4'),
(@pack_id, 12, '双倍余额递减法下，年折旧率是直线法折旧率的？', '1倍', '1.5倍', '2倍', '3倍', 'C', NULL),
(@pack_id, 13, '某设备原值100万元，残值10万元，使用年限5年，采用年数总和法，第二年折旧额为？', '30万元', '24万元', '18万元', '12万元', 'B', '年数总和15，第一年5/15×90=30，第二年4/15×90=24'),
(@pack_id, 14, '采用双倍余额递减法，在最后两年应改用？', '直线法', '年数总和法', '工作量法', '继续双倍余额法', 'A', NULL),
(@pack_id, 15, '某输电线路原值800万元，无残值，折旧年限20年，直线法。使用6年后，账面价值为？', '560万元', '640万元', '600万元', '800万元', 'A', '年折旧40万，6年240万，800-240=560'),
(@pack_id, 16, '以下哪种资产最适合采用工作量法折旧？', '办公楼', '水电厂大坝', '输电铁塔', '按发电量计耗的设备如燃气轮机（可适用）', 'D', '有明确产出量'),
(@pack_id, 17, '某企业购置一台设备，原值50万元，预计总工作量为10万小时，第一年工作2万小时，按工作量法折旧，残值2万元，第一年折旧为？', '9.6万元', '10万元', '9万元', '8万元', 'A', '(50-2)/10=4.8元/小时，2万×4.8=9.6万'),
(@pack_id, 18, '某火电机组原值1亿元，预计使用20年，残值率5%，采用双倍余额递减法，第一年折旧额为？', '500万元', '950万元', '1000万元', '475万元', 'C', '1亿×2/20=1000万'),
(@pack_id, 19, '上题中第二年折旧额为？', '950万元', '900万元', '1000万元', '855万元', 'B', '(1亿-1000万)×10% = 900万'),
(@pack_id, 20, '加速折旧法对企业的当期所得税影响是？', '使当期所得税减少', '使当期所得税增加', '无影响', '使长期所得税总额减少', 'A', '前期折旧多，利润少，税少'),
(@pack_id, 21, '税务上允许加速折旧，但会计上采用直线法，产生的差异属于？', '永久性差异', '可抵扣暂时性差异', '应纳税暂时性差异', '无差异', 'B', '会计利润＞应税利润，产生递延所得税资产'),
(@pack_id, 22, '某企业2019年购入设备100万元，残值10万，年限5年，直线法年折旧18万。若税法允许双倍余额递减法，第一年折旧40万，则当年应税所得比会计利润少多少？', '18万', '22万', '40万', '10万', 'B', '40-18=22万'),
(@pack_id, 23, '使用年数总和法，折旧额每年？', '相等', '递减', '递增', '先增后减', 'B', NULL),
(@pack_id, 24, '某企业将资产折旧年限从10年改为8年，属于？', '会计政策变更', '会计估计变更', '前期差错更正', '资产负债表日后事项', 'B', NULL),
(@pack_id, 25, '固定资产折旧的计提范围，以下哪项需要计提折旧？', '已提足折旧继续使用的设备', '单独计价入账的土地', '季节性停用的发电机组', '已报废待处理的设备', 'C', NULL),
(@pack_id, 26, '根据企业所得税法，电力专用设备（如变电设备）的最低折旧年限是？', '5年', '10年', '15年', '20年', 'B', NULL),
(@pack_id, 27, '税法规定，电子设备最低折旧年限为？', '3年', '5年', '10年', '15年', 'A', NULL),
(@pack_id, 28, '企业购买并实际使用环境保护专用设备，可按设备投资额的多少抵免应纳税额？', '5%', '10%', '15%', '20%', 'B', '企业所得税法第三十四条'),
(@pack_id, 29, '税法上，固定资产残值比例由企业自行确定，但一经确定不得随意变更，且通常为？', '0%', '1%-5%', '5%-10%', '10%以上', 'C', '税法无强制，但常见5%-10%'),
(@pack_id, 30, '某电力企业会计上采用5年折旧，税法最低年限为10年，当年会计折旧比税法折旧多100万元，会产生？', '递延所得税资产', '递延所得税负债', '永久性差异', '无需处理', 'A', '可抵扣暂时性差异'),
(@pack_id, 31, '固定资产持有期间，会计计提减值准备，但税法不允许税前扣除，该差异属于？', '可抵扣暂时性差异', '应纳税暂时性差异', '永久性差异', '无需调整', 'A', NULL),
(@pack_id, 32, '税法规定的“一次性税前扣除”政策（500万元以下设备器具）适用于？', '所有企业所有设备', '符合条件的设备，在2018-2027年期间', '仅限小微企业', '仅限进口设备', 'B', NULL),
(@pack_id, 33, '某企业2019年购入设备享受一次性扣除，会计上分期折旧，当年产生可抵扣暂时性差异，应确认？', '递延所得税资产', '递延所得税负债', '应交税费减少', '以上都是', 'D', NULL),
(@pack_id, 34, '固定资产折旧的税务处理，企业应建立？', '固定资产折旧台账', '固定资产卡片', '折旧计算表', '以上都是', 'D', NULL),
(@pack_id, 35, '税法规定，房屋建筑物的最低折旧年限为？', '10年', '15年', '20年', '25年', 'C', NULL),
(@pack_id, 36, '根据电力工业固定资产分类折旧年限，水轮发电机组的折旧年限一般为？', '12-15年', '18-22年', '25-30年', '35-45年', 'B', '水电机组通常18-22年'),
(@pack_id, 37, '火力发电机组中，汽轮发电机的折旧年限通常为？', '15-20年', '20-25年', '25-30年', '30-35年', 'A', NULL),
(@pack_id, 38, '电网企业的输电线路（钢芯铝绞线）折旧年限一般为？', '10-15年', '20-30年', '30-40年', '50年', 'C', '实际30-40年'),
(@pack_id, 39, '变电设备中的变压器，折旧年限通常为？', '10-15年', '18-22年', '25-30年', '35-40年', 'B', NULL),
(@pack_id, 40, '风力发电机组的折旧年限通常为？', '10年', '15年', '20年', '25年', 'C', '设计寿命20-25年，常见20年'),
(@pack_id, 41, '光伏电站组件（晶硅）的折旧年限通常为？', '10年', '15年', '20年', '25年', 'C', '产品质保25年，财务折旧常见20-25年'),
(@pack_id, 42, '电力企业购置的计算机、服务器等电子设备，税法最低折旧年限为？', '3年', '5年', '10年', '15年', 'A', NULL),
(@pack_id, 43, '核电站的核岛设备折旧年限一般？', '10-15年', '15-20年', '20-25年', '25-30年', 'D', NULL),
(@pack_id, 44, '固定资产减值损失一经确认，在以后会计期间？', '可以转回', '不得转回', '经批准可转回', '在资产出售时可转回', 'B', '中国准则下长期资产减值不得转回'),
(@pack_id, 45, '判断固定资产是否发生减值的迹象不包括？', '资产市价大幅下跌', '资产已闲置或终止使用', '企业经营现金净流量持续为正', '技术落后导致淘汰', 'C', NULL),
(@pack_id, 46, '某输电铁塔原值200万元，累计折旧80万元，可收回金额100万元，应计提减值准备？', '0', '20万元', '100万元', '80万元', 'B', '账面价值120万，可收回100万，减值20万'),
(@pack_id, 47, '固定资产出售时，账面价值与售价的差额应计入？', '主营业务收入', '资产处置损益', '营业外收入', '其他综合收益', 'B', NULL),
(@pack_id, 48, '某企业报废一台变压器，账面原值50万元，累计折旧45万元，无残值，支付清理费2万元，应确认损益为？', '损失3万元', '损失7万元', '损失5万元', '收益3万元', 'B', '账面净值5万+清理费2万=7万损失'),
(@pack_id, 49, '固定资产盘亏，经批准后应计入？', '管理费用', '营业外支出', '其他应收款', '固定资产清理', 'B', NULL),
(@pack_id, 50, '资产折旧专员发现某设备已提足折旧但仍继续使用，下列处理正确的是？', '继续计提折旧', '停止计提折旧，只在备查簿登记', '冲回已提折旧', '转为在建工程', 'B', NULL);
COMMIT;

-- 专业7：嵌入式系统工程师（电气工程×计算机科学） pack_key: major_electrical__major_cs:0
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_cs:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_cs:0', 7, '嵌入式系统工程师', 'major_electrical', 'major_cs', '电气工程×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在嵌入式C语言中，const int *p 与 int * const p 的区别是？', '前者指针不可变，后者指向的数据不可变', '前者指向的数据不可变，后者指针不可变', '两者相同', '都是指针常量', 'B', NULL),
(@pack_id, 2, '以下哪个关键字用于声明变量存储在RAM中且初始化为0？', 'static', 'const', 'volatile', 'extern', 'A', '静态变量在数据段，未显式初始化为0'),
(@pack_id, 3, '嵌入式系统中，堆（heap）和栈（stack）的区别，下列说法正确的是？', '栈由程序员手动分配释放', '堆上的变量生命周期由作用域决定', '栈分配速度通常快于堆', '堆不存在内存碎片', 'C', NULL),
(@pack_id, 4, '以下代码在32位ARM Cortex-M上，sizeof(struct A) 最可能的值是？ struct A { char a; int b; char c; };', '6', '8', '10', '12', 'B', '对齐：char+3填充，int占4，char+3填充，总8'),
(@pack_id, 5, '使用malloc分配内存后，必须调用什么来释放？', 'delete', 'free', 'release', 'dispose', 'B', NULL),
(@pack_id, 6, '以下哪种情况最容易导致内存泄漏？', '忘记调用free', '数组越界', '使用未初始化指针', '栈溢出', 'A', NULL),
(@pack_id, 7, '中断服务函数（ISR）中应避免？', '使用全局变量', '调用printf', '设置标志位', '清除中断标志', 'B', 'printf不可重入且耗时'),
(@pack_id, 8, '在C语言中，volatile关键字的作用是？', '防止编译器优化，每次从内存重新读取', '声明变量为常量', '声明变量为静态', '声明变量为寄存器变量', 'A', NULL),
(@pack_id, 9, '嵌入式系统中，栈溢出通常会导致？', '程序运行缓慢', '硬件异常（HardFault）或数据损坏', '编译错误', '死循环', 'B', NULL),
(@pack_id, 10, '以下哪个函数用于将一块内存的内容复制到另一块？', 'memcpy', 'strcpy', 'memset', 'memmove', 'A', NULL),
(@pack_id, 11, '在C++中，虚函数表（vtable）通常存储在？', '栈', '堆', '只读数据段或代码段', '寄存器', 'C', NULL),
(@pack_id, 12, '嵌入式编程中，优化级别-O2可能导致什么问题？', '代码变大，可能引入时序问题', '总是提高性能', '无法调试', '增加功耗', 'A', NULL),
(@pack_id, 13, 'FreeRTOS中，创建任务的API函数是？', 'xTaskCreate', 'task_create', 'osThreadNew', 'pthread_create', 'A', NULL),
(@pack_id, 14, '以下哪个是实时操作系统（RTOS）的核心特性？', '分时调度', '确定性任务响应时间', '虚拟内存', '图形界面', 'B', NULL),
(@pack_id, 15, '优先级抢占式调度中，高优先级任务就绪时，低优先级任务会？', '继续运行', '被立即抢占', '进入休眠', '被挂起', 'B', NULL),
(@pack_id, 16, 'FreeRTOS中，二值信号量（Binary Semaphore）常用于？', '任务间同步或中断与任务同步', '计数资源管理', '互斥访问共享资源（但易优先级反转）', 'A和C', 'D', '通常二值信号量用于同步，互斥量用于互斥'),
(@pack_id, 17, '以下哪个机制可以防止优先级反转？', '递归锁', '优先级继承', '消息队列', '任务延时', 'B', NULL),
(@pack_id, 18, '任务间传递少量数据，最常用的RTOS对象是？', '信号量', '互斥量', '消息队列', '事件组', 'C', NULL),
(@pack_id, 19, 'FreeRTOS的vTaskDelayUntil与vTaskDelay的区别是？', '前者用于固定频率执行，后者用于相对延时', '两者相同', '前者阻塞任务，后者不阻塞', '前者只能用于空闲任务', 'A', NULL),
(@pack_id, 20, 'RTOS中，中断服务程序（ISR）可以调用的API通常以什么结尾？', 'FromISR', 'ISR', 'Int', 'Async', 'A', NULL),
(@pack_id, 21, '以下哪个是RTOS任务的状态？', '运行、就绪、阻塞、挂起', '编译、链接、运行', '新建、活动、销毁', '加载、执行、退出', 'A', NULL),
(@pack_id, 22, '某系统有三个任务，优先级分别为3、2、1（数字大优先级高），当前运行优先级3的任务，它调用vTaskDelay(10)后，下一个运行的任务是？', '优先级2的任务', '优先级1的任务', '空闲任务', '仍为原任务', 'C', '如果2和1都没有就绪，则空闲任务'),
(@pack_id, 23, 'I2C总线在标准模式下最高传输速率为？', '100 kbps', '400 kbps', '1 Mbps', '3.4 Mbps', 'A', '标准模式100k，快速400k，高速3.4M'),
(@pack_id, 24, 'SPI总线与I2C相比，主要优势是？', '速度更高，全双工', '只需两根线', '支持多主', '内置应答机制', 'A', NULL),
(@pack_id, 25, 'UART通信中，起始位和停止位的作用是？', '帧同步', '校验数据', '流控', '波特率调节', 'A', NULL),
(@pack_id, 26, 'RS-485相比于RS-232的优势是？', '差分信号，抗干扰强，传输距离远', '电压更高', '支持全双工', '连接器更小', 'A', NULL),
(@pack_id, 27, 'CAN总线中，隐性位和显性位的仲裁机制是？', '显性位覆盖隐性位，ID小的优先级高', '隐性位覆盖显性位', '根据节点地址仲裁', '随机仲裁', 'A', NULL),
(@pack_id, 28, '以下哪个协议常用于芯片间的低速管理通信（如传感器配置）？', 'I2C', 'PCIe', 'USB', 'SATA', 'A', NULL),
(@pack_id, 29, '某ARM处理器有两个SPI接口，想要同时读取两个外部ADC，应采用？', '分时复用', '使用不同片选（CS）', '无法同时', '使用DMA', 'B', NULL),
(@pack_id, 30, '以下哪个是标准USB接口的差分数据线？', 'D+和D-', 'TX+和TX-', 'A+和B-', 'P和N', 'A', NULL),
(@pack_id, 31, '以太网PHY与MAC之间的接口通常是？', 'MII/RMII/GMII', 'SPI', 'I2C', 'UART', 'A', NULL),
(@pack_id, 32, '在CAN总线中，一个帧的最大数据长度为？', '8字节', '64字节', '256字节', '无限制', 'A', '标准CAN'),
(@pack_id, 33, '配置GPIO为复用功能时，通常需要设置？', '复用功能寄存器（AFR）', '输出数据寄存器', '上拉电阻', '中断使能', 'A', NULL),
(@pack_id, 34, 'I2C总线需要上拉电阻的原因是？', '开漏输出实现线与', '提高驱动能力', '降低功耗', '抗干扰', 'A', NULL),
(@pack_id, 35, '在ARM Cortex-M中，中断优先级数值越小，优先级？', '越高', '越低', '相同', '取决于配置', 'A', NULL),
(@pack_id, 36, '中断延迟的主要来源不包括？', '硬件中断嵌套', '最长关中断时间', '中断向量表读取', '硬盘寻道', 'D', NULL),
(@pack_id, 37, '以下哪种低功耗模式唤醒时间最短？', '睡眠模式（Sleep）', '停止模式（Stop）', '待机模式（Standby）', '关机', 'A', NULL),
(@pack_id, 38, '外部中断触发方式通常包括？', '上升沿、下降沿、电平触发', '仅电平触发', '仅边沿触发', '仅软件触发', 'A', NULL),
(@pack_id, 39, '在中断服务程序中，为减少延迟，应？', '仅执行必要操作，快速退出', '执行复杂计算', '调用阻塞函数', '循环等待标志', 'A', NULL),
(@pack_id, 40, '实时时钟（RTC）即使在低功耗模式下也工作，通常由什么供电？', '主电源', '备用电池', 'USB', '太阳能', 'B', NULL),
(@pack_id, 41, '使用WFI（Wait For Interrupt）指令进入睡眠模式后，唤醒条件是？', '任一中断触发', '定时器溢出', '外部复位', '以上都是', 'D', NULL),
(@pack_id, 42, '动态电压频率调节（DVFS）主要用于？', '在性能和功耗之间平衡', '提高频率', '降低频率', '增加电压', 'A', NULL),
(@pack_id, 43, '在嵌入式开发中，JTAG接口的主要用途是？', '调试和编程', '高速数据传输', '电源供电', '音频输出', 'A', NULL),
(@pack_id, 44, '使用printf调试可能导致的问题是？', '影响实时性，改变时序', '内存泄漏', '编译错误', '硬件损坏', 'A', NULL),
(@pack_id, 45, '逻辑分析仪与示波器的主要区别是？', '逻辑分析仪多通道数字信号，示波器模拟/波形', '逻辑分析仪带宽更高', '示波器只能测电压', '无区别', 'A', NULL),
(@pack_id, 46, '单元测试中，打桩（stub）的作用是？', '模拟被调用函数或模块', '提高覆盖率', '测量执行时间', '检查内存泄漏', 'A', NULL),
(@pack_id, 47, '以下哪个工具可用于检测堆栈溢出？', '静态代码分析器', '使用RTOS的栈水位检测', '仿真器', '以上都是', 'D', NULL),
(@pack_id, 48, '嵌入式软件缺陷中，“竞态条件”通常发生在？', '多任务或中断共享数据未保护', '语法错误', '算法错误', '硬件损坏', 'A', NULL),
(@pack_id, 49, '使用硬件断点与软件断点的区别是？', '硬件断点数量有限，不影响代码存储', '软件断点需要修改代码', '硬件断点可在ROM中使用', '以上都是', 'D', NULL),
(@pack_id, 50, '在调试时，打印寄存器内容，最常用的方式是？', '使用调试器窗口查看', '通过UART打印', '通过LED闪烁表示', '通过JTAG读取', 'A', NULL);
COMMIT;

-- 专业8：工业物联网开发（电气工程×计算机科学） pack_key: major_electrical__major_cs:1
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_cs:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_cs:1', 8, '工业物联网开发', 'major_electrical', 'major_cs', '电气工程×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'MQTT协议基于什么传输层协议？', 'UDP', 'TCP', 'HTTP', 'ICMP', 'B', NULL),
(@pack_id, 2, 'MQTT协议中，发布/订阅模式的中间件称为？', 'Broker', 'Publisher', 'Subscriber', 'Client', 'A', NULL),
(@pack_id, 3, 'MQTT协议中，QoS=1级别的消息保证？', '最多一次', '至少一次', '恰好一次', '不保证', 'B', NULL),
(@pack_id, 4, '以下哪个MQTT报文用于客户端向Broker发起连接？', 'CONNECT', 'PUBLISH', 'SUBSCRIBE', 'PINGREQ', 'A', NULL),
(@pack_id, 5, 'CoAP协议基于什么传输层协议？', 'TCP', 'UDP', 'SCTP', 'DCCP', 'B', NULL),
(@pack_id, 6, 'CoAP协议的设计目标是？', '高吞吐量', '低开销，适用于受限网络', '实时视频传输', '文件传输', 'B', NULL),
(@pack_id, 7, 'MQTT中保留消息（Retained Message）的作用是？', '消息加密', '新订阅者立即收到最后一条保留消息', '消息分片', '删除消息', 'B', NULL),
(@pack_id, 8, 'CoAP协议中，消息类型包括CON、NON、ACK和？', 'RST', 'SYN', 'FIN', 'PSH', 'A', NULL),
(@pack_id, 9, '在MQTT中，通配符“+”表示？', '单层通配', '多层通配', '所有主题', '当前主题', 'A', NULL),
(@pack_id, 10, '对于需要确保消息不丢失且网络不稳定的工业环境，MQTT应选用？', 'QoS 0', 'QoS 1', 'QoS 2', '不使用QoS', 'C', NULL),
(@pack_id, 11, 'CoAP与HTTP的相似点不包括？', '都支持GET/PUT/POST等方法', '都基于文本', '都有请求/响应模型', '都支持URI', 'B', 'CoAP二进制，HTTP文本'),
(@pack_id, 12, 'MQTT中，Will Message（遗愿消息）在什么情况下发送？', '客户端正常断开', '客户端异常断连时由Broker发送', '客户端订阅主题时', '客户端发布消息时', 'B', NULL),
(@pack_id, 13, '边缘计算的主要优势是？', '集中处理所有数据', '降低延迟和网络带宽压力', '提高成本', '增加数据中心数量', 'B', NULL),
(@pack_id, 14, '以下哪个不属于边缘计算节点？', '工业网关', '边缘服务器', '云端大数据平台', '智能摄像头', 'C', NULL),
(@pack_id, 15, '在工业物联网中，边缘网关通常不具备的功能是？', '协议转换', '数据过滤与聚合', '长期海量数据存储', '向云端发送数据', 'C', NULL),
(@pack_id, 16, '边缘计算中“数据清洗”通常在哪个层级执行？', '传感器', '边缘节点', '云端', '用户手机', 'B', NULL),
(@pack_id, 17, '以下哪个场景最适合边缘计算？', '月度报表生成', '设备毫秒级故障预警', '备份所有历史数据', '公司官网托管', 'B', NULL),
(@pack_id, 18, '边缘节点与云端的通信通常使用？', '仅MQTT', '仅CoAP', 'MQTT、HTTP或AMQP等，视需求', '专用光纤', 'C', NULL),
(@pack_id, 19, '边缘计算中“模型在边缘推理”指的是？', '在云端训练模型，边缘执行推理', '在边缘训练模型', '不使用模型', '仅在云端推理', 'A', NULL),
(@pack_id, 20, '以下哪个不是边缘计算的核心挑战？', '设备异构性', '安全与隐私', '无限的计算资源', '网络连接不稳定性', 'C', NULL),
(@pack_id, 21, '工业边缘网关通常采用什么操作系统？', 'Windows Server', '嵌入式Linux或RTOS', 'macOS', 'Android', 'B', NULL),
(@pack_id, 22, '边缘节点与云端的同步策略中，断点续传主要用于？', '降低延迟', '网络不稳定时保证数据完整性', '加密数据', '负载均衡', 'B', NULL),
(@pack_id, 23, '工业上用于测量振动的常见传感器类型是？', '热电偶', '压电式加速度传感器', '霍尔传感器', '光敏电阻', 'B', NULL),
(@pack_id, 24, '4-20mA电流环信号相比于0-10V电压信号的优点是？', '抗干扰能力强，可远距离传输', '成本更低', '精度更高', '无需电源', 'A', NULL),
(@pack_id, 25, '某温度传感器输出为PT100，其阻值随温度升高而？', '增大', '减小', '不变', '无规律', 'A', NULL),
(@pack_id, 26, '数据采集中，抗混叠滤波器的作用是？', '滤除高频噪声防止采样后混叠', '放大信号', '隔离电源', '提高分辨率', 'A', NULL),
(@pack_id, 27, '某ADC为12位，参考电压3.3V，其最小分辨电压约为？', '0.8mV', '1.2mV', '3.3mV', '8mV', 'A', '3.3/4096≈0.805mV'),
(@pack_id, 28, '以下哪种传感器无需外部电源？', '压电传感器', '热电偶', '磁电式传感器', '以上都是', 'D', NULL),
(@pack_id, 29, '工业物联网中，采集三相电流信号，通常使用？', '电流互感器（CT）', '电压互感器', '霍尔电流传感器', 'A和C', 'D', NULL),
(@pack_id, 30, '数据采集系统中，过采样技术可以提高？', '采样率', '信噪比和有效位数', '输入阻抗', '输出功率', 'B', NULL),
(@pack_id, 31, '某设备需要采集高速旋转轴的振动，采样频率至少应为信号最高频率的？', '2倍', '2.56倍（工程常用）', '10倍', '1倍', 'B', NULL),
(@pack_id, 32, '以下哪个是数字传感器相比于模拟传感器的优势？', '可直接与微处理器接口，抗干扰强', '价格更低', '无需电源', '响应更快', 'A', NULL),
(@pack_id, 33, '工业网关中，OPC UA相对于经典OPC DA的优势是？', '跨平台、安全性、数据建模', '传输速度更快', '价格更低', '仅支持Windows', 'A', NULL),
(@pack_id, 34, '以下哪个协议通常用于工业网关与PLC通信？', 'HTTP', 'Modbus TCP/RTU', 'SMTP', 'FTP', 'B', NULL),
(@pack_id, 35, '网关配置中，数据映射（Data Mapping）的作用是？', '将不同协议的数据格式统一', '加密数据', '压缩数据', '路由数据', 'A', NULL),
(@pack_id, 36, '某网关需要将Modbus RTU数据转换为MQTT，应使用？', '协议转换中间件', '硬件跳线', '修改固件', '无需操作', 'A', NULL),
(@pack_id, 37, '工业网关的安全性配置通常包括？', '禁用不需要的服务', '修改默认密码', '配置防火墙规则', '以上都是', 'D', NULL),
(@pack_id, 38, '网关远程升级（OTA）失败后的回滚机制用于？', '提高升级速度', '防止因升级失败导致设备不可用', '节省流量', '降低功耗', 'B', NULL),
(@pack_id, 39, '以下哪个是工业网关常用的管理接口？', 'Web配置页面', 'SSH', '串口控制台', '以上都是', 'D', NULL),
(@pack_id, 40, '网关配置中，数据断网续传需要？', '本地缓存（如SD卡或Flash）', '双网卡', '不间断电源', '云服务器同步', 'A', NULL),
(@pack_id, 41, '某工业现场需要将多个Modbus从站数据汇聚，网关应工作于？', 'Modbus主站模式', 'Modbus从站模式', '透明传输模式', '监听模式', 'A', NULL),
(@pack_id, 42, '网关的看门狗功能用于？', '计时', '检测网关死机并自动复位', '加密通信', '数据备份', 'B', NULL),
(@pack_id, 43, '物联网设备中，TLS/DTLS协议用于？', '数据加密和身份认证', '压缩数据', '路由选择', '负载均衡', 'A', NULL),
(@pack_id, 44, 'X.509数字证书在物联网中主要用于？', '设备身份认证', '数据压缩', '固件升级', '设备发现', 'A', NULL),
(@pack_id, 45, '以下哪项是防止设备伪造接入网络的有效方法？', 'MAC地址过滤', '基于证书的认证', '预共享密钥', '以上都是', 'D', NULL),
(@pack_id, 46, '设备唯一密钥（如TPM或安全芯片）的作用是？', '提高计算速度', '安全存储私钥，防止提取', '增加存储空间', '降低功耗', 'B', NULL),
(@pack_id, 47, '工业物联网中，为保护数据完整性，常使用？', '哈希算法（如SHA-256）', 'BASE64编码', '异或加密', 'CRC校验（完整性弱，不是安全级）', 'A', NULL),
(@pack_id, 48, '以下哪项不是常见的物联网攻击方式？', '拒绝服务攻击', '固件篡改', '物理拆解读取Flash', '增加电池容量', 'D', NULL),
(@pack_id, 49, '设备固件签名的主要目的是？', '验证固件来源可信且未被篡改', '压缩固件', '加密固件', '提高运行速度', 'A', NULL),
(@pack_id, 50, '工业物联网安全中，“零信任模型”的核心思想是？', '信任所有内部网络设备', '默认不信任任何设备，持续验证', '只信任经过认证的硬件', '只使用物理隔离', 'B', NULL);
COMMIT;

-- 专业9：电力自动化工程师（电气工程×计算机科学） pack_key: major_electrical__major_cs:2
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_cs:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_cs:2', 9, '电力自动化工程师', 'major_electrical', 'major_cs', '电气工程×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'IEC 61850标准主要应用于哪个领域？', '家用电器通信', '变电站自动化系统', '工业机器人控制', '楼宇自控', 'B', NULL),
(@pack_id, 2, 'IEC 61850标准中，GOOSE报文主要用于传输？', '采样值', '跳闸和开关量信号', '配置文件', '时间同步', 'B', NULL),
(@pack_id, 3, 'IEC 61850中，SV（Sampled Value）报文用于传输？', '保护跳闸信号', '电流/电压采样值', '设备状态', '配置文件', 'B', NULL),
(@pack_id, 4, '以下哪个是IEC 61850定义的逻辑节点，用于断路器？', 'XCBR', 'TCTR', 'MMXU', 'LPHD', 'A', NULL),
(@pack_id, 5, 'IEC 61850中，SCL文件的作用是？', '存储采样值', '描述变电站配置', '记录事件日志', '加密通信', 'B', NULL),
(@pack_id, 6, 'GOOSE报文采用什么传输机制？', 'TCP重传', '发布/订阅，直接组播', '请求/响应', '轮询', 'B', NULL),
(@pack_id, 7, 'IEC 61850中，数据集（DataSet）用于？', '定义数据库', '将多个数据对象组合便于传输', '加密配置', '存储历史数据', 'B', NULL),
(@pack_id, 8, '以下哪个不是IEC 61850-9-2定义的采样值传输方式？', '点对点', '过程总线', '串行RS485', '以太网', 'C', NULL),
(@pack_id, 9, 'IEC 61850标准中，MMS协议主要映射用于？', 'GOOSE', 'SV', '客户端/服务器通信（如遥控、定值）', '时间同步', 'C', NULL),
(@pack_id, 10, '智能电子设备（IED）在IEC 61850中的自描述特性指？', '设备可自我供电', '设备提供其数据模型和配置', '设备可自我修复', '设备无需配置', 'B', NULL),
(@pack_id, 11, '以下哪个是用于时间同步的IEC 61850标准部分？', 'IEC 61850-8-1', 'IEC 61850-9-2', 'IEC 61850-5', 'IEC 61850-9-3（或IEEE 1588）', 'D', NULL),
(@pack_id, 12, '合并单元（MU）在IEC 61850中的作用是？', '合并多路CT/VT采样值并发送给保护装置', '执行跳闸命令', '显示电压电流', '存储历史数据', 'A', NULL),
(@pack_id, 13, '变电站自动化系统中，“间隔层”主要包含？', '保护测控装置', '后台监控主机', '智能一次设备', '远动工作站', 'A', NULL),
(@pack_id, 14, '以下哪个属于变电站“过程层”设备？', '合并单元', '智能终端', '电子式互感器', '以上都是', 'D', NULL),
(@pack_id, 15, '远动工作站（RTU）在变电站的主要功能是？', '与调度中心通信', '执行保护跳闸', '采集模拟量', '故障录波', 'A', NULL),
(@pack_id, 16, 'IEC 60870-5-104协议常用于？', '变电站内过程总线', '变电站与调度中心通信', '智能电表通信', '保护装置内部通信', 'B', NULL),
(@pack_id, 17, '智能变电站中，GOOSE网络通常与SV网络？', '共用同一物理网络', '必须分开（或VLAN隔离）', '用光纤隔离', '无要求', 'B', '建议分开或VLAN隔离，避免相互影响'),
(@pack_id, 18, '以下哪个是变电站自动化系统的“站控层”设备？', '保护装置', '监控后台', '合并单元', '智能终端', 'B', NULL),
(@pack_id, 19, '变电站自动化系统中，防误操作闭锁通常由哪一层实现？', '过程层', '间隔层', '站控层', '调度层', 'B', NULL),
(@pack_id, 20, '某变电站采用“直采直跳”模式，指？', '保护装置直接采集合并单元数据，直接跳断路器智能终端', '通过交换机转发', '经过后台转发', '手动操作', 'A', NULL),
(@pack_id, 21, '变电站自动化系统的“双网冗余”一般指？', '两个独立的以太网，A/B网', '同一网线双绞', '无线备用', '串口备用', 'A', NULL),
(@pack_id, 22, '以下哪个是智能变电站特有的设备？', '电磁式电流互感器', '智能终端', '继电器', '隔离开关', 'B', NULL),
(@pack_id, 23, '在PLC编程中，梯形图常开触点与线圈的逻辑关系是？', '触点闭合 → 线圈得电', '触点断开 → 线圈得电', '触点与线圈串联', '线圈控制触点', 'A', NULL),
(@pack_id, 24, '以下哪个是PLC编程语言中的“结构化文本”的缩写？', 'LD', 'FBD', 'ST', 'IL', 'C', NULL),
(@pack_id, 25, '西门子PLC中，组织块OB1的作用是？', '主循环组织块', '硬件中断', '时间中断', '启动组织块', 'A', NULL),
(@pack_id, 26, '在PLC中，M（内部继电器）与Q（物理输出）的区别是？', 'M用于中间逻辑，Q用于驱动实际负载', 'M用于模拟量，Q用于开关量', 'M只能读，Q只能写', '无区别', 'A', NULL),
(@pack_id, 27, '以下哪个指令用于PLC上升沿检测？', 'FP（或P_TRIG）', 'FN', 'SET', 'RESET', 'A', NULL),
(@pack_id, 28, '某PLC程序需要实现电机启动后延时10秒停止，应使用？', '接通延时定时器（TON）', '断电延时定时器（TOF）', '计数器', '算术指令', 'A', NULL),
(@pack_id, 29, 'PLC扫描周期的顺序通常为？', '输入采样→程序执行→输出刷新', '程序执行→输入采样→输出刷新', '输出刷新→程序执行→输入采样', '输入采样→输出刷新→程序执行', 'A', NULL),
(@pack_id, 30, '在PLC程序中，如果使用M0.0的常闭触点串联在输出线圈前，当M0.0为1时，输出线圈？', '得电', '不得电', '保持', '闪烁', 'B', NULL),
(@pack_id, 31, '以下哪个不是PLC标准编程语言（IEC 61131-3）？', '梯形图（LD）', 'C语言', '顺序功能图（SFC）', '功能块图（FBD）', 'B', NULL),
(@pack_id, 32, '在PLC中，看门狗定时器超时通常导致？', 'CPU进入停止状态或复位', '报警但继续运行', '关闭所有输出', '切换至备用CPU', 'A', NULL),
(@pack_id, 33, 'SCADA系统的中文全称是？', '数据采集与监视控制系统', '分布式控制系统', '可编程逻辑控制器', '制造执行系统', 'A', NULL),
(@pack_id, 34, 'SCADA系统中的RTU通常安装在？', '控制中心', '现场设备附近', '云服务器', '调度员桌面', 'B', NULL),
(@pack_id, 35, '以下哪个不是SCADA系统的主要功能？', '实时数据采集', '历史数据存储', '报警与事件管理', '自动生成财务报表（非核心，可能外挂）', 'D', NULL),
(@pack_id, 36, 'SCADA系统与PLC通信，最常用的协议是？', 'Modbus', 'OPC', 'Profibus', '以上都是', 'D', NULL),
(@pack_id, 37, 'SCADA系统的“遥调”功能指？', '远程调节设定值（如电压）', '远程测量', '远程信号', '远程控制', 'A', NULL),
(@pack_id, 38, '以下哪个是SCADA系统冗余配置的常见方式？', '双服务器热备', '双网冗余', '双电源', '以上都是', 'D', NULL),
(@pack_id, 39, 'SCADA系统中的“历史数据库”通常使用？', '关系数据库（如SQL Server）或时序数据库', '文本文件', 'Excel', '内存数据库', 'A', NULL),
(@pack_id, 40, 'SCADA系统报警优先级通常分为？', '高、中、低（或急停、警告、提示）', '仅一种', '按时间排序', '随机', 'A', NULL),
(@pack_id, 41, '电力系统继电保护的基本要求是？', '选择性、速动性、灵敏性、可靠性', '经济性、美观性', '冗余性、可扩展性', '易维护性', 'A', NULL),
(@pack_id, 42, '以下哪个是线路纵联保护的主要优点？', '瞬时切除全线故障', '成本最低', '简单可靠', '适应任何电压等级', 'A', NULL),
(@pack_id, 43, '变压器的差动保护主要用来保护？', '变压器内部匝间短路', '过负荷', '过电压', '外部短路', 'A', NULL),
(@pack_id, 44, '重合闸装置在什么情况下不应动作？', '瞬时性故障', '永久性故障', '手动跳闸', '以上都是', 'C', '手动或遥控分闸不应重合'),
(@pack_id, 45, '测控装置中的“遥控”通常采用什么输出方式？', '继电器触点', '4-20mA', '以太网报文', '指示灯', 'A', NULL),
(@pack_id, 46, '故障录波器的作用是？', '记录故障前后电压电流波形', '跳闸出口', '报警', '自动恢复', 'A', NULL),
(@pack_id, 47, '以下哪个是保护装置“软压板”的作用？', '投入或退出保护功能（软件控制）', '物理断开回路', '调节参数', '复位装置', 'A', NULL),
(@pack_id, 48, '某线路保护定值中，过流I段保护通常用于？', '作为主保护，瞬时动作', '后备保护，延时动作', '过负荷保护', '零序保护', 'A', NULL),
(@pack_id, 49, '下列哪个是PT断线的特征？', '电压降低，但电流正常', '电流增大', '频率变化', '功率因数升高', 'A', NULL),
(@pack_id, 50, '电力自动化工程师调试保护装置时，加电流模拟故障，保护应？', '按定值正确动作', '不动作', '报警', '闭锁', 'A', NULL);
COMMIT;

-- 专业10：电力市场交易员（电气工程×金融学） pack_key: major_electrical__major_finance:0
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_finance:0', 10, '电力市场交易员', 'major_electrical', 'major_finance', '电气工程×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '我国电力市场化改革中，“管住中间、放开两头”的“中间”指的是？', '发电侧', '输配电环节', '售电侧', '用户侧', 'B', NULL),
(@pack_id, 2, '以下哪个不属于电力市场的组成部分？', '电能量市场', '辅助服务市场', '容量市场', '燃油期货市场', 'D', NULL),
(@pack_id, 3, '我国目前电力市场的主要模式是？', '单一买方模式', '双边交易模式', '批发竞争模式（中长期+现货）', '零售竞争模式', 'C', NULL),
(@pack_id, 4, '省间电力交易与省内电力市场的关系是？', '省间优先，省内次之', '省内优先，省间作为补充', '互不相关', '省间完全取代省内', 'B', NULL),
(@pack_id, 5, '电力市场中，“日前市场”的交易时间通常为？', '运行日前一天', '运行前一周', '运行前一个月', '运行前一年', 'A', NULL),
(@pack_id, 6, '以下哪个是电力市场中的“辅助服务”？', '调频', '备用', '无功电压支撑', '以上都是', 'D', NULL),
(@pack_id, 7, '我国的电力现货市场试点省份不包括以下哪个？', '广东', '山西', '山东', '西藏', 'D', NULL),
(@pack_id, 8, '电力市场中，“阻塞管理”的主要目的是？', '消除输电阻塞并合理分配收益', '增加发电量', '降低电价', '减少输电损耗', 'A', NULL),
(@pack_id, 9, '以下哪个机构负责电力市场交易的运营？', '国家能源局', '电力交易中心', '电网公司调度中心', '发电企业协会', 'B', NULL),
(@pack_id, 10, '电力中长期交易合同与现货市场的关系是？', '中长期合同作为物理执行，现货进行偏差调整', '中长期合同完全取代现货', '现货仅用于辅助服务', '两者无关', 'A', NULL),
(@pack_id, 11, '日前市场中，发电企业申报的电价曲线通常为？', '递增的阶梯曲线', '递减的阶梯曲线', '固定价格', '随机价格', 'A', '出力越大，边际成本越高，报价递增'),
(@pack_id, 12, '实时市场与日前市场的电价差异主要反映？', '实时供需变化和预测误差', '长期成本', '政府定价', '燃料价格', 'A', NULL),
(@pack_id, 13, '某发电企业在日前市场中标100MWh，实时市场实际发电90MWh，若实时电价高于日前电价，该企业盈亏情况是？', '盈利', '亏损（需购买10MWh补足，高价买）', '不受影响', '只损失容量费', 'B', NULL),
(@pack_id, 14, '电力中长期交易中，“差价合约”（CfD）的结算方式是？', '按合约价与参考价的差额现金结算', '物理交割', '不结算', '仅结算电量', 'A', NULL),
(@pack_id, 15, '以下哪个不是中长期电力交易的品种？', '年度双边协商交易', '月度集中竞价交易', '日滚动交易', '5分钟实时平衡交易', 'D', '实时平衡属于现货'),
(@pack_id, 16, '某燃煤电厂签订年度中长期合约1000小时，约定电价0.4元/度，实际现货均价0.35元/度，则通过CfD电厂每度电获得？', '0.4元', '0.35元', '0.05元差额收入', '0.05元差额支出', 'C', '0.4-0.35=0.05收入'),
(@pack_id, 17, '现货市场中的“节点边际电价”（LMP）包含哪三个分量？', '能量价、容量价、辅助服务价', '能量分量、阻塞分量、网损分量', '固定价、浮动价、惩罚价', '峰时价、谷时价、平时价', 'B', NULL),
(@pack_id, 18, '某节点LMP为300元/MWh，参考节点LMP为280元/MWh，阻塞分量为？', '20元/MWh', '-20元/MWh', '300元/MWh', '280元/MWh', 'A', NULL),
(@pack_id, 19, '我国电力现货市场中，发电侧报量报价，用户侧通常？', '不报量不报价（被动接受价格）', '报量报价', '只报量不报价', '只报价不报量', 'C', '多数省份用户侧报量不报价'),
(@pack_id, 20, '“安全约束机组组合”（SCUC）是日前市场出清的核心算法，其作用是？', '确定机组开停计划', '确定电价', '确定输电阻塞', '确定电网频率', 'A', NULL),
(@pack_id, 21, '现货市场出清采用的原则是？', '按报价高低排序，低价优先', '按机组大小排序', '按地理位置排序', '随机排序', 'A', NULL),
(@pack_id, 22, '实时市场每15分钟出清一次，其电价信号主要反映？', '下一个15分钟的边际成本', '未来一年的平均成本', '政府指导价', '历史平均价', 'A', NULL),
(@pack_id, 23, '节点边际电价（LMP）在无约束无损耗情况下等于？', '系统的边际电价', '零', '阻塞价格', '网损价格', 'A', NULL),
(@pack_id, 24, '某省份目前燃煤基准电价为0.4元/度，现货市场均价0.35元/度，燃煤发电企业若全部在现货市场出售，则相比基准价？', '收入增加', '收入减少', '不变', '取决于补偿政策', 'B', '若无补偿，收入下降'),
(@pack_id, 25, '政府为保证居民农业电价稳定，通常通过什么方式补贴？', '交叉补贴', '直接财政拨款', '增值税减免', '以上都是', 'A', NULL),
(@pack_id, 26, '某风电场现货申报价格为0元/度，这意味着？', '愿意在任何正电价下发电', '必须花钱发电', '机组故障', '接受负电价', 'A', '边际成本为零，报价为零'),
(@pack_id, 27, '当可再生能源发电量大增，现货市场可能出现负电价，原因是？', '机组最低技术出力导致无法停机', '补贴政策', '政府定价', '用户需求过高', 'A', NULL),
(@pack_id, 28, '容量电价的主要作用是？', '补偿发电机组固定成本，保证充裕性', '补偿燃料成本', '补偿环保成本', '补偿用户电费', 'A', NULL),
(@pack_id, 29, '我国首批电力现货市场试点中，哪个省份采用“发电侧单边竞价”模式？', '广东（初期单边）', '山东（双边的？实际各有不同）', '浙江', '四川', 'A', NULL),
(@pack_id, 30, '以下哪个因素最直接影响现货电价？', '当天天气（影响新能源出力及负荷）', '上一年度GDP', '央行利率', '国际油价长期趋势', 'A', NULL),
(@pack_id, 31, '燃气发电的现货报价通常高于燃煤，因为？', '燃料成本高', '装机容量小', '环保要求高', '政府要求', 'A', NULL),
(@pack_id, 32, '在LMP机制下，同一时刻不同节点的电价可能不同，原因是？', '输电阻塞和网损', '不同发电厂报价不同', '用户需求不同', '电压等级不同', 'A', NULL),
(@pack_id, 33, '发电企业为锁定未来一年的售电价格，最常用的工具是？', '签订中长期双边合约', '购买看跌期权', '参与现货市场', '投资储能', 'A', NULL),
(@pack_id, 34, '某售电公司向用户承诺固定电价，为对冲现货价格上涨风险，应？', '购买看涨期权或签订中长期合约', '什么都不做', '卖出期货', '投资风电', 'A', NULL),
(@pack_id, 35, '电力金融合约中的“基差风险”是指？', '合约价与现货价的差额波动风险', '发电量不确定', '设备故障', '电价波动', 'A', NULL),
(@pack_id, 36, '以下哪个是电力市场中最常用的金融套期保值工具？', '电力期货', '天气衍生品', '碳期货', '外汇期货', 'A', '北欧、美国等有电力期货，中国尚未推出'),
(@pack_id, 37, '虚拟交易（Virtual Bidding）在电力市场中的作用是？', '为金融参与者提供流动性并收敛日前/实时价差', '增加物理发电', '减少交易成本', '规避监管', 'A', NULL),
(@pack_id, 38, '售电公司对用户侧进行“负荷聚合”可以降低？', '预测偏差惩罚成本', '购电成本', '输配电价', '政府基金', 'A', NULL),
(@pack_id, 39, '发电企业在日前市场报价时，如果预测次日新能源大发导致电价低，最合理的策略是？', '降低报价，争取中标或停机', '提高报价', '不参与', '报高价', 'A', NULL),
(@pack_id, 40, '容量市场或容量补偿机制对发电企业的风险对冲意义在于？', '提供固定收入，降低现货市场风险', '增加利润', '提高电价', '减少碳排放', 'A', NULL),
(@pack_id, 41, '在Python中，使用pandas读取CSV文件，正确的语句是？', 'pd.read_csv("data.csv")', 'pandas.read.csv("data.csv")', 'pd.csv_read("data.csv")', 'read_csv("data.csv")', 'A', NULL),
(@pack_id, 42, '某电力市场数据DataFrame包含列“price”和“time”，要按时间排序，应使用？', 'df.sort_values("time")', 'df.order_by("time")', 'df.sort("time")', 'df.arrange("time")', 'A', NULL),
(@pack_id, 43, '计算某列“price”的均值，正确代码是？', 'df["price"].mean()', 'df["price"].avg()', 'mean(df["price"])', 'df["price"].sum()/len', 'A', NULL),
(@pack_id, 44, '使用matplotlib绘制电价曲线，函数是？', 'plt.plot(x, y)', 'plt.scatter(x, y)', 'plt.bar(x, y)', 'plt.hist(y)', 'A', NULL),
(@pack_id, 45, '某交易员需要分析电价与负荷的相关性，应使用？', 'df["price"].corr(df["load"])', 'np.corrcoef(price, load)', '计算皮尔逊相关系数', '以上都可以', 'D', NULL),
(@pack_id, 46, '将日期时间列设为索引，便于时间序列分析，应使用？', 'df.set_index("datetime", inplace=True)', 'df.index = "datetime"', 'df.datetime_index()', 'df.reset_index()', 'A', NULL),
(@pack_id, 47, '对15分钟间隔的电价数据重采样为小时均值，应使用？', 'df.resample("1H").mean()', 'df.groupby("1H").mean()', 'df.rolling("1H").mean()', 'df.asfreq("1H")', 'A', NULL),
(@pack_id, 48, '使用numpy计算数组的标准差，函数是？', 'np.std(arr)', 'arr.std()', 'np.stdev(arr)', 'A和B', 'D', NULL),
(@pack_id, 49, '在Jupyter Notebook中查看数据前5行，应使用？', 'df.head()', 'df.tail()', 'df.sample()', 'df.info()', 'A', NULL),
(@pack_id, 50, '电力市场交易员用Python自动化生成每日报价，通常需要？', '编写脚本调用市场API', '手动输入Excel', '使用Windows记事本', '打印后传真', 'A', NULL);
COMMIT;


-- ======================================================
-- 专业11：能源金融分析师（电气工程×金融学）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_finance:1', 11, '能源金融分析师', 'major_electrical', 'major_finance', '电气工程×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '欧盟碳市场（EU ETS）目前主要采用什么机制分配免费配额？', '历史法（grandfathering）', '基准法（benchmarking）', '拍卖全部', '随机分配', 'B', NULL),
(@pack_id, 2, '中国全国碳市场第一个履约周期覆盖的行业是？', '电力', '钢铁', '水泥', '航空', 'A', NULL),
(@pack_id, 3, '碳配额（EUA）现货交易主要在哪里进行？', '上海环境能源交易所', 'ICE或EEX', '纽约商品交易所', '伦敦金属交易所', 'B', '欧洲碳交易主要在ICE和EEX'),
(@pack_id, 4, '以下哪个不是碳市场的核心要素？', '总量控制', '配额分配', '企业员工数', '监测报告核查（MRV）', 'C', NULL),
(@pack_id, 5, '碳抵消机制（如CCER）中，额外性是指？', '减排活动在没有碳收益时不会发生', '额外的补贴', '额外的排放', '额外的配额', 'A', NULL),
(@pack_id, 6, '全国碳市场配额清缴截止日期通常是？', '每年3月31日', '每年6月30日', '每年12月31日', '次年6月30日', 'C', '履约周期末'),
(@pack_id, 7, '碳期货合约到期时，通常采用什么交割方式？', '实物交割（配额）', '现金交割', '可选择', '不交割', 'A', 'EUA期货为实物交割'),
(@pack_id, 8, '下列哪项会导致碳配额价格上升？', '免费配额过多', '更严格的总量目标', '经济衰退', '可再生能源补贴取消', 'B', NULL),
(@pack_id, 9, '全国碳市场目前允许的投资主体包括？', '仅控排企业', '控排企业及合格机构投资者', '个人', '境外投资者', 'B', NULL),
(@pack_id, 10, '碳边境调节机制（CBAM）主要目的是？', '防止碳泄漏', '增加关税收入', '促进出口', '降低碳排放', 'A', NULL),
(@pack_id, 11, '下列哪项属于能源衍生品？', '原油期货', '天然气掉期', '电力期权', '以上都是', 'D', NULL),
(@pack_id, 12, '布伦特原油期货主要在哪个交易所交易？', 'NYMEX', 'ICE', 'SHFE', 'LME', 'B', NULL),
(@pack_id, 13, '亨利港（Henry Hub）天然气期货的交割地点是？', '路易斯安那州', '得克萨斯州', '纽约', '加利福尼亚', 'A', NULL),
(@pack_id, 14, '看涨期权赋予买方什么权利？', '以行权价买入标的', '以行权价卖出标的', '必须买入标的', '必须卖出标的', 'A', NULL),
(@pack_id, 15, '某能源公司担心油价上涨，应买入什么？', '看涨期权', '看跌期权', '卖出期货', '卖出看涨期权', 'A', NULL),
(@pack_id, 16, '能源衍生品中的“掉期”通常指？', '固定价格与浮动价格的交换', '期货合约', '期权合约', '远期合约', 'A', NULL),
(@pack_id, 17, '某航空公司欲锁定未来一年的航空燃油价格，最适合的工具是？', '燃油掉期或期货', '股票', '债券', '外汇远期', 'A', NULL),
(@pack_id, 18, '能源期权合约中，Delta表示？', '期权价格对标的物价格的敏感度', '波动率敏感度', '时间衰减', '利率敏感度', 'A', NULL),
(@pack_id, 19, '以下哪个是电力期权常见的行权方式？', '欧式（到期日行权）', '美式（到期前任意时间）', '亚式（基于平均价）', '以上都有', 'D', NULL),
(@pack_id, 20, '天然气储气库的“储气价差”套利是利用？', '夏季低价注气，冬季高价采气', '跨区域价差', '期货升贴水', '汇率波动', 'A', NULL),
(@pack_id, 21, '能源衍生品交易中，保证金的主要作用是？', '防范信用风险', '增加杠杆', '支付手续费', '缴纳税款', 'A', NULL),
(@pack_id, 22, '某炼厂通过买入原油期货同时卖出汽油期货，属于？', '裂解价差套利', '跨期套利', '跨市套利', '期权套利', 'A', NULL),
(@pack_id, 23, '某光伏电站初始投资1亿元，年净现金流1200万元，永续经营，折现率8%，NPV为？', '0.5亿元', '1.5亿元', '0.2亿元', '0.8亿元', 'A', '1200/0.08=1.5亿，减1亿=0.5亿'),
(@pack_id, 24, '项目内部收益率（IRR）是指使NPV等于零的？', '折现率', '投资回收期', '利润率', '贷款利率', 'A', NULL),
(@pack_id, 25, '某风电项目IRR为12%，WACC为8%，则？', '项目可行', '项目不可行', '无法判断', '需要降低IRR', 'A', NULL),
(@pack_id, 26, '在敏感性分析中，对NPV影响最大的变量通常是？', '上网电价', '初始投资', '运维成本', '折旧年限', 'A', NULL),
(@pack_id, 27, '某储能项目，若峰谷价差为0.8元/kWh，循环效率90%，每度电套利收益为？', '0.72元', '0.8元', '0.88元', '0.64元', 'A', NULL),
(@pack_id, 28, '实物期权方法在能源项目估值中主要用于？', '考虑管理灵活性（如延迟、扩张）', '替代DCF', '计算折旧', '评估环境成本', 'A', NULL),
(@pack_id, 29, '某天然气电站的估值中，燃料成本与电价之差称为？', '火花价差（Spark Spread）', '暗黑价差', '转换价差', '基差', 'A', NULL),
(@pack_id, 30, '某燃煤电厂的估值中，“暗黑价差”（Dark Spread）指的是？', '电价减去煤价乘以热耗率', '电价减去碳成本', '煤价减去运费', '电价减去输配电价', 'A', NULL),
(@pack_id, 31, '在项目估值中，永续增长模型假设增长率为g，则终值公式为？', 'CF×(1+g)/(r-g)', 'CF/(r+g)', 'CF/r', 'CF×(1-g)/r', 'A', NULL),
(@pack_id, 32, '某水电项目，来水不确定性较高，估值时最适宜采用？', '蒙特卡洛模拟', '单点估算', '成本法', '市场法', 'A', NULL),
(@pack_id, 33, '项目债务融资的税盾效应是指？', '利息可税前扣除', '本金可税前扣除', '股息可税前扣除', '折旧税前扣除', 'A', NULL),
(@pack_id, 34, '某能源项目在基准情景下NPV为负，但考虑碳收益后变正，说明该项目？', '具有碳资产价值', '技术落后', '成本过高', '缺乏竞争力', 'A', NULL),
(@pack_id, 35, '可再生能源配额制（RPS）要求？', '电力供应商必须购买一定比例绿电', '政府直接补贴', '电价固定', '限制火电', 'A', NULL),
(@pack_id, 36, '绿证（REC）与碳配额的主要区别是？', '绿证代表可再生能源的环境属性，碳配额代表碳排放权', '两者等价', '绿证用于交通', '碳配额用于电力', 'A', NULL),
(@pack_id, 37, '美国通胀削减法案（IRA）对清洁能源的主要激励是？', '税收抵免（ITC/PTC）', '直接拨款', '贷款担保', '出口补贴', 'A', NULL),
(@pack_id, 38, '欧盟的“Fit for 55”一揽子计划目标是将2030年减排目标提高至？', '40%', '45%', '55%', '65%', 'C', NULL),
(@pack_id, 39, '中国“十四五”规划中，非化石能源消费占比目标到2025年为？', '15%', '20%', '25%', '30%', 'B', NULL),
(@pack_id, 40, '碳价下限机制（如英国）的作用是？', '确保碳价不会过低，提供投资确定性', '降低碳价', '增加配额供给', '减少企业负担', 'A', NULL),
(@pack_id, 41, '能源金融分析师在评估煤电项目时，需重点考虑？', '碳成本及资产搁浅风险', '煤炭价格', '设备寿命', '以上都是', 'D', NULL),
(@pack_id, 42, '欧盟CBAM证书价格与什么挂钩？', 'EUA碳配额价格', '进口商品价格', '国际油价', '汇率', 'A', NULL),
(@pack_id, 43, '在时间序列分析中，ARIMA模型中的“I”代表？', '积分（差分）', '自回归', '移动平均', '季节性', 'A', NULL),
(@pack_id, 44, '电价预测中，常用GARCH模型来预测？', '波动率', '平均值', '尖峰概率', '长期趋势', 'A', NULL),
(@pack_id, 45, '以下哪个是用于风险度量的指标？', 'VaR（风险价值）', 'NPV', 'IRR', 'ROE', 'A', NULL),
(@pack_id, 46, '某交易组合的日VaR(95%)为100万元，意味着？', '有95%的把握日损失不超过100万', '有5%的把握日损失不超过100万', '损失正好100万', '最大损失100万', 'A', NULL),
(@pack_id, 47, '蒙特卡洛模拟在能源金融中主要用于？', '评估不确定因素下的项目收益分布', '精确计算NPV', '替代现金流折现', '计算税收', 'A', NULL),
(@pack_id, 48, '均值-方差投资组合理论中，有效前沿表示？', '给定风险下的最大收益', '最小风险', '最大收益', '无风险资产', 'A', NULL),
(@pack_id, 49, '某对冲基金使用均值回归策略交易碳配额，认为价格偏离长期均值时会？', '反向交易', '追涨杀跌', '不做交易', '套期保值', 'A', NULL),
(@pack_id, 50, '在量化模型中，过拟合指的是？', '模型过度适应历史数据，预测能力差', '模型复杂度不够', '模型训练不足', '数据量太少', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业12：碳交易产品经理（电气工程×金融学）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_finance:2', 12, '碳交易产品经理', 'major_electrical', 'major_finance', '电气工程×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '全国碳市场目前覆盖的温室气体种类是？', 'CO₂、CH₄、N₂O', '仅CO₂', '全部6种', 'CO₂和SF₆', 'B', '初期仅CO₂'),
(@pack_id, 2, '全国碳市场配额分配采用什么方法？', '全部免费分配', '全部拍卖', '免费+拍卖结合', '历史法', 'A', '目前全部免费，未来引入拍卖'),
(@pack_id, 3, '碳排放配额分配中，“基准线法”适用于什么行业？', '电力', '水泥', '电解铝', '以上都是', 'D', NULL),
(@pack_id, 4, '以下哪个是国家碳市场交易产品的标准单位？', '吨CO₂当量', '千克CO₂', '吨碳', '兆瓦时', 'A', NULL),
(@pack_id, 5, 'CCER项目开发中，备案的“方法学”由谁发布？', '生态环境部', '发改委', '交易所', '第三方机构', 'A', NULL),
(@pack_id, 6, '全国碳市场交易平台目前包括？', '上海环境能源交易所（全国）', '北京绿色交易所', '广州碳排放权交易所', '以上都是', 'A', '全国注册登记在武汉，交易在上海'),
(@pack_id, 7, '重点排放单位未按时足额清缴配额的，罚款金额为？', '2-3万元', '5-10万元', '按市场均价5-10倍', '100万元以上', 'C', NULL),
(@pack_id, 8, '碳市场中的“履约周期”通常为？', '1年', '2年', '3年', '5年', 'A', NULL),
(@pack_id, 9, '以下哪个是国际碳市场认可的减排标准？', 'VCS（Verified Carbon Standard）', 'GS（Gold Standard）', 'CDM', '以上都是', 'D', NULL),
(@pack_id, 10, '欧盟碳市场第四阶段（2021-2030）每年减排线性因子为？', '1.74%', '2.2%', '4.2%', '0.5%', 'B', NULL),
(@pack_id, 11, '碳泄露是指？', '企业将生产转移到碳成本低的地区', '碳配额丢失', '碳排放统计错误', '碳捕集泄漏', 'A', NULL),
(@pack_id, 12, '全国碳市场扩容，下一个纳入的行业最有可能是？', '水泥、电解铝', '航空', '造纸', '化工', 'A', NULL),
(@pack_id, 13, '碳市场中的“抵销比例”限制是指？', '可用CCER抵销的比例上限（如5%）', '配额总量比例', '免费配额比例', '拍卖比例', 'A', NULL),
(@pack_id, 14, '中国核证自愿减排量（CCER）自2017年起暂停签发，预计重启时间？', '2023年底', '2024年', '2025年', '已永久停止', 'B', '2024年初已发布管理办法，逐步重启'),
(@pack_id, 15, '碳交易产品经理设计一个“碳配额远期合约”，其标的为？', '未来某个时间点的碳配额', '现货配额', 'CCER', '碳期货', 'A', NULL),
(@pack_id, 16, '为控排企业设计的碳资产管理平台，最核心的功能模块是？', '排放数据MRV及履约提醒', '碳价游戏', '社交聊天', '新闻资讯', 'A', NULL),
(@pack_id, 17, '设计碳金融产品时，“标准化”包括？', '合约单位、交割方式、最小变动价位', '产品颜色', '营销话术', '用户界面', 'A', NULL),
(@pack_id, 18, '以下哪个是碳期货合约的最小变动价位通常设定为？', '0.01元/吨', '0.1元/吨', '1元/吨', '10元/吨', 'A', NULL),
(@pack_id, 19, '产品经理设计碳配额大宗交易模块，需要支持的功能是？', '双边协商、意向申报、协议转让', '连续竞价', '集合竞价', '做市商报价', 'A', NULL),
(@pack_id, 20, '用户需求调研发现，控排企业最需要的功能是？', '配额预测和缺口分析', '碳价走势图', '碳资讯', '论坛讨论', 'A', NULL),
(@pack_id, 21, '碳交易平台的产品设计中，如何保证交易数据安全？', '加密传输、权限控制、审计日志', '公开所有数据', '不使用密码', '仅依赖防火墙', 'A', NULL),
(@pack_id, 22, '设计移动端碳交易APP，最应优先考虑？', '行情查看和交易提醒', '全功能交易下单', '碳社区', '碳足迹计算器', 'A', NULL),
(@pack_id, 23, '“碳指数”产品的作用是？', '跟踪碳市场整体表现，可用于发行ETF', '替代碳价', '预测天气', '计算碳税', 'A', NULL),
(@pack_id, 24, '设计碳配额质押融资产品，需重点关注的参数是？', '质押率、警戒线、平仓线', '利率', '期限', '以上都是', 'D', NULL),
(@pack_id, 25, '碳保险产品（如碳价下跌保险）的触发条件是？', '碳价跌破约定水平', '企业排放超标', '碳交易系统故障', '天气异常', 'A', NULL),
(@pack_id, 26, '产品经理在定义碳期货合约交割品级时，应明确？', '配额的年份（年份）和类型', '配额的颜色', '配额的大小', '配额的包装', 'A', NULL),
(@pack_id, 27, '分析碳配额价格与天气的相关性，通常使用？', 'Pearson相关系数', '方差分析', '聚类', '决策树', 'A', NULL),
(@pack_id, 28, '某日碳配额成交均价为55元/吨，成交量100万吨，成交额为？', '5500万元', '550万元', '5.5亿元', '55亿元', 'A', NULL),
(@pack_id, 29, '碳价波动率计算常用的方法是？', '历史波动率（标准差）', '简单平均', '中位数', '众数', 'A', NULL),
(@pack_id, 30, '分析企业排放数据时，异常值检测可用？', '箱线图或3σ原则', '平均值替代', '直接删除', '不处理', 'A', NULL),
(@pack_id, 31, '产品经理需要做用户画像，可按什么维度分类？', '企业所属行业、排放规模、交易频率', '企业地址', '企业成立时间', '企业员工数', 'A', NULL),
(@pack_id, 32, '某碳交易平台需要展示碳价与能源价格的关联，适合的可视化图表是？', '双轴折线图', '饼图', '散点图', '雷达图', 'A', NULL),
(@pack_id, 33, '使用SQL查询某日成交量最大的前10个交易日，应使用？', 'ORDER BY volume DESC LIMIT 10', 'TOP 10 volume', 'MAX(volume)', 'RANK() OVER()', 'A', NULL),
(@pack_id, 34, '分析碳市场流动性，常用指标是？', '换手率（成交量/流通量）', '价格波动率', '参与机构数', '以上都是', 'D', NULL),
(@pack_id, 35, '某碳价序列存在明显季节性，应使用？', '季节性分解（STL）', '线性回归', '随机森林', '聚类', 'A', NULL),
(@pack_id, 36, '预测下月碳价走势，最简单的模型是？', '移动平均', 'LSTM', '支持向量机', '随机森林', 'A', NULL),
(@pack_id, 37, '碳交易系统的核心订单类型不包括？', '限价单', '市价单', '止损单', '外卖订单', 'D', NULL),
(@pack_id, 38, '大宗交易模块需要支持的交易方式是？', '协议转让', '连续竞价', '集合竞价', '做市商报价', 'A', NULL),
(@pack_id, 39, '碳交易系统结算功能中，逐日盯市的作用是？', '计算当日盈亏，调整保证金', '一次性结算', '收取手续费', '交割配额', 'A', NULL),
(@pack_id, 40, '交易系统的订单簿深度展示，可以反映？', '不同价位的挂单量', '交易者身份', '历史成交价', '系统负载', 'A', NULL),
(@pack_id, 41, '风险控制模块中，涨跌停板制度是为了？', '防止过度投机', '增加交易量', '降低手续费', '提高透明度', 'A', NULL),
(@pack_id, 42, '交易系统API接口的认证方式通常是？', 'API Key + Secret签名', '用户名密码明文', '无需认证', '短信验证', 'A', NULL),
(@pack_id, 43, '碳配额注册登记系统与交易系统的关系是？', '登记系统记录持有量，交易系统执行买卖，清算后互相同步', '两者合一', '交易系统独立登记', '无需登记', 'A', NULL),
(@pack_id, 44, '交易系统出现故障时，应急预案应包括？', '切换备用系统、人工报单、公告', '等待修复', '关闭市场', '取消所有订单', 'A', NULL),
(@pack_id, 45, '控排企业最关心的碳交易问题是什么？', '如何最低成本履约', '如何炒作碳价', '如何避免参与市场', '如何减少排放', 'A', NULL),
(@pack_id, 46, '碳交易产品经理对投资机构用户，应优先提供？', '高频行情数据、API、研究报告', '简单买卖界面', '碳足迹计算', '企业社会责任报告', 'A', NULL),
(@pack_id, 47, '对个人用户（若开放），碳交易产品最需要的功能是？', '小额交易、行情可视化、知识科普', '大宗交易', '配额质押', '排放核查', 'A', NULL),
(@pack_id, 48, '用户调研发现，用户最不满意的碳交易平台问题是？', '流动性不足，买卖价差大', '界面颜色', '注册流程简单', '手续费低', 'A', NULL),
(@pack_id, 49, '产品经理设计碳交易APP时，应遵循的合规要求是？', '投资者适当性管理', '无需管理', '任意注册', '无门槛', 'A', NULL),
(@pack_id, 50, '产品迭代优先级排序时，应最先处理？', '影响交易安全的Bug', '新功能开发', 'UI调整', '性能优化', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业13：医疗设备硬件工程师（电气工程×临床医学）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_clinical:0', 13, '医疗设备硬件工程师', 'major_electrical', 'major_clinical', '电气工程×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '心脏除颤器放电回路中，储能元件通常采用？', '高压电解电容', '电感', '电池', '电阻', 'A', NULL),
(@pack_id, 2, '医疗设备中，用于隔离患者与电源的器件是？', '光耦', '变压器', '隔离放大器', '以上都是', 'D', NULL),
(@pack_id, 3, '心电图（ECG）前端放大器的共模抑制比（CMRR）要求通常不低于？', '60dB', '80dB', '100dB', '120dB', 'C', '临床要求高，通常>100dB'),
(@pack_id, 4, '以下哪种运放参数对微弱生物信号采集最关键？', '输入偏置电流', '压摆率', '输出阻抗', '功耗', 'A', '偏置电流小，避免直流漂移'),
(@pack_id, 5, '数模转换器（DAC）在医疗设备中常用于？', '产生刺激波形', '采集传感器信号', '显示图像', '电源管理', 'A', NULL),
(@pack_id, 6, '某医疗设备需要将12V电池电压转换为±5V给运放供电，应使用？', 'DC-DC隔离模块', 'LDO', '电阻分压', '电荷泵', 'A', '隔离电源减少干扰'),
(@pack_id, 7, '有源低通滤波器在ECG中的截止频率通常设为？', '0.05Hz', '40Hz', '100Hz', '1kHz', 'C', '100Hz左右保留心电信号，滤除高频噪声'),
(@pack_id, 8, '开关电源在医疗设备中的主要问题是？', '电磁干扰（EMI）', '效率低', '体积大', '成本高', 'A', NULL),
(@pack_id, 9, '以下哪种ADC架构最适合多通道、低采样率（1kSPS）的生理信号采集？', 'Sigma-Delta', '逐次逼近（SAR）', '并行比较（Flash）', '积分型', 'A', '高分辨率、抗混叠'),
(@pack_id, 10, '除颤器的高压充电电路通常采用？', '反激式变换器', '线性稳压器', '降压变换器', '电荷泵', 'A', NULL),
(@pack_id, 11, '数字电路中，去耦电容的作用是？', '滤除电源噪声', '储能', '提高电压', '延长寿命', 'A', NULL),
(@pack_id, 12, '医疗设备中的复位电路用于？', '确保单片机在上电或掉电时处于已知状态', '复位用户密码', '清除存储器', '关闭电源', 'A', NULL),
(@pack_id, 13, '医疗电气设备基本安全和基本性能的通用要求标准是？', 'IEC 60601-1', 'IEC 62304', 'ISO 14971', 'ISO 13485', 'A', NULL),
(@pack_id, 14, '医用电气设备的漏电流限值，对CF型（心脏漂浮）应用部分要求最严，其患者漏电流应小于？', '0.01mA', '0.05mA', '0.5mA', '1mA', 'A', 'IEC 60601-1，CF型≤0.01mA'),
(@pack_id, 15, 'EMC测试中的静电放电（ESD）等级要求医疗设备通常需通过？', '±2kV', '±4kV', '±8kV', '±15kV', 'C', '接触放电±8kV'),
(@pack_id, 16, '医疗设备中，绝缘耐压测试的目的是？', '验证绝缘强度，防止电击', '测试设备性能', '检查电源效率', '测量功耗', 'A', NULL),
(@pack_id, 17, '以下哪个符号表示BF型应用部分？', '心形符号加B', '字母CF', '字母BF', '无符号', 'C', 'BF型：与患者身体接触，但不直接接触心脏'),
(@pack_id, 18, '医疗设备辐射发射测试限值依据？', 'CISPR 11（工业科学医疗设备）', 'FCC Part 15', 'IEC 61000-3-2', 'ISO 9001', 'A', NULL),
(@pack_id, 19, '对医疗设备进行电磁兼容整改时，常用措施包括？', '屏蔽、滤波、接地', '提高电压', '降低频率', '增加功率', 'A', NULL),
(@pack_id, 20, '医疗设备的“爬电距离”与“电气间隙”主要是为了防止？', '电击', '电磁干扰', '机械损坏', '过热', 'A', NULL),
(@pack_id, 21, 'IEC 62304标准是关于？', '医疗设备软件生命周期', '医疗设备硬件设计', '风险管理', '质量管理体系', 'A', NULL),
(@pack_id, 22, '医用电气设备的外壳防护等级（IP等级）中，IPX4表示？', '防溅水', '防尘', '防水浸', '防固体异物', 'A', NULL),
(@pack_id, 23, '医疗设备中，CF型应用部分与BF型的主要区别是？', 'CF可直接用于心脏，BF不能', 'BF漏电流要求更严', 'CF只能用于体外', '无区别', 'A', NULL),
(@pack_id, 24, '医疗设备安规测试中，接地连续性电阻应小于？', '0.1Ω', '0.2Ω', '0.5Ω', '1Ω', 'B', NULL),
(@pack_id, 25, '在中国，医疗器械分类为几类？', '2类', '3类', '4类', '5类', 'B', 'Ⅰ、Ⅱ、Ⅲ类'),
(@pack_id, 26, '心电图机属于第几类医疗器械？', 'Ⅰ类', 'Ⅱ类', 'Ⅲ类', '不分类', 'B', 'Ⅱ类'),
(@pack_id, 27, '心脏起搏器属于第几类医疗器械？', 'Ⅰ类', 'Ⅱ类', 'Ⅲ类', '0类', 'C', NULL),
(@pack_id, 28, '中国医疗器械注册证的有效期为？', '3年', '5年', '7年', '10年', 'B', NULL),
(@pack_id, 29, '医疗器械生产质量管理规范（GMP）的核心是？', '可追溯性、风险管理、过程控制', '降低成本', '提高产量', '外观设计', 'A', NULL),
(@pack_id, 30, '医疗器械不良事件报告的义务主体是？', '注册人和使用单位', '仅生产企业', '仅医院', '患者', 'A', NULL),
(@pack_id, 31, '欧盟医疗器械法规（MDR）于哪一年正式实施？', '2017年', '2019年', '2020年', '2021年', 'D', NULL),
(@pack_id, 32, 'FDA对医疗器械的分类中，上市前批准（PMA）适用于？', 'Ⅲ类高风险器械', 'Ⅰ类器械', 'Ⅱ类器械', '所有器械', 'A', NULL),
(@pack_id, 33, '医疗器械软件（SaMD）更新后，是否需要重新注册？', '重大更新需变更注册', '全部不需要', '全部需要', '仅bug修复需要', 'A', NULL),
(@pack_id, 34, '医疗器械唯一标识（UDI）的主要目的是？', '全生命周期追溯', '防伪', '提高售价', '美观', 'A', NULL),
(@pack_id, 35, '测量体温常用的传感器类型是？', '热电偶', '热敏电阻', '红外传感器', '以上都是', 'D', NULL),
(@pack_id, 36, '血氧探头（SpO₂）使用什么原理？', '光电容积描记法（红光和红外光）', '电化学', '压力', '超声', 'A', NULL),
(@pack_id, 37, '压力传感器用于测量血压时，通常需要配合？', '放大器和ADC', '显示器', '电池', '天线', 'A', NULL),
(@pack_id, 38, 'ECG导联线中的“右腿驱动”电路作用？', '抑制共模干扰', '放大心电信号', '供电', '隔离', 'A', NULL),
(@pack_id, 39, '压电式传感器适合测量？', '动态压力或振动（如心音）', '静态压力', '温度', '湿度', 'A', NULL),
(@pack_id, 40, '生物电信号采集中，仪表放大器的参考电极通常接在？', '右腿（RL）', '左手', '胸部', '头部', 'A', '右腿驱动参考'),
(@pack_id, 41, '模拟前端中的抗混叠滤波器截止频率应为信号最高频率的？', '0.5倍', '1倍', '2倍', '至少2倍以上', 'D', '通常取采样率的一半以下'),
(@pack_id, 42, '霍尔效应传感器可用于？', '检测磁场（如电机位置）', '温度', '湿度', '酸碱度', 'A', NULL),
(@pack_id, 43, '医疗设备可靠性测试中的“MTBF”指？', '平均无故障时间', '平均修复时间', '故障率', '寿命', 'A', NULL),
(@pack_id, 44, '加速寿命试验的目的是？', '在较短时间内评估设备寿命', '提高设备性能', '降低成本', '减小体积', 'A', NULL),
(@pack_id, 45, '医疗设备环境测试包括？', '高温高湿、振动、跌落', '电磁兼容', '安规', '性能测试', 'A', NULL),
(@pack_id, 46, '某除颤器要求通过10kg重物冲击测试，目的是？', '模拟跌落或撞击', '测试发电能力', '检查外观', '测试包装', 'A', NULL),
(@pack_id, 47, '可靠性测试中，HALT（高加速寿命试验）主要用于？', '发现设计极限和薄弱点', '常规检验', '出厂测试', '法规认证', 'A', NULL),
(@pack_id, 48, '医疗设备的灭菌测试适用于？', '可重复使用的器械（如手术器械）', '所有设备', '一次性设备', '植入式设备', 'A', NULL),
(@pack_id, 49, '电池供电医疗设备的循环寿命测试，应模拟？', '真实使用充放电循环', '连续放电', '短路', '过压', 'A', NULL),
(@pack_id, 50, '某监护仪宣称“IPX1防水”，表示？', '防垂直滴水', '防淋水', '防喷水', '防浸水', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业14：电生理信号处理工程师（电气工程×临床医学）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_clinical:1', 14, '电生理信号处理工程师', 'major_electrical', 'major_clinical', '电气工程×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '心电图（ECG）的主要频率成分范围是？', '0.05-100Hz', '0.5-50Hz', '1-1000Hz', '0.1-10Hz', 'A', '临床常用0.05-100Hz'),
(@pack_id, 2, '脑电图（EEG）的Delta波频率范围是？', '0.5-4Hz', '4-8Hz', '8-13Hz', '13-30Hz', 'A', NULL),
(@pack_id, 3, '采样定理要求采样频率至少为信号最高频率的？', '1倍', '2倍', '2.56倍', '5倍', 'B', '理论值2倍，工程常用2.56倍'),
(@pack_id, 4, '某ECG采样率为250Hz，其奈奎斯特频率为？', '125Hz', '250Hz', '500Hz', '100Hz', 'A', NULL),
(@pack_id, 5, '时域信号与频域之间的变换常用？', '傅里叶变换', '拉普拉斯变换', 'Z变换', '希尔伯特变换', 'A', NULL),
(@pack_id, 6, '信号的信噪比（SNR）定义为？', '信号功率/噪声功率', '信号电压/噪声电压', '信号幅度/噪声幅度', '信号能量/噪声能量', 'A', NULL),
(@pack_id, 7, 'ECG信号中的基线漂移主要来源于？', '呼吸和电极阻抗变化', '工频干扰', '肌电干扰', '心电本身', 'A', NULL),
(@pack_id, 8, '去除ECG中的50Hz工频干扰，最合适的滤波器是？', '带阻（陷波）滤波器', '低通滤波器', '高通滤波器', '带通滤波器', 'A', NULL),
(@pack_id, 9, '数字滤波器的IIR与FIR相比，IIR的优点是？', '相同阶数下更陡的过渡带', '线性相位', '无条件稳定', '易实现', 'A', NULL),
(@pack_id, 10, '用于EEG中去除眼电伪迹的常用方法是？', '独立成分分析（ICA）', '陷波滤波', '小波去噪', '移动平均', 'A', NULL),
(@pack_id, 11, '信号处理中的“卷积”运算用于？', '线性时不变系统的输出', '傅里叶变换', '自相关', '特征提取', 'A', NULL),
(@pack_id, 12, '短时傅里叶变换（STFT）用于分析？', '信号的时频特性', '信号的功率', '信号的相位', '信号的幅度', 'A', NULL),
(@pack_id, 13, '设计一个ECG高通滤波器，截止频率0.05Hz，用途是？', '抑制基线漂移', '抑制高频噪声', '提取QRS波', '抑制工频', 'A', NULL),
(@pack_id, 14, '设计一个低通滤波器截止频率100Hz用于ECG，是为了？', '抑制肌电干扰和高频噪声', '保留P波', '抑制工频', '提取ST段', 'A', NULL),
(@pack_id, 15, '巴特沃斯滤波器的特点是？', '通带最平坦', '过渡带最陡', '线性相位', '无过冲', 'A', NULL),
(@pack_id, 16, '切比雪夫滤波器与巴特沃斯相比？', '过渡带更陡，但通带有纹波', '更平坦', '线性相位', '更易实现', 'A', NULL),
(@pack_id, 17, '零相位滤波器（如filtfilt）的作用是？', '避免相位失真', '提高滤波效果', '降低计算量', '增强信号', 'A', NULL),
(@pack_id, 18, '设计一个50Hz陷波滤波器，Q值越高，则？', '陷波带宽越窄', '陷波深度越浅', '相位失真越大', '计算越简单', 'A', NULL),
(@pack_id, 19, '中值滤波器常用于？', '去除脉冲噪声（如运动伪迹）', '低通滤波', '高通滤波', '带通滤波', 'A', NULL),
(@pack_id, 20, '移动平均滤波器的特点是？', '简单的低通滤波，有旁瓣泄漏', '线性相位', '高频衰减慢', '以上都是', 'D', NULL),
(@pack_id, 21, '自适应滤波器（如LMS）在ECG中的常见应用是？', '去除工频干扰（参考信号）', '基线漂移', '特征提取', '压缩', 'A', NULL),
(@pack_id, 22, '滤波器设计中的“群延迟”是指？', '不同频率分量的时延差异', '滤波时间', '计算延迟', '信号衰减', 'A', NULL),
(@pack_id, 23, 'ECG中检测R波的常用算法是基于？', '幅度阈值和斜率', '傅里叶变换', '小波变换', '自相关', 'A', NULL),
(@pack_id, 24, '心电信号中，QT间期代表？', '心室去极化到复极化结束', '心房去极化', '心室去极化', '心房复极化', 'A', NULL),
(@pack_id, 25, '心率变异性（HRV）分析主要基于？', 'RR间期序列', 'QRS幅度', 'ST段变化', 'P波方向', 'A', NULL),
(@pack_id, 26, 'EEG中，“棘波”特征通常提示？', '癫痫', '睡眠', '清醒', '昏迷', 'A', NULL),
(@pack_id, 27, '肌电信号（EMG）的时域特征常用？', '均方根（RMS）', '峰值', '过零率', '以上都是', 'D', NULL),
(@pack_id, 28, '睡眠分期中，K复合波出现在哪一期？', 'NREM 2期', 'REM期', 'NREM 3期', '清醒期', 'A', NULL),
(@pack_id, 29, 'ECG中的ST段抬高常见于？', '心肌缺血/梗死', '正常变异', '电解质紊乱', '药物影响', 'A', NULL),
(@pack_id, 30, '小波变换在特征提取中的优势是？', '多分辨率分析，兼顾时间和频率', '计算快', '线性相位', '易于实现', 'A', NULL),
(@pack_id, 31, '主成分分析（PCA）用于特征提取的作用是？', '降维，保留主要信息', '分类', '滤波', '增强信号', 'A', NULL),
(@pack_id, 32, '用于癫痫发作检测的常用特征包括？', '频谱功率、峰值频率、非线性熵', '温度', '血压', '血氧', 'A', NULL),
(@pack_id, 33, '在Python中读取EDF（欧洲数据格式）生理信号文件，常用库是？', 'pyEDF', 'numpy', 'scipy.signal', 'matplotlib', 'A', NULL),
(@pack_id, 34, 'MATLAB中设计一个低通滤波器，截止频率30Hz，采样率250Hz，可使用？', 'designfilt(''lowpassfir'', ...)', 'lowpass()', 'butter()', '以上都是', 'D', NULL),
(@pack_id, 35, '使用Python对ECG信号进行带通滤波，常用函数来自？', 'scipy.signal', 'numpy', 'pandas', 'matplotlib', 'A', NULL),
(@pack_id, 36, '计算信号功率谱密度的MATLAB函数是？', 'pwelch()', 'fft()', 'psd()', 'periodogram()', 'A', NULL),
(@pack_id, 37, '实现QRS检测算法，通常先用？', '带通滤波（5-15Hz）增强QRS', '低通滤波', '高通滤波', '陷波滤波', 'A', NULL),
(@pack_id, 38, 'Python中绘制EEG多通道波形，使用？', 'matplotlib的subplot', 'seaborn', 'plotly', 'pillow', 'A', NULL),
(@pack_id, 39, '使用scipy.signal.find_peaks函数可用来？', '检测R波峰值', '滤波', '去噪', '插值', 'A', NULL),
(@pack_id, 40, 'MATLAB中，filtfilt函数相比filter的优势是？', '零相位', '更高阶', '更快', '更易用', 'A', NULL),
(@pack_id, 41, '计算HRV的频域指标（LF/HF），需要先对RR间期序列进行？', '插值重采样，再FFT', '直接FFT', '小波变换', '自相关', 'A', NULL),
(@pack_id, 42, '使用Python的neurokit2库可以？', '处理ECG、EDA等生理信号', '仅绘图', '仅读取文件', '机器学习', 'A', NULL),
(@pack_id, 43, '心电图的导联系统中最常用的是？', '标准12导联', '3导联', '5导联', '单导联', 'A', NULL),
(@pack_id, 44, '脑电图的10-20系统是指？', '电极放置的国际标准', '采样率', '电压范围', '频率范围', 'A', NULL),
(@pack_id, 45, '肌电信号通常比ECG信号频率？', '更高', '更低', '相同', '不确定', 'A', 'EMG频谱可达数百Hz'),
(@pack_id, 46, '诱发电位（EP）的特点是？', '信号微弱，需多次平均提取', '幅度大', '频率高', '与刺激无关', 'A', NULL),
(@pack_id, 47, '生物电信号采集中的“共模抑制”主要依靠？', '仪表放大器', '滤波器', 'ADC', '电源', 'A', NULL),
(@pack_id, 48, '电化学传感器（如血糖试纸）的工作原理是？', '酶促反应产生电流', '电阻变化', '电容变化', '电感变化', 'A', NULL),
(@pack_id, 49, '神经信号的记录中，微电极尖端直径通常为？', '微米级', '毫米级', '纳米级', '厘米级', 'A', NULL),
(@pack_id, 50, '脑机接口（BCI）常用的信号是？', 'EEG、ECoG、Spikes', 'ECG', 'EMG', '血压', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业15：医学影像设备研发（电气工程×临床医学）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_clinical:2', 15, '医学影像设备研发', 'major_electrical', 'major_clinical', '电气工程×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'X射线成像的基本原理是？', '不同组织对X射线衰减差异', '核磁共振', '超声波反射', '正电子湮灭', 'A', NULL),
(@pack_id, 2, 'CT中，X射线管和探测器围绕患者旋转，采集的数据称为？', '投影数据', '原始数据', '图像数据', '重建数据', 'A', NULL),
(@pack_id, 3, 'MRI成像中的射频脉冲用于？', '激发氢质子', '产生静磁场', '梯度编码', '信号接收', 'A', NULL),
(@pack_id, 4, '超声成像中，换能器利用什么效应产生超声波？', '压电效应', '磁致伸缩', '热效应', '光电效应', 'A', NULL),
(@pack_id, 5, 'PET成像探测的是？', '正电子湮灭产生的γ光子对', 'X射线', '超声波', '磁场变化', 'A', NULL),
(@pack_id, 6, 'X射线管中，阳极靶面通常采用什么材料？', '钨', '铜', '铝', '铁', 'A', NULL),
(@pack_id, 7, 'CT中的“螺距”（pitch）定义为？', '床移动速度与准直器宽度的比值', '旋转速度', '层厚', '球管电压', 'A', NULL),
(@pack_id, 8, 'MRI中的T1加权像主要反映？', '纵向弛豫时间差异', '横向弛豫时间', '质子密度', '血流速度', 'A', NULL),
(@pack_id, 9, '超声的“声阻抗”决定了？', '界面反射强度', '衰减系数', '频率', '声速', 'A', NULL),
(@pack_id, 10, '数字减影血管造影（DSA）的原理是？', '蒙片与造影图像相减去除背景', '增强对比剂', '双能量成像', '三维重建', 'A', NULL),
(@pack_id, 11, '核医学成像中，SPECT与PET的主要区别是？', 'SPECT使用单光子示踪剂，PET使用正电子示踪剂', '价格', '辐射剂量', '成像速度', 'A', NULL),
(@pack_id, 12, 'X射线成像的康普顿散射会导致？', '图像模糊，对比度下降', '分辨率提高', '剂量降低', '无影响', 'A', NULL),
(@pack_id, 13, '在CT数据采集中，FPGA常用于？', '高速数据采集与预处理', '图像显示', '电源管理', '用户界面', 'A', NULL),
(@pack_id, 14, 'FPGA与CPU相比，主要优势是？', '并行处理，低延迟', '编程简单', '价格低', '功耗高', 'A', NULL),
(@pack_id, 15, '用于描述FPGA硬件逻辑的常用语言是？', 'Verilog/VHDL', 'C语言', 'Python', 'Java', 'A', NULL),
(@pack_id, 16, '超声成像中的波束形成（Beamforming）常采用FPGA实现，因为？', '需要实时延迟叠加大量通道', '速度慢也可以', '成本低', '易于调试', 'A', NULL),
(@pack_id, 17, 'FPGA中的“查找表”（LUT）用于实现？', '组合逻辑', '存储', '时钟管理', '输入输出', 'A', NULL),
(@pack_id, 18, '图像重建中的反投影算法，可用FPGA加速，是因为？', '大量独立计算可并行', '算法简单', '数据量小', '无需浮点', 'A', NULL),
(@pack_id, 19, 'FPGA开发流程中，时序约束的目的是？', '确保满足建立保持时间要求', '优化面积', '降低功耗', '提高可读性', 'A', NULL),
(@pack_id, 20, '在FPGA中实现数字滤波器，相比DSP的优势是？', '更高采样率处理', '更灵活', '更低成本', '更低功耗', 'A', NULL),
(@pack_id, 21, 'Xilinx Zynq系列FPGA集成了？', 'ARM处理器硬核', 'GPU', 'DSP', '存储器', 'A', NULL),
(@pack_id, 22, 'FPGA的配置存储器通常采用？', 'Flash或EEPROM', 'SRAM', 'DRAM', '寄存器', 'A', NULL),
(@pack_id, 23, 'PACS系统的作用是？', '医学影像存储与传输', '图像重建', '设备控制', '患者登记', 'A', NULL),
(@pack_id, 24, 'DICOM标准主要用于？', '医疗图像格式和通信协议', '设备控制', '图像处理', '数据库', 'A', NULL),
(@pack_id, 25, '医学影像设备中，高压发生器的作用是？', '为X射线管提供高电压', '产生图像', '冷却', '电源转换', 'A', NULL),
(@pack_id, 26, 'MRI系统的三大主件是？', '磁体、梯度线圈、射频系统', '球管、探测器、机架', '换能器、接收器、显示器', '探头、计算机、电源', 'A', NULL),
(@pack_id, 27, 'CT中的滑环技术实现了？', '连续旋转扫描，无需电缆缠绕', '更高电压', '更低剂量', '更快重建', 'A', NULL),
(@pack_id, 28, '医学影像设备的“机房屏蔽”主要是为了？', '防护电磁辐射和X射线', '美观', '防尘', '隔音', 'A', NULL),
(@pack_id, 29, '一体化PET/CT系统的优势是？', '功能和解剖图像融合，精准定位', '降低成本', '减少扫描时间', '提高剂量', 'A', NULL),
(@pack_id, 30, '超声探头中，多阵元相控阵探头能实现？', '电子聚焦和扫描', '机械扫描', '更高频率', '更低成本', 'A', NULL),
(@pack_id, 31, '医学影像设备的冷却系统对于？', 'X射线管和MRI梯度线圈至关重要', '显示器', '键盘', '病床', 'A', NULL),
(@pack_id, 32, '远程医疗中，影像传输要求？', '高带宽、低延迟、压缩标准', '高电压', '无线充电', '本地存储', 'A', NULL),
(@pack_id, 33, 'CT图像重建最经典的算法是？', '滤波反投影（FBP）', '迭代重建', '傅里叶重建', '直接反投影', 'A', NULL),
(@pack_id, 34, '与FBP相比，迭代重建的优点是？', '可在低剂量下提高图像质量', '速度快', '简单', '无伪影', 'A', NULL),
(@pack_id, 35, 'MRI图像重建通常采用？', '傅里叶变换（k空间填充）', '反投影', '迭代', '卷积', 'A', NULL),
(@pack_id, 36, '超声成像中的“波束形成”算法用于？', '合成接收线', '图像显示', '频率变换', '噪声抑制', 'A', NULL),
(@pack_id, 37, 'PET图像重建中，常用？', '最大似然期望最大化（MLEM）', 'FBP', '傅里叶变换', '小波变换', 'A', NULL),
(@pack_id, 38, 'CT图像中的“硬化伪影”产生原因是？', 'X射线多能谱，低能射线被优先吸收', '患者移动', '散射', '探测器坏点', 'A', NULL),
(@pack_id, 39, '金属伪影的校正方法包括？', '插值、迭代重建、双能成像', '滤波', '增强', '平滑', 'A', NULL),
(@pack_id, 40, '超分辨率重建在医学影像中用于？', '提高图像空间分辨率', '降低噪声', '减少伪影', '增加对比度', 'A', NULL),
(@pack_id, 41, '深度学习在图像重建中应用于？', '从低剂量投影重建高质量图像', '只能分类', '只能分割', '无法用于重建', 'A', NULL),
(@pack_id, 42, '三维重建常用的算法包括？', '表面渲染（SSD）、体渲染（VR）', '滤波', '傅里叶变换', '相关', 'A', NULL),
(@pack_id, 43, '放射影像中的“ALARA原则”指？', '合理尽可能低的辐射剂量', '尽可能高的剂量', '自动曝光', '随机对照', 'A', NULL),
(@pack_id, 44, 'MRI的绝对禁忌症是？', '心脏起搏器', '金属牙套', '纹身', '妊娠', 'A', NULL),
(@pack_id, 45, '孕妇进行X射线检查时，最需要注意？', '腹部屏蔽，降低胎儿剂量', '增加剂量', '无需特殊', '禁止任何检查', 'A', NULL),
(@pack_id, 46, '对比剂肾病风险高的患者是？', '肾功能不全者', '年轻人', '男性', '高血压', 'A', NULL),
(@pack_id, 47, '超声检查中的热指数（TI）用于？', '评估组织升温风险', '测量声速', '计算频率', '确定深度', 'A', NULL),
(@pack_id, 48, '医用X射线设备的质量控制（QC）包括？', '剂量输出、重复性、线性、焦点、准直', '仅外观', '仅软件', '仅操作者', 'A', NULL),
(@pack_id, 49, '磁共振中的SAR（比吸收率）限制是为了？', '防止射频加热组织', '提高图像质量', '降低噪声', '减少扫描时间', 'A', NULL),
(@pack_id, 50, '放射科工作人员佩戴的个人剂量计监测？', '累积辐射剂量', '血压', '体温', '心率', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业16：工业控制软件工程师（电气工程×软件工程）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_swe:0', 16, '工业控制软件工程师', 'major_electrical', 'major_swe', '电气工程×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '梯形图中，串联的常开触点对应逻辑关系是？', '与', '或', '非', '异或', 'A', NULL),
(@pack_id, 2, '在西门子PLC中，用于定时器编号如T1，其数据类型为？', 'TIMER', 'INT', 'DINT', 'BOOL', 'A', NULL),
(@pack_id, 3, '以下哪个不是IEC 61131-3标准语言？', 'C语言', '结构化文本（ST）', '功能块图（FBD）', '顺序功能图（SFC）', 'A', NULL),
(@pack_id, 4, '在PLC中，实现电机正反转互锁应使用？', '常闭触点互锁', '常开触点', '定时器', '计数器', 'A', NULL),
(@pack_id, 5, '三菱PLC中，SET指令的作用是？', '将线圈置1并保持', '将线圈置0', '脉冲输出', '复位', 'A', NULL),
(@pack_id, 6, '下列哪个是PLC的编程软件？', 'TIA Portal', 'Visual Studio', 'Eclipse', 'MATLAB', 'A', NULL),
(@pack_id, 7, '对于Modbus通信，PLC作为主站时，读取保持寄存器的功能码是？', '0x03', '0x01', '0x02', '0x04', 'A', NULL),
(@pack_id, 8, '在PLC中，上升沿检测指令（P）在单个扫描周期内产生？', '一个扫描周期宽度的脉冲', '持续为1', '持续为0', '持续半个周期', 'A', NULL),
(@pack_id, 9, '某PLC程序需要计数100个脉冲后输出，应使用？', '计数器（CTU）', '定时器', '比较指令', '移位寄存器', 'A', NULL),
(@pack_id, 10, '冗余PLC系统通常采用什么同步方式？', '热备同步', '冷备', '无同步', '手动切换', 'A', NULL),
(@pack_id, 11, '在PLC中，INT（整型）数据占用多少位？', '16位', '8位', '32位', '64位', 'A', NULL),
(@pack_id, 12, 'SCL（结构化控制语言）类似于？', 'Pascal', 'C++', 'Python', 'Java', 'A', NULL),
(@pack_id, 13, '使用C#编写上位机与PLC通信，常用库是？', 'S7.NET', 'System.IO', 'Socket', 'WPF', 'A', NULL),
(@pack_id, 14, 'C++中，用于多线程同步的互斥量是？', 'std::mutex', 'std::lock', 'std::thread', 'std::atomic', 'A', NULL),
(@pack_id, 15, '上位机读取PLC数据时，为了防止界面卡顿，应使用？', '后台线程异步读取', '主线程死循环', 'Sleep', '定时器', 'A', NULL),
(@pack_id, 16, 'WPF中的MVVM模式中，View与ViewModel的绑定依靠？', 'DataContext和依赖属性', '事件', '委托', '反射', 'A', NULL),
(@pack_id, 17, '以下哪个不是C#中用于异步编程的关键字？', 'yield', 'async', 'await', 'Task', 'A', 'yield不是异步主要关键字'),
(@pack_id, 18, '使用C++编写OPC DA客户端，需要添加的库是？', 'opcda.h', 'winsock', 'iostream', 'thread', 'A', NULL),
(@pack_id, 19, '上位机软件中，实时趋势曲线通常使用什么控件？', 'Chart / Graph控件', 'Button', 'TextBox', 'Label', 'A', NULL),
(@pack_id, 20, '通过以太网与PLC通信，常用的协议是？', 'Profinet、Modbus TCP、EtherNet/IP', 'USB', 'RS232', 'I2C', 'A', NULL),
(@pack_id, 21, 'C#中的垃圾回收（GC）可能导致？', '非确定性暂停，不适合硬实时', '内存泄漏', '编译错误', '性能提升', 'A', NULL),
(@pack_id, 22, '为上位机添加报警记录功能，应使用？', '数据库或文件存储', '内存数组', '剪贴板', '屏幕截图', 'A', NULL),
(@pack_id, 23, '在C++中，智能指针（如std::shared_ptr）的作用是？', '自动内存管理', '提高运行速度', '简化语法', '多线程', 'A', NULL),
(@pack_id, 24, '使用C#开发SCADA人机界面，通常采用？', 'WPF或WinForms', '控制台', '服务', 'DLL', 'A', NULL),
(@pack_id, 25, 'SCADA系统与DCS的主要区别是？', 'SCADA通常用于广域分散控制，DCS用于集中过程控制', '完全相同', 'SCADA价格更低', 'DCS不能联网', 'A', NULL),
(@pack_id, 26, 'SCADA系统中的“遥测”指？', '远程测量模拟量（如电流）', '远程信号', '远程控制', '远程调节', 'A', NULL),
(@pack_id, 27, 'SCADA系统历史数据库的压缩存储技术（如旋转门）用于？', '减少存储量', '提高查询速度', '加密', '备份', 'A', NULL),
(@pack_id, 28, '工业SCADA系统常见的通信冗余方式？', '双网、双服务器', '单网', '单服务器', '无冗余', 'A', NULL),
(@pack_id, 29, 'SCADA系统中，OPC UA相较于OPC DA的优势是？', '跨平台、安全性、数据建模', '速度更快', '成本更低', '只支持Windows', 'A', NULL),
(@pack_id, 30, '以下哪个是开源SCADA项目？', 'ScadaBR', 'WinCC', 'iFIX', 'Citect', 'A', NULL),
(@pack_id, 31, 'SCADA系统的报警确认机制用于？', '避免遗漏重要报警', '删除报警', '抑制报警', '记录报警', 'A', NULL),
(@pack_id, 32, '某SCADA系统需要与多个PLC通信，不同协议，应使用？', '协议转换网关', '更换PLC', '手动录入', '无法实现', 'A', NULL),
(@pack_id, 33, 'SCADA系统的冗余热备切换时间一般要求小于？', '几秒或毫秒级', '1小时', '1天', '1分钟', 'A', NULL),
(@pack_id, 34, '在SCADA系统中，远程单元（RTU）通常内置？', '通信接口、I/O模块、逻辑处理', '显示器', '键盘', '打印机', 'A', NULL),
(@pack_id, 35, 'Modbus RTU通信的帧结束检测通常依靠？', '3.5字符时间间隔', 'CRC校验', '固定长度', '起始符', 'A', NULL),
(@pack_id, 36, 'Profibus DP的物理层基于？', 'RS-485', '以太网', '光纤', '无线', 'A', NULL),
(@pack_id, 37, 'EtherCAT的工作原理是？', '以太网帧on the fly处理', '存储转发', '令牌环', '查询', 'A', NULL),
(@pack_id, 38, '以下哪个是实时工业以太网协议？', 'Profinet IRT', 'HTTP', 'FTP', 'SNMP', 'A', NULL),
(@pack_id, 39, 'CANopen协议基于？', 'CAN总线', '以太网', 'RS232', 'USB', 'A', NULL),
(@pack_id, 40, '在OPC UA中，信息模型的核心概念是？', '节点与引用', '变量', '方法', '事件', 'A', NULL),
(@pack_id, 41, '使用Modbus TCP，端口号是？', '502', '80', '443', '21', 'A', NULL),
(@pack_id, 42, '工业无线通信中，WirelessHART使用什么频段？', '2.4GHz', '5GHz', '433MHz', '900MHz', 'A', NULL),
(@pack_id, 43, '诊断现场总线故障，常用工具是？', '总线分析仪（如ProfiTrace）', '万用表', '示波器', '以上都是', 'D', NULL),
(@pack_id, 44, '以下哪个不是工业通信协议？', 'HDMI', 'Modbus', 'Profinet', 'CC-Link', 'A', NULL),
(@pack_id, 45, '工业控制系统信息安全标准IEC 62443的核心是？', '纵深防御、区域隔离', '使用杀毒软件', '定期重启', '禁用网络', 'A', NULL),
(@pack_id, 46, 'PLC程序中，软件看门狗与硬件看门狗的关系？', '软件看门狗可监控程序流程，硬件看门狗监控CPU运行', '完全相同', '硬件看门狗无用', '只能选一个', 'A', NULL),
(@pack_id, 47, '冗余系统切换时，为保证数据不丢失，需采用？', '同步数据交换', '异步', '手动备份', '双电源', 'A', NULL),
(@pack_id, 48, '某工厂要求控制系统可用性99.999%，相当于年停机时间？', '约5分钟', '约5小时', '约5天', '约50小时', 'A', '99.999%为5个9，年停机约5分钟'),
(@pack_id, 49, '工业防火墙用于？', '隔离工业网络，防止恶意攻击', '防病毒', '防停电', '防辐射', 'A', NULL),
(@pack_id, 50, '“安全PLC”与普通PLC的区别是？', '具有冗余、自诊断、安全认证（如SIL3）', '价格更高', '速度更快', '编程不同', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业17：智能硬件开发（电气工程×软件工程）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_swe:1', 17, '智能硬件开发', 'major_electrical', 'major_swe', '电气工程×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '嵌入式Linux内核启动后，第一个用户进程通常是？', 'init', 'bash', 'systemd', 'sh', 'A', NULL),
(@pack_id, 2, '在嵌入式Linux中，通过sysfs访问GPIO，路径通常是？', '/sys/class/gpio', '/dev/gpio', '/proc/gpio', '/etc/gpio', 'A', NULL),
(@pack_id, 3, '使用buildroot或Yocto构建嵌入式Linux系统的目的是？', '定制化根文件系统和内核', '编译应用程序', '烧录固件', '调试驱动', 'A', NULL),
(@pack_id, 4, '以下哪个是嵌入式Linux常用的闪存文件系统？', 'UBIFS', 'ext4', 'NTFS', 'FAT32', 'A', NULL),
(@pack_id, 5, 'Linux设备驱动中，字符设备驱动注册使用？', 'register_chrdev', 'device_create', 'class_create', 'alloc_chrdev_region', 'A', NULL),
(@pack_id, 6, '在嵌入式Linux中，调试用户空间程序常用？', 'gdb', 'strace', 'gprof', '以上都是', 'D', NULL),
(@pack_id, 7, '设备树（Device Tree）的作用是？', '描述硬件配置，避免硬编码', '存储设备文件', '管理进程', '日志记录', 'A', NULL),
(@pack_id, 8, '在ARM Linux中，系统调用通过什么指令触发？', 'SVC（SWI）', 'IRQ', 'FIQ', 'NOP', 'A', NULL),
(@pack_id, 9, '交叉编译的含义是？', '在宿主机编译目标机代码', '在目标机编译', '编译多个平台', '不同编译器', 'A', NULL),
(@pack_id, 10, '嵌入式Linux的实时补丁（PREEMPT_RT）可以提高？', '实时性，降低延迟', '吞吐量', '功耗', '图形性能', 'A', NULL),
(@pack_id, 11, '使用i2cget命令可以？', '读取I2C设备寄存器', '配置网卡', '挂载文件系统', '启动服务', 'A', NULL),
(@pack_id, 12, '嵌入式Linux启动时，uboot的作用是？', '引导加载内核', '运行应用', '文件系统管理', '电源管理', 'A', NULL),
(@pack_id, 13, 'ARM Cortex-M系列处理器主要用于？', '微控制器，裸机/RTOS', '应用处理器，运行Linux', '图形处理器', '数字信号处理', 'A', NULL),
(@pack_id, 14, 'ARM Cortex-A系列通常包含？', 'MMU（内存管理单元）', '无MMU', '仅FPU', '仅DSP', 'A', NULL),
(@pack_id, 15, 'ARM的Thumb指令集的特点是？', '16位指令，高代码密度', '32位指令', '64位指令', '浮点指令', 'A', NULL),
(@pack_id, 16, '在ARM裸机编程中，中断向量表通常放在？', '起始地址0x00000000', 'RAM末尾', '任意位置', '外设地址', 'A', NULL),
(@pack_id, 17, 'ARM的MPU（内存保护单元）用于？', '提供内存区域访问控制', '管理虚拟内存', '缓存管理', '调试', 'A', NULL),
(@pack_id, 18, '以下哪个是ARM公司设计的64位架构？', 'ARMv8-A', 'ARMv7', 'ARMv6', 'ARMv5', 'A', NULL),
(@pack_id, 19, '调试ARM处理器常用的硬件接口是？', 'JTAG/SWD', 'USB', 'UART', 'SPI', 'A', NULL),
(@pack_id, 20, '在ARM Linux中，查看CPU信息的命令是？', 'cat /proc/cpuinfo', 'lscpu', 'cpuinfo', 'uname', 'A', NULL),
(@pack_id, 21, 'ARM的“大小端”可以通过什么配置？', '硬件引脚或寄存器', '软件无法配置', '固定小端', '固定大端', 'A', NULL),
(@pack_id, 22, '在ARM Cortex-M中，系统嘀嗒定时器（SysTick）常用于？', 'RTOS时钟节拍', '休眠', '看门狗', 'PWM', 'A', NULL),
(@pack_id, 23, 'MQTT协议中，遗嘱消息（LWT）在客户端异常断开时由谁发送？', 'Broker', '其他客户端', '服务器', '网关', 'A', NULL),
(@pack_id, 24, 'CoAP协议默认使用UDP端口号？', '5683', '1883', '80', '443', 'A', NULL),
(@pack_id, 25, '以下哪个是物联网中常用的应用层协议？', 'MQTT', 'TCP', 'IP', 'Ethernet', 'A', NULL),
(@pack_id, 26, 'LwIP是一个？', '轻量级TCP/IP协议栈', '物联网平台', '无线协议', '嵌入式操作系统', 'A', NULL),
(@pack_id, 27, 'NB-IoT的特点包括？', '低功耗、深覆盖、低速', '高速率', '低延迟', '高带宽', 'A', NULL),
(@pack_id, 28, 'LoRa调制技术属于？', '扩频', '窄带', '跳频', 'OFDM', 'A', NULL),
(@pack_id, 29, '蓝牙5.0相比于4.0，主要提升？', '速率、距离、广播容量', '功耗', '安全性', '兼容性', 'A', NULL),
(@pack_id, 30, '在物联网中，设备注册到云平台通常需要？', '设备证书或密钥', '无认证', '电话号码', '身份证', 'A', NULL),
(@pack_id, 31, '物联网平台中的“设备影子”功能是？', '云端设备状态缓存', '设备外观', '虚拟设备', '备份', 'A', NULL),
(@pack_id, 32, '使用ESP8266开发Wi-Fi智能硬件，常用开发框架是？', 'ESP-IDF或Arduino', 'Keil', 'IAR', 'Android Studio', 'A', NULL),
(@pack_id, 33, '以下哪个是MQTT的QoS 2特性？', '消息仅传输一次，不重复', '最多一次', '至少一次', '无确认', 'A', NULL),
(@pack_id, 34, '物联网中数据格式JSON与CBOR的区别？', 'CBOR是二进制，更紧凑', 'JSON更紧凑', '两者相同', 'CBOR不可读', 'A', NULL),
(@pack_id, 35, 'Linux驱动中，module_init宏的作用是？', '指定驱动入口函数', '指定出口函数', '声明模块许可', '定义版本', 'A', NULL),
(@pack_id, 36, '编写一个GPIO驱动程序，需要调用什么函数请求GPIO？', 'gpio_request', 'gpio_get', 'gpio_set', 'gpio_direction', 'A', NULL),
(@pack_id, 37, '中断处理程序中，下半部（bottom half）用于？', '处理耗时任务，允许中断', '快速响应', '禁止中断', '复位', 'A', NULL),
(@pack_id, 38, '在设备树中，compatible属性用于？', '匹配驱动和设备', '设置设备名称', '配置中断', '设置地址', 'A', NULL),
(@pack_id, 39, '编写I2C驱动，通常使用？', 'i2c_client和i2c_driver结构体', 'spi_device', 'platform_driver', 'usb_driver', 'A', NULL),
(@pack_id, 40, '字符设备驱动中的file_operations结构体包含？', 'read、write、ioctl等函数指针', '设备号', '类', '总线', 'A', NULL),
(@pack_id, 41, '在Linux中，动态分配设备号使用？', 'alloc_chrdev_region', 'register_chrdev', 'devm_request', 'class_create', 'A', NULL),
(@pack_id, 42, '设备驱动中，devm_系列API的作用是？', '自动资源管理（释放）', '提高性能', '设备绑定', '电源管理', 'A', NULL),
(@pack_id, 43, '在STM32中，最低功耗模式是？', 'Standby（待机）', 'Stop', 'Sleep', 'Run', 'A', NULL),
(@pack_id, 44, '低功耗蓝牙（BLE）的广播间隔越大，则？', '功耗越低，连接建立时间越长', '功耗越高', '传输速率越高', '距离越远', 'A', NULL),
(@pack_id, 45, '某传感器设备，大部分时间休眠，定期唤醒采集，应采用？', 'RTC定时唤醒', '中断唤醒', '外部信号唤醒', '一直运行', 'A', NULL),
(@pack_id, 46, '在嵌入式系统中，动态电压频率调节（DVFS）通过？', '降低频率和电压减少功耗', '提高频率', '关闭外设', '休眠', 'A', NULL),
(@pack_id, 47, '纽扣电池（CR2032）容量约为？', '200-240mAh', '2000mAh', '20mAh', '2Ah', 'A', NULL),
(@pack_id, 48, '测量设备功耗时，常用仪器是？', '功耗分析仪或精密电源', '万用表', '示波器', '逻辑分析仪', 'A', NULL),
(@pack_id, 49, '在物联网产品中，MQTT的心跳间隔设长一点可以？', '降低功耗', '提高实时性', '增加可靠性', '减少流量', 'A', NULL),
(@pack_id, 50, '低功耗设计中，未用的GPIO应配置为？', '模拟输入或上拉/下拉固定电平', '浮空输入', '输出高', '输出低', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业18：PLC编程专家（电气工程×软件工程）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_swe:2', 18, 'PLC编程专家', 'major_electrical', 'major_swe', '电气工程×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '梯形图中，两个常开触点并联表示？', '逻辑或', '逻辑与', '逻辑非', '自锁', 'A', NULL),
(@pack_id, 2, '梯形图中，输出线圈不能串联的原因是？', '线圈只有一个，无串联意义', '语法允许', '可以串联', '会短路', 'A', NULL),
(@pack_id, 3, '实现电机启动保持（自锁）的梯形图需要？', '启动按钮常开并联保持触点', '启动按钮串联停止按钮', '定时器', '计数器', 'A', NULL),
(@pack_id, 4, '使用“置位”和“复位”指令时，当置位和复位同时有效，结果取决于？', '扫描顺序，后执行者有效', '置位优先', '复位优先', '随机', 'A', NULL),
(@pack_id, 5, '以下哪个触点指令用于检测下降沿？', '下降沿检测触点', '常开触点', '常闭触点', '线圈', 'A', NULL),
(@pack_id, 6, '在西门子TIA中，常开触点的符号是？', '-| |-', '-|/|-', '-( )-', '-#-', 'A', NULL),
(@pack_id, 7, '梯形图中，能流从左向右流动的条件是？', '所有串联触点闭合，并联通路任一闭合', '线圈得电', '常闭触点断开', '定时器计时', 'A', NULL),
(@pack_id, 8, '使用M0.0的常闭触点，当M0.0=1时，该触点？', '断开', '闭合', '不变', '振荡', 'A', NULL),
(@pack_id, 9, '实现单键启动/停止（交替输出）的梯形图常用？', '上升沿检测和置位/复位', '定时器', '计数器', '比较指令', 'A', NULL),
(@pack_id, 10, '在三菱PLC中，PLS指令生成？', '一个扫描周期的脉冲', '一直为1', '一直为0', '半个周期', 'A', NULL),
(@pack_id, 11, '一个RLO（逻辑运算结果）取反使用？', 'NOT指令', 'INV', 'NEG', 'COM', 'A', NULL),
(@pack_id, 12, '梯形图中，常开触点可以放在线圈的右边吗？', '不可以，语法限制', '可以', '仅某些PLC可以', '只用于输出', 'A', NULL),
(@pack_id, 13, '在欧姆龙PLC中，常用END指令的作用是？', '结束程序扫描', '结束条件', '结束循环', '结束子程序', 'A', NULL),
(@pack_id, 14, '梯形图程序中出现双线圈输出（同一线圈在不同位置被赋值）会导致？', '只有最后一个赋值有效', '编译错误', '线圈损坏', '运行正常', 'A', NULL),
(@pack_id, 15, '实现一个延时接通定时器，输入信号为I0.0，输出Q0.0延时10秒，使用TON定时器，其输入EN应为？', 'I0.0', '常闭I0.0', '常开I0.0', 'M0.0', 'A', NULL),
(@pack_id, 16, '结构化文本中，赋值语句的符号是？', ':=', '=', '==', '<-', 'A', NULL),
(@pack_id, 17, '以下哪个是ST中的条件语句？', 'IF ... THEN ... ELSE ... END_IF', 'for ... end_for', 'while ... end_while', 'case ... of', 'A', NULL),
(@pack_id, 18, 'ST中，定义一个整型变量，写法是？', 'VAR i : INT; END_VAR', 'int i;', 'DIM i AS INT', 'i: int', 'A', NULL),
(@pack_id, 19, '以下ST程序：IF A THEN B:=1; ELSE B:=2; END_IF;当A为True时，B值为？', '1', '2', '0', '不变', 'A', NULL),
(@pack_id, 20, 'ST中，FOR循环的语法是？', 'FOR i:=1 TO 10 BY 1 DO ... END_FOR', 'for(i=1;i<=10;i++)', 'repeat ... until', 'loop', 'A', NULL),
(@pack_id, 21, '在ST中，布尔量AND运算的符号是？', 'AND', '&', '&&', 'AND THEN', 'A', NULL),
(@pack_id, 22, '编写一个ST函数块，返回值类型用？', 'FB的声明中指定返回值', '使用RETURN变量', '使用OUT变量', '全局变量', 'B', 'ST中RETURN带返回值'),
(@pack_id, 23, '在ST中，CASE语句用于？', '多分支选择', '循环', '条件判断', '跳转', 'A', NULL),
(@pack_id, 24, '下列哪个是ST的注释符号？', '(* ... )', '//', '/ */', '--', 'A', 'IEC 61131-3标准为(* *)'),
(@pack_id, 25, 'ST中，变量名前加%I表示？', '输入地址', '输出地址', '中间变量', '常量', 'A', NULL),
(@pack_id, 26, 'ST中，定时器TON的调用格式是？', 'TON(IN:=bool, PT:=time);', 'TON(IN, PT);', 'CALL TON;', 'TIMER TON;', 'A', NULL),
(@pack_id, 27, '以下ST代码计算1到10的和，正确是？', 'sum:=0; FOR i:=1 TO 10 DO sum:=sum+i; END_FOR', 'sum=0; for i=1 to 10 sum+=i;', 'while i<=10 sum+=i;', 'repeat sum+=i until i=10', 'A', NULL),
(@pack_id, 28, 'Profibus DP的传输速率最高可达？', '12Mbps', '100Mbps', '1Mbps', '10Mbps', 'A', NULL),
(@pack_id, 29, '以下哪个是Profibus DP的设备类型？', '主站1类、主站2类、从站', '仅主站', '仅从站', '网关', 'A', NULL),
(@pack_id, 30, 'Modbus RTU的CRC校验字节数为？', '2字节', '1字节', '4字节', '0', 'A', NULL),
(@pack_id, 31, 'CAN总线中，仲裁失败的一方转为？', '监听模式，等待重发', '关闭', '发送错误帧', '放弃', 'A', NULL),
(@pack_id, 32, 'EtherCAT的拓扑结构可以是？', '线型、树型、星型', '仅星型', '仅线型', '仅环型', 'A', NULL),
(@pack_id, 33, 'Profinet的实时等级分为？', 'RT（实时）和IRT（等时实时）', '仅RT', '仅IRT', 'none', 'A', NULL),
(@pack_id, 34, '总线终端电阻的作用是？', '消除信号反射', '提供电源', '过滤噪声', '接地', 'A', NULL),
(@pack_id, 35, '以下哪个是使用光纤的工业总线？', 'Profibus PA（非光纤，但可转）通常电力线？Profibus可用光纤', 'Modbus', 'CAN', '以上都有可能', 'A', 'Profibus可用光纤'),
(@pack_id, 36, '在DeviceNet中，使用的物理层是？', 'CAN', 'RS485', 'Ethernet', 'RS232', 'A', NULL),
(@pack_id, 37, '现场总线诊断中，测量总线电压可以判断？', '线路短路、断路', '数据内容', '通信速度', '节点地址', 'A', NULL),
(@pack_id, 38, '伺服控制中，位置模式通常需要输入？', '脉冲方向或通讯给定位置', '模拟电压', '电流', '编码器反馈', 'A', NULL),
(@pack_id, 39, 'PLC控制伺服电机，实现绝对定位，需使用什么指令？', 'MC_MoveAbsolute', 'MC_MoveRelative', 'MC_Stop', 'MC_Power', 'A', NULL),
(@pack_id, 40, '步进电机与伺服电机的主要区别是？', '伺服有闭环反馈，步进多为开环', '步进功率大', '伺服价格低', '步进精度高', 'A', NULL),
(@pack_id, 41, '电子齿轮功能的作用是？', '实现多个轴同步跟随', '减速', '变速', '换向', 'A', NULL),
(@pack_id, 42, 'PLCopen运动控制规范中，MC_Home用于？', '回原点', '使能', '点动', '复位', 'A', NULL),
(@pack_id, 43, '伺服驱动器接收的脉冲方向信号中，方向信号电平高低决定？', '旋转方向', '速度', '位置', '加速度', 'A', NULL),
(@pack_id, 44, '在运动控制中，S曲线加减速比梯形加减速更平滑，原因是？', '加加速度有限', '速度连续', '加速度连续', '以上都是', 'D', NULL),
(@pack_id, 45, '编码器的分辨率用PPR（每转脉冲数）表示，若为2500PPR，四倍频后为？', '10000', '2500', '5000', '2000', 'A', NULL),
(@pack_id, 46, '某PLC输出Q0.0不动作，可能的故障是？', '程序逻辑错误、输出模块电源、保险丝', '输入坏', 'CPU坏', '通信故障', 'A', NULL),
(@pack_id, 47, '使用PLC在线监视功能，看到梯形图中某触点变蓝但线圈不亮，原因可能是？', '线圈被后续程序复位', '触点虚接', 'PLC死机', '电源故障', 'A', NULL),
(@pack_id, 48, '现场总线通信故障时，常用方法是？', '检查终端电阻、线缆、节点地址、供电', '重启PLC', '更换PLC', '更换所有模块', 'A', NULL),
(@pack_id, 49, '某模拟量输入模块读数异常波动，可能原因是？', '未使用屏蔽线、接地不良、强干扰', '量程设置错误', '模块故障', '以上都是', 'D', NULL),
(@pack_id, 50, 'PLC故障诊断中，查看CPU的诊断缓冲区可以？', '获得历史故障记录', '修改程序', '强制输出', '清除内存', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业19：电气产品销售工程师（电气工程×市场营销）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_marketing:0', 19, '电气产品销售工程师', 'major_electrical', 'major_marketing', '电气工程×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '低压断路器的分断能力是指？', '能可靠切断的最大短路电流', '额定电流', '过载保护倍数', '操作寿命', 'A', NULL),
(@pack_id, 2, '电机软启动器的主要作用是？', '降低启动电流，减少冲击', '调速', '节能', '保护电机', 'A', NULL),
(@pack_id, 3, '变频器输出侧不能直接安装？', '普通电容补偿装置', '电抗器', '滤波器', '接触器', 'A', '会损坏变频器'),
(@pack_id, 4, '以下哪个是电能质量指标？', '功率因数、谐波、电压闪变', '电流大小', '频率稳定', '接地电阻', 'A', NULL),
(@pack_id, 5, '10kV电力电缆的耐压试验电压通常为？', '17.5kV', '10kV', '35kV', '42kV', 'A', '直流耐压或工频耐压'),
(@pack_id, 6, '什么是电弧？', '气体放电现象', '短路', '过电压', '过电流', 'A', NULL),
(@pack_id, 7, '低压配电系统接地型式TN-C是指？', '中性线和保护线合一', '分开', '单独接地', '不接地', 'A', NULL),
(@pack_id, 8, '智能电表的主要功能不包括？', '远程断电', '计量有功无功', '漏电保护', '数据通信', 'C', NULL),
(@pack_id, 9, '变压器容量单位通常是？', 'kVA', 'kW', 'kVar', 'kV', 'A', NULL),
(@pack_id, 10, '下列哪个不是电机启动方式？', '星三角降压启动', '自耦变压器启动', '电阻启动', '电容启动（单相）', 'C', '电阻启动不常见'),
(@pack_id, 11, '剩余电流动作保护器（RCD）的动作电流30mA主要用于？', '防止人身触电', '防止设备接地故障', '过载保护', '短路保护', 'A', NULL),
(@pack_id, 12, '什么是UPS？', '不间断电源', '稳压器', '逆变器', '变频器', 'A', NULL),
(@pack_id, 13, '电气销售中，设计院的角色通常是？', '推荐或指定品牌', '直接采购', '施工安装', '监理', 'A', NULL),
(@pack_id, 14, '客户关系管理（CRM）系统的主要作用是？', '跟踪客户信息、销售过程、合同', '财务记账', '仓库管理', '生产计划', 'A', NULL),
(@pack_id, 15, '销售人员在向业主介绍产品时，最应该强调？', '可靠性、全生命周期成本', '价格最低', '外观最美', '品牌历史', 'A', NULL),
(@pack_id, 16, '针对长期合作的电气成套厂，最有效的维护方式是？', '及时供货、提供技术支持、定期拜访', '频繁降价', '很少联系', '只发邮件', 'A', NULL),
(@pack_id, 17, '处理客户投诉的首要步骤是？', '倾听并确认问题', '推卸责任', '立即赔偿', '升级问题', 'A', NULL),
(@pack_id, 18, '在工业电气销售中，关键决策人通常是？', '电气总工或采购经理', '车间操作工', '保安', '司机', 'A', NULL),
(@pack_id, 19, '以下哪项属于客户痛点？', '设备故障导致停产损失大', '产品外观', '颜色', '包装', 'A', NULL),
(@pack_id, 20, '销售漏斗（Sales Funnel）的作用是？', '跟踪潜在客户转化阶段', '预测销售额', '管理合同', '售后回访', 'A', NULL),
(@pack_id, 21, '大客户管理（Key Account Management）的核心是？', '深度绑定，战略合作', '只追求单次交易', '低价竞争', '减少服务', 'A', NULL),
(@pack_id, 22, '客户满意度调查通常关注？', '产品质量、交货期、服务响应', '销售人员私人关系', '价格高低', '公司规模', 'A', NULL),
(@pack_id, 23, '招标文件中的“技术规范书”主要描述？', '产品技术参数和标准', '价格', '付款方式', '交货期', 'A', NULL),
(@pack_id, 24, '投标保证金一般为投标总价的？', '1%-2%', '5%', '10%', '0.5%', 'A', NULL),
(@pack_id, 25, '以下哪项是废标的情形？', '未按要求签字盖章', '价格偏低', '业绩丰富', '提前交货', 'A', NULL),
(@pack_id, 26, '开标时，工作人员需要？', '公布投标人名称、报价', '当场评审', '立即定标', '退还标书', 'A', NULL),
(@pack_id, 27, '评标方法中，综合评估法通常包含？', '技术分+商务分+价格分', '最低价中标', '抽签', '仅技术分', 'A', NULL),
(@pack_id, 28, '招标人应在中标通知书发出后多少天内签订合同？', '30天', '15天', '45天', '60天', 'A', NULL),
(@pack_id, 29, '政府采购中，单一来源采购的适用条件是？', '只能从唯一供应商处采购', '价格最低', '时间紧迫', '金额小', 'A', NULL),
(@pack_id, 30, '投标文件中，偏离表的作用是？', '说明与招标要求的差异', '报价', '公司介绍', '授权书', 'A', NULL),
(@pack_id, 31, '电子招投标平台中，CA数字证书用于？', '加密和身份认证', '支付', '下载文件', '开票', 'A', NULL),
(@pack_id, 32, '招标人与中标人签订合同时，不得再订立什么？', '背离合同实质性内容的其他协议', '补充协议', '技术协议', '保密协议', 'A', NULL),
(@pack_id, 33, '投标有效期通常为？', '60-90天', '10天', '180天', '一年', 'A', NULL),
(@pack_id, 34, '招标控制价的作用是？', '限制最高投标价', '作为中标价', '作为评标基准', '只供参考', 'A', NULL),
(@pack_id, 35, '谈判前，我方应明确？', '目标、底线、替代方案', '对方底线', '合同文本', '法律条款', 'A', NULL),
(@pack_id, 36, '客户说“价格太高”，最佳回应是？', '分析总拥有成本，体现价值', '马上降价', '说别人更低', '不理会', 'A', NULL),
(@pack_id, 37, '付款方式中，对卖方最有利的是？', '预付款+发货前付清', '货到付款', '月结30天', '承兑汇票6个月', 'A', NULL),
(@pack_id, 38, '在谈判中，“僵局”处理方法之一是？', '换议题，稍后再谈', '让步', '威胁', '退出', 'A', NULL),
(@pack_id, 39, '“BATNA”在谈判中是指？', '最佳替代方案', '最低接受价', '最高出价', '谈判策略', 'A', NULL),
(@pack_id, 40, '面对长期大客户，降价策略应？', '以增量换折扣', '无条件降价', '一次性降价', '不降价', 'A', NULL),
(@pack_id, 41, '谈判记录需要双方确认，因为？', '避免后续争议', '是合同附件', '法律要求', '财务需要', 'A', NULL),
(@pack_id, 42, '在竞争性谈判中，多次报价时，第二次报价应？', '比第一次低但保留利润', '直接底线', '维持不变', '提高', 'A', NULL),
(@pack_id, 43, '渠道销售的优点不包括？', '直接控制终端用户', '扩大覆盖面', '降低自建成本', '利用渠道资源', 'A', NULL),
(@pack_id, 44, '对于电气产品，代理商激励政策通常包括？', '阶梯返点、年终奖励、培训支持', '罚款', '延长账期', '限制销售', 'A', NULL),
(@pack_id, 45, '渠道冲突的表现包括？', '跨区域窜货、价格竞争', '合作共赢', '库存积压', '品牌宣传', 'A', NULL),
(@pack_id, 46, '如何防止代理商窜货？', '产品序列号管理、区域限制、处罚', '降低价格', '减少渠道', '增加广告', 'A', NULL),
(@pack_id, 47, '电气产品的分销商通常需要？', '备有一定库存、技术服务能力', '无要求', '只做仓储', '只做设计', 'A', NULL),
(@pack_id, 48, '开发新的代理商时，首要考察？', '资质、客户资源、信誉', '公司规模', '地理位置', '成立时间', 'A', NULL),
(@pack_id, 49, '渠道经理的KPI可能包括？', '新增代理数、销售额、回款率', '个人性格', '学历', '出勤率', 'A', NULL),
(@pack_id, 50, '电商平台（如阿里巴巴）作为电气销售渠道，优势是？', '触达广泛、低成本', '技术服务强', '大项目优势', '关系营销', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业20：能源方案顾问（电气工程×市场营销）
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_marketing:1', 20, '能源方案顾问', 'major_electrical', 'major_marketing', '电气工程×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '企业能耗审计的第一步是？', '收集历史能耗数据和设备清单', '提出节能方案', '投资估算', '报告撰写', 'A', NULL),
(@pack_id, 2, '某工厂年耗电1000万度，其中电机系统占60%，照明占10%，空调占30%，节能改造应优先针对？', '电机系统', '照明', '空调', '变压器', 'A', '占比最大'),
(@pack_id, 3, '单位产品能耗指标（如kWh/吨）用于？', '纵向对比和行业对标', '电费计算', '纳税', '设备选型', 'A', NULL),
(@pack_id, 4, '电力需量（demand）指的是？', '一段时间内的平均功率', '峰值功率', '用电量', '功率因数', 'A', NULL),
(@pack_id, 5, '需量电费计费方式中，按最大需量收费对用户的意义是？', '通过削峰填谷降低基本电费', '增加电费', '惩罚低负荷', '奖励高负荷', 'A', NULL),
(@pack_id, 6, '功率因数调整电费：当功率因数低于0.9时，用户需？', '交罚款（力调电费增加）', '获得奖励', '不影响', '更换变压器', 'A', NULL),
(@pack_id, 7, '某企业变压器负载率仅为30%，属于？', '大马拉小车，损耗高', '经济负载', '过载', '正常', 'A', NULL),
(@pack_id, 8, '谐波主要来自？', '非线性负载（变频器、UPS）', '电动机', '照明', '电阻炉', 'A', NULL),
(@pack_id, 9, '电能质量监测的常用指标不包括？', '有功功率', '谐波畸变率', '电压闪变', '三相不平衡', 'A', '有功功率不是电能质量指标'),
(@pack_id, 10, '某办公楼的能耗基线通常选择？', '过去12个月数据', '设计值', '行业平均值', '理想值', 'A', NULL),
(@pack_id, 11, '能源管理系统（EMS）的核心功能是？', '实时监测、分析、报警', '自动交电费', '发电', '配电', 'A', NULL),
(@pack_id, 12, '压缩空气系统节能主要关注？', '泄漏率、干燥压降、变频', '电压', '频率', '功率因数', 'A', NULL),
(@pack_id, 13, '某工厂光伏发电自用方案，设计时应优先考虑？', '用电负荷曲线与光伏出力匹配', '最大装机容量', '美观', '成本最低', 'A', NULL),
(@pack_id, 14, '节能改造方案中，静态投资回收期的计算公式是？', '初始投资/年节能收益', '年收益/投资', '投资×年收益', '1/内部收益率', 'A', NULL),
(@pack_id, 15, '某LED改造项目投资10万元，年节电费3万元，维护费用节省0.5万元，则回收期为？', '2.86年', '3.33年', '2年', '4年', 'A', '10/(3+0.5)=2.86'),
(@pack_id, 16, '建筑能耗模拟软件（如EnergyPlus）用于？', '预测能耗和节能效果', '计算电费', '设计电路', '选型设备', 'A', NULL),
(@pack_id, 17, '工业余热回收方案，应考虑？', '余热品位（温度）、量、可用用途', '外观', '噪声', '颜色', 'A', NULL),
(@pack_id, 18, '某方案中提出“更换高效电机”，其节能原理是？', '提高效率，降低损耗', '降低转速', '提高转速', '降低电压', 'A', NULL),
(@pack_id, 19, '以下哪项属于“无成本”节能措施？', '调整设备运行时间，避免大马拉小车', '更换LED灯', '加装变频器', '安装太阳能', 'A', NULL),
(@pack_id, 20, '方案设计中的“能源平衡图”用于？', '可视化能量流向和损耗', '计算电费', '设备清单', '施工图', 'A', NULL),
(@pack_id, 21, '储能系统在方案中的价值不包括？', '增加谐波', '峰谷套利', '需量管理', '备用电源', 'A', NULL),
(@pack_id, 22, '某工厂夜间停工但变压器仍运行，属于？', '变压器空载损耗浪费', '正常', '过载', '合理', 'A', NULL),
(@pack_id, 23, '高效照明方案除了更换灯具，还应考虑？', '智能控制系统（感应、调光）', '增加灯数量', '提高照度', '降低显色性', 'A', NULL),
(@pack_id, 24, '合同能源管理（EMC）中的节能效益分享型，客户的好处是？', '零初始投资，共享节能收益', '全额投资', '风险高', '收益固定', 'A', NULL),
(@pack_id, 25, '与客户初次见面，方案顾问应首先？', '了解客户需求和痛点', '直接报价', '展示公司资质', '签合同', 'A', NULL),
(@pack_id, 26, '客户说“我们已经很节能了”，应如何回应？', '展示同行案例和能效对标差距', '放弃', '降价', '强调产品好', 'A', NULL),
(@pack_id, 27, '方案报价时，可以采取？', '价值定价（基于节能收益）', '成本加成', '竞争定价', '以上都是', 'D', NULL),
(@pack_id, 28, '针对决策者是财务总监，方案强调？', 'IRR、NPV、回收期', '技术先进性', '环保', '品牌', 'A', NULL),
(@pack_id, 29, '解决方案销售中，关键成功因素是？', '建立信任，成为咨询顾问', '最低价格', '最快交货', '最长质保', 'A', NULL),
(@pack_id, 30, '应对竞争对手的恶意低价，策略是？', '突出差异化价值', '同样低价', '退出', '诋毁对手', 'A', NULL),
(@pack_id, 31, '在谈判中，提出开放性问题有利于？', '获取信息', '压制对方', '快速结束', '降价', 'A', NULL),
(@pack_id, 32, '项目投标后，未中标，应？', '请求未中标反馈，改进', '不再联系', '投诉', '降价重投', 'A', NULL),
(@pack_id, 33, '付款方式对方案商有利的是？', '按节点付款（如设备到场、验收）', '全部完工后付款', '分期一年', '无预付款', 'A', NULL),
(@pack_id, 34, '合同中的“节能保证条款”通常约定？', '若未达节能率，方案商赔偿', '客户自行承担', '政府担保', '无需保证', 'A', NULL),
(@pack_id, 35, '国家节能技术改造财政奖励资金，支持方式一般是？', '按节能量补贴', '投资额补贴', '贴息', '税收减免', 'A', NULL),
(@pack_id, 36, '合同能源管理项目免征增值税的政策适用于？', '符合条件的EMC项目', '所有项目', '仅光伏', '仅照明', 'A', NULL),
(@pack_id, 37, '以下哪个是绿色制造政策？', '绿色工厂评价', '环保税', '排污许可', '碳排放交易', 'A', NULL),
(@pack_id, 38, '碳排放权交易对节能方案顾问的启示是？', '节能项目可产生碳资产收益', '无影响', '增加成本', '限制方案', 'A', NULL),
(@pack_id, 39, '某项目申请国家绿色债券，要求？', '项目属于绿色产业目录', '任意项目', '高污染项目', '小型项目', 'A', NULL),
(@pack_id, 40, '地方政府节能专项资金通常要求？', '配套资金、节能量审核', '不需要', '仅报告', '仅发票', 'A', NULL),
(@pack_id, 41, 'ISO 50001能源管理体系认证的作用？', '系统化节能管理，提高能效', '免税', '强制', '补贴', 'A', NULL),
(@pack_id, 42, '“能效领跑者”制度激励？', '最高能效产品', '最低价格', '最大产量', '最长寿命', 'A', NULL),
(@pack_id, 43, '节能方案案例中，应包括？', '基准能耗、措施、节能量、投资回收期', '只有照片', '只有报价', '公司简介', 'A', NULL),
(@pack_id, 44, '案例中节能量验证通常采用？', '国际性能测量与验证规程（IPMVP）', '估算', '用户口头认可', '电费单对比', 'A', NULL),
(@pack_id, 45, '某照明改造案例，使用照度计测量改造前后照度，属于？', '性能验证', '节能计算', '美观评价', '成本核算', 'A', NULL),
(@pack_id, 46, '撰写案例时，客户名称是否公开？', '需获得客户同意', '必须公开', '必须匿名', '无所谓', 'A', NULL),
(@pack_id, 47, '方案中引用第三方检测报告可以？', '增强可信度', '增加篇幅', '替代方案', '无关', 'A', NULL),
(@pack_id, 48, '案例的“挑战与解决方案”结构化叙述有助于？', '展示问题和解决能力', '隐藏缺陷', '缩短篇幅', '降低难度', 'A', NULL),
(@pack_id, 49, '方案提交后，应准备？', '答辩材料，应对技术疑问', '不再跟进', '只等结果', '降价', 'A', NULL),
(@pack_id, 50, '方案成功签约后，作为顾问还需？', '协助实施、验收、持续优化', '收款后结束', '转交他人', '不再参与', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业21：工业品品牌经理 (电气工程×市场营销)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_marketing:2', 21, '工业品品牌经理', 'major_electrical', 'major_marketing', '电气工程×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在B2B工业品品牌建设中，品牌承诺的基石是：', '吸引人的广告语', '产品/服务的实际性能和可靠性', '精美的品牌视觉识别系统', '大规模的市场宣传活动', 'B', NULL),
(@pack_id, 2, '针对电气工程领域的B2B市场，进行品牌定位时，最关键的差异化因素是：', '最低的价格', '最长的保修期', '技术领先性、稳定性或能效优势', '最强大的销售团队', 'C', NULL),
(@pack_id, 3, '进行工业品品牌的市场调研时，以下哪种方法最有助于深入了解客户的隐性需求？', '大规模问卷调查', '焦点小组访谈和深度访谈', '竞争对手官网分析', '社交媒体舆情监控', 'B', NULL),
(@pack_id, 4, '“工业品品牌营销是成本中心而非价值中心”这一观点，品牌经理应如何回应？', '完全认同，并设法削减所有品牌预算', '不认同，并展示品牌资产如何带来溢价、降低销售难度和客户流失率', '保持中立，仅关注短期促销活动', '将品牌预算全部转移到销售提成上', 'B', NULL),
(@pack_id, 5, '在B2B电气行业，以下哪个渠道对于建立专业品牌形象最有效？', '抖音/TikTok娱乐短视频', '行业技术研讨会/展会上的主题演讲', '大众电影贴片广告', '城市公交车身广告', 'B', NULL),
(@pack_id, 6, '品牌经理在进行品牌架构梳理时，发现公司主品牌下有多款针对不同细分市场的子品牌（如高、中、低端）。最佳策略通常是：', '立即砍掉所有子品牌，统一用一个品牌', '让每个子品牌完全独立，不与主品牌关联', '建立清晰的背书品牌或主副品牌关系，明确各自定位', '将所有子品牌的价格调整到同一水平', 'C', NULL),
(@pack_id, 7, '测量工业品品牌健康度的核心指标（KPI）不包括：', '品牌提及率在行业招标文件中的出现频率', '客户自发推荐率（NPS）', '单次广告点击的成本（CPC）', '与主要竞争对手的品牌关联度/偏好度', 'C', NULL),
(@pack_id, 8, '当公司推出一项真正的颠覆性电气技术时，品牌传播策略应侧重于：', '强调自身历史悠久的“传统”形象', '聚焦于“品类教育”，解释新技术的价值，成为品类的代名词', '进行大规模的价格战宣传', '模仿市场领导者的所有营销活动', 'B', NULL),
(@pack_id, 9, '对于电气工程领域的品牌，内容营销最应侧重的内容形式是：', '轻松有趣的办公室短剧', '深度技术白皮书、应用案例和解决方案视频', '创始人个人生活Vlog', '与产品无关的泛娱乐段子', 'B', NULL),
(@pack_id, 10, '品牌经理在处理一次产品偶发性质量危机时，首要原则是：', '立即否认，并指责竞争对手抹黑', '封锁所有消息，不让客户知道', '主动、透明地沟通，公布调查结果和补救措施，维护品牌诚信', '保持沉默，等待事件自行平息', 'C', NULL),
(@pack_id, 11, '“品牌资产”在B2B电气领域最直接的体现是：', '公司大楼的豪华程度', '客户在招标书中将公司品牌写入技术规格（指名采购）', '公司员工数量', '广告投放的总费用', 'B', NULL),
(@pack_id, 12, '品牌经理想了解品牌在客户决策旅程（Buyer\'s Journey）中的影响，应最关注哪个阶段？', '客户产生初步需求，开始搜索信息时', '客户制定短名单（Longlist/Shortlist）时', '客户进行合同细节谈判时', '客户完成付款后', 'B', NULL),
(@pack_id, 13, '在B2B营销中，利用已成交的大客户案例（Success Story）来影响潜在客户，属于哪种策略？', '口碑营销/社交证明', '病毒营销', '价格促销', '公共关系（新闻稿）', 'A', NULL),
(@pack_id, 14, '品牌视觉识别的核心是Logo和：', '办公文具的样式', '品牌色彩与字体规范', '员工工作服款式', '网站动画效果', 'B', NULL),
(@pack_id, 15, '评估品牌重新定位（Rebranding）是否成功，最关键的财务指标是：', '短期销售额的即时增长', '品牌所支撑的毛利率变化和市场份额变化趋势', '更换Logo的市场营销活动总花费', '社交媒体上的点赞和转发量', 'B', NULL),
(@pack_id, 16, '以下哪项不是品牌经理在年度规划中需要制定的核心策略？', '品牌年度传播主题', '重点产品和细分市场的品牌投入优先级', '具体到每个销售人员的每日电话量指标', '关键行业展会和协会的合作计划', 'C', NULL),
(@pack_id, 17, '“解决方案式营销”对品牌意味着：', '只销售标准化的单一产品', '将产品、服务、咨询整合成一套价值包，强化品牌的专业形象', '降低所有产品的价格', '增加售后服务部门的预算', 'B', NULL),
(@pack_id, 18, '品牌经理在进行竞品分析时，不仅分析其产品，还应重点分析其：', '公司食堂的菜品', '品牌定位语、传播渠道和关键信息', '员工的学历构成', '办公地点的选址', 'B', NULL),
(@pack_id, 19, '对于工业品品牌，官网的核心作用是什么？', '在线商城直接销售', '品牌形象展示、产品技术资料中心、和销售线索获取', '公司新闻发布板', '员工内部论坛', 'B', NULL),
(@pack_id, 20, '品牌经理提议赞助一个行业内的技术竞赛，主要目的是：', '提升品牌在年轻工程师群体中的专业影响力和好感度', '短期内大量销售产品', '避税', '消耗多余的预算', 'A', NULL),
(@pack_id, 21, '在品牌信息屋（Message House）中，最顶层的“品牌核心信息”应该是：', '最具体的产品参数', '一个清晰、独特且有吸引力的价值主张', '最新的促销活动内容', '公司创始人的名言', 'B', NULL),
(@pack_id, 22, '当品牌经理发现一个细分市场（如新能源储能）高速增长，但公司品牌在此领域认知度为零时，应优先：', '立即投放大量品牌广告', '集中资源打造一个标杆客户案例，形成行业内的传播突破点', '放弃这个市场', '在所有产品上都打上“新能源”标签', 'B', NULL),
(@pack_id, 23, '测量品牌营销活动带来的“销售线索（Leads）”质量，通常使用：', '线索的总数量', '线索转化为商机和客户的比例', '营销活动的总曝光量', '线索的姓名和电话是否完整', 'B', NULL),
(@pack_id, 24, '品牌经理与销售总监产生分歧，销售总监要求品牌广告必须带上立即购买的链接和折扣码。品牌经理最合适的解释是：', '我们不会做任何促进销售的事', '品牌广告的职能是建立认知和信任，为销售转化铺路，两者需要协同而非直接替代', '折扣会损害品牌形象，永远不能做', '品牌部门不关心销售', 'B', NULL),
(@pack_id, 25, '以下哪项属于“内部品牌建设”的活动？', '对全员进行品牌价值观和行为准则培训', '发布新的产品手册', '更新公司官网首页', '参加行业展会', 'A', NULL),
(@pack_id, 26, '“触点管理”指的是：', '管理所有开关、按钮等物理接触点', '管理与客户在每个互动环节（销售、客服、交付、官网）的品牌体验一致性', '限制客户与公司的接触渠道', '只管理展会这一个触点', 'B', NULL),
(@pack_id, 27, '一个电气品牌声称自己是“绿色”的，但其工厂环保记录不佳。这反映了什么问题？', '品牌定位不清晰', '品牌个性不鲜明', '品牌承诺与实际行动脱节', '品牌名称不吸引人', 'C', NULL),
(@pack_id, 28, '在B2B品牌传播中，“意见领袖（KOL）”通常指：', '拥有千万粉丝的娱乐明星', '行业内的资深专家、协会负责人或知名设计师/总工', '公司的销售冠军', '投资机构的分析师', 'B', NULL),
(@pack_id, 29, '品牌经理使用“品牌追踪调查”的主要目的是：', '找出去年所有广告的错别字', '量化衡量品牌知名度、美誉度、忠诚度等指标的动态变化', '计算每个销售线索的成本', '评估员工的KPI完成情况', 'B', NULL),
(@pack_id, 30, '当竞争对手发起大规模价格战时，品牌经理应建议公司：', '立即无条件跟进降价', '忽视价格战，坚守品牌价值，同时强调总拥有成本（TCO）优势和服务差异化', '退出该产品市场', '起诉竞争对手不正当竞争', 'B', NULL),
(@pack_id, 31, '策划一场行业技术研讨会时，衡量成功的最关键指标是：', '到场人数', '会议提供的餐饮标准', '会后与销售团队跟进的高意向客户（SQL）数量', '会议资料的印刷数量', 'C', NULL),
(@pack_id, 32, '品牌名称从“通用电气”简化为“GE”，属于哪种品牌策略？', '品牌延伸', '品牌更新/重塑', '多品牌策略', '品牌许可', 'B', NULL),
(@pack_id, 33, '“品牌即品类”是品牌管理的最高境界之一，这意味着：', '品牌名成为了该类产品的代名词（如施乐、谷歌）', '品牌只生产一种产品', '品牌从不做广告', '品牌的价格最低', 'A', NULL),
(@pack_id, 34, '品牌经理在进行年度预算分配时，应优先保障哪项开支？', '公司年会的抽奖奖品', '与核心战略客户联合举办的技术交流活动', '无关紧要的节日海报设计费', '办公室绿植租赁', 'B', NULL),
(@pack_id, 35, '“品牌故事”的核心应该是：', '一个虚构的煽情故事', '公司的创业史', '品牌如何为客户解决一个真实且重要的难题', '创始人的八卦新闻', 'C', NULL),
(@pack_id, 36, '测量品牌对销售过程的贡献，可以使用“营销影响力百分比”模型，该模型旨在：', '将所有功劳都归于最后一次点击的广告', '将所有功劳归于品牌广告', '通过算法或调研，合理分配不同营销触点（包括品牌广告）在促成销售中的权重', '不测量品牌对销售的影响', 'C', NULL),
(@pack_id, 37, '品牌经理发现某区域经销商私自降价销售，严重扰乱了品牌价格体系。最佳行动是：', '立即降低所有产品官方价格', '对该经销商进行警告并执行合同约定的处罚，维护品牌价值', '默许该行为，因为能增加销量', '切断与该区域所有经销商的合作', 'B', NULL),
(@pack_id, 38, '在品牌传播中，使用“总拥有成本（TCO）”工具的主要目的是：', '展示产品初始购买价格最低', '向客户证明，虽然产品价格可能较高，但长期使用和运维成本更低，总体更划算', '混淆客户的成本计算', '只适用于低端产品', 'B', NULL),
(@pack_id, 39, '品牌经理应如何处理社交媒体上关于产品的负面评论？', '全部删除', '无视，让其自然沉底', '公开、专业、及时地回应，尝试解决问题，展现品牌负责任的态度', '雇佣水军刷好评覆盖', 'C', NULL),
(@pack_id, 40, '以下哪个指标最能反映品牌的客户忠诚度？', '市场占有率', '客户流失率', '广告点击率', '搜索引擎排名', 'B', NULL),
(@pack_id, 41, '“品牌授权/许可”在电气行业中通常表现为：', '允许其他公司付费使用自己的品牌名来销售其产品', '授权经销商销售产品', '授权员工使用公司Logo', '授权广告公司制作广告', 'A', NULL),
(@pack_id, 42, '品牌经理要评估一个新市场的进入潜力，除了市场容量和增长率，最重要的是分析：', '该市场的平均气温', '现有竞争品牌格局和客户决策标准', '公司的员工食堂满意度', '当地语言的复杂性', 'B', NULL),
(@pack_id, 43, '成功的B2B品牌内容营销，其核心衡量标准是：', '内容的数量', '内容的美观程度', '内容是否为目标受众带来实际价值和专业启发', '内容的娱乐性', 'C', NULL),
(@pack_id, 44, '品牌经理要求销售团队在CRM系统中记录每次与客户沟通时客户提及的品牌信息来源，这是为了：', '监控销售的工作量', '评估不同品牌传播渠道的有效性', '增加销售团队的行政负担', '收集客户的个人隐私信息', 'B', NULL),
(@pack_id, 45, '当公司进行并购后，品牌整合的首要任务是：', '立即更换所有被并购公司的Logo', '确定新的品牌架构和战略，明确各品牌的关系和定位', '裁员以节省成本', '关闭被并购公司的所有业务', 'B', NULL),
(@pack_id, 46, '“品牌体验”不仅仅指购买产品，还包括：', '售前咨询的技术响应速度', '交付的准时性', '售后服务的质量和态度', '以上都是', 'D', NULL),
(@pack_id, 47, '品牌经理利用“波特五力模型”分析行业时，主要目的是：', '设计新的品牌Logo', '评估品牌的竞争环境和吸引力', '计算产品成本', '招聘新员工', 'B', NULL),
(@pack_id, 48, '品牌经理在制定年度计划时，SWOT分析中的“T”代表：', '技术 (Technology)', '团队 (Team)', '威胁 (Threats)', '培训 (Training)', 'C', NULL),
(@pack_id, 49, '公司有一款技术领先但价格昂贵的新产品，品牌传播策略最适合采用：', '大众媒体轰炸', '精准定向行业内技术专家和决策者，以技术白皮书和意见领袖证言为主', '拼多多式低价拼团', '电视购物广告', 'B', NULL),
(@pack_id, 50, '品牌经理的最终责任人是：', '销售总监', '公司CEO/董事会', '市场部实习生', '广告公司', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业22：电力系统优化建模 (电气工程×数据科学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_ds:0', 22, '电力系统优化建模', 'major_electrical', 'major_ds', '电气工程×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '电力系统优化调度的核心目标是：', '最大化电网公司利润', '在满足安全约束的前提下，最小化总发电成本或最大化社会福利', '最小化所有用户的用电量', '让所有发电机组都满负荷运行', 'B', NULL),
(@pack_id, 2, '在电力系统机组组合（UC）问题中，0-1整数变量通常用于表示：', '发电机的有功功率输出', '发电机的启停状态', '线路的潮流', '节点的电压相角', 'B', NULL),
(@pack_id, 3, '以下哪个是电力系统经济调度（ED）问题中的典型约束条件？', '发电机的爬坡率约束', '最小启停时间约束', '功率平衡约束', '网络安全约束 (N-1)', 'C', NULL),
(@pack_id, 4, 'Python中用于求解线性规划和混合整数线性规划问题的常用开源库是：', 'PyTorch', 'Django', 'PuLP 或 Pyomo', 'NumPy', 'C', NULL),
(@pack_id, 5, '“N-1”安全准则在电力系统优化建模中通常体现为什么类型的约束？', '等式约束', '不等式约束，对预想故障后的系统状态进行限制', '目标函数的一部分', '初始条件', 'B', NULL),
(@pack_id, 6, '在含有高比例可再生能源的系统中，引入“不确定性”建模，常采用哪种优化方法？', '确定性的机组组合', '随机优化或鲁棒优化', '线性规划', '动态规划（仅限小规模）', 'B', NULL),
(@pack_id, 7, '交流最优潮流（AC-OPF）与直流最优潮流（DC-OPF）的主要区别在于：', 'AC-OPF 忽略线路电阻， DC-OPF 考虑无功功率', 'AC-OPF 是线性模型， DC-OPF 是非线性模型', 'AC-OPF 精确建模有功、无功、电压，是非凸非线性问题；DC-OPF是线性近似', 'AC-OPF 只用于规划， DC-OPF 只用于实时调度', 'C', NULL),
(@pack_id, 8, '在Python中，调用商业求解器（如Gurobi或CPLEX）来求解大规模UC问题，通常需要：', '编写C++代码', '安装求解器许可证并安装其Python接口', '仅使用Excel Solver', '手动进行迭代计算', 'B', NULL),
(@pack_id, 9, '“爬坡率”约束是指：', '发电机只能向上爬坡，不能向下', '发电机在两个连续时段之间的有功出力变化不能超过一个限值', '发电机电压的变化速率', '线路潮流的上升速率', 'B', NULL),
(@pack_id, 10, '以下哪种数据格式常用于存储和交换电力系统网络模型数据？', 'JSON', 'CSV', 'PSS/E RAW 或 CIM XML', 'MP3', 'C', NULL),
(@pack_id, 11, '在优化建模中，辅助变量通常用于：', '简化目标函数的表达', '将非线性的逻辑约束或复杂约束转化为线性形式', '增加模型的复杂度', '代表已知参数', 'B', NULL),
(@pack_id, 12, '对于一个包含风电场的系统，如果使用场景法进行随机机组组合，每个场景代表：', '一台发电机的故障', '一种可能的风电出力时序', '一种电价预测值', '一种负荷预测值', 'B', NULL),
(@pack_id, 13, '“安全约束机组组合（SCUC）”比普通机组组合多了哪种约束？', '发电机的出力上下限', '线路的潮流越限约束（包括N-1情况）', '机组的启停成本', '负荷的功率因数', 'B', NULL),
(@pack_id, 14, 'Python中，Pandas库主要用于：', '构建优化模型', '进行数据分析和处理（如读取CSV、处理时间序列）', '绘制网络拓扑图', '调用求解器', 'B', NULL),
(@pack_id, 15, '电力系统分时电价的优化，属于以下哪个范畴？', '发电侧优化', '输电网规划', '需求侧响应管理', '继电保护整定', 'C', NULL),
(@pack_id, 16, '在Python中，用于绘制电力系统单线图或优化结果曲线图最常用的库是：', 'Matplotlib / Plotly', 'OpenCV', 'Tkinter', 'Scrapy', 'A', NULL),
(@pack_id, 17, '“机组组合”问题通常的求解时间尺度是：', '毫秒级', '秒级', '分钟级到小时级（针对日前调度）', '年级', 'C', NULL),
(@pack_id, 18, '内点法（Interior Point Method）常用于求解哪种类型的优化问题？', '只有整数变量的问题', '大规模非线性或线性连续优化问题（如OPF）', '组合爆炸的组合优化问题', '无约束最优化问题', 'B', NULL),
(@pack_id, 19, '在建模储能系统（如电池）的充放电行为时，常引入一对0-1变量来避免：', '储能过压', '同时充放电', '储能容量过大', '充放电效率为1', 'B', NULL),
(@pack_id, 20, '“拉格朗日松弛法”是求解大规模UC问题的一种经典方法，其核心思想是：', '将问题分解为多个子问题，通过松弛耦合约束（如功率平衡）来协调', '对所有变量都取整', '将所有约束都去掉', '只考虑一个发电机', 'A', NULL),
(@pack_id, 21, '在电力市场环境下，优化建模的目标函数通常是：', '发电成本最小', '消费者购电支出最大', '社会福利最大化（消费者剩余+生产者剩余）', '电网公司收入最大', 'C', NULL),
(@pack_id, 22, '进行电力系统多年扩展规划时，优化模型需要处理的核心问题是：', '每小时的负荷波动', '多阶段投资决策和负荷/新能源的逐年增长', '毫秒级的暂态稳定', '单个设备的详细参数', 'B', NULL),
(@pack_id, 23, 'Python的PyPSA或PowerModels库是什么？', '图形界面软件', '专用的电力系统优化建模和仿真工具包', '数据库软件', '网页开发框架', 'B', NULL),
(@pack_id, 24, '“凸松弛”技术在电力系统优化中的作用是：', '使问题更难求解', '将非凸问题（如AC-OPF）松弛为凸问题，以获得高质量解或下界', '增加变量的个数', '将连续变量转化为整数变量', 'B', NULL),
(@pack_id, 25, '在优化结果分析中，“影子价格”是指：', '设备的市场售价', '约束右端项每变动一个单位时，目标函数值的变化量', '发电燃料的影子成本', '优化求解所需的时间成本', 'B', NULL),
(@pack_id, 26, '对于一个已经建立好的线性规划模型，其对偶问题的解可以提供什么信息？', '原始问题的最优解', '各约束的边际成本（影子价格）', '模型的可行性', '变量的整数性', 'B', NULL),
(@pack_id, 27, '在风-储联合系统中进行优化调度，储能的作用通常被建模为：', '一个固定负荷', '一个随时间变化的状态变量，带有能量平衡约束和充放电约束', '一个无限容量的电源', '一个纯粹的财务账户', 'B', NULL),
(@pack_id, 28, '“混合整数线性规划 (MILP)” 相比 “线性规划 (LP)” ，求解难度和耗时通常：', '更小', '相同', '更大，可能呈指数级增长', '完全无法求解', 'C', NULL),
(@pack_id, 29, '在Python中，使用求解器求解后，通过哪种方式获取最优的机组启停计划？', '读取求解器的状态文件', '访问模型对象中对应决策变量的var.X 或 .value属性', '重新手动计算一次', '查看求解器的log输出', 'B', NULL),
(@pack_id, 30, '在处理大规模电力系统数据时，使用HDF5而不是CSV的主要优势是：', '可以用Excel打开', '二进制格式，读写更快，支持高效的分块和压缩', '格式更易读', '不需要安装任何库', 'B', NULL),
(@pack_id, 31, '“直流潮流”模型忽略了以下哪个电气特性？', '节点电压幅值', '线路电阻', '无功功率', '以上都是', 'D', NULL),
(@pack_id, 32, '进行“传输阻塞管理”的优化模型，其核心作用是：', '增加阻塞线路的容量', '重新调度发电机出力，以缓解线路过载，并最小化调整成本', '关闭所有重载线路', '降低所有发电机的出力', 'B', NULL),
(@pack_id, 33, '在Python中，numpy库在优化建模前期的数据处理中主要扮演什么角色？', '构建和求解模型', '进行高效的数值数组运算', '绘制网络拓扑', '读取PDF文件', 'B', NULL),
(@pack_id, 34, '一个优化模型如果在求解时显示“infeasible”，意味着：', '找到了最优解', '模型没有可行解，即约束条件相互矛盾', '模型变量太多', '目标函数值无穷大', 'B', NULL),
(@pack_id, 35, '“日前市场”的优化模型通常以什么为单位进行调度？', '年', '月', '周', '小时 (或半小时/15分钟)', 'D', NULL),
(@pack_id, 36, '在实时经济调度中，通常采用“基于优先顺序法”或“等微增率准则”，这对应于求解一个什么样的优化问题？', '考虑整数变量的MILP', '忽略网络约束和整数变量的经典ED问题', '随机优化问题', '多目标优化问题', 'B', NULL),
(@pack_id, 37, 'Python的gurobipy库是什么？', '一个画图库', 'Gurobi求解器的Python接口', '一个数据爬虫库', '一个机器学习库', 'B', NULL),
(@pack_id, 38, '在优化模型中，要表达“如果x > 0，则 y = 1；否则 y = 0”的逻辑关系，通常需要引入什么？', '非线性函数', '一个大常数M和额外的线性不等式约束（大M法）', '不能表达', '将x除以它自身', 'B', NULL),
(@pack_id, 39, '“备用容量约束”要求在模型中的含义是：', '所有发电机必须满发', '必须预留一部分可快速调用的发电容量以应对突发事件', '所有线路都要有备用', '用户必须节约用电', 'B', NULL),
(@pack_id, 40, '以下哪种“启停成本”建模方式是准确的？', '与机组出力无关的固定成本', '与机组停机时间长度相关的成本', '可能包含热启动成本和冷启动成本', '以上都是', 'D', NULL),
(@pack_id, 41, '“鲁棒优化”在处理风电不确定性时，通常采用什么方式来描述不确定性？', '大量的离散场景', '一个不确定集（例如，风电出力在一个已知的区间内波动），优化最坏情况下的表现', '假设风电出力是确定的', '忽略风电', 'B', NULL),
(@pack_id, 42, '在输电网扩展规划中，优化变量通常包括：', '新增输电线路的投建决策（0-1变量）', '发电机的短期出力', '用户的实时电价', '天气预报数据', 'A', NULL),
(@pack_id, 43, 'Python的matplotlib.pyplot库在优化项目中的一项典型应用是：', '求解线性方程组', '可视化机组出力计划或节点电价分布', '连接数据库', '进行机器学习训练', 'B', NULL),
(@pack_id, 44, '“松弛（Slack）变量”在优化模型中的作用是：', '使模型更复杂', '将不等式约束转化为等式约束，并提供了一个诊断模型不可行性的工具', '提高求解速度', '表示设备的松紧程度', 'B', NULL),
(@pack_id, 45, '在Python中，使用time或timeit模块的主要目的是：', '设置定时关机', '测量代码或优化求解过程的运行时间', '同步系统时间', '创建时间序列数据', 'B', NULL),
(@pack_id, 46, '进行“概率潮流”计算，与“优化”的关系是：', '概率潮流是一种确定性优化方法', '概率潮流结果可作为优化模型的输入（如机会约束规划）', '两者完全没有关系', '优化是概率潮流的一种特例', 'B', NULL),
(@pack_id, 47, '“Unit Commitment” (UC) 和 “Economic Dispatch” (ED) 的关系是：', 'UC和ED是同一个问题', '在调度时间尺度上，UC（小时前决定启停）先于ED（实时分配负荷）', 'ED决定了启停，UC决定了出力', '两者互相独立', 'B', NULL),
(@pack_id, 48, '对于一个给定的MILP模型，设置“MIP Gap”为1%的含义是：', '求解器找到的解与最优解的偏差保证在1%以内时停止', '模型有1%的概率不可行', '变量可以被舍入到1%的精度', '求解器只使用1%的CPU', 'A', NULL),
(@pack_id, 49, '“混合整数非线性规划 (MINLP)”在电力系统中的应用，例如：', '考虑非线性潮流的机组组合', '线性规划', '只考虑连续变量的规划', '只有整数变量的规划', 'A', NULL),
(@pack_id, 50, '作为优化建模工程师，发现优化结果中存在“机组频繁启停”的锯齿状现象，应如何改进模型？', '增加最小启停时间约束或启停成本', '放松爬坡率约束', '提高所有机组的最大出力', '忽略这个现象', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业23：设备预测维护工程师 (电气工程×数据科学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_ds:1', 23, '设备预测维护工程师', 'major_electrical', 'major_ds', '电气工程×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '设备预测性维护的核心思想是：', '定期更换所有部件', '设备发生故障后再维修', '基于设备实时状态数据预测其剩余寿命或潜在故障，并在最佳时机进行维护', '从不进行任何维护', 'C', NULL),
(@pack_id, 2, '在预测维护中，SCADA系统主要提供哪类数据？', '设备的历史维修文本记录', '设备的实时运行参数（如电流、电压、温度、振动）', '设备的备件库存清单', '操作人员的排班表', 'B', NULL),
(@pack_id, 3, '振动分析通常用于预测哪一类设备的故障？', '变压器的绝缘老化', '旋转设备（如电机、风机、泵）的轴承、齿轮故障或不平衡', '断路器的触头磨损', '电缆的局部放电', 'B', NULL),
(@pack_id, 4, '以下哪个算法最适合用于时间序列数据的异常检测？', '决策树分类器', 'K-均值聚类', '循环神经网络 (RNN/LSTM) 或 Isolation Forest', '线性回归', 'C', NULL),
(@pack_id, 5, '“剩余使用寿命 (RUL)”预测问题通常被建模为：', '分类问题 (正常/故障)', '回归问题 (预测一个连续数值，即剩余时间)', '聚类问题', '关联规则挖掘', 'B', NULL),
(@pack_id, 6, '在特征工程中，从原始振动信号中提取均方根值(RMS)、峰值、峭度等统计量，属于：', '数据清洗', '特征提取', '数据可视化', '模型训练', 'B', NULL),
(@pack_id, 7, '对于类别不平衡的数据集（如故障样本远少于正常样本），在训练分类模型时应采用：', '直接训练，不做任何处理', '欠采样（删除多数类样本）、过采样（复制少数类样本，如SMOTE）或调整类别权重', '增加更多无关特征', '使用线性回归', 'B', NULL),
(@pack_id, 8, 'SCADA数据通常存在的常见问题不包括：', '数据缺失', '数据噪声和离群点', '多源数据时间戳不对齐', '数据格式是标准的JSON且完美无缺', 'D', NULL),
(@pack_id, 9, 'Python中用于机器学习的核心库是：', 'Scikit-learn', 'Matplotlib', 'Requests', 'BeautifulSoup', 'A', NULL),
(@pack_id, 10, '“健康因子 (Health Indicator, HI)” 是一个从0到1的归一化指标，通常：', '1代表完全故障，0代表全新状态', '0代表完全故障，1代表全新状态', '始终为0.5', '与设备健康无关', 'B', NULL),
(@pack_id, 11, '对于风机桨叶的覆冰预测，哪种数据最为关键？', '电网频率', '气象数据（温度、湿度、风速）和风机功率曲线异常', '油的色谱分析', '继电保护动作次数', 'B', NULL),
(@pack_id, 12, '“混淆矩阵”用于评估分类模型，其中的“假阳性 (False Positive)”是指：', '模型预测正常，实际故障', '模型预测故障，实际正常', '模型预测正常，实际正常', '模型预测故障，实际故障', 'B', NULL),
(@pack_id, 13, '在预测维护中，“提前时间”是一个重要概念，它指的是：', '从模型训练到部署的时间', '从发出维护警报建议到实际发生故障的时间窗口', '设备从启动到稳定运行的时间', '数据采集的间隔时间', 'B', NULL),
(@pack_id, 14, '降维技术（如PCA、t-SNE）在预测维护项目中的作用是：', '增加数据量', '提高模型预测精度，减少冗余特征，或实现高维数据可视化', '降低数据采集频率', '自动生成维修工单', 'B', NULL),
(@pack_id, 15, '对于轴承故障的早期诊断，哪种信号处理方法最有效？', '傅里叶变换 (FFT) 分析频谱中的特征频率', '直接看原始电压值', '计算平均值', '文本分析', 'A', NULL),
(@pack_id, 16, '利用SCADA数据中的“功率-风速”散点图偏离标准曲线，可以用来预测：', '发电机轴承故障', '叶片气动性能下降或偏航系统对风不准', '变压器油温过高', '电缆绝缘损坏', 'B', NULL),
(@pack_id, 17, 'Python中pandas库的resample()函数主要用于：', '对数据进行重采样，改变时间频率（如从秒级变为分钟级）', '随机抽取样本', '增加噪声', '删除重复数据', 'A', NULL),
(@pack_id, 18, '“在线预测维护”与“离线分析”的主要区别是：', '在线需要实时处理流式数据并发出预警，对延迟要求高', '在线不需要模型', '离线无法处理历史数据', '两者没有区别', 'A', NULL),
(@pack_id, 19, '评估回归模型（如RUL预测）性能的常用指标不包括：', '均方根误差 (RMSE)', '平均绝对误差 (MAE)', '准确率 (Accuracy)', '决定系数 (R²)', 'C', NULL),
(@pack_id, 20, '在数据预处理中，处理缺失值的方法通常不包括：', '删除含有缺失值的行或列', '用均值、中位数或前后值填充', '使用插值法', '将所有缺失值替换为0，不管任何情况', 'D', NULL),
(@pack_id, 21, '“一维卷积神经网络 (1D-CNN)”常用于：', '图像识别', '直接从原始传感器信号（如振动）中自动学习特征', '自然语言翻译', '棋盘游戏', 'B', NULL),
(@pack_id, 22, '对于一个新部署的预测模型，“预警准确率”是指：', '所有预警中，真正发生故障的比例', '所有故障中，成功预警的比例', '模型训练花费的时间', '模型文件的大小', 'A', NULL),
(@pack_id, 23, '在工业物联网中，边缘计算对于预测维护的意义在于：', '所有数据都必须传回云端处理', '在数据源附近（如设备端）进行初步分析和特征提取，降低数据传输和云端计算压力', '完全不进行计算', '只用于娱乐', 'B', NULL),
(@pack_id, 24, '“PHM”是预测与健康管理的英文缩写，其“健康管理”部分主要指：', '对设备进行体检', '根据预测结果，做出维护决策（何时修、修什么、怎么修）', '购买健康保险', '更换所有设备', 'B', NULL),
(@pack_id, 25, '比较两个不同预测模型时，除了预测精度，还应考虑：', '模型作者的名气', '模型的可解释性和计算资源消耗', '模型代码的行数', '模型使用的变量名是否漂亮', 'B', NULL),
(@pack_id, 26, '对于电机的定子匝间短路故障，以下哪个SCADA参数最敏感？', '环境温度', '三相电流的不平衡度', '电网电压的谐波含量', '冷却风机的转速', 'B', NULL),
(@pack_id, 27, 'Python中matplotlib库的subplot()功能用于：', '提交子任务', '在一个画布上绘制多个子图，便于对比分析', '创建子字符串', '定义子函数', 'B', NULL),
(@pack_id, 28, '“迁移学习”在预测维护中可能的应用场景是：', '从无到有训练一个模型', '将在一个设备（如A型号风机）上训练的模型，迁移到相似设备（B型号风机）上，减少训练数据需求', '删除所有数据', '只使用一个数据样本训练', 'B', NULL),
(@pack_id, 29, '对于变压器油中溶解气体分析(DGA)数据，其预测的故障类型通常是：', '机械磨损', '绝缘热性或电性故障', '冷却系统堵塞', '分接开关卡涩', 'B', NULL),
(@pack_id, 30, '建立一个预测模型时，将数据集划分为训练集、验证集和测试集的目的是：', '增加工作量', '分别用于训练模型、调整超参数、评估最终模型的泛化能力', '让数据看起来更多', '没有任何目的', 'B', NULL),
(@pack_id, 31, '“递归特征消除 (RFE)”是一种：', '数据增强方法', '特征选择方法，递归地训练模型并移除最不重要的特征', '模型集成方法', '数据归一化方法', 'B', NULL),
(@pack_id, 32, '如果监测到一台离心泵的振动频谱中出现了明显的2倍频分量，最可能的故障是：', '轴承故障', '不对中', '转子不平衡', '叶轮汽蚀', 'B', NULL),
(@pack_id, 33, '以下哪种模型天然具有较好的可解释性，便于工程师理解故障原因？', '深度神经网络', '梯度提升树 (如XGBoost) 结合SHAP值', '50层CNN', '大型Transformer模型', 'B', NULL),
(@pack_id, 34, '处理SCADA数据中的“坏点”（如瞬间超出物理极限的尖峰），常用的方法是：', '保留原样', '使用中值滤波或限幅处理', '将整个序列删除', '加上一个随机数', 'B', NULL),
(@pack_id, 35, '在数据科学项目中，版本控制（如Git）主要用于：', '控制Python的版本', '管理代码、模型和实验的版本，便于回溯和协作', '控制设备运行的电压版本', '控制数据采集的频率', 'B', NULL),
(@pack_id, 36, '“SHAP”或“LIME”方法在预测维护模型中的作用是：', '提高模型精度', '解释单个样本的预测结果，说明哪些特征导致了模型做出该判断', '加速模型训练', '压缩模型大小', 'B', NULL),
(@pack_id, 37, '预测维护项目成功落地的关键，除了技术模型外，最重要的是：', '拥有超级计算机', '与维护流程、维修工单系统整合，并提供清晰的行动建议', '模型的AUC达到1.0', '使用最新的编程语言', 'B', NULL),
(@pack_id, 38, '对于周期性运转的设备（如冲压机），提取振动信号的有效值（RMS）时，应：', '在整个时间段内取平均', '针对每个工作循环截取稳定工作阶段的数据进行分析', '只在设备停机时测量', '随机采样', 'B', NULL),
(@pack_id, 39, 'Python中joblib库常用于：', '任务调度', '高效地将训练好的scikit-learn模型保存到磁盘和加载', '并行计算', '网络请求', 'B', NULL),
(@pack_id, 40, '“辛普森悖论”在分析设备数据时提醒我们：', '数据越多越好', '整体趋势与分组后的趋势可能完全相反，需要警惕混杂变量', '只能看整体趋势', '只能看分组趋势', 'B', NULL),
(@pack_id, 41, '对于制冷压缩机的“液击”故障，预测模型需要重点关注哪些参数？', '排气压力和温度、吸气过热度', '电网频率', '润滑油的颜色', '厂房内的噪音水平', 'A', NULL),
(@pack_id, 42, '“F1分数”是精确率和召回率的调和平均，在故障预测中，它比单独使用准确率更好的原因是：', 'F1分数计算更简单', '它能更好地平衡故障漏报和误报，特别是在数据不平衡时', '准确率总是等于F1分数', '准确率无法计算', 'B', NULL),
(@pack_id, 43, '为了验证模型是否能在不同工况下都能有效工作，应该使用什么类型的数据进行测试？', '与训练数据完全相同的工况数据', '包含多种不同负荷、环境温度等工况的独立测试集', '所有数据都用来训练', '只有故障数据', 'B', NULL),
(@pack_id, 44, '“自编码器 (Autoencoder)”在预测维护中常用于：', '分类', '无监督的异常检测，通过重构误差来判断是否异常', '回归', '数据增强', 'B', NULL),
(@pack_id, 45, '对于工程师而言，将复杂的模型预测结果（如RUL的概率分布）可视化，最有效的方式是：', '显示一个模糊的数字', '显示一个随时间变化的趋势线，并附上置信区间和阈值线', '只显示“正常”或“故障”', '显示模型的所有参数', 'B', NULL),
(@pack_id, 46, '在部署模型后，进行“模型漂移”监测，是为了：', '检查模型文件是否被移动', '检测数据分布是否随时间发生变化，导致模型性能下降', '改变模型的输出', '卸载模型', 'B', NULL),
(@pack_id, 47, '对于一台工业机器人，预测其减速机故障，最关键的传感器数据是：', '各关节的电流和振动', '环境湿度', '控制柜CPU温度', '电源电压', 'A', NULL),
(@pack_id, 48, '“基准 (Baseline) 模型”的作用是：', '最终的商用模型', '一个简单模型（如预测历史平均值），用于证明复杂模型的优越性', '最复杂的模型', '用于数据清洗的模型', 'B', NULL),
(@pack_id, 49, '数据可视化在EDA（探索性数据分析）阶段的主要目的是：', '生成漂亮的报告', '理解数据分布、发现异常值、观察变量之间的关系', '替代模型训练', '自动修理设备', 'B', NULL),
(@pack_id, 50, '预测维护工程师向管理层汇报时，最应该强调的价值点是：', '模型的算法多么先进', '项目带来的量化收益：减少非计划停机时间、降低备件库存、提高生产效率', '使用了多少种编程语言', '代码有多少行', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业24：电力系统优化建模 (电气工程×数据科学) [注：与专业22不同内容]
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_ds:2', 24, '电力系统优化建模', 'major_electrical', 'major_ds', '电气工程×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '安全约束机组组合（SCUC）与安全约束经济调度（SCED）的主要区别在于SCUC需要处理：', '网络潮流约束', '机组启停状态的整数变量', '负荷平衡约束', '备用约束', 'B', NULL),
(@pack_id, 2, '在Python中使用Pyomo建模，定义模型为model = ConcreteModel()后，下一步通常是：', '求解模型', '定义决策变量、目标函数和约束', '打印结果', '导入数据', 'B', NULL),
(@pack_id, 3, '在最优潮流问题中，节点电压幅值和相角是哪种类型的变量？', '整数变量', '0-1变量', '连续变量', '字符串变量', 'C', NULL),
(@pack_id, 4, '当使用“大M法”将逻辑约束转化为线性约束时，若M值选取过大，可能导致：', '模型不可行', '数值不稳定或求解困难', '求解速度变快', '自动忽略该约束', 'B', NULL),
(@pack_id, 5, '“机组组合”问题中，最小启停时间约束是为了防止：', '机组出力波动', '机组过于频繁地启停，造成机械磨损和成本增加', '机组电压过低', '机组燃料不足', 'B', NULL),
(@pack_id, 6, '以下哪个Python库专门用于定义和分析电力系统网络模型，并能与优化求解器结合？', 'Pandas', 'Scikit-learn', 'PyPSA', 'Flask', 'C', NULL),
(@pack_id, 7, '在电力市场出清模型中，节点边际电价(LMP)由哪三部分构成？', '发电成本、输配电价、政府基金', '能量分量、阻塞分量、网损分量', '有功电价、无功电价、备用电价', '峰时电价、平时电价、谷时电价', 'B', NULL),
(@pack_id, 8, '对于一个线性规划问题，如果最优解存在，则它一定可以在什么位置达到？', '可行域内部任意点', '可行域的顶点（极点）', '坐标原点', '无穷远处', 'B', NULL),
(@pack_id, 9, '在处理风电场出力不确定性时，如果采用“鲁棒优化”方法，得到的调度计划通常会：', '更为冒险，期望成本最低', '更为保守，能应对所有预设不确定集内的最坏情况', '与确定性优化完全相同', '无法求解', 'B', NULL),
(@pack_id, 10, '使用Python的pandas库，从CSV文件读取数据用pd.read_csv()，将数据写入CSV文件用：', 'pd.write_csv()', 'df.to_csv()', 'pd.save_csv()', 'df.export_csv()', 'B', NULL),
(@pack_id, 11, '在电力系统扩展规划中，常使用“投资成本”和“运行成本”加权和最小为目标，这属于：', '单目标优化', '多目标优化，但通过权重法转化为单目标', '无目标优化', '随机优化', 'B', NULL),
(@pack_id, 12, '“凸优化”在电力系统中的应用优势是：', '任何局部最优解就是全局最优解', '只能求解线性问题', '求解速度总是很慢', '无法处理整数变量', 'A', NULL),
(@pack_id, 13, '构建一个优化模型，当涉及到天然气网络和电力网络耦合（如气电机组）时，需要增加：', '更复杂的Python语法', '天然气系统的节点平衡和管道流量约束', '更多的计算机内存', '无，两者独立', 'B', NULL),
(@pack_id, 14, '在Python中，使用matplotlib.pyplot.plot()函数时，如果不调用plt.show()，结果是：', '图形直接显示出来', '图形被保存为文件', '图形不会显示，需要此命令来渲染和显示', '程序会报错', 'C', NULL),
(@pack_id, 15, '“爬坡备用”约束通常要求系统内快速响应机组的可上调容量大于某个阈值，这属于：', '等式约束', '不等式约束', '目标函数', '边界条件', 'B', NULL),
(@pack_id, 16, '对于双碳目标下的电力系统规划，优化模型中必须增加：', '员工KPI指标', '碳排放总量或强度的约束，以及CCS（碳捕集）等技术的模型', '公司利润最大化目标', '所有机组都燃煤', 'B', NULL),
(@pack_id, 17, '在Python中，np.linspace(0, 10, 5) 会产生一个包含几个元素的数组？', '4', '5', '10', '11', 'B', NULL),
(@pack_id, 18, '“线性化”技术在电力系统优化建模中，常用于处理：', '线性的目标函数', '非线性的约束（如分段线性成本曲线、天然气管道流量方程）', '整数变量', '数据读取', 'B', NULL),
(@pack_id, 19, '对于一个MILP模型，求解器输出的MIPGap为0%意味着：', '找到了问题的最优解', '没有找到可行解', '模型有错误', '目标函数值为0', 'A', NULL),
(@pack_id, 20, '“基于场景的随机规划”中，场景数量对求解的影响是：', '场景越多，模型规模越小', '场景越多，模型规模线性或指数级增长，求解越困难', '场景数量不影响求解', '场景越少，结果越精确', 'B', NULL),
(@pack_id, 21, '在电力系统优化中，将“电压安全”约束加入模型，通常表现为：', '对节点电压幅值的上下限约束', '对电流的约束', '对功率的约束', '对频率的约束', 'A', NULL),
(@pack_id, 22, '以下哪个是用于定义优化模型目标的常用关键字（在PuLP中）？', 'prob += ...', 'prob.set_objective(...)', '两者都是常见方式', '没有特定方式', 'C', NULL),
(@pack_id, 23, '“切负荷”变量在电力系统优化模型中代表了：', '可以随意丢弃的负荷', '当系统无法满足全部负荷时，被迫切除的负荷量，通常带有很高的惩罚成本', '用户自愿减少的负荷', '电能的存储量', 'B', NULL),
(@pack_id, 24, '使用gurobipy创建变量时，vtype=GRB.BINARY 表示创建一个：', '连续变量', '整数变量', '二进制（0-1）变量', '字符串变量', 'C', NULL),
(@pack_id, 25, '“启发式算法”（如遗传算法）与精确算法（如分支定界法）相比，特点是：', '总能找到全局最优解', '求解速度可能更快，但解的精度无保证', '只适用于线性问题', '不需要建模', 'B', NULL),
(@pack_id, 26, '在Python中处理优化结果时，如果输出是一个pandas.DataFrame，你可以很容易地：', '对其进行排序、筛选和绘图', '直接输入到PLC', '转化为音频', '压缩成ZIP文件', 'A', NULL),
(@pack_id, 27, '“失负荷概率 (LOLP)”和“期望缺供电量 (EENS)”是可靠性评估指标，它们可以：', '作为优化模型的目标或约束，权衡经济性与可靠性', '完全独立于优化模型', '无法量化', '只用于事后分析', 'A', NULL),
(@pack_id, 28, '将优化模型部署到生产环境时，通常需要一个：', '更好的打印机', '调度器或API服务，来接收数据输入并返回优化结果', '更亮的显示器', '安静的工作环境', 'B', NULL),
(@pack_id, 29, '“交流潮流模型”的非凸性主要来源于：', '欧姆定律', '节点功率平衡方程中的正弦和余弦函数，以及电压变量的乘积项', '基尔霍夫电流定律', '能量守恒定律', 'B', NULL),
(@pack_id, 30, '为了加速MILP求解，通常可以采取的策略不包括：', '提供一个好的初始可行解', '添加有效不等式（切割平面）', '增加更多的整数变量', '简化或聚合约束', 'C', NULL),
(@pack_id, 31, '在优化模型中，需求侧响应（DR）可以通过什么方式建模？', '作为固定负荷', '作为可转移或可削减的负荷，其成本与削减量/转移量相关', '作为电源', '无法建模', 'B', NULL),
(@pack_id, 32, 'Python中用于科学计算的基础库，提供了多维数组对象ndarray，它是：', 'NumPy', 'Pandas', 'Matplotlib', 'SciPy', 'A', NULL),
(@pack_id, 33, '“多目标优化”中，帕累托前沿（Pareto Front）上的点代表：', '最差的解', '无法在不恶化一个目标的情况下改进另一个目标的解', '所有目标都达到最优的解', '只优化一个目标', 'B', NULL),
(@pack_id, 34, '对于一个电力系统优化模型，灵敏度分析可以告诉我们：', '模型代码的行数', '哪个参数的变化对目标函数值影响最大', '操作系统的版本', '最优解的数值', 'B', NULL),
(@pack_id, 35, '在调用求解器求解结束后，检查Status属性为Optimal，表示：', '模型有错误', '找到了最优解', '模型无可行解', '模型无界', 'B', NULL),
(@pack_id, 36, '“线性决策规则”在处理不确定性优化时，将决策变量表示为随机变量的线性函数，其优点是：', '总是能得到全局最优', '将随机规划问题转化为一个确定性的、可以高效求解的优化问题', '可以处理所有非线性', '无需任何数据', 'B', NULL),
(@pack_id, 37, 'Python中，如果想创建一个生成器表达式，类似于列表推导式但使用圆括号，它的优点是：', '可以索引', '惰性求值，节省内存', '运行速度更快', '语法错误更少', 'B', NULL),
(@pack_id, 38, '在“鲁棒优化”中，不确定集的大小（如盒式不确定集的半径）反映了：', '决策者的风险偏好和对不确定性的认知程度', '数据的采集频率', '求解器的版本', '计算机的CPU主频', 'A', NULL),
(@pack_id, 39, '将优化结果（如机组出力计划）导出后，进行可视化，常用于对比分析的是：', '饼图', '堆叠面积图或甘特图', '词云', '3D散点图', 'B', NULL),
(@pack_id, 40, '为了确保优化模型能反映电力市场规则，出清模型必须包含：', '所有的输电线参数', '基于报价的优化目标（社会福利最大化）和相应的约束', '天气预报', '操作人员的偏好', 'B', NULL),
(@pack_id, 41, '在Python中，使用**运算符可以实现：', '位运算', '幂运算', '字符串连接', '列表合并', 'B', NULL),
(@pack_id, 42, '“机组组合”问题通常与“网损”如何结合？', '忽略网损', '在功率平衡约束中，将网损作为负荷的一部分进行估算', '网损无法建模', '网损是目标函数', 'B', NULL),
(@pack_id, 43, '“电池储能系统”的荷电状态（SOC）的动态变化是一个状态变量，其约束属于：', '仅初始条件', '动态约束，将不同时间段的决策变量耦合在一起', '边界约束', '整数约束', 'B', NULL),
(@pack_id, 44, '在编写优化代码时，使用try...except...块的主要作用是：', '加速求解', '异常处理，例如当求解器返回无可行解时执行备用逻辑', '定义变量', '绘制图形', 'B', NULL),
(@pack_id, 45, '“Benders分解”是一种求解大规模MILP问题的算法，其适用场景是：', '所有变量都是连续的', '问题可以自然地分解为包含少量整数变量的“主问题”和多个线性子问题', '问题规模很小', '问题只有整数变量', 'B', NULL),
(@pack_id, 46, '为了与领域专家沟通，优化建模工程师应该能用通俗语言解释：', '分支定界的详细过程', '模型背后的物理意义和业务逻辑，以及结果的合理性', '求解器的源代码', 'Python的解释器原理', 'B', NULL),
(@pack_id, 47, '在Python中，@运算符用于：', '装饰器', '矩阵乘法（Python 3.5+）', '注释', '异步调用', 'B', NULL),
(@pack_id, 48, '“负荷频率控制 (LFC)” 可以看作是一个实时、闭环的优化问题，它的目标是：', '最小化发电成本', '维持系统频率在额定值，并保持联络线功率为计划值', '最大化用户用电量', '最小化电网损耗', 'B', NULL),
(@pack_id, 49, '对于新入职的优化建模工程师，最重要的一个习惯是：', '写出美观的注释', '对小规模案例先进行测试，验证模型逻辑正确性，再扩展到大规模', '只使用一种求解器', '一次性写完所有代码再调试', 'B', NULL),
(@pack_id, 50, '在开源精神下，分享你的优化模型时，最好同时提供：', '只有代码', '代码、示例数据、依赖环境说明和使用文档', '只有结果', '只有论文', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业25：电气技术文档工程师 (电气工程×英语)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_english:0', 25, '电气技术文档工程师', 'major_electrical', 'major_english', '电气工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '技术文档工程师将一份中文《变频器用户手册》翻译为英文时，最应关注的是：', '使用华丽的修辞手法', '术语的一致性、准确性和指令的清晰性', '将句子翻译得比原文更长', '加入个人技术见解', 'B', NULL),
(@pack_id, 2, '一份好的电气产品“安全须知”部分，应该：', '用极小的字体藏在最后一页', '使用警告、小心、注意等分级标识，清晰列出潜在危险及规避措施', '只写“请小心使用”', '全是电路原理图', 'B', NULL),
(@pack_id, 3, '“AutoCAD阅读”能力对电气文档工程师的主要作用是：', '自己修改产品设计图', '从机械或电气图纸中理解产品结构、接线方式和尺寸，以便编写准确的安装说明', '绘制公司建筑平面图', '制作3D动画', 'B', NULL),
(@pack_id, 4, '在技术写作中，描述一个操作步骤时，以下哪种写法最专业？', '"You might want to maybe press the start button."', '"The user should press the green button."', '"Press the [Start] button."', '"Pressing the button is something the operator does."', 'C', NULL),
(@pack_id, 5, '“DITA (Darwin Information Typing Architecture)” 是一种：', '一种编程语言', '一种技术文档的架构标准，基于主题（Topic）重用内容', '一种文件压缩格式', '一种图像处理软件', 'B', NULL),
(@pack_id, 6, '将“额定电压”翻译成英文，最准确的术语是：', 'Normal Voltage', 'Rated Voltage', 'Standard Voltage', 'Fixed Voltage', 'B', NULL),
(@pack_id, 7, '编写产品故障排除指南时，最高效的结构是：', '长篇大论的理论分析', '以“问题-原因-解决方法”为条目的表格形式', '列出所有可能的错误代码', '附上研发人员的电话号码', 'B', NULL),
(@pack_id, 8, '英文技术文档中，描述一条导线连接两个端子，最清晰的表达是：', '"Connect the wire from A to B."', '"Wire A and B together."', '"Make a connection using a wire between A and B."', '"A is connected with B via a wire."', 'A', NULL),
(@pack_id, 9, '技术文档工程师在项目启动阶段就介入，其最大价值是：', '增加项目成本', '可以提前规划文档结构，并在产品设计阶段就提出对易用性和可文档化的建议', '为研发工程师端茶倒水', '负责产品测试', 'B', NULL),
(@pack_id, 10, '以下哪个是描述电气图纸中“接地”符号的英文？', 'Ground', 'Earth', 'Protective Earth (PE)', '以上都可以，但需在文档中保持一致', 'D', NULL),
(@pack_id, 11, '对于一份长达200页的《继电保护装置技术规范》，最重要的部分之一是：', '封面设计', '目录和索引', '致谢名单', '作者简介', 'B', NULL),
(@pack_id, 12, '将“过载保护”翻译为英文，最常用的是：', 'Overload protection', 'Overcurrent protection', 'Overvoltage protection', 'Thermal protection', 'A', NULL),
(@pack_id, 13, '在使用AutoCAD软件时，为了测量图纸上两个元件之间的精确距离，应使用哪个命令？', 'AREA', 'DIST (或 DI)', 'LIST', 'ID', 'B', NULL),
(@pack_id, 14, '技术文档写作中，“主动语态”通常优于“被动语态”，因为：', '主动语态语法更正确', '主动语态更清晰、直接，易于理解和翻译', '被动语态不被允许', '主动语态用词更少', 'B', NULL),
(@pack_id, 15, '一个电气产品文档套件通常不包括：', '用户手册/操作指南', '安装指导书', '产品营销广告文案', '维修/服务手册', 'C', NULL),
(@pack_id, 16, '“CE认证”相关文档中，需要一份“符合性声明”(DoC)，该文件的官方语言通常要求是：', '仅中文', '仅英文', '英文以及产品销售地所在国官方语言', '拉丁文', 'C', NULL),
(@pack_id, 17, '英文技术文档中，用于强调“危险”的警示词，严重程度最高的是：', 'NOTE', 'CAUTION', 'WARNING', 'DANGER', 'D', NULL),
(@pack_id, 18, '从AutoCAD图纸中提取BOM表（物料清单）时，最应关注的信息是：', '线条颜色', '图框内的项目号、部件号、数量、描述', '图层的名称', '图纸的尺寸', 'B', NULL),
(@pack_id, 19, '翻译“断路器跳闸”这一短语，最专业的动词是：', 'jump', 'trip', 'break', 'stop', 'B', NULL),
(@pack_id, 20, '“单线图 (Single Line Diagram)” 的主要用途是：', '显示产品外观', '显示电气系统的主接线和潮流走向', '显示设备内部机械结构', '显示印刷电路板布线', 'B', NULL),
(@pack_id, 21, '为了保证术语翻译的一致性，技术文档工程师应使用：', '谷歌翻译', '术语库 (Termbase) 和翻译记忆库 (TM)', '个人猜测', '同事的意见', 'B', NULL),
(@pack_id, 22, '在编写操作手册时，描述“按住按钮3秒以上”，应写作：', '"Press the button for more than 3 seconds."', '"Hold the button for 3s at least."', '"Press the button for a long time."', '"Long press the button."', 'A', NULL),
(@pack_id, 23, '对于文档工程师而言，理解“IP防护等级”的意义在于：', '知道产品是否防水', '能在文档中准确描述产品的环境适应能力和安装要求', '评估产品成本', '编写营销文案', 'B', NULL),
(@pack_id, 24, '翻译“线径”一词，最准确的英文是：', 'Wire diameter', 'Wire size (AWG/mm²)', 'Cable thickness', 'Wire width', 'B', NULL),
(@pack_id, 25, '技术文档的质量评审（Technical Review）主要应由谁执行？', '市场营销总监', '公司前台', '产品研发工程师和技术文档同行', '外部广告公司', 'C', NULL),
(@pack_id, 26, '在AutoCAD中，图层（Layer）管理的主要作用是：', '美化图纸外观', '分类组织不同类型的图形元素（如电气、机械、标注），便于控制和编辑', '增加文件大小', '自动生成3D模型', 'B', NULL),
(@pack_id, 27, '一份“快速入门指南”的特点是：', '包含所有技术细节', '篇幅短小，图文并茂，引导用户完成最基本的安装和首次使用', '全是法律条文', '没有图片', 'B', NULL),
(@pack_id, 28, '翻译“备用电源自动投入装置”，简称为“备自投”，其标准英文术语是：', 'Automatic Transfer Switch (ATS)', 'Backup Power Auto-Input Device', 'Standby Power Supply', 'Uninterruptible Power Supply (UPS)', 'A', NULL),
(@pack_id, 29, '在技术文档中引用行业标准（如IEC, IEEE, GB）时，目的是：', '使文档变厚', '提供权威依据，说明产品符合公认的技术规范', '替代产品说明书', '增加翻译难度', 'B', NULL),
(@pack_id, 30, '“条件语句”在技术文档中应如何表达？', '"If the alarm light is on, check the input power."', '"When you see the light, maybe check the power."', '"The alarm light being on is an indication for checking the input power."', '"Under circumstances where the alarm light is illuminated, the input power supply should be inspected."', 'A', NULL),
(@pack_id, 31, '将“接线端子”翻译为英文，最常见的是：', 'Wiring endpoint', 'Terminal block / Terminal', 'Connection point', 'Wire connector', 'B', NULL),
(@pack_id, 32, '文档工程师需要为一个新产品创建“版本历史”表，其主要内容是：', '所有员工的姓名', '文档版本号、发布日期、修订内容和作者', '产品的销售记录', '产品研发的失败经历', 'B', NULL),
(@pack_id, 33, '在AutoCAD中，要理解复杂的电气原理图，应优先关注：', '图纸的边框', '图例和符号说明表', '图纸的打印设置', '绘图者的姓名', 'B', NULL),
(@pack_id, 34, '翻译“电压互感器”和“电流互感器”，正确的是：', 'Voltage Transformer (VT) / Current Transformer (CT)', 'Voltage Sensor / Current Sensor', 'Voltage Meter / Current Meter', 'Voltage Changer / Current Changer', 'A', NULL),
(@pack_id, 35, '技术文档中的“插图”最主要的功能是：', '美化版面', '辅助文字，更清晰地展示空间关系、操作步骤或工作原理', '占据页面空间', '代替所有文字', 'B', NULL),
(@pack_id, 36, '对于面向全球市场的产品，文档中的日期格式最好使用：', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD (ISO 8601)', '取决于产品经理的喜好', 'C', NULL),
(@pack_id, 37, '将“调试”作为动词翻译，最通用的英文是：', 'debug', 'commission', 'test', 'adjust', 'B', '调试设备/系统常用commission，软件调试用debug'),
(@pack_id, 38, '文档工程师在撰写“维护指南”时，应首先强调：', '维护的工具列表', '安全警告和断电、放电、挂牌上锁（LOTO）等程序', '维护后的测试方法', '备件的订购信息', 'B', NULL),
(@pack_id, 39, '“冗余设计”在文档中应解释为：', '多余的设计', '为了提高可靠性而设置的备份系统或组件', '复杂的设计', '昂贵的配置', 'B', NULL),
(@pack_id, 40, '如果公司产品文档需要同时提供中文和英文版本，最佳实践是：', '先写中文，再全部重新写英文', '先写英文，再全部重新写中文', '使用计算机辅助翻译(CAT)工具，保持源语言和目标语言同步更新', '只写中文，用谷歌翻译自动生成英文', 'C', NULL),
(@pack_id, 41, '翻译“标称值”的正确英文是：', 'Real value', 'Nominal value', 'Measured value', 'Set value', 'B', NULL),
(@pack_id, 42, '在AutoCAD中，为了在不改变图纸实际大小的情况下，使某个局部区域在视口中放大显示，应该使用：', 'ZOOM命令', 'SCALE命令', 'VPORTS和布局中的视口缩放', 'STRETCH命令', 'C', NULL),
(@pack_id, 43, '技术文档中，使用“注意” (NOTE) 来提供：', '严重危险警告', '重要的补充信息或提示，帮助用户更有效地使用产品', '法律免责声明', '产品广告', 'B', NULL),
(@pack_id, 44, '将“变频启动”翻译为英文，最准确的是：', 'Frequency change start', 'Variable frequency drive (VFD) start', 'Speed change start', 'Soft start', 'B', NULL),
(@pack_id, 45, '衡量技术文档可用性的一个重要指标是：', '文档的页数', '用户能否在不求助客服的情况下，根据文档成功完成任务', '文档的印刷质量', '文档中英文字体的美观度', 'B', NULL),
(@pack_id, 46, '在技术写作中，列表（如项目符号列表）的使用有助于：', '隐藏信息', '结构化信息，提高可读性和扫描效率', '增加写作难度', '替代所有段落文字', 'B', NULL),
(@pack_id, 47, '翻译“自锁电路”，正确的英文术语是：', 'Self-looking circuit', 'Hold-in circuit / Latching circuit', 'Auto-lock circuit', 'Self-cutting circuit', 'B', NULL),
(@pack_id, 48, '文档工程师发现研发工程师提供的一个技术参数在图纸和手册中不一致，应如何处理？', '随意选择一个数字填写', '忽略，反正用户看不懂', '与研发工程师确认，纠正错误，确保所有文档数据一致', '两个数字都写上去', 'C', NULL),
(@pack_id, 49, '“即插即用”的标准英文表达是：', 'Plug and use', 'Plug and Play', 'Insert and work', 'Hot swap', 'B', NULL),
(@pack_id, 50, '技术文档工程师的职业素养中最重要的一点是：', '极强的图形设计能力', '对细节的严谨态度和对用户的同理心', '高超的编程能力', '优秀的销售技巧', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业26：国际电力项目协调 (电气工程×英语)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_english:1', 26, '国际电力项目协调', 'major_electrical', 'major_english', '电气工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在国际电力EPC项目（设计-采购-施工）中，项目经理最核心的职责是：', '亲自画所有图纸', '在预算内、按时、按质量要求，整合并管理所有项目资源，协调各方关系', '负责设备采购的具体谈判', '担任现场翻译', 'B', NULL),
(@pack_id, 2, '在写给海外客户的英文项目进度报告中，以下哪个表述最专业且委婉？', '"You are late again!"', '"The civil works are currently behind the baseline schedule. We are implementing recovery plans."', '"Everything is fine, don\'t worry."', '"Your local team caused all the delays."', 'B', NULL),
(@pack_id, 3, '项目中的“关键路径法 (CPM)”主要用于：', '计算项目总成本', '识别项目中最长的任务依赖链，以确定项目最短工期和关键任务', '评估项目风险', '沟通项目章程', 'B', NULL),
(@pack_id, 4, '与中东客户进行项目启动会，在沟通风格上应注意：', '直奔主题，不讲任何客套话', '建立良好的个人关系，尊重对方的商务礼仪和时间观念（可能比约定时间晚到）', '只通过邮件沟通', '避免任何眼神接触', 'B', NULL),
(@pack_id, 5, '国际项目中的“Force Majeure”（不可抗力）条款，通常用于：', '任何导致项目延期的原因', '豁免因战争、自然灾害等极端且无法预见事件导致的违约', '客户拒绝付款', '供应商提高价格', 'B', NULL),
(@pack_id, 6, '当一个国际项目的范围发生变更时，正确的流程是：', '口头告诉团队，直接开始做', '提交正式的变更请求，评估其对成本、进度的影响，获得批准后才能执行', '拒绝任何变更', '让客户自己解决', 'B', NULL),
(@pack_id, 7, '在跨文化沟通中，“高语境文化” (High-context culture，如日本、阿拉伯国家) 的特点是：', '信息明确表达在字面上，直接沟通', '大量信息隐含在语境、非语言信号和关系中，需要“读懂空气”', '沟通效率极高', '喜欢使用书面指令', 'B', NULL),
(@pack_id, 8, '一封专业的英文商务邮件中，主题行 (Subject Line) 应该：', '为空', '简洁、清晰地概括邮件核心内容，便于追溯和搜索', '写上“Hello”或“Important”', '全用大写字母', 'B', NULL),
(@pack_id, 9, '国际项目协调员需要阅读并理解FIDIC（国际咨询工程师联合会）合同条款，其重要性在于：', 'FIDIC是唯一的合同范本', 'FIDIC合同条款是国际工程中广泛使用的、权责清晰的标准合同条件', '法律要求所有项目必须用FIDIC', '只有FIDIC合同是英文写的', 'B', NULL),
(@pack_id, 10, '当与欧美项目经理沟通项目问题时，最好采用什么方式？', '发微信语音', '预约一个简短、聚焦问题的电话会或视频会，会后用邮件确认要点', '通过第三方传话', '在社交媒体上留言', 'B', NULL),
(@pack_id, 11, '项目管理中的“RACI矩阵”用于：', '项目成本估算', '明确各项任务的责任人、批准人、咨询人和知情人，避免角色混乱', '风险评估', '进度计划编制', 'B', NULL),
(@pack_id, 12, '在国际会议中，当对方英语口音很重且你没有完全听懂时，得体的做法是：', '装作听懂，不停点头', '直接说“你英语太差了”', '礼貌地说“Could you please repeat that?” 或 “Just to confirm, you mean...?”', '挂断电话', 'C', NULL),
(@pack_id, 13, '项目风险应对策略不包括：', '规避 (Avoid)', '转移 (Transfer，如买保险)', '忽视 (Ignore)', '接受 (Accept)', 'C', NULL),
(@pack_id, 14, '在英文商务谈判中，说“Let\'s put that on the table for now” 的含义是：', '把文件放在桌上', '暂停讨论该议题，稍后再议', '立即做出决定', '这个问题不重要', 'B', NULL),
(@pack_id, 15, '对于一个在非洲的变电站建设项目，以下哪项是主要的外部风险？', '国内股市波动', '当地政局不稳定、物流基础设施差和疟疾等健康风险', '公司内部食堂伙食不好', '项目协调员的英语水平', 'B', NULL),
(@pack_id, 16, '在英文项目报告中使用“milestone”一词，指的是：', '路上的里程碑', '项目中的重要事件或节点，如设计完成、设备发运、变电站通电', '项目结束日期', '项目的小任务', 'B', NULL),
(@pack_id, 17, '处理与当地分包商的合同纠纷时，首先应依据：', '个人交情', '项目合同中约定的法律适用条款和争议解决机制（仲裁或诉讼）', '当地媒体的舆论', '分包商的哭诉', 'B', NULL),
(@pack_id, 18, '“Time is of the essence” 这一合同表述意味着：', '时间很重要', '按时履约是合同的根本条件，任何延误都可能构成重大违约', '可以随意延期', '时间就是金钱', 'B', NULL),
(@pack_id, 19, '在项目启动阶段，召开“Kick-off Meeting”的主要目的是：', '庆祝项目启动', '统一项目目标、介绍团队成员、明确沟通方式和规则', '签署所有合同', '开始现场施工', 'B', NULL),
(@pack_id, 20, '当客户要求提供一份不在合同范围内的额外服务时，恰当的说法是：', '"No."', '"This is out of scope. We can prepare a change order for your approval."', '"That\'s extra, pay us more."', '"We\'ll do it for free this time."', 'B', NULL),
(@pack_id, 21, '英文邮件结尾“Best regards,” 适用于：', '所有正式和非正式的商务邮件', '仅用于给好朋友的邮件', '投诉信', '求职信', 'A', NULL),
(@pack_id, 22, '“挣值管理 (EVM)” 中的三个基本参数是：计划价值(PV)、实际成本(AC)和：', '估算成本 (EC)', '挣值 (EV)', '剩余价值 (RV)', '风险价值 (RV)', 'B', NULL),
(@pack_id, 23, '在与印度客户沟通时，摇头表示：', '不同意', '同意或理解 (上下或8字形摇头)', '愤怒', '没听见', 'B', NULL),
(@pack_id, 24, '协调国际设备运输时，负责处理海关清关、关税和检验的通常是：', '国内的物流公司', '项目协调员自己', '收货方或其指定的报关行', '设备制造商', 'C', NULL),
(@pack_id, 25, '作为一名国际项目协调员，最需要具备的软技能是：', '编程能力', '主动沟通、解决问题和化解冲突的能力', '驾驶技术', '烹饪技能', 'B', NULL),
(@pack_id, 26, '项目会议纪要 (Minutes of Meeting) 的核心作用不包括：', '记录决策和行动项', '作为后续追溯责任和进度的依据', '详细记录每个人的每一句话', '分发给所有与会者和相关方', 'C', NULL),
(@pack_id, 27, '在英文商务写作中，“Please advise” 通常用于：', '提供建议', '礼貌地请求对方提供信息或决策', '发出警告', '表示感谢', 'B', NULL),
(@pack_id, 28, '国际项目往往采用“EPC+F”模式，其中“F”代表：', '快速 (Fast)', '融资 (Financing)', '柔性 (Flexible)', '最终 (Final)', 'B', NULL),
(@pack_id, 29, '当团队中出现跨国文化冲突时，项目协调员首先应该：', '偏袒自己国家的同事', '指责另一方不懂事', '了解双方的文化背景和诉求，促进双向理解和尊重，寻找共识', '向上级汇报要求换人', 'C', NULL),
(@pack_id, 30, '一封投诉设备质量的邮件，最有效的结构是：', '充满情绪化的指责', '清晰陈述问题事实、提供证据（照片/数据）、说明造成的后果、提出明确的解决方案要求', '只发一张模糊的照片', '打电话骂一顿，不发邮件', 'B', NULL),
(@pack_id, 31, '“Vendor” 和 “Contractor” 在国际项目中通常的区别是：', '没有区别', 'Vendor指设备材料供应商，Contractor指提供工程、施工等服务的分包商', 'Vendor是主承包商，Contractor是分包的', 'Vendor负责设计，Contractor负责施工', 'B', NULL),
(@pack_id, 32, '项目进度计划的常用工具是：', 'Excel表格', '甘特图 (Gantt Chart)，可以用MS Project或类似软件制作', '思维导图', '流程图', 'B', NULL),
(@pack_id, 33, '在项目执行中，遇到因当地节假日或宗教活动导致停工，这属于：', '项目风险，应在计划中考虑或接受', '严重的项目事故', '可以索赔的业主责任', '不可抗力', 'A', NULL),
(@pack_id, 34, '“Draft” 和 “Final” 在文档标题中的含义是：', '草稿版本和最终版本', '草稿版本和最终版本', '快速版本和详细版本', '中文版本和英文版本', 'A', NULL),
(@pack_id, 35, '在国际项目中，给海外合作伙伴发送一个非常大的附件（如50M的图纸）时，最佳实践是：', '直接发送，不管对方邮箱是否限制', '使用云存储链接，或在公司内部网提供下载，邮件中只提供链接和访问指引', '打印出来快递过去', '压缩成10个文件分别发送', 'B', NULL),
(@pack_id, 36, '项目协调员需跟踪的“开口项清单 (Open Issue List / Punch List)” 主要记录：', '已完成的工作', '所有尚未解决的问题、缺陷或待完成项，并指定负责人和关闭日期', '项目成员的请假记录', '每日天气情况', 'B', NULL),
(@pack_id, 37, '在英文电话会议中，如果说“Let me play back what I\'ve heard to confirm I understand correctly.” 目的是：', '打断对方', '炫耀听力', '进行积极的聆听和确认，避免误解', '结束会议', 'C', NULL),
(@pack_id, 38, '“Letter of Credit (L/C)” 在国际贸易和项目采购中，主要作用是：', '产品合格证', '降低支付风险，由银行作为中间人保证付款', '技术规范书', '项目许可文件', 'B', NULL),
(@pack_id, 39, '领导一个多元文化团队，以下哪种管理风格最有效？', '强制命令式', '完全放任式', '包容、赋能、明确规则和共同目标，并利用文化差异作为团队优势', '只在线上沟通，从不组织线下或视频会议', 'C', NULL),
(@pack_id, 40, '在收到客户抱怨项目进度延误的邮件后，第一反应应该是：', '立即回复，推卸责任', '不回复，假装没收到', '确认收到，并告知对方你正在了解情况，会尽快给出正式答复和后续计划', '直接打电话过去吵架', 'C', NULL),
(@pack_id, 41, '“Subcontractor” 和 “Supplier” 的关键区别是：', 'Subcontractor提供产品，Supplier提供服务', 'Subcontractor直接与业主签约，Supplier与总包签约', 'Subcontractor提供服务或工程，Supplier提供货物', '没有区别', 'C', NULL),
(@pack_id, 42, '在会议中，使用“停车场 (Parking Lot)” 这一概念的目的是：', '记录与会者的车牌号', '暂时搁置与会议主题无关或需要后续深入讨论的议题，保证主线议程顺利推进', '安排停车事宜', '作为休息时间', 'B', NULL),
(@pack_id, 43, '国际项目中的“Variation Order (VO)” 是指：', '不同的订单', '变更指令，是对原合同范围、设计或进度的正式修改文件', '多种选择方案', '订单的变化情况报告', 'B', NULL),
(@pack_id, 44, '当外方业主工程师对技术方案提出质疑，而你认为他是对的，应该：', '捍卫公司方案，绝不认错', '坦诚接受，并感谢对方的指正，立即组织内部修改', '沉默不表态', '找借口搪塞过去', 'B', NULL),
(@pack_id, 45, '“Turnkey Project” 的含义是：', '交钥匙项目，承包商负责完成全部设计、采购、施工、调试，交付后业主可以直接运营', '转钥匙项目', '项目中的一个关键环节', '项目启动仪式', 'A', NULL),
(@pack_id, 46, '英文邮件中，用“FYI”表示：', '请回复', '请处理', '仅供参考 (For Your Information)', '紧急', 'C', NULL),
(@pack_id, 47, '在项目现场，一名中国工程师和一名当地工人因作业习惯不同发生争执，作为协调员，你应：', '完全支持中国工程师', '完全支持当地工人', '把两人都训斥一顿', '分别了解情况，解释各自作业规范背后的安全或效率考量，协调出一致、安全的作业方法', 'D', NULL),
(@pack_id, 48, '项目收尾阶段最重要的文档是：', '项目启动会PPT', '项目终期报告和经验教训总结', '所有员工的考勤表', '咖啡采购清单', 'B', NULL),
(@pack_id, 49, '在商务宴请中，为伊斯兰教客户点餐时，应避免：', '牛肉', '猪肉和酒精', '鸡肉', '海鲜', 'B', NULL),
(@pack_id, 50, '作为一名优秀的国际项目协调员，核心素质可以用一个词概括：', 'Technicality (技术性)', 'Proactivity (主动性)', 'Aggressiveness (侵略性)', 'Rigidity (刻板)', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业27：英文专利分析 (电气方向) (电气工程×英语)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_english:2', 27, '英文专利分析 (电气方向)', 'major_electrical', 'major_english', '电气工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '专利文献中的“权利要求书 (Claims)” 的主要作用是：', '介绍技术背景', '定义专利寻求保护的法律范围边界', '描述具体实施方式', '列出发明人信息', 'B', NULL),
(@pack_id, 2, '在英文专利中，术语“said”或“the said”常用于：', '泛指一个未知物', '指代之前已经提及过的某个技术特征 (如前文中的“a controller”变为“said controller”)', '表示所有格', '表示复数', 'B', NULL),
(@pack_id, 3, '电气领域的专利中，“coupled to” 与 “connected to” 这两个术语，通常理解哪个范围更宽？', '“connected to” 范围更宽，包含直接和间接', '“coupled to” 范围更宽，可以包含直接连接、间接连接、甚至磁耦合或光耦合', '两者完全相同', '两者都是错误的表达', 'B', NULL),
(@pack_id, 4, '进行专利检索时，最常用的布尔逻辑算符是：', 'AND, OR, NOT', 'PLUS, MINUS, EQUAL', 'WITH, NEAR, SAME', 'IF, THEN, ELSE', 'A', NULL),
(@pack_id, 5, '将英文专利中的“a method for controlling a power converter”翻译成中文，最准确的是：', '用于控制功率转换器的方法', '一种功率转换器的控制方法', '一个控制电力变流器的方法', '用于功率转换器的控制方法', 'B', '符合中文专利的习惯表达'),
(@pack_id, 6, '专利的“新颖性 (Novelty)” 是指：', '技术非常复杂', '该发明不属于现有技术的一部分，没有被任何人以任何形式在先公开过', '产品已经上市销售', '发明人认为是新的', 'B', NULL),
(@pack_id, 7, '在国际专利分类号 (IPC) 中，H02J 通常涉及哪个技术领域？', '电机', '电路装置', '供电或配电的电路装置或系统', '半导体器件', 'C', NULL),
(@pack_id, 8, '分析一篇竞争对手的专利时，最重要的部分是阅读其：', '发明人姓名和地址', '专利附图', '独立权利要求', '专利摘要', 'C', NULL),
(@pack_id, 9, '英文专利中“embodiment” 一词，翻译成中文最常用的是：', '实施例', '具体化', '体现', '化身', 'A', NULL),
(@pack_id, 10, '专利“优先权日 (Priority Date)” 是确定现有技术的：', '截止日', '起始日', '公开日', '授权日', 'A', NULL),
(@pack_id, 11, '以下哪个数据库是进行免费、权威的全球专利检索的首选？', 'Google Patents', '百度学术', '中国知网 (CNKI)', '万方数据', 'A', NULL),
(@pack_id, 12, '翻译专利中的“a plurality of” 时，最标准的译法是：', '多个', '许多', '复数个', '各种各样的', 'A', NULL),
(@pack_id, 13, '专利分析中的“专利地图 (Patent Landscape)” 可以用来：', '绘制地理信息', '可视化展示技术领域的竞争格局、技术热点和发展趋势', '寻找专利发明人的住址', '计算专利年费', 'B', NULL),
(@pack_id, 14, '英文专利文献中，“wherein” 一词通常出现在：', '标题中', '权利要求书中，用于进一步限定前序部分的特征', '摘要中', '结尾处', 'B', NULL),
(@pack_id, 15, '对一项电气技术进行“侵权风险分析 (Freedom to Operate, FTO)”，需要：', '检索所有已授权和正在申请的专利，评估公司产品是否落入其权利要求范围', '只看公司自己的专利', '分析竞争对手的财务报表', '进行市场调研', 'A', NULL),
(@pack_id, 16, '将“inverter” 和 “converter” 准确翻译为：', '逆变器 / 变换器 (或变流器)', '变换器 / 逆变器', '转换器 / 逆变器', '反相器 / 变换器', 'A', NULL),
(@pack_id, 17, '专利的“同族专利 (Patent Family)” 是指：', '同一个公司申请的系列专利', '同一个发明人申请的多个专利', '基于同一优先权，在不同国家或地区申请的一组专利', '技术内容完全相同的两个专利', 'C', NULL),
(@pack_id, 18, '在专利检索中，使用IPC或CPC分类号的主要好处是：', '可以替代关键词', '可以精确地找到某一技术类别的专利，避免关键词不同导致的漏检', '可以检索到所有专利', '可以计算专利数量', 'B', NULL),
(@pack_id, 19, '翻译英文专利权利要求中的“apparatus” 时，比“device” 更通用的译法是：', '设备', '装置', '仪器', '器械', 'B', NULL),
(@pack_id, 20, '专利文献中的“背景技术 (Background of the Invention)” 部分，分析价值在于：', '了解最接近的现有技术和要解决的技术问题', '确定专利的保护范围', '找到产品说明书', '了解发明人背景', 'A', NULL),
(@pack_id, 21, '专利分析报告中，常提到的“专利悬崖 (Patent Cliff)” 指：', '专利被无效的风险很高', '核心专利到期后，导致原研企业市场份额和利润急剧下降的现象', '专利申请被驳回', '专利诉讼失败', 'B', NULL),
(@pack_id, 22, '英文专利中“the present invention” 的最佳翻译是：', '现在的发明', '本发明', '当前发明', '这个发明', 'B', NULL),
(@pack_id, 23, '“PCT (Patent Cooperation Treaty)” 国际申请的主要作用是：', '授予一个全球统一的专利', '简化向多国申请专利的程序，获得优先权和更多决策时间', '仅用于外观设计', '替代国家阶段的申请', 'B', NULL),
(@pack_id, 24, '在分析一件关于“IGBT驱动电路”的专利时，核心电气知识是：', '电磁场理论', '电力电子技术', '高电压技术', '自动控制原理', 'B', NULL),
(@pack_id, 25, '翻译“feedback loop” 和 “control loop” 时，应分别注意：', '反馈回路 / 控制回路', '反馈圈 / 控制圈', '回馈环路 / 控制环路', '均可译成循环', 'A', NULL),
(@pack_id, 26, '专利分析中的“引证分析 (Citation Analysis)” 可以用于：', '识别核心专利和追踪技术发展脉络', '查看专利的附图质量', '计算专利年费', '找出专利的错别字', 'A', NULL),
(@pack_id, 27, '对于一份英文专利，如果其法律状态是“Lapsed”，则表示：', '已授权', '已失效 (通常因未缴年费)', '在审中', '被撤回', 'B', NULL),
(@pack_id, 28, '将“rectifier circuit” 和 “filter circuit” 准确译为：', '整流电路 / 滤波电路', '整流器电路 / 过滤器电路', '矫正电路 / 滤波电路', '整流回路 / 过滤回路', 'A', NULL),
(@pack_id, 29, '“专利无效宣告 (Patent Invalidation)” 的法律效果是：', '专利被修改', '专利被视为自始即不存在', '专利权人变更', '延长专利保护期', 'B', NULL),
(@pack_id, 30, '在英译中时，处理英文专利中超长的从句，最佳策略是：', '也翻译成一个超长的中文句子', '拆分成几个短句，并使用“所述”、“该”等词保持指代清晰', '忽略从句，只翻译主句', '打乱语序，按自己的理解重新组织', 'B', NULL),
(@pack_id, 31, '专利的“说明书 (Specification)” 必须满足“充分公开”的要求，这意味着：', '公开所有技术秘密', '使得本领域技术人员能够依据说明书实现该发明', '公开产品成本', '公开市场销售数据', 'B', NULL),
(@pack_id, 32, '“Switching losses” 和 “Conduction losses” 是电力电子专利中的常见术语，其译法为：', '开关损失 / 传导损失', '切换损耗 / 导通损耗', '开关损耗 / 导通损耗', '切换损失 / 传导损失', 'C', NULL),
(@pack_id, 33, '专利分析中，制作“技术功效矩阵图 (Technology-Function Matrix)” 的目的是：', '展示公司组织结构', '揭示不同技术方案与达到的技术效果之间的对应关系，发现空白点', '记录发明人的贡献', '计算专利数量排名', 'B', NULL),
(@pack_id, 34, '专利文献的“著录项目 (Bibliographic Data)” 不包括：', '申请号、公开号', '申请日、优先权日', '发明人、申请人', '产品的市场价格', 'D', NULL),
(@pack_id, 35, '将“electrically connected” 翻译为中文专利常用语，最准确的是：', '电连接', '电气连接', '电性连接', '用电连接', 'A', NULL),
(@pack_id, 36, '“宽范围 (Broad Claim)” 和 “窄范围 (Narrow Claim)” 指的是：', '权利要求的字数多少', '权利要求保护的技术方案范围的大小', '专利的页数多少', '专利的附图数量', 'B', NULL),
(@pack_id, 37, '在专利分析项目中，需要快速了解一个技术领域的宏观趋势，应优先分析：', '单个专利的具体内容', '专利的著录项目信息（如申请量时间趋势、主要申请人、分类号分布）', '专利诉讼案例', '专利代理机构信息', 'B', NULL),
(@pack_id, 38, '翻译“surge protection device (SPD)” 时，标准术语是：', '浪涌保护器', '冲击保护装置', '过压保护设备', '电涌保护器', 'D', NULL),
(@pack_id, 39, '发现一篇潜在的重要专利，下一步最合理的动作是：', '直接忽略', '分析其同族专利和法律状态，评估其全球布局和保护强度', '马上申请无效', '联系发明人购买', 'B', NULL),
(@pack_id, 40, '英文专利文件中，“dotted line” 在附图中通常表示：', '实体结构', '非本专利要求保护的环境特征，或用于表示不连续', '信号流向', '虚线', 'B', NULL),
(@pack_id, 41, '“专利布局 (Patent Portfolio)” 的核心思想是：', '申请大量专利', '围绕核心技术，有策略、有组织地申请一系列相关专利，形成保护网', '只申请一个核心专利', '购买他人专利', 'B', NULL),
(@pack_id, 42, '将“bus bar” 翻译为电气领域的专业术语，正确的是：', '公共汽车杆', '母线', '总线条', '汇流排', 'B', NULL),
(@pack_id, 43, '专利分析报告中的“气泡图 (Bubble Chart)” 常用于：', '显示地理位置', '同时展示技术/申请人的三个维度的信息（如数量、增长率和引用频次）', '连接引证关系', '绘制专利附图', 'B', NULL),
(@pack_id, 44, '在阅读英文专利时，遇到术语“interposed between A and B”，其含义是：', '位于A和B之间', '与A和B并列', '取代A和B', '附加在A和B上', 'A', NULL),
(@pack_id, 45, '“标准必要专利 (Standard Essential Patent, SEP)” 是指：', '非常标准的专利', '实施某项技术标准（如5G、WiFi）时必须使用的专利', '得到政府推荐的专利', '没有绕开余地的专利', 'B', NULL),
(@pack_id, 46, '对于新入职的专利分析员，最重要的一个职业习惯是：', '快速阅读大量专利摘要', '精准严谨的翻译和对法律术语的敏感度', '精通所有电气设计软件', '拥有销售经验', 'B', NULL),
(@pack_id, 47, '英文专利中，“a set of instructions” 常被译为：', '一套指令', '一组指令', '一集合指令', '指令集', 'D', '计算机/电气领域常用'),
(@pack_id, 48, '“外观设计专利 (Design Patent)” 保护的是：', '产品的技术功能', '产品的装饰性外观', '产品的制造方法', '产品的内部结构', 'B', NULL),
(@pack_id, 49, '在专利翻译中，处理“consisting of” 和 “comprising” 时，哪个表示封闭式、排他的组合？', 'comprising', 'consisting of', 'including', 'containing', 'B', NULL),
(@pack_id, 50, '进行“专利预警 (Patent Alert)” 工作，主要是为了：', '警告竞争对手', '定期监控特定技术或竞争对手的最新专利动态，避免侵权风险', '提醒缴纳年费', '提醒员工注意保密', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业28：法务会计 (法学×会计学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_accounting:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_accounting:0', 28, '法务会计', 'major_law', 'major_accounting', '法学×会计学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '法务会计的核心工作是什么？', '编制公司年度财务报表', '对企业的税务进行合理筹划', '处理涉及财务事务的法律问题，如调查舞弊、计算经济损失、提供专家证词', '进行公司内部审计', 'C', NULL),
(@pack_id, 2, '在舞弊调查中，“舞弊三角理论”的三个要素是：压力、机会和：', '能力', '道德/合理化借口 (Rationalization)', '贪欲', '权力', 'B', NULL),
(@pack_id, 3, '法务会计师在诉讼中作为“专家证人”时，其意见可以：', '代替法官做判决', '作为证据被法庭采纳，帮助法官和陪审团理解复杂的财务问题', '绝对优于事实证人', '无须接受对方律师的交叉质询', 'B', NULL),
(@pack_id, 4, '以下哪项是资产挪用最直接的发现方式？', '分析毛利率变化', '对银行存款余额进行突审，并核对银行对账单的收付款方完整性', '计算流动比率', '分析应付账款周转率', 'B', NULL),
(@pack_id, 5, '“证据链”在法律上的重要性在于：', '证据越多越好', '证据必须相互印证，形成一个完整的、无断裂的逻辑闭环，以证明待证事实', '只有物证才是有效证据', '书证优于言词证据', 'B', NULL),
(@pack_id, 6, '计算因合同违约造成的利润损失时，最常用的方法是：', '直接法 (Before and After)', '可比利润法 (Yardstick)', '现金流折现法 (DCF)', '以上都是，具体视案情而定', 'D', NULL),
(@pack_id, 7, '“内部控制”的五大要素是：控制环境、风险评估、控制活动、信息与沟通，以及：', '人事管理', '监督 (Monitoring)', '战略规划', '利润分配', 'B', NULL),
(@pack_id, 8, '法务会计调查中，“纵向分析”是指：', '比较不同公司的财务数据', '将同一公司不同时期的财务数据进行比较，分析趋势变化', '分析报表内各项目占总体的比例', '与行业标准比较', 'B', NULL),
(@pack_id, 9, '在处理一起涉嫌内部贪腐的案件时，法务会计师获取的银行流水属于：', '物证', '书证', '言词证据', '电子数据', 'B', NULL),
(@pack_id, 10, '以下哪个行为最符合“利益冲突”的定义？', '员工将公司资金转入个人账户', '采购经理的妻子开了一家供应商，并投标了公司的采购合同', '员工故意破坏公司设备', '财务人员做假账粉饰业绩', 'B', NULL),
(@pack_id, 11, '“贝尼什模型 (Beneish M-Score)” 是一种用于：', '预测企业破产', '识别上市公司财务报表舞弊可能性的定量分析模型', '计算股票内在价值', '评估企业信用等级', 'B', NULL),
(@pack_id, 12, '在法庭上，法务会计师提交的《经济损失计算报告》应主要基于：', '假设和主观判断', '可靠的财务数据、公认的计算方法和合理的假设', '客户的单方面陈述', '媒体报道', 'B', NULL),
(@pack_id, 13, '为了寻找隐藏的资产和负债，法务会计师最不可能使用的方法是：', '分析大额和异常会计分录', '对供应商和客户进行函证', '仅依赖管理层提供的未审财务报表', '检查银行对账单上的大额交易对手', 'C', NULL),
(@pack_id, 14, '“灰色词”在财务报表分析中，指的是：', '颜色是灰色的词汇', '管理层的陈述与财务数据存在不一致或难以理解的“软”信息', '会计科目中的专业术语', '非英语的财务词语', 'B', NULL),
(@pack_id, 15, '法务会计区别于法务审计的关键点在于：', '法务会计只关注税务问题', '法务审计只服务于内部管理层', '法务会计的工作深度和广度更大，直接服务于法律程序，其结果可能作为证据', '没有任何区别', 'C', NULL),
(@pack_id, 16, '“净现值法 (NPV)” 在计算经济损失时，其折现率反映了：', '通货膨胀率', '资金的时间价值和风险', '公司的利润率', '银行的贷款利率', 'B', NULL),
(@pack_id, 17, '以下哪项是防止员工报销舞弊的有效内控措施？', '由员工自己审批自己的报销单', '强制要求所有报销必须提供原始发票，并由独立于报销人的主管审批', '允许使用复印件或丢失说明代替发票', '定期更换所有员工', 'B', NULL),
(@pack_id, 18, '在合同法框架下，法务会计师帮助计算的“信赖利益”是指：', '合同履行后可以获得的利润', '因信赖合同能够履行而付出的成本和投入', '违约方因违约而获得的利益', '精神损失费', 'B', NULL),
(@pack_id, 19, '进行舞弊调查时，询问嫌疑人的最佳策略是：', '立即进行严厉对峙', '在充分准备、掌握一定证据后，采用非对抗性的方式，从开放式问题开始', '通过邮件询问', '让嫌疑人和证人对质', 'B', NULL),
(@pack_id, 20, '“水平分析”在法务会计中的应用，主要是：', '分析同一时期不同项目的占比', '比较不同年度的同一财务项目金额的变化', '分析公司间的横向并购', '分析地理区域分布', 'B', NULL),
(@pack_id, 21, '在破产清算案件中，法务会计师的主要职责可能是：', '帮助企业扭亏为盈', '追查和追回破产前的可疑资产转移或偏颇性清偿', '继续维持企业运营', '为企业申请新贷款', 'B', NULL),
(@pack_id, 22, '证据的“相关性”是指：', '证据必须是原件', '证据必须与案件中的待证事实存在逻辑上的联系', '证据必须是以合法手段获取的', '证据的数量必须足够多', 'B', NULL),
(@pack_id, 23, '“隐蔽资产调查”中，分析嫌疑人的生活方式（奢侈消费、豪车、房产）与合法收入是否匹配，属于：', '净资产法', '银行余额法', '支出法', '单位验证法', 'C', NULL),
(@pack_id, 24, '一份有效的《反舞弊政策》必须包括：', '定义什么是舞弊行为', '明确的举报渠道和保护举报人的条款', '调查程序和纪律处分措施', '以上都是', 'D', NULL),
(@pack_id, 25, '“计算机辅助审计技术 (CAATs)” 在法务会计中常用于：', '设计公司Logo', '对海量财务数据进行筛选、标记和分类，寻找异常模式（如连续支付、发票号码缺失）', '打字', '电话会议', 'B', NULL),
(@pack_id, 26, '在计算商业秘密侵权造成的损失时，可以采用“合理许可使用费”法，其依据是：', '侵权人的利润', '假设侵权人在合法情况下应支付的许可费', '权利人的股价下跌', '诉讼费用', 'B', NULL),
(@pack_id, 27, '以下哪项是“管理舞弊”的常见动机？', '个人消费压力', '满足资本市场预期或获取业绩奖金', '报复公司', '宗教信仰', 'B', NULL),
(@pack_id, 28, '法务会计师在执行任务时，应遵循的首要职业道德准则是：', '为客户创造最大价值', '客观、公正、独立，免受客户或其他方不当影响', '与律师建立良好私交', '尽可能收费高价', 'B', NULL),
(@pack_id, 29, '在询问过程中，观察到被询问者出现“堵嘴姿势”（用手捂住嘴），通常暗示：', '坦诚', '放松', '可能想隐藏真相、不确定或焦虑', '感冒了', 'C', NULL),
(@pack_id, 30, '“遵循性测试”与“实质性测试”在舞弊调查中的关系是：', '遵循性测试替代实质性测试', '先通过遵循性测试评估内控有效性，再决定实质性测试的范围和深度', '只做实质性测试即可', '两者无关', 'B', NULL),
(@pack_id, 31, '“帕尔玛比率” 是一种：', '盈利能力比率', '用于衡量企业财务困境程度的比率（Z值）', '流动性比率', '资产管理比率', 'B', NULL),
(@pack_id, 32, '在一桩离婚案件中，法务会计师可能需要：', '判断谁对婚姻不忠', '评估夫妻双方各自的收入和资产，识别隐藏或低估的财产', '争夺子女抚养权', '提供心理辅导', 'B', NULL),
(@pack_id, 33, '“虚增销售收入”是财务舞弊的常见手法，法务会计师应重点审查：', '销售退回和折让记录', '与虚构客户的大额交易及关联方交易', '应收账款周转天数的异常下降', '以上都是', 'D', NULL),
(@pack_id, 34, '在证据规则中，“最佳证据规则”通常要求：', '提供证据的最佳方式是在法庭上大声朗读', '提供证据的原件，而非复制品，除非有合理理由', '证人必须是最佳人选', '只采用物证', 'B', NULL),
(@pack_id, 35, '法务会计师在分析一家公司是否有“盈余管理”行为时，会关注：', '公司是否盈利', '管理层是否利用会计政策选择来平滑或调节各期利润', '公司股价', '员工人数', 'B', NULL),
(@pack_id, 36, '“资产剥离”在舞弊调查中通常指：', '公司出售非核心业务', '将公司资产以不公允价格转移给关联方或个人，侵占公司财产', '清理坏账', '资产盘点', 'B', NULL),
(@pack_id, 37, '在破产案件中，法务会计师需要分析“偏颇性清偿”，是指：', '在破产申请前一段时期内，债务人优先清偿了某个特定债权人，损害了其他债权人利益', '清偿了所有债务', '债务人的清偿行为不公', '债权人要求优先清偿', 'A', NULL),
(@pack_id, 38, '法务会计报告的语言应当：', '充满法律术语，显得专业', '使用大量会计行话', '清晰、平实、准确，能够被非财务专业的法官或陪审团理解', '尽量简短，只写结论', 'C', NULL),
(@pack_id, 39, '在调查员工差旅费报销舞弊时，最有效的测试是：', '重新计算所有费用', '核对报销凭证的日期、地点、金额是否合理，并与出差日志、签到表等交叉验证', '抽查一部分凭证', '询问所有员工', 'B', NULL),
(@pack_id, 40, '“分析性程序”在舞弊调查中的基本逻辑是：', '对财务数据进行详细测试', '通过研究不同财务及非财务数据之间的一致性或异常波动，来识别风险', '随机抽查凭证', '检查所有原始单据', 'B', NULL),
(@pack_id, 41, '法务会计师出庭作证时，面对对方律师的“交叉质询”，应做到：', '据理力争，与对方辩论', '只回答被问到的问题，不主动提供额外信息，保持冷静和专业', '寻求法官帮助', '拒绝回答', 'B', NULL),
(@pack_id, 42, '“贝叶斯定理”在法务会计中的应用可以帮助：', '计算利润', '在获得新证据后，量化更新对特定事实（如舞弊是否存在）的信念概率', '预测股市', '设计调查问卷', 'B', NULL),
(@pack_id, 43, '“员工盗取存货”是资产挪用的一种，有效的防范措施是：', '加强出入库管理和定期、突击盘点', '给予员工高薪', '安装摄像头', '减少存货数量', 'A', NULL),
(@pack_id, 44, '法务会计师在计算因人身伤害（如车祸）导致的未来收入损失时，需要考虑：', '受伤前的收入水平', '伤者的职业、年龄、教育背景', '预计的职业生涯年限和收入增长率', '以上都是', 'D', NULL),
(@pack_id, 45, '“垂涎效应” (Coveting Effect) 在舞弊风险因素中指的是：', '员工嫉妒同事的职位', '高管觊觎公司的资金或资产', '公司想超越竞争对手', '审计师想获得更多业务', 'B', NULL),
(@pack_id, 46, '在数据分析中，“本福特定律 (Benford\'s Law)” 可以用于：', '验证数据是否随机生成', '识别财务数据中的人为操纵痕迹（例如，数字首位分布不符合自然规律）', '计算平均值', '预测时间序列', 'B', NULL),
(@pack_id, 47, '在处理涉及并购的合同纠纷时，法务会计师需要评估“交割账目调整”是否正确，这属于：', '舞弊调查', '合规审计', '合同约定的财务核查', '税务申报', 'C', NULL),
(@pack_id, 48, '法务会计调查的最终目的是：', '将所有舞弊者送进监狱', '挽回所有经济损失', '为法律行动（民事或刑事）提供有力的财务证据支持，以解决争议', '写出一份报告', 'C', NULL),
(@pack_id, 49, '“文化”在舞弊预防中的作用体现在：', '建立诚实、正直的企业文化，从高层做起（Tone at the Top）', '多元文化更容易舞弊', '文化无关紧要', '只有西方文化讲诚信', 'A', NULL),
(@pack_id, 50, '法务会计师的核心价值是：', '会做账', '懂法律', '能将财务量化分析严格地应用于法律语境，弥合两者之间的鸿沟', '会编程', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业29：税务律师 (法学×会计学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_accounting:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_accounting:1', 29, '税务律师', 'major_law', 'major_accounting', '法学×会计学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '税务律师与普通会计师处理税务问题的最大区别在于：', '税务律师计算更准确', '税务律师专注于税务争议解决、筹划中的法律解释与合规，以及代理税务行政诉讼/刑事诉讼', '税务律师收费更低', '税务律师只做国际税收', 'B', NULL),
(@pack_id, 2, '以下哪个行为属于合法的“税务筹划”？', '伪造发票增加成本', '隐瞒收入不入账', '利用税收优惠政策（如高新技术企业税率优惠）合理安排业务架构', '虚报残疾人员工资加计扣除', 'C', NULL),
(@pack_id, 3, '“穿透原则”在企业所得税中通常应用于：', '合伙企业', '有限责任公司', '股份有限公司', '个人独资企业', 'A', NULL),
(@pack_id, 4, '当纳税人与税务机关就补税问题发生争议，在缴清税款或提供担保后，可以申请：', '行政复议', '直接向法院起诉', '媒体曝光', '找领导说情', 'A', NULL),
(@pack_id, 5, '增值税中，“进项税额”不得抵扣的情况不包括：', '用于简易计税方法计税项目的购进货物', '用于集体福利的购进货物', '从正规供应商处采购生产用原材料取得的专用发票', '非正常损失的购进货物', 'C', NULL),
(@pack_id, 6, '税务律师在为企业设计跨境交易架构时，首要考虑的是：', '将利润全部留在海外', '遵守税收协定，避免双重征税，同时防止被认定为避税地被用于恶意避税', '任意选择交易币种', '忽略转让定价规则', 'B', NULL),
(@pack_id, 7, '在处理税务争议时，“举证责任倒置”通常适用于：', '纳税人起诉税务机关的行政诉讼，税务机关需证明其具体行政行为合法', '纳税人证明自己无过错', '刑事案件的公诉方', '民事诉讼的原告', 'A', NULL),
(@pack_id, 8, '“资本弱化”是指企业通过增加哪种融资方式来减少税负？', '股权融资', '债权融资（增加利息抵扣）', '内部融资', '政府补助', 'B', NULL),
(@pack_id, 9, '以下哪项是个人所得税的综合所得？', '工资、薪金所得', '经营所得', '利息、股息、红利所得', '财产租赁所得', 'A', NULL),
(@pack_id, 10, '“税收饶让”在税收抵免中是指：', '饶恕纳税人', '居民国对纳税人在来源国因享受税收优惠而少缴的税款，视同已经缴纳并给予抵免', '两国共享税收管辖权', '一种税务处罚方式', 'B', NULL),
(@pack_id, 11, '税务律师审查一份“对赌协议”时，首要关注的税务风险是：', '协议的公平性', '协议中约定的补偿款或股权转让时的税务处理是否清晰，是否可能被税局重新定性', '协议的字数', '协议的签署地点', 'B', NULL),
(@pack_id, 12, '企业重组的“特殊性税务处理”主要目的是：', '立即缴纳税款', '递延纳税，减轻企业重组时的现金流压力', '增加税负', '简化会计处理', 'B', NULL),
(@pack_id, 13, '在处理一起虚开增值税专用发票案件时，税务律师需要区分的核心是：', '发票是真是假', '是“有货虚开”、“无货虚开”还是“代开”，以及行为人是否具有骗税目的和造成税款损失', '金额大小', '开票公司规模', 'B', NULL),
(@pack_id, 14, '“税收法定原则”的核心含义是：', '政府可以随意征税', '征税必须有法律依据，没有法律依据，不得征税', '纳税人必须依法纳税', '税务干部要依法办事', 'B', NULL),
(@pack_id, 15, '国际税收中的“常设机构”概念，用于确定：', '公司总部所在地', '一国对非居民企业营业利润是否拥有征税权', '员工的居住地', '商品的销售地点', 'B', NULL),
(@pack_id, 16, '当面临税务机关的纳税评估和稽查时，企业应：', '隐藏所有账簿', '积极应对，在律师指导下提供资料，行使陈述、申辩和申请听证的权利', '一律拒绝回答', '立即销毁证据', 'B', NULL),
(@pack_id, 17, '“关联交易”的“独立交易原则”要求：', '交易必须和陌生人做', '关联方之间的交易定价应当与无关联方在相同或类似情况下的交易定价一致', '禁止任何关联交易', '关联交易价格越低越好', 'B', NULL),
(@pack_id, 18, '个人所得税中，居民个人与非居民个人的判断标准主要是：', '国籍', '住所和在中国境内居住天数', '是否买房', '工作单位性质', 'B', NULL),
(@pack_id, 19, '“预约定价安排 (APA)” 是纳税人与税务机关就什么达成的协议？', '未来年度关联交易的定价原则和计算方法', '纳税时间', '纳税地点', '税收优惠', 'A', NULL),
(@pack_id, 20, '税务行政诉讼中，法院一般不会审查税务机关的：', '事实认定是否清楚', '适用法律是否正确', '程序是否合法', '税收政策的合理性', 'D', NULL),
(@pack_id, 21, '“税收洼地”通常指：', '地理上的盆地', '有效税率显著低于其他地区的区域，常被用于税务筹划但也带来反避税风险', '税务局所在的地方', '没有税收的地方', 'B', NULL),
(@pack_id, 22, '在处理遗产税（如有）或家族财富传承时，税务律师会建议使用：', '直接赠与', '遗嘱', '家族信托', '以上都是，需综合规划', 'D', NULL),
(@pack_id, 23, '“加收滞纳金”是税务机关对哪种行为采取的措施？', '偷税', '抗税', '未按期缴纳税款', '骗税', 'C', NULL),
(@pack_id, 24, '“税收行政复议”的前置条件通常是：', '缴纳税款或提供担保', '聘请律师', '媒体曝光', '向检察院举报', 'A', NULL),
(@pack_id, 25, '“转让定价”文档（主体文档、本地文档、国别报告）的主要作用是：', '向税务机关证明关联交易符合独立交易原则', '公司内部存档', '向银行申请贷款', '向投资者展示', 'A', NULL),
(@pack_id, 26, '“反向避税”是指：', '税务局避税', '外国公司将利润转移到中国以利用税收优惠，而非传统上从中国转出利润', '纳税人拒绝纳税', '纳税筹划', 'B', NULL),
(@pack_id, 27, '在股权激励计划中，税务律师需帮助公司和个人处理：', '授予、行权、出售等环节的个人所得税问题', '只处理公司法务', '忽略税务问题', '只做会计处理', 'A', NULL),
(@pack_id, 28, '“实质重于形式”原则在税务执法中，可能导致：', '完全根据法律形式征税', '税务机关根据交易的经济实质而非法律形式来重新定性交易并征税', '减轻纳税人税负', '形式绝对优先', 'B', NULL),
(@pack_id, 29, '关于“个人所得税专项附加扣除”，下列哪项是正确的？', '只要申报就能扣除', '包括子女教育、继续教育、大病医疗、住房贷款利息或租金、赡养老人等项目', '无额度限制', '只能由高收入者享受', 'B', NULL),
(@pack_id, 30, '税务律师在为客户做税务筹划时，不能触碰的底线是：', '降低税负', '利用合法优惠', '伪造、变造、隐匿记账凭证', '延迟纳税时间', 'C', NULL),
(@pack_id, 31, '“税收管辖权”中的“属地原则”是指：', '对人的管辖权，依据纳税人的身份', '对事的管辖权，依据来源于本国境内的所得', '国际法院的管辖权', '联合国的管辖权', 'B', NULL),
(@pack_id, 32, '公司分立选择特殊性税务处理时，需满足“具有合理商业目的”且“不以减少、免除或推迟缴纳税款为主要目的”。此条款是反避税的：', '一般反避税条款', '特别反避税条款', '程序性条款', '处罚性条款', 'A', NULL),
(@pack_id, 33, '税务机关进行纳税调整的最长期限，在避税行为中，通常为：', '3年', '5年', '10年', '无限期', 'C', '一般反避税可追溯10年'),
(@pack_id, 34, '以下哪项不属于税务律师在并购交易中的工作？', '进行税务尽职调查，发现目标公司潜在税务风险', '设计节税的交易架构（股权收购VS资产收购）', '负责交易谈判的全部商务条款', '审阅并起草税务相关条款', 'C', NULL),
(@pack_id, 35, '“税收饶让抵免”主要存在于：', '国内税法', '税收协定', '会计准则', '公司法', 'B', NULL),
(@pack_id, 36, '如果纳税人认为税务处理决定侵犯了其合法权益，申请行政复议的期限通常是：', '知道该行政行为之日起15日内', '60日内', '3个月内', '1年内', 'B', NULL),
(@pack_id, 37, '“非居民企业”通过境内外商投资企业进行“间接股权转让”，可能面临：', '无需缴税', '中国税务机关依据“实质重于形式”原则，重新定性为直接转让中国应税财产并征税', '只要没有合同就不征税', '由境外公司自行决定', 'B', NULL),
(@pack_id, 38, '税务律师处理“税务刑事风险”时，首要目标是：', '证明无罪或争取最轻处罚，同时指导客户进行合规整改', '制造证据', '贿赂办案人员', '拖延时间', 'A', NULL),
(@pack_id, 39, '“留抵退税”政策是针对哪种税种？', '企业所得税', '个人所得税', '增值税', '印花税', 'C', NULL),
(@pack_id, 40, '“税收筹划”与“避税”的区别在于：', '前者合法，后者不合法', '前者不合法，后者合法', '两者没有区别', '前者节税效果更好', 'A', '避税是钻法律漏洞，虽然可能形式上不违法，但违背立法精神，易被反避税调整'),
(@pack_id, 41, '在“金税四期”工程下，税务机关的监管特点是：', '以票控税', '以数治税，多部门信息联网，实现对企业全生命周期、全业务链条的智能监控', '抽查管理', '手工查账', 'B', NULL),
(@pack_id, 42, '个人从中国境外取得所得，已在境外缴纳的个人所得税，可以在国内申请：', '豁免', '税收抵免，但有限额', '退税', '减免', 'B', NULL),
(@pack_id, 43, '税务律师在为客户进行“税务健康检查”时，主要目的是：', '计算应补税款', '系统性地发现潜在的税务合规风险，并提出整改建议', '准备财务报告', '寻找税务筹划机会', 'B', NULL),
(@pack_id, 44, '“税收刑法”中，“逃税罪”与“逃避追缴欠税罪”的主要区别在于：', '罪名不同', '手段不同（逃税用欺骗隐瞒，逃避追缴欠税在欠税后转移资产）', '金额大小', '纳税人类型', 'B', NULL),
(@pack_id, 45, '在设立个体工商户、合伙企业还是有限责任公司时，税务律师需重点分析：', '名称哪个好听', '不同组织形式下的所得税负差异（穿透纳税 vs. 企业所得税+分红个税）', '注册地址', '员工数量', 'B', NULL),
(@pack_id, 46, '“受控外国公司 (CFC)” 规则针对的是：', '中国公司控制的外国子公司', '外国公司控制的中国子公司', '所有外国公司', '所有中国公司', 'A', '防止将利润留在低税率地区不分配来延迟纳税'),
(@pack_id, 47, '税务律师在代理税务听证时，可以：', '代替纳税人接受处罚', '陈述案情、进行申辩和质证', '直接决定听证结果', '要求更换听证员', 'B', NULL),
(@pack_id, 48, '“增值税专用发票”与“普通发票”的核心区别在于：', '专票可以抵扣进项税，普票一般不能', '专票是白色的，普票是彩色的', '专票金额更大', '专票需要手工填写', 'A', NULL),
(@pack_id, 49, '企业已经注销，税务机关可以追缴其欠税吗？', '不可以，法人已不存在', '可以，在符合条件下追溯至股东等责任主体', '只能追缴本金，不能追缴滞纳金', '由股东自愿决定', 'B', NULL),
(@pack_id, 50, '税务律师的核心竞争力是：', '精通税法条文和会计处理，并拥有解决实际争议和提供前瞻性筹划的策略思维', '人脉关系广', '收费最低', '办公地点在税务局旁边', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业30：合规审计师 (法学×会计学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_accounting:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_accounting:2', 30, '合规审计师', 'major_law', 'major_accounting', '法学×会计学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '“内部审计”与“合规审计”的主要关系是：', '两者完全相同', '合规审计是内部审计的一个重要分支，侧重于检查对法律法规、政策和标准的遵循情况', '内部审计是合规审计的一个分支', '两者没有任何关系', 'B', NULL),
(@pack_id, 2, '以下哪个是COSO委员会发布的《内部控制整合框架》的核心目标之一？', '最大化利润', '合理保证财务报告的可靠性、经营的效果和效率，以及法律法规的遵循', '扩大市场份额', '提高员工满意度', 'B', NULL),
(@pack_id, 3, '合规审计师在进行风险评估时，最常用的方法是：', '询问前台人员', '基于风险大小和发生可能性的风险矩阵，对组织各业务单元和流程进行排序', '平均分配审计资源', '只审计过去的错误', 'B', NULL),
(@pack_id, 4, '“合规框架”通常不包括以下哪个要素？', '政策和流程', '培训和沟通', '个人年终奖金额', '监控和审计机制', 'C', NULL),
(@pack_id, 5, '在审计抽样中，“置信水平”表示：', '审计人员的自信程度', '样本结果代表总体的概率', '可接受的误受风险', '样本规模的大小', 'B', NULL),
(@pack_id, 6, '合规审计师发现一个非重大的流程违规，但该违规可能导致高管个人不当获利，应首先：', '认为问题不大，忽略', '根据公司举报和反舞弊政策，按流程上报，评估是否需要深入调查', '直接向媒体曝光', '私下与高管交换条件', 'B', NULL),
(@pack_id, 7, '“萨班斯-奥克斯利法案 (SOX)” 对合规审计最重要的影响是：', '要求美国所有公司都必须上市', '要求管理层对财务报告内部控制的有效性进行评估，并要求审计师出具证明', '取消了内部审计部门', '只针对会计师事务所', 'B', NULL),
(@pack_id, 8, '合规审计中的“穿行测试”是指：', '随机抽样', '选取一笔或几笔典型交易，从头到尾跟踪其处理的整个过程，以验证控制点是否有效执行', '检查所有交易', '访谈所有员工', 'B', NULL),
(@pack_id, 9, '“合规文化”的建立，最关键的角色是：', '合规部门全体员工', '基层员工', '高级管理层（董事会和高管），即“Tone at the Top”', '外部审计师', 'C', NULL),
(@pack_id, 10, '内部审计师在执行工作时，必须保持：', '账实相符', '客观性和独立性，不参与被审计业务的实际管理', '与所有被审计人员友好', '高强度工作压力', 'B', NULL),
(@pack_id, 11, '以下哪个是典型的“合规风险”？', '新产品市场占有率低于预期', '服务器宕机导致业务中断', '违反反商业贿赂法律而受到政府罚款', '优秀员工跳槽', 'C', NULL),
(@pack_id, 12, '审计证据的“充分性”和“适当性”中，“适当性”包含相关性和：', '及时性', '准确性', '可靠性', '完整性', 'C', NULL),
(@pack_id, 13, '“持续审计”与“定期审计”相比，主要优势是：', '成本更低', '可以发现非重复性、或需要实时监控的风险，如高频交易异常', '不需要审计计划', '不需要审计人员', 'B', NULL),
(@pack_id, 14, '合规审计师在审查采购流程时，发现采购订单、入库单、发票三单合一核对存在漏洞，这属于内控的哪个环节缺陷？', '控制环境', '风险评估', '控制活动 (预防性或检查性控制缺失)', '监督', 'C', NULL),
(@pack_id, 15, '当公司进入一个新的国家市场，合规审计师应首先帮助识别：', '当地的旅游景点', '当地的法律法规要求（如数据隐私、反腐败、劳工、税务），并与公司现有合规框架进行差距分析', '当地饮食口味', '当地的语言', 'B', NULL),
(@pack_id, 16, '“审计委员会”在上市公司治理结构中的主要作用是：', '执行具体审计任务', '代表董事会监督财务报告、内控和审计职能，增强客观性', '审核销售合同', '招聘CEO', 'B', NULL),
(@pack_id, 17, '在编制审计计划时，“重要性水平”是指：', '某个审计程序的重要性', '一个阈值，超过该阈值的错报或违规可能影响使用者决策', '审计人员的职位高低', '审计费用的高低', 'B', NULL),
(@pack_id, 18, '合规审计师针对“利益冲突”进行审查时，最有效的数据查询是：', '员工花名册', '员工及其近亲属名单与供应商、客户股东/董监高名单的比对分析', '财务报表', '销售台账', 'B', NULL),
(@pack_id, 19, '“监管报送”合规要求，主要针对的是：', '公司内部报告', '按照监管机构（如证监会、银保监会）要求，定期或不定期向其报送业务和财务数据', '年度工作总结', '新闻稿', 'B', NULL),
(@pack_id, 20, '内部审计报告应至少包括：审计范围、审计发现、审计结论和：', '被审计单位的财务报告', '被审计单位的考勤记录', '改进建议', '审计人员的个人简历', 'C', NULL),
(@pack_id, 21, '对于审计发现的整改跟踪，合规审计师的职责是：', '亲自去整改所有问题', '确认管理层是否制定了整改计划，并在后续审计中验证整改措施的有效性', '忽略，报告写完就结束了', '处罚相关责任人', 'B', NULL),
(@pack_id, 22, '“合规风险”的“固有风险”和“剩余风险”的区别在于：', '是否考虑了管理层采取的控制措施', '风险的大小', '风险的类型', '风险发生的时间', 'A', NULL),
(@pack_id, 23, '在反海外腐败法 (FCPA) 合规审计中，特别关注：', '产品质量', '向外国政府官员提供的任何礼品、招待、差旅费用是否有商业贿赂风险', '员工着装规范', '办公用品采购', 'B', NULL),
(@pack_id, 24, '合规审计中使用的“数据分析”技术，可以：', '完全替代审计师判断', '帮助审计师识别异常模式、进行全量测试、提高审计覆盖率', '保证绝对准确', '自动生成审计报告', 'B', NULL),
(@pack_id, 25, '审计证据中的“实物证据”（如现场盘点的库存）相对于“言词证据”（如访谈记录）通常：', '可靠性更低', '可靠性更高', '两者可靠性相同', '不可比', 'B', NULL),
(@pack_id, 26, '“反洗钱 (AML)” 合规审计中，核心审查点是：', '公司现金流是否充足', '客户身份识别（KYC）、大额和可疑交易报告制度是否健全和执行到位', '投资回报率', '产品性价比', 'B', NULL),
(@pack_id, 27, '审计中发现一项控制缺陷，被评估为“重大缺陷”，意味着：', '有缺陷但不严重', '存在合理的可能性，导致未能及时防止或发现财务报表的重大错报', '只是一个建议', '可以忽略', 'B', NULL),
(@pack_id, 28, '“三线模型”中，“第一道防线”是指：', '内部审计', '管理层（业务部门）的内控和自我监督', '合规、风控部门', '董事会', 'B', NULL),
(@pack_id, 29, '合规审计师在进行供应商合规审查时，通常会关注：', '供应商员工的着装', '供应商的反腐败合规、数据安全、劳动用工等社会责任的承诺和执行情况', '供应商的食堂伙食', '供应商的办公环境绿化', 'B', NULL),
(@pack_id, 30, '“审计工作底稿”的主要功能是：', '培训新员工', '记录审计程序、证据和结论，支持审计意见，并作为质量控制和质量检查的依据', '公司宣传材料', '与客户沟通的信件', 'B', NULL),
(@pack_id, 31, '“合规审计”与“法务会计”的区别之一是：', '法务会计主要关注事后的舞弊调查，合规审计更侧重于对制度遵循性的持续评估和预防', '合规审计只查账', '法务会计是内部审计的一种', '两者完全相同', 'A', NULL),
(@pack_id, 32, '以下哪项是评价合规培训有效性的最佳方式？', '员工签到表', '培训后的考试通过率', '通过后续审计或匿名问卷，评估员工对合规政策的理解深度和行为改变', '培训讲师的知名度', 'C', NULL),
(@pack_id, 33, '审计抽样中的“误受风险”是指：', '审计人员错误地接受了总体不可接受', '审计人员错误地拒绝了总体可接受', '抽样偏差', '非抽样风险', 'A', '这是审计风险中最危险的一种'),
(@pack_id, 34, '在《个人信息保护法》合规审计中，需要重点审查：', '公司电脑的CPU型号', '是否建立了“告知-同意”机制，以及对个人信息处理活动的全流程记录', '公司网站的访问量', '财务报销流程', 'B', NULL),
(@pack_id, 35, '内部审计部门的报告关系，最好应直接向谁汇报？', 'CEO', 'CFO', '审计委员会或董事会', '销售总监', 'C', NULL),
(@pack_id, 36, '“控制自我评估 (CSA)” 是一种管理技术，它：', '由审计师全权负责评估', '鼓励业务部门主动评估自身的内控有效性，提升内控意识', '只适用于财务部门', '是一种复杂的数学模型', 'B', NULL),
(@pack_id, 37, '当发现一位业绩很好的高管违反了公司极其重要的合规政策（如利益冲突）时，合规审计师应：', '因业绩好而默许', '严格依据制度和法律，报告违规事实，不因个人业绩而做主观偏袒或加重', '私下警告，不上报', '与其合作分钱', 'B', NULL),
(@pack_id, 38, '审计报告中，提出“有保留意见”意味着：', '财务报表在所有重大方面是公允的', '除了某个特定事项外，其他方面是公允的', '财务报表是虚假的', '无法表示意见', 'B', NULL),
(@pack_id, 39, '合规审计师在审查“第三方（如经销商、顾问）”时，主要风险点是：', '第三方的财务能力', '第三方可能被用来作为行贿或规避制裁的工具', '第三方员工的年龄', '第三方的办公面积', 'B', NULL),
(@pack_id, 40, '“审计风险模型”：审计风险 = 固有风险 × 控制风险 × 检查风险。在该模型中，审计师可以控制和降低的是：', '固有风险', '控制风险', '检查风险', '审计风险', 'C', NULL),
(@pack_id, 41, '以下哪项行为最可能违反“反垄断/竞争法”合规要求？', '与竞争对手达成价格同盟或划分市场协议', '提供高质量产品', '进行广告宣传', '降低产品售价', 'A', NULL),
(@pack_id, 42, '“可持续审计”除了审计财务和合规，也开始关注：', '公司慈善活动', '环境、社会及治理 (ESG) 绩效', '员工生日会', '客户满意度', 'B', NULL),
(@pack_id, 43, '审计过程中，如果需要获取敏感信息，应遵循：', '随意获取', '“按需知密”和最小化原则，并在公司授权范围内进行', '拷贝一份带回家', '告诉所有同事', 'B', NULL),
(@pack_id, 44, '合规审计师在审查“政治献金”或“游说活动”时，主要依据：', '个人喜好', '公司内部政策和相关国家/地区的法律', '金额大小', '收款人的知名度', 'B', NULL),
(@pack_id, 45, '“敏捷审计”是一种新兴方法，强调：', '快速完成审计', '更短的周期、更频繁的沟通、迭代式的计划和成果交付，以适应快速变化的业务环境', '使用更少的人', '只审计高风险领域', 'B', NULL),
(@pack_id, 46, '给被审计单位出具“管理建议书”的主要目的是：', '批评被审计单位', '超越财务报表本身，提出改善内控、提升效率的增值性建议', '替代审计报告', '满足法规要求', 'B', NULL),
(@pack_id, 47, '合规审计师的最终责任是向谁提供关于合规状况的独立、客观的保证？', '公司管理层和董事会/审计委员会', '社会公众', '客户', '供应商', 'A', NULL),
(@pack_id, 48, '在审计中，如果需要使用“专家”工作，审计师需要：', '完全依赖专家结论', '评估专家的客观性、专业能力和所做工作的适当性', '不需要评估', '只使用公司内部专家', 'B', NULL),
(@pack_id, 49, '“七罪”之“嫉妒”在审计专业语境下，可能指审计师：', '工作不努力', '对客户的更高待遇或绩效表示不满，影响客观判断', '缺乏职业怀疑态度', '过于自信', 'B', NULL),
(@pack_id, 50, '合规审计师的核心价值观是：', '帮助公司赚钱', '恪守独立、客观、保密和专业胜任能力，为组织保驾护航', '成为业务部门的帮手', '尽可能少地发现问题', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业31：网络与信息安全律师 (法学×计算机科学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_cs:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_cs:0', 31, '网络与信息安全律师', 'major_law', 'major_cs', '法学×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '网络与信息安全律师的核心业务不包括：', '协助企业建立网络安全合规体系', '处理数据泄露事件的应急响应和监管通报', '编写防火墙规则和入侵检测策略', '代理网络安全相关的行政诉讼或民事诉讼', 'C', NULL),
(@pack_id, 2, '《网络安全法》中，关键信息基础设施（CII）的运营者在我国境内运营中收集和产生的个人信息和重要数据，应当在：', '全球任何地方存储', '境外的安全服务器存储', '境内存储', '不存储', 'C', NULL),
(@pack_id, 3, '“等保2.0”（网络安全等级保护制度）的核心要求是：', '所有系统等级相同', '网络运营者根据系统的重要程度，定级并实施相应级别的安全保护措施', '企业可自行决定是否做等保', '只适用于政府网站', 'B', NULL),
(@pack_id, 4, '电子取证中，证据的“完整性”是指：', '证据内容完美无缺', '证据从获取到呈堂的整个链条中，未被以任何方式篡改', '证据包含所有信息', '证据形式完整', 'B', NULL),
(@pack_id, 5, 'ISO/IEC 27001 标准是关于什么的？', '质量管理体系', '环境管理体系', '信息安全管理体系 (ISMS)', '食品安全管理体系', 'C', NULL),
(@pack_id, 6, '当发生数据泄露事件时，以下哪项不是律师的首要建议？', '立即断开所有网络连接，销毁证据', '启动应急响应预案，固定证据，通知法务和合规部门', '评估泄露范围和影响，判断是否触发监管报告义务（如向网信办、公安报告）', '评估是否需要通知受影响的个人', 'A', NULL),
(@pack_id, 7, '“爬虫协议”（Robots协议）的法律性质是：', '具有强制法律效力的规范', '行业自律的“君子协定”，过度爬取可能构成不正当竞争或侵权', '国际公约', '国家标准', 'B', NULL),
(@pack_id, 8, '《个人信息保护法》中的“单独同意”是指：', '与一揽子同意一样', '处理个人敏感信息、向第三方提供等特定场景下，需要个人专门、明确地同意，不能与其他事项捆绑', '父母一方同意即可', '无需同意', 'B', NULL),
(@pack_id, 9, '电子取证过程中，使用写保护工具（Write Blocker）的目的是：', '加快取证速度', '防止在取证过程中对原始电子数据介质进行任何写入操作，确保证据的原始性', '解密数据', '压缩数据', 'B', NULL),
(@pack_id, 10, '以下哪项行为可能违反《网络安全法》对“网络实名制”的要求？', '用户使用手机号注册APP', '论坛允许用户匿名发帖，且后台未记录其真实身份信息', '电商平台要求用户绑定银行卡', '企业微信使用企业邮箱登录', 'B', NULL),
(@pack_id, 11, '网络安全事件中，“应急响应”的首要法律目标是：', '尽快恢复业务', '控制危害蔓延，保全证据，并履行法律规定的通知和报告义务', '调查攻击者是谁', '修复所有漏洞', 'B', NULL),
(@pack_id, 12, 'ISO27001中的“PDCA”循环是指：', '计划、执行、检查、改进', '策划、实施、检查、处置', '准备、开发、确认、评估', '政策、指令、控制、审计', 'B', NULL),
(@pack_id, 13, '“数据出境安全评估”的申报主体通常是：', '任何个人', '关键信息基础设施运营者或处理大量个人信息的数据处理者', '境外接收方', '所有互联网公司', 'B', NULL),
(@pack_id, 14, '律师在协助企业建立网络安全事件应急预案时，应包含的法律层面内容包括：', '备份数据库的技术命令', '删除攻击日志的指令', '监管部门报告流程、通知用户的话术、与执法部门配合的指引', '关闭服务器的步骤', 'C', NULL),
(@pack_id, 15, '“自动化决策”在《个人信息保护法》下，用户有权：', '完全禁止任何自动化决策', '要求个人信息处理者对决策进行说明，并拒绝仅通过自动化决策做出的决定（如有重大影响）', '要求删除所有用于决策的数据', '要求公开算法源代码', 'B', NULL),
(@pack_id, 16, '电子取证中的“元数据”（Metadata）是指：', '数据的数据，如文件的创建时间、修改时间、作者、大小等', '数据的内容', '加密后的数据', '已删除的数据', 'A', NULL),
(@pack_id, 17, '《密码法》对“核心密码”和“普通密码”的管理要求是：', '可以公开', '严格保密，依法管理', '由企业自行管理', '不需要管理', 'B', NULL),
(@pack_id, 18, '企业因违反网络安全义务被网信部门约谈，法律性质属于：', '刑事处罚', '行政处罚前的告诫或警示', '民事赔偿', '行政强制措施', 'B', NULL),
(@pack_id, 19, '“安全港”原则在数据跨境传输中，通常是指：', '只要数据加密就可出境', '接收方所在国被欧盟等认定为提供充分保护水平的国家，数据传输可简化程序', '可以随意传输', '不需要任何条件', 'B', NULL),
(@pack_id, 20, '律师为上市公司的网络安全合规提供法律意见时，应重点审查：', '公司代码仓库', '公司是否建立了符合监管要求的网络安全、数据治理制度并有效执行，是否存在重大违规处罚风险', '公司服务器配置', '员工考勤记录', 'B', NULL),
(@pack_id, 21, '“入侵检测系统 (IDS)” 记录的攻击日志，在法律诉讼中属于：', '非法证据', '电子数据证据', '证人证言', '物证', 'B', NULL),
(@pack_id, 22, '《未成年人保护法》对网络服务提供者的特殊合规要求是：', '提供更快的网速', '针对未成年人使用其服务设置相应的时间管理、权限管理、消费管理等功能', '禁止未成年人注册', '提供所有游戏内容', 'B', NULL),
(@pack_id, 23, '企业云服务合同中，用户最应关注的网络安全责任条款是：', '云服务商的免责条款范围', '数据安全、数据归属、泄露责任分担、审计权和通知义务', '收费标准', '客服电话', 'B', NULL),
(@pack_id, 24, '“安全漏洞”的披露，律师应建议企业：', '立即公开所有细节', '永远保密', '遵循负责任的披露原则，先通知受影响方和监管机构，给予修复时间再公开', '卖给攻击者', 'C', NULL),
(@pack_id, 25, '在网络安全犯罪中，“破坏计算机信息系统罪”与“非法获取计算机信息系统数据罪”的区别之一是：', '一个是故意，一个是过失', '前者的核心行为是破坏系统功能或数据，后者的核心是窃取数据', '一个针对个人，一个针对企业', '没有区别', 'B', NULL),
(@pack_id, 26, '“认证”和“授权”在信息安全法律语境下的区别：', '认证是证明你是谁，授权是决定你能做什么', '认证是决定你能做什么，授权是证明你是谁', '两者相同', '无关', 'A', NULL),
(@pack_id, 27, '企业在进行网络安全漏洞测试时，律师应提醒注意：', '可以直接在任何系统上测试', '必须在授权范围内进行，避免触犯“非法侵入”的法律风险', '测试过程必须公开', '使用超级计算机', 'B', NULL),
(@pack_id, 28, '“隐私政策”是网站/APP对外告知用户如何收集使用其个人信息的法律文件。其核心法律要求是：', '写得越简单越好', '清晰、准确、完整地告知处理规则，并获取用户的同意', '可以随时修改', '不需要公开', 'B', NULL),
(@pack_id, 29, '律师在审查安全厂商提供的“安全态势感知”产品时，应关注其数据收集行为是否：', '技术先进', '超越了最小必要原则，收集了大量无关的个人信息或企业敏感数据', '成本较低', '界面美观', 'B', NULL),
(@pack_id, 30, '“数据可携权”赋予用户的权利是：', '可以要求删除所有数据', '可以将自己提供的个人信息从一个服务商转移到另一个服务商', '可以要求查看所有后台日志', '可以要求分享数据给任何人', 'B', NULL),
(@pack_id, 31, 'ISO27001 认证对于企业的价值，最主要体现在：', '提高股价', '系统性地证明其信息安全管理体系符合国际最佳实践，降低风险，赢得客户信任', '免费获得安全产品', '可以免于法律责任', 'B', NULL),
(@pack_id, 32, '“拒绝服务攻击 (DDoS)” 的主要法律后果是：', '刑事责任（破坏计算机信息系统）', '民事责任（赔偿损失）', '行政责任', '以上都有可能', 'D', NULL),
(@pack_id, 33, '律师在审查一份“数据委托处理”合同时，核心条款是：', '委托方的数据处理目的、范围、方式，以及受托方的安全保护义务和禁止转委托', '服务价格', '合同有效期', '争议解决方式', 'A', NULL),
(@pack_id, 34, '“网络安全审查”主要针对：', '所有国外软件', '影响或可能影响国家安全的关键信息基础设施运营者采购网络产品和服务', '个人使用的APP', '小型网站', 'B', NULL),
(@pack_id, 35, '对于“深度合成（Deepfake）”技术，法律规定要求：', '禁止使用', '使用时应进行显著标识，不得用于制作、发布虚假新闻', '无需任何监管', '只能用于娱乐', 'B', NULL),
(@pack_id, 36, '律师在协助企业应对数据泄露的监管调查时，应：', '隐瞒事实', '销毁服务器', '在律师-客户保密特权框架下，协助企业开展内部调查，合法合规地向监管机构提交所需信息', '指责员工', 'C', NULL),
(@pack_id, 37, '“电子签名法”中的“可靠电子签名”需满足“专有、控制、改动可被发现”等条件，其法律效力与：', '手写签名或盖章相同', '低于手写签名', '高于手写签名', '没有法律效力', 'A', NULL),
(@pack_id, 38, '企业购买网络攻击保险前，律师应协助审查：', '保费高低', '保险条款中关于“战争行为”、“恐怖主义”等除外责任，以及合规性要求（如是否有安全基线）', '保险公司的知名度', '保险销售人员的口才', 'B', NULL),
(@pack_id, 39, '“数据分类分级”制度的法律基础是要求企业：', '将所有数据都归为核心数据', '根据数据在经济社会发展中的重要程度，以及被篡改、破坏、泄露后的危害程度，进行分类分级并采取相应保护措施', '不进行分类', '公开所有数据分类', 'B', NULL),
(@pack_id, 40, '律师在涉及网络安全的知识产权纠纷中，可能处理：', '软件源代码的著作权侵权', '恶意软件传播的民事赔偿', '商业技术秘密被黑客窃取', '以上都是', 'D', NULL),
(@pack_id, 41, '“网络安全保险”的理赔，通常要求被保险人证明：', '自己没有任何责任', '已经履行了“合理的安全注意义务”', '攻击来自境外', '损失无限大', 'B', NULL),
(@pack_id, 42, '《数据安全法》建立的数据安全审查制度，其审查内容侧重于：', '个人隐私', '数据处理活动对国家安全的危害风险', '数据商业价值', '数据存储成本', 'B', NULL),
(@pack_id, 43, '律师为跨国企业提供数据合规意见时，必须协调的法律冲突是：', '中国要求数据本地化存储与其他国家/地区的长臂管辖', '遵守所有法律', '只遵守中国法律', '只遵守美国法律', 'A', NULL),
(@pack_id, 44, '“默认勾选”同意收集个人信息，在《个人信息保护法》下是：', '合法的', '违法的，必须由用户主动、明示勾选同意', '特殊情况下合法', '仅对小公司合法', 'B', NULL),
(@pack_id, 45, '在电子取证中，对于已被删除的文件，可以：', '无法恢复', '使用专业工具从磁盘未分配空间中恢复，前提是未被覆写', '直接查看', '通过查询内存恢复', 'B', NULL),
(@pack_id, 46, '企业并购中的“网络安全/数据合规尽职调查”，需要审查目标公司的：', '财务报表', '客户数据收集、处理、存储的合法性，数据泄露历史，网络安全合规资质', '员工满意度', '办公设备品牌', 'B', NULL),
(@pack_id, 47, '“移动互联网应用程序（APP）违法违规收集使用个人信息”的认定标准之一是：', 'APP必须免费', '无隐私政策', '收集个人信息与业务功能无关', '以上都是', 'D', NULL),
(@pack_id, 48, '律师在提供网络安全法律服务时，应避免：', '提供专业法律意见', '声称可以保证客户系统“绝对安全”，或指导客户采取违法手段反击攻击者', '分析法律风险', '制定应急计划', 'B', NULL),
(@pack_id, 49, '在法庭上展示电子证据时，可能需要：', '口头描述', '提供源数据、哈希值、以及从获取到呈堂的完整记录（Chain of Custody）', '仅提供复印件', '口头承诺', 'B', NULL),
(@pack_id, 50, '网络与信息安全律师的核心价值主张是：', '翻译技术语言为法律语言，管理法律风险，连接合规要求与技术实现', '编写高效的安全代码', '渗透测试技术', '计算机硬件维修', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业32：数据隐私合规官 (法学×计算机科学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_cs:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_cs:1', 32, '数据隐私合规官', 'major_law', 'major_cs', '法学×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '数据隐私合规官（DPO）的核心职责是：', '管理公司所有数据存储硬件', '监督企业的数据保护策略和活动，确保其符合GDPR、PIPL等法规要求', '开发数据分析算法', '负责数据中心的网络布线', 'B', NULL),
(@pack_id, 2, 'GDPR (通用数据保护条例) 适用的地域范围是：', '仅限于欧盟境内设立的企业', '任何处理欧盟居民个人数据的企业，无论其位于何处', '仅适用于美国企业', '仅适用于政府部门', 'B', NULL),
(@pack_id, 3, 'CCPA (加州消费者隐私法案) 赋予加州居民的权利不包括：', '知道企业收集了哪些个人信息', '要求企业删除其个人信息', '要求企业必须免费提供其产品或服务', '选择不出售其个人信息', 'C', NULL),
(@pack_id, 4, '进行“数据保护影响评估 (DPIA)” 的法律触发条件是：', '任何数据处理活动', '可能对个人权利与自由产生高风险的处理活动（如大规模监控、处理敏感数据）', '仅当数据泄露后', '处理超过10条数据', 'B', NULL),
(@pack_id, 5, '“数据保护官 (DPO)” 依法必须具备的条件是：', '拥有计算机博士学位', '必须是律师', '具有数据保护法律和实践的专业知识，并可直接向最高管理层汇报', '由数据监管机构任命', 'C', NULL),
(@pack_id, 6, '法律写作中，撰写一份《隐私影响评估报告》给管理层，应侧重于：', '引用所有法律条文原文', '识别出的风险、风险等级、建议的缓释措施以及剩余风险', '详细的技术实现代码', '市场竞争对手的情况', 'B', NULL),
(@pack_id, 7, '根据GDPR，“同意”必须是“自由给予、具体、知情、 unambiguous”的。这意味着：', '同意可以是通过长时间不操作来默认', '同意必须是一个明确的肯定性动作（如勾选、点击“我同意”）', '同意可以捆绑在服务条款中', '员工必须同意雇主的处理活动', 'B', NULL),
(@pack_id, 8, '以下哪项属于“特殊类别数据”（敏感个人信息），受到更严格的保护？', '姓名和地址', '种族、政治观点、宗教信仰、基因数据、生物识别数据', '购物偏好', '浏览器Cookies', 'B', NULL),
(@pack_id, 9, '数据隐私合规官在评估使用第三方SaaS服务（如CRM、客服系统）时，应着重审查：', 'SaaS服务的价格', 'SaaS服务商的用户界面是否美观', '与SaaS服务商签订的数据处理协议（DPA）是否包含完整的安全义务、数据返回/删除条款', 'SaaS服务商的办公地点', 'C', NULL),
(@pack_id, 10, '“Privacy by Design” 是一种理念，要求：', '在产品设计完成后再添加隐私功能', '在系统设计之初就将隐私保护作为核心要素嵌入', '隐私保护只存在于隐私政策文档中', '完全由用户自行控制隐私', 'B', NULL),
(@pack_id, 11, '根据PIPL（个人信息保护法），处理个人信息前必须向个人告知的事项不包括：', '个人信息处理者的身份和联系方式', '处理目的、方式、信息种类、保存期限', '公司未来五年的战略规划', '个人行使权利的途径', 'C', NULL),
(@pack_id, 12, '“数据泄露通知”义务要求，在发现数据泄露后，应在多长时间内向监管机构报告？', '1年', '1个月', '72小时 (GDPR) 或按规定时间 (PIPL)', '无需报告', 'C', NULL),
(@pack_id, 13, '隐私合规官在处理欧盟居民的“数据访问请求”时，必须：', '收取高额费用', '在收到请求后一个月内免费提供一份正在处理的个人数据副本', '拒绝所有请求', '转给外部律师处理', 'B', NULL),
(@pack_id, 14, '“风险评估”在隐私合规中，不仅仅是识别漏洞，更关注：', '漏洞的技术细节', '漏洞对个人权利和自由带来的潜在伤害的严重性和可能性', '修复漏洞的成本', '攻击者的身份', 'B', NULL),
(@pack_id, 15, '以下哪种数据跨境传输方式，在GDPR下是认可的合规路径？', '随意传输', '基于标准合同条款 (SCCs)', '只要数据加密即可', '只要接受国是欧盟成员国', 'B', NULL),
(@pack_id, 16, '隐私合规官应如何记录数据处理活动？', '不需要记录', '通过口头传达', '维护一份处理活动记录 (RoPA)，涵盖处理的类别、目的、接收方、传输情况等', '只在年报中提及', 'C', NULL),
(@pack_id, 17, '“有约束力的公司规则 (BCRs)” 是用于：', '约束员工的行为', '跨国公司内部进行合规的数据跨境传输', '约束供应商', '约束个人用户', 'B', NULL),
(@pack_id, 18, '隐私合规官向董事会汇报时，如果发现重大合规风险，最合适的做法是：', '隐瞒风险', '书面清晰地说明风险、可能的法律后果（如巨额罚款、声誉损失），并提供整改方案', '在邮件中简单提一下', '等待监管机构处罚后再汇报', 'B', NULL),
(@pack_id, 19, '根据GDPR，企业处理儿童的个人数据，需要征得其监护人同意，儿童年龄门槛通常是：', '任何年龄', '16周岁（成员国可降至13岁）', '18周岁', '10周岁', 'B', NULL),
(@pack_id, 20, '“Cookies” 同意规则，要求网站：', '无需任何提示', '在设置非必要的追踪Cookies前，必须获得用户的主动同意（拒绝应和同意一样容易）', '只能使用必要的Cookies', '必须列出所有Cookies的代码', 'B', NULL),
(@pack_id, 21, '隐私合规中的“数据最小化”原则是指：', '尽可能少地存储数据', '处理的数据应仅限于实现特定目的所必需的最少信息', '只收集一个数据字段', '一年后删除所有数据', 'B', NULL),
(@pack_id, 22, '如果一位数据主体认为其隐私权受到侵犯，可以直接向哪个机构投诉？', '公司董事会', '数据保护监管机构 (如国家网信办、欧盟各成员国的Data Protection Authority)', '消费者协会', '法院，但必须先投诉', 'B', NULL),
(@pack_id, 23, '根据PIPL，“单独同意”通常需要以何种形式获得？', '口头同意即可', '通过单独弹窗、勾选框等非捆绑的、明确的动作表示', '在长达数万字隐私政策末尾勾选“同意”', '默认不反对', 'B', NULL),
(@pack_id, 24, '隐私合规官在审核一份营销计划时，发现其计划购买潜在客户数据列表。他应首先评估：', '列表的价格', '列表的提供方是否获得了数据主体的明确同意，以允许其数据被转售用于营销', '列表中的数据是否完整', '列表的格式', 'B', NULL),
(@pack_id, 25, '数据主体的“更正权”是指：', '可以要求更正其个人数据中的错误', '可以要求更换数据处理者', '可以要求修改隐私政策', '可以要求提高数据质量', 'A', NULL),
(@pack_id, 26, '对个人信息处理活动进行“定期安全审计”是法律的明确要求，审计报告应：', '个人保存', '公司销毁', '留存备查', '公开在官网上', 'C', NULL),
(@pack_id, 27, '“自动化决策”的合规要求，以下哪项是正确的？', '完全禁止自动化决策', '应当保证决策的透明度和结果公平公正，并提供拒绝仅由自动化决策做出的有重大影响的决定的权利', '无需任何说明', '只能用于价格歧视', 'B', NULL),
(@pack_id, 28, '隐私合规官与信息安全官的角色区别是：', '安全官负责技术保护和攻防，合规官负责法律框架和权利义务平衡', '两者职责完全相同', '合规官是安全官的上级', '安全官是合规官的上级', 'A', NULL),
(@pack_id, 29, '“Privacy Shield” 被欧盟法院判决无效后，新的欧美数据传输机制是：', '无条件传输', '新的跨大西洋数据隐私框架 (Data Privacy Framework) 以及SCCs作为补充', '禁止任何传输', '只传输假名数据', 'B', NULL),
(@pack_id, 30, '个人在隐私合规中，最主要的控制权体现在：', '决定数据存储位置', '知情、同意、访问、更正、删除、限制处理、可携、反对等权利', '决定数据加密算法', '参与数据审计', 'B', NULL),
(@pack_id, 31, '企业因未能保护数据而面临GDPR罚款，最高可达：', '1000万欧元', '全球年营业额的2%', '2000万欧元或全球年营业额的4%（取较高者）', '无上限', 'C', NULL),
(@pack_id, 32, '“儿童在线隐私保护规则（COPPA）”主要适用于：', '所有网站', '面向13岁以下儿童的网站或在线服务，要求获得可验证的父母同意', '只适用于社交媒体', '全球所有APP', 'B', NULL),
(@pack_id, 33, '法律写作中，合同中的“数据保护条款”应明确：', '天气情况', '数据处理的目的、范围、期限、安全措施、以及发生数据泄露时双方的责任与通知流程', '双方员工伙食标准', '办公用品采购流程', 'B', NULL),
(@pack_id, 34, '“数据泄露”事件中，评估是否需要通知数据主体时，主要看：', '泄露的数据量大小', '是否可能对个人权益造成高风险（如身份盗窃、歧视、财务损失）', '公司是否愿意通知', '监管机构是否要求', 'B', NULL),
(@pack_id, 35, '隐私合规官在处理员工监控（如使用电脑监控软件）时，应特别注意：', '监控软件的技术先进性', '平衡企业合法利益与员工隐私权，进行充分告知并征得员工同意（或在法律允许下基于合法利益）', '只需告知管理层', '完全禁止任何形式的监控', 'B', NULL),
(@pack_id, 36, '“隐私声明”和“隐私政策”通常被视为同一文件，其核心是：', '公司社会责任报告', '向数据主体告知其权利和处理者义务的法律文件', '技术白皮书', '营销材料', 'B', NULL),
(@pack_id, 37, '在云服务场景下，数据控制者（客户）与数据处理者（云服务商）的责任分配原则是：', '云服务商承担全部责任', '客户承担全部责任', '控制者对数据处理的合法性和遵守指令负责，处理者按照控制者指令处理并负责安全', '两者平均分担', 'C', NULL),
(@pack_id, 38, '《数据出境安全评估办法》要求，向境外提供重要数据前，应：', '自行评估即可', '通过国家网信部门组织的安全评估', '向第三方认证机构申请认证', '签订标准合同', 'B', NULL),
(@pack_id, 39, '数据隐私合规官制定《数据主体权利响应程序》的主要目的是：', '尽可能驳回所有请求', '建立一套可操作的流程，确保在规定时限内合法、高效地处理用户的访问、删除等请求', '授权给客服部门处理', '无需程序，个案处理', 'B', NULL),
(@pack_id, 40, '“假名化 (Pseudonymization)” 与“匿名化 (Anonymization)” 的关键区别是：', '假名化数据仍属于个人数据，匿名化数据不属于', '假名化比匿名化更安全', '匿名化可逆，假名化不可逆', '没有区别', 'A', NULL),
(@pack_id, 41, '隐私合规官应如何应对监管机构的问询或调查？', '不予理睬', '积极、透明地配合，提供所需信息，展示合规努力，并在律师指导下沟通', '销毁所有证据', '指责是员工个人行为', 'B', NULL),
(@pack_id, 42, '“数据处理协议 (DPA)” 与主服务合同的关系是：', 'DPA是独立的，与服务合同无关', 'DPA是服务合同的补充协议，其条款效力不低于服务合同，冲突时以DPA为准', '服务合同包含DPA所有内容即可', 'DPA不需要签署', 'B', NULL),
(@pack_id, 43, '根据PIPL，个人信息的保存期限应当为实现处理目的所必需的：', '最长时间', '最短时间', '固定为3年', '固定为10年', 'B', NULL),
(@pack_id, 44, '隐私合规官在进行“第三方风险”管理时，应：', '完全信任所有第三方', '对所有接入个人信息的第三方进行尽职调查，并持续监督其合规情况', '禁止使用任何第三方', '只签署合同，不做监督', 'B', NULL),
(@pack_id, 45, '“数据保护影响评估 (DPIA)” 报告完成后，下一步通常是：', '存档即可', '如果风险不可接受，应咨询监管机构的意见', '公开发布', '销毁', 'B', NULL),
(@pack_id, 46, '健康类APP 在处理用户心率、步数等数据时，这些数据属于：', '一般数据', '敏感个人信息（健康数据）', '公开数据', '匿名数据', 'B', NULL),
(@pack_id, 47, '隐私合规官在参与产品开发会时，应强调：', '最短时间上线', '隐私要求应作为产品需求的一部分，在开发早期就纳入', '忽略隐私，快速迭代', '由法务部门事后审核即可', 'B', NULL),
(@pack_id, 48, '“员工隐私政策”与“客户隐私政策”的一个关键区别是：', '员工政策不需要法律依据', '员工政策中，同意的合法性基础可能较弱，更多基于“劳动合同履行”或“法定义务”', '客户政策更宽松', '没有区别', 'B', NULL),
(@pack_id, 49, '数据隐私合规领域最高级别的处罚是：', '责令整改', '警告', '刑事责任（如侵犯公民个人信息罪）', '公开谴责', 'C', NULL),
(@pack_id, 50, '一名优秀的DPO，其知识结构应是：', '仅精通法律', '仅精通技术', '精通法律、熟悉技术、理解业务、擅长沟通与风险管理', '精通销售', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业33：电子取证专家 (法学×计算机科学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_cs:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_cs:2', 33, '电子取证专家', 'major_law', 'major_cs', '法学×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '电子取证的核心原则是：', '尽快恢复所有数据', '在不改变原始数据的前提下，对电子证据进行获取、分析、保存，并保持完整的证据链', '破译所有密码', '格式化硬盘', 'B', NULL),
(@pack_id, 2, '“证据链 (Chain of Custody)” 文档必须记录：', '证据的哈希值', '每个接触过证据的人、时间、地点、目的', '分析工具的名称和版本', '以上都是', 'D', NULL),
(@pack_id, 3, '在Windows系统中，哪个文件系统最常用于存储文件，且删除文件后可通过取证工具恢复？', 'FAT32', 'NTFS', 'ext4', 'APFS', 'B', NULL),
(@pack_id, 4, '进行静态取证时，第一步通常是：', '直接开机分析', '使用写保护工具制作原始存储介质的“镜像”副本', '打印所有文件', '询问嫌疑人', 'B', NULL),
(@pack_id, 5, '“哈希值 (Hash Value)” 在取证中的主要作用是：', '加密文件', '作为证据的唯一“数字指纹”，验证副本与原件的完整性是否一致', '加快文件复制速度', '压缩文件', 'B', NULL),
(@pack_id, 6, '计算机内存 (RAM) 中的数据属于：', '持久化数据', '易失性数据，在断电后会丢失', '备份数据', '不重要的数据', 'B', NULL),
(@pack_id, 7, '在调查一起员工泄露公司机密文件的案件时，首选现场取证步骤是：', '直接拔掉电源', '拍照记录现场，提取正在运行的进程和内存信息，再进行正常关机或断电', '格式化硬盘', '通知所有员工', 'B', NULL),
(@pack_id, 8, '“文件雕复”技术主要用于：', '恢复未被删除的文件', '从没有文件系统元数据的环境中，根据文件头/尾特征恢复文件', '加密文件', '压缩文件', 'B', NULL),
(@pack_id, 9, '逆向分析通常应用于：', '重建完整的硬盘镜像', '分析恶意软件（Malware）的行为、功能和源代码', '恢复已删除的邮件', '制作取证报告', 'B', NULL),
(@pack_id, 10, '法律程序中，专家证人出具的电子取证报告应：', '充满技术术语', '使用法庭和陪审团能够理解的语言，清晰阐述取证过程、发现和结论', '尽可能简短', '只有结论', 'B', NULL),
(@pack_id, 11, '以下哪项是移动设备取证常遇到的问题？', '设备存储空间太大', '数据加密和锁屏密码', '设备太重', '电池续航过长', 'B', NULL),
(@pack_id, 12, '“日志分析”在电子取证中可以帮助：', '删除痕迹', '重建事件发生的时间线，了解攻击者的活动路径或内部人员的操作', '修改系统时间', '加速系统运行', 'B', NULL),
(@pack_id, 13, '根据法律程序，没有搜查令，公司HR是否可以私自检查员工配备的、用于工作的笔记本电脑？', '绝对不可以', '如果公司有明确的、员工已签署的IT使用政策，声明公司有权检查，通常可以', '必须征得员工口头同意', '任何时候都不可以', 'B', NULL),
(@pack_id, 14, '“时间戳”是重要的数字证据，但其容易被篡改，因此需要结合：', '其他日志', '文件系统元数据、系统日志、应用程序日志等进行关联分析', '文件大小', '文件路径', 'B', NULL),
(@pack_id, 15, '电子取证中的“数据恢复”与“数据破解”的区别是：', '恢复是找回删除的数据，破解是获取加密数据的内容', '恢复是破解的一种', '破解是恢复的一种', '两者相同', 'A', NULL),
(@pack_id, 16, '在法庭上，电子证据的“可采性 (Admissibility)” 通常取决于其：', '存储介质品牌', '相关性、真实性、完整性和合法性', '文件大小', '文件类型', 'B', NULL),
(@pack_id, 17, '处理网络攻击事件时，为了保全证据，第一步应：', '立即拔网线', '远程备份系统日志和网络流量包', '关闭所有服务器', '通知攻击者', 'B', NULL),
(@pack_id, 18, '“恶意软件逆向工程”中，静态分析是指：', '运行恶意软件，观察其行为', '在不执行代码的情况下，使用反汇编器、反编译器分析其代码逻辑', '分析网络流量', '分析内存转储', 'B', NULL),
(@pack_id, 19, '在Linux系统中，dd 命令常用于：', '删除文件', '创建磁盘或分区的逐位镜像', '查看目录', '编辑文本', 'B', NULL),
(@pack_id, 20, '法律上，电子取证专家必须保持中立和客观，其职责是：', '帮助客户赢官司', '发现事实真相，无论对哪一方有利', '隐藏不利证据', '夸大证据效力', 'B', NULL),
(@pack_id, 21, '“云取证”面临的主要挑战是：', '数据量太小', '数据物理位置不明确，访问依赖服务商API，司法管辖权复杂', '数据太容易获取', '不需要挑战', 'B', NULL),
(@pack_id, 22, '取证工具（如FTK, EnCase）的“校验和 (Checksum)” 功能用于：', '加速分析', '验证镜像文件与源介质的一致性', '解压文件', '加密报告', 'B', NULL),
(@pack_id, 23, '在调查内部人员不当使用USB拷贝数据时，Windows注册表中哪些信息可能有价值？', '字体设置', 'USBSTOR (存储设备插入记录)', '桌面壁纸', '开始菜单设置', 'B', NULL),
(@pack_id, 24, '“伪证”在电子取证报告中，如果专家故意做出虚假陈述，可能面临：', '无需负责', '法律制裁，包括罚款、职业资格吊销甚至刑事责任', '仅失去工作', '只需道歉', 'B', NULL),
(@pack_id, 25, '“网络流量分析”可以揭示：', '数据包的发送源和目的IP、协议、内容（可能加密）', '硬盘的健康状态', 'CPU的温度', '内存的电压', 'A', NULL),
(@pack_id, 26, '“RAID” 磁盘阵列在取证中，恢复数据需要：', '单独分析一块硬盘', '了解RAID级别（0,1,5等），重构虚拟磁盘后再进行分析', '直接忽略', '格式化所有盘', 'B', NULL),
(@pack_id, 27, '法律程序要求的“证据开示” (Discovery) 中，电子证据的提供方需要：', '仅提供对方明确要求的文件', '在合理范围内，以可用格式提供所有相关、非特权的电子存储信息', '拒绝提供任何电子数据', '只提供打印件', 'B', NULL),
(@pack_id, 28, '“反取证”技术是指：', '帮助取证的技术', '旨在破坏、隐藏、伪造电子证据，使取证分析变得困难的技术', '国家支持的取证技术', '开源的取证工具', 'B', NULL),
(@pack_id, 29, '手机取证中，“飞行模式”或“信号屏蔽袋”的使用是为了：', '避免数据漫游', '防止手机通过网络接收到远程擦除或锁定的指令', '节省手机电量', '方便携带', 'B', NULL),
(@pack_id, 30, '电子取证专家在法庭上作为“事实证人”还是“专家证人”的区别在于：', '事实证人可以发表意见，专家证人不能', '专家证人可以基于其专业知识发表意见，事实证人只能陈述其直接感知的事实', '两者无区别', '专家证人不能出庭', 'B', NULL),
(@pack_id, 31, '“删除”的文件，在文件系统中实际发生了什么？', '数据被彻底擦除为0', '文件标记为可覆盖，但数据仍存在于磁盘原位置直至被新数据覆盖', '文件数据被加密', '文件被移动到了回收站', 'B', NULL),
(@pack_id, 32, '在调查软件著作权侵权时，如何对比两个软件的相似性？', '比较开发者姓名', '使用代码对比工具，分析二进制代码或源代码的相似度，识别复制行为', '比较软件价格', '比较软件界面颜色', 'B', NULL),
(@pack_id, 33, '法律上，“排除合理怀疑”的证明标准主要适用于：', '民事诉讼', '刑事诉讼', '行政听证', '内部调查', 'B', NULL),
(@pack_id, 34, '“加密卷”取证的第一步通常是：', '暴力破解密码', '尝试获取解密密钥或密码（通过内存提取、关键词搜索、合法授权等）', '直接放弃', '格式化硬盘', 'B', NULL),
(@pack_id, 35, '“事件响应 (Incident Response)” 团队中的取证专家，其工作与法律团队紧密合作，目的是：', '快速清理系统，恢复业务', '在恢复业务和保全可诉讼证据之间取得平衡', '只关注恢复业务', '只关注保全证据', 'B', NULL),
(@pack_id, 36, '在调查由内部人员发起的“逻辑炸弹”时，需要分析：', '物理炸弹残留', '程序代码、计划任务、系统时间依赖的恶意脚本', '公司采购订单', '门禁记录', 'B', NULL),
(@pack_id, 37, '电子取证报告中的“执行摘要”应提供给：', '技术分析师', '非技术背景的决策者（如管理层、律师、法官）', '嫌疑人', '媒体', 'B', NULL),
(@pack_id, 38, '“写入过滤器” (Write Blocker) 的硬件或软件实现，在连接嫌疑硬盘时必须使用，否则：', '系统会变慢', '可能会无意中向嫌疑硬盘写入数据，破坏原始证据', '无法读取数据', '硬盘会损坏', 'B', NULL),
(@pack_id, 39, '法律对电子取证人员交叉质询时，常会挑战其：', '资历和证书', '所使用方法论的可靠性，以及是否遵循了最佳实践', '着装', '打字速度', 'B', NULL),
(@pack_id, 40, '“操作系统日志” (如Windows Event Log) 可以记录：', '用户登录/登出、应用程序错误、系统服务启停等', '文件的实际内容', '网络数据包', '硬盘物理温度', 'A', NULL),
(@pack_id, 41, '当发现嫌疑人使用“内存加密”技术时，最佳的取证策略是：', '关闭电源', '在系统运行状态下，对内存进行“冷启动”攻击或使用虚拟机自省提取密钥', '无法取证', '格式化硬盘', 'B', NULL),
(@pack_id, 42, '“合规性取证”与“对抗性取证”的区别是：', '合规性取证是为了满足监管或内部审计要求，不必然导向诉讼', '对抗性取证是为了诉讼', '合规性取证不需要证据链', '没有区别', 'A', NULL),
(@pack_id, 43, '“水印”和“数字指纹”技术在取证中用于：', '隐藏文件', '追踪数据泄露源头，将唯一标识嵌入到文件中', '加密文件', '压缩文件', 'B', NULL),
(@pack_id, 44, '在检查浏览器历史记录时，除了URL，还应注意：', '浏览器皮肤', '缓存文件、Cookies、下载记录、保存的密码', '浏览器版本号', '安装时间', 'B', NULL),
(@pack_id, 45, '“逻辑取证”与“物理取证”的区别是：', '物理取证获得位对位的镜像，逻辑取证只获得操作系统可见的文件和结构', '逻辑取证更全面', '物理取证只针对硬盘', '没有区别', 'A', NULL),
(@pack_id, 46, '法律对电子证据的“原件”要求，通常可以通过什么来满足？', '必须是物理磁盘', '准确的、完整的副本加上完整的证据链', '只能提交打印机打印的纸张', '口头描述', 'B', NULL),
(@pack_id, 47, '在取证分析中，grep 或类似工具用于：', '复制文件', '在大量文本或二进制数据中快速搜索特定关键词或模式', '删除文件', '加密文件', 'B', NULL),
(@pack_id, 48, '进行“数据库取证”时，需要分析：', '数据库表的数量', '事务日志、Undo段、已删除的数据残留', '数据库服务器的品牌', '数据库管理员的名字', 'B', NULL),
(@pack_id, 49, '电子取证专家在出具报告前，通常需要：', '向公众发布结果', '进行同行评审或质量控制检查，确保结论可靠', '直接提交给法庭', '与嫌疑人分享报告草稿', 'B', NULL),
(@pack_id, 50, '电子取证专家的核心价值主张是：', '会使用多种软件', '将计算机科学与法律证据规则相结合，为法律争议提供可靠、可采纳的数字事实', '擅长编程', '计算机硬件维修', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业34：金融监管律师 (法学×金融学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_finance:0', 34, '金融监管律师', 'major_law', 'major_finance', '法学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '金融监管律师的主要服务对象是：', '仅限金融机构', '仅限上市公司', '金融机构、上市公司、金融科技公司以及受金融监管法规约束的任何实体', '个人投资者', 'C', NULL),
(@pack_id, 2, '《证券法》的核心监管目标是：', '保证所有投资者都能赚钱', '保护投资者合法权益，维护公开、公平、公正的市场秩序', '限制上市公司数量', '增加政府税收', 'B', NULL),
(@pack_id, 3, '“内幕交易”的核心构成要件不包括：', '行为人是内幕信息知情人或非法获取内幕信息的人', '在内幕信息公开前，进行了相关证券的买卖、泄露或建议他人买卖', '行为人因此获利', '该信息对证券价格有重大影响', 'C', '获利不是构成要件，行为本身即违法'),
(@pack_id, 4, '“操纵市场”的行为包括：', '连续交易、约定交易、蛊惑交易、虚假申报、抢帽子交易等', '正常的价值投资', '公开发布利空报告', '公司回购股票', 'A', NULL),
(@pack_id, 5, '银行法中的“资本充足率”监管要求，主要是为了：', '提高银行利润', '确保银行有足够的资本吸收意外损失，防止破产风险', '降低贷款利率', '增加员工福利', 'B', NULL),
(@pack_id, 6, '律师在进行“合规调查”时，与“政府执法调查”的一个关键区别是：', '合规调查没有法律效力', '合规调查由公司内部或外聘律师主导，目的是发现风险、整改、或进行自我报告，受律师-客户特权保护', '合规调查只针对个人', '政府调查不需要律师', 'B', NULL),
(@pack_id, 7, '美国《海外账户税收合规法案》(FATCA) 要求外国金融机构向美国国税局报告：', '所有客户的国籍', '美国纳税人持有的账户信息', '所有交易记录', '银行高管薪酬', 'B', NULL),
(@pack_id, 8, '“合格投资者”制度主要应用于：', '银行储蓄业务', '私募基金、私募债等非公开发行的证券', '公开市场股票交易', '保险产品购买', 'B', NULL),
(@pack_id, 9, '《资管新规》的核心要求之一是打破“刚性兑付”，这意味着：', '金融机构承诺保本保收益', '金融机构不得承诺保本保收益，投资者需自担风险', '所有投资都变成无风险', '禁止发行任何理财产品', 'B', NULL),
(@pack_id, 10, '律师为证券公司提供合规服务时，需要重点审查其“投资者适当性管理”是否到位，即：', '是否将任何产品卖给任何客户', '是否将合适的产品（风险等级匹配）卖给合适的投资者', '是否追求最高销售额', '是否提供最便宜的产品', 'B', NULL),
(@pack_id, 11, '“监管沙盒”是一种：', '监管机构的办公区域', '允许金融科技企业在受限的、真实的市场环境中测试创新产品或服务的机制', '金融行业的集中培训中心', '一种风险投资模式', 'B', NULL),
(@pack_id, 12, '《反洗钱法》要求金融机构建立的核心制度是：', '客户身份识别、大额和可疑交易报告、客户身份资料和交易记录保存', '高息揽储', '随意贷款', '降低服务标准', 'A', NULL),
(@pack_id, 13, '“证券虚假陈述”的民事赔偿责任，其“重大性”判断标准是：', '虚假陈述内容必须是故意编造的', '虚假陈述内容可能对投资者的投资决策或证券市场价格产生实质性影响', '投资者必须有实际亏损', '上市公司必须盈利', 'B', NULL),
(@pack_id, 14, '巴塞尔协议III是：', '一个国际金融组织', '全球银行业监管的标杆性规则，旨在增强银行体系的稳健性', '国际贸易协定', '国际会计准则', 'B', NULL),
(@pack_id, 15, '律师在代理金融监管行政案件时，举证责任主要在：', '原告（相对人）', '被告（监管机构）', '双方对等', '法院', 'B', '监管机构需证明其行政行为的合法性'),
(@pack_id, 16, '“影子银行”的特征是：', '有银行牌照', '从事类似银行的信用中介活动，但处于常规银行监管体系之外', '受到严格监管', '只服务农村地区', 'B', NULL),
(@pack_id, 17, '金融监管律师在起草基金合同时，必须包含“信息披露条款”，此条款要求管理人：', '定期向投资者报告基金净值、投资组合、费用和重大事项', '保密所有信息', '只向监管机构报告', '不报告任何信息', 'A', NULL),
(@pack_id, 18, '“跨境金融监管”中的主要挑战是：', '语言不通', '不同国家/地区法律冲突、监管重叠与监管真空并存', '汇率波动', '时差问题', 'B', NULL),
(@pack_id, 19, '在上市公司收购过程中，“一致行动人”需合并计算其持有的股份，并履行：', '保密义务', '信息披露和要约收购义务', '增持义务', '减持义务', 'B', NULL),
(@pack_id, 20, '“系统重要性金融机构 (SIFI)” 会受到：', '更低的监管要求', '更高的资本要求、更严格的压力测试和恢复处置计划要求', '豁免所有监管', '税收优惠', 'B', NULL),
(@pack_id, 21, '律师为客户提供“合规意见”时，应：', '保证绝对安全', '基于事实和法律，分析风险，提出缓释建议，并书面记录', '只口头告知', '鼓励客户冒险', 'B', NULL),
(@pack_id, 22, '金融监管中的“行为监管”与“审慎监管”的区别是：', '审慎监管关注机构是否稳健，行为监管关注是否公平对待消费者', '两者相同', '审慎监管只针对银行', '行为监管只针对证券', 'A', NULL),
(@pack_id, 23, '“交易所问询函”的法律性质是：', '行政处罚决定', '履行一线监管职责的常规监管措施，要求上市公司对特定事项进行解释和补充披露', '刑事调查令', '民事判决书', 'B', NULL),
(@pack_id, 24, '律师在金融创新（如发行数字货币）前，应进行：', '市场调研', '监管合规评估，确定该创新是否属于现有监管范畴，应取得何种牌照或许可', '产品设计', '压力测试', 'B', NULL),
(@pack_id, 25, '“信用违约互换 (CDS)” 作为一种金融衍生品，其监管重点在于：', '交易人员的着装', '防范系统性风险，要求集中清算和信息报告', '交易标的物的产地', '交易员的午餐标准', 'B', NULL),
(@pack_id, 26, '“内幕信息”的法定特征是非公开性和：', '复杂性', '重大性', '长期性', '国际性', 'B', NULL),
(@pack_id, 27, '金融监管律师在进行反洗钱合规检查时，发现一笔“可疑交易”，应建议客户：', '完成交易后再报告', '立即向反洗钱监测分析中心提交可疑交易报告', '询问客户该交易是否合法', '忽略', 'B', NULL),
(@pack_id, 28, '“证券发行注册制”与“核准制”的区别是：', '注册制下监管机构不对发行人的价值做实质判断，只要求信息披露真实、准确、完整', '注册制更严格', '核准制下无需信息披露', '两者没有区别', 'A', NULL),
(@pack_id, 29, '律师代表投资者对上市公司发起证券虚假陈述民事索赔诉讼，需要投资者证明：', '上市公司有欺诈的故意', '投资者的损失与虚假陈述行为之间存在因果关系', '投资者是专业投资者', '上市公司已被刑事处罚', 'B', NULL),
(@pack_id, 30, '《商业银行法》规定，商业银行不得向关系人发放：', '任何贷款', '信用贷款', '担保贷款', '低息贷款', 'B', NULL),
(@pack_id, 31, '“金融稳定理事会 (FSB)” 的功能是：', '发放贷款', '协调国际金融标准制定和金融稳定监测', '处理个人破产', '组织国际象棋比赛', 'B', NULL),
(@pack_id, 32, '律师在审查一份私募基金LPA（有限合伙协议）时，需要关注“关键人条款”，该条款的作用是：', '规定保洁人员的工作内容', '将基金的业绩与特定关键投资经理的履职绑定，提供保护机制', '规定办公用品采购流程', '规定基金年会的菜单', 'B', NULL),
(@pack_id, 33, '“误导性陈述”在证券法中的含义是：', '陈述完全虚构', '陈述部分真实但遗漏重要信息，或表述不准确，容易导致投资者误解', '陈述过于专业', '陈述用了外语', 'B', NULL),
(@pack_id, 34, '“跨境支付”的合规挑战包括：', '支付速度', '反洗钱/反恐融资审查、外汇管制、数据跨境流动限制', '支付费率', '支付接口数量', 'B', NULL),
(@pack_id, 35, '律师在协助企业应对监管机构现场检查时，应：', '阻挠检查', '在合法范围内配合，指导企业提供必要文件，并保护律师-客户特权范围内的文件', '销毁文件', '提供虚假文件', 'B', NULL),
(@pack_id, 36, '“政府证券”和“公司证券”在监管上的主要区别是：', '政府证券由政府信用背书，信息披露和发行程序可能有所不同', '公司证券完全无风险', '政府证券收益率总是更高', '没有区别', 'A', NULL),
(@pack_id, 37, '“金融消费者权益保护”的主要内容不包括：', '知情权、自主选择权、公平交易权', '依法求偿权、受教育权', '保证盈利权', '财产安全权和信息安全权', 'C', NULL),
(@pack_id, 38, '律师为P2P（点对点网络借贷）平台提供合规服务，需要确认其是否触及：', '非法集资的红线', '技术服务创新', '用户界面设计', '网站访问速度', 'A', NULL),
(@pack_id, 39, '“反向分手费”在跨境并购交易中，通常是为应对什么风险而设置？', '汇率风险', '监管审批失败的风险（如反垄断、CFIUS审查）', '劳工纠纷风险', '产品质量风险', 'B', NULL),
(@pack_id, 40, '金融监管中的“行政处罚”种类包括：', '警告、罚款、没收违法所得、暂停或撤销业务资格、市场禁入', '仅警告', '刑事拘留', '民事赔偿', 'A', NULL),
(@pack_id, 41, '律师在金融产品创新初期介入，可以：', '拖慢创新进度', '预先评估合规成本和法律风险，设计合法合规的交易结构', '完全禁止创新', '忽略法律，只管创新', 'B', NULL),
(@pack_id, 42, '“强制平仓”在融资融券业务中，券商执行的依据是：', '客户的心情', '合同约定和监管规则（当维持担保比例低于平仓线时）', '券商自己的喜好', '政府的命令', 'B', NULL),
(@pack_id, 43, '“监管执法合作”是指：', '不同国家的警察合作', '不同国家或地区的金融监管机构之间在跨境案件中的信息共享和相互协助', '监管机构与企业合作', '监管机构与媒体合作', 'B', NULL),
(@pack_id, 44, '律师在审核上市公司年报时，应特别关注“管理层讨论与分析”中是否：', '使用了华丽的辞藻', '对财务数据做出了合理、审慎的解释，并揭示了潜在风险', '包含所有员工的姓名', '详细描述了食堂菜品', 'B', NULL),
(@pack_id, 45, '“操纵期货市场”的行为包括：', '套期保值', '约定交易、囤积现货影响期货价格、虚假申报', '根据基本面分析进行交易', '发布研究报告', 'B', NULL),
(@pack_id, 46, '律师为首次公开发行(IPO)提供法律服务，其核心职责是：', '撰写招股说明书中的业务描述部分', '进行法律尽职调查，发现并解决法律障碍，出具法律意见书', '负责路演行程安排', '确定发行价格', 'B', NULL),
(@pack_id, 47, '《金融控股公司监督管理试行办法》旨在：', '鼓励成立更多金融控股公司', '规范金控公司，防止风险交叉传染，加强资本和关联交易监管', '取消对金控公司的监管', '只监管银行类金控公司', 'B', NULL),
(@pack_id, 48, '“司法审计”与“合规调查”不同，司法审计是：', '公司内部自查', '由法院或仲裁机构指定，对特定财务事实进行鉴定的活动', '税务检查', '财务报告的常规审计', 'B', NULL),
(@pack_id, 49, '“金融反腐”涉及的法律领域包括：', '贪污贿赂罪、滥用职权罪、破坏金融管理秩序罪等', '交通违章', '环境污染', '食品安全', 'A', NULL),
(@pack_id, 50, '金融监管律师的核心竞争力是：', '精通复杂的金融产品和交易，并深刻理解背后的监管逻辑与边界', '拥有最广泛的客户资源', '代理费用最低', '擅长写营销文案', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业35：证券合规官 (法学×金融学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_finance:1', 35, '证券合规官', 'major_law', 'major_finance', '法学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '上市公司证券合规官的核心职责是：', '提高公司股价', '确保公司及其董事、高管、员工的证券交易和相关活动符合法律法规和交易所规则', '负责公司产品的市场推广', '管理公司IT系统', 'B', NULL),
(@pack_id, 2, '“信息披露”的“及时性”原则要求：', '可以在年报中一次性披露所有信息', '重大信息发生或形成后，应在法定期限内（通常2个交易日）向所有投资者公平披露', '可以只向机构投资者披露', '只披露利好消息', 'B', NULL),
(@pack_id, 3, '上市公司董事、高管在年报披露前30天内买卖公司股票，通常构成：', '窗口期交易/静默期交易违规', '合法的交易行为', '操纵市场', '正常套期保值', 'A', NULL),
(@pack_id, 4, '以下哪项是防范“内幕交易”的核心合规措施？', '限制所有员工购买股票', '建立并执行内幕信息知情人登记制度、内幕信息隔离墙，并监控敏感期交易', '鼓励员工互相举报', '每日向全员发送市场预测', 'B', NULL),
(@pack_id, 5, '“监管报送”通常指向以下哪个机构报送？', '工商局', '证监会及其派出机构、交易所', '税务局', '海关', 'B', NULL),
(@pack_id, 6, '证券合规官在审核公司自愿性信息披露公告时，应确保其：', '夸大其词，以吸引投资者', '真实、准确、完整，避免选择性披露，且不误导投资者', '尽可能简短，不提供细节', '只通过非正式渠道发布', 'B', NULL),
(@pack_id, 7, '上市公司披露的年度报告存在虚假记载，证券合规官首先应：', '掩盖事实', '立即向董事长报告，启动内部调查，并尽快发布更正公告，同时评估是否需要向监管报告', '抛售公司股票', '指责财务部门', 'B', NULL),
(@pack_id, 8, '“短线交易”规则是指上市公司董事、监事、高管及持有5%以上股份的股东，将其持有的公司股票在买入后6个月内卖出，或者在卖出后6个月内又买入，所得收益归：', '个人所有', '公司所有', '国家所有', '慈善机构', 'B', NULL),
(@pack_id, 9, '证券合规官建立“内幕信息知情人”名单，其知情人的范围一般包括：', '仅有公司董事和高管', '因工作职责能够接触或获取内幕信息的公司内部人员和外部机构人员', '所有公司员工', '不接触内幕信息的普通员工', 'B', NULL),
(@pack_id, 10, '“业绩预告”的修正，如果与之前预告存在重大差异，必须：', '等待年报时再说', '及时发布修正公告并解释差异原因', '仅电话通知主要股东', '不予披露', 'B', NULL),
(@pack_id, 11, '“重大资产重组”的信息披露要求非常严格，从筹划阶段开始，合规官应确保：', '信息只在投行圈内流传', '严格落实保密措施，并在停牌或公告前，所有知情人均签署保密协议', '立即通知所有员工', '在社交媒体上发布', 'B', NULL),
(@pack_id, 12, '对于上市公司的“关联交易”，合规要求不包括：', '披露关联关系和交易内容', '按公允价格定价', '必须经过董事会或股东大会审议，关联董事/股东需回避表决', '所有关联交易都完全禁止', 'D', NULL),
(@pack_id, 13, '证券合规官需要监控的“敏感信息”不包括：', '公司签订重大合同', '公司发生重大亏损', '公司发生食品安全事故', '公司食堂更换了厨师', 'D', NULL),
(@pack_id, 14, '“公平披露”原则禁止上市公司向下列哪些对象选择性披露重大未公开信息？', '所有公众股东', '机构投资者、分析师、财经记者', '监管机构', '公司独立董事', 'B', NULL),
(@pack_id, 15, '当公司股价出现异常波动时，合规官应首先：', '继续观望', '根据交易所要求或主动进行“异常波动公告”，核查是否存在未披露的重大信息', '联合庄家拉抬股价', '申请停牌', 'B', NULL),
(@pack_id, 16, '证券合规官在起草《内幕信息知情人管理制度》时，应明确：', '无需登记任何信息', '知情人档案的登记、报送、存档流程，以及相关人员保密义务和法律责任', '只登记外部人员', '任意处置档案', 'B', NULL),
(@pack_id, 17, '上市公司“董监高”持股变动，必须在特定时间窗口内申报并披露，这是为了：', '显示个人财富', '提高市场透明度，防范内幕交易', '满足个人虚荣心', '没有任何目的', 'B', NULL),
(@pack_id, 18, '“退市风险警示”（*ST）是交易所对财务状况或其他状况出现异常的上市公司进行的特别处理，合规官需协助公司：', '忽视处理', '及时履行相关信息的披露义务，并尽力化解风险', '制造虚假业绩', '申请豁免', 'B', NULL),
(@pack_id, 19, '证券合规官应定期组织针对董事、高管的合规培训，内容应侧重：', '公司产品知识', '证券市场法律法规、内幕交易、短线交易、信息披露义务与责任', '销售技巧', '外语培训', 'B', NULL),
(@pack_id, 20, '“证券发行”的合规要求，核心是：', '确保发行成功', '发行文件不存在虚假记载、误导性陈述或重大遗漏', '发行价格最高', '发行费用最低', 'B', NULL),
(@pack_id, 21, '监管机构对上市公司进行现场检查时，合规官应：', '拖延时间', '积极配合，组织协调各部门提供真实、完整的检查所需材料', '隐瞒不利材料', '拒绝检查', 'B', NULL),
(@pack_id, 22, '“股权激励计划”的合规要点包括：', '随意向任何员工授予', '需经股东大会批准，确定合理的行权价格、绩效考核指标和信息披露', '可以内幕交易', '无需公告', 'B', NULL),
(@pack_id, 23, '上市公司合规官发现控股股东有占用公司资金的行为，应立即：', '假装不知情', '向董事会、监事会报告，督促股东归还，并按规定履行信息披露义务', '帮助股东隐瞒', '用自有资金填补', 'B', NULL),
(@pack_id, 24, '证券合规官在审核投资者关系活动记录表时，应确保：', '只记录正面问题', '完整、准确地记录交流内容，并在交易所网站及时披露，避免不公平披露', '不记录敏感问题', '选择性发布', 'B', NULL),
(@pack_id, 25, '“上市公司治理准则”对合规官的角色定位，强调了合规官应拥有：', '业务决策权', '独立性和足够的资源，能够直接向董事会报告', '人事任免权', '财务审批权', 'B', NULL),
(@pack_id, 26, '“承诺履行”的合规要求，若公司或股东未履行前期承诺，合规官应：', '继续隐瞒', '及时披露未履行原因及后续计划', '修改承诺内容', '撤销承诺', 'B', NULL),
(@pack_id, 27, '对于“跨境上市”的公司，证券合规官需要同时关注：', '仅本地法律', '上市地法律、本地法律以及国际监管合作要求', '仅上市地法律', '随意', 'B', NULL),
(@pack_id, 28, '“证券服务机构”（如审计师、律师）的合规监管，证券合规官在与其合作时，应：', '要求其出具无保留意见', '确保其具备执业资格，工作独立、客观，且其出具的文件真实、准确', '与其合谋造假', '要求其降低成本', 'B', NULL),
(@pack_id, 29, '“社交媒体”发布信息的管理，合规官应要求公司员工：', '随意在个人社交账号发布公司相关信息', '未经授权不得以公司名义或利用内幕信息在社交媒体发布信息', '可以匿名发布', '发布任何信息', 'B', NULL),
(@pack_id, 30, '上市公司合规风险评估的频率，通常建议：', '十年一次', '至少每年进行一次全面的合规风险评估', '从不评估', '只在被调查后评估', 'B', NULL),
(@pack_id, 31, '“停牌”和“复牌”的合规处理，合规官必须确保：', '随意申请停牌', '基于重大事项确有必要，并按规定办理，复牌时充分披露相关进展', '长期停牌', '不停牌', 'B', NULL),
(@pack_id, 32, '合规官在审核公司的“投资者投诉处理”流程时，应保证：', '不予理会', '建立顺畅的投诉渠道，依法依规处理，避免矛盾升级', '只处理重大投诉', '所有投诉都提交诉讼', 'B', NULL),
(@pack_id, 33, '“股东大会”的合规召开，合规官需确保：', '程序简便即可', '召集、通知、表决、计票、披露等环节均符合法律和公司章程', '只让大股东参加', '不通知中小股东', 'B', NULL),
(@pack_id, 34, '发现员工可能存在内幕交易行为，合规官应：', '私下解决', '立即启动内部调查程序，搜集证据，必要时向监管机构报告', '帮助员工掩盖', '辞退了事', 'B', NULL),
(@pack_id, 35, '证券合规官的定期工作报告应提交给：', '公司全体员工', '公司董事会/审计委员会', '公司客户', '供应商', 'B', NULL),
(@pack_id, 36, '“区块链”技术在证券登记结算中的应用，给合规官带来的新问题是：', '技术门槛高', '法律定性、监管归属、数据安全和投资者保护等', '成本过高', '速度太慢', 'B', NULL),
(@pack_id, 37, '上市公司“社会责任报告”（ESG报告）的披露，虽非强制但日趋重要，合规官应：', '完全不关注', '关注其内容是否与已披露信息一致，是否存在虚假“漂绿”风险', '随意编写', '交予公关部处理', 'B', NULL),
(@pack_id, 38, '在上市公司并购中，“要约收购”的合规要求，收购方需向：', '仅向大股东发出要约', '向所有股东发出同等条件的收购要约', '仅向董事会发出要约', '向监管机构发出要约', 'B', NULL),
(@pack_id, 39, '合规官对于“审计委员会”的工作支持，主要体现在：', '替代审计委员会', '提供合规风险信息、协助其履行监督财务报告和内控的职责', '为审计委员会准备午餐', '管理审计委员会的预算', 'B', NULL),
(@pack_id, 40, '“债券发行”的合规要求，除了证券法，还涉及：', '食品安全法', '公司法、以及银行间市场或交易所的特有规则', '交通法', '环保法', 'B', NULL),
(@pack_id, 41, '证券合规官在审核“重大诉讼”公告时，应重点审查：', '诉讼律师的知名度', '诉讼案件的基本情况、对公司当期及未来利润的影响', '法庭的装修', '对方当事人的爱好', 'B', NULL),
(@pack_id, 42, '“举报人保护”政策是合规体系的重要部分，旨在：', '惩罚举报人', '鼓励员工通过内部渠道举报违规行为，并保护其免受报复', '禁止任何举报', '只接受外部举报', 'B', NULL),
(@pack_id, 43, '“上市公司治理”层面的合规，要求公司建立：', '领导个人决策制', '权力制衡、决策科学、执行高效、监督有力的“三会一层”治理结构', '家族治理模式', '随意模式', 'B', NULL),
(@pack_id, 44, '“大股东减持”需要遵守的规则，包括：', '可以任意减持', '减持比例、信息披露、预披露等要求', '只能增持，不能减持', '无需任何规则', 'B', NULL),
(@pack_id, 45, '证券合规官需要跟踪的法规动态，主要是：', '汽车排放标准', '证监会、交易所发布的新规、解读和监管案例', '劳动法修订', '食品安全标准', 'B', NULL),
(@pack_id, 46, '“会计估计变更”与“会计差错更正”的合规处理不同，合规官需确保：', '两者一样处理', '前者有合理理由，后者需追溯调整并经董事会批准', '都可以随意处理', '都不需要披露', 'B', NULL),
(@pack_id, 47, '对于上市公司的“市值管理”行为，合规官必须警惕：', '一切市值管理', '任何变相的操纵市场或内幕交易行为', '投资者交流', '公司形象宣传', 'B', NULL),
(@pack_id, 48, '证券合规官在公司的地位，应该是：', '边缘化的角色', '公司治理的核心成员，具有充分的权威和独立性', '销售部门的下属', '临时工', 'B', NULL),
(@pack_id, 49, '“合规有效性评估”通常由谁来执行？', '合规官自己', '独立的内审部门或聘请外部第三方', '被监督的业务部门', '公司前台', 'B', NULL),
(@pack_id, 50, '证券合规官的座右铭最好是：', '利润第一', '合规创造价值，防范风险于未然', '少做少错', '法无禁止即可为', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业36：反洗钱分析师 (法学×金融学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_finance:2', 36, '反洗钱分析师', 'major_law', 'major_finance', '法学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '反洗钱分析师的核心工作是：', '追查洗钱犯罪的资金流向', '通过分析交易数据，识别可疑交易，并按照法规要求提交可疑交易报告', '负责抓捕洗钱犯罪嫌疑人', '设计反洗钱软件', 'B', NULL),
(@pack_id, 2, '“洗钱”的三个主要阶段是：处置、离析和：', '整合', '清洗', '投资', '消费', 'A', NULL),
(@pack_id, 3, '《金融机构大额交易和可疑交易报告管理办法》要求，单笔或当日累计等值多少金额以上的现金交易需要上报？', '1万人民币', '5万人民币', '20万人民币', '100万人民币', 'B', NULL),
(@pack_id, 4, '“客户尽职调查 (CDD)” 在反洗钱中的核心步骤是：', '询问客户的星座', '识别客户身份、验证客户身份、了解交易目的和资金来源', '向客户销售理财产品', '记录客户的爱好', 'B', NULL),
(@pack_id, 5, '以下哪项交易特征最可能触发“可疑交易”警报？', '工资入账', '频繁、小额、分散地向多个账户转账，且与客户身份、职业不符', '定期缴纳水电费', '购买超市购物卡用于自用', 'B', NULL),
(@pack_id, 6, '反洗钱分析师向“反洗钱监测分析中心”提交可疑报告后，该机构通常：', '即时反馈调查结果', '进行分析，认为涉嫌犯罪的，移送公安机关', '将报告退回', '对报告内容保密，无进一步行动', 'B', NULL),
(@pack_id, 7, '“政治公众人物 (PEPs)” 是反洗钱中的高风险客户类别，因为他们：', '都是穷人', '可能利用职权参与腐败和洗钱', '没有交易需求', '都是名人', 'B', NULL),
(@pack_id, 8, '“交易监控系统”通常会设置规则来识别“结构性交易”，其行为特征是：', '一次性大额交易', '将大额交易拆分为多笔小额交易，以规避大额交易报告阈值', '完全正常的交易', '定期定额交易', 'B', NULL),
(@pack_id, 9, '反洗钱分析师在分析跨境汇款时，应特别关注：', '汇款的币种', '资金来源方与收款方无合理商业或私人关系，且汇款频繁、金额异常', '汇款的速度', '汇款的手续费', 'B', NULL),
(@pack_id, 10, '“制裁名单筛查”是反洗钱合规的重要环节，主要目的是：', '建立潜在客户库', '防止与受联合国、美国OFAC等制裁的个人或实体发生业务往来', '发送营销邮件', '进行客户满意度调查', 'B', NULL),
(@pack_id, 11, '交易监控发现，一个账户长期无交易，突然收到一笔大额汇款，并在几分钟内分散转出至多个不同账户，这符合哪种洗钱模式？', '处置和离析阶段', '正常的理财行为', '慈善捐赠', '工资发放', 'A', NULL),
(@pack_id, 12, '反洗钱分析师完成一份《可疑交易报告》后，必须注意：', '告知客户其交易可疑', '严格保密，不得向客户或无关人员透露报告内容', '在社交媒体上分享', '作为案例进行公开培训', 'B', NULL),
(@pack_id, 13, '“风险为本”原则在反洗钱工作中的意思是：', '所有客户同等对待', '识别高风险客户、产品、渠道，并投入更多资源进行监控', '只监控高风险，忽略低风险', '对所有交易无差别监控', 'B', NULL),
(@pack_id, 14, '以下哪项活动是典型的“合法”但可能被洗钱者利用？', '加密货币交易', '赌场', '房地产买卖', '以上都是', 'D', NULL),
(@pack_id, 15, '反洗钱分析师在工作中，使用的数据主要来自：', '微博热搜', '金融机构内部的交易系统、CRM系统以及外部名单数据库', '天气预报', '娱乐新闻', 'B', NULL),
(@pack_id, 16, 'FATF（金融行动特别工作组）的主要作用是：', '一个政府间组织，制定和推广反洗钱和反恐怖融资的国际标准', '一家银行', '一家律师事务所', '一个软件公司', 'A', NULL),
(@pack_id, 17, '“代理行账户”的反洗钱风险尤其需要关注，因为可能被：', '用作本地清算', '外国银行间接进入本地金融体系，增加了风险识别难度', '个人储蓄', '定期存款', 'B', NULL),
(@pack_id, 18, '反洗钱分析师发现一笔符合可疑特征的大额转账，但客户是知名慈善机构，此时应：', '自动排除，不报', '仍应基于风险进行审慎分析，慈善机构也可能被滥用', '立即报告给慈善机构负责人', '公布在媒体上', 'B', NULL),
(@pack_id, 19, '“客户风险评级”通常分为高、中、低三档，评级为“高”的客户需要：', '更频繁的定期复审和更严格的交易监控', '与低风险客户同等对待', '直接拒绝提供服务', '提高服务费', 'A', NULL),
(@pack_id, 20, '反洗钱分析师在调查中，需要具备的金融学知识包括：', '懂得所有编程语言', '理解各种金融产品（如衍生品、贸易融资）的交易结构和潜在的洗钱风险', '掌握建筑学知识', '精通考古学', 'B', NULL),
(@pack_id, 21, '“贸易洗钱”是一种常见的洗钱方式，其手法包括：', '虚假报关（低报/高报价格、数量、品名）', '正常贸易', '国内贸易', '易货贸易', 'A', NULL),
(@pack_id, 22, '反洗钱分析师需要与哪个部门紧密合作，以核实客户身份？', '市场营销部', '客户经理/前台业务部门', '信息技术部', '后勤部', 'B', NULL),
(@pack_id, 23, '反洗钱法律法规的“举证责任倒置”在特定情况下会适用，例如：', '客户无法说明巨额财产来源时，可能被推定为犯罪所得', '银行永远不需要举证', '客户永远不需要举证', '监管机构负全责', 'A', NULL),
(@pack_id, 24, '一个预警是“同名转账”，其潜在风险是：', '转账操作错误', '可能涉及虚假身份或多个账户被同一控制人用于资金归集或分散', '银行系统故障', '转账金额太小', 'B', NULL),
(@pack_id, 25, '“非面对面业务”（如纯线上开户）的反洗钱挑战是：', '交易速度快', '无法有效进行客户身份识别，需要依赖额外的技术手段', '服务费更低', '用户体验更好', 'B', NULL),
(@pack_id, 26, '反洗钱分析师提交可疑报告后，公安机关立案侦查，分析师可能需要：', '继续追踪，独立破案', '在依法保密的前提下，配合公安机关提供额外的分析支持', '接受媒体采访', '通知嫌疑人', 'B', NULL),
(@pack_id, 27, '“赌场洗钱”的常见手法是：', '用现金购买筹码，小额赌博后兑换回现金或支票，以掩盖资金来源', '大额赌博并获胜', '观看赌博表演', '购买赌场纪念品', 'A', NULL),
(@pack_id, 28, '金融机构的反洗钱合规义务，除了识别和报告，还包括：', '对抗监管', '建立反洗钱内控制度、开展培训、保存记录至少5年', '帮助客户洗钱', '完全依赖第三方', 'B', NULL),
(@pack_id, 29, '“虚拟货币”的匿名性和跨境特点，对反洗钱构成挑战，FATF对此发布的“旅行规则”要求：', '禁止使用虚拟货币', '虚拟资产服务商在交易时需收集并分享客户信息', '虚拟货币完全免责', '无需任何监管', 'B', NULL),
(@pack_id, 30, '反洗钱分析师在进行交易监控参数设置时，需要权衡：', '预警数量与分析人力', '预警过多会导致人力无法负荷，过少可能导致漏报', '预警数量与银行利润', '预警数量与客户满意度', 'B', NULL),
(@pack_id, 31, '“空壳公司”常被用于洗钱，其特征是：', '有真实业务、有员工、有办公地点', '无实际经营活动、无员工、无办公地点，仅有银行账户', '大型跨国企业', '上市公司', 'B', NULL),
(@pack_id, 32, '《刑法》中的“洗钱罪”上游犯罪不包括：', '毒品犯罪', '黑社会性质组织犯罪', '贪污贿赂犯罪', '交通肇事罪', 'D', NULL),
(@pack_id, 33, '收到监管机构的反洗钱检查通知后，分析师应：', '销毁所有记录', '按照检查要求，整理并准备相关制度、报告和记录', '请假', '搬走电脑', 'B', NULL),
(@pack_id, 34, '“绿色金融”本身是积极的，但也要警惕被洗钱者利用的“绿漂”风险，即：', '投资绿色项目', '打着绿色、环保、扶贫等公益旗号，进行非法集资或洗钱', '节约用纸', '环保宣传', 'B', NULL),
(@pack_id, 35, '反洗钱分析师撰写《可疑交易分析报告》时，应：', '充满个人主观臆断', '逻辑清晰、证据充分、客观描述交易异常点', '只写结论，不写过程', '用客户听不懂的语言', 'B', NULL),
(@pack_id, 36, '“数字取证”在反洗钱调查中可以用于：', '恢复已删除的交易记录', '分析客户电脑中的文件', '追踪资金流', '以上都是', 'D', NULL),
(@pack_id, 37, '“制裁合规”不仅仅是反洗钱，还包括：', '出口管制', '员工着装', '办公室清洁', '食堂菜单', 'A', NULL),
(@pack_id, 38, '反洗钱分析师如果“知情不报”，可能面临的法律责任包括：', '行政罚款', '刑事责任（洗钱罪共犯或“包庇罪”）', '内部处分', '以上都是', 'D', NULL),
(@pack_id, 39, '“分层、旋转、整合”等术语，在反洗钱语境中描述的是：', '洗钱的三个阶段', '炒菜步骤', '建筑工艺', '软件开发流程', 'A', NULL),
(@pack_id, 40, '定期对反洗钱系统进行“回溯测试”的目的是：', '测试系统的运行速度', '用历史数据验证现有监控规则的准确性和有效性', '检查系统是否会被黑客攻击', '检查系统界面是否美观', 'B', NULL),
(@pack_id, 41, '对于“非营利组织”，反洗钱分析师需要警惕的风险是：', '其员工工资过高', '其名义上的慈善活动可能被用于恐怖融资或洗钱', '其组织架构不清晰', '其年报不精美', 'B', NULL),
(@pack_id, 42, '“监管科技 (RegTech)” 在反洗钱中的应用，可以帮助：', '降低合规成本', '提高交易监控的智能化和自动化水平', '减少误报率', '以上都是', 'D', NULL),
(@pack_id, 43, '反洗钱分析师需要了解的金融制裁知识，包括：', '联合国安理会制裁决议', '美国OFAC制裁', '欧盟制裁', '以上都是', 'D', NULL),
(@pack_id, 44, '当客户交易的“地理风险”较高（如来自毒品生产国、战乱地区），分析师应：', '自动拒绝交易', '纳入高风险监控，加强尽职调查', '不加区别，正常处理', '加快处理速度', 'B', NULL),
(@pack_id, 45, '反洗钱分析师的报告，是连接金融机构与哪个政府部门的桥梁？', '税务局', '市场监督管理局', '金融情报部门（FIU）和执法部门（公安、检察）', '外交部', 'C', NULL),
(@pack_id, 46, '“受益所有人”识别是CDD的关键，旨在：', '找到公司的吉祥物', '最终掌握控制权或享有收益的自然人，防止通过法人外壳匿名', '找到公司的前台', '找到公司的清洁工', 'B', NULL),
(@pack_id, 47, '“数据隐私保护”（如GDPR）与“反洗钱”在信息收集上可能存在冲突，正确的处理是：', '永远以隐私保护优先', '寻求平衡，反洗钱法作为特别法，通常赋予金融机构为了履行法定义务而处理个人信息的权力', '永远以反洗钱优先', '不处理任何信息', 'B', NULL),
(@pack_id, 48, '反洗钱分析师应具备的“职业怀疑”态度是指：', '怀疑所有客户', '基于客观事实和交易模式，不轻信表面解释，对异常保持警惕', '相信所有客户', '只相信大客户', 'B', NULL),
(@pack_id, 49, '如果一名员工发现自己成为内部调查对象，反洗钱分析师应：', '立即对其进行惩罚', '在不打草惊蛇的前提下，收集更多客观证据', '马上通知该员工', '公开发布调查信息', 'B', NULL),
(@pack_id, 50, '反洗钱分析师的核心价值主张是：', '发现罪犯，将其绳之以法', '保护金融机构不被犯罪分子利用，维护金融体系的安全与稳定', '增加银行交易量', '降低银行运营成本', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业37：医疗合规官 (法学×临床医学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_clinical:0', 37, '医疗合规官', 'major_law', 'major_clinical', '法学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医疗合规官的核心职责是：', '直接为病人提供治疗', '确保医疗机构或相关企业在医疗执业、数据管理、临床试验、营销行为等方面符合所有适用的法律法规和行业标准', '负责医院的基础设施建设', '管理医院的食堂', 'B', NULL),
(@pack_id, 2, 'HIPAA（健康保险流通与责任法案）主要保护的是：', '医生的薪酬信息', '患者的受保护健康信息 (PHI) 的隐私和安全', '医院的财务数据', '药品的研发配方', 'B', NULL),
(@pack_id, 3, '临床试验中的GCP（药物临床试验质量管理规范）的核心精神是：', '试验速度越快越好', '保护受试者的权益、安全和健康，并确保试验数据的科学性和可靠性', '降低试验成本', '招募更多的受试者', 'B', NULL),
(@pack_id, 4, '以下哪项行为可能构成违反医疗广告合规？', '介绍医院的地址和联系方式', '宣传“包治百病”或使用专家、患者形象作证明', '说明开展的手术类型', '列出医生的执业资格', 'B', NULL),
(@pack_id, 5, '“临床路径”管理，从合规角度看，有助于：', '增加患者负担', '规范诊疗行为，降低医疗差错和过度医疗的风险', '延长住院时间', '限制医生用药自由', 'B', NULL),
(@pack_id, 6, '医疗合规官在审查一份“研究者发起的研究 (IIT)”时，需要特别关注：', '研究经费是否充足', '是否获得伦理委员会批准，以及受试者保护措施是否到位', '研究结果是否能够发表高分论文', '研究人员的职称', 'B', NULL),
(@pack_id, 7, '“电子病历”的合规要求，不包括：', '信息的完整性、准确性和可追溯性', '严格的访问控制和审计日志', '可以随意修改他人病历且不留痕迹', '按照规定期限保存', 'C', NULL),
(@pack_id, 8, '对于医疗器械不良事件的报告，合规官的责任是：', '隐瞒不报', '建立监测和报告流程，确保在规定时限内向监管部门报告', '只报告致死事件', '自行处理，不上报', 'B', NULL),
(@pack_id, 9, '“知情同意书”在法律上的核心作用是：', '免除医生的所有责任', '保障患者的知情权和自主决定权，是医疗行为和临床研究的合法基础', '医院的风险告知模板', '患者签署的卖身契', 'B', NULL),
(@pack_id, 10, '医疗合规官在进行“风险管理”时，通常采用的方法不包括：', '风险识别（如医疗差错、数据泄露）', '风险评估（分析发生概率和严重程度）', '风险规避（停止所有医疗活动）', '风险控制（制定制度和流程）', 'C', NULL),
(@pack_id, 11, '“回扣”和“折扣”在法律上的区别，合规官需清楚：', '回扣是暗中给予，不入账，违法；折扣是明示并如实入账，合法', '两者都是违法的', '两者都是合法的', '回扣是给个人的，折扣是给单位的', 'A', NULL),
(@pack_id, 12, 'GDPR 和 HIPAA 对医疗数据跨境传输的限制是：', '没有限制', '要求必须获得数据主体明确同意，并评估接收国数据保护水平', '禁止任何跨境传输', '只需通知即可', 'B', NULL),
(@pack_id, 13, '医疗机构与“医药代表”的互动行为，合规官需要确保：', '医药代表可以进入诊室推销', '行为符合国家和医院的反贿赂规定，例如不允许直接向医生支付处方费', '医药代表可以查看患者病历', '可以收受医药代表任何形式的礼物', 'B', NULL),
(@pack_id, 14, '“伦理委员会 (IRB/EC)” 的审查重点包括：', '研究的科学价值和伦理合理性', '受试者的招募、知情同意过程、风险受益比', '研究人员的资质', '以上都是', 'D', NULL),
(@pack_id, 15, '合规官发现某医生伪造病历，最好的处理方式是：', '私下包庇', '按内部制度启动调查，根据事实和情节给予相应处理，并评估是否需要向卫生行政部门报告', '直接开除', '报警', 'B', NULL),
(@pack_id, 16, '“药品经营质量管理规范 (GSP)” 和 “药品生产质量管理规范 (GMP)” 分别是针对：', '研发和销售', '生产和流通', '使用和销毁', '进口和出口', 'B', NULL),
(@pack_id, 17, '对于AI医疗软件，合规官最应关注：', '软件的界面美观度', '是否获得医疗器械注册证，以及其算法透明度和公平性', '软件的使用人数', '软件的编程语言', 'B', NULL),
(@pack_id, 18, '“远程医疗”的合规挑战不包括：', '执业医师的跨地域执业许可', '患者隐私和数据安全', '医疗质量同质化', '天气对网络的影响', 'D', NULL),
(@pack_id, 19, '合规官在审核“内部员工举报”时，应：', '压制举报', '建立保密和保护机制，客观调查', '公开举报人信息', '立即辞退被举报人', 'B', NULL),
(@pack_id, 20, '“医疗过错”的法律判断标准是：', '是否达到了诊疗当时医疗水平应有的注意义务', '是否导致了患者死亡', '是否收费高昂', '医生态度是否友好', 'A', NULL),
(@pack_id, 21, '“临床试验”的申办方，合规官需确保其购买：', '医疗保险', '临床试验保险，用于赔偿受试者发生的与研究相关的伤害', '财产保险', '车辆保险', 'B', NULL),
(@pack_id, 22, '“院感控制”（医院感染控制）的合规要求，主要依据是：', '医生个人经验', '国家和卫生行政部门发布的院感管理办法和标准', '医院的财务预算', '患者的需求', 'B', NULL),
(@pack_id, 23, '医疗合规官应如何对待“民族医药”的独特性和现代法规的冲突？', '完全禁止', '在尊重其传统的同时，引导其在安全、有效性证明和法规框架内发展', '无视法规', '只发展民族医药', 'B', NULL),
(@pack_id, 24, '“血样标本”的管理，合规重点是：', '标本的美观', '采集、储存、运输、销毁的全链条合规和记录，防止滥用和泄露遗传信息', '标本采集器品牌', '标本数量', 'B', NULL),
(@pack_id, 25, '医院“自制药剂”的合规生产和使用，需要：', '获得制剂批准文号，并按GMP要求生产', '医生自行配制', '在药房随意制作', '不需要任何审批', 'A', NULL),
(@pack_id, 26, '合规官在审查一份“对外合作”协议（如与第三方体检中心合作）时，应特别关注：', '合作方的品牌知名度', '责任划分、数据安全、患者转诊流程和收费是否符合规定', '合作方的办公室装修', '合作方的员工着装', 'B', NULL),
(@pack_id, 27, '“医疗废物”的合规处置，需要遵循：', '随意丢弃', '《医疗废物管理条例》，进行分类、收集、暂存，并交由有资质的单位处置', '卖给废品收购站', '焚烧发电', 'B', NULL),
(@pack_id, 28, '合规官在应对卫生行政部门的“飞行检查”时，应：', '阻挠检查', '积极配合，提供真实材料，展示日常合规工作', '销毁记录', '临时补造假文件', 'B', NULL),
(@pack_id, 29, '“基因检测”的合规，包括对受检者：', '无须告知', '充分的知情同意，并对检测结果提供遗传咨询，防止基因歧视', '公开所有基因数据', '拒绝提供结果', 'B', NULL),
(@pack_id, 30, '“临床试验”中的严重不良事件 (SAE) 报告，要求申办方在获知后：', '不报告', '立即报告给研究者、伦理委员会和药品监督管理部门', '只报告给媒体', '等待试验结束一起报告', 'B', NULL),
(@pack_id, 31, '医疗合规官需要了解的“医保基金”监管红线是：', '严禁过度医疗、分解住院、挂床住院、串换诊疗项目等骗保行为', '医保报销比例越高越好', '患者自费项目越少越好', '可以随意套取医保基金', 'A', NULL),
(@pack_id, 32, '“人类遗传资源”的合规管理，依据是：', '《人类遗传资源管理条例》', '国际公约', '医院内部规定', '个人意愿', 'A', NULL),
(@pack_id, 33, '医疗机构采购大型医疗设备，合规官需审查：', '供应商是否回扣', '采购流程是否符合招标投标法和医院内控制度，设备是否具备相应配置证', '设备外观', '供应商的免费赠品', 'B', NULL),
(@pack_id, 34, '“互联网医院”的合规，关键点是：', '必须有实体医疗机构作为依托，并遵循线上诊疗规范', '可以完全独立存在', '可以随意开具处方', '不需任何资质', 'A', NULL),
(@pack_id, 35, '医疗合规官对医护人员进行合规培训，应重点包括：', '如何与患者吵架', '执业医师法、医疗机构管理条例、核心制度、病历书写规范、反商业贿赂', '如何快速手术', '如何开更多检查单', 'B', NULL),
(@pack_id, 36, '“学术会议”赞助，合规官应确保：', '赞助与处方量挂钩', '赞助必须是真实的学术目的，会议地点、接待标准应适度，并如实入账', '可以资助医生个人去旅游', '所有赞助都不合规', 'B', NULL),
(@pack_id, 37, '对于“临床试验数据造假”行为，合规官应：', '视为小事', '零容忍，因为这涉及严重的科学不端和受试者安全问题，应立即调查并报告', '帮助造假', '掩盖事实', 'B', NULL),
(@pack_id, 38, '“医疗技术临床应用”的备案或许可制度，要求：', '医院可以开展任何技术', '对限制类技术进行备案，对禁止类技术不得开展', '仅需医生同意', '仅需患者同意', 'B', NULL),
(@pack_id, 39, '合规官审查医院“官方网站”和“微信公众号”内容时，应警惕：', '医院地址写错', '涉及绝对化医疗广告用语、夸大治疗效果、宣传治愈率', '排版不美观', '医院Logo太旧', 'B', NULL),
(@pack_id, 40, '“安宁疗护”的合规，涉及复杂的伦理和法律问题，包括：', '知情同意、预立医疗指示的效力、疼痛管理规范等', '仅涉及医疗费用', '仅涉及家属签字', '不需要考虑法律问题', 'A', NULL),
(@pack_id, 41, '“医疗纠纷”的院内处理，合规官应确保：', '一律私了', '有规范的投诉渠道和调解程序，妥善保管病历，依法定途径解决（调解、鉴定、诉讼）', '一律走诉讼', '推诿责任', 'B', NULL),
(@pack_id, 42, '“母婴保健技术服务”的执业许可，需要特定的：', '《母婴保健技术服务执业许可证》', '医生个人兴趣', '医院财力', '当地社区需求', 'A', NULL),
(@pack_id, 43, '对“麻醉药品和精神药品”的管理，合规官需重点监督“五专”管理，即：', '专人负责、专柜加锁、专用处方、专册登记、专用账册', '专款、专用、专房、专车、专人', '专有、专精、专一、专注、专业', '专方、专药、专病、专治、专管', 'A', NULL),
(@pack_id, 44, '医疗合规官在制定“合规年度计划”时，应基于：', '个人好恶', '上一年度的合规风险评估结果和本年度的监管重点', '医院食堂菜单', '院长的喜好', 'B', NULL),
(@pack_id, 45, '“干细胞临床研究”的合规，要求：', '任何机构都可以开展', '必须在国家备案的机构和项目下进行，遵循《干细胞临床研究管理办法（试行）》', '可以收费', '可以向公众宣传', 'B', NULL),
(@pack_id, 46, '合规官需要了解的国际医疗认证，如JCI，其目的与国内合规的关系是：', '完全无关', 'JCI标准通常高于或补充国内基础法规，追求JCI有助于提升整体合规和管理水平', 'JCI是中国法律强制要求', 'JCI是商业认证，无任何价值', 'B', NULL),
(@pack_id, 47, '“职业暴露”（如针刺伤）的报告和处理，合规官需建立：', '无视制度', '快速报告、免费检测、预防用药和补偿机制，符合《职业病防治法》等', '自行承担原则', '医院免责原则', 'B', NULL),
(@pack_id, 48, '医疗合规官的工作，最核心的冲突往往来自于：', '合规要求与医院追求经济效益之间的平衡', '医生与护士的矛盾', '院长与科室主任的矛盾', '患者与家属的矛盾', 'A', NULL),
(@pack_id, 49, '“器官移植”的合规，必须遵循：', '自愿、无偿、公平、公正和伦理原则', '任何器官都可以买卖', '死刑犯器官可用于移植', '医院可以自行分配', 'A', NULL),
(@pack_id, 50, '医疗合规官的核心价值是：', '帮助医院多赚钱', '保障医疗安全和患者权益，维护医疗机构的声誉和可持续发展', '为医院省电', '负责医院的网站建设', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业38：医事律师 (法学×临床医学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_clinical:1', 38, '医事律师', 'major_law', 'major_clinical', '法学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医事律师的核心业务领域是：', '药品研发', '处理涉及医疗服务的法律事务，包括医疗纠纷诉讼、医疗机构合规、医患关系法律咨询等', '护理病人', '管理医院行政', 'B', NULL),
(@pack_id, 2, '处理医疗侵权案件，适用的主要法律是：', '《合同法》', '《民法典》侵权责任编及《医疗纠纷预防和处理条例》', '《公司法》', '《知识产权法》', 'B', NULL),
(@pack_id, 3, '医疗损害责任的归责原则，一般适用：', '过错责任原则 (患者需证明医疗机构有过错)', '无过错责任原则', '公平责任原则', '过错推定责任', 'A', NULL),
(@pack_id, 4, '在医疗纠纷诉讼中，病历是核心证据。医事律师审查病历的重点不包括：', '病历是否真实、完整', '病历的书写是否规范，有无篡改、后补', '病历的纸张材质和品牌', '病历中的诊疗行为是否符合诊疗规范', 'C', NULL),
(@pack_id, 5, '以下哪种情形，适用“过错推定原则”，即推定医疗机构有过错？', '患者病情复杂', '违反法律、行政法规、规章以及其他有关诊疗规范的规定', '患者自身有特殊体质', '医疗费用过高', 'B', NULL),
(@pack_id, 6, '“医疗损害鉴定”是诉讼中的关键环节，其主要内容不包括：', '医疗机构是否存在过错', '医疗过错与损害后果之间是否存在因果关系', '医院的年度利润', '损害后果的伤残等级等', 'C', NULL),
(@pack_id, 7, '患者不配合医生进行合理诊疗，造成损害后，医疗机构：', '承担全部责任', '不承担责任或承担次要责任 (视过错程度)', '患者自己承担', '由保险公司承担', 'B', NULL),
(@pack_id, 8, '医事律师在处理“知情同意”纠纷时，核心焦点是：', '手术室的环境', '医生是否向患者或近亲属履行了充分的说明义务，并取得其书面同意', '患者的文化程度', '医疗费用', 'B', NULL),
(@pack_id, 9, '医疗纠纷的解决途径不包括：', '双方协商', '医调委调解', '行政诉讼', '民事诉讼', 'C', '行政诉讼是针对行政行为，不是医疗纠纷的直接解决途径'),
(@pack_id, 10, '封存病历的程序，应由谁在场？', '仅患者家属', '仅医院代表', '医患双方共同在场，封存后双方签字确认', '任何一方均可单独封存', 'C', NULL),
(@pack_id, 11, '律师在代理患者时，需要证明医疗损害与医疗行为存在因果关系。一般而言，证明责任在：', '患者', '医院', '法官', '卫健委', 'A', NULL),
(@pack_id, 12, '“紧急救治权”规定，在抢救生命垂危的患者等紧急情况下，不能取得患者或其近亲属意见的，经谁批准，可以立即实施相应的医疗措施？', '卫健委负责人', '公安机关负责人', '医疗机构负责人或者授权的负责人', '患者单位领导', 'C', NULL),
(@pack_id, 13, '病历的所有权属于谁？', '患者', '医生', '医疗机构', '卫健委', 'C', '但患者有权查阅、复印'),
(@pack_id, 14, '“医疗产品责任”适用于因药品、消毒产品、医疗器械的缺陷，或者输入不合格的血液造成患者损害的，患者可以向谁请求赔偿？', '仅向医疗机构', '仅向生产者', '向医疗机构或者生产者', '以上都不对', 'C', '患者可以向生产者或者血液提供机构请求赔偿，也可以向医疗机构请求赔偿'),
(@pack_id, 15, '医事律师为医疗机构提供合规咨询时，建议医院购买“医疗责任险”，其主要目的是：', '增加医院收入', '分散医疗纠纷的赔偿风险，保障患方赔偿款的支付', '提高医生待遇', '抵扣税款', 'B', NULL),
(@pack_id, 16, '审查一份“手术同意书”，其法律效力在于：', '完全免除医院责任', '证明医方履行了告知义务，患者同意接受手术，但并非意味着患者放弃所有索赔权', '等同于合同', '患者自愿签署，生死与医院无关', 'B', NULL),
(@pack_id, 17, '“诊疗规范”在法律中的作用是：', '仅供医生参考', '作为判断医疗机构是否存在过错的行业标准', '法律效力低于医院内部规定', '无实际作用', 'B', NULL),
(@pack_id, 18, '如果医院丢失或篡改病历，在法律上可能导致什么后果？', '没有任何后果', '推定医疗机构有过错', '吊销医院执照', '医生停职', 'B', NULL),
(@pack_id, 19, '医事律师在代理“死亡赔偿金”索赔时，计算依据不包括：', '受诉法院所在地上一年度城镇居民人均可支配收入', '死亡患者的年龄', '死亡患者的职业', '死亡患者生前抚养的人数', 'C', '死亡赔偿金与死者职业无关'),
(@pack_id, 20, '“医疗纠纷人民调解委员会 (医调委)” 的调解协议，具有什么法律效力？', '没有效力', '经司法确认后，具有强制执行力', '完全等同于法院判决', '可以随意反悔', 'B', NULL),
(@pack_id, 21, '律师在庭审中对“医疗损害鉴定意见”进行质证，可以围绕：', '鉴定机构和鉴定人的资质', '鉴定程序是否合法', '鉴定依据的材料是否真实、完整', '以上都是', 'D', NULL),
(@pack_id, 22, '“过度检查”构成医疗侵权，判断标准是：', '只要多开了检查就是过度', '违反诊疗规范，进行的与疾病诊疗无关的非必要的检查', '患者觉得贵', '医保不报销', 'B', NULL),
(@pack_id, 23, '医事律师在为医院制定《患者投诉处理制度》时，应强调：', '能拖就拖', '首诉负责制、及时处理、及时反馈', '只处理闹事的投诉', '投诉一概不理', 'B', NULL),
(@pack_id, 24, '“非法行医”与“医疗事故”的主要区别在于：', '非法行医是犯罪，医疗事故是民事侵权', '非法行医者无资质，医疗事故发生在有资质的执业医师诊疗中', '非法行医造成的后果更严重', '没有区别', 'B', NULL),
(@pack_id, 25, '在医疗纠纷中，律师可以代理患者申请“诉前证据保全”，主要是为了：', '冻结医院资产', '防止医院篡改、隐匿病历等关键证据', '申请先予执行', '催促法院立案', 'B', NULL),
(@pack_id, 26, '“患者隐私权”保护，不包括：', '病房内教学观摩，未经患者同意', '医生在学术会议上隐去个人信息后讨论病例', '在社交媒体上发布患者的照片和病情', '未经同意向保险公司提供患者病历', 'B', NULL),
(@pack_id, 27, '医疗损害责任纠纷的诉讼时效是多久？', '1年', '3年 (自知道或应当知道权利受损害以及义务人之日起)', '5年', '20年', 'B', NULL),
(@pack_id, 28, '医事律师审查“临床试验知情同意书”时，必须包含的要素是：', '试验的免费项目', '预期可能的受益和风险、替代治疗、损伤赔偿联系人', '试验人员的姓名', '申办方上一年度利润', 'B', NULL),
(@pack_id, 29, '“安乐死”在我国的法律地位是：', '合法', '不合法，任何形式的主动安乐死均涉嫌故意杀人罪', '部分地方合法', '由医院自行决定', 'B', NULL),
(@pack_id, 30, '律师在处理“新生儿出生缺陷”纠纷时，需重点分析医疗机构在产前检查中是否存在：', '告知义务和合理注意义务的违反', '收费过高', '服务态度差', '产房环境差', 'A', NULL),
(@pack_id, 31, '“专家辅助人”在医疗诉讼中的作用是：', '替代鉴定人', '就专业问题代表一方当事人向法官和鉴定人提出意见或质询', '代理诉讼', '负责调解', 'B', NULL),
(@pack_id, 32, '医患双方协商达成的赔偿协议，其性质是：', '民事合同', '行政决定', '法院判决', '不可反悔的终局文件', 'A', NULL),
(@pack_id, 33, '在医疗纠纷中，律师需计算“护理费”和“误工费”，其计算依据包括：', '患者的口头描述', '鉴定意见认定的护理期限、护理人数，以及当地护工或受害人的收入标准', '医院的建议', '随便估计', 'B', NULL),
(@pack_id, 34, '“医疗美容”纠纷与普通“医疗损害”纠纷在适用法律上有何区别？', '医美纠纷不适用《民法典》', '医美纠纷可以适用《消费者权益保护法》，惩罚性赔偿', '医美纠纷只有刑事责任', '没有区别', 'B', NULL),
(@pack_id, 35, '律师建议医疗机构采用“录音录像”作为证据，需注意：', '可以秘密录音', '在不侵犯他人合法权益、不违反法律禁止性规定的前提下，可以作为证据使用', '录音录像一律无效', '只需告知患者即可', 'B', NULL),
(@pack_id, 36, '“误诊”在什么情况下构成医疗侵权？', '任何误诊都构成', '误诊是由于医生的过错，并且导致了患者的损害后果', '只要患者认为误诊', '误诊了罕见病', 'B', NULL),
(@pack_id, 37, '医事律师为医生提供个人法律咨询时，建议其最有效的自我保护方式是：', '购买个人职业保险', '不接诊疑难病人', '严格执行诊疗规范和病历书写规范', '与患者称兄道弟', 'C', NULL),
(@pack_id, 38, '医疗机构的责任保险条款中，“追溯期”的概念是：', '保险生效后发生的事故，且在保险期内索赔', '保险生效前发生的事故，但在追溯期内报告保险公司', '保险的理赔期限', '保单的有效期', 'B', NULL),
(@pack_id, 39, '“医疗意外”是指：', '医生操作失误', '患者自身特殊体质或病情异常，发生难以预料和防范的损害', '医疗器械故障', '医院管理混乱', 'B', NULL),
(@pack_id, 40, '律师在代理群体性医疗纠纷时，首要策略是：', '煽动患者闹事', '保持理性，引导患方通过合法的集体协商或诉讼途径解决', '拒绝代理', '只代理其中一个人', 'B', NULL),
(@pack_id, 41, '“远程会诊”中的责任划分，通常认定：', '邀请方医疗机构负全责', '会诊方医疗机构负全责', '会诊方仅提供咨询意见，不承担患者的直接诊疗责任，责任由邀请方承担', '双方平均分担', 'C', NULL),
(@pack_id, 42, '医事律师在处理“精神损害抚慰金”索赔时，其适用条件是：', '只要患者不满意即可', '必须是造成了严重后果', '任何医疗纠纷都能索赔', '必须有残疾或死亡', 'B', NULL),
(@pack_id, 43, '对于死亡患者的病历讨论，律师应关注：', '讨论是否及时、深入', '讨论记录是否真实反映问题，而非走过场', '讨论意见是否被用于改进医疗质量', '以上都是', 'D', NULL),
(@pack_id, 44, '“互联网诊疗”中，医生只能在什么情况下开具处方？', '任意情况', '必须有实体医疗机构诊断的病历记录，才能为复诊患者开具处方', '首诊患者也可开具', '电话问诊后即可', 'B', NULL),
(@pack_id, 45, '律师在处理“新生儿错误抱错”案件时，涉及到的是：', '医疗损害责任', '侵犯亲权/监护权', '合同纠纷', '行政责任', 'B', NULL),
(@pack_id, 46, '“医疗过错参与度”在鉴定意见中通常用百分比表示，其含义是：', '医生犯错的百分比', '医疗过错在损害后果中所占的原因力比例', '患者康复的概率', '医院赔偿的比例', 'B', NULL),
(@pack_id, 47, '律师审查一份“手术同意书”，发现其使用了“免除护士及麻醉师责任”的表述，该条款：', '合法有效', '可能因违反法律强制性规定或公序良俗而被认定为无效', '医院可以免责', '患者签字即同意', 'B', NULL),
(@pack_id, 48, '“输血感染”案件，适用什么责任原则？', '过错责任', '无过错责任', '公平责任', '过错推定', 'B', '使用无过错责任或类似严格责任'),
(@pack_id, 49, '医事律师的核心能力要求是：', '精通临床医学所有分支', '精通所有法律门类', '能够将临床医学知识、鉴定规则与侵权法原理深度融合，精准分析案情', '擅长与媒体打交道', 'C', NULL),
(@pack_id, 50, '医事律师最崇高的职业使命是：', '帮助患者获得尽可能多的赔偿', '帮助医院规避所有责任', '在法律的框架内，平衡医患双方权益，促进医疗纠纷依法、理性解决，最终推动医疗安全和法治进步', '成为医院的法律顾问', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业39：临床试验法规专员 (法学×临床医学)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_clinical:2', 39, '临床试验法规专员', 'major_law', 'major_clinical', '法学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '临床试验法规专员的核心职责是：', '亲自给受试者做体检', '确保临床试验的整个生命周期符合GCP、相关法规和伦理要求', '负责试验药物的研发', '管理试验经费', 'B', NULL),
(@pack_id, 2, 'ICH-GCP 是国际公认的临床试验标准，其核心目的是：', '加快药物上市速度', '保护受试者的权利、安全和健康，并保证临床试验数据的可靠性和准确性', '降低制药公司成本', '促进医生之间的竞争', 'B', NULL),
(@pack_id, 3, '伦理委员会 (IRB/EC) 在临床试验启动前，必须审查并批准的文件是：', '研究者简历', '试验方案和知情同意书', '药品生产批号', '数据统计计划', 'B', NULL),
(@pack_id, 4, '在向国家药监局 (NMPA) 提交新药临床试验申请 (IND) 前，最重要的一项工作是：', '确定药品定价', '获得伦理委员会的批件', '招募受试者', '联系销售渠道', 'B', NULL),
(@pack_id, 5, '“受试者保护”的首要原则是：', '试验药物必须有效', '受试者的权益、安全和健康必须高于对科学和社会利益的考虑', '受试者应该免费获得药物', '受试者可以随时退出而无需理由', 'B', NULL),
(@pack_id, 6, '知情同意书的“知情”要素不包括：', '试验目的和流程', '可能的受益和风险', '受试者的权利（如随时退出）', '申办方的股票代码', 'D', NULL),
(@pack_id, 7, '“不良事件 (AE)” 和 “严重不良事件 (SAE)” 的核心区别是：', '是否导致住院、死亡、残疾等严重后果', '是否与药物有关', '发生的频率', '受试者是否不适', 'A', NULL),
(@pack_id, 8, '法规专员在收到一份SAE报告后，最紧急的处理是：', '存档', '在法规规定的时间内（通常24小时或7天）向伦理委员会、申办方和监管部门报告', '通知受试者的家人', '分析因果关系', 'B', NULL),
(@pack_id, 9, '“病例报告表 (CRF)” 的数据填写，应遵循的原则是：', '可以涂改', '准确、完整、及时、可溯源，任何修改需留有痕迹和签名', '试验结束后再补填', '可以由研究者随意填写', 'B', NULL),
(@pack_id, 10, '对于一项多中心临床试验，法规专员需要确保各中心使用的：', '药物批号不同', '试验方案、知情同意书、CRF表等核心文件保持一致', '统计分析方法不同', '入组标准可以不同', 'B', NULL),
(@pack_id, 11, '“监查”和“稽查”的区别是：', '监查由申办方进行，稽查由独立于申办方和试验团队的第三方进行', '监查比稽查更严格', '稽查由研究者进行', '两者完全相同', 'A', NULL),
(@pack_id, 12, '试验用药品的“盲法”设计，法规专员需确保：', '所有人都知道分组情况', '盲底保存得当，非必要情况下不得破盲', '受试者有权知道分组', '研究者有权随时破盲', 'B', NULL),
(@pack_id, 13, '临床试验的主要文件，至少应保存至：', '试验结束后1年', '药品上市后5年', '试验结束后或药品批准上市后至少2-5年（依各国法规）', '永久保存', 'C', NULL),
(@pack_id, 14, '“随机化”的目的主要是：', '让分组更简单', '避免选择性偏倚，使各组在已知和未知因素上均衡可比', '方便统计', '让患者满意', 'B', NULL),
(@pack_id, 15, 'ICH-GCP 中，研究者的主要职责不包括：', '获得伦理委员会批准', '获得受试者知情同意', '确保药品的市场销售', '准确记录和报告数据', 'C', NULL),
(@pack_id, 16, '“源文件”是指：', 'CRF表的复印件', '最初记录试验数据的文件（如医院病历、化验单、受试者日记卡）', '最终统计报告', '伦理批件', 'B', NULL),
(@pack_id, 17, '临床试验的“方案违背”或“方案偏离”，法规专员应：', '隐瞒', '记录、报告伦理委员会和申办方，并评估其对数据完整性的影响', '立即终止试验', '自行修改方案', 'B', NULL),
(@pack_id, 18, '新药上市申请 (NDA) 的资料包中，最关键的是：', '精美的包装设计', '完整的临床和临床前研究数据证明其安全有效', '市场预测报告', '广告文案', 'B', NULL),
(@pack_id, 19, '法规专员在准备IND申报时，需要提交“研究者手册 (IB)”，其内容是：', '研究者个人信息', '试验药物的临床前和临床研究数据汇编，是指导研究者用药和安全监测的重要文件', '临床试验的合同', '伦理委员会的成员名单', 'B', NULL),
(@pack_id, 20, '“伦理审查”的要点包括：', '研究的科学价值和伦理合理性', '受试者的招募、知情同意、风险受益比', '研究人员的资质和设施条件', '以上都是', 'D', NULL),
(@pack_id, 21, '“弱势受试者”（如儿童、孕妇、智障人士）的保护措施，要求：', '可以随意招募', '必须有额外的保护，通常需要其法定监护人同意，且研究对其有直接受益前景或风险极小', '禁止招募', '与普通受试者相同', 'B', NULL),
(@pack_id, 22, '临床试验中，对“电子数据采集 (EDC)” 系统的要求包括：', '系统需经过验证，有审计追踪功能，确保数据的完整性和安全性', '可以任意更改数据', '无密码登录', '数据可以不备份', 'A', NULL),
(@pack_id, 23, '法规专员在审计一家CRO（合同研究组织）时，应重点审查：', 'CRO的食堂', 'CRO是否具备质量体系，其员工是否经过GCP培训，以及过往项目的合规记录', 'CRO的办公地点装修', 'CRO的年会举办地', 'B', NULL),
(@pack_id, 24, '“临床数据管理”的最终目标是：', '产生完美的数据', '生成一个高质量、无偏倚、可用于统计分析的数据集', '快速录入数据', '减少数据量', 'B', NULL),
(@pack_id, 25, 'IND申报的“沟通交流会议”制度，允许申办方在提交申请前与CDE（药品审评中心）进行沟通，主要目的是：', '疏通关系', '提高申报成功率，解决关键技术问题', '打听内部消息', '申请延长审评时间', 'B', NULL),
(@pack_id, 26, '对于“临床试验保险”，法规专员需要确保：', '申办方购买了足够的保险，以覆盖受试者因参与试验而遭受的伤害', '无需购买', '研究者购买', '受试者自己购买', 'A', NULL),
(@pack_id, 27, '“临床试验方案”的修正，在实施前必须获得：', '仅申办方同意', '伦理委员会的再次批准', '研究者的同意', '受试者的同意', 'B', NULL),
(@pack_id, 28, '“临床试验终止”时，法规专员需要确保：', '立即丢弃所有文件', '受试者的安全后续处理、文件的存档和向监管机构的报告', '继续入组新患者', '仅通知申办方', 'B', NULL),
(@pack_id, 29, '药品审评中心（CDE）在审评NDA时，如发现临床试验数据存在“真实性问题”，会：', '要求补充数据', '直接批准', '做出“不予批准”的决定，并可能进行核查', '罚款', 'C', NULL),
(@pack_id, 30, '“临床协调员 (CRC)” 与 “临床监查员 (CRA)” 的职责区别是：', 'CRC受雇于研究者，协助非医学性事务；CRA受雇于申办方，负责监查试验质量', 'CRC受雇于申办方，CRA受雇于研究者', '两者职责相同', 'CRC负责监查，CRA负责协调', 'A', NULL),
(@pack_id, 31, '法规专员在处理“受试者退出”时，应确保：', '挽留受试者', '尊重受试者意愿，并保留已获得的数据，记录退出原因', '删除所有数据', '惩罚受试者', 'B', NULL),
(@pack_id, 32, '“生物等效性试验 (BE)” 通常用于：', '创新药研发', '仿制药的研发，证明其与原研药在吸收速度和程度上的差异在可接受范围内', '医疗器械试验', '疫苗试验', 'B', NULL),
(@pack_id, 33, '“试验药品”的接收、分发、回收和销毁，必须：', '有记录可追溯', '由研究者自行管理', '无需记录', '可以随意赠予他人', 'A', NULL),
(@pack_id, 34, '临床试验的“期中分析”，需要由谁执行？', '研究者', '申办方', '独立的数据监查委员会 (IDMC/DSMB)', '受试者代表', 'C', NULL),
(@pack_id, 35, '“安慰剂”的使用，必须满足的条件是：', '任何试验都可以用', '在伦理上可接受，且不会给受试者带来不可逆的严重伤害', '患者要求使用', '研究者喜欢用', 'B', NULL),
(@pack_id, 36, '法规专员在参加项目启动会时，最重要的输出是：', '精美的会议纪要', '确保所有试验相关人员明确各自职责、熟悉方案和GCP要求', '确定下次会议时间', '安排聚餐', 'B', NULL),
(@pack_id, 37, '“临床试验注册”是一种：', '获得伦理批件', '在公共平台（如ClinicalTrials.gov）登记试验信息，提高透明度，是发表文章的前提', '申请IND', '申请NDA', 'B', NULL),
(@pack_id, 38, '“受试者日记卡”要求受试者自行记录服药情况，法规专员应确保：', '内容清晰，易于理解', '研究者代填', '可以不用填写', '由药厂填写', 'A', NULL),
(@pack_id, 39, '“稽查轨迹”是电子系统中的功能，用于：', '记录谁在何时、为何、对数据进行了何种操作', '系统登录密码', '数据备份', '系统升级日志', 'A', NULL),
(@pack_id, 40, '法规专员在应对监管机构的“核查”时，应：', '拖延时间', '积极配合，确保文件齐全、人员在场，坦诚沟通', '隐瞒事实', '临时伪造文件', 'B', NULL),
(@pack_id, 41, '“遗传办”的审批，涉及的是：', '药品的基因毒性', '涉及人类遗传资源的国际合作临床试验，需获得科技部的批准', '基因治疗药物的研发', '遗传病的研究', 'B', NULL),
(@pack_id, 42, '“试验用药品计数”的差错，可能被视为：', '小问题', '严重GCP违规，影响试验的可靠性', '与法规专员无关', '财务问题', 'B', NULL),
(@pack_id, 43, '“受试者补偿”与“赔偿”的区别是：', '补偿是弥补时间、交通等花费，赔偿是对因试验导致的伤害进行赔付', '补偿金额更大', '赔偿是法定的，补偿不是', '没有区别', 'A', NULL),
(@pack_id, 44, '法规专员需要了解的“Ⅳ期临床试验”是指：', '上市前临床试验', '新药上市后进行的应用研究，旨在考察广泛使用条件下的疗效和不良反应', '药理毒理研究', '制剂研究', 'B', NULL),
(@pack_id, 45, '“伦理委员会”的组成，必须包括：', '医药专业人员、非医药专业人员、法律专家、独立于试验机构的人员', '仅医药专业人员', '仅申办方人员', '仅受试者家属', 'A', NULL),
(@pack_id, 46, '法规专员发现研究者未获得受试者有效知情同意，应：', '不予追究', '立即报告申办方和伦理委员会，并评估是否让该受试者退出', '补签一个同意书', '销毁证据', 'B', NULL),
(@pack_id, 47, '“SAE的一致性核查”是指：', '核查SAE报告、医疗记录和CRF中对同一事件的描述是否一致', '核查不同中心报告的SAE是否一致', '核查SAE报告格式是否一致', '以上都是', 'D', NULL),
(@pack_id, 48, '“临床试验合同”中，必须明确申办方和研究者双方的：', '办公地点', '责任、权力、义务，特别是与保险、赔偿相关的条款', '员工食堂标准', '年休假天数', 'B', NULL),
(@pack_id, 49, '法规专员在“中心关闭”前，需要完成的工作不包括：', '确保所有数据已清理、疑问已解答', '所有试验相关文件已归档', '与研究者结算费用', '继续招募新受试者', 'D', NULL),
(@pack_id, 50, '临床试验法规专员的核心价值是：', '加速药物上市', '在复杂的法规和伦理框架下，搭建连接科学、伦理和商业的桥梁，确保试验的合规性和受试者安全', '为申办方省钱', '为研究者省事', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业40：软件许可合规顾问 (法学×软件工程)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_swe:0', 40, '软件许可合规顾问', 'major_law', 'major_swe', '法学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '软件许可合规顾问的核心职责是：', '编写软件代码', '确保企业使用、分发、修改软件的行为符合各类软件许可证（商业、开源）的要求', '进行软件销售', '管理软件研发团队', 'B', NULL),
(@pack_id, 2, '“开源软件”不等于“免费软件”，其核心特征是：', '用户必须付费', '用户可以自由使用、研究、修改、分发，但需遵守其附带的许可证条款', '没有版权', '不能用于商业用途', 'B', NULL),
(@pack_id, 3, 'GPL (通用公共许可证) 最核心的特点是：', '允许将代码闭源', '“Copyleft” 或 “传染性”，要求任何基于GPL代码的衍生作品也必须以GPL许可证发布', '允许任意使用', '禁止商业使用', 'B', NULL),
(@pack_id, 4, 'MIT 许可证与 GPL 许可证相比，其特点是：', '更严格', '非常宽松，允许闭源商用，只需保留版权声明', '禁止商业使用', '只能用于非商业目的', 'B', NULL),
(@pack_id, 5, 'Apache 2.0 许可证与 MIT 类似，但增加了一项重要的条款是：', '禁止专利授权', '明确授予专利权，并对贡献者提供专利保护', '要求衍生作品必须使用相同许可证', '要求公开所有源代码', 'B', NULL),
(@pack_id, 6, '“软件资产管理 (SAM)” 的核心目标是：', '降低软件购买成本', '对组织内的软件资产（许可证、安装、使用）进行有效的治理和控制，以实现合规、降低风险、优化支出', '提高软件开发速度', '增加软件种类', 'B', NULL),
(@pack_id, 7, '企业在使用某个开源组件时，未遵守其许可证要求（如未发布声明），可能面临的法律风险是：', '无风险', '侵权诉讼，要求停止分发、公开源代码或赔偿损失', '仅道德谴责', '刑事处罚', 'B', NULL),
(@pack_id, 8, '顾问在审查一份“软件采购合同”时，最关键的条款是：', '软件的包装', '授权类型（如永久、订阅、用户数、CPU数）、授权范围、审计权、支持服务条款', '软件商的办公室位置', '软件商的员工人数', 'B', NULL),
(@pack_id, 9, '“许可证兼容性”问题主要出现在：', '使用单一许可证的软件', '将不同许可证（如GPL与MIT）的代码组合在一起时，是否存在冲突', '硬件与软件的兼容性', '操作系统与应用软件的兼容性', 'B', NULL),
(@pack_id, 10, '软件合规审计中，“自建工具”或“脚本”也需要纳入管理，因为：', '它们没有价值', '它们也可能包含受许可证约束的第三方代码，或成为审计范围的一部分', '它们不占用存储空间', '它们永远不会被审计', 'B', NULL),
(@pack_id, 11, '企业收到BSA（商业软件联盟）或软件厂商的审计函，合规顾问首先应建议：', '忽视它', '启动内部初步自查，评估风险，并在律师指导下与发函方沟通', '立即删除所有“可能有问题”的软件', '公开表示抗议', 'B', NULL),
(@pack_id, 12, '“LGPL”许可证允许：', '与GPL相同', '允许将库以动态链接方式用于闭源软件，但修改库本身需开源', '完全闭源使用，无限制', '禁止任何商业使用', 'B', NULL),
(@pack_id, 13, '“SBOM (软件物料清单)” 的作用类似于食品配料表，它：', '列出了软件的依赖项和组成成分', '列出了软件开发人员名单', '记录了软件的销售价格', '标注了软件的版权信息', 'A', NULL),
(@pack_id, 14, '合同审核中，“真名实姓”条款通常是指：', '要求提供身份证', '软件采购合同中对用户身份、使用地点、使用设备的严格限定', '签署合同的必须是一个人', '合同必须手写签名', 'B', NULL),
(@pack_id, 15, '当一家企业被收购，作为并购顾问，需要对目标公司的软件资产进行：', '财务审计', '软件合规尽职调查，识别潜在的许可证风险（尤其开源软件）', '技术审计', '市场审计', 'B', NULL),
(@pack_id, 16, '“BSD 许可证”与 MIT 许可证类似，其特点是：', '有严格的 Copyleft', '非常宽松，允许闭源商用，但需保留版权声明和免责条款', '要求公开源代码', '只能用于学术目的', 'B', NULL),
(@pack_id, 17, '企业使用“试用版”或“评估版”软件用于生产环境，可能导致：', '性能提高', '许可证违规', '成本节省', '法律鼓励', 'B', NULL),
(@pack_id, 18, '顾问在制定“企业开源软件使用政策”时，应包括：', '完全禁止使用开源软件', '允许任意使用', '审批流程、许可类型白名单/黑名单、使用记录和SBOM管理要求', '只允许使用GPL软件', 'C', NULL),
(@pack_id, 19, '“OEM 软件”通常是指：', '原厂生产的软件', '随硬件一起销售的、不可转移的软件许可证', '开源软件', '共享软件', 'B', NULL),
(@pack_id, 20, '“许可证密钥”或“激活码”的管理，属于SAM中的：', '采购环节', '部署和回收环节', '废弃环节', '无关环节', 'B', NULL),
(@pack_id, 21, '以下哪个许可证要求衍生作品也必须使用相同的许可证？', 'MIT', 'Apache 2.0', 'GPLv3', 'BSD 3-Clause', 'C', NULL),
(@pack_id, 22, '软件合规顾问在分析“容器镜像”时，需要特别注意：', '容器的运行速度', '基础镜像、中间件、应用层各自包含的软件及其许可证', '容器的编排工具', '容器的存储大小', 'B', NULL),
(@pack_id, 23, '“非商业使用”许可证，在企业中被雇员用于完成工作职责，这通常被认为是：', '合法的', '非商业使用', '商业使用，构成侵权', '灰色地带', 'C', NULL),
(@pack_id, 24, '“双许可”模式（如MySQL）是指：', '软件有两个许可证', '提供两种选择：开源GPL许可（免费，但需开源衍生品）或商业许可（付费，可闭源）', '软件可以同时安装两种版本', '软件有两个作者', 'B', NULL),
(@pack_id, 25, '软件合规审计发现公司有10%的PC安装了未授权的Adobe软件，合规顾问的建议应首先是：', '立即删除所有Adobe软件', '进行彻底清查，评估授权需求，并联系Adobe经销商补购授权', '将所有责任推给员工', '继续使用，等待被发现', 'B', NULL),
(@pack_id, 26, '“Vendor Lock-in” 是指：', '供应商的软件太难用', '客户过度依赖特定供应商的技术或格式，导致替换成本极高', '供应商被锁在仓库里', '软件许可证有效期', 'B', NULL),
(@pack_id, 27, '合同审查中，“服务等级协议 (SLA)” 主要规定：', '软件的价格', '服务的可用性、性能、响应时间标准和赔偿条款', '软件的安装步骤', '软件开发流程', 'B', NULL),
(@pack_id, 28, '“软件审计权”条款，通常允许软件供应商：', '随时进入客户机房搜查', '每年一次或在一定条件下，委托独立第三方对客户软件使用情况进行审计', '查看客户的财务记录', '拷走客户的数据', 'B', NULL),
(@pack_id, 29, '使用“幽灵依赖”或“嵌套依赖”，其合规风险在于：', '增加软件体积', '开发团队可能不清楚引入了哪些间接依赖的许可证', '提高开发效率', '无法进行测试', 'B', NULL),
(@pack_id, 30, '“Creative Commons” 许可证通常用于：', '软件源代码', '内容创作（如文档、图片、音乐）', '硬件设计', '专利授权', 'B', NULL),
(@pack_id, 31, '“AGPL” 许可证比 GPL 更严格，其主要增加的限制是：', '对嵌入式设备的限制', '通过网络提供软件服务（SaaS）时，也必须向用户提供源代码', '对专利的限制', '对商标的限制', 'B', NULL),
(@pack_id, 32, '合规顾问建议企业建立“软件采购审批流程”，其目的是：', '增加行政负担', '确保采购前进行许可证兼容性和必要性审查，避免盲目采购', '限制员工购买', '只能采购免费软件', 'B', NULL),
(@pack_id, 33, '“Zlib/libpng” 许可证是一种典型的：', '严格Copyleft许可证', '非常宽松的许可证，甚至允许静态链接到闭源软件', '禁止商业使用', '强制公开源代码', 'B', NULL),
(@pack_id, 34, '在企业并购中，发现目标公司使用了大量未经授权的商业软件，作为买方律师，应：', '忽略此风险', '要求卖方在交割前完成合规化采购，或预留风险赔偿金', '自行承担', '向BSA举报', 'B', NULL),
(@pack_id, 35, '“许可证扫描”工具（如FOSSology, Black Duck）的主要功能是：', '查杀病毒', '识别代码库中包含的组件及其许可证', '优化代码性能', '进行代码审查', 'B', NULL),
(@pack_id, 36, '软件开发人员从Stack Overflow复制了一段代码，可能需要遵守：', '无许可证', '网站的服务条款或代码片段自身的许可证（如MIT, CC-BY-SA）', '完全自由使用', '必须向原作者付费', 'B', NULL),
(@pack_id, 37, '软件合规顾问为SaaS服务商提供建议，其最大的挑战是：', '软件部署', '开源许可证（如AGPL）的远程服务触发条款', '硬件采购', '员工着装', 'B', NULL),
(@pack_id, 38, '“真伪验收”在软件采购合同中，通常指：', '验证软件真伪', '客户在接收软件产品后，在约定的时间内进行测试，以确认其符合合同技术规格', '验收人员身份验证', '软件版权登记', 'B', NULL),
(@pack_id, 39, '“EUPL” 是一种：', '欧盟的软件许可证', '美国的软件许可证', '中国的软件许可证', '国际标准化组织许可证', 'A', NULL),
(@pack_id, 40, '员工离职后，其占用的特定用户许可证应：', '继续保留', '被回收并重新分配给其他员工', '自动过期', '无需管理', 'B', NULL),
(@pack_id, 41, '“MPL (Mozilla Public License)” 是一种介于GPL和BSD之间的许可证，其特点是：', '与GPL相同', '“文件级别”的Copyleft，即修改某个MPL文件才需要开源该文件', '完全不允许修改', '必须将所有源代码公开', 'B', NULL),
(@pack_id, 42, '面对软件供应商发起的“合规审计”，如果企业确信自己是合规的，但审计过程非常耗时费力，咨询顾问应：', '拒绝审计', '要求供应商承担所有审计费用，或寻找合理的争议解决途径', '马上支付一笔钱和解', '完全不配合', 'B', NULL),
(@pack_id, 43, '“云成本管理”与软件资产管理的关系是：', '无关', '在IaaS/PaaS模式下，需要管理云上虚拟机的操作系统和软件许可证（自带许可或按需付费）', '云没有软件许可问题', '云厂商完全负责合规', 'B', NULL),
(@pack_id, 44, '顾问在起草“软件开发外包合同”时，必须明确：', '承包商加班费', '开发出的代码的知识产权归属、以及承包商使用的第三方库的许可证合规责任', '承包商的办公地点', '承包商的员工数量', 'B', NULL),
(@pack_id, 45, '“WTFPL” 是一个非常极端的：', '商业许可证', '宽松许可证，几乎放弃所有权利', '严格许可证', '禁止许可证', 'B', NULL),
(@pack_id, 46, '“软件合规”与“信息安全”之间的关系是：', '互斥', '软件合规关注法律风险，信息安全关注技术风险，两者共同构成IT治理', '合规包含安全', '安全包含合规', 'B', NULL),
(@pack_id, 47, '企业“IT资产管理系统”的数据准确性，是SAM有效性的基础。因此，应：', '手工记录', '建立定期盘点和自动发现机制', '完全依赖员工申报', '不需要数据', 'B', NULL),
(@pack_id, 48, '“订阅式”许可证与“永久”许可证相比，企业在财务上的特点是：', '订阅式初始成本低，但需持续支付；永久初始成本高，但买断', '永久更便宜', '订阅式更便宜', '两者无差别', 'A', NULL),
(@pack_id, 49, '“软件合规培训”的目标受众应该是：', '仅IT部门', '全体员工，特别是开发人员、采购人员和法务人员', '仅管理层', '仅法务部', 'B', NULL),
(@pack_id, 50, '软件许可合规顾问的核心价值是：', '帮助省钱', '帮助避免因许可证违规导致的诉讼、罚款和声誉损失，建立合规高效的软件资产治理体系', '帮助开发软件', '帮助销售软件', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业41：法学×软件工程 → 开源协议专家
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_swe:1', 41, '开源协议专家', 'major_law', 'major_swe', '法学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪个开源许可证属于“强互惠”（Copyleft）类型？', 'MIT License', 'Apache License 2.0', 'GNU General Public License (GPL)', 'BSD 3-Clause License', 'C', NULL),
(@pack_id, 2, '将GPL协议的代码与专有软件静态链接后发布，最可能违反什么要求？', '无需公开源码', '衍生作品必须整体以GPL开源', '只需声明版权', '禁止商用', 'B', NULL),
(@pack_id, 3, 'LGPL许可证主要针对什么场景设计？', '禁止商用', '允许动态链接到专有软件而不传染', '要求所有修改必须公开', '只允许个人使用', 'B', NULL),
(@pack_id, 4, '以下哪个许可证要求修改后的文件必须注明修改内容？', 'MIT', 'BSD', 'Apache 2.0', 'GPLv2', 'C', NULL),
(@pack_id, 5, '公司使用AGPL协议的前端库，但通过后端API提供服务，是否需要开源整个系统？', '不需要，因为AGPL只作用域网络交互', '需要，AGPL规定通过网络提供服务也视为分发', '仅开源前端代码', '完全不需要', 'B', NULL),
(@pack_id, 6, '开源协议中的“专利授权”条款（如Apache 2.0）主要作用是？', '放弃所有专利权', '明确授予用户使用相关专利的权利，防止专利诉讼', '禁止用户申请专利', '仅限非商业用途', 'B', NULL),
(@pack_id, 7, '将MIT协议的代码集成到公司闭源产品中，以下哪项是必须做的？', '公开全部源码', '支付授权费', '保留原始版权和许可声明', '不得修改代码', 'C', NULL),
(@pack_id, 8, 'GPLv2和GPLv3的主要区别之一是？', 'GPLv3增加了反Tivoization条款（禁止硬件限制）', 'GPLv2允许专利授权', '两者完全相同', 'GPLv3取消了Copyleft', 'A', NULL),
(@pack_id, 9, '使用BSD 3-Clause协议的代码，是否可以用于广告推广？', '可以无条件使用', '禁止用作者名义进行推广', '必须支付费用', '只能非商业使用', 'B', NULL),
(@pack_id, 10, '以下哪个许可证与GPL不兼容（即不能将两者代码合并发布）？', 'LGPL', 'Mozilla Public License 1.1（旧版）', 'MIT', 'Apache 2.0（与GPLv3兼容）', 'B', NULL),
(@pack_id, 11, '公司内部使用GPL软件（未分发），是否需要公开源码？', '需要', '不需要，仅内部使用不触发分发条款', '需要但只对员工公开', '完全禁止内部使用', 'B', NULL),
(@pack_id, 12, '“双许可”模式常见于哪些开源项目？', '仅GPL', '商业公司主导的开源项目（如MySQL，提供GPL和商业许可）', 'MIT协议项目', '公有领域软件', 'B', NULL),
(@pack_id, 13, '将Apache 2.0协议的代码进行修改后发布，是否必须公开源码？', '必须公开', '不需要，但需要保留声明', '只能以二进制发布', '必须使用相同协议', 'B', NULL),
(@pack_id, 14, '开源协议中，CC0（Creative Commons Zero）意味着？', '保留所有权利', '放弃版权，贡献至公有领域', '禁止商业使用', '要求署名', 'B', NULL),
(@pack_id, 15, '使用GPL协议的库通过进程间通信（非静态/动态链接），GPL是否传染？', '会传染', '通常认为不会传染，取决于通信方式', '总是会', '由法院决定', 'B', NULL),
(@pack_id, 16, '以下哪个许可证不允许在代码中附加额外的限制条款？', 'MIT', 'BSD', 'GPL', 'Apache 2.0', 'C', NULL),
(@pack_id, 17, '公司发现员工在GitHub上开源了内部核心算法，但忘记添加许可证，默认法律状态是什么？', '开源自由使用', '默认保留所有权利，不属于开源', '自动变为MIT', '自动变为GPL', 'B', NULL),
(@pack_id, 18, '开源协议中的“免责声明”主要保护谁？', '用户', '作者和贡献者', '下游分发者', '政府', 'B', NULL),
(@pack_id, 19, '以下哪个许可证要求必须提供“安装信息”以便用户修改后重新安装到硬件？', 'GPLv2', 'GPLv3', 'LGPL', 'MIT', 'B', NULL),
(@pack_id, 20, '在开源合规工作中，SBOM（软件物料清单）的主要作用是？', '计算项目成本', '列出所有依赖组件及其许可证，用于合规审查', '代码质量评估', '性能测试', 'B', NULL),
(@pack_id, 21, '以下哪个许可证不要求公开源码，但要求如果分发二进制必须提供获取源码的方式？', 'MIT', 'GPL', 'BSD', 'Apache', 'B', NULL),
(@pack_id, 22, '使用WTFPL协议的代码，是否可以闭源商用？', '不可以', '可以，该协议放弃几乎所有权利', '必须署名', '需支付费用', 'B', NULL),
(@pack_id, 23, '开源合规审核中发现项目使用了GPLv2的代码，且项目本身是商业闭源软件，应如何处理？', '继续使用', '移除或替换该依赖，或整体开源', '购买商业许可（如果有）', 'B和C都是可能的方案', 'D', NULL),
(@pack_id, 24, '“贡献者许可协议”（CLA）的主要目的是？', '禁止贡献者起诉', '明确贡献者授权项目方使用其代码的权利，包括重新许可', '要求贡献者付费', '限制贡献者数量', 'B', NULL),
(@pack_id, 25, '以下哪个机构发布了广泛使用的开源许可证列表和合规指南？', 'W3C', 'OSI（开源促进会）', 'IETF', 'IEEE', 'B', NULL),
(@pack_id, 26, 'EPL（Eclipse Public License）与GPL的主要区别是？', 'EPL是强互惠', 'EPL允许与专有代码链接，但修改后的EPL代码必须公开', 'EPL禁止商用', '两者相同', 'B', NULL),
(@pack_id, 27, '使用Apache 2.0协议的代码，如果再分发时修改了文件，需要在文件中注明什么？', '无需注明', '明确说明修改的内容和日期', '删除原始版权', '增加额外限制', 'B', NULL),
(@pack_id, 28, '开源协议中的“分叉”（Fork）合法性取决于？', '协议是否允许修改', '多数许可证允许分叉，需遵守原协议', '必须原作者同意', '禁止分叉', 'B', NULL),
(@pack_id, 29, '以下哪个行为可能违反开源许可证？', '移除MIT许可证中的版权声明', '将GPL代码用于内部工具', '将BSD代码用于商业闭源产品', '将GPL代码作为云服务提供而不开源后端', 'A', '移除版权声明违反所有许可证'),
(@pack_id, 30, '“许可证兼容性”问题常见于？', 'MIT和BSD兼容', 'GPL与Apache 2.0（旧版GPLv2与Apache 2.0不兼容）', 'LGPL和MIT兼容', '所有OSI许可都兼容', 'B', NULL),
(@pack_id, 31, '公司收购了某开源项目的贡献者代码，但该代码使用GPL，收购后能否闭源？', '可以', '不可以，GPL的Copyleft不会因收购而消失', '需要原作者同意', '支付费用即可', 'B', NULL),
(@pack_id, 32, '开源协议中，MPL（Mozilla Public License）采用的“文件级Copyleft”意思是？', '整个项目必须开源', '仅修改过的文件需要开源，其他文件可闭源', '禁止修改', '只能动态链接', 'B', NULL),
(@pack_id, 33, '软件发布时同时提供源代码和二进制，但源代码中缺少许可证副本，是否合规？', '合规', '不合规，许可证副本必须随同分发', '仅需在二进制中包含', '无需包含', 'B', NULL),
(@pack_id, 34, '使用Unlicense协议的代码，后续开发者能否将其以GPL发布？', '不可以', '可以，因为Unlicense放弃版权，任何人都可以重新授权', '需原开发者同意', '只能以Unlicense发布', 'B', NULL),
(@pack_id, 35, '开源专家在处理“嵌套依赖”时，最应关注什么？', '依赖版本号', '传递性许可证冲突', '代码行数', '开发者国籍', 'B', NULL),
(@pack_id, 36, '以下哪个许可证要求分发时必须提供“适用的版权通知”？', '所有许可证', 'MIT, BSD, Apache等均要求', '只有GPL要求', '只有公有领域不要求', 'B', NULL),
(@pack_id, 37, '公司内部政策禁止使用GPL软件，但允许使用LGPL，主要原因是？', 'LGPL更自由', 'LGPL允许动态链接到专有代码，传染性较弱', 'LGPL放弃版权', 'GPL不安全', 'B', NULL),
(@pack_id, 38, '开源合规工具（如FOSSA, Black Duck）的主要功能是？', '代码编写', '自动识别依赖组件及其许可证，扫描合规风险', '性能测试', '安全漏洞修复', 'B', NULL),
(@pack_id, 39, '将BSD 2-Clause协议的代码用于产品宣传材料中，是否需要注明？', '必须注明', 'BSD 2-Clause不包含广告限制，但建议注明', '禁止使用', '必须付费', 'B', NULL),
(@pack_id, 40, '以下哪个说法关于GPLv2是正确的？', '允许在嵌入式设备中使用且不提供源码', '如果分发二进制，必须同时提供源码', '仅限非商业用途', '不需要保留版权声明', 'B', NULL),
(@pack_id, 41, '开源协议中的“保留所有权利”与“保留部分权利”本质区别是？', '前者是商业软件', '开源协议明确授予特定权利，其余权利保留', '后者是免费软件', '无区别', 'B', NULL),
(@pack_id, 42, '若项目依赖包含GPL代码，而项目本身以MIT协议发布，这种做法？', '合法，MIT更宽松', '不合法，GPL要求整个作品以GPL发布', '可以，只要MIT声明不变', '需要双重许可', 'B', NULL),
(@pack_id, 43, '以下哪个许可证对专利报复行为有明确制裁（即如果用户发起专利诉讼，其许可证自动终止）？', 'MIT', 'BSD', 'Apache 2.0', 'GPLv2', 'C', NULL),
(@pack_id, 44, '开源专家应建议公司对“孤儿代码”（无许可证）采取什么措施？', '自由使用', '移除或联系版权人获取许可', '自动视为MIT', '自动视为公有领域', 'B', NULL),
(@pack_id, 45, '以下哪个是CC BY-SA许可证的特点？', '不需要署名', '允许商用，但必须相同方式共享', '禁止修改', '仅限非商业', 'B', NULL),
(@pack_id, 46, '软件专利与开源许可证的关系，以下描述正确的是？', '所有开源许可证都自动授权专利', '部分许可证（如Apache 2.0, GPLv3）明确包含专利授权', '专利与许可证无关', '开源项目不涉及专利', 'B', NULL),
(@pack_id, 47, '将GPLv3代码与AGPLv3代码合并后发布，应使用哪个许可证？', 'GPLv3', 'AGPLv3', '两者都兼容，可选择AGPLv3或GPLv3', '需要自定义', 'C', NULL),
(@pack_id, 48, '“开源软件”与“免费软件”的本质区别是？', '免费软件不收费', '开源软件必须提供源代码，免费软件不一定', '开源软件必须商业友好', '无区别', 'B', NULL),
(@pack_id, 49, '公司准备将开源项目商业化，提供增强版付费功能，但不能使用开源版本中的GPL代码，因为？', 'GPL禁止商业使用', 'GPL要求如果分发修改版本必须开源全部代码，会泄露付费功能', 'GPL要求付费分成', 'GPL不兼容商业软件', 'B', NULL),
(@pack_id, 50, '作为开源协议专家，最重要的能力是？', '精通所有编程语言', '准确理解各类许可证的条款及兼容性，并能提供合规解决方案', '擅长写代码', '熟悉所有开源项目', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业42：法学×软件工程 → 知识产权律师(软件方向)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_swe:2', 42, '知识产权律师(软件方向)', 'major_law', 'major_swe', '法学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '软件著作权保护的对象是？', '软件中的算法', '软件的源代码和目标代码的表达式', '软件功能', '软件界面风格', 'B', NULL),
(@pack_id, 2, '在中国，软件著作权自何时产生？', '登记之日起', '软件开发完成之日起', '首次发表之日起', '申请之日起', 'B', NULL),
(@pack_id, 3, '以下哪个行为不侵犯软件著作权？', '未经许可复制软件安装', '为学习和研究目的，安装合法获得的软件', '破解软件保护机制', '修改软件后重新发布', 'B', NULL),
(@pack_id, 4, '软件专利与软件著作权的主要区别是？', '专利保护代码表达式，著作权保护思想', '专利保护技术方案，著作权保护表达', '两者相同', '专利不需要公开', 'B', NULL),
(@pack_id, 5, '在软件侵权诉讼中，“接触+实质性相似”原则用于？', '确定赔偿额', '证明侵权成立', '判断著作权有效性', '选择管辖法院', 'B', NULL),
(@pack_id, 6, '以下哪个不属于软件专利可授权客体（中国）？', '一种图像处理算法', '商业规则和方法（纯智力活动规则）', '一种编译器优化方法', '一种基于区块链的存证方法', 'B', NULL),
(@pack_id, 7, '“开源软件”的著作权授权通常采用什么方式？', '放弃著作权', '通过许可证授予用户特定权利', '仅限内部使用', '需要单独签署合同', 'B', NULL),
(@pack_id, 8, '员工在职期间开发的软件，著作权归谁（无特别约定）？', '员工个人', '单位（职务作品）', '单位和员工共有', '国家', 'B', NULL),
(@pack_id, 9, '软件名称的保护通常适用什么法律？', '著作权法', '商标法', '专利法', '反不正当竞争法', 'B', NULL),
(@pack_id, 10, '逆向工程（反编译）以获取接口信息，在什么情况下可能合法？', '永远非法', '为开发兼容软件且遵守合理使用原则', '只要不商业化', '需支付费用', 'B', NULL),
(@pack_id, 11, '以下哪个行为可能构成软件商业秘密侵权？', '独立开发相同功能软件', '员工离职后使用前公司的核心算法', '从公开渠道下载开源代码', '通过反向工程获得公开产品技术', 'B', NULL),
(@pack_id, 12, '软件专利申请中，“技术性”要求是指？', '必须包含硬件', '解决技术问题，采用技术手段，达到技术效果', '必须有代码实现', '必须与人工智能相关', 'B', NULL),
(@pack_id, 13, '软件著作权登记的意义不包括？', '初步证明权利归属', '便于维权举证', '获得排他性垄断权', '满足某些招标要求', 'C', NULL),
(@pack_id, 14, '“贴牌”软件（OEM）合同中，知识产权责任应由谁承担？', '品牌方', '开发方', '根据合同约定，通常开发方保证不侵权', '共同承担', 'C', NULL),
(@pack_id, 15, '以下哪个国际条约主要保护计算机软件版权？', '巴黎公约', '伯尔尼公约', '马德里协定', '海牙协定', 'B', NULL),
(@pack_id, 16, '软件专利侵权判定的“全面覆盖原则”是指？', '被控物必须与专利完全相同', '被控物包含了专利权利要求中的所有技术特征', '只要技术效果相同', '只要功能相同', 'B', NULL),
(@pack_id, 17, '开源许可证违反（如未遵守GPL）可能导致什么法律后果？', '仅道德指责', '著作权侵权，可被起诉要求停止侵权并赔偿', '刑事责任', '自动转为公有领域', 'B', NULL),
(@pack_id, 18, '软件开发中，“代码复用”的法律风险主要取决于？', '代码行数', '原代码的许可证或授权', '代码质量', '开发工具', 'B', NULL),
(@pack_id, 19, '以下哪个是软件著作权侵权的法定赔偿上限（中国，2021新《著作权法》）？', '50万元', '100万元', '300万元', '500万元', 'D', NULL),
(@pack_id, 20, '委托开发软件，无书面合同约定权属，著作权归谁？', '委托人', '受托人', '双方共有', '国家', 'B', NULL),
(@pack_id, 21, '“避风港原则”在网络服务提供商（如GitHub）侵权责任中的含义是？', '完全免责', '接到通知后及时删除，可不承担赔偿责任', '必须审查所有上传内容', '共同侵权', 'B', NULL),
(@pack_id, 22, '软件商标注册中，以下哪个标识最具显著性？', '“软件”文字', '“智能”图形', '“ZenCode”臆造词', '简单的“√”符号', 'C', NULL),
(@pack_id, 23, '以下哪种软件技术方案通常不授予专利权？', '新的压缩算法', '数学公式本身', '基于神经网络的图像识别方法', '区块链共识算法', 'B', NULL),
(@pack_id, 24, '软件侵权诉讼中，“举证责任”一般由原告承担，但什么情况下会倒置？', '总是倒置', '涉及商业秘密且原告完成初步举证', '被告是个人', '原告是大公司', 'B', NULL),
(@pack_id, 25, '软件最终用户（个人）使用盗版软件，可能承担什么责任？', '无责任', '民事责任（停止使用、赔偿损失）', '刑事责任', '行政罚款', 'B', NULL),
(@pack_id, 26, '“功能性版权”理论认为，软件的哪些部分不受版权保护？', '代码', '由功能决定的技术实现方法（有限表达）', '注释', '界面文字', 'B', NULL),
(@pack_id, 27, '在软件专利布局中，“权利要求”的撰写应侧重？', '代码实现细节', '解决技术问题的完整技术方案', '用户界面设计', '市场前景', 'B', NULL),
(@pack_id, 28, '软件知识产权律师为客户提供“自由实施”（FTO）分析，主要目的是？', '判断软件是否可申请专利', '评估软件商业化是否存在侵犯他人专利权的风险', '计算软件价值', '撰写合同', 'B', NULL),
(@pack_id, 29, '以下哪个行为不属于“合理使用”软件？', '为了备份而复制软件', '为了测试安全性而反编译', '大量复制软件并对外销售', '为了教学少量展示代码', 'C', NULL),
(@pack_id, 30, '软件商业秘密的构成要件不包括？', '秘密性', '价值性', '保密措施', '新颖性', 'D', NULL),
(@pack_id, 31, '中美经贸协议中，对软件盗版的刑事责任门槛要求？', '无门槛', '商业规模或故意盗版', '仅限复制光盘', '金额超过1000元', 'B', NULL),
(@pack_id, 32, '软件知识产权律师在审核开源代码入库时，应重点检查？', '代码是否有注释', '许可证是否与公司商业目标冲突', '代码是否漂亮', '开发者知名度', 'B', NULL),
(@pack_id, 33, '以下哪个是标准必要专利（SEP）的特点？', '无人使用', '实施标准必须使用，权利人承诺FRAND许可', '无效', '仅限中国', 'B', NULL),
(@pack_id, 34, '软件开发的“净室”开发方法主要用来防范什么风险？', '代码抄袭', '专利侵权', '合同违约', '商业秘密盗用', 'D', NULL),
(@pack_id, 35, '软件著作权集体管理组织的主要作用是？', '代理版权登记', '为软件权利人和使用者提供授权和收费服务', '处理盗版诉讼', '发布免费软件', 'B', NULL),
(@pack_id, 36, '软件外观设计（GUI）在中国可以通过什么保护？', '仅发明专利', '外观设计专利（需结合产品）', '仅著作权', '仅商标', 'B', NULL),
(@pack_id, 37, '软件许可协议中，限制被许可方“反向工程、反编译”的条款效力如何？', '因违反法律而无效', '通常有效，但部分国家法律允许为兼容目的例外', '任何情况无效', '仅对商业软件有效', 'B', NULL),
(@pack_id, 38, '员工离职一年内开发的与工作内容相关的软件，著作权归谁？', '个人', '原单位', '新单位', '共有', 'B', NULL),
(@pack_id, 39, '以下哪个是软件专利侵权抗辩的“在先使用”要件？', '在专利申请日前已制造相同产品', '在专利申请日前已使用或做好准备，且仅在原有范围内', '不知道侵权', '非商业使用', 'B', NULL),
(@pack_id, 40, '软件知识产权的“国际保护”主要依据？', '各国独立', '通过国际公约（如伯尔尼公约、TRIPS）实现国民待遇', '世界政府统一立法', '互惠协议', 'B', NULL),
(@pack_id, 41, '开源许可证的“终止”条款通常规定，如果用户违反许可证，则？', '永久失去所有权利', '自动终止授权，除非在特定期限内纠正', '只需支付罚款', '无后果', 'B', NULL),
(@pack_id, 42, '软件侵权诉讼中，“临时禁令”的作用是？', '终局判决', '诉讼期间立即制止侵权行为', '冻结资产', '强制和解', 'B', NULL),
(@pack_id, 43, '以下哪个是软件专利的客体排除（中国）？', '人工智能模型', '游戏规则', '区块链交易验证方法', '图像分割算法', 'B', NULL),
(@pack_id, 44, '软件知识产权律师在并购尽职调查中，主要关注？', '软件代码行数', '目标公司的软件知识产权权属、许可协议、合规风险', '员工数量', '客户名单', 'B', NULL),
(@pack_id, 45, '“云服务”提供商使用开源软件提供SaaS服务，AGPL可能要求什么？', '无需开源', '如果修改了AGPL代码，需要开源修改部分', '购买商业许可', '禁止使用', 'B', NULL),
(@pack_id, 46, '软件著作权侵权的“实质性相似”判断通常委托什么进行？', '用户调查', '司法鉴定', '律师主观', '陪审团', 'B', NULL),
(@pack_id, 47, '以下哪个是保护软件API（应用程序接口）结构的主要法律工具？', '专利', '商标', '著作权（在部分司法管辖区，如美国Oracle v. Google案）', '商业秘密', 'C', NULL),
(@pack_id, 48, '软件知识产权律师为客户制定的“知识产权策略”不应包括？', '专利申请布局', '开源合规政策', '商业秘密管理', '价格战策略', 'D', NULL),
(@pack_id, 49, '在处理软件侵权纠纷时，第一步通常建议？', '立即起诉', '发送律师函，尝试谈判', '公开谴责', '修改软件', 'B', NULL),
(@pack_id, 50, '作为软件知识产权律师，最重要的能力是？', '编程能力', '融合法律与技术，能够分析软件的技术细节并匹配法律保护', '销售技巧', '会计知识', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业43：法学×市场营销 → 广告法合规专员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_marketing:0', 43, '广告法合规专员', 'major_law', 'major_marketing', '法学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '中国《广告法》规定，广告应当真实、合法，不得含有什么内容？', '创意表达', '虚假或者引人误解的内容', '比较其他产品', '使用绝对化用语（部分情况允许）', 'B', NULL),
(@pack_id, 2, '以下哪个词汇在普通商品广告中绝对禁止使用？', '“领先”', '“国家级”', '“高品质”', '“有效”', 'B', NULL),
(@pack_id, 3, '广告中使用“最”字，以下哪个场景可能合法？', '“最好”', '“本产品获得某某大赛最高奖”（有事实依据）', '“最便宜”', '“最安全”', 'B', NULL),
(@pack_id, 4, '药品广告必须标明什么？', '药品价格', '广告批准文号和“请按药品说明书或在药师指导下购买使用”', '生产企业地址', '所有副作用', 'B', NULL),
(@pack_id, 5, '以下哪个不属于绝对化用语？', '顶级', '第一', '“高效”', '全网首发（有证据时可能合法）', 'C', NULL),
(@pack_id, 6, '医疗广告中，不得含有以下哪种内容？', '医疗机构名称', '利用患者形象作证明', '诊疗方法', '科室介绍', 'B', NULL),
(@pack_id, 7, '对比广告在什么情况下可能合法？', '任何情况下都合法', '在客观、真实、不贬低竞争对手的前提下', '只要不指名道姓', '仅限国际品牌', 'B', NULL),
(@pack_id, 8, '广告代言人未使用过推荐的产品，违反了哪条规定？', '广告法第2条', '广告法第38条', '广告法第55条', '广告法第44条', 'B', NULL),
(@pack_id, 9, '对于虚假广告，市场监管部门可对广告主处以多少罚款（一般情况）？', '1-3倍广告费用', '3-5倍广告费用', '5-10倍广告费用', '20万以下', 'B', NULL),
(@pack_id, 10, '以下哪个广告行为属于侵犯他人知识产权？', '使用普通字体', '使用他人注册商标作为关键词搜索', '描述产品功能', '引用第三方评测结果（有授权）', 'B', NULL),
(@pack_id, 11, '互联网广告应当具有可识别性，显著标明什么？', '“广告”或“推广”', '“赞助”', '“推荐”', '“合作”', 'A', NULL),
(@pack_id, 12, '使用“销量第一”作为广告语，需要提供什么？', '任何数据', '权威机构出具的证明或统计报告', '消费者证言', '不需要证据', 'B', NULL),
(@pack_id, 13, '广告法对“英雄烈士”相关内容的限制是？', '可以商业利用', '禁止歪曲、丑化、亵渎英雄烈士形象', '仅限正面宣传', '无限制', 'B', NULL),
(@pack_id, 14, '以下哪个是保健食品广告必须标注的内容？', '产品价格', '“本品不能代替药物”', '适宜人群', '不适宜人群', 'B', NULL),
(@pack_id, 15, '使用“国家级”、“最高级”、“最佳”等用语，哪个属于例外？', '企业内部宣传', '在限定范围内，有事实依据且不会误导消费者的（如“本小区最佳户型”）', '已注册商标中包含', '任何情况均不可', 'B', NULL),
(@pack_id, 16, '广告中提及“专利”的，必须标明什么？', '专利名称', '专利号和专利种类', '专利权人', '专利期限', 'B', NULL),
(@pack_id, 17, '违法广告的罚款计算基数“广告费用”无法计算时，罚款金额可能？', '5万以下', '10万以下', '20万以上100万以下', '200万以上', 'C', NULL),
(@pack_id, 18, '虚假广告欺骗、误导消费者，使消费者合法权益受到损害，谁承担民事责任？', '仅广告主', '广告主；广告发布者、代言人可能承担连带责任', '仅代言人', '消费者自己', 'B', NULL),
(@pack_id, 19, '以下哪个属于广告法禁止的淫秽、色情内容？', '人体艺术图片', '带有性暗示、性挑逗的描写', '正常内衣广告', '情侣亲吻', 'B', NULL),
(@pack_id, 20, '利用互联网发布、发送广告，不得影响用户正常使用网络，且应当显著标明关闭标志，确保？', '可跳过', '可一键关闭', '5秒后关闭', '需点击两次关闭', 'B', NULL),
(@pack_id, 21, '房地产广告中，不得含有以下哪种承诺？', '户型图', '升值或者投资回报承诺', '周边交通规划', '开发商名称', 'B', NULL),
(@pack_id, 22, '广告中使用不满多少周岁的未成年人作为代言人？', '12周岁', '10周岁（中国广告法：不得利用不满十周岁的未成年人作为广告代言人）', '8周岁', '6周岁', 'B', NULL),
(@pack_id, 23, '弹出广告未显著标明关闭标志，用户无法关闭的，处罚措施是？', '警告', '处5000元以上3万元以下罚款', '吊销执照', '刑事责任', 'B', NULL),
(@pack_id, 24, '广告法对“数据、统计资料、调查结果”的使用要求是？', '随意引用', '应当真实、准确，并注明出处', '无需注明', '只能使用官方数据', 'B', NULL),
(@pack_id, 25, '以下哪个属于广告法禁止的“妨碍社会公共秩序”内容？', '环保宣传', '煽动民族仇恨', '文明礼仪', '健康生活', 'B', NULL),
(@pack_id, 26, '对于教育培训广告，不得含有以下哪种承诺？', '师资介绍', '对升学、通过考试做出明示或暗示的保证性承诺', '课程设置', '收费标准', 'B', NULL),
(@pack_id, 27, '使用竞争对手的名义进行贬低比较，违反了什么？', '广告法第9条', '广告法第13条（贬低其他经营者）', '广告法第28条', '广告法第16条', 'B', NULL),
(@pack_id, 28, '广告审查机关对医疗、药品、医疗器械、农药等广告进行审查，未经审查不得发布，审查有效期为？', '6个月', '1年', '2年', '3年', 'B', NULL),
(@pack_id, 29, '广告代言人在广告中推荐商品，如果商品虚假造成损害，代言人承担什么责任？', '无责任', '与广告主承担连带责任', '仅行政罚款', '刑事责任', 'B', NULL),
(@pack_id, 30, '互联网广告的“程序化购买”中，广告需求方平台应当履行什么义务？', '无义务', '查验合同、登记广告主身份', '确保广告内容绝对真实', '预审全部素材', 'B', NULL),
(@pack_id, 31, '以下哪个是广告法规定的“特殊商品”广告发布前需审查？', '普通化妆品', '兽药', '家用电器', '服装', 'B', NULL),
(@pack_id, 32, '广告中使用的“引证内容”不准确或未标明出处，处罚为？', '警告', '处10万元以下罚款', '停止发布', '吊销执照', 'B', NULL),
(@pack_id, 33, '利用未成年人作为广告代言人，即使满10周岁，也不得代言什么？', '文具', '玩具', '童装', '不利于未成年人身心健康的商品', 'D', NULL),
(@pack_id, 34, '虚假广告的行政处罚中，情节严重的，可以吊销营业执照。该处罚由谁决定？', '市场监管局', '市场监管部门', '法院', '公安机关', 'B', NULL),
(@pack_id, 35, '以下哪个不属于互联网广告？', '社交媒体推广帖子', '搜索引擎关键词广告', '电子邮件广告', '传统电视广告', 'D', NULL),
(@pack_id, 36, '广告合规专员审核电商直播中的“最低价”宣传，应要求提供什么？', '历史销售记录', '全网同款产品的价格比对证据', '消费者评价', '品牌授权书', 'B', NULL),
(@pack_id, 37, '使用“纯天然”作为食品广告语，若产品含有添加剂，则构成？', '合法', '虚假广告', '比较广告', '公益广告', 'B', NULL),
(@pack_id, 38, '以下哪个行为违反了广告法关于“不得利用科研单位、学术机构作推荐”的规定？', '引用已发表的科研论文', '宣传“某某研究院推荐”', '展示实验室场景', '表明产品经过检验', 'B', NULL),
(@pack_id, 39, '广告合规专员发现广告使用了国旗元素，应如何处理？', '继续使用', '立即修改，因为法律禁止使用国旗进行商业广告', '申请授权', '缩小使用范围', 'B', NULL),
(@pack_id, 40, '以下哪个是广告法允许的绝对化用语场景？', '无任何限制', '在自建网站、店铺内对自身产品的真实且可证明的描述（如“我们的工艺最好”）', '任何场景都不允许', '仅限国家级项目', 'B', NULL),
(@pack_id, 41, '种子、农药广告中，不得含有以下哪种内容？', '使用说明', '无效退款承诺', '生产商信息', '批准文号', 'B', NULL),
(@pack_id, 42, '广告活动中的“商业广告”与“公益广告”的主要法律区别是？', '商业广告需审查，公益广告不需', '商业广告需遵守广告法所有规定，公益广告不得以公益名义变相商业', '公益广告免费发布', '无区别', 'B', NULL),
(@pack_id, 43, '通过电视购物发布广告，应当显著标明什么？', '产品价格', '“电视购物”字样', '售后服务电话', '生产企业', 'B', NULL),
(@pack_id, 44, '广告合规专员在审查促销活动“买一送一”时，必须确认什么？', '赠品与主商品相同', '赠品的品名、数量明确，且无附加条件', '赠品价格', '赠品生产日期', 'B', NULL),
(@pack_id, 45, '以下哪个属于“虚假广告”的典型表现？', '商品功能描述不完整', '商品性能与事实不符', '未标明专利号', '使用繁体字', 'B', NULL),
(@pack_id, 46, '对于违法广告，消费者可以向哪个部门投诉举报？', '消费者协会', '市场监督管理局', '公安局', '法院', 'B', NULL),
(@pack_id, 47, '广告合规专员应建议企业避免使用“全网最低价”，因为？', '难以验证且易涉嫌虚假宣传', '可能构成不正当竞争', '引发价格战', '以上都是', 'D', NULL),
(@pack_id, 48, '广告中使用“医生”形象推荐普通食品，违反了什么规定？', '广告法第9条', '广告法第16条（利用医生形象推荐食品）', '广告法第28条', '广告法第38条', 'B', NULL),
(@pack_id, 49, '以下哪个是广告主、广告经营者、广告发布者都必须遵守的基本义务？', '保证广告有创意', '建立广告业务档案', '每年进行审计', '购买责任险', 'B', NULL),
(@pack_id, 50, '作为广告法合规专员，最重要的能力是？', '平面设计', '精通广告法及相关法规，能够快速识别并修改违法内容', '市场策划', '编程', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业44：法学×市场营销 → 消费者权益律师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_marketing:1', 44, '消费者权益律师', 'major_law', 'major_marketing', '法学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '中国《消费者权益保护法》规定，消费者为________需要购买、使用商品或接受服务，其权益受保护。', '生产', '生活消费', '经营', '投资', 'B', NULL),
(@pack_id, 2, '消费者享有知悉其购买商品真实情况的权利，这属于什么权利？', '自主选择权', '知情权', '公平交易权', '监督权', 'B', NULL),
(@pack_id, 3, '经营者采用网络、电视、电话、邮购等方式销售商品，消费者有权自收到商品之日起____日内退货，且无需说明理由。', '3日', '7日', '15日', '30日', 'B', NULL),
(@pack_id, 4, '以下哪种商品不适用“七日无理由退货”？', '手机', '服装', '消费者定制的商品', '书籍', 'C', NULL),
(@pack_id, 5, '经营者提供商品有欺诈行为的，应当按照消费者要求增加赔偿其损失，增加赔偿的金额为消费者购买商品价款的____倍。', '1倍', '2倍', '3倍', '5倍', 'C', NULL),
(@pack_id, 6, '食品欺诈的惩罚性赔偿，依据《食品安全法》，可以要求支付价款____倍或损失____倍的赔偿金。', '3倍，1倍', '5倍，2倍', '10倍，3倍', '20倍，5倍', 'C', NULL),
(@pack_id, 7, '消费者在展销会购买商品受损，展销会结束后，可以向谁要求赔偿？', '只能向销售者', '展销会的举办者', '只能向生产者', '自行承担', 'B', NULL),
(@pack_id, 8, '经营者对消费者提出的修理、重作、更换、退货、补足商品数量等要求，故意拖延或无理拒绝的，除承担民事责任外，可处以罚款。罚款额度为？', '1万元以下', '5万元以下', '50万元以下', '100万元以下', 'C', NULL),
(@pack_id, 9, '消费者权益保护领域，“举证责任倒置”适用于什么情况？', '所有消费纠纷', '耐用商品或装饰装修服务，消费者接受商品起6个月内发现瑕疵', '仅食品纠纷', '仅网络购物', 'B', NULL),
(@pack_id, 10, '以下哪个不属于消费者协会的职责？', '受理消费者投诉', '作出行政处罚决定', '支持消费者诉讼', '发布消费警示', 'B', NULL),
(@pack_id, 11, '经营者以预收款方式提供商品，未按约定提供，应当如何处理？', '无需处理', '退回预付款并承担利息、支付合理费用', '只需退回预付款', '折价补偿', 'B', NULL),
(@pack_id, 12, '“霸王条款”通常指经营者以格式条款排除或限制消费者权利，以下哪项条款可能无效？', '商品一经售出概不退换', '最终解释权归商家所有', '对人身伤害免责', '以上都是', 'D', NULL),
(@pack_id, 13, '消费者因产品缺陷造成人身伤害，可以要求谁赔偿？', '销售者', '生产者', '仓储者', '销售者或生产者均可', 'D', NULL),
(@pack_id, 14, '经营者收集、使用消费者个人信息，应当遵循什么原则？', '合法、正当、必要', '公开、透明', '经消费者同意', '以上都是', 'D', NULL),
(@pack_id, 15, '以下哪个属于侵害消费者个人信息权的行为？', '未经同意发送商业信息', '泄露消费者个人信息', '出售消费者个人信息', '以上都是', 'D', NULL),
(@pack_id, 16, '消费者通过网络交易平台购买商品权益受损，平台不能提供销售者真实信息的，消费者可以向谁要求赔偿？', '仅销售者', '网络交易平台提供者', '仅生产者', '自行承担', 'B', NULL),
(@pack_id, 17, '欺诈消费者的“退一赔三”中，三倍赔偿的计算基数是？', '商品成本', '商品价款', '商品利润', '消费者损失', 'B', NULL),
(@pack_id, 18, '消费者购买商品后，在什么期限内发现商品质量问题可以要求退换（国家未规定“三包”期限的）？', '7天', '15天', '30天（自收到商品之日起）', '1年', 'C', NULL),
(@pack_id, 19, '根据《消费者权益保护法》，经营者不得以格式条款作出排除或限制消费者权利的内容，否则该条款？', '有效', '可撤销', '无效', '效力待定', 'C', NULL),
(@pack_id, 20, '消费者权益律师在代理群体性消费纠纷时，通常采用什么方式？', '分别起诉', '代表人诉讼', '仲裁', '刑事控告', 'B', NULL),
(@pack_id, 21, '经营者欺诈行为的“主观故意”是惩罚性赔偿的要件，以下哪种情形可推定故意？', '销售明知不符合安全标准的食品', '虚假宣传足以误导消费者', '隐匿商品真实信息', '以上都是', 'D', NULL),
(@pack_id, 22, '消费者在购买商品时，因经营者虚假宣传导致错误决策，可以主张什么？', '仅退货', '撤销合同并赔偿损失', '三倍赔偿', '以上都是', 'D', NULL),
(@pack_id, 23, '消费者权益律师在办理预付卡消费纠纷时，最常遇到的法律问题是？', '经营者跑路', '服务质量下降', '无法退卡', '以上都是', 'D', NULL),
(@pack_id, 24, '以下哪个是消费者权益保护公益诉讼的提起主体？', '任何消费者', '中国消费者协会以及在省、自治区、直辖市设立的消费者协会', '市场监督管理局', '公安机关', 'B', NULL),
(@pack_id, 25, '根据《消费者权益保护法》，经营者提供商品或服务造成消费者死亡，应赔偿的损失包括？', '丧葬费', '死亡赔偿金', '精神损害抚慰金', '以上都是', 'D', NULL),
(@pack_id, 26, '经营者对消费者进行侮辱、诽谤，或搜查身体及携带物品，应承担什么责任？', '仅民事责任', '仅行政责任', '仅刑事责任', '民事、行政、刑事责任都可能', 'D', NULL),
(@pack_id, 27, '“职业打假人”是否受消费者权益保护法保护？', '完全受保护', '司法实践中对其以牟利为目的的购买行为，法院可能不支持惩罚性赔偿', '绝对不受保护', '仅受合同法保护', 'B', NULL),
(@pack_id, 28, '消费者权益律师在审查电商平台服务协议时，应重点关注哪些条款？', '争议解决方式（仲裁或诉讼）', '管辖法院约定', '免责条款', '以上都是', 'D', NULL),
(@pack_id, 29, '以下哪个不属于消费者权益保护法的调整范围？', '购买商品房自住', '购买汽车自用', '大学生购买教材', '农民购买种子用于大面积种植（属于农业生产，适用《农业法》等）', 'D', NULL),
(@pack_id, 30, '经营者提供商品或服务有欺诈行为，消费者要求三倍赔偿，三倍金额不足500元的，按多少计算？', '仍按实际计算', '500元', '1000元', '2000元', 'B', NULL),
(@pack_id, 31, '消费者因购买商品导致精神损害，什么情况下可以获得精神损害赔偿？', '只要商品有问题', '造成严重精神损害（如人身权益被侵害）', '无需严重', '任何损害均可', 'B', NULL),
(@pack_id, 32, '消费权益律师在代理案件时，为证明“欺诈”，最关键的证据是？', '购买凭证', '广告宣传材料', '经营者内部文件', '消费者受到误导的证明及经营者主观故意', 'D', NULL),
(@pack_id, 33, '消费者通过网络购买进口商品，产生纠纷，诉讼管辖法院可以是？', '只能被告住所地', '只能合同履行地', '消费者住所地（买受人住所地）', '产品生产地', 'C', NULL),
(@pack_id, 34, '经营者使用“最终解释权归本店”等格式条款，违反了？', '广告法', '消费者权益保护法', '产品质量法', '合同法', 'B', NULL),
(@pack_id, 35, '以下哪个属于消费者的“监督权”？', '对商品进行评价', '举报违法经营行为', '对消费者协会工作提出批评', '以上都是', 'D', NULL),
(@pack_id, 36, '消费者权益律师参与立法建议时，应重点关注什么？', '降低消费者维权门槛', '提高惩罚性赔偿倍数', '明确经营者举证责任', '以上都是', 'D', NULL),
(@pack_id, 37, '购买汽车后，发现车辆存在严重安全缺陷，多次维修仍未解决，消费者可以要求？', '退货', '换货', '赔偿损失', '以上都是', 'D', NULL),
(@pack_id, 38, '经营者以“样品”或“处理品”名义销售商品，但未明示瑕疵，消费者发现重大瑕疵，可否退货？', '不可，因为明示是样品', '可以，因为未明确告知具体瑕疵', '视价格而定', '需经检测', 'B', NULL),
(@pack_id, 39, '消费者权益律师在处理医疗美容纠纷时，能否适用消费者权益保护法？', '不能，医疗行为不属消费', '可以，生活性医疗美容属消费', '仅适用侵权法', '视合同约定', 'B', NULL),
(@pack_id, 40, '以下哪个是消费者协会支持消费者诉讼的方式？', '直接代理诉讼', '提供法律咨询、出具支持起诉意见', '作为原告起诉', '强制调解', 'B', NULL),
(@pack_id, 41, '消费者权益保护法中的“经营者”包括哪些？', '生产者', '销售者', '服务提供者', '以上都是', 'D', NULL),
(@pack_id, 42, '经营者违反明码标价义务，多收取费用，应退还并赔偿多少？', '退还多收部分', '退还多收部分并加一倍赔偿', '退还多收部分，并承担惩罚性赔偿（根据价格法）', '仅道歉', 'C', NULL),
(@pack_id, 43, '消费者权益律师在办理旅游消费纠纷时，常见法律依据包括？', '《旅游法》', '《消费者权益保护法》', '《合同法》', '以上都是', 'D', NULL),
(@pack_id, 44, '消费者因经营者利用虚假广告提供商品受损，广告发布者不能提供经营者真实信息的，广告发布者应？', '无责任', '承担赔偿责任', '仅行政责任', '连带责任', 'B', NULL),
(@pack_id, 45, '商品“三包”期内修理两次仍不能正常使用，消费者可以要求？', '继续修理', '换货或退货', '折价补偿', '仅赔偿维修费', 'B', NULL),
(@pack_id, 46, '消费者权益律师在代理群体诉讼时，最重要的策略是？', '快速和解', '收集统一证据，争取典型示范案例', '媒体施压', '申请法院调查令', 'B', NULL),
(@pack_id, 47, '经营者未经消费者同意，发送商业信息，消费者可以要求？', '停止发送', '赔偿损失', '道歉', '以上都是（根据《广告法》及《消费者权益保护法》）', 'D', NULL),
(@pack_id, 48, '以下哪个不属于消费者权益争议解决途径？', '与经营者协商和解', '请求消费者协会调解', '向有关行政部门申诉', '向公安机关报案（除非涉嫌犯罪）', 'D', NULL),
(@pack_id, 49, '消费者权益律师在处理“保健品虚假宣传”案件时，可依据的法律包括？', '《食品安全法》', '《消费者权益保护法》', '《广告法》', '以上都是', 'D', NULL),
(@pack_id, 50, '作为消费者权益律师，最重要的价值观是？', '为客户争取最大利益', '维护公平正义，保护弱势消费者权益', '胜诉率最大化', '快速结案', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业45：法学×市场营销 → 营销合同审核
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_marketing:2', 45, '营销合同审核', 'major_law', 'major_marketing', '法学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '营销合同中最核心的要素是？', '合同金额', '双方的权利义务', '争议解决方式', '违约责任', 'B', NULL),
(@pack_id, 2, '营销合同中，关于“服务范围”的条款应当如何描述？', '尽量模糊，便于解释', '明确、具体、可衡量', '引用外部标准', '口头约定即可', 'B', NULL),
(@pack_id, 3, '以下哪个条款属于“格式条款”，可能因不公平而无效？', '保密条款', '“甲方可随时终止合同，无需任何理由”', '知识产权归属条款', '付款条款', 'B', NULL),
(@pack_id, 4, '审核营销合同中的“付款条款”，应重点关注？', '付款时间节点', '付款条件是否客观', '发票类型与税率', '以上都是', 'D', NULL),
(@pack_id, 5, '营销合同中，“不可抗力”条款通常不包括以下哪种情况？', '自然灾害', '战争', '员工罢工（视情况，可能不属于）', '政府行为', 'C', NULL),
(@pack_id, 6, '独家代理合同中，限制代理商销售竞品，属于什么条款？', '无效条款', '排他性条款（可能有效）', '垄断条款', '霸王条款', 'B', NULL),
(@pack_id, 7, '营销合同审核中，“知识产权”条款应明确什么？', '合同履行产生的成果归属', '各方原有知识产权的许可', '侵权责任承担', '以上都是', 'D', NULL),
(@pack_id, 8, '以下哪个不属于营销合同的常见类型？', '广告发布合同', '促销服务合同', '劳动合同', '渠道分销合同', 'C', NULL),
(@pack_id, 9, '审核“违约责任”条款时，应注意违约金是否过高。根据《民法典》，超过损失多少的违约金可请求调减？', '10%', '20%', '30%', '50%', 'C', NULL),
(@pack_id, 10, '合同中“管辖法院”约定为“甲方所在地法院”，对于乙方（营销服务商）是否公平？', '完全公平', '可能增加乙方维权成本，应争取约定对等或第三方', '无效', '必须接受', 'B', NULL),
(@pack_id, 11, '营销合同中的“验收标准”条款，以下哪个描述最佳？', '“甲方满意为准”', '客观量化指标，如“曝光量达到XX，点击率超过YY”', '“符合行业惯例”', '“乙方尽最大努力”', 'B', NULL),
(@pack_id, 12, '广告投放合同中，“按效果付费”的“效果”应当如何定义？', '模糊定义', '明确定义为“点击、转化、下载”等可验证动作', '仅口头说明', '由乙方单方确认', 'B', NULL),
(@pack_id, 13, '营销合同中的“保密信息”范围不应包括？', '客户名单', '营销策略', '已公开的信息', '报价单', 'C', NULL),
(@pack_id, 14, '营销合同的“合同期限”条款，应明确什么？', '起始日期', '终止日期或续约条件', '提前终止通知期', '以上都是', 'D', NULL),
(@pack_id, 15, '审核营销合同时，发现“乙方不得对甲方任何负面评价”，该条款？', '合法有效', '可能因限制言论自由而效力存疑，尤其对于真实评价', '绝对无效', '需双方公证', 'B', NULL),
(@pack_id, 16, '营销服务合同中，“项目交付物”的定义应尽量？', '笼统', '详细罗列具体清单和格式', '不定义', '以甲方口头确认为准', 'B', NULL),
(@pack_id, 17, '以下哪个属于合同审核中的“风险条款”？', '无限责任条款', '单方终止条款', '自动续约条款', '以上都是', 'D', NULL),
(@pack_id, 18, '审核“数据合规”条款时，应确保符合哪部法律？', '民法典', '个人信息保护法', '广告法', '反垄断法', 'B', NULL),
(@pack_id, 19, '营销合同中的“反商业贿赂”条款，主要目的是？', '保障合同执行', '防止腐败，确保合规', '提高利润率', '降低税负', 'B', NULL),
(@pack_id, 20, '在框架协议下，具体项目执行应采用什么形式？', '口头确认', '补充协议或订单（PO）', '邮件即可', '无需确认', 'B', NULL),
(@pack_id, 21, '审核营销合同中的“授权”条款，应确认乙方是否有权使用甲方商标、肖像等？', '默认有权', '需明确授权范围、期限、地域', '无需确认', '由乙方自行负责', 'B', NULL),
(@pack_id, 22, '合同审核发现条款“甲方可扣除乙方任何款项”，该条款的风险是？', '对乙方极为不利', '可能被滥用，应修改为“合理且与损失相当”', '合法有效', '常见条款无需修改', 'B', NULL),
(@pack_id, 23, '营销合同中的“转让”条款，通常约定未经对方书面同意不得转让，目的是？', '保持合同稳定性', '防止权利被转让给不可靠第三方', '保障合作关系的信任', '以上都是', 'D', NULL),
(@pack_id, 24, '审核“国际营销合同”时，应特别注意？', '适用法律（准据法）', '争议解决（仲裁地）', '货币和汇率风险', '以上都是', 'D', NULL),
(@pack_id, 25, '合同中“通知送达”条款，约定电子邮箱送达即视为送达，是否有效？', '无效', '有效，但需约定对方确认接收的邮箱', '必须公证送达', '仅书面有效', 'B', NULL),
(@pack_id, 26, '营销合同审核时，发现“甲方对乙方的履约成果享有全部知识产权”，乙方仅拥有署名权，是否合理？', '不合理，乙方应保留著作权', '取决于谈判地位和行业惯例，常见为甲方所有', '绝对无效', '必须共有', 'B', NULL),
(@pack_id, 27, '合同中的“定金”与“订金”，法律后果有何不同？', '相同', '定金适用定金罚则（给付方违约无权返还，收受方违约双倍返还）', '订金可双倍返还', '定金无需返还', 'B', NULL),
(@pack_id, 28, '审核营销合同中“免责条款”，应警惕免除什么责任？', '轻微过失', '重大过失或故意', '不可抗力', '意外事件', 'B', NULL),
(@pack_id, 29, '营销合同中的“价格调整条款”，通常如何处理？', '固定不变', '约定调价机制，如根据CPI或原材料价格', '由甲方单方决定', '由乙方单方决定', 'B', NULL),
(@pack_id, 30, '营销合同审核中，若合同为英文版本，应注意什么？', '语言优先级（中英文冲突时的适用）', '翻译准确性', '法律术语的当地含义', '以上都是', 'D', NULL),
(@pack_id, 31, '合同中的“保证”条款，乙方承诺“活动参与人数不少于1000人”，若未达到，应承担什么？', '无责任', '按合同约定扣减服务费或赔偿', '仅道歉', '重新执行', 'B', NULL),
(@pack_id, 32, '审核营销合同中的“竞争限制”条款，应关注？', '期限是否合理', '地域范围是否过大', '是否有补偿', '以上都是', 'D', NULL),
(@pack_id, 33, '营销合同中，“验收”条款最好约定“甲方应在____日内验收，逾期视为认可”，该期限通常为？', '1-2天', '5-10天', '30天', '不限', 'B', NULL),
(@pack_id, 34, '对于营销代理合同，佣金支付条件应明确，以下哪个最清晰？', '“销售额到账后支付”', '“甲方收到客户全额款项后15日内支付乙方佣金”', '“季度结算”', '“双方协商”', 'B', NULL),
(@pack_id, 35, '审核“广告发布合同”，应核实广告内容是否已通过什么审查？', '市场监管部门（如需审查）', '甲方内部法务', '广告发布者平台规则', '以上都是', 'D', NULL),
(@pack_id, 36, '营销合同中，“甲方提供素材”的责任边界，应约定？', '甲方保证素材不侵权', '乙方在使用前有义务审核', '侵权责任由甲方承担', '以上都是', 'D', NULL),
(@pack_id, 37, '合同审核中，“完整协议条款”（Entire Agreement）的作用是？', '禁止口头补充', '排除合同签订前的所有陈述', '增加合同内容', '延长合同期限', 'B', NULL),
(@pack_id, 38, '营销合同涉及第三方（如KOL）时，应确保？', '获得第三方书面授权', '明确第三方与甲方的直接关系', '约定乙方对第三方行为的责任', '以上都是', 'D', NULL),
(@pack_id, 39, '合同中的“保险”条款，通常要求乙方购买什么保险？', '公众责任险', '雇主责任险', '产品责任险', '根据业务类型，可能要求以上', 'D', NULL),
(@pack_id, 40, '审核营销服务合同时，最应避免的条款是？', '“按实际工作量结算”', '“甲方可随时无理由终止且不支付任何费用”', '“乙方需保守商业秘密”', '“争议由甲方所在地法院管辖”', 'B', NULL),
(@pack_id, 41, '营销合同中的“数据所有权”，通常用户数据归谁？', '乙方', '甲方（数据控制者）', '用户', '第三方', 'B', NULL),
(@pack_id, 42, '审核合同中的“陈述与保证”，应确保乙方的保证内容不超出其能力范围，否则？', '构成虚假陈述，承担违约责任', '不影响合同效力', '甲方可解除合同', 'A和C', 'D', NULL),
(@pack_id, 43, '营销合同的“修改条款”，应规定任何修改需采用什么形式？', '口头', '书面并经双方签字', '邮件确认即可', '一方通知', 'B', NULL),
(@pack_id, 44, '审核“公关服务合同”时，危机处理条款应约定？', '乙方需提供危机预案', '危机发生时乙方有建议权', '最终决定权在甲方', '以上都是', 'D', NULL),
(@pack_id, 45, '合同中的“不可抗力”条款，未列举“疫情”，疫情是否属于不可抗力？', '不属于', '视具体情况，可能属于', '永远属于', '永远不属于', 'B', NULL),
(@pack_id, 46, '营销合同审核后，应出具什么文件？', '合同盖章', '法律意见书或审核记录表', '发票', '付款申请', 'B', NULL),
(@pack_id, 47, '审核营销合同中的“止损义务”条款，指一方发现对方违约时，应采取合理措施减少损失，否则？', '无权就扩大的损失索赔', '仍可索赔全部', '合同自动终止', '需承担违约责任', 'A', NULL),
(@pack_id, 48, '对于“效果营销”合同，如“按CPA结算”，应明确CPA的定义？', '任意行为', '特定转化行为（如注册、购买）', '仅点击', '仅展示', 'B', NULL),
(@pack_id, 49, '营销合同审核的最终目标是什么？', '完全消除所有风险', '在商业可接受范围内控制法律风险，平衡双方权利义务', '尽量让己方免责', '快速签字', 'B', NULL),
(@pack_id, 50, '作为营销合同审核律师，最重要的能力是？', '熟悉各种营销模式', '精通合同法及相关法规', '商业谈判思维', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业46：法学×数据科学 → 算法合规顾问
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_ds:0', 46, '算法合规顾问', 'major_law', 'major_ds', '法学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '中国《个人信息保护法》规定，利用个人信息进行自动化决策，应当保证决策的什么？', '快速性', '透明性和结果公平公正', '准确性', '盈利性', 'B', NULL),
(@pack_id, 2, '算法推荐服务提供者应当向用户提供什么？', '删除算法', '不针对其个人特征的选项', '算法源代码', '所有训练数据', 'B', NULL),
(@pack_id, 3, 'GDPR中，与算法自动化决策相关的条款是？', '第17条（删除权）', '第22条（自动化决策权）', '第5条（数据最小化）', '第33条（数据泄露通知）', 'B', NULL),
(@pack_id, 4, '算法歧视的典型表现不包括？', '性别歧视', '种族歧视', '年龄歧视', '提高效率', 'D', NULL),
(@pack_id, 5, '评估算法是否公平，常用的“均等几率”指标是指？', '不同组别的预测准确率相等', '不同组别的假正率和假负率相等', '不同组别的样本数相等', '不同组别的模型复杂度相等', 'B', NULL),
(@pack_id, 6, '中国《互联网信息服务算法推荐管理规定》要求，具有舆论属性或者社会动员能力的算法推荐服务提供者，应当进行？', '算法备案', '算法安全评估', '用户标签管理', 'A和B', 'D', NULL),
(@pack_id, 7, '以下哪个不是算法合规审查的主要内容？', '算法是否产生歧视', '算法是否侵犯隐私', '算法是否盈利', '算法是否可解释', 'C', NULL),
(@pack_id, 8, '“算法黑箱”问题主要挑战什么？', '计算速度', '透明度和可解释性', '数据存储', '代码长度', 'B', NULL),
(@pack_id, 9, '欧盟《人工智能法案》将AI系统分为不可接受风险、高风险、有限风险和极低风险。高风险的AI系统需要？', '完全禁止', '符合严格合规要求，如风险管理、数据治理等', '无需任何要求', '仅自行声明', 'B', NULL),
(@pack_id, 10, '算法合规顾问在审核招聘算法时，应特别关注什么？', '算法是否提高效率', '是否排除特定性别、年龄或种族', '算法复杂度', '开发成本', 'B', NULL),
(@pack_id, 11, '个人有权要求算法解释其决策，这在GDPR中称为？', '数据可携权', '解释权（Right to explanation）', '被遗忘权', '限制处理权', 'B', NULL),
(@pack_id, 12, '算法合规顾问建议公司进行“算法影响评估”，其法律依据包括？', 'PIPL要求个人信息保护影响评估包含自动化决策', 'GDPR的数据保护影响评估（DPIA）', '中国算法推荐管理规定', '以上都是', 'D', NULL),
(@pack_id, 13, '以下哪个是算法公平性的常见指标？', '均方误差（MSE）', '人口均等（Demographic parity）', 'AUC', 'F1分数', 'B', NULL),
(@pack_id, 14, '信用评分算法若对特定社区产生系统性不利影响，可能违反什么原则？', '效益原则', '非歧视原则', '效率原则', '创新原则', 'B', NULL),
(@pack_id, 15, '算法合规顾问发现公司AI面试系统根据方言判断候选人出身，应建议？', '继续使用', '评估是否存在地域歧视风险，并移除敏感特征', '仅内部使用', '增加更多特征', 'B', NULL),
(@pack_id, 16, '中国《个人信息保护法》要求，通过自动化决策方式向个人进行信息推送、商业营销，应当同时提供什么？', '拒绝选项', '不针对其个人特征的选项', '删除个人信息的选项', '投诉渠道', 'B', NULL),
(@pack_id, 17, '算法合规审查中，“输入数据合法性”要求不包括？', '数据来源合法', '数据已获授权', '数据量越大越好', '数据不含歧视性偏见', 'C', NULL),
(@pack_id, 18, '金融风控算法如果使用了“邮政编码”作为特征，可能间接导致什么歧视？', '年龄歧视', '种族或收入歧视（红lining）', '性别歧视', '身高歧视', 'B', NULL),
(@pack_id, 19, '算法可解释性的LIME方法是指？', '局部可解释模型-agnostic解释', '全局特征重要性', '决策树可视化', '神经网络可视化', 'A', NULL),
(@pack_id, 20, '算法合规顾问在面对“算法商业秘密”与“用户知情权”冲突时，应如何平衡？', '优先保护商业秘密', '优先保护用户知情权', '提供有意义的解释，无需披露源代码', '取消算法使用', 'C', NULL),
(@pack_id, 21, '以下哪个是算法合规的国际标准？', 'ISO/IEC 27001', 'ISO/IEC 24028（人工智能可信性）', 'ISO 9001', 'ISO 14001', 'B', NULL),
(@pack_id, 22, '中国《新一代人工智能伦理规范》强调的原则包括？', '增进人类福祉', '促进公平公正', '保护隐私安全', '以上都是', 'D', NULL),
(@pack_id, 23, '算法合规顾问评估“推荐系统”时，应警惕什么？', '信息茧房', '过度个性化导致用户窄化', '操纵用户行为', '以上都是', 'D', NULL),
(@pack_id, 24, '在算法合规中，“公平性”与“准确性”通常存在什么关系？', '完全正相关', '可能存在权衡，提高公平性可能降低准确性', '无关', '负相关', 'B', NULL),
(@pack_id, 25, '以下哪个是用于检测算法歧视的常用工具？', 'TensorFlow', 'AI Fairness 360 (IBM)', 'PyTorch', 'Scikit-learn', 'B', NULL),
(@pack_id, 26, '算法合规顾问应建议企业建立什么内部机制？', '算法合规委员会', '算法伦理审查流程', '用户申诉渠道', '以上都是', 'D', NULL),
(@pack_id, 27, '如果算法错误地将合法用户标记为欺诈，用户可主张什么权利？', '知情权', '更正权', '损害赔偿请求权', '以上都是', 'D', NULL),
(@pack_id, 28, '欧盟《人工智能法案》中，禁止的AI实践包括？', '人脸识别（无例外）', '潜意识操纵、社会信用评分、公共场所实时远程生物识别（有例外）', '自动驾驶', '医疗诊断', 'B', NULL),
(@pack_id, 29, '算法合规顾问在处理“跨境数据传输”时，需确保算法使用的个人数据符合什么？', '数据本地化要求', '标准合同条款', '认证机制', '以上都是', 'D', NULL),
(@pack_id, 30, '算法模型的“概念漂移”可能带来什么合规风险？', '模型过时', '决策标准改变可能引入歧视', '计算变慢', '存储增加', 'B', NULL),
(@pack_id, 31, '中国《算法推荐管理规定》要求，算法推荐服务提供者应当定期审核、评估、验证算法机制，频率为？', '每年一次', '每半年一次', '每季度一次', '每月一次', 'B', NULL),
(@pack_id, 32, '算法合规顾问对于“未成年人保护”应特别关注什么？', '算法诱导沉迷', '算法收集未成年人信息', '算法推送不适宜内容', '以上都是', 'D', NULL),
(@pack_id, 33, '以下哪个属于“算法水印”或“算法审计日志”的作用？', '提高速度', '增强可追溯性，便于合规审查', '降低成本', '简化模型', 'B', NULL),
(@pack_id, 34, '美国《算法问责法案》（提案）要求大型平台进行什么？', '算法开源', '自动化决策系统影响评估', '算法专利公开', '算法收益分享', 'B', NULL),
(@pack_id, 35, '算法合规顾问在审核“人脸识别”应用时，最重要的原则是？', '技术先进性', '必要性、同意、替代方案', '低成本', '高精度', 'B', NULL),
(@pack_id, 36, '算法带来的“歧视性结果”即使是无意的，企业也可能承担什么责任？', '无责任', '民事责任甚至行政处罚', '仅道德责任', '刑事责任', 'B', NULL),
(@pack_id, 37, '算法合规中的“可追溯性”要求记录什么？', '训练数据的来源和预处理', '模型版本和参数', '决策的关键因素', '以上都是', 'D', NULL),
(@pack_id, 38, '以下哪个是算法合规顾问应使用的分析框架？', 'CRISP-DM', 'FERMAT（公平、道德、可靠、可解释、透明）', 'PDCA', 'SWOT', 'B', NULL),
(@pack_id, 39, '对于医疗诊断算法，除了通用合规要求，还应满足什么？', '医疗器械法规', '临床试验要求', '医生监督机制', '以上都是', 'D', NULL),
(@pack_id, 40, '算法合规顾问如何测试算法是否歧视？', '审查代码', '使用不同敏感属性分组的测试数据，比较预测结果', '询问开发者', '查看用户反馈', 'B', NULL),
(@pack_id, 41, '算法合规中的“反回避”条款是指？', '不能删除算法', '不能使用代理变量绕过敏感属性保护', '必须公开算法', '必须审计算法', 'B', NULL),
(@pack_id, 42, '如果算法的训练数据包含历史歧视决策，可能导致什么？', '算法更公平', '算法学习并放大歧视', '算法无效', '算法加速', 'B', NULL),
(@pack_id, 43, '中国法律中，对于“深度合成”技术（如AI换脸）的特别要求是？', '不得生成任何内容', '必须显著标识，避免误导', '需经公安机关审批', '禁止使用', 'B', NULL),
(@pack_id, 44, '算法合规顾问建议企业建立“人工干预机制”，主要针对什么？', '提高效率', '在高风险决策中保障最终决定由人做出', '降低成本', '提高隐私', 'B', NULL),
(@pack_id, 45, '以下哪个是算法合规咨询中常用的风险分类方法？', 'KRI', '风险矩阵（可能性 vs 严重性）', 'KPI', 'OKR', 'B', NULL),
(@pack_id, 46, '算法合规顾问发现某算法对特定宗教群体不利，应首先？', '建议移除宗教特征', '分析是否与业务必要相关', '建议重新训练模型', '以上都是', 'D', NULL),
(@pack_id, 47, '中国《个人信息保护法》关于“自动化决策”的规定，要求向用户提供？', '删除个人信息的途径', '拒绝自动化决策的途径', '数据副本', '算法解释', 'B', NULL),
(@pack_id, 48, '算法合规顾问应与公司的哪些部门协作？', '法务部', '技术部', '数据科学部', '以上都是', 'D', NULL),
(@pack_id, 49, '算法合规的“全球协调”挑战主要体现在？', '各国法规冲突', '数据跨境流动限制', '监管机构不一致', '以上都是', 'D', NULL),
(@pack_id, 50, '作为算法合规顾问，最重要的能力是？', '精通编程', '理解算法技术原理及法律规制，能够架桥沟通', '诉讼经验', '市场分析', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业47：法学×数据科学 → 数据治理专家
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_ds:1', 47, '数据治理专家', 'major_law', 'major_ds', '法学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '数据治理的核心目标不包括以下哪一项？', '确保数据质量', '保证数据安全合规', '最大化数据存储量', '提升数据可用性', 'C', NULL),
(@pack_id, 2, '以下哪个是数据治理中“元数据管理”的主要内容？', '数据备份', '数据定义、血缘、业务术语管理', '数据加密', '数据脱敏', 'B', NULL),
(@pack_id, 3, 'GDPR中关于“数据保护官”（DPO）的任命要求，以下哪个组织必须任命？', '所有公司', '核心业务涉及大规模处理敏感数据或监控个人的公共机构或私人实体', '员工少于10人的企业', '非营利组织', 'B', NULL),
(@pack_id, 4, '中国《数据安全法》中，对数据实行分类分级保护，国家核心数据实行什么保护？', '一般保护', '严格保护', '重点保护', '完全开放', 'B', NULL),
(@pack_id, 5, '数据治理框架DCAM（数据管理能力成熟度模型）由哪个组织发布？', '国际标准化组织', 'EDM委员会（企业数据管理委员会）', '中国信通院', '美国国家标准与技术研究院', 'B', NULL),
(@pack_id, 6, '以下哪个属于数据治理中的“数据质量管理”维度？', '准确性', '完整性', '一致性', '以上都是', 'D', NULL),
(@pack_id, 7, '数据治理专家在处理“数据跨境传输”时，应依据哪部法律进行安全评估？', '《网络安全法》', '《数据安全法》和《个人信息保护法》', '《电子商务法》', '《反垄断法》', 'B', NULL),
(@pack_id, 8, '“数据生命周期管理”的阶段不包括？', '数据采集', '数据存储', '数据销毁', '数据销售', 'D', NULL),
(@pack_id, 9, '数据治理委员会通常由哪些角色组成？', '业务负责人', '数据所有者', '法务合规人员', '以上都是', 'D', NULL),
(@pack_id, 10, '以下哪个是用于实现数据血缘追踪的技术？', '数据掩码', '数据谱系工具（如Apache Atlas）', '数据加密', '数据压缩', 'B', NULL),
(@pack_id, 11, '个人信息保护法中，处理敏感个人信息应当取得什么同意？', '一般同意', '单独同意', '书面同意', '口头同意', 'B', NULL),
(@pack_id, 12, '数据治理中的“数据字典”主要作用是？', '加密数据', '提供数据元素的业务含义和技术属性', '备份数据', '索引优化', 'B', NULL),
(@pack_id, 13, '以下哪个国际标准是数据治理的参考框架？', 'ISO 9001', 'ISO/IEC 38505（数据治理）', 'ISO 27001', 'ISO 14001', 'B', NULL),
(@pack_id, 14, '数据治理专家应建议企业建立什么制度来管理数据访问权限？', '公开访问', '最小权限原则', '默认全部可访问', '管理员统一授权', 'B', NULL),
(@pack_id, 15, '数据脱敏技术中，将数据替换为随机但保持格式的值，属于？', '加密', '掩码', '假名化', '匿名化', 'C', NULL),
(@pack_id, 16, '数据治理中的“数据合规”审查，不包括以下哪项？', '数据来源合法性', '数据处理同意授权', '数据存储期限', '数据价值最大化', 'D', NULL),
(@pack_id, 17, '以下哪个行为违反《个人信息保护法》中关于“最小必要”原则？', '收集手机号码用于登录', '收集通讯录用于智能推荐好友', '收集位置用于导航服务', '收集性别用于个性化推荐', 'B', NULL),
(@pack_id, 18, '数据治理专家在制定数据保留策略时，应依据什么？', '业务需求', '法律法规要求', '存储成本', '以上都是', 'D', NULL),
(@pack_id, 19, '数据治理中“数据资产目录”的作用是？', '仅存储数据', '提供数据资产的发现、搜索和理解能力', '执行数据删除', '备份数据', 'B', NULL),
(@pack_id, 20, '中国《数据安全法》要求重要数据的处理者应当定期开展什么？', '数据审计', '风险评估', '数据备份', '数据加密', 'B', NULL),
(@pack_id, 21, '数据治理专家处理“数据主体权利请求”（如删除、更正）时，法定响应时间是？', '24小时', '15日（中国PIPL要求）', '30日', '7日', 'B', NULL),
(@pack_id, 22, '以下哪个是数据治理中的“数据安全技术”？', '加密', '脱敏', '审计日志', '以上都是', 'D', NULL),
(@pack_id, 23, '数据治理框架中，DAMA（数据管理协会）发布的数据管理知识体系是？', 'CMMI', 'DMBOK', 'COBIT', 'ITIL', 'B', NULL),
(@pack_id, 24, '数据治理专家在评估第三方数据供应商时，应审查什么？', '供应商的数据安全能力', '供应商的数据来源合法性', '供应商的合规资质', '以上都是', 'D', NULL),
(@pack_id, 25, '“数据分级”通常根据什么因素划分？', '数据价值', '数据敏感程度', '数据泄露影响', '以上都是', 'D', NULL),
(@pack_id, 26, '数据治理中，数据的“可追溯性”要求记录什么？', '数据的产生、变更、流转过程', '数据的访问者', '数据的存储位置', '以上都是', 'D', NULL),
(@pack_id, 27, '以下哪个不是数据治理的典型挑战？', '数据孤岛', '数据质量差', '合规要求变化快', '数据太容易删除', 'D', NULL),
(@pack_id, 28, '数据治理专家应建议企业采用什么组织模式？', '集中式数据治理团队', '联邦式（业务+中央）', '分散式', '取决于企业规模和结构，通常联邦式最佳', 'D', NULL),
(@pack_id, 29, '中国《个人信息保护法》中，个人信息处理者应当对其个人信息处理活动负责，并采取必要措施保障所处理的个人信息的安全，这称为？', '责任原则', 'accountability（问责制）', '透明原则', '目的限制', 'B', NULL),
(@pack_id, 30, '数据治理中的“数据联邦”是指？', '数据统一存储', '在不移动数据的情况下实现跨源数据查询和集成', '数据物理集中', '数据加密传输', 'B', NULL),
(@pack_id, 31, '处理儿童个人信息，应当取得谁的同意？', '儿童本人', '监护人', '学校', '无需同意', 'B', NULL),
(@pack_id, 32, '数据治理专家应推动建立“数据责任人”制度，数据责任人的职责包括？', '定义数据标准和规则', '授权数据访问', '确保数据质量', '以上都是', 'D', NULL),
(@pack_id, 33, '以下哪个是数据治理中“数据清理”的主要内容？', '删除重复数据', '修正错误数据', '补充缺失数据', '以上都是', 'D', NULL),
(@pack_id, 34, 'GDPR中的“数据保护影响评估”（DPIA）在什么情况下必须进行？', '所有数据处理活动', '处理活动可能对个人权利和自由产生高风险时', '仅跨境传输时', '仅敏感数据处理时', 'B', NULL),
(@pack_id, 35, '数据治理专家应如何应对监管部门的合规检查？', '准备数据映射文档', '准备数据处理记录', '准备安全措施说明', '以上都是', 'D', NULL),
(@pack_id, 36, '“数据冷存储”主要解决什么问题？', '降低存储成本', '提高访问速度', '增强安全性', 'A', 'A', NULL),
(@pack_id, 37, '数据治理中，“变更管理”流程的主要作用是？', '随意修改数据', '控制数据模型、ETL流程等的变更，确保质量和可追溯', '删除旧数据', '增加存储容量', 'B', NULL),
(@pack_id, 38, '以下哪个是数据治理成熟度评估模型？', 'CMMI', 'DCMM（数据管理能力成熟度模型）', 'ITIL', 'COBIT', 'B', NULL),
(@pack_id, 39, '数据治理专家发现某业务部门私自存储客户数据到个人电脑，应建议？', '允许继续', '立即整改，纳入统一数据治理范围，并加强培训', '删除所有数据', '报告公安机关', 'B', NULL),
(@pack_id, 40, '数据治理中，“数据标准化”不包括？', '数据格式统一', '数据编码统一', '数据单位统一', '数据价值统一', 'D', NULL),
(@pack_id, 41, '中国《数据安全法》对“重要数据”的处理者提出了哪些义务？', '数据安全负责人和管理机构', '定期风险评估', '重要数据出境安全评估', '以上都是', 'D', NULL),
(@pack_id, 42, '数据治理专家在数据销毁环节，应采用什么方法确保不可恢复？', '简单删除', '格式化硬盘', '物理销毁或多次覆写', '重命名文件', 'C', NULL),
(@pack_id, 43, '数据治理中的“数据地图”通常用来？', '可视化数据分布', '展示数据血缘', '辅助影响分析', '以上都是', 'D', NULL),
(@pack_id, 44, '以下哪个不属于数据治理的收益？', '提高数据质量', '降低合规风险', '提升决策效率', '必然增加业务收入', 'D', NULL),
(@pack_id, 45, '数据治理专家应建议企业建立的“数据伦理”原则包括？', '尊重个人自主权', '防止歧视', '透明可解释', '以上都是', 'D', NULL),
(@pack_id, 46, '数据治理中，“主数据管理”（MDM）关注的是？', '所有数据', '核心业务实体（客户、产品、供应商）的统一视图', '日志数据', '临时数据', 'B', NULL),
(@pack_id, 47, '数据治理专家在审核数据共享协议时，应确保包含什么条款？', '数据用途限制', '数据安全保护义务', '数据销毁条款', '以上都是', 'D', NULL),
(@pack_id, 48, '数据治理中的“数据质量度量”指标包括？', '完整性百分比', '准确性错误率', '及时性延迟', '以上都是', 'D', NULL),
(@pack_id, 49, '数据治理专家在实施数据分类分级后，下一步应做什么？', '无需后续', '根据分级结果制定差异化的安全策略和访问控制', '公开所有分类结果', '降低高等级数据保护', 'B', NULL),
(@pack_id, 50, '作为数据治理专家，最重要的能力是？', '精通SQL', '兼具法律合规知识、数据管理技术和业务理解', '擅长编程', '拥有数据库证书', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业48：法学×数据科学 → 隐私保护工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_ds:2', 48, '隐私保护工程师', 'major_law', 'major_ds', '法学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '隐私保护工程师的核心工作是？', '提高系统性能', '设计、实现和维护系统隐私保护功能，确保数据处理合规', '数据可视化', '数据库管理', 'B', NULL),
(@pack_id, 2, '以下哪个是“差分隐私”（Differential Privacy）的核心思想？', '加密数据', '在查询结果中添加噪声，使得无法判断某个个体是否在数据集中', '匿名化数据', '限制数据访问', 'B', NULL),
(@pack_id, 3, 'GDPR中，“Privacy by Design”和“Privacy by Default”分别指什么？', '默认隐私和设计隐私', '设计阶段嵌入隐私保护，默认设置最严格的隐私选项', '隐私优先和隐私最终', '隐私审计和隐私报告', 'B', NULL),
(@pack_id, 4, '以下哪个技术用于实现“匿名化”且难以被重识别？', '哈希', '加密', 'K-匿名化', '掩码', 'C', NULL),
(@pack_id, 5, '在数据库查询中，为了防止SQL注入泄露隐私，应使用什么技术？', '动态SQL', '参数化查询', '存储过程（不充分）', '连接字符串加密', 'B', NULL),
(@pack_id, 6, '隐私保护工程师在设计用户数据删除功能时，应确保满足什么法律要求？', '用户可随时删除', '删除后不可恢复', '通知相关第三方删除', '以上都是（依据PIPL/GDPR）', 'D', NULL),
(@pack_id, 7, '以下哪个不是隐私增强技术（PET）？', '同态加密', '安全多方计算', '零知识证明', '数据压缩', 'D', NULL),
(@pack_id, 8, '在移动App中，隐私保护工程师应建议采用什么权限请求方式？', '一次性请求所有权限', '按需请求，并在使用时请求', '默认授予所有权限', '不请求任何权限', 'B', NULL),
(@pack_id, 9, '“数据最小化”原则在技术上的实现要求？', '只收集业务必需的数据字段', '仅保留必要的数据存储时间', '限制数据访问范围', '以上都是', 'D', NULL),
(@pack_id, 10, '以下哪个是用于实现“同态加密”的主要挑战？', '计算开销大', '密钥管理复杂', '支持的运算有限', '以上都是', 'D', NULL),
(@pack_id, 11, '隐私保护工程师处理“跨境数据传输”时，技术上可采取什么措施？', '端到端加密', '数据脱敏后再传输', '使用标准合同条款（法律措施）', '以上都是', 'D', NULL),
(@pack_id, 12, '以下哪个是“联邦学习”的主要隐私优势？', '数据集中训练', '数据不出本地，只交换模型参数', '加密所有数据', '无需加密', 'B', NULL),
(@pack_id, 13, '用户画像技术中，为避免直接识别个人，应如何操作？', '使用唯一标识符', '使用假名化标识符，并与真实身份隔离', '不使用任何标识', '加密用户ID', 'B', NULL),
(@pack_id, 14, '隐私保护工程师在设计系统时，应嵌入“同意管理”机制，该机制需要记录什么？', '用户同意的时间', '同意的具体内容', '用户撤销同意的记录', '以上都是', 'D', NULL),
(@pack_id, 15, '以下哪个是“k-匿名化”的局限性？', '难以选择k值', '可能遭受同质攻击（Homogeneity attack）', '计算复杂', '无法处理数值数据', 'B', NULL),
(@pack_id, 16, '隐私保护工程师在处理生物识别信息时，应采取什么特殊措施？', '与普通信息同样处理', '单独加密存储，且不得用于识别以外的目的', '可随意使用', '必须公开', 'B', NULL),
(@pack_id, 17, '在Web开发中，为了防止用户行为被第三方跨站追踪，应设置什么Cookie属性？', 'Secure', 'HttpOnly', 'SameSite', 'Domain', 'C', NULL),
(@pack_id, 18, '隐私保护工程师应建议企业建立“数据泄露应急响应机制”，包括？', '检测和遏制', '通知监管机构和受影响用户', '调查原因', '以上都是', 'D', NULL),
(@pack_id, 19, '以下哪个是“零知识证明”在隐私保护中的应用？', '证明用户年龄大于18岁，但不透露具体生日', '加密所有数据', '匿名化数据库', '数据压缩', 'A', NULL),
(@pack_id, 20, '隐私保护工程师在日志记录中，应避免记录什么？', '访问时间', '敏感信息（如密码、身份证号）', 'IP地址（可能需要匿名化）', '操作类型', 'B', NULL),
(@pack_id, 21, '对于手机设备标识符（如IMEI），隐私保护工程师应如何处理？', '直接使用', '使用可变标识符（如IDFV）或限制使用', '公开分享', '无需处理', 'B', NULL),
(@pack_id, 22, '以下哪个是“安全多方计算”（MPC）的典型场景？', '一家公司计算自己的平均数', '多家机构联合计算统计结果，而不泄露各自数据', '个人加密自己的文件', '云计算存储', 'B', NULL),
(@pack_id, 23, '隐私保护工程师在设计“隐私政策”展示时，应确保什么？', '易于访问', '清晰易懂', '包含必要的信息', '以上都是', 'D', NULL),
(@pack_id, 24, '对数据进行“假名化”（Pseudonymization）处理后，原始数据的映射表应如何保护？', '与假名数据一起存储', '单独存储，严格访问控制', '公开', '删除', 'B', NULL),
(@pack_id, 25, '以下哪个是“数据最小化”在API设计中的体现？', '返回所有字段', '仅返回前端或调用方必要的字段', '返回加密字段', '返回冗余数据', 'B', NULL),
(@pack_id, 26, '隐私保护工程师应定期进行什么测试来验证隐私保护措施有效性？', '性能测试', '隐私影响评估和渗透测试', '单元测试', '兼容性测试', 'B', NULL),
(@pack_id, 27, '在云环境中，隐私保护工程师应采取什么措施保护租户数据？', '依赖云厂商', '数据加密、访问控制、租户隔离', '公开数据', '不使用云', 'B', NULL),
(@pack_id, 28, '以下哪个是“差分隐私”中ε（epsilon）参数的含义？', '噪声大小（ε越小，隐私保护越强，数据效用越低）', '数据量', '查询次数', '误差容忍度', 'A', NULL),
(@pack_id, 29, '隐私保护工程师在处理儿童数据时，技术上应实现什么？', '年龄验证机制', '获得监护人同意的流程', '限制数据收集范围', '以上都是', 'D', NULL),
(@pack_id, 30, '对于需要长期存储的用户数据，隐私保护工程师应建议什么？', '永久存储', '设定保留期限，到期自动删除或匿名化', '手动删除', '不删除', 'B', NULL),
(@pack_id, 31, '以下哪个是“隐私预算”（Privacy Budget）的概念来源？', '加密技术', '差分隐私', '匿名化', '假名化', 'B', NULL),
(@pack_id, 32, '隐私保护工程师在开发SDK时，应如何告知宿主App其数据收集行为？', '无需告知', '提供清晰的隐私清单和合规文档', '隐藏收集', '只口头说明', 'B', NULL),
(@pack_id, 33, '以下哪个是“不经意传输”（Oblivious Transfer）的应用？', '在线支付', '隐私保护的数据库查询', '数字签名', '加密邮件', 'B', NULL),
(@pack_id, 34, '对于用户行使“删除权”（被遗忘权），隐私保护工程师需要确保从哪些地方删除？', '主数据库', '备份', '日志', '以上所有', 'D', NULL),
(@pack_id, 35, '隐私保护工程师在设计身份验证系统时，应避免存储什么？', '用户名', '明文密码', '密码哈希', '盐值', 'B', NULL),
(@pack_id, 36, '以下哪个是“数据可携权”的技术实现方式？', '提供数据下载接口', '数据格式标准化（如JSON、CSV）', '支持数据直接传输给另一服务商', '以上都是', 'D', NULL),
(@pack_id, 37, '隐私保护工程师应建议企业使用什么技术防止内部人员滥用数据？', '数据加密存储', '访问审计日志', '动态脱敏', '以上都是', 'D', NULL),
(@pack_id, 38, '以下哪个是“本地差分隐私”的特点？', '在服务器端添加噪声', '在用户端添加噪声后再上传', '不添加噪声', '仅在查询时添加噪声', 'B', NULL),
(@pack_id, 39, '隐私保护工程师在测试环境使用生产数据时，应如何处理？', '直接使用', '脱敏或使用合成数据', '加密', '无需处理', 'B', NULL),
(@pack_id, 40, '对于数据共享给第三方，隐私保护工程师应确保什么技术措施？', '数据最小化', '数据使用协议约束（非技术）', '技术限制（如API限频、禁止下载）', '以上都是', 'D', NULL),
(@pack_id, 41, '以下哪个是“合成数据”在隐私保护中的优势？', '无个人真实数据，降低泄露风险', '可保留统计特征', '可用于测试', '以上都是', 'D', NULL),
(@pack_id, 42, '隐私保护工程师在实现用户ID体系时，应避免使用什么作为唯一标识？', '随机UUID', '身份证号', '加密的邮箱', '哈希的手机号', 'B', NULL),
(@pack_id, 43, '对于自动化决策系统，隐私保护工程师应提供什么功能？', '解释决策逻辑', '用户可拒绝自动化决策', '人工复核机制', '以上都是', 'D', NULL),
(@pack_id, 44, '隐私保护工程师在代码审查时，应重点关注什么？', '代码格式', '是否硬编码了密钥、日志是否打印敏感信息', '性能', '注释', 'B', NULL),
(@pack_id, 45, '以下哪个是“可信执行环境”（TEE）的隐私保护作用？', '隔离计算，防止操作系统和外部访问敏感数据', '加密数据', '匿名化数据', '压缩数据', 'A', NULL),
(@pack_id, 46, '隐私保护工程师应推动企业建立“数据保护影响评估”流程，该评估应在什么阶段进行？', '数据处理活动开始后', '在设计和计划阶段', '发生数据泄露后', '每年一次', 'B', NULL),
(@pack_id, 47, '以下哪个是“隐私保护”与“数据安全”的主要区别？', '隐私保护侧重于合规和个人权利，数据安全侧重于技术防护', '两者完全相同', '数据安全是隐私保护的一部分', '隐私保护是数据安全的一部分', 'A', NULL),
(@pack_id, 48, '隐私保护工程师在实施“隐私仪表板”时，应提供哪些功能给用户？', '查看被收集的数据', '下载数据副本', '更正数据', '以上都是', 'D', NULL),
(@pack_id, 49, '对于“个性化推荐”场景，隐私保护工程师应提供什么选项？', '关闭个性化推荐', '删除历史数据', '不针对个人特征推荐', '以上都是（依据PIPL）', 'D', NULL),
(@pack_id, 50, '作为隐私保护工程师，最重要的能力是？', '精通加密算法', '将隐私法规要求转化为可落地的技术方案', '数据库管理', '前端开发', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业49：法学×英语 → 涉外法务
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_english:0', 49, '涉外法务', 'major_law', 'major_english', '法学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '涉外法务工作中，最常接触的国际商法渊源不包括？', '国际条约', '国际商事惯例', '国内涉外法律', '国内刑法', 'D', NULL),
(@pack_id, 2, '国际贸易术语解释通则（Incoterms）的主要作用是？', '规定货物质量', '明确风险、成本和责任划分', '确定关税税率', '解决支付方式', 'B', NULL),
(@pack_id, 3, 'FOB（Free on Board）术语下，货物风险转移的节点是？', '卖方工厂', '货物装船时', '目的港卸货时', '买方收货时', 'B', NULL),
(@pack_id, 4, '涉外合同中，选择适用法律（Governing Law）时，应避免选择哪国法律？', '英国法', '瑞士法', '与合同无任何关联的第三国法律', '纽约法', 'C', NULL),
(@pack_id, 5, '以下哪个国际仲裁机构总部位于巴黎？', '伦敦国际仲裁院（LCIA）', '国际商会仲裁院（ICC）', '新加坡国际仲裁中心（SIAC）', '香港国际仲裁中心（HKIAC）', 'B', NULL),
(@pack_id, 6, '涉外法务在审查跨境采购合同时，应重点审查什么条款？', '价格条款', '交付条款', '质量保证条款', '以上都是', 'D', NULL),
(@pack_id, 7, '以下哪个是联合国国际货物销售合同公约（CISG）的适用条件？', '双方营业地位于不同缔约国', '双方可约定排除适用', '不适用于消费者合同', '以上都是', 'D', NULL),
(@pack_id, 8, '涉外法务处理“出口管制”合规时，应关注哪个美国法规？', 'FCPA', 'EAR（出口管理条例）', 'ITAR', 'OFAC', 'B', NULL),
(@pack_id, 9, '跨境并购中，“反向分手费”通常由哪一方支付？', '买方（若收购未获监管批准）', '卖方（若交易失败）', '双方各一半', '政府', 'A', NULL),
(@pack_id, 10, '涉外法务在起草英文合同时，“shall”和“will”的正确使用是？', '两者可互换', '“shall”表示义务，“will”表示未来事实', '“shall”表示未来', '“will”表示义务', 'B', NULL),
(@pack_id, 11, '以下哪个英文短语表示“不可抗力”？', 'Force Majeure', 'Act of God', 'Hardship', 'A和B', 'D', NULL),
(@pack_id, 12, '涉外法务在审查国际销售合同时，“demurrage”指的是？', '滞期费', '速遣费', '仓储费', '运费', 'A', NULL),
(@pack_id, 13, '美国《反海外腐败法》（FCPA）禁止的行为是？', '贿赂外国政府官员', '虚假会计记录', '向国际组织官员行贿', '以上都是', 'D', NULL),
(@pack_id, 14, '涉外法务在为客户选择争议解决方式时，关于“仲裁”的说法正确的是？', '一裁终局', '裁决可在纽约公约成员国执行', '程序保密', '以上都是', 'D', NULL),
(@pack_id, 15, '以下哪个国际公约主要解决外国仲裁裁决的承认与执行？', '海牙公约', '纽约公约', '维也纳公约', '日内瓦公约', 'B', NULL),
(@pack_id, 16, '涉外法务审核“代理分销合同”时，应关注的反垄断风险是？', '转售价格维持', '独家销售限制', '地域限制', '以上都是', 'D', NULL),
(@pack_id, 17, '以下哪个英文术语表示“陈述与保证”？', 'Representations and Warranties', 'Conditions and Covenants', 'Indemnification', 'Escrow', 'A', NULL),
(@pack_id, 18, '跨境贸易支付方式中，风险最低（对出口商）的方式是？', '托收', '赊销', '信用证（L/C）', '汇款', 'C', NULL),
(@pack_id, 19, '涉外法务处理“国际技术转让”时，应审查当地法律对什么的要求？', '技术进口审批', '限制性条款禁止（如搭售、回授）', '税负代扣代缴', '以上都是', 'D', NULL),
(@pack_id, 20, '以下哪个英文缩写表示“自由贸易协定”？', 'FTA', 'FTO', 'ETA', 'FDI', 'A', NULL),
(@pack_id, 21, '涉外法务在审查跨国劳务派遣合同时，应关注什么？', '工作签证', '当地劳动法适用', '税务责任', '以上都是', 'D', NULL),
(@pack_id, 22, '“制裁合规”通常需要筛查哪个政府发布的制裁名单？', 'OFAC（美国）', '欧盟制裁名单', '联合国制裁名单', '以上都是', 'D', NULL),
(@pack_id, 23, '涉外法务在处理境外诉讼时，应如何选择当地律师？', '通过国际律所网络推荐', '查看当地律师排名', '评估经验和报价', '以上都是', 'D', NULL),
(@pack_id, 24, '以下哪个英文术语表示“赔偿条款”？', 'Indemnification', 'Limitation of Liability', 'Force Majeure', 'Severability', 'A', NULL),
(@pack_id, 25, '国际商务谈判中，关于“管辖法院”的选择，涉外法务应优先建议？', '原告所在地法院', '中立地的法院或仲裁', '被告所在地法院', '合同签订地法院', 'B', NULL),
(@pack_id, 26, '以下哪个是“国际商事仲裁”的优势？', '专业性', '灵活性', '跨国可执行性', '以上都是', 'D', NULL),
(@pack_id, 27, '涉外法务在审阅英文合同时，“best efforts” 与 “reasonable efforts” 的区别是？', '前者义务更高', '后者义务更高', '两者相同', '无法律意义', 'A', NULL),
(@pack_id, 28, '以下哪个术语表示“背景知识产权”？', 'Foreground IP', 'Background IP', 'Sideground IP', 'Third-party IP', 'B', NULL),
(@pack_id, 29, '欧盟GDPR对数据跨境传输的限制，涉外法务应建议采用什么合法机制？', '标准合同条款（SCC）', '约束性公司规则（BCR）', '充分性认定', '以上都是', 'D', NULL),
(@pack_id, 30, '涉外法务在处理“境外直接投资”（ODI）时，需要完成中国哪个部门的备案或核准？', '商务部', '发改委', '外汇管理局', '以上都是', 'D', NULL),
(@pack_id, 31, '以下哪个英文缩写表示“反垄断审查”？', 'CFIUS', 'HSR（美国）', 'FTA', 'ITC', 'B', NULL),
(@pack_id, 32, '涉外法务在准备合同英文版本时，应确保中英文版本发生冲突时，以哪个版本为准？', '中文版本', '英文版本', '合同明确约定优先版本', '签署地语言', 'C', NULL),
(@pack_id, 33, '“信用证”项下，“软条款”通常对谁不利？', '开证行', '受益人（出口商）', '申请人（进口商）', '通知行', 'B', NULL),
(@pack_id, 34, '涉外法务在审查“许可协议”时，“field of use”限制是指？', '地域限制', '应用领域限制', '时间限制', '价格限制', 'B', NULL),
(@pack_id, 35, '以下哪个是“世界知识产权组织”（WIPO）管理的国际条约？', '巴黎公约', '伯尔尼公约', '专利合作条约（PCT）', '以上都是', 'D', NULL),
(@pack_id, 36, '涉外法务应建议客户在国际合同中使用什么语言作为官方语言？', '中文', '英文', '根据双方谈判地位，通常为英文', '第三国语言', 'C', NULL),
(@pack_id, 37, '“ICSID”是解决什么争议的机构？', '国际投资争端', '国际贸易争端', '海事争议', '知识产权争议', 'A', NULL),
(@pack_id, 38, '涉外法务处理“税务”问题时，常提到的“税收协定”主要作用是？', '提高税率', '避免双重征税', '增加税种', '限制贸易', 'B', NULL),
(@pack_id, 39, '以下哪个英文术语表示“提前终止”？', 'Renewal', 'Termination for convenience', 'Extension', 'Amendment', 'B', NULL),
(@pack_id, 40, '涉外法务在审核“股东协议”时，“drag-along right”是指？', '强制随售权', '优先购买权', '领售权', 'A和C', 'D', NULL),
(@pack_id, 41, '以下哪个是“国际货物运输”中的“提单”的主要功能？', '货物收据', '运输合同证明', '物权凭证', '以上都是', 'D', NULL),
(@pack_id, 42, '涉外法务在应对美国“长臂管辖”时，应首先分析什么？', '连接点（是否有美国元素）', '制裁范围', '许可豁免可能性', '以上都是', 'D', NULL),
(@pack_id, 43, '以下哪个英文表达表示“保证”或“担保”？', 'Guarantee', 'Suretyship', 'Letter of comfort', '以上都是', 'D', NULL),
(@pack_id, 44, '涉外法务在为客户做法律风险分析时，应参考的当地法律资源包括？', '当地律协网站', '政府官网发布的法律', '国际律所出版物', '以上都是', 'D', NULL),
(@pack_id, 45, '“跨境破产”领域，UNCITRAL发布的示范法主要解决什么问题？', '破产清算顺序', '跨境破产合作与承认', '债务人保护', '债权人权利', 'B', NULL),
(@pack_id, 46, '涉外法务处理“出口信用保险”时，应协助客户理解什么？', '保险范围（政治险、商业险）', '除外责任', '索赔流程', '以上都是', 'D', NULL),
(@pack_id, 47, '以下哪个是国际工程项目中常见的合同范本？', 'FIDIC', 'NEC', 'JCT', '以上都是', 'D', NULL),
(@pack_id, 48, '涉外法务在审查“联合体协议”（Consortium Agreement）时，应明确什么？', '牵头方权限', '责任承担方式（连带或按份）', '利润分配', '以上都是', 'D', NULL),
(@pack_id, 49, '“举证责任”在国际商事仲裁中一般遵循什么原则？', '谁主张谁举证', '仲裁庭指定', '被告举证', '无举证责任', 'A', NULL),
(@pack_id, 50, '作为涉外法务，最重要的能力是？', '流利的英语（口语+法律写作）', '精通国际商法和主要国家法律体系', '跨文化沟通与谈判能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业50：法学×英语 → 法律翻译
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_english:1', 50, '法律翻译', 'major_law', 'major_english', '法学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '法律翻译中，“plaintiff”与“defendant”的标准译法是？', '原告、被告', '上诉人、被上诉人', '申请人、被申请人', '起诉人、答辩人', 'A', NULL),
(@pack_id, 2, '“Force Majeure”在法律英语中的标准中文翻译是？', '不可抗力', '意外事件', '情势变更', '免责事由', 'A', NULL),
(@pack_id, 3, '将中文“一审判决”翻译为英文，最准确的是？', 'First instance judgment', 'Judgment of first instance', 'First trial decision', 'Primary judgment', 'B', NULL),
(@pack_id, 4, '“Due diligence”在法律语境中通常译为？', '尽职调查', '合理注意', '审慎义务', '适当勤勉', 'A', NULL),
(@pack_id, 5, '以下哪个英文术语对应“仲裁裁决”？', 'Arbitration award', 'Arbitration decision', 'Arbitration judgment', 'Arbitration ruling', 'A', NULL),
(@pack_id, 6, '“Consideration”在合同法中的意思是？', '考虑', '对价', '报酬', '赔偿', 'B', NULL),
(@pack_id, 7, '将英文“breach of contract”翻译为中文，最常用的是？', '违约', '违反合同', '合同破裂', '不履行合同', 'A', NULL),
(@pack_id, 8, '“Tort”的法律含义是？', '合同', '犯罪', '侵权', '不当得利', 'C', NULL),
(@pack_id, 9, '以下哪个是“上诉”的正确英文表达？', 'Appeal', 'Petition', 'Claim', 'Litigation', 'A', NULL),
(@pack_id, 10, '将中文“管辖权”翻译成英文，正确的是？', 'Jurisdiction', 'Competence', 'Authority', 'Venue', 'A', NULL),
(@pack_id, 11, '“Subpoena”是指？', '传票', '起诉书', '判决书', '答辩状', 'A', NULL),
(@pack_id, 12, '法律翻译中，“hold harmless”通常译为？', '保持无害', '免责/补偿', '安全持有', '保护免损', 'B', NULL),
(@pack_id, 13, '“Perjury”的中文是？', '伪证罪', '藐视法庭', '妨碍司法', '虚假陈述', 'A', NULL),
(@pack_id, 14, '将英文“statute of limitations”翻译为中文，正确的是？', '限制法规', '诉讼时效', '法律限制', '法规失效', 'B', NULL),
(@pack_id, 15, '“Liquidated damages”与“penalty”在法律翻译中的区别是？', '前者是违约金，后者是罚款', '前者是实际损失，后者是惩罚性', '两者相同', '前者是定金，后者是赔偿', 'A', NULL),
(@pack_id, 16, '以下哪个是“宣誓书”的英文？', 'Affidavit', 'Deposition', 'Testimony', 'Sworn statement', 'A', NULL),
(@pack_id, 17, '“Notary public”的正确翻译是？', '公证人', '律师', '法官', '书记员', 'A', NULL),
(@pack_id, 18, '将中文“强制执行”翻译为英文，最准确的是？', 'Enforcement', 'Compulsory execution', 'Execution', 'B或C，根据语境', 'B', NULL),
(@pack_id, 19, '“Miranda rights”指的是？', '米兰达权利（沉默权）', '知情权', '辩护权', '上诉权', 'A', NULL),
(@pack_id, 20, '法律翻译中，“without prejudice”的含义是？', '无偏见', '不损害权益（通常用于和解谈判）', '无预判', '不构成先例', 'B', NULL),
(@pack_id, 21, '“Cross-examination”的中文是？', '直接询问', '交叉询问', '询问证人', '质证', 'B', NULL),
(@pack_id, 22, '以下哪个表示“宣判”？', 'Sentence', 'Verdict', 'Judgment', '以上都是', 'D', NULL),
(@pack_id, 23, '“Pro bono”在法律服务中指的是？', '收费服务', '公益法律服务', '优先服务', '预约服务', 'B', NULL),
(@pack_id, 24, '将中文“和解协议”翻译为英文，正确的是？', 'Settlement agreement', 'Conciliation agreement', 'Mediation agreement', 'A或B，视程序而定', 'A', NULL),
(@pack_id, 25, '“Habeas corpus”是指？', '人身保护令', '令状', '禁令', '强制令', 'A', NULL),
(@pack_id, 26, '法律翻译中，“venue”指的是？', '审理地点', '管辖权', '开庭地点', 'A或C', 'A', NULL),
(@pack_id, 27, '“Stare decisis”的意思是？', '遵循先例', '法律解释', '案件驳回', '法庭命令', 'A', NULL),
(@pack_id, 28, '将英文“royalty”翻译为法律/商务文本中的常用词是？', '版税', '特许权使用费', '提成', '以上都是', 'D', NULL),
(@pack_id, 29, '“Indemnity”条款通常翻译为？', '赔偿', '补偿', '免责', 'A和B', 'A', NULL),
(@pack_id, 30, '以下哪个是“预备听证会”的英文？', 'Preliminary hearing', 'Pre-trial conference', 'Arraignment', 'A和B', 'A', NULL),
(@pack_id, 31, '“Punitive damages”的中文是？', '惩罚性赔偿', '补偿性赔偿', '名义赔偿', '实际损失', 'A', NULL),
(@pack_id, 32, '将中文“本票”翻译为英文，正确的是？', 'Promissory note', 'Bank draft', 'Check', 'Bill of exchange', 'A', NULL),
(@pack_id, 33, '“Legal person”是指？', '法人', '自然人', '律师', '当事人', 'A', NULL),
(@pack_id, 34, '“Under seal”在英文合同中的含义是？', '加盖印章', '密封', '签章', '保密', 'A', NULL),
(@pack_id, 35, '法律翻译中，“recitals”指的是合同中的？', '鉴于条款', '定义条款', '承诺条款', '结尾条款', 'A', NULL),
(@pack_id, 36, '“Novation”的法律意思是？', '更新（债务转移）', '变更', '解除', '转让', 'A', NULL),
(@pack_id, 37, '将中文“留置权”翻译为英文，正确的是？', 'Lien', 'Pledge', 'Mortgage', 'Charge', 'A', NULL),
(@pack_id, 38, '“Rescind”与“terminate”在合同中的区别是？', '前者溯及既往，后者面向未来', '两者相同', '前者是终止，后者是废除', '前者是取消，后者是解除', 'A', NULL),
(@pack_id, 39, '以下哪个是“法庭记录”的英文？', 'Transcript', 'Minutes', 'Record', '以上都是', 'D', NULL),
(@pack_id, 40, '“Prosecutor”是指？', '检察官', '原告律师', '公诉人', 'A和C', 'D', NULL),
(@pack_id, 41, '将英文“estoppel”翻译为中文，最佳是？', '禁止反言', '禁反言', '不容否认', '以上都是', 'D', NULL),
(@pack_id, 42, '“Solicitor”和“barrister”的区别在于？', '前者是事务律师，后者是出庭律师（英联邦体系）', '两者相同', '前者是公司律师', '后者是政府律师', 'A', NULL),
(@pack_id, 43, '法律翻译中，“waiver”通常译为？', '放弃', '豁免', '弃权', '以上都是', 'D', NULL),
(@pack_id, 44, '将中文“不可撤销的”翻译为英文，正确的是？', 'Irrevocable', 'Unrevocable', 'Non-revocable', 'Revocable', 'A', NULL),
(@pack_id, 45, '“Counterclaim”在法律诉讼中指？', '反诉', '交叉诉讼', '第三方诉讼', '上诉', 'A', NULL),
(@pack_id, 46, '“Surrogate”在法律中的意思是？', '代理人', '替代者', '遗嘱检验法官', '以上均可', 'D', NULL),
(@pack_id, 47, '以下哪个是“法律意见书”的英文？', 'Legal opinion', 'Legal advice', 'Memorandum of law', 'A和C', 'A', NULL),
(@pack_id, 48, '“Res judicata”的含义是？', '既判力', '一事不再理', '案件已决', '以上都是', 'D', NULL),
(@pack_id, 49, '法律翻译中，最重要的原则是？', '文义对等', '术语一致性', '法律体系对应', '以上都是', 'D', NULL),
(@pack_id, 50, '作为一名法律翻译，最需要的核心能力是？', '双语语言能力', '法律知识储备', '查证和研究能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业51：法学×英语 → 国际仲裁助理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_english:2', 51, '国际仲裁助理', 'major_law', 'major_english', '法学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '国际仲裁中，最常见的仲裁机构是？', 'ICC', 'LCIA', 'SIAC', '以上都是', 'D', NULL),
(@pack_id, 2, '国际仲裁助理的主要职责不包括？', '起草仲裁文书', '进行法律检索', '协助准备开庭材料', '作为首席仲裁员裁决案件', 'D', NULL),
(@pack_id, 3, '《纽约公约》的全称是？', '承认及执行外国仲裁裁决公约', '国际商事仲裁示范法', '关于解决国家与他国国民间投资争端公约', '海牙公约', 'A', NULL),
(@pack_id, 4, '国际仲裁中，当事人可以约定仲裁地（seat of arbitration），该决定影响什么？', '仲裁程序的适用法律', '仲裁裁决的国籍', '对裁决的监督法院', '以上都是', 'D', NULL),
(@pack_id, 5, '以下哪个是国际投资争端解决中心（ICSID）的适用场景？', '商业合同纠纷', '外国投资者与东道国之间的投资争端', '国家与国家之间的贸易争端', '知识产权纠纷', 'B', NULL),
(@pack_id, 6, '国际仲裁助理在准备“仲裁申请书”时，必须包含哪些内容？', '当事人信息', '仲裁请求', '事实与法律依据', '以上都是', 'D', NULL),
(@pack_id, 7, '以下哪个是国际仲裁中常用的证据规则？', 'IBA证据规则', '联邦证据规则', '中国民事诉讼法证据规定', 'A', 'A', NULL),
(@pack_id, 8, '“仲裁庭组成”环节，若一方不指定仲裁员，通常由什么机构指定？', '法院', '指定机构（如仲裁院）', '对方当事人', '仲裁庭首席', 'B', NULL),
(@pack_id, 9, '国际仲裁助理需要熟悉的《国际商事仲裁示范法》是由哪个机构制定的？', '国际商会', '联合国国际贸易法委员会（UNCITRAL）', '世界贸易组织', '国际法院', 'B', NULL),
(@pack_id, 10, '在仲裁程序中，“管辖权异议”通常由谁决定？', '法院', '仲裁庭自裁管辖原则', '当事人协商', '仲裁机构', 'B', NULL),
(@pack_id, 11, '国际仲裁助理在协助律师进行“法律检索”时，应主要查找什么？', '国内法院判例', '过往类似仲裁裁决', '国际条约', '学者文章', 'B', NULL),
(@pack_id, 12, '“Redfern Schedule”是一种什么工具？', '仲裁时间表', '证据清单和异议汇总表', '庭审安排', '费用分摊表', 'B', NULL),
(@pack_id, 13, '国际仲裁中，当事人请求“临时措施”（Interim Measures）应向谁提出？', '法院', '仲裁庭', '仲裁机构', '对方当事人', 'B', NULL),
(@pack_id, 14, '以下哪个是国际仲裁的特点？', '一裁终局', '程序保密', '裁决可在多国执行', '以上都是', 'D', NULL),
(@pack_id, 15, '国际仲裁助理在准备“庭审安排”（Procedural Order No.1）时，通常需要确定什么？', '庭审时间、地点', '证据交换时间表', '书面陈述和答辩时限', '以上都是', 'D', NULL),
(@pack_id, 16, '国际仲裁中，仲裁员的公正性和独立性受到质疑时，可以提出什么？', '异议', '回避申请', '撤换申请', 'B', 'B', NULL),
(@pack_id, 17, '“Document production”在国际仲裁中通常遵循什么标准？', '全面开示', 'Redfern原则（相关且重要）', '不进行书证开示', '仅法院决定', 'B', NULL),
(@pack_id, 18, '以下哪个是英文仲裁条款的范例？', '"Any dispute arising from this contract shall be submitted to arbitration in Singapore in English in accordance with SIAC Rules."', '"The parties agree to arbitrate."', '"Disputes shall be resolved by litigation."', 'A', 'A', NULL),
(@pack_id, 19, '国际仲裁助理在仲裁裁决草稿核查中，应确认什么？', '裁决形式符合仲裁规则', '裁决有仲裁员签名', '裁决包含理由', '以上都是', 'D', NULL),
(@pack_id, 20, '以下哪个是“友好仲裁”（amiable composition）的概念？', '严格依法裁决', '基于公平善意原则裁决', '调解', '临时仲裁', 'B', NULL),
(@pack_id, 21, '国际仲裁助理需要熟悉的主要国际仲裁规则不包括？', 'ICC规则', 'LCIA规则', '中国民事诉讼法', 'UNCITRAL规则', 'C', NULL),
(@pack_id, 22, '“第三方资助”（Third-Party Funding）在国际仲裁中的披露要求是？', '无需披露', '通常需要披露以避免利益冲突', '必须经法院批准', '禁止', 'B', NULL),
(@pack_id, 23, '国际仲裁助理在计算仲裁费用时，通常考虑哪些因素？', '争议金额', '仲裁员小时费率', '机构管理费', '以上都是', 'D', NULL),
(@pack_id, 24, '对于仲裁裁决的“撤销”，通常向哪个机构提出？', '上诉仲裁庭', '仲裁地法院', '执行地法院', '国际法院', 'B', NULL),
(@pack_id, 25, '以下哪个是国际仲裁中的“适用法律”（Governing Law）通常如何确定？', '当事人约定', '仲裁地法律', '最密切联系地法律', 'A为主', 'A', NULL),
(@pack_id, 26, '国际仲裁助理在庭审期间负责什么？', '记录庭审要点', '协助管理证据', '与仲裁庭秘书沟通', '以上都是', 'D', NULL),
(@pack_id, 27, '“快速程序”（Expedited Procedure）适用于什么情况？', '争议金额较小', '当事人同意', '仲裁规则规定', '以上都是', 'D', NULL),
(@pack_id, 28, '以下哪个是UNCITRAL仲裁规则的特点？', '适用于临时仲裁', '也适用于机构仲裁', '灵活性高', '以上都是', 'D', NULL),
(@pack_id, 29, '国际仲裁助理在审查仲裁申请时，应核对是否满足什么条件？', '存在有效的仲裁协议', '仲裁请求明确', '已预缴仲裁费', '以上都是', 'D', NULL),
(@pack_id, 30, '“仲裁保密性”通常指什么？', '裁决不公开', '庭审不公开', '仲裁文件不公开', '以上都是', 'D', NULL),
(@pack_id, 31, '国际仲裁助理在协助当事人申请仲裁裁决执行时，需准备什么文件？', '裁决原件', '仲裁协议', '申请执行书', '以上都是', 'D', NULL),
(@pack_id, 32, '“仲裁庭秘书”的职责包括？', '协助仲裁员处理行政事务', '起草部分程序命令', '法律研究', '以上都是', 'D', NULL),
(@pack_id, 33, '以下哪个是国际仲裁中常用的电子庭审平台？', 'Zoom', 'Microsoft Teams', '各机构自有平台', '以上都是', 'D', NULL),
(@pack_id, 34, '国际仲裁助理在核对仲裁员披露事项时，应关注什么？', '仲裁员与律师或当事人是否存在利益关系', '仲裁员是否曾代理过相关案件', '仲裁员是否持有对方股份', '以上都是', 'D', NULL),
(@pack_id, 35, '“合并仲裁”（Consolidation）的条件通常包括？', '当事人同意', '多个仲裁涉及相同法律或事实问题', '仲裁规则允许', '以上都是', 'D', NULL),
(@pack_id, 36, '国际仲裁助理在翻译仲裁文件时，应遵循什么原则？', '忠实原文', '专业术语统一', '保留法律含义', '以上都是', 'D', NULL),
(@pack_id, 37, '以下哪个不属于国际仲裁的“程序命令”（Procedural Order）的内容？', '证据交换时间表', '庭前会议安排', '实体裁决', '专家报告提交时限', 'C', NULL),
(@pack_id, 38, '“替代性争议解决”（ADR）的方式不包括？', '仲裁', '调解', '谈判', '诉讼', 'D', NULL),
(@pack_id, 39, '国际仲裁助理在协助客户应对“反请求”时，应准备什么？', '反请求答辩书', '证据反驳', '法律依据', '以上都是', 'D', NULL),
(@pack_id, 40, '以下哪个是国际仲裁中关于“证人证言”的常见要求？', '书面证言提前交换', '庭审时接受交叉询问', '证人宣誓', '以上都是', 'D', NULL),
(@pack_id, 41, '“费用担保”（Security for costs）在国际仲裁中可向谁申请？', '仲裁庭', '法院', '仲裁机构', 'A和B', 'D', NULL),
(@pack_id, 42, '国际仲裁助理在准备“庭审笔录”时，应注意什么？', '准确记录发言', '标记证据引用', '记录异议和裁决', '以上都是', 'D', NULL),
(@pack_id, 43, '以下哪个是“临时仲裁”（Ad hoc arbitration）与“机构仲裁”的区别？', '临时仲裁无固定机构管理', '临时仲裁需当事人自行约定程序', '机构仲裁有现成规则支持', '以上都是', 'D', NULL),
(@pack_id, 44, '国际仲裁助理在协助仲裁员起草裁决书时，应避免什么？', '超出仲裁请求范围', '遗漏仲裁请求', '违反公共政策', '以上都是', 'D', NULL),
(@pack_id, 45, '“仲裁地”与“开庭地点”相同吗？', '总是相同', '可以不同', '必须不同', '无关系', 'B', NULL),
(@pack_id, 46, '以下哪个是《国际商事仲裁示范法》关于“仲裁协议”形式的要求？', '书面形式', '口头形式', '电子形式（视为书面）', 'A和C', 'D', NULL),
(@pack_id, 47, '国际仲裁助理在收到对方“证据开示请求”时，应评估什么？', '请求是否相关且重要', '是否存在特权（如律师-客户特权）', '是否过度负担', '以上都是', 'D', NULL),
(@pack_id, 48, '以下哪个是“紧急仲裁员”（Emergency Arbitrator）程序？', '在仲裁庭组成前处理紧急临时措施', '替换仲裁员', '裁决实体争议', '处理管辖权异议', 'A', NULL),
(@pack_id, 49, '国际仲裁助理需要具备的外语能力通常是？', '英语（工作语言）', '法语（部分仲裁）', '西班牙语', 'A为主要', 'A', NULL),
(@pack_id, 50, '作为国际仲裁助理，最重要的能力是？', '熟悉仲裁规则', '法律写作与研究能力', '组织协调能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业52：会计学×计算机科学 → 会计信息系统实施
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_cs:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_cs:0', 52, '会计信息系统实施', 'major_accounting', 'major_cs', '会计学×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '会计信息系统实施的第一步通常是？', '安装软件', '需求分析', '数据迁移', '用户培训', 'B', NULL),
(@pack_id, 2, '在会计信息系统实施中，“UAT”是指？', '单元测试', '用户验收测试', '系统集成测试', '安全测试', 'B', NULL),
(@pack_id, 3, '以下哪个是主流的会计信息系统软件？', '用友U8', '金蝶K/3', 'SAP FI/CO', '以上都是', 'D', NULL),
(@pack_id, 4, '会计信息系统实施顾问在“系统配置”环节，需要设置什么？', '会计科目表', '凭证类型', '辅助核算维度', '以上都是', 'D', NULL),
(@pack_id, 5, '数据迁移时，新旧系统“期初余额”对账不平，最可能的原因是？', '科目对照映射错误', '数据格式不兼容', '未考虑累计借方贷方', '以上都是', 'D', NULL),
(@pack_id, 6, '以下哪个是会计信息系统与业务系统集成的常见接口？', '银企直连', '发票查验接口', '进销存接口', '以上都是', 'D', NULL),
(@pack_id, 7, '“平行运行”是指？', '新旧系统同时运行一段时间', '旧系统停止新系统运行', '两个新系统同时运行', '测试环境与生产环境并行', 'A', NULL),
(@pack_id, 8, '在实施过程中，制定“切换策略”时，风险最小但成本最高的方式是？', '直接切换', '平行运行', '分阶段切换', '试点切换', 'B', NULL),
(@pack_id, 9, '会计信息系统实施中，“凭证自动生成”功能需要什么配置？', '设置凭证模板', '定义源单据到科目的映射', '配置会计期间', 'A和B', 'D', NULL),
(@pack_id, 10, '以下哪个不属于会计信息系统实施后的支持服务？', '用户问题解答', '系统优化', '新功能开发（通常另收费）', '服务器硬件维修', 'D', NULL),
(@pack_id, 11, '在实施SAP FI模块时，“公司代码”是哪个层级？', '集团', '独立核算单位', '利润中心', '成本中心', 'B', NULL),
(@pack_id, 12, '会计信息系统实施中，“权限管理”应遵循什么原则？', '最小权限', '职责分离（如制单与审核不同）', '定期复核', '以上都是', 'D', NULL),
(@pack_id, 13, '以下哪个是会计信息系统实施常见的失败原因？', '缺乏高层支持', '需求不明确', '数据迁移错误', '以上都是', 'D', NULL),
(@pack_id, 14, '在“财务业务一体化”实施中，如何确保业务单据自动生成凭证的准确性？', '业务端和财务端对账', '设置稽核规则', '定期抽查', '以上都是', 'D', NULL),
(@pack_id, 15, '实施团队中的“关键用户”通常来自哪一方？', '软件供应商', '客户方业务人员', '实施顾问', '外部审计', 'B', NULL),
(@pack_id, 16, '在编写“用户操作手册”时，应包含什么内容？', '操作步骤截图', '常见问题解答', '系统登录方式', '以上都是', 'D', NULL),
(@pack_id, 17, '会计信息系统实施中，关于“期末结转”功能的配置，需要测试什么？', '损益结转', '汇兑损益计算', '成本结转', '以上都是', 'D', NULL),
(@pack_id, 18, '以下哪个是会计信息系统实施的项目阶段？', '蓝图设计', '系统实现', '上线准备', '以上都是', 'D', NULL),
(@pack_id, 19, '“需求调研”中，应了解客户的什么？', '现有业务流程', '特殊核算要求', '报表需求', '以上都是', 'D', NULL),
(@pack_id, 20, '会计信息系统实施中，“二次开发”指的是什么？', '修改标准功能', '开发标准产品不支持的特定功能', '定制报表', '以上都是', 'D', NULL),
(@pack_id, 21, '对于集团型客户，会计信息系统实施需要支持什么？', '多账簿', '合并报表', '内部交易对账', '以上都是', 'D', NULL),
(@pack_id, 22, '“系统集成测试”的目的是？', '验证模块间接口是否正常', '测试端到端业务流程', '发现集成问题', '以上都是', 'D', NULL),
(@pack_id, 23, '以下哪个是会计信息系统实施顾问必须具备的硬技能？', 'SQL查询能力', '财务知识', '产品配置能力', '以上都是', 'D', NULL),
(@pack_id, 24, '在实施“应收模块”时，需要设置的业务规则包括？', '信用期管理', '账龄区间', '坏账计提比例', '以上都是', 'D', NULL),
(@pack_id, 25, '数据迁移时，若旧系统有辅助核算而新系统没有，应如何应对？', '放弃辅助核算', '通过明细科目或自定义字段实现', '手动补录', '拒绝迁移', 'B', NULL),
(@pack_id, 26, '“上线切换”时，必须确保什么？', '旧系统停止录入新数据', '所有未结业务已处理或迁移', '用户有应急方案', '以上都是', 'D', NULL),
(@pack_id, 27, '会计信息系统实施顾问在“蓝图设计”阶段的主要产出是？', '业务蓝图文档', '需求规格说明书', '测试用例', '用户手册', 'A', NULL),
(@pack_id, 28, '对于“现金流量表”的自动生成，需要在系统中做什么配置？', '设置现金流量项目对照关系', '指定凭证分录的现金流类别', '定义现金流量的取数逻辑', '以上都是', 'D', NULL),
(@pack_id, 29, '实施“资产模块”时，需要定义什么？', '资产分类', '折旧方法', '折旧年限', '以上都是', 'D', NULL),
(@pack_id, 30, '以下哪个是会计信息系统实施中的“风险点”？', '数据迁移质量', '用户抵触情绪', '关键人员流失', '以上都是', 'D', NULL),
(@pack_id, 31, '在实施“采购到付款”流程时，需要设置什么？', '采购订单与入库单的匹配', '发票校验', '付款审批', '以上都是', 'D', NULL),
(@pack_id, 32, '会计信息系统实施顾问应如何应对客户提出的“个性化需求”？', '全部拒绝', '分析是否属于共性需求，评估开发成本，引导客户使用标准功能', '无条件开发', '推迟处理', 'B', NULL),
(@pack_id, 33, '“项目验收”的依据是什么？', '合同要求', '验收测试通过', '用户培训完成', '以上都是', 'D', NULL),
(@pack_id, 34, '以下哪个是会计信息系统实施中常用的项目管理工具？', 'Microsoft Project', 'Jira', 'Excel', '以上都是', 'D', NULL),
(@pack_id, 35, '对于“多币种”业务，会计信息系统实施需要配置什么？', '汇率表', '汇兑损益处理方法', '外币科目设置', '以上都是', 'D', NULL),
(@pack_id, 36, '“用户培训”的内容应包括？', '系统操作', '常见问题处理', '系统限制及应对', '以上都是', 'D', NULL),
(@pack_id, 37, '以下哪个是会计信息系统实施顾问的沟通对象？', '财务总监', 'IT部门', '各部门业务用户', '以上都是', 'D', NULL),
(@pack_id, 38, '在实施“银企直连”时，需要与银行什么接口对接？', '企业网银接口', '银企直连协议', '银行前置机', '以上都是', 'D', NULL),
(@pack_id, 39, '会计信息系统实施后，应该建立什么样的支持体系？', '内部支持团队', '供应商服务热线', '在线知识库', '以上都是', 'D', NULL),
(@pack_id, 40, '“数据校验”在迁移前后应进行几次？', '一次', '至少两次（迁移前核对，迁移后验证）', '不需要', '三次以上', 'B', NULL),
(@pack_id, 41, '以下哪个是会计信息系统实施中用于“数据清洗”的常见操作？', '处理重复数据', '补全必填字段', '统一编码规则', '以上都是', 'D', NULL),
(@pack_id, 42, '在实施“固定资产”模块时，如果旧系统折旧方法与新系统不一致，如何处理？', '沿用旧方法', '按新方法重新计算，但需考虑差异调整', '手动录入差额', '忽略', 'B', NULL),
(@pack_id, 43, '“系统性能测试”主要关注什么？', '并发用户数', '响应时间', '数据吞吐量', '以上都是', 'D', NULL),
(@pack_id, 44, '实施团队中的“项目经理”需要具备什么能力？', '计划与协调', '风险管理', '客户关系管理', '以上都是', 'D', NULL),
(@pack_id, 45, '以下哪个是会计信息系统实施项目成功的关键？', '明确的范围和需求', '充分测试', '高层支持和用户参与', '以上都是', 'D', NULL),
(@pack_id, 46, '在实施“合并报表”模块时，需要定义什么？', '合并范围', '抵销规则', '权益法调整规则', '以上都是', 'D', NULL),
(@pack_id, 47, '“系统切换”时，如果新旧系统会计期间不一致，应如何处理？', '暂停业务', '调整旧系统期末数据到新系统期初', '分两期并行', '无法实施', 'B', NULL),
(@pack_id, 48, '会计信息系统实施顾问的职业发展路径通常是？', '初级顾问->高级顾问->项目经理->咨询总监', '转行做财务', '转行做销售', '继续做技术', 'A', NULL),
(@pack_id, 49, '以下哪个是会计信息系统实施中常见的“变更请求”？', '增加新报表', '修改流程', '新增接口', '以上都是', 'D', NULL),
(@pack_id, 50, '作为会计信息系统实施顾问，最重要的能力是？', '财务与计算机交叉知识', '沟通与解决问题的能力', '项目管理能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业53：会计学×计算机科学 → 财务数据分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_cs:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_cs:1', 53, '财务数据分析师', 'major_accounting', 'major_cs', '会计学×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '财务数据分析师最常用的数据查询语言是？', 'Python', 'SQL', 'Java', 'R', 'B', NULL),
(@pack_id, 2, '在Excel中，用于根据条件求和与计数的函数分别是？', 'SUMIF, COUNTIF', 'SUMIFS, COUNTIFS', 'VLOOKUP, HLOOKUP', 'A和B', 'D', NULL),
(@pack_id, 3, '以下哪个Python库最适合进行数据清洗和表格处理？', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'B', NULL),
(@pack_id, 4, '分析销售数据时，需要找出销售额前10%的产品，应使用什么函数？', 'RANK', 'PERCENTILE', 'TOP 10 PERCENT（SQL）或 nlargest（Python）', 'MAX', 'C', NULL),
(@pack_id, 5, '“同比”是指与什么时期比较？', '上一期', '去年同期', '预算期', '基期', 'B', NULL),
(@pack_id, 6, '财务数据分析师在制作“应收账款账龄分析”时，需要用到什么分组？', '按客户分组', '按账龄区间分组', '按销售代表分组', 'A和B', 'D', NULL),
(@pack_id, 7, '以下哪个是衡量数据集中趋势的指标？', '标准差', '方差', '中位数', '极差', 'C', NULL),
(@pack_id, 8, '在Power BI或Tableau中，用于生成动态交互仪表板的工具属于？', '数据库', '数据可视化与商业智能工具', 'ETL工具', '统计分析软件', 'B', NULL),
(@pack_id, 9, '财务数据分析师需要计算“产品毛利率”，公式是？', '(售价 - 成本) / 售价', '(收入 - 成本) / 收入', '毛利 / 收入', '以上都是', 'D', NULL),
(@pack_id, 10, '以下哪个SQL操作可以去除重复行？', 'UNION', 'UNION ALL', 'DISTINCT', 'GROUP BY（配合聚合）', 'C', NULL),
(@pack_id, 11, '在Python中，使用df.groupby('部门')['费用'].sum()得到的结果是？', '各部门费用明细', '各部门费用总和', '各部门费用平均值', '各部门费用最大值', 'B', NULL),
(@pack_id, 12, '财务分析中的“杜邦分析”核心是拆解哪个指标？', '净利润率', '资产周转率', '权益乘数', '净资产收益率（ROE）', 'D', NULL),
(@pack_id, 13, '以下哪个图表最适合展示不同产品线的收入占比？', '柱状图', '饼图', '折线图', '散点图', 'B', NULL),
(@pack_id, 14, '数据可视化中，使用“热力图”通常用于展示什么？', '时间序列趋势', '二维矩阵数据的强度', '部分与整体关系', '数据分布', 'B', NULL),
(@pack_id, 15, '财务数据分析师在处理“异常值”时，常用的统计方法是？', '3-sigma原则', 'IQR（四分位距）法', '箱线图识别', '以上都是', 'D', NULL),
(@pack_id, 16, '“回归分析”在财务中常用于？', '预测销售额', '分析成本动因', '评估因素影响程度', '以上都是', 'D', NULL),
(@pack_id, 17, '在Excel中，VLOOKUP函数近似匹配时，需要查找区域按什么排序？', '字母顺序', '升序', '降序', '无需排序', 'B', NULL),
(@pack_id, 18, '以下哪个是财务数据分析师需要掌握的数据库知识？', '数据库设计范式', '索引优化', '多表连接', '以上都是', 'D', NULL),
(@pack_id, 19, '分析“客户流失率”，需要的分母是？', '期初客户数', '期末客户数', '期初客户数（通常）', '期间新增客户数', 'C', NULL),
(@pack_id, 20, '“帕累托分析”（80/20法则）在财务中的应用是？', '找出贡献80%收入的20%产品/客户', '优化成本结构', '库存ABC分类', '以上都是', 'D', NULL),
(@pack_id, 21, '在Python中使用matplotlib.pyplot绘制折线图的函数是？', 'plt.bar()', 'plt.plot()', 'plt.scatter()', 'plt.pie()', 'B', NULL),
(@pack_id, 22, '财务数据分析师进行“预算 vs 实际”差异分析时，通常使用什么图？', '瀑布图', '子弹图', '柱状对比图', '以上都是', 'D', NULL),
(@pack_id, 23, '以下哪个是“时间序列分解”的三个成分？', '趋势、季节、随机', '长期、中期、短期', '周期、波动、噪声', '上升、下降、平缓', 'A', NULL),
(@pack_id, 24, '在Power Query（Excel/ Power BI）中，合并查询相当于SQL中的什么操作？', 'UNION', 'JOIN', 'SELECT', 'GROUP BY', 'B', NULL),
(@pack_id, 25, '财务数据分析师计算“存货周转天数”的公式是？', '360 / 存货周转率', '平均存货 / 营业成本 * 360', '营业成本 / 平均存货', 'A和B', 'D', NULL),
(@pack_id, 26, '以下哪个是衡量数据离散程度的指标？', '标准差', '变异系数', '极差', '以上都是', 'D', NULL),
(@pack_id, 27, '“数据透视表”在Excel中的主要作用是？', '排序筛选', '多维度交叉汇总分析', '数据验证', '条件格式', 'B', NULL),
(@pack_id, 28, '财务数据分析师应如何向非技术人员展示分析结果？', '直接给原始数据', '用可视化图表和关键结论说明', '写技术代码', '口头描述', 'B', NULL),
(@pack_id, 29, '以下哪个SQL函数用于计算累计总和（窗口函数）？', 'SUM()', 'SUM() OVER(ORDER BY ...)', 'GROUP BY SUM()', 'ROLLUP', 'B', NULL),
(@pack_id, 30, '“相关性分析”中，相关系数接近+1表示？', '强负相关', '强正相关', '无相关', '非线性相关', 'B', NULL),
(@pack_id, 31, '财务数据分析师在处理“缺失值”时，以下哪个方法最不推荐？', '删除缺失行', '用均值/中位数填充', '用0填充而不分析', '插值法', 'C', NULL),
(@pack_id, 32, '在评估模型预测精度时，MAPE是指？', '平均绝对百分比误差', '均方根误差', '平均绝对误差', '误差平方和', 'A', NULL),
(@pack_id, 33, '以下哪个是财务数据分析师常用的Python数据可视化库？', 'Seaborn', 'Plotly', 'Matplotlib', '以上都是', 'D', NULL),
(@pack_id, 34, '使用“KPI仪表板”进行管理，其核心优势是？', '实时监控', '可视化指标趋势', '支持下钻分析', '以上都是', 'D', NULL),
(@pack_id, 35, '在SQL中，HAVING子句与WHERE的区别是？', 'WHERE在分组前过滤，HAVING在分组后过滤', 'HAVING可以包含聚合函数', 'WHERE不能包含聚合函数', '以上都是', 'D', NULL),
(@pack_id, 36, '财务数据分析师需要理解“权责发生制”和“收付实现制”，因为？', '影响收入确认时点', '影响费用匹配', '影响现金流量分析', '以上都是', 'D', NULL),
(@pack_id, 37, '以下哪个是“异常检测”的常见方法？', 'Z-score', '聚类（DBSCAN）', '孤立森林', '以上都是', 'D', NULL),
(@pack_id, 38, '在Power BI中，用于创建关系数据模型的基础是？', '表之间的关联', 'DAX公式', '数据刷新', '视觉对象', 'A', NULL),
(@pack_id, 39, '财务数据分析师在分析“费用报销”数据时，发现大量周末报销，应怀疑什么？', '员工加班多', '可能存在虚假报销', '系统错误', '公司政策允许', 'B', NULL),
(@pack_id, 40, '以下哪个是“方差分析”（ANOVA）的应用场景？', '比较两个组均值差异（t检验也可）', '比较三个及以上组均值差异', '相关分析', '回归分析', 'B', NULL),
(@pack_id, 41, '在Excel中创建“动态图表”，通常需要结合什么控件？', '数据验证下拉列表', '切片器', '单选按钮', '以上都是', 'D', NULL),
(@pack_id, 42, '财务数据分析师在进行“预测”时，常用的模型不包括？', '移动平均', '指数平滑', 'ARIMA', '随机森林（虽然可用，但基础）', 'D', NULL),
(@pack_id, 43, '对于“分类数据”（如地区、产品类型），在建立回归模型时通常需要做什么处理？', '标准化', '哑变量编码', '归一化', '特征提取', 'B', NULL),
(@pack_id, 44, '财务数据分析师应具备的思维是？', '业务敏感度', '数据严谨性', '批判性思维', '以上都是', 'D', NULL),
(@pack_id, 45, '在分析“现金流”时，使用“间接法”编制，需要从净利润调整哪些项目？', '折旧摊销', '存货变动', '应收应付变动', '以上都是', 'D', NULL),
(@pack_id, 46, '以下哪个是用于财务数据异常检测的统计量？', 'Cook\'s distance', 'Leverage value', '学生化残差', '以上都是', 'D', NULL),
(@pack_id, 47, '在SQL中，如果要查询每个客户最近一次购买日期，应使用？', 'GROUP BY + MAX', '窗口函数 ROW_NUMBER() OVER (PARTITION BY customer ORDER BY date DESC)', '子查询', '以上都是', 'D', NULL),
(@pack_id, 48, '财务数据分析师输出报表时，应确保？', '数据准确', '格式清晰', '可追溯来源', '以上都是', 'D', NULL),
(@pack_id, 49, '以下哪个是“数据治理”在财务分析中的体现？', '确保数据定义一致', '建立数据质量规则', '管理数据访问权限', '以上都是', 'D', NULL),
(@pack_id, 50, '作为财务数据分析师，最重要的能力是？', '精通分析工具', '深刻理解财务业务', '数据可视化讲故事', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业54：会计学×计算机科学 → ERP财务顾问
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_cs:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_cs:2', 54, 'ERP财务顾问', 'major_accounting', 'major_cs', '会计学×计算机科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'ERP系统中，FI模块和CO模块的主要区别是？', 'FI对外财务会计，CO对内管理会计', 'FI记录历史，CO做预算', 'FI关注报表，CO关注成本', 'A', 'A', NULL),
(@pack_id, 2, '在SAP中，用于定义公司组织结构代码的层级是？', '公司代码', '控制范围', '利润中心', 'A和B', 'D', NULL),
(@pack_id, 3, 'ERP财务顾问在进行“总账科目”配置时，需要设置什么？', '科目编码范围', '科目组（决定字段状态）', '币种', '以上都是', 'D', NULL),
(@pack_id, 4, '“凭证分割”（Document Splitting）功能主要解决什么问题？', '提高凭证录入速度', '按不同维度（如利润中心）生成平行账', '减少凭证数量', '增强安全性', 'B', NULL),
(@pack_id, 5, '在SAP FI中，“客户主数据”和“供应商主数据”分别对应什么类型的科目？', '统驭科目（应收账款、应付账款）', '银行存款科目', '损益科目', '固定资产科目', 'A', NULL),
(@pack_id, 6, '以下哪个是ERP实施中“财务模块”与“销售分销(SD)模块”的集成点？', '销售发票自动生成会计凭证', '客户信用检查', '收入确认', '以上都是', 'D', NULL),
(@pack_id, 7, 'ERP财务顾问配置“税务计算”时，需要设置什么？', '税码', '税率', '税务科目', '以上都是', 'D', NULL),
(@pack_id, 8, '“自动支付程序”（APP）在ERP中用于什么？', '自动生成收款凭证', '自动生成付款建议和付款凭证', '自动核销', '自动对账', 'B', NULL),
(@pack_id, 9, '在SAP中，“资产模块”与“总账”的集成通过什么实现？', '资产科目统驭', '折旧过账到总账', '资产购置自动生成凭证', '以上都是', 'D', NULL),
(@pack_id, 10, 'ERP财务顾问在配置“会计期间”时，需要注意什么？', '每个公司的会计年度变式', '已关闭期间不可记账', '过账期间可打开多个', '以上都是', 'D', NULL),
(@pack_id, 11, '以下哪个是“成本中心”的主要作用？', '归集费用', '内部责任考核', '预算控制', '以上都是', 'D', NULL),
(@pack_id, 12, '“内部订单”在CO模块中用于什么？', '短期事件成本归集', '项目成本控制', '间接费用分配', '以上都是', 'D', NULL),
(@pack_id, 13, '在SAP中，“获利能力分析（COPA）”的特征与值字段分别是？', '客户、产品等维度；收入、成本等度量', '利润中心；费用', '销售区域；毛利率', '公司代码；净利润', 'A', NULL),
(@pack_id, 14, 'ERP财务顾问在进行“货币”配置时，需要设置什么？', '本位币', '并行货币（集团货币等）', '汇率类型', '以上都是', 'D', NULL),
(@pack_id, 15, '以下哪个事务代码在SAP中用于显示总账科目余额？', 'FS10N', 'FBL3N', 'FAGLB03', 'A和C', 'D', NULL),
(@pack_id, 16, '“替代”和“校验”在SAP FI中用于？', '替换字段值或验证输入', '增强标准功能', '实现业务规则', '以上都是', 'D', NULL),
(@pack_id, 17, '在实施“应收模块”时，需要配置“付款条件”，包含什么？', '折扣率', '付款天数', '基准日期计算规则', '以上都是', 'D', NULL),
(@pack_id, 18, '“清账”（Clearing）在ERP中的含义是？', '删除凭证', '标记未清项为已清（如应收账款核销）', '调整余额', '导出报表', 'B', NULL),
(@pack_id, 19, '以下哪个是ERP财务顾问在“期初数据导入”时常用的工具？', 'LSMW（SAP）', '导入模板', '数据迁移工作台', '以上都是', 'D', NULL),
(@pack_id, 20, '在SAP中，“字段状态组”控制什么？', '凭证输入时哪些字段必填、可选或隐藏', '报表显示字段', '授权检查', '打印格式', 'A', NULL),
(@pack_id, 21, '“CO模块”中的“分配（Assessment）”与“分摊（Distribution）”的区别是？', '分配按发送方比例，分摊按接收方基准', '分配使用次级成本要素，分摊使用初级成本要素', '两者相同', 'A和B', 'D', NULL),
(@pack_id, 22, 'ERP财务顾问需要了解“物料账”（Material Ledger）的功能，主要是为了？', '多币种评估', '实际成本核算', '差异分析', '以上都是', 'D', NULL),
(@pack_id, 23, '“平行分类账”功能用于什么？', '同时满足多种会计准则（如CAS和IFRS）', '合并报表', '预算编制', '外币折算', 'A', NULL),
(@pack_id, 24, '在SAP中，“统驭科目”与“明细账”的关系是？', '总账中应收账款统驭科目对应客户明细账', '总账与明细账实时更新', '不能直接过账到统驭科目', '以上都是', 'D', NULL),
(@pack_id, 25, 'ERP财务顾问在配置“折旧码”时，需要定义什么？', '折旧方法（直线、双倍余额等）', '折旧起止规则', '期间控制', '以上都是', 'D', NULL),
(@pack_id, 26, '“财务关闭”的步骤通常包括？', '处理未清项', '执行外币评估', '成本中心分摊分配', '以上都是', 'D', NULL),
(@pack_id, 27, '在SAP中，“CO模块”的“期间锁”功能用于？', '关闭CO期间', '防止后续成本过账', '控制报表期间', '以上都是', 'D', NULL),
(@pack_id, 28, '以下哪个是ERP财务顾问常用的测试工具？', '单元测试', '集成测试', '用户验收测试', '以上都是', 'D', NULL),
(@pack_id, 29, '对于“多公司代码”的配置，可以实现什么？', '统一会计科目表', '跨公司代码交易', '合并报表', '以上都是', 'D', NULL),
(@pack_id, 30, '“增强”在ERP中通常指的是？', '修改标准代码', '通过用户出口或隐式增强添加功能', '开发新程序', '配置表', 'B', NULL),
(@pack_id, 31, 'ERP财务顾问在“上线支持”阶段，主要工作包括？', '解决用户操作问题', '修复数据错误', '调整配置', '以上都是', 'D', NULL),
(@pack_id, 32, '以下哪个是“预算管理”在ERP中的常用工具？', '基金中心', '承诺管理', '预算可用性控制', '以上都是', 'D', NULL),
(@pack_id, 33, '“电子银行对账单”在ERP中的处理流程是？', '导入银行文件 -> 匹配未清项 -> 生成凭证', '手动录入 -> 过账', '自动核销应收应付', '以上都是', 'A', NULL),
(@pack_id, 34, '在SAP中，“测试环境”与“生产环境”的区别是？', '测试环境可随意修改，生产环境需受控', '数据不同', '权限控制不同', '以上都是', 'D', NULL),
(@pack_id, 35, 'ERP财务顾问需要掌握的“传输请求”功能，用于？', '跨系统传输配置', '备份配置', '版本管理', '以上都是', 'A', NULL),
(@pack_id, 36, '“成本估算”（Cost Estimate）在CO-PC中用于？', '计算标准成本', '物料成本分析', '实际成本核算基础', '以上都是', 'D', NULL),
(@pack_id, 37, '在实施“资金管理”模块时，需要配置什么？', '流动性预测', '现金头寸', '支付媒介', '以上都是', 'D', NULL),
(@pack_id, 38, '以下哪个是ERP财务顾问的必备技能？', '业务流程梳理', '系统配置', '培训与文档', '以上都是', 'D', NULL),
(@pack_id, 39, '“SAP Fiori”财务应用的特点包括？', '角色化设计', '移动端支持', '实时分析', '以上都是', 'D', NULL),
(@pack_id, 40, '在实施“项目系统（PS）”模块时，与财务的集成点包括？', '项目预算', '项目实际成本', '项目结算', '以上都是', 'D', NULL),
(@pack_id, 41, '“IDoc”技术常用于什么？', '系统间电子数据交换', '打印报表', '用户认证', '数据库备份', 'A', NULL),
(@pack_id, 42, 'ERP财务顾问处理“用户权限”问题时，应遵循什么原则？', '最小权限', '职责分离', '定期审阅', '以上都是', 'D', NULL),
(@pack_id, 43, '以下哪个是“财务模块”与其他模块集成的常见问题？', '业务与财务数据不一致', '凭证生成错误', '科目确定错误', '以上都是', 'D', NULL),
(@pack_id, 44, '在SAP中，“财务结账”的日历通常在哪里维护？', 'OB29', '会计年度变式', '期间开关', '以上都是', 'A', NULL),
(@pack_id, 45, '“ERP财务顾问”与“财务用户”的主要区别是？', '顾问做配置，用户做日常操作', '顾问负责项目实施，用户负责使用', '顾问懂后台，用户懂前台', '以上都是', 'D', NULL),
(@pack_id, 46, '以下哪个是ERP项目实施方法论的常见阶段？', '准备、蓝图、实现、最终准备、上线支持', '需求、设计、开发、测试、部署', '启动、计划、执行、监控、收尾', 'A（如SAP Activate）', 'A', NULL),
(@pack_id, 47, '“利润中心”与“成本中心”的区别是？', '利润中心关注收入和利润，成本中心只归集费用', '利润中心有独立损益表', '成本中心可按部门设置', '以上都是', 'D', NULL),
(@pack_id, 48, '在实施“特殊目的总账”时，用于什么？', '满足特定报表需求', '管理特殊会计事件', '替代标准总账', '以上都是', 'A', NULL),
(@pack_id, 49, 'ERP财务顾问需要具备的软技能包括？', '沟通协调', '项目管理', '客户培训', '以上都是', 'D', NULL),
(@pack_id, 50, '作为ERP财务顾问，最重要的能力是？', '深度理解财务业务流程', '精通ERP系统配置', '解决集成问题的能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业55：会计学×金融学 → 财务分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_finance:0', 55, '财务分析师', 'major_accounting', 'major_finance', '会计学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '财务分析师最常使用的估值方法是？', 'DCF模型', '可比公司分析', '先例交易分析', '以上都是', 'D', NULL),
(@pack_id, 2, '自由现金流（FCFF）的计算公式是？', 'EBIT*(1-税率) + 折旧摊销 - 资本支出 - 营运资本增加', '净利润 + 折旧摊销 - 资本支出 - 营运资本增加', '经营活动现金流 - 资本支出', '以上都是（不同口径）', 'A', '标准FCFF'),
(@pack_id, 3, '在比率分析中，衡量公司短期偿债能力的指标是？', '资产负债率', '流动比率', '总资产周转率', '净资产收益率', 'B', NULL),
(@pack_id, 4, '财务分析师在建立财务模型时，通常使用哪个软件？', 'Python', 'Excel', 'R', 'SQL', 'B', NULL),
(@pack_id, 5, '“加权平均资本成本（WACC）”中的权益成本通常用什么模型计算？', 'CAPM', 'Gordon增长模型', '股利贴现模型', '套利定价理论', 'A', NULL),
(@pack_id, 6, '以下哪个属于“杜邦分析”的三因子？', '净利润率', '资产周转率', '权益乘数', '以上都是', 'D', NULL),
(@pack_id, 7, '某公司毛利率上升但净利率下降，可能的原因是？', '销售费用率上升', '管理费用率上升', '财务费用率上升', '以上都是', 'D', NULL),
(@pack_id, 8, '预测利润表时，“销售成本”通常按什么比例预测？', '占收入的百分比', '固定金额', '与销量线性相关', 'A或C', 'A', NULL),
(@pack_id, 9, '“营运资本”的计算公式是？', '流动资产 - 流动负债', '应收账款 + 存货 - 应付账款', '现金 + 存货 - 应付', 'A通常', 'A', NULL),
(@pack_id, 10, '在DCF模型中，终值（Terminal Value）的计算方法有？', '永续增长法', '退出倍数法', '重置成本法', 'A和B', 'D', NULL),
(@pack_id, 11, '财务分析师在进行“可比公司分析”时，需要选择什么？', '同行业公司', '相似规模', '相同业务模式', '以上都是', 'D', NULL),
(@pack_id, 12, '以下哪个是衡量公司盈利能力的指标？', '资产回报率（ROA）', '净资产回报率（ROE）', '投入资本回报率（ROIC）', '以上都是', 'D', NULL),
(@pack_id, 13, '“财务杠杆”指的是？', '使用债务融资', '利用固定成本放大收益', '权益乘数', 'A和C', 'D', NULL),
(@pack_id, 14, '在进行“敏感性分析”时，通常改变什么？', '关键假设（如增长率、折现率）', '所有输入', '输出变量', '历史数据', 'A', NULL),
(@pack_id, 15, '以下哪个是“资产负债表”中的右方（负债及所有者权益）项目？', '应收账款', '固定资产', '应付账款', '存货', 'C', NULL),
(@pack_id, 16, '财务分析师在阅读“现金流量表”时，最关注哪类活动产生的现金流？', '经营活动', '投资活动', '筹资活动', 'A，因为它是造血能力', 'D', NULL),
(@pack_id, 17, '“利息保障倍数”的计算公式是？', 'EBIT / 利息费用', 'EBITDA / 利息费用', '经营活动现金流 / 利息费用', '以上都是', 'D', NULL),
(@pack_id, 18, '在建立三张表联动模型时，最重要的勾稽关系是？', '利润表中的净利润增加未分配利润（资产负债表）', '资产负债表的变动影响现金流量表', '现金流量表的期末现金等于资产负债表现金', '以上都是', 'D', NULL),
(@pack_id, 19, '以下哪个是“企业价值（Enterprise Value）”的公式？', '股权价值 + 净债务 - 现金', '市值 + 负债 - 现金', '股权价值 + 负债 - 现金', 'A和B', 'A', NULL),
(@pack_id, 20, '“市盈率（P/E）”与“增长率（g）”的关系常用哪个指标？', 'PEG', 'PB', 'PS', 'EV/EBITDA', 'A', NULL),
(@pack_id, 21, '财务分析师在进行“并购分析”时，需要计算什么？', '协同效应', '收购溢价', '每股收益摊薄/增厚', '以上都是', 'D', NULL),
(@pack_id, 22, '以下哪个是“预算编制”的起点？', '销售预算', '生产预算', '现金预算', '资本预算', 'A', NULL),
(@pack_id, 23, '“滚动预测”的主要优势是？', '始终保持未来12-18个月的视野', '适应动态变化', '提高预测准确性', '以上都是', 'D', NULL),
(@pack_id, 24, '财务分析师在评估投资项目时，采用“净现值（NPV）”法，接受项目的条件是？', 'NPV > 0', 'IRR > WACC', '回收期小于目标', 'A和B', 'D', NULL),
(@pack_id, 25, '“投资回报率（ROI）”的计算公式是？', '(收益 - 成本) / 成本', '利润 / 投资额', '年利润 / 总投资', '以上都是', 'D', NULL),
(@pack_id, 26, '以下哪个是“财务风险”的衡量指标？', '资产负债率', '利息保障倍数', '流动比率', '以上都是', 'D', NULL),
(@pack_id, 27, '在进行“估值”时，如果公司处于亏损状态，应避免使用哪个指标？', 'P/E（可能为负）', 'P/S', 'EV/EBITDA（也可能为负）', 'P/B', 'A', NULL),
(@pack_id, 28, '财务分析师需要掌握的“IFRS”与“US GAAP”的主要区别之一是？', '存货后进先出法（LIFO）在IFRS下禁止', '研发费用资本化规则不同', '收入确认时点差异', '以上都是', 'D', NULL),
(@pack_id, 29, '“杠杆收购（LBO）”模型的关注点是？', '内部收益率（IRR）', '债务偿还能力', '退出倍数', '以上都是', 'D', NULL),
(@pack_id, 30, '财务分析师常用的数据来源包括？', '公司年报', 'Wind/Bloomberg', '证监会公告', '以上都是', 'D', NULL),
(@pack_id, 31, '“经济利润（EVA）”的计算公式是？', 'NOPAT - 资本成本 * 投入资本', 'ROIC - WACC * 投入资本', '税后净利润 - 股权成本', 'A', 'A', NULL),
(@pack_id, 32, '在“可比交易分析”中，通常使用什么乘数？', '交易价值 / EBITDA', '交易价值 / 收入', '市盈率（基于交易价格）', '以上都是', 'D', NULL),
(@pack_id, 33, '财务分析师应如何应对模型中的“循环引用”问题？', '使用迭代计算', '手动拆解公式', '避免循环', '以上都是', 'D', NULL),
(@pack_id, 34, '“财务报表附注”中最需要关注的内容包括？', '会计政策', '或有事项', '关联方交易', '以上都是', 'D', NULL),
(@pack_id, 35, '以下哪个是“现金流折现”中折现率（WACC）的组成部分？', '债务成本', '权益成本', '税率', '以上都是', 'D', NULL),
(@pack_id, 36, '财务分析师进行“行业研究”时，通常使用什么框架？', '波特五力', 'PESTEL', 'SWOT', '以上都是', 'D', NULL),
(@pack_id, 37, '“资本资产定价模型（CAPM）”中的无风险利率通常使用？', '短期国债利率', '长期国债利率', '央行基准利率', 'LIBOR', 'B', NULL),
(@pack_id, 38, '在估值调整中，非经营性资产（如富余现金）应如何处理？', '从企业价值中扣除', '加回股权价值', '单独估值后加回', 'C', 'C', NULL),
(@pack_id, 39, '财务分析师在合并报表分析中，需要剔除什么？', '内部交易', '少数股东权益', '商誉减值', 'A', 'A', NULL),
(@pack_id, 40, '“盈利质量”分析中，应关注现金含量（经营活动现金流/净利润），该比率高于1通常表示？', '盈利质量好', '盈利质量差', '有操纵利润嫌疑', '无法判断', 'A', NULL),
(@pack_id, 41, '以下哪个是“财务预测”中常见的“驱动力”？', '宏观GDP增速', '行业增长率', '公司市场份额', '以上都是', 'D', NULL),
(@pack_id, 42, '“情景分析”与“敏感性分析”的主要区别是？', '情景分析组合多个变量变化，敏感性分析每次改变一个', '敏感性分析只改变一个', '情景分析描述不同未来场景', 'A和C', 'A', NULL),
(@pack_id, 43, '财务分析师在评估“资本结构”时，应参考什么？', '同行业杠杆水平', '公司增长阶段', '债务成本与权益成本比较', '以上都是', 'D', NULL),
(@pack_id, 44, '“股息贴现模型（DDM）”适用于什么样的公司？', '稳定分红', '无盈利', '高增长', '低负债', 'A', NULL),
(@pack_id, 45, '财务分析师在制作“管理层演示”时，应侧重什么？', '关键发现和建议', '图表可视化', '简明结论', '以上都是', 'D', NULL),
(@pack_id, 46, '“存货周转天数”上升可能意味着？', '销售放缓', '库存积压', '采购过多', '以上都是', 'D', NULL),
(@pack_id, 47, '财务分析师需要了解的“税务影响”包括？', '税率变化对净利润的影响', '递延税项资产/负债', '税收优惠政策的持续性', '以上都是', 'D', NULL),
(@pack_id, 48, '在“可比公司分析”中，为什么要剔除极端值？', '避免扭曲平均值', '提高可比性', '减少噪音', '以上都是', 'D', NULL),
(@pack_id, 49, '财务分析师常用的Excel快捷键不包括？', 'Alt+N（插入）', 'F4（绝对引用）', 'Ctrl+Shift+L（筛选）', 'Ctrl+P（打印）功能不常用', 'D', NULL),
(@pack_id, 50, '作为财务分析师，最重要的能力是？', '建模技术', '会计和金融知识', '逻辑思维和沟通', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业56：会计学×金融学 → 投资银行分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_finance:1', 56, '投资银行分析师', 'major_accounting', 'major_finance', '会计学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '投资银行分析师最常使用的估值方法是？', '可比公司分析', '先例交易分析', 'DCF分析', '以上都是', 'D', NULL),
(@pack_id, 2, '“路演”的主要目的是什么？', '向投资者推介公司股票', '与监管沟通', '内部培训', '竞标项目', 'A', NULL),
(@pack_id, 3, '以下哪个是投行“并购”业务的常见收费模式？', '成功费（Lehman Formula）', '聘请费', '终止费', '以上都是', 'D', NULL),
(@pack_id, 4, '在IPO项目中，投行分析师主要负责什么？', '撰写招股说明书', '进行尽职调查', '财务建模和估值', '以上都是', 'D', NULL),
(@pack_id, 5, '“股权资本市场（ECM）”团队的主要工作是？', '股权融资', '发债', '并购顾问', '重组', 'A', NULL),
(@pack_id, 6, '以下哪个是投行分析师常用的金融数据终端？', 'Bloomberg', 'Reuters', 'Capital IQ', '以上都是', 'D', NULL),
(@pack_id, 7, '并购交易的“保密协议”主要作用是？', '保护双方信息', '限制交易信息泄露', '确立初步意向', 'A和B', 'D', NULL),
(@pack_id, 8, '“尽职调查”通常包括哪些方面？', '财务尽调', '法律尽调', '业务尽调', '以上都是', 'D', NULL),
(@pack_id, 9, '在LBO模型中，最重要的收益来源是？', '股权价值提升', '债务偿还', '分红', 'A和B', 'D', NULL),
(@pack_id, 10, '以下哪个是投行分析师需要掌握的Excel技能？', '数据透视表', '高级公式（INDEX-MATCH, OFFSET等）', '宏（VBA）', '以上都是', 'D', NULL),
(@pack_id, 11, '“反向并购”是指？', '上市公司收购非上市公司', '非上市公司通过收购上市公司壳资源实现上市', '两家公司合并', '分拆上市', 'B', NULL),
(@pack_id, 12, '投行分析师在准备“项目建议书”（Pitch Book）时，包含什么？', '公司概览', '市场分析', '估值范围', '以上都是', 'D', NULL),
(@pack_id, 13, '以下哪个是“财务尽职调查”关注的重点？', '收入确认政策', '关联交易', '债务水平', '以上都是', 'D', NULL),
(@pack_id, 14, '“债务资本市场（DCM）”主要处理什么？', '股票发行', '债券发行', '可转债', 'B和C', 'D', NULL),
(@pack_id, 15, '投行分析师常用的“可比交易”筛选条件包括？', '行业', '交易规模', '时间（近期）', '以上都是', 'D', NULL),
(@pack_id, 16, '在“并购分析”中，是否增厚/摊薄每股收益（EPS）的计算需要比较什么？', '收购方的EPS', '合并后的EPS', '交易对价产生的利息/股份', '以上都是', 'D', NULL),
(@pack_id, 17, '“要约收购”与“协议收购”的主要区别是？', '公开市场竞价 vs 私下协商', '程序不同', '价格确定方式不同', '以上都是', 'D', NULL),
(@pack_id, 18, '投行分析师进行“债务能力分析”时，常用的指标是？', 'EBITDA / 利息', '总债务 / EBITDA', '现金流 / 总债务', '以上都是', 'D', NULL),
(@pack_id, 19, '以下哪个是投行常用的“估值倍数”？', 'EV/EBITDA', 'P/E', 'P/B', '以上都是', 'D', NULL),
(@pack_id, 20, '“股票研究（Equity Research）”部门与投资银行部门之间需要建立什么？', '防火墙（信息隔离）', '紧密合作', '共享报告', '共同服务客户', 'A', NULL),
(@pack_id, 21, '投行分析师在“卖方并购”中代表哪一方？', '目标公司', '收购方', '融资方', '监管机构', 'A', NULL),
(@pack_id, 22, '“债权融资”与“股权融资”相比，优势是？', '利息抵税', '不稀释控制权', '财务杠杆效应', '以上都是', 'D', NULL),
(@pack_id, 23, '投行分析师在构建模型时，需要将历史财务报表“重新编制”为“标准化”的报表，目的是？', '剔除一次性项目', '调整非经常性损益', '便于可比分析', '以上都是', 'D', NULL),
(@pack_id, 24, '以下哪个是“上市前融资”（Pre-IPO）的特点？', '投资人多为PE/VC', '有助于确定发行价', '增加公司资本', '以上都是', 'D', NULL),
(@pack_id, 25, '“绿鞋机制”（Greenshoe Option）在IPO中的作用是？', '超额配售选择权，稳定股价', '提高承销费', '增加发行数量', '锁定投资者', 'A', NULL),
(@pack_id, 26, '投行分析师在并购交易中计算“控制权溢价”的方法是？', '比较可比交易中的溢价', '与当前股价对比', '基于谈判确定', 'A和B', 'D', NULL),
(@pack_id, 27, '“分拆上市”（Spin-off）对企业价值的影响通常？', '增加整体价值（消除多元化折价）', '减少价值', '不变', '不确定', 'A', NULL),
(@pack_id, 28, '投行分析师常用的“财务预测”时间跨度一般是？', '1年', '3-5年', '10年', '永续', 'B', NULL),
(@pack_id, 29, '“债务融资”的“契约条款”（Covenants）包括？', '财务维持条款（如利息覆盖倍数）', '限制性条款（如不得新增借款）', '积极条款（如提供报表）', '以上都是', 'D', NULL),
(@pack_id, 30, '投行分析师需要了解“沙宾法案”（SOX）对上市公司的要求，主要是？', '内部控制审计', '管理层责任', '财务报告真实性', '以上都是', 'D', NULL),
(@pack_id, 31, '在“并购交易”中，“分手费”（Break-up fee）通常是支付给哪一方？', '目标公司（如果收购方违约）', '收购方（如果目标公司违约）', '双方都有', '政府', 'A', NULL),
(@pack_id, 32, '“可转换债券”的转换比率是？', '面值 / 转换价格', '转换价格 / 面值', '债券数量 * 转换价格', '市值 / 转换价格', 'A', NULL),
(@pack_id, 33, '投行分析师在“杠杆收购”中，最关心的退出时间是？', '3-5年', '1年以内', '10年以上', '不确定', 'A', NULL),
(@pack_id, 34, '“二次发售”（Secondary Offering）是指？', '公司增发新股', '现有股东出售股份', '发行可转债', '配股', 'B', NULL),
(@pack_id, 35, '投行分析师进行“折现现金流”时，使用“中值法”预测终值，需要什么？', '可比公司终值乘数', '永续增长率', '退出EBITDA倍数', 'A和C', 'D', NULL),
(@pack_id, 36, '“毒丸计划”（Poison Pill）是一种什么防御措施？', '增加收购成本', '稀释股权', '引入白衣骑士', 'A和B', 'D', NULL),
(@pack_id, 37, '投行分析师在“簿记建档”（Bookbuilding）过程中负责什么？', '收集投资者订单', '确定发行价格区间', '分配股票', '以上都是', 'D', NULL),
(@pack_id, 38, '“监管审批”在跨境并购中可能涉及哪个机构？', '反垄断局', '外商投资审查委员会（如CFIUS）', '行业主管部门', '以上都是', 'D', NULL),
(@pack_id, 39, '投行分析师经常使用的“情景分析”包括？', '乐观、基准、悲观', '仅基准', '随机', '历史模拟', 'A', NULL),
(@pack_id, 40, '以下哪个是“招股说明书”的核心内容？', '风险因素', '公司业务', '财务信息', '以上都是', 'D', NULL),
(@pack_id, 41, '“优先股”的特点不包括？', '固定股息', '优先于普通股分配剩余财产', '通常无投票权', '可转换为债券', 'D', NULL),
(@pack_id, 42, '投行分析师在进行“并购协同效应”分析时，通常分为？', '收入协同', '成本协同', '财务协同', '以上都是', 'D', NULL),
(@pack_id, 43, '“De-SPAC”交易是指？', 'SPAC收购目标公司', '目标公司借壳SPAC上市', 'SPAC清算', 'SPAC发行股票', 'B', NULL),
(@pack_id, 44, '投行分析师需要遵守的职业道德包括？', '保密', '避免利益冲突', '公平对待客户', '以上都是', 'D', NULL),
(@pack_id, 45, '在LBO模型中，“债务偿还瀑布”是指？', '优先偿还优先级债务', '从高到低偿还', '按利率高低', '按期限长短', 'A', NULL),
(@pack_id, 46, '投行分析师进行“股权价值”和“企业价值”转换时，需要调整的项目包括？', '现金', '负债', '少数股东权益', '以上都是', 'D', NULL),
(@pack_id, 47, '“市值加权”在构建可比公司组合时的意义是？', '大公司权重更高', '小公司权重更高', '等权', '中位数', 'A', NULL),
(@pack_id, 48, '投行分析师在“尽职调查”中发现目标公司存在未决诉讼，应如何处理？', '忽略', '评估潜在影响，并在估值中调整', '终止交易', '要求卖方赔偿', 'B', NULL),
(@pack_id, 49, '“配股”（Rights Offering）是指？', '向现有股东按比例发行新股', '公开发行', '私募', '可转债发行', 'A', NULL),
(@pack_id, 50, '作为投行分析师，最重要的能力是？', '高强度工作耐力', '财务建模与分析技能', '沟通与团队协作', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业57：会计学×金融学 → 估值建模专员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_finance:2', 57, '估值建模专员', 'major_accounting', 'major_finance', '会计学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '估值建模专员最常用的工具是？', 'Excel', 'Python', 'MATLAB', 'R', 'A', NULL),
(@pack_id, 2, '以下哪个是“绝对估值法”？', '可比公司分析', '先例交易分析', 'DCF模型', '市盈率法', 'C', NULL),
(@pack_id, 3, '在DCF模型中，自由现金流（FCFF）的起点是？', '净利润', 'EBIT', 'EBITDA', 'A或B', 'D', NULL),
(@pack_id, 4, '计算终值时，“永续增长法”假设增长率为g，且g通常不超过？', '长期GDP增长率', '行业增长率', '3%-5%', '以上都是', 'D', NULL),
(@pack_id, 5, '“贝塔（Beta）”系数衡量的是什么风险？', '系统性风险', '非系统性风险', '财务风险', '经营风险', 'A', NULL),
(@pack_id, 6, '以下哪个是“股权自由现金流（FCFE）”的公式？', 'FCFF - 利息费用*(1-税率) + 净借款', '净利润 + 折旧摊销 - 资本支出 - 营运资本增加 + 净借款', '经营活动现金流 - 资本支出 + 净借款', '以上都是', 'D', NULL),
(@pack_id, 7, '在估值中，“市场风险溢价”通常是指？', '市场收益率 - 无风险利率', '股票平均收益率 - 国债收益率', '历史平均超额收益', '以上都是', 'D', NULL),
(@pack_id, 8, '对于高杠杆公司，使用“调整现值法（APV）”的好处是？', '分开考虑无杠杆价值和税盾价值', '处理复杂的债务偿还计划', '更灵活处理财务困境成本', '以上都是', 'D', NULL),
(@pack_id, 9, '以下哪个是“可比公司分析”中常用的规模指标？', '收入', 'EBITDA', '总资产', '以上都是', 'D', NULL),
(@pack_id, 10, '“先例交易分析”中，交易价格通常包含什么？', '现金支付', '股票支付', '承担的债务', '以上都是', 'D', NULL),
(@pack_id, 11, '估值建模专员在计算“无风险利率”时，通常使用哪个期限的国债？', '1年', '5年', '10年', '30年', 'C', NULL),
(@pack_id, 12, '“杠杆Beta”与“无杠杆Beta”的转换公式是？', 'βu = βl / [1 + (1-t)*(D/E)]', 'βl = βu * [1 + (1-t)*(D/E)]', 'βu = βl * [1 + (1-t)*(D/E)]', 'A和B', 'D', NULL),
(@pack_id, 13, '在DCF中，预测期的长度通常取决于？', '公司稳定增长所需时间', '行业特点', '数据可得性', '以上都是', 'D', NULL),
(@pack_id, 14, '以下哪个是“相对估值法”的缺点？', '依赖可比公司选择', '市场情绪影响', '可能偏离内在价值', '以上都是', 'D', NULL),
(@pack_id, 15, '“净营运资本”预测中，通常假设哪些项目与收入成比例？', '应收账款', '存货', '应付账款', '以上都是', 'D', NULL),
(@pack_id, 16, '估值建模中的“敏感性分析”表通常以什么为行和列？', '增长率、折现率', '收入、毛利率', '税率、折旧率', '贝塔、无风险利率', 'A', NULL),
(@pack_id, 17, '“蒙特卡洛模拟”在估值中的应用是？', '处理多个不确定性因素的概率分布', '计算期望价值', '风险分析', '以上都是', 'D', NULL),
(@pack_id, 18, '以下哪个是“期权定价模型”在估值中的应用？', '员工股票期权', '专利价值', '自然资源项目', '以上都是', 'D', NULL),
(@pack_id, 19, '在进行“并购估值”时，需要考虑的控制权溢价通常来自？', '可比交易中的溢价中位数', '目标公司当前股价与要约价差', '行业惯例', 'A', 'A', NULL),
(@pack_id, 20, '“股权价值”与“企业价值”的区别是？', '企业价值包含了债务和现金', '股权价值是股东价值', '两者相差净债务', '以上都是', 'D', NULL),
(@pack_id, 21, '估值建模专员在“三张表联动模型”中，需要处理什么？', '利息费用与债务的循环', '折旧与资产的关联', '税费计算', '以上都是', 'D', NULL),
(@pack_id, 22, '“净资产价值（NAV）”估值法常用于？', '投资公司', '房地产公司', '资源公司', '以上都是', 'D', NULL),
(@pack_id, 23, '“剩余收益模型”的核心是？', '账面价值 + 未来超额收益现值', '股利贴现模型', '现金流折现', '市盈率', 'A', NULL),
(@pack_id, 24, '在估值中，“规模溢价”是指？', '小公司股票回报率通常高于大公司', '规模越大估值越高', '规模与风险无关', '规模负相关', 'A', NULL),
(@pack_id, 25, '“Country Risk Premium”在WACC中如何体现？', '加到股权成本中', '加到债务成本中', '调整现金流', '降低增长预期', 'A', NULL),
(@pack_id, 26, '以下哪个是“正常化盈利”（Normalized Earnings）调整项目？', '资产减值损失', '重组费用', '非经常性收益', '以上都是', 'D', NULL),
(@pack_id, 27, '在LBO估值中，投资人关注的“最低IRR”通常为？', '5-10%', '15-25%', '30-40%', '50%以上', 'B', NULL),
(@pack_id, 28, '“Gordon增长模型”假设什么？', '股利永续固定增长', '折现率大于增长率', '股利支付率恒定', '以上都是', 'D', NULL),
(@pack_id, 29, '估值建模专员需要了解的“监管资本”要求适用于？', '银行', '保险公司', '证券公司', '以上都是', 'D', NULL),
(@pack_id, 30, '“企业价值倍数的驱动因素”包括？', '增长率', '资本成本', '盈利质量', '以上都是', 'D', NULL),
(@pack_id, 31, '在“分部加总（SOTP）”估值中，如何处理集团折扣？', '通常给予10-30%的控股折扣', '不考虑', '加总即可', '加价', 'A', NULL),
(@pack_id, 32, '“债务成本”的估算通常使用？', '公司当前债务利率', '可比公司债务利率', '信用评级对应的收益率', '以上都是', 'D', NULL),
(@pack_id, 33, '“预期回报率”在CAPM中的公式是？', 'Rf + Beta * (Rm - Rf)', 'Rf + Beta * ERP', '无风险利率 + 风险溢价', '以上都是', 'D', NULL),
(@pack_id, 34, '对于“周期性行业”的公司，估值时应使用什么盈利指标？', '当前盈利', '正常化盈利（周期平均）', '峰值盈利', '谷底盈利', 'B', NULL),
(@pack_id, 35, '“折现现金流”模型中，如果预测期现金流为负，如何处理？', '忽略负数', '继续折现（可能降低企业价值）', '设为0', '改变假设', 'B', NULL),
(@pack_id, 36, '“市盈率（P/E）”受哪些因素影响？', '增长预期', '风险', '股利政策', '以上都是', 'D', NULL),
(@pack_id, 37, '估值建模专员在进行“情景分析”时，通常设置哪几种情景？', '乐观、基准、悲观', '仅基准', '随机', '历史', 'A', NULL),
(@pack_id, 38, '“流动性折扣”通常应用于？', '非上市公司股权估值', '上市公司大宗交易', '受限股票', '以上都是', 'D', NULL),
(@pack_id, 39, '“市场法”估值中，选择可比公司的最重要标准是？', '业务相似性', '财务相似性', '风险相似性', '以上都是', 'D', NULL),
(@pack_id, 40, '以下哪个是“股权价值”的直接估值方法？', '股利贴现模型', '自由现金流股权模型', '剩余收益模型', '以上都是', 'D', NULL),
(@pack_id, 41, '在DCF中，“加权平均资本成本”的权重应为？', '目标资本结构', '当前资本结构', '历史平均', '行业平均', 'A', NULL),
(@pack_id, 42, '“终值”在总企业价值中的占比通常？', '很小', '较大，可能超过50%', '100%', '0', 'B', NULL),
(@pack_id, 43, '“隐含增长率”可以通过什么反推？', '从当前股价和DCF模型反算g', '从可比公司倍数倒推', '从CAPM反推', '从风险溢价反推', 'A', NULL),
(@pack_id, 44, '“首次公开募股（IPO）估值”通常采用什么方法？', '可比公司分析', 'DCF', '博彩法（Book building）', '以上结合', 'D', NULL),
(@pack_id, 45, '以下哪个是“实物期权”的应用？', '延迟投资', '扩张期权', '放弃期权', '以上都是', 'D', NULL),
(@pack_id, 46, '在估值模型中，“检查模型”可以通过什么测试？', '所有单元格是否平衡', '资产负债表是否平', '现金流量表勾稽是否一致', '以上都是', 'D', NULL),
(@pack_id, 47, '“盈利质量”对估值的影响体现在？', '持续性盈利估值更高', '现金含量高估值更高', '会计政策稳健估值更高', '以上都是', 'D', NULL),
(@pack_id, 48, '估值建模专员需要掌握的Excel技巧中，OFFSET函数常用于？', '动态区域引用', '数据查找', '图表联动', '条件判断', 'A', NULL),
(@pack_id, 49, '“债务摊销”在LBO模型中的计算需要用到？', '债务偿还计划表', '现金流剩余', '最低现金要求', '以上都是', 'D', NULL),
(@pack_id, 50, '作为估值建模专员，最重要的能力是？', '严谨的逻辑', '熟练的Excel建模技能', '财务和金融理论基础', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业58：会计学×临床医学 → 医院成本核算
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_clinical:0', 58, '医院成本核算', 'major_accounting', 'major_clinical', '会计学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医院成本核算的最小核算单元通常是？', '科室', '医疗项目', '病种', '药品', 'B', NULL),
(@pack_id, 2, '以下哪个是医院成本核算的常用方法？', '作业成本法', '项目成本法', '病种成本法', '以上都是', 'D', NULL),
(@pack_id, 3, '医院中，“间接成本”通常包括？', '行政后勤人员工资', '房屋折旧', '水电费', '以上都是', 'D', NULL),
(@pack_id, 4, '在进行“科室成本核算”时，分摊间接成本的常见参数是？', '人员数量', '房屋面积', '收入比例', '以上都是', 'D', NULL),
(@pack_id, 5, '“DRG/DIP”支付改革下，医院成本核算的重点转向？', '项目成本', '病种成本', '科室成本', '药品成本', 'B', NULL),
(@pack_id, 6, '医院成本核算中，“直接成本”是指？', '可以直接归集到成本对象的成本', '需要分摊的成本', '固定成本', '变动成本', 'A', NULL),
(@pack_id, 7, '以下哪个是医疗设备的折旧计算方法？', '直线法', '工作量法', '加速折旧法', '以上都是', 'D', NULL),
(@pack_id, 8, '医院“成本核算”与“财务核算”的主要区别是？', '成本核算用于内部管理，财务核算对外报告', '成本核算可灵活定义对象', '成本核算包含内部服务成本', '以上都是', 'D', NULL),
(@pack_id, 9, '计算“诊次成本”的分母是？', '门诊人次', '住院床日', '出院人数', '手术例数', 'A', NULL),
(@pack_id, 10, '“床日成本”的计算公式是？', '住院总成本 / 总床日数', '住院直接成本 / 总床日数', '病区成本 / 床日数', 'A', 'A', NULL),
(@pack_id, 11, '医院成本核算中，“人力成本”应如何归集？', '按实际岗位归属科室', '按时间记录分摊', '按工作量分摊', 'A', 'A', NULL),
(@pack_id, 12, '以下哪个是“作业成本法”的关键步骤？', '识别作业', '归集成本至作业', '确定成本动因', '以上都是', 'D', NULL),
(@pack_id, 13, '医院“耗材成本”控制的关键是？', '建立二级库管理', '分析耗占比', '高值耗材追溯', '以上都是', 'D', NULL),
(@pack_id, 14, '“病种成本”的计算需要用到什么数据？', '临床路径', '病案首页', '费用明细', '以上都是', 'D', NULL),
(@pack_id, 15, '医院成本核算结果常用于？', '医保支付谈判', '绩效考核', '优化资源配置', '以上都是', 'D', NULL),
(@pack_id, 16, '“成本分摊”的“四级分摊法”是指？', '院级→临床→医技→管理', '管理→医辅→医技→临床', '直接成本→间接成本→管理费用', '科室→项目→病种', 'B', '常见：管理费用→医辅→医技→临床'),
(@pack_id, 17, '医院“药品成本”核算中，如何计算药品消耗成本？', '进价（采购价）', '零售价', '加成后价格', '市场价', 'A', NULL),
(@pack_id, 18, '“成本收益率”是衡量什么的指标？', '成本控制效果', '收入与成本之比', '盈利能力', '以上都是', 'D', NULL),
(@pack_id, 19, '医院成本核算系统通常与什么系统对接？', 'HIS（医院信息系统）', 'HRP（医院资源规划）', '财务系统', '以上都是', 'D', NULL),
(@pack_id, 20, '“全成本核算”与“不完全成本核算”的区别是？', '全成本包含所有间接成本分摊', '不完全成本只核算直接成本', '全成本更精确', '以上都是', 'D', NULL),
(@pack_id, 21, '“成本单元”在医院中可设置为？', '科室', '诊疗组', '单台设备', '以上都是', 'D', NULL),
(@pack_id, 22, '医院“成本预算”的编制基础是？', '历史成本数据', '业务量预测', '标准成本', '以上都是', 'D', NULL),
(@pack_id, 23, '以下哪个是“项目成本核算”的难点？', '医疗项目种类繁多', '人力消耗难以精确计量', '间接成本分摊复杂', '以上都是', 'D', NULL),
(@pack_id, 24, '“成本差异分析”中，价格差异和数量差异分别指？', '价格差异 = 实际价格 - 标准价格 × 实际数量', '数量差异 = 实际数量 - 标准数量 × 标准价格', '以上都是', '以上都不是', 'C', NULL),
(@pack_id, 25, '医院“成本信息”应提供给哪些使用者？', '院长及管理层', '科室主任', '医保部门', '以上都是', 'D', NULL),
(@pack_id, 26, '“诊疗组成本核算”的优点包括？', '激励医生控制成本', '促进团队协作', '更精细化管理', '以上都是', 'D', NULL),
(@pack_id, 27, '以下哪个是“成本控制”的常用手段？', '耗材集采', '临床路径标准化', '减少无效住院日', '以上都是', 'D', NULL),
(@pack_id, 28, '医院“检验科”的成本包括？', '试剂耗材', '设备折旧', '技术人员工资', '以上都是', 'D', NULL),
(@pack_id, 29, '“成本管理委员会”在医院的职责是？', '审批成本核算方案', '审阅成本分析报告', '推动降本增效措施', '以上都是', 'D', NULL),
(@pack_id, 30, '“变动成本率”是变动成本占什么的比重？', '总收入', '总成本', '固定成本', '边际贡献', 'A', NULL),
(@pack_id, 31, '医院“CT室”的成本核算中，每扫描一次的直接成本包括？', '胶片', '电费', '操作技师时间', '以上都是', 'D', NULL),
(@pack_id, 32, '以下哪个是“本量利分析”在医院的适用场景？', '新设备购置决策', '病种盈亏平衡点', '服务量目标设定', '以上都是', 'D', NULL),
(@pack_id, 33, '“病种成本”与“DRG支付标准”比较，如果成本高于支付标准，医院应采取？', '降低成本', '提高医疗效率', '调整病种结构', '以上都是', 'D', NULL),
(@pack_id, 34, '“成本核算软件”应具备的功能包括？', '数据自动采集', '成本分摊计算', '报表生成', '以上都是', 'D', NULL),
(@pack_id, 35, '“间接成本分摊”的“阶梯分摊法”是指？', '按顺序逐一分摊', '直接分配', '交互分配', '作业成本法', 'A', NULL),
(@pack_id, 36, '医院成本核算中“管理费用”通常包括？', '院长办公室费用', '财务科费用', '人事科费用', '以上都是', 'D', NULL),
(@pack_id, 37, '“成本效益分析”在评估医院新项目时，需要比较？', '增量成本与增量收益', '总成本与总收益', '平均成本与平均收益', '机会成本', 'A', NULL),
(@pack_id, 38, '“成本核算周期”通常为？', '月', '季', '年', 'A或C', 'D', NULL),
(@pack_id, 39, '“手术室”成本核算中，“接台时间”产生的成本应归入？', '直接成本', '间接成本', '固定成本', '变动成本', 'B', NULL),
(@pack_id, 40, '“成本标准”制定的依据是？', '历史最优水平', '行业标杆', '理论消耗', '以上都是', 'D', NULL),
(@pack_id, 41, '“零基预算”在医院成本管理中的含义是？', '从零开始编制预算，不参考历史', '每年递增', '固定预算', '弹性预算', 'A', NULL),
(@pack_id, 42, '“成本核算员”应具备的知识包括？', '会计学', '医院管理', '数据分析', '以上都是', 'D', NULL),
(@pack_id, 43, '“医院消毒供应中心”的成本核算，应采用什么方法？', '作业成本法', '服务单位成本法', '分部成本法', '标准成本法', 'A', NULL),
(@pack_id, 44, '“绩效考核”中，“成本控制”指标的权重通常？', '较高', '较低', '零', '负向', 'A', NULL),
(@pack_id, 45, '“成本信息公开”在医院内部的作用是？', '促进科室间良性竞争', '提高资源使用效率', '增强成本意识', '以上都是', 'D', NULL),
(@pack_id, 46, '“成本差异”的“不利差异”是指？', '实际成本 > 标准成本', '实际成本 < 标准成本', '有利差异', '无差异', 'A', NULL),
(@pack_id, 47, '“作业成本法”在医院中的“作业”可以是？', '挂号', '问诊', '检查', '以上都是', 'D', NULL),
(@pack_id, 48, '医院成本核算与“按病种付费”改革的衔接点是？', '病种成本核算', '临床路径成本', '成本与支付标准差异分析', '以上都是', 'D', NULL),
(@pack_id, 49, '“成本报表”的编制频率通常为？', '月度', '季度', '年度', 'A和C', 'D', NULL),
(@pack_id, 50, '作为医院成本核算专员，最重要的能力是？', '懂医院业务流程', '精通成本会计方法', '数据分析能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业59：会计学×临床医学 → 医保财务管理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_clinical:1', 59, '医保财务管理', 'major_accounting', 'major_clinical', '会计学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医保财务管理中，“医保基金”的收入来源包括？', '个人缴费', '单位缴费', '财政补贴', '以上都是', 'D', NULL),
(@pack_id, 2, '“医保支付方式”中，按人头付费主要适用于？', '门诊服务', '住院服务', '康复服务', '慢性病管理', 'A', NULL),
(@pack_id, 3, 'DRG付费的核心是？', '按病种分组打包支付', '按项目支付', '按床日支付', '按人头支付', 'A', NULL),
(@pack_id, 4, '医保财务管理中，“起付线”是指？', '医保报销的最低金额', '个人自付的最高限额', '医保支付上限', '报销比例', 'A', NULL),
(@pack_id, 5, '“封顶线”是指？', '医保基金年度最高支付限额', '个人自付最高限额', '起付线', '报销比例上限', 'A', NULL),
(@pack_id, 6, '以下哪个是医保基金“结余管理”的目标？', '保持适度结余', '提高基金使用效率', '保障可持续性', '以上都是', 'D', NULL),
(@pack_id, 7, '“异地就医”直接结算的财务处理需要？', '跨省清算', '基金垫付', '信息平台对接', '以上都是', 'D', NULL),
(@pack_id, 8, '医保财务管理中，“定点医疗机构”的协议管理内容包括？', '费用结算', '服务质量考核', '违规处罚', '以上都是', 'D', NULL),
(@pack_id, 9, '“医保基金预算”的编制基础是？', '参保人数', '缴费基数', '医疗费用增长率', '以上都是', 'D', NULL),
(@pack_id, 10, '“医保智能审核”系统的主要作用是？', '自动识别违规医疗行为', '控制不合理费用', '提高审核效率', '以上都是', 'D', NULL),
(@pack_id, 11, '“医保支付标准”对于药品，通常是指？', '医保基金报销的基准价格', '药品实际售价', '药品成本价', '药品招标价', 'A', NULL),
(@pack_id, 12, '“医保基金”的“收支平衡”原则是指？', '当期收支平衡', '长期收支平衡', '略有结余', '以上都是', 'D', NULL),
(@pack_id, 13, '“医保稽核”的主要目的是？', '查处欺诈骗保', '规范医疗服务行为', '减少基金损失', '以上都是', 'D', NULL),
(@pack_id, 14, '“按项目付费”的缺点是什么？', '容易诱导过度医疗', '成本控制弱', '监管成本高', '以上都是', 'D', NULL),
(@pack_id, 15, '医保财务管理专员需要了解“临床路径”，因为？', '临床路径有助于标准成本测算', '用于DRG分组', '质量控制', '以上都是', 'D', NULL),
(@pack_id, 16, '“医保基金预付款”制度是指？', '医保预付部分资金给定点医院', '医院先垫付后报销', '患者先缴费后报销', '即时结算', 'A', NULL),
(@pack_id, 17, '“医保结算周期”通常为？', '按月结算', '按季结算', '按年结算', 'A或B', 'A', NULL),
(@pack_id, 18, '“门诊统筹”与“住院统筹”的基金账户通常？', '分开管理', '合并管理', '统一调剂', '视地区而定', 'A', NULL),
(@pack_id, 19, '“医保财务管理”中的“风险储备金”用于？', '应对突发公共卫生事件', '弥补基金缺口', '重大疫情支出', '以上都是', 'D', NULL),
(@pack_id, 20, '“医保支付方式改革”的方向是？', '从后付制转向预付制', '从按项目付费转向打包付费', '激励控费', '以上都是', 'D', NULL),
(@pack_id, 21, '“单病种付费”与DRG的区别是？', '单病种覆盖病种有限', 'DRG覆盖所有病种', 'DRG分组更精细', '以上都是', 'D', NULL),
(@pack_id, 22, '医保财务管理中，“费用审核”的重点包括？', '合理用药', '诊疗项目必要性', '重复收费', '以上都是', 'D', NULL),
(@pack_id, 23, '“医保基金”的投资运营原则是？', '安全性', '收益性', '流动性', '以上都是', 'D', NULL),
(@pack_id, 24, '以下哪个是“医保违规行为”？', '挂床住院', '串换诊疗项目', '伪造医疗文书', '以上都是', 'D', NULL),
(@pack_id, 25, '“医保财务管理专员”需要与医院的哪些部门协作？', '医保办', '财务科', '信息科', '以上都是', 'D', NULL),
(@pack_id, 26, '“医保基金预算”的执行分析包括？', '收入完成情况', '支出进度', '结余率', '以上都是', 'D', NULL),
(@pack_id, 27, '“长期护理保险”的财务管理特点包括？', '评估分级', '服务包支付', '个人与基金共担', '以上都是', 'D', NULL),
(@pack_id, 28, '医保财务管理中，“结算清单”与“病案首页”的关系是？', '结算清单来源于病案首页', '两者信息一致', '用于DRG分组', '以上都是', 'D', NULL),
(@pack_id, 29, '“医保基金监管”的“飞行检查”是指？', '不预先通知的现场检查', '定期检查', '专项检查', '在线监控', 'A', NULL),
(@pack_id, 30, '“医保财务管理软件”应具备的功能包括？', '费用申报', '智能审核', '数据统计分析', '以上都是', 'D', NULL),
(@pack_id, 31, '“门诊慢特病”的医保管理需要？', '病种认定', '定额支付或按人头', '处方管理', '以上都是', 'D', NULL),
(@pack_id, 32, '“医保基金”的“大病保险”是如何运作的？', '从基本医保基金划拨', '个人额外缴费', '对高额费用二次报销', '以上都是', 'D', NULL),
(@pack_id, 33, '“医保财务管理”中的“对账”工作包括？', '与医院HIS系统对账', '与医保经办机构对账', '与银行对账', '以上都是', 'D', NULL),
(@pack_id, 34, '“医保支付标准”谈判的主要内容是？', '药品价格', '耗材价格', '医疗服务价格', '以上都是', 'D', NULL),
(@pack_id, 35, '以下哪个是“医保基金精算”的作用？', '预测基金收支趋势', '评估政策影响', '调整缴费和待遇', '以上都是', 'D', NULL),
(@pack_id, 36, '“医保财务管理专员”需要掌握的法规包括？', '《社会保险法》', '医保基金监管条例', '各地医保政策', '以上都是', 'D', NULL),
(@pack_id, 37, '“医保信用体系”建设中对医院的评价包括？', '履约情况', '违规记录', '服务质量', '以上都是', 'D', NULL),
(@pack_id, 38, '“医保基金”的“统筹层次”通常为？', '地市级', '省级（逐步推进）', '县级', 'A和B', 'D', NULL),
(@pack_id, 39, '“按床日付费”适用于哪些服务？', '精神科', '康复科', '长期住院', '以上都是', 'D', NULL),
(@pack_id, 40, '医保财务管理中，“拒付”的原因可能是？', '重复收费', '分解住院', '不符合适应症', '以上都是', 'D', NULL),
(@pack_id, 41, '“医保基金报表”包括？', '收支表', '资产负债表', '预算执行表', '以上都是', 'D', NULL),
(@pack_id, 42, '“医疗救助”资金的管理属于医保财务吗？', '属于，通常与医保基金统一管理', '不属于，独立运作', '部分属于', '完全独立', 'A', NULL),
(@pack_id, 43, '“医保支付方式”中，“紧密型医联体”通常采用什么支付方式？', '总额预付', '按人头付费', '结余留用', '以上都是', 'D', NULL),
(@pack_id, 44, '“医保财务管理”信息化建设的关键是？', '数据标准化', '系统互联互通', '数据分析能力', '以上都是', 'D', NULL),
(@pack_id, 45, '“医保基金风险预警”指标包括？', '当期结余率', '累计结余可支付月数', '医疗费用增长率', '以上都是', 'D', NULL),
(@pack_id, 46, '“医保财务分析报告”应包含的内容？', '基金收支分析', '费用结构分析', '问题与建议', '以上都是', 'D', NULL),
(@pack_id, 47, '“门诊共济”改革对个人账户的影响是？', '减少划入', '增加统筹基金', '提高门诊待遇', '以上都是', 'D', NULL),
(@pack_id, 48, '“医保财务管理”的内部控制包括？', '不相容岗位分离', '权限管理', '定期轮岗', '以上都是', 'D', NULL),
(@pack_id, 49, '“医保财务专员”与“医院财务”的主要合作点是？', '医保回款核算', '坏账准备', '应收医保款管理', '以上都是', 'D', NULL),
(@pack_id, 50, '作为医保财务管理专员，最重要的能力是？', '熟悉医保政策', '财务核算与数据分析', '沟通协调', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业60：会计学×临床医学 → 医疗项目预算专员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_clinical:2', 60, '医疗项目预算专员', 'major_accounting', 'major_clinical', '会计学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医疗项目预算专员在项目立项阶段的主要工作是？', '估算项目成本', '编制预算表', '评估资金来源', '以上都是', 'D', NULL),
(@pack_id, 2, '以下哪个是医疗设备采购预算的组成部分？', '设备购置费', '安装调试费', '培训费', '以上都是', 'D', NULL),
(@pack_id, 3, '“资本预算”与“运营预算”的区别是？', '资本预算用于长期资产，运营预算用于日常收支', '资本预算周期长，运营预算周期短', '资本预算涉及投资决策', '以上都是', 'D', NULL),
(@pack_id, 4, '“零基预算”在医疗项目中的优点是？', '避免历史不合理支出延续', '促进资源优化配置', '增强成本意识', '以上都是', 'D', NULL),
(@pack_id, 5, '医疗项目预算编制时，“人工成本”应包含？', '医生、护士工资', '外聘专家劳务费', '项目管理人员薪酬', '以上都是', 'D', NULL),
(@pack_id, 6, '以下哪个是“项目预算”的审批流程中的关键环节？', '科室申报', '财务初审', '院领导审批', '以上都是', 'D', NULL),
(@pack_id, 7, '“预算执行率”的计算公式是？', '实际支出 / 预算金额 × 100%', '预算金额 / 实际支出 × 100%', '节约额 / 预算', '超支额 / 预算', 'A', NULL),
(@pack_id, 8, '医疗项目“预算调整”的常见原因是？', '项目范围变更', '市场价格波动', '政策调整', '以上都是', 'D', NULL),
(@pack_id, 9, '“预算绩效评价”的指标包括？', '产出指标（如服务量）', '效益指标（如患者满意度）', '成本控制指标', '以上都是', 'D', NULL),
(@pack_id, 10, '以下哪个是“科研项目预算”的特殊性？', '间接费用比例', '设备费与材料费区分', '劳务费限制', '以上都是', 'D', NULL),
(@pack_id, 11, '“医疗基建项目”预算通常包括哪些费用？', '建安工程费', '设备购置费', '其他费用（设计、监理等）', '以上都是', 'D', NULL),
(@pack_id, 12, '“预算编制”的“自下而上”方法是指？', '科室先报需求，财务汇总平衡', '财务直接下达', '按历史数据增长', '外部对标', 'A', NULL),
(@pack_id, 13, '“预算控制”中的“预警机制”通常设定什么？', '预算使用达到80%时提醒', '超预算禁止支出', '定期通报', '以上都是', 'D', NULL),
(@pack_id, 14, '“项目决算”与“项目预算”的关系是？', '决算与预算对比分析', '决算超预算需说明', '节余需处理', '以上都是', 'D', NULL),
(@pack_id, 15, '以下哪个是“医疗信息化项目”预算中的软硬件成本？', '服务器', '软件许可证', '实施服务费', '以上都是', 'D', NULL),
(@pack_id, 16, '“预算专员”需要与哪些部门沟通？', '项目发起科室', '采购部门', '财务部门', '以上都是', 'D', NULL),
(@pack_id, 17, '“滚动预算”适用于什么类型的医疗项目？', '长期持续项目', '短期一次性项目', '科研项目', '基建项目', 'A', NULL),
(@pack_id, 18, '“预算编制依据”包括？', '历史数据', '市场价格信息', '项目计划', '以上都是', 'D', NULL),
(@pack_id, 19, '“成本效益分析”在医疗项目预算中的作用是？', '决定是否立项', '优化资源配置', '评估投资回报', '以上都是', 'D', NULL),
(@pack_id, 20, '“预算执行的监控”频率通常为？', '月度', '季度', '年度', 'A或B', 'A', NULL),
(@pack_id, 21, '以下哪个是“政府拨款项目”预算的特殊要求？', '专款专用', '分年度预算', '绩效目标申报', '以上都是', 'D', NULL),
(@pack_id, 22, '“预算差异分析”中，“有利差异”是指？', '实际支出低于预算', '实际支出高于预算', '实际收入高于预算', '实际收入低于预算', 'A', NULL),
(@pack_id, 23, '“应急预算”通常占项目总预算的比例为？', '1-3%', '5-10%', '15-20%', '25%以上', 'B', NULL),
(@pack_id, 24, '“医疗设备全生命周期成本”预算包括？', '购置成本', '运维成本', '处置成本', '以上都是', 'D', NULL),
(@pack_id, 25, '预算专员在项目中期应做的工作是？', '跟踪预算执行', '分析偏差原因', '提出调整建议', '以上都是', 'D', NULL),
(@pack_id, 26, '“预算表”的主要列示内容为？', '预算科目', '预算金额', '测算依据', '以上都是', 'D', NULL),
(@pack_id, 27, '“预算批复”后的下一步是？', '预算分解下达', '执行开始', '采购准备', 'A', 'A', NULL),
(@pack_id, 28, '以下哪个是“医院专项预算”的例子？', '学科建设经费', '人才培养经费', '科研配套经费', '以上都是', 'D', NULL),
(@pack_id, 29, '“预算管理信息系统”应具备什么功能？', '预算编制', '预算控制', '预算分析', '以上都是', 'D', NULL),
(@pack_id, 30, '“预算编制周期”通常为？', '3-6个月', '1个月', '1年', '2年', 'A', NULL),
(@pack_id, 31, '“项目预算专员”需要掌握的财务技能是？', '预算编制方法', 'Excel建模', '成本分析', '以上都是', 'D', NULL),
(@pack_id, 32, '“预算与决算差异”超过多少需要专项说明？', '5%', '10%', '20%', '30%', 'B', NULL),
(@pack_id, 33, '“医疗技术引进项目”预算中，技术许可费属于？', '无形资产', '直接费用', '间接费用', '资本性支出', 'A', NULL),
(@pack_id, 34, '“预算约束”是指？', '不得无预算支出', '不得超预算支出', '预算调整需审批', '以上都是', 'D', NULL),
(@pack_id, 35, '“预算编制模板”应统一什么？', '科目编码', '表格格式', '填报说明', '以上都是', 'D', NULL),
(@pack_id, 36, '“预算执行分析报告”应包含？', '总体执行情况', '重点项目分析', '问题及建议', '以上都是', 'D', NULL),
(@pack_id, 37, '以下哪个是“预算外支出”的处理方式？', '禁止', '先预算调整后支出', '先支出后报告', '无视预算', 'B', NULL),
(@pack_id, 38, '“预算委员会”的成员通常包括？', '院领导', '财务负责人', '各科室主任', '以上都是', 'D', NULL),
(@pack_id, 39, '“预算管理”的PDCA循环中，C代表？', 'Plan', 'Do', 'Check', 'Act', 'C', NULL),
(@pack_id, 40, '“医疗设备预算”中，考虑“技术更新”因素，应缩短？', '折旧年限', '使用年限', '预算周期', '投资回收期', 'A', NULL),
(@pack_id, 41, '“预算绩效目标”的SMART原则包括？', '具体', '可衡量', '可实现', '以上都是', 'D', NULL),
(@pack_id, 42, '“预算专员”如何处理“预算结余”？', '结转下年', '收回统筹', '按政策处理', '以上都是', 'D', NULL),
(@pack_id, 43, '“项目预算”的“不可预见费”使用条件是什么？', '经批准', '用于不可预见事项', '不得挪作他用', '以上都是', 'D', NULL),
(@pack_id, 44, '“预算编制”中的“增量预算法”适用于什么情况？', '业务稳定', '成本相对固定', '变化不大', '以上都是', 'D', NULL),
(@pack_id, 45, '“预算沟通”会议应包括哪些内容？', '预算目标解读', '编制方法培训', '答疑', '以上都是', 'D', NULL),
(@pack_id, 46, '“预算调整”的审批权限通常？', '小额调整由财务部门批', '大额调整由院领导或董事会批', '所有调整需原审批机构批', 'A和B', 'D', NULL),
(@pack_id, 47, '“医疗项目预算”中，“人员培训费”属于？', '直接成本', '间接成本', '管理费用', '其他费用', 'A', NULL),
(@pack_id, 48, '“预算执行”的“红黄绿灯”预警中，红灯代表？', '严重超支或异常', '正常', '接近限额', '无意义', 'A', NULL),
(@pack_id, 49, '预算专员应如何应对“预算执行偏差”？', '分析原因', '提出改进措施', '及时上报', '以上都是', 'D', NULL),
(@pack_id, 50, '作为医疗项目预算专员，最重要的能力是？', '财务预算专业知识', '了解医疗项目流程', '沟通协调能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业61：会计学×软件工程 → 财务软件开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_swe:0', 61, '财务软件开发', 'major_accounting', 'major_swe', '会计学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在财务软件开发中，处理金额数据最安全的数据类型是？', 'Float', 'Double', 'Decimal', 'Integer', 'C', NULL),
(@pack_id, 2, '以下哪个会计准则对收入确认的五步法模型进行了详细规定？', '美国通用会计准则 (US GAAP)', '国际财务报告准则第15号 (IFRS 15)', '国际财务报告准则第9号 (IFRS 9)', '萨班斯-奥克斯利法案 (SOX)', 'B', NULL),
(@pack_id, 3, '开发财务软件时，用于确保“用户只能访问其职权范围内的数据”的控制属于？', '输入控制', '处理控制', '访问控制', '输出控制', 'C', NULL),
(@pack_id, 4, '在复式记账法中，一笔采购设备（资产增加）并支付现金（资产减少）的分录，对会计恒等式的影响是？', '资产总额增加，权益增加', '资产总额减少，负债减少', '资产总额不变', '负债增加，权益减少', 'C', NULL),
(@pack_id, 5, '财务软件中的“红字冲销”功能主要用于处理什么情况？', '期末结转损益', '更正已入账的错误凭证', '计提固定资产折旧', '计算企业所得税', 'B', NULL),
(@pack_id, 6, '在设计财务系统的数据库时，科目余额表通常应遵循哪种数据库设计范式以避免数据冗余？', '第一范式 (1NF)', '第三范式 (3NF)', '非规范化设计', '星型模型', 'B', NULL),
(@pack_id, 7, '以下哪种测试专门用于验证财务软件的年结功能在跨年时是否正确？', '单元测试', '集成测试', '回归测试', '场景测试 (或 流程测试)', 'D', NULL),
(@pack_id, 8, 'SAP系统中，财务会计模块的标准缩写是？', 'FI (Financial Accounting)', 'CO (Controlling)', 'SD (Sales and Distribution)', 'MM (Materials Management)', 'A', NULL),
(@pack_id, 9, '开发一个支持多币种交易的财务系统时，必须维护的核心数据表是？', '客户信息表', '汇率表', '存货明细表', '部门架构表', 'B', NULL),
(@pack_id, 10, '对于财务软件中的“凭证-明细-汇总”三级数据结构，其设计的主要目的是？', '提高数据安全性', '满足审计追踪要求', '平衡查询性能与存储效率', '实现多用户并发控制', 'C', NULL),
(@pack_id, 11, '在实现固定资产模块时，计算每月折旧额的功能应采用哪种设计模式？', '单例模式', '工厂模式', '策略模式', '观察者模式', 'C', NULL),
(@pack_id, 12, '财务软件生成的资产负债表不平，最可能的问题是？', '当期所有凭证未过账', '未结转期间损益', '未计提坏账准备', '未将损益类科目余额结转为零', 'D', NULL),
(@pack_id, 13, '对于财务软件的“反结账”功能，从审计合规角度看，最佳实践是？', '允许无限制使用', '记录详细的操作日志并需要特定权限', '完全禁止该功能', '仅允许系统管理员使用且不留日志', 'B', NULL),
(@pack_id, 14, '以下哪个SQL语句最适合在财务软件中实现借贷平衡的校验？', 'SELECT SUM(金额) FROM 凭证表 GROUP BY 凭证号', 'SELECT 凭证号, SUM(借方金额) AS 借, SUM(贷方金额) AS 贷 FROM 凭证分录表 GROUP BY 凭证号 HAVING 借 <> 贷', 'SELECT * FROM 凭证表 WHERE 借方总额 = 贷方总额', 'UPDATE 凭证表 SET 状态 = ''已验证'' WHERE 借方总额 = 贷方总额', 'B', NULL),
(@pack_id, 15, '财务报表模块中的“报表项公式”通常采用哪种语言风格来定义取数逻辑？', '自然语言', '领域特定语言 (DSL)', '汇编语言', '标准的SQL', 'B', NULL),
(@pack_id, 16, '在财务软件中，为了保证凭证编号的连续性，应使用哪种数据库机制？', '触发器', '序列 (Sequence) 或 自增列', '视图', '存储过程', 'B', NULL),
(@pack_id, 17, '开发银企直连模块时，最关键的安全措施是？', '使用复杂前端控件', '对传输数据进行加密和数字签名', '将密钥硬编码在代码中', '每天更换一次密钥', 'B', NULL),
(@pack_id, 18, '当用户同时修改同一张凭证时，系统应使用哪种并发控制机制？', '脏读', '乐观锁', '悲观锁', '无锁编程', 'C', NULL),
(@pack_id, 19, '以下哪个不是中国会计准则要求的法定财务报表？', '资产负债表', '利润表', '成本计算单', '现金流量表', 'C', NULL),
(@pack_id, 20, '财务软件中的“辅助核算”功能是为了解决什么问题？', '科目体系过于简单', '在科目体系不变的情况下，从多维度（如部门、客户）进行核算', '提高凭证录入速度', '取代明细科目', 'B', NULL),
(@pack_id, 21, '在开发税务计算模块时，对于增值税进项税抵扣的处理，以下哪个逻辑是正确的？', '所有收到的发票均可全额抵扣', '用于简易计税方法的项目进项税可以抵扣', '用于免税项目的进项税不得抵扣', '个人消费的进项税可以抵扣', 'C', NULL),
(@pack_id, 22, '财务软件的性能测试中，模拟月底、年底大量数据同时计算结转的场景属于？', '负载测试', '压力测试', '稳定性测试', '容量测试 (或 强度测试)', 'D', NULL),
(@pack_id, 23, '关于财务软件中“权限设置”的最佳实践是？', '所有财务人员都拥有管理员权限', '凭证的制单、审核、记账应为不同用户', '出纳可以修改会计凭证', '删除操作不需要额外授权', 'B', NULL),
(@pack_id, 24, '实现一套账务处理流程的核心状态机，其状态流转不包含以下哪一项？', '未审核', '已审核', '已过账', '已打印', 'D', NULL),
(@pack_id, 25, '以下哪个开源框架最适合用于Java财务应用的后端开发，以处理复杂的业务逻辑？', 'Spring Boot', 'React', 'Flutter', 'TensorFlow', 'A', NULL),
(@pack_id, 26, '财务报表中，“未分配利润”项目的期末数等于？', '期初未分配利润 + 本期净利润', '期初未分配利润 - 提取盈余公积 - 应付股利', '期初未分配利润 + 本年利润转入 - 利润分配', '期初未分配利润 + 本年净利润 - 提取的盈余公积 - 分配的股利', 'D', NULL),
(@pack_id, 27, '财务软件的成本核算模块中，对于共用材料费用的分配，以下哪种分配标准最合理？', '产品数量', '产品重量', '产品定额消耗量', '随意分配', 'C', NULL),
(@pack_id, 28, '为了防止SQL注入攻击，财务软件在拼接动态查询条件时应该？', '使用字符串拼接方式', '使用参数化查询或预编译语句', '关闭数据库所有权限', '将用户输入进行base64编码', 'B', NULL),
(@pack_id, 29, '在开发和维护财务软件时，“审计追踪”功能要求系统必须记录什么？', '用户的所有登录时间', '用户的所有鼠标点击轨迹', '对关键数据（如凭证）的增、删、改操作，包括操作人、时间、新旧值', '服务器的CPU和内存使用率', 'C', NULL),
(@pack_id, 30, '关于红字更正法的软件实现，以下哪项描述是错误的？', '生成一张金额为负数的凭证', '冲销原错误分录', '主要用于更正结账后的错误', '会修改原始的错误凭证数据', 'D', NULL),
(@pack_id, 31, '开发期末结转损益功能时，系统需要自动生成的分录是？', '借：主营业务成本 贷：库存商品', '借：所得税费用 贷：应交税费-所得税', '借：本年利润 贷：管理费用（或相反方向）', '借：利润分配 贷：应付股利', 'C', NULL),
(@pack_id, 32, '数据库事务的ACID特性中，对于财务转账功能最重要的是？', '原子性 (Atomicity)', '一致性 (Consistency)', '隔离性 (Isolation)', '以上都是 (所有特性都同等重要)', 'D', NULL),
(@pack_id, 33, '在财务软件的报表模块中，如果要计算“本年累计”数，通常会用到什么函数或方法？', '当前期初数', '本月发生数', '本月发生数 + 上期累计数', '直接用上期期末数', 'C', NULL),
(@pack_id, 34, '设计一个可配置的审批工作流，用于处理大额付款申请，最适合的设计模式是？', '代理模式', '模板方法模式', '责任链模式', '装饰器模式', 'C', NULL),
(@pack_id, 35, '以下哪个不是财务软件中常见的应收/应付账款账龄分析的区间？', '1-30天', '31-60天', '181-270天', '1年以上', 'C', NULL),
(@pack_id, 36, '在软件开发过程中，与财务顾问确认“坏账准备”的计提算法（如余额百分比法、账龄分析法），属于哪个阶段的产物？', '需求分析文档', '概要设计文档', '详细设计文档', '测试用例文档', 'A', NULL),
(@pack_id, 37, '对于跨国企业的财务软件，实现合并报表时，内部交易抵消处理的核心逻辑是什么？', '将子公司报表简单相加', '将子公司报表按汇率折算后相加', '识别并消除母子公司之间、子公司相互之间的交易和往来余额', '只抵消母公司的交易', 'C', NULL),
(@pack_id, 38, '在进行财务软件的代码审查时，发现以下哪段代码应该被标记为严重问题？', '使用Decimal类型存储金额', '在金融计算中使用浮点数double类型', '对用户输入进行了长度校验', '将数据库连接字符串写在配置文件中', 'B', NULL),
(@pack_id, 39, '为了应对“金税四期”的全电发票，财务软件开发时需要集成的新能力是？', '电子印章生成', '直连税务局接口进行发票的开具、查验和入账', '3D图形渲染', '语音识别录入发票', 'B', NULL),
(@pack_id, 40, '在财务软件的应收模块中，收到一笔款项需要核销多张发票时，系统应提供哪种功能？', '自动生成红字发票', '自动或手工的发票匹配与核销', '自动修改发票金额', '自动删除未收款发票', 'B', NULL),
(@pack_id, 41, '用友UAP或金蝶BOS这类平台，在财务软件开发中的主要作用是？', '提供操作系统底层支持', '作为二次开发平台，快速构建和配置财务业务应用', '专门的数据库管理工具', '前端UI设计工具', 'B', NULL),
(@pack_id, 42, '财务软件中的“现金流量表”编制，主要有两种方法，分别是？', '直接法和间接法', '收付实现制和权责发生制', '直接法和间接法', '总额法和净额法', 'C', NULL),
(@pack_id, 43, '开发一个支持预算控制的功能，当一笔报销申请超出部门预算时，系统的最合理行为是？', '无提示，直接允许提交', '发出警告并可配置为禁止提交或进入特批流程', '自动修改申请金额使其符合预算', '锁定整个系统', 'B', NULL),
(@pack_id, 44, '财务软件与银行系统对接通常使用哪种文件格式？', 'MP3', 'JPG', 'MT940 / MT942 (SWIFT标准) 或 企业网银接口报文', 'HTML', 'C', NULL),
(@pack_id, 45, '在处理大量历史数据迁移时，为确保新旧系统数据一致，最重要的是什么？', '迁移速度', '迁移后的汇总试算平衡校验', '进行全面的数据对账 (总账对明细、旧系统对新系统)', '旧系统数据的删除', 'C', NULL),
(@pack_id, 46, '以下哪个功能不是财务软件总账模块的核心功能？', '凭证录入与管理', '账簿查询', '生产订单管理', '期末汇率调整', 'C', NULL),
(@pack_id, 47, '财务软件中，使用“结转销售成本”功能时，系统根据什么计算出库成本？', '采购订单金额', '销售订单金额', '存货计价方法 (如移动平均法、先进先出法)', '产品售价', 'C', NULL),
(@pack_id, 48, '为了提升财务软件的并发性能和用户体验，对于“凭证查询”这种读多写少的操作，可以引入什么技术？', '多线程死锁', '缓存 (如 Redis)', '同步代码块', '数据库排它锁', 'B', NULL),
(@pack_id, 49, '在财务软件的权限模型中，RBAC的意思是？', '一种加密算法', '基于角色的访问控制 (Role-Based Access Control)', '一种报表格式', '一种数据库类型', 'B', NULL),
(@pack_id, 50, '当财务软件需要对接电子发票系统时，以下哪个技术标准是可能涉及到的？', 'OFD 或 PDF 格式', 'XML 格式的发票数据', '税务UKey的调用', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业62：会计学×软件工程 → SaaS财务产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_swe:1', 62, 'SaaS财务产品经理', 'major_accounting', 'major_swe', '会计学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '作为SaaS财务产品的PM，发现客户最痛恨月末手工对账，你应优先做什么？', '立即开发最复杂的自动化对账算法', '通过访谈和问卷量化该痛点的频率与成本', '发布公告说下版本解决', '建议客户聘请更多会计', 'B', NULL),
(@pack_id, 2, '设计一个SaaS财务软件的定价模型时，哪种策略最能体现“价值导向”？', '按用户账号数量收费', '按服务器资源占用收费', '按客户每月处理的发票张数或交易流水金额收费', '一口价包年', 'C', NULL),
(@pack_id, 3, '对于SaaS产品，客户流失率 (Churn Rate) 突然从2%升至5%，作为PM首先应分析？', '竞争对手是否降价了', '是否近期上线的功能引入了严重BUG或逻辑错误', '市场营销费用是否减少', '股价是否波动', 'B', NULL),
(@pack_id, 4, '作为财务SaaS的PM，哪个指标最能反映产品的“粘性”？', '获客成本 (CAC)', '客户终身价值 (LTV)', '净收入留存率 (NDR)', '月活跃用户数 (MAU)', 'C', NULL),
(@pack_id, 5, '在编写PRD时，对于“智能发票识别”功能，最合适的验收标准是？', '识别率很高', '用户体验好', '在特定测试集上，OCR识别准确率达到99%，且关键字段提取准确率为98%', '上线一周后没有Bug', 'C', NULL),
(@pack_id, 6, '当销售提出需要“为某个大客户定制开发一个特有会计科目表结构”时，作为PM应该？', '立即同意，满足大客户需求', '拒绝，并告知客户这是标准产品', '分析该需求是否可以抽象为通用的“科目表模板配置”功能，服务于更多客户', '要求销售提高该客户的合同金额', 'C', NULL),
(@pack_id, 7, '以下哪个功能最适合作为SaaS财务产品的免费增值 (Freemium) 版本功能？', '自动生成合并报表', '与银行系统的自动对账', '基础的凭证录入和报表查询', '集团化多账簿管理', 'C', NULL),
(@pack_id, 8, '在做财务SaaS的用户画像时，你发现“会计主管”和“公司CEO”关注点不同，CEO最关注？', '凭证录入的便捷性', '固定资产折旧的计算精度', '关键财务指标仪表盘和现金流预测', '账簿打印的格式美观度', 'C', NULL),
(@pack_id, 9, '你的财务SaaS产品需要接入多家银行接口，最佳的架构思路是？', '为每个银行开发一套独立代码', '定义统一的核心接口标准，为每家银行开发适配器', '要求用户手动下载银行流水再上传', '只支持最大的三家银行', 'B', NULL),
(@pack_id, 10, '作为PM，你决定在新版本中移除一个使用率只有0.5%但开发维护成本极高的功能，依据是？', '个人直觉', 'KANO模型分析', '数据驱动决策：该功能投入产出比过低', '老板的要求', 'C', NULL),
(@pack_id, 11, '在SaaS财务产品中，哪个指标通常与客户满意度呈负相关？', '客户支持响应速度', '客服单平均解决时长', '产品迭代频率', '数据安全性评级', 'B', NULL),
(@pack_id, 12, '对于财务SaaS产品，“数据孤岛”是常见问题，以下哪个策略可以有效解决？', '开发独立的应用商店', '建设开放API平台，允许与其他SaaS（如CRM、ERP）集成', '购买客户的所有数据', '强制所有客户使用同一品牌CRM', 'B', NULL),
(@pack_id, 13, '在制定产品路线图时，一个要求重构“权限模型”的技术需求，与一个“发票验真”的显性功能需求，哪个优先级更高？', '永远是功能需求更高', '永远是技术需求更高', '根据当前产品阶段和风险判断，若权限模型已严重阻碍新功能开发或存在合规风险，则技术需求更高', '让销售团队投票决定', 'C', NULL),
(@pack_id, 14, '你的SaaS财务软件获得了SOC 1 Type II认证，这意味着什么？', '产品界面设计获奖', '与财务报告相关的内部控制的设计和运行有效性得到审计', '产品销量行业第一', '公司通过了ISO9001认证', 'B', NULL),
(@pack_id, 15, '设计一个新用户注册后的Onboarding流程，最关键的指标是？', '注册页面停留时间', '激活率 (Activation Rate)，例如在1小时内完成“连接银行账户”或“录入第一张凭证”的用户比例', '注册时输入的手机号长度', '立即邀请好友的数量', 'B', NULL),
(@pack_id, 16, '在收集财务SaaS产品需求时，用户说“我需要一个按钮来导出所有数据”，深层需求是？', '按钮颜色要醒目', '害怕数据被平台锁定', '对数据的可移植性和自主控制权有要求', '需要打印数据', 'C', NULL),
(@pack_id, 17, '衡量新上线的“智能预算预警”功能是否成功，以下哪个指标最直接？', '功能的点击量 (PV)', '该功能的用户使用时长', '因预算超支导致的报销退回率是否下降', '服务器CPU负载', 'C', NULL),
(@pack_id, 18, '你的主要竞争对手推出了“AI自动做账”功能，作为PM，你应该？', '立即复制该功能并在下月上线', '忽视，认为AI不成熟', '分析其功能实质、目标用户、效果口碑，并评估自身差异化的路径', '降价50%来应对', 'C', NULL),
(@pack_id, 19, '对于SaaS财务产品，产品经理最重要的非功能性需求之一是？', '五彩斑斓的UI设计', '高可用性 (SLA 99.9%以上)', '支持50种语言', '安装包小于10MB', 'B', NULL),
(@pack_id, 20, '当你需要决定两个同样有价值的功能谁先做时，应采用什么模型？', '波士顿矩阵', 'SWOT分析', '加权评分法 (结合开发成本、用户价值、战略重要性等维度打分)', '简单投票', 'C', NULL),
(@pack_id, 21, '财务SaaS产品中的“多租户架构”意味着什么？', '产品有多个版本', '所有客户共享一套应用实例，但数据相互隔离', '每个客户拥有独立的服务器', '产品由多个公司联合开发', 'B', NULL),
(@pack_id, 22, '作为PM，你收到一个紧急需求：因为新税法实施，下个月必须修改所有客户的个税计算模块。你首先应该？', '告诉客户这是不可能的', '评估影响范围、开发工作量，并立即召集技术、运营团队制定紧急发布计划', '要求法务部门去和税务局沟通延期', '发布公告让客户手动计算', 'B', NULL),
(@pack_id, 23, '以下哪个工具最适合用于绘制SaaS财务产品的用户旅程地图 (User Journey Map)？', 'Jira', 'Figma / Miro / 流程图工具', 'GitHub', 'Postman', 'B', NULL),
(@pack_id, 24, '当产品的客户终身价值 (LTV) 小于获客成本 (CAC) 时，PM应该优先关注什么？', '增加新功能', '提升LTV (如提高续费率、增加增值服务) 或 降低CAC (优化营销渠道)', '裁员', '举办更多发布会', 'B', NULL),
(@pack_id, 25, '一个简洁、面向会计的SaaS财务产品界面，其核心设计原则是？', '动画效果炫酷', '高效、准确、减少认知负荷', '模仿游戏界面', '信息越密集越好', 'B', NULL),
(@pack_id, 26, '在敏捷开发中，Product Backlog的梳理工作通常由谁负责？', '开发主管', '测试主管', '产品经理', '项目经理', 'C', NULL),
(@pack_id, 27, '市场部门要求在产品官网增加“免费试用”入口，作为PM你应该考虑什么？', '服务器会不会崩溃', '试用版本如何限制功能范围，防止被滥用', '试用版数据如何与正式版衔接', '以上都是', 'D', NULL),
(@pack_id, 28, '你的财务SaaS产品，客户API调用量突然暴增10倍，但付费客户数没变，最可能的原因是？', '系统被攻击', '客户中有个开发者写了死循环脚本', '新版本有Bug导致重复调用', '以上都有可能', 'D', NULL),
(@pack_id, 29, '财务SaaS产品提供“电子会计档案”功能，这对客户的核心价值是？', '节省纸张', '满足电子会计凭证归档的法律合规要求，并方便检索', '看起来更科技', '增加存储成本', 'B', NULL),
(@pack_id, 30, '在用户故事中，格式通常是：“作为一个[角色]，我想要[功能]，以便[价值]”。对于“发票认证”，一个用户故事是？', '作为一个系统，我想要处理数据', '作为一个会计，我想要批量勾选发票进行认证，以便在申报期内高效完成进项税抵扣', '作为一个老板，我想要看到所有发票', '作为一个程序员，我想要写好API', 'B', NULL),
(@pack_id, 31, '以下哪个不是SaaS产品常用的销售模式？', '产品驱动增长 (PLG)', '销售驱动增长 (SLG)', '渠道驱动增长 (CLG)', '硬件驱动增长 (HLG)', 'D', NULL),
(@pack_id, 32, '你的财务SaaS产品进入了成熟期，客户增长放缓，此时产品策略重心应转向？', '大力开发新功能吸引新客户', '提升客户留存、深耕交叉销售和向上销售', '削减所有研发预算', '重新从零开始开发新产品', 'B', NULL),
(@pack_id, 33, '在需求评审会上，开发人员指出某个需求技术实现极其困难，价值却一般，作为PM你应该？', '坚持必须做，因为客户要求', '立即取消该需求', '与开发探讨是否有替代方案，或用数据重新评估其价值与投入比，做出妥协或调整', '上报给CEO裁决', 'C', NULL),
(@pack_id, 34, '分析用户在产品内的行为数据，如“点击了‘自动对账’按钮但最终未完成”，这属于哪种分析方法？', 'A/B测试', '漏斗分析', '聚类分析', '回归分析', 'B', NULL),
(@pack_id, 35, '对于财务SaaS，以下哪种灾难恢复策略对客户信心影响最小？', '定期邮件通知客户备份数据', '跨区域实时数据同步，当主区域故障时自动切换', '每次故障后给客户提供优惠券', '告诉客户这是概率问题', 'B', NULL),
(@pack_id, 36, '当决定是否要开发移动端App时，应首先分析的核心场景是？', '会计是否会用手机录1000行凭证', '老板是否需要在手机上审批报销、查看现金流报表', '移动端开发成本更低', '竞争对手都有App', 'B', NULL),
(@pack_id, 37, '产品发布会上，你强调“我们的SaaS财务软件通过了ISO 27001认证”，主要想传递什么信息？', '功能很强大', '价格很公道', '信息安全管理体系非常完善，数据安全有保障', '服务态度很好', 'C', NULL),
(@pack_id, 38, '在A/B测试中，对照组和实验组各分配了50%用户，测试新“报销”流程。评估指标应选择？', '新流程页面颜色满意度', '老板对新流程的喜爱度', '从创建报销单到完成审批的平均时长', '用户是否点击了帮助按钮', 'C', NULL),
(@pack_id, 39, '作为PM，你发现某个核心功能的用户错误率很高，你应该？', '责怪用户太笨', '编写详细的使用手册推送给用户', '重新设计该功能的交互流程，使其更符合用户心智模型，并增加引导', '移除该功能', 'C', NULL),
(@pack_id, 40, '为了快速验证“银企直连”功能是否是伪需求，最低成本的方法是？', '直接投入开发', '进行一场有10个目标客户的访谈或问卷', '发布一份关于银企直连的新闻稿', '制作一个可点击的原型，观察用户反应', 'B', NULL),
(@pack_id, 41, '以下哪个不是产品经理在“产品上线后”的核心职责？', '监控核心数据指标', '处理紧急线上故障', '收集用户反馈', '亲自为所有客户提供技术支持 (应由客服/技术支持团队负责)', 'D', NULL),
(@pack_id, 42, '你的财务SaaS产品需要升级“固定资产折旧”功能以支持更多折旧方法，这属于哪种类型的需求？', '功能增强需求', '合规性需求', '技术债务偿还', '数据迁移需求', 'A', NULL),
(@pack_id, 43, '对于SaaS财务产品，“月度经常性收入 (MRR)”的计算公式是？', '当月所有合同金额总和', '当月所有订阅客户的订阅费总和', '当月新客户签约金额', '当月客户续约金额', 'B', NULL),
(@pack_id, 44, '当你的产品被大企业客户列入采购短名单，他们通常会发出什么文件要求你详细填写？', '产品白皮书', '安全与合规性调查问卷 / RFP', '用户使用手册', '商业计划书', 'B', NULL),
(@pack_id, 45, '产品路线图应该以什么为核心来组织？', '技术架构升级', '用户问题或业务价值', '代码行数', '人员招聘计划', 'B', NULL),
(@pack_id, 46, '一个SaaS财务产品增长的核心飞轮是：好的产品→更多客户→更多收入→更多研发投入→更好的产品。PM在其中最关键的角色是？', '提高广告投放ROI', '确保收入增长', '确保产品真正解决客户问题，驱动“好的产品”这一环', '招聘更多程序员', 'C', NULL),
(@pack_id, 47, '客户成功团队反馈，很多客户在购买后第三个月就停止使用，你应该关注什么指标？', '月流失率', '三个月留存率', '注册率', '客户推荐值 (NPS)', 'B', NULL),
(@pack_id, 48, '在规划产品的“开放平台”时，除了API文档，最重要的配套产出是？', '精美的API控制台', '沙箱测试环境和开发者支持社区', '线下开发者大会', '竞品分析报告', 'B', NULL),
(@pack_id, 49, '对于财务SaaS产品，以下哪种市场推广方式通常最有效果？', '电视广告', '行业会议、知识图谱、案例白皮书等思想领导力内容', '楼宇电梯广告', '群发垃圾邮件', 'B', NULL),
(@pack_id, 50, '作为SaaS财务产品经理，你认为哪种思维模式最为关键？', '极致的技术极客思维', '纯粹的销售思维', '平衡商业价值、用户需求与技术可行性的产品思维', '纯粹的艺术设计思维', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业63：会计学×软件工程 → 会计系统测试工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_swe:2', 63, '会计系统测试工程师', 'major_accounting', 'major_swe', '会计学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '测试“凭证保存”功能时，输入借方100元，贷方0元，点击保存，预期结果是？', '保存成功，生成一张凭证', '系统自动在贷方补100元', '系统提示“借贷金额不平衡”，拒绝保存', '系统崩溃', 'C', NULL),
(@pack_id, 2, '以下哪个不属于黑盒测试方法？', '等价类划分', '边界值分析', '语句覆盖', '场景法', 'C', NULL),
(@pack_id, 3, '测试“期末结转损益”功能时，需要验证生成凭证的会计期间。这是一个典型的什么测试？', '界面测试', '逻辑功能测试', '性能测试', '时间/日期相关测试', 'D', NULL),
(@pack_id, 4, '对于财务系统，回归测试最核心的目的是？', '发现新功能的Bug', '评估系统性能', '确保原有功能在代码修改后没有出现问题', '测试用户界面是否美观', 'C', NULL),
(@pack_id, 5, '在设计“固定资产折旧”测试用例时，对于3月1日购入、原值12000元、残值率5%、使用年限5年的设备，采用年限平均法，4月份应计提的折旧额是？', '200元', '190元', '171元', '181元', 'B', NULL),
(@pack_id, 6, '测试“现金流量表”时，用间接法编制的，净利润为100万，计提折旧20万，经营性应收增加30万，则经营活动现金净流量应为？', '150万', '90万', '50万', '110万', 'B', NULL),
(@pack_id, 7, '对于“红字冲销”功能的测试，操作前A凭证错误金额100元，操作后，正确的验证点包括？', '生成一张-100元的红字凭证', '原错误凭证未被修改', '总账余额减少100元', '以上都是', 'D', NULL),
(@pack_id, 8, '在测试“多币种”功能时，输入一笔100美元采购，汇率6.8，系统自动折合本币680元。当汇率表在月中更新为6.9后，查询该笔已过账凭证的折合本币仍为680元。这是否正确？', '错误，应该更新为690元', '正确，历史交易应按历史汇率锁定', '错误，应该更新为680元平均价', '正确，因为美元升值了', 'B', NULL),
(@pack_id, 9, '测试“用户权限”时，新建立了一个只能“查询”凭证的角色，将其赋给一个测试用户，该用户尝试“删除”一张凭证，系统应？', '弹出确认删除对话框', '执行删除操作', '提示“没有操作权限”或类似信息，阻止删除', '静默失败', 'C', NULL),
(@pack_id, 10, '以下哪个是测试“银行对账单导入”功能的正向测试用例？', '导入一个损坏的PDF文件', '导入一个不符合格式要求的TXT文件', '导入一个符合银行标准的CSV格式对账单', '导入一个空的Excel文件', 'C', NULL),
(@pack_id, 11, '在测试“报表公式”时，定义“货币资金 = 现金 + 银行存款”。如果现金科目余额100，银行存款余额-20（透支重分类前），计算结果应为？', '80', '120', '100', '70', 'A', NULL),
(@pack_id, 12, '对于并发测试，模拟10个用户同时点击“生成月末凭证”按钮，测试重点是？', '界面是否卡顿', '是否存在数据库死锁或重复生成凭证', '哪个用户生成的最快', 'CPU使用率是否为100%', 'B', NULL),
(@pack_id, 13, '发现一个Bug：当年度累计利润超过1000万时，所得税计算错误。这个Bug的严重等级应设为？', '轻微 (Minor)', '一般 (Major)', '严重 (Critical)', '建议 (Suggestion)', 'C', NULL),
(@pack_id, 14, '测试“辅助核算”功能，验证“部门A-管理费用”的总额是否正确，最有效的测试方法是？', '随机录入几张凭证然后查询', '分别向不同部门录入费用，然后按部门辅助核算项进行汇总查询，并与手动计算值比对', '只测试界面UI是否整齐', '测试导出Excel的速度', 'B', NULL),
(@pack_id, 15, '以下哪个测试工具最适合用于财务Web系统的自动化回归测试？', 'LoadRunner', 'JUnit', 'Selenium', 'Postman (主要用于接口测试)', 'C', NULL),
(@pack_id, 16, '测试“年结”功能时，年结后新年度第一期的期初余额应与上一年度最后一期的期末余额相等。这测试的是？', '界面一致性', '数据完整性', '业务逻辑正确性', '数据结转的正确性', 'D', NULL),
(@pack_id, 17, '对于“打印凭证”功能，测试输出PDF文件的显示效果，属于？', '功能测试', '接口测试', '界面/易用性测试 (也属于功能验证的一部分)', '安全性测试', 'C', NULL),
(@pack_id, 18, '测试环境与生产环境最关键的差异是？', '软件版本不同', '数据量级和真实性不同', '硬件品牌不同', '屏幕分辨率不同', 'B', NULL),
(@pack_id, 19, '在提交Bug报告时，哪项信息对于开发人员定位问题最为关键？', 'Bug发现人的姓名', 'Bug的发现日期', '清晰的重现步骤和相关的日志/截图', 'Bug的严重等级', 'C', NULL),
(@pack_id, 20, '测试“发票查验”接口，模拟网络超时的情况，应设计为？', '正向测试用例', '负向测试用例 (异常场景)', '冒烟测试用例', '性能测试用例', 'B', NULL),
(@pack_id, 21, '当测试人员发现一个概率性出现的Bug（如10次操作出现1次），以下哪种做法最不可取？', '详细记录操作步骤和环境，尝试寻找规律', '忽略它，因为不能稳定重现', '在Bug报告中详细说明其偶发性，并附上复现的概率和尝试次数', '与开发沟通，分享发现的线索', 'B', NULL),
(@pack_id, 22, '测试“应收账龄分析表”，客户A有一笔100天账期的账款和一笔20天账期的账款，截止日为今天。账龄区间为1-30天、31-90天、90天以上，那么该客户的账龄分布应为？', '100%在90天以上', '50%在31-90天，50%在90天以上', '20天账款在1-30天，100天账款在90天以上', '两笔都在31-90天', 'C', NULL),
(@pack_id, 23, '对于会计系统，修改历史已结账期间的数据，系统应有的行为是？', '允许直接修改', '提示“已结账，如需修改请执行反结账操作”', '自动修改并记录日志', '让DBA直接改数据库', 'B', NULL),
(@pack_id, 24, '测试“数据导出到Excel”功能，当导出100万行数据时，系统内存溢出。这暴露了什么类型的问题？', '逻辑错误', '性能和稳定性问题', '界面显示问题', '计算精度问题', 'B', NULL),
(@pack_id, 25, '以下哪个场景最好使用探索性测试？', '回归测试', '冒烟测试', '对新开发的复杂功能进行深度测试，没有事先编写详尽用例', '性能基准测试', 'C', NULL),
(@pack_id, 26, '测试“分摊公共成本”功能：将总部100万IT费用按各子公司营业收入比例分摊。子公司A收入200万，B收入300万，C收入500万。A应分摊多少？', '20万', '50万', '20万', '100万', 'C', NULL),
(@pack_id, 27, '在测试“预算控制”时，设置部门A年预算12万，1月报销2万，2月申请报销11万，系统应？', '都允许通过', '允许1月，2月申请时提示“超出年度预算”', '两次都不允许', '只允许2月的', 'B', NULL),
(@pack_id, 28, '测试“报表联查明细”功能，点击资产负债表中“应收账款”项目旁的1000元，应该能打开什么？', '帮助文档', '构成这1000元的所有销售发票和收款单的明细列表', '公司组织结构图', '系统设置页面', 'B', NULL),
(@pack_id, 29, '对于财务系统的安全性测试，以下哪个是首要测试点？', '登录密码是否可以用弱口令', '是否防止跨站脚本攻击 (XSS)', '是否进行权限校验防止越权操作', '以上都是', 'D', NULL),
(@pack_id, 30, '在持续集成环境中，每次代码提交后自动执行的测试是？', '全量回归测试', '验收测试', '冒烟测试/构建验证测试', '压力测试', 'C', NULL),
(@pack_id, 31, '测试“工资计算”模块，已知应发合计10000，社保1000，公积金500，个税起征点5000，不考虑专项附加扣除，税率10%，速算扣除数210，则实发工资应为？', '8500', '8000', '8360', '9000', 'C', NULL),
(@pack_id, 32, '为了测试凭证“摘要”字段的长度限制为100个字符，应该使用什么方法？', '等价类：输入0， 50， 100， 101个字符', '边界值分析：输入99， 100， 101个字符', '错误推测法', '正交试验法', 'B', NULL),
(@pack_id, 33, '测试数据准备中，需要构造一个“资产负债表不平”的场景，最简单的构造方法是？', '录入一张借方金额和贷方金额相等的凭证', '只录入一张借方凭证，不录入贷方', '删除一个总账科目', '运行期末结转', 'B', NULL),
(@pack_id, 34, '测试“重新计算”功能，在对历史凭证的税率进行批量修改后，点击重新计算，应验证什么？', '所有凭证的编号不变', '所有受影响的税额和凭证总额被正确更新', '系统日志是否记录', '用户界面是否闪烁', 'B', NULL),
(@pack_id, 35, '以下哪个不属于性能测试的范畴？', '响应时间', '吞吐量', '功能正确性', '并发用户数', 'C', NULL),
(@pack_id, 36, '在测试“双因素认证”时，输入正确的密码和错误的短信验证码，预期结果是？', '登录成功并跳过验证', '登录成功但记录一个警告', '登录失败，提示验证码错误', '锁定账户', 'C', NULL),
(@pack_id, 37, '发现一个Bug：在Chrome浏览器上，报表导出按钮失效，但在Edge上正常。这属于？', '数据库Bug', '兼容性Bug', '性能Bug', '需求Bug', 'B', NULL),
(@pack_id, 38, '测试“分级审批”工作流，一个超过10万的付款申请需要经过“部门经理->财务总监->CEO”三级审批。测试用例“部门经理审批通过，财务总监驳回”后，申请单状态应是？', '回到部门经理', '已驳回 (流程结束)', '直接到CEO', '已支付', 'B', NULL),
(@pack_id, 39, '自动化测试脚本维护成本最高的场景是？', '核心业务逻辑很少变化', '用户界面频繁改动', '数据库结构稳定', 'API接口定义不变', 'B', NULL),
(@pack_id, 40, '在进行“库存商品”成本计算的测试中，系统采用月末一次加权平均法。月初存货100个，单价10元；本月采购200个，单价12元；本月销售250个，则销售成本应为？', '2500', '3000', '2833', '3200', 'C', NULL),
(@pack_id, 41, '对于“数据备份”功能的测试，最重要的验证点是？', '备份过程不影响用户操作', '备份文件大小', '使用备份文件能否成功恢复系统，且数据完整', '备份界面的美观度', 'C', NULL),
(@pack_id, 42, '在测试“自动生成凭证模板”时，通过采购入库单生成凭证：借：原材料，贷：物资采购。测试人员发现如果入库单数量为0，系统也生成凭证。这是一个什么类型的Bug？', '性能问题', '逻辑校验缺失 (输入有效性验证)', '界面错别字', '安全漏洞', 'B', NULL),
(@pack_id, 43, '测试一个会计年度中途启用系统，录入期初余额时，累计借方和累计贷方的作用是？', '美化报表', '确保资产负债表期初数是平的，并能计算出正确的本年累计发生数', '计算固定资产折旧', '无关紧要，可以不录', 'B', NULL),
(@pack_id, 44, '测试“反审核”功能，当凭证已经被记入总账后，尝试反审核，系统应？', '允许反审核，并自动更新总账', '提示“凭证已记账，请先反记账”或类似信息', '直接忽略操作', '删除该凭证', 'B', NULL),
(@pack_id, 45, '以下哪种缺陷管理工具最常用？', 'Jira', 'Photoshop', 'Visual Studio', 'Excel', 'A', NULL),
(@pack_id, 46, '测试“多组织”架构下的财务合并，A公司是B公司的母公司，内部交易：A卖给B 100万货物，成本80万。在合并报表时，应抵消的存货未实现利润是多少？（假设B尚未对外销售）', '20万', '100万', '80万', '20万', 'D', NULL),
(@pack_id, 47, '测试人员的一个重要职责是“质量门禁”，这意味着？', '测试人员决定是否发布版本', '测试是产品发布前的最后一道防线，需验证产品质量达到发布标准', '测试人员负责写代码', '测试人员负责设计产品', 'B', NULL),
(@pack_id, 48, '测试“自动对账”功能，银行流水有一笔1000元收款，系统中有三张发票：A发票300元，B发票300元，C发票400元，用户选择“自动匹配”规则为“全额匹配”，结果应该是？', '自动匹配A和B', '自动匹配C', '无法自动全额匹配，需要人工干预或部分匹配', '自动将1000元与A、B、C全部匹配', 'C', NULL),
(@pack_id, 49, '在测试“财务报表生成”时，生成了PDF，但发现“单位：元”写成了“单位：万元”，这是一个什么级别的Bug？', '致命的', '严重的 (数据错误)', '一般的 (功能缺陷)', '轻微的 (文本错误，但影响专业形象)', 'D', NULL),
(@pack_id, 50, '一个优秀的会计系统测试工程师，除了测试技能，最应具备的素质是？', '精通多种编程语言', '深刻理解会计原理和业务流程', '出色的UI设计能力', '极强的销售能力', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业64：会计学×市场营销 → 营销财务分析
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_marketing:0', 64, '营销财务分析', 'major_accounting', 'major_marketing', '会计学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '营销财务分析的基本公式：ROI (投入产出比) 等于？', '(总收入 - 总成本) / 总成本', '(销售收入 - 营销成本) / 营销成本', '销售收入 / 营销成本', '营销成本 / 销售收入', 'B', NULL),
(@pack_id, 2, '计算一次618促销活动的获客成本 (CAC)，如果总营销费用为100万，带来新客户1万人，则CAC为？', '1000元', '100元', '10元', '1元', 'B', NULL),
(@pack_id, 3, '在评估一个视频广告的效果时，除了播放量，最具财务价值的数据是？', '点赞数', '评论数', '转化率 (点击广告后实际购买的比例)', '完播率', 'C', NULL),
(@pack_id, 4, '客户终身价值 (LTV) 大于获客成本 (CAC) 是业务健康的基础，一般建议LTV:CAC的比例至少为？', '1:1', '3:1', '10:1', '0.5:1', 'B', NULL),
(@pack_id, 5, '在做营销渠道损益分析时，某个渠道贡献了100万销售额，商品毛利率30%，该渠道的直接营销成本为20万，则该渠道的边际利润为？', '30万', '20万', '10万', '50万', 'C', NULL),
(@pack_id, 6, '“媒体混合建模”的主要目的是？', '设计更好看的广告', '量化不同营销渠道(电视、搜索、社交等)对销售额的贡献和ROI', '预测股票价格', '管理营销团队', 'B', NULL),
(@pack_id, 7, '一个营销活动产生了50万销售收入，其中20万是如果没有活动也会发生的“基线销售额”，那么这个活动带来的“增量销售额”是？', '50万', '20万', '70万', '30万', 'D', NULL),
(@pack_id, 8, '在评估“满200减30”的促销活动时，如果客户本打算买160元，为了凑单买了50元的袜子，最终实付180元。这个活动带来的“增量收入”中，袜子的部分应视为？', '完全增量', '部分增量', '完全增量，因为客户原本不打算买袜子', '没有增量', 'C', NULL),
(@pack_id, 9, '以下哪个指标最适合衡量品牌营销活动的长期效果？', '单次点击成本 (CPC)', '千次展示成本 (CPM)', '品牌搜索指数或品牌忠实客户数量的变化', '七天内的转化率', 'C', NULL),
(@pack_id, 10, '营销财务分析中，用来衡量收回营销投资所需时间的指标是？', 'ROI', '回收期', 'IRR', 'NPV', 'B', NULL),
(@pack_id, 11, '如果公司采用“归因分析”为不同营销触点分配功劳，最后点击归因模型的缺点是？', '计算复杂', '过度高估了转化前最后一个渠道的价值，忽略了辅助渠道的作用', '不公平对待搜索引擎广告', '无法在Excel中计算', 'B', NULL),
(@pack_id, 12, '企业花费100万投放电视广告，带来了2000万的搜索指数增长和300万的直接电话咨询。这些“间接”效果在财务上应该如何处理？', '忽略不计', '尝试量化其带来的后续销售额，进行更全面的ROI评估', '全部归为品牌知名度提升，不计算ROI', '只计算电话咨询的转化', 'B', NULL),
(@pack_id, 13, '当商品折扣力度从8折变为7折时，销量需要增加多少才能维持相同的总毛利额？（假设成本不变，原价100，成本60，8折时利润20元/件）', '12.5%', '25%', '33.3%', '100%', 'D', NULL),
(@pack_id, 14, '在编制年度营销预算时，采用“零基预算法”的核心思想是？', '在上一年预算基础上增加10%', '每个营销项目都从零开始论证其必要性和投入产出', '预算金额等于上一年销售额的5%', '将所有预算平均分配给各个渠道', 'B', NULL),
(@pack_id, 15, '一个电商店铺，转化率为2%，客单价为200元，每个访客的流量成本为1元。则每个订单的净营销利润（不考虑商品成本）是？', '4元', '3元', '2元', '150元', 'D', NULL),
(@pack_id, 16, '用来评估促销活动是否蚕食了其他产品销量的指标是？', '增量ROI', '蚕食率', '复购率', '点击率', 'B', NULL),
(@pack_id, 17, '对于采用订阅模式的产品，营销财务分析中最重要的长期指标是？', '月活跃用户', '客户生命周期价值 (LTV) 和 流失率', '单次下载成本', '应用商店评分', 'B', NULL),
(@pack_id, 18, '在对不同渠道的营销支出进行分配时，应基于哪个原则？', '平均分配', '根据各渠道历史或预测的边际ROI进行分配，使各渠道的最后一元钱的ROI相等', '给最喜欢的渠道最多预算', '给最贵的渠道最多预算', 'B', NULL),
(@pack_id, 19, '“营销财务分析”与“财务会计”最核心的区别在于？', '使用不同的货币', '前者关注未来和增量，后者关注历史和整体', '前者不需要计算', '后者不关注成本', 'B', NULL),
(@pack_id, 20, '分析“双十一”大促，销售额是平日的10倍，但利润只有平日的2倍，可能的原因是？', '商品成本上升', '营销和折扣成本过高', '退货率增加', '以上都是', 'D', NULL),
(@pack_id, 21, '公司推出一个推荐奖励计划：老用户推荐新用户，双方各得20元代金券。在计算该计划的CAC时，应该计入哪些成本？', '新用户的20元代金券', '老用户的20元代金券', '活动开发和技术支持费用', '以上都是', 'D', NULL),
(@pack_id, 22, '在评估品牌内容营销时，一篇微信公众号软文的CPM是100元，获得了10万阅读，那么这篇文章的成本是？', '100元', '1000元', '10000元', '10元', 'C', NULL),
(@pack_id, 23, '某营销活动，ROI为50%，这意味着？', '每投入1元，产出1.5元收入', '每投入1元，产出0.5元利润', '每投入1元，产出0.5元收入', '每投入1元，产出0.5元净利润', 'D', NULL),
(@pack_id, 24, '营销财务分析师建议削减一个ROI为0.8的渠道预算，但营销总监不同意，因为该渠道带来了巨大的品牌曝光。此时应如何调和？', '完全听从营销总监', '完全听从财务分析师', '尝试量化品牌曝光的长期价值，进行综合评估，可能该渠道的综合ROI高于表面值', '停止所有营销活动', 'C', NULL),
(@pack_id, 25, '在分析促销活动的“价格弹性”时，如果需求价格弹性系数为-2，降价10%，预期销量增加？', '10%', '-20%', '20%', '-10%', 'C', NULL),
(@pack_id, 26, '一个B2B公司，平均合同金额100万，销售周期6个月，营销团队每月花费10万获取100个潜在客户 (Leads)，其中2个最终成交。该营销渠道的CAC是？', '10万', '20万', '30万', '60万', 'C', NULL),
(@pack_id, 27, '以下哪个工具最适合进行营销活动的财务建模和预测？', 'Photoshop', 'Excel / Google Sheets', 'Premiere Pro', 'AutoCAD', 'B', NULL),
(@pack_id, 28, '在分析客户流失时，发现客户在第一年流失率是50%，第二年30%，第三年20%，那么这个群体的平均客户生命周期是多少？', '1年', '2年', '约2.5年', '3年', 'C', NULL),
(@pack_id, 29, '营销财务分析报告中，计算“营销贡献毛益”时，应从销售收入中减去哪些成本？', '仅商品销售成本', '商品销售成本和直接营销费用', '商品销售成本、直接营销费用和分摊的间接费用', '商品销售成本、直接营销费用、以及订单履行费用', 'B', NULL),
(@pack_id, 30, '使用“边际分析”来决定是否追加广告预算时，只要满足什么条件就应该追加？', '广告的边际成本为正', '广告的边际收入大于边际成本', '广告的边际收入为正', '广告的边际成本为负', 'B', NULL),
(@pack_id, 31, '一个电商网站，平均购物车放弃率为70%，通过发送邮件挽回，能恢复其中20%的放弃订单。如果平均订单价值为500元，每次邮件营销成本为0.1元，发送对象为1000个放弃购物车的用户，则邮件营销的ROI是多少？（忽略商品成本）', '100%', '900%', '9900%', '700%', 'D', NULL),
(@pack_id, 32, '对于快速消费品 (FMCG) 行业，衡量促销活动对品牌健康的长期影响，除了销量，还应监测？', '促销期间的广告颜色', '促销前后的品牌认知度、推荐度 (NPS) 和价格敏感度', '竞品是否也在做促销', '天气情况', 'B', NULL),
(@pack_id, 33, '在一次买一送一的促销中，商品原价20元，成本10元。活动期间，单个顾客支付20元得到两件商品，请问该活动的边际利润率是多少？', '50%', '0%', '50%', '100%', 'B', NULL),
(@pack_id, 34, '在进行年度营销规划时，SWOT分析中的“T”代表？', '优势', '劣势', '机会', '威胁', 'D', NULL),
(@pack_id, 35, '营销财务分析中，用来评估一次营销活动带来的长期利润流的净现值的方法是？', 'NPV (净现值) 分析', 'P&L 分析', '资产负债表分析', '库存周转率分析', 'A', NULL),
(@pack_id, 36, '如果公司希望提高品牌忠诚度，以下哪个指标最重要？', '新客户获取率', '客户复购率和推荐率', '单次交易金额', '广告点击率', 'B', NULL),
(@pack_id, 37, '分析“微信朋友圈广告”的效果，用户可以直接点击“购买”。从点击到购买，平均需要3步。如果总的广告到购买的转化率为1%，平均每一步的转化率约为？', '1%', '21.5%', '33%', '50%', 'B', NULL),
(@pack_id, 38, '营销财务分析师发现，某渠道的CPA (单次行动成本) 持续上升，而行动质量 (如注册后首购率) 下降，合理的建议是？', '加大该渠道投入，以量取胜', '暂停或削减该渠道投入，并寻找原因', '忽略质量，只看CPA', '提高产品价格', 'B', NULL),
(@pack_id, 39, '评估线下路演活动的效果，最难量化的指标是？', '现场收集的销售线索数量', '活动当天的现场销售额', '活动对品牌声誉和长期口碑的潜移默化影响', '发放的传单数量', 'C', NULL),
(@pack_id, 40, '公司有一款产品成本100元，定价150元。现在做“第二件半价”活动，顾客买两件实付多少？毛利率是多少（相对总收入）？', '实付225，毛利率33.3%', '实付225，毛利率55.6%', '实付225，毛利率约11.1%', '实付150，毛利率0%', 'C', NULL),
(@pack_id, 41, '在营销财务分析中，用来衡量一个营销活动是否成功的“盈亏平衡点”是指？', '收入等于广告支出的点', '收入等于广告支出加上商品成本及其他变动成本的点', '销售数量达到1000件的点', '活动结束的时间点', 'B', NULL),
(@pack_id, 42, '对于SaaS产品，营销人员在试用期结束后给用户发送优惠邮件。财务分析应重点关注该邮件的？', '打开率', '从免费试用到付费的转化率', '邮件大小', '发送时间点', 'B', NULL),
(@pack_id, 43, '一个营销项目，预计未来三年现金流为：-100万（第一年），+60万（第二年），+60万（第三年）。则投资回收期是？', '1年', '1.67年', '1.67年', '3年', 'C', NULL),
(@pack_id, 44, '当产品处于成长期，市场份额快速扩张时，营销财务分析的重点应是？', '最大化短期利润', '抢占市场，可以容忍短期亏损，关注CAC和LTV', '削减所有营销费用', '提高产品价格', 'B', NULL),
(@pack_id, 45, '在Excel中，用来计算一组现金流的内部收益率 (IRR) 的函数是？', '=SUM()', '=AVERAGE()', '=IRR()', '=VLOOKUP()', 'C', NULL),
(@pack_id, 46, '一个营销活动，针对的是高价值客户。在分析时，应将他们的消费额与哪个组对比？', '随机用户组', '匹配的对照组 (同等历史价值但未收到营销信息的用户)', '所有新用户', '内部员工组', 'B', NULL),
(@pack_id, 47, '如果产品的需求价格弹性为-0.5，想要通过降价来增加收入，结果会怎样？', '收入一定增加', '收入一定减少', '收入减少，因为需求增加的比例小于降价的比例', '收入不变', 'C', NULL),
(@pack_id, 48, '“营销组合建模”中，常用来处理季节性波动的方法是？', '忽略季节性', '引入季节性虚拟变量或进行季节调整', '只分析旺季数据', '使用对数线性模型', 'B', NULL),
(@pack_id, 49, '预算与实际的差异分析中，一个营销渠道的费用节约了20%，但销售额也下降了30%，这说明？', '节约很成功', '销售额下降是外部因素', '费用节约是以牺牲业绩为代价的，ROI可能下降了', '应该进一步削减费用', 'C', NULL),
(@pack_id, 50, '作为营销财务分析师，最重要的软技能是？', '编程能力', '沟通和讲故事的能力，将复杂数据转化为业务建议', '平面设计能力', '多语言能力', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业65：会计学×市场营销 → 促销效益评估
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_marketing:1', 65, '促销效益评估', 'major_accounting', 'major_marketing', '会计学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '评估“满100减30”促销，最核心的财务指标是？', '活动参与人数', '增量利润 (或增量ROI)', '客单价提升幅度', '发放的优惠券数量', 'B', NULL),
(@pack_id, 2, '计算一次促销活动的增量ROI时，分母应为？', '促销商品原价总额', '促销活动带来的增量销售收入', '促销活动的全部成本 (折扣让利+广告+物料等)', '日常运营成本', 'C', NULL),
(@pack_id, 3, '为了准确评估促销效果，需要设立对照组，对照组应设置为？', '未收到任何促销信息的同质用户群', '收到促销信息但未购买的用户群', '购买了最贵商品的用户群', '内部员工群', 'A', NULL),
(@pack_id, 4, '促销活动导致“囤货”现象，即用户提前购买未来几个月的需求量。这会如何影响长期利润？', '正面影响，提高了短期销量', '负面影响，会透支未来需求，导致后续销量下降', '无影响', '取决于产品类型', 'B', NULL),
(@pack_id, 5, '某商品原价100元，成本60元。买二送一促销，顾客支付200元得3件。单件商品的平均毛利率为？', '40%', '30%', '20%', '10%', 'D', NULL),
(@pack_id, 6, '评估“新用户首单立减20元”活动，除了计算CAC，还应重点评估？', '新用户的首单金额', '新用户的二次购买率和LTV', '新用户的地理分布', '新用户的性别比例', 'B', NULL),
(@pack_id, 7, '“促销效益评估”与“常规销售分析”最大的不同是？', '前者更关注同比数据', '前者需要剥离促销带来的“增量”而非“总量”', '后者不需要数据', '前者只关注成本', 'B', NULL),
(@pack_id, 8, '当一个促销活动同时包含“满减”和“赠品”时，如何计算总折扣成本？', '只计算满减', '只计算赠品成本', '计算满减的让利金额 + 赠品的采购成本', '计算满减的让利金额 + 赠品的零售价', 'C', NULL),
(@pack_id, 9, '你发现一个促销活动，ROI看起来很高，但大部分销量来自老客户的自然购买（即使没促销他们也会买）。你的结论是？', '活动非常成功', '活动ROI被高估，实际增量效果有限', '应立即停止活动', '奖励营销团队', 'B', NULL),
(@pack_id, 10, '衡量促销活动对“品牌资产”可能造成的损害，应监测哪个指标的变化？', '活动期间的单日销售额', '促销结束后未参与促销时的销量恢复情况及价格敏感度', '竞争对手的促销力度', '原材料价格', 'B', NULL),
(@pack_id, 11, '一组数据：促销期间销售1000件，促销前一周销售200件，促销后一周销售150件。不考虑趋势，估算促销带来的增量销量约为？', '1000 - 200 = 800', '1000 - 150 = 850', '1000 - (200+150)/2 = 825', '1000件', 'C', NULL),
(@pack_id, 12, '优惠券核销率为20%，印发了10万张，每张券面值10元，制作和分发成本共2万元。则每核销一张券的总成本是？', '10元', '11元', '12元', '13元', 'B', NULL),
(@pack_id, 13, '一次“分享得优惠券”活动，分享带来1000个新用户，其中100人最终购买，平均订单金额200元，活动总成本（含优惠券和技术开发）5万元，这些新用户的CAC是？', '200元', '500元', '50元', '500元', 'D', NULL),
(@pack_id, 14, '在分析促销活动对利润的影响时，除了直接促销成本，还应考虑？', '额外履单成本 (如仓储、物流)', '客服咨询量增加带来的成本', '可能的退货增加', '以上都是', 'D', NULL),
(@pack_id, 15, '一个促销活动，内部员工利用漏洞大量薅羊毛，评估报告应如何处理？', '计入正常销售', '剔除这部分异常数据，并单独报告风险和损失', '奖励这些员工', '忽略不计', 'B', NULL),
(@pack_id, 16, '对于会员日促销，如何区分是会员日效应还是促销本身的增量？', '无法区分', '与同等级的非会员日促销活动进行对比', '只分析非会员的购买行为', '取消会员日', 'B', NULL),
(@pack_id, 17, '促销活动中，“价格锚点”策略会设置一个较高的原价，评估时，这个虚高原价会导致什么问题？', '夸大折扣力度', '让用户觉得更划算', '使计算出的ROI失真 (因为折扣成本被高估)', '以上都是', 'D', NULL),
(@pack_id, 18, '测量促销活动的“盈亏平衡销量提升率”，已知正常毛利率30%，促销折扣20%，则销量需提升多少才能保持利润不变？', '20%', '30%', '100%', '200%', 'D', NULL),
(@pack_id, 19, '比较两个促销活动：A活动ROI为5，B活动ROI为2，但A活动仅覆盖100人，B覆盖10000人。从公司整体角度，应优先？', '总是选A', '总是选B', '计算两者带来的总利润增量，选更高的那个', '放弃促销', 'C', NULL),
(@pack_id, 20, '评估“双十一”大型促销的整体效益，除了利润，还应评估？', '对前后一个月销量的虹吸效应', '对供应链和物流系统的压力', '退货率和售后成本', '以上都是', 'D', NULL),
(@pack_id, 21, '在设计促销效益评估的KPI时，以下哪个属于“先行指标”？', '最终销量', '优惠券领取数量或活动页面浏览量', '退货数量', '季度利润', 'B', NULL),
(@pack_id, 22, '数据分析显示，某促销活动的增量客户主要来自于竞争对手的客户流失，这对公司长期而言意味着什么？', '零和博弈，可能引发价格战', '市场总需求没有增加', '需要持续促销才能留住这些客户', '以上都是', 'D', NULL),
(@pack_id, 23, '对于快速消费品，一次“加量不加价”的促销，对财务的影响是？', '增加单位成本，降低毛利率', '可能增加销量', '如果销量增加足够多，总利润可能增加', '以上都是', 'D', NULL),
(@pack_id, 24, '评估促销活动的“客户质量”，以下哪个指标最重要？', '活动期间消费金额', '活动后一段时间的复购率和活跃度', '是否使用优惠券', '性别', 'B', NULL),
(@pack_id, 25, '促销活动结束后，销量不仅没有回落，反而继续上升，这通常说明什么？', '促销非常失败', '促销成功吸引了新客户并提升了品牌认知', '数据统计错误', '产品即将下架', 'B', NULL),
(@pack_id, 26, '使用双重差分法 (DID) 评估促销效果，需要的两组数据是？', '促销组和对照组在促销前和促销后的业绩数据', '促销组和对照组的利润数据', '促销前和促销后的总销售额', '不同产品线的数据', 'A', NULL),
(@pack_id, 27, '一次促销中，满减门槛设置过高，导致大部分用户无法享受，这可能导致什么问题？', '促销成本过高', '促销效果不明显，ROI过低', '用户满意度极高', '客单价大幅下降', 'B', NULL),
(@pack_id, 28, '如果一个促销活动的增量ROI为0.5，意味着什么？', '每投入1元，赚0.5元利润', '每投入1元，带来0.5元收入', '每投入1元，亏0.5元', '每投入1元，赚0.5元利润', 'A', NULL),
(@pack_id, 29, '在评估“免费试用”促销时，最重要的转换指标是？', '试用申请数', '试用后转化率', '试用用户的平均使用时长', '试用用户的转化率及转化后的LTV', 'D', NULL),
(@pack_id, 30, '发现促销期间，某大客户采购量巨大，但享受了大幅折扣。评估时，应如何看待这一单？', '视为巨大的成功', '单独分析该客户的增量贡献和常规利润损失', '给销售团队发大奖', '取消所有折扣', 'B', NULL),
(@pack_id, 31, '“促销疲劳”是指？', '消费者对频繁的促销失去兴趣，响应度下降', '员工对执行促销感到疲惫', '促销系统崩溃', '竞品跟进促销', 'A', NULL),
(@pack_id, 32, '为了评估“限时秒杀”的稀缺性效果，除了销量，还应分析？', '秒杀商品的页面停留时长', '秒杀开始后几秒钟内的完成率', '秒杀商品的评价', '客服咨询量', 'B', NULL),
(@pack_id, 33, '一个促销活动，总成本10万元，带来了100万元的增量销售收入，平均毛利率20%，则该活动的增量利润为？', '10万元', '10万元', '20万元', '0万元', 'B', NULL),
(@pack_id, 34, '促销评估报告中，展示“促销期间每天的销售额与基线销售额对比图”，主要目的是？', '美观', '直观显示促销带来的销量峰值和前后时期的销量低谷', '显示天气变化', '展示员工考勤', 'B', NULL),
(@pack_id, 35, '对于奢侈品品牌，频繁的折扣促销可能带来的最大风险是？', '利润下降', '品牌形象受损，失去高端定位', '员工工作量增加', '库存积压', 'B', NULL),
(@pack_id, 36, '评估“老客户专享”促销时，对照组的最佳选择是？', '新客户', '历史行为相似但未参加此次促销的老客户', '所有客户', '内部员工', 'B', NULL),
(@pack_id, 37, '促销活动的“自我蚕食”是指？', '促销活动吸引了太多客户导致服务器崩溃', '促销商品的销量增长来自于本品牌其他非促销商品的销量下降', '竞品抄袭促销方案', '客户投诉增多', 'B', NULL),
(@pack_id, 38, '如果要评价一次促销活动的长期财务影响，应建立什么模型？', '线性回归模型', '客户生命周期价值模型 (考虑促销获取和留存客户)', '库存周转模型', '广告点击率模型', 'B', NULL),
(@pack_id, 39, '当产品本身的季节性很强时，评估促销活动必须考虑的因素是？', '天气', '历年同期的自然增长率', '促销员颜值', '包装颜色', 'B', NULL),
(@pack_id, 40, '在AB测试中，为了评估“满199减30”的效果，实验组看到该优惠，对照组应该看到？', '满299减50', '没有任何全场满减优惠', '九折优惠', '买一送一', 'B', NULL),
(@pack_id, 41, '促销活动导致退货率从平时的5%上升到15%，评估利润时应？', '忽略退货', '将退货成本计入促销总成本', '减去退货损失，并分析退货原因', '只计算已发货订单', 'C', NULL),
(@pack_id, 42, '评估“社交拼团”促销（如3人成团享5折），除计算ROI外，还应重点关注？', '拼团发起者的社交影响力', '新客获取比例', '团员之间的购买关联性', '以上都是', 'D', NULL),
(@pack_id, 43, '如果一个促销活动严重依赖于“特价清仓”，那么它对利润的影响通常是？', '正向，因为清理了库存', '负向，因为销售价格低于成本', '取决于库存持有成本与清仓损失的比较', '以上都是', 'C', NULL),
(@pack_id, 44, '对于电商促销，评估“加购”和“收藏”数据的主要价值在于？', '这些行为没有价值', '可以作为预测最终销量的先行指标', '用来给用户发垃圾邮件', '美化数据报告', 'B', NULL),
(@pack_id, 45, '一份优秀的促销效益评估报告，其结论和建议应该基于？', '感觉和直觉', '数据分析和严谨的增量剥离', '销售部门的要求', '最乐观的预测', 'B', NULL),
(@pack_id, 46, '促销评估中，“优惠券使用时间分布”图可以帮助分析？', '用户熬夜情况', '优惠券的核销高峰期和用户购物习惯', '服务器性能', '客服响应速度', 'B', NULL),
(@pack_id, 47, '如果一个企业同时有线上和线下门店，促销活动应该评估？', '仅线上', '仅线下', '线上和线下的互相影响和总体的增量效果', '分开评估，互不相关', 'C', NULL),
(@pack_id, 48, '以下哪种促销方式最难评估其增量效果？', '直接打折', '买一送一', '线上品牌广告+线下二维码领券 (多渠道，难以归因)', '短信发送优惠码', 'C', NULL),
(@pack_id, 49, '促销活动结束后，你应该建议下一次的促销力度应基于什么决定？', '本次促销的力度', '竞争对手的力度', '本次促销的销量-价格弹性分析', '老板的心情', 'C', NULL),
(@pack_id, 50, '促销效益评估的最终目标是？', '证明促销是好的', '证明促销是坏的', '指导未来的营销预算分配和促销策略优化，最大化长期利润', '完成上级交代的任务', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业66：会计学×市场营销 → 渠道成本控制
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_marketing:2', 66, '渠道成本控制', 'major_accounting', 'major_marketing', '会计学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '渠道成本控制的核心目标是？', '将所有渠道成本降到最低', '在保证渠道效能的前提下，优化成本结构，提高投入产出比', '取消所有需要付费的渠道', '只使用免费渠道', 'B', NULL),
(@pack_id, 2, '以下哪项属于渠道的“变动成本”？', '与渠道签订的固定年度服务费', '渠道专属的营销人员工资', '按销售额比例支付的渠道佣金', '渠道管理办公室的租金', 'C', NULL),
(@pack_id, 3, '对于电商平台（如天猫、京东），最主要的渠道成本是？', '平台入驻年费', '销售佣金和广告推广费', '银行手续费', '物流费', 'B', NULL),
(@pack_id, 4, '某经销商渠道，固定成本10万/年，可变成本为销售额的5%。当年通过该渠道实现销售额200万，则总渠道成本是多少？', '10万', '15万', '20万', '25万', 'C', NULL),
(@pack_id, 5, '在控制经销商返利成本时，应避免哪种情况？', '设定阶梯式返利目标', '返利与回款挂钩', '返利目标过低，导致大部分经销商轻松获得高额返利', '返利以货物形式发放', 'C', NULL),
(@pack_id, 6, '渠道成本控制的第一步通常是？', '削减预算', '对现有渠道成本进行详细的审计和分类', '关闭所有渠道', '提高产品价格', 'B', NULL),
(@pack_id, 7, '对于线下零售渠道，涉及到的“通道费”、“条码费”属于？', '变动成本', '与销量无关的固定费用', '可变成本', '与上架相关的初期沉没成本', 'B', NULL),
(@pack_id, 8, '衡量渠道成本效益最核心的指标是？', '渠道总成本', '渠道的销售费用率 (渠道成本 / 渠道净销售额)', '渠道覆盖的城市数量', '渠道的员工人数', 'B', NULL),
(@pack_id, 9, '一个APP通过应用商店广告获取用户，每个安装成本为5元，用户通过广告安装后，首充率为20%，首充平均金额30元。则该渠道的“首充获客成本”和“首充ROI”分别是？', 'CAC=5, ROI=20%', 'CAC=25, ROI=20%', 'CAC=5, ROI=20%', 'CAC=25元, ROI=20%', 'D', NULL),
(@pack_id, 10, '控制KOL（关键意见领袖）营销成本，以下哪项最重要？', '只选最贵的KOL', '只选粉丝最多的KOL', '建立KOL效果评估体系，基于CPM、互动率、转化率等数据进行谈判和付费', '要求KOL免费推广', 'C', NULL),
(@pack_id, 11, '当公司使用“货到付款”渠道时，由此产生的代收货款手续费和拒收损失应计入？', '生产成本', '渠道成本', '研发成本', '渠道成本 (或销售费用)', 'D', NULL),
(@pack_id, 12, '在控制渠道成本时，对于“渠道冲突”（如线上线下价格不一致）的管理，其财务意义是什么？', '没有财务意义', '避免内耗导致的利润损失和品牌价值下降', '增加法律诉讼费', '增加内部沟通成本', 'B', NULL),
(@pack_id, 13, '某渠道的销售费用率为25%，公司平均销售费用率为20%。你应该建议？', '立即关闭该渠道', '深入分析该渠道的客户价值、增长潜力，如无特殊价值，则谈判降低费率或优化', '把所有预算都投给该渠道', '不做任何行动', 'B', NULL),
(@pack_id, 14, '对于直销团队，以下哪种薪酬结构最能激励业绩并控制固定成本？', '高底薪 + 低提成', '低底薪 + 高提成', '纯固定工资', '纯提成 (无底薪)', 'B', NULL),
(@pack_id, 15, '控制“物流渠道”成本，以下哪个方法最有效？', '选择最慢的物流', '使用单一物流商', '整合订单、优化配送路线、与物流商谈判阶梯价格', '让客户自提', 'C', NULL),
(@pack_id, 16, '支付给信用卡公司的刷卡手续费，属于渠道成本中的哪一类？', '固定成本', '交易成本 (按销售额比例)', '沉没成本', '机会成本', 'B', NULL),
(@pack_id, 17, '一个直播带货渠道，坑位费（固定）5万元，佣金20%。预计能卖50万元销售额，则总渠道成本率为？', '20%', '30%', '30%', '50%', 'C', NULL),
(@pack_id, 18, '渠道成本控制中，“ROI分析”和“边际分析”的主要区别是？', '没有区别', 'ROI分析看整体，边际分析看新增一单位投入的产出', 'ROI分析更简单', '边际分析不考虑成本', 'B', NULL),
(@pack_id, 19, '为了控制百度、谷歌等搜索引擎营销(SEM)渠道成本，最重要的优化动作是？', '出价越高越好', '使用广泛匹配获取更多流量', '持续优化关键词质量得分和否定关键词，降低平均点击成本', '只投品牌词', 'C', NULL),
(@pack_id, 20, '在财务上，渠道返利支出通常如何列示？', '冲减主营业务收入', '计入主营业务成本', '计入销售费用-渠道费用', '计入管理费用', 'C', NULL),
(@pack_id, 21, '如果某渠道的客户获取成本（CAC）远高于客户终身价值（LTV），你应建议？', '加大投入，规模效应会降低成本', '维持不变，观察一下', '暂停或削减该渠道投入，直到找到降低成本或提升LTV的方法', '提高产品价格', 'C', NULL),
(@pack_id, 22, '控制“线下展会”渠道成本，以下哪项不是有效方法？', '联合其他品牌共享展位', '使用可重复利用的展台搭建材料', '雇佣最昂贵的礼仪公司', '提前规划，避免急单产生的高昂物流和制作费', 'C', NULL),
(@pack_id, 23, '渠道成本控制的“二八法则”告诉我们？', '所有渠道成本都很重要', '应该重点管理贡献80%成本的20%渠道', '应该放弃80%的渠道', '成本控制无效', 'B', NULL),
(@pack_id, 24, '某产品通过代理商销售，代理商要求独家代理权，并要求公司承担其所有的市场推广费。从成本控制角度看，这个要求？', '非常合理', '风险很高，可能导致成本失控且受制于单一渠道', '可以答应，只要签长约', '要求代理商共担推广费', 'D', NULL),
(@pack_id, 25, '对于SaaS产品的“推荐营销”渠道（老用户推荐新用户得奖励），成本应视为？', '销售费用', '既是销售费用，也是客户获取成本的一部分', '研发费用', '财务费用', 'B', NULL),
(@pack_id, 26, '当公司决定进入一个新市场时，评估渠道成本，以下哪个不是必须考虑的因素？', '当地的渠道结构和惯例费率', '与现有渠道的冲突和协调成本', '当地的法律合规成本（如特定执照）', '公司CEO的个人喜好', 'D', NULL),
(@pack_id, 27, '渠道成本预算是“自上而下”制定还是“自下而上”？', '只能自上而下', '只能自下而上', '两者结合：公司战略目标（自上而下）与渠道实际计划（自下而上）达成一致', '随意制定', 'C', NULL),
(@pack_id, 28, '在分析渠道成本差异时，发现实际佣金率高于预算，可能的原因是？', '销售额高于预期', '高佣金率的高利润产品销售占比下降，或者渠道谈判了更高费率', '汇率波动', '办公室租金上涨', 'B', NULL),
(@pack_id, 29, '对于“社群团购”渠道，团长佣金是主要成本，控制该成本的有效方式是？', '不给佣金', '设置阶梯佣金，根据销售额定', '将佣金与团购的核销率和退货率挂钩', '只与团长合作一次', 'C', NULL),
(@pack_id, 30, '渠道成本控制报告中，应包含的“非财务”信息是？', '渠道伙伴的数量和稳定性', '渠道冲突事件次数', '渠道满意度评分', '以上都是', 'D', NULL),
(@pack_id, 31, '在谈判电视购物渠道成本时，除了广告时长费，还应重点控制？', '主持人的服装费', '销售分成比例和退货率相关的扣款条款', '直播间的灯光费', '导播的加班费', 'B', NULL),
(@pack_id, 32, '如果一个渠道的边际贡献为正，但边际贡献率低于公司平均水平，你应该？', '立即砍掉', '要求该渠道提价或降低成本', '评估其战略价值（如清库存、获取新客），可能保留但控制规模', '加大投入，做大总量', 'C', NULL),
(@pack_id, 33, '为了控制渠道成本，公司决定自建电商网站，与依托天猫平台相比，自建网站的优势是？', '初始投入成本低', '没有流量成本', '无平台佣金，数据自主可控，但需要自担引流成本', '维护成本为零', 'C', NULL),
(@pack_id, 34, '渠道成本控制中，对于“坏账”或“渠道拖欠款”的管理，属于哪个环节？', '售前成本控制', '信用和回款成本控制', '售后成本控制', '研发成本控制', 'B', NULL),
(@pack_id, 35, '一个渠道的年费为12万，该渠道带来的年毛利贡献为20万，则扣除渠道固定成本后的净利润为？', '12万', '20万', '8万', '32万', 'C', NULL),
(@pack_id, 36, '“渠道下沉”策略（跳过省级代理，直接发展县级代理）在成本控制上可能带来什么影响？', '一定会增加成本', '一定会降低成本', '可能增加管理复杂度，但可能减少中间环节加价，提升终端价格竞争力', '与成本无关', 'C', NULL),
(@pack_id, 37, '以下哪个行为属于“渠道成本失控”的预警信号？', '渠道销售额稳步增长', '渠道费用增速连续多个月超过渠道收入增速', '渠道合作伙伴数量增加', '渠道退货率下降', 'B', NULL),
(@pack_id, 38, '在控制“跨境电扇渠道”成本时，需要考虑的特殊成本项目是？', '跨国物流和关税', '货币汇兑损失', '海外仓储费', '以上都是', 'D', NULL),
(@pack_id, 39, '渠道费用报销审批中，发现一张大额“公关招待费”发票，审批者应该？', '立即签字', '拒绝签字', '要求提供详细的招待对象、事由，并与渠道产出挂钩评估合理性', '撕掉发票', 'C', NULL),
(@pack_id, 40, '为了激励渠道推广新品，但控制成本，可以采取哪种方式？', '给予极高的固定返利', '给所有渠道无条件补贴', '设置新品推广专项激励，与新品销量和推广动作挂钩，且有时限', '不激励，自然销售', 'C', NULL),
(@pack_id, 41, '渠道成本控制不仅看“绝对数”，更要看“相对数”，即？', '渠道成本占公司总费用的比例', '渠道成本占渠道收入的百分比', '渠道成本占公司利润的比例', 'B和与历史数据、其他渠道的比较', 'D', NULL),
(@pack_id, 42, '对于一个成熟期的产品，渠道成本控制的目标应侧重于？', '不惜代价扩大份额', '优化效率，维持利润', '研发新渠道', 'B，同时防止过度投入', 'B', NULL),
(@pack_id, 43, '当渠道伙伴提出需要公司支持“市场物料”（如展架、海报），成本控制的最佳做法是？', '全部答应', '全部拒绝', '设定年度物料预算，并要求渠道伙伴共同承担部分成本或提供核销凭证', '让渠道伙伴自己制作', 'C', NULL),
(@pack_id, 44, '渠道返利政策设计中，为防止渠道为了冲返利而压货，可以采取的措施是？', '设置很高的返利门槛', '取消返利', '将返利与终端动销和回款挂钩，而非简单的进货额', '将返利设置为0', 'C', NULL),
(@pack_id, 45, '在ERP系统中，设置渠道成本控制的关键点是？', '可以随意修改历史成本数据', '实现预算控制、费用申请与报销的流程化和审批自动化', '不允许任何人查看成本数据', '将成本数据与外界共享', 'B', NULL),
(@pack_id, 46, '某公司采用“渠道代码”跟踪每个订单的来源，这对成本控制有什么帮助？', '没有帮助', '可以精确计算每个渠道的ROI和成本', '增加管理难度', '用于给渠道发红包', 'B', NULL),
(@pack_id, 47, '行业平均渠道销售费用率为15%，你的公司是25%，且产品无显著差异，这说明？', '你的公司更厉害', '你的渠道成本控制存在严重问题，或渠道结构不佳', '你的产品质量更好', '你的定价更高', 'B', NULL),
(@pack_id, 48, '在控制渠道成本时，与渠道伙伴建立“战略合作伙伴关系”的好处是？', '可能获得更优惠的价格和更好的服务', '共同优化供应链，降低整体成本', '减少渠道冲突', '以上都是', 'D', NULL),
(@pack_id, 49, '渠道成本控制中最忌讳的是？', '定期复盘', '只看局部，不看整体（如为降低A渠道成本，导致销售额大幅下降，总利润下降）', '使用数据分析', '与渠道谈判', 'B', NULL),
(@pack_id, 50, '作为一名渠道成本控制专员，你认为最重要的能力是？', '只会算账', '既懂财务，又懂市场渠道运营，能提出建设性优化方案', '英语专八', '编程能力', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业67：会计学×数据科学 → 财务大数据分析
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_ds:0', 67, '财务大数据分析', 'major_accounting', 'major_ds', '会计学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '财务大数据分析的第一步通常是？', '建立复杂的预测模型', '明确业务问题并获取相关数据', '清洗所有数据', '生成可视化报表', 'B', NULL),
(@pack_id, 2, '以下哪个Python库最常用于数据处理和分析？', 'Pandas', 'Matplotlib', 'Scikit-learn', 'TensorFlow', 'A', NULL),
(@pack_id, 3, '在分析“销售收入”时，发现某个销售代表在12月31日晚11:59分录入了一笔超大额订单，这种行为可能暗示什么？', '销售代表非常敬业', '可能存在业绩造假或压单行为', '系统性能很好', '客户购物习惯特殊', 'B', NULL),
(@pack_id, 4, '以下哪个SQL语句用于计算某客户的累计销售额？', 'SELECT SUM(sales) FROM orders GROUP BY customer_id', 'SELECT customer_id, SUM(sales) OVER (PARTITION BY customer_id ORDER BY order_date) FROM orders', 'B', 'SELECT customer_id, SUM(sales) FROM orders HAVING SUM(sales) > 1000', 'B', NULL),
(@pack_id, 5, '用箱线图识别“费用报销”中的异常值时，箱线图的上边缘通常定义为？', 'Q1 (下四分位数)', 'Q3 (上四分位数)', 'Q3 + 1.5 * IQR', '最大值', 'C', NULL),
(@pack_id, 6, '财务数据中，因变量是“是否违约”（0/1），应使用哪种机器学习算法？', '线性回归', '逻辑回归', 'K-means聚类', '主成分分析 (PCA)', 'B', NULL),
(@pack_id, 7, '对“客户付款及时性”进行分析，将客户分为“提前付款”、“按时付款”、“延迟30天内”、“延迟超30天”，这属于？', '回归分析', '关联规则挖掘', '分类或聚类 (若事前无标签则为聚类)', '时间序列分析', 'C', NULL),
(@pack_id, 8, '以下哪个指标不适合衡量预测模型的回归任务准确性？', 'MAE', 'RMSE', 'R-squared', '准确率 (Accuracy)', 'D', NULL),
(@pack_id, 9, '在分析“供应商付款周期”时，先按供应商行业分组，再计算各组内平均付款周期，这在SQL中需要用到？', 'WHERE', 'ORDER BY', 'GROUP BY', 'JOIN', 'C', NULL),
(@pack_id, 10, '大型数据集分析中，为了解决“维度灾难”问题，常采用的方法是？', '增加更多特征', '主成分分析 (PCA) 或 特征选择', '使用更多的数据', '使用更深的神经网络', 'B', NULL),
(@pack_id, 11, '在财务大数据分析中，“数据血缘” (Data Lineage) 的概念主要为了解决什么问题？', '数据存储成本高', '数据的来源、加工过程和可信度追溯', '数据量太大', '数据格式不统一', 'B', NULL),
(@pack_id, 12, '分析“历史费用数据”，发现某部门的差旅费在5个月内增长了300%，而业务量仅增长10%。作为数据分析师，你应该？', '报告该费用增长正常', '忽略该异常', '深入挖掘，按费用明细、人员、目的地拆解，定位异常原因', '直接指责该部门贪污', 'C', NULL),
(@pack_id, 13, '以下哪种图表最适合展示“各产品线收入”的构成及随时间变化的趋势？', '饼图', '散点图', '堆积面积图或分组柱状图', '雷达图', 'C', NULL),
(@pack_id, 14, '在Python中，使用df.groupby('部门')['费用'].sum()可以得到什么？', '每个部门的费用明细', '每个部门的平均费用', '每个部门的费用总和', '所有部门的费用总和', 'C', NULL),
(@pack_id, 15, '财务大数据分析中，一个典型的数据处理流程是？', '可视化 -> 建模 -> 清洗 -> 采集', '采集 -> 清洗 -> 探索 -> 建模 -> 评估 -> 部署', '建模 -> 采集 -> 清洗 -> 可视化', '评估 -> 建模 -> 清洗', 'B', NULL),
(@pack_id, 16, '发现“应收账款周转天数”这个KPI与“坏账率”呈强正相关，这说明？', '周转天数越长，坏账率越低', '周转天数越长，坏账率越高', '两者没有关系', '无法判断', 'B', NULL),
(@pack_id, 17, '以下哪个不是数据清洗的常见操作？', '处理缺失值', '去除重复值', '训练机器学习模型', '统一数据格式', 'C', NULL),
(@pack_id, 18, '关联规则挖掘中的“支持度”和“置信度”，在财务分析中，可以发现什么模式？', '数据趋势', '“购买A产品的客户，同时也会购买B产品”这类规则', '数据分布', '预测未来值', 'B', NULL),
(@pack_id, 19, '分析“现金流预测”，数据具有明显的季度性波动（如Q4现金流高），使用什么模型效果较好？', '简单线性回归', '季节性ARIMA (SARIMA) 或 指数平滑 (Holt-Winters)', 'K-近邻 (KNN)', '朴素贝叶斯', 'B', NULL),
(@pack_id, 20, '在比较两个或多个不同量纲的财务指标（如收入与利润）时，常采用的方法是？', '直接比较', '归一化 (Normalization) 或 标准化 (Standardization)', '取对数', '计算方差', 'B', NULL),
(@pack_id, 21, '以下哪个ETL工具最常用于企业级大数据处理？', 'Excel', 'Informatica / Talend / Apache NiFi', 'PowerPoint', 'Photoshop', 'B', NULL),
(@pack_id, 22, '分析“成本异常波动”，使用“3-sigma”法则，当某个成本值超出均值±3个标准差时，视为异常。这基于什么假设？', '数据呈均匀分布', '数据呈正态分布', '数据是离散的', '数据是文本', 'B', NULL),
(@pack_id, 23, '财务数据分析报告中，为了解释“为什么销售额下降了”，最适合的分析方法是？', '描述性统计', '诊断性分析 (通过拆解维度、钻取数据)', '预测性分析', '规范性分析', 'B', NULL),
(@pack_id, 24, '在SQL中，LEFT JOIN 和 INNER JOIN 的主要区别是？', 'LEFT JOIN 返回左表所有行，INNER JOIN 返回两表匹配的行', 'INNER JOIN 返回左表所有行', '没有区别', 'LEFT JOIN 只返回匹配的行', 'A', NULL),
(@pack_id, 25, '在Python中使用matplotlib.pyplot.scatter(x, y)可以绘制什么图？', '柱状图', '折线图', '散点图', '饼图', 'C', NULL),
(@pack_id, 26, '在处理10GB以上的财务明细数据时，使用Pandas可能遇到内存不足，应尝试？', '升级电脑内存', '使用for循环逐行处理', '使用Dask、Spark或分块读取 (chunk)', '放弃分析', 'C', NULL),
(@pack_id, 27, '业务部门希望预测“下个季度哪个客户的流失概率最高”，这属于哪种分析方法？', '描述性分析', '预测性分析 (Predictive Analytics)', '规范性分析', '因果分析', 'B', NULL),
(@pack_id, 28, '衡量“库存周转率”预测模型的准确度，如果预测值为6.0，实际为5.0，MAPE（平均绝对百分比误差）是多少？', '1.0', '20%', '16.7%', '无法计算', 'B', NULL),
(@pack_id, 29, '财务大数据分析中，数据仓库通常采用哪种数据模型？', '网状模型', '层次模型', '星型模型或雪花模型', '键值模型', 'C', NULL),
(@pack_id, 30, '使用“聚类算法”对供应商进行分类，可以分为“战略型”、“杠杆型”、“瓶颈型”、“常规型”。这种分类有助于？', '统一所有供应商的管理方式', '制定差异化的采购和付款策略', '增加供应商数量', '降低产品质量', 'B', NULL),
(@pack_id, 31, '对于“付款审批流”的日志数据，通过“流程挖掘”技术可以分析出什么？', '审批单上的金额', '审批人的姓名', '实际审批路径与理想路径的偏差，以及审批瓶颈节点', '公司架构', 'C', NULL),
(@pack_id, 32, '以下哪个图表不适合展示时间序列数据？', '折线图', '面积图', '散点图 (适合展示两个变量的关系)', '柱状图 (按时间排列)', 'C', NULL),
(@pack_id, 33, '在财务分析中，“同比”和“环比”分别指的是？', '与上月比，与上季度比', '与去年同期比，与上月/上期比', '与预算比，与实际比', '与行业平均比，与标杆比', 'B', NULL),
(@pack_id, 34, '使用Power BI或Tableau这类工具，主要可以实现？', '数据存储', '交互式数据可视化和仪表板制作', '数据采集', '机器学习建模', 'B', NULL),
(@pack_id, 35, '在分析“采购价格”时，发现不同工厂采购同一物料的价格差异巨大，分析流程首先应？', '统一价格', '按供应商、采购量、采购时间、合同条款等维度拆解，寻找差异原因', '立即处罚采购员', '更换所有供应商', 'B', NULL),
(@pack_id, 36, '假设检验中，原假设为“新流程与旧流程的成本无差异”，P值为0.03，显著性水平α=0.05，结论是？', '接受原假设，无差异', '拒绝原假设，认为有显著差异', '无法判断', '需要更大样本', 'B', NULL),
(@pack_id, 37, '对财务大数据进行“数据可视化”，最主要的原则是？', '使用尽可能多的颜色', '图表越炫酷越好', '准确、简洁、高效地传达信息', '每张图必须包含所有数据', 'C', NULL),
(@pack_id, 38, '预测“下个月公司的资金缺口”，最适合的模型输入特征是？', '公司董事会成员名单', '历史收款和付款的时间序列、季节性因素、销售预测', '股票市场指数', '天气预报', 'B', NULL),
(@pack_id, 39, '在处理财务数据中的“缺失值”时，以下哪种方法最不推荐？', '删除含有缺失值的行', '用均值/中位数填充', '用模型预测缺失值', '用0填充，而不进行任何分析', 'D', NULL),
(@pack_id, 40, '分析“员工费用报销行为”，发现有员工总是在月底提交大额报销，且发票连号。这属于？', '正常行为', '异常模式识别 (可能的风险信号)', '公司政策鼓励的行为', '数据录入错误', 'B', NULL),
(@pack_id, 41, '在Python中，使用sklearn.linear_model.LinearRegression，调用.fit(X, y)后，模型参数存储在？', '.params_', '.coef_ 和 .intercept_', '.model_', '.result_', 'B', NULL),
(@pack_id, 42, '财务大数据分析项目的成功，最依赖什么？', '最先进的算法', '最昂贵的软件', '清晰定义的业务问题、高质量的数据和懂业务的团队', '最快的计算机', 'C', NULL),
(@pack_id, 43, '可视化“各部门费用与预算的对比”，最佳图表是？', '饼图', '子弹图 (Bullet Graph) 或 目标达成图', '雷达图', '热力图', 'B', NULL),
(@pack_id, 44, '在分析“销售折扣”时，通过回归分析发现折扣率与销售额呈U型关系，可能意味着？', '打折没用', '极低的折扣和极高的折扣都能带来高销售额，但中等折扣效果差', '数据错误', '应该不打折', 'B', NULL),
(@pack_id, 45, '为了防止财务大数据分析中的“幸存者偏差”，应该注意什么？', '只分析成功的案例', '排除所有失败案例', '同时分析成功和失败的案例，包括已破产或流失的客户', '只分析当前存在的客户', 'C', NULL),
(@pack_id, 46, '在分析“项目成本超支”原因时，构建决策树模型，根节点是“项目经理”，这揭示了什么？', '项目的技术难度', '项目的所在地区', '项目经理是影响成本超支的最主要因素', '决策树模型是错误的', 'C', NULL),
(@pack_id, 47, '“相关性不等于因果性”在财务分析中的一个经典案例是？', '销售额增长，利润也增长', '广告费增加，销售额增加', '冰淇淋销量上升，溺水人数也上升，但不存在因果关系', '培训费用增加，员工技能提升', 'C', NULL),
(@pack_id, 48, '大数据分析中，用来衡量分类模型性能的AUC值，其含义是？', '模型误差', '模型区分正负样本的能力，值越接近1越好', '模型训练时间', '模型特征数量', 'B', NULL),
(@pack_id, 49, '对“财务大数据分析团队”来说，以下哪个角色最需要具备财务和业务的深入理解？', '数据库管理员', '数据工程师', '数据分析师/数据科学家', '前端开发工程师', 'C', NULL),
(@pack_id, 50, '财务大数据分析的最终价值是？', '生成一份精美的报告', '证实财务总监的想法', '驱动数据化决策，优化资源配置，提升财务绩效和风控能力', '取代所有财务人员', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业68：会计学×数据科学 → 智能风控建模
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_ds:1', 68, '智能风控建模', 'major_accounting', 'major_ds', '会计学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '智能风控建模中，最常用的监督学习任务是？', '聚类', '二分类 (如好/坏客户)', '降维', '关联规则', 'B', NULL),
(@pack_id, 2, '在信用评分卡模型中，将“年龄”这一连续变量划分为“18-25”、“26-35”等区间，这个过程称为？', '标准化', '分箱 (Binning)', '归一化', '特征交叉', 'B', NULL),
(@pack_id, 3, '评价信用模型区分好坏客户能力的常用指标是？', '均方根误差 (RMSE)', 'AUC (曲线下面积) 或 KS值', '准确率 (Accuracy)', '召回率 (Recall)', 'B', NULL),
(@pack_id, 4, '风控建模中，处理样本不平衡问题（好客户远多于坏客户）的常用方法不包括？', '欠采样', '过采样 (如SMOTE)', '调整分类阈值', '增加更多特征', 'D', NULL),
(@pack_id, 5, '“拒绝推断” (Reject Inference) 在风控建模中的目的是什么？', '推断被拒绝客户的收入', '解决模型只基于通过样本（好客户）训练，导致对潜在坏客户评估不准的问题', '推断客户是否喜欢产品', '推断客户家庭住址', 'B', NULL),
(@pack_id, 6, '在构建评分卡时，对特征进行WOE (Weight of Evidence) 编码的主要作用是？', '将分类变量转为数值', '建立特征与二元目标变量的单调关系，便于解释', '删除缺失值', '增加数据量', 'B', NULL),
(@pack_id, 7, '风控模型的“稳定性”通常用什么指标监控？', 'AUC', 'KS', 'PSI (群体稳定性指标)', 'RMSE', 'C', NULL),
(@pack_id, 8, '反欺诈模型中，使用“设备指纹”技术主要为了识别什么风险？', '客户信用风险', '团伙欺诈或机器行为', '市场风险', '操作风险', 'B', NULL),
(@pack_id, 9, '在风控决策引擎中，“规则”和“模型”的关系通常是？', '规则替代模型', '模型替代规则', '规则用于快速拦截明确风险，模型用于精细量化剩余风险', '没有关系', 'C', NULL),
(@pack_id, 10, '风控建模中，L1正则化 (Lasso) 的主要作用是？', '防止过拟合，同时进行特征选择', '提高模型复杂度', '增加训练时间', '将系数变得非常大', 'A', NULL),
(@pack_id, 11, '对于“小微企业信贷”风控，以下哪种数据最有价值？', '企业主的微博粉丝数', '企业的税务发票数据、银行流水、工商司法信息', '企业网站的访问量', '企业的星座', 'B', NULL),
(@pack_id, 12, '模型验证中，“区分能力”最差的模型是AUC=0.5，那么AUC=0.5表示模型？', '完美区分', '随机猜测，没有区分能力', '完全反向区分', '无法计算', 'B', NULL),
(@pack_id, 13, '风控模型中，特征“过去12个月逾期次数”与目标变量（是否违约）通常预期是？', '正相关 (逾期越多，越不违约)', '负相关 (逾期越多，越容易违约)', '无关', '非线性相关', 'B', NULL),
(@pack_id, 14, '在贷中风险管理中，行为评分卡 (Behavior Score) 主要依据什么数据构建？', '客户申请时的信息', '外部征信数据', '客户借款后的还款、消费等行为数据', '宏观经济数据', 'C', NULL),
(@pack_id, 15, '为了防止模型过拟合，以下哪种方法最有效？', '增加模型复杂度', '使用更多的特征', '交叉验证 (Cross-Validation)', '不切分训练集和测试集', 'C', NULL),
(@pack_id, 16, '“知识图谱”在反欺诈中的应用主要体现在？', '计算客户收入', '识别复杂的关系网络，如同一个设备关联多个申请、担保圈风险等', '预测股价', '优化广告点击率', 'B', NULL),
(@pack_id, 17, '风控建模中，缺失值处理方式中，不推荐的是？', '用中位数填充', '用众数填充', '将缺失作为一个单独的类别', '用0填充，并认为0有意义', 'D', NULL),
(@pack_id, 18, '衡量一个风控策略的“通过率”和“坏账率”，通常需要权衡，以下描述正确的是？', '通过率越高，坏账率越低', '通过率越低，坏账率越低', '通过率与坏账率通常呈正相关，需找到最优平衡点', '两者没有关系', 'C', NULL),
(@pack_id, 19, '“评分卡”最终输出的分数通常是？', '客户年龄', '违约概率的单调变换 (如 分数=偏移+因子*ln(odds) )', '客户收入预测', '随机数', 'B', NULL),
(@pack_id, 20, '风控模型上线后，需要持续监控的指标不包括？', '模型分数分布', '特征PSI', '模型AUC / KS', '开发模型的数据工程师的名字', 'D', NULL),
(@pack_id, 21, '逻辑回归作为经典风控模型，最大的优点是？', '预测精度最高', '可解释性强，能输出概率，系数有明确意义', '训练速度最慢', '能处理图像数据', 'B', NULL),
(@pack_id, 22, '在反欺诈中，“生物识别”技术主要用于？', '识别客户收入水平', '验证客户身份真实性，防止冒用', '预测客户还款意愿', '降低贷款金额', 'B', NULL),
(@pack_id, 23, '对于“首贷户”的风控，由于缺乏该客户的历史借贷行为，应主要依赖？', '仅客户自填信息', '外部征信数据、第三方数据、强特征 (如学历、资产)', '直接拒绝', '都给最高额度', 'B', NULL),
(@pack_id, 24, '在构建模型时，如果训练集AUC=0.99，测试集AUC=0.65，这表明模型？', '拟合完美', '过拟合', '欠拟合', '数据泄露', 'B', NULL),
(@pack_id, 25, '风控模型中的“入模变量”选择，应遵循的原则是？', '变量越多越好', '变量越复杂越好', '选择与目标变量强相关、稳定、合法、可解释的变量', '变量必须都是数值型', 'C', NULL),
(@pack_id, 26, '在反欺诈策略中，对于“短时间内多个不同身份证号但收货地址相同”的订单，应触发什么规则？', '信用评分过低', '团伙欺诈预警', '额度不足', '用户活跃度过高', 'B', NULL),
(@pack_id, 27, '风控建模中，将数据按时间切分，比如用2019-2020的数据训练，2021年数据测试，这种做法叫？', '随机抽样', '时间序列验证 (OOT验证)', '分层抽样', '自助法 (Bootstrapping)', 'B', NULL),
(@pack_id, 28, '“IV值” (信息值) 在特征选择中的作用是？', '衡量特征的稳定性', '衡量特征对目标变量的预测能力', '衡量特征的缺失率', '衡量特征的唯一性', 'B', NULL),
(@pack_id, 29, '在风控中，“多头借贷”通常被视为什么信号？', '信用良好的信号', '高风险的信号', '无关信号', '收入高的信号', 'B', NULL),
(@pack_id, 30, '以下哪种算法通常不适合用在风控模型可解释性要求很高的场景？', '逻辑回归', '决策树', '深度神经网络 (黑箱)', '评分卡', 'C', NULL),
(@pack_id, 31, '反欺诈模型中，关于“用户代理” (User-Agent) 的分析，主要目的是？', '了解用户喜好', '识别爬虫或模拟器请求', '提高页面加载速度', '优化广告展示', 'B', NULL),
(@pack_id, 32, '风控策略中，“拒绝”和“通过”的阈值设定，通常会参考哪个指标？', '模型准确率', '业务可接受的坏账率和通过率目标', '模型训练时间', '数据量大小', 'B', NULL),
(@pack_id, 33, '在构建贷后催收模型时，目标变量（Y）通常定义为？', '客户年龄', '客户收入', '客户在未来一段时间内的逾期或失联概率', '客户的兴趣爱好', 'C', NULL),
(@pack_id, 34, '对于时序数据，如银行流水，构建风控特征时，可以提取的统计特征不包括？', '均值、标准差', '趋势、周期性', '最近一次交易金额', '文本情感分数', 'D', NULL),
(@pack_id, 35, '模型监控中，PSI > 0.25通常表示？', '模型非常稳定', '模型发生显著变化，需要调查原因或重新训练', '模型区分能力极强', '模型过拟合', 'B', NULL),
(@pack_id, 36, '在风控建模中，处理“冷启动”问题（新产品无历史数据）的方法之一是？', '随意给额度', '完全拒绝', '使用专家规则作为初始策略，并收集数据快速迭代', '等待一年后再上线', 'C', NULL),
(@pack_id, 37, '“欺诈分数”和“信用分数”通常分开建模，因为？', '欺诈和信用风险的行为模式不同', '方便解释', '监管要求', '以上都是', 'D', NULL),
(@pack_id, 38, '在风控决策流中，通常会先执行规则，后运行模型，因为？', '模型比规则快', '规则可以快速拦截确定性高风险，节省计算资源', '规则比模型准确', '模型比规则准确', 'B', NULL),
(@pack_id, 39, '风控建模常用的编程语言是？', 'Java', 'C++', 'Python 或 R', 'HTML', 'C', NULL),
(@pack_id, 40, '在使用外部数据源（如第三方征信）时，风控模型需要考虑的重要因素是？', '数据价格', '数据覆盖率和稳定性', '数据合规性', '以上都是', 'D', NULL),
(@pack_id, 41, '特征工程中，将“申请时间”转换为“是否工作日”、“是否凌晨”，属于？', '特征缩放', '特征提取 (从时间戳中提取新特征)', '特征降维', '特征交叉', 'B', NULL),
(@pack_id, 42, '如果风控模型的KS值为0.3，通常认为模型区分能力？', '极差 (KS<0.2)', '一般 (0.2 < KS < 0.4)', '很好 (0.4 < KS < 0.6)', '极强 (>0.6)', 'B', NULL),
(@pack_id, 43, '在反欺诈中，“蜜罐”技术是指？', '给客户发蜂蜜', '设置虚假的敏感入口（如不公开的管理员页面），诱捕攻击者', '提高产品甜度', '一种加密算法', 'B', NULL),
(@pack_id, 44, '风控模型评估中，关注“提升图” (Lift Chart) 是为了？', '看模型误差', '看模型相对于随机选择，在特定分数段能提升多少识别坏客户的能力', '看特征重要性', '看模型训练时间', 'B', NULL),
(@pack_id, 45, '对于循环授信产品，风控模型需要定期更新，这是因为？', '客户会变老', '宏观经济变化', '客户行为会变', '以上都是', 'D', NULL),
(@pack_id, 46, '在风控模型中，特征“负债收入比” (DTI) 通常与违约风险呈？', '负相关', '正相关', '不相关', 'U型相关', 'B', NULL),
(@pack_id, 47, '一种检测模型“数据泄露”的方法是在时间上错位验证，如果使用未来信息预测过去，会导致？', '模型AUC值很低', '模型效果在训练和测试时都极好，但上线后崩溃', '模型训练失败', '模型过拟合', 'B', NULL),
(@pack_id, 48, '智能风控建模的最终目标不是100%拒绝所有风险，而是？', '拒绝所有申请', '在可接受的风险水平下，最大化通过率和收益', '最小化通过率', '让模型最复杂', 'B', NULL),
(@pack_id, 49, '以下哪个角色通常负责风控模型的部署和维护？', '业务人员', '机器学习工程师 / 数据工程师', '销售人员', '客服人员', 'B', NULL),
(@pack_id, 50, '作为一名智能风控建模专家，最重要的思维是？', '追求模型精度极致', '平衡风险与收益，理解业务，并确保模型公平、合规、可解释', '只使用深度学习', '完全依赖自动机器学习 (AutoML)', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业69：会计学×数据科学 → 审计数据分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_ds:2', 69, '审计数据分析师', 'major_accounting', 'major_ds', '会计学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '审计数据分析的首要目标是？', '提高审计效率', '发现异常和风险', '实现全量审计而非抽样', '以上都是', 'D', NULL),
(@pack_id, 2, '在对“采购付款”循环进行审计时，使用“Benford定律”通常用于检测什么？', '供应商的地址是否正确', '发票金额或付款金额的数字分布是否人为操纵', '采购订单的日期是否合理', '审批流程是否完整', 'B', NULL),
(@pack_id, 3, '审计中，为了测试“是否存在同一供应商、同一金额、同一日期的重复付款”，应使用什么技术？', '回归分析', '数据查重 (Duplicate Detection)', '聚类分析', '情感分析', 'B', NULL),
(@pack_id, 4, 'SQL语句 SELECT 供应商ID, COUNT(*), SUM(付款金额) FROM 付款表 GROUP BY 供应商ID HAVING COUNT(*) > 100，目的是什么？', '找出付款最少的供应商', '找出交易频次过高的供应商', '找出付款金额最大的供应商', '删除重复数据', 'B', NULL),
(@pack_id, 5, '在分析“差旅费报销”时，发现某员工在“北京”和“上海”同一天都有住宿发票，这属于？', '正常差旅', '逻辑矛盾 (数据异常)', '汇率换算错误', '税收优惠', 'B', NULL),
(@pack_id, 6, '审计数据分析中，用于连续监控 (Continuous Monitoring) 的核心是？', '年度一次性检查', '自动定期运行审计脚本或规则，实时或准实时预警', '手动抽查', '依赖被审计单位自查', 'B', NULL),
(@pack_id, 7, '以下哪个不是常见的审计数据分析软件？', 'ACL (Audit Command Language)', 'IDEA', 'Python (配合 Pandas)', '以上都是', 'D', NULL),
(@pack_id, 8, '对“工资单”进行审计，分析“员工年龄”与“岗位级别”，发现大量20岁员工在高级管理岗，可能暗示什么？', '公司人才辈出', '数据造假或岗位设置不合理', '工资发放准时', '个人所得税计算正确', 'B', NULL),
(@pack_id, 9, '在审计中，使用“分层抽样”比“随机抽样”更好的原因是？', '操作更简单', '可以确保高价值或高风险项目被包含在样本中', '所需样本量更少', '不需要计算', 'B', NULL),
(@pack_id, 10, '分析“销售订单”和“出库单”的匹配关系，如果存在大量“有销售订单但无对应出库单”的记录，可能的风险是？', '销售业绩好', '虚增收入 (虚假销售)', '库存积压', '物流效率高', 'B', NULL),
(@pack_id, 11, '审计数据分析中，“趋势分析” (Trend Analysis) 主要用来？', '看单笔大额交易', '看关键指标（如毛利率、费用率）在多个期间的变化是否合理', '看数据分布', '看数据关联关系', 'B', NULL),
(@pack_id, 12, '一个SQL查询：SELECT * FROM 固定资产表 WHERE 使用年限 > 50，这可能是为了测试什么？', '资产折旧计算正确性', '资产分类或使用年限设置的合理性 (是否存在异常)', '资产是否按时盘点', '资产是否投保', 'B', NULL),
(@pack_id, 13, '在审计“采购”时，将“员工主数据”与“供应商主数据”进行关联，检查是否有员工的家庭地址与供应商地址相同，目的是？', '发现员工住得离供应商近', '发现潜在的关联方交易或舞弊', '优化物流路线', '节省差旅费', 'B', NULL),
(@pack_id, 14, '对于审计数据分析师，以下哪个技能最重要？', '精通硬件维修', '结构化查询语言 (SQL)', '建筑设计', '心理咨询', 'B', NULL),
(@pack_id, 15, '审计“现金”时，将“银行日记账”与“银行对账单”进行匹配，未匹配的项目通常称为？', '快乐项目', '未达账项', '优先项目', '审计调整项', 'B', NULL),
(@pack_id, 16, '使用“文本挖掘”技术审计“采购合同”或“报销事由”，可以用于？', '计算合同金额', '识别敏感词、利益冲突或不合规的描述', '排版美化', '翻译成英文', 'B', NULL),
(@pack_id, 17, '在审计“应收账款”时，进行账龄分析，如果账龄超过一年的占比突然从5%增加到30%，应该关注？', '公司销售政策放宽了', '回款能力恶化，可能存在坏账风险或收入确认问题', '客户忠诚度提高', '财务人员更换', 'B', NULL),
(@pack_id, 18, '审计数据分析中，“模糊匹配”技术通常用于？', '精确查找', '查找拼写略有差异但实质相同的实体，如供应商名称“IBM”和“I.B.M.”', '加密数据', '数据排序', 'B', NULL),
(@pack_id, 19, '以下哪个Python库最适合用于数据探索和可视化审计发现？', 'Django', 'Requests', 'Matplotlib / Seaborn', 'Scrapy', 'C', NULL),
(@pack_id, 20, '审计“存货”时，分析“存货周转率”，发现该指标突然下降，可能的原因不包括？', '存货积压', '销售放缓', '虚增利润 (通过减少成本)', '采购过多', 'C', NULL),
(@pack_id, 21, '审计数据分析的结果通常需要与什么结合，才能形成有效的审计证据？', '仅数据', '业务背景、内控了解和人员访谈', '公司股价', '审计师的心情', 'B', NULL),
(@pack_id, 22, '测试“是否存在离职员工仍在工资单上”，应关联哪两个数据集？', '工资表和考勤表', '工资表和人力资源离职记录', '工资表和绩效表', '工资表和招聘表', 'B', NULL),
(@pack_id, 23, '在Excel中，VLOOKUP 函数在审计数据分析中最常用的场景是？', '制作图表', '根据一个关键字段（如凭证号）从另一个表中匹配数据', '编写宏', '数据透视', 'B', NULL),
(@pack_id, 24, '审计数据分析中，对于“大额且整数的交易”（如1,000,000.00），应重点关注，因为？', '会计喜欢整数', '可能存在人为操纵或未经审批的支付', '银行手续费低', '计算方便', 'B', NULL),
(@pack_id, 25, '使用“关联规则” (Apriori算法) 分析报销数据，发现规则“{购买办公用品} -> {购买礼品卡}”的支持度和置信度很高，可能意味着什么？', '办公用品和礼品卡是配套销售', '可能存在采购舞弊，用办公用品名目采购礼品卡', '公司福利好', '需要增加办公用品预算', 'B', NULL),
(@pack_id, 26, '对“销售折扣”进行审计，分析折扣率与销售人员的关系，发现某销售人员的折扣率显著高于其他人，应建议？', '奖励该销售人员', '调查是否存在违规给予过高折扣以换取个人利益', '全公司推广其折扣策略', '开除该销售人员', 'B', NULL),
(@pack_id, 27, '审计数据分析中，“控制缺陷”的发现通常基于？', '单笔交易异常', '大量交易违反了既定的控制规则 (如超过限额的采购没有二签)', '系统日志', '财务报表数', 'B', NULL),
(@pack_id, 28, '下面哪个函数在SQL中用于计算某列的非重复值的数量？', 'SUM()', 'AVG()', 'COUNT(DISTINCT column_name)', 'MAX()', 'C', NULL),
(@pack_id, 29, '审计“在建工程”转入“固定资产”的时点，可以分析“转固日期”是否异常地集中在某一天（如12月31日），以检查？', '工程管理规范', '是否存在人为调节利润 (早转或少转折旧)', '财务人员工作效率高', '会计政策要求', 'B', NULL),
(@pack_id, 30, '使用“Jaccard相似度”可以比较两个供应商的“地址”、“电话”等信息的相似度，主要目的是？', '方便邮寄', '识别潜在的同一个人或实体注册的多个供应商', '提高数据质量', '减少存储空间', 'B', NULL),
(@pack_id, 31, '审计数据分析报告，最好采用什么形式呈现？', '纯文本', '数据可视化+关键结论+业务建议', '原始数据表格', '压缩文件', 'B', NULL),
(@pack_id, 32, '在处理审计数据时，发现某个字段缺失率高达60%，最合理的做法是？', '忽视缺失', '用0填充', '评估缺失原因，如果缺失非随机，可能本身就是一种审计线索', '删除该字段', 'C', NULL),
(@pack_id, 33, '审计“费用资本化”的情况，可以分析“借方科目”和“贷方科目”的组合，查找“借：固定资产，贷：管理费用”这样的分录，这属于？', '余额测试', '分录逻辑测试 (合理性测试)', '发生额测试', '截止性测试', 'B', NULL),
(@pack_id, 34, '以下哪个指标最适合在审计初期对整个公司的付款数据进行概览？', '付款总笔数', '付款总金额', '按供应商、按月、按金额区间的分布图', '付款审批时长', 'C', NULL),
(@pack_id, 35, '在审计中，为了测试“是否存在跨期费用”，可以将“发票日期”与“记账日期”进行比较，如果发票日期是2023年，记账日期是2024年，且金额重大，应关注？', '发票开具晚了', '费用可能被延迟确认，以调节利润', '记账员休假了', '系统时间错误', 'B', NULL),
(@pack_id, 36, '审计数据分析中，“数据准备”阶段通常占用整个项目时间的？', '10%', '60-80%', '100%', '5%', 'B', NULL),
(@pack_id, 37, '对“生产工时记录”和“工资计算表”进行关联分析，如果发现某员工工号为001，但工资表中001对应的是另一个名字，说明什么？', '公司有同名员工', '可能存在冒领工资或身份盗用', '数据录入错误，但无关紧要', '正常的人事调动', 'B', NULL),
(@pack_id, 38, '在分析“循环采购”时，发现A公司既是重要客户又是重要供应商，这种情况应关注的风险是？', '市场竞争激烈', '可能虚构交易以增加收入或采购额，或进行利益输送', '供应链管理优秀', '客户关系稳固', 'B', NULL),
(@pack_id, 39, '在审计中，使用“帕累托法则” (80/20法则) 可以指导审计师？', '关注所有交易', '重点关注占80%金额的那20%的交易', '忽略所有交易', '只关注小额交易', 'B', NULL),
(@pack_id, 40, '对于审计数据分析师，以下哪项不是必要的知识？', '会计原理和审计流程', '数据分析工具 (如SQL, Python)', '集成电路设计', '业务理解能力', 'C', NULL),
(@pack_id, 41, '审计“网站广告费”时，获得了广告后台的“点击量”数据，与供应商的“计费点击量”进行对比，如果差异很大，应怀疑？', '网站流量大', '供应商可能虚报了点击量', '广告效果好', '审计师计算错误', 'B', NULL),
(@pack_id, 42, '为了测试“收入完整性”，最有效的数据分析方法是？', '从发货单追查到销售发票和财务入账', '从财务入账追查到发货单', '进行趋势分析，看收入是否在特定月份异常下降', '检查退货单', 'A', NULL),
(@pack_id, 43, '在数据分析中，OUTLIER (离群值) 的定义通常是？', '平均值', '中位数', '远超出数据正常分布范围的值 (如超过3个标准差)', '缺失值', 'C', NULL),
(@pack_id, 44, '使用“时间序列分析”监控每日“客诉数量”，如果发现某日客诉量突然暴增，审计师应怀疑什么？', '产品大卖', '公司客服团队扩充', '可能存在产品或服务问题，或者数据被篡改', '系统升级', 'C', NULL),
(@pack_id, 45, '审计数据分析项目失败的最常见原因是？', '工具不够高级', '数据质量差或无法获取到干净、完整的数据', '审计师不懂算法', '公司不配合', 'B', NULL),
(@pack_id, 46, '在分析“招标过程”时，如果发现多家投标公司的IP地址、MAC地址、联系人电话相同，说明什么？', '这些公司共用办公室', '存在围标、串标嫌疑', '投标文件格式美观', '采购效率高', 'B', NULL),
(@pack_id, 47, '审计数据分析的最终产出物通常是？', '原始数据', '审计发现、风险预警及改进建议', '精美的PPT动画', '数据字典', 'B', NULL),
(@pack_id, 48, '对于审计数据分析来说，“可重复性” (Reproducibility) 意味着？', '每次运行脚本得到不同结果', '其他审计师使用相同的数据和脚本能得出相同结论', '只能运行一次', '结果不能共享', 'B', NULL),
(@pack_id, 49, '审计数据分析中，最重要的伦理和合规要求是？', '数据保密', '不超出授权范围访问数据', '保护个人隐私', '以上都是', 'D', NULL),
(@pack_id, 50, '作为一名审计数据分析师，当你的分析发现表明存在高管舞弊迹象时，你应该？', '立即公开', '私下找高管对质', '遵循公司内部审计流程，向审计委员会或合规部门报告，并保护证据', '删除数据', 'C', NULL);
COMMIT;
-- ======================================================
-- 专业70：会计学×英语 → 国际财务报告翻译
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_english:0', 70, '国际财务报告翻译', 'major_accounting', 'major_english', '会计学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '将中文“未分配利润”翻译成最地道的英文财报术语是？', 'Unallocated Profit', 'Undistributed Profit', 'Retained Earnings', 'Unassigned Profit', 'C', NULL),
(@pack_id, 2, '“Property, Plant and Equipment” 的标准中文翻译是？', '财产、厂房和设备', '不动产、厂房和设备', '房产、植物和设备', '资产、厂房和机器', 'B', NULL),
(@pack_id, 3, '以下哪个是“其他综合收益”的英文正确表达？', 'Other Comprehensive Income', 'Other Total Income', 'Additional Comprehensive Gain', 'Other Comprehensive Income', 'A', NULL),
(@pack_id, 4, '“公允价值”的对应英文术语是？', 'Fair Cost', 'Fair Value', 'Just Value', 'Market Value', 'B', NULL),
(@pack_id, 5, '翻译“现金及现金等价物”，最准确的英文是？', 'Cash and Cash Equivalent', 'Money and Easy Money', 'Cash and Cash Equivalents', 'Cash and Similar', 'C', NULL),
(@pack_id, 6, '英文财报中的“Revenue”通常不翻译为？', '收入', '利润', '营收', '营业收入', 'B', NULL),
(@pack_id, 7, '“Discontinued Operations” 的中文意思是？', '继续经营', '终止经营', '中断操作', '非持续经营', 'B', NULL),
(@pack_id, 8, '翻译“股份支付”为英文是？', 'Share Payment', 'Share-based Payment', 'Stock Money', 'Equity Pay', 'B', NULL),
(@pack_id, 9, '“Impairment loss” 是指？', '折旧损失', '减值损失', '损坏损失', '减值利润', 'B', NULL),
(@pack_id, 10, '“Non-controlling interests” 在合并报表中指的是？', '无控制利益', '非控制性权益 (少数股东权益)', '非控股兴趣', '控制之外的利益', 'B', NULL),
(@pack_id, 11, '以下哪个词表示“附注 (财务报表组成部分)”？', 'Appendices', 'Attachments', 'Notes to the financial statements', 'Comments', 'C', NULL),
(@pack_id, 12, '将英文“Derecognition”翻译为中文，最佳是？', '不确认', '取消确认', '终止确认', '去认知', 'C', NULL),
(@pack_id, 13, '“Effective interest method” 是指？', '有效利率法', '实际利率法', '有效利率法 / 实际利率法', '高效利率方法', 'C', NULL),
(@pack_id, 14, '“Operating segment” 的准确实译是？', '经营片段', '经营分部', '操作部分', '业务板块', 'B', NULL),
(@pack_id, 15, '“Deferred tax asset” 是？', '递延所得税负债', '递延所得税资产', '预缴所得税', '应付所得税', 'B', NULL),
(@pack_id, 16, '翻译“同一控制下企业合并”为英文？', 'Merger under common control', 'Business combinations under common control', 'Same control merge', 'Common control acquisition', 'B', NULL),
(@pack_id, 17, '“Subsequent events” 在审计报告中是指？', '前期事件', '期后事项', '后续事件', '顺延事件', 'B', NULL),
(@pack_id, 18, '以下哪个是“资产负债表日后事项”的正确翻译？', 'Post-balance sheet events', 'Events after the reporting period', 'Future events', 'Post-date events', 'B', NULL),
(@pack_id, 19, '“Revaluation surplus” 是指？', '重估不足', '重估盈余', '评估剩余', '增值盈余', 'B', NULL),
(@pack_id, 20, '将“Warranty provision” 翻译为中文？', '保修条款', '保修准备 / 预计保修负债', '权利条款', '保证提供', 'B', NULL),
(@pack_id, 21, '“IFRS” 的全称是？', 'International Financial Reporting Systems', 'International Financial Reporting Standards', 'Internal Financial Reporting Standards', 'International Fiscal Reporting Standards', 'B', NULL),
(@pack_id, 22, '“Lease liability” 的译法是？', '租赁资产', '租赁负债', '出租责任', '租约债务', 'B', NULL),
(@pack_id, 23, '“Finance income” 通常包括？', '销售收入', '营业外收入', '利息收入', '其他业务收入', 'C', NULL),
(@pack_id, 24, '翻译“Lines of credit” 为中文？', '信贷线路', '信用额度', '信用分数', '信贷业务', 'B', NULL),
(@pack_id, 25, '“Management Discussion & Analysis (MD&A)” 的中文是？', '管理层讨论与分析', '管理对话与分析', '管理层评论', 'A', 'A', NULL),
(@pack_id, 26, '在翻译“material misstatement”时，“material”应译为？', '物质的', '重大的', '材料的', '重要的', 'B', NULL),
(@pack_id, 27, '“Going concern basis” 的中文是？', '经营基础', '持续经营基础', '继续关注基础', '经营准则', 'B', NULL),
(@pack_id, 28, '“Accrued expenses” 通常翻译为？', '预提费用', '应计费用', '预提费用 / 应计费用', '权责发生费用', 'C', NULL),
(@pack_id, 29, '“Capitalization of borrowing costs” 是指？', '借款费用的资本化', '借款成本的大写', 'A', '借款费用化', 'A', NULL),
(@pack_id, 30, '以下哪个是“实物回报”对应的英文？', 'Real return', 'Physical return', 'Tangible return', 'Asset return', 'B', NULL),
(@pack_id, 31, '“Functional currency” 是指？', '功能货币', '记账本位币', '职能货币', '作用货币', 'B', NULL),
(@pack_id, 32, '将“Hedge accounting” 翻译为中文？', '对冲会计', '套期会计', '避险会计', '套期会计', 'D', NULL),
(@pack_id, 33, '“Right-of-use asset” 是新租赁准则下的术语，中文是？', '使用权资产', '使用权利资产', '使用权资产', '资产使用权', 'C', NULL),
(@pack_id, 34, '“Defined benefit plan” 是哪种养老金计划？', '固定缴费计划', '固定收益计划', '设定受益计划 (IFRS术语)', '设定提存计划', 'C', NULL),
(@pack_id, 35, '翻译“Treasury shares”为中文？', '库存股', '国库股', '金库股', '库存股', 'D', NULL),
(@pack_id, 36, '“Non-GAAP measures” 指的是？', '非公认会计原则指标', '非通用指标', 'A', '国际准则指标', 'A', NULL),
(@pack_id, 37, '英文“Expense” 和 “Cost” 在翻译时，通常区别为？', 'Expense是费用，Cost是成本', 'Expense是成本，Cost是费用', '两者相同', 'Expense是支出，Cost是代价', 'A', NULL),
(@pack_id, 38, '“Earnings before interest, taxes, depreciation, and amortization (EBITDA)” 的正确中文是？', '息税折旧摊销前利润', '税息折旧及摊销前利润', '未计利息、税项、折旧及摊销前的利润', '以上都是', 'D', NULL),
(@pack_id, 39, '翻译“Covenant” 在债务合同中通常指？', '契约', '公约', '限制条款 / 承诺', '圣约', 'C', NULL),
(@pack_id, 40, '“Fair value hierarchy” 的三个层级是？', '1, 2, 3级', '初级、中级、高级', '第一、二、三层次输入值', 'A, B, C级', 'C', NULL),
(@pack_id, 41, '“Prospective application” 和 “Retrospective application” 的区别是？', '未来适用法和追溯调整法', '前期适用和后期适用', 'A', '前瞻应用和回顾应用', 'C', NULL),
(@pack_id, 42, '翻译“Barter transaction”为中文？', '易货交易', '讨价还价交易', '阻挠交易', '酒吧交易', 'A', NULL),
(@pack_id, 43, '“Share premium account” 的中文是？', '股票溢价账户', '股本溢价', '资本公积 (股本溢价)', '以上都可', 'D', NULL),
(@pack_id, 44, '在翻译“Proceeds from issue of shares”时，“Proceeds”应译为？', '过程', '收益', '所得款项', '进行', 'C', NULL),
(@pack_id, 45, '“Interest cover” 是衡量什么的比率？', '流动性的', '盈利能力的', '偿债能力 (利息保障倍数)', '运营效率的', 'C', NULL),
(@pack_id, 46, '将英文“Off-balance-sheet financing”翻译为？', '表内融资', '表外融资', '在线融资', '平衡表融资', 'B', NULL),
(@pack_id, 47, '“Control” 在企业合并的定义中，通常需要持有多少表决权？', '>20%', '>30%', '>50%', '100%', 'C', NULL),
(@pack_id, 48, '“Reconciliation” 在财务报告中常指？', '协调', '调节表 (如权益变动表、从净利润到经营现金流调节)', '和解', '一致性', 'B', NULL),
(@pack_id, 49, '翻译“Window dressing”在财务语境中，意为？', '窗户装修', '粉饰报表', '橱窗展示', '装扮', 'B', NULL),
(@pack_id, 50, '作为国际财务报告翻译，最重要的原则是？', '华丽的辞藻', '准确、一致、专业，遵循行业术语惯例', '快速翻译', '意译为主', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业71：会计学×英语 → ACCA双语讲师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_english:1', 71, 'ACCA双语讲师', 'major_accounting', 'major_english', '会计学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'ACCA的英文全称是？', 'American Certified Corporate Accountant', 'Association of Chartered Certified Accountants', 'Association of Certified Corporate Accountants', 'Australian Chartered Certified Accountants', 'B', NULL),
(@pack_id, 2, '在ACCA课程体系中，F3 (或 BT) 主要讲授什么内容？', '高级财务管理', '财务会计 (Financial Accounting)', '审计与鉴证', '税务', 'B', NULL),
(@pack_id, 3, '“权责发生制”的英文对应术语是？', 'Cash basis', 'Accrual basis', 'Realization basis', 'Consistency basis', 'B', NULL),
(@pack_id, 4, '在英文财务报表中，“Inventory”指的是？', '固定资产', '无形资产', '存货', '应收账款', 'C', NULL),
(@pack_id, 5, '以下哪个英文会计等式是正确的？', 'Assets = Liabilities - Equity', 'Assets = Liabilities + Equity', 'Assets + Liabilities = Equity', 'Assets = Equity - Liabilities', 'B', NULL),
(@pack_id, 6, '作为ACCA双语讲师，讲到“Provision”时，中文最准确的翻译是？', '储备', '准备', '预计负债', '条款', 'C', NULL),
(@pack_id, 7, '在ACCA F7 (或FR) 中，“Consolidation”指的是？', '破产清算', '合并财务报表', '分拆上市', '成本核算', 'B', NULL),
(@pack_id, 8, '“Trade Receivables” 的中文是？', '应付账款', '预付账款', '应收账款', '预收账款', 'C', NULL),
(@pack_id, 9, '“Going concern” 这一会计假设的中文意思是？', '会计分期', '货币计量', '持续经营', '权责发生制', 'C', NULL),
(@pack_id, 10, '在讲课中，解释“Depreciation”时，最佳举例是？', '现金的减少', '固定资产因使用和时间的推移而价值减少', '存货的增加', '利润的分配', 'B', NULL),
(@pack_id, 11, '以下哪个词表示“商誉”？', 'Goodwill', 'Goodvalue', 'Goodasset', 'Goodwill', 'A', NULL),
(@pack_id, 12, '“Cost of Sales” 的计算公式是？', 'Opening Inventory + Purchases - Closing Inventory', 'Opening Inventory + Purchases - Closing Inventory', 'Opening Inventory - Purchases + Closing Inventory', 'Closing Inventory + Purchases - Opening Inventory', 'B', NULL),
(@pack_id, 13, '在ACCA考试中，“Ethics”模块主要强调什么？', '如何逃税', '会计职业道德和专业行为准则', '高级数学', '公司历史', 'B', NULL),
(@pack_id, 14, '“Non-current Assets” 包括以下哪项？', 'Cash', 'Inventory', 'Property, Plant & Equipment', 'Trade Receivables', 'C', NULL),
(@pack_id, 15, '以下哪个是“利润表”的标准英文名称？', 'Balance Sheet', 'Cash Flow Statement', 'Statement of Profit or Loss (Income Statement)', 'Statement of Changes in Equity', 'C', NULL),
(@pack_id, 16, '英语短语 “in the black” 表示什么？', '亏损', '盈利', '黑账', '不清不楚', 'B', NULL),
(@pack_id, 17, '讲到“Substance over form”时，应解释为？', '形式重于实质', '实质重于形式', '两者都重要', '两者都不重要', 'B', NULL),
(@pack_id, 18, 'ACCA SBL (或P1) 科目的核心是什么？', '计算题', '战略商业领袖 (治理、风险、战略等)', '税务表格填写', '审计底稿编制', 'B', NULL),
(@pack_id, 19, '“Debit note” 和 “Credit note” 的区别是？', '前者是买方开给卖方的退货凭证，后者是卖方开给买方的折让凭证', '相反，前者是卖方开，后者是买方开', '两者一样', '都是发票', 'A', NULL),
(@pack_id, 20, '在双语教学中，讲到“Overhead”时，中文最适合解释为？', '头顶', '间接费用 / 制造费用', '高架桥', '忽略', 'B', NULL),
(@pack_id, 21, '“Share Premium” 账户在英文中表示？', '股份折扣', '股本溢价', '股利', '资本赎回', 'B', NULL),
(@pack_id, 22, '对于ACCA考生，理解“Accelerated payment”的含义是？', '延期付款', '分期付款', '提前付款 (通常涉及税务)', '付款失败', 'C', NULL),
(@pack_id, 23, '在讲到“IRR (Internal Rate of Return)”时，应解释为？', '投资回收期', '内部收益率，使NPV为零的折现率', '净现值', '会计收益率', 'B', NULL),
(@pack_id, 24, '“FIFO” 和 “LIFO” 分别代表什么存货计价方法？', '先进先出和后进先出', '后进先出和先进先出', '平均法和个别计价法', '计划成本法和实际成本法', 'A', NULL),
(@pack_id, 25, '在英文中，“Audit” 和 “Assurance” 的主要区别？', '无区别', 'Audit是Assurance的一种，Assurance范围更广，包括审计、审阅等', 'Assurance是Audit的一种', 'Audit是关于效率，Assurance是关于合规', 'B', NULL),
(@pack_id, 26, '讲到“Operating Lease” 和 “Finance Lease”，如何区分？', '经营租赁所有权风险报酬转移，融资租赁不转移', '融资租赁所有权风险报酬基本转移，经营租赁不转移', '两者相同', '取决于租期', 'B', NULL),
(@pack_id, 27, '“Work in Progress (WIP)” 的中文是？', '完工产品', '在产品', '原材料', '库存商品', 'B', NULL),
(@pack_id, 28, '在双语教学中，用英文解释“Materiality”概念，应该是？', 'Information is perfect.', 'Information is significant enough to influence the economic decisions of users.', 'Information is cheap.', 'Information is confidential.', 'B', NULL),
(@pack_id, 29, '“Conservatism” 会计原则是指？', '高估资产和收益', '不高估资产和收益，不低估负债和费用', '激进会计', '忽略风险', 'B', NULL),
(@pack_id, 30, '在ACCA考试中，“Section A”通常是哪种题型？', '论述题 (Essay)', '案例分析 (Case Study)', '客观题 (MCQ)', '填空题', 'C', NULL),
(@pack_id, 31, '英文短语“Write off” 在会计中意为？', '写出', '冲销 / 核销', '写下', '记账', 'B', NULL),
(@pack_id, 32, '“Gross Profit Margin” 的计算公式是？', 'Gross Profit / Sales * 100%', 'Gross Profit / Revenue * 100%', 'Net Profit / Revenue * 100%', 'Gross Profit / Assets * 100%', 'B', NULL),
(@pack_id, 33, '讲到“Corporate Governance”，应重点提及？', '政府管理', '公司治理结构，如董事会职责、股东权利等', '公司税务', '公司营销', 'B', NULL),
(@pack_id, 34, '“Deferred Tax” 产生的原因是什么？', '税款延迟缴纳', '会计利润与应税利润的暂时性差异', '税收优惠', '偷税漏税', 'B', NULL),
(@pack_id, 35, '在讲解“Statement of Cash Flows”时，三大活动分类是？', '销售、生产、采购', '经营、投资、筹资', '预算、核算、决算', '收入、支出、结余', 'B', NULL),
(@pack_id, 36, '“Minority Interest (NCI)” 在合并报表中是指？', '小股东的兴趣', '非控制性权益', '少数人的利息', '少数服从多数', 'B', NULL),
(@pack_id, 37, '讲到“Ratio Analysis”，哪个比率是衡量短期偿债能力的？', 'Gearing ratio', 'Current ratio', 'ROCE', 'Asset turnover', 'B', NULL),
(@pack_id, 38, '“VAT” 是哪种税的缩写？', '企业所得税', '增值税', '个人所得税', '消费税', 'B', NULL),
(@pack_id, 39, '在ACCA P阶段，选修科目“AFM (P4)” 侧重？', '税务筹划', '高级财务管理 (如并购、风险、期权)', '审计实务', '公司法', 'B', NULL),
(@pack_id, 40, '英文“Invoice”和“Receipt”的区别是？', '发票和收据', '订单和合同', '支票和汇票', '账单和报表', 'A', NULL),
(@pack_id, 41, '讲到“Earnings Per Share (EPS)”，公式是？', '(Net Income - Preferred Dividends) / Weighted Average Common Shares', 'Net Income / Total Assets', 'Revenue / Shares', 'A', 'A', NULL),
(@pack_id, 42, '在双语教学中，解释“Capital Expenditure (CAPEX)” 和 “Revenue Expenditure (OPEX)” 的区别，关键在于？', '金额大小', '是否增加未来经济利益 (形成资产)', '支付对象', '支付时间', 'B', NULL),
(@pack_id, 43, '“Intangible Assets” 的例子包括？', '机器设备', '现金', '专利权、商标权', '原材料', 'C', NULL),
(@pack_id, 44, '在讲解“Budgeting”时，“Variance Analysis”指的是？', '差异分析', '方差数学', '预算编制', '预测分析', 'A', NULL),
(@pack_id, 45, '为了提高学生通过率，ACCA双语讲师应该强调刷？', '历年真题 (Past exam papers)', '教材 (Study text)', '考官文章 (Examiner\'s report)', '以上都是', 'D', NULL),
(@pack_id, 46, '“True and Fair View” 是财务报告的什么要求？', '绝对精确', '真实与公允', '形式主义', '快速编制', 'B', NULL),
(@pack_id, 47, '讲到“Transfer Pricing”，主要关注的问题是？', '商品运输价格', '关联方交易定价，以避免税务或调节利润', '股权转让价格', '保险费率', 'B', NULL),
(@pack_id, 48, '在ACCA考试中，“Pass mark” 通常是？', '100%', '75%', '50%', '30%', 'C', NULL),
(@pack_id, 49, '“ESG” 报告中的 “G” 代表什么？', 'Government', 'Growth', 'Governance', 'Green', 'C', NULL),
(@pack_id, 50, '作为一名成功的ACCA双语讲师，最重要的能力是？', '流利的英语', '深厚的会计知识', '将复杂概念用双语清晰讲解的教学能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业72：会计学×英语 → 外资企业总账会计
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_english:2', 72, '外资企业总账会计', 'major_accounting', 'major_english', '会计学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在外资企业，总账会计月末需要完成的最重要的报表是？', '销售明细表', '四表一注 (资产负债表、利润表、现金流量表、权益变动表、附注)', '采购订单列表', '员工考勤表', 'B', NULL),
(@pack_id, 2, '将中文“预提本月银行借款利息”写成英文分录，正确的是？', 'Dr. Interest expense, Cr. Bank', 'Dr. Interest expense, Cr. Accrued interest', 'Dr. Bank, Cr. Interest income', 'Dr. Prepaid interest, Cr. Bank', 'B', NULL),
(@pack_id, 3, '外资企业总账会计在收到境外母公司的管理费发票时，正确的英文科目是？', 'Management Fee Income', 'Management Fee Expense', 'Administrative Cost', 'Selling Expense', 'B', NULL),
(@pack_id, 4, '“Close the books for the month” 这个英文短语指的是？', '关闭账簿，不再记账', '完成月度结账，所有交易已过账和调整', '把书合上', '销毁账簿', 'B', NULL),
(@pack_id, 5, '在英文财务报表中，用来表示“年初余额”的列标题通常是？', 'Current Year', 'Prior Year', 'Beginning balance / Brought forward', 'Opening balance', 'C', NULL),
(@pack_id, 6, '处理“Advance from customer” 时，正确的会计分录是？', 'Dr. Cash, Cr. Revenue', 'Dr. Cash, Cr. Accounts Receivable', 'Dr. Cash, Cr. Unearned Revenue / Deferred Income', 'Dr. Accounts Payable, Cr. Cash', 'C', NULL),
(@pack_id, 7, '外资企业，收到银行对账单，发现有未达账项“Deposit in transit”，应如何翻译和处理？', '在途存款，公司已记收，银行未记，需调节增加银行余额', '在途存款，银行已记收，公司未记，需调节增加公司余额', '未兑现支票', '银行手续费', 'A', NULL),
(@pack_id, 8, '“Intercompany transaction” 的对账，对于外资企业而言，通常指？', '公司与客户间的交易', '公司与关联公司 (如母公司、兄弟公司) 间的交易', '部门之间的交易', '公司与政府间的交易', 'B', NULL),
(@pack_id, 9, '以下哪个科目属于“Equity”类？', 'Retained earnings', 'Share capital', 'Treasury stock', '以上都是', 'D', NULL),
(@pack_id, 10, '在总账中，过账一笔“Accrued bonus” 的英文分录是？', 'Dr. Bonus expense, Cr. Cash', 'Dr. Prepaid bonus, Cr. Cash', 'Dr. Bonus expense, Cr. Accrued bonus liability', 'Dr. Retained earnings, Cr. Bonus expense', 'C', NULL),
(@pack_id, 11, '外资企业总账会计在季度末，需要计算“Corporate Income Tax (CIT)” 的预提，其英文分录为？', 'Dr. Tax expense, Cr. Cash', 'Dr. Deferred tax, Cr. Tax expense', 'Dr. Tax expense, Cr. Tax payable', 'Dr. Tax payable, Cr. Tax expense', 'C', NULL),
(@pack_id, 12, '“Fixed assets register” 是总账会计需要维护的什么？', '固定资产清单', '固定资产明细账 (记录原值、折旧、处置等)', '固定资产卡片', '以上都是', 'D', NULL),
(@pack_id, 13, '月末结账时，将“Cost of goods sold” 从“Inventory” 结转，英文分录是？', 'Dr. Inventory, Cr. COGS', 'Dr. COGS, Cr. Inventory', 'Dr. Revenue, Cr. Inventory', 'Dr. COGS, Cr. Revenue', 'B', NULL),
(@pack_id, 14, '收到一笔“Loan from bank” 的本金，分录为？', 'Dr. Interest expense, Cr. Bank', 'Dr. Bank, Cr. Revenue', 'Dr. Bank, Cr. Loan payable', 'Dr. Loan payable, Cr. Bank', 'C', NULL),
(@pack_id, 15, '在英文中，用来冲销坏账的“Allowance for doubtful accounts” 属于什么类型科目？', '资产备抵科目 (Contra-asset)', '费用科目', '负债科目', '权益科目', 'A', NULL),
(@pack_id, 16, '“Trial balance” 的中文是？', '试算平衡表', '资产负债表', '试错表', '平衡表', 'A', NULL),
(@pack_id, 17, '外资企业总账会计做“Bank reconciliation” 时，发现公司账面余额与银行对账单余额不符，首先应？', '调整公司账面余额以符合银行', '调整银行余额以符合公司账面', '编制余额调节表，找出差异项目', '忽略差异', 'C', NULL),
(@pack_id, 18, '将中文“本月的折旧费用” 译为英文科目是？', 'This month\'s old expense', 'Depreciation expense', 'Amortization cost', 'Devaluation fee', 'B', NULL),
(@pack_id, 19, '“Cut-off” 测试在财务期末进行，目的是？', '确保交易记录在正确的会计期间', '测试系统性能', '计算税额', '发放工资', 'A', NULL),
(@pack_id, 20, '在英文邮件中，向上级汇报“我们已经完成月度结账”，应说？', 'We finished the monthly settlement.', 'We have closed the books for this month.', 'We ended the month.', 'The month is over.', 'B', NULL),
(@pack_id, 21, '对于“Prepaid insurance” 的摊销，正确的分录是？', 'Dr. Prepaid insurance, Cr. Insurance expense', 'Dr. Cash, Cr. Prepaid insurance', 'Dr. Insurance expense, Cr. Prepaid insurance', 'Dr. Insurance expense, Cr. Cash', 'C', NULL),
(@pack_id, 22, '以下哪个不是总账会计的典型职责？', '审核会计凭证', '编制财务报表', '直接销售产品给客户', '进行月末调整分录', 'C', NULL),
(@pack_id, 23, '“Variance analysis” 在外资企业通常指比较什么？', '实际与预算', '今年与去年', '公司与行业', '成本与售价', 'A', NULL),
(@pack_id, 24, '子公司向母公司宣告并支付股利，母公司在收到现金时的分录是？', 'Dr. Cash, Cr. Dividend income', 'Dr. Cash, Cr. Investment in subsidiary', 'A (成本法下)', 'Dr. Investment, Cr. Cash', 'C', NULL),
(@pack_id, 25, '“Period-end adjusting entries” 包括哪些类型？', 'Accruals', 'Prepayments', 'Depreciation', '以上都是', 'D', NULL),
(@pack_id, 26, '“Foreign exchange gain or loss” 发生的情境是？', '有外币业务，且汇率变动', '购买原材料', '支付员工工资', '销售产品', 'A', NULL),
(@pack_id, 27, '在英文报表中，“Thousands of RMB” 作为货币单位表示？', '人民币元', '人民币千元', '人民币万元', '千分之一元', 'B', NULL),
(@pack_id, 28, '总账会计发现上个月的折旧少计提了，应如何更正？', '忽略，下个月多提', '直接修改上个月的凭证', '在本月做一笔调整分录，补提差额', '反结账到上月修改', 'C', NULL),
(@pack_id, 29, '“Consolidated financial statements” 是合并什么？', '不同部门的报表', '母公司和子公司的报表', '不同项目的报表', '国内和国外的报表', 'B', NULL),
(@pack_id, 30, '在英文会议上，听到 “Let\'s do a deep dive on SG&A.” ，其中SG&A是指？', '销售成本', '管理费用', '销售、一般及行政费用', '研发费用', 'C', NULL),
(@pack_id, 31, '外资企业总账会计在年底需要处理的“Closing entries” 主要目的是？', '将临时性账户(收入、费用)余额结转到“Retained earnings”', '准备下一年预算', '支付年终奖', '编制下一年会计政策', 'A', NULL),
(@pack_id, 32, '以下哪个是“应付职工薪酬”的英文？', 'Payable to staff', 'Accrued payroll / Payroll payable', 'Employee benefits expense', 'Salary fund', 'B', NULL),
(@pack_id, 33, '“Tax filing” 是指总账会计需要完成的什么工作？', '报税', '税收筹划', '税务审计', '税务培训', 'A', NULL),
(@pack_id, 34, '收到客户支付的预付款，应记入哪个英文科目？', 'Accounts Receivable', 'Deferred Revenue / Unearned Revenue', 'Advance to supplier', 'Revenue', 'B', NULL),
(@pack_id, 35, '对于租赁办公室，支付的押金 (deposit) 应计入？', 'Rent expense', 'Other receivable / Deposit paid', 'Prepaid rent', 'Fixed assets', 'B', NULL),
(@pack_id, 36, '“Goods received not invoiced (GRNI)” 是采购到货但未收到发票的情况，月底应如何调整？', '不处理', 'Dr. Inventory, Cr. Accrued liabilities', 'Dr. Expense, Cr. Accounts payable', 'Dr. Accounts payable, Cr. Cash', 'B', NULL),
(@pack_id, 37, '在外企，总账会计通常使用什么软件进行账务处理？', 'Photoshop', 'SAP / Oracle / Microsoft Dynamics 等ERP', 'Premiere Pro', 'AutoCAD', 'B', NULL),
(@pack_id, 38, '英文邮件中请求财务总监批准一笔“Journal entry”，主题行最好写？', 'A change', 'Approval required: Journal entry #123 for December accrual', 'Hello', 'Important', 'B', NULL),
(@pack_id, 39, '“Income tax payable” 和 “Deferred tax liability” 的区别是？', '前者是当期应交，后者是未来应交', '前者是负债，后者是资产', '两者一样', '前者是费用，后者是收益', 'A', NULL),
(@pack_id, 40, '总账会计在核对“Accounts Payable sub-ledger”与“General Ledger”时，如果不符，应首先？', '直接修改总账', '直接修改明细账', '查找差异原因，并调整至一致', '忽略差异', 'C', NULL),
(@pack_id, 41, '“VAT output” 和 “VAT input” 分别对应什么？', '销项税和进项税', '出口税和进口税', '增值税和消费税', '应缴税和已缴税', 'A', NULL),
(@pack_id, 42, '在现金流量表中，“Purchase of equipment” 属于哪类活动？', 'Operating', 'Investing', 'Financing', 'Not reported', 'B', NULL),
(@pack_id, 43, '“Rolling forecast” 是指什么？', '滚动预算/预测', '滚雪球预测', '固定预算', '历史分析', 'A', NULL),
(@pack_id, 44, '以下哪个文件是外资企业每年必须由外部审计师出具的？', '销售合同', '审计报告 (Audit report)', '采购订单', '员工手册', 'B', NULL),
(@pack_id, 45, '“The books are in balance” 意思是？', '账簿平衡 (借贷相等)', '账簿很平衡 (美观)', '账簿被平衡了', '账簿在平衡木上', 'A', NULL),
(@pack_id, 46, '总账会计在年底进行“Inventory count” 的财务调整，如果盘点发现盘亏，分录是？', 'Dr. Inventory, Cr. COGS', 'Dr. COGS, Cr. Inventory', 'Dr. Inventory shortage expense, Cr. Inventory', 'Dr. Inventory, Cr. Gain', 'C', NULL),
(@pack_id, 47, '向境外母公司支付“Dividend” 时，需要考虑什么税？', '增值税', '消费税', '预提所得税 (Withholding tax)', '房产税', 'C', NULL),
(@pack_id, 48, '“Temporary differences” 是计算什么的基础？', '当期所得税', '递延所得税', '流转税', '印花税', 'B', NULL),
(@pack_id, 49, '“Presentation currency” 和 “Functional currency” 可能不同，例如中国子公司用RMB记账，但向美国母公司报告用USD，则USD是？', '记账本位币', '列报货币', '功能货币', '交易货币', 'B', NULL),
(@pack_id, 50, '作为一名外资企业总账会计，最重要的能力是？', '英语流利', '精通国际会计准则 (IFRS/US GAAP)', '细心、按时结账的能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业73：计算机科学×金融学 → 量化开发工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_finance:0', 73, '量化开发工程师', 'major_cs', 'major_finance', '计算机科学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '量化开发工程师主要使用哪种编程语言来实现低延迟交易系统？', 'Python', 'Java', 'C++', 'JavaScript', 'C', NULL),
(@pack_id, 2, '在量化交易中，以下哪个库最常用于Python中的数值计算和数组操作？', 'Django', 'Requests', 'NumPy', 'BeautifulSoup', 'C', NULL),
(@pack_id, 3, '开发高频交易 (HFT) 系统时，对延迟最敏感的是哪个部分？', '数据存储', '行情解码和订单发送', '用户界面', '生成日终报告', 'B', NULL),
(@pack_id, 4, '以下哪个是常见的“市场微观结构”现象？', '有效市场假说', '买卖价差', '随机游走', '资本资产定价模型', 'B', NULL),
(@pack_id, 5, '处理实时行情数据，通常使用哪种消息中间件以保证低延迟和高吞吐？', 'RabbitMQ', 'Kafka', 'ZeroMQ 或 专有组播技术', 'ActiveMQ', 'C', NULL),
(@pack_id, 6, '在Linux系统中，为了减少网络延迟，量化开发者会使用什么技术？', '普通TCP Socket', '内核旁路 (Kernel Bypass) 如DPDK', 'HTTP协议', 'FTP协议', 'B', NULL),
(@pack_id, 7, '一个简单的双均线策略，当短期均线上穿长期均线时，产生什么信号？', '卖出信号', '买入信号', '平仓信号', '无信号', 'B', NULL),
(@pack_id, 8, '回测中常见的“未来函数” (Look-ahead bias) 是指什么？', '使用历史数据', '在信号生成的时刻使用了未来的数据', '交易成本设置过高', '样本数据量太少', 'B', NULL),
(@pack_id, 9, 'C++中，为了将对象分配在栈上而非堆上以获得更高性能，通常会？', '使用 new 关键字', '使用 malloc', '直接声明局部变量，不使用指针', '使用智能指针', 'C', NULL),
(@pack_id, 10, '以下哪个是衡量策略风险调整后收益的常用指标？', '年化收益率', '夏普比率 (Sharpe Ratio)', '最大回撤', '胜率', 'B', NULL),
(@pack_id, 11, '在量化开发中，“Order Book” 是指？', '订单簿，记录所有买入和卖出的委托', '账簿', '记账本', '订购单', 'A', NULL),
(@pack_id, 12, '为了减少C++程序中的动态内存分配，提高性能，通常使用？', '全局变量', '对象池 (Object Pool) 或 自定义分配器', '递归函数', '虚函数', 'B', NULL),
(@pack_id, 13, '量化交易系统通常分为在线和离线部分，离线部分主要是指？', '订单执行', '风险监控', '策略研发和回测', '行情接收', 'C', NULL),
(@pack_id, 14, '在金融领域，用Python做回测时，pandas 库中的 shift() 函数的作用是？', '移动数据', '将数据向上或向下平移，常用于计算滞后项', '删除数据', '填充空值', 'B', NULL),
(@pack_id, 15, '“锁” (Mutex) 在高频交易代码中需要谨慎使用，因为？', '会导致死锁', '会导致数据竞争', '会引入上下文切换和阻塞，增加延迟', '会导致内存泄漏', 'C', NULL),
(@pack_id, 16, '一个策略的最大回撤是20%，这意味着？', '策略亏了20%', '策略从最高点下跌的最大幅度是20%', '策略胜率20%', '策略年化收益20%', 'B', NULL),
(@pack_id, 17, '开发对接交易所的接口时，需要处理的数据格式通常是？', 'XML', 'JSON', '二进制协议 (如 Fix 协议或专有格式)', 'YAML', 'C', NULL),
(@pack_id, 18, '以下哪种技术可以实现“无锁编程”以避免锁的开销？', '使用更多的锁', '使用原子操作 (Atomic Operations) 和 CAS', '使用 sleep', '使用递归', 'B', NULL),
(@pack_id, 19, '“冰山订单” (Iceberg Order) 的作用是？', '显示全部订单量', '隐藏真实订单量，只显示一小部分', '加速成交', '降低手续费', 'B', NULL),
(@pack_id, 20, '在量化回测中，过拟合的一个明显迹象是？', '样本内和样本外表现都很好', '样本内表现很好，但样本外表现很差', '样本内和样本外表现都很差', '样本内表现差，样本外表现好', 'B', NULL),
(@pack_id, 21, '对于量化开发工程师，理解“Tick data” 是指？', '日线数据', '分钟数据', '逐笔成交数据 (Tick-by-tick)', '基本面数据', 'C', NULL),
(@pack_id, 22, 'C++中，constexpr 关键字的作用是？', '声明常量', '在编译期计算表达式值', '声明常成员函数', '声明常量指针', 'B', NULL),
(@pack_id, 23, '一个均值回归策略假设什么？', '价格会趋势运动', '价格会随机游走', '价格会围绕均值上下波动，偏离后会回归', '价格会永远上涨', 'C', NULL),
(@pack_id, 24, '在Linux中，使用 nice 命令调整进程优先级，对量化交易进程应设置为？', '低优先级 (高nice值)', '高优先级 (低nice值，负值)', '默认优先级', '无关紧要', 'B', NULL),
(@pack_id, 25, '什么是对数收益率？其优点是？', '价格的对数', '连续复利收益率，具有时间可加性', '收益率的对数', '始终为正', 'B', NULL),
(@pack_id, 26, '“内存屏障” (Memory Barrier) 在多核编程中的作用是？', '隔离内存', '保证内存操作的顺序性', '增加内存容量', '降低内存速度', 'B', NULL),
(@pack_id, 27, '在策略优化中，参数数量过多会导致什么问题？', '欠拟合', '过拟合', '模型简单', '计算变快', 'B', NULL),
(@pack_id, 28, '使用FPGA进行硬件加速，在量化交易中的主要应用是？', '生成交易报告', '实现复杂的GUI', '极低延迟的行情解码和风控逻辑', '数据备份', 'C', NULL),
(@pack_id, 29, '“止损” (Stop-loss) 订单的目的是？', '锁定利润', '限制亏损', '增加持仓', '降低手续费', 'B', NULL),
(@pack_id, 30, '回测中，如果不考虑交易成本 (佣金、滑点)，会导致什么？', '回测结果更保守', '回测结果过于乐观 (高估收益)', '回测结果不变', '回测无法进行', 'B', NULL),
(@pack_id, 31, 'Python的GIL (Global Interpreter Lock) 对量化开发的影响是？', '提升了多线程性能', '限制了同一进程内多线程的CPU并行计算能力', '使得Python无法用于量化', '没有影响', 'B', NULL),
(@pack_id, 32, '“订单执行算法” (如VWAP, TWAP) 的目的是？', '最大化冲击成本', '最小化市场冲击和跟踪误差', '最快速度成交', '随机成交', 'B', NULL),
(@pack_id, 33, '在版本控制中，使用Git，git rebase 和 git merge 的主要区别是？', '没有区别', 'rebase 会合并成一个线性历史，merge 保留分支历史', 'merge 会删除分支', 'rebase 会创建新分支', 'B', NULL),
(@pack_id, 34, '对于量化系统，日志记录应避免在关键路径上使用同步IO，因为？', '浪费磁盘空间', '难以阅读', '会阻塞交易线程，增加延迟', '不安全', 'C', NULL),
(@pack_id, 35, '“Alpha因子” 是指什么？', '市场收益率', '无风险利率', '能够预测未来收益的特定信号或指标', '风险管理因子', 'C', NULL),
(@pack_id, 36, '开发跨平台的量化系统时，处理不同操作系统的时间精度，应使用？', 'time() 函数', 'clock_gettime (Linux) 和 QueryPerformanceCounter (Windows)', 'sleep', 'datetime.now()', 'B', NULL),
(@pack_id, 37, '“配对交易” (Pairs trading) 是一种什么策略？', '趋势策略', '做多单个股票', '市场中性统计套利策略', '期货策略', 'C', NULL),
(@pack_id, 38, '在C++中，std::vector 的 reserve() 方法的作用是？', '改变vector大小', '预先分配内存，避免多次重新分配', '删除元素', '排序', 'B', NULL),
(@pack_id, 39, '高频交易系统的核心性能指标是？', '吞吐量 (TPS)', '延迟 (Latency)，特别是p99或p50延迟', '代码行数', 'CPU使用率', 'B', NULL),
(@pack_id, 40, '以下哪个不是常见的风险管理指标？', 'VaR (风险价值)', '希腊字母 (Delta, Gamma)', 'P/E 比率', '杠杆率', 'C', NULL),
(@pack_id, 41, '编写高性能的C++代码，避免使用 std::function 和 std::bind，因为？', '功能不强大', '可能有额外的类型擦除和动态分配开销', '语法不简洁', '不支持lambda', 'B', NULL),
(@pack_id, 42, '“算法交易”与“程序化交易”的区别，通常在于？', '算法交易强调执行算法，程序化交易概念更广', '两者相同', '程序化交易强调算法', '算法交易是手动下单', 'A', NULL),
(@pack_id, 43, '在Linux下，使用 perf 工具可以做什么？', '性能剖析，定位热点函数', '调试代码', '编辑文本', '网络监控', 'A', NULL),
(@pack_id, 44, '“统计套利”基于什么假设？', '市场总是有效的', '价格是随机的', '资产价格之间存在长期稳定的统计关系', '市场永远上涨', 'C', NULL),
(@pack_id, 45, '设计一个支持实时风控的模块，需要在收到订单请求时进行校验，这要求该模块的延迟在？', '秒级', '百毫秒级', '微秒级', '分钟级', 'C', NULL),
(@pack_id, 46, '在Python中，使用 numba 库的 @jit 装饰器的主要作用是？', '即时编译，加速数值计算', '创建线程', '连接数据库', '绘制图表', 'A', NULL),
(@pack_id, 47, '订单的“部分成交”在系统中的状态应如何处理？', '丢弃未成交部分', '等待全部成交再处理', '维护部分成交的状态，并根据策略决定是否撤单或等待', '报告为错误', 'C', NULL),
(@pack_id, 48, '“Tick-to-Trade” 延迟是指？', '行情到来至产生交易信号的时间', '行情到来至订单送达交易所的时间', '订单成交至收到确认的时间', '整个交易周期', 'B', NULL),
(@pack_id, 49, '量化开发工程师和量化研究员的主要分工是？', '研究员负责数据清洗，开发负责建模型', '研究员负责策略逻辑和因子发现，开发负责系统架构、实现和优化', '两者相同', '研究员负责写代码，开发负责写报告', 'B', NULL),
(@pack_id, 50, '作为量化开发工程师，最重要的非功能性需求是？', '代码可读性', '系统的可靠性、低延迟和高可用性', '用户界面美观', '文档齐全', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业74：计算机科学×金融学 → 金融科技产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_finance:1', 74, '金融科技产品经理', 'major_cs', 'major_finance', '计算机科学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '设计一款移动支付App，最核心的“痛点”是什么？', '界面美观', '安全、便捷、高效地完成支付', '社交功能', '积分商城', 'B', NULL),
(@pack_id, 2, '金融科技产品在监管合规方面，以下哪个是最重要的原则？', '创新至上', 'KYC (了解你的客户) 和反洗钱 (AML)', '快速迭代', '低成本', 'B', NULL),
(@pack_id, 3, '用户在使用P2P借贷产品时，最关心的功能是？', '借款额度高', '利率和还款计划的清晰展示', '是否可以提前还款', '邀请好友奖励', 'B', NULL),
(@pack_id, 4, '以下哪个不是常见的数字身份认证技术？', '人脸识别', '短信验证码', '指纹识别', 'GPS定位', 'D', NULL),
(@pack_id, 5, '金融科技产品经理在设计“信用评分”功能时，应当向用户透明哪项信息？', '评分的具体算法公式', '影响评分的主要因素 (如还款历史、负债率)', '所有用户的评分列表', '风控模型源码', 'B', NULL),
(@pack_id, 6, '一个智能投顾 (Robo-advisor) 产品的核心价值主张是？', '获取高收益', '提供低成本、自动化的资产配置和再平衡', '频繁交易', '推荐个股', 'B', NULL),
(@pack_id, 7, '对于“数字银行”App，提高用户活跃度和粘性的关键功能通常是？', '电子账单下载', '实时消费通知和资金管理工具 (如预算、分类)', '汇率查询', '客服电话', 'B', NULL),
(@pack_id, 8, '在设计“保险科技”产品时，简化投保流程的关键是？', '冗长的健康告知书', '基于规则的智能核保，减少用户输入', '要求用户上传大量资料', '电话确认', 'B', NULL),
(@pack_id, 9, '对于跨境支付产品，用户最看重的三点是？', '速度、价格、透明度', '品牌颜色、广告、赠品', '员工人数、办公室地点、CEO颜值', '以上都不对', 'A', NULL),
(@pack_id, 10, '设计一款“个人财务管理”App，最基础也是最重要的功能是？', '投资推荐', '自动同步银行和信用卡交易并分类', '社区讨论', '贷款申请', 'B', NULL),
(@pack_id, 11, '金融科技产品的“无缝体验”是指？', '无网络连接', '在不同设备和渠道间体验一致，流程连续', '无客服', '无广告', 'B', NULL),
(@pack_id, 12, '当监管政策变化，要求所有用户必须完成“增强尽职调查”(EDD) 时，产品经理应如何设计用户流程？', '直接冻结所有账户', '设计清晰、引导式的KYC升级流程，并提供必要的帮助', '忽略该要求', '全部默认为通过', 'B', NULL),
(@pack_id, 13, '作为产品经理，衡量一个“消费信贷”产品成功的关键业务指标是？', '申请人数', '批准率', '不良贷款率 (NPL) 和 贷款发放量', '客服电话数量', 'C', NULL),
(@pack_id, 14, '在设计“API 开放平台”给第三方开发者时，最重要的是提供什么？', '精美的官网', '清晰的API文档、测试沙箱和开发者控制台', '免费的咖啡', '线下见面会', 'B', NULL),
(@pack_id, 15, '“开放银行” (Open Banking) 的核心思想是？', '银行将用户数据卖给第三方', '在用户授权下，通过API安全地共享金融数据给第三方服务商', '银行开放所有网点', '银行公开财务数据', 'B', NULL),
(@pack_id, 16, '金融科技App中，常见的“千人千面”通常基于什么实现？', '随机展示', '用户画像和行为数据', '所有用户相同', '运营人员手动选择', 'B', NULL),
(@pack_id, 17, '在线开户流程中，为了平衡用户体验和反欺诈，通常在哪一步设置最严格的校验？', '输入手机号', '设置密码', '身份认证和视频面签', '阅读协议', 'C', NULL),
(@pack_id, 18, '当A/B测试显示新的贷款申请流程提高了转化率，但同时也提高了申请逾期率，产品经理应？', '立即全量上线新流程', '回退到旧流程', '分析新流程吸引的用户质量，可能需要调整风控策略或流程细节', '忽略逾期率', 'C', NULL),
(@pack_id, 19, '以下哪个是描述“区块链”在金融科技中应用的错误说法？', '提高交易透明度', '降低信任成本', '比特币是唯一的应用', '智能合约', 'C', NULL),
(@pack_id, 20, '金融科技产品经理需要跟踪的“监管科技” (RegTech) 趋势，主要是因为？', '可以降低合规成本', '自动生成监管报告', '实时监控交易风险', '以上都是', 'D', NULL),
(@pack_id, 21, '设计“账户余额”展示，除了数字外，还应考虑展示什么信息以增强信任？', '余额的哈希值', '余额的最后更新时间', 'CEO的签名', '广告', 'B', NULL),
(@pack_id, 22, '对于一款“众筹”产品，最核心的信任机制是？', '项目发起人的故事写得好', '资金托管、项目进展更新和退款保证', '回报的种类多', '倒计时', 'B', NULL),
(@pack_id, 23, '当用户遇到支付失败时，产品应当？', '显示“系统错误”', '给出具体失败原因 (如余额不足、卡已过期) 和解决方案', '静默失败', '自动重试无限次', 'B', NULL),
(@pack_id, 24, '金融科技产品经理需要了解的“GDPR”主要关于？', '财务报表', '数据隐私和保护', '反洗钱', '资本充足率', 'B', NULL),
(@pack_id, 25, '对于一个“供应链金融”产品，主要服务的对象是？', '个人消费者', '中小企业和其核心企业上下游', '房地产开发商', '政府部门', 'B', NULL),
(@pack_id, 26, '在产品需求文档中，对于“提现”功能，必须明确的非功能性需求是？', '提现按钮颜色', '到账时间SLA和安全性要求 (如SSL加密)', '用户头像', '背景音乐', 'B', NULL),
(@pack_id, 27, '用户反馈“我的投资组合收益怎么计算得这么复杂？”，产品经理应如何改进？', '不改进，用户应该学金融', '在UI上增加收益计算方式的图文说明或示例', '删除收益计算功能', '改为只能看成本', 'B', NULL),
(@pack_id, 28, '金融科技产品风险中，“流动性风险”对于哪类产品最为突出？', '活期储蓄', '股票交易', 'P2P网贷平台 (资金池模式)', '保险', 'C', NULL),
(@pack_id, 29, '设计“还信用卡”功能时，一个好的用户体验应包括？', '只能全额还款', '展示最低还款额和利息计算器，并提供预约还款', '还款后无法查询记录', '每次还款都需视频认证', 'B', NULL),
(@pack_id, 30, '“金融包容性” (Financial Inclusion) 是金融科技的一大目标，其含义是？', '让富人更富', '让更多未被传统金融覆盖的人群获得金融服务', '增加银行利润', '减少金融科技公司', 'B', NULL),
(@pack_id, 31, '产品经理在定义“智能风控模型”的需求时，最应该关注的模型输出是？', '模型的数学公式', '模型的决策分数和对应的行动建议 (通过、拒绝、人工审核)', '模型训练者的姓名', '模型使用的服务器型号', 'B', NULL),
(@pack_id, 32, '对于一家金融科技公司，最重要的资产是？', '办公楼', '用户数据和用户信任', '服务器硬件', '公司章程', 'B', NULL),
(@pack_id, 33, '当竞争对手推出“1秒到账”功能时，你的产品还是“T+1”，你应首先？', '要求技术团队1个月内上线同样功能', '忽视竞争对手', '分析1秒到账背后的成本、风险和用户真实需求，评估是否值得跟进或差异化', '关闭产品', 'C', NULL),
(@pack_id, 34, '产品上线后，发生了一起客户资金被盗刷事件，产品经理应最优先做什么？', '找出是谁的责任', '撰写事故报告', '立即启动应急预案，暂停可疑交易，协助客户冻结账户并挽回损失', '发布新版本掩盖问题', 'C', NULL),
(@pack_id, 35, '“KYC”流程设计时，要求用户上传身份证照片，需要考虑的用户体验细节包括？', '支持相册上传和拍照', '自动裁剪和识别照片中的信息', '提供示例指引', '以上都是', 'D', NULL),
(@pack_id, 36, '金融科技产品中，“默认选项”的设定有很大影响，例如在养老金产品中，默认设置“自动加入”能大幅提高参与率。这运用了什么行为经济学原理？', '损失厌恶', '过度自信', '现状偏差 (默认效应)', '锚定效应', 'C', NULL),
(@pack_id, 37, '对于“虚拟信用卡”产品，其核心价值是？', '实体卡材质好', '在线生成，即时使用，提升线上交易安全 (一次性或有限额度)', '额度无限', '可以提现', 'B', NULL),
(@pack_id, 38, '产品经理使用“用户故事地图”的主要目的是？', '画图美观', '从用户视角梳理完整的流程和痛点，指导版本规划', '考核程序员', '写PRD', 'B', NULL),
(@pack_id, 39, '在设计“账单分期”产品时，除了展示每期还款额，还应突出显示什么？', '总手续费率', '年化利率 (APR)', '提前还款规则', '以上都是', 'D', NULL),
(@pack_id, 40, '产品经理如何衡量“用户对产品的信任度”？', '日活跃用户数', '净推荐值 (NPS) 和 客服投诉中关于安全的数量', '代码行数', '融资轮次', 'B', NULL),
(@pack_id, 41, '金融科技产品中的“灰色测试” (Gray Release) 是指？', '在黑盒和白盒之间测试', '只对一小部分特定用户群体发布新功能，用于验证', '不测试直接上线', '在完全离线环境测试', 'B', NULL),
(@pack_id, 42, '一个成功的“企业支付”产品，API设计的首要原则是？', '设计精美', '幂等性 (Idempotency) 确保重复调用不会重复扣款', '使用XML格式', '调用需要人工审批', 'B', NULL),
(@pack_id, 43, '产品经理应该如何看待用户提出的“我要100%保本保收益”的要求？', '完全满足', '在合规框架下解释投资风险，并设计风险测评和适当性管理流程', '告诉用户没有这种产品', '口头承诺', 'B', NULL),
(@pack_id, 44, '“金融科技产品”与“传统金融产品”最大的区别在于？', '收益率更高', '利用技术手段提升了效率、降低了成本和改善了体验', '风险更低', '监管更松', 'B', NULL),
(@pack_id, 45, '在设计“积分兑换”系统时，为防止欺诈，应考虑？', '积分永久有效', '无门槛兑换', '设置每日兑换上限、行为监控和风控规则', '允许积分转赠', 'C', NULL),
(@pack_id, 46, '产品经理最重要的“内部”客户是？', 'CEO', '开发工程师', '销售和客户成功团队 (他们直接面对用户)', '行政人员', 'C', NULL),
(@pack_id, 47, '对于“数字货币钱包”产品，用户丢失私钥后，产品应？', '可以找回私钥', '明确告知私钥不可找回，并引导用户做好备份', '冻结钱包', '从服务器恢复', 'B', NULL),
(@pack_id, 48, '产品路线图上的“技术债务”项，优先级应如何判断？', '永远最低', '永远最高', '根据其是否阻碍新功能开发或带来重大稳定/安全隐患来决定', '由技术团队自行决定，产品不参与', 'C', NULL),
(@pack_id, 49, '产品经理使用“SWOT”分析法，其中“O”代表？', '优势', '劣势', '机会', '威胁', 'C', NULL),
(@pack_id, 50, '作为金融科技产品经理，需要始终保持的核心理念是？', '利润至上', '以用户为中心，平衡创新、风险与合规', '技术至上', '监管规避', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业75：计算机科学×金融学 → 高频交易系统开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_finance:2', 75, '高频交易系统开发', 'major_cs', 'major_finance', '计算机科学×金融学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '高频交易系统对网络延迟的要求通常在哪个量级？', '秒级', '毫秒级', '微秒级甚至纳秒级', '分钟级', 'C', NULL),
(@pack_id, 2, '为了最小化网络传输延迟，高频交易公司通常会将服务器托管在哪里？', '公司总部办公室', '云计算平台 (AWS/Azure)', '交易所附近的托管机房 (Co-location)', '海底光缆', 'C', NULL),
(@pack_id, 3, '高频交易系统最忌讳的编程语言特性是？', '强类型', '手动内存管理', '垃圾回收 (GC)', '指针运算', 'C', NULL),
(@pack_id, 4, '在Linux系统中，将进程绑定到特定CPU核心，以避免上下文切换，这种技术称为？', '虚拟化', 'CPU亲和性 (CPU Affinity)', '超线程', '分时复用', 'B', NULL),
(@pack_id, 5, '从数据接收到交易决策再到订单发送，这整个过程的耗时称为？', '网络延迟', '处理延迟', '往返延迟 (RTT)', '“Tick-to-Trade” 延迟', 'D', NULL),
(@pack_id, 6, '高频交易系统通常使用哪种网络协议进行行情接收和订单发送？', 'HTTP/HTTPS', 'WebSocket', 'UDP 或 专有低延迟TCP协议 (如Solarflare)', 'SMTP', 'C', NULL),
(@pack_id, 7, '为了加速网络包处理，一种可以绕过内核协议栈的技术是？', 'TCP offload', 'DPDK (Data Plane Development Kit)', 'HTTP/2', 'QUIC', 'B', NULL),
(@pack_id, 8, '高频交易策略通常持仓时间有多长？', '数周', '数天', '数秒甚至微秒', '数年', 'C', NULL),
(@pack_id, 9, '在C++中，为了确保数据对齐以提高内存访问速度，可使用哪个关键字或属性？', 'virtual', 'constexpr', 'alignas', 'mutable', 'C', NULL),
(@pack_id, 10, '“FPGA” 在高频交易中的主要优势是？', '易于编程', '功耗低', '硬件级并行和确定性极低延迟', '成本低', 'C', NULL),
(@pack_id, 11, '高频交易中的“做市”策略是通过什么盈利？', '预测价格方向', '赚取买卖价差 (Bid-Ask Spread)', '长期持有', '分红', 'B', NULL),
(@pack_id, 12, '开发系统时，应避免使用 std::mutex 等锁机制，主要原因是？', '会导致死锁', '会导致数据竞争', '可能导致线程睡眠和唤醒，带来微秒级延迟', '语法复杂', 'C', NULL),
(@pack_id, 13, '以下哪种数据结构最适合实现极低延迟的订单簿？', '链表', '哈希表', '数组或红黑树，但高度优化', '图', 'C', NULL),
(@pack_id, 14, '高频交易系统收到新行情后，需要解码二进制数据。为了提升速度，通常会？', '使用JSON解析库', '使用XML解析器', '直接通过内存映射和结构体指针转换', '将数据保存到数据库再读取', 'C', NULL),
(@pack_id, 15, '“纳秒” 是秒的多少分之一？', '10^-6', '10^-9', '10^-12', '10^-3', 'B', NULL),
(@pack_id, 16, '在多线程编程中，使用 std::atomic 相比于 std::mutex 的优势是？', '功能更强大', '可以实现无锁操作，延迟更低', '更容易使用', '适用于所有类型', 'B', NULL),
(@pack_id, 17, '高频交易系统对“确定性”有极高要求，即相同输入应在相同时间内给出输出，以避免？', '计算错误', '内存泄漏', '交易时机不一致导致的风险', '代码冗长', 'C', NULL),
(@pack_id, 18, '一个简单的高频套利策略，监控同一股票在不同交易所的价格，当价差超过交易成本时，做多低价市场，做空高价市场。这属于？', '趋势跟踪', '跨交易所套利', '统计套利', '事件驱动', 'B', NULL),
(@pack_id, 19, '为了降低内存分配延迟，高频系统通常会实现？', '频繁调用 new / delete', '预分配内存池 (Memory Pool)', '使用 vector 并频繁 push_back', '使用智能指针', 'B', NULL),
(@pack_id, 20, '在Linux下，获取高精度时间戳 (纳秒级) 的函数是？', 'time()', 'clock()', 'clock_gettime(CLOCK_REALTIME, &ts)', 'gettimeofday()', 'C', NULL),
(@pack_id, 21, '高频交易中，用于衡量价格波动剧烈程度的指标是？', '交易量', '波动率 (Volatility)', '市盈率', '股息率', 'B', NULL),
(@pack_id, 22, '开发日志系统时，为了避免阻塞交易线程，应采用什么方式？', '同步写入磁盘', '使用 printf', '异步日志队列 (Lock-free queue)', '不写日志', 'C', NULL),
(@pack_id, 23, '高频交易策略的测试，除了回测，还需要进行什么测试？', '单元测试', '模拟真实环境的延时测试和压力测试', 'UI测试', '安全测试', 'B', NULL),
(@pack_id, 24, '以下哪个网络设备会增加不可预测的延迟，应尽量避免？', '交换机', '网卡', '防火墙 / 负载均衡器', '光纤', 'C', NULL),
(@pack_id, 25, '“行情快照” (Snapshot) 和“行情增量” (Incremental refresh) 的区别是？', '快照发送全部价格档位，增量只发送变化', '增量发送全部，快照只发变化', '两者一样', '快照是图片，增量是视频', 'A', NULL),
(@pack_id, 26, 'C++中，volatile 关键字在高频交易中的作用是？', '保证原子性', '保证内存可见性 (防止编译器优化)', '创建线程', '声明常量', 'B', NULL),
(@pack_id, 27, '高频交易系统的“止损”通常由什么触发？', '人工监控', '收盘后计算', '硬件或软件实现的硬性风控线，极低延迟', '每月一次', 'C', NULL),
(@pack_id, 28, '“CPU缓存一致性” 对多核编程性能影响很大，False Sharing 是指？', '缓存未命中', '多个核上的线程修改了位于同一缓存行的不同变量，导致性能下降', '缓存行太小', '缓存行太大', 'B', NULL),
(@pack_id, 29, '高频交易公司对于其核心交易系统，通常会保留多少份互为备份？', '只有一份', '主备或多活，且能自动切换', '100份', '没有备份', 'B', NULL),
(@pack_id, 30, '以下哪种编程风格更适合高性能计算？', '面向对象，大量虚函数', '数据驱动，面向数据设计 (Data-Oriented Design)', '大量使用继承和多态', '使用解释型语言', 'B', NULL),
(@pack_id, 31, '“L2 行情数据” 相比于 L1，多了什么信息？', '仅最优买卖价', '订单簿的深度 (多个档位的委托量)', '历史成交记录', '公司财报', 'B', NULL),
(@pack_id, 32, '开发通信模块时，使用“忙等待” (Busy-waiting) 而不是条件变量，主要是为了？', '节省CPU', '避免死锁', '降低延迟 (避免上下文切换)', '简化编程', 'C', NULL),
(@pack_id, 33, '高频交易中的“延迟套利”指的是？', '基于基本面差异的套利', '利用自己比其他市场参与者更快获取行情和发送订单的优势进行套利', '长期持有套利', '基于技术的套利', 'B', NULL),
(@pack_id, 34, '在C++中，使用 std::pmr::monotonic_buffer_resource 的作用是？', '分配线程局部存储', '提供线性分配器，分配速度快，但不支持单独释放', '引用计数', '类型转换', 'B', NULL),
(@pack_id, 35, '评估网络设备 (如交换机) 时，应关注的关键性能指标是？', '端口数量', '背板带宽', '端口到端口的延迟 (纳秒级)', '外观颜色', 'C', NULL),
(@pack_id, 36, '高频交易系统不适用于哪种市场环境？', '高波动', '高流动性', '低波动，流动性极差', '电子化交易', 'C', NULL),
(@pack_id, 37, '使用CUDA或OpenCL进行GPU计算，在高频交易中通常用于？', '订单路由', '实时风控', '策略的回测和参数优化 (离线)', '行情接收', 'C', NULL),
(@pack_id, 38, '“微突发” (Micro-burst) 在网络中指什么？', '长时间高流量', '极短时间内的流量高峰，可能导致交换机缓存丢包', '网络断流', '信号衰减', 'B', NULL),
(@pack_id, 39, '高频交易系统的代码部署，通常会采用什么流程？', '白天的进行部署', '手动复制文件', '交易日盘中绝对禁止变更，盘后进行严格的测试和部署', '随时在线更新', 'C', NULL),
(@pack_id, 40, '“事件循环” (Event Loop) 模型在高频交易系统中常用于？', '用户界面响应', '单线程高效处理大量IO事件 (如行情、定时器)', '数据库操作', '文件读写', 'B', NULL),
(@pack_id, 41, '以下哪个不是高频交易系统的盈利来源？', '返佣', '套利', '做市价差', '公司长期分红', 'D', NULL),
(@pack_id, 42, '为了减少分支预测错误带来的性能损失，可以使用的编程技巧是？', '多用 if-else', '使用 switch', '尽量使用无分支代码或使用大概率优先的条件', '使用递归', 'C', NULL),
(@pack_id, 43, '“交易系统回滚” (System Rollback) 是指在发生故障时？', '撤销所有已发送订单', '恢复到上一个已知的稳定状态，并清除错误状态', '继续发送订单', '通知交易所暂停交易', 'B', NULL),
(@pack_id, 44, '在C++中，noexcept 关键字对性能的影响是？', '没有影响', '允许编译器优化，减少异常处理开销', '降低性能', '增加代码体积', 'B', NULL),
(@pack_id, 45, '高频交易中的“探测性订单” (Pinging) 用于？', '大规模买入', '探测市场隐藏流动性或确认对手方存在', '做市报价', '取消订单', 'B', NULL),
(@pack_id, 46, '开发系统时，对于配置参数 (如风控阈值)，最佳实践是？', '硬编码在代码中', '从远程数据库读取', '使用共享内存映射文件，实现极低延迟的配置更新', '每次通过HTTP请求获取', 'C', NULL),
(@pack_id, 47, '高频交易公司通常不会参与哪种市场？', '股票', '期货', '期权', '流动性极差的粉单市场', 'D', NULL),
(@pack_id, 48, '在PCIe设备 (如FPGA网卡) 之间进行数据传输，延迟最低的方式是？', '通过CPU内存复制', '使用RDMA (Remote Direct Memory Access)', '通过TCP/IP协议栈', '写入文件再读取', 'B', NULL),
(@pack_id, 49, '高频交易系统的核心风控，如“最大订单金额”、“总持仓上限”，应该实现在？', '交易策略代码中', '独立于策略的、硬件或内核级的风控模块', '交易员的脑子里', '交易所系统中', 'B', NULL),
(@pack_id, 50, '作为一名高频交易系统开发工程师，最重要的品质是？', '快速开发新功能', '极致的性能优化思维，对延迟的零容忍', '丰富的UI设计经验', '深厚的财务会计知识', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业76：计算机科学×临床医学 → 医学影像AI工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_clinical:0', 76, '医学影像AI工程师', 'major_cs', 'major_clinical', '计算机科学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医学影像AI中，最常用的深度学习模型架构是？', 'RNN', 'CNN (卷积神经网络)', 'GAN', 'Transformer', 'B', NULL),
(@pack_id, 2, '对于CT、MRI等3D医学影像，常用的输入数据格式是？', 'JPG', 'PNG', 'NIfTI (.nii) 或 DICOM 序列', 'MP4', 'C', NULL),
(@pack_id, 3, '在肺结节检测任务中，评估模型性能的常用指标是？', 'MAE', 'FROC (Free-response Receiver Operating Characteristic)', 'RMSE', 'BLEU', 'B', NULL),
(@pack_id, 4, '处理医学影像数据时，最关键的预处理步骤是？', '图像增强 (颜色抖动)', '随机裁剪', '灰度归一化和重采样到各向同性', '图像翻转', 'C', NULL),
(@pack_id, 5, '以下哪个是医学影像分割任务常用的损失函数？', 'Dice Loss', 'Cross-Entropy Loss', 'Hinge Loss', 'Triplet Loss', 'A', NULL),
(@pack_id, 6, '为了避免模型过拟合到某个医院的设备特征，常采用什么技术？', '数据增强和域适应', '增加模型参数', '减少训练数据', '不采用任何技术', 'A', NULL),
(@pack_id, 7, '对于“脑肿瘤分割”任务，常用的公开数据集是？', 'ImageNet', 'CIFAR-10', 'BraTS (Brain Tumor Segmentation)', 'MNIST', 'C', NULL),
(@pack_id, 8, '医学影像AI模型在临床部署时，需要提供什么以建立医生信任？', '模型训练时间', '可解释性 (如热力图Grad-CAM显示决策依据)', '模型代码', '开发人员名单', 'B', NULL),
(@pack_id, 9, '处理超高分辨率病理切片 (WSI) 时，通常采用什么策略？', '直接下采样到低分辨率', '分块处理 (Patch-based) 和多实例学习 (MIL)', '使用更深的网络', '无法处理', 'B', NULL),
(@pack_id, 10, 'DICOM标准中，除了图像数据，还包含什么关键信息？', '患者姓名', '检查参数和元数据', '医院信息', '以上都是', 'D', NULL),
(@pack_id, 11, '在医学影像分类任务中，处理类别不平衡问题（如正常样本远多于病变样本）的常用方法是？', '欠采样、过采样、加权损失函数', '增加网络深度', '使用更大的学习率', '不使用验证集', 'A', NULL),
(@pack_id, 12, '以下哪个Python库最常用于医学影像的读取和预处理？', 'Scikit-learn', 'SimpleITK / NiBabel / pydicom', 'Matplotlib', 'TensorBoard', 'B', NULL),
(@pack_id, 13, '模型在训练集上AUC=0.99，验证集AUC=0.72，最可能的问题是？', '欠拟合', '过拟合', '数据泄露', '学习率过低', 'B', NULL),
(@pack_id, 14, '“迁移学习”在医学影像AI中广泛应用，通常使用在自然图像上预训练的模型（如ImageNet），这是因为？', '医学影像数据量通常足够大', '医学影像数据量通常较小，迁移学习可加速收敛并提高性能', '自然图像和医学影像完全一样', '不需要任何调整', 'B', NULL),
(@pack_id, 15, '对于医学影像分割结果的后处理，常用的方法是？', '高斯滤波', '中值滤波', '连通域分析去除假阳性小区域', '直方图均衡化', 'C', NULL),
(@pack_id, 16, '多模态医学影像（如PET-CT）融合时，常见的网络结构是？', '单输入通道', '双分支或多分支网络，特征级融合', '仅使用一种模态', '分别训练再平均', 'B', NULL),
(@pack_id, 17, '以下哪个指标不适合用于医学影像分割评估？', 'Dice系数', 'Jaccard指数（IoU）', 'PSNR (峰值信噪比)', 'Hausdorff距离', 'C', NULL),
(@pack_id, 18, '在标注医学影像数据时，“观察者间变异性”（Inter-observer variability）高意味着什么？', '标注质量高', '不同医生标注结果不一致，模型训练困难', '图像质量好', '疾病容易诊断', 'B', NULL),
(@pack_id, 19, '为了避免医学影像模型在临床部署时出现“域漂移”（Domain Shift），应采取什么措施？', '持续监控和定期重新训练', '固定模型参数永不更新', '只用一个医院的数据训练', '不使用任何正则化', 'A', NULL),
(@pack_id, 20, '对于X光胸片，常用的图像预处理不包括？', '直方图均衡化', '去噪', '色彩空间转换 (如RGB到HSV)', '归一化', 'C', NULL),
(@pack_id, 21, '以下哪个框架最常用于医学影像3D卷积网络？', 'Keras', 'MONAI (基于PyTorch)', 'Scikit-image', 'OpenCV', 'B', NULL),
(@pack_id, 22, '在肺结节检测中，“假阳性率”过高会导致什么问题？', '漏诊', '增加医生不必要的读片负担', '模型AUC升高', '模型训练变快', 'B', NULL),
(@pack_id, 23, '“数据增强”对于医学影像，以下哪个操作通常是不合适的？', '随机旋转小角度', '随机平移', '上下翻转（可能改变解剖结构左右）', '弹性形变', 'C', NULL),
(@pack_id, 24, '病理全切片图像（WSI）通常采用金字塔结构存储，主要目的是？', '节省存储空间', '实现多分辨率快速加载与浏览', '提高图像质量', '方便标注', 'B', NULL),
(@pack_id, 25, '训练一个用于检测脑出血的CT影像模型，正样本极少，以下哪个策略最有效？', '忽略正样本', '使用焦点损失 (Focal Loss) 或 过采样', '增加负样本数量', '减少网络层数', 'B', NULL),
(@pack_id, 26, '“Grad-CAM”热力图的作用是？', '数据预处理', '可视化模型决策时关注的图像区域', '模型压缩', '超参数优化', 'B', NULL),
(@pack_id, 27, '对于医学影像AI的临床验证，最严格的设计是？', '回顾性单中心验证', '前瞻性多中心随机对照试验', '仅在公开数据集上测试', '仅在训练集上评估', 'B', NULL),
(@pack_id, 28, '以下哪个是常用的医学影像分割网络？', 'ResNet', 'VGG', 'U-Net 及其变体', 'Inception', 'C', NULL),
(@pack_id, 29, '处理MRI图像时，偏置场校正（Bias field correction）的目的是？', '增强边缘', '去除由于磁场不均匀导致的亮度渐变', '降噪', '配准', 'B', NULL),
(@pack_id, 30, '在医学影像中，体素（Voxel）和像素（Pixel）的关系是？', '3D图像中的最小单元是体素，2D图像中的最小单元是像素', '两者相同', '像素是体素的投影', '体素是像素的集合', 'A', NULL),
(@pack_id, 31, '模型输出概率分数，为满足临床高特异性要求，应如何设置阈值？', '降低阈值', '提高阈值', '阈值设为0.5不变', '随机选择阈值', 'B', NULL),
(@pack_id, 32, '“自监督学习”在医学影像中的应用主要是解决什么问题？', '模型可解释性差', '标注数据稀缺', '推理速度慢', '内存占用大', 'B', NULL),
(@pack_id, 33, '对于超声影像，常见的挑战不包括？', '斑点噪声', '视角依赖性', '伪影', '有电离辐射', 'D', NULL),
(@pack_id, 34, '以下哪个不是医学影像AI的典型应用场景？', '骨折检测', '视网膜病变分级', '病理细胞核分割', '预测股票走势', 'D', NULL),
(@pack_id, 35, '评估肺结节检测模型，Free-Response ROC (FROC) 曲线的横坐标和纵坐标分别是？', '假阳性率，真阳性率', '每幅图像平均假阳性个数，敏感度', '召回率，精确率', '阈值，损失值', 'B', NULL),
(@pack_id, 36, '在数据隐私方面，医学影像应去除的元数据是？', '患者姓名、ID、出生日期', '检查日期', '设备型号', '医院名称', 'A', NULL),
(@pack_id, 37, '使用Vision Transformer (ViT) 处理医学影像时，通常需要面对的问题是？', '训练快', '需要大量数据，否则容易过拟合', '参数量小', '无需位置编码', 'B', NULL),
(@pack_id, 38, '对于医学影像的分类任务，如果每个患者有多张图像（如多个切片），应避免什么？', '患者级别的交叉验证', '将同一患者的不同切片分到训练集和验证集，导致数据泄露', '使用全局池化', '使用数据增强', 'B', NULL),
(@pack_id, 39, '以下哪个库专门用于医学影像的深度学习和数据加载？', 'Pandas', 'MONAI', 'Django', 'Celery', 'B', NULL),
(@pack_id, 40, '当模型在外部验证集上性能显著下降时，首要步骤是？', '重新训练模型', '增加模型复杂度', '分析训练集与外部验证集的分布差异（协变量偏移）', '放弃模型', 'C', NULL),
(@pack_id, 41, '“生成对抗网络”（GAN）在医学影像中的一项重要应用是？', '分类', '分割', '图像合成（如CT到MRI的转换）', '目标检测', 'C', NULL),
(@pack_id, 42, '对于医学影像AI产品获得FDA或NMPA认证，通常需要提交的材料不包括？', '算法设计文档', '临床验证报告', '源代码开放', '风险管理文档', 'C', NULL),
(@pack_id, 43, '在医学影像中，空间配准（Registration）的目的是？', '提高分辨率', '将不同时间或不同模态的图像对齐到同一空间坐标系', '压缩图像', '增加对比度', 'B', NULL),
(@pack_id, 44, '使用3D CNN处理CT影像，相比于2D CNN逐切片处理，优势是？', '计算量更小', '能够学习到跨切片的空间上下文信息', '不需要数据增强', '更容易训练', 'B', NULL),
(@pack_id, 45, '以下哪个指标用于衡量模型对微小病变的检测能力？', '平均精度 (mAP)', '灵敏度 (Recall) 在低假阳性率下的值', '准确率', 'F1分数', 'B', NULL),
(@pack_id, 46, '医学影像AI模型的“黑箱”问题，临床医生最担心的是？', '模型训练时间长', '无法理解模型的决策依据，可能导致误诊无法追责', '模型代码太多', '模型需要GPU', 'B', NULL),
(@pack_id, 47, '在多类别分割任务中，如果各类别体积严重不平衡（如背景远大于肿瘤），Dice Loss可能失效，替代方案是？', '交叉熵损失', '广义Dice损失 或 Tversky损失', 'L1损失', 'Huber损失', 'B', NULL),
(@pack_id, 48, '“主动学习”在医学影像标注中的应用方式是？', '自动标注', '模型挑选最不确定或最有价值的样本优先人工标注，减少标注量', '无监督学习', '强化学习', 'B', NULL),
(@pack_id, 49, '对于医学影像，常用的数据增强库不包括？', 'Torchvision', 'Albumentations', 'NLTK', 'MONAI transforms', 'C', NULL),
(@pack_id, 50, '作为一名医学影像AI工程师，与临床医生沟通时，最重要的能力是？', '英语流利', '将临床问题转化为技术问题，并用可解释的方式展示模型能力与局限', '精通所有深度学习框架', '擅长UI设计', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业77：计算机科学×临床医学 → 医疗信息系统开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_clinical:1', 77, '医疗信息系统开发', 'major_cs', 'major_clinical', '计算机科学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医院信息系统(HIS)中最核心的模块是？', '电子病历(EMR)', '患者挂号与计费', '库存管理', '科研管理', 'B', NULL),
(@pack_id, 2, '电子病历(EMR)系统中，用于临床文档共享和交换的标准是？', 'DICOM', 'HL7 / FHIR', 'ICD-10', 'SNOMED CT', 'B', NULL),
(@pack_id, 3, '开发医疗信息系统时，必须遵守的法律是？', 'GDPR', 'HIPAA (美国) 或 国内网络安全法', 'SOX', 'COPPA', 'B', NULL),
(@pack_id, 4, '在数据库中设计患者主索引(EMPI)的目的是？', '存储患者照片', '跨系统唯一识别患者，避免重复', '记录患者消费', '患者满意度调查', 'B', NULL),
(@pack_id, 5, '以下哪个不是医疗信息系统的开发特点？', '高可用性要求 (7x24小时)', '数据准确性要求极高', '允许经常宕机维护', '严格的权限和审计日志', 'C', NULL),
(@pack_id, 6, '“医嘱执行”流程在HIS中，从录入到执行完毕，状态通常不包括？', '已开立', '已提交', '已撤销', '已收费', 'C', NULL),
(@pack_id, 7, '对接检验科设备(LIS)时，需要处理的数据格式通常是？', '纯文本 (ASTM协议)', 'JSON', 'XML', '以上都有可能', 'A', NULL),
(@pack_id, 8, '开发“合理用药”监测功能时，需要与什么知识库集成？', '天气预报', '药物说明书和相互作用数据库', '新闻头条', '股票行情', 'B', NULL),
(@pack_id, 9, '医疗信息系统的界面设计，最重要原则是？', '色彩鲜艳', '动画炫酷', '清晰、高效、减少错误', '全触控操作', 'C', NULL),
(@pack_id, 10, 'HL7 FHIR 中的 "RESTful API" 相比于传统的HL7 v2.x，优势是？', '更简单、更现代化、更易实现互操作', '数据量更大', '安全性更低', '速度更慢', 'A', NULL),
(@pack_id, 11, '以下哪个不是医疗信息系统中的角色权限控制（RBAC）需要考虑的角色？', '医生', '护士', '收费员', '患者家属 (默认无权访问)', 'D', NULL),
(@pack_id, 12, '在开发“住院床位管理”模块时，需要跟踪的状态不包括？', '空闲', '占用', '清洁中', '已出售', 'D', NULL),
(@pack_id, 13, '医疗信息系统中的数据“审计日志”至少应记录什么？', '谁、在何时、对何数据、做了什么操作', '仅记录错误', '仅记录用户登录', '不记录任何信息', 'A', NULL),
(@pack_id, 14, '对接“医保接口”时，需要处理的数据交换内容通常包括？', '药品和诊疗项目目录', '患者费用明细', '结算结果', '以上都是', 'D', NULL),
(@pack_id, 15, '开发“门诊挂号”系统时，为了防止黄牛抢号，可以采取的技术手段是？', '验证码、实名制、就诊卡绑定', '提高挂号费', '限制每个IP的访问频率', 'A和C', 'D', NULL),
(@pack_id, 16, '对于医疗信息系统的数据库设计，患者身份证号码字段应如何存储？', '明文存储', '加密存储或脱敏', '不存储', '存储在客户端', 'B', NULL),
(@pack_id, 17, '以下哪个是常用的医疗信息系统前端框架选型考虑？', '兼容性（IE11等老旧浏览器）', '响应速度', '可访问性（WCAG标准）', '以上都是', 'D', NULL),
(@pack_id, 18, '“CDA” (Clinical Document Architecture) 是HL7标准的一部分，主要用于？', '图像传输', '临床文档的结构化和语义化表达', '计费管理', '药物库存', 'B', NULL),
(@pack_id, 19, '在开发“医生工作站”时，开医嘱的下拉列表中，药品显示信息应包括？', '药品名称、规格、剂量单位', '价格', '医保类型', '以上都是', 'D', NULL),
(@pack_id, 20, '医疗信息系统开发中，“容错性”要求体现在？', '系统崩溃后无法恢复', '发生故障时能快速恢复或降级服务，不影响核心诊疗', '允许数据丢失', '不需要备份', 'B', NULL),
(@pack_id, 21, '以下哪个是“HIS”与“PACS”系统集成的常见方式？', '通过HL7消息传递患者信息和检查申请', '通过DICOM传输图像', '通过Web Service查询报告', '以上都是', 'D', NULL),
(@pack_id, 22, '开发“排队叫号”系统时，需要考虑的异常情况不包括？', '医生临时停诊', '患者过号', '患者插队 (需权限)', '患者国籍', 'D', NULL),
(@pack_id, 23, '医疗信息系统测试中，“回归测试”的重点是？', '新功能', '性能', '确保原有功能未受新代码影响', '安全性', 'C', NULL),
(@pack_id, 24, '在数据库设计中，存储“诊断编码”应遵循什么标准？', '医院自定义', 'ICD-10 或 ICD-11', 'SNOMED CT', 'LOINC', 'B', NULL),
(@pack_id, 25, '医疗信息系统中的“会诊”模块，需要记录的核心数据不包括？', '会诊科室、会诊医生', '会诊意见', '会诊时间', '会诊医生的血型', 'D', NULL),
(@pack_id, 26, '对于医疗信息系统的“性能测试”，重点关注？', '挂号高峰期并发处理能力', '医嘱录入响应时间', '报表生成效率', '以上都是', 'D', NULL),
(@pack_id, 27, '开发“临床路径”系统时，其核心功能是？', '记录患者路径', '根据诊断和手术，推荐标准化的诊疗流程和医嘱套餐', '计算住院费用', '管理护士排班', 'B', NULL),
(@pack_id, 28, '以下哪个协议常用于医疗设备（如监护仪）的数据采集？', 'HTTP', 'HL7 或 私有串口协议', 'FTP', 'SMTP', 'B', NULL),
(@pack_id, 29, '医疗信息系统的“灾备”方案，至少应满足？', '数据每日备份', '数据异地备份，并有主备切换机制', '不需要灾备', '只备份部分数据', 'B', NULL),
(@pack_id, 30, '在开发“手术排程”系统时，需要检查的资源冲突包括？', '手术室占用', '医生时间', '设备 availability', '以上都是', 'D', NULL),
(@pack_id, 31, '对于医疗信息系统的用户认证，推荐使用？', '仅用户名密码', '双因素认证 (如密码+短信验证码/指纹)', '免密登录', '公开密码', 'B', NULL),
(@pack_id, 32, '“EMR” 与 “EHR” 的主要区别是？', 'EMR是院内电子病历，EHR是跨机构的健康档案', '两者相同', 'EMR是个人健康记录', 'EHR是电子医保卡', 'A', NULL),
(@pack_id, 33, '开发“药房管理系统”时，库存管理需要支持什么特殊功能？', '批次和有效期管理', '麻精药品双人双锁管理', '药品自动请领', '以上都是', 'D', NULL),
(@pack_id, 34, '在医疗信息系统中，对于“敏感疾病”（如艾滋病、精神疾病）的数据访问，应实施？', '普通权限', '特殊审批和日志审计', '完全公开', '禁止记录', 'B', NULL),
(@pack_id, 35, '以下哪个不是医疗信息系统开发常用的编程语言？', 'Java', 'C#', 'PHP (虽然可用，但不是主流，医院传统多为Java/.NET)', 'Python', 'C', NULL),
(@pack_id, 36, '“CDSS” (临床决策支持系统) 的核心是？', '患者挂号', '基于知识库的规则引擎或AI模型，辅助诊断和治疗', '收费结算', '物资管理', 'B', NULL),
(@pack_id, 37, '开发“住院病历”系统时，需要支持的结构化数据元素包括？', '主诉、现病史、体格检查', '体温、脉搏、呼吸、血压', '医嘱列表', '以上都是', 'D', NULL),
(@pack_id, 38, '医疗信息系统与区域卫生信息平台对接时，常用的交换标准是？', 'DICOM', 'IHE (Integrating the Healthcare Enterprise) 集成框架', 'PDF', 'MP4', 'B', NULL),
(@pack_id, 39, '“患者360视图”功能，其技术本质是？', '一个简单的报表', '通过主索引整合多个异构系统的数据，统一展示', '一个3D模型', '一个计费汇总', 'B', NULL),
(@pack_id, 40, '开发“门诊输液”管理系统，需要与什么系统紧密集成？', '药房发药', '护士工作站', '患者身份识别', '以上都是', 'D', NULL),
(@pack_id, 41, '医疗信息系统上线前，最重要的准备工作是？', '硬件采购', '数据迁移和历史数据清洗', '员工旅游', '装修办公室', 'B', NULL),
(@pack_id, 42, '对于医疗信息系统的“可用性”测试，应邀请谁参与？', '仅开发人员', '实际使用者（医生、护士、收费员）', '外包测试公司', '患者', 'B', NULL),
(@pack_id, 43, '“MPI” 患者主索引匹配算法中，通常不考虑以下哪个字段？', '姓名', '身份证号', '出生日期', '血型', 'D', NULL),
(@pack_id, 44, '开发“医疗质控”系统，需要从哪些环节采集数据？', '病历书写时效性', '抗菌药物使用率', '非计划重返手术室率', '以上都是', 'D', NULL),
(@pack_id, 45, '医疗信息系统开发中，对于时间相关功能（如皮试时间、抗生素输注时间），需特别注意？', '时区处理', '闰年处理', '精确到分钟或秒的计时', '以上都是', 'D', NULL),
(@pack_id, 46, '“移动护理”系统通常通过什么设备采集患者生命体征？', '手机摄像头', 'PDA或平板配合蓝牙设备', '台式电脑', '固定式监护仪', 'B', NULL),
(@pack_id, 47, '以下哪个不是医疗信息系统开发必须遵循的行业标准？', 'HL7', 'DICOM', 'IEEE 802.11 (无线网络标准，但非医疗特有)', 'ICD', 'C', NULL),
(@pack_id, 48, '开发“供应室追溯系统”，需要记录器械的什么信息？', '清洗消毒批次', '灭菌参数', '使用患者', '以上都是', 'D', NULL),
(@pack_id, 49, '医疗信息系统中的“停药”医嘱，其处理逻辑应确保？', '立即停止当前输注', '护士确认执行', '药房停止发药', '以上都是', 'D', NULL),
(@pack_id, 50, '作为医疗信息系统开发工程师，最重要的非技术素养是？', '熟悉医院业务流程和临床知识', '对患者安全和数据准确性的高度责任感', '良好的沟通能力', '以上都是', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业78：计算机科学×临床医学 → 临床数据分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_clinical:2', 78, '临床数据分析师', 'major_cs', 'major_clinical', '计算机科学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '临床数据分析师最常用的编程语言是？', 'Java', 'Python 或 R', 'C++', 'PHP', 'B', NULL),
(@pack_id, 2, '处理临床数据时，“意向性分析” (ITT) 原则是指？', '只分析完成试验的患者', '所有随机分组患者，无论是否完成，都纳入最终分析', '只分析接受治疗的患者', '只分析对照组', 'B', NULL),
(@pack_id, 3, '临床研究中，用来比较两种治疗方法优效性，P值小于0.05通常认为？', '有统计学显著差异', '有临床显著差异', '两者相同', '无法判断', 'A', NULL),
(@pack_id, 4, '观察性临床研究中最常见的偏倚是？', '选择偏倚和混杂偏倚', '测量偏倚', '回忆偏倚', '以上都是', 'D', NULL),
(@pack_id, 5, '处理临床数据中的缺失值时，多重插补 (Multiple Imputation) 相比删除法，优势是？', '更简单', '减少了偏倚，更准确地估计不确定性', '更快', '不需要软件', 'B', NULL),
(@pack_id, 6, '以下哪个是用于分析生存数据的模型？', '线性回归', '逻辑回归', 'Cox 比例风险模型', '决策树', 'C', NULL),
(@pack_id, 7, '“倾向性评分匹配” (PSM) 常用于处理什么？', '数据缺失', '观察性研究中的混杂偏倚，模拟随机对照试验', '多中心效应', '数据标准化', 'B', NULL),
(@pack_id, 8, '在分析电子病历数据时，“概念集” (Concept Set) 的作用是？', '存储患者姓名', '定义一个临床概念 (如“2型糖尿病”) 所对应的所有代码 (ICD, SNOMED等)', '绘制图表', '进行统计分析', 'B', NULL),
(@pack_id, 9, '临床数据分析中，对于“终点事件” (如死亡、复发) 的判定，最重要是？', '快速判定', '盲态独立评审委员会 (CEC) 进行统一、标准化判定', '由研究者自行判定', '由患者自己报告', 'B', NULL),
(@pack_id, 10, '“ROC曲线” 在临床诊断试验中用于？', '评估治疗效果', '评估诊断指标的敏感性和特异性', '评估副作用', '评估样本量', 'B', NULL),
(@pack_id, 11, '以下哪个是处理临床数据中“异常值”的合理步骤？', '直接删除', '用均值替换', '结合临床知识判断，可能是真实值或错误值，记录处理方式', '忽略', 'C', NULL),
(@pack_id, 12, '临床研究方案中预先设定的“亚组分析”，其目的是？', '增加阳性结果概率', '探索治疗效果在不同人群中的异质性', '减少样本量', '替代主要终点', 'B', NULL),
(@pack_id, 13, '在R语言中，用于生存分析的常用包是？', 'ggplot2', 'survival', 'dplyr', 'tidyr', 'B', NULL),
(@pack_id, 14, '对于重复测量数据（如患者多次随访的血压），应使用哪种统计模型？', '简单线性回归', '混合效应模型 (Linear Mixed Model) 或 GEE', '卡方检验', 't检验', 'B', NULL),
(@pack_id, 15, '“标准化死亡比” (SMR) 的计算公式是？', '观察死亡数 / 期望死亡数', '期望死亡数 / 观察死亡数', '观察死亡数 - 期望死亡数', '观察死亡数 + 期望死亡数', 'A', NULL),
(@pack_id, 16, '临床数据分析中，处理“删失数据”(Censored Data) 最常用的方法是？', '删除删失数据', '将删失视为事件', '使用Kaplan-Meier或Cox模型，正确利用删失信息', '插补', 'C', NULL),
(@pack_id, 17, '以下哪个不是临床数据分析的常用数据来源？', '电子病历 (EMR)', '医保索赔数据库', '注册研究 (Registry)', '社交媒体帖子', 'D', NULL),
(@pack_id, 18, '评估两个诊断方法的一致性，常用的统计量是？', 'Pearson相关系数', 'Kappa系数', '卡方值', 't统计量', 'B', NULL),
(@pack_id, 19, '“森林图” (Forest Plot) 常用于展示什么？', '单个研究的生存曲线', 'Meta分析中多个研究的效应量和置信区间', '数据分布', '相关性矩阵', 'B', NULL),
(@pack_id, 20, '在逻辑回归中，比值比 (Odds Ratio, OR) 为2.0的含义是？', '暴露组风险比对照组高2倍', '暴露组发生结局的几率是对照组的2倍', '暴露组风险比对照组低2倍', '无意义', 'B', NULL),
(@pack_id, 21, '“Bootstrap” 方法在临床数据分析中的主要用途是？', '数据可视化', '估计统计量的置信区间，无需正态假设', '数据清洗', '建立预测模型', 'B', NULL),
(@pack_id, 22, '临床研究中的“混杂变量”是指？', '与研究因素和结局都无关的变量', '与研究因素和结局都相关，且不是因果中间变量的变量', '只与研究因素有关的变量', '只与结局有关的变量', 'B', NULL),
(@pack_id, 23, '对于时间依赖的变量（如随时间变化的用药状态），在Cox模型中如何处理？', '使用基线值', '使用末次观测值', '使用时依协变量 (Time-dependent covariate) 方法', '忽略该变量', 'C', NULL),
(@pack_id, 24, '以下哪个是衡量模型校准度（Calibration）的常用图形？', 'ROC曲线', '校准曲线 (Calibration plot)', '残差图', 'QQ图', 'B', NULL),
(@pack_id, 25, '在Python中，进行统计检验（如t检验）常用的库是？', 'numpy', 'pandas', 'scipy.stats', 'matplotlib', 'C', NULL),
(@pack_id, 26, '“N-of-1 trial” 是一种什么类型的研究？', '大规模临床试验', '单患者多轮交叉试验，用于个体化治疗', '观察性研究', '系统综述', 'B', NULL),
(@pack_id, 27, '临床数据分析报告应包含什么内容以增强透明度和可重复性？', '数据清洗代码', '统计分析代码', '假设和排除标准', '以上都是', 'D', NULL),
(@pack_id, 28, '在比较两种治疗方案的副作用发生率时，样本量计算需要用到什么？', '预期发生率差异、显著性水平、把握度', '仅预期率', '仅把握度', '仅显著性水平', 'A', NULL),
(@pack_id, 29, '“敏感性分析”在临床数据分析中的作用是？', '提高结果显著性', '检验结论对假设、数据缺失、异常值等的稳健性', '减少样本量', '替代主要分析', 'B', NULL),
(@pack_id, 30, '以下哪个是常用于临床预测模型开发的框架？', 'TRIPOD (Transparent Reporting of a multivariable prediction model for Individual Prognosis Or Diagnosis)', 'CONSORT', 'PRISMA', 'STROBE', 'A', NULL),
(@pack_id, 31, '在评估预测模型区分能力时，C-统计量等同于什么？', '准确率', 'ROC曲线下面积 (AUC)', 'F1分数', '召回率', 'B', NULL),
(@pack_id, 32, '临床研究中，如果使用“历史对照”作为对照组，最大的风险是？', '成本高', '时间效应和医疗实践变化带来的偏倚', '样本量小', '无法盲法', 'B', NULL),
(@pack_id, 33, '处理临床文本（如医生病程记录）进行信息提取，常用的技术是？', '正则表达式', '命名实体识别 (NER)', '规则+机器学习', '以上都是', 'D', NULL),
(@pack_id, 34, '“K-M生存曲线”中的阶梯下降部分表示？', '患者失访', '事件发生（如死亡）', '研究结束', '数据错误', 'B', NULL),
(@pack_id, 35, '以下哪个是用于评估连续变量预测结局的最佳截断值的方法？', '最大化约登指数 (Youden index)', '固定为0.5', '最小化P值', '随机选择', 'A', NULL),
(@pack_id, 36, '“实验性研究”和“观察性研究”的本质区别是？', '样本量大小', '研究者是否主动施加干预', '数据分析方法', '研究时间长短', 'B', NULL),
(@pack_id, 37, '对于罕见疾病，最有效的研究设计是？', 'RCT', '病例对照研究 或 病例系列', '队列研究', '横断面研究', 'B', NULL),
(@pack_id, 38, '临床数据分析中，“多重比较”问题会导致什么后果？', '增加统计效力', '增加I类错误（假阳性）的风险', '减少样本量需求', '简化分析', 'B', NULL),
(@pack_id, 39, '在R中，使用 coxph(Surv(time, status) ~ treatment + age) 拟合模型，exp(coef) 代表什么？', '风险比 (Hazard Ratio)', '比值比', '相关系数', '回归系数', 'A', NULL),
(@pack_id, 40, '“FDR” (False Discovery Rate) 校正主要用于？', '单次检验', '多重检验时控制假阳性比例', '数据标准化', '缺失值处理', 'B', NULL),
(@pack_id, 41, '对于临床预测模型，过拟合的表现是？', '训练集和验证集AUC都很高', '训练集AUC高，验证集AUC显著降低', '训练集AUC低，验证集AUC高', '两者都低', 'B', NULL),
(@pack_id, 42, '以下哪个是用于系统综述和Meta分析的报告规范？', 'CONSORT', 'PRISMA', 'STARD', 'TRIPOD', 'B', NULL),
(@pack_id, 43, '在分析电子病历数据时，“时间窗口”定义不当可能导致什么问题？', '信息丢失', '引入时间偏倚（如前瞻性偏倚）', '数据增多', '计算加快', 'B', NULL),
(@pack_id, 44, '“链式方程多重插补” (MICE) 处理缺失值的优点是？', '假设所有变量正态分布', '可以处理不同类型变量（连续、分类）的缺失', '计算最快', '不需要指定预测变量', 'B', NULL),
(@pack_id, 45, '临床数据分析中，“协方差分析” (ANCOVA) 的主要作用是？', '比较两个组别的方差', '调整基线差异，提高比较效率', '分析相关性', '聚类分析', 'B', NULL),
(@pack_id, 46, '以下哪个是处理“竞争风险” (Competing Risk) 的方法？', '标准Kaplan-Meier', '累积发生函数 (CIF) 和 Fine-Gray模型', 'Cox模型', '逻辑回归', 'B', NULL),
(@pack_id, 47, '对于诊断试验，阳性预测值 (PPV) 受什么影响？', '敏感性和特异性', '疾病患病率', '样本量', '研究设计', 'B', NULL),
(@pack_id, 48, '临床数据分析中，“依从性”分析通常包括？', '按实际治疗分析 (As-treated)', '按完成方案分析 (Per-protocol)', '工具变量分析', '以上都是', 'D', NULL),
(@pack_id, 49, '在使用机器学习构建临床预测模型时，最重要的验证方法是？', '内部交叉验证', '外部验证 (不同时间、不同中心的数据)', '仅训练集评估', '不使用验证集', 'B', NULL),
(@pack_id, 50, '作为临床数据分析师，最核心的思维是？', '追求P值最小化', '理解临床问题，选择合适的统计方法，并正确解释结果', '编写复杂代码', '快速完成分析', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业79：计算机科学×软件工程 → 全栈开发工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_swe:0', 79, '全栈开发工程师', 'major_cs', 'major_swe', '计算机科学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '全栈开发工程师需要掌握的技能包括？', '前端 (HTML/CSS/JS)', '后端 (Python/Java/Node.js)', '数据库 (SQL)', '以上都是', 'D', NULL),
(@pack_id, 2, '以下哪个是前端JavaScript框架？', 'Django', 'Spring Boot', 'React / Vue / Angular', 'Flask', 'C', NULL),
(@pack_id, 3, '以下哪个是后端开发常用的Node.js框架？', 'Express.js', 'React', 'Vue', 'Bootstrap', 'A', NULL),
(@pack_id, 4, '用于定义API接口规范，方便前后端并行开发的文档标准是？', 'HTML', 'OpenAPI (Swagger)', 'CSS', 'Markdown', 'B', NULL),
(@pack_id, 5, 'RESTful API设计中，使用HTTP方法 POST 通常表示？', '查询资源', '创建资源', '更新全部资源', '删除资源', 'B', NULL),
(@pack_id, 6, '以下哪个是NoSQL数据库？', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'C', NULL),
(@pack_id, 7, '在版本控制中，git merge 和 git rebase 均可用于整合分支，rebase 的主要特点是？', '产生一个合并提交', '保持线性历史，提交记录更整洁', '丢失历史', '更慢', 'B', NULL),
(@pack_id, 8, '前端开发中，用于管理应用状态 (如Redux, Vuex) 的主要目的是？', '美化界面', '集中管理和预测状态的改变，方便调试', '发送网络请求', '编写样式', 'B', NULL),
(@pack_id, 9, 'Docker容器技术在全栈开发中的作用是？', '编写代码', '提供一致的开发和生产环境，方便部署', '数据库管理', '前端构建', 'B', NULL),
(@pack_id, 10, '以下哪个不是常见的Web服务器软件？', 'Nginx', 'Apache', 'Tomcat (是应用服务器，也可做Web服务器但不如Nginx/Apache典型)', 'IIS', 'C', NULL),
(@pack_id, 11, '以下哪个是Python后端开发常用的Web框架？', 'React', 'Django / Flask', 'Spring Boot', 'Laravel', 'B', NULL),
(@pack_id, 12, '在关系型数据库中，用于提高查询性能的索引，其底层数据结构通常是？', '哈希表', 'B+树', '链表', '栈', 'B', NULL),
(@pack_id, 13, '以下哪个用于前端构建工具 (打包)？', 'Maven', 'Gradle', 'Webpack / Vite', 'Pip', 'C', NULL),
(@pack_id, 14, 'HTTP状态码 404 表示？', '服务器错误', '资源未找到', '请求成功', '未授权', 'B', NULL),
(@pack_id, 15, '跨域资源共享 (CORS) 问题通常出现在什么场景？', '后端访问数据库', '前端Ajax请求不同源的API', '服务器日志记录', '数据库迁移', 'B', NULL),
(@pack_id, 16, '以下哪个是CSS预处理器？', 'Sass / Less', 'TypeScript', 'Webpack', 'ESLint', 'A', NULL),
(@pack_id, 17, '在后端开发中，用于实现异步非阻塞IO的编程模型是？', '多线程同步', '多进程', '事件循环 (如Node.js, Asyncio)', '阻塞调用', 'C', NULL),
(@pack_id, 18, 'SQL中的 JOIN 操作，LEFT JOIN 返回的结果是？', '两个表的交集', '左表所有行，右表匹配的行，无匹配则为NULL', '右表所有行，左表匹配的行', '两个表的笛卡尔积', 'B', NULL),
(@pack_id, 19, '以下哪个是用于单元测试的JavaScript框架？', 'Jest / Mocha', 'Selenium', 'Postman', 'JMeter', 'A', NULL),
(@pack_id, 20, '全栈开发中，用于管理项目依赖和脚本的Node.js工具是？', 'npm / yarn', 'pip', 'Maven', 'Gradle', 'A', NULL),
(@pack_id, 21, '在React中，用于在组件间共享数据而不必通过props传递的API是？', 'useState', 'useEffect', 'Context', 'useRef', 'C', NULL),
(@pack_id, 22, '以下哪个是用于对象关系映射 (ORM) 的Python库？', 'SQLAlchemy', 'Requests', 'NumPy', 'Flask', 'A', NULL),
(@pack_id, 23, '在Vue.js中，生命周期钩子 mounted 在什么时候被调用？', '实例创建之前', '数据观测之后，模板渲染之前', '模板渲染并挂载到DOM之后', '实例销毁之前', 'C', NULL),
(@pack_id, 24, '对于高并发Web应用，常用的缓存中间件是？', 'MySQL', 'Redis', 'MongoDB', 'Nginx', 'B', NULL),
(@pack_id, 25, '以下哪个是用于API测试的常用工具？', 'Jest', 'Postman', 'Webpack', 'Babel', 'B', NULL),
(@pack_id, 26, '在Git中，如何撤销最近一次的commit但保留更改？', 'git reset --hard HEAD~1', 'git reset --soft HEAD~1', 'git revert HEAD', 'git checkout HEAD~1', 'B', NULL),
(@pack_id, 27, '以下哪个是TypeScript相比于JavaScript的优势？', '动态类型', '静态类型检查，提高代码可维护性', '更慢的运行速度', '无法编译成JS', 'B', NULL),
(@pack_id, 28, '在Django框架中，用于定义数据模型的文件通常是？', 'views.py', 'urls.py', 'models.py', 'settings.py', 'C', NULL),
(@pack_id, 29, '前端性能优化中，懒加载 (Lazy Loading) 主要用于？', '加快首屏加载速度', '减少HTTP请求数', '延迟加载非关键资源（如图片、路由组件）', '以上都是', 'D', NULL),
(@pack_id, 30, '以下哪个是用于消息队列的开源中间件？', 'Elasticsearch', 'RabbitMQ / Kafka', 'Prometheus', 'Grafana', 'B', NULL),
(@pack_id, 31, '在Express.js中，用于处理所有HTTP请求的中间件声明方式是？', 'app.get(''/path'', handler)', 'app.post(''/path'', handler)', 'app.use(handler)', 'app.route(handler)', 'C', NULL),
(@pack_id, 32, '以下哪个是用于持续集成/持续部署 (CI/CD) 的平台？', 'GitHub Actions', 'Jenkins', 'GitLab CI', '以上都是', 'D', NULL),
(@pack_id, 33, '在关系型数据库中，事务的ACID特性不包括？', '原子性', '一致性', '隔离性', '可用性', 'D', NULL),
(@pack_id, 34, '以下哪个是用于前端组件库开发的工具？', 'Storybook', 'Webpack', 'Babel', 'ESLint', 'A', NULL),
(@pack_id, 35, '在Spring Boot中，标注 @RestController 的类主要用于？', '定义视图模板', '处理RESTful API请求，返回数据', '数据库操作', '安全配置', 'B', NULL),
(@pack_id, 36, '以下哪个是用于监控和可视化应用性能的工具？', 'Prometheus + Grafana', 'Postman', 'Swagger', 'Git', 'A', NULL),
(@pack_id, 37, '在React中，使用 useEffect 钩子，如果第二个参数传入空数组 []，副作用函数会？', '每次渲染后都执行', '仅在组件挂载后执行一次', '在卸载时执行', '永不执行', 'B', NULL),
(@pack_id, 38, '以下哪个是用于服务器端渲染 (SSR) 的React框架？', 'Create React App', 'Next.js', 'Vue CLI', 'Angular CLI', 'B', NULL),
(@pack_id, 39, '在数据库设计中，将多对多关系拆分为中间表，主要是为了？', '提高查询速度', '减少数据冗余，避免异常', '增加存储空间', '简化查询语句', 'B', NULL),
(@pack_id, 40, '以下哪个是用于代码格式化和风格检查的工具？', 'Webpack', 'Prettier / ESLint', 'Babel', 'TypeScript', 'B', NULL),
(@pack_id, 41, '对于实时Web应用（如聊天室），常用的协议是？', 'HTTP/1.1', 'WebSocket', 'FTP', 'SMTP', 'B', NULL),
(@pack_id, 42, '在Java后端开发中，依赖注入 (DI) 的主要作用是？', '提高代码运行速度', '解耦组件，提高可测试性和可维护性', '自动生成代码', '数据库连接管理', 'B', NULL),
(@pack_id, 43, '以下哪个是用于前端路由的库（单页应用）？', 'Axios', 'React Router / Vue Router', 'Redux', 'Lodash', 'B', NULL),
(@pack_id, 44, '在Docker中，用于定义镜像构建步骤的文件名为？', 'docker-compose.yml', 'Dockerfile', '.dockerignore', 'config.json', 'B', NULL),
(@pack_id, 45, '以下哪个不是HTTP请求方法？', 'GET', 'POST', 'PUT', 'CONNECT', 'D', NULL),
(@pack_id, 46, '在Python中，使用 async/await 进行异步编程，需要运行在什么事件循环中？', 'loop = asyncio.new_event_loop()', 'asyncio.run(main())', '自动管理', '以上都是', 'D', NULL),
(@pack_id, 47, '以下哪个是用于前端环境变量管理的工具？', '.env 文件配合 webpack 或 vite', 'dotenv', 'cross-env', '以上都是', 'D', NULL),
(@pack_id, 48, '在微服务架构中，API网关的主要功能包括？', '请求路由、负载均衡', '认证授权', '限流熔断', '以上都是', 'D', NULL),
(@pack_id, 49, '全栈开发中，“JAMstack”架构中的“J”代表？', 'Java', 'JavaScript', 'JSON', 'JQuery', 'B', NULL),
(@pack_id, 50, '作为全栈开发工程师，最重要的能力是？', '精通单一技术栈', '快速学习新技术，并能够独立完成前后端及数据库的集成工作', '只关注前端效果', '只关注后端性能', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业80：计算机科学×软件工程 → 架构师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_swe:1', 80, '架构师', 'major_cs', 'major_swe', '计算机科学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '软件架构师的主要职责是？', '编写所有代码', '管理项目进度', '设计系统的高层结构、技术选型和关键技术决策', '测试软件质量', 'C', NULL),
(@pack_id, 2, '以下哪个属于架构设计中的“非功能性需求”？', '用户登录功能', '数据报表导出', '系统的高可用性 (99.99%)', '购物车功能', 'C', NULL),
(@pack_id, 3, '微服务架构相比于单体架构，最大的优点是？', '开发简单', '部署简单', '独立部署、独立扩展、技术异构', '网络延迟低', 'C', NULL),
(@pack_id, 4, '在设计高并发系统时，常用的“削峰填谷”技术是？', '缓存', '消息队列', '索引优化', '读写分离', 'B', NULL),
(@pack_id, 5, '以下哪个是典型的“领域驱动设计” (DDD) 中的战术模式？', 'MVC', '聚合 (Aggregate)', 'Singleton', 'Factory', 'B', NULL),
(@pack_id, 6, 'CAP定理中，对于分布式系统，当发生网络分区(P)时，必须在(C)和(A)之间做权衡，其中C和A分别代表？', '一致性 (Consistency) 和 可用性 (Availability)', '并发和异步', '成本和性能', '代码和架构', 'A', NULL),
(@pack_id, 7, '以下哪个是用于描述系统部署架构的视图？', '用例图', '类图', '部署图', '时序图', 'C', NULL),
(@pack_id, 8, '设计一个高可用的系统，通常会采用什么模式来避免单点故障？', '主备或集群', '单数据库', '单台服务器', '无备份', 'A', NULL),
(@pack_id, 9, '“幂等性” 在API设计中的含义是？', '每次请求都产生不同结果', '多次执行相同的请求，对资源的影响与一次执行相同', '请求需要身份验证', '请求需要加密', 'B', NULL),
(@pack_id, 10, '以下哪个是API网关的常见功能？', '服务熔断', '认证授权', '流量路由', '以上都是', 'D', NULL),
(@pack_id, 11, '在系统架构中，“水平扩展” (Scale out) 指的是？', '升级服务器硬件（CPU、内存）', '增加更多服务器节点', '优化代码性能', '增加缓存层', 'B', NULL),
(@pack_id, 12, '以下哪个是分布式系统中用于服务发现和注册的组件？', 'Consul / Etcd / ZooKeeper', 'Nginx', 'Redis', 'Kafka', 'A', NULL),
(@pack_id, 13, '在设计数据库架构时，读写分离的主要目的是？', '提高数据一致性', '提高读性能和并发能力', '减少存储空间', '简化事务管理', 'B', NULL),
(@pack_id, 14, '以下哪个是用于分布式追踪的系统？', 'Prometheus', 'Jaeger / Zipkin', 'Grafana', 'ELK', 'B', NULL),
(@pack_id, 15, '架构设计中，“无状态”服务相比于“有状态”服务，优势是？', '更容易扩展', '故障恢复简单', '不需要会话保持', '以上都是', 'D', NULL),
(@pack_id, 16, '在微服务架构中，服务间通信的两种典型模式是？', '同步 (REST/gRPC) 和 异步 (消息队列)', '仅同步', '仅异步', '仅数据库共享', 'A', NULL),
(@pack_id, 17, '以下哪个是“容器编排”平台？', 'Docker', 'Kubernetes (K8s)', 'Maven', 'Git', 'B', NULL),
(@pack_id, 18, '用于评估系统可扩展性的“AKF扩展立方体”中，X轴扩展指的是？', '数据分区', '通过克隆服务实现水平复制', '功能分割 (微服务)', '垂直扩展', 'B', NULL),
(@pack_id, 19, '在缓存设计中，“缓存穿透”问题是指？', '缓存失效导致数据库压力大', '查询不存在的数据，每次都穿透缓存访问数据库', '缓存数据不一致', '缓存雪崩', 'B', NULL),
(@pack_id, 20, '以下哪个是用于解决“分布式事务”的常用方案？', '两阶段提交 (2PC)', 'TCC (Try-Confirm-Cancel)', '最终一致性 (消息表)', '以上都是', 'D', NULL),
(@pack_id, 21, '架构师进行技术选型时，最重要的考量因素不包括？', '社区活跃度', '团队熟悉程度', '个人偏好', '与现有系统的兼容性', 'C', NULL),
(@pack_id, 22, '以下哪个是用于系统监控和告警的常用组合？', 'Prometheus + Alertmanager', 'Jenkins + Git', 'Docker + K8s', 'Spring + MyBatis', 'A', NULL),
(@pack_id, 23, '在架构设计中，“反模式” (Anti-pattern) 指的是？', '最佳实践', '看似有效但会导致长期问题的解决方案', '设计模式的一种', '编码规范', 'B', NULL),
(@pack_id, 24, '对于需要强一致性的系统（如银行转账），CAP定理中通常优先保证？', '可用性 (A)', '分区容忍性 (P) 无法避免', '一致性 (C) 和 分区容忍性 (P)', '仅可用性', 'C', NULL),
(@pack_id, 25, '以下哪个是用于限流 (Rate Limiting) 的算法？', '令牌桶', '漏桶', '滑动窗口', '以上都是', 'D', NULL),
(@pack_id, 26, '在事件驱动架构中，“事件溯源” (Event Sourcing) 的核心思想是？', '只存储当前状态', '存储所有状态变更事件，状态由事件回放得到', '删除历史事件', '使用关系型数据库', 'B', NULL),
(@pack_id, 27, '以下哪个是用于构建云原生应用的重要标准？', '12要素 (12-Factor App)', 'MVC', 'DDD', 'SOLID', 'A', NULL),
(@pack_id, 28, '在设计日志系统时，集中式日志管理常用的栈是？', 'ELK (Elasticsearch, Logstash, Kibana)', 'LAMP', 'MEAN', 'JAMstack', 'A', NULL),
(@pack_id, 29, '“服务网格” (Service Mesh) 技术的代表产品是？', 'Istio / Linkerd', 'Nginx', 'HAProxy', 'Spring Cloud', 'A', NULL),
(@pack_id, 30, '架构师在评估系统容量时，需要考虑的指标不包括？', '峰值QPS', '数据存储量', '网络带宽', '代码行数', 'D', NULL),
(@pack_id, 31, '以下哪个是用于描述系统间数据流和接口的架构视图？', '逻辑视图', '开发视图', '进程视图 / 通信视图', '物理视图', 'C', NULL),
(@pack_id, 32, '在设计高可用系统时，“健康检查”机制的作用是？', '监控服务器CPU', '检测服务实例是否存活，自动摘除不健康节点', '记录用户行为', '更新配置', 'B', NULL),
(@pack_id, 33, '以下哪个是用于蓝绿部署或金丝雀发布的关键组件？', '负载均衡器', '容器编排平台', '服务注册中心', '以上都是', 'D', NULL),
(@pack_id, 34, '在分布式系统中，“脑裂”问题通常出现在什么场景？', '网络延迟', '主从切换时，多个节点同时认为自己是主', '数据不一致', '缓存失效', 'B', NULL),
(@pack_id, 35, '以下哪个是用于数据分片 (Sharding) 的常用策略？', '哈希分片', '范围分片', '目录分片', '以上都是', 'D', NULL),
(@pack_id, 36, '对于实时性要求极高的系统（如高频交易），通常不采用什么？', '使用C++编写核心逻辑', '使用微服务和消息队列', '使用内存数据库', '采用内核旁路技术', 'B', NULL),
(@pack_id, 37, '架构设计文档 (ADR) 的主要作用是？', '记录代码实现细节', '记录重要的架构决策及其上下文、后果', '项目管理计划', '用户手册', 'B', NULL),
(@pack_id, 38, '以下哪个是用于实现“断路器” (Circuit Breaker) 模式的开源库？', 'Resilience4j / Hystrix', 'Log4j', 'JUnit', 'Mockito', 'A', NULL),
(@pack_id, 39, '在分层架构中，通常哪一层负责业务逻辑？', '表现层', '业务逻辑层', '数据访问层', '基础设施层', 'B', NULL),
(@pack_id, 40, '以下哪个是用于API版本管理的常见做法？', 'URL路径包含版本号 (/v1/resource)', '请求头指定版本 (Accept: version=1.0)', '参数传递版本 (?version=1)', '以上都是', 'D', NULL),
(@pack_id, 41, '架构设计中，“耦合度”和“内聚度”的黄金法则是？', '高耦合、低内聚', '低耦合、高内聚', '高耦合、高内聚', '低耦合、低内聚', 'B', NULL),
(@pack_id, 42, '以下哪个是用于实现分布式锁的常用组件？', 'Redis', 'ZooKeeper', 'etcd', '以上都是', 'D', NULL),
(@pack_id, 43, '架构师审查代码时，最关注的是什么？', '代码格式美观', '变量命名规范', '是否遵循架构设计和关键非功能需求（如性能、安全）', '注释数量', 'C', NULL),
(@pack_id, 44, '对于大规模分布式系统，推荐使用什么类型的数据库来存储用户会话？', '关系型数据库 (如MySQL)', '键值存储 (如Redis)', '文档数据库 (如MongoDB)', '图数据库', 'B', NULL),
(@pack_id, 45, '以下哪个是用于架构风险评估的方法？', 'ATAM (Architecture Tradeoff Analysis Method)', 'Scrum', 'TDD', 'Pair Programming', 'A', NULL),
(@pack_id, 46, '在设计系统时，考虑“故障隔离” (Bulkhead) 模式的主要目的是？', '增加系统吞吐量', '防止一个组件的故障波及整个系统', '降低系统复杂度', '提高代码复用', 'B', NULL),
(@pack_id, 47, '以下哪个是用于分析系统瓶颈的常用工具？', 'Profiler (如 JProfiler, py-spy)', '链路追踪系统', '监控仪表板', '以上都是', 'D', NULL),
(@pack_id, 48, '在微服务架构中，服务粒度划分过细可能导致什么？', '分布式事务复杂度增加', '运维成本上升', '网络延迟增加', '以上都是', 'D', NULL),
(@pack_id, 49, '以下哪个是“云原生”计算基金会的毕业项目？', 'Kubernetes', 'Prometheus', 'Envoy', '以上都是', 'D', NULL),
(@pack_id, 50, '作为一名架构师，最重要的软技能是？', '精通多种编程语言', '系统性思维、权衡取舍能力和沟通说服能力', '最快的编码速度', '最新的技术潮流追随', 'B', NULL);
COMMIT;
-- ======================================================
-- 专业81：计算机科学×软件工程 — DevOps工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_swe:2', 81, 'DevOps工程师', 'major_cs', 'major_swe', '计算机科学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是DevOps工程师的核心技能之一？', '珠宝鉴定', 'CI/CD', '服装设计', '机械维修', 'B', NULL),
(@pack_id, 2, '以下哪项最接近DevOps工程师的高级年薪上限？', '40万', '30万', '100', '20万', 'C', NULL),
(@pack_id, 3, '以下哪个岗位名称与专业81对应？', '外汇交易员', '软件售前顾问', 'DevOps工程师', '市场数据分析师', 'C', NULL),
(@pack_id, 4, 'DevOps工程师的岗位竞争激烈程度为？', '1:1', '2:1', '20:1', '4:1', 'C', NULL),
(@pack_id, 5, '以下哪个不是DevOps工程师的别称？', 'DevOps工程师', 'DevOps工程师(资深)', '计算机科学×软件工程专家', '外汇交易员', 'D', NULL),
(@pack_id, 6, 'DevOps工程师面试时最可能被考察的技能是？', '海洋学', '车床操作', 'CI/CD', '天文学', 'C', NULL),
(@pack_id, 7, 'DevOps工程师属于哪个学科组合？', '市场营销×英语', '法学×会计学', '电气工程×金融学', '计算机科学×软件工程', 'D', NULL),
(@pack_id, 8, '以下哪项是DevOps工程师的核心技能之一？', 'CI/CD', '建筑工程', '雕塑艺术', '古生物学', 'A', NULL),
(@pack_id, 9, 'DevOps工程师的薪资结构中，初级岗位年薪约为？', '80-100万', '20-32', '120-150万', '5-10万', 'B', NULL),
(@pack_id, 10, '以下哪项是DevOps工程师的核心技能之一？', '版画制作', '微生物学', '陶瓷工艺', '云计算', 'D', NULL),
(@pack_id, 11, '在1-5级工作强度体系中，DevOps工程师属于哪一级？', '6级', '4', '7级', '0级', 'B', NULL),
(@pack_id, 12, '以下哪项技能对DevOps工程师的职业发展最重要？', '核工程', 'CI/CD', '采矿工程', '气象学', 'B', NULL),
(@pack_id, 13, '应聘DevOps工程师，本科学历占比约为？', '90%', '60%', '10%', '20%', 'B', NULL),
(@pack_id, 14, 'DevOps工程师的工作强度属于？', '较低', '极高', '极低', '较高', 'D', NULL),
(@pack_id, 15, '专业81的岗位名称是？', 'DevOps工程师', '数据平台开发工程师', '医药代表', '医药行业研究员', 'A', NULL),
(@pack_id, 16, '以下哪项最接近DevOps工程师的学历分布？', '本科100%', '博士100%', '本科60% 硕士40%', '高中100%', 'C', NULL),
(@pack_id, 17, 'DevOps工程师属于以下哪类岗位热度？', '极低', '无热度', '低', '冷门', 'C', NULL),
(@pack_id, 18, '以下哪项不是DevOps工程师的主要工作内容？', '技术方案', '财务报表审计', '系统设计', '代码编写', 'B', NULL),
(@pack_id, 19, 'DevOps工程师的学历门槛是？', '博士100%', '高中即可', '本科60% 硕士40%', '无要求', 'C', NULL),
(@pack_id, 20, '以下哪项是DevOps工程师的交叉学科背景？', '四个学科', '计算机科学×软件工程', '单一学科', '三个学科', 'B', NULL),
(@pack_id, 21, '以下哪项是DevOps工程师的核心技能之一？', '建筑工程', '气象学', '陶瓷工艺', 'K8s', 'D', NULL),
(@pack_id, 22, 'DevOps工程师的岗位中，最高学历要求通常是什么？', '本科', '高中', '硕士', '博士后', 'C', NULL),
(@pack_id, 23, 'DevOps工程师对硕士学历的要求是？', '硕士10%', '硕士40%', '硕士20%', '硕士50%', 'B', NULL),
(@pack_id, 24, 'DevOps工程师的高级年薪范围是？', '20-30万', '70-100', '250-300万', '30-40万', 'B', NULL),
(@pack_id, 25, '以下哪个竞争比与DevOps工程师相符？', '1:10', '1:100', '1:5', '20:1', 'D', NULL),
(@pack_id, 26, '计算机科学×软件工程交叉领域对应的岗位是？', '医疗市场专员', 'DevOps工程师', '医疗软件产品经理', '医疗健康投资分析师', 'B', NULL),
(@pack_id, 27, '应聘DevOps工程师时，平均多少人竞争1个岗位？', '3人', '4人', '20', '5人', 'C', NULL),
(@pack_id, 28, 'DevOps工程师在项目中最需要运用的能力是？', 'CI/CD', '钳工工艺', '采矿工程', '地质学', 'A', NULL),
(@pack_id, 29, '以下哪个数字代表DevOps工程师的工作强度？', '7', '0', '4', '6', 'C', NULL),
(@pack_id, 30, 'DevOps工程师的工作强度等级是？', '4', '5', '3', '1', 'A', NULL),
(@pack_id, 31, 'DevOps工程师的学科组合中，第一个学科是？', '数据科学', '计算机科学', '会计学', '市场营销', 'B', NULL),
(@pack_id, 32, 'DevOps工程师的初级年薪范围是？', '5-8万', '200-300万', '8-12万', '20-32', 'D', NULL),
(@pack_id, 33, '以下哪个场景最符合DevOps工程师的工作环境？', '手术室', '技术办公室', '法庭', '农田', 'B', NULL),
(@pack_id, 34, '以下哪项是DevOps工程师的核心技能之一？', '理发师', '珠宝鉴定', '云计算', '古生物学', 'C', NULL),
(@pack_id, 35, 'DevOps工程师的工作中不涉及以下哪项技能？', 'K8s', '云计算', 'CI/CD', '茶艺师', 'D', NULL),
(@pack_id, 36, '以下哪项是DevOps工程师的核心技能之一？', 'K8s', '珠宝鉴定', '铸造工艺', '茶艺师', 'A', NULL),
(@pack_id, 37, 'DevOps工程师属于以下哪个领域的岗位？', '计算机科学/软件工程复合领域', '纯文科', '纯体育', '纯理科', 'A', NULL),
(@pack_id, 38, 'DevOps工程师工作中最可能使用的设备是？', '挖掘机', '计算机', '手术刀', '钢琴', 'B', NULL),
(@pack_id, 39, 'DevOps工程师不需要以下哪项能力？', '外科手术', '逻辑思维', '问题解决', '编程能力', 'A', NULL),
(@pack_id, 40, '以下哪项是DevOps工程师的核心技能之一？', '采矿工程', 'K8s', '雕塑艺术', '烹饪技术', 'B', NULL),
(@pack_id, 41, 'DevOps工程师的竞争比20:1意味着？', '自动录取', '无竞争', '平均20人竞争1个岗位', '内部推荐即可', 'C', NULL),
(@pack_id, 42, 'DevOps工程师岗位要求掌握计算机科学和软件工程的复合知识，这属于？', '单一学科岗位', '纯管理岗位', '跨学科复合岗位', '体力劳动岗位', 'C', NULL),
(@pack_id, 43, 'DevOps工程师需要持续学习的原因是？', '学习内容少', '技术更新快', '无需学习', '学习不重要', 'B', NULL),
(@pack_id, 44, 'DevOps工程师的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '无影响', '竞争优势', 'D', NULL),
(@pack_id, 45, 'DevOps工程师的中级年薪范围是？', '200-250万', '150-200万', '40-60', '10-15万', 'C', NULL),
(@pack_id, 46, 'DevOps工程师需要融合哪两个学科的知识？', '历史和地理', '金融和建筑', '法学和医学', '计算机科学和软件工程', 'D', NULL),
(@pack_id, 47, '在DevOps工程师的日常工作中，最常用的技能组合是？', '茶艺师', 'CI/CD、K8s', '书法篆刻', '量子物理', 'B', NULL),
(@pack_id, 48, '以下哪项是DevOps工程师的核心技能之一？', '烹饪技术', '地质学', '天文学', 'CI/CD', 'D', NULL),
(@pack_id, 49, 'DevOps工程师的工作强度评级为4，对应描述是？', '超负荷', '一般', '较高', '繁忙', 'C', NULL),
(@pack_id, 50, 'DevOps工程师的竞争比是？', '20:1', '8:1', '10:1', '5:1', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业82：计算机科学×市场营销 — 营销技术专家(MarTech)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_marketing:0', 82, '营销技术专家(MarTech)', 'major_cs', 'major_marketing', '计算机科学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪个竞争比与营销技术专家(MarTech)相符？', '1:10', '1:100', '1:5', '15:1', 'D', NULL),
(@pack_id, 2, '营销技术专家(MarTech)的工作强度等级是？', '4', '2', '3', '1', 'C', NULL),
(@pack_id, 3, '营销技术专家(MarTech)的学历门槛是？', '博士100%', '本科60% 硕士40%', '大专即可', '高中即可', 'B', NULL),
(@pack_id, 4, '营销技术专家(MarTech)的中级年薪范围是？', '15-20万', '150-200万', '35-50', '200-250万', 'C', NULL),
(@pack_id, 5, '以下哪项不是营销技术专家(MarTech)的主要工作内容？', '核心工作A', 'unrelated_work', '核心工作C', '核心工作B', 'B', NULL),
(@pack_id, 6, '以下哪个岗位名称与专业82对应？', '营销技术专家(MarTech)', '海外营销专员', '国际医疗协调员', '国际金融分析师(CFA)', 'A', NULL),
(@pack_id, 7, '营销技术专家(MarTech)的高级年薪范围是？', '20-30万', '30-40万', '200-250万', '60-85', 'D', NULL),
(@pack_id, 8, '以下哪个数字代表营销技术专家(MarTech)的工作强度？', '6', '8', '3', '7', 'C', NULL),
(@pack_id, 9, '营销技术专家(MarTech)属于以下哪个领域的岗位？', '纯体育', '纯艺术', '计算机科学/市场营销复合领域', '纯文科', 'C', NULL),
(@pack_id, 10, '在营销技术专家(MarTech)的日常工作中，最常用的技能组合是？', '石油钻探', '考古学', '营销自动化、CDP', '版画制作', 'C', NULL),
(@pack_id, 11, '营销技术专家(MarTech)的竞争比是？', '5:1', '10:1', '15:1', '8:1', 'C', NULL),
(@pack_id, 12, '营销技术专家(MarTech)的复合学科背景使其在就业市场上具有？', '负面作用', '无影响', '被淘汰风险', '竞争优势', 'D', NULL),
(@pack_id, 13, '应聘营销技术专家(MarTech)，本科学历占比约为？', '10%', '60%', '20%', '100%', 'B', NULL),
(@pack_id, 14, '营销技术专家(MarTech)的工作强度属于？', '极高', '高', '中等', '极低', 'B', NULL),
(@pack_id, 15, '营销技术专家(MarTech)工作中最可能使用的工具是？', '手术刀', '挖掘机', '钢琴', '专业工具', 'D', NULL),
(@pack_id, 16, '营销技术专家(MarTech)的工作成果通常以什么形式呈现？', '专业成果', '建筑', '食品', '油画', 'A', NULL),
(@pack_id, 17, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '考古学', '焊接技术', '园艺设计', 'SQL/API', 'D', NULL),
(@pack_id, 18, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '气象学', '园艺设计', 'CDP', '烹饪技术', 'C', NULL),
(@pack_id, 19, '营销技术专家(MarTech)对硕士学历的要求是？', '硕士0%', '硕士10%', '硕士40%', '硕士20%', 'C', NULL),
(@pack_id, 20, '计算机科学×市场营销交叉领域对应的岗位是？', '营销技术专家(MarTech)', '机器学习平台开发', '开发者关系工程师', '医保精算师', 'A', NULL),
(@pack_id, 21, '以下哪项是营销技术专家(MarTech)的核心技能之一？', 'CDP', '地质学', '海洋学', '石油钻探', 'A', NULL),
(@pack_id, 22, '营销技术专家(MarTech)不需要以下哪项能力？', '专业能力B', '专业能力A', '无关能力', '专业能力C', 'C', NULL),
(@pack_id, 23, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '拓扑学', '营销自动化', '石油钻探', '园艺设计', 'B', NULL),
(@pack_id, 24, '营销技术专家(MarTech)属于以下哪类岗位热度？', '极低', '高', '淘汰', '冷门', 'B', NULL),
(@pack_id, 25, '以下哪项最接近营销技术专家(MarTech)的学历分布？', '本科60% 硕士40%', '高中100%', '本科100%', '硕士100%', 'A', NULL),
(@pack_id, 26, '营销技术专家(MarTech)需要融合哪两个学科的知识？', '金融和建筑', '历史和地理', '法学和医学', '计算机科学和市场营销', 'D', NULL),
(@pack_id, 27, '以下哪项是营销技术专家(MarTech)的交叉学科背景？', '单一学科', '无学科要求', '三个学科', '计算机科学×市场营销', 'D', NULL),
(@pack_id, 28, '营销技术专家(MarTech)岗位要求掌握计算机科学和市场营销的复合知识，这属于？', '体力劳动岗位', '纯技术岗位', '纯管理岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 29, '营销技术专家(MarTech)的初级年薪范围是？', '8-12万', '18-28', '5-8万', '100-150万', 'B', NULL),
(@pack_id, 30, '以下哪项最接近营销技术专家(MarTech)的高级年薪上限？', '30万', '85', '20万', '50万', 'B', NULL),
(@pack_id, 31, '应聘营销技术专家(MarTech)时，平均多少人竞争1个岗位？', '5人', '2人', '15', '4人', 'C', NULL),
(@pack_id, 32, '以下哪个场景最符合营销技术专家(MarTech)的工作环境？', '专业场所', '农田', '法庭', '手术室', 'A', NULL),
(@pack_id, 33, '以下哪项最符合营销技术专家(MarTech)的职业特点？', '跨学科复合型人才', '纯体力型', '纯管理型', '无技能型', 'A', NULL),
(@pack_id, 34, '在1-5级工作强度体系中，营销技术专家(MarTech)属于哪一级？', '0级', '6级', '3', '7级', 'C', NULL),
(@pack_id, 35, '营销技术专家(MarTech)的学科组合中，第一个学科是？', '计算机科学', '数据科学', '会计学', '市场营销', 'A', NULL),
(@pack_id, 36, '营销技术专家(MarTech)的竞争比15:1意味着？', '无竞争', '1人竞争多个岗位', '平均15人竞争1个岗位', '内部推荐即可', 'C', NULL),
(@pack_id, 37, '营销技术专家(MarTech)的工作中不涉及以下哪项技能？', '营销自动化', '海洋学', 'SQL/API', 'CDP', 'B', NULL),
(@pack_id, 38, '专业82的岗位名称是？', '营销技术专家(MarTech)', '英文技术支持', '跨境并购翻译', '机器学习工程师', 'A', NULL),
(@pack_id, 39, '以下哪个不是营销技术专家(MarTech)的别称？', '计算机科学×市场营销专家', '营销技术专家(MarTech)', 'SCI论文编辑', '营销技术专家(MarTech)(资深)', 'C', NULL),
(@pack_id, 40, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '营销自动化', '石油钻探', '理发师', '量子物理', 'A', NULL),
(@pack_id, 41, '营销技术专家(MarTech)的岗位竞争激烈程度为？', '3:1', '1:1', '4:1', '15:1', 'D', NULL),
(@pack_id, 42, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '美容师', '航空航天', '量子物理', 'SQL/API', 'D', NULL),
(@pack_id, 43, '营销技术专家(MarTech)属于哪个学科组合？', '计算机科学×市场营销', '法学×会计学', '临床医学×数据科学', '市场营销×英语', 'A', NULL),
(@pack_id, 44, '营销技术专家(MarTech)面试时最可能被考察的技能是？', '服装设计', '海洋学', '营销自动化', '拓扑学', 'C', NULL),
(@pack_id, 45, '营销技术专家(MarTech)在项目中最需要运用的能力是？', '营销自动化', '理发师', '烹饪技术', '雕塑艺术', 'A', NULL),
(@pack_id, 46, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '地质学', '油画技法', 'SQL/API', '钳工工艺', 'C', NULL),
(@pack_id, 47, '以下哪项技能对营销技术专家(MarTech)的职业发展最重要？', '焊接技术', '营销自动化', '铸造工艺', '核工程', 'B', NULL),
(@pack_id, 48, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '石油钻探', '营销自动化', '钳工工艺', '钢琴演奏', 'B', NULL),
(@pack_id, 49, '营销技术专家(MarTech)的岗位中，最高学历要求通常是什么？', '博士后', '大专', '高中', '硕士', 'D', NULL),
(@pack_id, 50, '以下哪项是营销技术专家(MarTech)的核心技能之一？', '采矿工程', 'CDP', '油画技法', '珠宝鉴定', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业83：计算机科学×市场营销 — SEO/SEM策略师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_marketing:1', 83, 'SEO/SEM策略师', 'major_cs', 'major_marketing', '计算机科学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是SEO/SEM策略师的核心技能之一？', '昆虫学', 'Google Ads', '珠宝鉴定', '古生物学', 'B', NULL),
(@pack_id, 2, '以下哪项是SEO/SEM策略师的核心技能之一？', '搜索引擎算法', '版画制作', '车床操作', '珠宝鉴定', 'A', NULL),
(@pack_id, 3, 'SEO/SEM策略师的竞争比12:1意味着？', '内部推荐即可', '自动录取', '1人竞争多个岗位', '平均12人竞争1个岗位', 'D', NULL),
(@pack_id, 4, '以下哪项是SEO/SEM策略师的核心技能之一？', '建筑工程', '数据分析', '珠宝鉴定', '茶艺师', 'B', NULL),
(@pack_id, 5, 'SEO/SEM策略师岗位要求掌握计算机科学和市场营销的复合知识，这属于？', '体力劳动岗位', '纯管理岗位', '单一学科岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 6, '以下哪项是SEO/SEM策略师的核心技能之一？', '焊接技术', '航空航天', '雕塑艺术', '数据分析', 'D', NULL),
(@pack_id, 7, '应聘SEO/SEM策略师，本科学历占比约为？', '80%', '10%', '20%', '100%', 'A', NULL),
(@pack_id, 8, 'SEO/SEM策略师需要融合哪两个学科的知识？', '历史和地理', '金融和建筑', '计算机科学和市场营销', '法学和医学', 'C', NULL),
(@pack_id, 9, '以下哪项技能对SEO/SEM策略师的职业发展最重要？', '烹饪技术', '矿物学', '油画技法', '搜索引擎算法', 'D', NULL),
(@pack_id, 10, 'SEO/SEM策略师工作中最可能使用的工具是？', '手术刀', '钢琴', '挖掘机', '专业工具', 'D', NULL),
(@pack_id, 11, '以下哪个岗位名称与专业83对应？', '营销技术专家(MarTech)', '交易系统开发', '金融软件产品经理', 'SEO/SEM策略师', 'D', NULL),
(@pack_id, 12, '以下哪项是SEO/SEM策略师的核心技能之一？', '版画制作', '园艺设计', '搜索引擎算法', '建筑工程', 'C', NULL),
(@pack_id, 13, '在SEO/SEM策略师的日常工作中，最常用的技能组合是？', '园艺设计', '微生物学', '搜索引擎算法、数据分析', '车床操作', 'C', NULL),
(@pack_id, 14, 'SEO/SEM策略师的学历门槛是？', '高中即可', '大专即可', '博士100%', '本科80% 硕士20%', 'D', NULL),
(@pack_id, 15, '以下哪项是SEO/SEM策略师的核心技能之一？', '建筑工程', '地质学', '搜索引擎算法', '焊接技术', 'C', NULL),
(@pack_id, 16, '以下哪个场景最符合SEO/SEM策略师的工作环境？', '农田', '手术室', '专业场所', '法庭', 'C', NULL),
(@pack_id, 17, '以下哪项不是SEO/SEM策略师的主要工作内容？', '核心工作C', 'unrelated_work', '核心工作B', '核心工作A', 'B', NULL),
(@pack_id, 18, 'SEO/SEM策略师的工作强度评级为3，对应描述是？', '轻松', '高', '一般', '超负荷', 'B', NULL),
(@pack_id, 19, '以下哪项是SEO/SEM策略师的核心技能之一？', '量子物理', '搜索引擎算法', '核工程', '拓扑学', 'B', NULL),
(@pack_id, 20, '以下哪项最接近SEO/SEM策略师的高级年薪上限？', '40万', '30万', '75', '20万', 'C', NULL),
(@pack_id, 21, 'SEO/SEM策略师的薪资结构中，初级岗位年薪约为？', '3-5万', '120-150万', '15-24', '5-10万', 'C', NULL),
(@pack_id, 22, 'SEO/SEM策略师不需要以下哪项能力？', '专业能力C', '专业能力B', '专业能力A', '无关能力', 'D', NULL),
(@pack_id, 23, 'SEO/SEM策略师的职业发展路径通常从什么级别开始？', '顾问', '实习生', '志愿者', '初级', 'D', NULL),
(@pack_id, 24, 'SEO/SEM策略师需要持续学习的原因是？', '无需学习', '学习不重要', '学习内容少', '技术更新快', 'D', NULL),
(@pack_id, 25, '以下哪项最符合SEO/SEM策略师的职业特点？', '单一技能型', '跨学科复合型人才', '纯体力型', '无技能型', 'B', NULL),
(@pack_id, 26, '计算机科学×市场营销交叉领域对应的岗位是？', '电子病历开发工程师', 'SEO/SEM策略师', '医药代表', '市场数据分析师', 'B', NULL),
(@pack_id, 27, 'SEO/SEM策略师的中级年薪范围是？', '28-42', '200-250万', '150-200万', '15-20万', 'A', NULL),
(@pack_id, 28, 'SEO/SEM策略师面试时最可能被考察的技能是？', '服装设计', '搜索引擎算法', '昆虫学', '理发师', 'B', NULL),
(@pack_id, 29, 'SEO/SEM策略师的高级年薪范围是？', '200-250万', '20-30万', '50-75', '250-300万', 'C', NULL),
(@pack_id, 30, 'SEO/SEM策略师的工作成果通常以什么形式呈现？', '建筑', '油画', '食品', '专业成果', 'D', NULL),
(@pack_id, 31, '以下哪个竞争比与SEO/SEM策略师相符？', '1:5', '1:10', '12:1', '1:20', 'C', NULL),
(@pack_id, 32, 'SEO/SEM策略师在项目中最需要运用的能力是？', '搜索引擎算法', '版画制作', '天文学', '考古学', 'A', NULL),
(@pack_id, 33, '以下哪项是SEO/SEM策略师的交叉学科背景？', '无学科要求', '四个学科', '单一学科', '计算机科学×市场营销', 'D', NULL),
(@pack_id, 34, 'SEO/SEM策略师的复合学科背景使其在就业市场上具有？', '无影响', '负面作用', '竞争优势', '被淘汰风险', 'C', NULL),
(@pack_id, 35, 'SEO/SEM策略师的岗位中，最高学历要求通常是什么？', '硕士', '大专', '博士后', '本科', 'A', NULL),
(@pack_id, 36, '应聘SEO/SEM策略师时，平均多少人竞争1个岗位？', '12', '5人', '2人', '3人', 'A', NULL),
(@pack_id, 37, 'SEO/SEM策略师的工作强度等级是？', '5', '1', '3', '2', 'C', NULL),
(@pack_id, 38, 'SEO/SEM策略师的工作中不涉及以下哪项技能？', '搜索引擎算法', 'Google Ads', '雕塑艺术', '数据分析', 'C', NULL),
(@pack_id, 39, 'SEO/SEM策略师属于以下哪个领域的岗位？', '纯理科', '计算机科学/市场营销复合领域', '纯文科', '纯体育', 'B', NULL),
(@pack_id, 40, '在1-5级工作强度体系中，SEO/SEM策略师属于哪一级？', '8级', '3', '0级', '7级', 'B', NULL),
(@pack_id, 41, 'SEO/SEM策略师的初级年薪范围是？', '8-12万', '15-24', '100-150万', '5-8万', 'B', NULL),
(@pack_id, 42, 'SEO/SEM策略师属于以下哪类岗位热度？', '高', '淘汰', '极低', '无热度', 'A', NULL),
(@pack_id, 43, 'SEO/SEM策略师的岗位竞争激烈程度为？', '2:1', '4:1', '12:1', '1:1', 'C', NULL),
(@pack_id, 44, 'SEO/SEM策略师的竞争比是？', '8:1', '12:1', '100:1', '10:1', 'B', NULL),
(@pack_id, 45, 'SEO/SEM策略师对硕士学历的要求是？', '硕士20%', '硕士50%', '硕士10%', '硕士0%', 'A', NULL),
(@pack_id, 46, '以下哪项最接近SEO/SEM策略师的学历分布？', '博士100%', '高中100%', '本科80% 硕士20%', '硕士100%', 'C', NULL),
(@pack_id, 47, '以下哪项是SEO/SEM策略师的核心技能之一？', '拓扑学', '考古学', 'Google Ads', '植物学', 'C', NULL),
(@pack_id, 48, '专业83的岗位名称是？', '计算机双语教学', '机器学习工程师', '营销技术专家(MarTech)', 'SEO/SEM策略师', 'D', NULL),
(@pack_id, 49, 'SEO/SEM策略师的工作强度属于？', '中等', '极高', '极低', '高', 'D', NULL),
(@pack_id, 50, '以下哪个不是SEO/SEM策略师的别称？', 'SEO/SEM策略师', 'SEO/SEM策略师(高级)', '计算机科学×市场营销专家', '机器学习平台开发', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业84：计算机科学×市场营销 — 推荐系统产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_marketing:2', 84, '推荐系统产品经理', 'major_cs', 'major_marketing', '计算机科学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '推荐系统产品经理不需要以下哪项能力？', '沟通能力', '分析能力', '写作能力', '机械操作', 'D', NULL),
(@pack_id, 2, '推荐系统产品经理的复合学科背景使其在就业市场上具有？', '被淘汰风险', '竞争优势', '无影响', '劣势', 'B', NULL),
(@pack_id, 3, '推荐系统产品经理对硕士学历的要求是？', '硕士0%', '硕士70%', '硕士20%', '硕士50%', 'B', NULL),
(@pack_id, 4, '应聘推荐系统产品经理时，平均多少人竞争1个岗位？', '25', '4人', '3人', '2人', 'A', NULL),
(@pack_id, 5, '以下哪项最接近推荐系统产品经理的高级年薪上限？', '120', '40万', '20万', '50万', 'A', NULL),
(@pack_id, 6, '以下哪个场景最符合推荐系统产品经理的工作环境？', '办公室/会议室', '农田', '手术室', '工厂车间', 'A', NULL),
(@pack_id, 7, '以下哪项是推荐系统产品经理的核心技能之一？', '核工程', '植物学', '珠宝鉴定', '推荐算法', 'D', NULL),
(@pack_id, 8, '推荐系统产品经理属于以下哪个领域的岗位？', '纯艺术', '纯体育', '计算机科学/市场营销复合领域', '纯文科', 'C', NULL),
(@pack_id, 9, '以下哪项技能对推荐系统产品经理的职业发展最重要？', '植物学', '石油钻探', '推荐算法', '美容师', 'C', NULL),
(@pack_id, 10, '以下哪个不是推荐系统产品经理的别称？', '推荐系统产品经理', '机器学习工程师', '计算机科学×市场营销专家', '推荐系统产品经理(资深)', 'B', NULL),
(@pack_id, 11, '推荐系统产品经理的工作中不涉及以下哪项技能？', 'A/B测试', '用户画像', '推荐算法', '美容师', 'D', NULL),
(@pack_id, 12, '推荐系统产品经理的岗位竞争激烈程度为？', '2:1', '25:1', '3:1', '4:1', 'B', NULL),
(@pack_id, 13, '推荐系统产品经理的工作强度评级为3，对应描述是？', '轻松', '繁忙', '超负荷', '高', 'D', NULL),
(@pack_id, 14, '推荐系统产品经理的薪资结构中，初级岗位年薪约为？', '120-150万', '3-5万', '80-100万', '22-35', 'D', NULL),
(@pack_id, 15, '以下哪项不是推荐系统产品经理的主要工作内容？', '数据分析', '方案设计', '客户沟通', '芯片制造', 'D', NULL),
(@pack_id, 16, '以下哪项是推荐系统产品经理的核心技能之一？', '铸造工艺', '茶艺师', '铣床加工', '推荐算法', 'D', NULL),
(@pack_id, 17, '推荐系统产品经理面试时最可能被考察的技能是？', '舞蹈编排', '推荐算法', '雕塑艺术', '航空航天', 'B', NULL),
(@pack_id, 18, '推荐系统产品经理的中级年薪范围是？', '200-250万', '15-20万', '150-200万', '45-70', 'D', NULL),
(@pack_id, 19, '以下哪项是推荐系统产品经理的核心技能之一？', '茶艺师', '铣床加工', 'A/B测试', '车床操作', 'C', NULL),
(@pack_id, 20, '以下哪项是推荐系统产品经理的核心技能之一？', '理发师', '焊接技术', 'A/B测试', '建筑工程', 'C', NULL),
(@pack_id, 21, '应聘推荐系统产品经理，本科学历占比约为？', '10%', '90%', '100%', '30%', 'D', NULL),
(@pack_id, 22, '以下哪项是推荐系统产品经理的核心技能之一？', '石油钻探', '用户画像', '植物学', '矿物学', 'B', NULL),
(@pack_id, 23, '推荐系统产品经理属于以下哪类岗位热度？', '冷门', '极低', '高', '无热度', 'C', NULL),
(@pack_id, 24, '在推荐系统产品经理的日常工作中，最常用的技能组合是？', '采矿工程', '推荐算法、用户画像', '拓扑学', '铸造工艺', 'B', NULL),
(@pack_id, 25, '推荐系统产品经理工作中最可能使用的工具是？', '手术器械', '焊接设备', '纺织机', '办公软件', 'D', NULL),
(@pack_id, 26, '推荐系统产品经理需要持续学习的原因是？', '学习有坏处', '学习内容少', '学习不重要', '技术更新快', 'D', NULL),
(@pack_id, 27, '以下哪项是推荐系统产品经理的核心技能之一？', '航空航天', '矿物学', 'A/B测试', '铸造工艺', 'C', NULL),
(@pack_id, 28, '以下哪个岗位名称与专业84对应？', '临床预测模型开发', '软件本地化工程师', '推荐系统产品经理', '营销技术专家(MarTech)', 'C', NULL),
(@pack_id, 29, '推荐系统产品经理的职业发展路径通常从什么级别开始？', '合伙人', '初级', '志愿者', '实习生', 'B', NULL),
(@pack_id, 30, '推荐系统产品经理的工作强度等级是？', '1', '4', '3', '5', 'C', NULL),
(@pack_id, 31, '推荐系统产品经理的初级年薪范围是？', '200-300万', '5-8万', '22-35', '100-150万', 'C', NULL),
(@pack_id, 32, '推荐系统产品经理岗位要求掌握计算机科学和市场营销的复合知识，这属于？', '跨学科复合岗位', '体力劳动岗位', '纯管理岗位', '单一学科岗位', 'A', NULL),
(@pack_id, 33, '以下哪项是推荐系统产品经理的核心技能之一？', '雕塑艺术', '气象学', '拓扑学', '用户画像', 'D', NULL),
(@pack_id, 34, '计算机科学×市场营销交叉领域对应的岗位是？', '推荐系统产品经理', '医学翻译', '海外营销专员', '英文技术支持', 'A', NULL),
(@pack_id, 35, '以下哪项是推荐系统产品经理的核心技能之一？', '核工程', '拓扑学', '推荐算法', '园艺设计', 'C', NULL),
(@pack_id, 36, '推荐系统产品经理的工作成果通常以什么形式呈现？', '药品', '建筑', '方案/报告', '食品', 'C', NULL),
(@pack_id, 37, '推荐系统产品经理的工作强度属于？', '高', '较高', '中等', '较低', 'A', NULL),
(@pack_id, 38, '推荐系统产品经理的学历门槛是？', '无要求', '本科30% 硕士70%', '大专即可', '博士100%', 'B', NULL),
(@pack_id, 39, '推荐系统产品经理的岗位中，最高学历要求通常是什么？', '博士后', '硕士', '大专', '高中', 'B', NULL),
(@pack_id, 40, '推荐系统产品经理的竞争比25:1意味着？', '1人竞争多个岗位', '内部推荐即可', '无竞争', '平均25人竞争1个岗位', 'D', NULL),
(@pack_id, 41, '以下哪项是推荐系统产品经理的核心技能之一？', '舞蹈编排', '用户画像', '钳工工艺', '理发师', 'B', NULL),
(@pack_id, 42, '以下哪个竞争比与推荐系统产品经理相符？', '25:1', '1:5', '1:10', '1:20', 'A', NULL),
(@pack_id, 43, '在1-5级工作强度体系中，推荐系统产品经理属于哪一级？', '3', '8级', '6级', '0级', 'A', NULL),
(@pack_id, 44, '专业84的岗位名称是？', '英文技术支持', '交易系统开发', '海外营销专员', '推荐系统产品经理', 'D', NULL),
(@pack_id, 45, '以下哪项是推荐系统产品经理的交叉学科背景？', '计算机科学×市场营销', '单一学科', '四个学科', '无学科要求', 'A', NULL),
(@pack_id, 46, '以下哪项最接近推荐系统产品经理的学历分布？', '本科30% 硕士70%', '高中100%', '硕士100%', '博士100%', 'A', NULL),
(@pack_id, 47, '推荐系统产品经理的学科组合中，第一个学科是？', '市场营销', '法学', '数据科学', '计算机科学', 'D', NULL),
(@pack_id, 48, '推荐系统产品经理需要融合哪两个学科的知识？', '法学和医学', '计算机科学和市场营销', '历史和地理', '艺术和体育', 'B', NULL),
(@pack_id, 49, '以下哪项最符合推荐系统产品经理的职业特点？', '纯体力型', '无技能型', '纯管理型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 50, '以下哪个数字代表推荐系统产品经理的工作强度？', '6', '8', '3', '7', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业85：计算机科学×数据科学 — 机器学习工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_ds:0', 85, '机器学习工程师', 'major_cs', 'major_ds', '计算机科学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪个场景最符合机器学习工程师的工作环境？', '法庭', '农田', '手术室', '技术办公室', 'D', NULL),
(@pack_id, 2, '机器学习工程师岗位要求掌握计算机科学和数据科学的复合知识，这属于？', '体力劳动岗位', '纯管理岗位', '纯技术岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 3, '机器学习工程师的复合学科背景使其在就业市场上具有？', '劣势', '竞争优势', '被淘汰风险', '负面作用', 'B', NULL),
(@pack_id, 4, '以下哪项是机器学习工程师的核心技能之一？', '书法篆刻', 'ML框架', '铸造工艺', '海洋学', 'B', NULL),
(@pack_id, 5, '机器学习工程师的岗位竞争激烈程度为？', '4:1', '3:1', '40:1', '2:1', 'C', NULL),
(@pack_id, 6, '以下哪项是机器学习工程师的核心技能之一？', '数据结构', '雕塑艺术', '地质学', '美容师', 'A', NULL),
(@pack_id, 7, '机器学习工程师的学科组合中，第一个学科是？', '法学', '计算机科学', '会计学', '市场营销', 'B', NULL),
(@pack_id, 8, '以下哪个数字代表机器学习工程师的工作强度？', '6', '3', '0', '8', 'B', NULL),
(@pack_id, 9, '机器学习工程师需要融合哪两个学科的知识？', '法学和医学', '金融和建筑', '计算机科学和数据科学', '历史和地理', 'C', NULL),
(@pack_id, 10, '机器学习工程师对硕士学历的要求是？', '硕士10%', '硕士20%', '硕士90%', '硕士50%', 'C', NULL),
(@pack_id, 11, '以下哪项是机器学习工程师的核心技能之一？', '数据结构', '拓扑学', '机械维修', '烹饪技术', 'A', NULL),
(@pack_id, 12, '应聘机器学习工程师，本科学历占比约为？', '10%', '100%', '90%', '20%', 'A', NULL),
(@pack_id, 13, '机器学习工程师的岗位中，最高学历要求通常是什么？', '大专', '本科', '高中', '硕士', 'D', NULL),
(@pack_id, 14, '机器学习工程师在项目中最需要运用的能力是？', '气象学', '矿物学', '舞蹈编排', 'Python', 'D', NULL),
(@pack_id, 15, '机器学习工程师的初级年薪范围是？', '30-45', '200-300万', '5-8万', '100-150万', 'A', NULL),
(@pack_id, 16, '机器学习工程师需要持续学习的原因是？', '技术更新快', '学习内容少', '无需学习', '学习有坏处', 'A', NULL),
(@pack_id, 17, '以下哪个岗位名称与专业85对应？', '软件本地化工程师', '交易系统开发', '机器学习工程师', '国际医疗协调员', 'C', NULL),
(@pack_id, 18, '以下哪项是机器学习工程师的核心技能之一？', 'Python', '理发师', '美容师', '钢琴演奏', 'A', NULL),
(@pack_id, 19, '以下哪项是机器学习工程师的核心技能之一？', 'ML框架', '建筑工程', '微生物学', '昆虫学', 'A', NULL),
(@pack_id, 20, '机器学习工程师属于哪个学科组合？', '市场营销×英语', '法学×会计学', '计算机科学×数据科学', '临床医学×数据科学', 'C', NULL),
(@pack_id, 21, '以下哪项最接近机器学习工程师的高级年薪上限？', '30万', '50万', '150', '40万', 'C', NULL),
(@pack_id, 22, '机器学习工程师的学历门槛是？', '高中即可', '本科10% 硕士90%', '博士100%', '大专即可', 'B', NULL),
(@pack_id, 23, '机器学习工程师的工作强度等级是？', '2', '5', '3', '1', 'C', NULL),
(@pack_id, 24, '机器学习工程师不需要以下哪项能力？', '外科手术', '逻辑思维', '问题解决', '编程能力', 'A', NULL),
(@pack_id, 25, '机器学习工程师属于以下哪个领域的岗位？', '纯理科', '纯文科', '计算机科学/数据科学复合领域', '纯艺术', 'C', NULL),
(@pack_id, 26, '机器学习工程师的中级年薪范围是？', '150-200万', '10-15万', '55-85', '15-20万', 'C', NULL),
(@pack_id, 27, '机器学习工程师的薪资结构中，初级岗位年薪约为？', '30-45', '80-100万', '120-150万', '5-10万', 'A', NULL),
(@pack_id, 28, '以下哪个竞争比与机器学习工程师相符？', '1:20', '1:5', '1:100', '40:1', 'D', NULL),
(@pack_id, 29, '机器学习工程师的高级年薪范围是？', '30-40万', '20-30万', '250-300万', '100-150', 'D', NULL),
(@pack_id, 30, '专业85的岗位名称是？', '机器学习工程师', '金融软件产品经理', '临床预测模型开发', '海外数据竞赛选手', 'A', NULL),
(@pack_id, 31, '机器学习工程师的职业发展路径通常从什么级别开始？', '志愿者', '合伙人', '初级', '实习生', 'C', NULL),
(@pack_id, 32, '机器学习工程师属于以下哪类岗位热度？', '极低', '无热度', '高', '淘汰', 'C', NULL),
(@pack_id, 33, '在1-5级工作强度体系中，机器学习工程师属于哪一级？', '6级', '7级', '8级', '3', 'D', NULL),
(@pack_id, 34, '以下哪项最符合机器学习工程师的职业特点？', '无技能型', '跨学科复合型人才', '纯管理型', '纯体力型', 'B', NULL),
(@pack_id, 35, '机器学习工程师的竞争比是？', '10:1', '8:1', '100:1', '40:1', 'D', NULL),
(@pack_id, 36, '机器学习工程师面试时最可能被考察的技能是？', '理发师', '美容师', '机械维修', 'Python', 'D', NULL),
(@pack_id, 37, '以下哪项技能对机器学习工程师的职业发展最重要？', '茶艺师', 'Python', '版画制作', '铣床加工', 'B', NULL),
(@pack_id, 38, '应聘机器学习工程师时，平均多少人竞争1个岗位？', '3人', '40', '2人', '5人', 'B', NULL),
(@pack_id, 39, '机器学习工程师的工作成果通常以什么形式呈现？', '软件/系统', '雕塑', '服装', '油画', 'A', NULL),
(@pack_id, 40, '在机器学习工程师的日常工作中，最常用的技能组合是？', 'Python、ML框架', '核工程', '钢琴演奏', '量子物理', 'A', NULL),
(@pack_id, 41, '机器学习工程师的工作强度属于？', '中等', '较低', '极低', '高', 'D', NULL),
(@pack_id, 42, '以下哪项不是机器学习工程师的主要工作内容？', '系统设计', '代码编写', '技术方案', '财务报表审计', 'D', NULL),
(@pack_id, 43, '以下哪项最接近机器学习工程师的学历分布？', '高中100%', '本科10% 硕士90%', '本科100%', '博士100%', 'B', NULL),
(@pack_id, 44, '以下哪项是机器学习工程师的核心技能之一？', '舞蹈编排', '机械维修', 'Python', '美容师', 'C', NULL),
(@pack_id, 45, '以下哪项是机器学习工程师的核心技能之一？', '服装设计', 'ML框架', '铸造工艺', '版画制作', 'B', NULL),
(@pack_id, 46, '以下哪项是机器学习工程师的核心技能之一？', '微生物学', 'Python', '雕塑艺术', '海洋学', 'B', NULL),
(@pack_id, 47, '机器学习工程师的工作中不涉及以下哪项技能？', '考古学', '数据结构', 'ML框架', 'Python', 'A', NULL),
(@pack_id, 48, '计算机科学×数据科学交叉领域对应的岗位是？', '软件售前顾问', '医疗软件产品经理', '机器学习工程师', '海外营销专员', 'C', NULL),
(@pack_id, 49, '以下哪项是机器学习工程师的核心技能之一？', '陶瓷工艺', '数据结构', '舞蹈编排', '茶艺师', 'B', NULL),
(@pack_id, 50, '机器学习工程师工作中最可能使用的设备是？', '计算机', '手术刀', '钢琴', '挖掘机', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业86：计算机科学×数据科学 — 大数据平台开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_ds:1', 86, '大数据平台开发', 'major_cs', 'major_ds', '计算机科学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '大数据平台开发的薪资结构中，初级岗位年薪约为？', '25-38', '120-150万', '5-10万', '3-5万', 'A', NULL),
(@pack_id, 2, '大数据平台开发属于以下哪类岗位热度？', '冷门', '高', '淘汰', '无热度', 'B', NULL),
(@pack_id, 3, '大数据平台开发需要持续学习的原因是？', '学习不重要', '无需学习', '技术更新快', '学习有坏处', 'C', NULL),
(@pack_id, 4, '以下哪项最接近大数据平台开发的学历分布？', '高中100%', '博士100%', '本科20% 硕士80%', '硕士100%', 'C', NULL),
(@pack_id, 5, '大数据平台开发对硕士学历的要求是？', '硕士50%', '硕士80%', '硕士20%', '硕士0%', 'B', NULL),
(@pack_id, 6, '大数据平台开发属于以下哪个领域的岗位？', '纯体育', '纯文科', '计算机科学/数据科学复合领域', '纯艺术', 'C', NULL),
(@pack_id, 7, '以下哪项是大数据平台开发的核心技能之一？', 'Spark/Flink', '建筑工程', '油画技法', '矿物学', 'A', NULL),
(@pack_id, 8, '以下哪项是大数据平台开发的核心技能之一？', '珠宝鉴定', 'Java/Scala', '考古学', '机械维修', 'B', NULL),
(@pack_id, 9, '大数据平台开发的工作中不涉及以下哪项技能？', 'Spark/Flink', 'Java/Scala', '机械维修', 'Hadoop', 'C', NULL),
(@pack_id, 10, '在1-5级工作强度体系中，大数据平台开发属于哪一级？', '0级', '6级', '8级', '3', 'D', NULL),
(@pack_id, 11, '以下哪项是大数据平台开发的核心技能之一？', 'Spark/Flink', '版画制作', '石油钻探', '舞蹈编排', 'A', NULL),
(@pack_id, 12, '大数据平台开发属于哪个学科组合？', '市场营销×英语', '法学×会计学', '计算机科学×数据科学', '电气工程×金融学', 'C', NULL),
(@pack_id, 13, '大数据平台开发的初级年薪范围是？', '5-8万', '200-300万', '100-150万', '25-38', 'D', NULL),
(@pack_id, 14, '大数据平台开发的职业发展路径通常从什么级别开始？', '顾问', '实习生', '初级', '志愿者', 'C', NULL),
(@pack_id, 15, '大数据平台开发不需要以下哪项能力？', '问题解决', '外科手术', '逻辑思维', '编程能力', 'B', NULL),
(@pack_id, 16, '大数据平台开发的工作强度等级是？', '4', '5', '3', '1', 'C', NULL),
(@pack_id, 17, '大数据平台开发的竞争比30:1意味着？', '自动录取', '无竞争', '1人竞争多个岗位', '平均30人竞争1个岗位', 'D', NULL),
(@pack_id, 18, '大数据平台开发工作中最可能使用的设备是？', '钢琴', '计算机', '挖掘机', '手术刀', 'B', NULL),
(@pack_id, 19, '应聘大数据平台开发，本科学历占比约为？', '100%', '10%', '20%', '90%', 'C', NULL),
(@pack_id, 20, '大数据平台开发的学历门槛是？', '无要求', '博士100%', '本科20% 硕士80%', '大专即可', 'C', NULL),
(@pack_id, 21, '大数据平台开发的学科组合中，第一个学科是？', '法学', '数据科学', '计算机科学', '市场营销', 'C', NULL),
(@pack_id, 22, '以下哪个岗位名称与专业86对应？', '机器学习工程师', '营销技术专家(MarTech)', '金融软件产品经理', '大数据平台开发', 'D', NULL),
(@pack_id, 23, '以下哪个竞争比与大数据平台开发相符？', '30:1', '1:20', '1:5', '1:10', 'A', NULL),
(@pack_id, 24, '以下哪项是大数据平台开发的核心技能之一？', '油画技法', '钢琴演奏', '钳工工艺', 'Hadoop', 'D', NULL),
(@pack_id, 25, '以下哪项是大数据平台开发的核心技能之一？', 'Java/Scala', '植物学', '茶艺师', '版画制作', 'A', NULL),
(@pack_id, 26, '专业86的岗位名称是？', '医药代表', '大数据平台开发', '智能投顾算法工程师', '财富管理顾问', 'B', NULL),
(@pack_id, 27, '以下哪个数字代表大数据平台开发的工作强度？', '3', '7', '8', '6', 'A', NULL),
(@pack_id, 28, '大数据平台开发需要融合哪两个学科的知识？', '历史和地理', '计算机科学和数据科学', '金融和建筑', '法学和医学', 'B', NULL),
(@pack_id, 29, '大数据平台开发的岗位中，最高学历要求通常是什么？', '本科', '高中', '博士后', '硕士', 'D', NULL),
(@pack_id, 30, '应聘大数据平台开发时，平均多少人竞争1个岗位？', '4人', '5人', '2人', '30', 'D', NULL),
(@pack_id, 31, '大数据平台开发面试时最可能被考察的技能是？', '核工程', 'Spark/Flink', '采矿工程', '石油钻探', 'B', NULL),
(@pack_id, 32, '计算机科学×数据科学交叉领域对应的岗位是？', '大数据平台开发', 'DevOps工程师', '外汇交易员', '医院信息系统实施', 'A', NULL),
(@pack_id, 33, '以下哪个不是大数据平台开发的别称？', '大数据平台开发', '计算机科学×数据科学专家', '大数据平台开发(资深)', '智能投顾算法工程师', 'D', NULL),
(@pack_id, 34, '大数据平台开发的竞争比是？', '30:1', '10:1', '100:1', '5:1', 'A', NULL),
(@pack_id, 35, '大数据平台开发的工作强度评级为3，对应描述是？', '超负荷', '轻松', '高', '一般', 'C', NULL),
(@pack_id, 36, '以下哪项是大数据平台开发的核心技能之一？', '园艺设计', '古生物学', '烹饪技术', 'Spark/Flink', 'D', NULL),
(@pack_id, 37, '大数据平台开发的工作强度属于？', '中等', '极高', '高', '较高', 'C', NULL),
(@pack_id, 38, '大数据平台开发的高级年薪范围是？', '30-40万', '20-30万', '200-250万', '80-120', 'D', NULL),
(@pack_id, 39, '大数据平台开发的中级年薪范围是？', '15-20万', '45-70', '150-200万', '200-250万', 'B', NULL),
(@pack_id, 40, '以下哪项是大数据平台开发的核心技能之一？', '建筑工程', 'Java/Scala', '美容师', '服装设计', 'B', NULL),
(@pack_id, 41, '以下哪项最接近大数据平台开发的高级年薪上限？', '120', '40万', '20万', '50万', 'A', NULL),
(@pack_id, 42, '大数据平台开发在项目中最需要运用的能力是？', '焊接技术', 'Spark/Flink', '拓扑学', '古生物学', 'B', NULL),
(@pack_id, 43, '大数据平台开发的复合学科背景使其在就业市场上具有？', '负面作用', '竞争优势', '无影响', '劣势', 'B', NULL),
(@pack_id, 44, '在大数据平台开发的日常工作中，最常用的技能组合是？', '机械维修', '气象学', 'Spark/Flink、Java/Scala', '服装设计', 'C', NULL),
(@pack_id, 45, '大数据平台开发的工作成果通常以什么形式呈现？', '服装', '软件/系统', '油画', '雕塑', 'B', NULL),
(@pack_id, 46, '以下哪项不是大数据平台开发的主要工作内容？', '技术方案', '代码编写', '系统设计', '财务报表审计', 'D', NULL),
(@pack_id, 47, '以下哪项是大数据平台开发的核心技能之一？', '铣床加工', '雕塑艺术', 'Spark/Flink', '钳工工艺', 'C', NULL),
(@pack_id, 48, '大数据平台开发的岗位竞争激烈程度为？', '2:1', '30:1', '1:1', '3:1', 'B', NULL),
(@pack_id, 49, '以下哪项技能对大数据平台开发的职业发展最重要？', '钳工工艺', 'Spark/Flink', '气象学', '理发师', 'B', NULL),
(@pack_id, 50, '以下哪项是大数据平台开发的核心技能之一？', 'Hadoop', '陶瓷工艺', '珠宝鉴定', '天文学', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业87：计算机科学×数据科学 — AI算法专家
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_ds:2', 87, 'AI算法专家', 'major_cs', 'major_ds', '计算机科学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'AI算法专家的岗位中，最高学历要求通常是什么？', '大专', '博士', '博士后', '高中', 'B', NULL),
(@pack_id, 2, 'AI算法专家工作中最可能使用的工具是？', '挖掘机', '手术刀', '钢琴', '专业工具', 'D', NULL),
(@pack_id, 3, 'AI算法专家的复合学科背景使其在就业市场上具有？', '被淘汰风险', '无影响', '负面作用', '竞争优势', 'D', NULL),
(@pack_id, 4, '以下哪项是AI算法专家的核心技能之一？', '理发师', '论文复现', '版画制作', '美容师', 'B', NULL),
(@pack_id, 5, '在1-5级工作强度体系中，AI算法专家属于哪一级？', '8级', '6级', '7级', '3', 'D', NULL),
(@pack_id, 6, '以下哪个数字代表AI算法专家的工作强度？', '3', '6', '0', '8', 'A', NULL),
(@pack_id, 7, '以下哪项是AI算法专家的核心技能之一？', '版画制作', '深度学习', '拓扑学', '石油钻探', 'B', NULL),
(@pack_id, 8, 'AI算法专家属于哪个学科组合？', '电气工程×金融学', '临床医学×数据科学', '法学×会计学', '计算机科学×数据科学', 'D', NULL),
(@pack_id, 9, '以下哪项是AI算法专家的核心技能之一？', '天文学', '深度学习', '考古学', '铸造工艺', 'B', NULL),
(@pack_id, 10, 'AI算法专家的中级年薪范围是？', '70-110', '200-250万', '150-200万', '15-20万', 'A', NULL),
(@pack_id, 11, 'AI算法专家在项目中最需要运用的能力是？', '深度学习', '焊接技术', '量子物理', '建筑工程', 'A', NULL),
(@pack_id, 12, 'AI算法专家属于以下哪个领域的岗位？', '纯体育', '纯理科', '纯艺术', '计算机科学/数据科学复合领域', 'D', NULL),
(@pack_id, 13, 'AI算法专家的初级年薪范围是？', '35-55', '8-12万', '100-150万', '200-300万', 'A', NULL),
(@pack_id, 14, 'AI算法专家的学历门槛是？', '大专即可', '无要求', '博士100%', '博士60% 硕士40%', 'D', NULL),
(@pack_id, 15, '以下哪项最接近AI算法专家的学历分布？', '高中100%', '本科100%', '博士60% 硕士40%', '硕士100%', 'C', NULL),
(@pack_id, 16, 'AI算法专家需要持续学习的原因是？', '学习有坏处', '学习内容少', '技术更新快', '无需学习', 'C', NULL),
(@pack_id, 17, 'AI算法专家的工作强度属于？', '极高', '较低', '较高', '高', 'D', NULL),
(@pack_id, 18, 'AI算法专家的学科组合中，第一个学科是？', '市场营销', '计算机科学', '法学', '数据科学', 'B', NULL),
(@pack_id, 19, '以下哪个不是AI算法专家的别称？', 'AI算法专家', '医疗健康投资分析师', '计算机科学×数据科学专家', 'AI算法专家(资深)', 'B', NULL),
(@pack_id, 20, '以下哪项不是AI算法专家的主要工作内容？', '核心工作B', 'unrelated_work', '核心工作C', '核心工作A', 'B', NULL),
(@pack_id, 21, '应聘AI算法专家时，平均多少人竞争1个岗位？', '3人', '5人', '50', '4人', 'C', NULL),
(@pack_id, 22, 'AI算法专家的工作强度评级为3，对应描述是？', '繁忙', '一般', '超负荷', '高', 'D', NULL),
(@pack_id, 23, '以下哪项是AI算法专家的核心技能之一？', '雕塑艺术', '烹饪技术', '车床操作', '论文复现', 'D', NULL),
(@pack_id, 24, '以下哪项是AI算法专家的核心技能之一？', '陶瓷工艺', '矿物学', '植物学', '深度学习', 'D', NULL),
(@pack_id, 25, 'AI算法专家属于以下哪类岗位热度？', '冷门', '极低', '高', '无热度', 'C', NULL),
(@pack_id, 26, 'AI算法专家的工作成果通常以什么形式呈现？', '专业成果', '食品', '油画', '建筑', 'A', NULL),
(@pack_id, 27, '以下哪个场景最符合AI算法专家的工作环境？', '法庭', '手术室', '农田', '专业场所', 'D', NULL),
(@pack_id, 28, 'AI算法专家的薪资结构中，初级岗位年薪约为？', '80-100万', '120-150万', '3-5万', '35-55', 'D', NULL),
(@pack_id, 29, 'AI算法专家的职业发展路径通常从什么级别开始？', '志愿者', '顾问', '初级', '合伙人', 'C', NULL),
(@pack_id, 30, '以下哪项是AI算法专家的核心技能之一？', '烹饪技术', '大规模训练', '矿物学', '昆虫学', 'B', NULL),
(@pack_id, 31, '以下哪项是AI算法专家的核心技能之一？', '铸造工艺', '论文复现', '雕塑艺术', '美容师', 'B', NULL),
(@pack_id, 32, '应聘AI算法专家，本科学历占比约为？', '100%', '10%', '不适用', '90%', 'C', NULL),
(@pack_id, 33, 'AI算法专家的竞争比是？', '100:1', '50:1', '10:1', '8:1', 'B', NULL),
(@pack_id, 34, '以下哪项最符合AI算法专家的职业特点？', '纯管理型', '跨学科复合型人才', '无技能型', '单一技能型', 'B', NULL),
(@pack_id, 35, 'AI算法专家需要融合哪两个学科的知识？', '金融和建筑', '法学和医学', '计算机科学和数据科学', '艺术和体育', 'C', NULL),
(@pack_id, 36, 'AI算法专家的竞争比50:1意味着？', '平均50人竞争1个岗位', '内部推荐即可', '自动录取', '无竞争', 'A', NULL),
(@pack_id, 37, '计算机科学×数据科学交叉领域对应的岗位是？', '海外营销专员', 'SEO/SEM策略师', 'AI算法专家', '医药代表', 'C', NULL),
(@pack_id, 38, '以下哪项是AI算法专家的核心技能之一？', '大规模训练', '昆虫学', '海洋学', '量子物理', 'A', NULL),
(@pack_id, 39, 'AI算法专家不需要以下哪项能力？', '专业能力A', '专业能力C', '无关能力', '专业能力B', 'C', NULL),
(@pack_id, 40, '以下哪项是AI算法专家的核心技能之一？', '大规模训练', '舞蹈编排', '美容师', '海洋学', 'A', NULL),
(@pack_id, 41, '以下哪个竞争比与AI算法专家相符？', '1:10', '50:1', '1:100', '1:5', 'B', NULL),
(@pack_id, 42, '在AI算法专家的日常工作中，最常用的技能组合是？', '油画技法', '拓扑学', '深度学习、论文复现', '烹饪技术', 'C', NULL),
(@pack_id, 43, '以下哪个岗位名称与专业87对应？', '量化交易平台工程师', 'DevOps工程师', '技术文档写作', 'AI算法专家', 'D', NULL),
(@pack_id, 44, 'AI算法专家的高级年薪范围是？', '130-200', '20-30万', '250-300万', '200-250万', 'A', NULL),
(@pack_id, 45, 'AI算法专家面试时最可能被考察的技能是？', '深度学习', '微生物学', '石油钻探', '海洋学', 'A', NULL),
(@pack_id, 46, 'AI算法专家对硕士学历的要求是？', '硕士40%', '硕士50%', '硕士10%', '硕士0%', 'A', NULL),
(@pack_id, 47, 'AI算法专家的岗位竞争激烈程度为？', '2:1', '50:1', '3:1', '1:1', 'B', NULL),
(@pack_id, 48, '以下哪项最接近AI算法专家的高级年薪上限？', '50万', '200', '40万', '20万', 'B', NULL),
(@pack_id, 49, 'AI算法专家岗位要求掌握计算机科学和数据科学的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '纯管理岗位', '体力劳动岗位', 'A', NULL),
(@pack_id, 50, 'AI算法专家的工作中不涉及以下哪项技能？', '深度学习', '珠宝鉴定', '论文复现', '大规模训练', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业88：计算机科学×英语 — 技术文档工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_english:0', 88, '技术文档工程师', 'major_cs', 'major_english', '计算机科学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是技术文档工程师的核心技能之一？', '天文学', '昆虫学', '雕塑艺术', 'DITA', 'D', NULL),
(@pack_id, 2, '以下哪项是技术文档工程师的核心技能之一？', '核工程', '雕塑艺术', 'DITA', '钳工工艺', 'C', NULL),
(@pack_id, 3, '技术文档工程师面试时最可能被考察的技能是？', '技术写作', '考古学', '园艺设计', '采矿工程', 'A', NULL),
(@pack_id, 4, '技术文档工程师的复合学科背景使其在就业市场上具有？', '负面作用', '竞争优势', '劣势', '无影响', 'B', NULL),
(@pack_id, 5, '应聘技术文档工程师，本科学历占比约为？', '100%', '90%', '20%', '10%', 'B', NULL),
(@pack_id, 6, '专业88的岗位名称是？', '医疗软件产品经理', '海外营销专员', '技术文档工程师', '双语数据报告撰写', 'C', NULL),
(@pack_id, 7, '技术文档工程师需要持续学习的原因是？', '无需学习', '技术更新快', '学习有坏处', '学习内容少', 'B', NULL),
(@pack_id, 8, '以下哪项是技术文档工程师的核心技能之一？', '版画制作', '园艺设计', '技术写作', '天文学', 'C', NULL),
(@pack_id, 9, '技术文档工程师属于哪个学科组合？', '法学×会计学', '电气工程×金融学', '计算机科学×英语', '临床医学×数据科学', 'C', NULL),
(@pack_id, 10, '以下哪项是技术文档工程师的核心技能之一？', '车床操作', 'DITA', '陶瓷工艺', '古生物学', 'B', NULL),
(@pack_id, 11, '技术文档工程师不需要以下哪项能力？', '外科手术', '问题解决', '逻辑思维', '编程能力', 'A', NULL),
(@pack_id, 12, '以下哪项技能对技术文档工程师的职业发展最重要？', '铸造工艺', '技术写作', '矿物学', '书法篆刻', 'B', NULL),
(@pack_id, 13, '技术文档工程师的工作成果通常以什么形式呈现？', '油画', '雕塑', '服装', '软件/系统', 'D', NULL),
(@pack_id, 14, '以下哪项是技术文档工程师的核心技能之一？', '采矿工程', '技术写作', '铸造工艺', '油画技法', 'B', NULL),
(@pack_id, 15, '技术文档工程师在项目中最需要运用的能力是？', '焊接技术', '技术写作', '矿物学', '铣床加工', 'B', NULL),
(@pack_id, 16, '技术文档工程师的工作强度属于？', '低', '较高', '极低', '中等', 'A', NULL),
(@pack_id, 17, '技术文档工程师的高级年薪范围是？', '250-300万', '30-40万', '28-35', '20-30万', 'C', NULL),
(@pack_id, 18, '技术文档工程师的学历门槛是？', '本科90% 硕士10%', '无要求', '大专即可', '博士100%', 'A', NULL),
(@pack_id, 19, '技术文档工程师的薪资结构中，初级岗位年薪约为？', '5-10万', '3-5万', '120-150万', '10-16', 'D', NULL),
(@pack_id, 20, '技术文档工程师的工作强度等级是？', '4', '5', '3', '1', 'D', NULL),
(@pack_id, 21, '计算机科学×英语交叉领域对应的岗位是？', '用户增长分析师', '技术产品经理', '技术文档工程师', '电子病历开发工程师', 'C', NULL),
(@pack_id, 22, '以下哪项最符合技术文档工程师的职业特点？', '纯管理型', '跨学科复合型人才', '无技能型', '单一技能型', 'B', NULL),
(@pack_id, 23, '技术文档工程师工作中最可能使用的设备是？', '钢琴', '挖掘机', '手术刀', '计算机', 'D', NULL),
(@pack_id, 24, '以下哪项是技术文档工程师的核心技能之一？', '英语六级', '焊接技术', '航空航天', '铸造工艺', 'A', NULL),
(@pack_id, 25, '技术文档工程师的学科组合中，第一个学科是？', '会计学', '数据科学', '法学', '计算机科学', 'D', NULL),
(@pack_id, 26, '技术文档工程师对硕士学历的要求是？', '硕士10%', '硕士50%', '硕士0%', '硕士20%', 'A', NULL),
(@pack_id, 27, '以下哪项是技术文档工程师的核心技能之一？', '英语六级', '版画制作', '考古学', '核工程', 'A', NULL),
(@pack_id, 28, '技术文档工程师的工作强度评级为1，对应描述是？', '一般', '轻松', '低', '繁忙', 'C', NULL),
(@pack_id, 29, '以下哪个场景最符合技术文档工程师的工作环境？', '技术办公室', '手术室', '农田', '法庭', 'A', NULL),
(@pack_id, 30, '技术文档工程师的中级年薪范围是？', '18-25', '10-15万', '150-200万', '200-250万', 'A', NULL),
(@pack_id, 31, '技术文档工程师的岗位竞争激烈程度为？', '1:1', '8:1', '2:1', '4:1', 'B', NULL),
(@pack_id, 32, '以下哪个竞争比与技术文档工程师相符？', '1:100', '1:10', '8:1', '1:5', 'C', NULL),
(@pack_id, 33, '在1-5级工作强度体系中，技术文档工程师属于哪一级？', '8级', '0级', '7级', '1', 'D', NULL),
(@pack_id, 34, '技术文档工程师属于以下哪个领域的岗位？', '计算机科学/英语复合领域', '纯艺术', '纯理科', '纯体育', 'A', NULL),
(@pack_id, 35, '技术文档工程师的竞争比是？', '5:1', '8:1', '10:1', '100:1', 'B', NULL),
(@pack_id, 36, '技术文档工程师的职业发展路径通常从什么级别开始？', '顾问', '合伙人', '志愿者', '初级', 'D', NULL),
(@pack_id, 37, '技术文档工程师属于以下哪类岗位热度？', '冷门', '低', '淘汰', '极低', 'B', NULL),
(@pack_id, 38, '技术文档工程师的岗位中，最高学历要求通常是什么？', '博士后', '硕士', '大专', '本科', 'B', NULL),
(@pack_id, 39, '以下哪项是技术文档工程师的核心技能之一？', '采矿工程', '技术写作', '烹饪技术', '气象学', 'B', NULL),
(@pack_id, 40, '以下哪个岗位名称与专业88对应？', '市场数据分析师', '国际金融分析师(CFA)', '软件本地化工程师', '技术文档工程师', 'D', NULL),
(@pack_id, 41, '应聘技术文档工程师时，平均多少人竞争1个岗位？', '4人', '3人', '5人', '8', 'D', NULL),
(@pack_id, 42, '技术文档工程师需要融合哪两个学科的知识？', '计算机科学和英语', '法学和医学', '艺术和体育', '历史和地理', 'A', NULL),
(@pack_id, 43, '技术文档工程师岗位要求掌握计算机科学和英语的复合知识，这属于？', '单一学科岗位', '跨学科复合岗位', '纯管理岗位', '纯技术岗位', 'B', NULL),
(@pack_id, 44, '以下哪项最接近技术文档工程师的高级年薪上限？', '30万', '35', '50万', '20万', 'B', NULL),
(@pack_id, 45, '以下哪个数字代表技术文档工程师的工作强度？', '0', '6', '1', '7', 'C', NULL),
(@pack_id, 46, '技术文档工程师的初级年薪范围是？', '10-16', '200-300万', '8-12万', '100-150万', 'A', NULL),
(@pack_id, 47, '以下哪项最接近技术文档工程师的学历分布？', '硕士100%', '博士100%', '本科100%', '本科90% 硕士10%', 'D', NULL),
(@pack_id, 48, '以下哪项是技术文档工程师的交叉学科背景？', '单一学科', '四个学科', '计算机科学×英语', '三个学科', 'C', NULL),
(@pack_id, 49, '在技术文档工程师的日常工作中，最常用的技能组合是？', '技术写作、DITA', '采矿工程', '核工程', '园艺设计', 'A', NULL),
(@pack_id, 50, '以下哪个不是技术文档工程师的别称？', '技术文档工程师', '计算机科学×英语专家', '技术文档工程师(高级)', 'AI算法专家', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业89：计算机科学×英语 — 英文技术支持
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_english:1', 89, '英文技术支持', 'major_cs', 'major_english', '计算机科学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '英文技术支持对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士10%', '硕士0%', 'B', NULL),
(@pack_id, 2, '英文技术支持属于哪个学科组合？', '市场营销×英语', '法学×会计学', '计算机科学×英语', '电气工程×金融学', 'C', NULL),
(@pack_id, 3, '英文技术支持的中级年薪范围是？', '15-20万', '200-250万', '10-15万', '20-30', 'D', NULL),
(@pack_id, 4, '以下哪项是英文技术支持的核心技能之一？', '计算机知识', '车床操作', '钳工工艺', '铸造工艺', 'A', NULL),
(@pack_id, 5, '以下哪个数字代表英文技术支持的工作强度？', '7', '0', '8', '3', 'D', NULL),
(@pack_id, 6, '以下哪项是英文技术支持的核心技能之一？', '茶艺师', '舞蹈编排', '拓扑学', '英语口语', 'D', NULL),
(@pack_id, 7, '英文技术支持的薪资结构中，初级岗位年薪约为？', '3-5万', '80-100万', '120-150万', '12-18', 'D', NULL),
(@pack_id, 8, '以下哪项最接近英文技术支持的高级年薪上限？', '50万', '30万', '40万', '50', 'D', NULL),
(@pack_id, 9, '以下哪项是英文技术支持的交叉学科背景？', '四个学科', '单一学科', '计算机科学×英语', '无学科要求', 'C', NULL),
(@pack_id, 10, '英文技术支持的工作强度评级为3，对应描述是？', '一般', '轻松', '高', '超负荷', 'C', NULL),
(@pack_id, 11, '应聘英文技术支持，本科学历占比约为？', '20%', '90%', '100%', '80%', 'D', NULL),
(@pack_id, 12, '以下哪项最接近英文技术支持的学历分布？', '本科80% 硕士20%', '硕士100%', '本科100%', '高中100%', 'A', NULL),
(@pack_id, 13, '以下哪项是英文技术支持的核心技能之一？', '陶瓷工艺', '计算机知识', '石油钻探', '焊接技术', 'B', NULL),
(@pack_id, 14, '英文技术支持的工作成果通常以什么形式呈现？', '专业成果', '建筑', '食品', '油画', 'A', NULL),
(@pack_id, 15, '以下哪个场景最符合英文技术支持的工作环境？', '手术室', '法庭', '专业场所', '农田', 'C', NULL),
(@pack_id, 16, '以下哪项是英文技术支持的核心技能之一？', '钢琴演奏', '钳工工艺', '考古学', '英语口语', 'D', NULL),
(@pack_id, 17, '英文技术支持的工作中不涉及以下哪项技能？', '英语口语', '计算机知识', '问题解决', '钢琴演奏', 'D', NULL),
(@pack_id, 18, '英文技术支持的初级年薪范围是？', '12-18', '5-8万', '200-300万', '100-150万', 'A', NULL),
(@pack_id, 19, '英文技术支持的学科组合中，第一个学科是？', '计算机科学', '法学', '市场营销', '会计学', 'A', NULL),
(@pack_id, 20, '以下哪项最符合英文技术支持的职业特点？', '单一技能型', '跨学科复合型人才', '纯管理型', '无技能型', 'B', NULL),
(@pack_id, 21, '英文技术支持的竞争比是？', '100:1', '5:1', '10:1', '8:1', 'C', NULL),
(@pack_id, 22, '以下哪项技能对英文技术支持的职业发展最重要？', '陶瓷工艺', '茶艺师', '海洋学', '计算机知识', 'D', NULL),
(@pack_id, 23, '以下哪项是英文技术支持的核心技能之一？', '建筑工程', '服装设计', '问题解决', '古生物学', 'C', NULL),
(@pack_id, 24, '英文技术支持工作中最可能使用的工具是？', '钢琴', '手术刀', '挖掘机', '专业工具', 'D', NULL),
(@pack_id, 25, '英文技术支持的岗位中，最高学历要求通常是什么？', '高中', '本科', '硕士', '博士后', 'C', NULL),
(@pack_id, 26, '以下哪项是英文技术支持的核心技能之一？', '问题解决', '核工程', '海洋学', '茶艺师', 'A', NULL),
(@pack_id, 27, '以下哪个不是英文技术支持的别称？', '英文技术支持(高级)', '英文技术支持(资深)', '英文技术支持', '医院信息系统实施', 'D', NULL),
(@pack_id, 28, '英文技术支持的工作强度属于？', '极低', '高', '较高', '较低', 'B', NULL),
(@pack_id, 29, '英文技术支持的岗位竞争激烈程度为？', '4:1', '3:1', '1:1', '10:1', 'D', NULL),
(@pack_id, 30, '英文技术支持的工作强度等级是？', '5', '4', '2', '3', 'D', NULL),
(@pack_id, 31, '在1-5级工作强度体系中，英文技术支持属于哪一级？', '8级', '0级', '3', '6级', 'C', NULL),
(@pack_id, 32, '英文技术支持属于以下哪个领域的岗位？', '计算机科学/英语复合领域', '纯体育', '纯艺术', '纯文科', 'A', NULL),
(@pack_id, 33, '英文技术支持属于以下哪类岗位热度？', '低', '淘汰', '极低', '无热度', 'A', NULL),
(@pack_id, 34, '英文技术支持需要持续学习的原因是？', '学习内容少', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL),
(@pack_id, 35, '英文技术支持的职业发展路径通常从什么级别开始？', '合伙人', '初级', '志愿者', '顾问', 'B', NULL),
(@pack_id, 36, '英文技术支持需要融合哪两个学科的知识？', '历史和地理', '金融和建筑', '艺术和体育', '计算机科学和英语', 'D', NULL),
(@pack_id, 37, '英文技术支持的高级年薪范围是？', '30-40万', '35-50', '250-300万', '200-250万', 'B', NULL),
(@pack_id, 38, '在英文技术支持的日常工作中，最常用的技能组合是？', '航空航天', '石油钻探', '计算机知识、英语口语', '焊接技术', 'C', NULL),
(@pack_id, 39, '以下哪项是英文技术支持的核心技能之一？', '天文学', '舞蹈编排', '问题解决', '采矿工程', 'C', NULL),
(@pack_id, 40, '以下哪项是英文技术支持的核心技能之一？', '天文学', '昆虫学', '古生物学', '计算机知识', 'D', NULL),
(@pack_id, 41, '英文技术支持面试时最可能被考察的技能是？', '茶艺师', '计算机知识', '服装设计', '拓扑学', 'B', NULL),
(@pack_id, 42, '英文技术支持岗位要求掌握计算机科学和英语的复合知识，这属于？', '纯技术岗位', '跨学科复合岗位', '体力劳动岗位', '纯管理岗位', 'B', NULL),
(@pack_id, 43, '英文技术支持的复合学科背景使其在就业市场上具有？', '劣势', '负面作用', '竞争优势', '无影响', 'C', NULL),
(@pack_id, 44, '应聘英文技术支持时，平均多少人竞争1个岗位？', '3人', '2人', '5人', '10', 'D', NULL),
(@pack_id, 45, '以下哪项是英文技术支持的核心技能之一？', '舞蹈编排', '气象学', '植物学', '英语口语', 'D', NULL),
(@pack_id, 46, '英文技术支持在项目中最需要运用的能力是？', '雕塑艺术', '航空航天', '烹饪技术', '计算机知识', 'D', NULL),
(@pack_id, 47, '英文技术支持不需要以下哪项能力？', '专业能力B', '专业能力C', '无关能力', '专业能力A', 'C', NULL),
(@pack_id, 48, '专业89的岗位名称是？', '金融软件产品经理', '跨境并购翻译', '临床预测模型开发', '英文技术支持', 'D', NULL),
(@pack_id, 49, '以下哪个竞争比与英文技术支持相符？', '1:20', '1:5', '1:10', '10:1', 'D', NULL),
(@pack_id, 50, '以下哪项是英文技术支持的核心技能之一？', '拓扑学', '园艺设计', '机械维修', '计算机知识', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业90：计算机科学×英语 — 计算机双语教学
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_english:2', 90, '计算机双语教学', 'major_cs', 'major_english', '计算机科学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '计算机双语教学在项目中最需要运用的能力是？', '雕塑艺术', '烹饪技术', '石油钻探', '编程能力', 'D', NULL),
(@pack_id, 2, '计算机双语教学的学历门槛是？', '硕士70% 博士30%', '博士100%', '高中即可', '无要求', 'A', NULL),
(@pack_id, 3, '以下哪项是计算机双语教学的核心技能之一？', '烹饪技术', '车床操作', '英语授课', '机械维修', 'C', NULL),
(@pack_id, 4, '计算机双语教学岗位要求掌握计算机科学和英语的复合知识，这属于？', '纯技术岗位', '跨学科复合岗位', '纯管理岗位', '体力劳动岗位', 'B', NULL),
(@pack_id, 5, '计算机双语教学属于以下哪类岗位热度？', '无热度', '低', '淘汰', '冷门', 'B', NULL),
(@pack_id, 6, '以下哪个数字代表计算机双语教学的工作强度？', '8', '0', '6', '2', 'D', NULL),
(@pack_id, 7, '专业90的岗位名称是？', '国际金融分析师(CFA)', 'SCI论文编辑', '计算机双语教学', '国际品牌策划', 'C', NULL),
(@pack_id, 8, '以下哪项最接近计算机双语教学的高级年薪上限？', '60', '20万', '30万', '40万', 'A', NULL),
(@pack_id, 9, '计算机双语教学的竞争比8:1意味着？', '自动录取', '平均8人竞争1个岗位', '1人竞争多个岗位', '无竞争', 'B', NULL),
(@pack_id, 10, '以下哪项是计算机双语教学的核心技能之一？', '海洋学', '编程能力', '气象学', '拓扑学', 'B', NULL),
(@pack_id, 11, '计算机双语教学的初级年薪范围是？', '12-20', '8-12万', '100-150万', '5-8万', 'A', NULL),
(@pack_id, 12, '计算机双语教学的工作强度属于？', '较低', '极低', '中', '较高', 'C', NULL),
(@pack_id, 13, '计算机双语教学面试时最可能被考察的技能是？', '油画技法', '编程能力', '铣床加工', '量子物理', 'B', NULL),
(@pack_id, 14, '计算机双语教学对硕士学历的要求是？', '硕士10%', '硕士70%', '硕士20%', '硕士50%', 'B', NULL),
(@pack_id, 15, '计算机双语教学的中级年薪范围是？', '10-15万', '15-20万', '200-250万', '22-35', 'D', NULL),
(@pack_id, 16, '计算机双语教学工作中最可能使用的工具是？', '手术刀', '挖掘机', '钢琴', '专业工具', 'D', NULL),
(@pack_id, 17, '计算机双语教学的高级年薪范围是？', '200-250万', '20-30万', '30-40万', '40-60', 'D', NULL),
(@pack_id, 18, '计算机双语教学的工作中不涉及以下哪项技能？', '课程设计', '地质学', '英语授课', '编程能力', 'B', NULL),
(@pack_id, 19, '计算机双语教学不需要以下哪项能力？', '专业能力B', '无关能力', '专业能力A', '专业能力C', 'B', NULL),
(@pack_id, 20, '应聘计算机双语教学，本科学历占比约为？', '20%', '不适用', '10%', '100%', 'B', NULL),
(@pack_id, 21, '以下哪项最符合计算机双语教学的职业特点？', '无技能型', '纯体力型', '跨学科复合型人才', '单一技能型', 'C', NULL),
(@pack_id, 22, '以下哪项是计算机双语教学的核心技能之一？', '编程能力', '珠宝鉴定', '美容师', '量子物理', 'A', NULL),
(@pack_id, 23, '以下哪个竞争比与计算机双语教学相符？', '1:100', '1:5', '8:1', '1:20', 'C', NULL),
(@pack_id, 24, '计算机双语教学的岗位竞争激烈程度为？', '8:1', '2:1', '4:1', '1:1', 'A', NULL),
(@pack_id, 25, '以下哪个岗位名称与专业90对应？', '外汇交易员', '计算机双语教学', '推荐系统产品经理', '数据仓库工程师', 'B', NULL),
(@pack_id, 26, '计算机双语教学的职业发展路径通常从什么级别开始？', '志愿者', '顾问', '初级', '合伙人', 'C', NULL),
(@pack_id, 27, '以下哪项是计算机双语教学的核心技能之一？', '车床操作', '英语授课', '理发师', '油画技法', 'B', NULL),
(@pack_id, 28, '在计算机双语教学的日常工作中，最常用的技能组合是？', '古生物学', '钳工工艺', '编程能力、英语授课', '铸造工艺', 'C', NULL),
(@pack_id, 29, '应聘计算机双语教学时，平均多少人竞争1个岗位？', '4人', '5人', '8', '3人', 'C', NULL),
(@pack_id, 30, '以下哪项是计算机双语教学的核心技能之一？', '课程设计', '油画技法', '钢琴演奏', '钳工工艺', 'A', NULL),
(@pack_id, 31, '计算机双语教学需要持续学习的原因是？', '技术更新快', '无需学习', '学习内容少', '学习有坏处', 'A', NULL),
(@pack_id, 32, '计算机科学×英语交叉领域对应的岗位是？', '智能投顾算法工程师', '技术产品经理', '海外技术支持', '计算机双语教学', 'D', NULL),
(@pack_id, 33, '计算机双语教学的学科组合中，第一个学科是？', '计算机科学', '法学', '会计学', '数据科学', 'A', NULL),
(@pack_id, 34, '计算机双语教学的工作成果通常以什么形式呈现？', '食品', '专业成果', '油画', '建筑', 'B', NULL),
(@pack_id, 35, '计算机双语教学的竞争比是？', '8:1', '100:1', '5:1', '10:1', 'A', NULL),
(@pack_id, 36, '以下哪项是计算机双语教学的核心技能之一？', '气象学', '量子物理', '昆虫学', '编程能力', 'D', NULL),
(@pack_id, 37, '计算机双语教学属于以下哪个领域的岗位？', '纯文科', '纯理科', '计算机科学/英语复合领域', '纯体育', 'C', NULL),
(@pack_id, 38, '以下哪个场景最符合计算机双语教学的工作环境？', '农田', '手术室', '专业场所', '法庭', 'C', NULL),
(@pack_id, 39, '以下哪个不是计算机双语教学的别称？', '计算机双语教学(资深)', '数据仓库工程师', '计算机双语教学', '计算机科学×英语专家', 'B', NULL),
(@pack_id, 40, '计算机双语教学属于哪个学科组合？', '法学×会计学', '市场营销×英语', '计算机科学×英语', '临床医学×数据科学', 'C', NULL),
(@pack_id, 41, '以下哪项最接近计算机双语教学的学历分布？', '高中100%', '硕士100%', '本科100%', '硕士70% 博士30%', 'D', NULL),
(@pack_id, 42, '计算机双语教学的工作强度评级为2，对应描述是？', '繁忙', '超负荷', '轻松', '中', 'D', NULL),
(@pack_id, 43, '以下哪项不是计算机双语教学的主要工作内容？', '核心工作B', '核心工作C', '核心工作A', 'unrelated_work', 'D', NULL),
(@pack_id, 44, '以下哪项是计算机双语教学的核心技能之一？', '课程设计', '航空航天', '量子物理', '矿物学', 'A', NULL),
(@pack_id, 45, '在1-5级工作强度体系中，计算机双语教学属于哪一级？', '7级', '2', '6级', '8级', 'B', NULL),
(@pack_id, 46, '以下哪项是计算机双语教学的核心技能之一？', '理发师', '英语授课', '海洋学', '地质学', 'B', NULL),
(@pack_id, 47, '以下哪项是计算机双语教学的核心技能之一？', '编程能力', '建筑工程', '机械维修', '核工程', 'A', NULL),
(@pack_id, 48, '计算机双语教学的复合学科背景使其在就业市场上具有？', '被淘汰风险', '负面作用', '竞争优势', '劣势', 'C', NULL),
(@pack_id, 49, '计算机双语教学的工作强度等级是？', '4', '1', '5', '2', 'D', NULL),
(@pack_id, 50, '计算机双语教学的薪资结构中，初级岗位年薪约为？', '12-20', '5-10万', '80-100万', '120-150万', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业91：金融学×临床医学 — 医疗健康投资分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_clinical:0', 91, '医疗健康投资分析师', 'major_finance', 'major_clinical', '金融学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是医疗健康投资分析师的核心技能之一？', '估值', '油画技法', '采矿工程', '昆虫学', 'A', NULL),
(@pack_id, 2, '以下哪项不是医疗健康投资分析师的主要工作内容？', '模型构建', '产品制造', '趋势分析', '数据收集', 'B', NULL),
(@pack_id, 3, '医疗健康投资分析师不需要以下哪项能力？', '数学能力', '软件操作', '逻辑思维', '手工焊接', 'D', NULL),
(@pack_id, 4, '以下哪个不是医疗健康投资分析师的别称？', '医疗健康投资分析师(资深)', '医疗健康投资分析师', '临床预测模型开发', '医疗健康投资分析师(高级)', 'C', NULL),
(@pack_id, 5, '金融学×临床医学交叉领域对应的岗位是？', '医疗健康投资分析师', '医保精算师', '真实世界研究数据专家', '海外技术支持', 'A', NULL),
(@pack_id, 6, '医疗健康投资分析师属于哪个学科组合？', '临床医学×数据科学', '电气工程×金融学', '金融学×临床医学', '市场营销×英语', 'C', NULL),
(@pack_id, 7, '医疗健康投资分析师的初级年薪范围是？', '8-12万', '5-8万', '200-300万', '20-30', 'D', NULL),
(@pack_id, 8, '在1-5级工作强度体系中，医疗健康投资分析师属于哪一级？', '0级', '6级', '7级', '4', 'D', NULL),
(@pack_id, 9, '医疗健康投资分析师的工作强度评级为4，对应描述是？', '较高', '轻松', '一般', '繁忙', 'A', NULL),
(@pack_id, 10, '医疗健康投资分析师岗位要求掌握金融学和临床医学的复合知识，这属于？', '纯技术岗位', '单一学科岗位', '纯管理岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 11, '医疗健康投资分析师的工作强度等级是？', '1', '4', '5', '2', 'B', NULL),
(@pack_id, 12, '以下哪项是医疗健康投资分析师的核心技能之一？', '财务建模', '茶艺师', '核工程', '版画制作', 'A', NULL),
(@pack_id, 13, '以下哪项是医疗健康投资分析师的交叉学科背景？', '单一学科', '金融学×临床医学', '无学科要求', '三个学科', 'B', NULL),
(@pack_id, 14, '医疗健康投资分析师属于以下哪个领域的岗位？', '金融学/临床医学复合领域', '纯艺术', '纯理科', '纯体育', 'A', NULL),
(@pack_id, 15, '专业91的岗位名称是？', '医疗健康投资分析师', '英文技术支持', '医院信息系统实施', '国际医疗协调员', 'A', NULL),
(@pack_id, 16, '医疗健康投资分析师的中级年薪范围是？', '10-15万', '150-200万', '200-250万', '40-60', 'D', NULL),
(@pack_id, 17, '以下哪项最接近医疗健康投资分析师的高级年薪上限？', '30万', '20万', '100', '40万', 'C', NULL),
(@pack_id, 18, '医疗健康投资分析师的高级年薪范围是？', '30-40万', '20-30万', '70-100', '200-250万', 'C', NULL),
(@pack_id, 19, '医疗健康投资分析师的工作中不涉及以下哪项技能？', '服装设计', '医疗行业研究', '估值', '财务建模', 'A', NULL),
(@pack_id, 20, '应聘医疗健康投资分析师，本科学历占比约为？', '100%', '20%', '10%', '90%', 'B', NULL),
(@pack_id, 21, '在医疗健康投资分析师的日常工作中，最常用的技能组合是？', '舞蹈编排', '财务建模、医疗行业研究', '植物学', '微生物学', 'B', NULL),
(@pack_id, 22, '医疗健康投资分析师面试时最可能被考察的技能是？', '地质学', '海洋学', '财务建模', '车床操作', 'C', NULL),
(@pack_id, 23, '以下哪项是医疗健康投资分析师的核心技能之一？', '医疗行业研究', '地质学', '海洋学', '量子物理', 'A', NULL),
(@pack_id, 24, '医疗健康投资分析师对硕士学历的要求是？', '硕士80%', '硕士10%', '硕士50%', '硕士20%', 'A', NULL),
(@pack_id, 25, '医疗健康投资分析师的薪资结构中，初级岗位年薪约为？', '3-5万', '20-30', '80-100万', '5-10万', 'B', NULL),
(@pack_id, 26, '以下哪个数字代表医疗健康投资分析师的工作强度？', '4', '7', '8', '0', 'A', NULL),
(@pack_id, 27, '医疗健康投资分析师属于以下哪类岗位热度？', '淘汰', '高', '极低', '无热度', 'B', NULL),
(@pack_id, 28, '应聘医疗健康投资分析师时，平均多少人竞争1个岗位？', '3人', '5人', '30', '2人', 'C', NULL),
(@pack_id, 29, '以下哪个场景最符合医疗健康投资分析师的工作环境？', '农田', '手术室', '法庭', '数据分析室', 'D', NULL),
(@pack_id, 30, '医疗健康投资分析师的职业发展路径通常从什么级别开始？', '实习生', '志愿者', '顾问', '初级', 'D', NULL),
(@pack_id, 31, '医疗健康投资分析师的岗位竞争激烈程度为？', '4:1', '3:1', '30:1', '1:1', 'C', NULL),
(@pack_id, 32, '医疗健康投资分析师的学历门槛是？', '本科20% 硕士80%', '高中即可', '大专即可', '博士100%', 'A', NULL),
(@pack_id, 33, '以下哪项是医疗健康投资分析师的核心技能之一？', '铸造工艺', '雕塑艺术', '财务建模', '航空航天', 'C', NULL),
(@pack_id, 34, '以下哪项技能对医疗健康投资分析师的职业发展最重要？', '钢琴演奏', '版画制作', '量子物理', '财务建模', 'D', NULL),
(@pack_id, 35, '以下哪项是医疗健康投资分析师的核心技能之一？', '钢琴演奏', '铣床加工', '茶艺师', '财务建模', 'D', NULL),
(@pack_id, 36, '医疗健康投资分析师需要持续学习的原因是？', '学习不重要', '学习有坏处', '技术更新快', '无需学习', 'C', NULL),
(@pack_id, 37, '医疗健康投资分析师的竞争比30:1意味着？', '内部推荐即可', '1人竞争多个岗位', '自动录取', '平均30人竞争1个岗位', 'D', NULL),
(@pack_id, 38, '医疗健康投资分析师的竞争比是？', '10:1', '8:1', '5:1', '30:1', 'D', NULL),
(@pack_id, 39, '以下哪项最接近医疗健康投资分析师的学历分布？', '本科100%', '高中100%', '本科20% 硕士80%', '博士100%', 'C', NULL),
(@pack_id, 40, '以下哪项是医疗健康投资分析师的核心技能之一？', '估值', '油画技法', '量子物理', '车床操作', 'A', NULL),
(@pack_id, 41, '医疗健康投资分析师的岗位中，最高学历要求通常是什么？', '本科', '硕士', '博士后', '高中', 'B', NULL),
(@pack_id, 42, '医疗健康投资分析师的学科组合中，第一个学科是？', '会计学', '市场营销', '法学', '金融学', 'D', NULL),
(@pack_id, 43, '以下哪项是医疗健康投资分析师的核心技能之一？', '海洋学', '古生物学', '微生物学', '医疗行业研究', 'D', NULL),
(@pack_id, 44, '医疗健康投资分析师的工作强度属于？', '较低', '极低', '较高', '极高', 'C', NULL),
(@pack_id, 45, '以下哪项是医疗健康投资分析师的核心技能之一？', '版画制作', '医疗行业研究', '烹饪技术', '车床操作', 'B', NULL),
(@pack_id, 46, '以下哪个竞争比与医疗健康投资分析师相符？', '1:20', '1:5', '30:1', '1:100', 'C', NULL),
(@pack_id, 47, '医疗健康投资分析师的复合学科背景使其在就业市场上具有？', '被淘汰风险', '竞争优势', '负面作用', '劣势', 'B', NULL),
(@pack_id, 48, '医疗健康投资分析师工作中最可能使用的工具是？', '挖掘机', '钢琴', '手术刀', '数据分析软件', 'D', NULL),
(@pack_id, 49, '医疗健康投资分析师的工作成果通常以什么形式呈现？', '油画', '食品', '分析报告', '建筑', 'C', NULL),
(@pack_id, 50, '以下哪项最符合医疗健康投资分析师的职业特点？', '单一技能型', '纯体力型', '纯管理型', '跨学科复合型人才', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业92：金融学×临床医学 — 医药行业研究员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_clinical:1', 92, '医药行业研究员', 'major_finance', 'major_clinical', '金融学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医药行业研究员面试时最可能被考察的技能是？', '量子物理', '药物研发流程', '拓扑学', '植物学', 'B', NULL),
(@pack_id, 2, '医药行业研究员对硕士学历的要求是？', '硕士50%', '硕士0%', '硕士70%', '硕士20%', 'C', NULL),
(@pack_id, 3, '以下哪项最接近医药行业研究员的学历分布？', '本科100%', '本科30% 硕士70%', '硕士100%', '博士100%', 'B', NULL),
(@pack_id, 4, '医药行业研究员的工作强度属于？', '较高', '较低', '极高', '高', 'D', NULL),
(@pack_id, 5, '以下哪项是医药行业研究员的核心技能之一？', '核工程', '钳工工艺', '药物研发流程', '茶艺师', 'C', NULL),
(@pack_id, 6, '在1-5级工作强度体系中，医药行业研究员属于哪一级？', '6级', '0级', '7级', '3', 'D', NULL),
(@pack_id, 7, '医药行业研究员属于哪个学科组合？', '法学×会计学', '临床医学×数据科学', '电气工程×金融学', '金融学×临床医学', 'D', NULL),
(@pack_id, 8, '医药行业研究员的学历门槛是？', '高中即可', '博士100%', '无要求', '本科30% 硕士70%', 'D', NULL),
(@pack_id, 9, '以下哪项是医药行业研究员的核心技能之一？', '昆虫学', '油画技法', '石油钻探', '药物研发流程', 'D', NULL),
(@pack_id, 10, '医药行业研究员属于以下哪个领域的岗位？', '金融学/临床医学复合领域', '纯体育', '纯艺术', '纯文科', 'A', NULL),
(@pack_id, 11, '医药行业研究员的中级年薪范围是？', '35-55', '150-200万', '10-15万', '200-250万', 'A', NULL),
(@pack_id, 12, '以下哪项最接近医药行业研究员的高级年薪上限？', '30万', '95', '20万', '40万', 'B', NULL),
(@pack_id, 13, '医药行业研究员属于以下哪类岗位热度？', '无热度', '极低', '冷门', '高', 'D', NULL),
(@pack_id, 14, '以下哪项是医药行业研究员的核心技能之一？', '药物研发流程', '海洋学', '拓扑学', '昆虫学', 'A', NULL),
(@pack_id, 15, '以下哪项是医药行业研究员的核心技能之一？', '气象学', '量子物理', '建筑工程', '财报分析', 'D', NULL),
(@pack_id, 16, '医药行业研究员的岗位竞争激烈程度为？', '25:1', '3:1', '4:1', '1:1', 'A', NULL),
(@pack_id, 17, '医药行业研究员的初级年薪范围是？', '8-12万', '18-28', '200-300万', '100-150万', 'B', NULL),
(@pack_id, 18, '医药行业研究员工作中最可能使用的工具是？', '专业工具', '挖掘机', '手术刀', '钢琴', 'A', NULL),
(@pack_id, 19, '医药行业研究员的竞争比25:1意味着？', '平均25人竞争1个岗位', '内部推荐即可', '自动录取', '无竞争', 'A', NULL),
(@pack_id, 20, '以下哪项是医药行业研究员的核心技能之一？', '建筑工程', '石油钻探', '财报分析', '理发师', 'C', NULL),
(@pack_id, 21, '医药行业研究员岗位要求掌握金融学和临床医学的复合知识，这属于？', '单一学科岗位', '纯管理岗位', '跨学科复合岗位', '体力劳动岗位', 'C', NULL),
(@pack_id, 22, '以下哪项是医药行业研究员的核心技能之一？', '昆虫学', '园艺设计', '市场预测', '油画技法', 'C', NULL),
(@pack_id, 23, '以下哪项是医药行业研究员的交叉学科背景？', '单一学科', '金融学×临床医学', '三个学科', '四个学科', 'B', NULL),
(@pack_id, 24, '医药行业研究员的复合学科背景使其在就业市场上具有？', '被淘汰风险', '无影响', '负面作用', '竞争优势', 'D', NULL),
(@pack_id, 25, '医药行业研究员的工作强度等级是？', '1', '3', '5', '4', 'B', NULL),
(@pack_id, 26, '以下哪项是医药行业研究员的核心技能之一？', '钳工工艺', '药物研发流程', '珠宝鉴定', '矿物学', 'B', NULL),
(@pack_id, 27, '以下哪个数字代表医药行业研究员的工作强度？', '7', '3', '6', '8', 'B', NULL),
(@pack_id, 28, '在医药行业研究员的日常工作中，最常用的技能组合是？', '车床操作', '地质学', '书法篆刻', '药物研发流程、财报分析', 'D', NULL),
(@pack_id, 29, '医药行业研究员不需要以下哪项能力？', '专业能力C', '专业能力A', '专业能力B', '无关能力', 'D', NULL),
(@pack_id, 30, '应聘医药行业研究员时，平均多少人竞争1个岗位？', '5人', '25', '3人', '2人', 'B', NULL),
(@pack_id, 31, '以下哪项技能对医药行业研究员的职业发展最重要？', '考古学', '理发师', '药物研发流程', '版画制作', 'C', NULL),
(@pack_id, 32, '医药行业研究员的工作强度评级为3，对应描述是？', '一般', '轻松', '超负荷', '高', 'D', NULL),
(@pack_id, 33, '金融学×临床医学交叉领域对应的岗位是？', '英文技术支持', '医药行业研究员', '海外数据竞赛选手', '医保精算师', 'B', NULL),
(@pack_id, 34, '医药行业研究员的竞争比是？', '8:1', '10:1', '5:1', '25:1', 'D', NULL),
(@pack_id, 35, '以下哪项是医药行业研究员的核心技能之一？', '服装设计', '钳工工艺', '海洋学', '市场预测', 'D', NULL),
(@pack_id, 36, '以下哪个竞争比与医药行业研究员相符？', '1:10', '1:20', '25:1', '1:100', 'C', NULL),
(@pack_id, 37, '医药行业研究员的薪资结构中，初级岗位年薪约为？', '5-10万', '3-5万', '120-150万', '18-28', 'D', NULL),
(@pack_id, 38, '医药行业研究员的工作成果通常以什么形式呈现？', '油画', '专业成果', '食品', '建筑', 'B', NULL),
(@pack_id, 39, '以下哪项是医药行业研究员的核心技能之一？', '陶瓷工艺', '市场预测', '雕塑艺术', '天文学', 'B', NULL),
(@pack_id, 40, '以下哪项是医药行业研究员的核心技能之一？', '雕塑艺术', '陶瓷工艺', '核工程', '财报分析', 'D', NULL),
(@pack_id, 41, '专业92的岗位名称是？', '临床预测模型开发', '机器学习工程师', '双语数据报告撰写', '医药行业研究员', 'D', NULL),
(@pack_id, 42, '医药行业研究员的学科组合中，第一个学科是？', '会计学', '市场营销', '法学', '金融学', 'D', NULL),
(@pack_id, 43, '医药行业研究员的岗位中，最高学历要求通常是什么？', '本科', '大专', '硕士', '博士后', 'C', NULL),
(@pack_id, 44, '应聘医药行业研究员，本科学历占比约为？', '30%', '100%', '10%', '20%', 'A', NULL),
(@pack_id, 45, '医药行业研究员在项目中最需要运用的能力是？', '版画制作', '古生物学', '气象学', '药物研发流程', 'D', NULL),
(@pack_id, 46, '医药行业研究员的工作中不涉及以下哪项技能？', '市场预测', '钢琴演奏', '药物研发流程', '财报分析', 'B', NULL),
(@pack_id, 47, '以下哪项不是医药行业研究员的主要工作内容？', '核心工作C', '核心工作B', 'unrelated_work', '核心工作A', 'C', NULL),
(@pack_id, 48, '以下哪项最符合医药行业研究员的职业特点？', '纯管理型', '纯体力型', '单一技能型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 49, '以下哪个岗位名称与专业92对应？', '医药行业研究员', '国际品牌策划', '跨境并购翻译', '计算机双语教学', 'A', NULL),
(@pack_id, 50, '医药行业研究员需要融合哪两个学科的知识？', '金融学和临床医学', '历史和地理', '艺术和体育', '金融和建筑', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业93：金融学×临床医学 — 医保精算师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_clinical:2', 93, '医保精算师', 'major_finance', 'major_clinical', '金融学×临床医学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医保精算师的工作强度评级为2，对应描述是？', '超负荷', '中', '一般', '繁忙', 'B', NULL),
(@pack_id, 2, '医保精算师的职业发展路径通常从什么级别开始？', '顾问', '志愿者', '合伙人', '初级', 'D', NULL),
(@pack_id, 3, '医保精算师属于哪个学科组合？', '金融学×临床医学', '电气工程×金融学', '临床医学×数据科学', '法学×会计学', 'A', NULL),
(@pack_id, 4, '医保精算师的竞争比是？', '100:1', '5:1', '15:1', '10:1', 'C', NULL),
(@pack_id, 5, '医保精算师的中级年薪范围是？', '32-48', '15-20万', '150-200万', '200-250万', 'A', NULL),
(@pack_id, 6, '医保精算师的工作成果通常以什么形式呈现？', '食品', '油画', '建筑', '专业成果', 'D', NULL),
(@pack_id, 7, '医保精算师的初级年薪范围是？', '5-8万', '8-12万', '200-300万', '18-28', 'D', NULL),
(@pack_id, 8, '医保精算师属于以下哪个领域的岗位？', '纯艺术', '金融学/临床医学复合领域', '纯体育', '纯文科', 'B', NULL),
(@pack_id, 9, '医保精算师在项目中最需要运用的能力是？', '舞蹈编排', '陶瓷工艺', '精算模型', '海洋学', 'C', NULL),
(@pack_id, 10, '以下哪个岗位名称与专业93对应？', '医疗软件产品经理', '英文技术支持', '医保精算师', '海外数据竞赛选手', 'C', NULL),
(@pack_id, 11, '以下哪项不是医保精算师的主要工作内容？', '核心工作C', '核心工作B', 'unrelated_work', '核心工作A', 'C', NULL),
(@pack_id, 12, '以下哪项是医保精算师的核心技能之一？', '石油钻探', '焊接技术', '医保政策', '量子物理', 'C', NULL),
(@pack_id, 13, '医保精算师的薪资结构中，初级岗位年薪约为？', '18-28', '80-100万', '120-150万', '5-10万', 'A', NULL),
(@pack_id, 14, '以下哪项是医保精算师的核心技能之一？', '珠宝鉴定', '石油钻探', '数据分析', '地质学', 'C', NULL),
(@pack_id, 15, '医保精算师的工作中不涉及以下哪项技能？', '医保政策', '精算模型', '数据分析', '版画制作', 'D', NULL),
(@pack_id, 16, '医保精算师的复合学科背景使其在就业市场上具有？', '无影响', '竞争优势', '被淘汰风险', '劣势', 'B', NULL),
(@pack_id, 17, '金融学×临床医学交叉领域对应的岗位是？', '大数据平台开发', '电子病历开发工程师', '医保精算师', '数据平台开发工程师', 'C', NULL),
(@pack_id, 18, '以下哪项最符合医保精算师的职业特点？', '纯体力型', '单一技能型', '跨学科复合型人才', '无技能型', 'C', NULL),
(@pack_id, 19, '医保精算师的岗位竞争激烈程度为？', '3:1', '15:1', '4:1', '1:1', 'B', NULL),
(@pack_id, 20, '以下哪项是医保精算师的核心技能之一？', '精算模型', '车床操作', '铣床加工', '钳工工艺', 'A', NULL),
(@pack_id, 21, '医保精算师需要融合哪两个学科的知识？', '金融学和临床医学', '金融和建筑', '法学和医学', '历史和地理', 'A', NULL),
(@pack_id, 22, '医保精算师不需要以下哪项能力？', '专业能力C', '无关能力', '专业能力A', '专业能力B', 'B', NULL),
(@pack_id, 23, '以下哪个数字代表医保精算师的工作强度？', '0', '7', '2', '6', 'C', NULL),
(@pack_id, 24, '以下哪项是医保精算师的核心技能之一？', '医保政策', '核工程', '烹饪技术', '采矿工程', 'A', NULL),
(@pack_id, 25, '以下哪项是医保精算师的核心技能之一？', '雕塑艺术', '气象学', '陶瓷工艺', '数据分析', 'D', NULL),
(@pack_id, 26, '医保精算师面试时最可能被考察的技能是？', '烹饪技术', '美容师', '精算模型', '石油钻探', 'C', NULL),
(@pack_id, 27, '以下哪项是医保精算师的核心技能之一？', '医保政策', '油画技法', '珠宝鉴定', '古生物学', 'A', NULL),
(@pack_id, 28, '以下哪个竞争比与医保精算师相符？', '1:10', '1:100', '1:20', '15:1', 'D', NULL),
(@pack_id, 29, '医保精算师需要持续学习的原因是？', '技术更新快', '学习有坏处', '学习不重要', '无需学习', 'A', NULL),
(@pack_id, 30, '以下哪项技能对医保精算师的职业发展最重要？', '气象学', '精算模型', '陶瓷工艺', '钳工工艺', 'B', NULL),
(@pack_id, 31, '医保精算师的高级年薪范围是？', '200-250万', '55-80', '30-40万', '250-300万', 'B', NULL),
(@pack_id, 32, '以下哪项是医保精算师的交叉学科背景？', '金融学×临床医学', '单一学科', '无学科要求', '三个学科', 'A', NULL),
(@pack_id, 33, '医保精算师的学历门槛是？', '无要求', '本科40% 硕士60%', '博士100%', '高中即可', 'B', NULL),
(@pack_id, 34, '以下哪项是医保精算师的核心技能之一？', '昆虫学', '建筑工程', '植物学', '精算模型', 'D', NULL),
(@pack_id, 35, '应聘医保精算师，本科学历占比约为？', '40%', '20%', '90%', '10%', 'A', NULL),
(@pack_id, 36, '专业93的岗位名称是？', '医院信息系统实施', '医保精算师', '机器学习平台开发', '国际金融分析师(CFA)', 'B', NULL),
(@pack_id, 37, '以下哪个场景最符合医保精算师的工作环境？', '法庭', '专业场所', '手术室', '农田', 'B', NULL),
(@pack_id, 38, '医保精算师的工作强度属于？', '较高', '极高', '中', '极低', 'C', NULL),
(@pack_id, 39, '医保精算师对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士0%', '硕士60%', 'D', NULL),
(@pack_id, 40, '医保精算师岗位要求掌握金融学和临床医学的复合知识，这属于？', '单一学科岗位', '体力劳动岗位', '跨学科复合岗位', '纯管理岗位', 'C', NULL),
(@pack_id, 41, '以下哪个不是医保精算师的别称？', '软件售前顾问', '医保精算师(高级)', '金融学×临床医学专家', '医保精算师(资深)', 'A', NULL),
(@pack_id, 42, '以下哪项是医保精算师的核心技能之一？', '航空航天', '陶瓷工艺', '美容师', '精算模型', 'D', NULL),
(@pack_id, 43, '医保精算师属于以下哪类岗位热度？', '冷门', '无热度', '中', '淘汰', 'C', NULL),
(@pack_id, 44, '以下哪项是医保精算师的核心技能之一？', '精算模型', '焊接技术', '机械维修', '铸造工艺', 'A', NULL),
(@pack_id, 45, '医保精算师的学科组合中，第一个学科是？', '法学', '市场营销', '金融学', '数据科学', 'C', NULL),
(@pack_id, 46, '医保精算师的岗位中，最高学历要求通常是什么？', '大专', '高中', '本科', '硕士', 'D', NULL),
(@pack_id, 47, '在医保精算师的日常工作中，最常用的技能组合是？', '精算模型、医保政策', '茶艺师', '铣床加工', '采矿工程', 'A', NULL),
(@pack_id, 48, '医保精算师工作中最可能使用的工具是？', '专业工具', '挖掘机', '钢琴', '手术刀', 'A', NULL),
(@pack_id, 49, '医保精算师的工作强度等级是？', '2', '1', '3', '5', 'A', NULL),
(@pack_id, 50, '应聘医保精算师时，平均多少人竞争1个岗位？', '3人', '15', '5人', '4人', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业94：金融学×软件工程 — 金融软件产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_swe:0', 94, '金融软件产品经理', 'major_finance', 'major_swe', '金融学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是金融软件产品经理的核心技能之一？', '油画技法', '金融知识', '茶艺师', '陶瓷工艺', 'B', NULL),
(@pack_id, 2, '金融软件产品经理的岗位竞争激烈程度为？', '2:1', '1:1', '4:1', '20:1', 'D', NULL),
(@pack_id, 3, '在金融软件产品经理的日常工作中，最常用的技能组合是？', '金融知识、Axure', '石油钻探', '油画技法', '建筑工程', 'A', NULL),
(@pack_id, 4, '以下哪个数字代表金融软件产品经理的工作强度？', '6', '3', '7', '0', 'B', NULL),
(@pack_id, 5, '以下哪项是金融软件产品经理的核心技能之一？', '舞蹈编排', '茶艺师', '昆虫学', '金融知识', 'D', NULL),
(@pack_id, 6, '金融软件产品经理属于以下哪类岗位热度？', '高', '淘汰', '冷门', '无热度', 'A', NULL),
(@pack_id, 7, '以下哪项是金融软件产品经理的核心技能之一？', '金融知识', '考古学', '珠宝鉴定', '美容师', 'A', NULL),
(@pack_id, 8, '以下哪项技能对金融软件产品经理的职业发展最重要？', '金融知识', '建筑工程', '铣床加工', '量子物理', 'A', NULL),
(@pack_id, 9, '以下哪个场景最符合金融软件产品经理的工作环境？', '手术室', '办公室/会议室', '农田', '工厂车间', 'B', NULL),
(@pack_id, 10, '金融软件产品经理不需要以下哪项能力？', '沟通能力', '机械操作', '写作能力', '分析能力', 'B', NULL),
(@pack_id, 11, '金融软件产品经理的职业发展路径通常从什么级别开始？', '志愿者', '实习生', '合伙人', '初级', 'D', NULL),
(@pack_id, 12, '以下哪项不是金融软件产品经理的主要工作内容？', '数据分析', '客户沟通', '方案设计', '芯片制造', 'D', NULL),
(@pack_id, 13, '金融软件产品经理的学科组合中，第一个学科是？', '金融学', '数据科学', '市场营销', '法学', 'A', NULL),
(@pack_id, 14, '以下哪项是金融软件产品经理的核心技能之一？', 'Axure', '车床操作', '铸造工艺', '建筑工程', 'A', NULL),
(@pack_id, 15, '金融软件产品经理面试时最可能被考察的技能是？', '核工程', '美容师', '金融知识', '理发师', 'C', NULL),
(@pack_id, 16, '以下哪项是金融软件产品经理的核心技能之一？', '服装设计', '雕塑艺术', 'Axure', '航空航天', 'C', NULL),
(@pack_id, 17, '金融软件产品经理的工作强度属于？', '较高', '高', '极高', '极低', 'B', NULL),
(@pack_id, 18, '金融软件产品经理属于哪个学科组合？', '市场营销×英语', '临床医学×数据科学', '法学×会计学', '金融学×软件工程', 'D', NULL),
(@pack_id, 19, '应聘金融软件产品经理时，平均多少人竞争1个岗位？', '20', '4人', '2人', '3人', 'A', NULL),
(@pack_id, 20, '金融软件产品经理的工作强度评级为3，对应描述是？', '一般', '高', '轻松', '繁忙', 'B', NULL),
(@pack_id, 21, '金融软件产品经理属于以下哪个领域的岗位？', '纯文科', '金融学/软件工程复合领域', '纯体育', '纯艺术', 'B', NULL),
(@pack_id, 22, '以下哪项是金融软件产品经理的核心技能之一？', '油画技法', '烹饪技术', '建筑工程', '项目管理', 'D', NULL),
(@pack_id, 23, '以下哪项是金融软件产品经理的交叉学科背景？', '无学科要求', '金融学×软件工程', '单一学科', '四个学科', 'B', NULL),
(@pack_id, 24, '金融软件产品经理的岗位中，最高学历要求通常是什么？', '大专', '本科', '硕士', '博士后', 'C', NULL),
(@pack_id, 25, '金融软件产品经理对硕士学历的要求是？', '硕士10%', '硕士0%', '硕士20%', '硕士50%', 'D', NULL),
(@pack_id, 26, '金融软件产品经理的工作成果通常以什么形式呈现？', '药品', '食品', '方案/报告', '建筑', 'C', NULL),
(@pack_id, 27, '金融软件产品经理需要持续学习的原因是？', '无需学习', '学习有坏处', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 28, '金融软件产品经理的工作中不涉及以下哪项技能？', '项目管理', '量子物理', '金融知识', 'Axure', 'B', NULL),
(@pack_id, 29, '金融软件产品经理的竞争比是？', '8:1', '20:1', '100:1', '5:1', 'B', NULL),
(@pack_id, 30, '金融软件产品经理岗位要求掌握金融学和软件工程的复合知识，这属于？', '单一学科岗位', '纯技术岗位', '跨学科复合岗位', '纯管理岗位', 'C', NULL),
(@pack_id, 31, '以下哪项是金融软件产品经理的核心技能之一？', '铸造工艺', '金融知识', '昆虫学', '钢琴演奏', 'B', NULL),
(@pack_id, 32, '金融软件产品经理在项目中最需要运用的能力是？', '金融知识', '航空航天', '铸造工艺', '海洋学', 'A', NULL),
(@pack_id, 33, '金融软件产品经理需要融合哪两个学科的知识？', '艺术和体育', '历史和地理', '金融学和软件工程', '法学和医学', 'C', NULL),
(@pack_id, 34, '金融学×软件工程交叉领域对应的岗位是？', '跨境电商运营', '技术产品经理', '金融软件产品经理', '医疗软件产品经理', 'C', NULL),
(@pack_id, 35, '金融软件产品经理的高级年薪范围是？', '20-30万', '250-300万', '60-90', '200-250万', 'C', NULL),
(@pack_id, 36, '金融软件产品经理的工作强度等级是？', '1', '3', '5', '4', 'B', NULL),
(@pack_id, 37, '以下哪项是金融软件产品经理的核心技能之一？', '项目管理', '珠宝鉴定', '采矿工程', '气象学', 'A', NULL),
(@pack_id, 38, '金融软件产品经理的中级年薪范围是？', '10-15万', '150-200万', '15-20万', '35-55', 'D', NULL),
(@pack_id, 39, '以下哪个竞争比与金融软件产品经理相符？', '1:10', '20:1', '1:100', '1:5', 'B', NULL),
(@pack_id, 40, '以下哪项最接近金融软件产品经理的高级年薪上限？', '30万', '20万', '40万', '90', 'D', NULL),
(@pack_id, 41, '以下哪个岗位名称与专业94对应？', '金融软件产品经理', '医药行业研究员', '生物信息分析师', '医疗器械产品经理', 'A', NULL),
(@pack_id, 42, '在1-5级工作强度体系中，金融软件产品经理属于哪一级？', '3', '7级', '0级', '6级', 'A', NULL),
(@pack_id, 43, '金融软件产品经理的竞争比20:1意味着？', '平均20人竞争1个岗位', '自动录取', '无竞争', '1人竞争多个岗位', 'A', NULL),
(@pack_id, 44, '应聘金融软件产品经理，本科学历占比约为？', '50%', '10%', '20%', '100%', 'A', NULL),
(@pack_id, 45, '金融软件产品经理的学历门槛是？', '高中即可', '本科50% 硕士50%', '博士100%', '无要求', 'B', NULL),
(@pack_id, 46, '金融软件产品经理的初级年薪范围是？', '8-12万', '200-300万', '18-28', '100-150万', 'C', NULL),
(@pack_id, 47, '专业94的岗位名称是？', '交易系统开发', '金融软件产品经理', '医保精算师', '外汇交易员', 'B', NULL),
(@pack_id, 48, '金融软件产品经理工作中最可能使用的工具是？', '办公软件', '焊接设备', '手术器械', '纺织机', 'A', NULL),
(@pack_id, 49, '以下哪项最符合金融软件产品经理的职业特点？', '单一技能型', '纯体力型', '跨学科复合型人才', '纯管理型', 'C', NULL),
(@pack_id, 50, '以下哪个不是金融软件产品经理的别称？', '跨境并购翻译', '金融学×软件工程专家', '金融软件产品经理(高级)', '金融软件产品经理', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业95：金融学×软件工程 — 交易系统开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_swe:1', 95, '交易系统开发', 'major_finance', 'major_swe', '金融学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是交易系统开发的核心技能之一？', '采矿工程', '舞蹈编排', '交易所接口', '书法篆刻', 'C', NULL),
(@pack_id, 2, '交易系统开发的工作中不涉及以下哪项技能？', '交易所接口', '采矿工程', 'C++/Java', '低延迟', 'B', NULL),
(@pack_id, 3, '以下哪个竞争比与交易系统开发相符？', '35:1', '1:100', '1:10', '1:5', 'A', NULL),
(@pack_id, 4, '金融学×软件工程交叉领域对应的岗位是？', '量化交易平台工程师', '技术文档工程师', '交易系统开发', '双语数据报告撰写', 'C', NULL),
(@pack_id, 5, '以下哪项是交易系统开发的核心技能之一？', '书法篆刻', '珠宝鉴定', '铣床加工', '低延迟', 'D', NULL),
(@pack_id, 6, '交易系统开发需要持续学习的原因是？', '无需学习', '学习有坏处', '技术更新快', '学习不重要', 'C', NULL),
(@pack_id, 7, '以下哪项是交易系统开发的核心技能之一？', '园艺设计', '植物学', '机械维修', '交易所接口', 'D', NULL),
(@pack_id, 8, '交易系统开发的职业发展路径通常从什么级别开始？', '志愿者', '初级', '顾问', '合伙人', 'B', NULL),
(@pack_id, 9, '以下哪项是交易系统开发的核心技能之一？', '采矿工程', '机械维修', '油画技法', '低延迟', 'D', NULL),
(@pack_id, 10, '交易系统开发的学历门槛是？', '高中即可', '大专即可', '无要求', '本科20% 硕士80%', 'D', NULL),
(@pack_id, 11, '专业95的岗位名称是？', '开发者关系工程师', '技术产品经理', '交易系统开发', '医学翻译', 'C', NULL),
(@pack_id, 12, '以下哪项是交易系统开发的核心技能之一？', '机械维修', '石油钻探', '微生物学', 'C++/Java', 'D', NULL),
(@pack_id, 13, '以下哪项是交易系统开发的核心技能之一？', '钢琴演奏', '建筑工程', '版画制作', '交易所接口', 'D', NULL),
(@pack_id, 14, '交易系统开发面试时最可能被考察的技能是？', '珠宝鉴定', '量子物理', '拓扑学', 'C++/Java', 'D', NULL),
(@pack_id, 15, '交易系统开发的工作强度属于？', '较高', '极低', '较低', '极高', 'A', NULL),
(@pack_id, 16, '交易系统开发的薪资结构中，初级岗位年薪约为？', '25-40', '120-150万', '80-100万', '3-5万', 'A', NULL),
(@pack_id, 17, '以下哪个场景最符合交易系统开发的工作环境？', '技术办公室', '手术室', '农田', '法庭', 'A', NULL),
(@pack_id, 18, '交易系统开发工作中最可能使用的设备是？', '计算机', '钢琴', '挖掘机', '手术刀', 'A', NULL),
(@pack_id, 19, '交易系统开发在项目中最需要运用的能力是？', '矿物学', 'C++/Java', '核工程', '铣床加工', 'B', NULL),
(@pack_id, 20, '以下哪项最符合交易系统开发的职业特点？', '跨学科复合型人才', '纯体力型', '纯管理型', '单一技能型', 'A', NULL),
(@pack_id, 21, '交易系统开发的竞争比35:1意味着？', '平均35人竞争1个岗位', '1人竞争多个岗位', '内部推荐即可', '自动录取', 'A', NULL),
(@pack_id, 22, '交易系统开发岗位要求掌握金融学和软件工程的复合知识，这属于？', '单一学科岗位', '纯管理岗位', '跨学科复合岗位', '纯技术岗位', 'C', NULL),
(@pack_id, 23, '以下哪项最接近交易系统开发的高级年薪上限？', '50万', '40万', '30万', '140', 'D', NULL),
(@pack_id, 24, '交易系统开发属于以下哪类岗位热度？', '高', '无热度', '极低', '淘汰', 'A', NULL),
(@pack_id, 25, '交易系统开发的中级年薪范围是？', '50-80', '150-200万', '10-15万', '15-20万', 'A', NULL),
(@pack_id, 26, '以下哪个数字代表交易系统开发的工作强度？', '4', '6', '0', '8', 'A', NULL),
(@pack_id, 27, '以下哪项是交易系统开发的核心技能之一？', '铣床加工', '低延迟', '服装设计', '钳工工艺', 'B', NULL),
(@pack_id, 28, '以下哪项不是交易系统开发的主要工作内容？', '系统设计', '技术方案', '代码编写', '财务报表审计', 'D', NULL),
(@pack_id, 29, '以下哪项技能对交易系统开发的职业发展最重要？', '版画制作', '海洋学', '拓扑学', 'C++/Java', 'D', NULL),
(@pack_id, 30, '以下哪项是交易系统开发的核心技能之一？', '古生物学', '茶艺师', 'C++/Java', '昆虫学', 'C', NULL),
(@pack_id, 31, '交易系统开发不需要以下哪项能力？', '编程能力', '逻辑思维', '外科手术', '问题解决', 'C', NULL),
(@pack_id, 32, '以下哪个岗位名称与专业95对应？', '交易系统开发', '海外数据竞赛选手', '电子病历开发工程师', '跨境并购翻译', 'A', NULL),
(@pack_id, 33, '以下哪项是交易系统开发的核心技能之一？', '舞蹈编排', '机械维修', 'C++/Java', '昆虫学', 'C', NULL),
(@pack_id, 34, '以下哪项是交易系统开发的核心技能之一？', '植物学', '建筑工程', 'C++/Java', '服装设计', 'C', NULL),
(@pack_id, 35, '交易系统开发属于哪个学科组合？', '临床医学×数据科学', '法学×会计学', '电气工程×金融学', '金融学×软件工程', 'D', NULL),
(@pack_id, 36, '应聘交易系统开发，本科学历占比约为？', '90%', '100%', '10%', '20%', 'D', NULL),
(@pack_id, 37, '在1-5级工作强度体系中，交易系统开发属于哪一级？', '7级', '4', '6级', '8级', 'B', NULL),
(@pack_id, 38, '以下哪项最接近交易系统开发的学历分布？', '高中100%', '硕士100%', '本科20% 硕士80%', '本科100%', 'C', NULL),
(@pack_id, 39, '交易系统开发的竞争比是？', '10:1', '100:1', '5:1', '35:1', 'D', NULL),
(@pack_id, 40, '交易系统开发的学科组合中，第一个学科是？', '法学', '市场营销', '金融学', '会计学', 'C', NULL),
(@pack_id, 41, '交易系统开发需要融合哪两个学科的知识？', '历史和地理', '金融和建筑', '金融学和软件工程', '艺术和体育', 'C', NULL),
(@pack_id, 42, '交易系统开发的工作成果通常以什么形式呈现？', '软件/系统', '雕塑', '油画', '服装', 'A', NULL),
(@pack_id, 43, '以下哪个不是交易系统开发的别称？', '医疗健康投资分析师', '交易系统开发(高级)', '交易系统开发(资深)', '金融学×软件工程专家', 'A', NULL),
(@pack_id, 44, '以下哪项是交易系统开发的交叉学科背景？', '三个学科', '单一学科', '金融学×软件工程', '无学科要求', 'C', NULL),
(@pack_id, 45, '交易系统开发的工作强度等级是？', '4', '3', '2', '5', 'A', NULL),
(@pack_id, 46, '交易系统开发的岗位竞争激烈程度为？', '2:1', '1:1', '3:1', '35:1', 'D', NULL),
(@pack_id, 47, '交易系统开发的工作强度评级为4，对应描述是？', '繁忙', '一般', '较高', '轻松', 'C', NULL),
(@pack_id, 48, '交易系统开发的初级年薪范围是？', '8-12万', '100-150万', '25-40', '200-300万', 'C', NULL),
(@pack_id, 49, '交易系统开发的岗位中，最高学历要求通常是什么？', '本科', '硕士', '博士后', '高中', 'B', NULL),
(@pack_id, 50, '在交易系统开发的日常工作中，最常用的技能组合是？', '天文学', '地质学', '植物学', 'C++/Java、低延迟', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业96：金融学×软件工程 — 量化交易平台工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_swe:2', 96, '量化交易平台工程师', 'major_finance', 'major_swe', '金融学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '量化交易平台工程师需要融合哪两个学科的知识？', '金融和建筑', '金融学和软件工程', '法学和医学', '历史和地理', 'B', NULL),
(@pack_id, 2, '在1-5级工作强度体系中，量化交易平台工程师属于哪一级？', '3', '0级', '7级', '8级', 'A', NULL),
(@pack_id, 3, '以下哪项是量化交易平台工程师的核心技能之一？', '地质学', '烹饪技术', 'Python', '铸造工艺', 'C', NULL),
(@pack_id, 4, '量化交易平台工程师的高级年薪范围是？', '20-30万', '200-250万', '30-40万', '80-120', 'D', NULL),
(@pack_id, 5, '专业96的岗位名称是？', '量化交易平台工程师', '市场数据分析师', '医疗软件产品经理', '财富管理顾问', 'A', NULL),
(@pack_id, 6, '以下哪项是量化交易平台工程师的核心技能之一？', '美容师', 'Python', '气象学', '理发师', 'B', NULL),
(@pack_id, 7, '量化交易平台工程师的薪资结构中，初级岗位年薪约为？', '5-10万', '20-35', '80-100万', '3-5万', 'B', NULL),
(@pack_id, 8, '在量化交易平台工程师的日常工作中，最常用的技能组合是？', '采矿工程', '气象学', '矿物学', 'Python、回测系统', 'D', NULL),
(@pack_id, 9, '量化交易平台工程师工作中最可能使用的设备是？', '计算机', '手术刀', '钢琴', '挖掘机', 'A', NULL),
(@pack_id, 10, '量化交易平台工程师不需要以下哪项能力？', '逻辑思维', '编程能力', '问题解决', '外科手术', 'D', NULL),
(@pack_id, 11, '量化交易平台工程师的学历门槛是？', '高中即可', '博士100%', '无要求', '本科30% 硕士70%', 'D', NULL),
(@pack_id, 12, '量化交易平台工程师的学科组合中，第一个学科是？', '金融学', '会计学', '市场营销', '数据科学', 'A', NULL),
(@pack_id, 13, '以下哪项最符合量化交易平台工程师的职业特点？', '跨学科复合型人才', '纯体力型', '纯管理型', '单一技能型', 'A', NULL),
(@pack_id, 14, '以下哪项是量化交易平台工程师的核心技能之一？', '地质学', '雕塑艺术', '金融API', '机械维修', 'C', NULL),
(@pack_id, 15, '量化交易平台工程师的工作中不涉及以下哪项技能？', '回测系统', '书法篆刻', '金融API', 'Python', 'B', NULL),
(@pack_id, 16, '量化交易平台工程师属于哪个学科组合？', '市场营销×英语', '金融学×软件工程', '电气工程×金融学', '法学×会计学', 'B', NULL),
(@pack_id, 17, '以下哪个竞争比与量化交易平台工程师相符？', '1:10', '30:1', '1:100', '1:20', 'B', NULL),
(@pack_id, 18, '以下哪项是量化交易平台工程师的核心技能之一？', '考古学', '美容师', 'Python', '珠宝鉴定', 'C', NULL),
(@pack_id, 19, '量化交易平台工程师的竞争比是？', '10:1', '30:1', '5:1', '100:1', 'B', NULL),
(@pack_id, 20, '应聘量化交易平台工程师时，平均多少人竞争1个岗位？', '4人', '3人', '5人', '30', 'D', NULL),
(@pack_id, 21, '以下哪项是量化交易平台工程师的核心技能之一？', 'Python', '服装设计', '铸造工艺', '矿物学', 'A', NULL),
(@pack_id, 22, '量化交易平台工程师的工作强度属于？', '极低', '较低', '极高', '高', 'D', NULL),
(@pack_id, 23, '量化交易平台工程师的岗位中，最高学历要求通常是什么？', '博士后', '硕士', '大专', '高中', 'B', NULL),
(@pack_id, 24, '量化交易平台工程师需要持续学习的原因是？', '学习有坏处', '学习内容少', '学习不重要', '技术更新快', 'D', NULL),
(@pack_id, 25, '以下哪项最接近量化交易平台工程师的学历分布？', '本科100%', '本科30% 硕士70%', '硕士100%', '高中100%', 'B', NULL),
(@pack_id, 26, '量化交易平台工程师的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '竞争优势', '无影响', 'C', NULL),
(@pack_id, 27, '量化交易平台工程师的工作强度等级是？', '5', '1', '2', '3', 'D', NULL),
(@pack_id, 28, '以下哪项是量化交易平台工程师的核心技能之一？', '拓扑学', '珠宝鉴定', '天文学', '金融API', 'D', NULL),
(@pack_id, 29, '以下哪项是量化交易平台工程师的核心技能之一？', '考古学', '回测系统', '焊接技术', '美容师', 'B', NULL),
(@pack_id, 30, '以下哪个不是量化交易平台工程师的别称？', '量化交易平台工程师(高级)', '量化交易平台工程师(资深)', '医保精算师', '量化交易平台工程师', 'C', NULL),
(@pack_id, 31, '以下哪个数字代表量化交易平台工程师的工作强度？', '6', '7', '3', '8', 'C', NULL),
(@pack_id, 32, '量化交易平台工程师对硕士学历的要求是？', '硕士50%', '硕士0%', '硕士70%', '硕士20%', 'C', NULL),
(@pack_id, 33, '量化交易平台工程师属于以下哪类岗位热度？', '高', '淘汰', '极低', '冷门', 'A', NULL),
(@pack_id, 34, '以下哪个场景最符合量化交易平台工程师的工作环境？', '手术室', '农田', '技术办公室', '法庭', 'C', NULL),
(@pack_id, 35, '量化交易平台工程师面试时最可能被考察的技能是？', '舞蹈编排', 'Python', '微生物学', '昆虫学', 'B', NULL),
(@pack_id, 36, '量化交易平台工程师的职业发展路径通常从什么级别开始？', '志愿者', '实习生', '顾问', '初级', 'D', NULL),
(@pack_id, 37, '量化交易平台工程师的岗位竞争激烈程度为？', '3:1', '30:1', '2:1', '4:1', 'B', NULL),
(@pack_id, 38, '量化交易平台工程师的初级年薪范围是？', '20-35', '200-300万', '100-150万', '8-12万', 'A', NULL),
(@pack_id, 39, '应聘量化交易平台工程师，本科学历占比约为？', '90%', '30%', '10%', '100%', 'B', NULL),
(@pack_id, 40, '以下哪项是量化交易平台工程师的交叉学科背景？', '三个学科', '四个学科', '单一学科', '金融学×软件工程', 'D', NULL),
(@pack_id, 41, '量化交易平台工程师在项目中最需要运用的能力是？', 'Python', '钳工工艺', '量子物理', '气象学', 'A', NULL),
(@pack_id, 42, '量化交易平台工程师的工作成果通常以什么形式呈现？', '油画', '雕塑', '服装', '软件/系统', 'D', NULL),
(@pack_id, 43, '以下哪项最接近量化交易平台工程师的高级年薪上限？', '30万', '50万', '40万', '120', 'D', NULL),
(@pack_id, 44, '量化交易平台工程师岗位要求掌握金融学和软件工程的复合知识，这属于？', '跨学科复合岗位', '体力劳动岗位', '单一学科岗位', '纯技术岗位', 'A', NULL),
(@pack_id, 45, '以下哪个岗位名称与专业96对应？', '医药行业研究员', '客户画像建模', 'DevOps工程师', '量化交易平台工程师', 'D', NULL),
(@pack_id, 46, '以下哪项是量化交易平台工程师的核心技能之一？', '版画制作', '回测系统', '建筑工程', '航空航天', 'B', NULL),
(@pack_id, 47, '以下哪项是量化交易平台工程师的核心技能之一？', '金融API', '矿物学', '微生物学', '机械维修', 'A', NULL),
(@pack_id, 48, '金融学×软件工程交叉领域对应的岗位是？', '国际品牌策划', '医疗器械产品经理', '量化交易平台工程师', '金融数据分析师', 'C', NULL),
(@pack_id, 49, '量化交易平台工程师的竞争比30:1意味着？', '内部推荐即可', '1人竞争多个岗位', '平均30人竞争1个岗位', '无竞争', 'C', NULL),
(@pack_id, 50, '以下哪项技能对量化交易平台工程师的职业发展最重要？', '植物学', '海洋学', '版画制作', 'Python', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业97：金融学×市场营销 → 金融产品营销经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_marketing:0', 97, '金融产品营销经理', 'major_finance', 'major_marketing', '金融学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '金融产品营销经理的初级年薪范围是？', '16-25', '8-12万', '100-150万', '5-8万', 'A', NULL),
(@pack_id, 2, '金融产品营销经理属于以下哪个领域的岗位？', '纯体育', '纯理科', '纯艺术', '金融学/市场营销复合领域', 'D', NULL),
(@pack_id, 3, '以下哪项是金融产品营销经理的核心技能之一？', '考古学', '海洋学', '石油钻探', '市场营销', 'D', NULL),
(@pack_id, 4, '金融产品营销经理的职业发展路径通常从什么级别开始？', '顾问', '初级', '合伙人', '志愿者', 'B', NULL),
(@pack_id, 5, '应聘金融产品营销经理时，平均多少人竞争1个岗位？', '5人', '4人', '18', '2人', 'C', NULL),
(@pack_id, 6, '以下哪个岗位名称与专业97对应？', '技术产品经理', '国际品牌策划', '客户画像建模', '金融产品营销经理', 'D', NULL),
(@pack_id, 7, '以下哪个竞争比与金融产品营销经理相符？', '18:1', '1:100', '1:5', '1:20', 'A', NULL),
(@pack_id, 8, '以下哪项是金融产品营销经理的核心技能之一？', '海洋学', '昆虫学', '陶瓷工艺', '合规基础', 'D', NULL),
(@pack_id, 9, '以下哪个数字代表金融产品营销经理的工作强度？', '6', '8', '0', '3', 'D', NULL),
(@pack_id, 10, '金融产品营销经理的工作强度评级为3，对应描述是？', '一般', '繁忙', '高', '超负荷', 'C', NULL),
(@pack_id, 11, '在金融产品营销经理的日常工作中，最常用的技能组合是？', '植物学', '焊接技术', '铸造工艺', '市场营销、金融产品', 'D', NULL),
(@pack_id, 12, '金融学×市场营销交叉领域对应的岗位是？', '财富管理顾问', '金融产品营销经理', '市场数据分析师', '临床预测模型开发', 'B', NULL),
(@pack_id, 13, '金融产品营销经理对硕士学历的要求是？', '硕士20%', '硕士50%', '硕士30%', '硕士0%', 'C', NULL),
(@pack_id, 14, '金融产品营销经理岗位要求掌握金融学和市场营销的复合知识，这属于？', '纯管理岗位', '体力劳动岗位', '跨学科复合岗位', '单一学科岗位', 'C', NULL),
(@pack_id, 15, '金融产品营销经理的复合学科背景使其在就业市场上具有？', '被淘汰风险', '负面作用', '劣势', '竞争优势', 'D', NULL),
(@pack_id, 16, '金融产品营销经理的高级年薪范围是？', '200-250万', '250-300万', '55-80', '20-30万', 'C', NULL),
(@pack_id, 17, '金融产品营销经理的工作强度属于？', '极高', '中等', '较高', '高', 'D', NULL),
(@pack_id, 18, '以下哪项技能对金融产品营销经理的职业发展最重要？', '市场营销', '美容师', '拓扑学', '版画制作', 'A', NULL),
(@pack_id, 19, '以下哪项是金融产品营销经理的核心技能之一？', '市场营销', '植物学', '理发师', '机械维修', 'A', NULL),
(@pack_id, 20, '以下哪项是金融产品营销经理的核心技能之一？', '矿物学', '金融产品', '美容师', '机械维修', 'B', NULL),
(@pack_id, 21, '金融产品营销经理工作中最可能使用的工具是？', '焊接设备', '手术器械', '办公软件', '纺织机', 'C', NULL),
(@pack_id, 22, '金融产品营销经理属于以下哪类岗位热度？', '冷门', '无热度', '高', '淘汰', 'C', NULL),
(@pack_id, 23, '金融产品营销经理的岗位竞争激烈程度为？', '4:1', '2:1', '3:1', '18:1', 'D', NULL),
(@pack_id, 24, '金融产品营销经理需要融合哪两个学科的知识？', '金融和建筑', '法学和医学', '金融学和市场营销', '历史和地理', 'C', NULL),
(@pack_id, 25, '以下哪项是金融产品营销经理的交叉学科背景？', '四个学科', '金融学×市场营销', '无学科要求', '单一学科', 'B', NULL),
(@pack_id, 26, '以下哪项最符合金融产品营销经理的职业特点？', '纯管理型', '无技能型', '跨学科复合型人才', '纯体力型', 'C', NULL),
(@pack_id, 27, '以下哪项最接近金融产品营销经理的学历分布？', '本科70% 硕士30%', '高中100%', '博士100%', '本科100%', 'A', NULL),
(@pack_id, 28, '金融产品营销经理的学科组合中，第一个学科是？', '数据科学', '市场营销', '金融学', '法学', 'C', NULL),
(@pack_id, 29, '专业97的岗位名称是？', '英文技术支持', '医药代表', '临床预测模型开发', '金融产品营销经理', 'D', NULL),
(@pack_id, 30, '金融产品营销经理的工作成果通常以什么形式呈现？', '药品', '方案/报告', '食品', '建筑', 'B', NULL),
(@pack_id, 31, '以下哪项是金融产品营销经理的核心技能之一？', '钢琴演奏', '合规基础', '铣床加工', '地质学', 'B', NULL),
(@pack_id, 32, '金融产品营销经理的工作中不涉及以下哪项技能？', '金融产品', '合规基础', '市场营销', '地质学', 'D', NULL),
(@pack_id, 33, '金融产品营销经理的工作强度等级是？', '5', '3', '1', '2', 'B', NULL),
(@pack_id, 34, '以下哪项是金融产品营销经理的核心技能之一？', '舞蹈编排', '海洋学', '市场营销', '版画制作', 'C', NULL),
(@pack_id, 35, '金融产品营销经理的学历门槛是？', '无要求', '大专即可', '高中即可', '本科70% 硕士30%', 'D', NULL),
(@pack_id, 36, '金融产品营销经理的中级年薪范围是？', '30-45', '150-200万', '10-15万', '15-20万', 'A', NULL),
(@pack_id, 37, '以下哪项是金融产品营销经理的核心技能之一？', '车床操作', '舞蹈编排', '建筑工程', '市场营销', 'D', NULL),
(@pack_id, 38, '金融产品营销经理不需要以下哪项能力？', '分析能力', '机械操作', '沟通能力', '写作能力', 'B', NULL),
(@pack_id, 39, '以下哪项最接近金融产品营销经理的高级年薪上限？', '20万', '30万', '80', '50万', 'C', NULL),
(@pack_id, 40, '金融产品营销经理需要持续学习的原因是？', '学习有坏处', '无需学习', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 41, '金融产品营销经理面试时最可能被考察的技能是？', '市场营销', '陶瓷工艺', '烹饪技术', '车床操作', 'A', NULL),
(@pack_id, 42, '在1-5级工作强度体系中，金融产品营销经理属于哪一级？', '3', '8级', '6级', '0级', 'A', NULL),
(@pack_id, 43, '以下哪个不是金融产品营销经理的别称？', '技术文档写作', '金融学×市场营销专家', '金融产品营销经理(资深)', '金融产品营销经理', 'A', NULL),
(@pack_id, 44, '以下哪项是金融产品营销经理的核心技能之一？', '钳工工艺', '珠宝鉴定', '金融产品', '铸造工艺', 'C', NULL),
(@pack_id, 45, '金融产品营销经理在项目中最需要运用的能力是？', '微生物学', '市场营销', '书法篆刻', '雕塑艺术', 'B', NULL),
(@pack_id, 46, '以下哪个场景最符合金融产品营销经理的工作环境？', '手术室', '办公室/会议室', '工厂车间', '农田', 'B', NULL),
(@pack_id, 47, '应聘金融产品营销经理，本科学历占比约为？', '70%', '10%', '90%', '100%', 'A', NULL),
(@pack_id, 48, '金融产品营销经理的竞争比18:1意味着？', '内部推荐即可', '平均18人竞争1个岗位', '无竞争', '1人竞争多个岗位', 'B', NULL),
(@pack_id, 49, '以下哪项是金融产品营销经理的核心技能之一？', '铣床加工', '舞蹈编排', '理发师', '合规基础', 'D', NULL),
(@pack_id, 50, '金融产品营销经理的薪资结构中，初级岗位年薪约为？', '80-100万', '120-150万', '16-25', '3-5万', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业98：金融学×市场营销 — 财富管理顾问
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_marketing:1', 98, '财富管理顾问', 'major_finance', 'major_marketing', '金融学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '财富管理顾问对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士40%', '硕士10%', 'C', NULL),
(@pack_id, 2, '在1-5级工作强度体系中，财富管理顾问属于哪一级？', '7级', '4', '0级', '6级', 'B', NULL),
(@pack_id, 3, '以下哪项是财富管理顾问的核心技能之一？', '古生物学', '昆虫学', '烹饪技术', '投资理财', 'D', NULL),
(@pack_id, 4, '以下哪个数字代表财富管理顾问的工作强度？', '7', '6', '4', '0', 'C', NULL),
(@pack_id, 5, '以下哪项是财富管理顾问的核心技能之一？', '建筑工程', '服装设计', '烹饪技术', '资产配置', 'D', NULL),
(@pack_id, 6, '财富管理顾问属于以下哪个领域的岗位？', '纯艺术', '纯体育', '纯理科', '金融学/市场营销复合领域', 'D', NULL),
(@pack_id, 7, '财富管理顾问的工作强度等级是？', '4', '5', '1', '2', 'A', NULL),
(@pack_id, 8, '以下哪项是财富管理顾问的核心技能之一？', '考古学', '焊接技术', '珠宝鉴定', '资产配置', 'D', NULL),
(@pack_id, 9, '以下哪项是财富管理顾问的核心技能之一？', '海洋学', '版画制作', '航空航天', '投资理财', 'D', NULL),
(@pack_id, 10, '以下哪项是财富管理顾问的交叉学科背景？', '三个学科', '四个学科', '无学科要求', '金融学×市场营销', 'D', NULL),
(@pack_id, 11, '财富管理顾问的工作中不涉及以下哪项技能？', '客户关系', '投资理财', '版画制作', '资产配置', 'C', NULL),
(@pack_id, 12, '以下哪项是财富管理顾问的核心技能之一？', '钳工工艺', '投资理财', '铣床加工', '植物学', 'B', NULL),
(@pack_id, 13, '以下哪个岗位名称与专业98对应？', '外汇交易员', '财富管理顾问', '海外数据竞赛选手', '跨境电商运营', 'B', NULL),
(@pack_id, 14, '以下哪个场景最符合财富管理顾问的工作环境？', '工厂车间', '手术室', '农田', '办公室/会议室', 'D', NULL),
(@pack_id, 15, '以下哪项是财富管理顾问的核心技能之一？', '客户关系', '理发师', '烹饪技术', '航空航天', 'A', NULL),
(@pack_id, 16, '以下哪个不是财富管理顾问的别称？', '财富管理顾问', '财富管理顾问(资深)', '财富管理顾问(高级)', '医学翻译', 'D', NULL),
(@pack_id, 17, '财富管理顾问在项目中最需要运用的能力是？', '美容师', '采矿工程', '投资理财', '理发师', 'C', NULL),
(@pack_id, 18, '财富管理顾问的中级年薪范围是？', '10-15万', '30-60', '150-200万', '200-250万', 'B', NULL),
(@pack_id, 19, '财富管理顾问面试时最可能被考察的技能是？', '理发师', '烹饪技术', '美容师', '投资理财', 'D', NULL),
(@pack_id, 20, '财富管理顾问的学科组合中，第一个学科是？', '数据科学', '法学', '会计学', '金融学', 'D', NULL),
(@pack_id, 21, '财富管理顾问的薪资结构中，初级岗位年薪约为？', '15-30(提成)', '5-10万', '120-150万', '80-100万', 'A', NULL),
(@pack_id, 22, '专业98的岗位名称是？', '财富管理顾问', '海外营销专员', '风险建模专家', '投资者关系专员', 'A', NULL),
(@pack_id, 23, '以下哪项最接近财富管理顾问的高级年薪上限？', '20万', '30万', '120', '50万', 'C', NULL),
(@pack_id, 24, '财富管理顾问的竞争比是？', '20:1', '5:1', '100:1', '8:1', 'A', NULL),
(@pack_id, 25, '财富管理顾问的初级年薪范围是？', '15-30(提成)', '8-12万', '100-150万', '5-8万', 'A', NULL),
(@pack_id, 26, '以下哪项技能对财富管理顾问的职业发展最重要？', '古生物学', '微生物学', '投资理财', '地质学', 'C', NULL),
(@pack_id, 27, '以下哪项是财富管理顾问的核心技能之一？', '拓扑学', '客户关系', '海洋学', '钢琴演奏', 'B', NULL),
(@pack_id, 28, '以下哪项最符合财富管理顾问的职业特点？', '无技能型', '纯体力型', '跨学科复合型人才', '单一技能型', 'C', NULL),
(@pack_id, 29, '在财富管理顾问的日常工作中，最常用的技能组合是？', '钢琴演奏', '昆虫学', '投资理财、客户关系', '园艺设计', 'C', NULL),
(@pack_id, 30, '财富管理顾问的工作强度属于？', '极低', '较低', '较高', '极高', 'C', NULL),
(@pack_id, 31, '应聘财富管理顾问时，平均多少人竞争1个岗位？', '5人', '3人', '20', '2人', 'C', NULL),
(@pack_id, 32, '财富管理顾问需要融合哪两个学科的知识？', '法学和医学', '艺术和体育', '金融学和市场营销', '金融和建筑', 'C', NULL),
(@pack_id, 33, '以下哪项是财富管理顾问的核心技能之一？', '版画制作', '微生物学', '钳工工艺', '投资理财', 'D', NULL),
(@pack_id, 34, '以下哪项不是财富管理顾问的主要工作内容？', '客户沟通', '方案设计', '数据分析', '芯片制造', 'D', NULL),
(@pack_id, 35, '财富管理顾问岗位要求掌握金融学和市场营销的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '单一学科岗位', '体力劳动岗位', 'A', NULL),
(@pack_id, 36, '以下哪项是财富管理顾问的核心技能之一？', '铸造工艺', '客户关系', '雕塑艺术', '理发师', 'B', NULL),
(@pack_id, 37, '以下哪项最接近财富管理顾问的学历分布？', '本科60% 硕士40%', '博士100%', '高中100%', '本科100%', 'A', NULL),
(@pack_id, 38, '财富管理顾问的高级年薪范围是？', '250-300万', '20-30万', '70-120', '30-40万', 'C', NULL),
(@pack_id, 39, '财富管理顾问不需要以下哪项能力？', '写作能力', '沟通能力', '分析能力', '机械操作', 'D', NULL),
(@pack_id, 40, '财富管理顾问工作中最可能使用的工具是？', '焊接设备', '手术器械', '办公软件', '纺织机', 'C', NULL),
(@pack_id, 41, '以下哪个竞争比与财富管理顾问相符？', '1:5', '20:1', '1:10', '1:100', 'B', NULL),
(@pack_id, 42, '财富管理顾问的职业发展路径通常从什么级别开始？', '志愿者', '实习生', '初级', '合伙人', 'C', NULL),
(@pack_id, 43, '财富管理顾问的岗位中，最高学历要求通常是什么？', '本科', '硕士', '高中', '大专', 'B', NULL),
(@pack_id, 44, '财富管理顾问需要持续学习的原因是？', '无需学习', '学习内容少', '学习不重要', '技术更新快', 'D', NULL),
(@pack_id, 45, '财富管理顾问的竞争比20:1意味着？', '自动录取', '1人竞争多个岗位', '无竞争', '平均20人竞争1个岗位', 'D', NULL),
(@pack_id, 46, '财富管理顾问属于哪个学科组合？', '临床医学×数据科学', '市场营销×英语', '法学×会计学', '金融学×市场营销', 'D', NULL),
(@pack_id, 47, '财富管理顾问的学历门槛是？', '无要求', '博士100%', '本科60% 硕士40%', '大专即可', 'C', NULL),
(@pack_id, 48, '财富管理顾问的岗位竞争激烈程度为？', '3:1', '20:1', '4:1', '1:1', 'B', NULL),
(@pack_id, 49, '财富管理顾问的工作成果通常以什么形式呈现？', '食品', '药品', '方案/报告', '建筑', 'C', NULL),
(@pack_id, 50, '财富管理顾问的复合学科背景使其在就业市场上具有？', '无影响', '竞争优势', '负面作用', '劣势', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业99：金融学×市场营销 — 投资者关系专员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_marketing:2', 99, '投资者关系专员', 'major_finance', 'major_marketing', '金融学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '投资者关系专员的工作成果通常以什么形式呈现？', '方案/报告', '建筑', '食品', '药品', 'A', NULL),
(@pack_id, 2, '以下哪个竞争比与投资者关系专员相符？', '1:20', '12:1', '1:10', '1:5', 'B', NULL),
(@pack_id, 3, '投资者关系专员的竞争比是？', '100:1', '5:1', '10:1', '12:1', 'D', NULL),
(@pack_id, 4, '以下哪项技能对投资者关系专员的职业发展最重要？', '铣床加工', '机械维修', '油画技法', '财报解读', 'D', NULL),
(@pack_id, 5, '以下哪项是投资者关系专员的交叉学科背景？', '金融学×市场营销', '四个学科', '三个学科', '无学科要求', 'A', NULL),
(@pack_id, 6, '在1-5级工作强度体系中，投资者关系专员属于哪一级？', '8级', '0级', '2', '6级', 'C', NULL),
(@pack_id, 7, '以下哪项是投资者关系专员的核心技能之一？', '昆虫学', '核工程', 'IR活动', '气象学', 'C', NULL),
(@pack_id, 8, '投资者关系专员的岗位中，最高学历要求通常是什么？', '本科', '硕士', '博士后', '高中', 'B', NULL),
(@pack_id, 9, '投资者关系专员工作中最可能使用的工具是？', '办公软件', '手术器械', '纺织机', '焊接设备', 'A', NULL),
(@pack_id, 10, '投资者关系专员的学科组合中，第一个学科是？', '法学', '数据科学', '市场营销', '金融学', 'D', NULL),
(@pack_id, 11, '投资者关系专员的薪资结构中，初级岗位年薪约为？', '80-100万', '3-5万', '5-10万', '14-22', 'D', NULL),
(@pack_id, 12, '投资者关系专员属于以下哪个领域的岗位？', '纯艺术', '纯理科', '纯文科', '金融学/市场营销复合领域', 'D', NULL),
(@pack_id, 13, '以下哪项是投资者关系专员的核心技能之一？', '陶瓷工艺', '理发师', '沟通能力', '地质学', 'C', NULL),
(@pack_id, 14, '在投资者关系专员的日常工作中，最常用的技能组合是？', '铣床加工', '昆虫学', '考古学', '财报解读、沟通能力', 'D', NULL),
(@pack_id, 15, '以下哪项不是投资者关系专员的主要工作内容？', '客户沟通', '芯片制造', '方案设计', '数据分析', 'B', NULL),
(@pack_id, 16, '投资者关系专员的工作强度等级是？', '2', '4', '1', '3', 'A', NULL),
(@pack_id, 17, '投资者关系专员需要融合哪两个学科的知识？', '历史和地理', '金融学和市场营销', '金融和建筑', '艺术和体育', 'B', NULL),
(@pack_id, 18, '以下哪项是投资者关系专员的核心技能之一？', '航空航天', '钳工工艺', 'IR活动', '园艺设计', 'C', NULL),
(@pack_id, 19, '投资者关系专员的初级年薪范围是？', '8-12万', '200-300万', '100-150万', '14-22', 'D', NULL),
(@pack_id, 20, '投资者关系专员的中级年薪范围是？', '25-38', '15-20万', '10-15万', '200-250万', 'A', NULL),
(@pack_id, 21, '以下哪项是投资者关系专员的核心技能之一？', '采矿工程', '昆虫学', '财报解读', '核工程', 'C', NULL),
(@pack_id, 22, '以下哪个数字代表投资者关系专员的工作强度？', '6', '2', '0', '7', 'B', NULL),
(@pack_id, 23, '投资者关系专员不需要以下哪项能力？', '沟通能力', '分析能力', '机械操作', '写作能力', 'C', NULL),
(@pack_id, 24, '以下哪项是投资者关系专员的核心技能之一？', '财报解读', '车床操作', '油画技法', '量子物理', 'A', NULL),
(@pack_id, 25, '以下哪项是投资者关系专员的核心技能之一？', '钢琴演奏', '航空航天', '沟通能力', '版画制作', 'C', NULL),
(@pack_id, 26, '应聘投资者关系专员，本科学历占比约为？', '20%', '80%', '100%', '10%', 'B', NULL),
(@pack_id, 27, '以下哪项是投资者关系专员的核心技能之一？', '沟通能力', '地质学', '古生物学', '铸造工艺', 'A', NULL),
(@pack_id, 28, '投资者关系专员的岗位竞争激烈程度为？', '12:1', '2:1', '1:1', '3:1', 'A', NULL),
(@pack_id, 29, '投资者关系专员的工作中不涉及以下哪项技能？', '陶瓷工艺', 'IR活动', '财报解读', '沟通能力', 'A', NULL),
(@pack_id, 30, '应聘投资者关系专员时，平均多少人竞争1个岗位？', '12', '2人', '3人', '5人', 'A', NULL),
(@pack_id, 31, '专业99的岗位名称是？', '大数据平台开发', '电子病历开发工程师', '量化交易平台工程师', '投资者关系专员', 'D', NULL),
(@pack_id, 32, '以下哪项是投资者关系专员的核心技能之一？', '雕塑艺术', '昆虫学', '地质学', '财报解读', 'D', NULL),
(@pack_id, 33, '以下哪个场景最符合投资者关系专员的工作环境？', '农田', '工厂车间', '办公室/会议室', '手术室', 'C', NULL),
(@pack_id, 34, '投资者关系专员的工作强度属于？', '中', '中等', '较低', '较高', 'A', NULL),
(@pack_id, 35, '投资者关系专员的职业发展路径通常从什么级别开始？', '合伙人', '初级', '志愿者', '实习生', 'B', NULL),
(@pack_id, 36, '投资者关系专员的工作强度评级为2，对应描述是？', '一般', '繁忙', '超负荷', '中', 'D', NULL),
(@pack_id, 37, '投资者关系专员属于以下哪类岗位热度？', '中', '淘汰', '极低', '冷门', 'A', NULL),
(@pack_id, 38, '投资者关系专员需要持续学习的原因是？', '学习不重要', '技术更新快', '无需学习', '学习有坏处', 'B', NULL),
(@pack_id, 39, '金融学×市场营销交叉领域对应的岗位是？', '投资者关系专员', '用户增长分析师', '医疗软件产品经理', '医院信息系统实施', 'A', NULL),
(@pack_id, 40, '以下哪项最符合投资者关系专员的职业特点？', '跨学科复合型人才', '纯管理型', '单一技能型', '无技能型', 'A', NULL),
(@pack_id, 41, '投资者关系专员的学历门槛是？', '大专即可', '高中即可', '本科80% 硕士20%', '博士100%', 'C', NULL),
(@pack_id, 42, '投资者关系专员面试时最可能被考察的技能是？', '拓扑学', '财报解读', '铸造工艺', '量子物理', 'B', NULL),
(@pack_id, 43, '以下哪项是投资者关系专员的核心技能之一？', '财报解读', '舞蹈编排', '烹饪技术', '车床操作', 'A', NULL),
(@pack_id, 44, '投资者关系专员岗位要求掌握金融学和市场营销的复合知识，这属于？', '纯管理岗位', '纯技术岗位', '跨学科复合岗位', '单一学科岗位', 'C', NULL),
(@pack_id, 45, '投资者关系专员属于哪个学科组合？', '法学×会计学', '市场营销×英语', '金融学×市场营销', '临床医学×数据科学', 'C', NULL),
(@pack_id, 46, '投资者关系专员的复合学科背景使其在就业市场上具有？', '被淘汰风险', '负面作用', '无影响', '竞争优势', 'D', NULL),
(@pack_id, 47, '以下哪项最接近投资者关系专员的学历分布？', '博士100%', '本科100%', '本科80% 硕士20%', '高中100%', 'C', NULL),
(@pack_id, 48, '投资者关系专员的高级年薪范围是？', '30-40万', '20-30万', '45-65', '200-250万', 'C', NULL),
(@pack_id, 49, '投资者关系专员对硕士学历的要求是？', '硕士0%', '硕士10%', '硕士50%', '硕士20%', 'D', NULL),
(@pack_id, 50, '投资者关系专员的竞争比12:1意味着？', '1人竞争多个岗位', '无竞争', '内部推荐即可', '平均12人竞争1个岗位', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业100：金融学×数据科学 — 金融数据分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_ds:0', 100, '金融数据分析师', 'major_finance', 'major_ds', '金融学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项技能对金融数据分析师的职业发展最重要？', '园艺设计', '茶艺师', 'Python/SQL', '版画制作', 'C', NULL),
(@pack_id, 2, '金融数据分析师的复合学科背景使其在就业市场上具有？', '劣势', '竞争优势', '负面作用', '无影响', 'B', NULL),
(@pack_id, 3, '金融数据分析师的工作中不涉及以下哪项技能？', '量化分析', '珠宝鉴定', '金融建模', 'Python/SQL', 'B', NULL),
(@pack_id, 4, '以下哪个竞争比与金融数据分析师相符？', '35:1', '1:100', '1:10', '1:5', 'A', NULL),
(@pack_id, 5, '金融数据分析师面试时最可能被考察的技能是？', '茶艺师', 'Python/SQL', '植物学', '钢琴演奏', 'B', NULL),
(@pack_id, 6, '金融数据分析师的职业发展路径通常从什么级别开始？', '志愿者', '合伙人', '初级', '实习生', 'C', NULL),
(@pack_id, 7, '以下哪项是金融数据分析师的核心技能之一？', '量化分析', '航空航天', '植物学', '铣床加工', 'A', NULL),
(@pack_id, 8, '金融数据分析师需要持续学习的原因是？', '学习不重要', '无需学习', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 9, '金融数据分析师的高级年薪范围是？', '250-300万', '70-100', '20-30万', '200-250万', 'B', NULL),
(@pack_id, 10, '金融数据分析师岗位要求掌握金融学和数据科学的复合知识，这属于？', '纯技术岗位', '体力劳动岗位', '纯管理岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 11, '以下哪项最符合金融数据分析师的职业特点？', '纯管理型', '跨学科复合型人才', '纯体力型', '单一技能型', 'B', NULL),
(@pack_id, 12, '金融数据分析师不需要以下哪项能力？', '手工焊接', '数学能力', '逻辑思维', '软件操作', 'A', NULL),
(@pack_id, 13, '以下哪项是金融数据分析师的核心技能之一？', 'Python/SQL', '采矿工程', '理发师', '焊接技术', 'A', NULL),
(@pack_id, 14, '金融数据分析师的岗位中，最高学历要求通常是什么？', '硕士', '高中', '本科', '大专', 'A', NULL),
(@pack_id, 15, '以下哪项最接近金融数据分析师的学历分布？', '硕士100%', '高中100%', '本科100%', '本科20% 硕士80%', 'D', NULL),
(@pack_id, 16, '在金融数据分析师的日常工作中，最常用的技能组合是？', 'Python/SQL、金融建模', '珠宝鉴定', '焊接技术', '考古学', 'A', NULL),
(@pack_id, 17, '金融学×数据科学交叉领域对应的岗位是？', '金融数据分析师', '技术文档写作', '真实世界研究数据专家', '医疗健康投资分析师', 'A', NULL),
(@pack_id, 18, '金融数据分析师的岗位竞争激烈程度为？', '35:1', '3:1', '4:1', '1:1', 'A', NULL),
(@pack_id, 19, '应聘金融数据分析师时，平均多少人竞争1个岗位？', '5人', '2人', '4人', '35', 'D', NULL),
(@pack_id, 20, '金融数据分析师的工作强度等级是？', '3', '4', '1', '2', 'A', NULL),
(@pack_id, 21, '金融数据分析师在项目中最需要运用的能力是？', '车床操作', '气象学', '服装设计', 'Python/SQL', 'D', NULL),
(@pack_id, 22, '金融数据分析师的薪资结构中，初级岗位年薪约为？', '5-10万', '80-100万', '3-5万', '20-32', 'D', NULL),
(@pack_id, 23, '金融数据分析师对硕士学历的要求是？', '硕士20%', '硕士80%', '硕士50%', '硕士10%', 'B', NULL),
(@pack_id, 24, '金融数据分析师的学历门槛是？', '本科20% 硕士80%', '大专即可', '博士100%', '无要求', 'A', NULL),
(@pack_id, 25, '以下哪项最接近金融数据分析师的高级年薪上限？', '20万', '100', '50万', '40万', 'B', NULL),
(@pack_id, 26, '以下哪项是金融数据分析师的核心技能之一？', 'Python/SQL', '烹饪技术', '海洋学', '服装设计', 'A', NULL),
(@pack_id, 27, '以下哪项是金融数据分析师的核心技能之一？', '油画技法', '烹饪技术', '理发师', '量化分析', 'D', NULL),
(@pack_id, 28, '金融数据分析师的工作强度评级为3，对应描述是？', '高', '轻松', '繁忙', '一般', 'A', NULL),
(@pack_id, 29, '金融数据分析师的竞争比35:1意味着？', '平均35人竞争1个岗位', '自动录取', '内部推荐即可', '1人竞争多个岗位', 'A', NULL),
(@pack_id, 30, '以下哪项是金融数据分析师的核心技能之一？', '金融建模', '烹饪技术', '舞蹈编排', '茶艺师', 'A', NULL),
(@pack_id, 31, '以下哪项是金融数据分析师的核心技能之一？', '钢琴演奏', 'Python/SQL', '车床操作', '植物学', 'B', NULL),
(@pack_id, 32, '专业100的岗位名称是？', '真实世界研究数据专家', '风险建模专家', '计算机双语教学', '金融数据分析师', 'D', NULL),
(@pack_id, 33, '金融数据分析师需要融合哪两个学科的知识？', '金融和建筑', '法学和医学', '金融学和数据科学', '历史和地理', 'C', NULL),
(@pack_id, 34, '金融数据分析师属于以下哪类岗位热度？', '冷门', '极低', '无热度', '高', 'D', NULL),
(@pack_id, 35, '金融数据分析师的工作成果通常以什么形式呈现？', '油画', '建筑', '分析报告', '食品', 'C', NULL),
(@pack_id, 36, '以下哪项是金融数据分析师的核心技能之一？', '车床操作', '矿物学', 'Python/SQL', '量子物理', 'C', NULL),
(@pack_id, 37, '以下哪个不是金融数据分析师的别称？', '金融学×数据科学专家', '金融数据分析师', '跨境并购翻译', '金融数据分析师(资深)', 'C', NULL),
(@pack_id, 38, '以下哪项是金融数据分析师的核心技能之一？', '量子物理', '量化分析', '气象学', '考古学', 'B', NULL),
(@pack_id, 39, '应聘金融数据分析师，本科学历占比约为？', '20%', '90%', '10%', '100%', 'A', NULL),
(@pack_id, 40, '以下哪项是金融数据分析师的交叉学科背景？', '金融学×数据科学', '四个学科', '无学科要求', '三个学科', 'A', NULL),
(@pack_id, 41, '以下哪项不是金融数据分析师的主要工作内容？', '产品制造', '模型构建', '数据收集', '趋势分析', 'A', NULL),
(@pack_id, 42, '以下哪个场景最符合金融数据分析师的工作环境？', '法庭', '农田', '数据分析室', '手术室', 'C', NULL),
(@pack_id, 43, '金融数据分析师属于哪个学科组合？', '法学×会计学', '临床医学×数据科学', '市场营销×英语', '金融学×数据科学', 'D', NULL),
(@pack_id, 44, '金融数据分析师的竞争比是？', '5:1', '35:1', '100:1', '8:1', 'B', NULL),
(@pack_id, 45, '金融数据分析师的初级年薪范围是？', '5-8万', '100-150万', '200-300万', '20-32', 'D', NULL),
(@pack_id, 46, '金融数据分析师的学科组合中，第一个学科是？', '数据科学', '法学', '会计学', '金融学', 'D', NULL),
(@pack_id, 47, '以下哪项是金融数据分析师的核心技能之一？', '海洋学', '金融建模', '陶瓷工艺', '茶艺师', 'B', NULL),
(@pack_id, 48, '金融数据分析师工作中最可能使用的工具是？', '钢琴', '数据分析软件', '手术刀', '挖掘机', 'B', NULL),
(@pack_id, 49, '金融数据分析师的中级年薪范围是？', '38-58', '200-250万', '15-20万', '150-200万', 'A', NULL),
(@pack_id, 50, '金融数据分析师的工作强度属于？', '高', '较低', '较高', '极低', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业101：金融学×数据科学 — 风险建模专家
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_ds:1', 101, '风险建模专家', 'major_finance', 'major_ds', '金融学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项最接近风险建模专家的学历分布？', '博士100%', '高中100%', '本科100%', '本科20% 硕士80%', 'D', NULL),
(@pack_id, 2, '以下哪项最符合风险建模专家的职业特点？', '无技能型', '纯管理型', '纯体力型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 3, '以下哪个岗位名称与专业101对应？', '医疗市场专员', '风险建模专家', '技术文档工程师', '真实世界研究数据专家', 'B', NULL),
(@pack_id, 4, '金融学×数据科学交叉领域对应的岗位是？', '技术文档写作', '推荐系统产品经理', '临床预测模型开发', '风险建模专家', 'D', NULL),
(@pack_id, 5, '风险建模专家的竞争比35:1意味着？', '1人竞争多个岗位', '无竞争', '平均35人竞争1个岗位', '自动录取', 'C', NULL),
(@pack_id, 6, '风险建模专家的竞争比是？', '10:1', '35:1', '100:1', '5:1', 'B', NULL),
(@pack_id, 7, '风险建模专家在项目中最需要运用的能力是？', '版画制作', '统计学', '园艺设计', '机械维修', 'B', NULL),
(@pack_id, 8, '以下哪项是风险建模专家的核心技能之一？', '机械维修', '航空航天', '美容师', 'Python/R', 'D', NULL),
(@pack_id, 9, '风险建模专家岗位要求掌握金融学和数据科学的复合知识，这属于？', '纯管理岗位', '单一学科岗位', '纯技术岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 10, '以下哪项是风险建模专家的交叉学科背景？', '四个学科', '三个学科', '金融学×数据科学', '单一学科', 'C', NULL),
(@pack_id, 11, '以下哪项是风险建模专家的核心技能之一？', '核工程', '天文学', '版画制作', '信用风险模型', 'D', NULL),
(@pack_id, 12, '风险建模专家的中级年薪范围是？', '15-20万', '45-75', '150-200万', '200-250万', 'B', NULL),
(@pack_id, 13, '以下哪个数字代表风险建模专家的工作强度？', '6', '0', '7', '3', 'D', NULL),
(@pack_id, 14, '风险建模专家属于以下哪类岗位热度？', '极低', '高', '冷门', '无热度', 'B', NULL),
(@pack_id, 15, '专业101的岗位名称是？', '风险建模专家', '医疗健康投资分析师', '电子病历开发工程师', '量化交易平台工程师', 'A', NULL),
(@pack_id, 16, '以下哪项是风险建模专家的核心技能之一？', '烹饪技术', '陶瓷工艺', '信用风险模型', '微生物学', 'C', NULL),
(@pack_id, 17, '以下哪项是风险建模专家的核心技能之一？', '气象学', '机械维修', '采矿工程', '统计学', 'D', NULL),
(@pack_id, 18, '风险建模专家的工作强度属于？', '较低', '较高', '高', '极高', 'C', NULL),
(@pack_id, 19, '以下哪项是风险建模专家的核心技能之一？', 'Python/R', '车床操作', '海洋学', '采矿工程', 'A', NULL),
(@pack_id, 20, '风险建模专家的职业发展路径通常从什么级别开始？', '志愿者', '实习生', '顾问', '初级', 'D', NULL),
(@pack_id, 21, '以下哪项是风险建模专家的核心技能之一？', 'Python/R', '服装设计', '茶艺师', '矿物学', 'A', NULL),
(@pack_id, 22, '以下哪项最接近风险建模专家的高级年薪上限？', '30万', '40万', '20万', '130', 'D', NULL),
(@pack_id, 23, '风险建模专家的工作强度等级是？', '3', '1', '4', '5', 'A', NULL),
(@pack_id, 24, '风险建模专家不需要以下哪项能力？', '无关能力', '专业能力B', '专业能力A', '专业能力C', 'A', NULL),
(@pack_id, 25, '以下哪项技能对风险建模专家的职业发展最重要？', '理发师', '统计学', '珠宝鉴定', '微生物学', 'B', NULL),
(@pack_id, 26, '风险建模专家属于哪个学科组合？', '市场营销×英语', '电气工程×金融学', '金融学×数据科学', '法学×会计学', 'C', NULL),
(@pack_id, 27, '以下哪项是风险建模专家的核心技能之一？', '美容师', '量子物理', '考古学', '信用风险模型', 'D', NULL),
(@pack_id, 28, '风险建模专家的薪资结构中，初级岗位年薪约为？', '3-5万', '80-100万', '120-150万', '25-40', 'D', NULL),
(@pack_id, 29, '以下哪个场景最符合风险建模专家的工作环境？', '农田', '法庭', '手术室', '专业场所', 'D', NULL),
(@pack_id, 30, '风险建模专家的学历门槛是？', '本科20% 硕士80%', '高中即可', '无要求', '大专即可', 'A', NULL),
(@pack_id, 31, '以下哪项是风险建模专家的核心技能之一？', '统计学', '服装设计', '理发师', '天文学', 'A', NULL),
(@pack_id, 32, '风险建模专家的复合学科背景使其在就业市场上具有？', '无影响', '劣势', '负面作用', '竞争优势', 'D', NULL),
(@pack_id, 33, '应聘风险建模专家，本科学历占比约为？', '90%', '10%', '20%', '100%', 'C', NULL),
(@pack_id, 34, '风险建模专家的工作强度评级为3，对应描述是？', '一般', '繁忙', '高', '超负荷', 'C', NULL),
(@pack_id, 35, '风险建模专家需要持续学习的原因是？', '技术更新快', '学习内容少', '无需学习', '学习不重要', 'A', NULL),
(@pack_id, 36, '风险建模专家的岗位中，最高学历要求通常是什么？', '本科', '高中', '硕士', '博士后', 'C', NULL),
(@pack_id, 37, '以下哪个竞争比与风险建模专家相符？', '1:5', '1:20', '1:100', '35:1', 'D', NULL),
(@pack_id, 38, '以下哪项是风险建模专家的核心技能之一？', '舞蹈编排', '统计学', '量子物理', '机械维修', 'B', NULL),
(@pack_id, 39, '风险建模专家对硕士学历的要求是？', '硕士0%', '硕士80%', '硕士20%', '硕士50%', 'B', NULL),
(@pack_id, 40, '风险建模专家的高级年薪范围是？', '250-300万', '90-130', '200-250万', '30-40万', 'B', NULL),
(@pack_id, 41, '风险建模专家面试时最可能被考察的技能是？', '石油钻探', '拓扑学', '统计学', '美容师', 'C', NULL),
(@pack_id, 42, '以下哪个不是风险建模专家的别称？', '风险建模专家(资深)', '风险建模专家', '技术文档工程师', '风险建模专家(高级)', 'C', NULL),
(@pack_id, 43, '风险建模专家工作中最可能使用的工具是？', '手术刀', '专业工具', '挖掘机', '钢琴', 'B', NULL),
(@pack_id, 44, '风险建模专家需要融合哪两个学科的知识？', '法学和医学', '艺术和体育', '历史和地理', '金融学和数据科学', 'D', NULL),
(@pack_id, 45, '风险建模专家的岗位竞争激烈程度为？', '1:1', '3:1', '2:1', '35:1', 'D', NULL),
(@pack_id, 46, '风险建模专家的工作成果通常以什么形式呈现？', '油画', '专业成果', '食品', '建筑', 'B', NULL),
(@pack_id, 47, '风险建模专家属于以下哪个领域的岗位？', '纯理科', '纯文科', '纯体育', '金融学/数据科学复合领域', 'D', NULL),
(@pack_id, 48, '在1-5级工作强度体系中，风险建模专家属于哪一级？', '6级', '0级', '7级', '3', 'D', NULL),
(@pack_id, 49, '风险建模专家的工作中不涉及以下哪项技能？', 'Python/R', '气象学', '信用风险模型', '统计学', 'B', NULL),
(@pack_id, 50, '以下哪项是风险建模专家的核心技能之一？', '茶艺师', '书法篆刻', '统计学', '气象学', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业102：金融学×数据科学 — 智能投顾算法工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_ds:2', 102, '智能投顾算法工程师', 'major_finance', 'major_ds', '金融学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '智能投顾算法工程师的中级年薪范围是？', '200-250万', '150-200万', '15-20万', '55-90', 'D', NULL),
(@pack_id, 2, '以下哪项不是智能投顾算法工程师的主要工作内容？', '系统设计', '技术方案', '财务报表审计', '代码编写', 'C', NULL),
(@pack_id, 3, '在1-5级工作强度体系中，智能投顾算法工程师属于哪一级？', '0级', '6级', '3', '7级', 'C', NULL),
(@pack_id, 4, '智能投顾算法工程师岗位要求掌握金融学和数据科学的复合知识，这属于？', '体力劳动岗位', '纯管理岗位', '单一学科岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 5, '智能投顾算法工程师工作中最可能使用的设备是？', '钢琴', '挖掘机', '手术刀', '计算机', 'D', NULL),
(@pack_id, 6, '智能投顾算法工程师的竞争比40:1意味着？', '平均40人竞争1个岗位', '1人竞争多个岗位', '自动录取', '内部推荐即可', 'A', NULL),
(@pack_id, 7, '智能投顾算法工程师的岗位中，最高学历要求通常是什么？', '大专', '博士后', '硕士', '高中', 'C', NULL),
(@pack_id, 8, '智能投顾算法工程师的薪资结构中，初级岗位年薪约为？', '80-100万', '28-45', '120-150万', '5-10万', 'B', NULL),
(@pack_id, 9, '以下哪项最符合智能投顾算法工程师的职业特点？', '跨学科复合型人才', '无技能型', '纯体力型', '纯管理型', 'A', NULL),
(@pack_id, 10, '智能投顾算法工程师不需要以下哪项能力？', '问题解决', '编程能力', '逻辑思维', '外科手术', 'D', NULL),
(@pack_id, 11, '智能投顾算法工程师的岗位竞争激烈程度为？', '1:1', '40:1', '2:1', '4:1', 'B', NULL),
(@pack_id, 12, '智能投顾算法工程师的竞争比是？', '10:1', '40:1', '5:1', '8:1', 'B', NULL),
(@pack_id, 13, '以下哪个场景最符合智能投顾算法工程师的工作环境？', '技术办公室', '手术室', '农田', '法庭', 'A', NULL),
(@pack_id, 14, '以下哪项是智能投顾算法工程师的核心技能之一？', '矿物学', '投资组合优化', '古生物学', '书法篆刻', 'B', NULL),
(@pack_id, 15, '智能投顾算法工程师需要持续学习的原因是？', '技术更新快', '学习不重要', '无需学习', '学习有坏处', 'A', NULL),
(@pack_id, 16, '在智能投顾算法工程师的日常工作中，最常用的技能组合是？', '投资组合优化、机器学习', '矿物学', '雕塑艺术', '钳工工艺', 'A', NULL),
(@pack_id, 17, '以下哪项技能对智能投顾算法工程师的职业发展最重要？', '版画制作', '油画技法', '考古学', '投资组合优化', 'D', NULL),
(@pack_id, 18, '智能投顾算法工程师属于以下哪类岗位热度？', '极低', '冷门', '高', '无热度', 'C', NULL),
(@pack_id, 19, '以下哪项是智能投顾算法工程师的核心技能之一？', '建筑工程', '陶瓷工艺', '投资组合优化', '茶艺师', 'C', NULL),
(@pack_id, 20, '以下哪项是智能投顾算法工程师的核心技能之一？', '雕塑艺术', '珠宝鉴定', '书法篆刻', '机器学习', 'D', NULL),
(@pack_id, 21, '智能投顾算法工程师属于以下哪个领域的岗位？', '纯理科', '纯体育', '纯文科', '金融学/数据科学复合领域', 'D', NULL),
(@pack_id, 22, '智能投顾算法工程师的工作强度属于？', '极低', '中等', '高', '极高', 'C', NULL),
(@pack_id, 23, '智能投顾算法工程师对硕士学历的要求是？', '硕士90%', '硕士0%', '硕士50%', '硕士20%', 'A', NULL),
(@pack_id, 24, '智能投顾算法工程师的初级年薪范围是？', '5-8万', '28-45', '100-150万', '200-300万', 'B', NULL),
(@pack_id, 25, '以下哪项是智能投顾算法工程师的核心技能之一？', '考古学', '烹饪技术', '气象学', '回测', 'D', NULL),
(@pack_id, 26, '智能投顾算法工程师的工作强度评级为3，对应描述是？', '高', '轻松', '繁忙', '一般', 'A', NULL),
(@pack_id, 27, '以下哪项是智能投顾算法工程师的核心技能之一？', '石油钻探', '雕塑艺术', '采矿工程', '投资组合优化', 'D', NULL),
(@pack_id, 28, '以下哪项是智能投顾算法工程师的交叉学科背景？', '单一学科', '金融学×数据科学', '三个学科', '无学科要求', 'B', NULL),
(@pack_id, 29, '应聘智能投顾算法工程师，本科学历占比约为？', '10%', '90%', '100%', '20%', 'A', NULL),
(@pack_id, 30, '智能投顾算法工程师的高级年薪范围是？', '250-300万', '200-250万', '20-30万', '100-160', 'D', NULL),
(@pack_id, 31, '智能投顾算法工程师在项目中最需要运用的能力是？', '园艺设计', '书法篆刻', '投资组合优化', '陶瓷工艺', 'C', NULL),
(@pack_id, 32, '智能投顾算法工程师的学科组合中，第一个学科是？', '数据科学', '市场营销', '金融学', '法学', 'C', NULL),
(@pack_id, 33, '智能投顾算法工程师属于哪个学科组合？', '法学×会计学', '市场营销×英语', '金融学×数据科学', '电气工程×金融学', 'C', NULL),
(@pack_id, 34, '智能投顾算法工程师的职业发展路径通常从什么级别开始？', '顾问', '合伙人', '志愿者', '初级', 'D', NULL),
(@pack_id, 35, '以下哪个不是智能投顾算法工程师的别称？', '智能投顾算法工程师(资深)', '智能投顾算法工程师', '智能投顾算法工程师(高级)', '生物信息分析师', 'D', NULL),
(@pack_id, 36, '智能投顾算法工程师的学历门槛是？', '博士100%', '无要求', '本科10% 硕士90%', '大专即可', 'C', NULL),
(@pack_id, 37, '以下哪项是智能投顾算法工程师的核心技能之一？', '烹饪技术', '投资组合优化', '微生物学', '核工程', 'B', NULL),
(@pack_id, 38, '以下哪个数字代表智能投顾算法工程师的工作强度？', '7', '0', '8', '3', 'D', NULL),
(@pack_id, 39, '以下哪项是智能投顾算法工程师的核心技能之一？', '采矿工程', '微生物学', '铸造工艺', '回测', 'D', NULL),
(@pack_id, 40, '智能投顾算法工程师需要融合哪两个学科的知识？', '金融和建筑', '艺术和体育', '金融学和数据科学', '历史和地理', 'C', NULL),
(@pack_id, 41, '以下哪项最接近智能投顾算法工程师的高级年薪上限？', '20万', '160', '30万', '50万', 'B', NULL),
(@pack_id, 42, '以下哪项是智能投顾算法工程师的核心技能之一？', '铸造工艺', '机器学习', '雕塑艺术', '海洋学', 'B', NULL),
(@pack_id, 43, '智能投顾算法工程师的工作中不涉及以下哪项技能？', '机器学习', '投资组合优化', '回测', '量子物理', 'D', NULL),
(@pack_id, 44, '应聘智能投顾算法工程师时，平均多少人竞争1个岗位？', '2人', '3人', '40', '5人', 'C', NULL),
(@pack_id, 45, '以下哪项是智能投顾算法工程师的核心技能之一？', '建筑工程', '机器学习', '海洋学', '茶艺师', 'B', NULL),
(@pack_id, 46, '智能投顾算法工程师面试时最可能被考察的技能是？', '服装设计', '植物学', '投资组合优化', '矿物学', 'C', NULL),
(@pack_id, 47, '以下哪项是智能投顾算法工程师的核心技能之一？', '海洋学', '回测', '书法篆刻', '美容师', 'B', NULL),
(@pack_id, 48, '以下哪个岗位名称与专业102对应？', '智能投顾算法工程师', '数据仓库工程师', '技术文档写作', '技术产品经理', 'A', NULL),
(@pack_id, 49, '金融学×数据科学交叉领域对应的岗位是？', '开发者关系工程师', '智能投顾算法工程师', '数据平台开发工程师', '英文技术支持', 'B', NULL),
(@pack_id, 50, '专业102的岗位名称是？', '用户增长分析师', '智能投顾算法工程师', '金融产品营销经理', '市场数据分析师', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业103：金融学×英语 — 国际金融分析师(CFA)
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_english:0', 103, '国际金融分析师(CFA)', 'major_finance', 'major_english', '金融学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '国际金融分析师(CFA)的职业发展路径通常从什么级别开始？', '志愿者', '初级', '合伙人', '实习生', 'B', NULL),
(@pack_id, 2, '以下哪项不是国际金融分析师(CFA)的主要工作内容？', '产品制造', '模型构建', '趋势分析', '数据收集', 'A', NULL),
(@pack_id, 3, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '公司金融', '拓扑学', '建筑工程', '茶艺师', 'A', NULL),
(@pack_id, 4, '以下哪个岗位名称与专业103对应？', '医药行业研究员', '技术文档工程师', '跨境电商运营', '国际金融分析师(CFA)', 'D', NULL),
(@pack_id, 5, '以下哪项最接近国际金融分析师(CFA)的高级年薪上限？', '30万', '100', '40万', '50万', 'B', NULL),
(@pack_id, 6, '国际金融分析师(CFA)工作中最可能使用的工具是？', '钢琴', '数据分析软件', '挖掘机', '手术刀', 'B', NULL),
(@pack_id, 7, '国际金融分析师(CFA)的中级年薪范围是？', '150-200万', '35-55', '200-250万', '15-20万', 'B', NULL),
(@pack_id, 8, '国际金融分析师(CFA)不需要以下哪项能力？', '逻辑思维', '手工焊接', '数学能力', '软件操作', 'B', NULL),
(@pack_id, 9, '以下哪个不是国际金融分析师(CFA)的别称？', '国际金融分析师(CFA)(高级)', '国际金融分析师(CFA)', '金融学×英语专家', '双语数据报告撰写', 'D', NULL),
(@pack_id, 10, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '财务报表', '版画制作', '陶瓷工艺', '钢琴演奏', 'A', NULL),
(@pack_id, 11, '国际金融分析师(CFA)在项目中最需要运用的能力是？', '舞蹈编排', '机械维修', '财务报表', '雕塑艺术', 'C', NULL),
(@pack_id, 12, '国际金融分析师(CFA)的岗位中，最高学历要求通常是什么？', '本科', '大专', '高中', '硕士', 'D', NULL),
(@pack_id, 13, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '财务报表', '地质学', '钢琴演奏', '铣床加工', 'A', NULL),
(@pack_id, 14, '国际金融分析师(CFA)对硕士学历的要求是？', '硕士50%', '硕士70%', '硕士10%', '硕士20%', 'B', NULL),
(@pack_id, 15, '以下哪项最接近国际金融分析师(CFA)的学历分布？', '硕士100%', '本科100%', '本科30% 硕士70%', '高中100%', 'C', NULL),
(@pack_id, 16, '国际金融分析师(CFA)属于以下哪个领域的岗位？', '金融学/英语复合领域', '纯理科', '纯文科', '纯体育', 'A', NULL),
(@pack_id, 17, '在国际金融分析师(CFA)的日常工作中，最常用的技能组合是？', '理发师', '陶瓷工艺', '书法篆刻', '财务报表、公司金融', 'D', NULL),
(@pack_id, 18, '国际金融分析师(CFA)的竞争比是？', '8:1', '25:1', '5:1', '100:1', 'B', NULL),
(@pack_id, 19, '国际金融分析师(CFA)属于以下哪类岗位热度？', '冷门', '无热度', '高', '淘汰', 'C', NULL),
(@pack_id, 20, '国际金融分析师(CFA)的薪资结构中，初级岗位年薪约为？', '80-100万', '18-28', '3-5万', '5-10万', 'B', NULL),
(@pack_id, 21, '国际金融分析师(CFA)的学历门槛是？', '高中即可', '博士100%', '本科30% 硕士70%', '无要求', 'C', NULL),
(@pack_id, 22, '以下哪个场景最符合国际金融分析师(CFA)的工作环境？', '农田', '数据分析室', '法庭', '手术室', 'B', NULL),
(@pack_id, 23, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '昆虫学', '钳工工艺', '茶艺师', '财务报表', 'D', NULL),
(@pack_id, 24, '国际金融分析师(CFA)面试时最可能被考察的技能是？', '服装设计', '舞蹈编排', '拓扑学', '财务报表', 'D', NULL),
(@pack_id, 25, '国际金融分析师(CFA)岗位要求掌握金融学和英语的复合知识，这属于？', '单一学科岗位', '纯技术岗位', '跨学科复合岗位', '体力劳动岗位', 'C', NULL),
(@pack_id, 26, '国际金融分析师(CFA)属于哪个学科组合？', '临床医学×数据科学', '电气工程×金融学', '市场营销×英语', '金融学×英语', 'D', NULL),
(@pack_id, 27, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '茶艺师', '矿物学', '英语(商务)', '海洋学', 'C', NULL),
(@pack_id, 28, '国际金融分析师(CFA)的岗位竞争激烈程度为？', '4:1', '3:1', '2:1', '25:1', 'D', NULL),
(@pack_id, 29, '国际金融分析师(CFA)的工作强度属于？', '较高', '较低', '极高', '极低', 'A', NULL),
(@pack_id, 30, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '雕塑艺术', '车床操作', '公司金融', '地质学', 'C', NULL),
(@pack_id, 31, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '英语(商务)', '微生物学', '植物学', '海洋学', 'A', NULL),
(@pack_id, 32, '国际金融分析师(CFA)的工作强度等级是？', '3', '5', '1', '4', 'D', NULL),
(@pack_id, 33, '金融学×英语交叉领域对应的岗位是？', '电子病历开发工程师', 'DevOps工程师', '金融软件产品经理', '国际金融分析师(CFA)', 'D', NULL),
(@pack_id, 34, '国际金融分析师(CFA)的工作成果通常以什么形式呈现？', '食品', '油画', '建筑', '分析报告', 'D', NULL),
(@pack_id, 35, '国际金融分析师(CFA)的复合学科背景使其在就业市场上具有？', '负面作用', '无影响', '劣势', '竞争优势', 'D', NULL),
(@pack_id, 36, '在1-5级工作强度体系中，国际金融分析师(CFA)属于哪一级？', '7级', '4', '0级', '6级', 'B', NULL),
(@pack_id, 37, '国际金融分析师(CFA)的学科组合中，第一个学科是？', '金融学', '法学', '市场营销', '数据科学', 'A', NULL),
(@pack_id, 38, '国际金融分析师(CFA)的工作强度评级为4，对应描述是？', '繁忙', '一般', '轻松', '较高', 'D', NULL),
(@pack_id, 39, '以下哪个竞争比与国际金融分析师(CFA)相符？', '1:10', '1:5', '25:1', '1:20', 'C', NULL),
(@pack_id, 40, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '钳工工艺', '焊接技术', '财务报表', '珠宝鉴定', 'C', NULL),
(@pack_id, 41, '以下哪个数字代表国际金融分析师(CFA)的工作强度？', '4', '6', '8', '7', 'A', NULL),
(@pack_id, 42, '以下哪项是国际金融分析师(CFA)的交叉学科背景？', '金融学×英语', '无学科要求', '单一学科', '三个学科', 'A', NULL),
(@pack_id, 43, '国际金融分析师(CFA)需要融合哪两个学科的知识？', '金融和建筑', '历史和地理', '法学和医学', '金融学和英语', 'D', NULL),
(@pack_id, 44, '国际金融分析师(CFA)需要持续学习的原因是？', '技术更新快', '学习内容少', '学习不重要', '无需学习', 'A', NULL),
(@pack_id, 45, '以下哪项最符合国际金融分析师(CFA)的职业特点？', '跨学科复合型人才', '纯体力型', '单一技能型', '纯管理型', 'A', NULL),
(@pack_id, 46, '国际金融分析师(CFA)的高级年薪范围是？', '250-300万', '20-30万', '65-100', '30-40万', 'C', NULL),
(@pack_id, 47, '国际金融分析师(CFA)的初级年薪范围是？', '8-12万', '5-8万', '200-300万', '18-28', 'D', NULL),
(@pack_id, 48, '应聘国际金融分析师(CFA)，本科学历占比约为？', '90%', '10%', '20%', '30%', 'D', NULL),
(@pack_id, 49, '以下哪项是国际金融分析师(CFA)的核心技能之一？', '公司金融', '版画制作', '铸造工艺', '车床操作', 'A', NULL),
(@pack_id, 50, '国际金融分析师(CFA)的工作中不涉及以下哪项技能？', '财务报表', '英语(商务)', '公司金融', '拓扑学', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业104：金融学×英语 — 外汇交易员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_english:1', 104, '外汇交易员', 'major_finance', 'major_english', '金融学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '外汇交易员需要持续学习的原因是？', '无需学习', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL),
(@pack_id, 2, '以下哪项是外汇交易员的核心技能之一？', '核工程', '矿物学', '焊接技术', '宏观分析', 'D', NULL),
(@pack_id, 3, '以下哪个岗位名称与专业104对应？', '外汇交易员', '国际金融分析师(CFA)', '生物信息分析师', '数据平台开发工程师', 'A', NULL),
(@pack_id, 4, '外汇交易员属于以下哪类岗位热度？', '无热度', '高', '冷门', '淘汰', 'B', NULL),
(@pack_id, 5, '以下哪项是外汇交易员的核心技能之一？', '园艺设计', '石油钻探', '考古学', '宏观分析', 'D', NULL),
(@pack_id, 6, '外汇交易员的学历门槛是？', '高中即可', '无要求', '大专即可', '本科20% 硕士80%', 'D', NULL),
(@pack_id, 7, '外汇交易员的初级年薪范围是？', '200-300万', '5-8万', '20-35', '100-150万', 'C', NULL),
(@pack_id, 8, '以下哪个不是外汇交易员的别称？', '医院信息系统实施', '外汇交易员(资深)', '外汇交易员(高级)', '外汇交易员', 'A', NULL),
(@pack_id, 9, '外汇交易员的工作成果通常以什么形式呈现？', '油画', '食品', '建筑', '专业成果', 'D', NULL),
(@pack_id, 10, '以下哪项最接近外汇交易员的高级年薪上限？', '20万', '30万', '50万', '130', 'D', NULL),
(@pack_id, 11, '以下哪项是外汇交易员的核心技能之一？', '航空航天', '宏观分析', '核工程', '油画技法', 'B', NULL),
(@pack_id, 12, '外汇交易员不需要以下哪项能力？', '专业能力A', '专业能力C', '无关能力', '专业能力B', 'C', NULL),
(@pack_id, 13, '金融学×英语交叉领域对应的岗位是？', '外汇交易员', '医疗市场专员', '机器学习平台开发', '电子病历开发工程师', 'A', NULL),
(@pack_id, 14, '以下哪项是外汇交易员的交叉学科背景？', '四个学科', '单一学科', '金融学×英语', '三个学科', 'C', NULL),
(@pack_id, 15, '以下哪项不是外汇交易员的主要工作内容？', '核心工作A', '核心工作C', 'unrelated_work', '核心工作B', 'C', NULL),
(@pack_id, 16, '以下哪项是外汇交易员的核心技能之一？', '采矿工程', '建筑工程', '英语新闻', '核工程', 'C', NULL),
(@pack_id, 17, '外汇交易员的工作中不涉及以下哪项技能？', '英语新闻', '理发师', '技术分析', '宏观分析', 'B', NULL),
(@pack_id, 18, '以下哪项是外汇交易员的核心技能之一？', '舞蹈编排', '拓扑学', '钢琴演奏', '技术分析', 'D', NULL),
(@pack_id, 19, '在1-5级工作强度体系中，外汇交易员属于哪一级？', '5', '8级', '7级', '0级', 'A', NULL),
(@pack_id, 20, '以下哪项最接近外汇交易员的学历分布？', '本科100%', '高中100%', '本科20% 硕士80%', '博士100%', 'C', NULL),
(@pack_id, 21, '外汇交易员属于以下哪个领域的岗位？', '金融学/英语复合领域', '纯文科', '纯艺术', '纯理科', 'A', NULL),
(@pack_id, 22, '外汇交易员的高级年薪范围是？', '30-40万', '250-300万', '200-250万', '80-130', 'D', NULL),
(@pack_id, 23, '应聘外汇交易员，本科学历占比约为？', '100%', '90%', '10%', '20%', 'D', NULL),
(@pack_id, 24, '专业104的岗位名称是？', '医疗器械产品经理', '金融软件产品经理', '海外技术支持', '外汇交易员', 'D', NULL),
(@pack_id, 25, '外汇交易员对硕士学历的要求是？', '硕士20%', '硕士80%', '硕士0%', '硕士10%', 'B', NULL),
(@pack_id, 26, '应聘外汇交易员时，平均多少人竞争1个岗位？', '3人', '5人', '4人', '30', 'D', NULL),
(@pack_id, 27, '外汇交易员的学科组合中，第一个学科是？', '法学', '数据科学', '会计学', '金融学', 'D', NULL),
(@pack_id, 28, '外汇交易员的岗位竞争激烈程度为？', '4:1', '3:1', '30:1', '2:1', 'C', NULL),
(@pack_id, 29, '外汇交易员在项目中最需要运用的能力是？', '车床操作', '矿物学', '古生物学', '宏观分析', 'D', NULL),
(@pack_id, 30, '外汇交易员的工作强度属于？', '极低', '极高', '中等', '较高', 'B', NULL),
(@pack_id, 31, '外汇交易员的岗位中，最高学历要求通常是什么？', '本科', '高中', '硕士', '博士后', 'C', NULL),
(@pack_id, 32, '外汇交易员的职业发展路径通常从什么级别开始？', '志愿者', '初级', '实习生', '合伙人', 'B', NULL),
(@pack_id, 33, '以下哪个竞争比与外汇交易员相符？', '30:1', '1:5', '1:10', '1:20', 'A', NULL),
(@pack_id, 34, '外汇交易员的中级年薪范围是？', '150-200万', '40-70', '15-20万', '10-15万', 'B', NULL),
(@pack_id, 35, '外汇交易员的工作强度等级是？', '4', '3', '2', '5', 'D', NULL),
(@pack_id, 36, '外汇交易员的竞争比30:1意味着？', '内部推荐即可', '1人竞争多个岗位', '自动录取', '平均30人竞争1个岗位', 'D', NULL),
(@pack_id, 37, '以下哪项最符合外汇交易员的职业特点？', '单一技能型', '纯管理型', '纯体力型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 38, '以下哪项技能对外汇交易员的职业发展最重要？', '植物学', '天文学', '航空航天', '宏观分析', 'D', NULL),
(@pack_id, 39, '外汇交易员岗位要求掌握金融学和英语的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '体力劳动岗位', '单一学科岗位', 'A', NULL),
(@pack_id, 40, '外汇交易员需要融合哪两个学科的知识？', '金融学和英语', '法学和医学', '金融和建筑', '历史和地理', 'A', NULL),
(@pack_id, 41, '以下哪个数字代表外汇交易员的工作强度？', '6', '5', '7', '0', 'B', NULL),
(@pack_id, 42, '外汇交易员工作中最可能使用的工具是？', '手术刀', '钢琴', '专业工具', '挖掘机', 'C', NULL),
(@pack_id, 43, '外汇交易员的薪资结构中，初级岗位年薪约为？', '120-150万', '20-35', '80-100万', '5-10万', 'B', NULL),
(@pack_id, 44, '外汇交易员的复合学科背景使其在就业市场上具有？', '劣势', '竞争优势', '被淘汰风险', '负面作用', 'B', NULL),
(@pack_id, 45, '以下哪项是外汇交易员的核心技能之一？', '钳工工艺', '考古学', '烹饪技术', '宏观分析', 'D', NULL),
(@pack_id, 46, '外汇交易员属于哪个学科组合？', '市场营销×英语', '法学×会计学', '金融学×英语', '临床医学×数据科学', 'C', NULL),
(@pack_id, 47, '外汇交易员的工作强度评级为5，对应描述是？', '极高', '一般', '超负荷', '轻松', 'A', NULL),
(@pack_id, 48, '以下哪项是外汇交易员的核心技能之一？', '英语新闻', '量子物理', '天文学', '油画技法', 'A', NULL),
(@pack_id, 49, '在外汇交易员的日常工作中，最常用的技能组合是？', '拓扑学', '油画技法', '宏观分析、技术分析', '微生物学', 'C', NULL),
(@pack_id, 50, '以下哪项是外汇交易员的核心技能之一？', '舞蹈编排', '植物学', '技术分析', '园艺设计', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业105：金融学×英语 — 跨境并购翻译
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_english:2', 105, '跨境并购翻译', 'major_finance', 'major_english', '金融学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '跨境并购翻译的初级年薪范围是？', '8-12万', '200-300万', '5-8万', '15-24', 'D', NULL),
(@pack_id, 2, '跨境并购翻译的中级年薪范围是？', '10-15万', '15-20万', '28-45', '200-250万', 'C', NULL),
(@pack_id, 3, '跨境并购翻译的岗位竞争激烈程度为？', '2:1', '4:1', '15:1', '1:1', 'C', NULL),
(@pack_id, 4, '跨境并购翻译需要融合哪两个学科的知识？', '金融和建筑', '历史和地理', '金融学和英语', '艺术和体育', 'C', NULL),
(@pack_id, 5, '跨境并购翻译属于哪个学科组合？', '电气工程×金融学', '金融学×英语', '临床医学×数据科学', '法学×会计学', 'B', NULL),
(@pack_id, 6, '应聘跨境并购翻译时，平均多少人竞争1个岗位？', '15', '4人', '3人', '5人', 'A', NULL),
(@pack_id, 7, '以下哪项是跨境并购翻译的核心技能之一？', '地质学', '尽调支持', '石油钻探', '版画制作', 'B', NULL),
(@pack_id, 8, '以下哪项是跨境并购翻译的核心技能之一？', '采矿工程', '钳工工艺', '航空航天', '尽调支持', 'D', NULL),
(@pack_id, 9, '以下哪个岗位名称与专业105对应？', '跨境并购翻译', '生物信息分析师', '医疗市场专员', '医疗健康投资分析师', 'A', NULL),
(@pack_id, 10, '跨境并购翻译面试时最可能被考察的技能是？', '钢琴演奏', '微生物学', '建筑工程', '金融英语', 'D', NULL),
(@pack_id, 11, '跨境并购翻译的薪资结构中，初级岗位年薪约为？', '3-5万', '120-150万', '5-10万', '15-24', 'D', NULL),
(@pack_id, 12, '跨境并购翻译需要持续学习的原因是？', '技术更新快', '学习不重要', '学习有坏处', '无需学习', 'A', NULL),
(@pack_id, 13, '以下哪项技能对跨境并购翻译的职业发展最重要？', '植物学', '海洋学', '金融英语', '微生物学', 'C', NULL),
(@pack_id, 14, '跨境并购翻译的学科组合中，第一个学科是？', '法学', '金融学', '数据科学', '会计学', 'B', NULL),
(@pack_id, 15, '跨境并购翻译属于以下哪类岗位热度？', '淘汰', '无热度', '中', '冷门', 'C', NULL),
(@pack_id, 16, '跨境并购翻译的工作强度评级为3，对应描述是？', '繁忙', '轻松', '超负荷', '高', 'D', NULL),
(@pack_id, 17, '跨境并购翻译的职业发展路径通常从什么级别开始？', '实习生', '志愿者', '合伙人', '初级', 'D', NULL),
(@pack_id, 18, '以下哪项是跨境并购翻译的核心技能之一？', '铸造工艺', '合同翻译', '油画技法', '焊接技术', 'B', NULL),
(@pack_id, 19, '以下哪项是跨境并购翻译的核心技能之一？', '植物学', '合同翻译', '版画制作', '舞蹈编排', 'B', NULL),
(@pack_id, 20, '跨境并购翻译的工作强度属于？', '中等', '较低', '高', '极高', 'C', NULL),
(@pack_id, 21, '跨境并购翻译的竞争比15:1意味着？', '内部推荐即可', '1人竞争多个岗位', '平均15人竞争1个岗位', '无竞争', 'C', NULL),
(@pack_id, 22, '跨境并购翻译不需要以下哪项能力？', '语言能力', '细心耐心', '写作能力', '驾驶技术', 'D', NULL),
(@pack_id, 23, '专业105的岗位名称是？', '量化交易平台工程师', '技术产品经理', '跨境并购翻译', '技术文档工程师', 'C', NULL),
(@pack_id, 24, '以下哪项是跨境并购翻译的核心技能之一？', '考古学', '铣床加工', '金融英语', '矿物学', 'C', NULL),
(@pack_id, 25, '跨境并购翻译的复合学科背景使其在就业市场上具有？', '被淘汰风险', '竞争优势', '无影响', '劣势', 'B', NULL),
(@pack_id, 26, '以下哪项最接近跨境并购翻译的学历分布？', '博士100%', '高中100%', '本科100%', '本科50% 硕士50%', 'D', NULL),
(@pack_id, 27, '以下哪项最符合跨境并购翻译的职业特点？', '跨学科复合型人才', '无技能型', '纯体力型', '单一技能型', 'A', NULL),
(@pack_id, 28, '以下哪个数字代表跨境并购翻译的工作强度？', '3', '0', '7', '8', 'A', NULL),
(@pack_id, 29, '跨境并购翻译的学历门槛是？', '本科50% 硕士50%', '高中即可', '大专即可', '无要求', 'A', NULL),
(@pack_id, 30, '在1-5级工作强度体系中，跨境并购翻译属于哪一级？', '8级', '0级', '7级', '3', 'D', NULL),
(@pack_id, 31, '跨境并购翻译岗位要求掌握金融学和英语的复合知识，这属于？', '体力劳动岗位', '纯管理岗位', '跨学科复合岗位', '纯技术岗位', 'C', NULL),
(@pack_id, 32, '跨境并购翻译的高级年薪范围是？', '20-30万', '200-250万', '55-80', '30-40万', 'C', NULL),
(@pack_id, 33, '跨境并购翻译对硕士学历的要求是？', '硕士20%', '硕士10%', '硕士50%', '硕士0%', 'C', NULL),
(@pack_id, 34, '应聘跨境并购翻译，本科学历占比约为？', '50%', '20%', '100%', '90%', 'A', NULL),
(@pack_id, 35, '跨境并购翻译的工作强度等级是？', '5', '1', '3', '2', 'C', NULL),
(@pack_id, 36, '以下哪项是跨境并购翻译的核心技能之一？', '理发师', '考古学', '金融英语', '珠宝鉴定', 'C', NULL),
(@pack_id, 37, '金融学×英语交叉领域对应的岗位是？', '医保精算师', '金融产品营销经理', '风险建模专家', '跨境并购翻译', 'D', NULL),
(@pack_id, 38, '以下哪项是跨境并购翻译的交叉学科背景？', '单一学科', '金融学×英语', '无学科要求', '四个学科', 'B', NULL),
(@pack_id, 39, '以下哪项是跨境并购翻译的核心技能之一？', '雕塑艺术', '金融英语', '昆虫学', '考古学', 'B', NULL),
(@pack_id, 40, '跨境并购翻译工作中最可能使用的工具是？', '翻译软件/编辑器', '钢琴', '手术刀', '挖掘机', 'A', NULL),
(@pack_id, 41, '以下哪项不是跨境并购翻译的主要工作内容？', '内容校对', '股票交易', '术语整理', '文字翻译', 'B', NULL),
(@pack_id, 42, '以下哪个竞争比与跨境并购翻译相符？', '1:100', '1:20', '1:5', '15:1', 'D', NULL),
(@pack_id, 43, '跨境并购翻译在项目中最需要运用的能力是？', '考古学', '石油钻探', '核工程', '金融英语', 'D', NULL),
(@pack_id, 44, '以下哪个场景最符合跨境并购翻译的工作环境？', '嘈杂工地', '手术室', '安静办公室', '农田', 'C', NULL),
(@pack_id, 45, '跨境并购翻译的竞争比是？', '100:1', '5:1', '10:1', '15:1', 'D', NULL),
(@pack_id, 46, '跨境并购翻译的岗位中，最高学历要求通常是什么？', '硕士', '大专', '高中', '本科', 'A', NULL),
(@pack_id, 47, '在跨境并购翻译的日常工作中，最常用的技能组合是？', '量子物理', '金融英语、合同翻译', '铸造工艺', '服装设计', 'B', NULL),
(@pack_id, 48, '以下哪项是跨境并购翻译的核心技能之一？', '天文学', '合同翻译', '舞蹈编排', '铣床加工', 'B', NULL),
(@pack_id, 49, '以下哪项最接近跨境并购翻译的高级年薪上限？', '30万', '80', '40万', '50万', 'B', NULL),
(@pack_id, 50, '以下哪个不是跨境并购翻译的别称？', '技术产品经理', '跨境并购翻译(高级)', '金融学×英语专家', '跨境并购翻译', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业106：临床医学×软件工程 — 医疗软件产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_swe:0', 106, '医疗软件产品经理', 'major_clinical', 'major_swe', '临床医学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医疗软件产品经理需要融合哪两个学科的知识？', '艺术和体育', '金融和建筑', '临床医学和软件工程', '法学和医学', 'C', NULL),
(@pack_id, 2, '在医疗软件产品经理的日常工作中，最常用的技能组合是？', '采矿工程', '油画技法', '医疗信息系统、需求分析', '铣床加工', 'C', NULL),
(@pack_id, 3, '医疗软件产品经理工作中最可能使用的工具是？', '办公软件', '焊接设备', '纺织机', '手术器械', 'A', NULL),
(@pack_id, 4, '以下哪个竞争比与医疗软件产品经理相符？', '20:1', '1:5', '1:10', '1:20', 'A', NULL),
(@pack_id, 5, '医疗软件产品经理属于以下哪类岗位热度？', '冷门', '极低', '高', '淘汰', 'C', NULL),
(@pack_id, 6, '医疗软件产品经理在项目中最需要运用的能力是？', '医疗信息系统', '核工程', '微生物学', '珠宝鉴定', 'A', NULL),
(@pack_id, 7, '医疗软件产品经理的职业发展路径通常从什么级别开始？', '实习生', '志愿者', '初级', '合伙人', 'C', NULL),
(@pack_id, 8, '以下哪项是医疗软件产品经理的核心技能之一？', '油画技法', '气象学', '需求分析', '陶瓷工艺', 'C', NULL),
(@pack_id, 9, '以下哪项是医疗软件产品经理的核心技能之一？', '需求分析', '茶艺师', '舞蹈编排', '天文学', 'A', NULL),
(@pack_id, 10, '专业106的岗位名称是？', '数据科学翻译', '用户增长分析师', '客户画像建模', '医疗软件产品经理', 'D', NULL),
(@pack_id, 11, '以下哪个数字代表医疗软件产品经理的工作强度？', '3', '6', '8', '7', 'A', NULL),
(@pack_id, 12, '医疗软件产品经理的岗位中，最高学历要求通常是什么？', '硕士', '高中', '本科', '博士后', 'A', NULL),
(@pack_id, 13, '以下哪项技能对医疗软件产品经理的职业发展最重要？', '海洋学', '车床操作', '拓扑学', '医疗信息系统', 'D', NULL),
(@pack_id, 14, '应聘医疗软件产品经理时，平均多少人竞争1个岗位？', '20', '5人', '2人', '3人', 'A', NULL),
(@pack_id, 15, '以下哪项是医疗软件产品经理的核心技能之一？', '建筑工程', '医疗信息系统', '珠宝鉴定', '理发师', 'B', NULL),
(@pack_id, 16, '医疗软件产品经理的工作成果通常以什么形式呈现？', '建筑', '方案/报告', '食品', '药品', 'B', NULL),
(@pack_id, 17, '临床医学×软件工程交叉领域对应的岗位是？', '金融数据分析师', '医疗软件产品经理', '数据平台开发工程师', '市场数据分析师', 'B', NULL),
(@pack_id, 18, '以下哪个不是医疗软件产品经理的别称？', '医疗软件产品经理(资深)', '临床医学×软件工程专家', '医疗软件产品经理', 'AI算法专家', 'D', NULL),
(@pack_id, 19, '以下哪项最接近医疗软件产品经理的学历分布？', '博士100%', '本科100%', '本科50% 硕士50%', '硕士100%', 'C', NULL),
(@pack_id, 20, '医疗软件产品经理的竞争比20:1意味着？', '1人竞争多个岗位', '内部推荐即可', '自动录取', '平均20人竞争1个岗位', 'D', NULL),
(@pack_id, 21, '医疗软件产品经理不需要以下哪项能力？', '机械操作', '沟通能力', '写作能力', '分析能力', 'A', NULL),
(@pack_id, 22, '医疗软件产品经理对硕士学历的要求是？', '硕士50%', '硕士10%', '硕士20%', '硕士0%', 'A', NULL),
(@pack_id, 23, '以下哪项是医疗软件产品经理的核心技能之一？', '地质学', '量子物理', 'HL7/FHIR', '微生物学', 'C', NULL),
(@pack_id, 24, '医疗软件产品经理的学历门槛是？', '无要求', '大专即可', '本科50% 硕士50%', '高中即可', 'C', NULL),
(@pack_id, 25, '以下哪个岗位名称与专业106对应？', '医疗软件产品经理', '投资者关系专员', '用户增长分析师', '量化交易平台工程师', 'A', NULL),
(@pack_id, 26, '以下哪项最符合医疗软件产品经理的职业特点？', '纯管理型', '纯体力型', '跨学科复合型人才', '无技能型', 'C', NULL),
(@pack_id, 27, '医疗软件产品经理的工作强度评级为3，对应描述是？', '高', '繁忙', '一般', '轻松', 'A', NULL),
(@pack_id, 28, '以下哪项是医疗软件产品经理的核心技能之一？', '钳工工艺', '量子物理', '医疗信息系统', '茶艺师', 'C', NULL),
(@pack_id, 29, '应聘医疗软件产品经理，本科学历占比约为？', '100%', '50%', '90%', '20%', 'B', NULL),
(@pack_id, 30, '医疗软件产品经理的工作中不涉及以下哪项技能？', '医疗信息系统', '需求分析', 'HL7/FHIR', '铸造工艺', 'D', NULL),
(@pack_id, 31, '以下哪项是医疗软件产品经理的核心技能之一？', '茶艺师', '天文学', '需求分析', '舞蹈编排', 'C', NULL),
(@pack_id, 32, '医疗软件产品经理岗位要求掌握临床医学和软件工程的复合知识，这属于？', '跨学科复合岗位', '纯管理岗位', '体力劳动岗位', '单一学科岗位', 'A', NULL),
(@pack_id, 33, '医疗软件产品经理的工作强度等级是？', '4', '3', '5', '2', 'B', NULL),
(@pack_id, 34, '以下哪项是医疗软件产品经理的核心技能之一？', '烹饪技术', '铸造工艺', '气象学', '医疗信息系统', 'D', NULL),
(@pack_id, 35, '以下哪项不是医疗软件产品经理的主要工作内容？', '方案设计', '客户沟通', '数据分析', '芯片制造', 'D', NULL),
(@pack_id, 36, '医疗软件产品经理的岗位竞争激烈程度为？', '20:1', '4:1', '1:1', '2:1', 'A', NULL),
(@pack_id, 37, '医疗软件产品经理的高级年薪范围是？', '20-30万', '60-85', '30-40万', '250-300万', 'B', NULL),
(@pack_id, 38, '以下哪项是医疗软件产品经理的核心技能之一？', '矿物学', '天文学', 'HL7/FHIR', '采矿工程', 'C', NULL),
(@pack_id, 39, '医疗软件产品经理的学科组合中，第一个学科是？', '市场营销', '会计学', '数据科学', '临床医学', 'D', NULL),
(@pack_id, 40, '医疗软件产品经理需要持续学习的原因是？', '技术更新快', '学习内容少', '学习不重要', '无需学习', 'A', NULL),
(@pack_id, 41, '医疗软件产品经理面试时最可能被考察的技能是？', '陶瓷工艺', '铸造工艺', '植物学', '医疗信息系统', 'D', NULL),
(@pack_id, 42, '医疗软件产品经理的初级年薪范围是？', '18-28', '200-300万', '5-8万', '100-150万', 'A', NULL),
(@pack_id, 43, '在1-5级工作强度体系中，医疗软件产品经理属于哪一级？', '8级', '3', '0级', '6级', 'B', NULL),
(@pack_id, 44, '以下哪项是医疗软件产品经理的核心技能之一？', '书法篆刻', '铣床加工', 'HL7/FHIR', '考古学', 'C', NULL),
(@pack_id, 45, '以下哪个场景最符合医疗软件产品经理的工作环境？', '办公室/会议室', '工厂车间', '农田', '手术室', 'A', NULL),
(@pack_id, 46, '以下哪项最接近医疗软件产品经理的高级年薪上限？', '20万', '40万', '85', '30万', 'C', NULL),
(@pack_id, 47, '医疗软件产品经理的复合学科背景使其在就业市场上具有？', '被淘汰风险', '竞争优势', '无影响', '劣势', 'B', NULL),
(@pack_id, 48, '医疗软件产品经理属于以下哪个领域的岗位？', '纯体育', '临床医学/软件工程复合领域', '纯理科', '纯文科', 'B', NULL),
(@pack_id, 49, '医疗软件产品经理属于哪个学科组合？', '法学×会计学', '市场营销×英语', '临床医学×软件工程', '电气工程×金融学', 'C', NULL),
(@pack_id, 50, '医疗软件产品经理的工作强度属于？', '高', '极高', '极低', '较低', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业107：临床医学×软件工程 — 医院信息系统实施
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_swe:1', 107, '医院信息系统实施', 'major_clinical', 'major_swe', '临床医学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医院信息系统实施的工作强度属于？', '较低', '中', '极高', '较高', 'B', NULL),
(@pack_id, 2, '医院信息系统实施的竞争比12:1意味着？', '1人竞争多个岗位', '平均12人竞争1个岗位', '自动录取', '无竞争', 'B', NULL),
(@pack_id, 3, '医院信息系统实施的岗位竞争激烈程度为？', '2:1', '12:1', '4:1', '1:1', 'B', NULL),
(@pack_id, 4, '以下哪项不是医院信息系统实施的主要工作内容？', '核心工作B', '核心工作A', 'unrelated_work', '核心工作C', 'C', NULL),
(@pack_id, 5, '医院信息系统实施工作中最可能使用的工具是？', '手术刀', '专业工具', '钢琴', '挖掘机', 'B', NULL),
(@pack_id, 6, '医院信息系统实施的初级年薪范围是？', '200-300万', '100-150万', '14-22', '8-12万', 'C', NULL),
(@pack_id, 7, '以下哪个竞争比与医院信息系统实施相符？', '1:100', '1:10', '1:5', '12:1', 'D', NULL),
(@pack_id, 8, '医院信息系统实施属于哪个学科组合？', '法学×会计学', '电气工程×金融学', '临床医学×软件工程', '市场营销×英语', 'C', NULL),
(@pack_id, 9, '应聘医院信息系统实施时，平均多少人竞争1个岗位？', '3人', '2人', '12', '4人', 'C', NULL),
(@pack_id, 10, '以下哪个数字代表医院信息系统实施的工作强度？', '0', '8', '2', '6', 'C', NULL),
(@pack_id, 11, '医院信息系统实施的工作强度等级是？', '2', '3', '4', '1', 'A', NULL),
(@pack_id, 12, '以下哪个场景最符合医院信息系统实施的工作环境？', '法庭', '农田', '手术室', '专业场所', 'D', NULL),
(@pack_id, 13, '以下哪项是医院信息系统实施的核心技能之一？', '气象学', '理发师', '陶瓷工艺', '项目管理', 'D', NULL),
(@pack_id, 14, '医院信息系统实施的学科组合中，第一个学科是？', '临床医学', '市场营销', '会计学', '法学', 'A', NULL),
(@pack_id, 15, '以下哪项最接近医院信息系统实施的高级年薪上限？', '30万', '40万', '65', '50万', 'C', NULL),
(@pack_id, 16, '医院信息系统实施不需要以下哪项能力？', '专业能力B', '无关能力', '专业能力C', '专业能力A', 'B', NULL),
(@pack_id, 17, '医院信息系统实施岗位要求掌握临床医学和软件工程的复合知识，这属于？', '纯技术岗位', '跨学科复合岗位', '纯管理岗位', '体力劳动岗位', 'B', NULL),
(@pack_id, 18, '以下哪项是医院信息系统实施的核心技能之一？', '雕塑艺术', '油画技法', '医疗流程', '矿物学', 'C', NULL),
(@pack_id, 19, '医院信息系统实施需要融合哪两个学科的知识？', '临床医学和软件工程', '历史和地理', '法学和医学', '艺术和体育', 'A', NULL),
(@pack_id, 20, '医院信息系统实施的岗位中，最高学历要求通常是什么？', '本科', '大专', '高中', '硕士', 'D', NULL),
(@pack_id, 21, '在1-5级工作强度体系中，医院信息系统实施属于哪一级？', '8级', '2', '6级', '0级', 'B', NULL),
(@pack_id, 22, '应聘医院信息系统实施，本科学历占比约为？', '90%', '20%', '70%', '100%', 'C', NULL),
(@pack_id, 23, '以下哪项是医院信息系统实施的核心技能之一？', '车床操作', '植物学', '钳工工艺', '医疗流程', 'D', NULL),
(@pack_id, 24, '专业107的岗位名称是？', 'AI算法专家', '机器学习工程师', '医院信息系统实施', '客户画像建模', 'C', NULL),
(@pack_id, 25, '医院信息系统实施属于以下哪个领域的岗位？', '纯体育', '纯艺术', '临床医学/软件工程复合领域', '纯文科', 'C', NULL),
(@pack_id, 26, '医院信息系统实施的竞争比是？', '5:1', '10:1', '12:1', '8:1', 'C', NULL),
(@pack_id, 27, '医院信息系统实施的工作强度评级为2，对应描述是？', '轻松', '一般', '中', '超负荷', 'C', NULL),
(@pack_id, 28, '医院信息系统实施的学历门槛是？', '无要求', '博士100%', '本科70% 硕士30%', '大专即可', 'C', NULL),
(@pack_id, 29, '医院信息系统实施对硕士学历的要求是？', '硕士0%', '硕士30%', '硕士20%', '硕士10%', 'B', NULL),
(@pack_id, 30, '医院信息系统实施的薪资结构中，初级岗位年薪约为？', '80-100万', '14-22', '5-10万', '3-5万', 'B', NULL),
(@pack_id, 31, '以下哪项是医院信息系统实施的核心技能之一？', '航空航天', '园艺设计', '钢琴演奏', 'HIS/EMR', 'D', NULL),
(@pack_id, 32, '医院信息系统实施的中级年薪范围是？', '200-250万', '25-38', '10-15万', '15-20万', 'B', NULL),
(@pack_id, 33, '以下哪项是医院信息系统实施的核心技能之一？', '采矿工程', 'HIS/EMR', '天文学', '地质学', 'B', NULL),
(@pack_id, 34, '以下哪个岗位名称与专业107对应？', '市场数据分析师', '风险建模专家', '国际金融分析师(CFA)', '医院信息系统实施', 'D', NULL),
(@pack_id, 35, '医院信息系统实施的职业发展路径通常从什么级别开始？', '合伙人', '顾问', '志愿者', '初级', 'D', NULL),
(@pack_id, 36, '医院信息系统实施的复合学科背景使其在就业市场上具有？', '竞争优势', '劣势', '被淘汰风险', '无影响', 'A', NULL),
(@pack_id, 37, '以下哪项是医院信息系统实施的核心技能之一？', '美容师', '拓扑学', '油画技法', '医疗流程', 'D', NULL),
(@pack_id, 38, '医院信息系统实施属于以下哪类岗位热度？', '中', '淘汰', '无热度', '冷门', 'A', NULL),
(@pack_id, 39, '医院信息系统实施的高级年薪范围是？', '20-30万', '250-300万', '200-250万', '45-65', 'D', NULL),
(@pack_id, 40, '以下哪项最符合医院信息系统实施的职业特点？', '纯体力型', '单一技能型', '跨学科复合型人才', '纯管理型', 'C', NULL),
(@pack_id, 41, '以下哪项是医院信息系统实施的核心技能之一？', '服装设计', '项目管理', '昆虫学', '版画制作', 'B', NULL),
(@pack_id, 42, '医院信息系统实施面试时最可能被考察的技能是？', '茶艺师', 'HIS/EMR', '矿物学', '美容师', 'B', NULL),
(@pack_id, 43, '以下哪项技能对医院信息系统实施的职业发展最重要？', '书法篆刻', 'HIS/EMR', '美容师', '地质学', 'B', NULL),
(@pack_id, 44, '以下哪项最接近医院信息系统实施的学历分布？', '本科100%', '硕士100%', '本科70% 硕士30%', '博士100%', 'C', NULL),
(@pack_id, 45, '医院信息系统实施的工作中不涉及以下哪项技能？', '项目管理', '医疗流程', '珠宝鉴定', 'HIS/EMR', 'C', NULL),
(@pack_id, 46, '以下哪个不是医院信息系统实施的别称？', '医院信息系统实施(资深)', '医院信息系统实施', '真实世界研究数据专家', '临床医学×软件工程专家', 'C', NULL),
(@pack_id, 47, '医院信息系统实施需要持续学习的原因是？', '技术更新快', '学习不重要', '学习有坏处', '无需学习', 'A', NULL),
(@pack_id, 48, '以下哪项是医院信息系统实施的交叉学科背景？', '临床医学×软件工程', '单一学科', '三个学科', '无学科要求', 'A', NULL),
(@pack_id, 49, '以下哪项是医院信息系统实施的核心技能之一？', '古生物学', '矿物学', '项目管理', '海洋学', 'C', NULL),
(@pack_id, 50, '医院信息系统实施在项目中最需要运用的能力是？', '书法篆刻', 'HIS/EMR', '焊接技术', '理发师', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业108：临床医学×软件工程 — 电子病历开发工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_swe:2', 108, '电子病历开发工程师', 'major_clinical', 'major_swe', '临床医学×软件工程', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是电子病历开发工程师的核心技能之一？', 'HL7标准', '茶艺师', '油画技法', '舞蹈编排', 'A', NULL),
(@pack_id, 2, '以下哪项是电子病历开发工程师的交叉学科背景？', '四个学科', '临床医学×软件工程', '单一学科', '三个学科', 'B', NULL),
(@pack_id, 3, '以下哪项最符合电子病历开发工程师的职业特点？', '跨学科复合型人才', '纯体力型', '无技能型', '纯管理型', 'A', NULL),
(@pack_id, 4, '电子病历开发工程师的竞争比18:1意味着？', '平均18人竞争1个岗位', '内部推荐即可', '1人竞争多个岗位', '自动录取', 'A', NULL),
(@pack_id, 5, '以下哪项最接近电子病历开发工程师的高级年薪上限？', '20万', '50万', '80', '40万', 'C', NULL),
(@pack_id, 6, '应聘电子病历开发工程师，本科学历占比约为？', '10%', '100%', '20%', '50%', 'D', NULL),
(@pack_id, 7, '电子病历开发工程师的工作中不涉及以下哪项技能？', '量子物理', '数据库', 'HL7标准', 'Java/C#', 'A', NULL),
(@pack_id, 8, '电子病历开发工程师的复合学科背景使其在就业市场上具有？', '劣势', '竞争优势', '被淘汰风险', '负面作用', 'B', NULL),
(@pack_id, 9, '以下哪项不是电子病历开发工程师的主要工作内容？', '系统设计', '财务报表审计', '代码编写', '技术方案', 'B', NULL),
(@pack_id, 10, '电子病历开发工程师的岗位竞争激烈程度为？', '2:1', '4:1', '18:1', '1:1', 'C', NULL),
(@pack_id, 11, '电子病历开发工程师在项目中最需要运用的能力是？', 'Java/C#', '矿物学', '园艺设计', '航空航天', 'A', NULL),
(@pack_id, 12, '以下哪项是电子病历开发工程师的核心技能之一？', '机械维修', '数据库', '考古学', '矿物学', 'B', NULL),
(@pack_id, 13, '应聘电子病历开发工程师时，平均多少人竞争1个岗位？', '18', '3人', '4人', '2人', 'A', NULL),
(@pack_id, 14, '以下哪项是电子病历开发工程师的核心技能之一？', '茶艺师', 'HL7标准', '采矿工程', '气象学', 'B', NULL),
(@pack_id, 15, '以下哪项是电子病历开发工程师的核心技能之一？', '铸造工艺', '考古学', 'HL7标准', '拓扑学', 'C', NULL),
(@pack_id, 16, '以下哪个岗位名称与专业108对应？', '电子病历开发工程师', '数据仓库工程师', '开发者关系工程师', '医药行业研究员', 'A', NULL),
(@pack_id, 17, '电子病历开发工程师的学科组合中，第一个学科是？', '市场营销', '会计学', '法学', '临床医学', 'D', NULL),
(@pack_id, 18, '以下哪项是电子病历开发工程师的核心技能之一？', '植物学', '拓扑学', '建筑工程', '数据库', 'D', NULL),
(@pack_id, 19, '在电子病历开发工程师的日常工作中，最常用的技能组合是？', '油画技法', '微生物学', '海洋学', 'Java/C#、HL7标准', 'D', NULL),
(@pack_id, 20, '以下哪项是电子病历开发工程师的核心技能之一？', '考古学', '气象学', '烹饪技术', 'Java/C#', 'D', NULL),
(@pack_id, 21, '以下哪项技能对电子病历开发工程师的职业发展最重要？', '微生物学', '舞蹈编排', 'Java/C#', '昆虫学', 'C', NULL),
(@pack_id, 22, '电子病历开发工程师属于以下哪类岗位热度？', '高', '极低', '淘汰', '冷门', 'A', NULL),
(@pack_id, 23, '以下哪个数字代表电子病历开发工程师的工作强度？', '0', '3', '6', '8', 'B', NULL),
(@pack_id, 24, '电子病历开发工程师的岗位中，最高学历要求通常是什么？', '硕士', '本科', '博士后', '高中', 'A', NULL),
(@pack_id, 25, '以下哪项是电子病历开发工程师的核心技能之一？', '古生物学', '建筑工程', 'Java/C#', '气象学', 'C', NULL),
(@pack_id, 26, '电子病历开发工程师面试时最可能被考察的技能是？', 'Java/C#', '焊接技术', '核工程', '铣床加工', 'A', NULL),
(@pack_id, 27, '电子病历开发工程师需要融合哪两个学科的知识？', '临床医学和软件工程', '金融和建筑', '法学和医学', '艺术和体育', 'A', NULL),
(@pack_id, 28, '电子病历开发工程师的职业发展路径通常从什么级别开始？', '合伙人', '初级', '实习生', '顾问', 'B', NULL),
(@pack_id, 29, '电子病历开发工程师的工作强度评级为3，对应描述是？', '繁忙', '高', '轻松', '超负荷', 'B', NULL),
(@pack_id, 30, '电子病历开发工程师的工作强度等级是？', '5', '2', '3', '4', 'C', NULL),
(@pack_id, 31, '专业108的岗位名称是？', '推荐系统产品经理', '营销技术专家(MarTech)', '技术文档写作', '电子病历开发工程师', 'D', NULL),
(@pack_id, 32, '电子病历开发工程师的学历门槛是？', '无要求', '本科50% 硕士50%', '高中即可', '博士100%', 'B', NULL),
(@pack_id, 33, '临床医学×软件工程交叉领域对应的岗位是？', '国际品牌策划', '电子病历开发工程师', '用户增长分析师', '营销技术专家(MarTech)', 'B', NULL),
(@pack_id, 34, '在1-5级工作强度体系中，电子病历开发工程师属于哪一级？', '7级', '0级', '6级', '3', 'D', NULL),
(@pack_id, 35, '以下哪个不是电子病历开发工程师的别称？', '医疗器械产品经理', '电子病历开发工程师', '临床医学×软件工程专家', '电子病历开发工程师(资深)', 'A', NULL),
(@pack_id, 36, '电子病历开发工程师需要持续学习的原因是？', '无需学习', '技术更新快', '学习有坏处', '学习不重要', 'B', NULL),
(@pack_id, 37, '以下哪个竞争比与电子病历开发工程师相符？', '18:1', '1:10', '1:5', '1:100', 'A', NULL),
(@pack_id, 38, '以下哪项是电子病历开发工程师的核心技能之一？', '植物学', '航空航天', 'Java/C#', '烹饪技术', 'C', NULL),
(@pack_id, 39, '电子病历开发工程师的工作强度属于？', '较高', '极高', '高', '极低', 'C', NULL),
(@pack_id, 40, '电子病历开发工程师属于哪个学科组合？', '法学×会计学', '电气工程×金融学', '临床医学×软件工程', '临床医学×数据科学', 'C', NULL),
(@pack_id, 41, '以下哪项最接近电子病历开发工程师的学历分布？', '高中100%', '本科100%', '本科50% 硕士50%', '硕士100%', 'C', NULL),
(@pack_id, 42, '电子病历开发工程师的中级年薪范围是？', '10-15万', '200-250万', '32-48', '15-20万', 'C', NULL),
(@pack_id, 43, '以下哪项是电子病历开发工程师的核心技能之一？', 'Java/C#', '烹饪技术', '量子物理', '钳工工艺', 'A', NULL),
(@pack_id, 44, '电子病历开发工程师的竞争比是？', '8:1', '5:1', '18:1', '10:1', 'C', NULL),
(@pack_id, 45, '电子病历开发工程师的薪资结构中，初级岗位年薪约为？', '18-28', '3-5万', '5-10万', '80-100万', 'A', NULL),
(@pack_id, 46, '以下哪个场景最符合电子病历开发工程师的工作环境？', '手术室', '技术办公室', '农田', '法庭', 'B', NULL),
(@pack_id, 47, '电子病历开发工程师属于以下哪个领域的岗位？', '临床医学/软件工程复合领域', '纯文科', '纯艺术', '纯体育', 'A', NULL),
(@pack_id, 48, '电子病历开发工程师的初级年薪范围是？', '5-8万', '100-150万', '18-28', '200-300万', 'C', NULL),
(@pack_id, 49, '电子病历开发工程师对硕士学历的要求是？', '硕士10%', '硕士0%', '硕士50%', '硕士20%', 'C', NULL),
(@pack_id, 50, '电子病历开发工程师的工作成果通常以什么形式呈现？', '油画', '服装', '雕塑', '软件/系统', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业109：临床医学×市场营销 — 医药代表
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_marketing:0', 109, '医药代表', 'major_clinical', 'major_marketing', '临床医学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医药代表的中级年薪范围是？', '150-200万', '15-20万', '200-250万', '30-50', 'D', NULL),
(@pack_id, 2, '以下哪项是医药代表的核心技能之一？', '珠宝鉴定', '销售技巧', '焊接技术', '机械维修', 'B', NULL),
(@pack_id, 3, '以下哪个数字代表医药代表的工作强度？', '7', '8', '4', '0', 'C', NULL),
(@pack_id, 4, '以下哪项是医药代表的核心技能之一？', '合规(RDPAC)', '钳工工艺', '焊接技术', '舞蹈编排', 'A', NULL),
(@pack_id, 5, '医药代表在项目中最需要运用的能力是？', '拓扑学', '铸造工艺', '烹饪技术', '医学知识', 'D', NULL),
(@pack_id, 6, '医药代表的岗位中，最高学历要求通常是什么？', '硕士', '大专', '本科', '博士后', 'A', NULL),
(@pack_id, 7, '以下哪项是医药代表的核心技能之一？', '雕塑艺术', '医学知识', '陶瓷工艺', '气象学', 'B', NULL),
(@pack_id, 8, '以下哪项是医药代表的核心技能之一？', '书法篆刻', '合规(RDPAC)', '石油钻探', '天文学', 'B', NULL),
(@pack_id, 9, '医药代表的高级年薪范围是？', '20-30万', '250-300万', '200-250万', '60-90', 'D', NULL),
(@pack_id, 10, '以下哪项是医药代表的核心技能之一？', '海洋学', '合规(RDPAC)', '焊接技术', '植物学', 'B', NULL),
(@pack_id, 11, '医药代表的工作中不涉及以下哪项技能？', '地质学', '合规(RDPAC)', '医学知识', '销售技巧', 'A', NULL),
(@pack_id, 12, '以下哪个岗位名称与专业109对应？', '医药代表', '交易系统开发', '国际金融分析师(CFA)', '医保精算师', 'A', NULL),
(@pack_id, 13, '医药代表属于哪个学科组合？', '临床医学×市场营销', '法学×会计学', '市场营销×英语', '电气工程×金融学', 'A', NULL),
(@pack_id, 14, '应聘医药代表，本科学历占比约为？', '85%', '20%', '10%', '90%', 'A', NULL),
(@pack_id, 15, '医药代表工作中最可能使用的工具是？', '钢琴', '专业工具', '挖掘机', '手术刀', 'B', NULL),
(@pack_id, 16, '医药代表的初级年薪范围是？', '15-25(提成)', '100-150万', '5-8万', '8-12万', 'A', NULL),
(@pack_id, 17, '以下哪项是医药代表的核心技能之一？', '服装设计', '医学知识', '珠宝鉴定', '版画制作', 'B', NULL),
(@pack_id, 18, '医药代表的竞争比是？', '8:1', '10:1', '15:1', '5:1', 'C', NULL),
(@pack_id, 19, '以下哪个不是医药代表的别称？', '医药代表', '海外营销专员', '临床医学×市场营销专家', '医药代表(高级)', 'B', NULL),
(@pack_id, 20, '医药代表的复合学科背景使其在就业市场上具有？', '竞争优势', '被淘汰风险', '无影响', '负面作用', 'A', NULL),
(@pack_id, 21, '以下哪项是医药代表的核心技能之一？', '拓扑学', '理发师', '昆虫学', '医学知识', 'D', NULL),
(@pack_id, 22, '专业109的岗位名称是？', '真实世界研究数据专家', '医药代表', '技术文档写作', 'SCI论文编辑', 'B', NULL),
(@pack_id, 23, '医药代表的学科组合中，第一个学科是？', '会计学', '市场营销', '法学', '临床医学', 'D', NULL),
(@pack_id, 24, '应聘医药代表时，平均多少人竞争1个岗位？', '4人', '5人', '2人', '15', 'D', NULL),
(@pack_id, 25, '医药代表的工作强度等级是？', '3', '5', '2', '4', 'D', NULL),
(@pack_id, 26, '在医药代表的日常工作中，最常用的技能组合是？', '油画技法', '海洋学', '医学知识、销售技巧', '矿物学', 'C', NULL),
(@pack_id, 27, '医药代表需要持续学习的原因是？', '学习不重要', '技术更新快', '学习有坏处', '学习内容少', 'B', NULL),
(@pack_id, 28, '在1-5级工作强度体系中，医药代表属于哪一级？', '7级', '8级', '4', '0级', 'C', NULL),
(@pack_id, 29, '医药代表面试时最可能被考察的技能是？', '医学知识', '钳工工艺', '茶艺师', '地质学', 'A', NULL),
(@pack_id, 30, '医药代表属于以下哪个领域的岗位？', '纯理科', '临床医学/市场营销复合领域', '纯艺术', '纯体育', 'B', NULL),
(@pack_id, 31, '以下哪项最符合医药代表的职业特点？', '跨学科复合型人才', '纯管理型', '无技能型', '纯体力型', 'A', NULL),
(@pack_id, 32, '医药代表属于以下哪类岗位热度？', '极低', '高', '冷门', '无热度', 'B', NULL),
(@pack_id, 33, '以下哪个场景最符合医药代表的工作环境？', '专业场所', '手术室', '农田', '法庭', 'A', NULL),
(@pack_id, 34, '医药代表的薪资结构中，初级岗位年薪约为？', '80-100万', '15-25(提成)', '5-10万', '3-5万', 'B', NULL),
(@pack_id, 35, '临床医学×市场营销交叉领域对应的岗位是？', 'DevOps工程师', '医药代表', '国际金融分析师(CFA)', 'AI算法专家', 'B', NULL),
(@pack_id, 36, '医药代表的学历门槛是？', '博士100%', '高中即可', '本科85% 硕士15%', '大专即可', 'C', NULL),
(@pack_id, 37, '医药代表的岗位竞争激烈程度为？', '1:1', '3:1', '15:1', '2:1', 'C', NULL),
(@pack_id, 38, '以下哪项是医药代表的交叉学科背景？', '单一学科', '三个学科', '四个学科', '临床医学×市场营销', 'D', NULL),
(@pack_id, 39, '医药代表的工作强度属于？', '较高', '中等', '较低', '极低', 'A', NULL),
(@pack_id, 40, '医药代表的竞争比15:1意味着？', '自动录取', '平均15人竞争1个岗位', '1人竞争多个岗位', '内部推荐即可', 'B', NULL),
(@pack_id, 41, '以下哪项是医药代表的核心技能之一？', '钳工工艺', '建筑工程', '理发师', '医学知识', 'D', NULL),
(@pack_id, 42, '医药代表的工作强度评级为4，对应描述是？', '轻松', '一般', '超负荷', '较高', 'D', NULL),
(@pack_id, 43, '以下哪项是医药代表的核心技能之一？', '销售技巧', '采矿工程', '植物学', '雕塑艺术', 'A', NULL),
(@pack_id, 44, '以下哪项技能对医药代表的职业发展最重要？', '昆虫学', '医学知识', '美容师', '书法篆刻', 'B', NULL),
(@pack_id, 45, '以下哪项最接近医药代表的学历分布？', '本科100%', '博士100%', '本科85% 硕士15%', '高中100%', 'C', NULL),
(@pack_id, 46, '医药代表的工作成果通常以什么形式呈现？', '食品', '建筑', '专业成果', '油画', 'C', NULL),
(@pack_id, 47, '以下哪项是医药代表的核心技能之一？', '地质学', '钳工工艺', '销售技巧', '航空航天', 'C', NULL),
(@pack_id, 48, '医药代表不需要以下哪项能力？', '专业能力C', '无关能力', '专业能力B', '专业能力A', 'B', NULL),
(@pack_id, 49, '以下哪个竞争比与医药代表相符？', '15:1', '1:100', '1:5', '1:10', 'A', NULL),
(@pack_id, 50, '以下哪项不是医药代表的主要工作内容？', '核心工作C', '核心工作A', '核心工作B', 'unrelated_work', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业110：临床医学×市场营销 — 医疗器械产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_marketing:1', 110, '医疗器械产品经理', 'major_clinical', 'major_marketing', '临床医学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医疗器械产品经理的竞争比是？', '5:1', '100:1', '8:1', '20:1', 'D', NULL),
(@pack_id, 2, '在1-5级工作强度体系中，医疗器械产品经理属于哪一级？', '3', '7级', '6级', '0级', 'A', NULL),
(@pack_id, 3, '医疗器械产品经理面试时最可能被考察的技能是？', '版画制作', '珠宝鉴定', '临床需求', '服装设计', 'C', NULL),
(@pack_id, 4, '医疗器械产品经理需要持续学习的原因是？', '学习不重要', '学习有坏处', '技术更新快', '无需学习', 'C', NULL),
(@pack_id, 5, '医疗器械产品经理的复合学科背景使其在就业市场上具有？', '被淘汰风险', '劣势', '负面作用', '竞争优势', 'D', NULL),
(@pack_id, 6, '医疗器械产品经理的薪资结构中，初级岗位年薪约为？', '5-10万', '18-28', '120-150万', '3-5万', 'B', NULL),
(@pack_id, 7, '以下哪项最接近医疗器械产品经理的学历分布？', '本科40% 硕士60%', '博士100%', '高中100%', '硕士100%', 'A', NULL),
(@pack_id, 8, '医疗器械产品经理的工作强度属于？', '高', '极高', '较高', '极低', 'A', NULL),
(@pack_id, 9, '以下哪项是医疗器械产品经理的核心技能之一？', '临床需求', '海洋学', '舞蹈编排', '气象学', 'A', NULL),
(@pack_id, 10, '在医疗器械产品经理的日常工作中，最常用的技能组合是？', '建筑工程', '海洋学', '矿物学', '临床需求、产品规划', 'D', NULL),
(@pack_id, 11, '以下哪项是医疗器械产品经理的核心技能之一？', '产品规划', '烹饪技术', '天文学', '油画技法', 'A', NULL),
(@pack_id, 12, '以下哪个竞争比与医疗器械产品经理相符？', '1:5', '1:10', '20:1', '1:20', 'C', NULL),
(@pack_id, 13, '医疗器械产品经理属于以下哪类岗位热度？', '极低', '无热度', '冷门', '高', 'D', NULL),
(@pack_id, 14, '医疗器械产品经理的高级年薪范围是？', '20-30万', '65-95', '200-250万', '30-40万', 'B', NULL),
(@pack_id, 15, '医疗器械产品经理需要融合哪两个学科的知识？', '临床医学和市场营销', '法学和医学', '艺术和体育', '金融和建筑', 'A', NULL),
(@pack_id, 16, '医疗器械产品经理属于以下哪个领域的岗位？', '纯文科', '纯体育', '纯理科', '临床医学/市场营销复合领域', 'D', NULL),
(@pack_id, 17, '医疗器械产品经理属于哪个学科组合？', '临床医学×市场营销', '临床医学×数据科学', '市场营销×英语', '法学×会计学', 'A', NULL),
(@pack_id, 18, '医疗器械产品经理工作中最可能使用的工具是？', '手术器械', '焊接设备', '办公软件', '纺织机', 'C', NULL),
(@pack_id, 19, '医疗器械产品经理的职业发展路径通常从什么级别开始？', '实习生', '志愿者', '初级', '合伙人', 'C', NULL),
(@pack_id, 20, '应聘医疗器械产品经理时，平均多少人竞争1个岗位？', '4人', '20', '3人', '2人', 'B', NULL),
(@pack_id, 21, '以下哪个不是医疗器械产品经理的别称？', '金融产品营销经理', '临床医学×市场营销专家', '医疗器械产品经理(高级)', '医疗器械产品经理(资深)', 'A', NULL),
(@pack_id, 22, '以下哪项是医疗器械产品经理的交叉学科背景？', '无学科要求', '四个学科', '三个学科', '临床医学×市场营销', 'D', NULL),
(@pack_id, 23, '应聘医疗器械产品经理，本科学历占比约为？', '40%', '90%', '100%', '20%', 'A', NULL),
(@pack_id, 24, '以下哪项是医疗器械产品经理的核心技能之一？', '古生物学', '临床需求', '陶瓷工艺', '版画制作', 'B', NULL),
(@pack_id, 25, '以下哪项是医疗器械产品经理的核心技能之一？', '量子物理', '美容师', '气象学', '临床需求', 'D', NULL),
(@pack_id, 26, '以下哪项是医疗器械产品经理的核心技能之一？', '铣床加工', '陶瓷工艺', '核工程', '临床需求', 'D', NULL),
(@pack_id, 27, '以下哪项最接近医疗器械产品经理的高级年薪上限？', '50万', '95', '20万', '40万', 'B', NULL),
(@pack_id, 28, '医疗器械产品经理的学历门槛是？', '高中即可', '大专即可', '博士100%', '本科40% 硕士60%', 'D', NULL),
(@pack_id, 29, '临床医学×市场营销交叉领域对应的岗位是？', '用户增长分析师', '医保精算师', '临床预测模型开发', '医疗器械产品经理', 'D', NULL),
(@pack_id, 30, '以下哪项是医疗器械产品经理的核心技能之一？', '石油钻探', '服装设计', '海洋学', '产品规划', 'D', NULL),
(@pack_id, 31, '以下哪项不是医疗器械产品经理的主要工作内容？', '客户沟通', '方案设计', '芯片制造', '数据分析', 'C', NULL),
(@pack_id, 32, '以下哪项技能对医疗器械产品经理的职业发展最重要？', '矿物学', '陶瓷工艺', '临床需求', '茶艺师', 'C', NULL),
(@pack_id, 33, '医疗器械产品经理的竞争比20:1意味着？', '平均20人竞争1个岗位', '1人竞争多个岗位', '无竞争', '内部推荐即可', 'A', NULL),
(@pack_id, 34, '以下哪项是医疗器械产品经理的核心技能之一？', '烹饪技术', '市场分析', '地质学', '理发师', 'B', NULL),
(@pack_id, 35, '以下哪个场景最符合医疗器械产品经理的工作环境？', '手术室', '办公室/会议室', '工厂车间', '农田', 'B', NULL),
(@pack_id, 36, '以下哪个岗位名称与专业110对应？', '投资者关系专员', '计算机双语教学', '医疗器械产品经理', '跨境并购翻译', 'C', NULL),
(@pack_id, 37, '医疗器械产品经理不需要以下哪项能力？', '分析能力', '沟通能力', '写作能力', '机械操作', 'D', NULL),
(@pack_id, 38, '专业110的岗位名称是？', '跨境电商运营', '医疗器械产品经理', '软件本地化工程师', '国际医疗协调员', 'B', NULL),
(@pack_id, 39, '医疗器械产品经理的工作强度等级是？', '2', '4', '5', '3', 'D', NULL),
(@pack_id, 40, '医疗器械产品经理的初级年薪范围是？', '18-28', '100-150万', '200-300万', '8-12万', 'A', NULL),
(@pack_id, 41, '医疗器械产品经理在项目中最需要运用的能力是？', '书法篆刻', '临床需求', '版画制作', '矿物学', 'B', NULL),
(@pack_id, 42, '医疗器械产品经理的工作强度评级为3，对应描述是？', '轻松', '超负荷', '高', '繁忙', 'C', NULL),
(@pack_id, 43, '以下哪项是医疗器械产品经理的核心技能之一？', '采矿工程', '海洋学', '陶瓷工艺', '产品规划', 'D', NULL),
(@pack_id, 44, '以下哪项是医疗器械产品经理的核心技能之一？', '陶瓷工艺', '气象学', '市场分析', '天文学', 'C', NULL),
(@pack_id, 45, '以下哪项是医疗器械产品经理的核心技能之一？', '石油钻探', '机械维修', '烹饪技术', '市场分析', 'D', NULL),
(@pack_id, 46, '医疗器械产品经理的岗位竞争激烈程度为？', '4:1', '3:1', '20:1', '2:1', 'C', NULL),
(@pack_id, 47, '医疗器械产品经理的岗位中，最高学历要求通常是什么？', '大专', '硕士', '本科', '高中', 'B', NULL),
(@pack_id, 48, '医疗器械产品经理对硕士学历的要求是？', '硕士20%', '硕士0%', '硕士10%', '硕士60%', 'D', NULL),
(@pack_id, 49, '医疗器械产品经理的工作成果通常以什么形式呈现？', '药品', '食品', '建筑', '方案/报告', 'D', NULL),
(@pack_id, 50, '医疗器械产品经理岗位要求掌握临床医学和市场营销的复合知识，这属于？', '纯技术岗位', '单一学科岗位', '体力劳动岗位', '跨学科复合岗位', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业111：临床医学×市场营销 — 医疗市场专员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_marketing:2', 111, '医疗市场专员', 'major_clinical', 'major_marketing', '临床医学×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '医疗市场专员不需要以下哪项能力？', '分析能力', '机械操作', '沟通能力', '写作能力', 'B', NULL),
(@pack_id, 2, '应聘医疗市场专员时，平均多少人竞争1个岗位？', '5人', '3人', '2人', '10', 'D', NULL),
(@pack_id, 3, '以下哪个数字代表医疗市场专员的工作强度？', '7', '2', '0', '8', 'B', NULL),
(@pack_id, 4, '医疗市场专员的岗位中，最高学历要求通常是什么？', '本科', '硕士', '高中', '大专', 'B', NULL),
(@pack_id, 5, '医疗市场专员的工作强度等级是？', '1', '4', '3', '2', 'D', NULL),
(@pack_id, 6, '以下哪项是医疗市场专员的核心技能之一？', '量子物理', '天文学', '石油钻探', '活动策划', 'D', NULL),
(@pack_id, 7, '医疗市场专员的工作强度评级为2，对应描述是？', '中', '轻松', '超负荷', '繁忙', 'A', NULL),
(@pack_id, 8, '以下哪项是医疗市场专员的核心技能之一？', '铸造工艺', '书法篆刻', '医学基础', '雕塑艺术', 'C', NULL),
(@pack_id, 9, '医疗市场专员的中级年薪范围是？', '150-200万', '200-250万', '22-32', '10-15万', 'C', NULL),
(@pack_id, 10, '医疗市场专员的工作成果通常以什么形式呈现？', '食品', '方案/报告', '建筑', '药品', 'B', NULL),
(@pack_id, 11, '以下哪项最接近医疗市场专员的高级年薪上限？', '20万', '50万', '30万', '55', 'D', NULL),
(@pack_id, 12, '以下哪项是医疗市场专员的交叉学科背景？', '临床医学×市场营销', '三个学科', '单一学科', '四个学科', 'A', NULL),
(@pack_id, 13, '以下哪项最符合医疗市场专员的职业特点？', '纯体力型', '跨学科复合型人才', '单一技能型', '纯管理型', 'B', NULL),
(@pack_id, 14, '医疗市场专员需要融合哪两个学科的知识？', '艺术和体育', '临床医学和市场营销', '法学和医学', '金融和建筑', 'B', NULL),
(@pack_id, 15, '医疗市场专员的竞争比10:1意味着？', '1人竞争多个岗位', '内部推荐即可', '自动录取', '平均10人竞争1个岗位', 'D', NULL),
(@pack_id, 16, '医疗市场专员的职业发展路径通常从什么级别开始？', '初级', '实习生', '志愿者', '顾问', 'A', NULL),
(@pack_id, 17, '应聘医疗市场专员，本科学历占比约为？', '100%', '20%', '80%', '90%', 'C', NULL),
(@pack_id, 18, '以下哪项是医疗市场专员的核心技能之一？', '油画技法', '美容师', '烹饪技术', '市场调研', 'D', NULL),
(@pack_id, 19, '以下哪项是医疗市场专员的核心技能之一？', '油画技法', '陶瓷工艺', '拓扑学', '活动策划', 'D', NULL),
(@pack_id, 20, '医疗市场专员的高级年薪范围是？', '40-55', '30-40万', '200-250万', '250-300万', 'A', NULL),
(@pack_id, 21, '以下哪个场景最符合医疗市场专员的工作环境？', '手术室', '农田', '工厂车间', '办公室/会议室', 'D', NULL),
(@pack_id, 22, '医疗市场专员属于以下哪个领域的岗位？', '纯体育', '纯理科', '纯艺术', '临床医学/市场营销复合领域', 'D', NULL),
(@pack_id, 23, '医疗市场专员的复合学科背景使其在就业市场上具有？', '被淘汰风险', '竞争优势', '负面作用', '无影响', 'B', NULL),
(@pack_id, 24, '以下哪项是医疗市场专员的核心技能之一？', '昆虫学', '活动策划', '航空航天', '拓扑学', 'B', NULL),
(@pack_id, 25, '在医疗市场专员的日常工作中，最常用的技能组合是？', '市场调研、活动策划', '机械维修', '陶瓷工艺', '考古学', 'A', NULL),
(@pack_id, 26, '医疗市场专员的竞争比是？', '5:1', '100:1', '8:1', '10:1', 'D', NULL),
(@pack_id, 27, '在1-5级工作强度体系中，医疗市场专员属于哪一级？', '7级', '8级', '2', '0级', 'C', NULL),
(@pack_id, 28, '医疗市场专员属于以下哪类岗位热度？', '淘汰', '极低', '中', '无热度', 'C', NULL),
(@pack_id, 29, '以下哪项最接近医疗市场专员的学历分布？', '本科100%', '本科80% 硕士20%', '博士100%', '硕士100%', 'B', NULL),
(@pack_id, 30, '医疗市场专员的学历门槛是？', '高中即可', '大专即可', '本科80% 硕士20%', '无要求', 'C', NULL),
(@pack_id, 31, '以下哪个岗位名称与专业111对应？', '医疗市场专员', '开发者关系工程师', '机器学习工程师', '国际金融分析师(CFA)', 'A', NULL),
(@pack_id, 32, '以下哪项是医疗市场专员的核心技能之一？', '钢琴演奏', '医学基础', '海洋学', '版画制作', 'B', NULL),
(@pack_id, 33, '医疗市场专员的薪资结构中，初级岗位年薪约为？', '120-150万', '12-18', '5-10万', '3-5万', 'B', NULL),
(@pack_id, 34, '以下哪项不是医疗市场专员的主要工作内容？', '芯片制造', '数据分析', '客户沟通', '方案设计', 'A', NULL),
(@pack_id, 35, '以下哪项是医疗市场专员的核心技能之一？', '茶艺师', '矿物学', '采矿工程', '市场调研', 'D', NULL),
(@pack_id, 36, '医疗市场专员面试时最可能被考察的技能是？', '市场调研', '版画制作', '拓扑学', '建筑工程', 'A', NULL),
(@pack_id, 37, '以下哪个不是医疗市场专员的别称？', '临床医学×市场营销专家', '国际金融分析师(CFA)', '医疗市场专员(资深)', '医疗市场专员(高级)', 'B', NULL),
(@pack_id, 38, '以下哪项技能对医疗市场专员的职业发展最重要？', '建筑工程', '微生物学', '古生物学', '市场调研', 'D', NULL),
(@pack_id, 39, '医疗市场专员的工作强度属于？', '较低', '中等', '中', '极低', 'C', NULL),
(@pack_id, 40, '医疗市场专员需要持续学习的原因是？', '技术更新快', '学习有坏处', '学习内容少', '学习不重要', 'A', NULL),
(@pack_id, 41, '医疗市场专员工作中最可能使用的工具是？', '焊接设备', '纺织机', '办公软件', '手术器械', 'C', NULL),
(@pack_id, 42, '医疗市场专员岗位要求掌握临床医学和市场营销的复合知识，这属于？', '单一学科岗位', '纯技术岗位', '体力劳动岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 43, '医疗市场专员的岗位竞争激烈程度为？', '1:1', '10:1', '3:1', '4:1', 'B', NULL),
(@pack_id, 44, '医疗市场专员的学科组合中，第一个学科是？', '市场营销', '法学', '临床医学', '数据科学', 'C', NULL),
(@pack_id, 45, '医疗市场专员属于哪个学科组合？', '法学×会计学', '市场营销×英语', '临床医学×市场营销', '电气工程×金融学', 'C', NULL),
(@pack_id, 46, '以下哪项是医疗市场专员的核心技能之一？', '天文学', '市场调研', '量子物理', '钢琴演奏', 'B', NULL),
(@pack_id, 47, '医疗市场专员的初级年薪范围是？', '200-300万', '8-12万', '12-18', '100-150万', 'C', NULL),
(@pack_id, 48, '医疗市场专员的工作中不涉及以下哪项技能？', '医学基础', '活动策划', '市场调研', '铸造工艺', 'D', NULL),
(@pack_id, 49, '以下哪项是医疗市场专员的核心技能之一？', '考古学', '焊接技术', '服装设计', '医学基础', 'D', NULL),
(@pack_id, 50, '临床医学×市场营销交叉领域对应的岗位是？', 'SEO/SEM策略师', '医疗市场专员', 'SCI论文编辑', '医院信息系统实施', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业112：临床医学×数据科学 — 生物信息分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_ds:0', 112, '生物信息分析师', 'major_clinical', 'major_ds', '临床医学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是生物信息分析师的核心技能之一？', '微生物学', '版画制作', '核工程', '基因组学', 'D', NULL),
(@pack_id, 2, '生物信息分析师的职业发展路径通常从什么级别开始？', '实习生', '顾问', '初级', '志愿者', 'C', NULL),
(@pack_id, 3, '以下哪项是生物信息分析师的核心技能之一？', '航空航天', '钳工工艺', '基因组学', '钢琴演奏', 'C', NULL),
(@pack_id, 4, '临床医学×数据科学交叉领域对应的岗位是？', '医疗市场专员', '生物信息分析师', '客户画像建模', '金融产品营销经理', 'B', NULL),
(@pack_id, 5, '生物信息分析师需要持续学习的原因是？', '无需学习', '学习有坏处', '学习不重要', '技术更新快', 'D', NULL),
(@pack_id, 6, '生物信息分析师的薪资结构中，初级岗位年薪约为？', '120-150万', '20-30', '80-100万', '5-10万', 'B', NULL),
(@pack_id, 7, '以下哪项最接近生物信息分析师的学历分布？', '本科20% 硕士80%', '博士100%', '硕士100%', '高中100%', 'A', NULL),
(@pack_id, 8, '生物信息分析师的中级年薪范围是？', '15-20万', '35-55', '150-200万', '10-15万', 'B', NULL),
(@pack_id, 9, '生物信息分析师的岗位中，最高学历要求通常是什么？', '高中', '博士后', '硕士', '大专', 'C', NULL),
(@pack_id, 10, '以下哪项是生物信息分析师的核心技能之一？', '油画技法', '海洋学', '焊接技术', 'Python/R', 'D', NULL),
(@pack_id, 11, '以下哪项是生物信息分析师的核心技能之一？', '书法篆刻', '统计', '采矿工程', '气象学', 'B', NULL),
(@pack_id, 12, '以下哪项是生物信息分析师的核心技能之一？', '服装设计', '烹饪技术', '茶艺师', '统计', 'D', NULL),
(@pack_id, 13, '生物信息分析师属于以下哪个领域的岗位？', '纯艺术', '纯理科', '纯文科', '临床医学/数据科学复合领域', 'D', NULL),
(@pack_id, 14, '以下哪项不是生物信息分析师的主要工作内容？', '产品制造', '模型构建', '数据收集', '趋势分析', 'A', NULL),
(@pack_id, 15, '生物信息分析师的岗位竞争激烈程度为？', '25:1', '4:1', '3:1', '2:1', 'A', NULL),
(@pack_id, 16, '生物信息分析师的竞争比25:1意味着？', '1人竞争多个岗位', '自动录取', '内部推荐即可', '平均25人竞争1个岗位', 'D', NULL),
(@pack_id, 17, '生物信息分析师在项目中最需要运用的能力是？', '量子物理', '服装设计', '理发师', 'Python/R', 'D', NULL),
(@pack_id, 18, '生物信息分析师需要融合哪两个学科的知识？', '临床医学和数据科学', '法学和医学', '艺术和体育', '金融和建筑', 'A', NULL),
(@pack_id, 19, '在生物信息分析师的日常工作中，最常用的技能组合是？', '烹饪技术', '古生物学', 'Python/R、基因组学', '机械维修', 'C', NULL),
(@pack_id, 20, '生物信息分析师的学科组合中，第一个学科是？', '市场营销', '临床医学', '数据科学', '会计学', 'B', NULL),
(@pack_id, 21, '生物信息分析师的工作中不涉及以下哪项技能？', '气象学', '统计', '基因组学', 'Python/R', 'A', NULL),
(@pack_id, 22, '以下哪个岗位名称与专业112对应？', '技术产品经理', '生物信息分析师', '机器学习平台开发', '跨境电商运营', 'B', NULL),
(@pack_id, 23, '以下哪项是生物信息分析师的核心技能之一？', '统计', '油画技法', '地质学', '陶瓷工艺', 'A', NULL),
(@pack_id, 24, '以下哪项最接近生物信息分析师的高级年薪上限？', '30万', '90', '50万', '40万', 'B', NULL),
(@pack_id, 25, '生物信息分析师工作中最可能使用的工具是？', '挖掘机', '数据分析软件', '手术刀', '钢琴', 'B', NULL),
(@pack_id, 26, '生物信息分析师的工作强度属于？', '中等', '极高', '高', '较高', 'C', NULL),
(@pack_id, 27, '以下哪项技能对生物信息分析师的职业发展最重要？', 'Python/R', '服装设计', '海洋学', '铣床加工', 'A', NULL),
(@pack_id, 28, '以下哪项是生物信息分析师的交叉学科背景？', '无学科要求', '临床医学×数据科学', '三个学科', '单一学科', 'B', NULL),
(@pack_id, 29, '生物信息分析师的初级年薪范围是？', '8-12万', '5-8万', '100-150万', '20-30', 'D', NULL),
(@pack_id, 30, '生物信息分析师面试时最可能被考察的技能是？', '天文学', 'Python/R', '舞蹈编排', '建筑工程', 'B', NULL),
(@pack_id, 31, '以下哪个竞争比与生物信息分析师相符？', '25:1', '1:5', '1:10', '1:20', 'A', NULL),
(@pack_id, 32, '生物信息分析师对硕士学历的要求是？', '硕士50%', '硕士80%', '硕士10%', '硕士20%', 'B', NULL),
(@pack_id, 33, '以下哪项是生物信息分析师的核心技能之一？', '焊接技术', '机械维修', 'Python/R', '珠宝鉴定', 'C', NULL),
(@pack_id, 34, '生物信息分析师的竞争比是？', '10:1', '100:1', '25:1', '8:1', 'C', NULL),
(@pack_id, 35, '在1-5级工作强度体系中，生物信息分析师属于哪一级？', '6级', '3', '8级', '0级', 'B', NULL),
(@pack_id, 36, '应聘生物信息分析师时，平均多少人竞争1个岗位？', '4人', '3人', '5人', '25', 'D', NULL),
(@pack_id, 37, '专业112的岗位名称是？', '金融数据分析师', '生物信息分析师', '海外数据竞赛选手', '医学翻译', 'B', NULL),
(@pack_id, 38, '应聘生物信息分析师，本科学历占比约为？', '100%', '20%', '90%', '10%', 'B', NULL),
(@pack_id, 39, '生物信息分析师的学历门槛是？', '高中即可', '本科20% 硕士80%', '博士100%', '无要求', 'B', NULL),
(@pack_id, 40, '以下哪项最符合生物信息分析师的职业特点？', '纯管理型', '无技能型', '跨学科复合型人才', '单一技能型', 'C', NULL),
(@pack_id, 41, '生物信息分析师的复合学科背景使其在就业市场上具有？', '负面作用', '被淘汰风险', '竞争优势', '劣势', 'C', NULL),
(@pack_id, 42, '生物信息分析师属于以下哪类岗位热度？', '高', '冷门', '淘汰', '无热度', 'A', NULL),
(@pack_id, 43, '以下哪个数字代表生物信息分析师的工作强度？', '0', '7', '8', '3', 'D', NULL),
(@pack_id, 44, '生物信息分析师的高级年薪范围是？', '60-90', '20-30万', '30-40万', '200-250万', 'A', NULL),
(@pack_id, 45, '生物信息分析师的工作强度评级为3，对应描述是？', '高', '繁忙', '一般', '轻松', 'A', NULL),
(@pack_id, 46, '以下哪项是生物信息分析师的核心技能之一？', '钢琴演奏', 'Python/R', '舞蹈编排', '海洋学', 'B', NULL),
(@pack_id, 47, '以下哪项是生物信息分析师的核心技能之一？', '气象学', '雕塑艺术', '微生物学', '基因组学', 'D', NULL),
(@pack_id, 48, '生物信息分析师不需要以下哪项能力？', '软件操作', '手工焊接', '数学能力', '逻辑思维', 'B', NULL),
(@pack_id, 49, '以下哪个场景最符合生物信息分析师的工作环境？', '数据分析室', '农田', '手术室', '法庭', 'A', NULL),
(@pack_id, 50, '以下哪个不是生物信息分析师的别称？', '交易系统开发', '生物信息分析师(资深)', '临床医学×数据科学专家', '生物信息分析师', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业113：临床医学×数据科学 — 真实世界研究数据专家
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_ds:1', 113, '真实世界研究数据专家', 'major_clinical', 'major_ds', '临床医学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '应聘真实世界研究数据专家，本科学历占比约为？', '10%', '100%', '20%', '90%', 'C', NULL),
(@pack_id, 2, '真实世界研究数据专家的竞争比是？', '100:1', '20:1', '5:1', '10:1', 'B', NULL),
(@pack_id, 3, '以下哪个岗位名称与专业113对应？', '国际品牌策划', '真实世界研究数据专家', '机器学习平台开发', '国际金融分析师(CFA)', 'B', NULL),
(@pack_id, 4, '以下哪个数字代表真实世界研究数据专家的工作强度？', '8', '0', '3', '7', 'C', NULL),
(@pack_id, 5, '真实世界研究数据专家的学科组合中，第一个学科是？', '会计学', '市场营销', '数据科学', '临床医学', 'D', NULL),
(@pack_id, 6, '真实世界研究数据专家属于以下哪类岗位热度？', '淘汰', '极低', '冷门', '高', 'D', NULL),
(@pack_id, 7, '以下哪项是真实世界研究数据专家的交叉学科背景？', '单一学科', '四个学科', '临床医学×数据科学', '三个学科', 'C', NULL),
(@pack_id, 8, '以下哪项是真实世界研究数据专家的核心技能之一？', '钢琴演奏', 'SAS', '考古学', '海洋学', 'B', NULL),
(@pack_id, 9, '真实世界研究数据专家的高级年薪范围是？', '200-250万', '75-110', '30-40万', '250-300万', 'B', NULL),
(@pack_id, 10, '真实世界研究数据专家的岗位中，最高学历要求通常是什么？', '本科', '硕士', '大专', '高中', 'B', NULL),
(@pack_id, 11, '真实世界研究数据专家的岗位竞争激烈程度为？', '2:1', '3:1', '1:1', '20:1', 'D', NULL),
(@pack_id, 12, '真实世界研究数据专家的职业发展路径通常从什么级别开始？', '初级', '实习生', '合伙人', '志愿者', 'A', NULL),
(@pack_id, 13, '真实世界研究数据专家的学历门槛是？', '博士100%', '高中即可', '本科20% 硕士80%', '大专即可', 'C', NULL),
(@pack_id, 14, '以下哪个场景最符合真实世界研究数据专家的工作环境？', '农田', '法庭', '专业场所', '手术室', 'C', NULL),
(@pack_id, 15, '真实世界研究数据专家的薪资结构中，初级岗位年薪约为？', '80-100万', '22-35', '3-5万', '5-10万', 'B', NULL),
(@pack_id, 16, '真实世界研究数据专家面试时最可能被考察的技能是？', '茶艺师', 'RWE', '地质学', '钢琴演奏', 'B', NULL),
(@pack_id, 17, '真实世界研究数据专家的工作中不涉及以下哪项技能？', 'SAS', '流行病学', 'RWE', '理发师', 'D', NULL),
(@pack_id, 18, '真实世界研究数据专家岗位要求掌握临床医学和数据科学的复合知识，这属于？', '纯管理岗位', '单一学科岗位', '纯技术岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 19, '专业113的岗位名称是？', 'DevOps工程师', '技术文档工程师', '医疗软件产品经理', '真实世界研究数据专家', 'D', NULL),
(@pack_id, 20, '真实世界研究数据专家的初级年薪范围是？', '100-150万', '22-35', '8-12万', '200-300万', 'B', NULL),
(@pack_id, 21, '真实世界研究数据专家的竞争比20:1意味着？', '无竞争', '平均20人竞争1个岗位', '1人竞争多个岗位', '内部推荐即可', 'B', NULL),
(@pack_id, 22, '以下哪项是真实世界研究数据专家的核心技能之一？', '流行病学', '考古学', '机械维修', '理发师', 'A', NULL),
(@pack_id, 23, '以下哪项最接近真实世界研究数据专家的学历分布？', '本科20% 硕士80%', '本科100%', '硕士100%', '高中100%', 'A', NULL),
(@pack_id, 24, '真实世界研究数据专家的工作成果通常以什么形式呈现？', '食品', '油画', '专业成果', '建筑', 'C', NULL),
(@pack_id, 25, '真实世界研究数据专家的工作强度属于？', '极高', '高', '较高', '极低', 'B', NULL),
(@pack_id, 26, '以下哪项最接近真实世界研究数据专家的高级年薪上限？', '40万', '110', '20万', '30万', 'B', NULL),
(@pack_id, 27, '真实世界研究数据专家的复合学科背景使其在就业市场上具有？', '被淘汰风险', '负面作用', '竞争优势', '劣势', 'C', NULL),
(@pack_id, 28, '真实世界研究数据专家需要融合哪两个学科的知识？', '临床医学和数据科学', '艺术和体育', '历史和地理', '金融和建筑', 'A', NULL),
(@pack_id, 29, '以下哪项是真实世界研究数据专家的核心技能之一？', '陶瓷工艺', '车床操作', '流行病学', '气象学', 'C', NULL),
(@pack_id, 30, '真实世界研究数据专家工作中最可能使用的工具是？', '钢琴', '手术刀', '挖掘机', '专业工具', 'D', NULL),
(@pack_id, 31, '真实世界研究数据专家的中级年薪范围是？', '42-65', '15-20万', '200-250万', '10-15万', 'A', NULL),
(@pack_id, 32, '真实世界研究数据专家需要持续学习的原因是？', '技术更新快', '无需学习', '学习有坏处', '学习内容少', 'A', NULL),
(@pack_id, 33, '在真实世界研究数据专家的日常工作中，最常用的技能组合是？', '车床操作', '气象学', 'RWE、流行病学', '机械维修', 'C', NULL),
(@pack_id, 34, '以下哪项是真实世界研究数据专家的核心技能之一？', '油画技法', '数据清洗', '古生物学', '机械维修', 'B', NULL),
(@pack_id, 35, '真实世界研究数据专家不需要以下哪项能力？', '专业能力A', '专业能力B', '无关能力', '专业能力C', 'C', NULL),
(@pack_id, 36, '以下哪项是真实世界研究数据专家的核心技能之一？', '服装设计', '机械维修', 'RWE', '微生物学', 'C', NULL),
(@pack_id, 37, '以下哪项是真实世界研究数据专家的核心技能之一？', '园艺设计', '书法篆刻', '茶艺师', 'SAS', 'D', NULL),
(@pack_id, 38, '以下哪个竞争比与真实世界研究数据专家相符？', '1:5', '20:1', '1:100', '1:10', 'B', NULL),
(@pack_id, 39, '以下哪项是真实世界研究数据专家的核心技能之一？', '书法篆刻', '拓扑学', 'RWE', '铣床加工', 'C', NULL),
(@pack_id, 40, '真实世界研究数据专家属于以下哪个领域的岗位？', '临床医学/数据科学复合领域', '纯体育', '纯艺术', '纯理科', 'A', NULL),
(@pack_id, 41, '以下哪个不是真实世界研究数据专家的别称？', '国际金融分析师(CFA)', '真实世界研究数据专家(高级)', '真实世界研究数据专家(资深)', '真实世界研究数据专家', 'A', NULL),
(@pack_id, 42, '真实世界研究数据专家的工作强度评级为3，对应描述是？', '轻松', '繁忙', '高', '一般', 'C', NULL),
(@pack_id, 43, '以下哪项是真实世界研究数据专家的核心技能之一？', '考古学', '茶艺师', '烹饪技术', '流行病学', 'D', NULL),
(@pack_id, 44, '以下哪项是真实世界研究数据专家的核心技能之一？', '焊接技术', '植物学', '钢琴演奏', 'RWE', 'D', NULL),
(@pack_id, 45, '以下哪项不是真实世界研究数据专家的主要工作内容？', '核心工作B', '核心工作A', '核心工作C', 'unrelated_work', 'D', NULL),
(@pack_id, 46, '应聘真实世界研究数据专家时，平均多少人竞争1个岗位？', '20', '3人', '4人', '5人', 'A', NULL),
(@pack_id, 47, '以下哪项最符合真实世界研究数据专家的职业特点？', '无技能型', '纯管理型', '跨学科复合型人才', '单一技能型', 'C', NULL),
(@pack_id, 48, '真实世界研究数据专家的工作强度等级是？', '4', '1', '3', '5', 'C', NULL),
(@pack_id, 49, '临床医学×数据科学交叉领域对应的岗位是？', '数据仓库工程师', '数据平台开发工程师', '真实世界研究数据专家', '国际金融分析师(CFA)', 'C', NULL),
(@pack_id, 50, '在1-5级工作强度体系中，真实世界研究数据专家属于哪一级？', '8级', '7级', '3', '6级', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业114：临床医学×数据科学 — 临床预测模型开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_ds:2', 114, '临床预测模型开发', 'major_clinical', 'major_ds', '临床医学×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '临床预测模型开发的工作中不涉及以下哪项技能？', '临床知识', '机器学习', '珠宝鉴定', '模型验证', 'C', NULL),
(@pack_id, 2, '临床预测模型开发岗位要求掌握临床医学和数据科学的复合知识，这属于？', '跨学科复合岗位', '单一学科岗位', '纯管理岗位', '纯技术岗位', 'A', NULL),
(@pack_id, 3, '临床预测模型开发的工作成果通常以什么形式呈现？', '油画', '软件/系统', '雕塑', '服装', 'B', NULL),
(@pack_id, 4, '应聘临床预测模型开发时，平均多少人竞争1个岗位？', '5人', '4人', '25', '2人', 'C', NULL),
(@pack_id, 5, '临床预测模型开发的岗位中，最高学历要求通常是什么？', '硕士', '本科', '大专', '博士后', 'A', NULL),
(@pack_id, 6, '临床预测模型开发的工作强度属于？', '高', '极低', '极高', '较高', 'A', NULL),
(@pack_id, 7, '临床预测模型开发工作中最可能使用的设备是？', '钢琴', '手术刀', '挖掘机', '计算机', 'D', NULL),
(@pack_id, 8, '临床预测模型开发属于哪个学科组合？', '电气工程×金融学', '市场营销×英语', '法学×会计学', '临床医学×数据科学', 'D', NULL),
(@pack_id, 9, '临床预测模型开发的职业发展路径通常从什么级别开始？', '合伙人', '顾问', '志愿者', '初级', 'D', NULL),
(@pack_id, 10, '以下哪个竞争比与临床预测模型开发相符？', '1:10', '1:100', '25:1', '1:20', 'C', NULL),
(@pack_id, 11, '以下哪项技能对临床预测模型开发的职业发展最重要？', '烹饪技术', '茶艺师', '核工程', '机器学习', 'D', NULL),
(@pack_id, 12, '以下哪项是临床预测模型开发的核心技能之一？', '量子物理', '古生物学', '茶艺师', '机器学习', 'D', NULL),
(@pack_id, 13, '临床医学×数据科学交叉领域对应的岗位是？', '开发者关系工程师', '财富管理顾问', '临床预测模型开发', '软件售前顾问', 'C', NULL),
(@pack_id, 14, '临床预测模型开发的学科组合中，第一个学科是？', '市场营销', '数据科学', '会计学', '临床医学', 'D', NULL),
(@pack_id, 15, '以下哪项是临床预测模型开发的核心技能之一？', '理发师', '机器学习', '核工程', '车床操作', 'B', NULL),
(@pack_id, 16, '以下哪项是临床预测模型开发的核心技能之一？', '钳工工艺', '车床操作', '采矿工程', '机器学习', 'D', NULL),
(@pack_id, 17, '临床预测模型开发需要融合哪两个学科的知识？', '历史和地理', '艺术和体育', '金融和建筑', '临床医学和数据科学', 'D', NULL),
(@pack_id, 18, '以下哪项最接近临床预测模型开发的高级年薪上限？', '40万', '20万', '100', '50万', 'C', NULL),
(@pack_id, 19, '应聘临床预测模型开发，本科学历占比约为？', '90%', '10%', '20%', '100%', 'B', NULL),
(@pack_id, 20, '以下哪个岗位名称与专业114对应？', '财富管理顾问', '海外营销专员', '临床预测模型开发', '用户增长分析师', 'C', NULL),
(@pack_id, 21, '临床预测模型开发的学历门槛是？', '高中即可', '大专即可', '本科10% 硕士90%', '无要求', 'C', NULL),
(@pack_id, 22, '临床预测模型开发的初级年薪范围是？', '200-300万', '20-32', '8-12万', '5-8万', 'B', NULL),
(@pack_id, 23, '以下哪项是临床预测模型开发的核心技能之一？', '植物学', '模型验证', '烹饪技术', '地质学', 'B', NULL),
(@pack_id, 24, '临床预测模型开发面试时最可能被考察的技能是？', '服装设计', '烹饪技术', '茶艺师', '机器学习', 'D', NULL),
(@pack_id, 25, '临床预测模型开发属于以下哪个领域的岗位？', '纯理科', '临床医学/数据科学复合领域', '纯艺术', '纯文科', 'B', NULL),
(@pack_id, 26, '在1-5级工作强度体系中，临床预测模型开发属于哪一级？', '3', '7级', '6级', '0级', 'A', NULL),
(@pack_id, 27, '在临床预测模型开发的日常工作中，最常用的技能组合是？', '微生物学', '陶瓷工艺', '机器学习、临床知识', '航空航天', 'C', NULL),
(@pack_id, 28, '以下哪项是临床预测模型开发的核心技能之一？', '核工程', '模型验证', '量子物理', '天文学', 'B', NULL),
(@pack_id, 29, '临床预测模型开发在项目中最需要运用的能力是？', '矿物学', '机器学习', '采矿工程', '考古学', 'B', NULL),
(@pack_id, 30, '临床预测模型开发的中级年薪范围是？', '38-58', '200-250万', '10-15万', '15-20万', 'A', NULL),
(@pack_id, 31, '以下哪个场景最符合临床预测模型开发的工作环境？', '法庭', '技术办公室', '手术室', '农田', 'B', NULL),
(@pack_id, 32, '以下哪项最符合临床预测模型开发的职业特点？', '纯体力型', '跨学科复合型人才', '纯管理型', '无技能型', 'B', NULL),
(@pack_id, 33, '临床预测模型开发的竞争比是？', '100:1', '5:1', '25:1', '10:1', 'C', NULL),
(@pack_id, 34, '临床预测模型开发需要持续学习的原因是？', '学习有坏处', '学习不重要', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 35, '临床预测模型开发对硕士学历的要求是？', '硕士90%', '硕士20%', '硕士0%', '硕士50%', 'A', NULL),
(@pack_id, 36, '临床预测模型开发属于以下哪类岗位热度？', '淘汰', '冷门', '无热度', '高', 'D', NULL),
(@pack_id, 37, '以下哪项是临床预测模型开发的核心技能之一？', '舞蹈编排', '钢琴演奏', '版画制作', '机器学习', 'D', NULL),
(@pack_id, 38, '以下哪项是临床预测模型开发的核心技能之一？', '地质学', '茶艺师', '拓扑学', '临床知识', 'D', NULL),
(@pack_id, 39, '以下哪个数字代表临床预测模型开发的工作强度？', '7', '3', '0', '8', 'B', NULL),
(@pack_id, 40, '临床预测模型开发不需要以下哪项能力？', '问题解决', '外科手术', '编程能力', '逻辑思维', 'B', NULL),
(@pack_id, 41, '以下哪项是临床预测模型开发的核心技能之一？', '临床知识', '油画技法', '石油钻探', '地质学', 'A', NULL),
(@pack_id, 42, '临床预测模型开发的工作强度等级是？', '3', '1', '4', '2', 'A', NULL),
(@pack_id, 43, '临床预测模型开发的复合学科背景使其在就业市场上具有？', '竞争优势', '负面作用', '被淘汰风险', '劣势', 'A', NULL),
(@pack_id, 44, '临床预测模型开发的工作强度评级为3，对应描述是？', '高', '超负荷', '轻松', '一般', 'A', NULL),
(@pack_id, 45, '以下哪项不是临床预测模型开发的主要工作内容？', '代码编写', '系统设计', '财务报表审计', '技术方案', 'C', NULL),
(@pack_id, 46, '以下哪项最接近临床预测模型开发的学历分布？', '本科10% 硕士90%', '博士100%', '高中100%', '硕士100%', 'A', NULL),
(@pack_id, 47, '临床预测模型开发的岗位竞争激烈程度为？', '2:1', '25:1', '3:1', '1:1', 'B', NULL),
(@pack_id, 48, '专业114的岗位名称是？', '国际医疗协调员', 'DevOps工程师', '技术产品经理', '临床预测模型开发', 'D', NULL),
(@pack_id, 49, '以下哪项是临床预测模型开发的交叉学科背景？', '临床医学×数据科学', '四个学科', '无学科要求', '单一学科', 'A', NULL),
(@pack_id, 50, '以下哪项是临床预测模型开发的核心技能之一？', '天文学', '考古学', '服装设计', '模型验证', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业115：临床医学×英语 — 医学翻译
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:0', 115, '医学翻译', 'major_clinical', 'major_english', '临床医学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪个不是医学翻译的别称？', '医疗软件产品经理', '临床医学×英语专家', '医学翻译(资深)', '医学翻译', 'A', NULL),
(@pack_id, 2, '医学翻译属于以下哪个领域的岗位？', '纯体育', '临床医学/英语复合领域', '纯文科', '纯艺术', 'B', NULL),
(@pack_id, 3, '医学翻译的薪资结构中，初级岗位年薪约为？', '3-5万', '12-18', '5-10万', '80-100万', 'B', NULL),
(@pack_id, 4, '医学翻译的工作中不涉及以下哪项技能？', '翻译软件', '医学英语', '钢琴演奏', '术语库', 'C', NULL),
(@pack_id, 5, '医学翻译属于以下哪类岗位热度？', '无热度', '淘汰', '中', '冷门', 'C', NULL),
(@pack_id, 6, '以下哪项是医学翻译的核心技能之一？', '植物学', '医学英语', '考古学', '气象学', 'B', NULL),
(@pack_id, 7, '医学翻译的工作强度评级为2，对应描述是？', '一般', '繁忙', '中', '超负荷', 'C', NULL),
(@pack_id, 8, '医学翻译的高级年薪范围是？', '200-250万', '250-300万', '35-50', '30-40万', 'C', NULL),
(@pack_id, 9, '医学翻译不需要以下哪项能力？', '写作能力', '语言能力', '驾驶技术', '细心耐心', 'C', NULL),
(@pack_id, 10, '医学翻译的竞争比是？', '8:1', '10:1', '5:1', '100:1', 'B', NULL),
(@pack_id, 11, '在医学翻译的日常工作中，最常用的技能组合是？', '地质学', '医学英语、术语库', '理发师', '海洋学', 'B', NULL),
(@pack_id, 12, '以下哪项是医学翻译的核心技能之一？', '珠宝鉴定', '翻译软件', '矿物学', '昆虫学', 'B', NULL),
(@pack_id, 13, '医学翻译工作中最可能使用的工具是？', '钢琴', '翻译软件/编辑器', '挖掘机', '手术刀', 'B', NULL),
(@pack_id, 14, '医学翻译的职业发展路径通常从什么级别开始？', '初级', '实习生', '顾问', '志愿者', 'A', NULL),
(@pack_id, 15, '医学翻译面试时最可能被考察的技能是？', '考古学', '医学英语', '钢琴演奏', '地质学', 'B', NULL),
(@pack_id, 16, '专业115的岗位名称是？', '真实世界研究数据专家', '国际医疗协调员', '临床预测模型开发', '医学翻译', 'D', NULL),
(@pack_id, 17, '医学翻译的竞争比10:1意味着？', '内部推荐即可', '1人竞争多个岗位', '平均10人竞争1个岗位', '自动录取', 'C', NULL),
(@pack_id, 18, '医学翻译的工作成果通常以什么形式呈现？', '软件', '食品', '建筑', '文本/文档', 'D', NULL),
(@pack_id, 19, '医学翻译的工作强度等级是？', '1', '4', '3', '2', 'D', NULL),
(@pack_id, 20, '以下哪项不是医学翻译的主要工作内容？', '内容校对', '术语整理', '股票交易', '文字翻译', 'C', NULL),
(@pack_id, 21, '应聘医学翻译时，平均多少人竞争1个岗位？', '2人', '10', '3人', '4人', 'B', NULL),
(@pack_id, 22, '以下哪个岗位名称与专业115对应？', 'SCI论文编辑', '临床预测模型开发', '风险建模专家', '医学翻译', 'D', NULL),
(@pack_id, 23, '医学翻译的初级年薪范围是？', '8-12万', '200-300万', '100-150万', '12-18', 'D', NULL),
(@pack_id, 24, '医学翻译的工作强度属于？', '较高', '极高', '中等', '中', 'D', NULL),
(@pack_id, 25, '以下哪项技能对医学翻译的职业发展最重要？', '航空航天', '陶瓷工艺', '铣床加工', '医学英语', 'D', NULL),
(@pack_id, 26, '以下哪项最符合医学翻译的职业特点？', '单一技能型', '纯体力型', '无技能型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 27, '以下哪项是医学翻译的交叉学科背景？', '临床医学×英语', '单一学科', '三个学科', '无学科要求', 'A', NULL),
(@pack_id, 28, '医学翻译的中级年薪范围是？', '15-20万', '200-250万', '20-30', '150-200万', 'C', NULL),
(@pack_id, 29, '医学翻译属于哪个学科组合？', '临床医学×数据科学', '电气工程×金融学', '市场营销×英语', '临床医学×英语', 'D', NULL),
(@pack_id, 30, '以下哪项是医学翻译的核心技能之一？', '版画制作', '微生物学', '医学英语', '烹饪技术', 'C', NULL),
(@pack_id, 31, '以下哪项是医学翻译的核心技能之一？', '术语库', '铣床加工', '矿物学', '天文学', 'A', NULL),
(@pack_id, 32, '医学翻译对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士30%', '硕士0%', 'C', NULL),
(@pack_id, 33, '医学翻译的岗位竞争激烈程度为？', '10:1', '3:1', '2:1', '1:1', 'A', NULL),
(@pack_id, 34, '以下哪项是医学翻译的核心技能之一？', '古生物学', '术语库', '石油钻探', '微生物学', 'B', NULL),
(@pack_id, 35, '在1-5级工作强度体系中，医学翻译属于哪一级？', '2', '0级', '8级', '6级', 'A', NULL),
(@pack_id, 36, '以下哪个场景最符合医学翻译的工作环境？', '农田', '嘈杂工地', '手术室', '安静办公室', 'D', NULL),
(@pack_id, 37, '以下哪项是医学翻译的核心技能之一？', '茶艺师', '翻译软件', '铸造工艺', '昆虫学', 'B', NULL),
(@pack_id, 38, '医学翻译需要持续学习的原因是？', '学习内容少', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL),
(@pack_id, 39, '以下哪项是医学翻译的核心技能之一？', '医学英语', '航空航天', '版画制作', '雕塑艺术', 'A', NULL),
(@pack_id, 40, '以下哪项最接近医学翻译的高级年薪上限？', '40万', '30万', '20万', '50', 'D', NULL),
(@pack_id, 41, '医学翻译的复合学科背景使其在就业市场上具有？', '竞争优势', '被淘汰风险', '无影响', '负面作用', 'A', NULL),
(@pack_id, 42, '医学翻译岗位要求掌握临床医学和英语的复合知识，这属于？', '体力劳动岗位', '纯技术岗位', '跨学科复合岗位', '单一学科岗位', 'C', NULL),
(@pack_id, 43, '以下哪项最接近医学翻译的学历分布？', '硕士100%', '本科70% 硕士30%', '本科100%', '高中100%', 'B', NULL),
(@pack_id, 44, '医学翻译的岗位中，最高学历要求通常是什么？', '博士后', '大专', '本科', '硕士', 'D', NULL),
(@pack_id, 45, '以下哪项是医学翻译的核心技能之一？', '矿物学', '医学英语', '书法篆刻', '拓扑学', 'B', NULL),
(@pack_id, 46, '临床医学×英语交叉领域对应的岗位是？', '医学翻译', 'SCI论文编辑', '跨境并购翻译', '双语数据报告撰写', 'A', NULL),
(@pack_id, 47, '医学翻译在项目中最需要运用的能力是？', '珠宝鉴定', '医学英语', '天文学', '理发师', 'B', NULL),
(@pack_id, 48, '医学翻译的学科组合中，第一个学科是？', '会计学', '法学', '临床医学', '市场营销', 'C', NULL),
(@pack_id, 49, '医学翻译的学历门槛是？', '本科70% 硕士30%', '博士100%', '高中即可', '无要求', 'A', NULL),
(@pack_id, 50, '医学翻译需要融合哪两个学科的知识？', '金融和建筑', '法学和医学', '历史和地理', '临床医学和英语', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业116：临床医学×英语 — 国际医疗协调员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:0', 116, '国际医疗协调员', 'major_clinical', 'major_english', '临床医学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '国际医疗协调员岗位要求掌握临床医学和英语的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '体力劳动岗位', '单一学科岗位', 'A', NULL),
(@pack_id, 2, '国际医疗协调员的岗位中，最高学历要求通常是什么？', '本科', '博士后', '硕士', '高中', 'C', NULL),
(@pack_id, 3, '国际医疗协调员在项目中最需要运用的能力是？', '珠宝鉴定', '核工程', '焊接技术', '医疗流程', 'D', NULL),
(@pack_id, 4, '以下哪项最符合国际医疗协调员的职业特点？', '纯体力型', '跨学科复合型人才', '纯管理型', '单一技能型', 'B', NULL),
(@pack_id, 5, '国际医疗协调员的学科组合中，第一个学科是？', '数据科学', '市场营销', '临床医学', '会计学', 'C', NULL),
(@pack_id, 6, '以下哪项是国际医疗协调员的核心技能之一？', '量子物理', '油画技法', '钳工工艺', '医疗流程', 'D', NULL),
(@pack_id, 7, '国际医疗协调员的竞争比12:1意味着？', '无竞争', '内部推荐即可', '平均12人竞争1个岗位', '自动录取', 'C', NULL),
(@pack_id, 8, '以下哪个竞争比与国际医疗协调员相符？', '1:20', '12:1', '1:10', '1:5', 'B', NULL),
(@pack_id, 9, '国际医疗协调员属于以下哪类岗位热度？', '淘汰', '无热度', '极低', '中', 'D', NULL),
(@pack_id, 10, '应聘国际医疗协调员时，平均多少人竞争1个岗位？', '12', '2人', '5人', '3人', 'A', NULL),
(@pack_id, 11, '以下哪项是国际医疗协调员的核心技能之一？', '车床操作', '书法篆刻', '钳工工艺', '医疗流程', 'D', NULL),
(@pack_id, 12, '国际医疗协调员对硕士学历的要求是？', '硕士0%', '硕士20%', '硕士40%', '硕士50%', 'C', NULL),
(@pack_id, 13, '在国际医疗协调员的日常工作中，最常用的技能组合是？', '钳工工艺', '园艺设计', '车床操作', '医疗流程、英语口语', 'D', NULL),
(@pack_id, 14, '以下哪个数字代表国际医疗协调员的工作强度？', '7', '0', '3', '6', 'C', NULL),
(@pack_id, 15, '以下哪项最接近国际医疗协调员的学历分布？', '高中100%', '博士100%', '本科100%', '本科60% 硕士40%', 'D', NULL),
(@pack_id, 16, '以下哪个岗位名称与专业116对应？', '医药行业研究员', '投资者关系专员', '客户画像建模', '国际医疗协调员', 'D', NULL),
(@pack_id, 17, '以下哪项是国际医疗协调员的核心技能之一？', '病历摘要', '书法篆刻', '油画技法', '车床操作', 'A', NULL),
(@pack_id, 18, '国际医疗协调员的工作强度等级是？', '3', '5', '2', '1', 'A', NULL),
(@pack_id, 19, '国际医疗协调员工作中最可能使用的工具是？', '手术刀', '钢琴', '挖掘机', '专业工具', 'D', NULL),
(@pack_id, 20, '临床医学×英语交叉领域对应的岗位是？', '计算机双语教学', '国际医疗协调员', '交易系统开发', '金融软件产品经理', 'B', NULL),
(@pack_id, 21, '国际医疗协调员的复合学科背景使其在就业市场上具有？', '竞争优势', '被淘汰风险', '劣势', '负面作用', 'A', NULL),
(@pack_id, 22, '国际医疗协调员的竞争比是？', '12:1', '5:1', '10:1', '100:1', 'A', NULL),
(@pack_id, 23, '国际医疗协调员的职业发展路径通常从什么级别开始？', '实习生', '顾问', '初级', '志愿者', 'C', NULL),
(@pack_id, 24, '以下哪项是国际医疗协调员的核心技能之一？', '医疗流程', '钢琴演奏', '理发师', '建筑工程', 'A', NULL),
(@pack_id, 25, '国际医疗协调员属于以下哪个领域的岗位？', '临床医学/英语复合领域', '纯文科', '纯体育', '纯理科', 'A', NULL),
(@pack_id, 26, '以下哪项是国际医疗协调员的交叉学科背景？', '临床医学×英语', '无学科要求', '四个学科', '三个学科', 'A', NULL),
(@pack_id, 27, '国际医疗协调员的工作强度属于？', '较高', '高', '中等', '较低', 'B', NULL),
(@pack_id, 28, '以下哪个场景最符合国际医疗协调员的工作环境？', '专业场所', '农田', '手术室', '法庭', 'A', NULL),
(@pack_id, 29, '在1-5级工作强度体系中，国际医疗协调员属于哪一级？', '6级', '3', '8级', '0级', 'B', NULL),
(@pack_id, 30, '国际医疗协调员需要融合哪两个学科的知识？', '临床医学和英语', '历史和地理', '金融和建筑', '艺术和体育', 'A', NULL),
(@pack_id, 31, '国际医疗协调员的中级年薪范围是？', '25-38', '15-20万', '10-15万', '200-250万', 'A', NULL),
(@pack_id, 32, '以下哪项是国际医疗协调员的核心技能之一？', '园艺设计', '铸造工艺', '理发师', '医疗流程', 'D', NULL),
(@pack_id, 33, '国际医疗协调员需要持续学习的原因是？', '技术更新快', '学习内容少', '学习有坏处', '学习不重要', 'A', NULL),
(@pack_id, 34, '应聘国际医疗协调员，本科学历占比约为？', '90%', '60%', '100%', '10%', 'B', NULL),
(@pack_id, 35, '以下哪项最接近国际医疗协调员的高级年薪上限？', '20万', '65', '40万', '50万', 'B', NULL),
(@pack_id, 36, '国际医疗协调员的高级年薪范围是？', '20-30万', '45-65', '30-40万', '200-250万', 'B', NULL),
(@pack_id, 37, '国际医疗协调员的工作强度评级为3，对应描述是？', '超负荷', '轻松', '一般', '高', 'D', NULL),
(@pack_id, 38, '以下哪项是国际医疗协调员的核心技能之一？', '病历摘要', '拓扑学', '钢琴演奏', '天文学', 'A', NULL),
(@pack_id, 39, '国际医疗协调员的薪资结构中，初级岗位年薪约为？', '3-5万', '120-150万', '14-22', '80-100万', 'C', NULL),
(@pack_id, 40, '国际医疗协调员面试时最可能被考察的技能是？', '铸造工艺', '陶瓷工艺', '医疗流程', '石油钻探', 'C', NULL),
(@pack_id, 41, '国际医疗协调员的工作中不涉及以下哪项技能？', '铸造工艺', '病历摘要', '英语口语', '医疗流程', 'A', NULL),
(@pack_id, 42, '国际医疗协调员的初级年薪范围是？', '8-12万', '5-8万', '14-22', '100-150万', 'C', NULL),
(@pack_id, 43, '专业116的岗位名称是？', '国际医疗协调员', '医疗市场专员', '财富管理顾问', 'SCI论文编辑', 'A', NULL),
(@pack_id, 44, '以下哪项是国际医疗协调员的核心技能之一？', '天文学', '理发师', '英语口语', '航空航天', 'C', NULL),
(@pack_id, 45, '国际医疗协调员不需要以下哪项能力？', '专业能力B', '专业能力A', '无关能力', '专业能力C', 'C', NULL),
(@pack_id, 46, '以下哪项技能对国际医疗协调员的职业发展最重要？', '园艺设计', '拓扑学', '铸造工艺', '医疗流程', 'D', NULL),
(@pack_id, 47, '国际医疗协调员的工作成果通常以什么形式呈现？', '油画', '建筑', '食品', '专业成果', 'D', NULL),
(@pack_id, 48, '以下哪项不是国际医疗协调员的主要工作内容？', '核心工作A', 'unrelated_work', '核心工作C', '核心工作B', 'B', NULL),
(@pack_id, 49, '以下哪个不是国际医疗协调员的别称？', '国际医疗协调员(资深)', '国际医疗协调员(高级)', '推荐系统产品经理', '临床医学×英语专家', 'C', NULL),
(@pack_id, 50, '以下哪项是国际医疗协调员的核心技能之一？', '拓扑学', '病历摘要', '气象学', '石油钻探', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业117：临床医学×英语 — SCI论文编辑
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:1', 117, 'SCI论文编辑', 'major_clinical', 'major_english', '临床医学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'SCI论文编辑的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '被淘汰风险', '竞争优势', 'D', NULL),
(@pack_id, 2, 'SCI论文编辑属于哪个学科组合？', '电气工程×金融学', '市场营销×英语', '临床医学×数据科学', '临床医学×英语', 'D', NULL),
(@pack_id, 3, 'SCI论文编辑需要融合哪两个学科的知识？', '历史和地理', '临床医学和英语', '艺术和体育', '金融和建筑', 'B', NULL),
(@pack_id, 4, 'SCI论文编辑的工作强度属于？', '极低', '中', '极高', '较高', 'B', NULL),
(@pack_id, 5, '以下哪项是SCI论文编辑的核心技能之一？', '服装设计', '烹饪技术', '石油钻探', '学术写作', 'D', NULL),
(@pack_id, 6, 'SCI论文编辑对硕士学历的要求是？', '硕士70%', '硕士50%', '硕士0%', '硕士20%', 'A', NULL),
(@pack_id, 7, 'SCI论文编辑的职业发展路径通常从什么级别开始？', '志愿者', '实习生', '合伙人', '初级', 'D', NULL),
(@pack_id, 8, '专业117的岗位名称是？', '软件本地化工程师', '海外技术支持', '计算机双语教学', 'SCI论文编辑', 'D', NULL),
(@pack_id, 9, '以下哪项是SCI论文编辑的核心技能之一？', '量子物理', '油画技法', '英语润色', '天文学', 'C', NULL),
(@pack_id, 10, 'SCI论文编辑的薪资结构中，初级岗位年薪约为？', '5-10万', '15-24', '80-100万', '120-150万', 'B', NULL),
(@pack_id, 11, '以下哪项最接近SCI论文编辑的学历分布？', '博士100%', '高中100%', '硕士70% 博士30%', '本科100%', 'C', NULL),
(@pack_id, 12, 'SCI论文编辑不需要以下哪项能力？', '驾驶技术', '语言能力', '写作能力', '细心耐心', 'A', NULL),
(@pack_id, 13, '以下哪项是SCI论文编辑的核心技能之一？', '雕塑艺术', '医学统计', '矿物学', '园艺设计', 'B', NULL),
(@pack_id, 14, '临床医学×英语交叉领域对应的岗位是？', '技术文档写作', '开发者关系工程师', 'SCI论文编辑', '数据仓库工程师', 'C', NULL),
(@pack_id, 15, '以下哪项不是SCI论文编辑的主要工作内容？', '术语整理', '文字翻译', '股票交易', '内容校对', 'C', NULL),
(@pack_id, 16, 'SCI论文编辑的中级年薪范围是？', '150-200万', '28-45', '200-250万', '15-20万', 'B', NULL),
(@pack_id, 17, '以下哪项是SCI论文编辑的核心技能之一？', '微生物学', '古生物学', '植物学', '学术写作', 'D', NULL),
(@pack_id, 18, '以下哪个竞争比与SCI论文编辑相符？', '1:100', '1:5', '15:1', '1:20', 'C', NULL),
(@pack_id, 19, 'SCI论文编辑岗位要求掌握临床医学和英语的复合知识，这属于？', '纯管理岗位', '体力劳动岗位', '跨学科复合岗位', '纯技术岗位', 'C', NULL),
(@pack_id, 20, 'SCI论文编辑的竞争比是？', '5:1', '8:1', '100:1', '15:1', 'D', NULL),
(@pack_id, 21, '以下哪个不是SCI论文编辑的别称？', '医学翻译', 'SCI论文编辑(高级)', 'SCI论文编辑', '临床医学×英语专家', 'A', NULL),
(@pack_id, 22, 'SCI论文编辑属于以下哪类岗位热度？', '中', '冷门', '极低', '淘汰', 'A', NULL),
(@pack_id, 23, 'SCI论文编辑面试时最可能被考察的技能是？', '学术写作', '机械维修', '考古学', '铣床加工', 'A', NULL),
(@pack_id, 24, 'SCI论文编辑的初级年薪范围是？', '15-24', '5-8万', '200-300万', '100-150万', 'A', NULL),
(@pack_id, 25, '以下哪个岗位名称与专业117对应？', '医疗软件产品经理', 'SCI论文编辑', '生物信息分析师', '医药行业研究员', 'B', NULL),
(@pack_id, 26, '以下哪项是SCI论文编辑的核心技能之一？', '书法篆刻', '医学统计', '昆虫学', '舞蹈编排', 'B', NULL),
(@pack_id, 27, '以下哪个数字代表SCI论文编辑的工作强度？', '7', '8', '6', '2', 'D', NULL),
(@pack_id, 28, 'SCI论文编辑的学科组合中，第一个学科是？', '法学', '临床医学', '市场营销', '数据科学', 'B', NULL),
(@pack_id, 29, 'SCI论文编辑的工作成果通常以什么形式呈现？', '文本/文档', '食品', '软件', '建筑', 'A', NULL),
(@pack_id, 30, '应聘SCI论文编辑时，平均多少人竞争1个岗位？', '5人', '2人', '4人', '15', 'D', NULL),
(@pack_id, 31, 'SCI论文编辑在项目中最需要运用的能力是？', '园艺设计', '学术写作', '舞蹈编排', '航空航天', 'B', NULL),
(@pack_id, 32, '以下哪项最符合SCI论文编辑的职业特点？', '跨学科复合型人才', '纯体力型', '无技能型', '纯管理型', 'A', NULL),
(@pack_id, 33, 'SCI论文编辑的高级年薪范围是？', '20-30万', '30-40万', '50-75', '200-250万', 'C', NULL),
(@pack_id, 34, 'SCI论文编辑的工作强度评级为2，对应描述是？', '繁忙', '超负荷', '中', '一般', 'C', NULL),
(@pack_id, 35, 'SCI论文编辑需要持续学习的原因是？', '学习内容少', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL),
(@pack_id, 36, '以下哪项是SCI论文编辑的交叉学科背景？', '无学科要求', '临床医学×英语', '单一学科', '三个学科', 'B', NULL),
(@pack_id, 37, '在1-5级工作强度体系中，SCI论文编辑属于哪一级？', '7级', '2', '8级', '0级', 'B', NULL),
(@pack_id, 38, '以下哪项是SCI论文编辑的核心技能之一？', '海洋学', '理发师', '昆虫学', '医学统计', 'D', NULL),
(@pack_id, 39, 'SCI论文编辑的学历门槛是？', '硕士70% 博士30%', '博士100%', '大专即可', '无要求', 'A', NULL),
(@pack_id, 40, 'SCI论文编辑的岗位竞争激烈程度为？', '15:1', '3:1', '2:1', '4:1', 'A', NULL),
(@pack_id, 41, '以下哪个场景最符合SCI论文编辑的工作环境？', '农田', '安静办公室', '手术室', '嘈杂工地', 'B', NULL),
(@pack_id, 42, '以下哪项最接近SCI论文编辑的高级年薪上限？', '50万', '40万', '75', '20万', 'C', NULL),
(@pack_id, 43, 'SCI论文编辑属于以下哪个领域的岗位？', '纯文科', '临床医学/英语复合领域', '纯体育', '纯理科', 'B', NULL),
(@pack_id, 44, 'SCI论文编辑的岗位中，最高学历要求通常是什么？', '博士后', '大专', '硕士', '本科', 'C', NULL),
(@pack_id, 45, 'SCI论文编辑工作中最可能使用的工具是？', '翻译软件/编辑器', '钢琴', '挖掘机', '手术刀', 'A', NULL),
(@pack_id, 46, '以下哪项是SCI论文编辑的核心技能之一？', '机械维修', '气象学', '车床操作', '英语润色', 'D', NULL),
(@pack_id, 47, 'SCI论文编辑的工作强度等级是？', '5', '2', '3', '4', 'B', NULL),
(@pack_id, 48, 'SCI论文编辑的工作中不涉及以下哪项技能？', '医学统计', '微生物学', '英语润色', '学术写作', 'B', NULL),
(@pack_id, 49, '在SCI论文编辑的日常工作中，最常用的技能组合是？', '气象学', '焊接技术', '学术写作、医学统计', '烹饪技术', 'C', NULL),
(@pack_id, 50, '应聘SCI论文编辑，本科学历占比约为？', '20%', '10%', '90%', '不适用', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业118：软件工程×市场营销 — 技术产品经理
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_marketing:0', 118, '技术产品经理', 'major_swe', 'major_marketing', '软件工程×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '技术产品经理的工作中不涉及以下哪项技能？', '服装设计', '数据分析', '用户研究', '技术理解', 'A', NULL),
(@pack_id, 2, '以下哪个数字代表技术产品经理的工作强度？', '6', '3', '0', '8', 'B', NULL),
(@pack_id, 3, '以下哪项是技术产品经理的交叉学科背景？', '软件工程×市场营销', '三个学科', '无学科要求', '四个学科', 'A', NULL),
(@pack_id, 4, '以下哪项最接近技术产品经理的学历分布？', '本科40% 硕士60%', '硕士100%', '本科100%', '高中100%', 'A', NULL),
(@pack_id, 5, '技术产品经理属于以下哪个领域的岗位？', '纯艺术', '软件工程/市场营销复合领域', '纯理科', '纯体育', 'B', NULL),
(@pack_id, 6, '技术产品经理需要持续学习的原因是？', '学习内容少', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL),
(@pack_id, 7, '以下哪项是技术产品经理的核心技能之一？', '数据分析', '矿物学', '考古学', '陶瓷工艺', 'A', NULL),
(@pack_id, 8, '以下哪个竞争比与技术产品经理相符？', '1:20', '30:1', '1:100', '1:5', 'B', NULL),
(@pack_id, 9, '技术产品经理的初级年薪范围是？', '8-12万', '100-150万', '22-35', '200-300万', 'C', NULL),
(@pack_id, 10, '技术产品经理的岗位竞争激烈程度为？', '30:1', '4:1', '3:1', '1:1', 'A', NULL),
(@pack_id, 11, '技术产品经理的高级年薪范围是？', '250-300万', '20-30万', '30-40万', '80-120', 'D', NULL),
(@pack_id, 12, '专业118的岗位名称是？', '技术产品经理', '医药代表', '风险建模专家', '投资者关系专员', 'A', NULL),
(@pack_id, 13, '以下哪项是技术产品经理的核心技能之一？', '技术理解', '烹饪技术', '海洋学', '昆虫学', 'A', NULL),
(@pack_id, 14, '在1-5级工作强度体系中，技术产品经理属于哪一级？', '8级', '0级', '7级', '3', 'D', NULL),
(@pack_id, 15, '应聘技术产品经理时，平均多少人竞争1个岗位？', '2人', '5人', '30', '3人', 'C', NULL),
(@pack_id, 16, '技术产品经理的中级年薪范围是？', '150-200万', '15-20万', '200-250万', '45-70', 'D', NULL),
(@pack_id, 17, '技术产品经理的工作成果通常以什么形式呈现？', '食品', '建筑', '方案/报告', '药品', 'C', NULL),
(@pack_id, 18, '技术产品经理对硕士学历的要求是？', '硕士10%', '硕士0%', '硕士50%', '硕士60%', 'D', NULL),
(@pack_id, 19, '技术产品经理的学历门槛是？', '博士100%', '本科40% 硕士60%', '高中即可', '无要求', 'B', NULL),
(@pack_id, 20, '技术产品经理的复合学科背景使其在就业市场上具有？', '无影响', '被淘汰风险', '竞争优势', '负面作用', 'C', NULL),
(@pack_id, 21, '技术产品经理属于以下哪类岗位热度？', '淘汰', '极低', '无热度', '高', 'D', NULL),
(@pack_id, 22, '应聘技术产品经理，本科学历占比约为？', '40%', '100%', '20%', '10%', 'A', NULL),
(@pack_id, 23, '在技术产品经理的日常工作中，最常用的技能组合是？', '舞蹈编排', '技术理解、用户研究', '矿物学', '油画技法', 'B', NULL),
(@pack_id, 24, '以下哪项是技术产品经理的核心技能之一？', '车床操作', '钳工工艺', '服装设计', '技术理解', 'D', NULL),
(@pack_id, 25, '以下哪项是技术产品经理的核心技能之一？', '昆虫学', '用户研究', '铸造工艺', '海洋学', 'B', NULL),
(@pack_id, 26, '以下哪个场景最符合技术产品经理的工作环境？', '办公室/会议室', '农田', '工厂车间', '手术室', 'A', NULL),
(@pack_id, 27, '技术产品经理的竞争比是？', '100:1', '30:1', '8:1', '5:1', 'B', NULL),
(@pack_id, 28, '以下哪个不是技术产品经理的别称？', '财富管理顾问', '技术产品经理(资深)', '技术产品经理(高级)', '软件工程×市场营销专家', 'A', NULL),
(@pack_id, 29, '技术产品经理需要融合哪两个学科的知识？', '软件工程和市场营销', '金融和建筑', '法学和医学', '历史和地理', 'A', NULL),
(@pack_id, 30, '技术产品经理不需要以下哪项能力？', '沟通能力', '机械操作', '写作能力', '分析能力', 'B', NULL),
(@pack_id, 31, '技术产品经理的工作强度评级为3，对应描述是？', '超负荷', '高', '轻松', '繁忙', 'B', NULL),
(@pack_id, 32, '技术产品经理岗位要求掌握软件工程和市场营销的复合知识，这属于？', '单一学科岗位', '跨学科复合岗位', '体力劳动岗位', '纯管理岗位', 'B', NULL),
(@pack_id, 33, '软件工程×市场营销交叉领域对应的岗位是？', '技术文档写作', '技术产品经理', '数据平台开发工程师', '海外数据竞赛选手', 'B', NULL),
(@pack_id, 34, '技术产品经理面试时最可能被考察的技能是？', '钢琴演奏', '铣床加工', '航空航天', '技术理解', 'D', NULL),
(@pack_id, 35, '技术产品经理在项目中最需要运用的能力是？', '油画技法', '拓扑学', '植物学', '技术理解', 'D', NULL),
(@pack_id, 36, '技术产品经理属于哪个学科组合？', '市场营销×英语', '软件工程×市场营销', '临床医学×数据科学', '电气工程×金融学', 'B', NULL),
(@pack_id, 37, '以下哪项是技术产品经理的核心技能之一？', '建筑工程', '珠宝鉴定', '数据分析', '海洋学', 'C', NULL),
(@pack_id, 38, '以下哪项是技术产品经理的核心技能之一？', '石油钻探', '植物学', '车床操作', '技术理解', 'D', NULL),
(@pack_id, 39, '以下哪个岗位名称与专业118对应？', '医药行业研究员', '营销技术专家(MarTech)', '技术产品经理', '数据科学翻译', 'C', NULL),
(@pack_id, 40, '技术产品经理的薪资结构中，初级岗位年薪约为？', '120-150万', '80-100万', '3-5万', '22-35', 'D', NULL),
(@pack_id, 41, '技术产品经理工作中最可能使用的工具是？', '焊接设备', '纺织机', '手术器械', '办公软件', 'D', NULL),
(@pack_id, 42, '技术产品经理的职业发展路径通常从什么级别开始？', '初级', '实习生', '合伙人', '顾问', 'A', NULL),
(@pack_id, 43, '以下哪项是技术产品经理的核心技能之一？', '焊接技术', '油画技法', '用户研究', '车床操作', 'C', NULL),
(@pack_id, 44, '技术产品经理的学科组合中，第一个学科是？', '数据科学', '法学', '软件工程', '市场营销', 'C', NULL),
(@pack_id, 45, '以下哪项是技术产品经理的核心技能之一？', '理发师', '茶艺师', '数据分析', '铣床加工', 'C', NULL),
(@pack_id, 46, '以下哪项最接近技术产品经理的高级年薪上限？', '30万', '40万', '20万', '120', 'D', NULL),
(@pack_id, 47, '技术产品经理的竞争比30:1意味着？', '平均30人竞争1个岗位', '无竞争', '自动录取', '1人竞争多个岗位', 'A', NULL),
(@pack_id, 48, '技术产品经理的工作强度等级是？', '2', '4', '3', '5', 'C', NULL),
(@pack_id, 49, '以下哪项是技术产品经理的核心技能之一？', '昆虫学', '用户研究', '石油钻探', '焊接技术', 'B', NULL),
(@pack_id, 50, '技术产品经理的工作强度属于？', '高', '极高', '中等', '极低', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业119：软件工程×市场营销 — 开发者关系工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_marketing:1', 119, '开发者关系工程师', 'major_swe', 'major_marketing', '软件工程×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '开发者关系工程师在项目中最需要运用的能力是？', '书法篆刻', '技术社区', '海洋学', '理发师', 'B', NULL),
(@pack_id, 2, '开发者关系工程师属于以下哪类岗位热度？', '淘汰', '极低', '无热度', '高', 'D', NULL),
(@pack_id, 3, '专业119的岗位名称是？', 'SEO/SEM策略师', '海外技术支持', '开发者关系工程师', '海外营销专员', 'C', NULL),
(@pack_id, 4, '以下哪项最符合开发者关系工程师的职业特点？', '跨学科复合型人才', '纯管理型', '纯体力型', '单一技能型', 'A', NULL),
(@pack_id, 5, '应聘开发者关系工程师，本科学历占比约为？', '100%', '20%', '90%', '60%', 'D', NULL),
(@pack_id, 6, '开发者关系工程师的岗位竞争激烈程度为？', '2:1', '1:1', '4:1', '15:1', 'D', NULL),
(@pack_id, 7, '以下哪个竞争比与开发者关系工程师相符？', '1:20', '1:100', '15:1', '1:10', 'C', NULL),
(@pack_id, 8, '以下哪项最接近开发者关系工程师的学历分布？', '本科60% 硕士40%', '硕士100%', '博士100%', '高中100%', 'A', NULL),
(@pack_id, 9, '开发者关系工程师岗位要求掌握软件工程和市场营销的复合知识，这属于？', '跨学科复合岗位', '体力劳动岗位', '单一学科岗位', '纯技术岗位', 'A', NULL),
(@pack_id, 10, '开发者关系工程师面试时最可能被考察的技能是？', '核工程', '天文学', '铸造工艺', '技术社区', 'D', NULL),
(@pack_id, 11, '开发者关系工程师的竞争比15:1意味着？', '无竞争', '自动录取', '平均15人竞争1个岗位', '1人竞争多个岗位', 'C', NULL),
(@pack_id, 12, '以下哪项是开发者关系工程师的核心技能之一？', '技术社区', '采矿工程', '石油钻探', '铣床加工', 'A', NULL),
(@pack_id, 13, '开发者关系工程师的学科组合中，第一个学科是？', '数据科学', '市场营销', '软件工程', '法学', 'C', NULL),
(@pack_id, 14, '开发者关系工程师属于哪个学科组合？', '软件工程×市场营销', '市场营销×英语', '电气工程×金融学', '法学×会计学', 'A', NULL),
(@pack_id, 15, '以下哪项是开发者关系工程师的核心技能之一？', '演讲', '服装设计', '航空航天', '海洋学', 'A', NULL),
(@pack_id, 16, '开发者关系工程师的薪资结构中，初级岗位年薪约为？', '18-30', '5-10万', '3-5万', '80-100万', 'A', NULL),
(@pack_id, 17, '开发者关系工程师的竞争比是？', '100:1', '5:1', '10:1', '15:1', 'D', NULL),
(@pack_id, 18, '以下哪项是开发者关系工程师的核心技能之一？', '天文学', '烹饪技术', 'API文档', '茶艺师', 'C', NULL),
(@pack_id, 19, '以下哪个不是开发者关系工程师的别称？', '技术文档写作', '开发者关系工程师', '开发者关系工程师(高级)', '软件工程×市场营销专家', 'A', NULL),
(@pack_id, 20, '以下哪项是开发者关系工程师的核心技能之一？', '雕塑艺术', '技术社区', '海洋学', '服装设计', 'B', NULL),
(@pack_id, 21, '开发者关系工程师不需要以下哪项能力？', '逻辑思维', '编程能力', '外科手术', '问题解决', 'C', NULL),
(@pack_id, 22, '开发者关系工程师的工作强度属于？', '高', '极高', '极低', '较低', 'A', NULL),
(@pack_id, 23, '开发者关系工程师的高级年薪范围是？', '65-95', '20-30万', '30-40万', '250-300万', 'A', NULL),
(@pack_id, 24, '开发者关系工程师的工作成果通常以什么形式呈现？', '油画', '雕塑', '软件/系统', '服装', 'C', NULL),
(@pack_id, 25, '应聘开发者关系工程师时，平均多少人竞争1个岗位？', '4人', '2人', '15', '3人', 'C', NULL),
(@pack_id, 26, '以下哪项是开发者关系工程师的核心技能之一？', '车床操作', '技术社区', '版画制作', '海洋学', 'B', NULL),
(@pack_id, 27, '以下哪项是开发者关系工程师的核心技能之一？', '钳工工艺', '采矿工程', 'API文档', '核工程', 'C', NULL),
(@pack_id, 28, '以下哪项是开发者关系工程师的核心技能之一？', '天文学', '雕塑艺术', '采矿工程', '演讲', 'D', NULL),
(@pack_id, 29, '开发者关系工程师的初级年薪范围是？', '18-30', '100-150万', '8-12万', '200-300万', 'A', NULL),
(@pack_id, 30, '软件工程×市场营销交叉领域对应的岗位是？', '开发者关系工程师', '海外营销专员', '客户画像建模', '医保精算师', 'A', NULL),
(@pack_id, 31, '以下哪项是开发者关系工程师的核心技能之一？', '珠宝鉴定', '技术社区', '烹饪技术', '建筑工程', 'B', NULL),
(@pack_id, 32, '以下哪项不是开发者关系工程师的主要工作内容？', '代码编写', '技术方案', '系统设计', '财务报表审计', 'D', NULL),
(@pack_id, 33, '开发者关系工程师的职业发展路径通常从什么级别开始？', '合伙人', '初级', '实习生', '顾问', 'B', NULL),
(@pack_id, 34, '开发者关系工程师需要融合哪两个学科的知识？', '金融和建筑', '法学和医学', '软件工程和市场营销', '历史和地理', 'C', NULL),
(@pack_id, 35, '开发者关系工程师属于以下哪个领域的岗位？', '纯文科', '软件工程/市场营销复合领域', '纯理科', '纯体育', 'B', NULL),
(@pack_id, 36, '以下哪项是开发者关系工程师的交叉学科背景？', '无学科要求', '三个学科', '软件工程×市场营销', '四个学科', 'C', NULL),
(@pack_id, 37, '以下哪个岗位名称与专业119对应？', '医药代表', '医保精算师', 'SCI论文编辑', '开发者关系工程师', 'D', NULL),
(@pack_id, 38, '开发者关系工程师的复合学科背景使其在就业市场上具有？', '负面作用', '被淘汰风险', '无影响', '竞争优势', 'D', NULL),
(@pack_id, 39, '以下哪项技能对开发者关系工程师的职业发展最重要？', '核工程', '技术社区', '航空航天', '陶瓷工艺', 'B', NULL),
(@pack_id, 40, '开发者关系工程师的中级年薪范围是？', '10-15万', '200-250万', '150-200万', '35-55', 'D', NULL),
(@pack_id, 41, '开发者关系工程师的工作强度等级是？', '3', '5', '1', '4', 'A', NULL),
(@pack_id, 42, '以下哪个场景最符合开发者关系工程师的工作环境？', '法庭', '农田', '技术办公室', '手术室', 'C', NULL),
(@pack_id, 43, '开发者关系工程师对硕士学历的要求是？', '硕士10%', '硕士20%', '硕士0%', '硕士40%', 'D', NULL),
(@pack_id, 44, '开发者关系工程师的工作强度评级为3，对应描述是？', '超负荷', '一般', '轻松', '高', 'D', NULL),
(@pack_id, 45, '以下哪项是开发者关系工程师的核心技能之一？', '钢琴演奏', '考古学', '茶艺师', 'API文档', 'D', NULL),
(@pack_id, 46, '开发者关系工程师的岗位中，最高学历要求通常是什么？', '高中', '硕士', '本科', '博士后', 'B', NULL),
(@pack_id, 47, '以下哪项最接近开发者关系工程师的高级年薪上限？', '20万', '95', '40万', '50万', 'B', NULL),
(@pack_id, 48, '开发者关系工程师的工作中不涉及以下哪项技能？', '技术社区', 'API文档', '演讲', '珠宝鉴定', 'D', NULL),
(@pack_id, 49, '以下哪项是开发者关系工程师的核心技能之一？', '车床操作', '演讲', '美容师', '版画制作', 'B', NULL),
(@pack_id, 50, '开发者关系工程师需要持续学习的原因是？', '学习有坏处', '学习不重要', '无需学习', '技术更新快', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业120：软件工程×市场营销 — 软件售前顾问
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_marketing:2', 120, '软件售前顾问', 'major_swe', 'major_marketing', '软件工程×市场营销', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪个数字代表软件售前顾问的工作强度？', '7', '4', '0', '8', 'B', NULL),
(@pack_id, 2, '软件售前顾问的竞争比是？', '8:1', '10:1', '12:1', '100:1', 'C', NULL),
(@pack_id, 3, '以下哪项是软件售前顾问的核心技能之一？', '方案讲解', '书法篆刻', '烹饪技术', '天文学', 'A', NULL),
(@pack_id, 4, '软件售前顾问岗位要求掌握软件工程和市场营销的复合知识，这属于？', '跨学科复合岗位', '单一学科岗位', '纯管理岗位', '体力劳动岗位', 'A', NULL),
(@pack_id, 5, '软件售前顾问在项目中最需要运用的能力是？', '烹饪技术', '方案讲解', '焊接技术', '拓扑学', 'B', NULL),
(@pack_id, 6, '以下哪项是软件售前顾问的交叉学科背景？', '软件工程×市场营销', '无学科要求', '三个学科', '四个学科', 'A', NULL),
(@pack_id, 7, '以下哪项是软件售前顾问的核心技能之一？', '客户沟通', '铣床加工', '昆虫学', '量子物理', 'A', NULL),
(@pack_id, 8, '以下哪项是软件售前顾问的核心技能之一？', '技术演示', '钳工工艺', '建筑工程', '拓扑学', 'A', NULL),
(@pack_id, 9, '软件售前顾问的工作中不涉及以下哪项技能？', '气象学', '方案讲解', '客户沟通', '技术演示', 'A', NULL),
(@pack_id, 10, '以下哪项是软件售前顾问的核心技能之一？', '版画制作', '昆虫学', '技术演示', '书法篆刻', 'C', NULL),
(@pack_id, 11, '以下哪项最接近软件售前顾问的学历分布？', '本科100%', '博士100%', '硕士100%', '本科70% 硕士30%', 'D', NULL),
(@pack_id, 12, '应聘软件售前顾问时，平均多少人竞争1个岗位？', '4人', '5人', '3人', '12', 'D', NULL),
(@pack_id, 13, '软件售前顾问的工作强度等级是？', '2', '4', '5', '1', 'B', NULL),
(@pack_id, 14, '软件售前顾问不需要以下哪项能力？', '沟通能力', '分析能力', '机械操作', '写作能力', 'C', NULL),
(@pack_id, 15, '软件售前顾问的学历门槛是？', '博士100%', '本科70% 硕士30%', '无要求', '高中即可', 'B', NULL),
(@pack_id, 16, '以下哪个岗位名称与专业120对应？', '医疗健康投资分析师', '软件售前顾问', '市场数据分析师', '开发者关系工程师', 'B', NULL),
(@pack_id, 17, '软件售前顾问的中级年薪范围是？', '15-20万', '30-50', '10-15万', '150-200万', 'B', NULL),
(@pack_id, 18, '软件售前顾问属于以下哪个领域的岗位？', '软件工程/市场营销复合领域', '纯体育', '纯文科', '纯理科', 'A', NULL),
(@pack_id, 19, '软件售前顾问属于哪个学科组合？', '临床医学×数据科学', '法学×会计学', '软件工程×市场营销', '电气工程×金融学', 'C', NULL),
(@pack_id, 20, '软件售前顾问的复合学科背景使其在就业市场上具有？', '竞争优势', '被淘汰风险', '劣势', '无影响', 'A', NULL),
(@pack_id, 21, '软件售前顾问的高级年薪范围是？', '200-250万', '30-40万', '20-30万', '60-85', 'D', NULL),
(@pack_id, 22, '软件售前顾问的工作强度属于？', '极低', '中等', '极高', '较高', 'D', NULL),
(@pack_id, 23, '以下哪个不是软件售前顾问的别称？', '财富管理顾问', '软件售前顾问', '软件售前顾问(资深)', '软件售前顾问(高级)', 'A', NULL),
(@pack_id, 24, '在1-5级工作强度体系中，软件售前顾问属于哪一级？', '8级', '7级', '0级', '4', 'D', NULL),
(@pack_id, 25, '软件工程×市场营销交叉领域对应的岗位是？', '海外营销专员', '电子病历开发工程师', '软件售前顾问', '智能投顾算法工程师', 'C', NULL),
(@pack_id, 26, '软件售前顾问对硕士学历的要求是？', '硕士30%', '硕士20%', '硕士0%', '硕士10%', 'A', NULL),
(@pack_id, 27, '软件售前顾问面试时最可能被考察的技能是？', '方案讲解', '铣床加工', '量子物理', '钢琴演奏', 'A', NULL),
(@pack_id, 28, '软件售前顾问的工作强度评级为4，对应描述是？', '超负荷', '较高', '轻松', '一般', 'B', NULL),
(@pack_id, 29, '软件售前顾问的竞争比12:1意味着？', '平均12人竞争1个岗位', '内部推荐即可', '无竞争', '自动录取', 'A', NULL),
(@pack_id, 30, '软件售前顾问的工作成果通常以什么形式呈现？', '药品', '食品', '方案/报告', '建筑', 'C', NULL),
(@pack_id, 31, '软件售前顾问的岗位竞争激烈程度为？', '3:1', '4:1', '2:1', '12:1', 'D', NULL),
(@pack_id, 32, '软件售前顾问的学科组合中，第一个学科是？', '会计学', '数据科学', '市场营销', '软件工程', 'D', NULL),
(@pack_id, 33, '软件售前顾问的职业发展路径通常从什么级别开始？', '合伙人', '志愿者', '初级', '顾问', 'C', NULL),
(@pack_id, 34, '软件售前顾问需要持续学习的原因是？', '学习有坏处', '无需学习', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 35, '以下哪个场景最符合软件售前顾问的工作环境？', '农田', '工厂车间', '办公室/会议室', '手术室', 'C', NULL),
(@pack_id, 36, '软件售前顾问需要融合哪两个学科的知识？', '艺术和体育', '法学和医学', '金融和建筑', '软件工程和市场营销', 'D', NULL),
(@pack_id, 37, '以下哪项是软件售前顾问的核心技能之一？', '方案讲解', '油画技法', '昆虫学', '书法篆刻', 'A', NULL),
(@pack_id, 38, '在软件售前顾问的日常工作中，最常用的技能组合是？', '拓扑学', '方案讲解、技术演示', '气象学', '美容师', 'B', NULL),
(@pack_id, 39, '以下哪项不是软件售前顾问的主要工作内容？', '方案设计', '芯片制造', '数据分析', '客户沟通', 'B', NULL),
(@pack_id, 40, '专业120的岗位名称是？', '跨境电商运营', '软件本地化工程师', '软件售前顾问', '技术文档工程师', 'C', NULL),
(@pack_id, 41, '以下哪项是软件售前顾问的核心技能之一？', '烹饪技术', '拓扑学', '茶艺师', '客户沟通', 'D', NULL),
(@pack_id, 42, '应聘软件售前顾问，本科学历占比约为？', '100%', '20%', '10%', '70%', 'D', NULL),
(@pack_id, 43, '以下哪项是软件售前顾问的核心技能之一？', '方案讲解', '焊接技术', '烹饪技术', '植物学', 'A', NULL),
(@pack_id, 44, '以下哪项最接近软件售前顾问的高级年薪上限？', '30万', '50万', '85', '20万', 'C', NULL),
(@pack_id, 45, '软件售前顾问的初级年薪范围是？', '15-25(提成)', '100-150万', '8-12万', '200-300万', 'A', NULL),
(@pack_id, 46, '以下哪个竞争比与软件售前顾问相符？', '1:20', '1:10', '1:100', '12:1', 'D', NULL),
(@pack_id, 47, '以下哪项是软件售前顾问的核心技能之一？', '技术演示', '建筑工程', '钢琴演奏', '铸造工艺', 'A', NULL),
(@pack_id, 48, '软件售前顾问工作中最可能使用的工具是？', '纺织机', '焊接设备', '手术器械', '办公软件', 'D', NULL),
(@pack_id, 49, '以下哪项是软件售前顾问的核心技能之一？', '海洋学', '客户沟通', '舞蹈编排', '航空航天', 'B', NULL),
(@pack_id, 50, '软件售前顾问的薪资结构中，初级岗位年薪约为？', '5-10万', '120-150万', '15-25(提成)', '3-5万', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业121：软件工程×数据科学 — 数据平台开发工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_ds:0', 121, '数据平台开发工程师', 'major_swe', 'major_ds', '软件工程×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '数据平台开发工程师岗位要求掌握软件工程和数据科学的复合知识，这属于？', '单一学科岗位', '跨学科复合岗位', '纯管理岗位', '纯技术岗位', 'B', NULL),
(@pack_id, 2, '应聘数据平台开发工程师，本科学历占比约为？', '10%', '20%', '30%', '90%', 'C', NULL),
(@pack_id, 3, '以下哪项是数据平台开发工程师的核心技能之一？', '版画制作', '矿物学', 'Java/Scala', '美容师', 'C', NULL),
(@pack_id, 4, '数据平台开发工程师的高级年薪范围是？', '250-300万', '20-30万', '200-250万', '80-120', 'D', NULL),
(@pack_id, 5, '数据平台开发工程师的初级年薪范围是？', '200-300万', '100-150万', '25-38', '8-12万', 'C', NULL),
(@pack_id, 6, '数据平台开发工程师不需要以下哪项能力？', '问题解决', '编程能力', '逻辑思维', '外科手术', 'D', NULL),
(@pack_id, 7, '以下哪个数字代表数据平台开发工程师的工作强度？', '6', '0', '3', '8', 'C', NULL),
(@pack_id, 8, '以下哪项最接近数据平台开发工程师的学历分布？', '高中100%', '博士100%', '本科30% 硕士70%', '硕士100%', 'C', NULL),
(@pack_id, 9, '数据平台开发工程师的工作强度等级是？', '1', '3', '5', '4', 'B', NULL),
(@pack_id, 10, '数据平台开发工程师的中级年薪范围是？', '10-15万', '15-20万', '45-70', '150-200万', 'C', NULL),
(@pack_id, 11, '以下哪项是数据平台开发工程师的核心技能之一？', '理发师', '烹饪技术', '书法篆刻', 'Hadoop', 'D', NULL),
(@pack_id, 12, '数据平台开发工程师的工作强度属于？', '高', '极低', '中等', '较高', 'A', NULL),
(@pack_id, 13, '应聘数据平台开发工程师时，平均多少人竞争1个岗位？', '3人', '2人', '30', '5人', 'C', NULL),
(@pack_id, 14, '数据平台开发工程师面试时最可能被考察的技能是？', '地质学', '矿物学', '气象学', 'Spark/Flink', 'D', NULL),
(@pack_id, 15, '以下哪个岗位名称与专业121对应？', '真实世界研究数据专家', '数据平台开发工程师', 'AI算法专家', '技术文档写作', 'B', NULL),
(@pack_id, 16, '数据平台开发工程师的复合学科背景使其在就业市场上具有？', '竞争优势', '负面作用', '被淘汰风险', '劣势', 'A', NULL),
(@pack_id, 17, '以下哪个竞争比与数据平台开发工程师相符？', '1:5', '1:100', '1:10', '30:1', 'D', NULL),
(@pack_id, 18, '数据平台开发工程师的职业发展路径通常从什么级别开始？', '合伙人', '初级', '顾问', '志愿者', 'B', NULL),
(@pack_id, 19, '数据平台开发工程师在项目中最需要运用的能力是？', '版画制作', '微生物学', '美容师', 'Spark/Flink', 'D', NULL),
(@pack_id, 20, '以下哪项技能对数据平台开发工程师的职业发展最重要？', 'Spark/Flink', '陶瓷工艺', '铣床加工', '植物学', 'A', NULL),
(@pack_id, 21, '以下哪项是数据平台开发工程师的交叉学科背景？', '软件工程×数据科学', '四个学科', '单一学科', '无学科要求', 'A', NULL),
(@pack_id, 22, '数据平台开发工程师的竞争比是？', '8:1', '5:1', '30:1', '100:1', 'C', NULL),
(@pack_id, 23, '数据平台开发工程师的学科组合中，第一个学科是？', '会计学', '市场营销', '法学', '软件工程', 'D', NULL),
(@pack_id, 24, '数据平台开发工程师属于以下哪个领域的岗位？', '纯文科', '软件工程/数据科学复合领域', '纯理科', '纯体育', 'B', NULL),
(@pack_id, 25, '数据平台开发工程师的岗位中，最高学历要求通常是什么？', '博士后', '大专', '硕士', '高中', 'C', NULL),
(@pack_id, 26, '以下哪项最符合数据平台开发工程师的职业特点？', '跨学科复合型人才', '单一技能型', '纯体力型', '无技能型', 'A', NULL),
(@pack_id, 27, '以下哪项是数据平台开发工程师的核心技能之一？', '珠宝鉴定', '服装设计', 'Spark/Flink', '理发师', 'C', NULL),
(@pack_id, 28, '数据平台开发工程师的学历门槛是？', '高中即可', '本科30% 硕士70%', '无要求', '博士100%', 'B', NULL),
(@pack_id, 29, '数据平台开发工程师的工作中不涉及以下哪项技能？', 'Hadoop', 'Spark/Flink', '考古学', 'Java/Scala', 'C', NULL),
(@pack_id, 30, '软件工程×数据科学交叉领域对应的岗位是？', '数据平台开发工程师', '投资者关系专员', '智能投顾算法工程师', '海外数据竞赛选手', 'A', NULL),
(@pack_id, 31, '以下哪个场景最符合数据平台开发工程师的工作环境？', '法庭', '农田', '技术办公室', '手术室', 'C', NULL),
(@pack_id, 32, '数据平台开发工程师对硕士学历的要求是？', '硕士20%', '硕士70%', '硕士10%', '硕士50%', 'B', NULL),
(@pack_id, 33, '以下哪项是数据平台开发工程师的核心技能之一？', '矿物学', '理发师', '航空航天', 'Hadoop', 'D', NULL),
(@pack_id, 34, '数据平台开发工程师工作中最可能使用的设备是？', '计算机', '手术刀', '钢琴', '挖掘机', 'A', NULL),
(@pack_id, 35, '专业121的岗位名称是？', '软件售前顾问', '数据平台开发工程师', '营销技术专家(MarTech)', '医药行业研究员', 'B', NULL),
(@pack_id, 36, '数据平台开发工程师属于以下哪类岗位热度？', '无热度', '极低', '高', '淘汰', 'C', NULL),
(@pack_id, 37, '在数据平台开发工程师的日常工作中，最常用的技能组合是？', '石油钻探', '舞蹈编排', '地质学', 'Spark/Flink、Java/Scala', 'D', NULL),
(@pack_id, 38, '以下哪项是数据平台开发工程师的核心技能之一？', 'Spark/Flink', '航空航天', '雕塑艺术', '昆虫学', 'A', NULL),
(@pack_id, 39, '数据平台开发工程师的薪资结构中，初级岗位年薪约为？', '25-38', '120-150万', '3-5万', '5-10万', 'A', NULL),
(@pack_id, 40, '以下哪项最接近数据平台开发工程师的高级年薪上限？', '40万', '30万', '50万', '120', 'D', NULL),
(@pack_id, 41, '数据平台开发工程师属于哪个学科组合？', '法学×会计学', '临床医学×数据科学', '电气工程×金融学', '软件工程×数据科学', 'D', NULL),
(@pack_id, 42, '数据平台开发工程师的工作强度评级为3，对应描述是？', '超负荷', '轻松', '繁忙', '高', 'D', NULL),
(@pack_id, 43, '数据平台开发工程师的竞争比30:1意味着？', '自动录取', '1人竞争多个岗位', '平均30人竞争1个岗位', '内部推荐即可', 'C', NULL),
(@pack_id, 44, '数据平台开发工程师的工作成果通常以什么形式呈现？', '软件/系统', '雕塑', '服装', '油画', 'A', NULL),
(@pack_id, 45, '数据平台开发工程师的岗位竞争激烈程度为？', '3:1', '30:1', '1:1', '4:1', 'B', NULL),
(@pack_id, 46, '数据平台开发工程师需要融合哪两个学科的知识？', '软件工程和数据科学', '历史和地理', '法学和医学', '艺术和体育', 'A', NULL),
(@pack_id, 47, '以下哪项是数据平台开发工程师的核心技能之一？', '钢琴演奏', 'Spark/Flink', '采矿工程', '量子物理', 'B', NULL),
(@pack_id, 48, '以下哪项是数据平台开发工程师的核心技能之一？', 'Spark/Flink', '采矿工程', '天文学', '考古学', 'A', NULL),
(@pack_id, 49, '以下哪项是数据平台开发工程师的核心技能之一？', '建筑工程', '铸造工艺', '服装设计', 'Hadoop', 'D', NULL),
(@pack_id, 50, '在1-5级工作强度体系中，数据平台开发工程师属于哪一级？', '0级', '3', '6级', '8级', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业122：软件工程×数据科学 — 数据仓库工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_ds:1', 122, '数据仓库工程师', 'major_swe', 'major_ds', '软件工程×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '数据仓库工程师的工作中不涉及以下哪项技能？', '数据建模', 'ETL', 'SQL', '建筑工程', 'D', NULL),
(@pack_id, 2, '数据仓库工程师的高级年薪范围是？', '30-40万', '70-100', '20-30万', '250-300万', 'B', NULL),
(@pack_id, 3, '以下哪个场景最符合数据仓库工程师的工作环境？', '手术室', '农田', '法庭', '技术办公室', 'D', NULL),
(@pack_id, 4, '数据仓库工程师的工作强度等级是？', '2', '3', '5', '4', 'B', NULL),
(@pack_id, 5, '数据仓库工程师的工作成果通常以什么形式呈现？', '雕塑', '服装', '油画', '软件/系统', 'D', NULL),
(@pack_id, 6, '数据仓库工程师面试时最可能被考察的技能是？', '石油钻探', '车床操作', 'SQL', '植物学', 'C', NULL),
(@pack_id, 7, '软件工程×数据科学交叉领域对应的岗位是？', '医疗市场专员', '国际金融分析师(CFA)', '量化交易平台工程师', '数据仓库工程师', 'D', NULL),
(@pack_id, 8, '以下哪个数字代表数据仓库工程师的工作强度？', '0', '8', '7', '3', 'D', NULL),
(@pack_id, 9, '以下哪项技能对数据仓库工程师的职业发展最重要？', '油画技法', 'SQL', '天文学', '植物学', 'B', NULL),
(@pack_id, 10, '以下哪个岗位名称与专业122对应？', '机器学习平台开发', '客户画像建模', '数据仓库工程师', '医学翻译', 'C', NULL),
(@pack_id, 11, '以下哪个竞争比与数据仓库工程师相符？', '1:100', '25:1', '1:20', '1:10', 'B', NULL),
(@pack_id, 12, '数据仓库工程师的职业发展路径通常从什么级别开始？', '合伙人', '顾问', '初级', '实习生', 'C', NULL),
(@pack_id, 13, '数据仓库工程师不需要以下哪项能力？', '问题解决', '逻辑思维', '外科手术', '编程能力', 'C', NULL),
(@pack_id, 14, '数据仓库工程师的岗位竞争激烈程度为？', '25:1', '3:1', '4:1', '1:1', 'A', NULL),
(@pack_id, 15, '数据仓库工程师的学科组合中，第一个学科是？', '软件工程', '数据科学', '市场营销', '法学', 'A', NULL),
(@pack_id, 16, '以下哪项是数据仓库工程师的核心技能之一？', '舞蹈编排', '考古学', '石油钻探', 'ETL', 'D', NULL),
(@pack_id, 17, '以下哪项是数据仓库工程师的核心技能之一？', '雕塑艺术', '微生物学', '油画技法', 'SQL', 'D', NULL),
(@pack_id, 18, '在1-5级工作强度体系中，数据仓库工程师属于哪一级？', '3', '7级', '6级', '0级', 'A', NULL),
(@pack_id, 19, '数据仓库工程师的学历门槛是？', '博士100%', '高中即可', '本科40% 硕士60%', '无要求', 'C', NULL),
(@pack_id, 20, '以下哪项是数据仓库工程师的核心技能之一？', '茶艺师', '美容师', 'ETL', '车床操作', 'C', NULL),
(@pack_id, 21, '以下哪项最符合数据仓库工程师的职业特点？', '跨学科复合型人才', '单一技能型', '无技能型', '纯管理型', 'A', NULL),
(@pack_id, 22, '数据仓库工程师属于哪个学科组合？', '临床医学×数据科学', '软件工程×数据科学', '法学×会计学', '电气工程×金融学', 'B', NULL),
(@pack_id, 23, '以下哪项是数据仓库工程师的核心技能之一？', '矿物学', '植物学', '核工程', 'ETL', 'D', NULL),
(@pack_id, 24, '数据仓库工程师对硕士学历的要求是？', '硕士60%', '硕士20%', '硕士50%', '硕士0%', 'A', NULL),
(@pack_id, 25, '数据仓库工程师的竞争比是？', '5:1', '25:1', '100:1', '8:1', 'B', NULL),
(@pack_id, 26, '以下哪项最接近数据仓库工程师的高级年薪上限？', '100', '30万', '40万', '20万', 'A', NULL),
(@pack_id, 27, '数据仓库工程师的工作强度评级为3，对应描述是？', '超负荷', '高', '轻松', '一般', 'B', NULL),
(@pack_id, 28, '数据仓库工程师属于以下哪类岗位热度？', '极低', '高', '淘汰', '无热度', 'B', NULL),
(@pack_id, 29, '数据仓库工程师需要持续学习的原因是？', '学习内容少', '学习有坏处', '技术更新快', '无需学习', 'C', NULL),
(@pack_id, 30, '数据仓库工程师的中级年薪范围是？', '200-250万', '38-58', '10-15万', '15-20万', 'B', NULL),
(@pack_id, 31, '数据仓库工程师属于以下哪个领域的岗位？', '纯文科', '纯体育', '纯艺术', '软件工程/数据科学复合领域', 'D', NULL),
(@pack_id, 32, '数据仓库工程师的初级年薪范围是？', '20-32', '100-150万', '8-12万', '200-300万', 'A', NULL),
(@pack_id, 33, '以下哪项最接近数据仓库工程师的学历分布？', '硕士100%', '高中100%', '本科100%', '本科40% 硕士60%', 'D', NULL),
(@pack_id, 34, '数据仓库工程师岗位要求掌握软件工程和数据科学的复合知识，这属于？', '纯管理岗位', '体力劳动岗位', '单一学科岗位', '跨学科复合岗位', 'D', NULL),
(@pack_id, 35, '以下哪项不是数据仓库工程师的主要工作内容？', '财务报表审计', '技术方案', '代码编写', '系统设计', 'A', NULL),
(@pack_id, 36, '数据仓库工程师的复合学科背景使其在就业市场上具有？', '竞争优势', '负面作用', '劣势', '无影响', 'A', NULL),
(@pack_id, 37, '数据仓库工程师的工作强度属于？', '极高', '高', '极低', '较低', 'B', NULL),
(@pack_id, 38, '以下哪个不是数据仓库工程师的别称？', '数据仓库工程师(资深)', '数据仓库工程师', '软件工程×数据科学专家', 'SEO/SEM策略师', 'D', NULL),
(@pack_id, 39, '应聘数据仓库工程师时，平均多少人竞争1个岗位？', '5人', '2人', '4人', '25', 'D', NULL),
(@pack_id, 40, '数据仓库工程师需要融合哪两个学科的知识？', '金融和建筑', '法学和医学', '软件工程和数据科学', '艺术和体育', 'C', NULL),
(@pack_id, 41, '以下哪项是数据仓库工程师的核心技能之一？', '版画制作', '茶艺师', '拓扑学', 'SQL', 'D', NULL),
(@pack_id, 42, '以下哪项是数据仓库工程师的交叉学科背景？', '三个学科', '单一学科', '软件工程×数据科学', '四个学科', 'C', NULL),
(@pack_id, 43, '以下哪项是数据仓库工程师的核心技能之一？', 'SQL', '矿物学', '天文学', '烹饪技术', 'A', NULL),
(@pack_id, 44, '应聘数据仓库工程师，本科学历占比约为？', '100%', '40%', '90%', '10%', 'B', NULL),
(@pack_id, 45, '数据仓库工程师的竞争比25:1意味着？', '内部推荐即可', '自动录取', '1人竞争多个岗位', '平均25人竞争1个岗位', 'D', NULL),
(@pack_id, 46, '专业122的岗位名称是？', '软件本地化工程师', '数据仓库工程师', '海外数据竞赛选手', 'AI算法专家', 'B', NULL),
(@pack_id, 47, '在数据仓库工程师的日常工作中，最常用的技能组合是？', '微生物学', '考古学', 'SQL、ETL', '版画制作', 'C', NULL),
(@pack_id, 48, '以下哪项是数据仓库工程师的核心技能之一？', '车床操作', '美容师', '铸造工艺', '数据建模', 'D', NULL),
(@pack_id, 49, '数据仓库工程师的薪资结构中，初级岗位年薪约为？', '5-10万', '80-100万', '20-32', '120-150万', 'C', NULL),
(@pack_id, 50, '以下哪项是数据仓库工程师的核心技能之一？', '书法篆刻', '铸造工艺', '核工程', '数据建模', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业123：软件工程×数据科学 — 机器学习平台开发
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_ds:2', 123, '机器学习平台开发', 'major_swe', 'major_ds', '软件工程×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项不是机器学习平台开发的主要工作内容？', '系统设计', '技术方案', '代码编写', '财务报表审计', 'D', NULL),
(@pack_id, 2, '以下哪个场景最符合机器学习平台开发的工作环境？', '技术办公室', '农田', '手术室', '法庭', 'A', NULL),
(@pack_id, 3, '机器学习平台开发的学科组合中，第一个学科是？', '会计学', '数据科学', '法学', '软件工程', 'D', NULL),
(@pack_id, 4, '以下哪个竞争比与机器学习平台开发相符？', '1:100', '1:10', '35:1', '1:20', 'C', NULL),
(@pack_id, 5, '以下哪项是机器学习平台开发的核心技能之一？', 'Python/Go', '量子物理', '航空航天', '陶瓷工艺', 'A', NULL),
(@pack_id, 6, '以下哪项是机器学习平台开发的核心技能之一？', '书法篆刻', 'K8s', '油画技法', '建筑工程', 'B', NULL),
(@pack_id, 7, '机器学习平台开发面试时最可能被考察的技能是？', '天文学', '海洋学', 'K8s', '雕塑艺术', 'C', NULL),
(@pack_id, 8, '机器学习平台开发工作中最可能使用的设备是？', '挖掘机', '钢琴', '计算机', '手术刀', 'C', NULL),
(@pack_id, 9, '以下哪项是机器学习平台开发的核心技能之一？', '微生物学', '矿物学', '车床操作', 'MLOps', 'D', NULL),
(@pack_id, 10, '以下哪项最接近机器学习平台开发的学历分布？', '高中100%', '博士100%', '本科100%', '本科20% 硕士80%', 'D', NULL),
(@pack_id, 11, '机器学习平台开发属于以下哪类岗位热度？', '冷门', '高', '极低', '淘汰', 'B', NULL),
(@pack_id, 12, '机器学习平台开发的岗位竞争激烈程度为？', '35:1', '4:1', '1:1', '2:1', 'A', NULL),
(@pack_id, 13, '应聘机器学习平台开发时，平均多少人竞争1个岗位？', '3人', '5人', '35', '2人', 'C', NULL),
(@pack_id, 14, '以下哪项是机器学习平台开发的核心技能之一？', 'MLOps', '古生物学', '采矿工程', '茶艺师', 'A', NULL),
(@pack_id, 15, '机器学习平台开发需要融合哪两个学科的知识？', '历史和地理', '艺术和体育', '金融和建筑', '软件工程和数据科学', 'D', NULL),
(@pack_id, 16, '机器学习平台开发的中级年薪范围是？', '150-200万', '15-20万', '10-15万', '55-85', 'D', NULL),
(@pack_id, 17, '在1-5级工作强度体系中，机器学习平台开发属于哪一级？', '7级', '0级', '3', '6级', 'C', NULL),
(@pack_id, 18, '以下哪项是机器学习平台开发的核心技能之一？', 'K8s', '茶艺师', '考古学', '钳工工艺', 'A', NULL),
(@pack_id, 19, '机器学习平台开发的复合学科背景使其在就业市场上具有？', '被淘汰风险', '无影响', '劣势', '竞争优势', 'D', NULL),
(@pack_id, 20, '机器学习平台开发岗位要求掌握软件工程和数据科学的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '单一学科岗位', '纯管理岗位', 'A', NULL),
(@pack_id, 21, '以下哪项技能对机器学习平台开发的职业发展最重要？', '航空航天', '核工程', '油画技法', 'K8s', 'D', NULL),
(@pack_id, 22, '专业123的岗位名称是？', '财富管理顾问', '机器学习平台开发', '量化交易平台工程师', 'SCI论文编辑', 'B', NULL),
(@pack_id, 23, '机器学习平台开发不需要以下哪项能力？', '逻辑思维', '外科手术', '编程能力', '问题解决', 'B', NULL),
(@pack_id, 24, '机器学习平台开发在项目中最需要运用的能力是？', '铣床加工', '石油钻探', 'K8s', '焊接技术', 'C', NULL),
(@pack_id, 25, '机器学习平台开发的工作成果通常以什么形式呈现？', '油画', '雕塑', '服装', '软件/系统', 'D', NULL),
(@pack_id, 26, '以下哪项是机器学习平台开发的核心技能之一？', '铣床加工', '古生物学', 'K8s', '矿物学', 'C', NULL),
(@pack_id, 27, '以下哪项是机器学习平台开发的交叉学科背景？', '软件工程×数据科学', '四个学科', '无学科要求', '三个学科', 'A', NULL),
(@pack_id, 28, '机器学习平台开发的竞争比35:1意味着？', '1人竞争多个岗位', '平均35人竞争1个岗位', '无竞争', '自动录取', 'B', NULL),
(@pack_id, 29, '机器学习平台开发属于哪个学科组合？', '软件工程×数据科学', '临床医学×数据科学', '电气工程×金融学', '法学×会计学', 'A', NULL),
(@pack_id, 30, '机器学习平台开发对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士80%', '硕士10%', 'C', NULL),
(@pack_id, 31, '以下哪项是机器学习平台开发的核心技能之一？', '昆虫学', 'Python/Go', '舞蹈编排', '铸造工艺', 'B', NULL),
(@pack_id, 32, '以下哪项是机器学习平台开发的核心技能之一？', '铣床加工', '舞蹈编排', '陶瓷工艺', 'MLOps', 'D', NULL),
(@pack_id, 33, '以下哪个岗位名称与专业123对应？', '机器学习平台开发', '医疗健康投资分析师', 'AI算法专家', '开发者关系工程师', 'A', NULL),
(@pack_id, 34, '以下哪个数字代表机器学习平台开发的工作强度？', '0', '6', '8', '3', 'D', NULL),
(@pack_id, 35, '在机器学习平台开发的日常工作中，最常用的技能组合是？', '铣床加工', 'K8s、MLOps', '拓扑学', '古生物学', 'B', NULL),
(@pack_id, 36, '机器学习平台开发的岗位中，最高学历要求通常是什么？', '大专', '博士后', '硕士', '本科', 'C', NULL),
(@pack_id, 37, '以下哪项最符合机器学习平台开发的职业特点？', '纯管理型', '纯体力型', '无技能型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 38, '机器学习平台开发属于以下哪个领域的岗位？', '纯理科', '纯艺术', '纯文科', '软件工程/数据科学复合领域', 'D', NULL),
(@pack_id, 39, '机器学习平台开发的工作强度评级为3，对应描述是？', '一般', '超负荷', '轻松', '高', 'D', NULL),
(@pack_id, 40, '以下哪项是机器学习平台开发的核心技能之一？', '天文学', '书法篆刻', 'K8s', '版画制作', 'C', NULL),
(@pack_id, 41, '机器学习平台开发的工作强度等级是？', '3', '2', '5', '4', 'A', NULL),
(@pack_id, 42, '机器学习平台开发的薪资结构中，初级岗位年薪约为？', '120-150万', '28-45', '3-5万', '5-10万', 'B', NULL),
(@pack_id, 43, '机器学习平台开发需要持续学习的原因是？', '学习有坏处', '无需学习', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 44, '以下哪项是机器学习平台开发的核心技能之一？', '书法篆刻', 'Python/Go', '植物学', '服装设计', 'B', NULL),
(@pack_id, 45, '机器学习平台开发的学历门槛是？', '本科20% 硕士80%', '无要求', '高中即可', '博士100%', 'A', NULL),
(@pack_id, 46, '机器学习平台开发的竞争比是？', '100:1', '8:1', '35:1', '10:1', 'C', NULL),
(@pack_id, 47, '以下哪项最接近机器学习平台开发的高级年薪上限？', '20万', '40万', '150', '50万', 'C', NULL),
(@pack_id, 48, '机器学习平台开发的初级年薪范围是？', '200-300万', '8-12万', '100-150万', '28-45', 'D', NULL),
(@pack_id, 49, '机器学习平台开发的工作强度属于？', '极高', '极低', '中等', '高', 'D', NULL),
(@pack_id, 50, '软件工程×数据科学交叉领域对应的岗位是？', '国际品牌策划', '数据科学翻译', '机器学习平台开发', '软件售前顾问', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业124：软件工程×英语 — 软件本地化工程师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:0', 124, '软件本地化工程师', 'major_swe', 'major_english', '软件工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '专业124的岗位名称是？', '数据仓库工程师', '量化交易平台工程师', '软件本地化工程师', '风险建模专家', 'C', NULL),
(@pack_id, 2, '软件本地化工程师需要融合哪两个学科的知识？', '金融和建筑', '软件工程和英语', '历史和地理', '法学和医学', 'B', NULL),
(@pack_id, 3, '软件本地化工程师的工作中不涉及以下哪项技能？', '英语', '正则表达式', '本地化工具(SDL)', '钢琴演奏', 'D', NULL),
(@pack_id, 4, '软件本地化工程师的薪资结构中，初级岗位年薪约为？', '3-5万', '5-10万', '80-100万', '14-20', 'D', NULL),
(@pack_id, 5, '软件本地化工程师面试时最可能被考察的技能是？', '昆虫学', '版画制作', '核工程', '本地化工具(SDL)', 'D', NULL),
(@pack_id, 6, '软件本地化工程师的竞争比12:1意味着？', '平均12人竞争1个岗位', '1人竞争多个岗位', '内部推荐即可', '无竞争', 'A', NULL),
(@pack_id, 7, '以下哪项技能对软件本地化工程师的职业发展最重要？', '烹饪技术', '考古学', '本地化工具(SDL)', '铣床加工', 'C', NULL),
(@pack_id, 8, '以下哪项最符合软件本地化工程师的职业特点？', '无技能型', '纯体力型', '跨学科复合型人才', '单一技能型', 'C', NULL),
(@pack_id, 9, '软件本地化工程师的中级年薪范围是？', '15-20万', '150-200万', '200-250万', '25-35', 'D', NULL),
(@pack_id, 10, '软件本地化工程师的初级年薪范围是？', '200-300万', '100-150万', '14-20', '5-8万', 'C', NULL),
(@pack_id, 11, '软件本地化工程师属于以下哪类岗位热度？', '中', '冷门', '极低', '无热度', 'A', NULL),
(@pack_id, 12, '软件本地化工程师岗位要求掌握软件工程和英语的复合知识，这属于？', '体力劳动岗位', '纯技术岗位', '跨学科复合岗位', '纯管理岗位', 'C', NULL),
(@pack_id, 13, '软件本地化工程师需要持续学习的原因是？', '学习有坏处', '无需学习', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 14, '以下哪个岗位名称与专业124对应？', '软件本地化工程师', '海外技术支持', '生物信息分析师', '海外数据竞赛选手', 'A', NULL),
(@pack_id, 15, '软件本地化工程师的岗位中，最高学历要求通常是什么？', '高中', '大专', '博士后', '硕士', 'D', NULL),
(@pack_id, 16, '软件本地化工程师在项目中最需要运用的能力是？', '本地化工具(SDL)', '拓扑学', '园艺设计', '微生物学', 'A', NULL),
(@pack_id, 17, '软件本地化工程师工作中最可能使用的设备是？', '计算机', '钢琴', '挖掘机', '手术刀', 'A', NULL),
(@pack_id, 18, '软件本地化工程师的职业发展路径通常从什么级别开始？', '合伙人', '志愿者', '初级', '实习生', 'C', NULL),
(@pack_id, 19, '软件本地化工程师的学科组合中，第一个学科是？', '数据科学', '法学', '软件工程', '市场营销', 'C', NULL),
(@pack_id, 20, '以下哪个场景最符合软件本地化工程师的工作环境？', '农田', '手术室', '法庭', '技术办公室', 'D', NULL),
(@pack_id, 21, '以下哪项是软件本地化工程师的核心技能之一？', '天文学', '拓扑学', '正则表达式', '采矿工程', 'C', NULL),
(@pack_id, 22, '在1-5级工作强度体系中，软件本地化工程师属于哪一级？', '6级', '0级', '2', '8级', 'C', NULL),
(@pack_id, 23, '在软件本地化工程师的日常工作中，最常用的技能组合是？', '机械维修', '本地化工具(SDL)、正则表达式', '钳工工艺', '海洋学', 'B', NULL),
(@pack_id, 24, '以下哪项是软件本地化工程师的核心技能之一？', '烹饪技术', '书法篆刻', '量子物理', '本地化工具(SDL)', 'D', NULL),
(@pack_id, 25, '以下哪个数字代表软件本地化工程师的工作强度？', '0', '8', '2', '7', 'C', NULL),
(@pack_id, 26, '以下哪项不是软件本地化工程师的主要工作内容？', '系统设计', '财务报表审计', '代码编写', '技术方案', 'B', NULL),
(@pack_id, 27, '软件本地化工程师的工作成果通常以什么形式呈现？', '雕塑', '服装', '软件/系统', '油画', 'C', NULL),
(@pack_id, 28, '以下哪项是软件本地化工程师的核心技能之一？', '考古学', '核工程', '气象学', '本地化工具(SDL)', 'D', NULL),
(@pack_id, 29, '以下哪项最接近软件本地化工程师的学历分布？', '硕士100%', '本科80% 硕士20%', '本科100%', '博士100%', 'B', NULL),
(@pack_id, 30, '以下哪项是软件本地化工程师的核心技能之一？', '英语', '石油钻探', '航空航天', '考古学', 'A', NULL),
(@pack_id, 31, '以下哪项是软件本地化工程师的核心技能之一？', '地质学', '英语', '茶艺师', '气象学', 'B', NULL),
(@pack_id, 32, '软件工程×英语交叉领域对应的岗位是？', '软件本地化工程师', '金融产品营销经理', '医保精算师', '机器学习平台开发', 'A', NULL),
(@pack_id, 33, '以下哪个竞争比与软件本地化工程师相符？', '12:1', '1:10', '1:20', '1:5', 'A', NULL),
(@pack_id, 34, '以下哪项是软件本地化工程师的核心技能之一？', '天文学', '正则表达式', '核工程', '陶瓷工艺', 'B', NULL),
(@pack_id, 35, '软件本地化工程师的学历门槛是？', '无要求', '高中即可', '博士100%', '本科80% 硕士20%', 'D', NULL),
(@pack_id, 36, '以下哪项是软件本地化工程师的核心技能之一？', '烹饪技术', '本地化工具(SDL)', '核工程', '铸造工艺', 'B', NULL),
(@pack_id, 37, '以下哪项是软件本地化工程师的核心技能之一？', '英语', '量子物理', '版画制作', '航空航天', 'A', NULL),
(@pack_id, 38, '软件本地化工程师属于以下哪个领域的岗位？', '纯体育', '软件工程/英语复合领域', '纯艺术', '纯文科', 'B', NULL),
(@pack_id, 39, '软件本地化工程师的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '被淘汰风险', '竞争优势', 'D', NULL),
(@pack_id, 40, '以下哪项是软件本地化工程师的核心技能之一？', '矿物学', '机械维修', '理发师', '正则表达式', 'D', NULL),
(@pack_id, 41, '软件本地化工程师属于哪个学科组合？', '法学×会计学', '软件工程×英语', '临床医学×数据科学', '市场营销×英语', 'B', NULL),
(@pack_id, 42, '软件本地化工程师不需要以下哪项能力？', '逻辑思维', '编程能力', '外科手术', '问题解决', 'C', NULL),
(@pack_id, 43, '软件本地化工程师对硕士学历的要求是？', '硕士50%', '硕士0%', '硕士10%', '硕士20%', 'D', NULL),
(@pack_id, 44, '以下哪项是软件本地化工程师的交叉学科背景？', '四个学科', '无学科要求', '三个学科', '软件工程×英语', 'D', NULL),
(@pack_id, 45, '软件本地化工程师的岗位竞争激烈程度为？', '3:1', '1:1', '12:1', '4:1', 'C', NULL),
(@pack_id, 46, '软件本地化工程师的工作强度属于？', '较高', '中等', '中', '极高', 'C', NULL),
(@pack_id, 47, '以下哪个不是软件本地化工程师的别称？', '软件工程×英语专家', '软件本地化工程师(高级)', '国际医疗协调员', '软件本地化工程师', 'C', NULL),
(@pack_id, 48, '软件本地化工程师的高级年薪范围是？', '250-300万', '40-55', '30-40万', '20-30万', 'B', NULL),
(@pack_id, 49, '以下哪项是软件本地化工程师的核心技能之一？', '本地化工具(SDL)', '量子物理', '机械维修', '天文学', 'A', NULL),
(@pack_id, 50, '应聘软件本地化工程师，本科学历占比约为？', '100%', '10%', '80%', '90%', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业125：软件工程×英语 — 技术文档写作
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:1', 125, '技术文档写作', 'major_swe', 'major_english', '软件工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是技术文档写作的核心技能之一？', '钢琴演奏', '古生物学', '油画技法', '英语', 'D', NULL),
(@pack_id, 2, '以下哪个不是技术文档写作的别称？', '技术文档写作', '技术文档写作(高级)', '技术文档写作(资深)', '跨境电商运营', 'D', NULL),
(@pack_id, 3, '技术文档写作不需要以下哪项能力？', '驾驶技术', '写作能力', '细心耐心', '语言能力', 'A', NULL),
(@pack_id, 4, '以下哪个竞争比与技术文档写作相符？', '1:5', '1:20', '1:100', '8:1', 'D', NULL),
(@pack_id, 5, '以下哪项最接近技术文档写作的高级年薪上限？', '40万', '35', '20万', '50万', 'B', NULL),
(@pack_id, 6, '以下哪个场景最符合技术文档写作的工作环境？', '嘈杂工地', '农田', '安静办公室', '手术室', 'C', NULL),
(@pack_id, 7, '以下哪项不是技术文档写作的主要工作内容？', '术语整理', '内容校对', '文字翻译', '股票交易', 'D', NULL),
(@pack_id, 8, '技术文档写作的工作强度评级为1，对应描述是？', '轻松', '繁忙', '低', '一般', 'C', NULL),
(@pack_id, 9, '以下哪项技能对技术文档写作的职业发展最重要？', '气象学', '航空航天', '技术写作', '微生物学', 'C', NULL),
(@pack_id, 10, '以下哪项是技术文档写作的核心技能之一？', '机械维修', '书法篆刻', '雕塑艺术', '技术写作', 'D', NULL),
(@pack_id, 11, '以下哪项是技术文档写作的核心技能之一？', 'DITA', '量子物理', '石油钻探', '考古学', 'A', NULL),
(@pack_id, 12, '技术文档写作需要融合哪两个学科的知识？', '历史和地理', '金融和建筑', '软件工程和英语', '艺术和体育', 'C', NULL),
(@pack_id, 13, '技术文档写作的初级年薪范围是？', '100-150万', '5-8万', '200-300万', '10-16', 'D', NULL),
(@pack_id, 14, '技术文档写作的复合学科背景使其在就业市场上具有？', '劣势', '竞争优势', '无影响', '负面作用', 'B', NULL),
(@pack_id, 15, '技术文档写作的工作强度属于？', '极高', '低', '中等', '较高', 'B', NULL),
(@pack_id, 16, '技术文档写作的高级年薪范围是？', '30-40万', '200-250万', '28-35', '250-300万', 'C', NULL),
(@pack_id, 17, '技术文档写作的薪资结构中，初级岗位年薪约为？', '3-5万', '5-10万', '80-100万', '10-16', 'D', NULL),
(@pack_id, 18, '软件工程×英语交叉领域对应的岗位是？', '技术文档写作', '软件本地化工程师', '营销技术专家(MarTech)', 'SEO/SEM策略师', 'A', NULL),
(@pack_id, 19, '技术文档写作需要持续学习的原因是？', '学习不重要', '技术更新快', '无需学习', '学习有坏处', 'B', NULL),
(@pack_id, 20, '技术文档写作属于哪个学科组合？', '软件工程×英语', '临床医学×数据科学', '电气工程×金融学', '法学×会计学', 'A', NULL),
(@pack_id, 21, '技术文档写作的中级年薪范围是？', '18-25', '10-15万', '150-200万', '200-250万', 'A', NULL),
(@pack_id, 22, '以下哪项是技术文档写作的核心技能之一？', '美容师', '技术写作', '建筑工程', '天文学', 'B', NULL),
(@pack_id, 23, '技术文档写作的职业发展路径通常从什么级别开始？', '合伙人', '志愿者', '初级', '顾问', 'C', NULL),
(@pack_id, 24, '技术文档写作对硕士学历的要求是？', '硕士10%', '硕士50%', '硕士0%', '硕士20%', 'A', NULL),
(@pack_id, 25, '技术文档写作面试时最可能被考察的技能是？', '技术写作', '地质学', '理发师', '微生物学', 'A', NULL),
(@pack_id, 26, '技术文档写作在项目中最需要运用的能力是？', '气象学', '美容师', '技术写作', '天文学', 'C', NULL),
(@pack_id, 27, '技术文档写作的岗位竞争激烈程度为？', '2:1', '1:1', '3:1', '8:1', 'D', NULL),
(@pack_id, 28, '技术文档写作工作中最可能使用的工具是？', '翻译软件/编辑器', '挖掘机', '手术刀', '钢琴', 'A', NULL),
(@pack_id, 29, '技术文档写作的学科组合中，第一个学科是？', '数据科学', '市场营销', '法学', '软件工程', 'D', NULL),
(@pack_id, 30, '技术文档写作的岗位中，最高学历要求通常是什么？', '本科', '大专', '高中', '硕士', 'D', NULL),
(@pack_id, 31, '以下哪项最接近技术文档写作的学历分布？', '博士100%', '本科100%', '本科90% 硕士10%', '高中100%', 'C', NULL),
(@pack_id, 32, '技术文档写作的竞争比是？', '100:1', '10:1', '8:1', '5:1', 'C', NULL),
(@pack_id, 33, '在技术文档写作的日常工作中，最常用的技能组合是？', '钢琴演奏', '技术写作、DITA', '地质学', '微生物学', 'B', NULL),
(@pack_id, 34, '以下哪个岗位名称与专业125对应？', '用户增长分析师', '技术文档写作', 'DevOps工程师', '医疗软件产品经理', 'B', NULL),
(@pack_id, 35, '技术文档写作属于以下哪类岗位热度？', '极低', '淘汰', '低', '无热度', 'C', NULL),
(@pack_id, 36, '技术文档写作岗位要求掌握软件工程和英语的复合知识，这属于？', '跨学科复合岗位', '单一学科岗位', '体力劳动岗位', '纯技术岗位', 'A', NULL),
(@pack_id, 37, '以下哪项是技术文档写作的核心技能之一？', '书法篆刻', '机械维修', '美容师', '技术写作', 'D', NULL),
(@pack_id, 38, '应聘技术文档写作时，平均多少人竞争1个岗位？', '3人', '5人', '2人', '8', 'D', NULL),
(@pack_id, 39, '以下哪项是技术文档写作的核心技能之一？', '钢琴演奏', '技术写作', '焊接技术', '铣床加工', 'B', NULL),
(@pack_id, 40, '技术文档写作的工作中不涉及以下哪项技能？', 'DITA', '采矿工程', '英语', '技术写作', 'B', NULL),
(@pack_id, 41, '技术文档写作的学历门槛是？', '本科90% 硕士10%', '无要求', '博士100%', '大专即可', 'A', NULL),
(@pack_id, 42, '技术文档写作的工作强度等级是？', '2', '4', '1', '3', 'C', NULL),
(@pack_id, 43, '以下哪项是技术文档写作的交叉学科背景？', '三个学科', '四个学科', '单一学科', '软件工程×英语', 'D', NULL),
(@pack_id, 44, '应聘技术文档写作，本科学历占比约为？', '20%', '90%', '100%', '10%', 'B', NULL),
(@pack_id, 45, '在1-5级工作强度体系中，技术文档写作属于哪一级？', '7级', '0级', '1', '8级', 'C', NULL),
(@pack_id, 46, '专业125的岗位名称是？', '技术文档写作', '医保精算师', '真实世界研究数据专家', '大数据平台开发', 'A', NULL),
(@pack_id, 47, '技术文档写作的工作成果通常以什么形式呈现？', '建筑', '软件', '文本/文档', '食品', 'C', NULL),
(@pack_id, 48, '以下哪项最符合技术文档写作的职业特点？', '纯体力型', '跨学科复合型人才', '无技能型', '单一技能型', 'B', NULL),
(@pack_id, 49, '以下哪项是技术文档写作的核心技能之一？', '航空航天', '机械维修', '英语', '拓扑学', 'C', NULL),
(@pack_id, 50, '技术文档写作的竞争比8:1意味着？', '平均8人竞争1个岗位', '1人竞争多个岗位', '内部推荐即可', '自动录取', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业126：软件工程×英语 — 海外技术支持
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:0', 126, '海外技术支持', 'major_swe', 'major_english', '软件工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '海外技术支持面试时最可能被考察的技能是？', '英语口语', '矿物学', '服装设计', '核工程', 'A', NULL),
(@pack_id, 2, '海外技术支持属于以下哪个领域的岗位？', '纯艺术', '软件工程/英语复合领域', '纯体育', '纯文科', 'B', NULL),
(@pack_id, 3, '以下哪项是海外技术支持的核心技能之一？', '英语口语', '植物学', '海洋学', '气象学', 'A', NULL),
(@pack_id, 4, '海外技术支持的工作强度等级是？', '5', '4', '3', '2', 'C', NULL),
(@pack_id, 5, '在海外技术支持的日常工作中，最常用的技能组合是？', '英语口语、软件调试', '天文学', '园艺设计', '雕塑艺术', 'A', NULL),
(@pack_id, 6, '海外技术支持的职业发展路径通常从什么级别开始？', '合伙人', '初级', '顾问', '实习生', 'B', NULL),
(@pack_id, 7, '以下哪个岗位名称与专业126对应？', '推荐系统产品经理', '海外技术支持', '英文技术支持', '交易系统开发', 'B', NULL),
(@pack_id, 8, '海外技术支持的工作中不涉及以下哪项技能？', '软件调试', '客户沟通', '英语口语', '车床操作', 'D', NULL),
(@pack_id, 9, '海外技术支持的工作强度评级为3，对应描述是？', '一般', '轻松', '高', '繁忙', 'C', NULL),
(@pack_id, 10, '海外技术支持需要持续学习的原因是？', '技术更新快', '学习内容少', '无需学习', '学习有坏处', 'A', NULL),
(@pack_id, 11, '以下哪个场景最符合海外技术支持的工作环境？', '专业场所', '手术室', '法庭', '农田', 'A', NULL),
(@pack_id, 12, '海外技术支持的中级年薪范围是？', '200-250万', '15-20万', '20-30', '150-200万', 'C', NULL),
(@pack_id, 13, '海外技术支持属于以下哪类岗位热度？', '中', '冷门', '极低', '无热度', 'A', NULL),
(@pack_id, 14, '在1-5级工作强度体系中，海外技术支持属于哪一级？', '0级', '7级', '3', '6级', 'C', NULL),
(@pack_id, 15, '海外技术支持不需要以下哪项能力？', '专业能力C', '专业能力A', '无关能力', '专业能力B', 'C', NULL),
(@pack_id, 16, '海外技术支持的岗位竞争激烈程度为？', '1:1', '4:1', '2:1', '10:1', 'D', NULL),
(@pack_id, 17, '以下哪项不是海外技术支持的主要工作内容？', '核心工作B', '核心工作C', '核心工作A', 'unrelated_work', 'D', NULL),
(@pack_id, 18, '以下哪项技能对海外技术支持的职业发展最重要？', '航空航天', '陶瓷工艺', '英语口语', '考古学', 'C', NULL),
(@pack_id, 19, '以下哪项是海外技术支持的核心技能之一？', '舞蹈编排', '古生物学', '量子物理', '客户沟通', 'D', NULL),
(@pack_id, 20, '海外技术支持需要融合哪两个学科的知识？', '法学和医学', '艺术和体育', '软件工程和英语', '金融和建筑', 'C', NULL),
(@pack_id, 21, '海外技术支持属于哪个学科组合？', '电气工程×金融学', '软件工程×英语', '市场营销×英语', '法学×会计学', 'B', NULL),
(@pack_id, 22, '海外技术支持的工作强度属于？', '高', '较低', '极低', '中等', 'A', NULL),
(@pack_id, 23, '以下哪项是海外技术支持的核心技能之一？', '软件调试', '量子物理', '园艺设计', '拓扑学', 'A', NULL),
(@pack_id, 24, '专业126的岗位名称是？', '医疗器械产品经理', '海外技术支持', '财富管理顾问', '医药代表', 'B', NULL),
(@pack_id, 25, '以下哪项是海外技术支持的核心技能之一？', '舞蹈编排', '航空航天', '珠宝鉴定', '软件调试', 'D', NULL),
(@pack_id, 26, '以下哪项是海外技术支持的核心技能之一？', '植物学', '珠宝鉴定', '版画制作', '英语口语', 'D', NULL),
(@pack_id, 27, '海外技术支持的学历门槛是？', '无要求', '博士100%', '本科80% 硕士20%', '高中即可', 'C', NULL),
(@pack_id, 28, '以下哪项是海外技术支持的核心技能之一？', '昆虫学', '英语口语', '铸造工艺', '舞蹈编排', 'B', NULL),
(@pack_id, 29, '海外技术支持的薪资结构中，初级岗位年薪约为？', '5-10万', '12-18', '3-5万', '120-150万', 'B', NULL),
(@pack_id, 30, '以下哪个不是海外技术支持的别称？', '海外技术支持(资深)', '软件工程×英语专家', '国际品牌策划', '海外技术支持(高级)', 'C', NULL),
(@pack_id, 31, '以下哪项最接近海外技术支持的高级年薪上限？', '50', '20万', '40万', '30万', 'A', NULL),
(@pack_id, 32, '以下哪项是海外技术支持的核心技能之一？', '建筑工程', '服装设计', '海洋学', '客户沟通', 'D', NULL),
(@pack_id, 33, '海外技术支持的高级年薪范围是？', '20-30万', '35-50', '250-300万', '30-40万', 'B', NULL),
(@pack_id, 34, '海外技术支持的竞争比10:1意味着？', '内部推荐即可', '平均10人竞争1个岗位', '无竞争', '自动录取', 'B', NULL),
(@pack_id, 35, '海外技术支持的工作成果通常以什么形式呈现？', '专业成果', '食品', '建筑', '油画', 'A', NULL),
(@pack_id, 36, '以下哪项是海外技术支持的核心技能之一？', '焊接技术', '客户沟通', '书法篆刻', '核工程', 'B', NULL),
(@pack_id, 37, '以下哪个竞争比与海外技术支持相符？', '10:1', '1:10', '1:20', '1:5', 'A', NULL),
(@pack_id, 38, '海外技术支持在项目中最需要运用的能力是？', '版画制作', '钳工工艺', '英语口语', '机械维修', 'C', NULL),
(@pack_id, 39, '海外技术支持的学科组合中，第一个学科是？', '数据科学', '软件工程', '市场营销', '法学', 'B', NULL),
(@pack_id, 40, '以下哪项是海外技术支持的核心技能之一？', '机械维修', '园艺设计', '核工程', '英语口语', 'D', NULL),
(@pack_id, 41, '海外技术支持对硕士学历的要求是？', '硕士10%', '硕士0%', '硕士20%', '硕士50%', 'C', NULL),
(@pack_id, 42, '软件工程×英语交叉领域对应的岗位是？', '量化交易平台工程师', '推荐系统产品经理', '医院信息系统实施', '海外技术支持', 'D', NULL),
(@pack_id, 43, '以下哪个数字代表海外技术支持的工作强度？', '8', '3', '7', '0', 'B', NULL),
(@pack_id, 44, '应聘海外技术支持时，平均多少人竞争1个岗位？', '2人', '4人', '5人', '10', 'D', NULL),
(@pack_id, 45, '海外技术支持的初级年薪范围是？', '12-18', '200-300万', '8-12万', '5-8万', 'A', NULL),
(@pack_id, 46, '以下哪项是海外技术支持的核心技能之一？', '油画技法', '软件调试', '车床操作', '植物学', 'B', NULL),
(@pack_id, 47, '以下哪项最接近海外技术支持的学历分布？', '本科80% 硕士20%', '高中100%', '硕士100%', '博士100%', 'A', NULL),
(@pack_id, 48, '应聘海外技术支持，本科学历占比约为？', '90%', '20%', '80%', '100%', 'C', NULL),
(@pack_id, 49, '海外技术支持工作中最可能使用的工具是？', '专业工具', '挖掘机', '钢琴', '手术刀', 'A', NULL),
(@pack_id, 50, '海外技术支持的竞争比是？', '10:1', '8:1', '5:1', '100:1', 'A', NULL);
COMMIT;

-- ======================================================
-- 专业127：市场营销×数据科学 — 市场数据分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_ds:0', 127, '市场数据分析师', 'major_marketing', 'major_ds', '市场营销×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项最符合市场数据分析师的职业特点？', '纯管理型', '单一技能型', '跨学科复合型人才', '无技能型', 'C', NULL),
(@pack_id, 2, '以下哪个岗位名称与专业127对应？', '金融软件产品经理', 'DevOps工程师', '国际医疗协调员', '市场数据分析师', 'D', NULL),
(@pack_id, 3, '市场数据分析师的职业发展路径通常从什么级别开始？', '志愿者', '顾问', '初级', '实习生', 'C', NULL),
(@pack_id, 4, '市场数据分析师的工作中不涉及以下哪项技能？', '统计学', 'Excel/Tableau', 'SQL', '核工程', 'D', NULL),
(@pack_id, 5, '应聘市场数据分析师，本科学历占比约为？', '20%', '10%', '40%', '90%', 'C', NULL),
(@pack_id, 6, '以下哪项是市场数据分析师的核心技能之一？', '昆虫学', '理发师', '珠宝鉴定', 'SQL', 'D', NULL),
(@pack_id, 7, '市场数据分析师的中级年薪范围是？', '15-20万', '35-50', '200-250万', '10-15万', 'B', NULL),
(@pack_id, 8, '市场数据分析师的学科组合中，第一个学科是？', '数据科学', '会计学', '法学', '市场营销', 'D', NULL),
(@pack_id, 9, '以下哪项是市场数据分析师的核心技能之一？', '拓扑学', 'SQL', '气象学', '海洋学', 'B', NULL),
(@pack_id, 10, '以下哪个不是市场数据分析师的别称？', '双语数据报告撰写', '市场数据分析师(资深)', '市场数据分析师', '市场数据分析师(高级)', 'A', NULL),
(@pack_id, 11, '以下哪项技能对市场数据分析师的职业发展最重要？', 'SQL', '茶艺师', '舞蹈编排', '钢琴演奏', 'A', NULL),
(@pack_id, 12, '以下哪项最接近市场数据分析师的学历分布？', '本科100%', '高中100%', '博士100%', '本科40% 硕士60%', 'D', NULL),
(@pack_id, 13, '市场数据分析师的工作强度评级为3，对应描述是？', '高', '轻松', '一般', '超负荷', 'A', NULL),
(@pack_id, 14, '在1-5级工作强度体系中，市场数据分析师属于哪一级？', '7级', '8级', '3', '6级', 'C', NULL),
(@pack_id, 15, '以下哪项是市场数据分析师的核心技能之一？', '焊接技术', '微生物学', '植物学', 'SQL', 'D', NULL),
(@pack_id, 16, '市场数据分析师需要融合哪两个学科的知识？', '艺术和体育', '法学和医学', '市场营销和数据科学', '历史和地理', 'C', NULL),
(@pack_id, 17, '以下哪项是市场数据分析师的核心技能之一？', '铸造工艺', '植物学', '统计学', '服装设计', 'C', NULL),
(@pack_id, 18, '市场数据分析师的工作成果通常以什么形式呈现？', '油画', '食品', '分析报告', '建筑', 'C', NULL),
(@pack_id, 19, '市场数据分析师的竞争比30:1意味着？', '平均30人竞争1个岗位', '无竞争', '1人竞争多个岗位', '内部推荐即可', 'A', NULL),
(@pack_id, 20, '市场数据分析师的岗位中，最高学历要求通常是什么？', '本科', '硕士', '大专', '博士后', 'B', NULL),
(@pack_id, 21, '以下哪个竞争比与市场数据分析师相符？', '30:1', '1:20', '1:100', '1:10', 'A', NULL),
(@pack_id, 22, '专业127的岗位名称是？', '市场数据分析师', '医疗市场专员', '双语数据报告撰写', '数据仓库工程师', 'A', NULL),
(@pack_id, 23, '以下哪项不是市场数据分析师的主要工作内容？', '模型构建', '数据收集', '产品制造', '趋势分析', 'C', NULL),
(@pack_id, 24, '市场数据分析师的初级年薪范围是？', '5-8万', '8-12万', '18-28', '200-300万', 'C', NULL),
(@pack_id, 25, '市场数据分析师面试时最可能被考察的技能是？', 'SQL', '车床操作', '服装设计', '核工程', 'A', NULL),
(@pack_id, 26, '市场数据分析师的学历门槛是？', '博士100%', '高中即可', '大专即可', '本科40% 硕士60%', 'D', NULL),
(@pack_id, 27, '以下哪项是市场数据分析师的核心技能之一？', 'Excel/Tableau', '车床操作', '理发师', '钢琴演奏', 'A', NULL),
(@pack_id, 28, '市场数据分析师属于以下哪个领域的岗位？', '纯理科', '纯体育', '纯艺术', '市场营销/数据科学复合领域', 'D', NULL),
(@pack_id, 29, '市场数据分析师不需要以下哪项能力？', '逻辑思维', '手工焊接', '软件操作', '数学能力', 'B', NULL),
(@pack_id, 30, '市场数据分析师岗位要求掌握市场营销和数据科学的复合知识，这属于？', '单一学科岗位', '跨学科复合岗位', '体力劳动岗位', '纯管理岗位', 'B', NULL),
(@pack_id, 31, '市场数据分析师属于以下哪类岗位热度？', '高', '冷门', '极低', '无热度', 'A', NULL),
(@pack_id, 32, '市场数据分析师的工作强度等级是？', '1', '5', '3', '2', 'C', NULL),
(@pack_id, 33, '以下哪项是市场数据分析师的核心技能之一？', '园艺设计', '统计学', '陶瓷工艺', '烹饪技术', 'B', NULL),
(@pack_id, 34, '以下哪项是市场数据分析师的核心技能之一？', '量子物理', '采矿工程', '气象学', 'SQL', 'D', NULL),
(@pack_id, 35, '以下哪项是市场数据分析师的核心技能之一？', '珠宝鉴定', 'Excel/Tableau', '烹饪技术', '版画制作', 'B', NULL),
(@pack_id, 36, '以下哪项最接近市场数据分析师的高级年薪上限？', '50万', '30万', '85', '20万', 'C', NULL),
(@pack_id, 37, '市场数据分析师的复合学科背景使其在就业市场上具有？', '无影响', '负面作用', '被淘汰风险', '竞争优势', 'D', NULL),
(@pack_id, 38, '市场数据分析师的岗位竞争激烈程度为？', '3:1', '30:1', '2:1', '4:1', 'B', NULL),
(@pack_id, 39, '市场数据分析师对硕士学历的要求是？', '硕士0%', '硕士50%', '硕士60%', '硕士10%', 'C', NULL),
(@pack_id, 40, '以下哪个数字代表市场数据分析师的工作强度？', '0', '3', '7', '8', 'B', NULL),
(@pack_id, 41, '市场数据分析师工作中最可能使用的工具是？', '手术刀', '数据分析软件', '挖掘机', '钢琴', 'B', NULL),
(@pack_id, 42, '以下哪项是市场数据分析师的交叉学科背景？', '市场营销×数据科学', '单一学科', '三个学科', '四个学科', 'A', NULL),
(@pack_id, 43, '在市场数据分析师的日常工作中，最常用的技能组合是？', 'SQL、Excel/Tableau', '考古学', '钳工工艺', '焊接技术', 'A', NULL),
(@pack_id, 44, '市场数据分析师的工作强度属于？', '极高', '极低', '高', '中等', 'C', NULL),
(@pack_id, 45, '应聘市场数据分析师时，平均多少人竞争1个岗位？', '30', '2人', '4人', '3人', 'A', NULL),
(@pack_id, 46, '市场数据分析师在项目中最需要运用的能力是？', '矿物学', '焊接技术', 'SQL', '铣床加工', 'C', NULL),
(@pack_id, 47, '市场营销×数据科学交叉领域对应的岗位是？', '推荐系统产品经理', '市场数据分析师', '技术文档写作', '真实世界研究数据专家', 'B', NULL),
(@pack_id, 48, '以下哪项是市场数据分析师的核心技能之一？', '统计学', '烹饪技术', '车床操作', '陶瓷工艺', 'A', NULL),
(@pack_id, 49, '以下哪个场景最符合市场数据分析师的工作环境？', '农田', '手术室', '法庭', '数据分析室', 'D', NULL),
(@pack_id, 50, '市场数据分析师的高级年薪范围是？', '250-300万', '200-250万', '60-85', '30-40万', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业128：市场营销×数据科学 — 用户增长分析师
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_ds:1', 128, '用户增长分析师', 'major_marketing', 'major_ds', '市场营销×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '在1-5级工作强度体系中，用户增长分析师属于哪一级？', '3', '7级', '0级', '6级', 'A', NULL),
(@pack_id, 2, '以下哪个数字代表用户增长分析师的工作强度？', '7', '3', '0', '6', 'B', NULL),
(@pack_id, 3, '用户增长分析师工作中最可能使用的工具是？', '数据分析软件', '钢琴', '挖掘机', '手术刀', 'A', NULL),
(@pack_id, 4, '用户增长分析师的竞争比是？', '25:1', '100:1', '5:1', '8:1', 'A', NULL),
(@pack_id, 5, '以下哪项最接近用户增长分析师的高级年薪上限？', '20万', '50万', '95', '40万', 'C', NULL),
(@pack_id, 6, '用户增长分析师的学科组合中，第一个学科是？', '数据科学', '市场营销', '会计学', '法学', 'B', NULL),
(@pack_id, 7, '以下哪项是用户增长分析师的核心技能之一？', '天文学', '烹饪技术', '铸造工艺', '增长模型', 'D', NULL),
(@pack_id, 8, '用户增长分析师的高级年薪范围是？', '30-40万', '250-300万', '20-30万', '65-95', 'D', NULL),
(@pack_id, 9, '以下哪项不是用户增长分析师的主要工作内容？', '产品制造', '趋势分析', '数据收集', '模型构建', 'A', NULL),
(@pack_id, 10, '用户增长分析师不需要以下哪项能力？', '软件操作', '逻辑思维', '手工焊接', '数学能力', 'C', NULL),
(@pack_id, 11, '以下哪项是用户增长分析师的核心技能之一？', '服装设计', '石油钻探', '珠宝鉴定', 'A/B测试', 'D', NULL),
(@pack_id, 12, '用户增长分析师的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '竞争优势', '无影响', 'C', NULL),
(@pack_id, 13, '以下哪项是用户增长分析师的核心技能之一？', '珠宝鉴定', '拓扑学', '油画技法', '增长模型', 'D', NULL),
(@pack_id, 14, '用户增长分析师在项目中最需要运用的能力是？', '增长模型', '昆虫学', '天文学', '机械维修', 'A', NULL),
(@pack_id, 15, '用户增长分析师面试时最可能被考察的技能是？', '考古学', '增长模型', '焊接技术', '植物学', 'B', NULL),
(@pack_id, 16, '以下哪项是用户增长分析师的核心技能之一？', '气象学', '书法篆刻', 'Python', '理发师', 'C', NULL),
(@pack_id, 17, '用户增长分析师的学历门槛是？', '本科30% 硕士70%', '高中即可', '博士100%', '无要求', 'A', NULL),
(@pack_id, 18, '以下哪项是用户增长分析师的核心技能之一？', '量子物理', '理发师', '增长模型', '矿物学', 'C', NULL),
(@pack_id, 19, '用户增长分析师的工作强度评级为3，对应描述是？', '繁忙', '超负荷', '高', '一般', 'C', NULL),
(@pack_id, 20, '用户增长分析师的中级年薪范围是？', '35-55', '150-200万', '200-250万', '15-20万', 'A', NULL),
(@pack_id, 21, '用户增长分析师的职业发展路径通常从什么级别开始？', '初级', '志愿者', '顾问', '实习生', 'A', NULL),
(@pack_id, 22, '用户增长分析师的竞争比25:1意味着？', '平均25人竞争1个岗位', '内部推荐即可', '自动录取', '1人竞争多个岗位', 'A', NULL),
(@pack_id, 23, '专业128的岗位名称是？', '医药代表', '双语数据报告撰写', '用户增长分析师', '跨境并购翻译', 'C', NULL),
(@pack_id, 24, '用户增长分析师需要持续学习的原因是？', '学习有坏处', '学习内容少', '技术更新快', '学习不重要', 'C', NULL),
(@pack_id, 25, '用户增长分析师岗位要求掌握市场营销和数据科学的复合知识，这属于？', '跨学科复合岗位', '体力劳动岗位', '单一学科岗位', '纯技术岗位', 'A', NULL),
(@pack_id, 26, '以下哪项技能对用户增长分析师的职业发展最重要？', '增长模型', '采矿工程', '核工程', '茶艺师', 'A', NULL),
(@pack_id, 27, '以下哪个场景最符合用户增长分析师的工作环境？', '手术室', '数据分析室', '农田', '法庭', 'B', NULL),
(@pack_id, 28, '用户增长分析师属于以下哪类岗位热度？', '冷门', '高', '淘汰', '极低', 'B', NULL),
(@pack_id, 29, '以下哪个岗位名称与专业128对应？', '大数据平台开发', '数据科学翻译', '量化交易平台工程师', '用户增长分析师', 'D', NULL),
(@pack_id, 30, '以下哪项是用户增长分析师的核心技能之一？', '园艺设计', '珠宝鉴定', 'A/B测试', '古生物学', 'C', NULL),
(@pack_id, 31, '用户增长分析师的初级年薪范围是？', '18-30', '100-150万', '8-12万', '5-8万', 'A', NULL),
(@pack_id, 32, '以下哪项是用户增长分析师的核心技能之一？', '古生物学', '石油钻探', '理发师', '增长模型', 'D', NULL),
(@pack_id, 33, '市场营销×数据科学交叉领域对应的岗位是？', '医疗器械产品经理', '用户增长分析师', '量化交易平台工程师', '医学翻译', 'B', NULL),
(@pack_id, 34, '以下哪项是用户增长分析师的交叉学科背景？', '三个学科', '市场营销×数据科学', '四个学科', '单一学科', 'B', NULL),
(@pack_id, 35, '以下哪项最符合用户增长分析师的职业特点？', '单一技能型', '跨学科复合型人才', '纯管理型', '无技能型', 'B', NULL),
(@pack_id, 36, '用户增长分析师的工作强度属于？', '中等', '极低', '极高', '高', 'D', NULL),
(@pack_id, 37, '在用户增长分析师的日常工作中，最常用的技能组合是？', '增长模型、A/B测试', '珠宝鉴定', '考古学', '机械维修', 'A', NULL),
(@pack_id, 38, '用户增长分析师的岗位竞争激烈程度为？', '2:1', '25:1', '4:1', '1:1', 'B', NULL),
(@pack_id, 39, '用户增长分析师的薪资结构中，初级岗位年薪约为？', '3-5万', '18-30', '120-150万', '5-10万', 'B', NULL),
(@pack_id, 40, '应聘用户增长分析师时，平均多少人竞争1个岗位？', '4人', '25', '2人', '3人', 'B', NULL),
(@pack_id, 41, '以下哪个不是用户增长分析师的别称？', '用户增长分析师(高级)', '市场营销×数据科学专家', '医疗器械产品经理', '用户增长分析师(资深)', 'C', NULL),
(@pack_id, 42, '用户增长分析师的工作成果通常以什么形式呈现？', '建筑', '油画', '食品', '分析报告', 'D', NULL),
(@pack_id, 43, '用户增长分析师属于哪个学科组合？', '电气工程×金融学', '临床医学×数据科学', '市场营销×数据科学', '法学×会计学', 'C', NULL),
(@pack_id, 44, '以下哪项是用户增长分析师的核心技能之一？', '航空航天', 'A/B测试', '雕塑艺术', '茶艺师', 'B', NULL),
(@pack_id, 45, '以下哪项是用户增长分析师的核心技能之一？', '理发师', 'Python', '古生物学', '海洋学', 'B', NULL),
(@pack_id, 46, '应聘用户增长分析师，本科学历占比约为？', '20%', '100%', '90%', '30%', 'D', NULL),
(@pack_id, 47, '以下哪项是用户增长分析师的核心技能之一？', 'Python', '建筑工程', '版画制作', '石油钻探', 'A', NULL),
(@pack_id, 48, '以下哪个竞争比与用户增长分析师相符？', '1:20', '25:1', '1:10', '1:5', 'B', NULL),
(@pack_id, 49, '以下哪项最接近用户增长分析师的学历分布？', '本科100%', '博士100%', '硕士100%', '本科30% 硕士70%', 'D', NULL),
(@pack_id, 50, '用户增长分析师的工作强度等级是？', '2', '1', '4', '3', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业129：市场营销×数据科学 — 客户画像建模
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_ds:2', 129, '客户画像建模', 'major_marketing', 'major_ds', '市场营销×数据科学', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项不是客户画像建模的主要工作内容？', '核心工作A', '核心工作C', 'unrelated_work', '核心工作B', 'C', NULL),
(@pack_id, 2, '以下哪个数字代表客户画像建模的工作强度？', '7', '3', '8', '6', 'B', NULL),
(@pack_id, 3, '客户画像建模需要持续学习的原因是？', '学习不重要', '技术更新快', '学习内容少', '无需学习', 'B', NULL),
(@pack_id, 4, '以下哪项是客户画像建模的核心技能之一？', '油画技法', '海洋学', 'SQL', '石油钻探', 'C', NULL),
(@pack_id, 5, '客户画像建模的岗位中，最高学历要求通常是什么？', '大专', '硕士', '博士后', '高中', 'B', NULL),
(@pack_id, 6, '客户画像建模的学科组合中，第一个学科是？', '法学', '市场营销', '会计学', '数据科学', 'B', NULL),
(@pack_id, 7, '以下哪项是客户画像建模的核心技能之一？', '版画制作', '烹饪技术', '石油钻探', '用户标签', 'D', NULL),
(@pack_id, 8, '客户画像建模的工作强度属于？', '极低', '高', '较低', '极高', 'B', NULL),
(@pack_id, 9, '以下哪个不是客户画像建模的别称？', '财富管理顾问', '客户画像建模(资深)', '客户画像建模', '市场营销×数据科学专家', 'A', NULL),
(@pack_id, 10, '客户画像建模的中级年薪范围是？', '38-58', '10-15万', '15-20万', '200-250万', 'A', NULL),
(@pack_id, 11, '客户画像建模不需要以下哪项能力？', '专业能力C', '专业能力B', '专业能力A', '无关能力', 'D', NULL),
(@pack_id, 12, '客户画像建模的竞争比是？', '5:1', '20:1', '100:1', '10:1', 'B', NULL),
(@pack_id, 13, '客户画像建模工作中最可能使用的工具是？', '手术刀', '钢琴', '挖掘机', '专业工具', 'D', NULL),
(@pack_id, 14, '以下哪项是客户画像建模的核心技能之一？', '版画制作', '舞蹈编排', '铸造工艺', '用户标签', 'D', NULL),
(@pack_id, 15, '应聘客户画像建模时，平均多少人竞争1个岗位？', '3人', '2人', '20', '5人', 'C', NULL),
(@pack_id, 16, '以下哪项最接近客户画像建模的高级年薪上限？', '20万', '50万', '100', '40万', 'C', NULL),
(@pack_id, 17, '客户画像建模属于以下哪类岗位热度？', '高', '极低', '淘汰', '无热度', 'A', NULL),
(@pack_id, 18, '以下哪项是客户画像建模的核心技能之一？', '聚类分析', '铸造工艺', '美容师', '舞蹈编排', 'A', NULL),
(@pack_id, 19, '客户画像建模对硕士学历的要求是？', '硕士0%', '硕士60%', '硕士50%', '硕士20%', 'B', NULL),
(@pack_id, 20, '客户画像建模属于以下哪个领域的岗位？', '纯体育', '纯艺术', '市场营销/数据科学复合领域', '纯理科', 'C', NULL),
(@pack_id, 21, '以下哪项技能对客户画像建模的职业发展最重要？', '聚类分析', '石油钻探', '采矿工程', '焊接技术', 'A', NULL),
(@pack_id, 22, '以下哪项是客户画像建模的核心技能之一？', '钢琴演奏', '茶艺师', 'SQL', '矿物学', 'C', NULL),
(@pack_id, 23, '客户画像建模岗位要求掌握市场营销和数据科学的复合知识，这属于？', '体力劳动岗位', '跨学科复合岗位', '纯技术岗位', '纯管理岗位', 'B', NULL),
(@pack_id, 24, '在1-5级工作强度体系中，客户画像建模属于哪一级？', '7级', '0级', '8级', '3', 'D', NULL),
(@pack_id, 25, '客户画像建模面试时最可能被考察的技能是？', '聚类分析', '烹饪技术', '版画制作', '气象学', 'A', NULL),
(@pack_id, 26, '客户画像建模属于哪个学科组合？', '市场营销×英语', '电气工程×金融学', '法学×会计学', '市场营销×数据科学', 'D', NULL),
(@pack_id, 27, '在客户画像建模的日常工作中，最常用的技能组合是？', '昆虫学', '建筑工程', '聚类分析、SQL', '量子物理', 'C', NULL),
(@pack_id, 28, '客户画像建模的复合学科背景使其在就业市场上具有？', '劣势', '负面作用', '被淘汰风险', '竞争优势', 'D', NULL),
(@pack_id, 29, '客户画像建模的工作成果通常以什么形式呈现？', '专业成果', '食品', '油画', '建筑', 'A', NULL),
(@pack_id, 30, '客户画像建模在项目中最需要运用的能力是？', '昆虫学', '聚类分析', '量子物理', '烹饪技术', 'B', NULL),
(@pack_id, 31, '以下哪项是客户画像建模的交叉学科背景？', '单一学科', '无学科要求', '四个学科', '市场营销×数据科学', 'D', NULL),
(@pack_id, 32, '以下哪项是客户画像建模的核心技能之一？', '航空航天', '核工程', '珠宝鉴定', '聚类分析', 'D', NULL),
(@pack_id, 33, '客户画像建模的竞争比20:1意味着？', '无竞争', '内部推荐即可', '自动录取', '平均20人竞争1个岗位', 'D', NULL),
(@pack_id, 34, '客户画像建模的职业发展路径通常从什么级别开始？', '顾问', '志愿者', '合伙人', '初级', 'D', NULL),
(@pack_id, 35, '客户画像建模的薪资结构中，初级岗位年薪约为？', '120-150万', '20-32', '80-100万', '5-10万', 'B', NULL),
(@pack_id, 36, '客户画像建模的工作中不涉及以下哪项技能？', '聚类分析', 'SQL', '海洋学', '用户标签', 'C', NULL),
(@pack_id, 37, '以下哪项是客户画像建模的核心技能之一？', '植物学', '地质学', '聚类分析', '烹饪技术', 'C', NULL),
(@pack_id, 38, '以下哪个竞争比与客户画像建模相符？', '1:10', '1:20', '1:100', '20:1', 'D', NULL),
(@pack_id, 39, '客户画像建模的高级年薪范围是？', '200-250万', '70-100', '20-30万', '250-300万', 'B', NULL),
(@pack_id, 40, '以下哪项是客户画像建模的核心技能之一？', '海洋学', '考古学', 'SQL', '美容师', 'C', NULL),
(@pack_id, 41, '以下哪个岗位名称与专业129对应？', '医药代表', '客户画像建模', '海外营销专员', '跨境电商运营', 'B', NULL),
(@pack_id, 42, '专业129的岗位名称是？', 'SCI论文编辑', '金融软件产品经理', '客户画像建模', '海外技术支持', 'C', NULL),
(@pack_id, 43, '以下哪项是客户画像建模的核心技能之一？', '植物学', '用户标签', '版画制作', '拓扑学', 'B', NULL),
(@pack_id, 44, '客户画像建模需要融合哪两个学科的知识？', '艺术和体育', '市场营销和数据科学', '历史和地理', '金融和建筑', 'B', NULL),
(@pack_id, 45, '以下哪项是客户画像建模的核心技能之一？', '采矿工程', '聚类分析', '航空航天', '雕塑艺术', 'B', NULL),
(@pack_id, 46, '客户画像建模的岗位竞争激烈程度为？', '20:1', '3:1', '1:1', '2:1', 'A', NULL),
(@pack_id, 47, '客户画像建模的工作强度等级是？', '1', '2', '4', '3', 'D', NULL),
(@pack_id, 48, '应聘客户画像建模，本科学历占比约为？', '10%', '40%', '90%', '100%', 'B', NULL),
(@pack_id, 49, '以下哪项最符合客户画像建模的职业特点？', '跨学科复合型人才', '纯管理型', '纯体力型', '单一技能型', 'A', NULL),
(@pack_id, 50, '市场营销×数据科学交叉领域对应的岗位是？', '真实世界研究数据专家', '客户画像建模', '生物信息分析师', '医保精算师', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业130：市场营销×英语 — 海外营销专员
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_english:0', 130, '海外营销专员', 'major_marketing', 'major_english', '市场营销×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是海外营销专员的核心技能之一？', '英语', '书法篆刻', '天文学', '航空航天', 'A', NULL),
(@pack_id, 2, '海外营销专员的岗位竞争激烈程度为？', '15:1', '4:1', '3:1', '1:1', 'A', NULL),
(@pack_id, 3, '海外营销专员需要融合哪两个学科的知识？', '市场营销和英语', '艺术和体育', '历史和地理', '金融和建筑', 'A', NULL),
(@pack_id, 4, '以下哪项是海外营销专员的核心技能之一？', '版画制作', '烹饪技术', '跨境电商', '微生物学', 'C', NULL),
(@pack_id, 5, '海外营销专员的中级年薪范围是？', '10-15万', '15-20万', '25-40', '200-250万', 'C', NULL),
(@pack_id, 6, '以下哪项是海外营销专员的核心技能之一？', '书法篆刻', '版画制作', '英语', '矿物学', 'C', NULL),
(@pack_id, 7, '海外营销专员的复合学科背景使其在就业市场上具有？', '负面作用', '竞争优势', '无影响', '劣势', 'B', NULL),
(@pack_id, 8, '在海外营销专员的日常工作中，最常用的技能组合是？', '气象学', '植物学', '跨境电商、英语', '车床操作', 'C', NULL),
(@pack_id, 9, '海外营销专员的学历门槛是？', '大专即可', '本科70% 硕士30%', '博士100%', '高中即可', 'B', NULL),
(@pack_id, 10, '海外营销专员属于哪个学科组合？', '法学×会计学', '电气工程×金融学', '市场营销×英语', '临床医学×数据科学', 'C', NULL),
(@pack_id, 11, '以下哪项是海外营销专员的核心技能之一？', '数据分析', '理发师', '昆虫学', '珠宝鉴定', 'A', NULL),
(@pack_id, 12, '专业130的岗位名称是？', '营销技术专家(MarTech)', '医疗市场专员', '海外营销专员', '投资者关系专员', 'C', NULL),
(@pack_id, 13, '海外营销专员的薪资结构中，初级岗位年薪约为？', '80-100万', '5-10万', '120-150万', '12-20(提成)', 'D', NULL),
(@pack_id, 14, '以下哪项是海外营销专员的核心技能之一？', '英语', '烹饪技术', '天文学', '雕塑艺术', 'A', NULL),
(@pack_id, 15, '海外营销专员工作中最可能使用的工具是？', '纺织机', '办公软件', '手术器械', '焊接设备', 'B', NULL),
(@pack_id, 16, '以下哪个数字代表海外营销专员的工作强度？', '0', '8', '7', '3', 'D', NULL),
(@pack_id, 17, '海外营销专员的竞争比是？', '15:1', '10:1', '8:1', '100:1', 'A', NULL),
(@pack_id, 18, '海外营销专员属于以下哪个领域的岗位？', '纯艺术', '纯文科', '纯体育', '市场营销/英语复合领域', 'D', NULL),
(@pack_id, 19, '以下哪个场景最符合海外营销专员的工作环境？', '农田', '手术室', '工厂车间', '办公室/会议室', 'D', NULL),
(@pack_id, 20, '以下哪个岗位名称与专业130对应？', '金融数据分析师', '海外营销专员', '开发者关系工程师', '智能投顾算法工程师', 'B', NULL),
(@pack_id, 21, '海外营销专员在项目中最需要运用的能力是？', '理发师', '跨境电商', '书法篆刻', '陶瓷工艺', 'B', NULL),
(@pack_id, 22, '海外营销专员的工作强度属于？', '较低', '极高', '较高', '高', 'D', NULL),
(@pack_id, 23, '海外营销专员的职业发展路径通常从什么级别开始？', '实习生', '顾问', '初级', '合伙人', 'C', NULL),
(@pack_id, 24, '在1-5级工作强度体系中，海外营销专员属于哪一级？', '3', '8级', '7级', '6级', 'A', NULL),
(@pack_id, 25, '海外营销专员的工作成果通常以什么形式呈现？', '食品', '药品', '建筑', '方案/报告', 'D', NULL),
(@pack_id, 26, '海外营销专员的工作强度等级是？', '3', '4', '2', '1', 'A', NULL),
(@pack_id, 27, '海外营销专员的学科组合中，第一个学科是？', '市场营销', '数据科学', '会计学', '法学', 'A', NULL),
(@pack_id, 28, '海外营销专员对硕士学历的要求是？', '硕士0%', '硕士10%', '硕士30%', '硕士20%', 'C', NULL),
(@pack_id, 29, '市场营销×英语交叉领域对应的岗位是？', '量化交易平台工程师', '海外营销专员', '智能投顾算法工程师', '医疗市场专员', 'B', NULL),
(@pack_id, 30, '海外营销专员需要持续学习的原因是？', '学习内容少', '无需学习', '技术更新快', '学习有坏处', 'C', NULL),
(@pack_id, 31, '海外营销专员的工作中不涉及以下哪项技能？', '数据分析', '古生物学', '英语', '跨境电商', 'B', NULL),
(@pack_id, 32, '海外营销专员属于以下哪类岗位热度？', '冷门', '高', '淘汰', '极低', 'B', NULL),
(@pack_id, 33, '以下哪项是海外营销专员的交叉学科背景？', '单一学科', '无学科要求', '四个学科', '市场营销×英语', 'D', NULL),
(@pack_id, 34, '海外营销专员的工作强度评级为3，对应描述是？', '高', '繁忙', '超负荷', '一般', 'A', NULL),
(@pack_id, 35, '以下哪项是海外营销专员的核心技能之一？', '量子物理', '跨境电商', '航空航天', '服装设计', 'B', NULL),
(@pack_id, 36, '海外营销专员的岗位中，最高学历要求通常是什么？', '本科', '硕士', '博士后', '高中', 'B', NULL),
(@pack_id, 37, '海外营销专员岗位要求掌握市场营销和英语的复合知识，这属于？', '体力劳动岗位', '跨学科复合岗位', '纯管理岗位', '单一学科岗位', 'B', NULL),
(@pack_id, 38, '海外营销专员不需要以下哪项能力？', '机械操作', '分析能力', '写作能力', '沟通能力', 'A', NULL),
(@pack_id, 39, '以下哪项是海外营销专员的核心技能之一？', '机械维修', '铸造工艺', '跨境电商', '海洋学', 'C', NULL),
(@pack_id, 40, '海外营销专员的高级年薪范围是？', '200-250万', '30-40万', '50-80', '250-300万', 'C', NULL),
(@pack_id, 41, '以下哪项是海外营销专员的核心技能之一？', '烹饪技术', '机械维修', '数据分析', '铣床加工', 'C', NULL),
(@pack_id, 42, '以下哪项最接近海外营销专员的学历分布？', '本科70% 硕士30%', '高中100%', '硕士100%', '博士100%', 'A', NULL),
(@pack_id, 43, '以下哪项技能对海外营销专员的职业发展最重要？', '跨境电商', '考古学', '微生物学', '车床操作', 'A', NULL),
(@pack_id, 44, '以下哪个竞争比与海外营销专员相符？', '1:20', '1:10', '15:1', '1:100', 'C', NULL),
(@pack_id, 45, '海外营销专员面试时最可能被考察的技能是？', '舞蹈编排', '跨境电商', '陶瓷工艺', '雕塑艺术', 'B', NULL),
(@pack_id, 46, '以下哪项最接近海外营销专员的高级年薪上限？', '80', '30万', '50万', '40万', 'A', NULL),
(@pack_id, 47, '以下哪项是海外营销专员的核心技能之一？', '理发师', '微生物学', '海洋学', '数据分析', 'D', NULL),
(@pack_id, 48, '应聘海外营销专员时，平均多少人竞争1个岗位？', '15', '5人', '3人', '4人', 'A', NULL),
(@pack_id, 49, '应聘海外营销专员，本科学历占比约为？', '100%', '10%', '70%', '90%', 'C', NULL),
(@pack_id, 50, '以下哪项不是海外营销专员的主要工作内容？', '客户沟通', '芯片制造', '方案设计', '数据分析', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业131：市场营销×英语 — 跨境电商运营
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_english:1', 131, '跨境电商运营', 'major_marketing', 'major_english', '市场营销×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '跨境电商运营在项目中最需要运用的能力是？', '平台规则(Amazon)', '微生物学', '航空航天', '烹饪技术', 'A', NULL),
(@pack_id, 2, '以下哪个岗位名称与专业131对应？', '电子病历开发工程师', '英文技术支持', '跨境电商运营', '量化交易平台工程师', 'C', NULL),
(@pack_id, 3, '以下哪项是跨境电商运营的核心技能之一？', '铣床加工', '拓扑学', '铸造工艺', '平台规则(Amazon)', 'D', NULL),
(@pack_id, 4, '跨境电商运营的工作强度等级是？', '5', '3', '2', '1', 'B', NULL),
(@pack_id, 5, '跨境电商运营的学历门槛是？', '无要求', '本科60% 硕士40%', '博士100%', '大专即可', 'B', NULL),
(@pack_id, 6, '以下哪个竞争比与跨境电商运营相符？', '18:1', '1:10', '1:5', '1:100', 'A', NULL),
(@pack_id, 7, '以下哪项是跨境电商运营的核心技能之一？', '英语', '天文学', '美容师', '拓扑学', 'A', NULL),
(@pack_id, 8, '跨境电商运营对硕士学历的要求是？', '硕士10%', '硕士0%', '硕士40%', '硕士20%', 'C', NULL),
(@pack_id, 9, '跨境电商运营的中级年薪范围是？', '10-15万', '150-200万', '25-42', '15-20万', 'C', NULL),
(@pack_id, 10, '跨境电商运营的初级年薪范围是？', '200-300万', '12-20(提成)', '8-12万', '5-8万', 'B', NULL),
(@pack_id, 11, '市场营销×英语交叉领域对应的岗位是？', '医药行业研究员', '金融数据分析师', '跨境电商运营', '大数据平台开发', 'C', NULL),
(@pack_id, 12, '跨境电商运营的高级年薪范围是？', '55-85', '250-300万', '200-250万', '20-30万', 'A', NULL),
(@pack_id, 13, '跨境电商运营的岗位中，最高学历要求通常是什么？', '大专', '硕士', '本科', '高中', 'B', NULL),
(@pack_id, 14, '跨境电商运营的学科组合中，第一个学科是？', '法学', '数据科学', '会计学', '市场营销', 'D', NULL),
(@pack_id, 15, '应聘跨境电商运营时，平均多少人竞争1个岗位？', '5人', '18', '2人', '3人', 'B', NULL),
(@pack_id, 16, '以下哪项是跨境电商运营的核心技能之一？', '建筑工程', '陶瓷工艺', '平台规则(Amazon)', '航空航天', 'C', NULL),
(@pack_id, 17, '跨境电商运营的工作中不涉及以下哪项技能？', '选品', '英语', '地质学', '平台规则(Amazon)', 'C', NULL),
(@pack_id, 18, '以下哪项是跨境电商运营的交叉学科背景？', '无学科要求', '四个学科', '市场营销×英语', '单一学科', 'C', NULL),
(@pack_id, 19, '以下哪项是跨境电商运营的核心技能之一？', '核工程', '版画制作', '油画技法', '选品', 'D', NULL),
(@pack_id, 20, '跨境电商运营的复合学科背景使其在就业市场上具有？', '竞争优势', '劣势', '负面作用', '被淘汰风险', 'A', NULL),
(@pack_id, 21, '在1-5级工作强度体系中，跨境电商运营属于哪一级？', '8级', '3', '7级', '0级', 'B', NULL),
(@pack_id, 22, '跨境电商运营的薪资结构中，初级岗位年薪约为？', '3-5万', '80-100万', '12-20(提成)', '5-10万', 'C', NULL),
(@pack_id, 23, '以下哪项技能对跨境电商运营的职业发展最重要？', '航空航天', '理发师', '平台规则(Amazon)', '舞蹈编排', 'C', NULL),
(@pack_id, 24, '以下哪项是跨境电商运营的核心技能之一？', '地质学', '古生物学', '航空航天', '选品', 'D', NULL),
(@pack_id, 25, '跨境电商运营岗位要求掌握市场营销和英语的复合知识，这属于？', '纯管理岗位', '纯技术岗位', '跨学科复合岗位', '体力劳动岗位', 'C', NULL),
(@pack_id, 26, '跨境电商运营的工作强度属于？', '中等', '高', '极低', '较高', 'B', NULL),
(@pack_id, 27, '以下哪项最符合跨境电商运营的职业特点？', '纯体力型', '跨学科复合型人才', '单一技能型', '无技能型', 'B', NULL),
(@pack_id, 28, '跨境电商运营的岗位竞争激烈程度为？', '3:1', '4:1', '2:1', '18:1', 'D', NULL),
(@pack_id, 29, '专业131的岗位名称是？', '跨境电商运营', '真实世界研究数据专家', '海外数据竞赛选手', '医学翻译', 'A', NULL),
(@pack_id, 30, '跨境电商运营属于以下哪类岗位热度？', '淘汰', '极低', '高', '无热度', 'C', NULL),
(@pack_id, 31, '跨境电商运营工作中最可能使用的工具是？', '挖掘机', '专业工具', '手术刀', '钢琴', 'B', NULL),
(@pack_id, 32, '以下哪项是跨境电商运营的核心技能之一？', '理发师', '焊接技术', '昆虫学', '英语', 'D', NULL),
(@pack_id, 33, '以下哪项是跨境电商运营的核心技能之一？', '英语', '油画技法', '书法篆刻', '气象学', 'A', NULL),
(@pack_id, 34, '以下哪项最接近跨境电商运营的学历分布？', '硕士100%', '博士100%', '高中100%', '本科60% 硕士40%', 'D', NULL),
(@pack_id, 35, '以下哪项是跨境电商运营的核心技能之一？', '选品', '考古学', '植物学', '海洋学', 'A', NULL),
(@pack_id, 36, '跨境电商运营属于以下哪个领域的岗位？', '纯艺术', '纯体育', '市场营销/英语复合领域', '纯文科', 'C', NULL),
(@pack_id, 37, '以下哪个不是跨境电商运营的别称？', '电子病历开发工程师', '跨境电商运营(高级)', '跨境电商运营', '跨境电商运营(资深)', 'A', NULL),
(@pack_id, 38, '在跨境电商运营的日常工作中，最常用的技能组合是？', '服装设计', '铣床加工', '平台规则(Amazon)、英语', '理发师', 'C', NULL),
(@pack_id, 39, '跨境电商运营面试时最可能被考察的技能是？', '书法篆刻', '矿物学', '平台规则(Amazon)', '理发师', 'C', NULL),
(@pack_id, 40, '应聘跨境电商运营，本科学历占比约为？', '20%', '60%', '90%', '100%', 'B', NULL),
(@pack_id, 41, '跨境电商运营需要融合哪两个学科的知识？', '历史和地理', '金融和建筑', '艺术和体育', '市场营销和英语', 'D', NULL),
(@pack_id, 42, '以下哪项是跨境电商运营的核心技能之一？', '核工程', '平台规则(Amazon)', '气象学', '美容师', 'B', NULL),
(@pack_id, 43, '跨境电商运营的竞争比是？', '5:1', '18:1', '10:1', '100:1', 'B', NULL),
(@pack_id, 44, '跨境电商运营不需要以下哪项能力？', '专业能力B', '专业能力A', '无关能力', '专业能力C', 'C', NULL),
(@pack_id, 45, '跨境电商运营的工作强度评级为3，对应描述是？', '繁忙', '一般', '高', '轻松', 'C', NULL),
(@pack_id, 46, '跨境电商运营属于哪个学科组合？', '电气工程×金融学', '市场营销×英语', '临床医学×数据科学', '法学×会计学', 'B', NULL),
(@pack_id, 47, '以下哪个数字代表跨境电商运营的工作强度？', '3', '8', '6', '7', 'A', NULL),
(@pack_id, 48, '以下哪项最接近跨境电商运营的高级年薪上限？', '40万', '50万', '20万', '85', 'D', NULL),
(@pack_id, 49, '以下哪项是跨境电商运营的核心技能之一？', '考古学', '铣床加工', '平台规则(Amazon)', '海洋学', 'C', NULL),
(@pack_id, 50, '以下哪项不是跨境电商运营的主要工作内容？', '核心工作B', 'unrelated_work', '核心工作C', '核心工作A', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业132：市场营销×英语 — 国际品牌策划
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_english:2', 132, '国际品牌策划', 'major_marketing', 'major_english', '市场营销×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '国际品牌策划的岗位中，最高学历要求通常是什么？', '本科', '硕士', '博士后', '大专', 'B', NULL),
(@pack_id, 2, '国际品牌策划需要融合哪两个学科的知识？', '艺术和体育', '市场营销和英语', '法学和医学', '金融和建筑', 'B', NULL),
(@pack_id, 3, '专业132的岗位名称是？', '量化交易平台工程师', '海外技术支持', '国际品牌策划', '国际医疗协调员', 'C', NULL),
(@pack_id, 4, '国际品牌策划的工作中不涉及以下哪项技能？', '品牌战略', '服装设计', '英语', '跨文化传播', 'B', NULL),
(@pack_id, 5, '以下哪项技能对国际品牌策划的职业发展最重要？', '品牌战略', '昆虫学', '书法篆刻', '烹饪技术', 'A', NULL),
(@pack_id, 6, '以下哪项是国际品牌策划的核心技能之一？', '核工程', '英语', '车床操作', '珠宝鉴定', 'B', NULL),
(@pack_id, 7, '以下哪项是国际品牌策划的核心技能之一？', '量子物理', '植物学', '版画制作', '跨文化传播', 'D', NULL),
(@pack_id, 8, '国际品牌策划的职业发展路径通常从什么级别开始？', '顾问', '初级', '合伙人', '实习生', 'B', NULL),
(@pack_id, 9, '国际品牌策划的工作成果通常以什么形式呈现？', '专业成果', '食品', '建筑', '油画', 'A', NULL),
(@pack_id, 10, '国际品牌策划属于以下哪类岗位热度？', '无热度', '中', '淘汰', '冷门', 'B', NULL),
(@pack_id, 11, '国际品牌策划的岗位竞争激烈程度为？', '12:1', '3:1', '1:1', '4:1', 'A', NULL),
(@pack_id, 12, '国际品牌策划属于哪个学科组合？', '临床医学×数据科学', '法学×会计学', '市场营销×英语', '电气工程×金融学', 'C', NULL),
(@pack_id, 13, '国际品牌策划的工作强度等级是？', '5', '4', '3', '2', 'D', NULL),
(@pack_id, 14, '以下哪项是国际品牌策划的核心技能之一？', '焊接技术', '品牌战略', '服装设计', '建筑工程', 'B', NULL),
(@pack_id, 15, '市场营销×英语交叉领域对应的岗位是？', '技术文档工程师', '国际金融分析师(CFA)', '国际品牌策划', '金融数据分析师', 'C', NULL),
(@pack_id, 16, '国际品牌策划的初级年薪范围是？', '8-12万', '15-25', '100-150万', '5-8万', 'B', NULL),
(@pack_id, 17, '在1-5级工作强度体系中，国际品牌策划属于哪一级？', '7级', '2', '8级', '0级', 'B', NULL),
(@pack_id, 18, '以下哪项是国际品牌策划的核心技能之一？', '拓扑学', '石油钻探', '植物学', '英语', 'D', NULL),
(@pack_id, 19, '以下哪项最接近国际品牌策划的高级年薪上限？', '50万', '30万', '40万', '80', 'D', NULL),
(@pack_id, 20, '以下哪项是国际品牌策划的交叉学科背景？', '四个学科', '市场营销×英语', '无学科要求', '单一学科', 'B', NULL),
(@pack_id, 21, '以下哪项是国际品牌策划的核心技能之一？', '跨文化传播', '机械维修', '雕塑艺术', '古生物学', 'A', NULL),
(@pack_id, 22, '以下哪项是国际品牌策划的核心技能之一？', '地质学', '品牌战略', '美容师', '舞蹈编排', 'B', NULL),
(@pack_id, 23, '以下哪个数字代表国际品牌策划的工作强度？', '8', '6', '2', '7', 'C', NULL),
(@pack_id, 24, '国际品牌策划的复合学科背景使其在就业市场上具有？', '无影响', '竞争优势', '被淘汰风险', '劣势', 'B', NULL),
(@pack_id, 25, '国际品牌策划在项目中最需要运用的能力是？', '服装设计', '美容师', '品牌战略', '焊接技术', 'C', NULL),
(@pack_id, 26, '国际品牌策划不需要以下哪项能力？', '无关能力', '专业能力C', '专业能力A', '专业能力B', 'A', NULL),
(@pack_id, 27, '国际品牌策划的竞争比是？', '12:1', '5:1', '10:1', '100:1', 'A', NULL),
(@pack_id, 28, '国际品牌策划需要持续学习的原因是？', '学习内容少', '学习有坏处', '无需学习', '技术更新快', 'D', NULL),
(@pack_id, 29, '国际品牌策划的学历门槛是？', '大专即可', '本科50% 硕士50%', '无要求', '高中即可', 'B', NULL),
(@pack_id, 30, '以下哪个竞争比与国际品牌策划相符？', '12:1', '1:5', '1:10', '1:20', 'A', NULL),
(@pack_id, 31, '以下哪个岗位名称与专业132对应？', '金融数据分析师', '数据科学翻译', '数据平台开发工程师', '国际品牌策划', 'D', NULL),
(@pack_id, 32, '以下哪个不是国际品牌策划的别称？', '国际品牌策划(资深)', '市场营销×英语专家', '营销技术专家(MarTech)', '国际品牌策划', 'C', NULL),
(@pack_id, 33, '国际品牌策划工作中最可能使用的工具是？', '钢琴', '手术刀', '专业工具', '挖掘机', 'C', NULL),
(@pack_id, 34, '应聘国际品牌策划，本科学历占比约为？', '20%', '100%', '50%', '10%', 'C', NULL),
(@pack_id, 35, '国际品牌策划的薪资结构中，初级岗位年薪约为？', '3-5万', '5-10万', '15-25', '80-100万', 'C', NULL),
(@pack_id, 36, '在国际品牌策划的日常工作中，最常用的技能组合是？', '建筑工程', '品牌战略、跨文化传播', '地质学', '采矿工程', 'B', NULL),
(@pack_id, 37, '国际品牌策划对硕士学历的要求是？', '硕士50%', '硕士10%', '硕士20%', '硕士0%', 'A', NULL),
(@pack_id, 38, '国际品牌策划的工作强度评级为2，对应描述是？', '超负荷', '中', '繁忙', '轻松', 'B', NULL),
(@pack_id, 39, '国际品牌策划属于以下哪个领域的岗位？', '纯体育', '纯艺术', '纯理科', '市场营销/英语复合领域', 'D', NULL),
(@pack_id, 40, '国际品牌策划的学科组合中，第一个学科是？', '市场营销', '会计学', '数据科学', '法学', 'A', NULL),
(@pack_id, 41, '以下哪项最接近国际品牌策划的学历分布？', '高中100%', '本科50% 硕士50%', '本科100%', '博士100%', 'B', NULL),
(@pack_id, 42, '应聘国际品牌策划时，平均多少人竞争1个岗位？', '5人', '3人', '4人', '12', 'D', NULL),
(@pack_id, 43, '以下哪项是国际品牌策划的核心技能之一？', '油画技法', '英语', '航空航天', '海洋学', 'B', NULL),
(@pack_id, 44, '国际品牌策划的高级年薪范围是？', '20-30万', '30-40万', '55-80', '250-300万', 'C', NULL),
(@pack_id, 45, '国际品牌策划岗位要求掌握市场营销和英语的复合知识，这属于？', '跨学科复合岗位', '单一学科岗位', '纯技术岗位', '体力劳动岗位', 'A', NULL),
(@pack_id, 46, '以下哪项是国际品牌策划的核心技能之一？', '铸造工艺', '跨文化传播', '拓扑学', '服装设计', 'B', NULL),
(@pack_id, 47, '以下哪个场景最符合国际品牌策划的工作环境？', '农田', '法庭', '专业场所', '手术室', 'C', NULL),
(@pack_id, 48, '以下哪项是国际品牌策划的核心技能之一？', '陶瓷工艺', '品牌战略', '拓扑学', '车床操作', 'B', NULL),
(@pack_id, 49, '国际品牌策划的中级年薪范围是？', '28-45', '15-20万', '150-200万', '200-250万', 'A', NULL),
(@pack_id, 50, '国际品牌策划面试时最可能被考察的技能是？', '植物学', '品牌战略', '钢琴演奏', '昆虫学', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业133：数据科学×英语 — 数据科学翻译
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_ds__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_ds__major_english:0', 133, '数据科学翻译', 'major_ds', 'major_english', '数据科学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '数据科学翻译需要持续学习的原因是？', '学习不重要', '学习有坏处', '技术更新快', '学习内容少', 'C', NULL),
(@pack_id, 2, '数据科学翻译的竞争比6:1意味着？', '无竞争', '自动录取', '内部推荐即可', '平均6人竞争1个岗位', 'D', NULL),
(@pack_id, 3, '在数据科学翻译的日常工作中，最常用的技能组合是？', '陶瓷工艺', '建筑工程', '拓扑学', '数据科学基础、翻译技巧', 'D', NULL),
(@pack_id, 4, '以下哪项是数据科学翻译的核心技能之一？', '美容师', '翻译技巧', '古生物学', '微生物学', 'B', NULL),
(@pack_id, 5, '数据科学翻译的高级年薪范围是？', '20-30万', '250-300万', '28-40', '200-250万', 'C', NULL),
(@pack_id, 6, '数据科学翻译的薪资结构中，初级岗位年薪约为？', '80-100万', '120-150万', '10-15', '3-5万', 'C', NULL),
(@pack_id, 7, '应聘数据科学翻译时，平均多少人竞争1个岗位？', '6', '2人', '3人', '5人', 'A', NULL),
(@pack_id, 8, '以下哪项是数据科学翻译的核心技能之一？', '机械维修', '园艺设计', 'LaTeX', '珠宝鉴定', 'C', NULL),
(@pack_id, 9, '数据科学翻译岗位要求掌握数据科学和英语的复合知识，这属于？', '跨学科复合岗位', '纯管理岗位', '单一学科岗位', '纯技术岗位', 'A', NULL),
(@pack_id, 10, '数据科学翻译不需要以下哪项能力？', '驾驶技术', '写作能力', '语言能力', '细心耐心', 'A', NULL),
(@pack_id, 11, '以下哪项是数据科学翻译的核心技能之一？', '数据科学基础', '建筑工程', '矿物学', '考古学', 'A', NULL),
(@pack_id, 12, '以下哪项最符合数据科学翻译的职业特点？', '单一技能型', '纯管理型', '跨学科复合型人才', '无技能型', 'C', NULL),
(@pack_id, 13, '数据科学翻译的竞争比是？', '8:1', '6:1', '5:1', '10:1', 'B', NULL),
(@pack_id, 14, '专业133的岗位名称是？', '营销技术专家(MarTech)', '数据科学翻译', '推荐系统产品经理', '国际医疗协调员', 'B', NULL),
(@pack_id, 15, '以下哪项技能对数据科学翻译的职业发展最重要？', '考古学', '建筑工程', '气象学', '数据科学基础', 'D', NULL),
(@pack_id, 16, '以下哪个竞争比与数据科学翻译相符？', '6:1', '1:20', '1:10', '1:100', 'A', NULL),
(@pack_id, 17, '数据科学翻译的工作成果通常以什么形式呈现？', '建筑', '软件', '文本/文档', '食品', 'C', NULL),
(@pack_id, 18, '数据科学翻译的学历门槛是？', '本科80% 硕士20%', '高中即可', '大专即可', '博士100%', 'A', NULL),
(@pack_id, 19, '数据科学翻译的初级年薪范围是？', '5-8万', '8-12万', '100-150万', '10-15', 'D', NULL),
(@pack_id, 20, '数据科学翻译的工作强度评级为1，对应描述是？', '一般', '繁忙', '低', '超负荷', 'C', NULL),
(@pack_id, 21, '数据科学翻译工作中最可能使用的工具是？', '手术刀', '钢琴', '挖掘机', '翻译软件/编辑器', 'D', NULL),
(@pack_id, 22, '数据科学翻译的工作中不涉及以下哪项技能？', '翻译技巧', '数据科学基础', 'LaTeX', '量子物理', 'D', NULL),
(@pack_id, 23, '数据科学翻译面试时最可能被考察的技能是？', '昆虫学', '气象学', '航空航天', '数据科学基础', 'D', NULL),
(@pack_id, 24, '数据科学翻译在项目中最需要运用的能力是？', '油画技法', '数据科学基础', '航空航天', '地质学', 'B', NULL),
(@pack_id, 25, '数据科学翻译需要融合哪两个学科的知识？', '数据科学和英语', '金融和建筑', '法学和医学', '艺术和体育', 'A', NULL),
(@pack_id, 26, '以下哪项是数据科学翻译的核心技能之一？', '珠宝鉴定', '昆虫学', '翻译技巧', '微生物学', 'C', NULL),
(@pack_id, 27, '以下哪项是数据科学翻译的交叉学科背景？', '三个学科', '单一学科', '四个学科', '数据科学×英语', 'D', NULL),
(@pack_id, 28, '在1-5级工作强度体系中，数据科学翻译属于哪一级？', '6级', '8级', '7级', '1', 'D', NULL),
(@pack_id, 29, '以下哪个不是数据科学翻译的别称？', '数据科学×英语专家', '数据科学翻译(资深)', '量化交易平台工程师', '数据科学翻译', 'C', NULL),
(@pack_id, 30, '数据科学翻译属于哪个学科组合？', '数据科学×英语', '法学×会计学', '电气工程×金融学', '市场营销×英语', 'A', NULL),
(@pack_id, 31, '数据科学翻译属于以下哪类岗位热度？', '极低', '低', '无热度', '淘汰', 'B', NULL),
(@pack_id, 32, '以下哪项最接近数据科学翻译的学历分布？', '本科100%', '硕士100%', '本科80% 硕士20%', '博士100%', 'C', NULL),
(@pack_id, 33, '数据科学翻译的岗位中，最高学历要求通常是什么？', '硕士', '大专', '本科', '高中', 'A', NULL),
(@pack_id, 34, '以下哪项是数据科学翻译的核心技能之一？', '焊接技术', '考古学', 'LaTeX', '版画制作', 'C', NULL),
(@pack_id, 35, '数据科学翻译的职业发展路径通常从什么级别开始？', '顾问', '实习生', '合伙人', '初级', 'D', NULL),
(@pack_id, 36, '数据科学翻译的中级年薪范围是？', '10-15万', '18-25', '150-200万', '15-20万', 'B', NULL),
(@pack_id, 37, '数据科学翻译的学科组合中，第一个学科是？', '会计学', '市场营销', '法学', '数据科学', 'D', NULL),
(@pack_id, 38, '数据科学×英语交叉领域对应的岗位是？', '技术文档工程师', '数据科学翻译', '计算机双语教学', '医保精算师', 'B', NULL),
(@pack_id, 39, '以下哪项不是数据科学翻译的主要工作内容？', '术语整理', '股票交易', '内容校对', '文字翻译', 'B', NULL),
(@pack_id, 40, '以下哪项最接近数据科学翻译的高级年薪上限？', '50万', '30万', '40万', '40', 'D', NULL),
(@pack_id, 41, '以下哪项是数据科学翻译的核心技能之一？', '气象学', '数据科学基础', '车床操作', '航空航天', 'B', NULL),
(@pack_id, 42, '数据科学翻译的工作强度等级是？', '2', '5', '3', '1', 'D', NULL),
(@pack_id, 43, '以下哪个岗位名称与专业133对应？', '医保精算师', '技术产品经理', '数据科学翻译', '双语数据报告撰写', 'C', NULL),
(@pack_id, 44, '以下哪项是数据科学翻译的核心技能之一？', '古生物学', 'LaTeX', '烹饪技术', '铣床加工', 'B', NULL),
(@pack_id, 45, '数据科学翻译的工作强度属于？', '中等', '较低', '低', '极低', 'C', NULL),
(@pack_id, 46, '以下哪个场景最符合数据科学翻译的工作环境？', '安静办公室', '嘈杂工地', '手术室', '农田', 'A', NULL),
(@pack_id, 47, '数据科学翻译的岗位竞争激烈程度为？', '4:1', '1:1', '6:1', '2:1', 'C', NULL),
(@pack_id, 48, '数据科学翻译属于以下哪个领域的岗位？', '纯艺术', '数据科学/英语复合领域', '纯文科', '纯理科', 'B', NULL),
(@pack_id, 49, '应聘数据科学翻译，本科学历占比约为？', '10%', '100%', '20%', '80%', 'D', NULL),
(@pack_id, 50, '数据科学翻译的复合学科背景使其在就业市场上具有？', '负面作用', '无影响', '劣势', '竞争优势', 'D', NULL);
COMMIT;

-- ======================================================
-- 专业134：数据科学×英语 — 海外数据竞赛选手
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_ds__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_ds__major_english:1', 134, '海外数据竞赛选手', 'major_ds', 'major_english', '数据科学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项最接近海外数据竞赛选手的学历分布？', '本科100%', '本科40% 硕士60%', '高中100%', '硕士100%', 'B', NULL),
(@pack_id, 2, '以下哪项是海外数据竞赛选手的核心技能之一？', '矿物学', 'Kaggle', '考古学', '建筑工程', 'B', NULL),
(@pack_id, 3, '海外数据竞赛选手的薪资结构中，初级岗位年薪约为？', '80-100万', '3-5万', '奖金制', '5-10万', 'C', NULL),
(@pack_id, 4, '海外数据竞赛选手的工作强度等级是？', '2', '5', '3', '1', 'A', NULL),
(@pack_id, 5, '海外数据竞赛选手工作中最可能使用的工具是？', '专业工具', '手术刀', '挖掘机', '钢琴', 'A', NULL),
(@pack_id, 6, '海外数据竞赛选手面试时最可能被考察的技能是？', '焊接技术', '昆虫学', '古生物学', 'Kaggle', 'D', NULL),
(@pack_id, 7, '海外数据竞赛选手对硕士学历的要求是？', '硕士20%', '硕士60%', '硕士0%', '硕士10%', 'B', NULL),
(@pack_id, 8, '数据科学×英语交叉领域对应的岗位是？', '医药代表', '海外数据竞赛选手', '数据仓库工程师', 'DevOps工程师', 'B', NULL),
(@pack_id, 9, '以下哪项是海外数据竞赛选手的核心技能之一？', '地质学', 'Kaggle', '量子物理', '焊接技术', 'B', NULL),
(@pack_id, 10, '以下哪项是海外数据竞赛选手的核心技能之一？', '气象学', 'Kaggle', '建筑工程', '版画制作', 'B', NULL),
(@pack_id, 11, '以下哪项是海外数据竞赛选手的核心技能之一？', '舞蹈编排', '书法篆刻', '考古学', 'Python', 'D', NULL),
(@pack_id, 12, '以下哪项是海外数据竞赛选手的核心技能之一？', '服装设计', '陶瓷工艺', '英语读写', '园艺设计', 'C', NULL),
(@pack_id, 13, '以下哪项是海外数据竞赛选手的核心技能之一？', '微生物学', '核工程', '古生物学', 'Python', 'D', NULL),
(@pack_id, 14, '以下哪项是海外数据竞赛选手的核心技能之一？', '地质学', '气象学', '陶瓷工艺', 'Python', 'D', NULL),
(@pack_id, 15, '海外数据竞赛选手的初级年薪范围是？', '100-150万', '200-300万', '5-8万', '奖金制', 'D', NULL),
(@pack_id, 16, '以下哪个岗位名称与专业134对应？', '机器学习工程师', 'SEO/SEM策略师', '金融产品营销经理', '海外数据竞赛选手', 'D', NULL),
(@pack_id, 17, '应聘海外数据竞赛选手，本科学历占比约为？', '100%', '90%', '40%', '10%', 'C', NULL),
(@pack_id, 18, '海外数据竞赛选手的工作成果通常以什么形式呈现？', '食品', '油画', '建筑', '专业成果', 'D', NULL),
(@pack_id, 19, '海外数据竞赛选手的岗位中，最高学历要求通常是什么？', '本科', '高中', '硕士', '大专', 'C', NULL),
(@pack_id, 20, '海外数据竞赛选手不需要以下哪项能力？', '专业能力B', '专业能力A', '无关能力', '专业能力C', 'C', NULL),
(@pack_id, 21, '以下哪项技能对海外数据竞赛选手的职业发展最重要？', 'Kaggle', '茶艺师', '铸造工艺', '焊接技术', 'A', NULL),
(@pack_id, 22, '海外数据竞赛选手需要持续学习的原因是？', '学习内容少', '技术更新快', '无需学习', '学习有坏处', 'B', NULL),
(@pack_id, 23, '海外数据竞赛选手的岗位竞争激烈程度为？', '4:1', '2:1', '3:1', '8:1', 'D', NULL),
(@pack_id, 24, '海外数据竞赛选手的学历门槛是？', '本科40% 硕士60%', '博士100%', '高中即可', '无要求', 'A', NULL),
(@pack_id, 25, '海外数据竞赛选手的工作强度属于？', '中等', '中', '极低', '较低', 'B', NULL),
(@pack_id, 26, '以下哪项是海外数据竞赛选手的核心技能之一？', '采矿工程', 'Kaggle', '核工程', '钢琴演奏', 'B', NULL),
(@pack_id, 27, '以下哪项最接近海外数据竞赛选手的高级年薪上限？', '100', '50万', '30万', '20万', 'A', NULL),
(@pack_id, 28, '海外数据竞赛选手属于哪个学科组合？', '法学×会计学', '数据科学×英语', '临床医学×数据科学', '市场营销×英语', 'B', NULL),
(@pack_id, 29, '在海外数据竞赛选手的日常工作中，最常用的技能组合是？', '矿物学', 'Kaggle、Python', '昆虫学', '石油钻探', 'B', NULL),
(@pack_id, 30, '以下哪项是海外数据竞赛选手的核心技能之一？', '英语读写', '理发师', '地质学', '烹饪技术', 'A', NULL),
(@pack_id, 31, '海外数据竞赛选手的职业发展路径通常从什么级别开始？', '合伙人', '实习生', '顾问', '初级', 'D', NULL),
(@pack_id, 32, '专业134的岗位名称是？', '量化交易平台工程师', '技术产品经理', '海外数据竞赛选手', 'DevOps工程师', 'C', NULL),
(@pack_id, 33, '海外数据竞赛选手的竞争比是？', '5:1', '100:1', '10:1', '8:1', 'D', NULL),
(@pack_id, 34, '应聘海外数据竞赛选手时，平均多少人竞争1个岗位？', '8', '2人', '5人', '3人', 'A', NULL),
(@pack_id, 35, '以下哪个不是海外数据竞赛选手的别称？', '数据科学翻译', '海外数据竞赛选手(资深)', '海外数据竞赛选手(高级)', '海外数据竞赛选手', 'A', NULL),
(@pack_id, 36, '以下哪个场景最符合海外数据竞赛选手的工作环境？', '法庭', '专业场所', '手术室', '农田', 'B', NULL),
(@pack_id, 37, '以下哪个数字代表海外数据竞赛选手的工作强度？', '0', '8', '7', '2', 'D', NULL),
(@pack_id, 38, '以下哪项不是海外数据竞赛选手的主要工作内容？', '核心工作C', '核心工作A', 'unrelated_work', '核心工作B', 'C', NULL),
(@pack_id, 39, '在1-5级工作强度体系中，海外数据竞赛选手属于哪一级？', '6级', '7级', '0级', '2', 'D', NULL),
(@pack_id, 40, '海外数据竞赛选手的竞争比8:1意味着？', '内部推荐即可', '自动录取', '平均8人竞争1个岗位', '无竞争', 'C', NULL),
(@pack_id, 41, '海外数据竞赛选手在项目中最需要运用的能力是？', '航空航天', '书法篆刻', '钳工工艺', 'Kaggle', 'D', NULL),
(@pack_id, 42, '海外数据竞赛选手的高级年薪范围是？', '200-250万', '60-100', '20-30万', '30-40万', 'B', NULL),
(@pack_id, 43, '以下哪个竞争比与海外数据竞赛选手相符？', '1:20', '8:1', '1:5', '1:100', 'B', NULL),
(@pack_id, 44, '海外数据竞赛选手的复合学科背景使其在就业市场上具有？', '无影响', '竞争优势', '劣势', '被淘汰风险', 'B', NULL),
(@pack_id, 45, '海外数据竞赛选手的工作强度评级为2，对应描述是？', '中', '繁忙', '超负荷', '轻松', 'A', NULL),
(@pack_id, 46, '以下哪项是海外数据竞赛选手的交叉学科背景？', '无学科要求', '数据科学×英语', '四个学科', '单一学科', 'B', NULL),
(@pack_id, 47, '海外数据竞赛选手的学科组合中，第一个学科是？', '数据科学', '会计学', '法学', '市场营销', 'A', NULL),
(@pack_id, 48, '以下哪项是海外数据竞赛选手的核心技能之一？', '英语读写', '版画制作', '石油钻探', '拓扑学', 'A', NULL),
(@pack_id, 49, '以下哪项最符合海外数据竞赛选手的职业特点？', '跨学科复合型人才', '无技能型', '纯管理型', '纯体力型', 'A', NULL),
(@pack_id, 50, '海外数据竞赛选手的中级年薪范围是？', '10-15万', '15-20万', '20-50(项目)', '200-250万', 'C', NULL);
COMMIT;

-- ======================================================
-- 专业135：数据科学×英语 — 双语数据报告撰写
-- ======================================================
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_ds__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_ds__major_english:2', 135, '双语数据报告撰写', 'major_ds', 'major_english', '数据科学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '以下哪项是双语数据报告撰写的核心技能之一？', '陶瓷工艺', '海洋学', '数据可视化', '焊接技术', 'C', NULL),
(@pack_id, 2, '双语数据报告撰写对硕士学历的要求是？', '硕士0%', '硕士10%', '硕士30%', '硕士20%', 'C', NULL),
(@pack_id, 3, '以下哪项是双语数据报告撰写的核心技能之一？', '地质学', '植物学', '商务英语', '陶瓷工艺', 'C', NULL),
(@pack_id, 4, '双语数据报告撰写不需要以下哪项能力？', '专业能力B', '专业能力C', '无关能力', '专业能力A', 'C', NULL),
(@pack_id, 5, '双语数据报告撰写需要融合哪两个学科的知识？', '法学和医学', '金融和建筑', '数据科学和英语', '艺术和体育', 'C', NULL),
(@pack_id, 6, '以下哪项技能对双语数据报告撰写的职业发展最重要？', '铸造工艺', '铣床加工', '数据可视化', '航空航天', 'C', NULL),
(@pack_id, 7, '双语数据报告撰写的高级年薪范围是？', '40-55', '20-30万', '200-250万', '30-40万', 'A', NULL),
(@pack_id, 8, '双语数据报告撰写的职业发展路径通常从什么级别开始？', '初级', '实习生', '合伙人', '顾问', 'A', NULL),
(@pack_id, 9, '双语数据报告撰写属于哪个学科组合？', '市场营销×英语', '法学×会计学', '临床医学×数据科学', '数据科学×英语', 'D', NULL),
(@pack_id, 10, '双语数据报告撰写属于以下哪类岗位热度？', '冷门', '无热度', '低', '淘汰', 'C', NULL),
(@pack_id, 11, '双语数据报告撰写的工作成果通常以什么形式呈现？', '建筑', '食品', '专业成果', '油画', 'C', NULL),
(@pack_id, 12, '双语数据报告撰写的岗位竞争激烈程度为？', '3:1', '1:1', '2:1', '8:1', 'D', NULL),
(@pack_id, 13, '以下哪项是双语数据报告撰写的核心技能之一？', '采矿工程', '矿物学', '报告写作', '茶艺师', 'C', NULL),
(@pack_id, 14, '以下哪项最符合双语数据报告撰写的职业特点？', '纯管理型', '单一技能型', '无技能型', '跨学科复合型人才', 'D', NULL),
(@pack_id, 15, '以下哪项是双语数据报告撰写的核心技能之一？', '报告写作', '烹饪技术', '钳工工艺', '石油钻探', 'A', NULL),
(@pack_id, 16, '在双语数据报告撰写的日常工作中，最常用的技能组合是？', '天文学', '车床操作', '量子物理', '数据可视化、商务英语', 'D', NULL),
(@pack_id, 17, '双语数据报告撰写的初级年薪范围是？', '200-300万', '12-18', '8-12万', '100-150万', 'B', NULL),
(@pack_id, 18, '以下哪项最接近双语数据报告撰写的高级年薪上限？', '20万', '55', '50万', '40万', 'B', NULL),
(@pack_id, 19, '以下哪项是双语数据报告撰写的核心技能之一？', '舞蹈编排', '海洋学', '数据可视化', '铸造工艺', 'C', NULL),
(@pack_id, 20, '以下哪项是双语数据报告撰写的核心技能之一？', '服装设计', '钳工工艺', '商务英语', '海洋学', 'C', NULL),
(@pack_id, 21, '以下哪个场景最符合双语数据报告撰写的工作环境？', '法庭', '专业场所', '农田', '手术室', 'B', NULL),
(@pack_id, 22, '双语数据报告撰写的中级年薪范围是？', '10-15万', '200-250万', '150-200万', '22-32', 'D', NULL),
(@pack_id, 23, '双语数据报告撰写工作中最可能使用的工具是？', '手术刀', '钢琴', '专业工具', '挖掘机', 'C', NULL),
(@pack_id, 24, '以下哪项是双语数据报告撰写的核心技能之一？', '海洋学', '服装设计', '数据可视化', '茶艺师', 'C', NULL),
(@pack_id, 25, '双语数据报告撰写的岗位中，最高学历要求通常是什么？', '博士后', '硕士', '大专', '本科', 'B', NULL),
(@pack_id, 26, '以下哪项最接近双语数据报告撰写的学历分布？', '博士100%', '本科100%', '本科70% 硕士30%', '硕士100%', 'C', NULL),
(@pack_id, 27, '专业135的岗位名称是？', '数据科学翻译', '双语数据报告撰写', '推荐系统产品经理', '医疗健康投资分析师', 'B', NULL),
(@pack_id, 28, '双语数据报告撰写的竞争比是？', '8:1', '100:1', '10:1', '5:1', 'A', NULL),
(@pack_id, 29, '应聘双语数据报告撰写时，平均多少人竞争1个岗位？', '3人', '2人', '8', '4人', 'C', NULL),
(@pack_id, 30, '双语数据报告撰写岗位要求掌握数据科学和英语的复合知识，这属于？', '纯技术岗位', '跨学科复合岗位', '体力劳动岗位', '纯管理岗位', 'B', NULL),
(@pack_id, 31, '双语数据报告撰写的工作强度属于？', '低', '中等', '极高', '较低', 'A', NULL),
(@pack_id, 32, '以下哪项是双语数据报告撰写的核心技能之一？', '茶艺师', '商务英语', '建筑工程', '钳工工艺', 'B', NULL),
(@pack_id, 33, '在1-5级工作强度体系中，双语数据报告撰写属于哪一级？', '1', '0级', '8级', '6级', 'A', NULL),
(@pack_id, 34, '双语数据报告撰写的复合学科背景使其在就业市场上具有？', '被淘汰风险', '竞争优势', '劣势', '负面作用', 'B', NULL),
(@pack_id, 35, '双语数据报告撰写属于以下哪个领域的岗位？', '纯文科', '数据科学/英语复合领域', '纯体育', '纯理科', 'B', NULL),
(@pack_id, 36, '以下哪个数字代表双语数据报告撰写的工作强度？', '7', '1', '0', '6', 'B', NULL),
(@pack_id, 37, '以下哪项不是双语数据报告撰写的主要工作内容？', '核心工作C', 'unrelated_work', '核心工作A', '核心工作B', 'B', NULL),
(@pack_id, 38, '以下哪个不是双语数据报告撰写的别称？', '交易系统开发', '双语数据报告撰写(高级)', '数据科学×英语专家', '双语数据报告撰写(资深)', 'A', NULL),
(@pack_id, 39, '以下哪个竞争比与双语数据报告撰写相符？', '8:1', '1:5', '1:10', '1:20', 'A', NULL),
(@pack_id, 40, '双语数据报告撰写的竞争比8:1意味着？', '1人竞争多个岗位', '无竞争', '平均8人竞争1个岗位', '自动录取', 'C', NULL),
(@pack_id, 41, '应聘双语数据报告撰写，本科学历占比约为？', '100%', '10%', '70%', '20%', 'C', NULL),
(@pack_id, 42, '以下哪项是双语数据报告撰写的交叉学科背景？', '单一学科', '无学科要求', '三个学科', '数据科学×英语', 'D', NULL),
(@pack_id, 43, '双语数据报告撰写面试时最可能被考察的技能是？', '数据可视化', '考古学', '书法篆刻', '铸造工艺', 'A', NULL),
(@pack_id, 44, '双语数据报告撰写的工作中不涉及以下哪项技能？', '数据可视化', '报告写作', '商务英语', '雕塑艺术', 'D', NULL),
(@pack_id, 45, '双语数据报告撰写在项目中最需要运用的能力是？', '钢琴演奏', '昆虫学', '雕塑艺术', '数据可视化', 'D', NULL),
(@pack_id, 46, '双语数据报告撰写的工作强度评级为1，对应描述是？', '繁忙', '低', '轻松', '一般', 'B', NULL),
(@pack_id, 47, '以下哪个岗位名称与专业135对应？', '智能投顾算法工程师', '机器学习平台开发', '双语数据报告撰写', '软件售前顾问', 'C', NULL),
(@pack_id, 48, '双语数据报告撰写的工作强度等级是？', '1', '3', '2', '5', 'A', NULL),
(@pack_id, 49, '双语数据报告撰写的学科组合中，第一个学科是？', '数据科学', '法学', '市场营销', '会计学', 'A', NULL),
(@pack_id, 50, '双语数据报告撰写需要持续学习的原因是？', '学习内容少', '学习不重要', '技术更新快', '学习有坏处', 'C', NULL);
COMMIT;

USE `offercat`;

CREATE TABLE IF NOT EXISTS `user_personal_galaxy` (
  `user_id` BIGINT NOT NULL COMMENT '用户ID，对应 user.user_id',
  `galaxy_json` JSON NOT NULL COMMENT 'PersonalGalaxyV1：majors、fusions、updatedAt',
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  CONSTRAINT `fk_personal_galaxy_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户个人专业星图（展示/设计保存）';

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

SELECT COUNT(*) FROM resume WHERE user_id = 21;

USE offercat;
SELECT COUNT(DISTINCT pack_key) FROM starlit_pack;

-- ======================================================
-- 专业116：临床医学×英语 — 国际医疗协调员（slot :1，完整50题）
-- ======================================================
START TRANSACTION;

-- 删除可能残留的旧数据（确保干净）
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:1';

-- 插入包信息（question_count = 50）
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:1', 116, '国际医疗协调员', 'major_clinical', 'major_english', '临床医学×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();

-- 插入题目（1～50，完整）
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '国际医疗协调员岗位要求掌握临床医学和英语的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '体力劳动岗位', '单一学科岗位', 'A', NULL),
(@pack_id, 2, '国际医疗协调员的岗位中，最高学历要求通常是什么？', '本科', '博士后', '硕士', '高中', 'C', NULL),
(@pack_id, 3, '国际医疗协调员在项目中最需要运用的能力是？', '珠宝鉴定', '核工程', '焊接技术', '医疗流程', 'D', NULL),
(@pack_id, 4, '以下哪项最符合国际医疗协调员的职业特点？', '纯体力型', '跨学科复合型人才', '纯管理型', '单一技能型', 'B', NULL),
(@pack_id, 5, '国际医疗协调员的学科组合中，第一个学科是？', '数据科学', '市场营销', '临床医学', '会计学', 'C', NULL),
(@pack_id, 6, '以下哪项是国际医疗协调员的核心技能之一？', '量子物理', '油画技法', '钳工工艺', '医疗流程', 'D', NULL),
(@pack_id, 7, '国际医疗协调员的竞争比12:1意味着？', '无竞争', '内部推荐即可', '平均12人竞争1个岗位', '自动录取', 'C', NULL),
(@pack_id, 8, '以下哪个竞争比与国际医疗协调员相符？', '1:20', '12:1', '1:10', '1:5', 'B', NULL),
(@pack_id, 9, '国际医疗协调员属于以下哪类岗位热度？', '淘汰', '无热度', '极低', '中', 'D', NULL),
(@pack_id, 10, '应聘国际医疗协调员时，平均多少人竞争1个岗位？', '12', '2人', '5人', '3人', 'A', NULL),
(@pack_id, 11, '以下哪项是国际医疗协调员的核心技能之一？', '车床操作', '书法篆刻', '钳工工艺', '医疗流程', 'D', NULL),
(@pack_id, 12, '国际医疗协调员对硕士学历的要求是？', '硕士0%', '硕士20%', '硕士40%', '硕士50%', 'C', NULL),
(@pack_id, 13, '在国际医疗协调员的日常工作中，最常用的技能组合是？', '钳工工艺', '园艺设计', '车床操作', '医疗流程、英语口语', 'D', NULL),
(@pack_id, 14, '以下哪个数字代表国际医疗协调员的工作强度？', '7', '0', '3', '6', 'C', NULL),
(@pack_id, 15, '以下哪项最接近国际医疗协调员的学历分布？', '高中100%', '博士100%', '本科100%', '本科60% 硕士40%', 'D', NULL),
(@pack_id, 16, '以下哪个岗位名称与专业116对应？', '医药行业研究员', '投资者关系专员', '客户画像建模', '国际医疗协调员', 'D', NULL),
(@pack_id, 17, '以下哪项是国际医疗协调员的核心技能之一？', '病历摘要', '书法篆刻', '油画技法', '车床操作', 'A', NULL),
(@pack_id, 18, '国际医疗协调员的工作强度等级是？', '3', '5', '2', '1', 'A', NULL),
(@pack_id, 19, '国际医疗协调员工作中最可能使用的工具是？', '手术刀', '钢琴', '挖掘机', '专业工具', 'D', NULL),
(@pack_id, 20, '临床医学×英语交叉领域对应的岗位是？', '计算机双语教学', '国际医疗协调员', '交易系统开发', '金融软件产品经理', 'B', NULL),
(@pack_id, 21, '国际医疗协调员的复合学科背景使其在就业市场上具有？', '竞争优势', '被淘汰风险', '劣势', '负面作用', 'A', NULL),
(@pack_id, 22, '国际医疗协调员的竞争比是？', '12:1', '5:1', '10:1', '100:1', 'A', NULL),
(@pack_id, 23, '国际医疗协调员的职业发展路径通常从什么级别开始？', '实习生', '顾问', '初级', '志愿者', 'C', NULL),
(@pack_id, 24, '以下哪项是国际医疗协调员的核心技能之一？', '医疗流程', '钢琴演奏', '理发师', '建筑工程', 'A', NULL),
(@pack_id, 25, '国际医疗协调员属于以下哪个领域的岗位？', '临床医学/英语复合领域', '纯文科', '纯体育', '纯理科', 'A', NULL),
(@pack_id, 26, '以下哪项是国际医疗协调员的交叉学科背景？', '临床医学×英语', '无学科要求', '四个学科', '三个学科', 'A', NULL),
(@pack_id, 27, '国际医疗协调员的工作强度属于？', '较高', '高', '中等', '较低', 'B', NULL),
(@pack_id, 28, '以下哪个场景最符合国际医疗协调员的工作环境？', '专业场所', '农田', '手术室', '法庭', 'A', NULL),
(@pack_id, 29, '在1-5级工作强度体系中，国际医疗协调员属于哪一级？', '6级', '3', '8级', '0级', 'B', NULL),
(@pack_id, 30, '国际医疗协调员需要融合哪两个学科的知识？', '临床医学和英语', '历史和地理', '金融和建筑', '艺术和体育', 'A', NULL),
(@pack_id, 31, '国际医疗协调员的中级年薪范围是？', '25-38', '15-20万', '10-15万', '200-250万', 'A', NULL),
(@pack_id, 32, '以下哪项是国际医疗协调员的核心技能之一？', '园艺设计', '铸造工艺', '理发师', '医疗流程', 'D', NULL),
(@pack_id, 33, '国际医疗协调员需要持续学习的原因是？', '技术更新快', '学习内容少', '学习有坏处', '学习不重要', 'A', NULL),
(@pack_id, 34, '应聘国际医疗协调员，本科学历占比约为？', '90%', '60%', '100%', '10%', 'B', NULL),
(@pack_id, 35, '以下哪项最接近国际医疗协调员的高级年薪上限？', '20万', '65', '40万', '50万', 'B', NULL),
(@pack_id, 36, '国际医疗协调员的高级年薪范围是？', '20-30万', '45-65', '30-40万', '200-250万', 'B', NULL),
(@pack_id, 37, '国际医疗协调员的工作强度评级为3，对应描述是？', '超负荷', '轻松', '一般', '高', 'D', NULL),
(@pack_id, 38, '以下哪项是国际医疗协调员的核心技能之一？', '病历摘要', '拓扑学', '钢琴演奏', '天文学', 'A', NULL),
(@pack_id, 39, '国际医疗协调员的薪资结构中，初级岗位年薪约为？', '3-5万', '120-150万', '14-22', '80-100万', 'C', NULL),
(@pack_id, 40, '国际医疗协调员面试时最可能被考察的技能是？', '铸造工艺', '陶瓷工艺', '医疗流程', '石油钻探', 'C', NULL),
(@pack_id, 41, '国际医疗协调员的工作中不涉及以下哪项技能？', '铸造工艺', '病历摘要', '英语口语', '医疗流程', 'A', NULL),
(@pack_id, 42, '国际医疗协调员的初级年薪范围是？', '8-12万', '5-8万', '14-22', '100-150万', 'C', NULL),
(@pack_id, 43, '专业116的岗位名称是？', '国际医疗协调员', '医疗市场专员', '财富管理顾问', 'SCI论文编辑', 'A', NULL),
(@pack_id, 44, '以下哪项是国际医疗协调员的核心技能之一？', '天文学', '理发师', '英语口语', '航空航天', 'C', NULL),
(@pack_id, 45, '国际医疗协调员不需要以下哪项能力？', '专业能力B', '专业能力A', '无关能力', '专业能力C', 'C', NULL),
(@pack_id, 46, '以下哪项技能对国际医疗协调员的职业发展最重要？', '园艺设计', '拓扑学', '铸造工艺', '医疗流程', 'D', NULL),
(@pack_id, 47, '国际医疗协调员的工作成果通常以什么形式呈现？', '油画', '建筑', '食品', '专业成果', 'D', NULL),
(@pack_id, 48, '以下哪项不是国际医疗协调员的主要工作内容？', '核心工作A', 'unrelated_work', '核心工作C', '核心工作B', 'B', NULL),
(@pack_id, 49, '以下哪个不是国际医疗协调员的别称？', '国际医疗协调员(资深)', '国际医疗协调员(高级)', '推荐系统产品经理', '临床医学×英语专家', 'C', NULL),
(@pack_id, 50, '以下哪项是国际医疗协调员的核心技能之一？', '拓扑学', '病历摘要', '气象学', '石油钻探', 'B', NULL);
COMMIT;

-- ======================================================
-- 专业126：软件工程×英语 — 海外技术支持（slot :2，完整50题）
-- ======================================================
START TRANSACTION;

DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:2';

INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:2', 126, '海外技术支持', 'major_swe', 'major_english', '软件工程×英语', 50, 1);
SET @pack_id = LAST_INSERT_ID();

INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, '海外技术支持面试时最可能被考察的技能是？', '英语口语', '矿物学', '服装设计', '核工程', 'A', NULL),
(@pack_id, 2, '海外技术支持属于以下哪个领域的岗位？', '纯艺术', '软件工程/英语复合领域', '纯体育', '纯文科', 'B', NULL),
(@pack_id, 3, '以下哪项是海外技术支持的核心技能之一？', '英语口语', '植物学', '海洋学', '气象学', 'A', NULL),
(@pack_id, 4, '海外技术支持的工作强度等级是？', '5', '4', '3', '2', 'C', NULL),
(@pack_id, 5, '在海外技术支持的日常工作中，最常用的技能组合是？', '英语口语、软件调试', '天文学', '园艺设计', '雕塑艺术', 'A', NULL),
(@pack_id, 6, '海外技术支持的职业发展路径通常从什么级别开始？', '合伙人', '初级', '顾问', '实习生', 'B', NULL),
(@pack_id, 7, '以下哪个岗位名称与专业126对应？', '推荐系统产品经理', '海外技术支持', '英文技术支持', '交易系统开发', 'B', NULL),
(@pack_id, 8, '海外技术支持的工作中不涉及以下哪项技能？', '软件调试', '客户沟通', '英语口语', '车床操作', 'D', NULL),
(@pack_id, 9, '海外技术支持的工作强度评级为3，对应描述是？', '一般', '轻松', '高', '繁忙', 'C', NULL),
(@pack_id, 10, '海外技术支持需要持续学习的原因是？', '技术更新快', '学习内容少', '无需学习', '学习有坏处', 'A', NULL),
(@pack_id, 11, '以下哪个场景最符合海外技术支持的工作环境？', '专业场所', '手术室', '法庭', '农田', 'A', NULL),
(@pack_id, 12, '海外技术支持的中级年薪范围是？', '200-250万', '15-20万', '20-30', '150-200万', 'C', NULL),
(@pack_id, 13, '海外技术支持属于以下哪类岗位热度？', '中', '冷门', '极低', '无热度', 'A', NULL),
(@pack_id, 14, '在1-5级工作强度体系中，海外技术支持属于哪一级？', '0级', '7级', '3', '6级', 'C', NULL),
(@pack_id, 15, '海外技术支持不需要以下哪项能力？', '专业能力C', '专业能力A', '无关能力', '专业能力B', 'C', NULL),
(@pack_id, 16, '海外技术支持的岗位竞争激烈程度为？', '1:1', '4:1', '2:1', '10:1', 'D', NULL),
(@pack_id, 17, '以下哪项不是海外技术支持的主要工作内容？', '核心工作B', '核心工作C', '核心工作A', 'unrelated_work', 'D', NULL),
(@pack_id, 18, '以下哪项技能对海外技术支持的职业发展最重要？', '航空航天', '陶瓷工艺', '英语口语', '考古学', 'C', NULL),
(@pack_id, 19, '以下哪项是海外技术支持的核心技能之一？', '舞蹈编排', '古生物学', '量子物理', '客户沟通', 'D', NULL),
(@pack_id, 20, '海外技术支持需要融合哪两个学科的知识？', '法学和医学', '艺术和体育', '软件工程和英语', '金融和建筑', 'C', NULL),
(@pack_id, 21, '海外技术支持属于哪个学科组合？', '电气工程×金融学', '软件工程×英语', '市场营销×英语', '法学×会计学', 'B', NULL),
(@pack_id, 22, '海外技术支持的工作强度属于？', '高', '较低', '极低', '中等', 'A', NULL),
(@pack_id, 23, '以下哪项是海外技术支持的核心技能之一？', '软件调试', '量子物理', '园艺设计', '拓扑学', 'A', NULL),
(@pack_id, 24, '专业126的岗位名称是？', '医疗器械产品经理', '海外技术支持', '财富管理顾问', '医药代表', 'B', NULL),
(@pack_id, 25, '以下哪项是海外技术支持的核心技能之一？', '舞蹈编排', '航空航天', '珠宝鉴定', '软件调试', 'D', NULL),
(@pack_id, 26, '以下哪项是海外技术支持的核心技能之一？', '植物学', '珠宝鉴定', '版画制作', '英语口语', 'D', NULL),
(@pack_id, 27, '海外技术支持的学历门槛是？', '无要求', '博士100%', '本科80% 硕士20%', '高中即可', 'C', NULL),
(@pack_id, 28, '以下哪项是海外技术支持的核心技能之一？', '昆虫学', '英语口语', '铸造工艺', '舞蹈编排', 'B', NULL),
(@pack_id, 29, '海外技术支持的薪资结构中，初级岗位年薪约为？', '5-10万', '12-18', '3-5万', '120-150万', 'B', NULL),
(@pack_id, 30, '以下哪个不是海外技术支持的别称？', '海外技术支持(资深)', '软件工程×英语专家', '国际品牌策划', '海外技术支持(高级)', 'C', NULL),
(@pack_id, 31, '以下哪项最接近海外技术支持的高级年薪上限？', '50', '20万', '40万', '30万', 'A', NULL),
(@pack_id, 32, '以下哪项是海外技术支持的核心技能之一？', '建筑工程', '服装设计', '海洋学', '客户沟通', 'D', NULL),
(@pack_id, 33, '海外技术支持的高级年薪范围是？', '20-30万', '35-50', '250-300万', '30-40万', 'B', NULL),
(@pack_id, 34, '海外技术支持的竞争比10:1意味着？', '内部推荐即可', '平均10人竞争1个岗位', '无竞争', '自动录取', 'B', NULL),
(@pack_id, 35, '海外技术支持的工作成果通常以什么形式呈现？', '专业成果', '食品', '建筑', '油画', 'A', NULL),
(@pack_id, 36, '以下哪项是海外技术支持的核心技能之一？', '焊接技术', '客户沟通', '书法篆刻', '核工程', 'B', NULL),
(@pack_id, 37, '以下哪个竞争比与海外技术支持相符？', '10:1', '1:10', '1:20', '1:5', 'A', NULL),
(@pack_id, 38, '海外技术支持在项目中最需要运用的能力是？', '版画制作', '钳工工艺', '英语口语', '机械维修', 'C', NULL),
(@pack_id, 39, '海外技术支持的学科组合中，第一个学科是？', '数据科学', '软件工程', '市场营销', '法学', 'B', NULL),
(@pack_id, 40, '以下哪项是海外技术支持的核心技能之一？', '机械维修', '园艺设计', '核工程', '英语口语', 'D', NULL),
(@pack_id, 41, '海外技术支持对硕士学历的要求是？', '硕士10%', '硕士0%', '硕士20%', '硕士50%', 'C', NULL),
(@pack_id, 42, '软件工程×英语交叉领域对应的岗位是？', '量化交易平台工程师', '推荐系统产品经理', '医院信息系统实施', '海外技术支持', 'D', NULL),
(@pack_id, 43, '以下哪个数字代表海外技术支持的工作强度？', '8', '3', '7', '0', 'B', NULL),
(@pack_id, 44, '应聘海外技术支持时，平均多少人竞争1个岗位？', '2人', '4人', '5人', '10', 'D', NULL),
(@pack_id, 45, '海外技术支持的初级年薪范围是？', '12-18', '200-300万', '8-12万', '5-8万', 'A', NULL),
(@pack_id, 46, '以下哪项是海外技术支持的核心技能之一？', '油画技法', '软件调试', '车床操作', '植物学', 'B', NULL),
(@pack_id, 47, '以下哪项最接近海外技术支持的学历分布？', '本科80% 硕士20%', '高中100%', '硕士100%', '博士100%', 'A', NULL),
(@pack_id, 48, '应聘海外技术支持，本科学历占比约为？', '90%', '20%', '80%', '100%', 'C', NULL),
(@pack_id, 49, '海外技术支持工作中最可能使用的工具是？', '专业工具', '挖掘机', '钢琴', '手术刀', 'A', NULL),
(@pack_id, 50, '海外技术支持的竞争比是？', '10:1', '8:1', '5:1', '100:1', 'A', NULL);
COMMIT;

SELECT 
    major_a_code,
    major_b_code,
    COUNT(*) AS 现有包数,
    GROUP_CONCAT(DISTINCT SUBSTRING_INDEX(pack_key, ':', -1) ORDER BY SUBSTRING_INDEX(pack_key, ':', -1)) AS 已有slot
FROM starlit_pack
GROUP BY major_a_code, major_b_code
HAVING COUNT(*) < 3;

-- ======================================================
-- 专业117：临床医学×英语 — SCI论文编辑（slot :2，完整50题）
-- ======================================================
START TRANSACTION;

-- 删除可能残留的旧数据（slot :2 原本应为空，但为确保干净）
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:2';

-- 插入包信息（question_count = 50）
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:2', 117, 'SCI论文编辑', 'major_clinical', 'major_english', '临床医学×英语', 50, 1);

SET @pack_id = LAST_INSERT_ID();

-- 插入题目（1～50）
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES
(@pack_id, 1, 'SCI论文编辑的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '被淘汰风险', '竞争优势', 'D', NULL),
(@pack_id, 2, 'SCI论文编辑属于哪个学科组合？', '电气工程×金融学', '市场营销×英语', '临床医学×数据科学', '临床医学×英语', 'D', NULL),
(@pack_id, 3, 'SCI论文编辑需要融合哪两个学科的知识？', '历史和地理', '临床医学和英语', '艺术和体育', '金融和建筑', 'B', NULL),
(@pack_id, 4, 'SCI论文编辑的工作强度属于？', '极低', '中', '极高', '较高', 'B', NULL),
(@pack_id, 5, '以下哪项是SCI论文编辑的核心技能之一？', '服装设计', '烹饪技术', '石油钻探', '学术写作', 'D', NULL),
(@pack_id, 6, 'SCI论文编辑对硕士学历的要求是？', '硕士70%', '硕士50%', '硕士0%', '硕士20%', 'A', NULL),
(@pack_id, 7, 'SCI论文编辑的职业发展路径通常从什么级别开始？', '志愿者', '实习生', '合伙人', '初级', 'D', NULL),
(@pack_id, 8, '专业117的岗位名称是？', '软件本地化工程师', '海外技术支持', '计算机双语教学', 'SCI论文编辑', 'D', NULL),
(@pack_id, 9, '以下哪项是SCI论文编辑的核心技能之一？', '量子物理', '油画技法', '英语润色', '天文学', 'C', NULL),
(@pack_id, 10, 'SCI论文编辑的薪资结构中，初级岗位年薪约为？', '5-10万', '15-24', '80-100万', '120-150万', 'B', NULL),
(@pack_id, 11, '以下哪项最接近SCI论文编辑的学历分布？', '博士100%', '高中100%', '硕士70% 博士30%', '本科100%', 'C', NULL),
(@pack_id, 12, 'SCI论文编辑不需要以下哪项能力？', '驾驶技术', '语言能力', '写作能力', '细心耐心', 'A', NULL),
(@pack_id, 13, '以下哪项是SCI论文编辑的核心技能之一？', '雕塑艺术', '医学统计', '矿物学', '园艺设计', 'B', NULL),
(@pack_id, 14, '临床医学×英语交叉领域对应的岗位是？', '技术文档写作', '开发者关系工程师', 'SCI论文编辑', '数据仓库工程师', 'C', NULL),
(@pack_id, 15, '以下哪项不是SCI论文编辑的主要工作内容？', '术语整理', '文字翻译', '股票交易', '内容校对', 'C', NULL),
(@pack_id, 16, 'SCI论文编辑的中级年薪范围是？', '150-200万', '28-45', '200-250万', '15-20万', 'B', NULL),
(@pack_id, 17, '以下哪项是SCI论文编辑的核心技能之一？', '微生物学', '古生物学', '植物学', '学术写作', 'D', NULL),
(@pack_id, 18, '以下哪个竞争比与SCI论文编辑相符？', '1:100', '1:5', '15:1', '1:20', 'C', NULL),
(@pack_id, 19, 'SCI论文编辑岗位要求掌握临床医学和英语的复合知识，这属于？', '纯管理岗位', '体力劳动岗位', '跨学科复合岗位', '纯技术岗位', 'C', NULL),
(@pack_id, 20, 'SCI论文编辑的竞争比是？', '5:1', '8:1', '100:1', '15:1', 'D', NULL),
(@pack_id, 21, '以下哪个不是SCI论文编辑的别称？', '医学翻译', 'SCI论文编辑(高级)', 'SCI论文编辑', '临床医学×英语专家', 'A', NULL),
(@pack_id, 22, 'SCI论文编辑属于以下哪类岗位热度？', '中', '冷门', '极低', '淘汰', 'A', NULL),
(@pack_id, 23, 'SCI论文编辑面试时最可能被考察的技能是？', '学术写作', '机械维修', '考古学', '铣床加工', 'A', NULL),
(@pack_id, 24, 'SCI论文编辑的初级年薪范围是？', '15-24', '5-8万', '200-300万', '100-150万', 'A', NULL),
(@pack_id, 25, '以下哪个岗位名称与专业117对应？', '医疗软件产品经理', 'SCI论文编辑', '生物信息分析师', '医药行业研究员', 'B', NULL),
(@pack_id, 26, '以下哪项是SCI论文编辑的核心技能之一？', '书法篆刻', '医学统计', '昆虫学', '舞蹈编排', 'B', NULL),
(@pack_id, 27, '以下哪个数字代表SCI论文编辑的工作强度？', '7', '8', '6', '2', 'D', NULL),
(@pack_id, 28, 'SCI论文编辑的学科组合中，第一个学科是？', '法学', '临床医学', '市场营销', '数据科学', 'B', NULL),
(@pack_id, 29, 'SCI论文编辑的工作成果通常以什么形式呈现？', '文本/文档', '食品', '软件', '建筑', 'A', NULL),
(@pack_id, 30, '应聘SCI论文编辑时，平均多少人竞争1个岗位？', '5人', '2人', '4人', '15', 'D', NULL),
(@pack_id, 31, 'SCI论文编辑在项目中最需要运用的能力是？', '园艺设计', '学术写作', '舞蹈编排', '航空航天', 'B', NULL),
(@pack_id, 32, '以下哪项最符合SCI论文编辑的职业特点？', '跨学科复合型人才', '纯体力型', '无技能型', '纯管理型', 'A', NULL),
(@pack_id, 33, 'SCI论文编辑的高级年薪范围是？', '20-30万', '30-40万', '50-75', '200-250万', 'C', NULL),
(@pack_id, 34, 'SCI论文编辑的工作强度评级为2，对应描述是？', '繁忙', '超负荷', '中', '一般', 'C', NULL),
(@pack_id, 35, 'SCI论文编辑需要持续学习的原因是？', '学习内容少', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL),
(@pack_id, 36, '以下哪项是SCI论文编辑的交叉学科背景？', '无学科要求', '临床医学×英语', '单一学科', '三个学科', 'B', NULL),
(@pack_id, 37, '在1-5级工作强度体系中，SCI论文编辑属于哪一级？', '7级', '2', '8级', '0级', 'B', NULL),
(@pack_id, 38, '以下哪项是SCI论文编辑的核心技能之一？', '海洋学', '理发师', '昆虫学', '医学统计', 'D', NULL),
(@pack_id, 39, 'SCI论文编辑的学历门槛是？', '硕士70% 博士30%', '博士100%', '大专即可', '无要求', 'A', NULL),
(@pack_id, 40, 'SCI论文编辑的岗位竞争激烈程度为？', '15:1', '3:1', '2:1', '4:1', 'A', NULL),
(@pack_id, 41, '以下哪个场景最符合SCI论文编辑的工作环境？', '农田', '安静办公室', '手术室', '嘈杂工地', 'B', NULL),
(@pack_id, 42, '以下哪项最接近SCI论文编辑的高级年薪上限？', '50万', '40万', '75', '20万', 'C', NULL),
(@pack_id, 43, 'SCI论文编辑属于以下哪个领域的岗位？', '纯文科', '临床医学/英语复合领域', '纯体育', '纯理科', 'B', NULL),
(@pack_id, 44, 'SCI论文编辑的岗位中，最高学历要求通常是什么？', '博士后', '大专', '硕士', '本科', 'C', NULL),
(@pack_id, 45, 'SCI论文编辑工作中最可能使用的工具是？', '翻译软件/编辑器', '钢琴', '挖掘机', '手术刀', 'A', NULL),
(@pack_id, 46, '以下哪项是SCI论文编辑的核心技能之一？', '机械维修', '气象学', '车床操作', '英语润色', 'D', NULL),
(@pack_id, 47, 'SCI论文编辑的工作强度等级是？', '5', '2', '3', '4', 'B', NULL),
(@pack_id, 48, 'SCI论文编辑的工作中不涉及以下哪项技能？', '医学统计', '微生物学', '英语润色', '学术写作', 'B', NULL),
(@pack_id, 49, '在SCI论文编辑的日常工作中，最常用的技能组合是？', '气象学', '焊接技术', '学术写作、医学统计', '烹饪技术', 'C', NULL),
(@pack_id, 50, '应聘SCI论文编辑，本科学历占比约为？', '20%', '10%', '90%', '不适用', 'D', NULL);

COMMIT;

-- 验证总数是否变为 135
-- SELECT COUNT(DISTINCT pack_key) FROM starlit_pack;

USE offercat;

ALTER TABLE student_practice_session
  ADD COLUMN wrong_count INT DEFAULT 0 COMMENT '错误题数',
  ADD COLUMN accuracy INT DEFAULT 0 COMMENT '正确率(0-100)',
  ADD COLUMN session_id VARCHAR(64) DEFAULT NULL COMMENT '前端会话ID(用于跨设备同步)',
  ADD COLUMN title VARCHAR(255) DEFAULT NULL COMMENT '题单标题/名称',
  ADD COLUMN submitted_at DATETIME DEFAULT NULL COMMENT '前端上报提交时间';

ALTER TABLE student_practice_session
  ADD UNIQUE KEY uk_student_session (student_id, session_id);

ALTER TABLE student_practice_session
  ADD INDEX idx_student_type_time (student_id, paper_type, submitted_at);
	
	
	-- 1. 扩长 user 表的学号/身份证容量 (原18，现扩至50)
ALTER TABLE user MODIFY COLUMN id_card VARCHAR(50) COMMENT '学号/身份证号';

-- 2. 扩长 student 表的各项信息容量 (原4~8字，现统一扩至50~100字)
ALTER TABLE student MODIFY COLUMN job_direction VARCHAR(50) COMMENT '求职方向';
ALTER TABLE student MODIFY COLUMN intent_city VARCHAR(50) COMMENT '意向城市';
ALTER TABLE student MODIFY COLUMN bio VARCHAR(100) COMMENT '个人简介';
ALTER TABLE student MODIFY COLUMN expected_salary VARCHAR(50) COMMENT '期望薪资';



CREATE TABLE `ai_user_session` (
  `user_id` BIGINT PRIMARY KEY COMMENT '用户ID',
  `conversations_json` LONGTEXT COMMENT '前端会话列表JSON缓存',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='AI用户会话跨设备同步表';



USE offercat;

-- 1. 创建竞赛奖项表
CREATE TABLE IF NOT EXISTS `competition_award` ( 
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

-- 2. 创建证书资质表
CREATE TABLE IF NOT EXISTS `certificate_qualification` ( 
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

-- 3. 创建项目经历表
CREATE TABLE IF NOT EXISTS `project_experience` ( 
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

-- 4. 创建实习经历表
CREATE TABLE IF NOT EXISTS `internship_experience` ( 
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


-- 禁用外键检查，防止因存在外键关联导致删除/清空失败
SET FOREIGN_KEY_CHECKS = 0;

-- 清空论坛帖子、评论以及相关的点赞和收藏数据
TRUNCATE TABLE forum_comment_like;
TRUNCATE TABLE forum_comment;
TRUNCATE TABLE forum_post_like;
TRUNCATE TABLE forum_post_collect;
TRUNCATE TABLE forum_post;

-- 清除论坛相关的系统互动消息通知（点赞、评论、回复、收藏等）
DELETE FROM sys_message WHERE msg_type IN (1, 2, 3, 4, 5, 6);

-- 恢复外键检查
SET FOREIGN_KEY_CHECKS = 1;

-- 1. 临时关闭外键约束检查
SET FOREIGN_KEY_CHECKS = 0;

-- 2. 清空论坛所有相关表的数据
TRUNCATE TABLE `forum_comment`;
TRUNCATE TABLE `forum_post_like`;
TRUNCATE TABLE `forum_post_collect`;
TRUNCATE TABLE `forum_post`;

-- 3. 重新开启外键约束检查
SET FOREIGN_KEY_CHECKS = 1;


-- ============================================================
-- 论坛模块补丁：添加缺失字段和表
-- 注意：以下 ALTER TABLE 语句在字段已存在时会报错，
--       请在执行前确认字段是否已存在
-- ============================================================

-- 1. 添加 forum_comment 的 reply_to_comment_id 字段
ALTER TABLE `forum_comment` 
  ADD COLUMN `reply_to_comment_id` BIGINT DEFAULT NULL COMMENT '直接被回复的评论ID(楼中楼)' AFTER `parent_id`;

-- 2. 添加 forum_post 的 view_count 字段
ALTER TABLE `forum_post` 
  ADD COLUMN `view_count` INT DEFAULT 0 COMMENT '浏览数量' AFTER `comment_count`;

-- 3. 添加 sys_message 的 post_id 字段
ALTER TABLE `sys_message` 
  ADD COLUMN `post_id` BIGINT DEFAULT NULL COMMENT '冗余帖子ID(用于消息列表展示帖子预览)' AFTER `target_id`;

-- 4. 创建 forum_comment_like 表
CREATE TABLE IF NOT EXISTS `forum_comment_like` (
  `like_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '点赞记录ID',
  `comment_id` BIGINT NOT NULL COMMENT '评论ID',
  `user_id` BIGINT NOT NULL COMMENT '点赞人ID',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '点赞时间',
  UNIQUE KEY `uk_user_comment` (`user_id`, `comment_id`),
  INDEX `idx_comment` (`comment_id`),
  FOREIGN KEY (`comment_id`) REFERENCES `forum_comment`(`comment_id`) ON DELETE CASCADE,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛评论点赞表';

-- 5. 创建 forum_friend_request 表
CREATE TABLE IF NOT EXISTS `forum_friend_request` (
  `request_id` BIGINT PRIMARY KEY AUTO_INCREMENT COMMENT '申请ID',
  `from_user_id` BIGINT NOT NULL COMMENT '申请人ID',
  `to_user_id` BIGINT NOT NULL COMMENT '被申请人ID',
  `status` TINYINT NOT NULL DEFAULT 0 COMMENT '0待处理 1已同意 2已拒绝',
  `create_time` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '申请时间',
  `update_time` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  UNIQUE KEY `uk_pair` (`from_user_id`, `to_user_id`),
  INDEX `idx_to_status` (`to_user_id`, `status`),
  FOREIGN KEY (`from_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE,
  FOREIGN KEY (`to_user_id`) REFERENCES `user`(`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='论坛好友申请表';