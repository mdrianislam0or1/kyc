import { Document, Model } from 'mongoose';
import { INSTITUTE_ROLE } from './fnInstitute.constant';
import { TUser } from '../user/user.interface';

export interface TFinancialInstitute extends Document {
  _id: string;
  name: string;
  registrationNumber: string;
  email: string;
  password: string;
  role: keyof typeof INSTITUTE_ROLE;
  fullName: string;
  address: string;
  contactNumber: string;
  website: string;
  financialLicense: string;
  users: TUser['_id'][]; // Array of user IDs
  verify: boolean; // Verification status
  otp?: string;
}

export interface FinancialInstituteModel extends Model<TFinancialInstitute> {
  isFinancialInstituteExistById(_id: string): Promise<TFinancialInstitute>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
