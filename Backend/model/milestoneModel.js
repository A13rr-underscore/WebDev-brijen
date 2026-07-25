const pool = require("../database/db");

// Create milestone
const createMilestone = async (goal_id, title, due_date) => {
  const result = await pool.query(
    `INSERT INTO milestones
    (goal_id, title, due_date)
    VALUES ($1, $2, $3)
    RETURNING *`,
    [goal_id, title, due_date]
  );

  return result.rows[0];
};

// Get milestones by goal
const getMilestonesByGoal = async (goal_id) => {
  const result = await pool.query(
    `SELECT *
     FROM milestones
     WHERE goal_id = $1
     ORDER BY due_date ASC`,
    [goal_id]
  );

  return result.rows;
};

// Get milestone by ID
const getMilestoneById = async (milestone_id) => {
  const result = await pool.query(
    `SELECT *
     FROM milestones
     WHERE milestone_id = $1`,
    [milestone_id]
  );

  return result.rows[0];
};

// Update milestone
const updateMilestone = async (
  milestone_id,
  title,
  due_date,
  is_completed
) => {
  const result = await pool.query(
    `UPDATE milestones
     SET title=$1,
         due_date=$2,
         is_completed=$3
     WHERE milestone_id=$4
     RETURNING *`,
    [title, due_date, is_completed, milestone_id]
  );

  return result.rows[0];
};

// Mark milestone completed
const completeMilestone = async (milestone_id) => {
  const result = await pool.query(
    `UPDATE milestones
     SET is_completed = TRUE
     WHERE milestone_id = $1
     RETURNING *`,
    [milestone_id]
  );

  return result.rows[0];
};

// Delete milestone
const deleteMilestone = async (milestone_id) => {
  const result = await pool.query(
    `DELETE FROM milestones
     WHERE milestone_id = $1
     RETURNING *`,
    [milestone_id]
  );

  return result.rows[0];
};

module.exports = {
  createMilestone,
  getMilestonesByGoal,
  getMilestoneById,
  updateMilestone,
  completeMilestone,
  deleteMilestone,
};