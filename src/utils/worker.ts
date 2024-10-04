// worker.ts
import { Worker } from 'bullmq';
import { fetchRandomPhotos } from '../service/unsplash';
import { updateJobInFile } from './jobs';
import redisConnection from '../service/redisConnection';
import bullmq from '../constants/bullmq';

const worker = new Worker(
  bullmq.QUEUE_NAME,
  async (job) => {
    const { jobId, query } = job.data;

    try {
      const imageUrls = await fetchRandomPhotos({ count: 1, query });

      updateJobInFile(jobId, {
        status: 'resolved',
        result: imageUrls
      });
    } catch (error) {
      updateJobInFile(jobId, {
        status: 'failed',
        result: []
      });
      console.error('Error processing job:', error);
    }
  },
  {
    connection: redisConnection
  }
);

worker.on('completed', (job) => {
  console.log(`Job with ID ${job.id} has been completed.`);
});

worker.on('failed', (job, err) => {
  console.error(`Job with ID ${job?.id} failed with error: ${err.message}`);
});
