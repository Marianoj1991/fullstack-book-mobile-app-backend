import { generateJWT } from '../lib/generateJWT.js';
import {
  loginUserService,
  registerUserService
} from '../services/auth.services.js';

export const registerUserController = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const user = await registerUserService({ email, password, username });

    const token = generateJWT(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await loginUserService({ email, password });

    const token = generateJWT(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage
      }
    });
  } catch (error) {
    console.log('ERROR', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
