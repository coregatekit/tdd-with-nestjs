import { IUser, IUserResponse } from './users.interface';
import * as bcrypt from 'bcrypt';
import { UserPrismaResult } from './user.type';

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;

  /** Constructor of the User class
   *
   */
  constructor(
    id?: string,
    name?: string,
    email?: string,
    password?: string,
    createdAt?: Date,
    updatedAt?: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /** Method that convert prisma result to user instance
   * @param prismaResult The prisma result
   * @returns The user instance
   */
  fromPrismaResult(prismaResult: UserPrismaResult): User {
    this.id = prismaResult.id;
    this.name = prismaResult.name;
    this.email = prismaResult.email;
    this.password = prismaResult.password;
    this.createdAt = prismaResult.createdAt;
    this.updatedAt = prismaResult.updatedAt;
    return this;
  }

  /** Method that hashed password
   * @param password The password to be hashed
   * @returns The hashed password
   */
  hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  /**
   * Method that convert user instance to @interface UserResponse
   * @returns The user response @interface IUserResponse
   */
  transformUserToResponse(): IUserResponse {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
