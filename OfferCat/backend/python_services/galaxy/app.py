"""
galaxy 聚合 Py：推荐 / 语义近邻 / 报告条带。
数据：环境变量 GALAXY_DATA_DIR，否则使用本目录 ./data（与 Java/C++ 同构 JSON）。
"""
from __future__ import annotations

import json
import os
from pathlib import Path
from typing import Any, Dict, List

from flask import Flask, jsonify, request

app = Flask(__name__)


def _data_dir() -> Path:
    d = os.environ.get("GALAXY_DATA_DIR", "").strip()
    if d:
        return Path(d)
    return Path(__file__).resolve().parent / "data"


def _load_json(name: str) -> Any:
    p = _data_dir() / name
    with p.open(encoding="utf-8") as f:
        return json.load(f)


@app.route("/galaxy/recommend", methods=["POST"])
def galaxy_recommend():
    body = request.get_json(silent=True) or {}
    selected = body.get("selectedNodeId") or body.get("selected_node_id")
    base = _load_json("recommend.json")
    suggestions: List[Dict[str, str]] = list(base.get("suggestions") or [])
    if selected:
        try:
            edges = _load_json("edges.json")
            nbr = set()
            for e in edges:
                if e.get("u") == selected:
                    nbr.add(str(e.get("v")))
                if e.get("v") == selected:
                    nbr.add(str(e.get("u")))
            for fid in sorted(nbr):
                if fid.startswith("fusion_") and fid not in {s["nodeId"] for s in suggestions}:
                    suggestions.insert(
                        0,
                        {
                            "nodeId": fid,
                            "reason": f"与当前选中节点「{selected}」在图上相邻（占位策略）",
                        },
                    )
                    break
        except OSError:
            pass
    return jsonify({"suggestions": suggestions[:8], "note": "galaxy python recommend"})


def _embed_rank(text: str, k: int) -> List[str]:
    text_l = (text or "").lower()
    nodes = _load_json("nodes.json")
    scored: List[tuple[float, str]] = []
    for n in nodes:
        if n.get("type") != "fusion":
            continue
        nid = str(n.get("id", ""))
        meta = n.get("meta") or {}
        tag = str(meta.get("tagline") or "")
        lab = str(n.get("label") or "")
        blob = (tag + " " + lab).lower()
        score = sum(1 for w in text_l.split() if len(w) > 1 and w in blob)
        scored.append((float(score), nid))
    scored.sort(key=lambda x: (-x[0], x[1]))
    return [nid for _, nid in scored[:k]]


@app.route("/galaxy/embed/neighbors", methods=["POST"])
def galaxy_embed_neighbors():
    body = request.get_json(silent=True) or {}
    text = body.get("text") or ""
    k = int(body.get("k", 5))
    return jsonify({"rankedFusionIds": _embed_rank(text, k), "k": k})


@app.route("/galaxy/report", methods=["POST"])
def galaxy_report():
    nodes = _load_json("nodes.json")
    majors = [n for n in nodes if n.get("type") == "major"]
    bars = [{"label": m.get("label", m.get("id")), "value": 1.0} for m in majors[:10]]
    return jsonify({"bars": bars, "note": "galaxy python report mock"})


if __name__ == "__main__":
    port = int(os.environ.get("GALAXY_PY_PORT", "15100"))
    app.run(host="0.0.0.0", port=port, debug=False)
