import db from "../config/db.js";
const otpModel = {
  create: async ({ email, otp_code, expires_at }) => {
    await db.query(
      `INSERT INTO user_otps (email, otp_code, expires_at, is_used)
       VALUES ($1, $2, $3, false)`,
      [email, otp_code, expires_at]
    );
  },

  findValidOTP: async (email, otp) => {
    const result = await db.query(
      `SELECT * FROM user_otps
       WHERE email=$1
         AND otp_code=$2
         AND is_used=false
         AND expires_at > NOW()
       ORDER BY created_at DESC
       LIMIT 1`,
      [email, otp]
    );
    return result.rows[0];
  },

  markAsUsed: async (id) => {
    await db.query(
      `UPDATE user_otps SET is_used=true WHERE id=$1`,
      [id]
    );
  },

  invalidateOldOtps: async (email) => {
    await db.query(
      `UPDATE user_otps SET is_used=true WHERE email=$1`,
      [email]
    );
  },
};

export default otpModel;
