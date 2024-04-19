import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const decodeToken = (token: string, secretKey: string) => {
  try {
    const decoded = jwt.verify(token, secretKey) as Record<string, any>;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 16);
};

const comparePassword = async (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const passwordHelpers = {
  hashPassword,
  comparePassword,
};

export const isPasswordChangeValid = async (user: any, newPassword: string) => {
  const newPasswordIsUnique = user.passwordChangeHistory.every(
    (change: any) => change.password !== newPassword
  );

  if (!newPasswordIsUnique) {
    throw new Error(
      `Password change failed. Ensure the new password is unique and not among the last 2 used (last used on ${user.passwordChangeHistory[0].timestamp}).`
    );
  }

  user.passwordChangeHistory.push({
    password: user.password,
    timestamp: new Date(),
  });

  if (user.passwordChangeHistory.length > 2) {
    user.passwordChangeHistory.shift();
  }

  await user.save();

  return true;
};
