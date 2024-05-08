import { Document, Model } from 'mongoose';
import { TUser } from '../user/user.interface';
import { USER_ROLE } from '../user/user.constant';

export interface TFinancialInstitute extends Document {
  _id: string;
  name: string;
  registrationNumber: string;
  email: string;
  password: string;
  role: keyof typeof USER_ROLE;
  fullName: string;
  address: string;
  contactNumber: string;
  website: string;
  financialLicense: string;
  users?: TUser['_id'][];
  verify?: boolean;
  otp?: string;
}

export interface FinancialInstituteModel extends Model<TFinancialInstitute> {
  isFinancialInstituteExistById(_id: string): Promise<TFinancialInstitute>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
