const express = require("express");
const router = express.Router();

const {
  addMilestone,
  getMilestones,
  getMilestone,
  editMilestone,
  markCompleted,
  removeMilestone,
} = require("../controller/milestoneController");

const { verifyToken } = require("../middleware/verifyToken");

// Create milestone
router.post("/", verifyToken, addMilestone);

// Get milestones by goal
router.get("/goal/:goalId", verifyToken, getMilestones);

// Get milestone by ID
router.get("/:id", verifyToken, getMilestone);

// Update milestone
router.put("/:id", verifyToken, editMilestone);

// Mark completed
router.patch("/:id/complete", verifyToken, markCompleted);

// Delete milestone
router.delete("/:id", verifyToken, removeMilestone);

module.exports = router;