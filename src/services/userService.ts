import { Role } from "@prisma/client";
import db from "../config/db";
import { CreateUserStatic, UpdateUserStatic, User } from "../dto/users";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NotFoundError } from "elysia";
import { HttpError } from "../common/errorCode";

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
          throw HttpError.Conflict(
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
          throw HttpError.Conflict(
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
    const user = await db.users.findUnique({ where: { username } });
    if (!user) {
      throw HttpError.NotFound("User Not Found");
    }

    const verifOldPass = Bun.password.verifySync(oldpassword, user.password);
    if (!verifOldPass) {
      throw HttpError.BadRequest("Old Password is not match");
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
  }

  async deleteUser(username: string): Promise<any> {
    try {
      const userDelete = await db.users.delete({
        where: {
          username,
        },
      });
      return userDelete;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        const { code } = err;
        if (code === "P2025") throw HttpError.NotFound(`username Not FOund`);
      }

      throw HttpError.Internal();
    }
  }
}
