// src/components/JobCard.tsx
import React from 'react';
import type { Job } from '../types/Job';
import { useNavigate } from 'react-router-dom';

export interface JobCardProps {
  job: Job;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div className="about-section">
      <h3 className="about-title">{job.jobTitle}</h3>
      <span style={{ color: '#1a237e', fontWeight: 600 }}>Location: Bengaluru</span>
      <div className="about-description" style={{ marginTop: 8 }}>
        <span>{job.yearsExperience} years of Experience</span>
      </div>
      <div className="about-description" style={{ marginTop: 8 }}>
        <span>{job.jobDescription}</span>
      </div>
      <button
        className="apply-btn"
        onClick={() => navigate(`/viewJob/${job.jobId}`)}
        style={{ marginTop: 8 }}
      >
        View
      </button>
    </div>
  );
};

export default JobCard;