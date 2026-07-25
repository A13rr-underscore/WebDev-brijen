const {
  createStreak,
  getStreakByGoal,
  updateStreak,
  deleteStreak,
} = require("../model/streakModel");

const addStreak = async (req, res) => {
  try {
    const { user_id, goal_id } = req.body;

    if (!user_id || !goal_id) {
      return res.status(400).json({
        message: "User ID and Goal ID are required.",
      });
    }

    const exists = await getStreakByGoal(goal_id);

    if (exists) {
      return res.status(400).json({
        message: "Streak already exists.",
      });
    }

    const streak = await createStreak(user_id, goal_id);

    res.status(201).json({
      message: "Streak created successfully.",
      streak,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getStreak = async (req, res) => {
  try {
    const { goalId } = req.params;

    const streak = await getStreakByGoal(goalId);

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found.",
      });
    }

    res.status(200).json(streak);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const editStreak = async (req, res) => {
  try {
    const { goalId } = req.params;

    const streak = await getStreakByGoal(goalId);

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found.",
      });
    }

    const today = new Date();
    const last = new Date(streak.last_updated);

    const diff =
      Math.floor((today - last) / (1000 * 60 * 60 * 24));

    let current = streak.current_streak;

    if (diff === 1) {
      current++;
    } else if (diff > 1) {
      current = 1;
    }

    const longest =
      current > streak.longest_streak
        ? current
        : streak.longest_streak;

    const updated = await updateStreak(
      streak.streak_id,
      current,
      longest,
      today,
    );

    res.status(200).json({
      message: "Streak updated.",
      streak: updated,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const removeStreak = async (req, res) => {
  try {
    const { goalId } = req.params;

    const streak = await deleteStreak(goalId);

    if (!streak) {
      return res.status(404).json({
        message: "Streak not found.",
      });
    }

    res.status(200).json({
      message: "Streak deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addStreak,
  getStreak,
  editStreak,
  removeStreak,
};