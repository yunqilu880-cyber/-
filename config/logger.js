/**
 * 智慧农业电商平台 - 结构化日志
 * 
 * 用法：
 *   const logger = require('../config/logger');
 *   logger.info('用户登录', { userId: 1 });
 *   logger.error('支付失败', { error: err.message, orderId: 5 });
 */
const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    // 控制台输出（开发环境使用可读格式）
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
          return `${timestamp} [${level}] ${message}${metaStr}`;
        })
      ),
    }),
    // 文件输出（生产环境持久化）
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'error.log'),
      level: 'error',
      maxsize: 5 * 1024 * 1024, // 5MB 轮转
      maxFiles: 5,
    }),
    new winston.transports.File({
      filename: path.join(__dirname, '..', 'logs', 'combined.log'),
      maxsize: 10 * 1024 * 1024, // 10MB 轮转
      maxFiles: 10,
    }),
  ],
});

module.exports = logger;