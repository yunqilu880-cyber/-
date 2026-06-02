/**
 * 已废弃 - 请使用统一脚本: node config/init-db.js --products
 * 此文件保留仅为向后兼容。
 */
console.log('⚠️  此脚本已废弃，请改用: node config/init-db.js --products\n');
process.argv[2] = '--products';
require('./config/init-db');