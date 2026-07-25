const {
  createMilestone,
  getMilestonesByGoal,
  getMilestoneById,
  updateMilestone,
  completeMilestone,
  deleteMilestone,
} = require("../model/milestoneModel");

// Create milestone
const addMilestone = async (req, res) => {
  try {
    const { goal_id, title, due_date } = req.body;

    if (!goal_id || !title) {
      return res.status(400).json({
        message: "Goal ID and title are required.",
      });
    }

    const milestone = await createMilestone(
      goal_id,
      title,
      due_date
    );

    res.status(201).json({
      message: "Milestone created successfully.",
      milestone,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get milestones of a goal
const getMilestones = async (req, res) => {
  try {
    const { goalId } = req.params;

    const milestones = await getMilestonesByGoal(goalId);

    res.status(200).json(milestones);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get milestone by ID
const getMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await getMilestoneById(id);

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found.",
      });
    }

    res.status(200).json(milestone);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update milestone
const editMilestone = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, due_date, is_completed } = req.body;

    const milestone = await updateMilestone(
      id,
      title,
      due_date,
      is_completed
    );

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found.",
      });
    }

    res.status(200).json({
      message: "Milestone updated successfully.",
      milestone,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Complete milestone
const markCompleted = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await completeMilestone(id);

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found.",
      });
    }

    res.status(200).json({
      message: "Milestone marked as completed.",
      milestone,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete milestone
const removeMilestone = async (req, res) => {
  try {
    const { id } = req.params;

    const milestone = await deleteMilestone(id);

    if (!milestone) {
      return res.status(404).json({
        message: "Milestone not found.",
      });
    }

    res.status(200).json({
      message: "Milestone deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addMilestone,
  getMilestones,
  getMilestone,
  editMilestone,
  markCompleted,
  removeMilestone,
};