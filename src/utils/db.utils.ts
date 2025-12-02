// src/db.ts
import { Sequelize } from 'sequelize-typescript';
import { ENV } from '@/config';
import { User } from '@/models';
import { Post } from '@/models';
import { logger } from './';

// Direct connection — no extra config file!
export const sequelize = new Sequelize({
  host: ENV.DB.host,
  port: ENV.DB.port,
  database: ENV.DB.database,
  username: ENV.DB.username,
  password: ENV.DB.password,
  dialect: 'postgres',
  logging: false, // set true if you want SQL logs
  models: [User, Post],
  // Optional: better for development
  define: {
    timestamps: false,
    underscored: true,
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any);

// Test connection + auto create/update tables
export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    logger.error('PostgreSQL connected successfully');

    // Creates tables if they don't exist, updates columns if changed
    await sequelize.sync({ alter: false });
    logger.error('Tables synced');
  } catch (error) {
    logger.error('Unable to connect to PostgreSQL:', error);
    process.exit(1); // optional: crash early if DB is down
  }
};
