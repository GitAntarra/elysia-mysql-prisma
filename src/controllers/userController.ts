import Elysia, { t } from "elysia";
import { UserServices } from "../services/userService";
import { CreateUserDto, UpdateUserDto } from "../dto/users";

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
      const result = await userService.showUserByUsername(params.username);
      set.status = 200;
      return {
        err: false,
        msg: "ini get one user",
        data: result,
      };
    },
    { params: t.Object({ username: t.String() }) }
  )
  .put(
    "/:username",
    async ({ params, body, set }) => {
      const result = await userService.updateUser(params.username, body)
      set.status = 201;
      return {
        err: false,
        msg: "Update User Berhasil",
        data: result,
      };
    },
    { params: t.Object({ username: t.String() }), body: UpdateUserDto }
  )
  .put(
    "/:username/password",
    async ({ params, body, set }) => {
      const result = await userService.updateUserPassword(params.username, body.oldpassword, body.password)
      set.status = 201;
      return {
        err: false,
        msg: "Update Password Berhasil",
        data: result,
      };
    },
    { params: t.Object({ username: t.String() }), body: t.Object({ oldpassword: t.String(), password: t.String()}) }
  )
  .delete("/:username", async ({ params, set }) => {
    const result = await userService.deleteUser(params.username)
    set.status = 201;
    return {
      err: false,
      msg: "User berhasil dihapus",
      data: result,
    };
  }, {params: t.Object({ username: t.String() })});
