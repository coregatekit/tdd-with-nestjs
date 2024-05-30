import * as bcrypt from 'bcrypt';

/** Function that hash password
 * @param password The password to be hashed
 * @returns The hashed password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}
