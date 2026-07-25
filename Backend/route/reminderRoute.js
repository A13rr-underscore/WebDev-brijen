const express = require("express");
const router = express.Router();

const {
  addReminder,
  getReminders,
  getReminder,
  editReminder,
  toggleReminderStatus,
  removeReminder,
} = require("../controller/reminderController");

const { verifyToken } = require("../middleware/verifyToken");

// Create reminder
router.post("/", verifyToken, addReminder);

// Get all reminders
router.get("/", verifyToken, getReminders);

// Get reminder by ID
router.get("/:id", verifyToken, getReminder);

// Update reminder
router.put("/:id", verifyToken, editReminder);

// Toggle reminder status
router.patch("/:id/toggle", verifyToken, toggleReminderStatus);

// Delete reminder
router.delete("/:id", verifyToken, removeReminder);

module.exports = router;