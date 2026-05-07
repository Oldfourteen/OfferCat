const fs = require('fs');
const path = require('path');

const bishiPath = path.join(__dirname, '../../backend/java_services/question_bank/bishi');
const mianshiPath = path.join(__dirname, '../../backend/java_services/question_bank/mianshi');

const writtenSets = [];
const interviewSets = [];
const paperMap = {};

let idCounter = 1;

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

function parseFile(filePath, type) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    
    let major = '';
    let setType = '';
    let questions = [];
    let currentQuestion = null;
    let options = [];
    
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
    
    if (type === 'bishi') {
        writtenSets.push(setObj);
    } else {
        interviewSets.push(setObj);
    }
    
    paperMap[setId] = questions.map((q, i) => ({
        id: `q_${setId}_${i}`,
        type: 'single',
        title: q.title,
        options: q.options.map(o => o.text),
        answer: ['A', 'B', 'C', 'D'].indexOf(q.answer)
    }));
}

function generateData() {
    const bishiFiles = fs.readdirSync(bishiPath).filter(f => f.endsWith('.txt'));
    for (const f of bishiFiles) {
        parseFile(path.join(bishiPath, f), 'bishi');
    }
    
    const mianshiFiles = fs.readdirSync(mianshiPath).filter(f => f.endsWith('.txt'));
    for (const f of mianshiFiles) {
        parseFile(path.join(mianshiPath, f), 'mianshi');
    }
    
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

    fs.writeFileSync(path.join(__dirname, '../subPages/questionBank/data.js'), jsContent);
    console.log('Data generated successfully!');
}

generateData();
