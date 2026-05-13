# 关键词高亮：朴素 vs Aho–Corasick（及「智能 / 朴素」产品模式）

## 收集阶段（同一套 merge 规则）

- **朴素**：对每个关键词循环 `std::string::find`。
- **AC**：**Aho–Corasick** 在 **UTF-8 字节**上扫描。

二者在**同一组关键词**下，merge 后命中区间**一致**（便于单测对比收集器实现）。

## 简历接口上的「智能 / 朴素」（与词表合并联动）

对 **`POST /api/v1/resume/highlight`**、**`POST /api/v1/resume/pdf`**，请求体可带：

| 字段 | 取值 | 词表合并 | 收集器 |
|------|------|----------|--------|
| `highlightEngine` | `"ac"` | 合并 `major_file_map` 对应专业 txt | AC |
| `highlightEngine` | `"naive"` | **仅**请求里的 `keywords`，不加载专业 txt | 朴素 |
| `useAcAutomaton` | `true` / 非 0 | 合并专业 txt | AC |
| `useAcAutomaton` | `false` / `0` | **仅**请求 `keywords` | 朴素 |
| 两者都不传 | — | 合并专业 txt（与旧版一致） | 由环境变量 `RESUME_PDF_AC` 决定 |

这样「智能」与「朴素」在**专业词表是否参与**上会拉开差距，PDF 高亮范围可以明显不同。

`POST /api/v1/text/highlight` 无专业词表逻辑，仅 `highlightEngine` / `useAcAutomaton` / `RESUME_PDF_AC` 影响收集器；`merge` 行为不适用。

## 环境变量 `RESUME_PDF_AC`（仅在未指定上述请求字段时）

```cmd
set RESUME_PDF_AC=1
resume_pdf_service.exe
```

PowerShell：`$env:RESUME_PDF_AC = "1"`

接受值（大小写不敏感）：`1`、`true`、`yes`、`on`。

## 自检

```cmd
curl.exe -s http://127.0.0.1:22570/health
```

响应中的 **`highlightEngine`** 为 `"naive"` 或 `"ac"`，表示**未在请求里指定时**，进程默认使用的收集器（见 `RESUME_PDF_AC`）。

## 自测 JSON

- `docs/curl-test-resume-smart.json`：顶层 `"highlightEngine": "ac"`
- `docs/curl-test-resume-naive.json`：顶层 `"highlightEngine": "naive"`

## 请求体 UTF-8 BOM

若 JSON 文件带 **UTF-8 BOM**，首键可能被污染，导致 `highlightEngine` 等字段被忽略。C++ 在 `json::parse` 前会 **去掉 BOM 与首部空白**。

## 自检响应头（PDF / 简历高亮）

成功时响应头包含：`X-OfferCat-MergeMajor`（`full`|`none`）、`X-OfferCat-KeywordCount`、`X-OfferCat-UseAcOverride`（`0`|`1`|`env`）。可用 `curl.exe -D headers.txt -o out.pdf ...` 查看。朴素模式应见 `MergeMajor: none` 且 `KeywordCount` 明显小于智能。

## 回归对比（收集器）

对同一段 `text` 与同一 `keywords`，仅切换收集器（不设简历词表差异），`POST /api/v1/text/highlight` 返回的 `spans` / `html` 应一致。
