import cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss';

const sanitize = (value: any): any => {
  if (typeof value === 'string') return xss(value);
  if (Array.isArray(value)) return value.map(sanitize);
  if (value && typeof value === 'object') {
    const cleaned: any = {};
    for (const key in value) {
      cleaned[key] = sanitize(value[key]);
    }
    return cleaned;
  }
  return value;
};

export const securityMiddleware = [
  helmet({
    contentSecurityPolicy: false,
  }),
  cors(), // configure allowlist in production
  hpp(), // Parameter pollution block
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = sanitize(req.body);
    req.query = sanitize(req.query);
    req.params = sanitize(req.params);
    next();
  },
];
