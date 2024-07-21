import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { AuthService } from "../services/authService";
import { CredentialDto } from "../dto/auth";
import { SuccessResponse } from "../utils/successResponse";

const authService = new AuthService();

export const AuthController = new Elysia()
    .use(jwt({
        name: 'jwt',
        schema: t.Object({username: t.String()}),
        secret: process.env.JWT_SECRET!,
        exp: process.env.JWT_EXPIRED!
    }))
    .post("/signin", async ({body, jwt, set})=>{
        const result = await authService.SignIn(body)

        const accessToken = await jwt.sign({
            username: result.username
        })

        return new SuccessResponse("Berhasil Login", {accessToken, user: result});
    }, { body: CredentialDto })