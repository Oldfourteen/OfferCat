-- 修正「新建 文本文档.txt」中 slot 写错导致的重复 pack_key（2 组 × 影响 4 岗）
-- 执行后应有 135 个互不相同的 pack_key
-- 对照表见 scripts/starlit_pack_index.tsv

-- ---------- 临床医学 × 英语：116→:1，117→:2 ----------
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:1' AND title = 'SCI论文编辑';
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:0' AND title = '国际医疗协调员';

INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:1', 116, '国际医疗协调员', 'major_clinical', 'major_english', '临床医学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '国际医疗协调员岗位要求掌握临床医学和英语的复合知识，这属于？', '跨学科复合岗位', '纯技术岗位', '体力劳动岗位', '单一学科岗位', 'A', NULL);

INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_clinical__major_english:2', 117, 'SCI论文编辑', 'major_clinical', 'major_english', '临床医学×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, 'SCI论文编辑的复合学科背景使其在就业市场上具有？', '负面作用', '劣势', '被淘汰风险', '竞争优势', 'D', NULL);
COMMIT;

-- ---------- 软件工程 × 英语：126→:2（勿再占用 :0）----------
START TRANSACTION;
DELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:0' AND title = '海外技术支持';

INSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)
VALUES ('major_swe__major_english:2', 126, '海外技术支持', 'major_swe', 'major_english', '软件工程×英语', 1, 1);
SET @pack_id = LAST_INSERT_ID();
INSERT INTO `starlit_question` (`pack_id`, `question_no`, `stem`, `option_a`, `option_b`, `option_c`, `option_d`, `correct_answer`, `answer_note`)
VALUES (@pack_id, 1, '海外技术支持面试时最可能被考察的技能是？', '英语口语', '矿物学', '服装设计', '核工程', 'A', NULL);
COMMIT;

-- 校验：应返回 135
-- SELECT COUNT(DISTINCT pack_key) FROM starlit_pack;
