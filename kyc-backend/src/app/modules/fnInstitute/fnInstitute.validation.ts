import { z } from 'zod';

export const createInstituteValidation = z.object({
  name: z.string(),
  registrationNumber: z.string(),
  email: z.string().email(),
  password: z.string(),
  fullName: z.string(),
  address: z.string(),
  contactNumber: z.string(),
  website: z.string(),
  financialLicense: z.string(),
});
