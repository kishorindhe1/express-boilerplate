// repositories/userRepository.ts
import { User } from '@/models'; // the model we fixed earlier

export const userRepository = {
  /**
   * Creates a new user in the database (securely with hashed password)
   */
  async addUser(name: string, email: string, password: string) {
    const user = new User({
      name,
      email: email.toLowerCase().trim(),
    });

    await user.setPassword(password); // bcrypt hash
    await user.save();

    // Return safe data — NEVER return passwordHash
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    };
  },

  /**
   * Get user by email for sign-in (returns passwordHash for comparison)
   */
  async signInUser(email: string) {
    const user = await User.findOne({
      where: { email: email.toLowerCase().trim() },
      attributes: ['id', 'name', 'email', 'passwordHash', 'createdAt'],
    });

    if (!user) {
      return null; // Important: don't say "user not found" for security
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash, // needed for comparison in service layer
      createdAt: user.createdAt,
    };
  },
};
