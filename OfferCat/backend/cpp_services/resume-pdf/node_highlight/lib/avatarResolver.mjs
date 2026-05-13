import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * 头像磁盘路径：`{目录}/{userId}.png`（或 .jpg / .jpeg / .webp）
 *
 * 查找目录顺序（未设置 OFFERCAT_PHOTO_DIR 时）：
 * 1. `resume-pdf/local_photo/`（与本仓库对齐，便于自测）
 * 2. Windows 默认 `D:\offercat\photo`，其它平台 `/offercat/photo`
 *
 * 设置环境变量 `OFFERCAT_PHOTO_DIR` 时只使用该目录（不再回落到 local_photo / 默认盘符路径）。
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/** `node_highlight/lib` → `resume-pdf/local_photo` */
const packageLocalPhotoDir = path.join(__dirname, '..', '..', 'local_photo');

const defaultPhotoDir =
  process.platform === 'win32' ? 'D:\\offercat\\photo' : path.join('/', 'offercat', 'photo');

const IMAGE_EXTENSIONS = [
  { ext: '.png', mime: 'image/png' },
  { ext: '.jpg', mime: 'image/jpeg' },
  { ext: '.jpeg', mime: 'image/jpeg' },
  { ext: '.webp', mime: 'image/webp' },
];

function candidateDirs() {
  const env = process.env.OFFERCAT_PHOTO_DIR;
  const trimmed = typeof env === 'string' ? env.trim() : '';
  if (trimmed) {
    return [trimmed];
  }
  return [packageLocalPhotoDir, defaultPhotoDir];
}

/**
 * @param {unknown} userId
 * @returns {string} data URI 或空串（无文件 / 无 userId）
 */
export function tryLoadAvatarDataUri(userId) {
  if (userId === null || userId === undefined || userId === '') {
    return '';
  }
  const id = String(userId).trim();
  if (!id) {
    return '';
  }

  for (const dir of candidateDirs()) {
    for (const { ext, mime } of IMAGE_EXTENSIONS) {
      const file = path.join(dir, `${id}${ext}`);
      try {
        if (fs.existsSync(file)) {
          const buf = fs.readFileSync(file);
          return `data:${mime};base64,${buf.toString('base64')}`;
        }
      } catch {
        // try next path
      }
    }
  }
  return '';
}
