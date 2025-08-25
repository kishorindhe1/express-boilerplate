// src/schemas/user.schema.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  body: z
    .object({
      name: z.string().min(2, 'Name must be at least 2 characters long'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
    .strict(),
});
export const singInSchema = z.object({
  body: z
    .object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters long'),
    })
    .strict(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>['body'];
