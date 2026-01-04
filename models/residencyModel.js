import pool from "../config/db.js";

const residencyModel = {
  
  createResidency: async (data) => {
    const { name, address, landmark, contact, email } = data;

    const query = `
      INSERT INTO residencies (name, address, landmark, contact, email)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [name, address, landmark, contact, email];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // GET ALL
  getAllResidencies: async () => {
    const result = await pool.query(
      "SELECT * FROM residencies ORDER BY id DESC"
    );
    return result.rows;
  },

  // UPDATE
  updateResidency: async (id, data) => {
    const { name, address, landmark, contact, email } = data;

    const query = `
      UPDATE residencies
      SET 
        name=$1,
        address=$2,
        landmark=$3,
        contact=$4,
        email=$5
      WHERE id=$6
      RETURNING *;
    `;

    const values = [name, address, landmark, contact, email, id];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  // DELETE ✅
  deleteResidency: async (id) => {
    const query = `
      DELETE FROM residencies
      WHERE id = $1
      RETURNING *;
    `;

    const result = await pool.query(query, [id]);
    return result.rows[0]; // deleted row
  }
};

export default residencyModel;
