import { Role } from "@prisma/client";
import db from "../config/db";
import { CreateUserStatic, UpdateUserStatic, User } from "../dto/users";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UserServices {
  async createUser(data: CreateUserStatic): Promise<User> {
    try {
      const hasPass = Bun.password.hashSync(data.password);
      const createUser = await db.users.create({
        data: {
          username: data.username,
          email: data.email,
          password: hasPass,
          role: data.role,
          name: data.name,
        },
      });

      return createUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        const { code } = err;
        if (code === "P2002")
          throw new Error(
            `username ${data.username} or email ${data.email} is already added`
          );
      }

      throw new Error("error");
    }
  }

  async showAllUser(): Promise<User[]> {
    const users = await db.users.findMany({
      select: {
        username: true,
        email: true,
        role: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return users;
  }

  async showUserByUsername(username: string): Promise<User> {
    const user = await db.users.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    return user;
  }

  async updateUser(username: string, data: UpdateUserStatic): Promise<User> {
    try {
      const updateUser = await db.users.update({
        data: {
          username: data.username,
          email: data.email,
          role: data.role,
          name: data.name,
        },
        where: {
          username,
        },
      });

      return updateUser;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        const { code } = err;
        if (code === "P2002")
          throw new Error(
            `username ${data.username} or email ${data.email} is already added`
          );
      }

      throw new Error("error");
    }
  }

  async updateUserPassword(
    username: string,
    oldpassword: string,
    password: string
  ): Promise<User> {
    try {
      const user = await db.users.findUnique({ where: { username } });
      if (!user) {        
        throw new Error("user not found");
      }

      const verifOldPass = Bun.password.verifySync(oldpassword, user.password);
      if (!verifOldPass) {
        throw new Error("Old Password is not match");
      }

      const hashNewPass = Bun.password.hashSync(password);
      const updateUserPassword = await db.users.update({
        data: {
          password: hashNewPass,
        },
        where: {
          username,
        },
      });

      return updateUserPassword;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        const { code } = err;
      }

      throw new Error(typeof err === 'object' ? JSON.stringify(err) : 'error');
    }
  }
}
