# 简历 PDF / 高亮服务 API 说明

索引单位约定：**`utf8_byte`**（UTF-8 字节偏移，`start` 含、`end` 不含），与 C++ `std::string::find` 及 Node `Buffer` 切片一致。

---

## 1. 前端 → C++：简历 JSON（模板数据）

- 与在线简历前端对齐：自我评价、教育背景、在校经历、工作经历、项目经历、专业技能；**空字段或不传整块**则 PDF 中不渲染对应章节（**不再使用「个人特质」模块**）。
- 兼容旧字段：如仅有 `education` / `campus` / `projects` 对象或数组亦可。
- 高亮流程中，C++ 会从该对象中抽取若干**纯文本字段**生成 `segments`，再结合 `keywords` 调 Node；无需前端自己拆 `segments`。

---

## 2. Node 服务：仅负责插入高亮标签

**默认端口**：`30081`（可用环境变量 `PORT` 覆盖）

### `GET /health`

返回 `{"status":"ok"}`（Node 自身不区分高亮实现）。

### `POST /api/v1/highlight`

**Content-Type**: `application/json; charset=utf-8`

**请求体**

| 字段 | 类型 | 说明 |
|------|------|------|
| `unit` | string | 固定为 `"utf8_byte"` |
| `segments` | array | `{ "id": string, "text": string }`，原文 |
| `spans` | array | `{ "id": string, "start": number, "end": number, "word": string }`，必须在对应 `id` 的 `text` 边界内且不交叉 |
| `options` | object | 可选：`className`（默认 `kw-highlight`）、`escapeInner`（默认 `true`，对 `<strong>` 内原文做 HTML 转义） |

**响应体**

```json
{
  "htmlById": {
    "self_evaluation": "……<strong class=\"kw-highlight\">协作</strong>……"
  }
}
```

**错误**：`400` + `{"error":"..."}`

---

## 2.1 Node：`POST /generate-pdf`（高亮 + Puppeteer 出 PDF）

**Content-Type**：`application/json; charset=utf-8`

**请求体**

| 字段 | 类型 | 说明 |
|------|------|------|
| `resume` | object | 与前端一致的简历 JSON |
| `spansById` | object | 各段落 id → `{ start, end, word }[]`（**UTF-8 字节**），与 C++ 输出一致 |
| `userId` | number / string | 可选；有则尝试加载头像 `{OFFERCAT_PHOTO_DIR}/{userId}.png`（或 `.jpg`/`.jpeg`/`.webp`）嵌入 PDF。未设置 `OFFERCAT_PHOTO_DIR` 时还会查找 **`resume-pdf/local_photo/`**（便于仓库内自测），再回落到默认 `D:\offercat\photo`（Windows）或 `/offercat/photo`。 |

**成功响应（默认）**

- `200`，`Content-Type: application/pdf`，body 为 **PDF 二进制**。

**可选**：`POST /generate-pdf?format=json` 或 body 内 `"responseFormat":"json"` 时返回 JSON：

```json
{ "format": "base64", "pdfBase64": "..." }
```

---

## 3. C++ 服务：主控 + 关键词匹配 + 调 Node

**默认端口**：`22570`

**环境变量**

| 变量 | 说明 |
|------|------|
| `NODE_HIGHLIGHT_URL` | Node 根地址，默认 `http://127.0.0.1:30081` |
| `RESUME_PDF_AC` | 设为 `1`/`true`/`yes`/`on` 时，关键词命中收集使用 **Aho–Corasick**（UTF-8 字节）；默认 **朴素 find**。合并规则相同，详见 `docs/highlight-ac.md`。 |
| `RESUME_PDF_KEYWORDS_DIR` | 可选，**绝对路径** 指向含 `major_file_map.json` 与各专业 `.txt` 的目录；不设则从 exe 路径向上找 `keywords/`，再用当前工作目录下的 `keywords/`。 |

### `GET /health`

返回 `{"status":"ok","node":"ok|unreachable","highlightEngine":"naive|ac","keywordsDir":"..."}`：对 Node 做一次快速探测；`highlightEngine` 见 `RESUME_PDF_AC`；`keywordsDir` 为当前解析到的专业词表目录（绝对路径化后）。

### `POST /api/v1/text/highlight`（联调 / 最小用例）

对单段文本做关键词匹配并调 Node。

**请求体**

```json
{
  "text": "学习主动性强，乐于协作。",
  "keywords": ["协作", "学习"]
}
```

**响应体**

```json
{
  "unit": "utf8_byte",
  "spans": [ { "id": "body", "start": 18, "end": 24, "word": "协作" } ],
  "html": "……<strong class=\"kw-highlight\">协作</strong>……"
}
```

### `POST /api/v1/resume/highlight`（与简历 JSON 对齐）

**请求体**

```json
{
  "resume": { },
  "keywords": [ "协作", "深度学习", "REST" ]
}
```

其中 `resume` 结构与 `resume-payload.example.json` 相同。

**可选（推荐前端「智能 / 朴素」按钮传入）**

| 字段 | 说明 |
|------|------|
| `highlightEngine` | `"ac"`：合并专业 `keywords/*.txt` 词表 + 请求 `keywords`，命中收集用 **AC**；`"naive"`：**仅**请求体 `keywords`（不加载专业 txt），收集用 **朴素 find**。 |
| `useAcAutomaton` | `true`/`false`（或整数 0/1）：语义与上表「ac / naive」一致（词表合并与收集器联动）。若与 `highlightEngine` 同时存在，以 **`highlightEngine` 字符串为准**。 |
| （不传上述字段） | 词表：**始终**按 `major` / `majorName` / `major_name` 合并专业 txt（与旧版一致）；收集器：由环境变量 **`RESUME_PDF_AC`** 决定。 |

详见 `docs/highlight-ac.md`。自测示例：`docs/curl-test-resume-smart.json`、`docs/curl-test-resume-naive.json`。

**响应体**

```json
{
  "unit": "utf8_byte",
  "spansById": {
    "title_line": [ { "start": 0, "end": 6, "word": "求职" } ]
  },
  "htmlById": {
    "title_line": "……",
    "self_evaluation": "……"
  }
}
```

无命中字段时 `spansById` / `htmlById` 中可能省略该 id；`htmlById` 中未出现的 id 表示原文无高亮变化（与原文相同，由 Node 对无 spans 段原样返回）。

### `POST /api/v1/resume/pdf`（简历 JSON → PDF 字节流）

**Content-Type**：`application/json; charset=utf-8`

**请求体**：`{ "resume": {...}, "keywords": [...], "userId"?: number|string, "highlightEngine"?: "naive"|"ac", "useAcAutomaton"?: boolean }`。  

词表合并规则与 **`/api/v1/resume/highlight`** 相同（见上表：`highlightEngine: "naive"` 或 `useAcAutomaton: false` 时**不**加载专业 txt，仅请求 `keywords`）。

`userId` 可选；有则 Node 会按 `avatarResolver` 规则读取磁盘头像（多扩展名；未设 `OFFERCAT_PHOTO_DIR` 时含 `resume-pdf/local_photo/`）。

**流程**：C++ 对 `resume` 拆段并跑关键词算法得到 `spansById` → 调用 Node **`POST /generate-pdf`** → 将 PDF 原样返回。

**成功响应**：`200`，`Content-Type: application/pdf`，`Content-Disposition: attachment; filename="resume.pdf"`。响应头含自检字段（`curl -D - -o out.pdf ...` 可见）：`X-OfferCat-MergeMajor`（`full`|`none`）、`X-OfferCat-KeywordCount`（合并后关键词条数）、`X-OfferCat-UseAcOverride`（`0`|`1`|`env`）。朴素模式应出现 `MergeMajor: none` 且 `KeywordCount` 明显小于智能（合并专业 txt 后）。

**失败**：`400` + JSON `{"error":"..."}`（例如 Node 未启动、Puppeteer 失败）。

---

## 4. 启动顺序

1. 启动 Node：`cd node_highlight && npm install && npm start`（会安装 **Puppeteer**，首次下载 Chromium 较慢）
2. 启动 C++：`resume_pdf_service`（见仓库根下 `README.md`）
3. 前端或 curl 调 C++，由 C++ 内部 HTTP 调 Node。

---

## 5. Java / App 协调（备忘）

- **仅高亮预览**：`POST` C++ ` /api/v1/resume/highlight`。
- **下载 PDF**：`POST` C++ ` /api/v1/resume/pdf`，响应体即 PDF；或由网关转发为文件下载。
- Node 需先启动；C++ 通过 `NODE_HIGHLIGHT_URL` 调用同一 Node 上的 `/api/v1/highlight` 与 `/generate-pdf`。

## 6.json示例
```
{
  "highlightEngine": "ac",
  "userId": 1,
  "keywords": ["协作", "深度学习", "REST", "人工智能"],
  "resume": {
    "majorName": "计算机科学与技术",
    "real_name": "张三",
    "gender": 1,
    "phone": "13800000000",
    "email": "zhangsan@example.com",
    "title_line": "求职意向：后端开发实习生",
    "certificate": "CET-6",
    "self_evaluation": "<p>……</p>",
    "education": {
      "school": "某某大学",
      "major": "计算机科学与技术 · 本科",
      "date": "2022.09 - 2026.06"
    },
    "campus": [],
    "work_experience_entries": [],
    "projects": [],
    "skills": ["C++", "Python"]
  }
}
```
- `仅是一个示例，详细字段请阅读程序以及其他文档。`
