// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";

/**
 * @implements EntityController
 */
export const entityApi = createApi({
  reducerPath: "entityApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),

  endpoints: (builder) => ({
    getEntities: builder.query<string[], void>({
      query: () => {
        return {
          url: "/entities",
        };
      },
    }),
    getEntityByName: builder.query<string, string>({
      query: (name) => `/entities/${name}`,
    }),
    getEntityById: builder.query<Record<string, string>[], number>({
      query: (id) => `/entities/${id}`,
    }),
  }),
});

export const {
  useLazyGetEntityByIdQuery,
  useLazyGetEntitiesQuery,
  useLazyGetEntityByNameQuery,
} = entityApi;
