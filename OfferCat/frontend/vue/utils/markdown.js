// 转义 HTML 特殊字符，避免渲染后的内容被当作标签执行。
function escapeHtml(text = '') {
	return String(text)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
}

// 解析行内 markdown 语法，输出基础 HTML 片段。
function parseInline(text = '') {
	let html = escapeHtml(text)
	html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
	html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
	html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>')
	html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
	html = html.replace(/_([^_]+)_/g, '<em>$1</em>')
	html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2">$1</a>')
	return html
}

// 将暂存的多行文本包装成一个段落块。
function wrapParagraph(buffer) {
	if (!buffer.length) {
		return ''
	}
	const text = buffer.map(line => parseInline(line)).join('<br>')
	buffer.length = 0
	return `<p>${text}</p>`
}

// 将简化版 markdown 文本渲染为 HTML 字符串。
export function renderMarkdown(markdown = '') {
	const lines = String(markdown || '').replace(/\r\n/g, '\n').split('\n')
	const blocks = []
	const paragraphBuffer = []
	let inCodeBlock = false
	let codeBuffer = []
	let listType = ''
	let listItems = []

	// 输出当前累积的有序/无序列表块。
	function flushList() {
		if (!listItems.length) {
			return
		}
		const tag = listType === 'ol' ? 'ol' : 'ul'
		blocks.push(`<${tag}>${listItems.join('')}</${tag}>`)
		listItems = []
		listType = ''
	}

	// 输出当前累积的普通段落块。
	function flushParagraph() {
		const html = wrapParagraph(paragraphBuffer)
		if (html) {
			blocks.push(html)
		}
	}

	// 按行识别代码块、标题、引用、列表和普通段落。
	for (const line of lines) {
		if (line.trim().startsWith('```')) {
			flushParagraph()
			flushList()
			if (inCodeBlock) {
				blocks.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`)
				codeBuffer = []
				inCodeBlock = false
			} else {
				inCodeBlock = true
			}
			continue
		}

		if (inCodeBlock) {
			codeBuffer.push(line)
			continue
		}

		if (!line.trim()) {
			flushParagraph()
			flushList()
			continue
		}

		const headingMatch = line.match(/^(#{1,6})\s+(.*)$/)
		if (headingMatch) {
			flushParagraph()
			flushList()
			const level = headingMatch[1].length
			blocks.push(`<h${level}>${parseInline(headingMatch[2])}</h${level}>`)
			continue
		}

		const quoteMatch = line.match(/^>\s?(.*)$/)
		if (quoteMatch) {
			flushParagraph()
			flushList()
			blocks.push(`<blockquote>${parseInline(quoteMatch[1])}</blockquote>`)
			continue
		}

		const orderedMatch = line.match(/^\d+\.\s+(.*)$/)
		if (orderedMatch) {
			flushParagraph()
			if (listType && listType !== 'ol') {
				flushList()
			}
			listType = 'ol'
			listItems.push(`<li>${parseInline(orderedMatch[1])}</li>`)
			continue
		}

		const unorderedMatch = line.match(/^[-*]\s+(.*)$/)
		if (unorderedMatch) {
			flushParagraph()
			if (listType && listType !== 'ul') {
				flushList()
			}
			listType = 'ul'
			listItems.push(`<li>${parseInline(unorderedMatch[1])}</li>`)
			continue
		}

		if (listType) {
			flushList()
		}

		paragraphBuffer.push(line)
	}

	flushParagraph()
	flushList()

	if (inCodeBlock && codeBuffer.length) {
		blocks.push(`<pre><code>${escapeHtml(codeBuffer.join('\n'))}</code></pre>`)
	}

	return blocks.join('')
}

// 按纯文本模式逐行包装为段落，供不需要 markdown 解析的场景使用。
export function renderPlainText(text = '') {
	return String(text || '').split('\n').map(line => `<p>${escapeHtml(line)}</p>`).join('')
}
