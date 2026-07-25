const {
  createGoal,
  getGoalsByUser,
  updateGoal,
  deleteGoal,
  getGoalProgress,
} = require("../model/goalModel");

// Add Goal
const createGoalController = async (req, res) => {
  try {
const { title, description, category, deadline, progress } = req.body;
    if (!title) {
      return res.status(400).json({
        message: "Title is required.",
      });
    }

    const goal = await createGoal(
      req.user.user_id,
      title,
      description,
      category,
      deadline,
      progress,
    );

    res.status(201).json({
      message: "Goal created successfully.",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Goals
const getGoals = async (req, res) => {
  try {
    const goals = await getGoalsByUser(req.user.user_id);

    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Goal
const editGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      category,
      deadline,
      progress,
      status,
    } = req.body;

    const goal = await updateGoal(
  id,
  req.user.user_id,
  title,
  description,
  category,
  deadline,
  progress,
  status
    );

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    res.json({
      message: "Goal updated successfully.",
      goal,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Goal
const removeGoal = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await deleteGoal(
      id,
      req.user.user_id
    );

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    res.json({
      message: "Goal deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProgressChart = async (req, res) => {
  try {
    const progress = await getGoalProgress(req.user.user_id);

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createGoalController,
  getGoals,
  editGoal,
  removeGoal,
  getProgressChart
};