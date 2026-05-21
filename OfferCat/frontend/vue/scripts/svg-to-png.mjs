import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '../static')

const tasks = []

function walk(dir) {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name)
		if (e.isDirectory()) {
			if (e.name === 'png' && dir === root) continue
			walk(p)
		} else if (e.name.endsWith('.svg') && !e.name.startsWith('_')) {
			const rel = path.relative(root, p).replace(/\\/g, '/')
			if (!rel.startsWith('png/')) {
				tasks.push({ inPath: p, outRel: `png/${rel.replace(/\.svg$/i, '.png')}` })
			}
		}
	}
}
walk(root)

const msgDir = path.join(root, 'png/msg')
fs.mkdirSync(msgDir, { recursive: true })
const msgLike = path.join(msgDir, '_like.svg')
const msgFriend = path.join(msgDir, '_friend.svg')
fs.writeFileSync(
	msgLike,
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#c9546e" d="M311.6 95C297.5 75.5 274.9 64 250.9 64C209.5 64 176 97.5 176 138.9L176 141.3C176 205.7 258 274.7 298.2 304.6C311.2 314.3 328.7 314.3 341.7 304.6C381.9 274.6 463.9 205.7 463.9 141.3L463.9 138.9C463.9 97.5 430.4 64 389 64C365 64 342.4 75.5 328.3 95L320 106.7L311.6 95zM141.3 405.5L98.7 448L64 448C46.3 448 32 462.3 32 480L32 544C32 561.7 46.3 576 64 576L384.5 576C413.5 576 441.8 566.7 465.2 549.5L591.8 456.2C609.6 443.1 613.4 418.1 600.3 400.3C587.2 382.5 562.2 378.7 544.4 391.8L424.6 480L312 480C298.7 480 288 469.3 288 456C288 442.7 298.7 432 312 432L384 432C401.7 432 416 417.7 416 400C416 382.3 401.7 368 384 368L231.8 368C197.9 368 165.3 381.5 141.3 405.5z"/></svg>'
)
fs.writeFileSync(
	msgFriend,
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#2f8a87" d="M96 192C96 130.1 146.1 80 208 80C269.9 80 320 130.1 320 192C320 253.9 269.9 304 208 304C146.1 304 96 253.9 96 192zM32 528C32 430.8 110.8 352 208 352C305.2 352 384 430.8 384 528L384 534C384 557.2 365.2 576 342 576L74 576C50.8 576 32 557.2 32 534L32 528zM464 128C517 128 560 171 560 224C560 277 517 320 464 320C411 320 368 277 368 224C368 171 411 128 464 128zM464 368C543.5 368 608 432.5 608 512L608 534.4C608 557.4 589.4 576 566.4 576L421.6 576C428.2 563.5 432 549.2 432 534L432 528C432 476.5 414.6 429.1 385.5 391.3C408.1 376.6 435.1 368 464 368z"/></svg>'
)
tasks.push({ inPath: msgLike, outRel: 'png/msg/like.png' })
tasks.push({ inPath: msgFriend, outRel: 'png/msg/friend.png' })

for (const { inPath, outRel } of tasks) {
	const outPath = path.join(root, outRel)
	fs.mkdirSync(path.dirname(outPath), { recursive: true })
	const size = outRel.includes('icons/') || outRel.includes('msg/') ? 96 : 128
	await sharp(inPath)
		.resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png()
		.toFile(outPath)
	console.log(outRel)
}
