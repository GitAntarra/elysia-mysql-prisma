import { JWTOption } from "@elysiajs/jwt";
import { HttpError } from "../common/errorCode";
import db from "../config/db";
import { CredentialStatic } from "../dto/auth";
import { User } from "../dto/users";

export class AuthService {
  async SignIn(data: CredentialStatic): Promise<User> {
    // Check signin with username
    let user = await db.users.findFirst({
      where: {
        OR: [
          {
            username: data.username,
          },
          {
            email: data.username,
          },
        ],
      },
      select: {
        username: true,
        email: true,
        role: true,
        name: true,
        password: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw HttpError.Unauthorized("Silahkan periksa kembali kredensial anda");
    }

    // check user password is match
    const passVerif = Bun.password.verifySync(data.password, user.password);

    user.password = '';

    if (!passVerif) {
      throw HttpError.Unauthorized("Silahkan periksa kembali kredensial anda");
    }

    return user;
  }
}
