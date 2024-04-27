import { Model } from 'mongoose';
import { INSTITUTE_ROLE } from './fnInstitute.constant';

export interface TFinancialInstitute {
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
}

export interface FinancialInstituteModel extends Model<TFinancialInstitute> {
  isFinancialInstituteExistById(_id: string): Promise<TFinancialInstitute>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
