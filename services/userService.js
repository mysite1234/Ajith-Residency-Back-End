import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import otpModel from "../models/otpModel.js";
import { generateToken } from "../utils/jwtUtils.js";
import { sendOTPEmail } from "../utils/emailUtils.js";

const userService = {
  // ======================
  // REGISTER (PASSWORD)
  // ======================
  registerUser: async ({ email, password }) => {
    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await userModel.createUser({
      email,
      passwordHash,
    });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  },

  // ======================
  // LOGIN (PASSWORD)
  // ======================
  loginUser: async ({ email, password }) => {
    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    if (!user.is_active) {
      throw new Error("Account is inactive");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },

  // ======================
  // SEND OTP (LOGIN)
  // ======================
  sendLoginOTP: async (email) => {
    console.log("sendLoginOTPEmail:", email);

    if (!email) {
      throw new Error("Email is required");
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      throw new Error("User not registered");
    }

    // Invalidate old OTPs
    await otpModel.invalidateOldOtps(email);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

    await otpModel.create({
      email,
      otp_code: otp,
      expires_at: expiresAt,
    });

    await sendOTPEmail(email, otp);

    console.log("LOGIN OTP:", otp);

    return { message: "OTP sent to email" };
  },

  // ======================
  // VERIFY OTP (LOGIN)
  // ======================
  verifyLoginOTP: async (email, otp) => {
    if (!email || !otp) {
      throw new Error("Email and OTP are required");
    }

    const record = await otpModel.findValidOTP(email, otp);
    if (!record) {
      throw new Error("Invalid or expired OTP");
    }

    await otpModel.markAsUsed(record.id);

    const user = await userModel.findByEmail(email);
    if (!user || !user.is_active) {
      throw new Error("Account inactive");
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
    });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },
};

export default userService;
