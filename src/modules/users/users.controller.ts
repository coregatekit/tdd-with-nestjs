import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDTO, UpdateUserDTO } from './users.interface';

@Controller('users')
export class UsersController {
  private readonly _usersService: UsersService;

  /**
   * A constructor of the UsersController that injects the UsersService
   */
  constructor(private userService: UsersService) {
    this._usersService = this.userService;
  }

  /**
   * Controller Method GET that find user by email
   * @param email The email @type string
   * @returns The user response @interface IUserResponse
   */
  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return this._usersService.findUserByEmail(email);
  }

  /**
   * Controller Method POST that register user
   * @param registerUserDTO @interface RegisterUserDTO
   * @returns The user response @interface IUserResponse
   */
  @Post()
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return this._usersService.register(registerUserDTO);
  }

  /**
   * Controller Method PATCH that update user
   * @param id is user id @type string
   * @param updateUserDTO is request body to update user information
   * @returns The user response @interface IUserResponse
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this._usersService.update(id, updateUserDTO);
  }
}
