-- 导入 starlit_import_135.sql 后执行本脚本校验

USE offercat;

SELECT 'distinct pack_key (期望 135)' AS check_name, COUNT(DISTINCT pack_key) AS cnt FROM starlit_pack;

SELECT 'pack 无题目' AS check_name, COUNT(*) AS cnt
FROM starlit_pack p
LEFT JOIN starlit_question q ON q.pack_id = p.id
GROUP BY p.id
HAVING COUNT(q.id) = 0;

SELECT '题目总数 (期望 >= 135)' AS check_name, COUNT(*) AS cnt FROM starlit_question;

-- 抽查：数据治理专家
SELECT p.pack_key, p.title, q.stem
FROM starlit_pack p
JOIN starlit_question q ON q.pack_id = p.id
WHERE p.pack_key = 'major_law__major_ds:1';
