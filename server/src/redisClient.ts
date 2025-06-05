//src/redisClient.ts
import { createClient, RedisClientType } from 'redis';
import logger from './utils/logger';

const redisClient: RedisClientType = createClient({
  url: 'redis://localhost:6379'
});

redisClient.on('error', (err: Error) => logger.error(`Redis Client Error: ${err.message}`));

(async () => {
  try {
    await redisClient.connect();
    logger.info('Redis client connected');
  } catch (err) {
    logger.error(`Failed to connect Redis client: ${(err as Error).message}`);
  }
})();

export default redisClient;

