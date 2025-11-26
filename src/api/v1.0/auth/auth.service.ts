import { generateTokens } from '@/middleware';
import { comparePassword, hashPassword } from '../../../utils';
import { userRepository } from './auth.repository';
import { IUserInfo } from './auth.types';

/**
 * Adds a new user to the database.
 * @param info - An object containing user details: name, email, and password.
 * @returns The result of the user creation operation.
 */

const addUser = async (info: IUserInfo) => {
  const { name = '', email, password } = info;
  const encryptPassword = await hashPassword(password);
  const result = await userRepository.addUser(name, email, encryptPassword);
  return result;
};
/**
 * Adds a new user to the database.
 * @param info - An object containing user details:  email, and password.
 * @returns The result of the user creation operation.
 */

const signIn = async (info: IUserInfo) => {
  const { email, password } = info;

  // get user by email
  const result = await userRepository.signInUser(email);

  if (!result) {
    throw new Error('Invalid credentials');
  }

  // compare password
  if (!comparePassword(password, result.password)) {
    throw new Error('Invalid credentials');
  }
  const token = generateTokens({ userId: result.id, email: result.email });
  // strip password before returning
  const { password: _, ...safeUser } = result;

  return { ...safeUser, ...token };
};

export const authService = {
  addUser,
  signIn,
};
