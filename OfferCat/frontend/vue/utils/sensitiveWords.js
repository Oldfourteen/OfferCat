/**
 * 纯前端敏感词检测与古诗替换系统
 * 不依赖后端 API，完全在本地完成敏感词检测和替换
 */

/** 古诗句素材 */
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
    '沉舟侧畔千帆过，病树前头万木春。',
    '人生自古谁无死，留取丹心照汗青。',
    '落红不是无情物，化作春泥更护花。',
    '问渠那得清如许，为有源头活水来。',
    '纸上得来终觉浅，绝知此事要躬行。',
    '不识庐山真面目，只缘身在此山中。',
    '竹外桃花三两枝，春江水暖鸭先知。',
    '接天莲叶无穷碧，映日荷花别样红。',
    '欲穷千里目，更上一层楼。',
    '会当凌绝顶，一览众山小。',
    '大漠孤烟直，长河落日圆。',
    '采菊东篱下，悠然见南山。',
    '举杯邀明月，对影成三人。',
    '但愿人长久，千里共婵娟。',
    '天生我材必有用，千金散尽还复来。',
    '抽刀断水水更流，举杯消愁愁更愁。',
    '长风破浪会有时，直挂云帆济沧海。',
    '无边落木萧萧下，不尽长江滚滚来。',
    '停车坐爱枫林晚，霜叶红于二月花。',
    '忽如一夜春风来，千树万树梨花开。',
    '千里黄云白日曛，北风吹雁雪纷纷。',
    '莫愁前路无知己，天下谁人不识君。',
    '月落乌啼霜满天，江枫渔火对愁眠。',
    '姑苏城外寒山寺，夜半钟声到客船。',
    '商女不知亡国恨，隔江犹唱后庭花。',
    '烟笼寒水月笼沙，夜泊秦淮近酒家。',
    '人生得意须尽欢，莫使金樽空对月。',
    '同是天涯沦落人，相逢何必曾相识。'
]

/** 本地敏感词库 */
const LOCAL_SENSITIVE_WORDS = [
    '习近平', '法轮功', '法轮', '轮子功', '法x功', 'flg',
    '潘石屹', '盘古', '温家宝', '胡主席', '江泽民', '李洪志', '洪志',
    '法lg', '法x', '维权', '上访', '集会', '游行', '示威',
    '民主', '自由', '人权', '天安门', '六四', '8964', '八九', '民运',
    '反共', '台独', '藏独', '疆独', '港独', '法轮大法', '真善忍',
    '退党', '退团', '退队', '三退', '九评', '天灭中共', '大法弟子',
    '法轮佛法', '法轮世界', '法轮法', '法轮圣', '法轮王', '法神圣',
    '法圣王', '李大师', '李父', '李母', '法轮佛', '法轮圣佛',
    '法轮圣王', '法轮大佛', '法轮大士', '法轮真人', '法轮天尊',
    '法轮天仙', '法轮天神', '法轮神圣', '法轮神佛', '法轮神圣佛',
    '法轮神圣王', '法轮神圣大佛', '法轮神圣大士', '法轮神圣真人',
    '法轮神圣天尊', '法轮神圣天仙', '法轮神圣天神', '法轮神圣仙佛',
    '法轮神圣神王', '法轮神圣仙王'
]

/**
 * 文本标准化处理（用于匹配）
 */
function normalizeForMatch(text) {
    if (!text) return ''
    return String(text).toLowerCase().replace(/\s+/g, '')
}

/**
 * 检查文本是否包含敏感词
 * @param {string} text - 待检查文本
 * @returns {boolean}
 */
function localContainsSensitive(text) {
    const normalized = normalizeForMatch(text)
    if (!normalized) return false
    return LOCAL_SENSITIVE_WORDS.some((word) => normalized.includes(normalizeForMatch(word)))
}

/**
 * 获取随机古诗（一句）
 * @returns {string} - 一句古诗
 */
function getRandomPoemPair() {
    return ANCIENT_POEMS[Math.floor(Math.random() * ANCIENT_POEMS.length)]
}

/**
 * 获取确定性古诗（同一原文固定替换为相同古诗，避免列表反复渲染抖动）
 * @param {string} text - 原文
 * @returns {string} - 一句古诗
 */
function getDeterministicPoemPair(text) {
    const source = String(text || '')
    let hash = 0
    for (let i = 0; i < source.length; i++) {
        hash = ((hash << 5) - hash + source.charCodeAt(i)) | 0
    }
    const index = Math.abs(hash) % ANCIENT_POEMS.length
    return ANCIENT_POEMS[index]
}

/**
 * 检查内容是否包含敏感词（纯前端同步检测）
 * @param {string} text - 待检查文本
 * @returns {Object} - { hasSensitive, foundWords, category, replacement }
 */
function checkContent(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, foundWords: [], category: null, replacement: '' }
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

/**
 * 检查内容是否包含敏感词（异步版本，保持接口兼容性）
 * @param {string} text - 待检查文本
 * @returns {Promise<Object>}
 */
async function checkContentAsync(text) {
    return checkContent(text)
}

/**
 * 判断是否包含任何敏感词
 * @param {string} text - 待检查文本
 * @returns {boolean}
 */
function containsAnySensitiveWord(text) {
    return localContainsSensitive(text)
}

/**
 * 判断是否包含任何敏感词（异步版本）
 * @param {string} text - 待检查文本
 * @returns {Promise<boolean>}
 */
async function containsAnySensitiveWordAsync(text) {
    return containsAnySensitiveWord(text)
}

/**
 * 过滤文本（敏感内容替换为古诗）
 * @param {string} text - 待过滤文本
 * @returns {Object} - { hasSensitive, filteredText }
 */
function filterText(text) {
    if (!text || typeof text !== 'string') {
        return { hasSensitive: false, filteredText: text }
    }

    if (localContainsSensitive(text)) {
        return { hasSensitive: true, filteredText: getRandomPoemPair() }
    }

    return { hasSensitive: false, filteredText: text }
}

/**
 * 过滤文本（异步版本，保持接口兼容性）
 * @param {string} text - 待过滤文本
 * @returns {Promise<Object>}
 */
async function filterTextAsync(text) {
    return filterText(text)
}

/**
 * 论坛展示层同步替换：已入库的敏感帖/评论在列表与详情中也显示古诗
 * @param {string} text - 待处理文本
 * @returns {string} - 处理后的文本
 */
function displayForumText(text) {
    if (!text || typeof text !== 'string') {
        return text || ''
    }
    if (localContainsSensitive(text)) {
        return getDeterministicPoemPair(text)
    }
    return text
}

/**
 * 获取单句随机古诗
 * @returns {string}
 */
function getRandomPoem() {
    return ANCIENT_POEMS[Math.floor(Math.random() * ANCIENT_POEMS.length)]
}

/**
 * 获取古诗标题
 * @returns {string}
 */
function getPoemTitle() {
    const titles = [
        '【静夜思】', '【春晓】', '【登鹳雀楼】', '【相思】', '【悯农】',
        '【江雪】', '【咏柳】', '【望庐山瀑布】', '【早发白帝城】', '【黄鹤楼送孟浩然之广陵】',
        '【赠汪伦】', '【绝句】', '【枫桥夜泊】', '【清明】', '【出塞】',
        '【凉州词】', '【游子吟】', '【望岳】', '【春望】', '【茅屋为秋风所破歌】',
        '【石壕吏】', '【新安吏】', '【潼关吏】', '【新婚别】', '【垂老别】',
        '【无家别】', '【蜀道难】', '【将进酒】', '【梦游天姥吟留别】', '【行路难】',
        '【长恨歌】', '【琵琶行】', '【锦瑟】', '【无题】', '【夜雨寄北】',
        '【虞美人】', '【浪淘沙】', '【相见欢】', '【破阵子】', '【声声慢】',
        '【念奴娇】', '【水调歌头】', '【江城子】', '【蝶恋花】', '【浣溪沙】',
        '【鹊桥仙】', '【钗头凤】', '【永遇乐】', '【青玉案】', '【暗香】',
        '【疏影】', '【摸鱼儿】', '【贺新郎】', '【沁园春】', '【满江红】'
    ]
    return titles[Math.floor(Math.random() * titles.length)]
}

/**
 * 获取带装饰的古诗输出
 * @returns {string}
 */
function getDecoratedPoem() {
    const title = getPoemTitle()
    const poem = getRandomPoem()
    
    return `╔════════════════════════════════╗\n` +
           `║          ${title}          ║\n` +
           `╚════════════════════════════════╝\n` +
           `┌────────────────────────────────┐\n` +
           `│  ${poem}  │\n` +
           `└────────────────────────────────┘\n` +
           `          —— 古诗鉴赏 ——`
}

/**
 * 获取一组古诗（四句）
 * @returns {string}
 */
function getFourLinesPoem() {
    const indices = []
    for (let i = 0; i < 4; i++) {
        let index
        do {
            index = Math.floor(Math.random() * ANCIENT_POEMS.length)
        } while (indices.includes(index))
        indices.push(index)
    }
    return ANCIENT_POEMS[indices[0]] + '\n' +
           ANCIENT_POEMS[indices[1]] + '\n' +
           ANCIENT_POEMS[indices[2]] + '\n' +
           ANCIENT_POEMS[indices[3]]
}

/**
 * 获取简单优雅的古诗输出（适合日常替换）
 * @returns {string}
 */
function getSimplePoem() {
    return getRandomPoem()
}

export {
    ANCIENT_POEMS,
    checkContent,
    checkContentAsync,
    containsAnySensitiveWord,
    containsAnySensitiveWordAsync,
    displayForumText,
    filterText,
    filterTextAsync,
    getRandomPoemPair,
    getRandomPoem,
    getPoemTitle,
    getDecoratedPoem,
    getFourLinesPoem,
    getSimplePoem
}
