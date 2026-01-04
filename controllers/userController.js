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


export const sendLoginOTP = async (req, res) => {
  try {
    console.log("req.body.email:", req.body.email);

    await userService.sendLoginOTP({
      email: req.body.email,
    });

    res.json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const verifyLoginOTP = async (req, res) => {
  try {
    const token = await userService.verifyLoginOTP(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
