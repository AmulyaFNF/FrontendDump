import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const isPasswordValid = (password: string) => {
    const regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      if (!isPasswordValid(value)) {
        setPasswordError("Password must be at least 8 characters and include a number and a special character.");
      } else {
        setPasswordError("");
      }

      if (formData.confirmPassword && value !== formData.confirmPassword) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setConfirmPasswordError("Passwords do not match.");
      } else {
        setConfirmPasswordError("");
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isPasswordValid(formData.password)) {
      setPasswordError("Password must be at least 8 characters and include a number and a special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return;
    }

    const payload = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const res = await fetch("http://localhost:5109/api/Auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("userId", data.userId.toString());
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("role", data.role.toString());

      alert("Signup successful!");
      navigate("/");
    } catch (err: any) {
      alert(err.message || "Error during signup");
    }
  };

  const eyeStyle: React.CSSProperties = {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "1.2rem",
    color: "#555",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none"
  };

  return (
    <div className="container">
      <div className="about-section">
        <h3 className="about-title">Signup</h3>
        <form onSubmit={handleSubmit}>
          <div className="about-description">
            <label><b>First Name:</b></label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Last Name:</b></label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Email:</b></label>
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
            <label><b>Phone Number:</b></label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Password:</b></label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input-field"
                style={{ paddingRight: "36px" }}
              />
              <span onClick={() => setShowPassword(!showPassword)} style={eyeStyle}>
                {showPassword ? "👁️" : "👁‍🗨"}
              </span>
            </div>
            {passwordError && (
              <p style={{ color: "red", fontSize: "0.9rem", marginTop: "4px" }}>{passwordError}</p>
            )}
          </div>

          <div className="about-description">
            <label><b>Confirm Password:</b></label>
            <div style={{ position: "relative" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="input-field"
                style={{ paddingRight: "36px" }}
              />
              <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={eyeStyle}>
                {showConfirmPassword ? "👁️" : "👁‍🗨"}
              </span>
            </div>
            {confirmPasswordError && (
              <p style={{ color: "red", fontSize: "0.9rem", marginTop: "4px" }}>{confirmPasswordError}</p>
            )}
          </div>

          <button type="submit" className="apply-btn">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
