import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateResource =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err: unknown) {
      // Pass error to global error handler
      next(err);
    }
  };

export default validateResource;
