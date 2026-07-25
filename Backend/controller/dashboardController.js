const {
  getDashboardSummary,
  getRecentGoals,
  getUpcomingGoals,
  getProgressChart,
} = require("../model/dashboardModel");

// Dashboard Summary
const dashboardSummary = async (req, res) => {
  try {
    const data = await getDashboardSummary(req.user.user_id);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Recent Goals
const recentGoals = async (req, res) => {
  try {
    const data = await getRecentGoals(req.user.user_id);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Upcoming Deadlines
const upcomingGoals = async (req, res) => {
  try {
    const data = await getUpcomingGoals(req.user.user_id);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Progress Chart
const progressChart = async (req, res) => {
  try {
    const data = await getProgressChart(req.user.user_id);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


module.exports = {
  dashboardSummary,
  recentGoals,
  upcomingGoals,
  progressChart,
};