import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { IUserResponse } from './users.interface';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    findUserByEmail: jest.fn(),
    register: jest.fn(),
  };

  const RealDate = Date.now;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);

    global.Date.now = jest.fn(() => new Date('2024-01-23T10:20:30Z').getTime());
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findUserByEmail', () => {
    it('should return a user', async () => {
      const expectedResult: IUserResponse = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockUsersService.findUserByEmail.mockResolvedValue(expectedResult);

      const result = await controller.findUserByEmail('john@example.com');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('register', () => {
    it('should return a user', async () => {
      const registerUserDTO = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
      };
      const expectedResult: IUserResponse = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      mockUsersService.register.mockResolvedValue(expectedResult);

      const result = await controller.register(registerUserDTO);

      expect(result).toEqual(expectedResult);
    });
  });

  afterEach(() => {
    global.Date.now = RealDate;
  });
});
