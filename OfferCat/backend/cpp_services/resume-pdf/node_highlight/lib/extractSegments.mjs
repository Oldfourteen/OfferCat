/**
 * 与 C++ extract_resume_segments 保持一致的 id / 文本拆分（用于高亮与 PDF）。
 */
import { stripHtml } from './stripHtml.mjs';

export function certificatesPlain(resume) {
  if (!resume || typeof resume !== 'object') return '';
  if (Array.isArray(resume.certificates)) {
    const parts = resume.certificates
      .filter((x) => typeof x === 'string')
      .map((x) => String(x).trim())
      .filter(Boolean);
    return parts.join('\u3001');
  }
  if (typeof resume.certificate === 'string' && resume.certificate.trim()) {
    return resume.certificate.trim();
  }
  if (Array.isArray(resume.certificate)) {
    return resume.certificate
      .filter((x) => typeof x === 'string')
      .map((x) => x.trim())
      .filter(Boolean)
      .join('\u3001');
  }
  return '';
}

export function majorDisplayPlain(resume) {
  if (!resume || typeof resume !== 'object') return '';
  if (resume.education && typeof resume.education === 'object' && resume.education.major != null) {
    const m = String(resume.education.major).trim();
    if (m) return m;
  }
  if (resume.majorName != null && String(resume.majorName).trim()) return String(resume.majorName).trim();
  if (resume.major_name != null && String(resume.major_name).trim()) return String(resume.major_name).trim();
  if (typeof resume.major === 'string' && resume.major.trim()) return resume.major.trim();
  return '';
}

export function extractResumeSegments(resume) {
  const segments = [];
  const add = (id, text) => {
    if (text) segments.push({ id, text: String(text) });
  };

  if (!resume || typeof resume !== 'object') return segments;

  const selfEval = resume.self_evaluation ?? resume.selfEvaluation;
  if (typeof selfEval === 'string') {
    add('self_evaluation', stripHtml(selfEval));
  }

  if (Array.isArray(resume.education_entries)) {
    resume.education_entries.forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      add(`education.${i}.text`, stripHtml(item.html || ''));
    });
  } else if (resume.education && typeof resume.education === 'object') {
    const ed = resume.education;
    add('education.school', ed.school);
    add('education.major', ed.major);
    add('education.date', ed.date);
  } else if (typeof resume.education === 'string') {
    add('education.0.text', stripHtml(resume.education));
  }

  if (Array.isArray(resume.campus_experience_entries)) {
    resume.campus_experience_entries.forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      add(`campus.${i}.text`, stripHtml(item.html || ''));
    });
  } else if (typeof resume.campus_experience === 'string') {
    add('campus.0.text', stripHtml(resume.campus_experience));
  } else if (Array.isArray(resume.campus)) {
    resume.campus.forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      const p = `campus.${i}.`;
      add(`${p}title`, item.title);
      add(`${p}description`, item.description);
      add(`${p}date`, item.date);
    });
  }

  if (Array.isArray(resume.work_experience_entries)) {
    resume.work_experience_entries.forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      add(`work.${i}.text`, stripHtml(item.html || ''));
    });
  } else if (typeof resume.work_experience === 'string') {
    add('work.0.text', stripHtml(resume.work_experience));
  }

  if (Array.isArray(resume.project_experience_entries)) {
    resume.project_experience_entries.forEach((item, i) => {
      if (!item || typeof item !== 'object') return;
      add(`project.${i}.text`, stripHtml(item.html || ''));
    });
  } else if (Array.isArray(resume.projects)) {
    resume.projects.forEach((p, i) => {
      if (!p || typeof p !== 'object') return;
      const pref = `projects.${i}.`;
      add(`${pref}name`, p.name);
      add(`${pref}date`, p.date);
      add(`${pref}description`, p.description);
      if (Array.isArray(p.highlights)) {
        const hs = p.highlights.map((h) => (typeof h === 'string' ? h : '')).join('\n');
        add(`${pref}highlights_text`, hs);
      }
    });
  } else if (typeof resume.project_experience === 'string') {
    add('project.0.text', stripHtml(resume.project_experience));
  }

  const items = Array.isArray(resume.skills_items)
    ? resume.skills_items
    : Array.isArray(resume.skillsItems)
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
    if (parts.length) add('skills.joined', parts.join('、'));
  } else if (Array.isArray(resume.skills)) {
    const joined = resume.skills.filter((s) => typeof s === 'string').join('\u3001');
    add('skills.joined', joined);
  } else if (typeof resume.skills === 'string') {
    add('skills.joined', stripHtml(resume.skills));
  } else if (typeof resume.skill === 'string') {
    add('skills.joined', stripHtml(resume.skill));
  }

  const certP = certificatesPlain(resume);
  if (certP) add('head.certificates_text', certP);
  const majP = majorDisplayPlain(resume);
  if (majP) add('head.major_text', majP);

  if (resume.title_line != null && resume.title_line !== '') {
    add('title_line', String(resume.title_line));
  }

  return segments;
}
