import compression from 'compression';
import express from 'express';
import apiRoutes from './src/api/index';
import { ENV } from './src/config';

import {
  errorHandler,
  generalLimiter,
  notFoundHandler,
  requestLogger,
  securityMiddleware,
} from './src/middleware';
const app = express();

app.use(express.json());

app.use(generalLimiter);
app.use(securityMiddleware);
app.use(compression());
app.use(requestLogger);
// API routes
app.use('/api', apiRoutes);

// Not found handler
app.use(notFoundHandler);

// Error handler (last middleware)
app.use(errorHandler);

// Start server
const PORT = ENV.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);
});

process.on('SIGTERM', () => {
  console.log('Shutting down gracefully...');
  server.close(() => process.exit(0));
});
