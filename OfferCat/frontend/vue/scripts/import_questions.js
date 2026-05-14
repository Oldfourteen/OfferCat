const fs = require('fs');
const path = require('path');

// 题库原始文本来源目录。
const bishiPath = path.join(__dirname, '../../backend/java_services/question_bank/bishi');
const mianshiPath = path.join(__dirname, '../../backend/java_services/question_bank/mianshi');

// 分别存放生成后的笔试套题、面试套题和试卷详情映射。
const writtenSets = [];
const interviewSets = [];
const paperMap = {};

// 为每一套导入后的题目生成唯一编号。
let idCounter = 1;

// 随机打乱选项顺序，并同步计算新的正确答案下标。
function shuffleOptions(options, correctLetter) {
    const correctText = options.find(o => o.letter === correctLetter).text;
    const shuffled = [...options].sort(() => Math.random() - 0.5);
    const newOptions = [];
    let newCorrectLetter = '';
    const letters = ['A', 'B', 'C', 'D'];
    shuffled.forEach((opt, index) => {
        newOptions.push({ letter: letters[index], text: opt.text });
        if (opt.text === correctText) {
            newCorrectLetter = letters[index];
        }
    });
    return { options: newOptions, answer: newCorrectLetter };
}

// 解析单个题库文本文件，提取套题信息和题目详情。
function parseFile(filePath, type) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    
    // 记录当前文件在解析过程中的专业、套题类型和题目临时状态。
    let major = '';
    let setType = '';
    let questions = [];
    let currentQuestion = null;
    let options = [];
    
    // 按行识别专业、套题、题干、选项和答案字段。
    for (const line of lines) {
        if (line.startsWith('专业：')) {
            major = line.replace('专业：', '').trim();
        } else if (line.startsWith('套题：')) {
            setType = line.replace('套题：', '').trim();
        } else if (line.match(/^\d+\./)) {
            if (currentQuestion) {
                const { options: shuffledOpts, answer: newAnswer } = shuffleOptions(options, currentQuestion.answer);
                currentQuestion.options = shuffledOpts;
                currentQuestion.answer = newAnswer;
                questions.push(currentQuestion);
            }
            currentQuestion = {
                title: line.replace(/^\d+\.\s*/, ''),
                options: [],
                answer: ''
            };
            options = [];
        } else if (line.match(/^[A-D]\./)) {
            const letter = line[0];
            const text = line.replace(/^[A-D]\.\s*/, '');
            options.push({ letter, text });
        } else if (line.startsWith('答案：')) {
            if (currentQuestion) {
                currentQuestion.answer = line.replace('答案：', '').trim();
            }
        }
    }
    
    if (currentQuestion) {
        const { options: shuffledOpts, answer: newAnswer } = shuffleOptions(options, currentQuestion.answer);
        currentQuestion.options = shuffledOpts;
        currentQuestion.answer = newAnswer;
        questions.push(currentQuestion);
    }
    
    // 组装题库列表页需要展示的套题摘要数据。
    const setId = `set_${idCounter++}`;
    const companyShort = major.length > 2 ? major.substring(0, 2) : major;
    const setObj = {
        id: setId,
        title: `${major}专业${type === 'bishi' ? '笔试' : '面试'}套题${setType}`,
        companyShort,
        total: questions.length,
        major: major,
        company: major + '相关企业',
        category: type === 'bishi' ? '笔试' : '面试',
        difficulty: '中等',
        summary: `这是一套专为${major}专业设计的${type === 'bishi' ? '笔试' : '面试'}真题练习，涵盖了该专业常见的考点与面试题。`,
        highlights: [
            '精选真实考题，高度还原考试场景',
            '题目选项全面随机化，避免背选项',
            '涵盖核心专业知识与常见面试问题'
        ],
        isFavorite: false
    };
    
    // 根据套题类型分别写入笔试或面试集合。
    if (type === 'bishi') {
        writtenSets.push(setObj);
    } else {
        interviewSets.push(setObj);
    }
    
    // 生成做题页使用的试卷题目结构。
    paperMap[setId] = questions.map((q, i) => ({
        id: `q_${setId}_${i}`,
        type: 'single',
        title: q.title,
        options: q.options.map(o => o.text),
        answer: ['A', 'B', 'C', 'D'].indexOf(q.answer)
    }));
}

// 扫描全部原始题库文件，并输出前端可直接引用的数据模块。
function generateData() {
    // 导入所有笔试题库文本。
    const bishiFiles = fs.readdirSync(bishiPath).filter(f => f.endsWith('.txt'));
    for (const f of bishiFiles) {
        parseFile(path.join(bishiPath, f), 'bishi');
    }
    
    // 导入所有面试题库文本。
    const mianshiFiles = fs.readdirSync(mianshiPath).filter(f => f.endsWith('.txt'));
    for (const f of mianshiFiles) {
        parseFile(path.join(mianshiPath, f), 'mianshi');
    }
    
    // 拼接 questionBank 页面使用的静态数据文件内容。
    const jsContent = `export const bankTabs = [
	{ key: 'written', label: '笔试真题', icon: 'written-icon' },
	{ key: 'interview', label: '面试真题', icon: 'interview-icon' }
]

export const questionBankSearchPlaceholder = '搜索专业真题'

export const writtenSets = ${JSON.stringify(writtenSets, null, 4)};

export const interviewSets = ${JSON.stringify(interviewSets, null, 4)};

const paperMap = ${JSON.stringify(paperMap, null, 4)};

const allItems = [...writtenSets, ...interviewSets];

export function getQuestionDetail(id) {
	return allItems.find(item => item.id === id);
}

export function getQuestionPaper(id) {
	return paperMap[id] || [];
}
`;

    // 写入前端题库数据文件。
    fs.writeFileSync(path.join(__dirname, '../subPages/questionBank/data.js'), jsContent);
    console.log('Data generated successfully!');
}

// 执行题库导入流程。
generateData();
