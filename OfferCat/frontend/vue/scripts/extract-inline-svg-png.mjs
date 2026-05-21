import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const vueRoot = path.join(__dirname, '..')
const map = new Map()

function walk(dir, out = []) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		if (['node_modules', 'unpackage', 'galaxy-h5', 'scripts'].includes(e.name)) continue
		const p = path.join(dir, e.name)
		if (e.isDirectory()) walk(p, out)
		else if (e.name.endsWith('.vue')) out.push(p)
	}
	return out
}

async function uriToPngPath(uri) {
	if (map.has(uri)) return map.get(uri)
	const b64 = uri.replace('data:image/svg+xml;base64,', '')
	const svg = Buffer.from(b64, 'base64').toString('utf8')
	const hash = crypto.createHash('md5').update(svg).digest('hex').slice(0, 12)
	const rel = `/static/png/inline/${hash}.png`
	const outPath = path.join(vueRoot, 'static/png/inline', `${hash}.png`)
	fs.mkdirSync(path.dirname(outPath), { recursive: true })
	await sharp(Buffer.from(svg))
		.resize(96, 96, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png()
		.toFile(outPath)
	map.set(uri, rel)
	return rel
}

for (const filePath of walk(vueRoot)) {
	let src = fs.readFileSync(filePath, 'utf8')
	if (!src.includes('data:image/svg+xml;base64,')) continue
	const base64Re = /data:image\/svg\+xml;base64,[A-Za-z0-9+/=]+/g
	const uris = [...new Set(src.match(base64Re) || [])]
	if (!uris.length) continue
	let changed = false
	for (const uri of uris) {
		try {
			const png = await uriToPngPath(uri)
			const escaped = uri.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
			const next = src.replace(new RegExp(escaped, 'g'), png)
			if (next !== src) {
				src = next
				changed = true
			}
		} catch (e) {
			console.warn('skip', path.relative(vueRoot, filePath), e.message)
		}
	}
	if (changed) {
		fs.writeFileSync(filePath, src)
		console.log('updated', path.relative(vueRoot, filePath))
	}
}

console.log('unique base64 icons:', map.size)
