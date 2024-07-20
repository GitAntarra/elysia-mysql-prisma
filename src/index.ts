import { Elysia } from "elysia";
import { userController } from "./controllers/userController";
import { HttpError, httpError } from "./common/errorCode";

const APP_PORT = process.env.APP_PORT || 3000;

const app = new Elysia()
  .get("/", ({ set }) => {
    set.status = 200;
    return {
      err: false,
      msg: "hello, welcom antarra learn",
      data: null,
    };
  })
  .use(httpError())
  .group("/users", (route) => route.use(userController))
  .listen(APP_PORT);
console.log(
  `🦊 Application running at ${app.server?.hostname}:${app.server?.port}`
);
