import jwt from "@elysiajs/jwt";
import Elysia, { t } from "elysia";
import { AuthService } from "../services/authService";
import { CredentialDto } from "../dto/auth";
import { SuccessResponse } from "../utils/successResponse";
import { jwtConfig } from "../config/jwt";

const authService = new AuthService();

export const AuthController = new Elysia()
    .use(jwtConfig)
    .post("/signin", async ({body, jwt, set})=>{
        const result = await authService.SignIn(body)

        const accessToken = await jwt.sign({
            username: result.username
        })

        return new SuccessResponse("Berhasil Login", {accessToken, user: result});
    }, { body: CredentialDto })