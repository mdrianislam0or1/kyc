import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import {
  TFinancialInstitute,
  FinancialInstituteModel,
} from './fnInstitute.interface';
import { INSTITUTE_ROLE } from './fnInstitute.constant';

const instituteSchema = new Schema<
  TFinancialInstitute,
  FinancialInstituteModel
>({
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(INSTITUTE_ROLE),
    default: 'other',
  },
  fullName: String,
  address: String,
  contactNumber: String,
  website: String,
  financialLicense: String,
});

instituteSchema.pre('save', async function (next) {
  const institute = this as unknown as TFinancialInstitute;
  institute.password = await bcrypt.hash(
    institute.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

instituteSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashPassword);
};

export const FinancialInstitute = model<
  TFinancialInstitute,
  FinancialInstituteModel
>('FinancialInstitute', instituteSchema);
