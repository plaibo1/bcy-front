import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";

export const rdmApi = createApi({
  reducerPath: "rdmApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getRegions: builder.query<string[], void>({
      query: () => `/v1/rdm/region`,
    }),
  }),
});

export const { useGetRegionsQuery } = rdmApi;
