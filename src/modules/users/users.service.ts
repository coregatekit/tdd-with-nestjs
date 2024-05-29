import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { IUserResponse } from './users.interface';
import { User } from './user';

@Injectable()
export class UsersService {
  private readonly _prismaService: PrismaService;

  /**
   * Constructor of the UsersService that inject prisma service
   * @param prismaService The prisma service
   */
  constructor(private prismaService: PrismaService) {
    this._prismaService = this.prismaService;
  }

  /**
   * Method that find user with email
   * @param email The email @type string
   * @returns The user response @interface IUserResponse
   */
  async findUserByEmail(email: string): Promise<IUserResponse> {
    const user = await this._prismaService.user.findFirst({
      where: { email: email },
    });
    return this.transformUserToResponse(user);
  }

  /**
   * Method that transform user to user response
   * @param user The user class @class User
   * @returns The user response type @interface IUserResponse
   */
  transformUserToResponse(user: User): IUserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as IUserResponse;
  }
}
