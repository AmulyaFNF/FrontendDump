import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface ApiApplication {
  applicationId: number;
  jobId: number;
  jobTitle: string;
  jobDescription: string;
  resumePath: string | null;
  applicationStatus: number;
  currentRound: number;
  createdAt: string;
}

const MyApplications: React.FC = () => {
  const [applications, setApplications] = useState<ApiApplication[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      setError(null);

      const token = sessionStorage.getItem("token");
      const userId = sessionStorage.getItem("userId");

      if (!token || !userId) {
        setError("Missing login credentials.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5109/api/candidate/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();
        setApplications(Array.isArray(data) ? data : [data]);
      } catch (err: any) {
        setError(err.message || "Failed to load applications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const getStatusLabel = (code: number) => {
    switch (code) {
      case 0:
        return "Applied";
      case 1:
        return "Under Review";
      case 2:
        return "Interview Scheduled";
      case 3:
        return "Rejected";
      case 4:
        return "Offer Extended";
      default:
        return `Status #${code}`;
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return isNaN(d.getTime())
      ? iso
      : d.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
  };

  return (
    <div className="container">
      <h2>My Applications</h2>

      {isLoading && <p>Loading applications…</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && applications.length === 0 && (
        <p>No applications found.</p>
      )}

      <div className="applications-container">
        {applications.map((app) => (
          <div key={app.applicationId} className="about-section">
            <div className="about-title">
              <h3>{app.jobTitle}</h3>
            </div>
            <div className="about-description">
              <p>
                <strong>Application ID:</strong> {app.applicationId}
              </p>
              <p>
                <strong>Job ID:</strong> {app.jobId}
              </p>
              <p>
                <strong>Description:</strong> {app.jobDescription}
              </p>
              <p>
                <strong>Status:</strong> {getStatusLabel(app.applicationStatus)}
              </p>
              <p>
                <strong>Round:</strong> {app.currentRound}
              </p>
              <p>
                <strong>Applied On:</strong> {formatDate(app.createdAt)}
              </p>
              {app.resumePath && (
                <p>
                  <strong>Resume:</strong>{" "}
                  <a href={app.resumePath} target="_blank" rel="noreferrer">
                    View
                  </a>
                </p>
              )}

              <button
                className="view-button"
                onClick={() =>
                  navigate(`/application/${app.applicationId}`)
                }
              >
                View Application
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
