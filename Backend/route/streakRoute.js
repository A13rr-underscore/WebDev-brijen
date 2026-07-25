const express = require("express");
const router = express.Router();

const {
  addStreak,
  getStreak,
  editStreak,
  removeStreak,
} = require("../controller/streakController");

const { verifyToken } = require("../middleware/verifyToken");

router.post("/", verifyToken, addStreak);

router.get("/:goalId", verifyToken, getStreak);

router.put("/:goalId", verifyToken, editStreak);

router.delete("/:goalId", verifyToken, removeStreak);

module.exports = router;