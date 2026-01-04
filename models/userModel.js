import pool from "../config/db.js";

const userModel = {
  findByEmail: async (email) => {
    console.log("Email",email);
    
    const query = `
      SELECT * FROM users WHERE email = $1
    `;
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  },

  createUser: async ({ email, passwordHash }) => {
    const query = `
      INSERT INTO users (email, password_hash, is_email_verified)
      VALUES ($1, $2, false)
      RETURNING id, email
    `;
    const { rows } = await pool.query(query, [email, passwordHash]);
    return rows[0];
  },
};

export default userModel;
