import cors from 'cors';
import { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss';

const deepSanitize = (input: unknown): unknown => {
  if (typeof input === 'string') {
    return xss(input);
  }

  if (Array.isArray(input)) {
    return input.map(deepSanitize);
  }

  if (input && typeof input === 'object') {
    const result: Record<string, unknown> = {};

    // Safe iteration over object keys without 'any'
    for (const key of Object.keys(input)) {
      result[key] = deepSanitize(
        // TypeScript knows input is object here, but we narrow it safely
        (input as Record<string, unknown>)[key],
      );
    }

    return result;
  }

  return input;
};

// No 'any' anywhere – fully typed middleware
const xssCleanMiddleware = (_req: Request, _res: Response, next: NextFunction) => {
  const req = _req as unknown as {
    body: unknown;
    query: unknown;
    params: unknown;
  };

  req.body = deepSanitize(req.body);
  req.query = deepSanitize(req.query);
  req.params = deepSanitize(req.params);

  next();
};

export const securityMiddleware = [
  helmet({ contentSecurityPolicy: false }),
  cors(),
  hpp(),
  xssCleanMiddleware,
];
