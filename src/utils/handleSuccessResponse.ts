export const handleSuccessResponse = (ctx: any) => {
  if (ctx.response) {
    const { msg, data } = ctx.response;
    return {
      err: false,
      msg: msg ? msg : "message not set",
      data: data ? data : null,
    };
  }
};
