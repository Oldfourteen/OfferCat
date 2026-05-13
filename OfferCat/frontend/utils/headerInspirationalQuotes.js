// 首页学习区横幅副文案：多套预设，按用户维度稳定哈希选一句。
export const HEADER_INSPIRATIONAL_QUOTES = [
	'追风赶月莫停留，平芜尽处是春山。愿你带着热爱奔赴远方，岁月也会温柔地为你留一盏灯。',
	'长风破浪会有时，直挂云帆济沧海。',
	'天行健，君子以自强不息。',
	'路漫漫其修远兮，吾将上下而求索。',
	'千里之行，始于足下。',
	'少年应有鸿鹄志，当骑骏马踏平川。',
	'愿你眼中有光、心里有海，把平凡的日子走成诗。',
	'星光不问赶路人，时光不负有心人。',
	'纵有疾风起，人生不言弃。',
	'心之所向，素履以往；生如逆旅，一苇以航。',
	'人生没有白走的路，认真对待自己的每一步都算数。',
	'慢慢来，比较快；愿你温柔坚定地走向想要的远方。',
	'愿你做自己的太阳，不惧长夜，也能把前路照得很亮。',
	'执着于理想，纯粹于当下，日子一天比一天更清澈明亮。',
	'种一棵树最好的时间是十年前，其次是现在。',
	'愿你穿越人海，仍为少年；历经风雨，仍信人间温柔值得。',
	'道阻且长，行则将至；步履不停之处，终会遇见心底的春光。',
	'愿你以渺小启程，以坚定收尾，沿路都有春花与月明。',
	'不是所有的坚持都会有答案，但总有一次远行，值得你全力以赴。',
	'山河远阔，步履不息；愿你与爱同行，也把梦想悄悄种在风里。'
]

function stableIndex(seed, modulus) {
	const s = String(seed ?? '')
	let h = 5381
	for (let i = 0; i < s.length; i++) {
		h = ((h << 5) + h) ^ s.charCodeAt(i)
	}
	return modulus > 0 ? Math.abs(h) % modulus : 0
}

export function getHeaderInspirationalQuote(seed) {
	const list = HEADER_INSPIRATIONAL_QUOTES
	if (!list.length) {
		return ''
	}
	return list[stableIndex(seed, list.length)]
}
