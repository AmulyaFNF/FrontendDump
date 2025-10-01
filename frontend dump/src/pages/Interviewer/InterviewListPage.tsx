
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./interview.css"; // ✅ custom CSS

interface Interview {
  interviewId: number;
  applicationId: number;
  jobTitle?: string;
  scheduledTime: string;
  teamsLink?: string;
}

export default function InterviewListPage() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const navigate = useNavigate();
  const APIBASE = "http://localhost:5109";
  const token = sessionStorage.getItem("token");
  const interviewerId = sessionStorage.getItem("userId");

  useEffect(() => {
    async function fetchInterviews() {
      if (!token || !interviewerId) return;
      try {
        const res = await fetch(`${APIBASE}/api/interviews/interviewer`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data: Interview[] = await res.json();
          setInterviews(
            data.sort(
              (a, b) =>
                new Date(b.scheduledTime).getTime() -
                new Date(a.scheduledTime).getTime()
            )
          );
        } else {
          console.error("Failed to fetch interviews");
        }
      } catch (err) {
        console.error("Error fetching interviews", err);
      }
    }
    fetchInterviews();
  }, [token, interviewerId]);
  function handleView(interview: Interview) {
    sessionStorage.setItem("interviewId", interview.interviewId.toString());
    navigate(`/application/${interview.interviewId}`);
  }

  return (
    <div className="container py-5">
      <div className="dashboard-card shadow-lg">
        <h2 className="text-center text-primary fw-bold mb-4">
          📅 Scheduled Interviews
        </h2>
        <div className="table-responsive">
          <table className="table table-hover align-middle interview-table">
            <thead className="table-dark">
              <tr>
                <th>Application ID</th>
                <th>Job Title</th>
                <th>Scheduled Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((intv) => (
                <tr key={intv.interviewId}>
                  <td>{intv.applicationId}</td>
                  <td>
                    <span className="badge bg-info text-dark px-3 py-2 rounded-pill">
                      {intv.jobTitle ?? "N/A"}
                    </span>
                  </td>
                  <td>{new Date(intv.scheduledTime).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-gradient btn-sm"
                      onClick={() => handleView(intv)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {interviews.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-muted py-4">
                    No interviews scheduled
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}