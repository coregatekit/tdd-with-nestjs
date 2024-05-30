import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

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
}
