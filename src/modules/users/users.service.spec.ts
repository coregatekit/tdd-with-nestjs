import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { IUserResponse, RegisterUserDTO } from './users.interface';
import { User } from './user';

describe('UsersService', () => {
  let service: UsersService;

  const mockPrismaService = {
    user: {
      findFirst: jest.fn(),
      create: jest.fn(),
    },
  };

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findUserByEmail', () => {
    const RealDate = Date.now;

    beforeEach(() => {
      global.Date.now = jest.fn(() =>
        new Date('2024-01-23T10:20:30Z').getTime(),
      );
    });

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

    afterEach(() => {
      global.Date.now = RealDate;
    });
  });

  describe('register', () => {
    const RealDate = Date.now;

    beforeEach(() => {
      global.Date.now = jest.fn(() =>
        new Date('2024-01-23T10:20:30Z').getTime(),
      );
    });

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
          password: registerUser.password,
        },
      });
      expect(service.transformUserToResponse).toBeCalledWith(mockedNewUser);
    });

    afterEach(() => {
      global.Date.now = RealDate;
    });
  });

  describe('transformToResponse', () => {
    const RealDate = Date.now;
    beforeEach(() => {
      global.Date.now = jest.fn(() =>
        new Date('2024-01-23T10:20:30Z').getTime(),
      );
    });

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

    afterEach(() => {
      global.Date.now = RealDate;
    });
  });
});
