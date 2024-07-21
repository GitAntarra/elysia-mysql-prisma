import { Static, t } from "elysia";

export const CredentialDto = t.Object({
    username: t.String(),
    password: t.String()
})

export type CredentialStatic = Static<typeof CredentialDto>