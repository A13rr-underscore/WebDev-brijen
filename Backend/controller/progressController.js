const {
  addProgress,
  getProgressByGoal,
  updateProgress,
  deleteProgress,
} = require("../model/progressModel");

const pool = require("../database/db");

// Add Progress
const createProgress = async (req, res) => {
  try {
    const { goal_id, progress_value, notes } = req.body;

    if (!goal_id || progress_value == null) {
      return res.status(400).json({
        message: "Goal ID and progress are required.",
      });
    }

    const progress = await addProgress(
      goal_id,
      progress_value,
      notes
    );

    // Automatically update goal status
    if (progress_value >= 100) {
      await pool.query(
        `UPDATE goals
         SET status='completed'
         WHERE goal_id=$1`,
        [goal_id]
      );
    }

    res.status(201).json({
      message: "Progress added successfully.",
      progress,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Progress History
const getProgress = async (req, res) => {
  try {
    const { goalId } = req.params;

    const progress = await getProgressByGoal(goalId);

    res.status(200).json(progress);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Progress
const editProgress = async (req, res) => {
  try {
    const { id } = req.params;
    const { progress_value, notes } = req.body;

    const progress = await updateProgress(
      id,
      progress_value,
      notes
    );

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found.",
      });
    }

    res.status(200).json({
      message: "Progress updated.",
      progress,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Progress
const removeProgress = async (req, res) => {
  try {
    const { id } = req.params;

    const progress = await deleteProgress(id);

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found.",
      });
    }

    res.status(200).json({
      message: "Progress deleted.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProgress,
  getProgress,
  editProgress,
  removeProgress,
};