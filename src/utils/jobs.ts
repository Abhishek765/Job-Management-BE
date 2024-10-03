import fs from 'node:fs';
import path from 'node:path';
import { Job } from '../types';

const jobsFilePath = path.join(__dirname, '../../', 'public', 'jobs.json');

export const readJobsFromFile = (): Job[] => {
  if (!fs.existsSync(jobsFilePath)) {
    throw new Error('Failed to read!'); // we can add logger here
  }

  try {
    const data = fs.readFileSync(jobsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    throw new Error('Error while reading the file !', error); // we can add logger here
  }
};

export const writeJobsToFile = (jobs: Job[]): void => {
  try {
    fs.writeFileSync(jobsFilePath, JSON.stringify(jobs, null, 2), 'utf-8');
  } catch (error: any) {
    throw new Error('Failed to write jobs to file', error);
  }
};

export const writeJobsToFileAsync = (jobs: Job[]): void => {
  fs.writeFile(jobsFilePath, JSON.stringify(jobs, null, 2), (err) => {
    if (err) {
      throw new Error('Error writing jobs file:', err);
    }
    console.log('jobs write success!');
  });
};

// Function to update a specific job in the file
export const updateJobInFile = (
  jobId: string,
  updatedJob: Partial<Job>
): void => {
  const jobs = readJobsFromFile();
  const jobIndex = jobs.findIndex((job) => job.id === jobId);

  if (jobIndex !== -1) {
    jobs[jobIndex] = { ...jobs[jobIndex], ...updatedJob };
    writeJobsToFileAsync(jobs);
  }
};
