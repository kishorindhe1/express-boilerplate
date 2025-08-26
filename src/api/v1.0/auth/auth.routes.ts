import express from 'express';
import { validateResource } from '../../../middleware';
import jwtMiddleware from '../../../middleware/jwtMiddleware';
import redis from '../../../utils/redis';
import { authController } from './auth.controller';
import { createUserSchema, singInSchema } from './auth.schema';
const router = express.Router();

router.post('/register', validateResource(createUserSchema), authController.addUser);
router.post('/sign-in', validateResource(singInSchema), authController.signIn);
router.get('/profile', jwtMiddleware, (req, res) => {
  redis.set('foo', 'bar');
  res.send('profile route');
});
export default router;
