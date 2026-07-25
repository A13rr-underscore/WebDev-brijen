const pool = require("../database/db");

const createStreak = async (user_id, goal_id) => {
  const result = await pool.query(
    `INSERT INTO streaks
    (user_id, goal_id, current_streak, longest_streak, last_updated)
    VALUES ($1,$2,0,0,CURRENT_DATE)
    RETURNING *`,
    [user_id, goal_id]
  );

  return result.rows[0];
};

const getStreakByGoal = async (goal_id) => {
  const result = await pool.query(
    `SELECT * FROM streaks
     WHERE goal_id=$1`,
    [goal_id]
  );

  return result.rows[0];
};

const updateStreak = async (
  streak_id,
  current_streak,
  longest_streak,
  last_updated
) => {
  const result = await pool.query(
    `UPDATE streaks
     SET current_streak=$1,
         longest_streak=$2,
         last_updated=$3
     WHERE streak_id=$4
     RETURNING *`,
    [
      current_streak,
      longest_streak,
      last_updated,
      streak_id,
    ]
  );

  return result.rows[0];
};

const deleteStreak = async (goal_id) => {
  const result = await pool.query(
    `DELETE FROM streaks
     WHERE goal_id=$1
     RETURNING *`,
    [goal_id]
  );

  return result.rows[0];
};

module.exports = {
  createStreak,
  getStreakByGoal,
  updateStreak,
  deleteStreak,
};