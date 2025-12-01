import { jwtMiddleware, validateResource } from '@/middleware';
import express from 'express';
import { authController } from './auth.controller';
import { createUserSchema, singInSchema } from './auth.validator';
const router = express.Router();

router.post('/register', validateResource(createUserSchema), authController.addUser);
router.post('/sign-in', validateResource(singInSchema), authController.signIn);
router.get('/profile', jwtMiddleware, (_, res) => {
  // redis.set('foo', 'bar');
  res.send('profile route');
});
export default router;
