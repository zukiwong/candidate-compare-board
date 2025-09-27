const express = require('express');
const storage = require('../data/storage');
const sampleCandidates = require('../data/sampleCandidates');
const router = express.Router();

// POST /api/candidates/import - One-click import all preset candidates
router.post('/import', (req, res) => {
  try {
    storage.setCandidates(sampleCandidates);

    res.json({
      success: true,
      message: 'Candidate import successful',
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
    console.error('Candidate import API error:', error);
    res.status(500).json({
      error: error.message || 'Candidate import failed',
      code: 'IMPORT_CANDIDATES_FAILED'
    });
  }
});

// GET /api/candidates - Retrieve the list of imported candidates
router.get('/', (req, res) => {
  try {
    const candidates = storage.getCandidates();

    // Optional Query Parameters
    const { summary } = req.query;

    let responseData;
    if (summary === 'true') {
      // Return brief information
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
      // Return complete information
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
    console.error('Retrieve candidate list API error:', error);
    res.status(500).json({
      error: error.message || 'Failed to retrieve candidate list',
      code: 'GET_CANDIDATES_FAILED'
    });
  }
});

// GET /api/candidates/:id - Retrieve specific candidate details
router.get('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const candidate = storage.getCandidateById(id);

    if (!candidate) {
      return res.status(404).json({
        error: 'Candidate does not exist',
        code: 'CANDIDATE_NOT_FOUND'
      });
    }

    res.json({
      success: true,
      data: candidate
    });

  } catch (error) {
    console.error('Retrieve candidate details API error:', error);
    res.status(500).json({
      error: error.message || 'Failed to retrieve candidate details.',
      code: 'GET_CANDIDATE_FAILED'
    });
  }
});

// DELETE /api/candidates - Clear all candidates
router.delete('/', (req, res) => {
  try {
    storage.setCandidates([]);

    res.json({
      success: true,
      message: 'All candidates have been cleared.'
    });

  } catch (error) {
    console.error('Clear candidate API error:', error);
    res.status(500).json({
      error: error.message || 'Clear candidate failed',
      code: 'CLEAR_CANDIDATES_FAILED'
    });
  }
});

// GET /api/candidates/stats/overview - Obtain candidate statistical overview
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

    // Calculate average experience
    const avgExperience = candidates.reduce((sum, c) => {
      const monthsExp = c.experience[0]?.duration_months || 0;
      return sum + monthsExp / 12;
    }, 0) / candidates.length;

    // Statistical skill frequency
    const skillCounts = {};
    candidates.forEach(c => {
      c.skills.core_skills.forEach(skill => {
        skillCounts[skill.name] = (skillCounts[skill.name] || 0) + 1;
      });
    });

    // Get the top 5 popular skills
    const topSkills = Object.entries(skillCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([skill, count]) => ({ skill, count }));

    // Statistical geographic distribution
    const locations = {};
    candidates.forEach(c => {
      const location = c.profile.location.city;
      locations[location] = (locations[location] || 0) + 1;
    });

    // Statistical education level
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
    console.error('Retrieve candidate statistics API error:', error);
    res.status(500).json({
      error: error.message || 'Failed to obtain candidate statistics',
      code: 'GET_CANDIDATES_STATS_FAILED'
    });
  }
});

module.exports = router;