import Redis from 'ioredis';
import { ENV } from '../config/env.config';
import logger from './logger.utiils';

export const redis = new Redis({
  host: ENV.redis.host, // or "host.docker.internal" if running in Docker on Mac
  port: ENV.redis.port,
  username: ENV.redis.username, // only if you enabled ACL
  password: ENV.redis.password, // only if you enabled ACL
});

redis.on('connect', () => {
  logger.info('✅ Redis connected');
});

redis.on('error', (err) => {
  logger.error('❌ Redis connection error:', err);
});
