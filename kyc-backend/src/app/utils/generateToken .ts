import jwt from 'jsonwebtoken';

const generateToken = (userId: string): string => {
  const secretKey = 'dasfdsfsfsdfsdf';
  const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
  return token;
};

export default generateToken;
