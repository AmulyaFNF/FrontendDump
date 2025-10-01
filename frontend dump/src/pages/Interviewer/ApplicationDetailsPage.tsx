import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./ApplicationDetails.css";

interface ApplicationDetails {
  interviewId: number;
  applicationId: number;
  applicantName: string;
  email: string;
  resumePath: string;
  keywordScore: number;
  currentRound: number;
  teamsLink: string;
  scheduledTime: string;
}

interface Feedback {
  comments: string;
  score: string;
  status: string;
}

export default function ApplicationDetailsPage() {
  // 👇 change this depending on your <Route path>
  const { interviewId } = useParams<{ interviewId: string }>();
  const [applicationDetails, setApplicationDetails] = useState<ApplicationDetails | null>(null);
  const [feedback, setFeedback] = useState<Feedback>({
    comments: "",
    score: "",
    status: "Accepted",
  });

  const APIBASE = "http://localhost:5109";
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    async function fetchApplicationDetails() {
      if (!token || !interviewId) {
        console.warn("Token or interviewId missing", { token, interviewId });
        return;
      }
      try {
        console.log("Fetching interview details for ID:", interviewId);

        const res = await fetch(`${APIBASE}/api/interviews/${interviewId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch interview details", res.status, await res.text());
          return;
        }

        const rawData = await res.json();
        console.log("Raw API response:", rawData);

        // Normalize casing if backend sends PascalCase
        const data: ApplicationDetails = {
          interviewId: rawData.interviewId ?? rawData.InterviewId,
          applicationId: rawData.applicationId ?? rawData.ApplicationId,
          applicantName: rawData.applicantName ?? rawData.ApplicantName,
          email: rawData.email ?? rawData.Email,
          resumePath: rawData.resumePath ?? rawData.ResumePath,
          keywordScore: rawData.keywordScore ?? rawData.KeywordScore,
          currentRound: rawData.currentRound ?? rawData.CurrentRound,
          teamsLink: rawData.teamsLink ?? rawData.TeamsLink,
          scheduledTime: rawData.scheduledTime ?? rawData.ScheduledTime,
        };

        setApplicationDetails(data);
      } catch (err) {
        console.error("Error fetching interview details", err);
      }
    }

    fetchApplicationDetails();
  }, [token, interviewId]);

  async function handleSubmitFeedback(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !interviewId || !applicationDetails) return;

    const result = feedback.status === "Accepted" ? 0 : 1;
    const payload = {
      comments: feedback.comments,
      score: parseInt(feedback.score, 10),
      status: feedback.status,
      applicationId: applicationDetails.applicationId,
      interviewId: applicationDetails.interviewId,
      result: result,
    };

    try {
      console.log("Submitting feedback:", payload);

      const res = await fetch(`${APIBASE}/api/feedback/${interviewId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("Feedback submitted successfully!");
        setFeedback({ comments: "", score: "", status: "Accepted" });
      } else {
        console.error("Feedback submit failed", res.status, await res.text());
        alert("Failed to submit feedback.");
      }
    } catch (err) {
      alert("Error submitting feedback.");
      console.error("Error submitting feedback", err);
    }
  }

  if (!applicationDetails)
    return <div className="loading">Loading interview details...</div>;

  return (
    <div className="container py-5">
      {/* Interview & Application Details */}
      <div className="dashboard-card shadow-lg mb-4">
        <h3 className="text-primary fw-bold mb-3">👤 Interview Details</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <strong>Interview ID:</strong> {applicationDetails.interviewId}
          </li>
          <li className="list-group-item">
            <strong>Application ID:</strong> {applicationDetails.applicationId}
          </li>
          <li className="list-group-item">
            <strong>Name:</strong> {applicationDetails.applicantName}
          </li>
          <li className="list-group-item">
            <strong>Email:</strong> {applicationDetails.email}
          </li>
          <li className="list-group-item">
            <strong>Resume:</strong>{" "}
            <a href={applicationDetails.resumePath} target="_blank" rel="noreferrer">
              View Resume
            </a>
          </li>
          <li className="list-group-item">
            <strong>Keyword Score:</strong>{" "}
            <span className="badge bg-info text-dark px-3 py-2 rounded-pill">
              {applicationDetails.keywordScore}
            </span>
          </li>
          <li className="list-group-item">
            <strong>Current Round:</strong>{" "}
            <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">
              {applicationDetails.currentRound}
            </span>
          </li>
          <li className="list-group-item">
            <strong>Teams Link:</strong>{" "}
            <a href={applicationDetails.teamsLink} target="_blank" rel="noreferrer">
              {applicationDetails.teamsLink}
            </a>
          </li>
          <li className="list-group-item">
            <strong>Scheduled Time:</strong> {applicationDetails.scheduledTime}
          </li>
        </ul>
        <div className="card-footer text-end">
          <Link to="/interviewer/interviewlist" className="btn btn-outline-secondary">
            ⬅ Back to Interviews
          </Link>
        </div>
      </div>

      {/* Feedback Form */}
      <div className="dashboard-card shadow-lg p-4">
        <h4 className="fw-semibold mb-3">📝 Submit Feedback</h4>
        <form onSubmit={handleSubmitFeedback}>
          <div className="mb-3">
            <label className="form-label fw-medium">Comments</label>
            <textarea
              className="form-control"
              value={feedback.comments}
              onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Score (0-10)</label>
            <input
              type="number"
              min={0}
              max={10}
              className="form-control"
              value={feedback.score}
              onChange={(e) => setFeedback({ ...feedback, score: e.target.value })}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-medium">Decision</label>
            <select
              className="form-select"
              value={feedback.status}
              onChange={(e) => setFeedback({ ...feedback, status: e.target.value })}
            >
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          <button type="submit" className="btn btn-gradient w-100">
            ✅ Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

