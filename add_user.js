/**
 * 智慧农业 - 创建测试账户脚本
 * 
 * 用法: node add_user.js
 * 
 * 安全提醒：此脚本仅用于开发/测试环境！
 * 生产环境请修改为强密码或移除此文件。
 */
const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  console.log('🔧 正在创建测试账户...\n');

  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  // 密码哈希
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    throw new Error('Missing required environment variable: ADMIN_PASSWORD');
  }
  const hash = await bcrypt.hash(password, 10);


  // 创建管理员账号
  await connection.query(
    'INSERT INTO users (username, password, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password = ?, name = ?',
    ['admin', hash, '管理员', hash, '管理员']
  );
  await connection.query('UPDATE users SET role = "admin" WHERE username = "admin"');
  console.log('✅ 管理员账户: admin / <ADMIN_PASSWORD>');

  // 创建普通测试用户
  await connection.query(
    'INSERT INTO users (username, password, name) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE password = ?, name = ?',
    ['13912345678', hash, '测试用户', hash, '测试用户']
  );
  console.log('✅ 测试用户: 13912345678 / <ADMIN_PASSWORD>');

  console.log('\n🎉 账户创建完成！');
  console.log('⚠️  提醒：生产环境请删除此脚本或使用强密码！');
  await connection.end();
})();
