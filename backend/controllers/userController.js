import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import sendEmail from "../utility/sendEmail.js";
import crypto from "crypto";

// Generate JWT
const generateToken = (id, tokenVersion) => {
  return jwt.sign({ id, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// API to register user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.json({ success: false, message: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationTokenExpires = Date.now() + 15 * 60 * 1000;

    const user = await User.create({
      name,
      email,
      password,
      verificationToken,
      verificationTokenExpires,
    });

    const verifyUrl = `${process.env.BASE_URL}/verify/${verificationToken}`;

    await sendEmail(
      user.email,
      "Verify your account",
      `Click here to verify your account: ${verifyUrl}`
    );

    return res.json({
      success: true,
      message:
        "Registration successful. Check your email to verify your account.",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to verify email
export const verifyEmail = async (req, res) => {
  try {
    const { verificationToken } = req.params;

    const user = await User.findOne({
      verificationToken,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: "Invalid or expired token" });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;

    await user.save();

    const token = generateToken(user._id, user.tokenVersion);

    return res.json({
      success: true,
      message: "Email verified successfully",
      token,
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//API to resend verify email
export const resendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.isVerified) {
      return res.json({ success: false, message: "User is already verified" });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    user.verificationToken = verificationToken;
    user.verificationTokenExpires = Date.now() + 15 * 60 * 1000;

    await user.save();

    const verifyUrl = `${process.env.BASE_URL}/verify/${verificationToken}`;

    await sendEmail(
      user.email,
      "Verify your account",
      `Click here to verify your account: ${verifyUrl}`
    );

    return res.json({ success: true, message: "Verification email resent" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to request reset password
export const requestResetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    const resetPasswordToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpires = Date.now() + 15 * 60 * 1000;

    user.save();

    const resetUrl = `${process.env.BASE_URL}/reset/${resetPasswordToken}`;

    await sendEmail(
      email,
      "Password reset required",
      `Click here to reset your password: ${resetUrl}`
    );

    return res.json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to reset password
export const resetPassword = async (req, res) => {
  try {
    const { resetPasswordToken } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    user.tokenVersion += 1;

    await user.save();
    return res.json({ success: true, message: "Password reset successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch && user.isVerified) {
        const token = generateToken(user._id, user.tokenVersion);
        return res.json({ success: true, token });
      }

      if (isMatch && !user.isVerified) {
        req.body.email = email;
        return resendVerifyEmail(req, res);
      }
    }
    return res.json({ success: false, message: "Invalid email or password" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to get user data
export const getUser = async (req, res) => {
  try {
    const { _id, name, email, isVerified, role } = req.user;
    return res.json({ success: true, user: { _id, name, email, isVerified, role } });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// API to logout
export const logout = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    user.tokenVersion += 1;
    await user.save();

    return res.json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};


// API to get user count (Admin Only)
export const getUserCount = async (req, res) => {
  try {
    const count = await User.countDocuments();
    return res.json({success: true, count});
  } catch (error) {
    return res.json({success: false, message: error.message})
  }
}
