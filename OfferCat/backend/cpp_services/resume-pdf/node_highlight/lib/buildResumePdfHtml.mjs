import { escapeHtml } from './utf8Highlight.mjs';
import { stripHtml } from './stripHtml.mjs';
import { certificatesPlain, majorDisplayPlain } from './extractSegments.mjs';

function pick(htmlById, id, plain) {
  if (htmlById && Object.prototype.hasOwnProperty.call(htmlById, id)) {
    return htmlById[id];
  }
  return escapeHtml(plain ?? '');
}

function displayName(resume) {
  const s = resume?.real_name ?? resume?.name ?? resume?.resume_name ?? '';
  return String(s).trim();
}

function genderDisplay(resume) {
  const g = resume?.gender;
  if (g === 1 || g === '1' || g === '男') return '男';
  if (g === 2 || g === '2' || g === '女') return '女';
  return '性别未选';
}

function phoneDisplay(resume) {
  const p = resume?.phone;
  if (p != null && String(p).trim()) return String(p).trim();
  return '手机号未填写';
}

function emailDisplay(resume) {
  const e = resume?.email;
  if (e != null && String(e).trim()) return String(e).trim();
  return '邮箱未填写';
}

function eduHeaderFromRaw(rd) {
  if (!rd || typeof rd !== 'object') return null;
  const school = String(rd.school || '').trim();
  const degree = String(rd.degree || '').trim();
  const major = String(rd.major || '').trim();
  const left = [school, degree, major].filter(Boolean).join(' · ');
  const start = String(rd.startDate || '').trim();
  const end = String(rd.endDate || '').trim();
  const right = start && end ? `${start} - ${end}` : [start, end].filter(Boolean).join(' - ');
  if (!left && !right) return null;
  return { left: left || '教育背景', right };
}

function campusHeaderFromRaw(rd) {
  if (!rd || typeof rd !== 'object') return null;
  const name = String(rd.experienceName || '').trim();
  const role = String(rd.role || '').trim();
  const left = [name, role].filter(Boolean).join(' · ');
  const start = String(rd.startDate || '').trim();
  const end = String(rd.endDate || '').trim();
  const right = start && end ? `${start} - ${end}` : [start, end].filter(Boolean).join(' - ');
  if (!left && !right) return null;
  return { left: left || '在校经历', right };
}

function workHeaderFromRaw(rd) {
  if (!rd || typeof rd !== 'object') return null;
  const company = String(rd.company || '').trim();
  const position = String(rd.position || '').trim();
  const left = [company, position].filter(Boolean).join(' · ');
  const start = String(rd.startDate || '').trim();
  const end = String(rd.endDate || '').trim();
  const right = start && end ? `${start} - ${end}` : [start, end].filter(Boolean).join(' - ');
  if (!left && !right) return null;
  return { left: left || '工作经历', right };
}

function projectHeaderFromRaw(rd) {
  if (!rd || typeof rd !== 'object') return null;
  const name = String(rd.projectName || '').trim();
  const role = String(rd.role || '').trim();
  const left = [name, role].filter(Boolean).join(' · ');
  const start = String(rd.startDate || '').trim();
  const end = String(rd.endDate || '').trim();
  const right = start && end ? `${start} - ${end}` : [start, end].filter(Boolean).join(' - ');
  if (!left && !right) return null;
  return { left: left || '项目经历', right };
}

function skillsJoinedPlain(resume) {
  const items = Array.isArray(resume?.skills_items)
    ? resume.skills_items
    : Array.isArray(resume?.skillsItems)
      ? resume.skillsItems
      : null;
  if (items && items.length > 0) {
    const profMap = { 1: '初学', 2: '一般', 3: '掌握', 4: '熟练', 5: '精通' };
    const parts = [];
    for (const it of items) {
      if (!it || typeof it !== 'object') continue;
      const name = String(it.skill_name || it.name || '').trim();
      if (!name) continue;
      const pr = Number(it.proficiency) || 3;
      parts.push(`${name}（${profMap[pr] || '掌握'}）`);
    }
    return parts.join('、');
  }
  if (Array.isArray(resume?.skills)) {
    return resume.skills.filter((s) => typeof s === 'string').join('\u3001');
  }
  if (typeof resume?.skills === 'string' && stripHtml(resume.skills).length > 0) {
    return stripHtml(resume.skills);
  }
  if (typeof resume?.skill === 'string' && stripHtml(resume.skill).length > 0) {
    return stripHtml(resume.skill);
  }
  return '';
}

/**
 * 可打印 A4 简历 HTML（与 C++ 段落 id 对齐，高亮片段已含 <strong class="kw-highlight">）。
 * @param {object} resume 前端 / 数据库 JSON
 * @param {Record<string,string>} htmlById 高亮后的片段 HTML
 * @param {{ avatarSrc?: string }} [opts]
 */
export function buildPrintableResumeHtml(resume, htmlById, opts = {}) {
  const r = resume && typeof resume === 'object' ? resume : {};
  const name = escapeHtml(displayName(r) || '简历');
  const docTitle = escapeHtml(displayName(r) || '简历');
  const metaPipe = `${escapeHtml(genderDisplay(r))} | ${escapeHtml(phoneDisplay(r))} | ${escapeHtml(emailDisplay(r))}`;
  const avatarSrc = typeof opts.avatarSrc === 'string' ? opts.avatarSrc : '';

  const parts = [];

  parts.push(`<div class="head">`);
  if (avatarSrc) {
    parts.push(`<div class="head-avatar"><img class="avatar" src="${avatarSrc}" alt=""/></div>`);
  }
  parts.push(`<div class="head-main">`);
  parts.push(`<h1>${name}</h1>`);
  parts.push(`<div class="meta-pipe">${metaPipe}</div>`);
  const intentPlain = String(r.title_line || '').trim();
  if (intentPlain.length > 0) {
    const intentHtml = pick(htmlById, 'title_line', intentPlain);
    parts.push(`<div class="head-row head-intent flow">${intentHtml}</div>`);
  }
  const certP = certificatesPlain(r);
  if (stripHtml(certP).length > 0) {
    const certHtml = pick(htmlById, 'head.certificates_text', certP);
    parts.push(
      `<div class="head-row"><span class="head-label">证书：</span><span class="head-value flow">${certHtml}</span></div>`,
    );
  }
  const majP = majorDisplayPlain(r);
  if (stripHtml(majP).length > 0) {
    const majHtml = pick(htmlById, 'head.major_text', majP);
    parts.push(
      `<div class="head-row"><span class="head-label">专业：</span><span class="head-value flow">${majHtml}</span></div>`,
    );
  }
  parts.push(`</div></div>`);

  if (stripHtml(r.self_evaluation || r.selfEvaluation || '').length > 0) {
    const raw = r.self_evaluation ?? r.selfEvaluation ?? '';
    const body = pick(htmlById, 'self_evaluation', stripHtml(raw));
    parts.push(`<h2>自我评价</h2><div class="card"><div class="card-b flow">${body}</div></div>`);
  }

  if (Array.isArray(r.education_entries) && r.education_entries.some((e) => e && stripHtml(e.html || '').length > 0)) {
    parts.push(`<h2>教育背景</h2>`);
    r.education_entries.forEach((entry, i) => {
      if (!entry || !stripHtml(entry.html || '').length) return;
      const plain = stripHtml(entry.html || '');
      const body = pick(htmlById, `education.${i}.text`, plain);
      const hdr = eduHeaderFromRaw(entry.rawData);
      if (hdr) {
        parts.push(`<div class="card"><div class="card-h"><span class="t">${escapeHtml(hdr.left)}</span><span class="dt">${escapeHtml(hdr.right)}</span></div><div class="card-b flow">${body}</div></div>`);
      } else {
        parts.push(`<div class="card"><div class="card-b flow">${body}</div></div>`);
      }
    });
  } else if (r.education && typeof r.education === 'object' && (r.education.school || r.education.major || r.education.date)) {
    const ed = r.education;
    const school = pick(htmlById, 'education.school', ed.school);
    const major = pick(htmlById, 'education.major', ed.major);
    const eduDate = pick(htmlById, 'education.date', ed.date);
    parts.push(`<h2>教育背景</h2>`);
    parts.push(`<div class="card"><div class="card-h"><span class="t">${school}</span><span class="dt">${eduDate}</span></div><div class="card-b flow">${major}</div></div>`);
  } else if (typeof r.education === 'string' && stripHtml(r.education).length > 0) {
    const plain = stripHtml(r.education);
    const body = pick(htmlById, 'education.0.text', plain);
    parts.push(`<h2>教育背景</h2><div class="card"><div class="card-b flow">${body}</div></div>`);
  }

  if (Array.isArray(r.campus_experience_entries) && r.campus_experience_entries.some((e) => e && stripHtml(e.html || '').length > 0)) {
    parts.push(`<h2>在校经历</h2>`);
    r.campus_experience_entries.forEach((entry, i) => {
      if (!entry || !stripHtml(entry.html || '').length) return;
      const plain = stripHtml(entry.html || '');
      const body = pick(htmlById, `campus.${i}.text`, plain);
      const hdr = campusHeaderFromRaw(entry.rawData);
      if (hdr) {
        parts.push(`<div class="card"><div class="card-h"><span class="t">${escapeHtml(hdr.left)}</span><span class="dt">${escapeHtml(hdr.right)}</span></div><div class="card-b flow">${body}</div></div>`);
      } else {
        parts.push(`<div class="card"><div class="card-b flow">${body}</div></div>`);
      }
    });
  } else if (typeof r.campus_experience === 'string' && stripHtml(r.campus_experience).length > 0) {
    const plain = stripHtml(r.campus_experience);
    const body = pick(htmlById, 'campus.0.text', plain);
    parts.push(`<h2>在校经历</h2><div class="card"><div class="card-b flow">${body}</div></div>`);
  } else if (Array.isArray(r.campus) && r.campus.length > 0) {
    const any = r.campus.some((item, i) => {
      if (!item || typeof item !== 'object') return false;
      const t = pick(htmlById, `campus.${i}.title`, item.title);
      const d = pick(htmlById, `campus.${i}.description`, item.description);
      const dt = pick(htmlById, `campus.${i}.date`, item.date);
      return stripHtml(t).length || stripHtml(d).length || stripHtml(dt).length;
    });
    if (any) {
      parts.push(`<h2>在校经历</h2>`);
      r.campus.forEach((item, i) => {
        if (!item || typeof item !== 'object') return;
        const t = pick(htmlById, `campus.${i}.title`, item.title);
        const d = pick(htmlById, `campus.${i}.description`, item.description);
        const dt = pick(htmlById, `campus.${i}.date`, item.date);
        if (!stripHtml(t).length && !stripHtml(d).length && !stripHtml(dt).length) return;
        parts.push(`<div class="card"><div class="card-h"><span class="t">${t}</span><span class="dt">${dt}</span></div><div class="card-b flow">${d}</div></div>`);
      });
    }
  }

  if (Array.isArray(r.work_experience_entries) && r.work_experience_entries.some((e) => e && stripHtml(e.html || '').length > 0)) {
    parts.push(`<h2>工作经历</h2>`);
    r.work_experience_entries.forEach((entry, i) => {
      if (!entry || !stripHtml(entry.html || '').length) return;
      const plain = stripHtml(entry.html || '');
      const body = pick(htmlById, `work.${i}.text`, plain);
      const hdr = workHeaderFromRaw(entry.rawData);
      if (hdr) {
        parts.push(`<div class="card"><div class="card-h"><span class="t">${escapeHtml(hdr.left)}</span><span class="dt">${escapeHtml(hdr.right)}</span></div><div class="card-b flow">${body}</div></div>`);
      } else {
        parts.push(`<div class="card"><div class="card-b flow">${body}</div></div>`);
      }
    });
  } else if (typeof r.work_experience === 'string' && stripHtml(r.work_experience).length > 0) {
    const plain = stripHtml(r.work_experience);
    const body = pick(htmlById, 'work.0.text', plain);
    parts.push(`<h2>工作经历</h2><div class="card"><div class="card-b flow">${body}</div></div>`);
  }

  if (Array.isArray(r.project_experience_entries) && r.project_experience_entries.some((e) => e && stripHtml(e.html || '').length > 0)) {
    parts.push(`<h2>项目经历</h2>`);
    r.project_experience_entries.forEach((entry, i) => {
      if (!entry || !stripHtml(entry.html || '').length) return;
      const plain = stripHtml(entry.html || '');
      const body = pick(htmlById, `project.${i}.text`, plain);
      const hdr = projectHeaderFromRaw(entry.rawData);
      if (hdr) {
        parts.push(`<div class="card"><div class="card-h"><span class="t">${escapeHtml(hdr.left)}</span><span class="dt">${escapeHtml(hdr.right)}</span></div><div class="card-b flow">${body}</div></div>`);
      } else {
        parts.push(`<div class="card"><div class="card-b flow">${body}</div></div>`);
      }
    });
  } else if (typeof r.project_experience === 'string' && stripHtml(r.project_experience).length > 0) {
    const plain = stripHtml(r.project_experience);
    const body = pick(htmlById, 'project.0.text', plain);
    parts.push(`<h2>项目经历</h2><div class="card"><div class="card-b flow">${body}</div></div>`);
  } else if (Array.isArray(r.projects) && r.projects.length > 0) {
    const any = r.projects.some((p, i) => {
      if (!p || typeof p !== 'object') return false;
      const plainHl = Array.isArray(p.highlights) ? p.highlights.filter((x) => typeof x === 'string').join('\n') : '';
      const nm = pick(htmlById, `projects.${i}.name`, p.name);
      const desc = pick(htmlById, `projects.${i}.description`, p.description);
      const hl = pick(htmlById, `projects.${i}.highlights_text`, plainHl);
      return stripHtml(nm).length || stripHtml(desc).length || stripHtml(hl).length;
    });
    if (any) {
      parts.push(`<h2>项目经历</h2>`);
      r.projects.forEach((p, i) => {
        if (!p || typeof p !== 'object') return;
        const nm = pick(htmlById, `projects.${i}.name`, p.name);
        const dt = pick(htmlById, `projects.${i}.date`, p.date);
        const desc = pick(htmlById, `projects.${i}.description`, p.description);
        const plainHl = Array.isArray(p.highlights) ? p.highlights.filter((x) => typeof x === 'string').join('\n') : '';
        const hl = pick(htmlById, `projects.${i}.highlights_text`, plainHl);
        if (!stripHtml(nm).length && !stripHtml(desc).length && !stripHtml(hl).length) return;
        const tech = Array.isArray(p.tech_stack)
          ? p.tech_stack
              .map((x) => `<span class="tag">${escapeHtml(x)}</span>`)
              .join('<span class="tag-sep">、</span>')
          : '';
        parts.push(`<div class="card">
          <div class="card-h"><span class="t">${nm}</span><span class="dt">${dt}</span></div>
          <div class="card-b flow">${desc}</div>
          ${tech ? `<div class="tags">${tech}</div>` : ''}
          ${hl ? `<pre class="hl flow">${hl}</pre>` : ''}
        </div>`);
      });
    }
  }

  const skPlain = skillsJoinedPlain(r);
  if (skPlain) {
    const skills = pick(htmlById, 'skills.joined', skPlain);
    parts.push(`<h2>专业技能</h2><div class="card"><div class="card-b flow">${skills}</div></div>`);
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8"/>
  <title>${docTitle}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", serif; color: #1e1e1e; font-size: 11pt; margin: 0; padding: 0; }
    .wrap { max-width: 800px; margin: 0 auto; padding: 10mm 14mm; }
    .head { display: flex; align-items: flex-start; gap: 12pt; margin-bottom: 12pt; }
    .head-avatar { flex: 0 0 auto; }
    .avatar { width: 72pt; height: 96pt; object-fit: cover; border-radius: 4pt; display: block; }
    .head-main { flex: 1; min-width: 0; }
    h1 { font-size: 20pt; color: #1a3a5c; margin: 0 0 4pt 0; }
    .meta-pipe { font-size: 10pt; color: #444; margin-bottom: 4pt; line-height: 1.5; }
    .head-row { display: flex; align-items: flex-start; gap: 6pt; font-size: 10pt; color: #333; margin-top: 3pt; line-height: 1.5; }
    .head-intent { color: #555; }
    .head-label { flex: 0 0 auto; color: #555; font-weight: 600; }
    .head-value { flex: 1; min-width: 0; }
    .sub { color: #555; font-size: 10pt; margin-bottom: 0; }
    h2 { font-size: 12pt; color: #1a3a5c; border-bottom: 1.5px solid #1a3a5c; padding-bottom: 4pt; margin: 14pt 0 8pt 0; }
    .card { border: none; margin-bottom: 10pt; page-break-inside: avoid; }
    .card-h { display: flex; justify-content: space-between; align-items: baseline; padding: 4pt 0 6pt 0; background: transparent; border-bottom: 1px solid #e2e6ee; }
    .card-h .t { font-weight: 700; }
    .card-h .dt { font-size: 9pt; color: #555; }
    .card-b { padding: 6pt 0 0 0; line-height: 1.55; }
    .tags { padding: 6pt 0 0 0; line-height: 1.6; }
    .tag { display: inline; font-weight: 700; color: inherit; font-size: inherit; background: transparent; border: none; padding: 0; margin: 0; }
    .tag-sep { font-weight: 400; color: #555; }
    pre.hl { margin: 6pt 0 0 0; white-space: pre-wrap; font-family: inherit; font-size: inherit; color: inherit; line-height: 1.55; }
    .flow { white-space: pre-wrap; word-break: break-word; }
    .kw-highlight { color: #1a3a5c; font-weight: 700; background: rgba(26, 58, 92, 0.06); }
    @page { size: A4; margin: 12mm; }
  </style>
</head>
<body>
  <div class="wrap">
    ${parts.join('\n')}
  </div>
</body>
</html>`;
}
