import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5109/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      // Store in session storage
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId.toString());
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("role", data.role.toString());

      navigate("/interviewList");
    } catch (error) {
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="container">
      <div className="about-section">
        <div className="about-title">Login</div>
        <form onSubmit={handleLogin}>
          <div className="about-description">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="about-description">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button className="apply-btn" type="submit">
              Login
            </button>
           
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
