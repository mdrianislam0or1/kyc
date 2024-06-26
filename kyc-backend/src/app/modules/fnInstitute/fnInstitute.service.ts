import httpStatus from 'http-status';
import ApplicationError from '../../errorHandler/ApplicationError';
import { TFinancialInstitute } from './fnInstitute.interface';
import { FinancialInstitute } from './fnInstitute.model';
import { User } from '../user/user.model';
import { sendOTP } from '../../utils/sendOTP';
import bcrypt from 'bcrypt';
const createInstituteIntoDB = async (
  instituteData: TFinancialInstitute,
): Promise<TFinancialInstitute> => {
  const institute = new FinancialInstitute(instituteData);
  return await institute.save();
};

const loginInstituteFromDB = async (
  registrationNumber: string,
  password: string,
) => {
  try {
    const institute = await FinancialInstitute.findOne({ registrationNumber });

    if (!institute) {
      throw new Error('Invalid login credentials');
    }

    const isPasswordMatched = await bcrypt.compare(
      password,
      institute.password,
    );

    if (!isPasswordMatched) {
      throw new Error('Invalid login credentials');
    }

    return institute;
  } catch (error) {
    throw new Error('Invalid login credentials');
  }
};

const getAllInstitutesFromDB = async (): Promise<TFinancialInstitute[]> => {
  try {
    return await FinancialInstitute.find();
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while fetching institutes',
    );
  }
};

const addUsersRequestToInstitute = async (
  instituteId: string,
  userNIDs: string[],
): Promise<void> => {
  try {
    const institute = await FinancialInstitute.findById(instituteId);
    if (!institute) {
      throw new Error('Financial institute not found');
    }

    for (const nid of userNIDs) {
      const user = await User.findOne({ nid });
      const OTP = Math.floor(100000 + Math.random() * 900000).toString();

      if (user) {
        user.otp = OTP;
        await sendOTP(user.email, OTP);
        await user.save();
      }
    }

    institute.verify = true;
    await institute.save();
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while adding users to institute',
    );
  }
};

const verifyAndaddUsersToInstitute = async (
  instituteId: string,
  userNIDs: string[],
  otp: string,
): Promise<void> => {
  try {
    const institute = await FinancialInstitute.findById(instituteId);
    if (!institute) {
      throw new Error('Financial institute not found');
    }

    if (!institute.verify) {
      throw new Error('Institute is not verified');
    }

    for (const nid of userNIDs) {
      const user = await User.findOne({ nid });

      if (user && user.otp === otp && !institute?.users?.includes(user._id)) {
        institute?.users?.push(user._id);
        await user.save();
      }
    }

    await institute.save();
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while adding users to institute',
    );
  }
};

const getSingleInstituteWithUsers = async (
  instituteId: string,
): Promise<TFinancialInstitute | null> => {
  try {
    return await FinancialInstitute.findById(instituteId)
      .populate('users')
      .exec();
  } catch (error) {
    throw new Error('Error while fetching institute with users');
  }
};
export const InstituteServices = {
  createInstituteIntoDB,
  loginInstituteFromDB,
  getAllInstitutesFromDB,
  addUsersRequestToInstitute,
  verifyAndaddUsersToInstitute,
  getSingleInstituteWithUsers,
};
