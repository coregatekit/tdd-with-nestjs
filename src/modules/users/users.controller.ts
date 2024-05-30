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

  @Get(':email')
  async findUserByEmail(@Param('email') email: string) {
    return this._usersService.findUserByEmail(email);
  }

  @Post()
  async register(@Body() registerUserDTO: RegisterUserDTO) {
    return this._usersService.register(registerUserDTO);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this._usersService.update(id, updateUserDTO);
  }
}
