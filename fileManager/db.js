// db.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'file_manager',
  password: '9835',
  port: 5432, // Default PostgreSQL port
});

module.exports = pool;
