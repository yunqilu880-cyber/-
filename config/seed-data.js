/**
 * 已废弃 - 请使用统一脚本: node config/init-db.js --seed
 * 此文件保留仅为向后兼容，进程参数覆写确保正确模式。
 */
console.log('⚠️  此脚本已废弃，请改用: node config/init-db.js --seed\n');
process.argv[2] = '--seed';
require('./init-db');