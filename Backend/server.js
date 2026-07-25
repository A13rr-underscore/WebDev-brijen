const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./route/userRoute");
const goalRoute = require("./route/goalRoute");
const progressRoute = require("./route/progressRoute");
const milestoneRoute = require("./route/milestoneRoute");
const streakRoute = require("./route/streakRoute");
const reminderRoute = require("./route/reminderRoute");
const dashboardRoute = require("./route/dashboardRoute");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.get("/", (req, res)  => {
  res.send("Goalden Backend is Running");
});

app.use("/api/users", userRoutes);
app.use("/api/goals", goalRoute);
app.use("/api/progress", progressRoute);
app.use("/api/milestones", milestoneRoute);
app.use("/api/streaks", streakRoute);
app.use("/api/reminders", reminderRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/uploads", express.static("uploads"));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;