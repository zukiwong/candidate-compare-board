const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import route
const jdRoutes = require('./routes/jd');
const candidatesRoutes = require('./routes/candidates');
const matchingRoutes = require('./routes/matching');
const studentRoutes = require('./routes/student');

// Import Service (for health check)
const geminiService = require('./services/geminiService');
const storage = require('./data/storage');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware configuration
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:5173',
    'https://candidate-compare-board.vercel.app',
    'https://candidate-compare-board-*.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request Log Middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API route
app.use('/api/jd', jdRoutes);
app.use('/api/candidates', candidatesRoutes);
app.use('/api/match', matchingRoutes);
app.use('/api/student', studentRoutes);

// Root path
app.get('/', (req, res) => {
  res.json({
    message: 'Candidate Compare Board Backend API',
    version: '1.0.0',
    status: 'running',
    timestamp: new Date().toISOString(),
    endpoints: {
      jd: {
        'POST /api/jd/parse': 'Parse JD text',
        'GET /api/jd': 'Get current JD',
        'DELETE /api/jd': 'Clear current JD',
        'GET /api/jd/status': 'Get JD status'
      },
      candidates: {
        'POST /api/candidates/import': 'Import sample candidates',
        'GET /api/candidates': 'Get all candidates',
        'GET /api/candidates/:id': 'Get candidate by ID',
        'DELETE /api/candidates': 'Clear all candidates',
        'GET /api/candidates/stats/overview': 'Get candidates statistics'
      },
      matching: {
        'POST /api/match/:candidateId': 'Match candidate with JD',
        'GET /api/match/batch/all': 'Batch match all candidates',
        'GET /api/match/ranking/top': 'Get top matching candidates',
        'GET /api/match/comparison/:id1/:id2': 'Compare two candidates',
        'GET /api/match/insights': 'Get matching insights'
      }
    }
  });
});

// Health Check Endpoint
app.get('/health', async (req, res) => {
  try {
    // Check Gemini API connection
    const geminiHealthy = await geminiService.healthCheck();

    // Check storage status
    const storageStatus = storage.getStatus();

    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        gemini: geminiHealthy ? 'healthy' : 'unhealthy',
        storage: 'healthy'
      },
      data: {
        hasJD: storageStatus.hasJD,
        candidatesCount: storageStatus.candidatesCount
      },
      environment: {
        nodeVersion: process.version,
        port: PORT,
        hasApiKey: !!process.env.GEMINI_API_KEY
      }
    };

    const httpStatus = geminiHealthy ? 200 : 503;
    res.status(httpStatus).json(health);

  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// API status endpoint
app.get('/api/status', (req, res) => {
  const storageStatus = storage.getStatus();

  res.json({
    success: true,
    data: {
      server: 'running',
      storage: storageStatus,
      apiReady: !!process.env.GEMINI_API_KEY,
      timestamp: new Date().toISOString()
    }
  });
});

// 404 error handling
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'API endpoint not found',
    code: 'NOT_FOUND',
    path: req.originalUrl,
    method: req.method,
    availableEndpoints: [
      'GET /',
      'GET /health',
      'GET /api/status',
      'POST /api/jd/parse',
      'GET /api/jd',
      'POST /api/candidates/import',
      'GET /api/candidates',
      'POST /api/match/:candidateId'
    ]
  });
});

// Global error handling
app.use((error, req, res, next) => {
  console.error('Server error:', error);

  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`
🚀 Candidate Compare Board Backend started successfully!
📍 Port: ${PORT}
🌐 Access: http://localhost:${PORT}
📋 Health check: http://localhost:${PORT}/health
📚 API docs: http://localhost:${PORT}/

Environment:
- Node.js: ${process.version}
- Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured ✅' : 'Not configured ❌'}
- Mode: ${process.env.NODE_ENV || 'development'}

${process.env.GEMINI_API_KEY ? '' : '⚠️  Please configure GEMINI_API_KEY in .env file'}
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Received SIGTERM signal, gracefully shutting down server...');
  storage.clear();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT signal, gracefully shutting down server...');
  storage.clear();
  process.exit(0);
});

module.exports = app;