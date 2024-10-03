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

export const createJob = (req: Request, res: Response, next: NextFunction) => {
  try {
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
    const timeoutId = setTimeout(async () => {
      try {
        const imageUrls = await fetchRandomPhotos({ count: 1, query: 'food' });
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
      } finally {
        clearTimeout(timeoutId);
      }
    }, delay);
    httpResponse(req, res, 200, responseMessages.SUCCESS, {
      jobId
    });
  } catch (error) {
    httpError(next, error, req, 500);
  }
};

export const getJobs = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jobs = readJobsFromFile();

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedJobs = jobs.slice(startIndex, endIndex);

    // pagination metadata
    const pagination = {
      totalJobs: jobs.length,
      currentPage: page,
      totalPages: Math.ceil(jobs.length / limit),
      limit: limit
    };

    httpResponse(req, res, 200, responseMessages.SUCCESS, {
      jobs: paginatedJobs,
      pagination
    });
  } catch (error) {
    httpError(next, error, req, 404);
  }
};

export const getJobById = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const jobs = readJobsFromFile();
    const job = jobs.find((job) => job.id === id);

    if (!job) {
      return httpError(next, { message: 'Job not found' }, req, 404);
    }

    httpResponse(req, res, 200, responseMessages.SUCCESS, job);
  } catch (error) {
    httpError(next, error, req, 500);
  }
};
