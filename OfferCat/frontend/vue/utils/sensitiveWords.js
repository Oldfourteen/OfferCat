import { request } from '@/api/request.js'

// 本地兜底敏感词词库，供后端检测不可用时使用。
const LOCAL_SENSITIVE_WORDS = [
    '福音会', '中国教徒', '统一教', '观音法门', '清海无上师',
    '李洪志', '志洪李', '李宏志', '轮功', '法轮', '轮子功', '法轮功',
    '大法弟子', '大纪元', '明慧网', '明慧周报', '正见网', '新唐人',
    '退党', '真善忍', '九评', '推背图', '诸世纪',
    '电击枪', '电警棒', '枪出售', '枪支', '手枪', '步枪', '猎枪', '子弹',
    '鸦片', '大麻', '冰毒', '摇头丸', 'K粉', '麻古', '可卡因',
    '吗啡', '杜冷丁', '美沙酮', '三唑仑', '新型毒品', '兴奋剂',
    '诈骗', '骗局', '套路', '杀猪盘', '刷单', '返利', '中奖', '红包',
    '广告', '推广', '引流', '微信', 'QQ', '加群', '私聊', '联系方式',
    '赌博', '赌球', '彩票', '六合彩', '时时彩', '百家乐', '棋牌',
    '色情', '裸聊', '约炮', '卖淫', '嫖娼', 'AV', '黄色', '三级片',
    '辱骂', '脏话', '傻逼', '操你妈', '草泥马', '滚蛋', '去死',
    '地域黑', '歧视', '汉奸', '卖国', '台独', '港独', '藏独',
    '饭圈', '应援', '控评', '撕逼', '粉头', '偶像', '明星',
    '中南海', '天安门', '人民大会堂', '钓鱼岛', '台湾', '香港', '澳门',
    '共产党', '国民党', '民进党', '邪教',
    '敏感词', '屏蔽词', '违禁词', '政治敏感', '不良信息',
    '打人', '杀人', '砍人', '打架', '暴力', '斗殴', '行凶', '伤害',
    '法lun', 'falun', 'flg', '法轮大法', '法论功', '法仑功',
    '反动', '颠覆', '分裂', '破坏', '恐怖', '极端',
    '操', '艹', '肏', '日', '屌', '屄', '逼', '屎', '尿', '屁',
    '傻逼', '傻屌', '蠢货', '笨蛋', '垃圾', '废物', '脑残', '智障',
    '去死吧', '滚远点', '操你大爷', '他妈的', '你妈逼', '王八蛋', '狗东西',
    '攻击', '侮辱', '威胁', '恐吓', '挑衅', '骚扰', '侵犯', '欺压',
    'fa lun', 'fa-lun', 'falungong'
]

// 替换文本时使用的古诗句素材。
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

// 统一文本格式，移除空白、全角字符和常见符号，提升本地匹配命中率。
function normalizeText(text) {
    if (!text) return ''
    
    let normalized = text.toLowerCase()
    
    normalized = normalized.replace(/[\uFF21-\uFF3A]/g, function(char) {
        return String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
    })
    normalized = normalized.replace(/[\uFF41-\uFF5A]/g, function(char) {
        return String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
    })
    normalized = normalized.replace(/[\uFF10-\uFF19]/g, function(char) {
        return String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
    })
    normalized = normalized.replace(/[\uFF01-\uFF5E]/g, function(char) {
        return String.fromCharCode(char.charCodeAt(0) - 0xFEE0)
    })
    
    normalized = normalized.replace(/[\u3000]/g, ' ')
    normalized = normalized.replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
    normalized = normalized.replace(/[\s\t\n\r]/g, '')
    
    const punctuation = /[`~!@#$%^&*()+=|{}':;',\\.<>/?~！@#￥%……&*（）——+|{}【】'；：""''。，、？·•·]/g
    normalized = normalized.replace(punctuation, '')
    
    return normalized
}

// 使用本地敏感词词库检测文本内容。
function localCheckContent(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, foundWords: [], category: null }
    }

    const normalizedText = normalizeText(text)
    const foundWords = []

    for (const word of LOCAL_SENSITIVE_WORDS) {
        const normalizedWord = normalizeText(word)
        
        if (normalizedWord && normalizedText.includes(normalizedWord)) {
            foundWords.push(word)
        }
        
        if (text.includes(word)) {
            if (!foundWords.includes(word)) {
                foundWords.push(word)
            }
        }
    }

    return {
        hasSensitive: foundWords.length > 0,
        foundWords,
        category: foundWords.length > 0 ? 'sensitive' : null
    }
}

// 优先请求后端敏感词检测接口，失败时回退到本地检测。
async function checkContent(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, foundWords: [], category: null, replacement: '' }
    }

    try {
        const response = await request({
            url: '/api/sensitive/check',
            method: 'POST',
            data: { text },
            timeout: 3000
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
        console.warn('后端敏感词检测失败，使用本地词库:', error.message)
    }

    const localResult = localCheckContent(text)
    return {
        ...localResult,
        replacement: localResult.hasSensitive ? getRandomPoemPair() : ''
    }
}

// 判断文本是否命中任意敏感词。
async function containsAnySensitiveWord(text) {
    if (!text || typeof text !== 'string') {
        return false
    }
    
    const result = await checkContent(text)
    return result.hasSensitive
}

// 过滤文本中的敏感内容，优先走后端过滤策略。
async function filterText(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, filteredText: text }
    }

    try {
        const response = await request({
            url: '/api/sensitive/filter',
            method: 'POST',
            data: { text },
            timeout: 3000
        })

        if (response && response.code === 200 && response.data) {
            const data = response.data
            return {
                hasSensitive: data.hasSensitive || false,
                filteredText: data.filteredText || text
            }
        }
    } catch (error) {
        console.warn('后端文本过滤失败，使用本地词库:', error.message)
    }

    const localResult = localCheckContent(text)
    return {
        hasSensitive: localResult.hasSensitive,
        filteredText: localResult.hasSensitive ? getRandomPoemPair() : text
    }
}

// 随机返回一句古诗，用于替换敏感内容。
function replaceWithPoem(text) {
    const index = Math.floor(Math.random() * ANCIENT_POEMS.length)
    return ANCIENT_POEMS[index]
}

// 随机返回两句不同古诗，作为替换文案兜底。
function getRandomPoemPair() {
    const index1 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    let index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    }
    return ANCIENT_POEMS[index1] + '\n' + ANCIENT_POEMS[index2]
}

export {
    ANCIENT_POEMS,
    LOCAL_SENSITIVE_WORDS,
    checkContent,
    containsAnySensitiveWord,
    filterText,
    replaceWithPoem,
    getRandomPoemPair,
    normalizeText
}
