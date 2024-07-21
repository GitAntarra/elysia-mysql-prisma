import Elysia, { t } from "elysia";
import { jwtConfig } from "../config/jwt";
import { HttpError } from "../common/errorCode";
import db from "../config/db";
import cookie from "@elysiajs/cookie";

export const IsAuthenticated = (app: Elysia) =>
  app
    .use(jwtConfig)
    .use(cookie())
    .derive(async ({ jwt, request: { headers }, cookie: { login } }) => {
      const auth = headers.get("Authorization");
      if (!auth) {
        throw HttpError.Unauthorized("Please set your token first");
      }
      const token = auth.split(" ")[1];
      if (!token) {
        throw HttpError.Unauthorized("Please set your token first");
      }
      const payload = await jwt.verify(token);
      if (!payload) {
        throw HttpError.Unauthorized("Token is Unauthorized");
      }
      let user = null;
      if (login.value) {
        const userCookie = JSON.parse(login.value);
        if (payload.username === userCookie.username) {
          user = userCookie;
        }
      }

      if (!user) {
        user = await db.users.findUnique({
          where: { username: payload.username },
        });
        login.value = JSON.stringify(user);
      }

      if (!user) {
        throw HttpError.Unauthorized("Token Unauthorized");
      }

      return { isLogin: user };
    });
