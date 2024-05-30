import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import {
  IUserResponse,
  RegisterUserDTO,
  UpdateUserDTO,
} from './users.interface';
import { User } from './user';
import { UserPrismaResult } from './user.type';
import { HttpException } from '@nestjs/common';
import { hashPassword } from '../../utils/hash';

jest.mock('../../utils/hash', () => ({
  hashPassword: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  };

  const RealDate = Date.now;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    global.Date.now = jest.fn(() => new Date('2024-01-23T10:20:30Z').getTime());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByEmail', () => {
    it('should return a user', async () => {
      const mockedUser = new User(
        '1',
        'John Doe',
        'john@example.com',
        'password',
        new Date(),
        new Date(),
      );
      const expectedUser = {
        id: mockedUser.id,
        name: mockedUser.name,
        email: mockedUser.email,
        createdAt: new Date(),
        updatedAt: new Date(),
      } as IUserResponse;
      mockPrismaService.user.findFirst.mockResolvedValue(mockedUser);
      service.transformUserToResponse = jest
        .fn()
        .mockResolvedValue(expectedUser);

      const result = await service.findUserByEmail(expectedUser.email);

      expect(result).toEqual(expectedUser);
      expect(mockPrismaService.user.findFirst).toBeCalledWith({
        where: { email: expectedUser.email },
      });
      expect(service.transformUserToResponse).toBeCalled();
    });

    it('should throw http exception if user not found', async () => {
      mockPrismaService.user.findFirst.mockResolvedValue(null);

      try {
        await service.findUserByEmail('john@example.com');
      } catch (error) {
        expect(error).toBeInstanceOf(HttpException);
        expect(error.message).toEqual('User not found');
        expect(error.getStatus()).toEqual(404);
        expect(mockPrismaService.user.findFirst).toBeCalledWith({
          where: { email: 'john@example.com' },
        });
      }
    });
  });

  describe('register', () => {
    it('should register a new user', async () => {
      const registerUser: RegisterUserDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const mockedNewUser = new User(
        '1',
        registerUser.name,
        registerUser.email,
        registerUser.password,
        new Date(),
        new Date(),
      );
      const expectedUserResponse: IUserResponse = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockPrismaService.user.create.mockResolvedValue(mockedNewUser);
      service.transformUserToResponse = jest
        .fn()
        .mockResolvedValue(expectedUserResponse);

      const result = await service.register(registerUser);

      expect(result).toEqual(expectedUserResponse);
      expect(mockPrismaService.user.create).toBeCalledWith({
        data: {
          name: registerUser.name,
          email: registerUser.email,
          password: 'hashed_password',
        },
      });
      expect(hashPassword).toBeCalledWith(registerUser.password);
      expect(service.transformUserToResponse).toBeCalledWith(mockedNewUser);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUser: UpdateUserDTO = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password',
      };
      const expectedUserResponse: IUserResponse = {
        id: '1',
        name: 'Jane Doe',
        email: 'jane@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const mockedUpdateUserResult: UserPrismaResult = {
        ...expectedUserResponse,
        password: 'hashed_password',
      };
      const mockedUpdatedUser = new User().fromPrismaResult(
        mockedUpdateUserResult,
      );
      mockPrismaService.user.update.mockResolvedValue(mockedUpdateUserResult);
      service.transformUserToResponse = jest
        .fn()
        .mockResolvedValue(expectedUserResponse);

      const result = await service.update('1', updateUser);

      expect(result).toEqual(expectedUserResponse);
      expect(service.transformUserToResponse).toBeCalledWith(mockedUpdatedUser);
    });
  });

  describe('transformToResponse', () => {
    it('should return a user response', () => {
      const user = new User(
        '1',
        'John Doe',
        'john@example.com',
        'password',
        new Date(),
        new Date(),
      );
      const expectedUserResponse = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      } as IUserResponse;

      const result = service.transformUserToResponse(user);

      expect(result).toEqual(expectedUserResponse);
    });
  });

  afterEach(() => {
    global.Date.now = RealDate;
    jest.clearAllMocks();
  });
});
