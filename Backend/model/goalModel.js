const pool = require("../database/db");

const getGoalProgress = async (userId) => {
    const dbCheck = await pool.query(
    "SELECT current_database();"
  );

  console.log("Backend is connected to:", dbCheck.rows);
  
  const result = await pool.query(
    `
    SELECT
      goal_id,
      title,
      progress
    FROM goals
    WHERE user_id = $1
    `,
    [userId]
  );

  console.log(result.rows);

  return result.rows;
};
// Create Goal
const createGoal = async (
  user_id,
  title,
  description,
  category,
  deadline,
  progress
) => {

  const result = await pool.query(
    `INSERT INTO goals
    (user_id, title, description, category, deadline, progress, status)
    VALUES ($1, $2, $3, $4, $5, $6, 'active')
    RETURNING *`,
    [
      user_id,
      title,
      description,
      category,
      deadline,
      progress
    ]
  );

  return result.rows[0];
};

// Get All Goals of Logged-in User
const getGoalsByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT *
     FROM goals
     WHERE user_id = $1
     ORDER BY goal_id DESC`,
    [user_id]
  );

  return result.rows;
};

// Update Goal
const updateGoal = async (
  goal_id,
  user_id,
  title,
  description,
  category,
  deadline,
  progress,
  status
) => {
  const result = await pool.query(
  `UPDATE goals
   SET
     title=$1,
     description=$2,
     category=$3,
     deadline=$4,
     progress=$5,
     status=$6
   WHERE goal_id=$7
   AND user_id=$8
   RETURNING *`,
  [
    title,
    description,
    category,
    deadline,
    progress,
    status,
    goal_id,
    user_id,
  ]
);

  return result.rows[0];
};

// Delete Goal
const deleteGoal = async (goal_id, user_id) => {
  const result = await pool.query(
    `DELETE FROM goals
     WHERE goal_id=$1
     AND user_id=$2
     RETURNING *`,
    [goal_id, user_id]
  );

  return result.rows[0];
};

module.exports = {
  createGoal,
  getGoalsByUser,
  updateGoal,
  deleteGoal,
  getGoalProgress
};