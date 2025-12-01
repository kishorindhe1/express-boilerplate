// services/auth.service.ts
import { generateTokens } from '@/middleware';
import { User } from '@/models'; // important: we need the model instance method
import { userRepository } from './auth.repository';
import { IUserInfo } from './auth.types';

const addUser = async (info: IUserInfo) => {
  const { name = '', email, password } = info;

  // Validation (recommended)
  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Repository handles hashing internally → cleaner!
  const result = await userRepository.addUser(name.trim(), email.trim(), password);

  return result; // already safe: no password returned
};

const signIn = async (info: { email: string; password: string }) => {
  const { email, password } = info;

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  // Get user + passwordHash
  const userData = await userRepository.signInUser(email.trim().toLowerCase());

  if (!userData) {
    // Don't say "user not found" → prevents enumeration attacks
    throw new Error('Invalid credentials');
  }

  // Use the model's instance method to compare
  const isValidPassword = await User.prototype.comparePassword.call(
    { passwordHash: userData.passwordHash }, // fake instance with hash
    password,
  );

  // Alternative (cleaner): reconstruct a temporary instance
  // const tempUser = User.build({ passwordHash: userData.passwordHash } as any);
  // const isValidPassword = await tempUser.comparePassword(password);

  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  // Generate tokens
  const token = generateTokens({
    userId: Number(userData.id),
    email: userData.email,
  });

  // Return safe user (never include passwordHash)
  const { passwordHash: _, ...safeUser } = userData;

  return {
    ...safeUser,
    ...token,
  };
};

export const authService = {
  addUser,
  signIn,
};
