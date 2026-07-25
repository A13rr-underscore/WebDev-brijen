import { useEffect, useState } from "react";
import api from "../service/Api";
import "./Dashboard.css";
import logo from "../assets/Goalden.png";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { NavLink, useNavigate } from "react-router-dom";
import { getProgressChart } from "../service/Api";
import {BarChart, Bar, XAxis, YAxis, Tooltip,ResponsiveContainer} from "recharts";
function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [summary, setSummary] = useState({});
  const [progress, setProgress] = useState([]);
  const [goals, setGoals] = useState([]);
  const [upcomingGoals, setUpcomingGoals] = useState([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [goalData, setGoalData] = useState({
  title: "",
  description: "",
  category: "",
  deadline: "",
  progress: "",
});
const [editingGoal, setEditingGoal] = useState(null);
const [progressData, setProgressData] = useState([]);

  const fetchGoals = async () => {
  try {
    const res = await api.get("/goals");
    setGoals(res.data);
  } catch (error) {
    console.log(error);
  }
};

  const fetchDashboard = async () => {
    try {
      const summaryRes = await api.get("/dashboard");
      setSummary(summaryRes.data);

      const progressRes = await api.get("/dashboard/progress-chart");
      setProgress(progressRes.data);

      const upcomingRes = await api.get("/dashboard/upcoming");
      setUpcomingGoals(upcomingRes.data);
    } catch (error) {
      console.log(error);
    }
    
  };
  useEffect(() => {
        const loadProgress = async () => {
        try {
            const data = await getProgressChart();
            setProgressData(data);
        } catch (error) {
            console.log(error);
        }
    };

    loadProgress();
  fetchDashboard();
  fetchGoals();
}, []);
const handleAddGoal = async () => {
  try {
    await api.post("/goals", goalData);

    alert("Goal added successfully!");

    // Close the popup
    setShowAddGoal(false);

    // Clear the form
setGoalData({
  title: "",
  description: "",
  category: "",
  deadline: "",
  progress: "",
});
    // Refresh the dashboard
    fetchGoals();
    fetchDashboard();
    refreshProgress();

  } catch (error) {
    alert(error.response?.data?.message || "Failed to add goal");
  }
};
const handleUpdateGoal = async () => {
  try {
    await api.put(`/goals/${editingGoal.goal_id}`, {
      title: goalData.title,
      description: goalData.description,
      category: goalData.category,
      deadline: goalData.deadline,
      progress: Number(goalData.progress),
      status: editingGoal.status,
    });

    alert("Goal updated successfully!");

    setEditingGoal(null);
    setShowAddGoal(false);

    setGoalData({
  title: "",
  description: "",
  category: "",
  deadline: "",
  progress: "",
});

    fetchGoals();
    fetchDashboard();
    refreshProgress();

  } catch (error) {
    console.log(error);
    alert(error.response?.data?.message || "Failed to update goal");
  }
};
const refreshProgress = async () => {
  try {
    const data = await getProgressChart();
    setProgressData(data);
  } catch (error) {
    console.log(error);
  }
};
    const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };
const handleEdit = (goal) => {
  setEditingGoal(goal);

  setGoalData({
  title: goal.title,
  description: goal.description,
  category: goal.category,
  deadline: goal.deadline.split("T")[0],
  progress: goal.progress,
});

  setShowAddGoal(true);
};

const handleDelete = async (id) => {
  try {
    await api.delete(`/goals/${id}`);

    alert("Goal deleted successfully");

    // Refresh goals
    fetchGoals();

    // Refresh dashboard cards
    fetchDashboard();

    // Refresh progress bar and chart
    const data = await getProgressChart();
    setProgressData(data);

  } catch (error) {
    console.log(error);
  }
};
const handleStatusChange = async (goal) => {
  try {

    const newStatus =
      goal.status === "completed"
        ? "pending"
        : "completed";

    await api.put(`/goals/${goal.goal_id}`, {
      title: goal.title,
      description: goal.description,
      category: goal.category,
      deadline: goal.deadline,
      progress: goal.progress,
      status: newStatus,
    });

    alert(
      newStatus === "completed"
        ? "Goal marked as completed!"
        : "Goal marked as incomplete!"
    );

    fetchGoals();
    fetchDashboard();
    refreshProgress();

  } catch (error) {
    console.log(error);
  }
};
    return (
    <>
      
      <Header />

      <div className="container">

        {<Sidebar handleLogout={handleLogout} />}

        <main className="dashboard">

        <div className="dashboard-header">
            <h1>Welcome Back, {user?.full_name}</h1>

            <button className="add-goal-btn" onClick={() => setShowAddGoal(true)}>
              Add Goal
              </button>
        </div>
                    <div className="stats">

            <div className="card">
              <h3>Total Goals</h3>
              <span>{summary.total_goals || 0}</span>
            </div>

            <div className="card">
              <h3>Completed</h3>
              <span>{summary.completed_goals || 0}</span>
            </div>

            <div className="card">
              <h3>Active</h3>
              <span>{summary.active_goals || 0}</span>
            </div>

          </div>
          <section className="progress">

<h2>Goal Progress</h2>

{progressData.length > 0 && (
  progressData.map((goal) => (
    <div key={goal.goal_id}>

      <p>{goal.title}</p>

      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{
            width: `${goal.progress}%`
          }}
        >
          {goal.progress}%
        </div>
      </div>

    </div>
  ))
) }

</section>
<section className="current-goals">
  <h2>Current Goals</h2>

  {goals.length === 0 ? (
    <p>No goals found.</p>
  ) : (
goals.map((goal) => (
  <div className="goal-card" key={goal.goal_id}>
    <h3>{goal.title}</h3>

    <p>{goal.description}</p>

    <p>
      <strong>Category:</strong> {goal.category}
    </p>

    <p>
      <strong>Deadline:</strong> {goal.deadline.split("T")[0]}
    </p>

<p>
  <strong>Status:</strong>
  <span>
    {goal.status}
  </span>
</p>

<div className="goal-actions">

<button
  className="edit-btn"
  onClick={() => handleEdit(goal)}
>
  Edit
</button>


<button
  className="delete-btn"
  onClick={() => handleDelete(goal.goal_id)}
>
  Delete
</button>


{goal.status === "completed" ? (
  <button
    className="complete-btn"
    onClick={() => handleStatusChange(goal)}
  >
    Mark as Incomplete
  </button>
) : (
  <button
    className="complete-btn"
    onClick={() => handleStatusChange(goal)}
  >
    Complete
  </button>
)}

</div>
    </div>
)))}
</section>
<section className="chart">

<h2>Weekly Progress Chart</h2>

{
  progressData.length > 0 ? (

    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={progressData}>

        <XAxis 
          dataKey="title"
        />

        <YAxis 
          domain={[0,100]}
        />

        <Tooltip />

        <Bar
          dataKey="progress"
          fill="#4CAF50"
        />

      </BarChart>

    </ResponsiveContainer>

  ) : (

    <p>No Progress Data Available</p>

  )
}

</section>
{showAddGoal && (
  <div className="modal-overlay">
    <div className="modal">

<h2>{editingGoal ? "Edit Goal" : "Add Goal"}</h2>
      <input
  type="text"
  placeholder="Title"
  value={goalData.title}
  onChange={(e) =>
    setGoalData({
      ...goalData,
      title: e.target.value,
    })
  }
/>

      <textarea
        placeholder="Description"
        value={goalData.description}
        onChange={(e) =>
          setGoalData({ ...goalData, description: e.target.value })
        }
      />

      <input
        type="text"
        placeholder="Category"
        value={goalData.category}
        onChange={(e) =>
          setGoalData({ ...goalData, category: e.target.value })
        }
      />

      <input
        type="date"
        value={goalData.deadline}
        onChange={(e) =>
          setGoalData({ ...goalData, deadline: e.target.value })
        }
      />
      <input
  type="number"
  min="0"
  max="100"
  placeholder="Progress (%)"
  value={goalData.progress}
  onChange={(e) =>
    setGoalData({
      ...goalData,
      progress: e.target.value,
    })
  }
/>

      <div className="modal-buttons">
<button
  onClick={
    editingGoal
      ? handleUpdateGoal
      : handleAddGoal
  }
>
  {editingGoal ? "Update Goal" : "Save Goal"}
</button>
        <button onClick={() => setShowAddGoal(false)}>
          Cancel
        </button>
      </div>

    </div>
  </div>
)}
        </main>

      </div>

    </>
  );
}
export default Dashboard;