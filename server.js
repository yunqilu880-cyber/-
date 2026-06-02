const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const logger = require('./config/logger');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
// helmet 在开发阶段禁用（安全头可能导致外部浏览器加载失败）
// app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========== API 请求频率限制 ==========

// 通用 API 限流：每个 IP 每分钟 200 次
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 分钟窗口
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, msg: '请求过于频繁，请稍后再试' },
});

// 认证接口限流：每个 IP 每分钟 10 次（防暴力破解）
const authLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 分钟窗口
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { code: 429, msg: '登录/注册请求过于频繁，请 1 分钟后重试' },
});

// 全局 API 限流
app.use('/api', generalLimiter);
// 登录注册接口更严格的限流
app.use('/api/users/login', authLimiter);
app.use('/api/users/register', authLimiter);

// 安全拦截：阻止访问后端敏感文件和目录
app.use((req, res, next) => {
  const path = req.path.toLowerCase();
  const forbiddenDirs = ['/config', '/routes', '/middleware', '/node_modules', '/.git'];
  const forbiddenFiles = [
    '/.env', '/server.js', '/package.json', '/package-lock.json',
    '/add_user.js', '/import_products.js', '/products_export.json',
    '/nginx-shop.conf', '/chase-landing-page-template.tar.gz'
  ];
  // 阻止敏感目录
  if (forbiddenDirs.some(d => path === d || path.startsWith(d + '/'))) {
    return res.status(404).send('Not Found');
  }
  // 阻止敏感文件
  if (forbiddenFiles.includes(path) || path.endsWith('.env')) {
    return res.status(404).send('Not Found');
  }
  next();
});

// 静态文件（仅前端资源：HTML、CSS、JS、图片）
app.use(express.static(__dirname));           // 根目录的 HTML 文件
app.use('/css', express.static(__dirname + '/css'));
app.use('/js', express.static(__dirname + '/js'));
app.use('/images', express.static(__dirname + '/images'));

// 路由
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/addresses', require('./routes/addresses'));
app.use('/api/admin', require('./routes/admin'));

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ code: 200, msg: 'ok', time: new Date().toISOString() });
});

// ========== 图片上传 ==========

// 确保 uploads 目录存在
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// multer 配置：限制 5MB，仅允许图片
const storage = multer.diskStorage({
  destination: uploadsDir,
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + ext;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowed = /\.(jpg|jpeg|png|gif|webp)$/i;
    if (allowed.test(path.extname(file.originalname))) {
      cb(null, true);
    } else {
      cb(new Error('仅支持 jpg/png/gif/webp 格式的图片'));
    }
  },
});

// 上传接口（需要管理员登录）
app.post('/api/upload', require('./middleware/auth'), upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ code: 400, msg: '请选择文件' });
  }
  const url = '/uploads/' + req.file.filename;
  res.json({ code: 200, msg: '上传成功', data: { url, filename: req.file.filename } });
});

// 上传目录静态服务
app.use('/uploads', express.static(uploadsDir));

// multer 错误处理中间件
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ code: 400, msg: '文件大小不能超过 5MB' });
    }
    return res.status(400).json({ code: 400, msg: err.message });
  }
  if (err.message && err.message.includes('仅支持')) {
    return res.status(400).json({ code: 400, msg: err.message });
  }
  next(err);
});

// 404
app.use((req, res) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ code: 404, msg: '接口不存在' });
  }
  // 非 API 请求返回首页（SPA 模式）
  res.redirect('/');
});

// 错误处理
app.use((err, req, res, next) => {
  console.error('服务器错误:', err);
  res.status(500).json({ code: 500, msg: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 智慧农业电商后端已启动`);
  console.log(`   地址：http://localhost:${PORT}`);
  console.log(`   API：http://localhost:${PORT}/api/health\n`);
});