import React, { useState } from "react";
import { useParams } from "react-router-dom";

const JobApply: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobId) {
      alert("Job ID is missing!");
      return;
    }

    if (!resume) {
      alert("Please upload your resume.");
      return;
    }

    const token = sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to apply.");
      return;
    }

    const formData = new FormData();
    formData.append("JobId", jobId);
    formData.append("FirstName", firstName);
    formData.append("LastName", lastName);
    formData.append("Email", email);
    formData.append("Phone", phone);
    formData.append("resume", resume);

    try {
      const response = await fetch("http://localhost:5109/api/candidate/applications", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to apply for job");
      }

      const data = await response.json();
      alert("Application submitted successfully!");
      console.log("Response:", data);
    } catch (error: any) {
      console.error("Error submitting application:", error.message);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="container">
      <div className="about-section">
        <div className="about-title">Apply for Job ID: {jobId}</div>
        <form onSubmit={handleSubmit} className="job-apply-form">
          <div className="about-description">
            <label>First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="about-description">
            <label>Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="about-description">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="about-description">
            <label>Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="about-description">
            <label>Resume</label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] || null)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="apply-btn">Submit Application</button>
        </form>
      </div>
    </div>
  );
};

export default JobApply;
