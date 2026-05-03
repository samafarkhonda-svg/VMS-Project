import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "", // can be username OR email
    password: "",
  });

  //  Updates state as user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //  Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { identifier, password } = formData;

    //  Check for missing fields
    if (!identifier || !password) {
      alert("Please fill in both username/email and password.");
      return;
    }

    //  Validate identifier (username OR email)
    if (identifier.includes("@")) {
      // If it contains "@", treat as email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(identifier)) {
        alert("Please enter a valid email.");
        return;
      }
    } else {
      // Otherwise treat as username
      if (identifier.length < 3) {
        alert("Username must be at least 3 characters.");
        return;
      }

      //  allow only letters, numbers, underscore
      const usernamePattern = /^[a-zA-Z0-9_]+$/;
      if (!usernamePattern.test(identifier)) {
        alert("Username can only contain letters, numbers, and underscore.");
        return;
      }
    }

    // Validate password strength
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    //  Send login request to backend
    try {
      const data = await loginUser(formData);

      if (data.success) {
        alert("Login successful!");

        // Store user info locally
        localStorage.setItem("user", JSON.stringify(data.user));

        // Navigate to confirmation page
        navigate("/confirmation");
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
              placeholder="Enter your username or email" 
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