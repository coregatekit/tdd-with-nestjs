import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

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
}
