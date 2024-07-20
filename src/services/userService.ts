import { Role } from "@prisma/client";
import db from "../config/db";
import { CreateUserStatic, User } from "../dto/users";
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
            updatedAt: true
        }
    });

    return users;
  }

  async showUserByUsername(username: string): Promise<User> {
    const user = await db.users.findUnique({
      where: {
        username,
      },
    });

    if(!user){
        throw new Error('user not found')
    }

    return user;
  }
}
