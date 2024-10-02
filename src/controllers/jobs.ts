import { NextFunction, Request, Response } from 'express';
import httpResponse from '../utils/httpResponse';
import responseMessages from '../constants/responseMessages';
import httpError from '../utils/httpError';
import {
  readJobsFromFile,
  updateJobInFile,
  writeJobsToFile
} from '../utils/jobs';
import { Job } from '../types';
import { fetchRandomPhotos } from '../service/unsplash';

export const self = (req: Request, res: Response, next: NextFunction) => {
  try {
    httpResponse(req, res, 200, responseMessages.SUCCESS, { id: 'id' });
  } catch (err) {
    httpError(next, err, req, 500);
  }
};

export const createJob = (req: Request, res: Response, next: NextFunction) => {
  const jobs = readJobsFromFile();
  const jobId = `${jobs.length + 1}-${Date.now()}`;
  const newJob: Job = {
    id: jobId,
    status: 'pending'
  };

  jobs.push(newJob);
  writeJobsToFile(jobs);

  // for delayed execution (5 sec to 5 min)
  const delay = Math.floor(Math.random() * (300000 - 5000) + 5000);
  // TODO: For scalability, and reliability  + High load concurrency handling we need to use message queue system like BullMQ + Redis combo
  setTimeout(async () => {
    try {
      const imageUrls = await fetchRandomPhotos({ count: 5, query: 'food' });
      // Update the job once it's resolved
      updateJobInFile(jobId, {
        status: 'resolved',
        result: imageUrls
      });
    } catch (error) {
      updateJobInFile(jobId, {
        status: 'failed',
        result: []
      });
      httpError(next, error, req, 500);
    }
  }, delay);
  httpResponse(req, res, 200, responseMessages.SUCCESS, {
    jobId
  });
};
