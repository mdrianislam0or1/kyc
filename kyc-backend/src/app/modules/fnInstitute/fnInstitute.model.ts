import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import {
  TFinancialInstitute,
  FinancialInstituteModel,
} from './fnInstitute.interface';
import { INSTITUTE_ROLE } from './fnInstitute.constant';
import { USER_ROLE } from '../user/user.constant';

const instituteSchema = new Schema<TFinancialInstitute>({
  name: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    default: null,
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
    enum: Object.values(USER_ROLE),
    default: 'manager',
  },

  fullName: String,
  address: String,
  contactNumber: String,
  website: String,
  financialLicense: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  verify: { type: Boolean, default: false },
});

instituteSchema.pre('save', async function (next) {
  const institute = this as unknown as TFinancialInstitute;
  institute.password = await bcrypt.hash(
    institute.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

instituteSchema.statics.isFinancialInstituteExistById = async function (
  instituteId,
) {
  return await this.findById(instituteId);
};

export const FinancialInstitute = model<
  TFinancialInstitute,
  FinancialInstituteModel
>('FinancialInstitute', instituteSchema);
