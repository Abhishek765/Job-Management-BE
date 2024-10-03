import { Router } from 'express';
import { createJob, getJobById, getJobs } from '../controllers/jobs';

const jobRouter = Router();

jobRouter.route('/').post(createJob);
jobRouter.route('/').get(getJobs);
jobRouter.route('/:id').get(getJobById);

export default jobRouter;
