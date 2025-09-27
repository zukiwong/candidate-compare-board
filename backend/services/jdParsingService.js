const geminiService = require('./geminiService');
const storage = require('../data/storage');

class JDParsingService {
  // Parse and store JD
  async parseAndStoreJD(jdText) {
    try {
      // Use Gemini to parse JD text
      const parsedJD = await geminiService.parseJD(jdText);

      // Add metadata
      const jdWithMetadata = {
        ...parsedJD,
        originalText: jdText,
        parsedAt: new Date().toISOString(),
        id: `jd_${Date.now()}`
      };

      // Store to memory
      storage.setJD(jdWithMetadata);

      return jdWithMetadata;
    } catch (error) {
      console.error('JD parsing and storage failed:', error);
      throw error;
    }
  }

  // Get current JD
  getCurrentJD() {
    return storage.getJD();
  }

  // Validate JD data format
  validateJDStructure(jdData) {
    const requiredFields = ['title', 'skills', 'requirements'];
    const missingFields = requiredFields.filter(field => !jdData[field]);

    if (missingFields.length > 0) {
      throw new Error(`JD data missing required fields: ${missingFields.join(', ')}`);
    }

    return true;
  }

  // Clear current JD
  clearJD() {
    storage.setJD(null);
  }
}

module.exports = new JDParsingService();