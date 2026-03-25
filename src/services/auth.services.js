import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const registerUserService = async ({
  email,
  username,
  password,
  profileImage = ''
}) => {
  try {
    const existingUserEmail = await User.findOne({ email });
    if (existingUserEmail) {
      throw new Error('User with this email already exists');
    }

    const existingUserUsername = await User.findOne({ username });
    if (existingUserUsername) {
      console.log('DENTRO DE IF');
      throw new Error('User with this username already exists');
    }

    const user = new User({
      email,
      username,
      password,
      profileImage: profileImage || '/avatar.webp'
    });

    await user.save();

    return user;
  } catch (error) {
    console.log('Error in [registerUserService]', error);
    throw error;
  }
};

export const loginUserService = async ({ email, password }) => {
  try {
    const existingUser = await User.findOne({ email }).select('+password');

    if (!existingUser) throw new Error('Invalid credentials');

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) throw new Error('Invalid credentials');

    return existingUser;
  } catch (error) {
    console.log('Error in [loginUserService]', error);
    throw error;
  }
};
