const pool = require("../database/db");

// Add progress
const addProgress = async (goal_id, progress_value, notes) => {
  const result = await pool.query(
    `INSERT INTO progress
    (goal_id, log_date, progress_value, notes)
    VALUES ($1, CURRENT_DATE, $2, $3)
    RETURNING *`,
    [goal_id, progress_value, notes]
  );

  return result.rows[0];
};

// Get progress history of a goal
const getProgressByGoal = async (goal_id) => {
  const result = await pool.query(
    `SELECT *
     FROM progress
     WHERE goal_id=$1
     ORDER BY log_date DESC`,
    [goal_id]
  );

  return result.rows;
};

// Update progress
const updateProgress = async (
  progress_id,
  progress_value,
  notes
) => {
  const result = await pool.query(
    `UPDATE progress
     SET progress_value=$1,
         notes=$2
     WHERE progress_id=$3
     RETURNING *`,
    [progress_value, notes, progress_id]
  );

  return result.rows[0];
};

// Delete progress
const deleteProgress = async (progress_id) => {
  const result = await pool.query(
    `DELETE FROM progress
     WHERE progress_id=$1
     RETURNING *`,
    [progress_id]
  );

  return result.rows[0];
};

module.exports = {
  addProgress,
  getProgressByGoal,
  updateProgress,
  deleteProgress,
};