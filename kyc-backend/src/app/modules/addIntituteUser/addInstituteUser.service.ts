import { sendOTP } from '../../utils/sendOTP';
import { User } from '../user/user.model';
import InstituteUser from './addInstituteUser.model';
export async function addUsersToInstitute(
  instituteId: string,
  userNIDs: string[],
): Promise<void> {
  try {
    for (const nid of userNIDs) {
      const user = await User.findOne({ nid });

      if (user) {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await sendOTP(user.email, otp);
        await InstituteUser.create({ instituteId, userId: user._id });
      }
    }
  } catch (error) {
    throw new Error('Error while adding users to institute');
  }
}

export async function verifyAndAddUserToInstitute(
  instituteId: string,
  nid: string,
  otp: string,
): Promise<void> {
  try {
    const user = await User.findOne({ nid });
    const instituteUser = await InstituteUser.findOne({
      instituteId,
      userId: user?._id,
    });

    if (user && instituteUser && user.otp === otp) {
      instituteUser.verified = true;
      await instituteUser.save();
    }
  } catch (error) {
    throw new Error('Error while verifying and adding user to institute');
  }
}

export async function getAllUsersByInstitute(instituteId: string) {
  try {
    const instituteUsers = await InstituteUser.find({ instituteId }).populate(
      'userId',
    );
    const users = instituteUsers.map((instituteUser) => instituteUser.userId);
    return users;
  } catch (error) {
    throw new Error('Error while fetching users by institute');
  }
}
