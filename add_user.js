const bcrypt = require('bcryptjs');
const m = require('mysql2/promise');
require('dotenv').config();
(async () => {
  const c = await m.createConnection({ host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME });
  const h = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'changeme', 10);
  await c.query('INSERT INTO users (username,password,name) VALUES (?,?,?) ON DUPLICATE KEY UPDATE password=?,name=?', ['1', h, '账号1', h, '账号1']);
  await c.query('INSERT INTO users (username,password,name) VALUES (?,?,?) ON DUPLICATE KEY UPDATE password=?,name=?', ['13912345678', h, '测试用户', h, '测试用户']);
  console.log('✅ 账户创建成功');
  await c.end();
})();