const pool = require("../database/db");

// Create reminder
const createReminder = async (
  user_id,
  goal_id,
  reminder_time
) => {
  const result = await pool.query(
    `INSERT INTO reminders
    (user_id, goal_id, reminder_time)
    VALUES ($1,$2,$3)
    RETURNING *`,
    [user_id, goal_id, reminder_time]
  );

  return result.rows[0];
};

// Get all reminders of a user
const getRemindersByUser = async (user_id) => {
  const result = await pool.query(
    `SELECT *
     FROM reminders
     WHERE user_id = $1
     ORDER BY reminder_time`,
    [user_id]
  );

  return result.rows;
};

// Get reminder by ID
const getReminderById = async (reminder_id) => {
  const result = await pool.query(
    `SELECT *
     FROM reminders
     WHERE reminder_id = $1`,
    [reminder_id]
  );

  return result.rows[0];
};

// Update reminder
const updateReminder = async (
  reminder_id,
  reminder_time,
  is_active
) => {
  const result = await pool.query(
    `UPDATE reminders
     SET reminder_time=$1,
         is_active=$2
     WHERE reminder_id=$3
     RETURNING *`,
    [
      reminder_time,
      is_active,
      reminder_id,
    ]
  );

  return result.rows[0];
};

// Toggle reminder
const toggleReminder = async (reminder_id) => {
  const result = await pool.query(
    `UPDATE reminders
     SET is_active = NOT is_active
     WHERE reminder_id=$1
     RETURNING *`,
    [reminder_id]
  );

  return result.rows[0];
};

// Delete reminder
const deleteReminder = async (reminder_id) => {
  const result = await pool.query(
    `DELETE FROM reminders
     WHERE reminder_id=$1
     RETURNING *`,
    [reminder_id]
  );

  return result.rows[0];
};

module.exports = {
  createReminder,
  getRemindersByUser,
  getReminderById,
  updateReminder,
  toggleReminder,
  deleteReminder,
};