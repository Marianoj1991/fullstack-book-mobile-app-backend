import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET_KEY;

export const generateJWT = (userId) => {
  const token = jwt.sign({ userId }, secretKey, {
    expiresIn: '1d'
  });

  return token;
};
