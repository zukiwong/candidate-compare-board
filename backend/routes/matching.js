const express = require('express');
const matchingService = require('../services/matchingService');
const storage = require('../data/storage');
const router = express.Router();

// POST /api/match/:candidateId - 匹配分析 + AI生成面试问题
router.post('/:candidateId', async (req, res) => {
  try {
    const { candidateId } = req.params;

    // 检查JD是否存在
    const jd = storage.getJD();
    if (!jd) {
      return res.status(400).json({
        error: '请先解析JD',
        code: 'NO_JD_DATA'
      });
    }

    // 检查候选人是否存在
    const candidate = storage.getCandidateById(candidateId);
    if (!candidate) {
      return res.status(404).json({
        error: '候选人不存在',
        code: 'CANDIDATE_NOT_FOUND'
      });
    }

    const matchResult = await matchingService.calculateMatch(candidateId);

    res.json({
      success: true,
      message: '匹配分析完成',
      data: matchResult
    });

  } catch (error) {
    console.error('候选人匹配API错误:', error);
    res.status(500).json({
      error: error.message || '匹配分析失败',
      code: 'MATCH_ANALYSIS_FAILED'
    });
  }
});

// GET /api/match/batch/all - 批量匹配所有候选人
router.get('/batch/all', async (req, res) => {
  try {
    const candidates = storage.getCandidates();

    if (candidates.length === 0) {
      return res.status(400).json({
        error: '暂无候选人数据',
        code: 'NO_CANDIDATES'
      });
    }

    const matchResults = await matchingService.batchMatchCandidates();

    res.json({
      success: true,
      message: '批量匹配完成',
      data: {
        matches: matchResults,
        summary: {
          totalCandidates: matchResults.length,
          averageScore: Math.round(
            matchResults.reduce((sum, match) => sum + match.matchScore, 0) / matchResults.length
          ),
          topMatch: matchResults[0],
          processed: new Date().toISOString()
        }
      }
    });

  } catch (error) {
    console.error('批量匹配API错误:', error);
    res.status(500).json({
      error: error.message || '批量匹配失败',
      code: 'BATCH_MATCH_FAILED'
    });
  }
});

// GET /api/match/ranking/top - 获取Top匹配候选人
router.get('/ranking/top', async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const topLimit = Math.min(parseInt(limit) || 5, 10); // 最多10个

    const matchResults = await matchingService.batchMatchCandidates();
    const topMatches = matchResults.slice(0, topLimit);

    res.json({
      success: true,
      data: {
        topMatches: topMatches.map(match => ({
          candidateId: match.candidateId,
          candidateName: match.candidateName,
          matchScore: match.matchScore,
          keyStrengths: match.matchDetails.strengthAreas.slice(0, 2),
          topSkills: match.matchDetails.matchedSkills.slice(0, 3)
        })),
        limit: topLimit
      }
    });

  } catch (error) {
    console.error('Top排名API错误:', error);
    res.status(500).json({
      error: error.message || '获取Top排名失败',
      code: 'GET_TOP_RANKING_FAILED'
    });
  }
});

// GET /api/match/comparison/:candidateId1/:candidateId2 - 两个候选人对比
router.get('/comparison/:candidateId1/:candidateId2', async (req, res) => {
  try {
    const { candidateId1, candidateId2 } = req.params;

    // 获取两个候选人的匹配结果
    const match1 = await matchingService.calculateMatch(candidateId1);
    const match2 = await matchingService.calculateMatch(candidateId2);

    // 计算对比分析
    const comparison = {
      candidate1: {
        id: match1.candidateId,
        name: match1.candidateName,
        matchScore: match1.matchScore,
        breakdown: match1.breakdown
      },
      candidate2: {
        id: match2.candidateId,
        name: match2.candidateName,
        matchScore: match2.matchScore,
        breakdown: match2.breakdown
      },
      analysis: {
        scoreDifference: Math.abs(match1.matchScore - match2.matchScore),
        strongerCandidate: match1.matchScore >= match2.matchScore ? match1.candidateName : match2.candidateName,
        comparison: {
          skills: match1.breakdown.skills - match2.breakdown.skills,
          experience: match1.breakdown.experience - match2.breakdown.experience,
          education: match1.breakdown.education - match2.breakdown.education,
          projects: match1.breakdown.projects - match2.breakdown.projects
        }
      }
    };

    res.json({
      success: true,
      data: comparison
    });

  } catch (error) {
    console.error('候选人对比API错误:', error);
    res.status(500).json({
      error: error.message || '候选人对比失败',
      code: 'CANDIDATES_COMPARISON_FAILED'
    });
  }
});

// GET /api/match/insights - 匹配洞察和建议
router.get('/insights', async (req, res) => {
  try {
    const jd = storage.getJD();
    const candidates = storage.getCandidates();

    if (!jd || candidates.length === 0) {
      return res.status(400).json({
        error: '请确保已解析JD且导入候选人',
        code: 'INSUFFICIENT_DATA'
      });
    }

    const matchResults = await matchingService.batchMatchCandidates();

    // 生成洞察
    const insights = {
      totalCandidates: matchResults.length,
      averageMatch: Math.round(
        matchResults.reduce((sum, match) => sum + match.matchScore, 0) / matchResults.length
      ),
      distribution: {
        excellent: matchResults.filter(m => m.matchScore >= 90).length,
        good: matchResults.filter(m => m.matchScore >= 80 && m.matchScore < 90).length,
        fair: matchResults.filter(m => m.matchScore >= 70 && m.matchScore < 80).length,
        poor: matchResults.filter(m => m.matchScore < 70).length
      },
      commonStrengths: this.findCommonStrengths(matchResults),
      commonWeaknesses: this.findCommonWeaknesses(matchResults),
      recommendations: this.generateRecommendations(matchResults, jd)
    };

    res.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error('匹配洞察API错误:', error);
    res.status(500).json({
      error: error.message || '获取匹配洞察失败',
      code: 'GET_MATCH_INSIGHTS_FAILED'
    });
  }
});

// 辅助方法：找出常见优势
function findCommonStrengths(matchResults) {
  const strengthCounts = {};
  matchResults.forEach(match => {
    match.matchDetails.strengthAreas.forEach(strength => {
      strengthCounts[strength] = (strengthCounts[strength] || 0) + 1;
    });
  });

  return Object.entries(strengthCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([strength, count]) => ({ strength, count }));
}

// 辅助方法：找出常见劣势
function findCommonWeaknesses(matchResults) {
  const weaknessCounts = {};
  matchResults.forEach(match => {
    match.matchDetails.concernAreas.forEach(concern => {
      weaknessCounts[concern] = (weaknessCounts[concern] || 0) + 1;
    });
  });

  return Object.entries(weaknessCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 3)
    .map(([concern, count]) => ({ concern, count }));
}

// 辅助方法：生成招聘建议
function generateRecommendations(matchResults, jd) {
  const recommendations = [];

  const excellentCandidates = matchResults.filter(m => m.matchScore >= 90);
  const goodCandidates = matchResults.filter(m => m.matchScore >= 80 && m.matchScore < 90);

  if (excellentCandidates.length > 0) {
    recommendations.push(`发现${excellentCandidates.length}位优秀候选人，建议优先安排面试`);
  }

  if (goodCandidates.length > 0) {
    recommendations.push(`${goodCandidates.length}位候选人较为匹配，可作为备选`);
  }

  if (matchResults.length > 0) {
    const avgScore = matchResults.reduce((sum, m) => sum + m.matchScore, 0) / matchResults.length;
    if (avgScore < 70) {
      recommendations.push('整体匹配度偏低，建议适当降低部分要求或扩大招聘范围');
    }
  }

  return recommendations;
}

module.exports = router;