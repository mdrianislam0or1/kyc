import httpStatus from 'http-status';
import ApplicationError from '../../errorHandler/ApplicationError';
import { TUser } from './user.interface';
import { User } from './user.model';
import bcrypt from 'bcrypt';

const createUserIntoDB = async (userData: TUser): Promise<TUser> => {
  const user = new User({
    username: userData.username,
    nid: userData.nid,
    email: userData.email,
    password: userData.password,
    role: userData.role || 'user',
    otp: null,
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
      throw new Error('User not found');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      throw new Error('Invalid password');
    }

    return user;
  } catch (error) {
    console.error('Error during user authentication:', error);
    throw new Error('Invalid login credentials');
  }
};

const getAllUsers = async () => {
  try {
    return await User.find();
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while fetching users',
    );
  }
};

const getUserData = async (userId: string) => {
  try {
    return await User.findById(userId).select('-password');
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while fetching user data',
    );
  }
};

export const UserServices = {
  createUserIntoDB,
  loginUserFromDB,
  getAllUsers,
  getUserData,
};
