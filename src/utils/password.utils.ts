import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hashes a plain text password.
 * @param password - Plain text password
 * @returns Promise<string> - The hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

/**
 * Compares a plain text password with a hashed password.
 * @param plainPassword - The plain text password
 * @param hashedPassword - The hashed password from DB
 * @returns Promise<boolean> - True if match, false otherwise
 */
export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};
