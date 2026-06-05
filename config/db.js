const mysql = require('mysql2/promise');
require('dotenv').config();

const requiredEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return process.env[name];
};

const pool = mysql.createPool({
  host: requiredEnv('DB_HOST'),
  port: process.env.DB_PORT || 3306,
  user: requiredEnv('DB_USER'),
  password: requiredEnv('DB_PASSWORD'),
  database: requiredEnv('DB_NAME'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
