import Elysia from "elysia";

export const AntLogger = (app: Elysia) =>
  app
    .onAfterResponse((ctx) => {
      const datenow = formatTgl(new Date());
      const { request, set } = ctx;

      if (set.status === 200 || set.status === 201) {
        console.log(
          `${datenow} | ${request.method} | ${set.status} | ${request.url}`
        );
      } else {
        console.error(
          `${datenow} | ${request.method} | ${set.status} | ${request.url}`
        );
      }
    })
    .onError((ctx) => {
      const datenow = formatTgl(new Date());
      const { request, set, error } = ctx;
      if (ctx.code === "NOT_FOUND") {
        set.status = 404;
        console.error(
          `${datenow} | ${request.method} | ${set.status} | ${request.url} | NOT FOUND`
        );
        return {
          err: true,
          msg: "Route is not found",
        };
      }
    });

export const formatTgl = (tgl: Date): string => {
  const day = String(tgl.getDate()).padStart(2, "0");
  const month = String(tgl.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = tgl.getFullYear();
  const hours = String(tgl.getHours()).padStart(2, "0");
  const minutes = String(tgl.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} ${hours}:${minutes}`;
};
