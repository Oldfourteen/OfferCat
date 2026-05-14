# OfferCat 大学生求职AI评估平台 - API接口文档

## 文档说明

本文档提供了OfferCat平台所有后端API接口的详细说明，供前端开发人员参考使用。

**基础URL**: `http://localhost:8080`

**响应格式**: 统一使用 `ResponseResult<T>` 格式

```json
{
  "code": 200,
  "message": "success",
  "data": {}
}
```

**状态码说明**:
- `200`: 成功
- `400`: 请求参数错误
- `404`: 资源未找到
- `500`: 服务器内部错误

---

## 目录

1. [用户认证模块](#用户认证模块)
2. [简历管理模块](#简历管理模块)
3. [AI面试模块](#ai面试模块)
4. [AI简历模块](#ai简历模块)
5. [AI咨询模块](#ai咨询模块)
6. [雷达评估模块](#雷达评估模块)
7. [专业交叉星图（galaxy-service）](#专业交叉星图galaxy-service)

---

## 用户认证模块

**服务名称**: user-service

**前缀**: `/auth`

### 1. 发送验证码

**接口名称**: 发送验证码

**接口地址**: `POST /auth/send-code`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| target | String | 是 | 目标（手机号或邮箱） |
| type | String | 是 | 类型（phone或email） |

**请求示例**:

```json
{
  "target": "13800138000",
  "type": "phone"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

### 2. 用户注册

**接口名称**: 用户注册

**接口地址**: `POST /auth/register`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| target | String | 是 | 目标（手机号或邮箱） |
| code | String | 是 | 验证码 |
| password | String | 是 | 密码 |
| confirmPassword | String | 是 | 确认密码 |
| nickname | String | 是 | 昵称 |
| registerType | String | 是 | 注册类型（phone或email） |

**请求示例**:

```json
{
  "target": "13800138000",
  "code": "123456",
  "password": "123456",
  "confirmPassword": "123456",
  "nickname": "张三",
  "registerType": "phone"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "uuid-string",
    "user": {
      "userId": 1,
      "username": "13800138000",
      "nickname": "张三",
      "phone": "13800138000",
      "userRole": 0,
      "userStatus": 1,
      "createTime": "2026-04-21T00:00:00"
    },
    "isComplete": false
  }
}
```

---

### 3. 用户登录

**接口名称**: 用户登录

**接口地址**: `POST /auth/login`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| target | String | 是 | 目标（手机号、邮箱或用户名） |
| password | String | 否 | 密码（验证码登录时不传） |
| code | String | 否 | 验证码（密码登录时不传） |
| loginType | String | 是 | 登录类型（password或code或one-click） |

**请求示例** - 密码登录:

```json
{
  "target": "13800138000",
  "password": "123456",
  "loginType": "password"
}
```

**请求示例** - 验证码登录:

```json
{
  "target": "13800138000",
  "code": "123456",
  "loginType": "code"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "token": "uuid-string",
    "user": {
      "userId": 1,
      "username": "13800138000",
      "nickname": "张三",
      "phone": "13800138000",
      "userRole": 1,
      "userStatus": 1,
      "createTime": "2026-04-21T00:00:00"
    },
    "isComplete": true
  }
}
```

---

### 4. 完善学生信息

**接口名称**: 完善学生信息

**接口地址**: `POST /auth/complete-student-info`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Long | 是 | 用户ID |
| realName | String | 是 | 真实姓名 |
| idCard | String | 是 | 身份证号 |
| school | String | 是 | 学校 |
| grade | String | 是 | 年级 |
| className | String | 是 | 班级 |
| major | String | 是 | 专业 |
| age | Integer | 是 | 年龄 |
| education | String | 是 | 学历 |

**请求示例**:

```json
{
  "userId": 1,
  "realName": "张三",
  "idCard": "110101199001011234",
  "school": "北京大学",
  "grade": "2022级",
  "className": "计算机1班",
  "major": "计算机科学与技术",
  "age": 22,
  "education": "本科"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

### 5. 完善教师信息

**接口名称**: 完善教师信息

**接口地址**: `POST /auth/complete-teacher-info`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Long | 是 | 用户ID |
| realName | String | 是 | 真实姓名 |
| school | String | 是 | 学校 |
| position | String | 是 | 职位 |
| workNo | String | 是 | 工号 |

**请求示例**:

```json
{
  "userId": 1,
  "realName": "李老师",
  "school": "北京大学",
  "position": "教授",
  "workNo": "T2024001"
}
```

**响应示例**:

```json
{
  "code": 200,
  "message": "success",
  "data": null
}
```

---

## 简历管理模块

**服务名称**: resume-service

**前缀**: `/api/resume`

### 1. 创建简历

**接口名称**: 创建简历

**接口地址**: `POST /api/resume/create`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |
| resumeName | String | 是 | 简历名称 |
| targetPosition | String | 是 | 目标岗位 |
| personalInfo | String | 否 | 个人信息 |
| education | String | 否 | 教育背景 |
| skills | String | 否 | 专业技能 |
| projects | String | 否 | 项目经历 |
| internships | String | 否 | 实习经历 |
| selfEvaluation | String | 否 | 自我评价 |

**请求示例**:

```json
{
  "studentId": 1,
  "resumeName": "Java开发工程师简历",
  "targetPosition": "Java开发工程师",
  "personalInfo": "姓名：张三，电话：13800138000，邮箱：zhangsan@example.com",
  "education": "北京大学计算机科学与技术本科",
  "skills": "Java, Spring Boot, MySQL",
  "projects": "校园电商平台",
  "internships": "阿里巴巴实习",
  "selfEvaluation": "热爱编程，积极上进"
}
```

**响应示例**:

```json
{
  "resumeId": 1,
  "studentId": 1,
  "resumeName": "Java开发工程师简历",
  "targetPosition": "Java开发工程师",
  "status": 1,
  "createTime": "2026-04-21T00:00:00",
  "updateTime": "2026-04-21T00:00:00"
}
```

---

### 2. 更新简历

**接口名称**: 更新简历

**接口地址**: `PUT /api/resume/update`

**请求参数**: 同创建简历，需包含resumeId

**请求示例**:

```json
{
  "resumeId": 1,
  "studentId": 1,
  "resumeName": "Java开发工程师简历-更新",
  "targetPosition": "Java开发工程师",
  "personalInfo": "更新后的个人信息"
}
```

**响应示例**: 同创建简历

---

### 3. 删除简历

**接口名称**: 删除简历

**接口地址**: `DELETE /api/resume/delete/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 简历ID |

**请求示例**:

```
DELETE /api/resume/delete/1
```

**响应示例**:

```json
true
```

---

### 4. 获取单个简历

**接口名称**: 获取单个简历

**接口地址**: `GET /api/resume/get/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 简历ID |

**请求示例**:

```
GET /api/resume/get/1
```

**响应示例**: 同创建简历

---

### 5. 获取学生简历列表

**接口名称**: 获取学生简历列表

**接口地址**: `GET /api/resume/list/{studentId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |

**请求示例**:

```
GET /api/resume/list/1
```

**响应示例**:

```json
[
  {
    "resumeId": 1,
    "studentId": 1,
    "resumeName": "Java开发工程师简历",
    "targetPosition": "Java开发工程师",
    "status": 1,
    "createTime": "2026-04-21T00:00:00"
  },
  {
    "resumeId": 2,
    "studentId": 1,
    "resumeName": "前端开发工程师简历",
    "targetPosition": "前端开发工程师",
    "status": 1,
    "createTime": "2026-04-21T00:00:00"
  }
]
```

---

### 6. 启用简历

**接口名称**: 启用简历

**接口地址**: `POST /api/resume/enable/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 简历ID |

**请求示例**:

```
POST /api/resume/enable/1
```

**响应示例**: 同创建简历

---

### 7. 禁用简历

**接口名称**: 禁用简历

**接口地址**: `POST /api/resume/disable/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 简历ID |

**请求示例**:

```
POST /api/resume/disable/1
```

**响应示例**: 同创建简历

---

### 8. AI生成简历

**接口名称**: AI生成简历

**接口地址**: `POST /api/resume/ai/generate`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |
| targetPosition | String | 是 | 目标岗位 |
| studentInfo | String | 是 | 学生信息 |

**请求示例**:

```json
{
  "studentId": 1,
  "targetPosition": "Java开发工程师",
  "studentInfo": "张三，北京大学计算机科学与技术本科，Java，Spring Boot"
}
```

**响应示例**: 同创建简历

---

### 9. AI诊断简历

**接口名称**: AI诊断简历

**接口地址**: `POST /api/resume/ai/diagnose`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| resumeId | Long | 是 | 简历ID |
| targetPosition | String | 是 | 目标岗位 |

**请求示例**:

```json
{
  "resumeId": 1,
  "targetPosition": "Java开发工程师"
}
```

**响应示例**:

```json
{
  "resumeId": 1,
  "score": 85,
  "diagnosis": "简历整体不错，建议加强项目经历描述",
  "suggestions": "1. 优化项目经历 2. 补充技能细节"
}
```

---

### 10. 导出简历为PDF

**接口名称**: 导出简历为PDF

**接口地址**: `GET /api/resume/export/pdf/{id}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| id | Long | 是 | 简历ID |

**请求示例**:

```
GET /api/resume/export/pdf/1
```

**响应**: PDF文件二进制流

---

## AI面试模块

**服务名称**: ai-evaluation-service

**前缀**: `/api/ai/interview`

### 1. 初始化面试会话

**接口名称**: 初始化面试会话

**接口地址**: `POST /api/ai/interview/session/init`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |
| targetPosition | String | 是 | 目标岗位 |
| mode | Integer | 否 | 面试模式（1：模拟面试，2：真题练习，3：专项训练） |
| totalQuestions | Integer | 否 | 总题目数 |

**请求示例**:

```
POST /api/ai/interview/session/init?studentId=1&targetPosition=Java开发工程师&mode=1&totalQuestions=10
```

**响应示例**:

```json
{
  "sessionId": 1,
  "studentId": 1,
  "targetPosition": "Java开发工程师",
  "interviewMode": 1,
  "totalQuestions": 10,
  "answeredQuestions": 0,
  "sessionStatus": 1,
  "startTime": "2026-04-21T00:00:00",
  "createTime": "2026-04-21T00:00:00"
}
```

---

### 2. 获取面试历史记录

**接口名称**: 获取面试历史记录

**接口地址**: `GET /api/ai/interview/session/history/{studentId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |

**请求示例**:

```
GET /api/ai/interview/session/history/1
```

**响应示例**:

```json
[
  {
    "sessionId": 1,
    "studentId": 1,
    "targetPosition": "Java开发工程师",
    "interviewMode": 1,
    "sessionStatus": 0,
    "startTime": "2026-04-21T00:00:00",
    "endTime": "2026-04-21T01:00:00"
  }
]
```

---

### 3. 获取单个面试会话

**接口名称**: 获取单个面试会话

**接口地址**: `GET /api/ai/interview/session/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
GET /api/ai/interview/session/1
```

**响应示例**: 同初始化面试会话

---

### 4. 结束面试会话

**接口名称**: 结束面试会话

**接口地址**: `POST /api/ai/interview/session/end/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
POST /api/ai/interview/session/end/1
```

**响应示例**: 同初始化面试会话

---

### 5. 获取下一道面试题目

**接口名称**: 获取下一道面试题目

**接口地址**: `GET /api/ai/interview/question/next/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
GET /api/ai/interview/question/next/1
```

**响应示例**:

```json
{
  "questionId": 1,
  "question": "请简述Java中的多态",
  "answer": "多态是指同一个方法在不同对象上有不同表现",
  "difficulty": 2,
  "category": "Java基础"
}
```

---

### 6. 提交面试答案

**接口名称**: 提交面试答案

**接口地址**: `POST /api/ai/interview/answer/submit`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |
| questionId | Long | 是 | 题目ID |
| userAnswer | String | 是 | 用户答案 |

**请求示例**:

```
POST /api/ai/interview/answer/submit?sessionId=1&questionId=1&userAnswer=我的回答
```

**响应示例**:

```json
{
  "recordId": 1,
  "sessionId": 1,
  "questionId": 1,
  "userAnswer": "我的回答",
  "score": 80,
  "feedback": "回答基本正确，建议补充更多细节",
  "createTime": "2026-04-21T00:00:00"
}
```

---

### 7. 获取会话答题记录

**接口名称**: 获取会话答题记录

**接口地址**: `GET /api/ai/interview/answer/list/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
GET /api/ai/interview/answer/list/1
```

**响应示例**:

```json
[
  {
    "recordId": 1,
    "sessionId": 1,
    "questionId": 1,
    "userAnswer": "我的回答",
    "score": 80,
    "feedback": "回答基本正确"
  }
]
```

---

### 8. 生成面试评估报告

**接口名称**: 生成面试评估报告

**接口地址**: `POST /api/ai/interview/report/generate/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
POST /api/ai/interview/report/generate/1
```

**响应示例**:

```json
{
  "reportId": 1,
  "sessionId": 1,
  "totalScore": 85,
  "summary": "整体表现良好，建议加强算法练习",
  "strengths": ["基础扎实", "思路清晰"],
  "weaknesses": ["算法薄弱"],
  "suggestions": ["多刷LeetCode"],
  "createTime": "2026-04-21T00:00:00"
}
```

---

### 9. 获取面试评估报告

**接口名称**: 获取面试评估报告

**接口地址**: `GET /api/ai/interview/report/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
GET /api/ai/interview/report/1
```

**响应示例**: 同生成面试评估报告

---

### 10. 导出面试报告为PDF

**接口名称**: 导出面试报告为PDF

**接口地址**: `GET /api/ai/interview/report/export/{sessionId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| sessionId | Long | 是 | 会话ID |

**请求示例**:

```
GET /api/ai/interview/report/export/1
```

**响应**: PDF文件二进制流

---

## AI简历模块

**服务名称**: ai-evaluation-service

**前缀**: `/api/ai/resume`

### 1. AI生成简历（底层接口）

**接口名称**: AI生成简历（底层接口）

**接口地址**: `POST /api/ai/resume/generate`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| targetPosition | String | 是 | 目标岗位 |
| studentInfo | String | 是 | 学生信息 |

**请求示例**:

```
POST /api/ai/resume/generate?targetPosition=Java开发工程师&studentInfo=张三，北大
```

**响应示例**:

```
"生成的简历内容..."
```

---

### 2. AI诊断简历（底层接口）

**接口名称**: AI诊断简历（底层接口）

**接口地址**: `POST /api/ai/resume/diagnose`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| resumeContent | String | 是 | 简历内容 |
| targetPosition | String | 是 | 目标岗位 |

**请求示例**:

```
POST /api/ai/resume/diagnose?resumeContent=简历内容&targetPosition=Java开发工程师
```

**响应示例**:

```
"诊断结果..."
```

---

## AI咨询模块

**服务名称**: ai-evaluation-service

**前缀**: `/api/ai`

### 1. AI HR咨询

**接口名称**: AI HR咨询

**接口地址**: `POST /api/ai/chat`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| userId | Long | 是 | 用户ID |
| majorCode | String | 是 | 专业代码 |
| question | String | 是 | 问题内容 |

**请求示例**:

```
POST /api/ai/chat?userId=1&majorCode=CS&question=如何准备面试
```

**响应示例**:

```
"AI的回答内容..."
```

---

## 雷达评估模块

**服务名称**: radar-evaluation-service

**前缀**: `/api/radar`

### 1. 获取雷达评估

**接口名称**: 获取雷达评估

**接口地址**: `GET /api/radar/get/{studentId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |

**请求示例**:

```
GET /api/radar/get/1
```

**响应示例**:

```json
{
  "radarId": 1,
  "studentId": 1,
  "english": 85,
  "japanese": 60,
  "internship": 90,
  "communication": 80,
  "personality": 85,
  "professional": 75,
  "totalScore": 80.0
}
```

---

### 2. 保存雷达评估

**接口名称**: 保存雷达评估

**接口地址**: `POST /api/radar/save`

**请求参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| studentId | Long | 是 | 学生ID |
| english | Integer | 是 | 英语能力（0-100） |
| japanese | Integer | 是 | 日语能力（0-100） |
| internship | Integer | 是 | 实习经历（0-100） |
| communication | Integer | 是 | 沟通能力（0-100） |
| personality | Integer | 是 | 性格特点（0-100） |
| professional | Integer | 是 | 专业技能（0-100） |
| totalScore | BigDecimal | 否 | 总分 |

**请求示例**:

```json
{
  "studentId": 1,
  "english": 85,
  "japanese": 60,
  "internship": 90,
  "communication": 80,
  "personality": 85,
  "professional": 75,
  "totalScore": 80.0
}
```

**响应示例**: 同获取雷达评估

---

### 3. 删除雷达评估

**接口名称**: 删除雷达评估

**接口地址**: `DELETE /api/radar/delete/{radarId}`

**路径参数**:

| 参数名 | 类型 | 必填 | 说明 |
|--------|------|------|------|
| radarId | Long | 是 | 雷达评估ID |

**请求示例**:

```
DELETE /api/radar/delete/1
```

**响应示例**:

```json
true
```

---

## 专业交叉星图（galaxy-service）

**服务名称**: `galaxy-service`（注册到 Eureka，经网关 `http://{gateway}:14132/api/galaxy/**`）

**说明**: 从 `classpath:galaxy/mock/*.json` 提供与 H5 mock 同构的图数据（无 DB）。H5 将 `fetchGalaxyBundle` 的 base 设为 `http://{gateway}:14132/api/galaxy`。

**可选链路**：

- `galaxy.cpp.graph-base-url` 指向 **C++ galaxy-graph** 时：`POST /hyperedges/containing` 与 `POST /path/shortest` 优先走 C++，失败则 Java 内存回退。
- `galaxy.python.base-url` 指向 **Python galaxy** 时：`POST /recommend` 转发 `/galaxy/recommend`；`/embed/neighbors`、`/report` 必须配置 Python 才可用。

### 1. 获取 manifest

`GET /api/galaxy/manifest.json` 或 `GET /api/galaxy/manifest`

返回 JSON 中含 `nodes_url`、`edges_url` 等为相对文件名（如 `nodes.json`），与现有 `useGraphManifest` 解析逻辑一致。

### 2. 获取图静态分片

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/galaxy/nodes.json` | 节点列表 |
| GET | `/api/galaxy/edges.json` | 边列表 |
| GET | `/api/galaxy/hyperedges.json` | 超边列表 |
| GET | `/api/galaxy/layout.json` | 布局坐标 |
| GET | `/api/galaxy/recommend.json` | 推荐 mock |

### 3. 包含某节点的超边

`POST /api/galaxy/hyperedges/containing`

**请求体**:

```json
{ "nodeId": "major_cs" }
```

**响应**: `hyperedges`（命中的超边对象数组）、`membersByHyperedge`（超边 id → 成员 id 数组）、`memberNodeIds`（去重后的全部成员 id）、`nodeId`。

### 4. 推荐（POST，聚合 Python）

`POST /api/galaxy/recommend`

**请求体**: 可选 JSON（如 `selectedNodeId`）。已配置 `galaxy.python.base-url`（或旧项 `galaxy.python.recommend-base-url`）时转发到 `{base}/galaxy/recommend`；否则返回 classpath `recommend.json`。

### 5. 语义近邻（POST，需 Python）

`POST /api/galaxy/embed/neighbors`

**请求体**: `{ "text": "自述", "k": 5 }` → 转发 Python `/galaxy/embed/neighbors`，返回 `rankedFusionIds`。

### 6. 报告条带（POST，需 Python）

`POST /api/galaxy/report` → 转发 Python `/galaxy/report`，返回 `bars` 等 JSON。

### 7. 两节点最短路（POST）

`POST /api/galaxy/path/shortest`

**请求体**: `{ "fromId": "major_cs", "toId": "major_ds" }`（支持 `from_id` / `to_id`）

**响应**: `found`、`nodeIds`（节点 id 序列）。配置 C++ 时优先走 C++ `/galaxy/path/shortest`，否则 Java 无向 BFS。

## 附录

### 用户角色说明

| 值 | 说明 |
|----|------|
| 0 | 未选择角色 |
| 1 | 学生 |
| 2 | 教师 |
| 3 | 管理员 |

### 账号状态说明

| 值 | 说明 |
|----|------|
| 0 | 禁用 |
| 1 | 正常 |
| 2 | 待审核 |

### 面试模式说明

| 值 | 说明 |
|----|------|
| 1 | 模拟面试 |
| 2 | 真题练习 |
| 3 | 专项训练 |

### 难度级别说明

| 值 | 说明 |
|----|------|
| 1 | 简单 |
| 2 | 中等 |
| 3 | 困难 |

### 会话状态说明

| 值 | 说明 |
|----|------|
| 0 | 已结束 |
| 1 | 进行中 |

---

## 更新日志

| 日期 | 版本 | 说明 |
|------|------|------|
| 2026-05-14 | v1.2 | galaxy：C++/Python 可选链路、path/embed/report |
| 2026-05-14 | v1.1 | 新增 galaxy-service 星图 API（网关 `/api/galaxy/**`） |
| 2026-04-21 | v1.0 | 初始版本，整理所有API接口 |

