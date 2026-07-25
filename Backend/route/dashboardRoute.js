const express = require("express");
const router = express.Router();

const {
  dashboardSummary,
  recentGoals,
  upcomingGoals,
  progressChart,
  todayReminders,
} = require("../controller/dashboardController");

const { verifyToken } = require("../middleware/verifyToken");

// Dashboard summary
router.get("/", verifyToken, dashboardSummary);

// Recent goals
router.get("/recent-goals", verifyToken, recentGoals);

// Upcoming deadlines
router.get("/upcoming", verifyToken, upcomingGoals);

// Progress chart
router.get("/progress-chart", verifyToken, progressChart);

module.exports = router;