import { generateTokens } from '../../../middleware/jwtMiddleware';
import { comparePassword, hashPassword } from '../../../utils';
import { userRepository } from './auth.db';

/**
 * Adds a new user to the database.
 * @param info - An object containing user details: name, email, and password.
 * @returns The result of the user creation operation.
 */

export interface UserInfo {
  name?: string;
  email: string;
  password: string;
}

const addUser = async (info: UserInfo) => {
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

const signIn = async (info: UserInfo) => {
  const { email, password } = info;

  try {
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
  } catch (error) {
    throw error;
  }
};

export const authService = {
  addUser,
  signIn,
};
