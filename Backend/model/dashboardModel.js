const db = require("../database/db");

// Dashboard summary
const getDashboardSummary = async (user_id) => {

  const result = await db.query(
    `
    SELECT
      (SELECT COUNT(*) 
       FROM goals 
       WHERE user_id=$1) AS total_goals,

      (SELECT COUNT(*) 
       FROM goals
       WHERE user_id=$1 
       AND status='completed') AS completed_goals,

      (SELECT COUNT(*) 
       FROM goals
       WHERE user_id=$1 
       AND status='active') AS active_goals,

      (
        SELECT COALESCE(ROUND(AVG(progress)),0)
        FROM goals
        WHERE user_id=$1
      ) AS average_progress,

      (
        SELECT COALESCE(MAX(current_streak),0)
        FROM streaks
        WHERE user_id=$1
      ) AS current_streak,

      (
        SELECT COALESCE(MAX(longest_streak),0)
        FROM streaks
        WHERE user_id=$1
      ) AS longest_streak,

      (
        SELECT COUNT(*)
        FROM milestones
        WHERE goal_id IN
        (SELECT goal_id FROM goals WHERE user_id=$1)
      ) AS total_milestones,

      (
        SELECT COUNT(*)
        FROM milestones
        WHERE is_completed=true
        AND goal_id IN
        (SELECT goal_id FROM goals WHERE user_id=$1)
      ) AS completed_milestones
    `,
    [user_id]
  );

  return result.rows[0];
};

// Recent goals
const getRecentGoals = async (user_id) => {
const result = await db.query(    `
    SELECT *
    FROM goals
    WHERE user_id=$1
    ORDER BY created_at DESC
    LIMIT 5
    `,
    [user_id]
  );

  return result.rows;
};

// Upcoming deadlines
const getUpcomingGoals = async (user_id) => {
const result = await db.query(    `
    SELECT *
    FROM goals
    WHERE user_id=$1
      AND deadline >= CURRENT_DATE
      AND deadline <= CURRENT_DATE + INTERVAL '7 days'
    ORDER BY deadline
    `,
    [user_id]
  );

  return result.rows;
};

// Progress chart
const getProgressChart = async (userId) => {
  const result = await db.query(
    `
    SELECT 
      goal_id,
      title,
      progress,
      user_id
    FROM goals
    WHERE user_id = $1
    ORDER BY created_at DESC
    `,
    [userId]
  );

  return result.rows;
};

module.exports = {
  getDashboardSummary,
  getRecentGoals,
  getUpcomingGoals,
  getProgressChart,
};