import { handlePrismaError } from '../../../middleware/PrismaError';
import { prisma } from '../../../utils';

/**
 * DbService provides database operations related to user authentication.
 * @property createUser - Creates a new user with the given name, email, and password.
 */
export const userRepository = {
  /**
   * Creates a new user in the database.
   * @param name - The name of the user.
   * @param email - The email address of the user.
   * @param password - The password for the user.
   * @returns The created user record.
   */
  async addUser(name: string, email: string, password: string) {
    try {
      return await prisma.user.create({
        data: { name, email, password },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  },
  /**
   * Get user in the database.
   * @param email - The email address of the user.
   * @returns The created user record.
   */
  async signInUser(email: string) {
    try {
      return await prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: true,
          createdAt: true,
        },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  },
};
