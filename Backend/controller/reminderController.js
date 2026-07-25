const {
  createReminder,
  getRemindersByUser,
  getReminderById,
  updateReminder,
  toggleReminder,
  deleteReminder,
} = require("../model/reminderModel");

// Create reminder
const addReminder = async (req, res) => {
  try {
    const { goal_id, reminder_time } = req.body;

    if (!goal_id || !reminder_time) {
      return res.status(400).json({
        message: "Goal ID and reminder time are required.",
      });
    }

    const reminder = await createReminder(
      req.user.user_id,
      goal_id,
      reminder_time
    );

    res.status(201).json({
      message: "Reminder created successfully.",
      reminder,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get all reminders
const getReminders = async (req, res) => {
  try {
    const reminders = await getRemindersByUser(req.user.user_id);

    res.status(200).json(reminders);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get reminder by ID
const getReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await getReminderById(id);

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found.",
      });
    }

    res.status(200).json(reminder);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update reminder
const editReminder = async (req, res) => {
  try {
    const { id } = req.params;
    const { reminder_time, is_active } = req.body;

    const reminder = await updateReminder(
      id,
      reminder_time,
      is_active
    );

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found.",
      });
    }

    res.status(200).json({
      message: "Reminder updated successfully.",
      reminder,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Toggle reminder
const toggleReminderStatus = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await toggleReminder(id);

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found.",
      });
    }

    res.status(200).json({
      message: "Reminder status updated.",
      reminder,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete reminder
const removeReminder = async (req, res) => {
  try {
    const { id } = req.params;

    const reminder = await deleteReminder(id);

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found.",
      });
    }

    res.status(200).json({
      message: "Reminder deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReminder,
  getReminders,
  getReminder,
  editReminder,
  toggleReminderStatus,
  removeReminder,
};