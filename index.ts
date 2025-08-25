import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import apiRoutes from './src/api/index'; // Adjust the path as necessary
import { ENV } from './src/config/env'; // Adjust the path as necessary
import { errorHandler, notFoundHandler, requestLogger } from './src/middleware'; // Adjust the path as necessary
import { setupSwagger } from './swagger';
// Initialize Express app
const app = express();

// Middleware
app.use(helmet()); // Security headers
app.use(express.json());

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);
setupSwagger(app);
app.use(requestLogger);
// API routes
app.use('/api', apiRoutes);

// Not found handler
app.use(notFoundHandler);

// Error handler (last middleware)
app.use(errorHandler);

// Start server
const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV.NODE_ENV} environment`);
});
