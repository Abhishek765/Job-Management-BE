import { Router } from 'express';
import { createJob } from '../controllers/jobs';

const jobRouter = Router();

jobRouter.route('/').post(createJob);
// jobRouter.route('/').get(getJobs);
// jobRouter.route('/:id').get(getJobById);

export default jobRouter;
