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
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  /** Method that hashed password
   * @param password The password to be hashed
   * @returns The hashed password
   */
  hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}
