import { User } from './user';
import { IUser } from './users.interface';

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
});
