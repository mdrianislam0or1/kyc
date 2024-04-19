import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TUser } from './user.interface';
import { UserServices } from './user.service';
import { decodeToken } from '../../utils/hashOrDecodePW';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';

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
    const user = await UserServices.loginUserFromDB(nid, password);

    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        nid: user.nid,
        role: user.role,
        email: user.email,
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
    sendResponse(res, {
      statusCode: 400,
      success: false,
      message: error.message,
      data: null,
    });
  }
});

export const UserControllers = {
  UserController,
  userLoginController,
};
