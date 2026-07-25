import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../service/Api";
import "./Login.css";

import logo from "../assets/Goalden.png";
import loginImage from "../assets/Mountain.jpg";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", formData);

      localStorage.setItem("token", response.data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      alert(response.data.message);

      navigate("/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="Goalden Logo" />
          <h1>GOALDEN</h1>
        </div>
      </header>

      <div className="login-container">

        <div className="left-panel">
          <img src={loginImage} alt="Login" />
        </div>

        <div className="right-panel">

          <h2>Your Streak is Waiting</h2>

          <form onSubmit={handleSubmit}>

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

            <Link className="create" to="/register">
              Create an Account
            </Link>

            <Link className="forgot" to="/forgot-password">
              Forgot your Password?
            </Link>

            <button type="submit">
              Login
            </button>

          </form>

        </div>

      </div>
    </>
  );
}

export default Login;