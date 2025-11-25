import rateLimit from 'express-rate-limit';

export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests. Please try again later.',
});

export const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: 'Too many login attempts. Please slow down.',
  standardHeaders: true,
});

export const uploadLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 3,
  message: 'Upload limit reached. Try again later.',
});
