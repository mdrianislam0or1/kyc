export const isPasswordChangeValid = async (user: any, newPassword: string) => {
  const newPasswordIsUnique = user.passwordChangeHistory.every(
    (change: any) => change.password !== newPassword,
  );

  return newPasswordIsUnique && user.password !== newPassword;
};
