#!/usr/bin/env python3
"""Audit 135-pack starlit SQL against cross_job_catalog.tsv."""
import re
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SQL_PATH = Path(r"d:\bin\new_2\新建 文本文档.txt")
TSV_PATH = ROOT / "frontend/galaxy-h5/public/data/cross_job_catalog.tsv"

MAJOR_TXT = {
    "电气工程": "major_electrical",
    "法学": "major_law",
    "会计学": "major_accounting",
    "计算机科学": "major_cs",
    "金融学": "major_finance",
    "临床医学": "major_clinical",
    "软件工程": "major_swe",
    "市场营销": "major_marketing",
    "数据科学": "major_ds",
    "英语": "major_english",
}


def codes_from_pair(pair: str):
    parts = [p.strip() for p in pair.split("×")]
    if len(parts) != 2:
        return None, None
    return MAJOR_TXT.get(parts[0]), MAJOR_TXT.get(parts[1])


def parse_sql(text: str):
    pattern = re.compile(
        r"DELETE FROM `starlit_pack` WHERE `pack_key` = '([^']+)';\s*"
        r"INSERT INTO `starlit_pack`[^;]+VALUES \('([^']+)', (\d+), '([^']*)', "
        r"'([^']+)', '([^']+)', '([^']*)', (\d+),",
        re.S,
    )
    packs = []
    for m in pattern.finditer(text):
        pk, _, pno, title, ma, mb, sub, qc = m.groups()
        packs.append(
            {
                "pack_key": pk,
                "pack_no": int(pno),
                "title": title,
                "major_a": ma,
                "major_b": mb,
                "subtitle": sub,
                "question_count": int(qc),
            }
        )
    return packs


def parse_catalog(text: str):
    rows = []
    for line in text.splitlines():
        if not line.strip() or line.startswith("序号"):
            continue
        cols = line.split("\t")
        if len(cols) < 3:
            continue
        try:
            idx = int(cols[0])
        except ValueError:
            continue
        rows.append({"idx": idx, "pair": cols[1].strip(), "title": cols[2].strip()})
    return rows


def main():
    sql = SQL_PATH.read_text(encoding="utf-8")
    tsv = TSV_PATH.read_text(encoding="utf-8")
    packs = parse_sql(sql)
    catalog = parse_catalog(tsv)

    print("=== SQL 文件 ===")
    print(f"路径: {SQL_PATH}")
    print(f"INSERT 块数: {len(packs)}")
    keys = [p["pack_key"] for p in packs]
    print(f"唯一 pack_key: {len(set(keys))}")

    dup = [k for k, n in Counter(keys).items() if n > 1]
    print(f"重复 pack_key ({len(dup)}):")
    for k in dup:
        titles = [p["title"] for p in packs if p["pack_key"] == k]
        print(f"  {k} -> {titles}")

    # expected from catalog: 45 pairs x 3 slots
    pair_groups: dict[str, list] = defaultdict(list)
    for r in catalog:
        pair_groups[r["pair"]].append(r)
    expected = []
    for pair, rows in sorted(pair_groups.items()):
        rows.sort(key=lambda x: x["idx"])
        ma, mb = codes_from_pair(pair)
        if not ma or not mb:
            print(f"WARN 无法解析学科对: {pair}")
            continue
        for slot, row in enumerate(rows[:3]):
            expected.append(
                {
                    "idx": row["idx"],
                    "pair": pair,
                    "title": row["title"],
                    "pack_key": f"{ma}__{mb}:{slot}",
                    "slot": slot,
                }
            )

    sql_by_key = {p["pack_key"]: p for p in packs}
    exp_keys = {e["pack_key"] for e in expected}

    print("\n=== 与岗位表对照 (135 岗) ===")
    print(f"岗位表行数: {len(catalog)}")
    print(f"应有 pack_key 数: {len(expected)}")

    missing = [e for e in expected if e["pack_key"] not in sql_by_key]
    extra = sorted(set(sql_by_key) - exp_keys)
    title_mismatch = []
    for e in expected:
        sp = sql_by_key.get(e["pack_key"])
        if sp and sp["title"] != e["title"]:
            title_mismatch.append((e["pack_key"], e["title"], sp["title"]))

    print(f"SQL 缺少的包: {len(missing)}")
    for e in missing:
        print(f"  idx={e['idx']} {e['pack_key']} | {e['pair']} | {e['title']}")

    print(f"SQL 多余的包: {len(extra)}")
    for k in extra:
        print(f"  {k} | {sql_by_key[k]['title']}")

    print(f"标题与岗位表不一致: {len(title_mismatch)}")
    for pk, exp, got in title_mismatch[:20]:
        print(f"  {pk}: 表={exp!r} SQL={got!r}")
    if len(title_mismatch) > 20:
        print(f"  ... 另有 {len(title_mismatch) - 20} 条")

  # lex vs catalog order (wrong key if only order swapped)
    print("\n=== 学科顺序（字典序 vs 岗位表 pair 列）===")
    wrong_order = []
    for e in expected:
        ma, mb = e["pack_key"].rsplit(":", 1)[0].split("__", 1)
        lex_a, lex_b = (ma, mb) if ma <= mb else (mb, ma)
        catalog_key = e["pack_key"]
        lex_key = f"{lex_a}__{lex_b}:{e['slot']}"
        if catalog_key != lex_key and sql_by_key.get(catalog_key) and not sql_by_key.get(lex_key):
            wrong_order.append((e["pair"], catalog_key, lex_key, e["title"]))
    print(f"若前端误用字典序会查错的包: {len(wrong_order)}")
    for row in wrong_order[:15]:
        print(f"  {row[0]} | 正确 {row[1]} | 错误 {row[2]} | {row[3]}")
    if len(wrong_order) > 15:
        print(f"  ... 另有 {len(wrong_order) - 15} 条")

    qc = sorted({p["question_count"] for p in packs})
    print(f"\nquestion_count 取值: {qc} (前端默认上限 50，与库不一致时仅影响星点展示上限)")

    print("\n=== 结论 ===")
    if dup:
        print("- SQL 存在重复 pack_key，后插入会覆盖先插入，实际有效包 < 135")
    if missing:
        print("- SQL 缺少岗位表中的包，对应小行星会 404/无题")
    if len(wrong_order) > 0:
        print("- 大量学科对的 pack_key 顺序以岗位表为准，非字典序；前端必须用 catalog 顺序")
    if not dup and not missing and len(packs) == 135:
        print("- 135 包结构完整；若仍 HTTP 500，优先查 galaxy-service / 表结构 / 网关")

    index_path = ROOT / "scripts/starlit_pack_index.tsv"
    lines = ["pack_key\tpack_no\tpair\ttitle\tslot"]
    for e in sorted(expected, key=lambda x: x["idx"]):
        lines.append(
            f"{e['pack_key']}\t{e['idx']}\t{e['pair']}\t{e['title']}\t{e['slot']}"
        )
    index_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"\n已写出对照表: {index_path}")


if __name__ == "__main__":
    main()
