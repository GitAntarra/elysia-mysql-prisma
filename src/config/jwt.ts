import jwt from "@elysiajs/jwt";
import { t } from "elysia";

export const jwtConfig = () => {
  return jwt({
    name: "jwt",
    schema: t.Object({ username: t.String() }),
    secret: process.env.JWT_SECRET!,
    exp: process.env.JWT_EXPIRED,
  });
};
