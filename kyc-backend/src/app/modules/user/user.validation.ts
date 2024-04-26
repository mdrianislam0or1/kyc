import { z } from 'zod';

export const createUserValidation = z.object({
  fullName: z.string(),
  dateOfBirth: z.string().optional().nullable(),
  nationality: z.string(),
  residentialAddress: z.string(),
  contactNumber: z.string(),
  email: z.string().email(),
  identificationType: z.string(),
  identificationNumber: z.string(),
  issueDate: z.string(),
  expirationDate: z.string(),
  signature: z.string(),
  photograph: z.string(),
  occupation: z.string(),
  employer: z.string(),
  tin: z.string(),
  sourceOfFunds: z.string(),
  purposeOfAccount: z.string(),
});
