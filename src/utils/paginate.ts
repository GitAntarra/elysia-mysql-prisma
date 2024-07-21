import { Static, t } from "elysia";

const Order = {
  ASC: "ASC",
  DESC: "DESC",
};

export const paginateData = t.Object({
  page: t.Optional(t.Numeric()),
  take: t.Optional(t.Numeric()),
  order: t.Optional(t.Enum(Order)),
  keyword: t.Optional(t.String()),
});

export type paginateDataStatic = Static<typeof paginateData>;

interface resPagi {
    skip: number;
    page: number;
    take: number;
    order: "asc" | "desc";
  }

export const paginate = (data: paginateDataStatic): resPagi => {
    const { page, take, order } = data;

    const pg = page ? page : 1;
    const tk = take ? take : 10;
    const or = order == "desc" ? order : "asc";
  
    const skip: number = (pg - 1) * tk;
  
    return {
      skip,
      take: tk,
      page: pg,
      order: or,
    };
};


export interface MetaData {
    page: number;
    take: number;
    totalPosts: number;
  }
  export const pagiMeta = (metaData: MetaData) => {
    const { page, take, totalPosts } = metaData;
    return {
      totalData: totalPosts,
      totalPages: Math.ceil(totalPosts / take),
      currentPage: page,
      nextStat: page < Math.ceil(totalPosts / take) ? true : false,
      prevStat: page > 1 ? true : false,
    };
  };