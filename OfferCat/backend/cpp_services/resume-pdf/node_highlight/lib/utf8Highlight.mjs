export function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function applySpansUtf8(buf, spansForSegment, className, escapeInner) {
  let out = buf;
  const open = Buffer.from(`<strong class="${escapeHtml(className)}">`, 'utf8');
  const close = Buffer.from('</strong>', 'utf8');
  for (const sp of spansForSegment) {
    const { start, end } = sp;
    if (start < 0 || end > out.length || start >= end) {
      throw new Error(`Invalid span [${start},${end}) for buffer length ${out.length}`);
    }
    const before = out.subarray(0, start);
    const mid = out.subarray(start, end);
    const after = out.subarray(end);
    const midStr = mid.toString('utf8');
    const inner = escapeInner ? escapeHtml(midStr) : midStr;
    const midBuf = Buffer.from(inner, 'utf8');
    out = Buffer.concat([before, open, midBuf, close, after]);
  }
  return out.toString('utf8');
}

export function handleHighlight(body) {
  if (body.unit !== 'utf8_byte') {
    throw new Error('unit must be "utf8_byte"');
  }
  if (!Array.isArray(body.segments)) {
    throw new Error('segments must be an array');
  }
  if (!Array.isArray(body.spans)) {
    throw new Error('spans must be an array');
  }
  const className = body.options?.className ?? 'kw-highlight';
  const escapeInner = body.options?.escapeInner !== false;

  const byId = new Map();
  for (const seg of body.segments) {
    if (!seg || typeof seg.id !== 'string') throw new Error('segment missing id');
    byId.set(seg.id, Buffer.from(String(seg.text ?? ''), 'utf8'));
  }

  const spansBySeg = new Map();
  for (const sp of body.spans) {
    if (!sp || typeof sp.id !== 'string') throw new Error('span missing id');
    if (!byId.has(sp.id)) throw new Error(`span id not in segments: ${sp.id}`);
    if (!spansBySeg.has(sp.id)) spansBySeg.set(sp.id, []);
    spansBySeg.get(sp.id).push({
      start: Number(sp.start),
      end: Number(sp.end),
      word: sp.word,
    });
  }

  const htmlById = {};
  for (const [id, buf] of byId) {
    const rawSpans = spansBySeg.get(id) ?? [];
    for (const s of rawSpans) {
      if (!Number.isInteger(s.start) || !Number.isInteger(s.end)) {
        throw new Error(`span start/end must be integers for id=${id}`);
      }
    }
    const sortedDesc = [...rawSpans].sort((a, b) => b.start - a.start);
    if (sortedDesc.length === 0) {
      htmlById[id] = escapeInner ? escapeHtml(buf.toString('utf8')) : buf.toString('utf8');
      continue;
    }
    for (let i = 0; i < sortedDesc.length; i++) {
      for (let j = i + 1; j < sortedDesc.length; j++) {
        const a = sortedDesc[i];
        const b = sortedDesc[j];
        const disjoint = a.end <= b.start || a.start >= b.end;
        if (!disjoint) throw new Error(`Overlapping spans for id=${id}`);
      }
    }
    htmlById[id] = applySpansUtf8(buf, sortedDesc, className, escapeInner);
  }

  return { htmlById };
}
