import httpStatus from 'http-status';
import ApplicationError from '../../errorHandler/ApplicationError';
import { TFinancialInstitute } from './fnInstitute.interface';
import { FinancialInstitute } from './fnInstitute.model';

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
    const institute = await FinancialInstitute.findOne({
      registrationNumber,
    }).select('+password');
    if (!institute) {
      throw new Error('Invalid login credentials');
    }
    const isPasswordMatched = await FinancialInstitute.isPasswordMatched(
      password,
      institute.password,
    );
    if (!isPasswordMatched) {
      throw new ApplicationError(
        httpStatus.UNAUTHORIZED,
        'Invalid login credentials',
      );
    }
    return institute;
  } catch (error) {
    throw new ApplicationError(
      httpStatus.UNAUTHORIZED,
      'Invalid login credentials',
    );
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

const getAllInstitutes = async () => {
  try {
    return await FinancialInstitute.find();
  } catch (error) {
    throw new ApplicationError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Error while fetching institutions',
    );
  }
};

export const InstituteServices = {
  createInstituteIntoDB,
  loginInstituteFromDB,
  getAllInstitutesFromDB,
};
