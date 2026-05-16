-- ======================================================
-- 专业星系 · 点亮星辰题库（Starlit）
-- 库名：offercat（见仓库根目录 OfferCat_DataBase.sql）
-- 本脚本：建表 + 导入 专业1~专业10（共500题；当前仓库仅含专业1，其余包按同模板追加）
-- 可重复执行：CREATE IF NOT EXISTS 建表；按 pack_key DELETE 后重插，已有包会被覆盖
-- 单包上限：stars_lit 由 starlit_pack.question_count 约束（默认50），全站总星数不设 DB 硬上限
-- major_*_code 对齐 galaxy-h5/src/data/majors.ts（如 major_ds，勿用 major_datascience）
-- ======================================================

CREATE DATABASE IF NOT EXISTS `offercat` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `offercat`;

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
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`) VALUES(@pack_id, 1, '《中华人民共和国电力法》自哪一年起施行？', '1995年', '1996年', '1998年', '2000年', 'B', NULL),
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

-- 导入后校验（可选，在客户端执行）
-- SELECT COUNT(*) AS cnt FROM starlit_question WHERE pack_id = @pack_id;
-- 期望 cnt = 50
