import { extractResumeSegments } from './extractSegments.mjs';
import { handleHighlight } from './utf8Highlight.mjs';
import { buildPrintableResumeHtml } from './buildResumePdfHtml.mjs';
import { htmlToPdfBuffer } from './renderPdf.mjs';
import { tryLoadAvatarDataUri } from './avatarResolver.mjs';

/**
 * @param {object} resume 与前端 JSON 一致
 * @param {Record<string, Array<{start:number,end:number,word?:string}>>} spansById C++ 给出的 UTF-8 字节区间
 * @param {{ userId?: unknown }} [options] userId 用于加载头像（见 avatarResolver：OFFERCAT_PHOTO_DIR 或 resume-pdf/local_photo）
 */
export async function generatePdfFromResumeAndSpans(resume, spansById, options = {}) {
  const segments = extractResumeSegments(resume);
  const spans = [];
  for (const seg of segments) {
    const arr = spansById?.[seg.id];
    if (Array.isArray(arr)) {
      for (const s of arr) {
        spans.push({
          id: seg.id,
          start: Number(s.start),
          end: Number(s.end),
          word: s.word,
        });
      }
    }
  }
  const { htmlById } = handleHighlight({
    unit: 'utf8_byte',
    segments,
    spans,
    options: { className: 'kw-highlight', escapeInner: true },
  });
  const uid = options.userId ?? options.user_id ?? resume?.userId ?? resume?.user_id;
  const avatarSrc = tryLoadAvatarDataUri(uid);
  const html = buildPrintableResumeHtml(resume, htmlById, { avatarSrc });
  return htmlToPdfBuffer(html);
}
