// user.service.ts
import httpStatus from 'http-status';
import ApplicationError from '../../errorHandler/ApplicationError';
import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const user = new User({
    username: userData.username,
    nid: userData.nid,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
    fullName: userData.fullName,
    dateOfBirth: userData.dateOfBirth,
    nationality: userData.nationality,
    residentialAddress: userData.residentialAddress,
    contactNumber: userData.contactNumber,
    identificationType: userData.identificationType,
    identificationNumber: userData.identificationNumber,
    issueDate: userData.issueDate,
    expirationDate: userData.expirationDate,
    signature: userData.signature,
    photograph: userData.photograph,
    occupation: userData.occupation,
    employer: userData.employer,
    tin: userData.tin,
    sourceOfFunds: userData.sourceOfFunds,
    purposeOfAccount: userData.purposeOfAccount,
  });

  return user.save();
};

const loginUserFromDB = async (nid: string, password: string) => {
  try {
    const user = await User.findOne({ nid }).select('+password');
    if (!user) {
      throw new Error('Invalid login credentials');
    }
    const isPasswordMatched = await User.isPasswordMatched(
      password,
      user.password,
    );
    if (!isPasswordMatched) {
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        'Invalid login credentials',
      );
    }
    return user;
  } catch (error) {
    throw new ApplicationError(
      httpStatus.UNAUTHORIZED,
      'Invalid login credentials',
    );
  }
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
};
