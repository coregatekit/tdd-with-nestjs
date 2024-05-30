import { Prisma } from '@prisma/client';

export type UserSelectType = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const userSelect = {
  id: true,
  email: true,
  name: true,
  password: true,
  createdAt: true,
  updatedAt: true,
};

export type UserPrismaResult = Prisma.UserGetPayload<{
  select: typeof userSelect;
}>;
