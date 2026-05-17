-- 点亮星辰 · 135 题库包（由 scripts/build_starlit_import_sql.py 生成）
-- 用法: mysql -u root -p offercat < starlit_import_135.sql
-- 导入后: SELECT COUNT(DISTINCT pack_key) FROM starlit_pack;  -- 应为 135

CREATE DATABASE IF NOT EXISTS `offercat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `offercat`;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE IF NOT EXISTS `starlit_pack` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `pack_key` VARCHAR(128) NOT NULL,
  `pack_no` INT DEFAULT NULL,
  `title` VARCHAR(200) NOT NULL,
  `major_a_code` VARCHAR(64) NOT NULL,
  `major_b_code` VARCHAR(64) NOT NULL,
  `subtitle` VARCHAR(200) DEFAULT NULL,
  `question_count` TINYINT UNSIGNED NOT NULL DEFAULT 50,
  `status` TINYINT NOT NULL DEFAULT 1,
  `create_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_starlit_pack_key` (`pack_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  CONSTRAINT `fk_starlit_question_pack` FOREIGN KEY (`pack_id`) REFERENCES `starlit_pack` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ======================================================
-- 仅保留每个专业的第一题（共135个专业）
-- ======================================================

-- 专业1：电力法规工程师（电气工程×法学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_law:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_law:0', 1, '电力法规工程师', 'major_electrical', 'major_law', '电气工程×法学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '《中华人民共和国电力法》自哪一年起施行？', '1995年', '1996年', '1998年', '2000年', 'B', NULL);
COMMIT;

-- 专业2：能源法律顾问（电气工程×法学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_law:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_law:1', 2, '能源法律顾问', 'major_electrical', 'major_law', '电气工程×法学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '《中华人民共和国能源法》立法目的不包括？', '保障能源安全', '促进能源节约', '规定所有能源价格上限', '保护生态环境', 'C', NULL);
COMMIT;

-- 专业3：智能电网合规专员（电气工程×法学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_law:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_law:2', 3, '智能电网合规专员', 'major_electrical', 'major_law', '电气工程×法学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '根据《个人信息保护法》，处理敏感个人信息应当取得个人的什么同意？', '默示同意', '单独同意', '推定同意', '无需同意', 'B', NULL);
COMMIT;

-- 专业4：电力行业财务分析师（电气工程×会计学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_accounting:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_accounting:0', 4, '电力行业财务分析师', 'major_electrical', 'major_accounting', '电气工程×会计学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '火力发电企业中，购入的燃煤在未投入锅炉前应计入哪个会计科目？', '原材料', '燃料', '在建工程', '库存商品', 'A', NULL);
COMMIT;

-- 专业5：能源项目成本控制（电气工程×会计学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_accounting:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_accounting:1', 5, '能源项目成本控制', 'major_electrical', 'major_accounting', '电气工程×会计学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在光伏电站项目前期，使用已建成类似项目的单位造价（元/W）进行估算，这种方法称为？', '参数估算法', '类比估算法', '自下而上估算法', '三点估算法', 'B', NULL);
COMMIT;

-- 专业6：资产折旧专员（电气工程×会计学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_accounting:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_accounting:2', 6, '资产折旧专员', 'major_electrical', 'major_accounting', '电气工程×会计学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '电力企业中，下列哪项不应确认为固定资产？', '输电铁塔', '正在安装尚未交付的变压器', '已投入使用的发电机组', '办公用电脑', 'B', NULL);
COMMIT;

-- 专业7：嵌入式系统工程师（电气工程×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_cs:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_cs:0', 7, '嵌入式系统工程师', 'major_electrical', 'major_cs', '电气工程×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在嵌入式C语言中，const int *p 与 int * const p 的区别是？', '前者指针不可变，后者指向的数据不可变', '前者指向的数据不可变，后者指针不可变', '两者相同', '都是指针常量', 'B', NULL);
COMMIT;

-- 专业8：工业物联网开发（电气工程×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_cs:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_cs:1', 8, '工业物联网开发', 'major_electrical', 'major_cs', '电气工程×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'MQTT协议基于什么传输层协议？', 'UDP', 'TCP', 'HTTP', 'ICMP', 'B', NULL);
COMMIT;

-- 专业9：电力自动化工程师（电气工程×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_cs:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_cs:2', 9, '电力自动化工程师', 'major_electrical', 'major_cs', '电气工程×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'IEC 61850标准主要应用于哪个领域？', '家用电器通信', '变电站自动化系统', '工业机器人控制', '楼宇自控', 'B', NULL);
COMMIT;

-- 专业10：电力市场交易员（电气工程×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_finance:0', 10, '电力市场交易员', 'major_electrical', 'major_finance', '电气工程×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '我国电力市场化改革中，“管住中间、放开两头”的“中间”指的是？', '发电侧', '输配电环节', '售电侧', '用户侧', 'B', NULL);
COMMIT;

-- 专业11：能源金融分析师（电气工程×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_finance:1', 11, '能源金融分析师', 'major_electrical', 'major_finance', '电气工程×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '欧盟碳市场（EU ETS）目前主要采用什么机制分配免费配额？', '历史法（grandfathering）', '基准法（benchmarking）', '拍卖全部', '随机分配', 'B', NULL);
COMMIT;

-- 专业12：碳交易产品经理（电气工程×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_finance:2', 12, '碳交易产品经理', 'major_electrical', 'major_finance', '电气工程×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '全国碳市场目前覆盖的温室气体种类是？', 'CO₂、CH₄、N₂O', '仅CO₂', '全部6种', 'CO₂和SF₆', 'B', NULL);
COMMIT;

-- 专业13：医疗设备硬件工程师（电气工程×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_clinical:0', 13, '医疗设备硬件工程师', 'major_electrical', 'major_clinical', '电气工程×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '心脏除颤器放电回路中，储能元件通常采用？', '高压电解电容', '电感', '电池', '电阻', 'A', NULL);
COMMIT;

-- 专业14：电生理信号处理工程师（电气工程×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_clinical:1', 14, '电生理信号处理工程师', 'major_electrical', 'major_clinical', '电气工程×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '心电图（ECG）的主要频率成分范围是？', '0.05-100Hz', '0.5-50Hz', '1-1000Hz', '0.1-10Hz', 'A', NULL);
COMMIT;

-- 专业15：医学影像设备研发（电气工程×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_clinical:2', 15, '医学影像设备研发', 'major_electrical', 'major_clinical', '电气工程×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'X射线成像的基本原理是？', '不同组织对X射线衰减差异', '核磁共振', '超声波反射', '正电子湮灭', 'A', NULL);
COMMIT;

-- 专业16：工业控制软件工程师（电气工程×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_swe:0', 16, '工业控制软件工程师', 'major_electrical', 'major_swe', '电气工程×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '梯形图中，串联的常开触点对应逻辑关系是？', '与', '或', '非', '异或', 'A', NULL);
COMMIT;

-- 专业17：智能硬件开发（电气工程×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_swe:1', 17, '智能硬件开发', 'major_electrical', 'major_swe', '电气工程×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '嵌入式Linux内核启动后，第一个用户进程通常是？', 'init', 'bash', 'systemd', 'sh', 'A', NULL);
COMMIT;

-- 专业18：PLC编程专家（电气工程×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_swe:2', 18, 'PLC编程专家', 'major_electrical', 'major_swe', '电气工程×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '梯形图中，两个常开触点并联表示？', '逻辑或', '逻辑与', '逻辑非', '自锁', 'A', NULL);
COMMIT;

-- 专业19：电气产品销售工程师（电气工程×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_marketing:0', 19, '电气产品销售工程师', 'major_electrical', 'major_marketing', '电气工程×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '低压断路器的分断能力是指？', '能可靠切断的最大短路电流', '额定电流', '过载保护倍数', '操作寿命', 'A', NULL);
COMMIT;

-- 专业20：能源方案顾问（电气工程×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_marketing:1', 20, '能源方案顾问', 'major_electrical', 'major_marketing', '电气工程×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '企业能耗审计的第一步是？', '收集历史能耗数据和设备清单', '提出节能方案', '投资估算', '报告撰写', 'A', NULL);
COMMIT;

-- 专业21：工业品品牌经理（电气工程×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_marketing:2', 21, '工业品品牌经理', 'major_electrical', 'major_marketing', '电气工程×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在B2B工业品品牌建设中，品牌承诺的基石是：', '吸引人的广告语', '产品/服务的实际性能和可靠性', '精美的品牌视觉识别系统', '大规模的市场宣传活动', 'B', NULL);
COMMIT;

-- 专业22：电力系统优化建模（电气工程×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_ds:0', 22, '电力系统优化建模', 'major_electrical', 'major_ds', '电气工程×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '电力系统优化调度的核心目标是：', '最大化电网公司利润', '在满足安全约束的前提下，最小化总发电成本或最大化社会福利', '最小化所有用户的用电量', '让所有发电机组都满负荷运行', 'B', NULL);
COMMIT;

-- 专业23：设备预测维护工程师（电气工程×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_ds:1', 23, '设备预测维护工程师', 'major_electrical', 'major_ds', '电气工程×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '设备预测性维护的核心思想是：', '定期更换所有部件', '设备发生故障后再维修', '基于设备实时状态数据预测其剩余寿命或潜在故障，并在最佳时机进行维护', '从不进行任何维护', 'C', NULL);
COMMIT;

-- 专业24：电力系统优化建模（电气工程×数据科学，第二个不同内容）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_ds:2', 24, '电力系统优化建模', 'major_electrical', 'major_ds', '电气工程×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '安全约束机组组合（SCUC）与安全约束经济调度（SCED）的主要区别在于SCUC需要处理：', '网络潮流约束', '机组启停状态的整数变量', '负荷平衡约束', '备用约束', 'B', NULL);
COMMIT;

-- 专业25：电气技术文档工程师（电气工程×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_english:0', 25, '电气技术文档工程师', 'major_electrical', 'major_english', '电气工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '技术文档工程师将一份中文《变频器用户手册》翻译为英文时，最应关注的是：', '使用华丽的修辞手法', '术语的一致性、准确性和指令的清晰性', '将句子翻译得比原文更长', '加入个人技术见解', 'B', NULL);
COMMIT;

-- 专业26：国际电力项目协调（电气工程×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_english:1', 26, '国际电力项目协调', 'major_electrical', 'major_english', '电气工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在国际电力EPC项目（设计-采购-施工）中，项目经理最核心的职责是：', '亲自画所有图纸', '在预算内、按时、按质量要求，整合并管理所有项目资源，协调各方关系', '负责设备采购的具体谈判', '担任现场翻译', 'B', NULL);
COMMIT;

-- 专业27：英文专利分析（电气方向）（电气工程×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_electrical__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_electrical__major_english:2', 27, '英文专利分析 (电气方向)', 'major_electrical', 'major_english', '电气工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '专利文献中的“权利要求书 (Claims)” 的主要作用是：', '介绍技术背景', '定义专利寻求保护的法律范围边界', '描述具体实施方式', '列出发明人信息', 'B', NULL);
COMMIT;

-- 专业28：法务会计（法学×会计学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_accounting:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_accounting:0', 28, '法务会计', 'major_law', 'major_accounting', '法学×会计学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '法务会计的核心工作是什么？', '编制公司年度财务报表', '对企业的税务进行合理筹划', '处理涉及财务事务的法律问题，如调查舞弊、计算经济损失、提供专家证词', '进行公司内部审计', 'C', NULL);
COMMIT;

-- 专业29：税务律师（法学×会计学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_accounting:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_accounting:1', 29, '税务律师', 'major_law', 'major_accounting', '法学×会计学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '税务律师与普通会计师处理税务问题的最大区别在于：', '税务律师计算更准确', '税务律师专注于税务争议解决、筹划中的法律解释与合规，以及代理税务行政诉讼/刑事诉讼', '税务律师收费更低', '税务律师只做国际税收', 'B', NULL);
COMMIT;

-- 专业30：合规审计师（法学×会计学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_accounting:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_accounting:2', 30, '合规审计师', 'major_law', 'major_accounting', '法学×会计学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '“内部审计”与“合规审计”的主要关系是：', '两者完全相同', '合规审计是内部审计的一个重要分支，侧重于检查对法律法规、政策和标准的遵循情况', '内部审计是合规审计的一个分支', '两者没有任何关系', 'B', NULL);
COMMIT;

-- 专业31：网络与信息安全律师（法学×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_cs:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_cs:0', 31, '网络与信息安全律师', 'major_law', 'major_cs', '法学×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '网络与信息安全律师的核心业务不包括：', '协助企业建立网络安全合规体系', '处理数据泄露事件的应急响应和监管通报', '编写防火墙规则和入侵检测策略', '代理网络安全相关的行政诉讼或民事诉讼', 'C', NULL);
COMMIT;

-- 专业32：数据隐私合规官（法学×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_cs:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_cs:1', 32, '数据隐私合规官', 'major_law', 'major_cs', '法学×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '数据隐私合规官（DPO）的核心职责是：', '管理公司所有数据存储硬件', '监督企业的数据保护策略和活动，确保其符合GDPR、PIPL等法规要求', '开发数据分析算法', '负责数据中心的网络布线', 'B', NULL);
COMMIT;

-- 专业33：电子取证专家（法学×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_cs:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_cs:2', 33, '电子取证专家', 'major_law', 'major_cs', '法学×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '电子取证的核心原则是：', '尽快恢复所有数据', '在不改变原始数据的前提下，对电子证据进行获取、分析、保存，并保持完整的证据链', '破译所有密码', '格式化硬盘', 'B', NULL);
COMMIT;

-- 专业34：金融监管律师（法学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_finance:0', 34, '金融监管律师', 'major_law', 'major_finance', '法学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '金融监管律师的主要服务对象是：', '仅限金融机构', '仅限上市公司', '金融机构、上市公司、金融科技公司以及受金融监管法规约束的任何实体', '个人投资者', 'C', NULL);
COMMIT;

-- 专业35：证券合规官（法学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_finance:1', 35, '证券合规官', 'major_law', 'major_finance', '法学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '上市公司证券合规官的核心职责是：', '提高公司股价', '确保公司及其董事、高管、员工的证券交易和相关活动符合法律法规和交易所规则', '负责公司产品的市场推广', '管理公司IT系统', 'B', NULL);
COMMIT;

-- 专业36：反洗钱分析师（法学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_finance:2', 36, '反洗钱分析师', 'major_law', 'major_finance', '法学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '反洗钱分析师的核心工作是：', '追查洗钱犯罪的资金流向', '通过分析交易数据，识别可疑交易，并按照法规要求提交可疑交易报告', '负责抓捕洗钱犯罪嫌疑人', '设计反洗钱软件', 'B', NULL);
COMMIT;

-- 专业37：医疗合规官（法学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_clinical:0', 37, '医疗合规官', 'major_law', 'major_clinical', '法学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医疗合规官的核心职责是：', '直接为病人提供治疗', '确保医疗机构或相关企业在医疗执业、数据管理、临床试验、营销行为等方面符合所有适用的法律法规和行业标准', '负责医院的基础设施建设', '管理医院的食堂', 'B', NULL);
COMMIT;

-- 专业38：医事律师（法学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_clinical:1', 38, '医事律师', 'major_law', 'major_clinical', '法学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医事律师的核心业务领域是：', '药品研发', '处理涉及医疗服务的法律事务，包括医疗纠纷诉讼、医疗机构合规、医患关系法律咨询等', '护理病人', '管理医院行政', 'B', NULL);
COMMIT;

-- 专业39：临床试验法规专员（法学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_clinical:2', 39, '临床试验法规专员', 'major_law', 'major_clinical', '法学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '临床试验法规专员的核心职责是：', '亲自给受试者做体检', '确保临床试验的整个生命周期符合GCP、相关法规和伦理要求', '负责试验药物的研发', '管理试验经费', 'B', NULL);
COMMIT;

-- 专业40：软件许可合规顾问（法学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_swe:0', 40, '软件许可合规顾问', 'major_law', 'major_swe', '法学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '软件许可合规顾问的核心职责是：', '编写软件代码', '确保企业使用、分发、修改软件的行为符合各类软件许可证（商业、开源）的要求', '进行软件销售', '管理软件研发团队', 'B', NULL);
COMMIT;

-- 专业41：开源协议专家（法学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_swe:1', 41, '开源协议专家', 'major_law', 'major_swe', '法学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪个开源许可证属于“强互惠”（Copyleft）类型？', 'MIT License', 'Apache License 2.0', 'GNU General Public License (GPL)', 'BSD 3-Clause License', 'C', NULL);
COMMIT;

-- 专业42：知识产权律师(软件方向)（法学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_swe:2', 42, '知识产权律师(软件方向)', 'major_law', 'major_swe', '法学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '软件著作权保护的对象是？', '软件中的算法', '软件的源代码和目标代码的表达式', '软件功能', '软件界面风格', 'B', NULL);
COMMIT;

-- 专业43：广告法合规专员（法学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_marketing:0', 43, '广告法合规专员', 'major_law', 'major_marketing', '法学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '中国《广告法》规定，广告应当真实、合法，不得含有什么内容？', '创意表达', '虚假或者引人误解的内容', '比较其他产品', '使用绝对化用语（部分情况允许）', 'B', NULL);
COMMIT;

-- 专业44：消费者权益律师（法学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_marketing:1', 44, '消费者权益律师', 'major_law', 'major_marketing', '法学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '中国《消费者权益保护法》规定，消费者为________需要购买、使用商品或接受服务，其权益受保护。', '生产', '生活消费', '经营', '投资', 'B', NULL);
COMMIT;

-- 专业45：营销合同审核（法学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_marketing:2', 45, '营销合同审核', 'major_law', 'major_marketing', '法学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '营销合同中最核心的要素是？', '合同金额', '双方的权利义务', '争议解决方式', '违约责任', 'B', NULL);
COMMIT;

-- 专业46：算法合规顾问（法学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_ds:0', 46, '算法合规顾问', 'major_law', 'major_ds', '法学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '中国《个人信息保护法》规定，利用个人信息进行自动化决策，应当保证决策的什么？', '快速性', '透明性和结果公平公正', '准确性', '盈利性', 'B', NULL);
COMMIT;

-- 专业47：数据治理专家（法学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_ds:1', 47, '数据治理专家', 'major_law', 'major_ds', '法学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '数据治理的核心目标不包括以下哪一项？', '确保数据质量', '保证数据安全合规', '最大化数据存储量', '提升数据可用性', 'C', NULL);
COMMIT;

-- 专业48：隐私保护工程师（法学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_ds:2', 48, '隐私保护工程师', 'major_law', 'major_ds', '法学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '隐私保护工程师的核心工作是？', '提高系统性能', '设计、实现和维护系统隐私保护功能，确保数据处理合规', '数据可视化', '数据库管理', 'B', NULL);
COMMIT;

-- 专业49：涉外法务（法学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_english:0', 49, '涉外法务', 'major_law', 'major_english', '法学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '涉外法务工作中，最常接触的国际商法渊源不包括？', '国际条约', '国际商事惯例', '国内涉外法律', '国内刑法', 'D', NULL);
COMMIT;

-- 专业50：法律翻译（法学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_english:1', 50, '法律翻译', 'major_law', 'major_english', '法学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '法律翻译中，“plaintiff”与“defendant”的标准译法是？', '原告、被告', '上诉人、被上诉人', '申请人、被申请人', '起诉人、答辩人', 'A', NULL);
COMMIT;

-- 专业51：国际仲裁助理（法学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_law__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_law__major_english:2', 51, '国际仲裁助理', 'major_law', 'major_english', '法学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '国际仲裁中，最常见的仲裁机构是？', 'ICC', 'LCIA', 'SIAC', '以上都是', 'D', NULL);
COMMIT;

-- 专业52：会计信息系统实施（会计学×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_cs:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_cs:0', 52, '会计信息系统实施', 'major_accounting', 'major_cs', '会计学×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '会计信息系统实施的第一步通常是？', '安装软件', '需求分析', '数据迁移', '用户培训', 'B', NULL);
COMMIT;

-- 专业53：财务数据分析师（会计学×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_cs:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_cs:1', 53, '财务数据分析师', 'major_accounting', 'major_cs', '会计学×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '财务数据分析师最常用的数据查询语言是？', 'Python', 'SQL', 'Java', 'R', 'B', NULL);
COMMIT;

-- 专业54：ERP财务顾问（会计学×计算机科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_cs:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_cs:2', 54, 'ERP财务顾问', 'major_accounting', 'major_cs', '会计学×计算机科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'ERP系统中，FI模块和CO模块的主要区别是？', 'FI对外财务会计，CO对内管理会计', 'FI记录历史，CO做预算', 'FI关注报表，CO关注成本', 'A', 'A', NULL);
COMMIT;

-- 专业55：财务分析师（会计学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_finance:0', 55, '财务分析师', 'major_accounting', 'major_finance', '会计学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '财务分析师最常使用的估值方法是？', 'DCF模型', '可比公司分析', '先例交易分析', '以上都是', 'D', NULL);
COMMIT;

-- 专业56：投资银行分析师（会计学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_finance:1', 56, '投资银行分析师', 'major_accounting', 'major_finance', '会计学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '投资银行分析师最常使用的估值方法是？', '可比公司分析', '先例交易分析', 'DCF分析', '以上都是', 'D', NULL);
COMMIT;

-- 专业57：估值建模专员（会计学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_finance:2', 57, '估值建模专员', 'major_accounting', 'major_finance', '会计学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '估值建模专员最常用的工具是？', 'Excel', 'Python', 'MATLAB', 'R', 'A', NULL);
COMMIT;

-- 专业58：医院成本核算（会计学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_clinical:0', 58, '医院成本核算', 'major_accounting', 'major_clinical', '会计学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医院成本核算的最小核算单元通常是？', '科室', '医疗项目', '病种', '药品', 'B', NULL);
COMMIT;

-- 专业59：医保财务管理（会计学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_clinical:1', 59, '医保财务管理', 'major_accounting', 'major_clinical', '会计学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医保财务管理中，“医保基金”的收入来源包括？', '个人缴费', '单位缴费', '财政补贴', '以上都是', 'D', NULL);
COMMIT;

-- 专业60：医疗项目预算专员（会计学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_clinical:2', 60, '医疗项目预算专员', 'major_accounting', 'major_clinical', '会计学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医疗项目预算专员在项目立项阶段的主要工作是？', '估算项目成本', '编制预算表', '评估资金来源', '以上都是', 'D', NULL);
COMMIT;

-- 专业61：财务软件开发（会计学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_swe:0', 61, '财务软件开发', 'major_accounting', 'major_swe', '会计学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在财务软件开发中，处理金额数据最安全的数据类型是？', 'Float', 'Double', 'Decimal', 'Integer', 'C', NULL);
COMMIT;

-- 专业62：SaaS财务产品经理（会计学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_swe:1', 62, 'SaaS财务产品经理', 'major_accounting', 'major_swe', '会计学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '作为SaaS财务产品的PM，发现客户最痛恨月末手工对账，你应优先做什么？', '立即开发最复杂的自动化对账算法', '通过访谈和问卷量化该痛点的频率与成本', '发布公告说下版本解决', '建议客户聘请更多会计', 'B', NULL);
COMMIT;

-- 专业63：会计系统测试工程师（会计学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_swe:2', 63, '会计系统测试工程师', 'major_accounting', 'major_swe', '会计学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '测试“凭证保存”功能时，输入借方100元，贷方0元，点击保存，预期结果是？', '保存成功，生成一张凭证', '系统自动在贷方补100元', '系统提示“借贷金额不平衡”，拒绝保存', '系统崩溃', 'C', NULL);
COMMIT;

-- 专业64：营销财务分析（会计学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_marketing:0', 64, '营销财务分析', 'major_accounting', 'major_marketing', '会计学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '营销财务分析的基本公式：ROI (投入产出比) 等于？', '(总收入 - 总成本) / 总成本', '(销售收入 - 营销成本) / 营销成本', '销售收入 / 营销成本', '营销成本 / 销售收入', 'B', NULL);
COMMIT;

-- 专业65：促销效益评估（会计学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_marketing:1', 65, '促销效益评估', 'major_accounting', 'major_marketing', '会计学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '评估“满100减30”促销，最核心的财务指标是？', '活动参与人数', '增量利润 (或增量ROI)', '客单价提升幅度', '发放的优惠券数量', 'B', NULL);
COMMIT;

-- 专业66：渠道成本控制（会计学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_marketing:2', 66, '渠道成本控制', 'major_accounting', 'major_marketing', '会计学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '渠道成本控制的核心目标是？', '将所有渠道成本降到最低', '在保证渠道效能的前提下，优化成本结构，提高投入产出比', '取消所有需要付费的渠道', '只使用免费渠道', 'B', NULL);
COMMIT;

-- 专业67：财务大数据分析（会计学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_ds:0', 67, '财务大数据分析', 'major_accounting', 'major_ds', '会计学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '财务大数据分析的第一步通常是？', '建立复杂的预测模型', '明确业务问题并获取相关数据', '清洗所有数据', '生成可视化报表', 'B', NULL);
COMMIT;

-- 专业68：智能风控建模（会计学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_ds:1', 68, '智能风控建模', 'major_accounting', 'major_ds', '会计学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '智能风控建模中，最常用的监督学习任务是？', '聚类', '二分类 (如好/坏客户)', '降维', '关联规则', 'B', NULL);
COMMIT;

-- 专业69：审计数据分析师（会计学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_ds:2', 69, '审计数据分析师', 'major_accounting', 'major_ds', '会计学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '审计数据分析的首要目标是？', '提高审计效率', '发现异常和风险', '实现全量审计而非抽样', '以上都是', 'D', NULL);
COMMIT;

-- 专业70：国际财务报告翻译（会计学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_english:0', 70, '国际财务报告翻译', 'major_accounting', 'major_english', '会计学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '将中文“未分配利润”翻译成最地道的英文财报术语是？', 'Unallocated Profit', 'Undistributed Profit', 'Retained Earnings', 'Unassigned Profit', 'C', NULL);
COMMIT;

-- 专业71：ACCA双语讲师（会计学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_english:1', 71, 'ACCA双语讲师', 'major_accounting', 'major_english', '会计学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'ACCA的英文全称是？', 'American Certified Corporate Accountant', 'Association of Chartered Certified Accountants', 'Association of Certified Corporate Accountants', 'Australian Chartered Certified Accountants', 'B', NULL);
COMMIT;

-- 专业72：外资企业总账会计（会计学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_accounting__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_accounting__major_english:2', 72, '外资企业总账会计', 'major_accounting', 'major_english', '会计学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在外资企业，总账会计月末需要完成的最重要的报表是？', '销售明细表', '四表一注 (资产负债表、利润表、现金流量表、权益变动表、附注)', '采购订单列表', '员工考勤表', 'B', NULL);
COMMIT;

-- 专业73：量化开发工程师（计算机科学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_finance:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_finance:0', 73, '量化开发工程师', 'major_cs', 'major_finance', '计算机科学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '量化开发工程师主要使用哪种编程语言来实现低延迟交易系统？', 'Python', 'Java', 'C++', 'JavaScript', 'C', NULL);
COMMIT;

-- 专业74：金融科技产品经理（计算机科学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_finance:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_finance:1', 74, '金融科技产品经理', 'major_cs', 'major_finance', '计算机科学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '设计一款移动支付App，最核心的“痛点”是什么？', '界面美观', '安全、便捷、高效地完成支付', '社交功能', '积分商城', 'B', NULL);
COMMIT;

-- 专业75：高频交易系统开发（计算机科学×金融学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_finance:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_finance:2', 75, '高频交易系统开发', 'major_cs', 'major_finance', '计算机科学×金融学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '高频交易系统对网络延迟的要求通常在哪个量级？', '秒级', '毫秒级', '微秒级甚至纳秒级', '分钟级', 'C', NULL);
COMMIT;

-- 专业76：医学影像AI工程师（计算机科学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_clinical:0', 76, '医学影像AI工程师', 'major_cs', 'major_clinical', '计算机科学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医学影像AI中，最常用的深度学习模型架构是？', 'RNN', 'CNN (卷积神经网络)', 'GAN', 'Transformer', 'B', NULL);
COMMIT;

-- 专业77：医疗信息系统开发（计算机科学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_clinical:1', 77, '医疗信息系统开发', 'major_cs', 'major_clinical', '计算机科学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医院信息系统(HIS)中最核心的模块是？', '电子病历(EMR)', '患者挂号与计费', '库存管理', '科研管理', 'B', NULL);
COMMIT;

-- 专业78：临床数据分析师（计算机科学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_clinical:2', 78, '临床数据分析师', 'major_cs', 'major_clinical', '计算机科学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '临床数据分析师最常用的编程语言是？', 'Java', 'Python 或 R', 'C++', 'PHP', 'B', NULL);
COMMIT;

-- 专业79：全栈开发工程师（计算机科学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_swe:0', 79, '全栈开发工程师', 'major_cs', 'major_swe', '计算机科学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '全栈开发工程师需要掌握的技能包括？', '前端 (HTML/CSS/JS)', '后端 (Python/Java/Node.js)', '数据库 (SQL)', '以上都是', 'D', NULL);
COMMIT;

-- 专业80：架构师（计算机科学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_swe:1', 80, '架构师', 'major_cs', 'major_swe', '计算机科学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '软件架构师的主要职责是？', '编写所有代码', '管理项目进度', '设计系统的高层结构、技术选型和关键技术决策', '测试软件质量', 'C', NULL);
COMMIT;

-- 专业81：DevOps工程师（计算机科学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_swe:2', 81, 'DevOps工程师', 'major_cs', 'major_swe', '计算机科学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是DevOps工程师的核心技能之一？', '珠宝鉴定', 'CI/CD', '服装设计', '机械维修', 'B', NULL);
COMMIT;

-- 专业82：营销技术专家(MarTech)（计算机科学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_marketing:0', 82, '营销技术专家(MarTech)', 'major_cs', 'major_marketing', '计算机科学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪个竞争比与营销技术专家(MarTech)相符？', '1:10', '1:100', '1:5', '15:1', 'D', NULL);
COMMIT;

-- 专业83：SEO/SEM策略师（计算机科学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_marketing:1', 83, 'SEO/SEM策略师', 'major_cs', 'major_marketing', '计算机科学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是SEO/SEM策略师的核心技能之一？', '昆虫学', 'Google Ads', '珠宝鉴定', '古生物学', 'B', NULL);
COMMIT;

-- 专业84：推荐系统产品经理（计算机科学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_marketing:2', 84, '推荐系统产品经理', 'major_cs', 'major_marketing', '计算机科学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '推荐系统产品经理不需要以下哪项能力？', '沟通能力', '分析能力', '写作能力', '机械操作', 'D', NULL);
COMMIT;

-- 专业85：机器学习工程师（计算机科学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_ds:0', 85, '机器学习工程师', 'major_cs', 'major_ds', '计算机科学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪个场景最符合机器学习工程师的工作环境？', '法庭', '农田', '手术室', '技术办公室', 'D', NULL);
COMMIT;

-- 专业86：大数据平台开发（计算机科学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_ds:1', 86, '大数据平台开发', 'major_cs', 'major_ds', '计算机科学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '大数据平台开发的薪资结构中，初级岗位年薪约为？', '25-38', '120-150万', '5-10万', '3-5万', 'A', NULL);
COMMIT;

-- 专业87：AI算法专家（计算机科学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_ds:2', 87, 'AI算法专家', 'major_cs', 'major_ds', '计算机科学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'AI算法专家的岗位中，最高学历要求通常是什么？', '大专', '博士', '博士后', '高中', 'B', NULL);
COMMIT;

-- 专业88：技术文档工程师（计算机科学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_english:0', 88, '技术文档工程师', 'major_cs', 'major_english', '计算机科学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是技术文档工程师的核心技能之一？', '天文学', '昆虫学', '雕塑艺术', 'DITA', 'D', NULL);
COMMIT;

-- 专业89：英文技术支持（计算机科学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_english:1', 89, '英文技术支持', 'major_cs', 'major_english', '计算机科学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '英文技术支持对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士10%', '硕士0%', 'B', NULL);
COMMIT;

-- 专业90：计算机双语教学（计算机科学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_cs__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_cs__major_english:2', 90, '计算机双语教学', 'major_cs', 'major_english', '计算机科学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '计算机双语教学在项目中最需要运用的能力是？', '雕塑艺术', '烹饪技术', '石油钻探', '编程能力', 'D', NULL);
COMMIT;

-- 专业91：医疗健康投资分析师（金融学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_clinical:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_clinical:0', 91, '医疗健康投资分析师', 'major_finance', 'major_clinical', '金融学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是医疗健康投资分析师的核心技能之一？', '估值', '油画技法', '采矿工程', '昆虫学', 'A', NULL);
COMMIT;

-- 专业92：医药行业研究员（金融学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_clinical:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_clinical:1', 92, '医药行业研究员', 'major_finance', 'major_clinical', '金融学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医药行业研究员面试时最可能被考察的技能是？', '量子物理', '药物研发流程', '拓扑学', '植物学', 'B', NULL);
COMMIT;

-- 专业93：医保精算师（金融学×临床医学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_clinical:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_clinical:2', 93, '医保精算师', 'major_finance', 'major_clinical', '金融学×临床医学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医保精算师的工作强度评级为2，对应描述是？', '超负荷', '中', '一般', '繁忙', 'B', NULL);
COMMIT;

-- 专业94：金融软件产品经理（金融学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_swe:0', 94, '金融软件产品经理', 'major_finance', 'major_swe', '金融学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是金融软件产品经理的核心技能之一？', '油画技法', '金融知识', '茶艺师', '陶瓷工艺', 'B', NULL);
COMMIT;

-- 专业95：交易系统开发（金融学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_swe:1', 95, '交易系统开发', 'major_finance', 'major_swe', '金融学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是交易系统开发的核心技能之一？', '采矿工程', '舞蹈编排', '交易所接口', '书法篆刻', 'C', NULL);
COMMIT;

-- 专业96：量化交易平台工程师（金融学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_swe:2', 96, '量化交易平台工程师', 'major_finance', 'major_swe', '金融学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '量化交易平台工程师需要融合哪两个学科的知识？', '金融和建筑', '金融学和软件工程', '法学和医学', '历史和地理', 'B', NULL);
COMMIT;

-- 专业97：金融产品营销经理（金融学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_marketing:0', 97, '金融产品营销经理', 'major_finance', 'major_marketing', '金融学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '金融产品营销经理的初级年薪范围是？', '16-25', '8-12万', '100-150万', '5-8万', 'A', NULL);
COMMIT;

-- 专业98：财富管理顾问（金融学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_marketing:1', 98, '财富管理顾问', 'major_finance', 'major_marketing', '金融学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '财富管理顾问对硕士学历的要求是？', '硕士50%', '硕士20%', '硕士40%', '硕士10%', 'C', NULL);
COMMIT;

-- 专业99：投资者关系专员（金融学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_marketing:2', 99, '投资者关系专员', 'major_finance', 'major_marketing', '金融学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '投资者关系专员的工作成果通常以什么形式呈现？', '方案/报告', '建筑', '食品', '药品', 'A', NULL);
COMMIT;

-- 专业100：金融数据分析师（金融学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_ds:0', 100, '金融数据分析师', 'major_finance', 'major_ds', '金融学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项技能对金融数据分析师的职业发展最重要？', '园艺设计', '茶艺师', 'Python/SQL', '版画制作', 'C', NULL);
COMMIT;

-- 专业101：风险建模专家（金融学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_ds:1', 101, '风险建模专家', 'major_finance', 'major_ds', '金融学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项最接近风险建模专家的学历分布？', '博士100%', '高中100%', '本科100%', '本科20% 硕士80%', 'D', NULL);
COMMIT;

-- 专业102：智能投顾算法工程师（金融学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_ds:2', 102, '智能投顾算法工程师', 'major_finance', 'major_ds', '金融学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '智能投顾算法工程师的中级年薪范围是？', '200-250万', '150-200万', '15-20万', '55-90', 'D', NULL);
COMMIT;

-- 专业103：国际金融分析师(CFA)（金融学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_english:0', 103, '国际金融分析师(CFA)', 'major_finance', 'major_english', '金融学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '国际金融分析师(CFA)的职业发展路径通常从什么级别开始？', '志愿者', '初级', '合伙人', '实习生', 'B', NULL);
COMMIT;

-- 专业104：外汇交易员（金融学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_english:1', 104, '外汇交易员', 'major_finance', 'major_english', '金融学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '外汇交易员需要持续学习的原因是？', '无需学习', '技术更新快', '学习不重要', '学习有坏处', 'B', NULL);
COMMIT;

-- 专业105：跨境并购翻译（金融学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_finance__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_finance__major_english:2', 105, '跨境并购翻译', 'major_finance', 'major_english', '金融学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '跨境并购翻译的初级年薪范围是？', '8-12万', '200-300万', '5-8万', '15-24', 'D', NULL);
COMMIT;

-- 专业106：医疗软件产品经理（临床医学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_swe:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_swe:0', 106, '医疗软件产品经理', 'major_clinical', 'major_swe', '临床医学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医疗软件产品经理需要融合哪两个学科的知识？', '艺术和体育', '金融和建筑', '临床医学和软件工程', '法学和医学', 'C', NULL);
COMMIT;

-- 专业107：医院信息系统实施（临床医学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_swe:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_swe:1', 107, '医院信息系统实施', 'major_clinical', 'major_swe', '临床医学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医院信息系统实施的工作强度属于？', '较低', '中', '极高', '较高', 'B', NULL);
COMMIT;

-- 专业108：电子病历开发工程师（临床医学×软件工程）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_swe:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_swe:2', 108, '电子病历开发工程师', 'major_clinical', 'major_swe', '临床医学×软件工程', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是电子病历开发工程师的核心技能之一？', 'HL7标准', '茶艺师', '油画技法', '舞蹈编排', 'A', NULL);
COMMIT;

-- 专业109：医药代表（临床医学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_marketing:0', 109, '医药代表', 'major_clinical', 'major_marketing', '临床医学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医药代表的中级年薪范围是？', '150-200万', '15-20万', '200-250万', '30-50', 'D', NULL);
COMMIT;

-- 专业110：医疗器械产品经理（临床医学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_marketing:1', 110, '医疗器械产品经理', 'major_clinical', 'major_marketing', '临床医学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医疗器械产品经理的竞争比是？', '5:1', '100:1', '8:1', '20:1', 'D', NULL);
COMMIT;

-- 专业111：医疗市场专员（临床医学×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_marketing:2', 111, '医疗市场专员', 'major_clinical', 'major_marketing', '临床医学×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '医疗市场专员不需要以下哪项能力？', '分析能力', '机械操作', '沟通能力', '写作能力', 'B', NULL);
COMMIT;

-- 专业112：生物信息分析师（临床医学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_ds:0', 112, '生物信息分析师', 'major_clinical', 'major_ds', '临床医学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是生物信息分析师的核心技能之一？', '微生物学', '版画制作', '核工程', '基因组学', 'D', NULL);
COMMIT;

-- 专业113：真实世界研究数据专家（临床医学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_ds:1', 113, '真实世界研究数据专家', 'major_clinical', 'major_ds', '临床医学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '应聘真实世界研究数据专家，本科学历占比约为？', '10%', '100%', '20%', '90%', 'C', NULL);
COMMIT;

-- 专业114：临床预测模型开发（临床医学×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_ds:2', 114, '临床预测模型开发', 'major_clinical', 'major_ds', '临床医学×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '临床预测模型开发的工作中不涉及以下哪项技能？', '临床知识', '机器学习', '珠宝鉴定', '模型验证', 'C', NULL);
COMMIT;

-- 专业115：医学翻译（临床医学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:0', 115, '医学翻译', 'major_clinical', 'major_english', '临床医学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪个不是医学翻译的别称？', '医疗软件产品经理', '临床医学×英语专家', '医学翻译(资深)', '医学翻译', 'A', NULL);
COMMIT;

-- 专业116：国际医疗协调员（临床医学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:1', 116, '国际医疗协调员', 'major_clinical', 'major_english', '临床医学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '国际医疗协调员岗位要求掌握临床医学和英语的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '体力劳动岗位', '单一学科岗位', 'A', NULL);
COMMIT;

-- 专业117：SCI论文编辑（临床医学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:2', 117, 'SCI论文编辑', 'major_clinical', 'major_english', '临床医学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'SCI论文编辑的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '被淘汰风险', '竞争优势', 'D', NULL);
COMMIT;

-- 专业118：技术产品经理（软件工程×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_marketing:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_marketing:0', 118, '技术产品经理', 'major_swe', 'major_marketing', '软件工程×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '技术产品经理的工作中不涉及以下哪项技能？', '服装设计', '数据分析', '用户研究', '技术理解', 'A', NULL);
COMMIT;

-- 专业119：开发者关系工程师（软件工程×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_marketing:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_marketing:1', 119, '开发者关系工程师', 'major_swe', 'major_marketing', '软件工程×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '开发者关系工程师在项目中最需要运用的能力是？', '书法篆刻', '技术社区', '海洋学', '理发师', 'B', NULL);
COMMIT;

-- 专业120：软件售前顾问（软件工程×市场营销）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_marketing:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_marketing:2', 120, '软件售前顾问', 'major_swe', 'major_marketing', '软件工程×市场营销', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪个数字代表软件售前顾问的工作强度？', '7', '4', '0', '8', 'B', NULL);
COMMIT;

-- 专业121：数据平台开发工程师（软件工程×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_ds:0', 121, '数据平台开发工程师', 'major_swe', 'major_ds', '软件工程×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '数据平台开发工程师岗位要求掌握软件工程和数据科学的复合知识，这属于？', '单一学科岗位', '跨学科复合岗位', '纯管理岗位', '纯技术岗位', 'B', NULL);
COMMIT;

-- 专业122：数据仓库工程师（软件工程×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_ds:1', 122, '数据仓库工程师', 'major_swe', 'major_ds', '软件工程×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '数据仓库工程师的工作中不涉及以下哪项技能？', '数据建模', 'ETL', 'SQL', '建筑工程', 'D', NULL);
COMMIT;

-- 专业123：机器学习平台开发（软件工程×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_ds:2', 123, '机器学习平台开发', 'major_swe', 'major_ds', '软件工程×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项不是机器学习平台开发的主要工作内容？', '系统设计', '技术方案', '代码编写', '财务报表审计', 'D', NULL);
COMMIT;

-- 专业124：软件本地化工程师（软件工程×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:0', 124, '软件本地化工程师', 'major_swe', 'major_english', '软件工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '专业124的岗位名称是？', '数据仓库工程师', '量化交易平台工程师', '软件本地化工程师', '风险建模专家', 'C', NULL);
COMMIT;

-- 专业125：技术文档写作（软件工程×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:1', 125, '技术文档写作', 'major_swe', 'major_english', '软件工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是技术文档写作的核心技能之一？', '钢琴演奏', '古生物学', '油画技法', '英语', 'D', NULL);
COMMIT;

-- 专业126：海外技术支持（软件工程×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:2', 126, '海外技术支持', 'major_swe', 'major_english', '软件工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '海外技术支持面试时最可能被考察的技能是？', '英语口语', '矿物学', '服装设计', '核工程', 'A', NULL);
COMMIT;

-- 专业127：市场数据分析师（市场营销×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_ds:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_ds:0', 127, '市场数据分析师', 'major_marketing', 'major_ds', '市场营销×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项最符合市场数据分析师的职业特点？', '纯管理型', '单一技能型', '跨学科复合型人才', '无技能型', 'C', NULL);
COMMIT;

-- 专业128：用户增长分析师（市场营销×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_ds:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_ds:1', 128, '用户增长分析师', 'major_marketing', 'major_ds', '市场营销×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '在1-5级工作强度体系中，用户增长分析师属于哪一级？', '3', '7级', '0级', '6级', 'A', NULL);
COMMIT;

-- 专业129：客户画像建模（市场营销×数据科学）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_ds:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_ds:2', 129, '客户画像建模', 'major_marketing', 'major_ds', '市场营销×数据科学', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项不是客户画像建模的主要工作内容？', '核心工作A', '核心工作C', 'unrelated_work', '核心工作B', 'C', NULL);
COMMIT;

-- 专业130：海外营销专员（市场营销×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_english:0', 130, '海外营销专员', 'major_marketing', 'major_english', '市场营销×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是海外营销专员的核心技能之一？', '英语', '书法篆刻', '天文学', '航空航天', 'A', NULL);
COMMIT;

-- 专业131：跨境电商运营（市场营销×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_english:1', 131, '跨境电商运营', 'major_marketing', 'major_english', '市场营销×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '跨境电商运营在项目中最需要运用的能力是？', '平台规则(Amazon)', '微生物学', '航空航天', '烹饪技术', 'A', NULL);
COMMIT;

-- 专业132：国际品牌策划（市场营销×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_marketing__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_marketing__major_english:2', 132, '国际品牌策划', 'major_marketing', 'major_english', '市场营销×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '国际品牌策划的岗位中，最高学历要求通常是什么？', '本科', '硕士', '博士后', '大专', 'B', NULL);
COMMIT;

-- 专业133：数据科学翻译（数据科学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_ds__major_english:0';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_ds__major_english:0', 133, '数据科学翻译', 'major_ds', 'major_english', '数据科学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '数据科学翻译需要持续学习的原因是？', '学习不重要', '学习有坏处', '技术更新快', '学习内容少', 'C', NULL);
COMMIT;

-- 专业134：海外数据竞赛选手（数据科学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_ds__major_english:1';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_ds__major_english:1', 134, '海外数据竞赛选手', 'major_ds', 'major_english', '数据科学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项最接近海外数据竞赛选手的学历分布？', '本科100%', '本科40% 硕士60%', '高中100%', '硕士100%', 'B', NULL);
COMMIT;

-- 专业135：双语数据报告撰写（数据科学×英语）
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_ds__major_english:2';
INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_ds__major_english:2', 135, '双语数据报告撰写', 'major_ds', 'major_english', '数据科学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '以下哪项是双语数据报告撰写的核心技能之一？', '陶瓷工艺', '海洋学', '数据可视化', '焊接技术', 'C', NULL);
COMMIT;

-- ======================================================
-- 结束
-- ======================================================