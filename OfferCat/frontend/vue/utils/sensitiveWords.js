import { request } from '@/api/request.js'

/**
 * 替换文本时使用的古诗句素材（仅作兜底使用）。
 */
const ANCIENT_POEMS = [
    '春风得意马蹄疾，一日看尽长安花。',
    '白日依山尽，黄河入海流。',
    '床前明月光，疑是地上霜。',
    '举头望明月，低头思故乡。',
    '野火烧不尽，春风吹又生。',
    '锄禾日当午，汗滴禾下土。',
    '谁知盘中餐，粒粒皆辛苦。',
    '离离原上草，一岁一枯荣。',
    '飞流直下三千尺，疑是银河落九天。',
    '两个黄鹂鸣翠柳，一行白鹭上青天。',
    '窗含西岭千秋雪，门泊东吴万里船。',
    '千山鸟飞绝，万径人踪灭。',
    '孤舟蓑笠翁，独钓寒江雪。',
    '春眠不觉晓，处处闻啼鸟。',
    '夜来风雨声，花落知多少。',
    '红豆生南国，春来发几枝。',
    '愿君多采撷，此物最相思。',
    '海内存知己，天涯若比邻。',
    '山重水复疑无路，柳暗花明又一村。',
    '沉舟侧畔千帆过，病树前头万木春。'
]

/** 本地兜底敏感词（与后端 default-words.txt 核心词一致） */
const LOCAL_SENSITIVE_WORDS = [
    '习近平', '法轮功', '法轮', '轮子功', '法x功', 'flg',
    '温家宝', '胡主席', '江泽民', '李洪志', '天安门', '六四',
    '8964', '台独', '藏独', '疆独', '港独', '法轮大法', '真善忍',
    '反共', '民运', '上访', '维权', '民主', '自由', '人权'
]

function normalizeForMatch(text) {
    if (!text) return ''
    return String(text).toLowerCase().replace(/\s+/g, '')
}

function localContainsSensitive(text) {
    const normalized = normalizeForMatch(text)
    if (!normalized) return false
    return LOCAL_SENSITIVE_WORDS.some((word) => normalized.includes(normalizeForMatch(word)))
}

function getRandomPoemPair() {
    const index1 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    let index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    }
    return ANCIENT_POEMS[index1] + '\n' + ANCIENT_POEMS[index2]
}

function parseFilterResponse(response, originalText) {
    if (!response || response.code !== 200 || !response.data) {
        return null
    }
    const data = response.data
    const hasSensitive = data.hasSensitive === true
    return {
        hasSensitive,
        foundWords: data.foundWords || [],
        filteredText: hasSensitive
            ? (data.filteredText || data.replacement || getRandomPoemPair())
            : (data.filteredText != null ? data.filteredText : originalText),
        replacement: data.filteredText || data.replacement || getRandomPoemPair()
    }
}

/**
 * 优先走论坛服务过滤接口（与发帖同路由，线上最可靠）
 */
async function filterTextViaForumApi(text) {
    const response = await request({
        url: '/api/forum/post/filter-content',
        method: 'POST',
        data: { text },
        timeout: 8000
    })
    return parseFilterResponse(response, text)
}

async function filterTextViaSensitiveApi(text) {
    const response = await request({
        url: '/api/sensitive/filter',
        method: 'POST',
        data: { text },
        timeout: 8000
    })
    return parseFilterResponse(response, text)
}

async function checkContentViaForumApi(text) {
    const response = await request({
        url: '/api/forum/post/filter-content',
        method: 'POST',
        data: { text },
        timeout: 8000
    })
    const parsed = parseFilterResponse(response, text)
    if (!parsed) return null
    return {
        hasSensitive: parsed.hasSensitive,
        foundWords: parsed.foundWords,
        category: parsed.hasSensitive ? 'sensitive' : null,
        replacement: parsed.replacement
    }
}

/**
 * 请求后端敏感词检测（论坛接口优先）
 */
async function checkContent(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, foundWords: [], category: null, replacement: '' }
    }

    try {
        const forumResult = await filterTextViaForumApi(text)
        if (forumResult) {
            return {
                hasSensitive: forumResult.hasSensitive,
                foundWords: forumResult.foundWords,
                category: forumResult.hasSensitive ? 'sensitive' : null,
                replacement: forumResult.replacement
            }
        }
    } catch (error) {
        console.warn('论坛敏感词检测失败:', error.message)
    }

    try {
        const response = await request({
            url: '/api/sensitive/check',
            method: 'POST',
            data: { text },
            timeout: 8000
        })
        if (response && response.code === 200 && response.data) {
            const data = response.data
            if (data.hasSensitive) {
                return {
                    hasSensitive: true,
                    foundWords: data.foundWords || [],
                    category: 'sensitive',
                    replacement: data.replacement || getRandomPoemPair()
                }
            }
        }
    } catch (error) {
        console.warn('敏感词检测接口失败:', error.message)
    }

    if (localContainsSensitive(text)) {
        return {
            hasSensitive: true,
            foundWords: [],
            category: 'sensitive',
            replacement: getRandomPoemPair()
        }
    }

    return { hasSensitive: false, foundWords: [], category: null, replacement: '' }
}

async function containsAnySensitiveWord(text) {
    const result = await checkContent(text)
    return result.hasSensitive
}

/**
 * 过滤文本：论坛接口 → 敏感词服务 → 本地兜底
 */
async function filterText(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, filteredText: text }
    }

    try {
        const forumResult = await filterTextViaForumApi(text)
        if (forumResult) {
            return {
                hasSensitive: forumResult.hasSensitive,
                filteredText: forumResult.filteredText
            }
        }
    } catch (error) {
        console.warn('论坛敏感词过滤失败:', error.message)
    }

    try {
        const sensitiveResult = await filterTextViaSensitiveApi(text)
        if (sensitiveResult) {
            return {
                hasSensitive: sensitiveResult.hasSensitive,
                filteredText: sensitiveResult.filteredText
            }
        }
    } catch (error) {
        console.warn('敏感词过滤接口失败:', error.message)
    }

    if (localContainsSensitive(text)) {
        return { hasSensitive: true, filteredText: getRandomPoemPair() }
    }

    return { hasSensitive: false, filteredText: text }
}

function getRandomPoem() {
    return ANCIENT_POEMS[Math.floor(Math.random() * ANCIENT_POEMS.length)]
}

export {
    ANCIENT_POEMS,
    checkContent,
    containsAnySensitiveWord,
    filterText,
    getRandomPoemPair,
    getRandomPoem
}
