import type { Job } from '../../types/candidate/Job';

export async function fetchJobs(): Promise<Job[]> {
  const response = await fetch('http://localhost:5109/api/candidate/Jobs');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}