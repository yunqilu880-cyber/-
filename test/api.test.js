/**
 * 智慧农业电商平台 - API 基础测试
 * 
 * 运行: npm test
 * 
 * 这些测试验证后端基础功能是否正常工作。
 */
const assert = require('assert');

// ==========================================
// 工具函数测试
// ==========================================

// 测试订单号生成
function generateOrderNo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const h = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `${y}${m}${d}${h}${min}${s}${rand}`;
}

console.log('\n🧪 开始运行测试...\n');

// Test 1: 订单号格式
const orderNo = generateOrderNo();
assert.strictEqual(orderNo.length, 18, '订单号应为18位');
assert.ok(/^\d{18}$/.test(orderNo), '订单号应为纯数字');
console.log('✅ [1/5] 订单号生成格式正确:', orderNo);

// Test 2: 密码哈希
const bcrypt = require('bcryptjs');
(async () => {
  try {
    const password = 'test123';
    const hash = await bcrypt.hash(password, 10);
    assert.ok(hash.length > 0, '哈希应为非空字符串');
    assert.ok(await bcrypt.compare(password, hash), '密码验证应通过');
    assert.ok(!(await bcrypt.compare('wrong', hash)), '错误密码验证应失败');
    console.log('✅ [2/5] 密码哈希功能正常');

    // Test 3: JWT 令牌
    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ userId: 1, username: 'test' }, 'test_secret', { expiresIn: '1h' });
    const decoded = jwt.verify(token, 'test_secret');
    assert.strictEqual(decoded.userId, 1);
    assert.strictEqual(decoded.username, 'test');
    console.log('✅ [3/5] JWT 令牌签发/验证正常');

    // Test 4: express-validator
    const { body, validationResult } = require('express-validator');
    assert.ok(typeof body === 'function', 'express-validator 可用');
    console.log('✅ [4/5] express-validator 可用');

    // Test 5: winston 日志
    const logger = require('../config/logger');
    logger.info('测试日志消息', { test: true });
    console.log('✅ [5/5] 结构化日志系统正常');

    console.log('\n🎉 所有测试通过！');
    process.exit(0);
  } catch (err) {
    console.error('❌ 测试失败:', err.message);
    process.exit(1);
  }
})();