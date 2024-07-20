import { Role } from "@prisma/client";
import { Static, t } from "elysia";

export type User = {
  username: string;
  email: string;
  password?: string;
  name: string;
  role: keyof typeof Role | string;
  createdAt?: Date;
  updatedAt?: Date;
};

export const CreateUserDto = t.Object({
  username: t.String(),
  email: t.String(),
  password: t.String(),
  name: t.String(),
  role: t.Enum(Role),
});

export type CreateUserStatic = Static<typeof CreateUserDto>;
