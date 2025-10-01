import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface ApplicationDetails {
  applicationId: number;
  jobId: number;
  status: number;
  jobTitle: string;
  jobDescription: string;
  teamsLink?: string;
  scheduledTime?: string;
}

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [application, setApplication] = useState<ApplicationDetails | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

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

  const formatDateTime = (iso?: string) => {
    if (!iso) return "-";
    const d = new Date(iso);
    return isNaN(d.getTime())
      ? iso
      : d.toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
  };

  useEffect(() => {
    const fetchApplication = async () => {
      const token = sessionStorage.getItem("token");
      if (!token || !id) {
        setError("Missing login credentials or invalid application id.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:5109/api/candidate/Applications/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }

        const data = await res.json();

        // Ensure TeamsLink is absolute
        if (data.teamsLink && !data.teamsLink.startsWith("http")) {
          data.teamsLink = `https://${data.teamsLink.replace(/^\/+/, "")}`;
        }

        setApplication(data);
      } catch (err: any) {
        setError(err.message || "Failed to load application details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  if (isLoading) return <p>Loading application details…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!application) return <p>No details found.</p>;

  return (
    <div className="container">
      <div className="about-section">
        <div className="about-title">
          <h3>{application.jobTitle}</h3>
        </div>
        <div className="about-description">
          <p>
            <strong>Application ID:</strong> {application.applicationId}
          </p>
          <p>
            <strong>Job ID:</strong> {application.jobId}
          </p>
          <p>
            <strong>Status:</strong> {getStatusLabel(application.status)}
          </p>
          <p>
            <strong>Job Title:</strong> {application.jobTitle}
          </p>
          <p>
            <strong>Job Description:</strong> {application.jobDescription}
          </p>
          {application.teamsLink && (
            <p>
              <strong>Teams Link:</strong>{" "}
              <a
                href={application.teamsLink}
                target="_blank"
                rel="noreferrer"
              >
                Join Meeting
              </a>
            </p>
          )}
          {application.scheduledTime && (
            <p>
              <strong>Scheduled Time:</strong>{" "}
              {formatDateTime(application.scheduledTime)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetails;
