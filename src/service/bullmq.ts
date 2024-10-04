import { Queue } from 'bullmq';
import redisConnection from '../service/redisConnection';
import bullmq from '../constants/bullmq';

// Initialize Redis and BullMQ Queue -> for Job Queue
const jobQueue = new Queue(bullmq.QUEUE_NAME, {
  connection: redisConnection
});

// We can export all queues from here
export { jobQueue };
