const express = require('express');
const jdParsingService = require('../services/jdParsingService');
const router = express.Router();

// POST /api/jd/parse - 解析JD文本
router.post('/parse', async (req, res) => {
  try {
    const { jdText } = req.body;

    if (!jdText || typeof jdText !== 'string' || jdText.trim().length === 0) {
      return res.status(400).json({
        error: 'JD文本不能为空',
        code: 'INVALID_JD_TEXT'
      });
    }

    const parsedJD = await jdParsingService.parseAndStoreJD(jdText);

    res.json({
      success: true,
      message: 'JD解析成功',
      data: parsedJD
    });

  } catch (error) {
    console.error('JD解析API错误:', error);
    res.status(500).json({
      error: error.message || 'JD解析失败',
      code: 'JD_PARSE_FAILED'
    });
  }
});

// GET /api/jd - 获取当前JD
router.get('/', (req, res) => {
  try {
    const currentJD = jdParsingService.getCurrentJD();

    if (!currentJD) {
      return res.status(404).json({
        error: '暂无JD数据',
        code: 'NO_JD_DATA'
      });
    }

    res.json({
      success: true,
      data: currentJD
    });

  } catch (error) {
    console.error('获取JD API错误:', error);
    res.status(500).json({
      error: error.message || '获取JD失败',
      code: 'GET_JD_FAILED'
    });
  }
});

// DELETE /api/jd - 清除当前JD
router.delete('/', (req, res) => {
  try {
    jdParsingService.clearJD();

    res.json({
      success: true,
      message: 'JD已清除'
    });

  } catch (error) {
    console.error('清除JD API错误:', error);
    res.status(500).json({
      error: error.message || '清除JD失败',
      code: 'CLEAR_JD_FAILED'
    });
  }
});

// POST /api/jd/demo - 设置演示JD用于测试
router.post('/demo', (req, res) => {
  try {
    const storage = require('../data/storage');
    storage.setDemoJD();

    const demoJD = storage.getJD();

    res.json({
      success: true,
      message: '演示JD设置成功',
      data: demoJD
    });

  } catch (error) {
    console.error('设置演示JD API错误:', error);
    res.status(500).json({
      error: error.message || '设置演示JD失败',
      code: 'SET_DEMO_JD_FAILED'
    });
  }
});

// GET /api/jd/status - 获取JD状态
router.get('/status', (req, res) => {
  try {
    const currentJD = jdParsingService.getCurrentJD();

    res.json({
      success: true,
      data: {
        hasJD: !!currentJD,
        parsedAt: currentJD?.parsedAt || null,
        title: currentJD?.title || null,
        company: currentJD?.company || null
      }
    });

  } catch (error) {
    console.error('获取JD状态API错误:', error);
    res.status(500).json({
      error: error.message || '获取JD状态失败',
      code: 'GET_JD_STATUS_FAILED'
    });
  }
});

module.exports = router;