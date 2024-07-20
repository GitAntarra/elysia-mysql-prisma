import Elysia, { t } from "elysia";
import { UserServices } from "../services/userService";
import { CreateUserDto } from "../dto/users";

const userService = new UserServices();

export const userController = new Elysia()
  .post(
    "",
    async ({ body, set }) => {
      const data: any = body;
      const result = await userService.createUser(data);
      set.status = 201;
      return {
        err: false,
        msg: "ini post user",
        data: result,
      };
    },
    { body: CreateUserDto }
  )
  .get("", async ({ set }) => {
    const result = await userService.showAllUser();
    set.status = 200;
    return {
      err: false,
      msg: "ini get all user",
      data: result,
    };
  })
  .get(
    "/:username",
    async ({ params, set }) => {
      const result = await userService.showUserByUsername(params.username)
      set.status = 200;
      return {
        err: false,
        msg: "ini get one user",
        data: result,
      };
    },
    { params: t.Object({ username: t.String() }) }
  )
  .put("/:username", async ({ set }) => {
    set.status = 201;
    return {
      err: false,
      msg: "ini update user",
      data: null,
    };
  })
  .delete("/:username", async ({ set }) => {
    set.status = 201;
    return {
      err: false,
      msg: "ini hapus user",
      data: null,
    };
  });
