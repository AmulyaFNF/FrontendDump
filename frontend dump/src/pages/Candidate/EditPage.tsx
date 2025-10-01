import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface UserProfile {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password?: string;
  role: number;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

const EditProfile: React.FC = () => {
  const [formData, setFormData] = useState<UserProfile>({
    userId: 0,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: 0,
    createdAt: "",
    updatedAt: "",
    isActive: true,
  });
  const [loading, setLoading] = useState(true);
  const [editable, setEditable] = useState(false);

  const navigate = useNavigate();

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("You must login first");
        navigate("/login");
        return;
      }

      try {
        const res = await fetch("http://localhost:5109/api/candidate/Profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setFormData({ ...data, password: "" }); // don't prefill password
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Error fetching profile. Please login again.");
        navigate("/login");
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must login first");
      navigate("/login");
      return;
    }

    try {
      const updatedData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      const res = await fetch("http://localhost:5109/api/candidate/Profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      setEditable(false);
    } catch (err) {
      console.error(err);
      alert("Error updating profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="container">
      <div className="about-section">
        <h3 className="about-title">Edit Profile</h3>

        <button
          type="button"
          className="apply-btn"
          onClick={() => setEditable(true)}
        >
          Enable Edit
        </button>

        <form onSubmit={handleSubmit}>
          <div className="about-description">
            <label><b>First Name:</b></label><br />
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              disabled={!editable}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Last Name:</b></label><br />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              disabled={!editable}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Email:</b></label><br />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!editable}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Phone Number:</b></label><br />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={!editable}
              required
              className="input-field"
            />
          </div>

          <div className="about-description">
            <label><b>Password:</b></label><br />
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
              placeholder="Enter new password"
              disabled={!editable}
              className="input-field"
            />
          </div>

          {editable && (
            <button type="submit" className="apply-btn">
              Update Profile
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
