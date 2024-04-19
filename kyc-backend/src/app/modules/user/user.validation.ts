import { z } from 'zod';

export const createUserValidation = z.object({
  email: z.string().email(),
  password: z.string(), // Add validation for the password field
});

export const loginUserValidation = z.object({
  email: z.string().email(),
});
