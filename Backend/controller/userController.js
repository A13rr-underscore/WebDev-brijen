const {
  createUser,
  findUserByEmail,
  findUserByUsername,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUserById,
  updatePassword, 
  updateProfileImage
} = require("../model/userModel");
const sendEmail = require("../utils/sendEmail");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../database/db");

const registerUser = async (req, res) => {
  try {
    const { full_name, username, email, password } = req.body;

    if (!full_name || !username || !email || !password) {
      return res.status(400).json({
        message: "Please fill in all fields.",
      });
    }

    const usernameExists = await findUserByUsername(username);
    if (usernameExists) {
      return res.status(400).json({
        message: "Username already exists.",
      });
    }

    const emailExists = await findUserByEmail(email);
    if (emailExists) {
      return res.status(400).json({
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await createUser(
      full_name,
      username,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: "User registered successfully.",
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed.",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please enter email and password.",
      });
    }

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Invalid password.",
      });
    }

    const token = jwt.sign(
      { user_id: user.user_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Login failed.",
      error: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const user = await findUserById(req.user.user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    res.status(200).json({
      user: {
        user_id: user.user_id,
        full_name: user.full_name,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile.",
      error: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Please enter all fields",
      });
    }

    const user = await findUserById(req.user.user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const match = await bcrypt.compare(currentPassword, user.password);

    if (!match) {
      return res.status(401).json({
        message: "Current password incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await updatePassword(req.user.user_id, hashedPassword);

    res.json({
      message: "Password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Password update failed",
    });
  }
};

const changeUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username required",
      });
    }

    const user = await findUserById(req.user.user_id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const updatedUser = await updateUser(
      req.user.user_id,
      user.full_name,
      username,
      user.email
    );

    res.status(200).json({
      message: "Username updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Username update failed",
    });
  }
};

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const image = `/uploads/${req.file.filename}`;

    await updateProfileImage(req.user.user_id, image);

    res.status(200).json({
      message: "Image uploaded successfully",
      image: image,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Image upload failed",
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found with this email." });
    }

    // 1. Generate a JWT token containing the user_id that expires in 15 minutes
    const resetToken = jwt.sign(
      { user_id: user.user_id },
      process.env.RESET_SECRET,
      { expiresIn: "15m" }
    );

    // 2. Construct the frontend URL (adjust port 5173/3000 to match your frontend dev server)
    const resetUrl = `http://localhost:5173/reset-password/${resetToken}`;

    // 3. Send email with a clickable link
    await sendEmail({
      email: user.email,
      subject: "Password Reset Request",
      message: `Click here to reset your password: ${resetUrl}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset. Click the button below to reset your password. This link is valid for <strong>15 minutes</strong>.</p>
          <a href="${resetUrl}" style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0;">Reset Password</a>
          <p>If button doesn't work, copy and paste this link: <br> <a href="${resetUrl}">${resetUrl}</a></p>
        </div>
      `,
    });

    res.status(200).json({
      message: "Password reset email sent successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Could not send password reset email.",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    // Accepts any common key name from frontend
    const newPassword = req.body.newPassword || req.body.password || req.body.new_password;

    if (!newPassword) {
      return res.status(400).json({
        message: "New password is required.",
      });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.RESET_SECRET);
    } catch (err) {
      return res.status(400).json({ message: "Invalid or expired reset token." });
    }

    const user = await findUserById(decoded.user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await updatePassword(user.user_id, hashedPassword);

    res.status(200).json({
      message: "Password reset successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Password reset failed.",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getUsers,
  changePassword,
  changeUsername,
  uploadProfileImage,
  forgotPassword,
  resetPassword,
};