import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),  // ✅ convert to number
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,  // ✅ must be a string
  database: process.env.DB_NAME,
});

pool.connect()
  .then(() => console.log('✅ PostgreSQL connected'))
  .catch((err) => console.error('❌ Connection error:', err.message));

export default pool;
