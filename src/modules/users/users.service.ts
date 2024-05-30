import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  IUserResponse,
  RegisterUserDTO,
  UpdateUserDTO,
} from './users.interface';
import { User } from './user';
import { hashPassword } from '../../utils/hash';

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

    if (!user) {
      console.info('User not found');
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return this.transformUserToResponse(user as User);
  }

  /**
   * Method that register user
   * @param registerUserDTO @interface RegisterUserDTO
   * @returns The user response @interface IUserResponse
   */
  async register(registerUserDTO: RegisterUserDTO): Promise<IUserResponse> {
    const hashedPassword = await hashPassword(registerUserDTO.password);
    const newUser = await this._prismaService.user.create({
      data: {
        name: registerUserDTO.name,
        email: registerUserDTO.email,
        password: hashedPassword,
      },
    });
    const user = new User().fromPrismaResult(newUser);
    return this.transformUserToResponse(user);
  }

  /**
   * Method that update user
   * @param id The user id @type string
   * @param updateUserDTO The update user dto @interface UpdateUserDTO
   * @returns The user response @interface IUserResponse
   */
  async update(
    id: string,
    updateUserDTO: UpdateUserDTO,
  ): Promise<IUserResponse> {
    const updatedUser = await this._prismaService.user.update({
      where: { id: id },
      data: {
        name: updateUserDTO.name || undefined,
        email: updateUserDTO.email || undefined,
        password: updateUserDTO.password || undefined,
      },
    });
    const user = new User().fromPrismaResult(updatedUser);
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
