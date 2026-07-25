const express = require("express");
const router = express.Router();

const {
  createGoalController,
  getGoals,
  editGoal,
  removeGoal,
} = require("../controller/goalController");

const { verifyToken } = require("../middleware/verifyToken");

// Create Goal
router.post("/", verifyToken, createGoalController);

// Get All Goals
router.get("/", verifyToken, getGoals);

// Update Goal
router.put("/:id", verifyToken, editGoal);
// Delete Goal
router.delete("/:id", verifyToken, removeGoal);

module.exports = router;