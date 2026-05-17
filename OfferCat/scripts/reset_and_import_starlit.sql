-- 可选：清空题库后全量导入（会保留 user_starlit_progress 里无效 pack_id，一般可忽略）
-- 若只想在现有 53 包基础上追加，不要执行本文件，直接导入 starlit_import_135.sql 即可

USE offercat;
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE starlit_question;
TRUNCATE TABLE starlit_pack;
SET FOREIGN_KEY_CHECKS = 1;

-- 然后在命令行执行:
-- mysql -u root -p offercat < backend/java_services/question_bank/sql/starlit_import_135.sql
