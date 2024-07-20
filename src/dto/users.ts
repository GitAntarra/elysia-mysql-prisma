import { Static, t } from "elysia";

export const CreateUserDto =  t.Object({
    username: t.String(),
    email: t.String(),
    password: t.String(),
    name: t.String(),
    role: t.Enum({SUPERUSER: 'SUPERUSER', ADMIN: 'ADMIN', USER: 'USER'})
})

export type CreateUserStatic = Static<typeof CreateUserDto>;