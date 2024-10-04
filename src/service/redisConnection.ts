import Redis from 'ioredis';

const redisConnection = new Redis({
  port: 6379,
  host: '127.0.0.1', // local connection
  maxRetriesPerRequest: null
});

export default redisConnection;
