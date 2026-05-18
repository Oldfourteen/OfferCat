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

/**
 * 请求后端敏感词检测接口。
 * @param {string} text - 待检测的文本
 * @returns {Promise<Object>} 检测结果对象
 */
async function checkContent(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, foundWords: [], category: null, replacement: '' }
    }

    try {
        const response = await request({
            url: '/api/sensitive/check',
            method: 'POST',
            data: { text },
            timeout: 5000
        })

        if (response && response.code === 200 && response.data) {
            const data = response.data
            return {
                hasSensitive: data.hasSensitive || false,
                foundWords: data.foundWords || [],
                category: data.hasSensitive ? 'sensitive' : null,
                replacement: data.replacement || getRandomPoemPair()
            }
        }
    } catch (error) {
        console.warn('后端敏感词检测失败:', error.message)
    }

    return {
        hasSensitive: false,
        foundWords: [],
        category: null,
        replacement: ''
    }
}

/**
 * 判断文本是否命中任意敏感词。
 * @param {string} text - 待检测的文本
 * @returns {Promise<boolean>} 是否包含敏感词
 */
async function containsAnySensitiveWord(text) {
    if (!text || typeof text !== 'string') {
        return false
    }
    
    const result = await checkContent(text)
    return result.hasSensitive
}

/**
 * 过滤文本中的敏感内容，使用后端过滤策略。
 * @param {string} text - 待过滤的文本
 * @returns {Promise<Object>} 过滤结果对象
 */
async function filterText(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, filteredText: text }
    }

    try {
        const response = await request({
            url: '/api/sensitive/filter',
            method: 'POST',
            data: { text },
            timeout: 5000
        })

        if (response && response.code === 200 && response.data) {
            const data = response.data
            return {
                hasSensitive: data.hasSensitive || false,
                filteredText: data.filteredText || text
            }
        }
    } catch (error) {
        console.warn('后端文本过滤失败:', error.message)
    }

    return {
        hasSensitive: false,
        filteredText: text
    }
}

/**
 * 随机返回两句不同古诗，作为替换文案兜底。
 * @returns {string} 两句古诗，用换行分隔
 */
function getRandomPoemPair() {
    const index1 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    let index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    }
    return ANCIENT_POEMS[index1] + '\n' + ANCIENT_POEMS[index2]
}

/**
 * 获取单句随机古诗
 * @returns {string} 单句古诗
 */
function getRandomPoem() {
    const index = Math.floor(Math.random() * ANCIENT_POEMS.length)
    return ANCIENT_POEMS[index]
}

export {
    ANCIENT_POEMS,
    checkContent,
    containsAnySensitiveWord,
    filterText,
    getRandomPoemPair,
    getRandomPoem
}
