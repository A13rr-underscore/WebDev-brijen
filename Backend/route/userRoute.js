const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  changePassword,
  changeUsername,
  uploadProfileImage,
  forgotPassword,
  resetPassword, 
} = require("../controller/userController");

const authMiddleware = require("../middleware/authMiddleware");

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile
router.get("/profile", authMiddleware, getProfile);

// Get users
router.get("/", getUsers);

// Change password
router.put("/change-password", authMiddleware, changePassword);

// Change username
router.put("/change-username", authMiddleware, changeUsername);

// Forgot password
router.post("/forgot-password", forgotPassword);

// Reset password
router.post("/reset-password/:token", resetPassword);

module.exports = router;