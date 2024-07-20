import { NotFoundError } from "elysia";

type ErrorResponse<T = unknown> = {
  msg: T;
  error: boolean;
  data: null;
};

export const ErrorHandler = (ctx: any) => {
  return {
    msg: ctx.error.message,
    error: true,
    data: null,
  } satisfies ErrorResponse;
}