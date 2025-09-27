const express = require('express');
const storage = require('../data/storage');
const sampleCandidates = require('../data/sampleCandidates');
const router = express.Router();

// POST /api/candidates/import - 一键导入所有预置候选人
router.post('/import', (req, res) => {
  try {
    storage.setCandidates(sampleCandidates);

    res.json({
      success: true,
      message: '候选人导入成功',
      data: {
        imported: sampleCandidates.length,
        candidates: sampleCandidates.map(c => ({
          id: c.id,
          name: c.profile.name,
          title: c.experience[0]?.title || "N/A"
        }))
      }
    });

  } catch (error) {
    console.error('候选人导入API错误:', error);
    res.status(500).json({
      error: error.message || '候选人导入失败',
      code: 'IMPORT_CANDIDATES_FAILED'
    });
  }
});

// GET /api/candidates - 获取已导入的候选人列表
router.get('/', (req, res) => {
  try {
    const candidates = storage.getCandidates();

    // 可选查询参数
    const { summary } = req.query;

    let responseData;
    if (summary === 'true') {
      // 返回简要信息
      responseData = candidates.map(candidate => ({
        id: candidate.id,
        name: candidate.profile.name,
        initials: candidate.profile.initials,
        title: candidate.experience[0]?.title || "N/A",
        experience: `${Math.floor(candidate.experience[0]?.duration_months / 12) || 0}年${candidate.experience[0]?.duration_months % 12 || 0}个月`,
        location: candidate.profile.location.city,
        topSkills: candidate.skills.core_skills.slice(0, 5),
        match_pct: candidate.matching?.core_skill_match_pct || 0
      }));
    } else {
      // 返回完整信息
      responseData = candidates;
    }

    res.json({
      success: true,
      data: {
        candidates: responseData,
        total: candidates.length
      }
    });

  } catch (error) {
    console.error('获取候选人列表API错误:', error);
    res.status(500).json({
      error: error.message || '获取候选人列表失败',
      code: 'GET_CANDIDATES_FAILED'
    });
  }
});

// GET /api/candidates/:id - 获取特定候选人详情
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const candidate = storage.getCandidateById(id);

    if (!candidate) {
      return res.status(404).json({
        error: '候选人不存在',
        code: 'CANDIDATE_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: candidate
    });

  } catch (error) {
    console.error('获取候选人详情API错误:', error);
    res.status(500).json({
      error: error.message || '获取候选人详情失败',
      code: 'GET_CANDIDATE_FAILED'
    });
  }
});

// DELETE /api/candidates - 清除所有候选人
router.delete('/', (req, res) => {
  try {
    storage.setCandidates([]);

    res.json({
      success: true,
      message: '所有候选人已清除'
    });

  } catch (error) {
    console.error('清除候选人API错误:', error);
    res.status(500).json({
      error: error.message || '清除候选人失败',
      code: 'CLEAR_CANDIDATES_FAILED'
    });
  }
});

// GET /api/candidates/stats/overview - 获取候选人统计概览
router.get('/stats/overview', (req, res) => {
  try {
    const candidates = storage.getCandidates();

    if (candidates.length === 0) {
      return res.json({
        success: true,
        data: {
          total: 0,
          avgExperience: 0,
          topSkills: [],
          locations: {},
          educationLevels: {}
        }
      });
    }

    // 计算平均经验
    const avgExperience = candidates.reduce((sum, c) => {
      const monthsExp = c.experience[0]?.duration_months || 0;
      return sum + monthsExp / 12;
    }, 0) / candidates.length;

    // 统计技能频率
    const skillCounts = {};
    candidates.forEach(c => {
      c.skills.core_skills.forEach(skill => {
        skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1;
      });
    });

    // 获取前5个热门技能
    const topSkills = Object.entries(skillCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));

    // 统计地理分布
    const locations = {};
    candidates.forEach(c => {
      const location = c.profile.location.city;
      locations[location] = (locations[location] || 0) + 1;
    });

    // 统计教育水平
    const educationLevels = {};
    candidates.forEach(c => {
      const degree = c.education[0]?.degree || "N/A";
      educationLevels[degree] = (educationLevels[degree] || 0) + 1;
    });

    res.json({
      success: true,
      data: {
        total: candidates.length,
        avgExperience: Math.round(avgExperience * 10) / 10,
        topSkills,
        locations,
        educationLevels
      }
    });

  } catch (error) {
    console.error('获取候选人统计API错误:', error);
    res.status(500).json({
      error: error.message || '获取候选人统计失败',
      code: 'GET_CANDIDATES_STATS_FAILED'
    });
  }
});

module.exports = router;