import compression from 'compression';
import express from 'express';
import apiRoutes from './api';
import { ENV } from './config';

import {
  errorHandler,
  generalLimiter,
  notFoundHandler,
  requestLogger,
  securityMiddleware,
} from './middleware';
import { connectDB, logger } from './utils';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectDB();
app.use(generalLimiter);
app.use(securityMiddleware);
app.use(compression());
app.use(requestLogger);
// API routes
app.use('/api', apiRoutes);
app.get('/', (_, res) => {
  res.send('Server is running...');
});
// Not found handler
app.use(notFoundHandler);

// Error handler (last middleware)
app.use(errorHandler);

// Start server
const PORT = ENV.PORT || 3000;
const server = app.listen(PORT, () => {
  logger.info(`Running on ${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('Shutting down gracefully...');
  server.close(() => process.exit(0));
});
