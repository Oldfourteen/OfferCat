#!/usr/bin/env python3
"""从「新建 文本文档.txt」生成可导入的 135 包 SQL（修正 slot 重复）。"""
import re
from pathlib import Path

SRC = Path(r"d:\bin\new_2\新建 文本文档.txt")
OUT = Path(__file__).resolve().parents[1] / "backend/java_services/question_bank/sql/starlit_import_135.sql"

HEADER = """-- 点亮星辰 · 135 题库包（由 scripts/build_starlit_import_sql.py 生成）
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

"""

# 专业116/117/126 的 pack_key slot 修正（与 cross_job_catalog 一致）
FIXES = [
    # 116 国际医疗协调员 :0 -> :1
    (
        "major_clinical__major_english:0', 116, '国际医疗协调员",
        "major_clinical__major_english:1', 116, '国际医疗协调员",
    ),
    (
        "WHERE `pack_key` = 'major_clinical__major_english:0';\nINSERT INTO `starlit_pack`",
        "WHERE `pack_key` = 'major_clinical__major_english:1';\nINSERT INTO `starlit_pack`",
        1,  # only second occurrence (专业116 block)
    ),
    # 117 SCI -> :2
    (
        "major_clinical__major_english:1', 117, 'SCI论文编辑",
        "major_clinical__major_english:2', 117, 'SCI论文编辑",
    ),
    (
        "WHERE `pack_key` = 'major_clinical__major_english:1';\nINSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`",
        "WHERE `pack_key` = 'major_clinical__major_english:2';\nINSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`",
        1,
    ),
    # 126 海外技术支持 :0 -> :2
    (
        "major_swe__major_english:0', 126, '海外技术支持",
        "major_swe__major_english:2', 126, '海外技术支持",
    ),
    (
        "WHERE `pack_key` = 'major_swe__major_english:0';\nINSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)\nVALUES ('major_swe__major_english:0', 126",
        "WHERE `pack_key` = 'major_swe__major_english:2';\nINSERT INTO `starlit_pack` (`pack_key`, `pack_no`, `title`, `major_a_code`, `major_b_code`, `subtitle`, `question_count`, `status`)\nVALUES ('major_swe__major_english:2', 126",
    ),
]


def apply_fixes(text: str) -> str:
    # 116: fix DELETE+INSERT block for 国际医疗协调员 (second :0 block)
    text = text.replace(
        "-- 专业116：国际医疗协调员（临床医学×英语）\nSTART TRANSACTION;\nDELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:0';",
        "-- 专业116：国际医疗协调员（临床医学×英语）\nSTART TRANSACTION;\nDELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:1';",
    )
    text = text.replace(
        "VALUES ('major_clinical__major_english:0', 116, '国际医疗协调员'",
        "VALUES ('major_clinical__major_english:1', 116, '国际医疗协调员'",
    )
    # 117
    text = text.replace(
        "-- 专业117：SCI论文编辑（临床医学×英语）\nSTART TRANSACTION;\nDELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:1';",
        "-- 专业117：SCI论文编辑（临床医学×英语）\nSTART TRANSACTION;\nDELETE FROM `starlit_pack` WHERE `pack_key` = 'major_clinical__major_english:2';",
    )
    text = text.replace(
        "VALUES ('major_clinical__major_english:1', 117, 'SCI论文编辑'",
        "VALUES ('major_clinical__major_english:2', 117, 'SCI论文编辑'",
    )
    # 126
    text = text.replace(
        "-- 专业126：海外技术支持（软件工程×英语）\nSTART TRANSACTION;\nDELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:0';",
        "-- 专业126：海外技术支持（软件工程×英语）\nSTART TRANSACTION;\nDELETE FROM `starlit_pack` WHERE `pack_key` = 'major_swe__major_english:2';",
    )
    text = text.replace(
        "VALUES ('major_swe__major_english:0', 126, '海外技术支持'",
        "VALUES ('major_swe__major_english:2', 126, '海外技术支持'",
    )
    return text


def main():
    if not SRC.is_file():
        raise SystemExit(f"找不到源文件: {SRC}")
    body = SRC.read_text(encoding="utf-8")
    body = apply_fixes(body)
    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(HEADER + body, encoding="utf-8")

    keys = re.findall(r"DELETE FROM `starlit_pack` WHERE `pack_key` = '([^']+)'", body)
    from collections import Counter

    c = Counter(keys)
    dups = [k for k, n in c.items() if n > 1]
    print(f"已写出: {OUT}")
    print(f"DELETE 块数: {len(keys)}, 唯一 pack_key: {len(c)}")
    if dups:
        print("仍有重复:", dups)
    else:
        print("pack_key 无重复，可导入。")


if __name__ == "__main__":
    main()
