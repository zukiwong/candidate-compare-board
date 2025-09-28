const express = require('express');
const router = express.Router();
const studentService = require('../services/studentService');

// Get student profile
router.get('/profile', async (req, res) => {
  try {
    const profile = await studentService.getStudentProfile();
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Error getting student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get student profile',
      error: error.message
    });
  }
});

// Get applied jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await studentService.getAppliedJobs();
    res.json({
      success: true,
      data: jobs
    });
  } catch (error) {
    console.error('Error getting applied jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get applied jobs',
      error: error.message
    });
  }
});

// Generate gap analysis for a job
router.post('/jobs/:jobId/gap-analysis', async (req, res) => {
  try {
    const { jobId } = req.params;
    const gapAnalysis = await studentService.generateGapAnalysis(jobId);

    res.json({
      success: true,
      data: gapAnalysis
    });
  } catch (error) {
    console.error('Error generating gap analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate gap analysis',
      error: error.message
    });
  }
});

// Generate AI interview questions for a job
router.post('/jobs/:jobId/questions', async (req, res) => {
  try {
    const { jobId } = req.params;
    const questions = await studentService.generateInterviewQuestions(jobId);

    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    console.error('Error generating interview questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate interview questions',
      error: error.message
    });
  }
});

// Generate elevator pitch for a job
router.post('/jobs/:jobId/elevator-pitch', async (req, res) => {
  try {
    const { jobId } = req.params;
    const pitch = await studentService.generateElevatorPitch(jobId);

    res.json({
      success: true,
      data: pitch
    });
  } catch (error) {
    console.error('Error generating elevator pitch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate elevator pitch',
      error: error.message
    });
  }
});

// Calculate match score for a job
router.post('/jobs/:jobId/match-score', async (req, res) => {
  try {
    const { jobId } = req.params;
    const matchScore = await studentService.calculateMatchScore(jobId);

    res.json({
      success: true,
      data: { matchScore }
    });
  } catch (error) {
    console.error('Error calculating match score:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to calculate match score',
      error: error.message
    });
  }
});

// Save student answer to interview question
router.post('/jobs/:jobId/questions/:questionIndex/answer', async (req, res) => {
  try {
    const { jobId, questionIndex } = req.params;
    const { answer } = req.body;

    await studentService.saveQuestionAnswer(jobId, parseInt(questionIndex), answer);

    res.json({
      success: true,
      message: 'Answer saved successfully'
    });
  } catch (error) {
    console.error('Error saving answer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save answer',
      error: error.message
    });
  }
});

// Update custom elevator pitch
router.post('/jobs/:jobId/custom-pitch', async (req, res) => {
  try {
    const { jobId } = req.params;
    const { pitch } = req.body;

    await studentService.saveCustomPitch(jobId, pitch);

    res.json({
      success: true,
      message: 'Custom pitch saved successfully'
    });
  } catch (error) {
    console.error('Error saving custom pitch:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save custom pitch',
      error: error.message
    });
  }
});

module.exports = router;