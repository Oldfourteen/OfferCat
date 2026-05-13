# resume-pdf：C++ 主控 + Node 高亮

## 目录

| 路径 | 说明 |
|------|------|
| `docs/resume-payload.example.json` | 与 `template.html` 对齐的前端简历 JSON 示例 |
| `docs/API.md` | REST 契约（前端→C++、C++→Node） |
| `docs/pdf-single-page-limits.md` | 单页 A4 时各模块**建议字数**（软上限） |
| `docs/highlight-ac.md` | `RESUME_PDF_AC` 启用 Aho–Corasick 高亮收集 |
| `node_highlight/` | Node：高亮 API + `Puppeteer` 生成 PDF |
| `src/` | C++ 关键词匹配 + HTTP 服务 |
| `template.html` | Inja 简历模板（后续 PDF 流程使用） |

## 启动

### 1. Node（端口默认 30081）

```bash
cd node_highlight
npm install
npm start
```

依赖包含 **Puppeteer**（首次 `npm install` 会下载 Chromium，体积较大）。

提供接口：

- `POST /api/v1/highlight` — 仅高亮  
- `POST /generate-pdf` — `resume` + `spansById` → PDF（由 C++ 在 `/api/v1/resume/pdf` 中自动调用）

### 2. C++（端口默认 22570）

依赖：与本仓库 `radar-evaluation` 相同，将 `httplib.h` 与 `nlohmann/` 放在本目录（已随仓库提供）。

```bash
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
```

Windows（MSVC）：在「x64 Native Tools」环境中执行同上，生成 `build/Release/resume_pdf_service.exe` 或 `build/resume_pdf_service.exe`。

运行：

```bash
# 可选：Node 地址、C++ 监听端口；RESUME_PDF_AC=1 时用 AC 自动机收集命中（默认朴素 find）
set NODE_HIGHLIGHT_URL=http://127.0.0.1:30081
set RESUME_PDF_PORT=22570
set RESUME_PDF_AC=1
set RESUME_PDF_KEYWORDS_DIR=D:\bin\OfferCat-master\OfferCat\backend\cpp_services\resume-pdf\keywords
./build/resume_pdf_service
```

## 快速自测

```bash
curl -s http://127.0.0.1:22570/health

curl -s -X POST http://127.0.0.1:22570/api/v1/text/highlight ^
  -H "Content-Type: application/json" ^
  -d "{\"text\":\"学习主动性强，乐于协作。\",\"keywords\":[\"协作\"]}"
```

在 **`resume-pdf` 根目录** 生成 PDF（需 Node 已 `npm install` 且正在 `npm start`）：

头像：未设置 `OFFERCAT_PHOTO_DIR` 时，Node 会依次查找 `local_photo/{userId}.png`（或 `.jpg` / `.jpeg` / `.webp`）、再 `D:\offercat\photo`（Windows）。自测请将头像放到 `local_photo/`，文件名与请求中的 `userId` 一致（见 `local_photo/README.txt`）。

```bash
curl -s -X POST http://127.0.0.1:22570/api/v1/resume/pdf -H "Content-Type: application/json; charset=utf-8" --data-binary @docs/curl-test-resume.json -o out-resume.pdf
```

智能（合并专业词表 + AC）：`@docs/curl-test-resume-smart.json`；朴素（仅请求 keywords + 朴素）：`@docs/curl-test-resume-naive.json`。

## 后续

- 可用 Inja 版 `template.html` 替换 `node_highlight/lib/buildResumePdfHtml.mjs` 中的简化 HTML，排版与线上一致。
