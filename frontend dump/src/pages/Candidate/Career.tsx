// src/pages/Career/Career.tsx
import React, { useEffect, useState } from 'react';
import { fetchJobs } from '../../services/candidate/jobApi';
import type { Job } from '../../types/candidate/Job';
import JobCard from '../../components/Candidate/JobCard';

const Career: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchJobs()
      .then(setJobs)
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container'>
    <div className="job-container">
      {jobs.map((job) => (
        <JobCard key={job.jobId} job={job} />
      ))}
    </div>
    </div>
  );
};

export default Career;