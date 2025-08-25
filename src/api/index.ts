import express from 'express';
import v1Routes from './v1.0/routes';
// Create a new router instance
const router = express.Router();

// Mount API routes under /api
// Add your route handlers or import them here
// Example: router.use('/api', apiRoutes);
router.use('/v1.0', v1Routes);
console.log('API Routes Initialized');
export default router;
