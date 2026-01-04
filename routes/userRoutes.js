// routes/userRoutes.js
import express from "express";
import { validateRegister } from "../validators/userValidator.js";
import { registerUser } from "../controllers/userController.js";
import { login } from "../controllers/userController.js";
import { sendLoginOTP } from "../controllers/userController.js";
import { verifyLoginOTP } from "../controllers/userController.js";

const router = express.Router();

// ✅ use the correct function name
router.post("/login",login);
router.post("/register", validateRegister, registerUser);
router.post("/login/send-otp", sendLoginOTP);
router.post("/login/verify-otp", verifyLoginOTP);


export default router;
