import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const outDir = path.join(__dirname, '../static/png/inline')
fs.mkdirSync(outDir, { recursive: true })

async function save(name, input, isB64 = false) {
	const buf = isB64 ? Buffer.from(input, 'base64') : Buffer.from(input)
	await sharp(buf)
		.resize(128, 128, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
		.png()
		.toFile(path.join(outDir, `${name}.png`))
	console.log(name)
}

const activityB64 =
	'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0yOSA1MiAyODIgMjIxIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJ4TWlkWU1pZCBtZWV0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNwcmluZ0Fycm93R3JhZCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSItMTciIHkxPSIyNTUiIHgyPSIyMjciIHkyPSI2OCI+PHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZjdhMCIvPjxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjZmZlNDVkIi8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjZmZjOTI4Ii8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI3NwcmluZ0Fycm93R3JhZCkiIHN0cm9rZS13aWR0aD0iMzAiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjE4IiBkPSJNIDIuMDAgMjIyLjAwIEwgNDEuNjkgMTc0LjM3IEwgNjkuNjkgMTk4LjM3IEwgMTE5LjYzIDEzOC40NSIvPjxwb2x5Z29uIGZpbGw9InVybCgjc3ByaW5nQXJyb3dHcmFkKSIgcG9pbnRzPSIxNjUuMTcgODMuNzkgMTUxLjg5IDE2MC42NSA5MS45NyAxMTAuNzIiLz48L3N2Zz4='

await save('activity-spring-arrow', activityB64, true)
await save(
	'search-white',
	"<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#ffffff' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'><circle cx='11' cy='11' r='7'/><path d='M16.65 16.65 21 21'/></svg>"
)
await save(
	'upload-light',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#5d76bd"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>'
)
await save(
	'upload-dark',
	'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#8fa4e8"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg>'
)
