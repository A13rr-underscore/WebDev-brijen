import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/Api";
import "./Register.css";
import logo from "../assets/Goalden.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const res = await api.post("/users/register", {
        full_name: formData.full_name,
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <>
      <header>
        <div className="logo-container">
          <img src={logo} alt="Goalden Logo" />
          <h1>GOALDEN</h1>
        </div>
      </header>

      <div className="register-container">
        <div className="signup-card">

          <h2>
            Goals don't track
            <br />
            themselves, Sign up
          </h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="full_name"
              placeholder="Enter Full Name"
              value={formData.full_name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-Enter Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button type="submit">
              Sign Up
            </button>

          </form>

          <br />

          <p style={{ textAlign: "center", color: "white" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#fff" }}>
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;