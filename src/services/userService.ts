import { users } from "@prisma/client";
import db from "../config/db";
import { CreateUserStatic } from "../dto/users";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export class UserServices {
    async createUser(data: CreateUserStatic): Promise<users>{
        try {
            const createUser = await db.users.create({
                data: {
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    role: data.role,
                    name: data.name
                }
            })

            return createUser
        } catch (err) {
            if(err instanceof PrismaClientKnownRequestError){                
                const { code } = err
                if(code === "P2002")
                    throw new Error(`username ${data.username} or email ${data.email} is already added`)
            }
            
            throw new Error('error')
        }
    }
}