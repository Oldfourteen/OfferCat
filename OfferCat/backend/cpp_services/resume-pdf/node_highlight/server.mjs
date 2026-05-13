/**
 * Node：高亮 API + Puppeteer 生成 PDF（POST /generate-pdf）
 * 默认端口 30081，环境变量 PORT 可覆盖。
 */
import http from 'http';
import { URL } from 'url';
import { handleHighlight } from './lib/utf8Highlight.mjs';
import { generatePdfFromResumeAndSpans } from './lib/generatePdfPipeline.mjs';

const PORT = Number(process.env.PORT) || 30081;

function readBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = '';
    req.on('data', (c) => {
      chunks += c;
    });
    req.on('end', () => resolve(chunks));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
  const path = url.pathname;

  if (req.method === 'GET' && path === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ status: 'ok' }));
    return;
  }

  if (req.method === 'POST' && path === '/api/v1/highlight') {
    try {
      const raw = await readBody(req);
      const body = JSON.parse(raw || '{}');
      const out = handleHighlight(body);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(out));
    } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: e?.message ?? String(e) }));
    }
    return;
  }

  if (req.method === 'POST' && path === '/generate-pdf') {
    try {
      const raw = await readBody(req);
      const body = JSON.parse(raw || '{}');
      if (!body.resume || typeof body.resume !== 'object') {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'missing resume object' }));
        return;
      }
      const spansById = body.spansById && typeof body.spansById === 'object' ? body.spansById : {};
      const format = url.searchParams.get('format') || body.responseFormat;

      const pdfBuf = await generatePdfFromResumeAndSpans(body.resume, spansById, {
        userId: body.userId ?? body.user_id,
      });

      if (format === 'json' || format === 'base64') {
        const b64 = Buffer.from(pdfBuf).toString('base64');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ format: 'base64', pdfBase64: b64 }));
        return;
      }

      res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Length': String(pdfBuf.length),
        'Content-Disposition': 'inline; filename="resume.pdf"',
      });
      res.end(pdfBuf);
    } catch (e) {
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: e?.message ?? String(e) }));
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`resume-pdf node http://0.0.0.0:${PORT}`);
  console.log('  POST /api/v1/highlight');
  console.log('  POST /generate-pdf   (body: { resume, spansById })');
});
