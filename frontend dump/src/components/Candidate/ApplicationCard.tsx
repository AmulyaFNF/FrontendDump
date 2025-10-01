import React from "react";
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

interface ApplicationCardProps {
  application: ApiApplication;
}

// Map numeric status code to readable text
function getStatusLabel(code: number): string {
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
}

// Format date
function formatDate(iso?: string): string {
  if (!iso) return "-";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application }) => {
  const navigate = useNavigate();

  return (
    <div className="about-section">
      <div className="about-title">
        <h3>{application.jobTitle}</h3>
      </div>

      <div className="about-description">
        <p>
          <strong>Description: </strong>
          {application.jobDescription}
        </p>

        <p>
          <strong>Status: </strong>
          {getStatusLabel(application.applicationStatus)}
        </p>

        <p>
          <strong>Round: </strong>
          {application.currentRound}
        </p>

        <p>
          <strong>Applied On: </strong>
          {formatDate(application.createdAt)}
        </p>

        {application.resumePath ? (
          <p>
            <strong>Resume: </strong>
            <a
              href={application.resumePath}
              target="_blank"
              rel="noreferrer noopener"
            >
              View Resume
            </a>
          </p>
        ) : (
          <p>
            <strong>Resume: </strong> -
          </p>
        )}

        <button
          className="view-button"
          onClick={() =>
            navigate(`/applications/${application.applicationId}`)
          }
        >
          View Application
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;
