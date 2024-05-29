import { Prisma } from '@prisma/client';
import { User } from './user';
import { IUser } from './users.interface';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('Users', () => {
  it('should be defined', () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as IUser;
    expect(
      new User(
        mockUser.id,
        mockUser.name,
        mockUser.email,
        mockUser.password,
        mockUser.createdAt,
        mockUser.updatedAt,
      ),
    ).toBeDefined();
  });

  describe('fromPrismaResult', () => {
    it('should convert prisma result to user instance', () => {
      const prismaResult: Prisma.$UserPayload = {
        name: 'User',
        objects: {},
        composites: {},
        scalars: {
          id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          password: 'password',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      };

      const user = new User();

      user.fromPrismaResult(prismaResult);

      expect(user).toEqual(prismaResult.scalars);
    });
  });

  describe('hasedPassword', () => {
    it('should return hashed password', async () => {
      const user = new User(
        '1',
        'John Doe',
        'john@example.com',
        'password',
        new Date(),
        new Date(),
      );

      const result = await user.hashedPassword('password');

      expect(result).toEqual('hashed_password');
      expect(bcrypt.hash).toBeCalledWith('password', 10);
    });
  });
});
