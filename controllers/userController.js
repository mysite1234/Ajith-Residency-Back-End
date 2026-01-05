import userService from "../services/userService.js";

export const registerUser = async (req, res) => {
  try {
    const result = await userService.registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await userService.loginUser({ email, password });

    return res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};

// ======================
// SEND LOGIN OTP ✅ FIXED
// ======================
export const sendLoginOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const result = await userService.sendLoginOTP(email);

    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ======================
// VERIFY LOGIN OTP ✅ FIXED
// ======================
export const verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const result = await userService.verifyLoginOTP(email, otp);

    res.status(200).json({
      message: "Login successful",
      data: result,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
