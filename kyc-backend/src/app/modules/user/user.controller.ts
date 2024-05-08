import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TUser } from './user.interface';
import { UserServices } from './user.service';
import { decodeToken } from '../../utils/hashOrDecodePW';
import config from '../../config';
import jwt from 'jsonwebtoken';

const UserController = catchAsync(async (req, res) => {
  try {
    const userData: TUser = req.body;
    const user = await UserServices.createUserIntoDB(userData);

    const responseData = {
      _id: user._id,
      username: user.username,
      nid: user.nid,
      email: user.email,
      role: user.role,
      otp: user.otp,
      fullName: user.fullName,
      dateOfBirth: user.dateOfBirth,
      nationality: user.nationality,
      residentialAddress: user.residentialAddress,
      contactNumber: user.contactNumber,
      identificationType: user.identificationType,
      identificationNumber: user.identificationNumber,
      issueDate: user.issueDate,
      expirationDate: user.expirationDate,
      signature: user.signature,
      photograph: user.photograph,
      occupation: user.occupation,
      employer: user.employer,
      tin: user.tin,
      sourceOfFunds: user.sourceOfFunds,
      purposeOfAccount: user.purposeOfAccount,
    };

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
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

const userLoginController = catchAsync(async (req, res) => {
  try {
    const { nid, password } = req.body;

    console.log('Received nid:', nid);
    console.log('Received password:', password);

    const user = await UserServices.loginUserFromDB(nid, password);

    console.log('Authenticated user:', user);

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        nid: user.nid,
        role: user.role,
        email: user.email,
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
        nationality: user.nationality,
      },
      config.jwt_secret as string,
      {
        expiresIn: config.jwt_secret_IN,
      },
    );

    console.log(decodeToken(token, config.jwt_secret as string));
    const responseData = {
      user: {
        _id: user._id,
        username: user.username,
        nid: user.nid,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
        nationality: user.nationality,
      },
      token,
    };

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User login successful',
      data: responseData,
    });
  } catch (error: any) {
    console.error('Error during user authentication:', error);

    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

const getAllUsersController = catchAsync(async (req, res) => {
  try {
    const users = await UserServices.getAllUsers();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: users,
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

const getUserDataController = catchAsync(async (req, res) => {
  try {
    const userId = req.user._id;
    const userData = await UserServices.getUserData(userId);
    if (!userData) {
      sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'User data not found',
        data: null,
      });
      return;
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User data retrieved successfully',
      data: userData,
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

export const UserControllers = {
  UserController,
  userLoginController,
  getAllUsersController,
  getUserDataController,
};
