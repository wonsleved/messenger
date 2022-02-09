const Pool = require('pg').Pool;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  idleTimeoutMillis: process.env.DB_TIMEOUT,
  database: process.env.DB_NAME,
});

module.exports = pool;
