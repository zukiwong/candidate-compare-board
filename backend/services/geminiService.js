const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });
  }

  // 通用AI文本生成方法
  async generateContent(prompt) {
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Gemini API调用失败:', error);
      throw new Error('AI服务暂时不可用');
    }
  }

  // 解析JD文本为结构化数据
  async parseJD(jdText) {
    const prompt = `
请将以下招聘JD文本解析为结构化的JSON格式。要求：
1. 提取关键信息字段
2. 返回纯JSON格式，不要任何额外文字
3. 如果某些信息不明确，使用null值

输出结构：
{
  "title": "职位名称",
  "company": "公司名称",
  "location": "工作地点",
  "workType": "工作类型（full-time/part-time/contract/intern）",
  "experience": {
    "min": 最少年数,
    "max": 最多年数,
    "description": "经验要求描述"
  },
  "education": "学历要求",
  "skills": ["技能1", "技能2", "技能3"],
  "responsibilities": ["职责1", "职责2", "职责3"],
  "requirements": ["要求1", "要求2", "要求3"],
  "salary": {
    "min": 最低薪资,
    "max": 最高薪资,
    "currency": "货币单位"
  },
  "benefits": ["福利1", "福利2"],
  "description": "职位描述概要"
}

JD文本：
${jdText}
`;

    try {
      const response = await this.generateContent(prompt);
      // 尝试解析JSON，如果失败则返回错误
      return JSON.parse(response);
    } catch (error) {
      console.error('JD解析失败:', error);
      throw new Error('JD文本解析失败，请检查输入格式');
    }
  }

  // 生成针对性面试问题
  async generateInterviewQuestions(jdData, candidateData) {
    const prompt = `
基于以下职位要求和候选人简历，生成3个有针对性的面试问题。
要求：
1. 问题应该针对候选人的经验和职位要求的匹配点
2. 问题应该具有挑战性但合理
3. 返回JSON格式的问题列表

职位要求：
${JSON.stringify(jdData, null, 2)}

候选人简历：
${JSON.stringify(candidateData, null, 2)}

输出格式：
{
  "questions": [
    {
      "id": 1,
      "question": "问题内容",
      "category": "技术能力/项目经验/团队协作",
      "reasoning": "为什么问这个问题的原因"
    },
    {
      "id": 2,
      "question": "问题内容",
      "category": "技术能力/项目经验/团队协作",
      "reasoning": "为什么问这个问题的原因"
    },
    {
      "id": 3,
      "question": "问题内容",
      "category": "技术能力/项目经验/团队协作",
      "reasoning": "为什么问这个问题的原因"
    }
  ]
}
`;

    try {
      const response = await this.generateContent(prompt);
      return JSON.parse(response);
    } catch (error) {
      console.error('面试问题生成失败:', error);
      throw new Error('面试问题生成失败');
    }
  }

  // 健康检查方法
  async healthCheck() {
    try {
      const response = await this.generateContent('请回复"服务正常"');
      return response.includes('服务正常') || response.includes('正常');
    } catch (error) {
      return false;
    }
  }
}

// 导出单例实例
module.exports = new GeminiService();