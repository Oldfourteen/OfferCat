const SENSITIVE_WORDS = [
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
    '敏感词', '屏蔽词', '违禁词', '政治敏感', '不良信息'
]

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
    
    normalized = normalized.replace(/[\u200B\u200C\u200D\uFEFF]/g, '')
    normalized = normalized.replace(/[\s\t\n\r]/g, '')
    normalized = normalized.replace(/[`~!@#$%^&*()+=|{}':;',\\.<>/?~！@#￥%……&*（）——+|{}【】'；：""''。，、？]/g, '')
    
    return normalized
}

function checkContent(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, foundWords: [], category: null }
    }

    const normalizedText = normalizeText(text)
    const foundWords = []

    for (const word of SENSITIVE_WORDS) {
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

function containsAnySensitiveWord(text) {
    if (!text || typeof text !== 'string') {
        return false
    }
    
    const result = checkContent(text)
    return result.hasSensitive
}

function replaceWithPoem(text) {
    const index = Math.floor(Math.random() * ANCIENT_POEMS.length)
    return ANCIENT_POEMS[index]
}

function getRandomPoemPair() {
    const index1 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    let index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    while (index2 === index1) {
        index2 = Math.floor(Math.random() * ANCIENT_POEMS.length)
    }
    return ANCIENT_POEMS[index1] + '\n' + ANCIENT_POEMS[index2]
}

export {
    SENSITIVE_WORDS,
    ANCIENT_POEMS,
    checkContent,
    containsAnySensitiveWord,
    replaceWithPoem,
    getRandomPoemPair,
    normalizeText
}