import express from "express";
import {
  getUser,
  getUserCount,
  loginUser,
  logout,
  registerUser,
  requestResetPassword,
  resendVerifyEmail,
  resetPassword,
  verifyEmail,
} from "../controllers/userController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.get("/verify/:verificationToken", verifyEmail);
userRouter.post("/resend-verification", resendVerifyEmail);
userRouter.post("/request-reset", requestResetPassword);
userRouter.post("/reset/:resetPasswordToken", resetPassword);
userRouter.post("/login", loginUser);
userRouter.post("/logout", protect, logout);
userRouter.get("/data", protect, getUser);
userRouter.get("/count", protect, adminOnly, getUserCount);

export default userRouter;
