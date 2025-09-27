const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// 导入路由
const jdRoutes = require('./routes/jd');
const candidatesRoutes = require('./routes/candidates');
const matchingRoutes = require('./routes/matching');

// 导入服务（用于健康检查）
const geminiService = require('./services/geminiService');
const storage = require('./data/storage');

const app = express();
const PORT = process.env.PORT || 3002;

// 中间件配置
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// 请求日志中间件
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// API路由
app.use('/api/jd', jdRoutes);
app.use('/api/candidates', candidatesRoutes);
app.use('/api/match', matchingRoutes);

// 根路径
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

// 健康检查端点
app.get('/health', async (req, res) => {
  try {
    // 检查Gemini API连接
    const geminiHealthy = await geminiService.healthCheck();

    // 检查存储状态
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
    console.error('健康检查失败:', error);
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    });
  }
});

// API状态端点
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

// 404处理
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

// 全局错误处理
app.use((error, req, res, next) => {
  console.error('服务器错误:', error);

  res.status(500).json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`
🚀 Candidate Compare Board Backend启动成功!
📍 端口: ${PORT}
🌐 访问: http://localhost:${PORT}
📋 健康检查: http://localhost:${PORT}/health
📚 API文档: http://localhost:${PORT}/

环境配置:
- Node.js: ${process.version}
- Gemini API: ${process.env.GEMINI_API_KEY ? '已配置✅' : '未配置❌'}
- 开发模式: ${process.env.NODE_ENV || 'development'}

${process.env.GEMINI_API_KEY ? '' : '⚠️  请在.env文件中配置GEMINI_API_KEY'}
  `);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('收到SIGTERM信号，优雅关闭服务器...');
  storage.clear();
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n收到SIGINT信号，优雅关闭服务器...');
  storage.clear();
  process.exit(0);
});

module.exports = app;