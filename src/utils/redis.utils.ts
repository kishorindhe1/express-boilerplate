import Redis from 'ioredis';
import { ENV } from '../config/env.config';

const redis = new Redis({
  host: ENV.redis.host, // or "host.docker.internal" if running in Docker on Mac
  port: ENV.redis.port,
  username: ENV.redis.username, // only if you enabled ACL
  password: ENV.redis.password, // only if you enabled ACL
});

redis.on('connect', () => {
  console.log('✅ Redis connected');
});

redis.on('error', (err) => {
  console.error('❌ Redis connection error:', err);
});

export default redis;
