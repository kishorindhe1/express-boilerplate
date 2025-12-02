// src/models/User.ts
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 12;

@Table({
  tableName: 'users',
  timestamps: true,
  underscored: true,
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  passwordHash!: string;

  @CreatedAt
  createdAt!: Date;

  @UpdatedAt
  updatedAt!: Date;

  // Instance method
  async setPassword(plainPassword: string) {
    this.passwordHash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
  }

  async comparePassword(plainPassword: string): Promise<boolean> {
    return bcrypt.compare(plainPassword, this.passwordHash);
  }
}

export default User;
