import { User } from './user';
import { IUser } from './users.interface';
import { UserPrismaResult } from './user.type';

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
      const prismaResult: UserPrismaResult = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
        isActive: true,
      };

      const user = new User();

      user.fromPrismaResult(prismaResult);

      expect(user).toEqual(prismaResult);
    });
  });
});
