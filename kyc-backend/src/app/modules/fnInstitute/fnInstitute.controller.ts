import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TFinancialInstitute } from './fnInstitute.interface';
import { InstituteServices } from './fnInstitute.service';
import jwt from 'jsonwebtoken';
import config from '../../config';
import ApplicationError from '../../errorHandler/ApplicationError';

const instituteRegisterController = catchAsync(async (req, res) => {
  try {
    const instituteData: TFinancialInstitute = req.body;
    const institute =
      await InstituteServices.createInstituteIntoDB(instituteData);

    const responseData = {
      _id: institute._id,
      name: institute.name,
      registrationNumber: institute.registrationNumber,
      email: institute.email,
      role: institute.role,
      fullName: institute.fullName,
      address: institute.address,
      contactNumber: institute.contactNumber,
      website: institute.website,
      financialLicense: institute.financialLicense,
    };

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Financial institute registered successfully',
      data: responseData,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

const instituteLoginController = catchAsync(async (req, res) => {
  try {
    const { registrationNumber, password } = req.body;
    const institute = await InstituteServices.loginInstituteFromDB(
      registrationNumber,
      password,
    );

    const token = jwt.sign(
      {
        _id: institute._id,
        registrationNumber: institute.registrationNumber,
        role: institute.role,
        email: institute.email,
        fullName: institute.fullName,
        address: institute.address,
        contactNumber: institute.contactNumber,
        website: institute.website,
        financialLicense: institute.financialLicense,
      },
      config.jwt_secret as string,
      {
        expiresIn: config.jwt_secret_IN,
      },
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Financial institute login successful',
      data: {
        institute: {
          _id: institute._id,
          registrationNumber: institute.registrationNumber,
          role: institute.role,
          email: institute.email,
          fullName: institute.fullName,
          address: institute.address,
          contactNumber: institute.contactNumber,
          website: institute.website,
          financialLicense: institute.financialLicense,
        },
        token,
      },
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const getAllInstitutesController = catchAsync(async (req, res) => {
  try {
    const institutes = await InstituteServices.getAllInstitutesFromDB();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Financial institutes retrieved successfully',
      data: institutes,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

const addUsersToInstituteController = catchAsync(async (req, res) => {
  try {
    const { instituteId, userNIDs } = req.body;
    await InstituteServices.addUsersRequestToInstitute(instituteId, userNIDs);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users added Request and send OTP to institute successfully',
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

const verifyAndaddUsersToInstituteController = catchAsync(async (req, res) => {
  try {
    const { instituteId, userNIDs, otp } = req.body;
    await InstituteServices.verifyAndaddUsersToInstitute(
      instituteId,
      userNIDs,
      otp,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users added to institute successfully',
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

const getSingleInstituteWithUsersController = catchAsync(async (req, res) => {
  try {
    const instituteId = req.params.id; // Assuming the instituteId is passed as a route parameter
    const instituteWithUsers =
      await InstituteServices.getSingleInstituteWithUsers(instituteId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Institute with verified users retrieved successfully',
      data: instituteWithUsers,
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: 'Internal server error',
      errorMessage: error.message,
      errorDetails: error,
    });
  }
});

export const InstituteControllers = {
  instituteRegisterController,
  instituteLoginController,
  getAllInstitutesController,
  addUsersToInstituteController,
  verifyAndaddUsersToInstituteController,
  getSingleInstituteWithUsersController,
};
