const geminiService = require('./geminiService');
const storage = require('../data/storage');

class JDParsingService {
  // 解析并存储JD
  async parseAndStoreJD(jdText) {
    try {
      // 使用Gemini解析JD文本
      const parsedJD = await geminiService.parseJD(jdText);

      // 添加元数据
      const jdWithMetadata = {
        ...parsedJD,
        originalText: jdText,
        parsedAt: new Date().toISOString(),
        id: `jd_${Date.now()}`
      };

      // 存储到内存
      storage.setJD(jdWithMetadata);

      return jdWithMetadata;
    } catch (error) {
      console.error('JD解析和存储失败:', error);
      throw error;
    }
  }

  // 获取当前JD
  getCurrentJD() {
    return storage.getJD();
  }

  // 验证JD数据格式
  validateJDStructure(jdData) {
    const requiredFields = ['title', 'skills', 'requirements'];
    const missingFields = requiredFields.filter(field => !jdData[field]);

    if (missingFields.length > 0) {
      throw new Error(`JD数据缺少必需字段: ${missingFields.join(', ')}`);
    }

    return true;
  }

  // 清除当前JD
  clearJD() {
    storage.setJD(null);
  }
}

module.exports = new JDParsingService();