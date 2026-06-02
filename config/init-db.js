/**
 * 智慧农业电商平台 - 统一数据库初始化脚本
 *
 * 用法：
 *   node config/init-db.js              → 完整初始化（建库 + 建表 + 导入分类和商品）
 *   node config/init-db.js --seed       → 仅重置并导入数据（不清除表结构）
 *   node config/init-db.js --products   → 仅导入商品数据
 *   node config/init-db.js --tables     → 仅创建表结构（不导入数据）
 */
const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const fs = require('fs');
const path = require('path');

// ==========================================
// 工具函数
// ==========================================

/** 批量导入商品 */
async function importProducts(connection) {
  const productsPath = path.resolve(__dirname, '../products_export.json');
  if (!fs.existsSync(productsPath)) {
    console.log('⚠️  未找到 products_export.json，跳过商品导入');
    return 0;
  }

  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
  // 先清空已有商品
  await connection.query('DELETE FROM products');
  await connection.query('ALTER TABLE products AUTO_INCREMENT = 1');

  for (const p of products) {
    await connection.query(
      `INSERT INTO products (id, name, description, price, original_price, stock, image, category_id, badge, weight, specs, is_featured, is_on_sale, sales)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.name, p.description, p.price, p.original_price, p.stock, p.image, p.category_id, p.badge, p.weight, p.specs, p.is_featured, p.is_on_sale, p.sales || 0]
    );
  }
  console.log(`✅ 已导入 ${products.length} 条商品数据`);
  return products.length;
}

/** 导入分类 */
async function seedCategories(connection) {
  await connection.query('DELETE FROM categories');
  await connection.query('ALTER TABLE categories AUTO_INCREMENT = 1');

  const [result] = await connection.query(`
    INSERT INTO categories (id, name, icon, sort_order) VALUES
    (1, '时令水果', '🍑', 1),
    (2, '精品蔬菜', '🥬', 2),
    (3, '粮油干货', '🌾', 3),
    (4, '禽蛋肉类', '🥚', 4)
  `);
  console.log(`✅ 插入 ${result.affectedRows} 条分类数据`);
}

/** 创建表结构（从 init.sql 读取） */
async function createTables(connection) {
  const sqlPath = path.resolve(__dirname, 'init.sql');
  let sql = fs.readFileSync(sqlPath, 'utf8');

  // 移除 USE 语句和注释
  sql = sql
    .replace(/^USE chase_shop;\s*/i, '')
    .replace(/--.*$/gm, '')
    .replace(/\/\*[\s\S]*?\*\//g, '');

  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  let created = 0;
  for (const stmt of statements) {
    // 跳过 INSERT 语句（这些由 seed 步骤处理）
    if (/^\s*INSERT\s+/i.test(stmt)) continue;

    try {
      await connection.query(stmt);
      created++;
    } catch (err) {
      if (err.code === 'ER_TABLE_EXISTS_ERROR') {
        console.log(`⚠️  表已存在，跳过: ${stmt.substring(0, 50)}...`);
      } else {
        console.log(`⚠️  ${err.message} (语句: ${stmt.substring(0, 60)}...)`);
      }
    }
  }

  console.log(`✅ 数据库表结构创建完成（${created} 条 DDL 执行）`);
}

// ==========================================
// 主流程
// ==========================================
async function main() {
  const mode = process.argv[2] || '--full'; // full | seed | products | tables

  let connection;
  try {
    // 连接（不指定数据库 → 先建库；已指定 → 直接使用）
    if (mode === '--full' || mode === '--tables') {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'your_database_user',
        password: process.env.DB_PASSWORD,
        charset: 'utf8mb4',
      });

      await connection.query(`
        CREATE DATABASE IF NOT EXISTS chase_shop
        CHARACTER SET utf8mb4
        COLLATE utf8mb4_unicode_ci
      `);
      console.log('✅ 数据库 chase_shop 已就绪');
      await connection.query('USE chase_shop');
    } else {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        user: process.env.DB_USER || 'your_database_user',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'chase_shop',
        charset: 'utf8mb4',
      });
    }

    console.log('✅ 数据库连接成功');
    console.log(`📍 运行模式: ${mode}`);
    console.log('');

    // 按模式执行不同操作
    switch (mode) {
      case '--full':
        await createTables(connection);
        await seedCategories(connection);
        await importProducts(connection);
        break;

      case '--tables':
        await createTables(connection);
        break;

      case '--seed':
        // 不清除表结构，只重置并导入数据
        await connection.query('DELETE FROM products');
        await connection.query('ALTER TABLE products AUTO_INCREMENT = 1');
        await seedCategories(connection);
        await importProducts(connection);
        break;

      case '--products':
        await importProducts(connection);
        break;

      default:
        console.log(`❌ 未知模式: ${mode}`);
        console.log('   可用模式: --full | --tables | --seed | --products');
        await connection.end();
        process.exit(1);
    }

    // 验证结果
    console.log('');
    console.log('📊 当前数据库包含以下表：');
    const [tables] = await connection.query('SHOW TABLES');
    tables.forEach(t => console.log(`   - ${Object.values(t)[0]}`));

    const [catCount] = await connection.query('SELECT COUNT(*) as cnt FROM categories');
    const [prodCount] = await connection.query('SELECT COUNT(*) as cnt FROM products');
    console.log(`\n📈 数据统计: ${catCount[0].cnt} 个分类, ${prodCount[0].cnt} 个商品`);

    await connection.end();
    console.log('\n🎉 初始化完成！');
    process.exit(0);
  } catch (err) {
    console.error('❌ 初始化失败:', err.message);
    if (connection) await connection.end();
    process.exit(1);
  }
}

main();