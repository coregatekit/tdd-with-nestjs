import { IUser } from './users.interface';
import { UserPrismaResult } from './user.type';

export class User implements IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;

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
    isActive?: boolean,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
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
    this.isActive = prismaResult.isActive;
    return this;
  }
}
