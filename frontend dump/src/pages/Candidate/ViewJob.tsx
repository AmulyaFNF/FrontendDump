import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Job {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  requiredSkill: string;
  yearExperience: string;
  jobCreated: string;
}

const ViewJob: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5109/api/candidate/Jobs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const trimmed: Job = {
          jobId: data.jobId,
          jobTitle: data.jobTitle,
          jobDescription: data.jobDescription,
          requiredSkill: data.requiredSkills,
          yearExperience: data.yearsExperience,
          jobCreated: data.createdAt,
        };
        setJob(trimmed);
      });
  }, [id]);

  function handleApplyClick() {
    if (job) {
      // ✅ Pass jobId in navigation state
      navigate(`/apply/${job.jobId}`);
    }
  }

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="about-section">
        <h3 className="about-title">{job.jobTitle}</h3>
        <div className="about-description">
          <b>Job ID:</b> {job.jobId}
        </div>
        <div className="about-description">
          <b>Description:</b> {job.jobDescription}
        </div>
        <div className="about-description">
          <b>Required Skills:</b> {job.requiredSkill}
        </div>
        <div className="about-description">
          <b>Years of Experience:</b> {job.yearExperience}
        </div>
        <div className="about-description">
          <b>Created Date:</b> {job.jobCreated}
        </div>
        <button className="apply-btn" onClick={handleApplyClick}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default ViewJob;
