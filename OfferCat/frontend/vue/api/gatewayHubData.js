/**
 * 前端「网关接通点」清单：展示经 api_gateway 可达的主要路径。
 * 仅作文档与排障用途；路径需与后端 Controller、StripPrefix 规则一致。
 *
 * method 省略表示「常用见该 verb」或前端混用；以 path 为准。
 */

export const GATEWAY_PORT_HINT =
	'网关进程内网监听 TCP 14132；外网经 NAT 映射 21630（如 start.awacode.top:21630）。App 默认走外网根地址；同内网调试可改 App.vue globalData.apiBase。'

/**
 * @typedef {{ label: string, method?: string, path: string, note?: string }} GatewayHubItem
 * @typedef {{ id: string, title: string, intro?: string, items: GatewayHubItem[] }} GatewayHubGroup
 */

/** @type {GatewayHubGroup[]} */
export const GATEWAY_GROUPS = [
	{
		id: 'auth-user',
		title: '用户 / 认证（user-service）',
		intro: '网关无前缀剥离：/auth、/user。/api/user/** 会 StripPrefix=1 落到 /user/**。',
		items: [
			{ label: '发送验证码', method: 'POST', path: '/auth/send-code' },
			{ label: '注册', method: 'POST', path: '/auth/register' },
			{ label: '登录', method: 'POST', path: '/auth/login' },
			{ label: '重置密码', method: 'POST', path: '/auth/reset-password' },
			{ label: '完善学生信息', method: 'POST', path: '/auth/complete-student-info' },
			{ label: '保存用户资料', method: 'POST', path: '/user/profile' },
			{ label: '获取用户资料', method: 'GET', path: '/user/profile' },
			{ label: '上传头像', method: 'POST', path: '/user/uploadAvatar' },
			{ label: '（可选）与上同义·带 /api 前缀', method: 'POST', path: '/api/user/profile', note: '网关 StripPrefix 后同 /user/profile' }
		]
	},
	{
		id: 'student',
		title: '学生业务（student-service）',
		intro: '网关 /api/student/** → StripPrefix=1 → /student/**。',
		items: [
			{ label: '竞赛·列表', method: 'GET', path: '/api/student/profile/competition/list' },
			{ label: '竞赛·新增', method: 'POST', path: '/api/student/profile/competition/add' },
			{ label: '竞赛·更新', method: 'PUT', path: '/api/student/profile/competition/update' },
			{ label: '竞赛·删除', method: 'DELETE', path: '/api/student/profile/competition/delete' },
			{ label: '证书·列表', method: 'GET', path: '/api/student/profile/certificate/list' },
			{ label: '证书·新增', method: 'POST', path: '/api/student/profile/certificate/add' },
			{ label: '证书·更新', method: 'PUT', path: '/api/student/profile/certificate/update' },
			{ label: '证书·删除', method: 'DELETE', path: '/api/student/profile/certificate/delete' },
			{ label: '项目·列表', method: 'GET', path: '/api/student/profile/project/list' },
			{ label: '项目·新增', method: 'POST', path: '/api/student/profile/project/add' },
			{ label: '项目·更新', method: 'PUT', path: '/api/student/profile/project/update' },
			{ label: '项目·删除', method: 'DELETE', path: '/api/student/profile/project/delete' },
			{ label: '实习·列表', method: 'GET', path: '/api/student/profile/internship/list' },
			{ label: '实习·新增', method: 'POST', path: '/api/student/profile/internship/add' },
			{ label: '实习·更新', method: 'PUT', path: '/api/student/profile/internship/update' },
			{ label: '实习·删除', method: 'DELETE', path: '/api/student/profile/internship/delete' },
			{ label: '笔试·抽题', method: 'GET', path: '/api/student/written-test/question' },
			{ label: '笔试·套题', method: 'GET', path: '/api/student/written-test/paper-questions' },
			{ label: '笔试·提交', method: 'POST', path: '/api/student/written-test/submit' },
			{ label: '面试·抽题', method: 'GET', path: '/api/student/interview/question' },
			{ label: '面试·套题', method: 'GET', path: '/api/student/interview/paper-questions' },
			{ label: '面试·提交', method: 'POST', path: '/api/student/interview/submit' },
			{ label: '试卷·搜索', method: 'POST', path: '/api/student/test-paper/search' }
		]
	},
	{
		id: 'growth',
		title: '成长档案（student-service）',
		intro: '网关 /api/growth/**（StripPrefix=1 → /growth/**）与 /api/student/** 下的 growth 路径；另提供 /growth/** 直达（代理剥掉外层 /api 时仍可走此段）。均需 student-service 与健康实例。',
		items: [
			{ label: '统计', method: 'GET', path: '/api/student/growth/stats' },
			{ label: '统计（等价前缀）', method: 'GET', path: '/api/growth/stats' },
			{ label: '统计（无前缀示例）', method: 'GET', path: '/growth/stats', note: '仅当你方代理把网关暴露为无前缀时使用；常与 /api 版二选一。' },
			{ label: '打卡', method: 'POST', path: '/api/student/growth/checkin' },
			{ label: '本周打卡', method: 'GET', path: '/api/student/growth/checkin/weekly' },
			{ label: '收藏题目', method: 'POST', path: '/api/student/growth/collect' }
		]
	},
	{
		id: 'forum',
		title: '论坛（student-service）',
		intro: '网关 /api/forum/** → StripPrefix=1 → /forum/**。',
		items: [
			{ label: '帖子搜索', method: 'POST', path: '/api/forum/post/search' },
			{ label: '上传图片', method: 'POST', path: '/api/forum/post/uploadImage' },
			{ label: '帖子详情', method: 'GET', path: '/api/forum/post/detail/{postId}', note: '{postId} 换实参' },
			{ label: '点赞', method: 'POST', path: '/api/forum/post/like/{postId}' },
			{ label: '取消赞', method: 'POST', path: '/api/forum/post/unlike/{postId}' },
			{ label: '评论列表', method: 'GET', path: '/api/forum/post/{postId}/comments' },
			{ label: '发表评论', method: 'POST', path: '/api/forum/post/comment' },
			{ label: '发帖', method: 'POST', path: '/api/forum/post/create' },
			{ label: '删帖', method: 'DELETE', path: '/api/forum/post/delete/{postId}' }
		]
	},
	{
		id: 'sensitive-help',
		title: '敏感词 / 帮助（student-service）',
		intro: '/api/sensitive/**、/api/help/** 均 StripPrefix=1。',
		items: [
			{ label: '敏感词检测', method: 'POST', path: '/api/sensitive/check' },
			{ label: '敏感词过滤', method: 'POST', path: '/api/sensitive/filter' },
			{ label: '随机诗句', method: 'GET', path: '/api/sensitive/poem' },
			{ label: '帮助中心 FAQ', method: 'GET', path: '/api/help/faq' }
		]
	},
	{
		id: 'ai',
		title: 'AI 评价服务（ai-evaluation-service）',
		intro: '网关 /api/ai/** 原样转发；含对话、简历、面试、OCR、TTS、ASR 等。',
		items: [
			{ label: 'AI 对话流', method: 'POST', path: '/api/ai/chat-stream' },
			{ label: 'AI 对话（模式）', method: 'POST', path: '/api/ai/chat-mode' },
			{ label: '对话历史', method: 'GET', path: '/api/ai/history' },
			{ label: '保留历史条数', method: 'PUT', path: '/api/ai/history/retain' },
			{ label: '上传聊天图片', method: 'POST', path: '/api/ai/upload-image' },
			{ label: '简历·生成正文', method: 'POST', path: '/api/ai/resume/generate' },
			{ label: '简历·诊断', method: 'POST', path: '/api/ai/resume/diagnose' },
			{ label: '简历·润色 PDF', method: 'POST', path: '/api/ai/resume/polish-pdf' },
			{ label: '简历·生成 PDF', method: 'POST', path: '/api/ai/resume/generate-pdf' },
			{ label: '面试·初始化会话', method: 'POST', path: '/api/ai/interview/session/init' },
			{ label: '面试·会话历史', method: 'GET', path: '/api/ai/interview/session/history' },
			{ label: 'ASR', method: 'POST', path: '/api/ai/asr/transcribe' },
			{ label: 'TTS', method: 'POST', path: '/api/ai/tts/speak' },
			{ label: 'OCR·配图说明', method: 'POST', path: '/api/ai/ocr/generate-caption' },
			{ label: '职测形象图', method: 'POST', path: '/api/ai/images/job-avatar' }
		]
	},
	{
		id: 'question-bank',
		title: '题库（ai-evaluation-service）',
		intro: '网关路由 /api/question-bank/** 转发 ai-evaluation-service。',
		items: [
			{ label: '科目', method: 'GET', path: '/api/question-bank/subjects' },
			{ label: '题目列表', method: 'POST', path: '/api/question-bank/questions' },
			{ label: '作答提交', method: 'POST', path: '/api/question-bank/submit' },
			{ label: 'PDF 题库', method: 'POST', path: '/api/question-bank/pdf' },
			{ label: '初始化', method: 'POST', path: '/api/question-bank/init' }
		]
	},
	{
		id: 'resume',
		title: '简历（resume-service）',
		intro: '网关 /api/resume/**。',
		items: [
			{ label: '创建', method: 'POST', path: '/api/resume/create' },
			{ label: '更新', method: 'PUT', path: '/api/resume/update' },
			{ label: '删除', method: 'DELETE', path: '/api/resume/delete/{id}' },
			{ label: '详情', method: 'GET', path: '/api/resume/get/{id}' },
			{ label: '用户简历列表', method: 'GET', path: '/api/resume/list/{userId}' },
			{ label: '启用', method: 'POST', path: '/api/resume/enable/{id}' },
			{ label: '停用', method: 'POST', path: '/api/resume/disable/{id}' },
			{ label: 'AI 生成', method: 'POST', path: '/api/resume/ai/generate' },
			{ label: 'AI 诊断', method: 'POST', path: '/api/resume/ai/diagnose' },
			{ label: '导出 PDF', method: 'GET', path: '/api/resume/export/pdf/{id}' },
			{ label: '导出 PDF(C++)', method: 'GET', path: '/api/resume/export/pdf/cpp/{id}' },
			{ label: '统计', method: 'GET', path: '/api/resume/stats/{userId}' },
			{ label: '上传附件', method: 'POST', path: '/api/resume/upload' },
			{ label: '高亮保存', method: 'POST', path: '/api/resume/highlight/{id}' },
			{ label: '简历头像·上传', method: 'POST', path: '/api/resume/{id}/avatar' },
			{ label: '简历头像·读取', method: 'GET', path: '/api/resume/{id}/avatar' }
		]
	},
	{
		id: 'radar',
		title: '雷达测评（radar-evaluation-service）',
		items: [
			{ label: '提交测评', method: 'POST', path: '/api/radar-chart/submit' },
			{ label: '我的测评结果', method: 'GET', path: '/api/radar-chart/my-evaluation' },
			{ label: '题库题目', method: 'GET', path: '/api/radar-chart/questions' },
			{ label: '岗位差距 Agent', method: 'POST', path: '/api/radar/gap-agent/generate' }
		]
	},
	{
		id: 'galaxy',
		title: '星图（galaxy-service）',
		intro: '完整根一般为：getApiBase() + /api/galaxy；或由 globalData.galaxyApiBase 直接指定（无末尾 /）。',
		items: [
			{ label: 'Manifest', method: 'GET', path: '/api/galaxy/manifest.json' },
			{ label: 'Manifest(short)', method: 'GET', path: '/api/galaxy/manifest' },
			{ label: '节点', method: 'GET', path: '/api/galaxy/nodes.json' },
			{ label: '边', method: 'GET', path: '/api/galaxy/edges.json' },
			{ label: '超边', method: 'GET', path: '/api/galaxy/hyperedges.json' },
			{ label: '布局', method: 'GET', path: '/api/galaxy/layout.json' },
			{ label: '推荐·GET', method: 'GET', path: '/api/galaxy/recommend.json' },
			{ label: '推荐·POST', method: 'POST', path: '/api/galaxy/recommend' },
			{ label: '嵌入邻居', method: 'POST', path: '/api/galaxy/embed/neighbors' },
			{ label: '报表', method: 'POST', path: '/api/galaxy/report' },
			{ label: '超边包含查询', method: 'POST', path: '/api/galaxy/hyperedges/containing' },
			{ label: '最短路径', method: 'POST', path: '/api/galaxy/path/shortest' }
		]
	},
	{
		id: 'chat',
		title: '在线客服（chat-service）',
		items: [
			{ label: '历史', method: 'GET', path: '/api/chat/history/{userId}' },
			{ label: '发送消息', method: 'POST', path: '/api/chat/send' },
			{ label: '保存会话快照', method: 'POST', path: '/api/chat/save' },
			{ label: '禁言检查', method: 'GET', path: '/api/chat/mute/check/{userId}' }
		]
	},
	{
		id: 'admin',
		title: '管理端（chat-service）',
		items: [
			{ label: '禁言', method: 'POST', path: '/api/admin/mute' },
			{ label: '解禁', method: 'POST', path: '/api/admin/unmute/{userId}' },
			{ label: '删帖', method: 'DELETE', path: '/api/admin/post/{postId}' },
			{ label: '搜索用户', method: 'GET', path: '/api/admin/search/user' }
		]
	},
	{
		id: 'recruitment',
		title: '招聘（网关占位）',
		intro: '网关存在 /api/recruitment/** → recruitment-service；若 Eureka 未注册该服务则无接通。',
		items: [{ label: '招聘 API 前缀（视部署）', method: '*', path: '/api/recruitment/', note: '需独立微服务' }]
	}
]
