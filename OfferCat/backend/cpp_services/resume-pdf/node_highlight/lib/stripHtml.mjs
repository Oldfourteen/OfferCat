/**
 * 与 C++ strip_html_resume 对齐：富文本 → 纯文本（用于关键词 UTF-8 分段与 PDF 回退文案）。
 * 换行折叠规则与 resume_segments.cpp 中 collapse_blank_lines + trim_ws 一致，避免 C++/Node 字节偏移不一致导致高亮丢失。
 */
function trimWs(s) {
  let a = 0;
  let b = s.length;
  while (a < b && /\s/.test(s[a])) a += 1;
  while (b > a && /\s/.test(s[b - 1])) b -= 1;
  return s.slice(a, b);
}

function collapseBlankLines(s) {
  let out = '';
  let prevNl = false;
  for (let i = 0; i < s.length; i += 1) {
    const c = s[i];
    if (c === '\n') {
      if (!prevNl) out += '\n';
      prevNl = true;
    } else {
      prevNl = false;
      out += c;
    }
  }
  return trimWs(out);
}

export function stripHtml(html) {
  if (html == null) return '';
  let t = String(html);
  t = t.replace(/<br\s*\/?>/gi, '\n');
  t = t.replace(/<\/p\s*>/gi, '\n');
  t = t.replace(/<[^>]+>/g, '');
  t = t
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
  return collapseBlankLines(t);
}
