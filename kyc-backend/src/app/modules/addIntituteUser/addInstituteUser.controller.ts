import { Request, Response } from 'express';
import {
  addUsersToInstitute,
  getAllUsersByInstitute,
  verifyAndAddUserToInstitute,
} from './addInstituteUser.service';
import httpStatus from 'http-status';

export async function addUsersToInstituteController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { instituteId, userNIDs } = req.body;
    await addUsersToInstitute(instituteId, userNIDs);
    res.status(200).json({
      success: true,
      message: 'Users added to institute successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

export async function verifyAndAddUserToInstituteController(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const { instituteId, nid, otp } = req.body;
    await verifyAndAddUserToInstitute(instituteId, nid, otp);
    res.status(200).json({
      success: true,
      message: 'User verified and added to institute successfully',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
}

export const getAllUsersByInstituteController = async (
  req: Request,
  res: Response,
) => {
  try {
    const instituteId = req.user?._id;
    if (!instituteId) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Institute ID not found in request',
      });
    }

    const users = await getAllUsersByInstitute(instituteId);

    return res.status(httpStatus.OK).json({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  } catch (error: any) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};
