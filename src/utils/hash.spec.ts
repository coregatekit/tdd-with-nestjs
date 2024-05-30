import { hashPassword } from './hash';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashed_password'),
}));

describe('Hash Utilities', () => {
  describe('hashPassword', () => {
    it('should return a hashed password', async () => {
      const hashedPassword = await hashPassword('password');

      expect(hashedPassword).toEqual('hashed_password');
    });
  });
});
