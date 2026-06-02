const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
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