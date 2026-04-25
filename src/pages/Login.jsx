import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
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

    if (!formData.identifier || !formData.password) {
      alert("Please fill in both username/email and password.");
      return;
    }

    try {
      const data = await loginUser(formData);

      if (data.success) {
        alert("Login successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="login-page">
      <main className="login-container">
        <div className="login-card">
          <h1 className="login-title">Welcome! Please log in.</h1>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              className="login-input"
              type="text"
              name="identifier"
              placeholder="Enter your email"
              value={formData.identifier}
              onChange={handleChange}
            />

            <input
              className="login-input"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <a href="/forgot-password" className="login-forgot-password">
              Forgot password?
            </a>

            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;