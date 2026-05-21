import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vueRoot = path.join(__dirname, '..')

const CHEVRON_BLOCK =
	/const\s+(\w+)\s*=\s*[\r\n\s]*'data:image\/svg\+xml;charset=utf-8,'\s*\+\s*encodeURIComponent\(\s*'<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 24 24" fill="none">' \+\s*'<path d="M14\.5 6\.5 9 12l5\.5 5\.5" stroke="#171A1F" stroke-width="2\.35" stroke-linecap="round" stroke-linejoin="round"\/>' \+\s*'<\/svg>'\s*\)/g

const CHEVRON_IMPORT = "import { PNG_ICONS } from '@/utils/staticIcons.js'\n"

function walk(dir, out = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		if (['node_modules', 'unpackage', 'static', 'galaxy-h5'].includes(e.name)) continue
		const p = path.join(dir, e.name)
		if (e.isDirectory()) walk(p, out)
		else if (e.name.endsWith('.vue') || e.name.endsWith('.js')) out.push(p)
	}
	return out
}

function migrateFile(filePath) {
	let src = fs.readFileSync(filePath, 'utf8')
	let changed = false

	if (src.includes('/static/icons/') && src.includes('.svg')) {
		src = src.replace(/\/static\/icons\//g, '/static/png/icons/').replace(/\.svg/g, '.png')
		changed = true
	}

	if (CHEVRON_BLOCK.test(src)) {
		src = src.replace(CHEVRON_BLOCK, "const $1 = PNG_ICONS.chevronLeft")
		if (!src.includes("from '@/utils/staticIcons.js'")) {
			src = src.replace(/(<script[^>]*>\s*)/, `$1${CHEVRON_IMPORT}`)
		}
		changed = true
	}

	// 单行 data URI 返回箭头（search 等）
	src = src.replace(
		/'data:image\/svg\+xml;charset=utf-8,'\s*\+\s*encodeURIComponent\(\s*'<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"\/><\/svg>'\s*\)/g,
		"PNG_ICONS.chevronLeft"
	)
	if (src.includes('PNG_ICONS.chevronLeft') && !src.includes("from '@/utils/staticIcons.js'")) {
		src = src.replace(/(<script[^>]*>\s*)/, `$1${CHEVRON_IMPORT}`)
		changed = true
	}

	if (changed) {
		fs.writeFileSync(filePath, src)
		console.log('updated', path.relative(vueRoot, filePath))
	}
}

for (const f of walk(vueRoot)) migrateFile(f)
