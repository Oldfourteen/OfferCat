# OfferCat - 大学生求职AI评估平台

<div align="center">

![Logo](OfferCat/app.png)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Java](https://img.shields.io/badge/Java-21-green.svg)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.4-brightgreen.svg)](https://spring.io/projects/spring-boot)
[![Vue](https://img.shields.io/badge/Vue-3.x-orange.svg)](https://vuejs.org/)
[![UniApp](https://img.shields.io/badge/UniApp-跨平台-blue.svg)](https://uniapp.dcloud.net.cn/)

*一款面向大学生的AI驱动求职能力评估与提升平台*

</div>

---

## 项目简介

OfferCat 是一款专为大学生设计的智能求职辅助平台，通过AI技术帮助学生提升面试技能、优化简历内容，并提供多维度的能力评估，助力求职者更好地规划职业发展路径。

---

## 核心功能

### AI 智能服务

| 功能模块 | 描述 |
|---------|------|
| **AI 模拟面试** | 支持多种面试模式（模拟面试/真题练习/专项训练），实时评分与反馈 |
| **AI 简历生成** | 基于学生信息智能生成专业简历内容 |
| **AI 简历诊断** | 深度分析简历问题，提供优化建议 |
| **AI HR 咨询** | 7×24小时解答求职相关问题 |

### 简历管理

- 创建、编辑、删除简历
- 简历模板管理
- 一键导出 PDF
- 简历在线预览与分享

### 雷达能力评估

多维度能力可视化评估，包括：
- 英语能力 / 日语能力
- 实习经历 / 沟通能力
- 性格特点 / 专业技能

### 题库练习

覆盖多个专业领域的面试题库：
- 临床医学、会计学、法学
- 计算机科学与技术、软件工程
- 金融学、市场营销、数据科学与大数据技术
- 电气工程及其自动化、英语

---

## 技术架构

### 后端技术栈

```
Java 21 + Spring Boot 3.2.4 + Spring Cloud 2023.0.0
├── 微服务架构
│   ├── user-service        # 用户服务
│   ├── student-service      # 学生服务
│   ├── resume-service       # 简历服务
│   ├── ai_evaluation        # AI评估服务
│   ├── radar_evaluation     # 雷达评估服务
│   ├── registry            # 服务注册中心 (Nacos)
│   └── api_gateway         # API网关
├── 数据存储
│   ├── MySQL 8.0.33        # 关系型数据库
│   └── Redis               # 缓存服务
├── ORM
│   ├── MyBatis 3.0.3
│   └── MyBatis-Plus 3.5.6
└── PDF 生成
    └── iText7
```

### 前端技术栈

```
UniApp + Vue 3 + JavaScript
├── 跨平台支持 (微信小程序 / H5 / App)
├── uCharts 可视化图表
└── 模块化组件设计
```

---

## 项目结构

```
OfferCatSRC
├── OfferCat/
│   ├── backend/                    # 后端服务
│   │   ├── java_services/          # Java微服务
│   │   │   ├── user/               # 用户服务
│   │   │   ├── student/            # 学生服务
│   │   │   ├── resume/             # 简历服务
│   │   │   ├── ai_evaluation/      # AI评估服务
│   │   │   ├── radar_evaluation/    # 雷达评估服务
│   │   │   ├── registry/           # 注册中心
│   │   │   ├── api_gateway/         # API网关
│   │   │   └── shared_config/       # 共享配置
│   │   └── python_services/        # Python服务
│   │       └── radar-evaluation/    # 雷达评估Python实现
│   │
│   ├── frontend/                   # 前端应用
│   │   ├── pages/                  # 页面组件
│   │   ├── components/             # 通用组件
│   │   ├── subPages/               # 子页面
│   │   ├── api/                    # API请求封装
│   │   ├── utils/                  # 工具函数
│   │   └── static/                 # 静态资源
│   │
│   └── .gitignore
│
├── OfferCat_DataBase.sql           # 数据库脚本
└── README.md                       # 项目说明文档
```

---

## 快速开始

### 环境要求

- JDK 21+
- Node.js 16+
- MySQL 8.0+
- Redis
- Maven 3.8+

### 后端启动

```bash
# 1. 初始化数据库
mysql -u root -p < OfferCat_DataBase.sql

# 2. 编译后端项目
cd OfferCat/backend/java_services
mvn clean install

# 3. 启动服务（使用部署脚本）
cd OfferCat/backend/java_services/deploy/bin
start_all.bat
```

### 前端启动

```bash
cd OfferCat/frontend
npm install
npm run dev
```

---

## API 接口

详细API接口文档请查看 [API接口文档](OfferCat/backend/API接口文档.md)

---

## 数据库

数据库脚本位于 `OfferCat_DataBase.sql`，包含以下主要表：

| 表名 | 描述 |
|------|------|
| `user` | 用户信息表 |
| `student` | 学生信息表 |
| `resume` | 简历表 |
| `interview_session` | 面试会话表 |
| `interview_answer` | 面试答题记录表 |
| `interview_report` | 面试评估报告表 |
| `radar_evaluation` | 雷达评估表 |
| `question_bank` | 题库表 |

---

## 预览截图

| 首页 | AI面试 | 简历管理 | 能力评估 |
|:---:|:---:|:---:|:---:|
| ![首页](OfferCat/frontend/static/tabbar/home.png) | ![AI面试](OfferCat/frontend/static/tabbar/ai.png) | ![简历](OfferCat/frontend/static/tabbar/archive.png) | ![我的](OfferCat/frontend/static/tabbar/my.png) |

---

## 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

---

## 致谢

感谢所有为项目做出贡献的开发者！

---

<div align="center">

**如果这个项目对你有帮助，欢迎 Star**

</div>
