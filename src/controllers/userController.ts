import Elysia, { t } from "elysia";
import { UserServices } from "../services/userService";
import { CreateUserDto, UpdateUserDto, User } from "../dto/users";
import { SuccessResponse } from "../utils/successResponse";

const userService = new UserServices();

export const userController = new Elysia()
  .post(
    "",
    async ({ body, set }): Promise<SuccessResponse<User>> => {
      const data: any = body;
      const result = await userService.createUser(data);

      set.status = 201;
      return new SuccessResponse("Penguna baru telah ditambahkan", result);
    },
    { body: CreateUserDto }
  )
  .get("", async ({ set }): Promise<SuccessResponse<User[]>> => {
    const result = await userService.showAllUser();
    set.status = 200;
    return new SuccessResponse("Menampilkan semua Penguna", result);
  })
  .get(
    "/:username",
    async ({ params, set }): Promise<SuccessResponse<User>> => {
      const result = await userService.showUserByUsername(params.username);
      set.status = 200;
      return new SuccessResponse(
        `Menampilkan Penguna username ${params.username}`,
        result
      );
    },
    { params: t.Object({ username: t.String() }) }
  )
  .put(
    "/:username",
    async ({ params, body, set }): Promise<SuccessResponse<User>> => {
      const result = await userService.updateUser(params.username, body);
      set.status = 201;
      return new SuccessResponse(
        `Berhasil Mengubah Penguna username ${params.username}`,
        result
      );
    },
    { params: t.Object({ username: t.String() }), body: UpdateUserDto }
  )
  .put(
    "/:username/password",
    async ({ params, body, set }): Promise<SuccessResponse<null>> => {
      const result = await userService.updateUserPassword(
        params.username,
        body.oldpassword,
        body.password
      );
      set.status = 201;
      return new SuccessResponse(
        `Berhasil Mengubah Kata sandi penguna ${params.username}`,
        null
      );
    },
    {
      params: t.Object({ username: t.String() }),
      body: t.Object({ oldpassword: t.String(), password: t.String() }),
    }
  )
  .delete(
    "/:username",
    async ({ params, set }): Promise<SuccessResponse<null>> => {
      const result = await userService.deleteUser(params.username);
      set.status = 201;
      return new SuccessResponse(
        `Berhasil mengapus penguna ${params.username}`,
        null
      );
    },
    { params: t.Object({ username: t.String() }) }
  );
