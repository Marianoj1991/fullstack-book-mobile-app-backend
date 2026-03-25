import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

export const protectRoute = (req, res, next) => {
  const token = req.header('Authorization').split(' ')[1];

  if (!token) {
    return res.status(401).json({
      message: 'No authentication token, access denied'
    });
  }

  const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const user = User.findById(userId);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  req.user = user;

  next();
};
