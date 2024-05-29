import { Prisma } from '@prisma/client';
import { IUser } from './users.interface';
import * as bcrypt from 'bcrypt';

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
  fromPrismaResult(prismaResult: Prisma.$UserPayload): User {
    this.id = prismaResult.scalars.id;
    this.name = prismaResult.scalars.name;
    this.email = prismaResult.scalars.email;
    this.password = prismaResult.scalars.password;
    this.createdAt = prismaResult.scalars.createdAt;
    this.updatedAt = prismaResult.scalars.updatedAt;
    return this;
  }

  /** Method that hashed password
   * @param password The password to be hashed
   * @returns The hashed password
   */
  hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
