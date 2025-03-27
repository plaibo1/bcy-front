import { createApi } from "@reduxjs/toolkit/query/react";
import {
  IActiveBackdoor,
  IActiveBackdoorCreate,
} from "../../types/api/activeBackdoorsTypes";
import { getBaseQuery } from "./getBaseQuery";

export const activeBackdoorsApi = createApi({
  reducerPath: "activeBackdoorsApi",
  baseQuery: getBaseQuery(),
  tagTypes: ["ActiveBackdoor"],
  endpoints: (builder) => ({
    getActiveBackdoors: builder.query<IActiveBackdoor[], void>({
      query: () => `/v1/backdoor`,
      providesTags: ["ActiveBackdoor"],
    }),

    getActiveBackdoorsPage: builder.query<
      PageResponse<IActiveBackdoor>,
      PageRequest
    >({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/backdoor/page`,
          body,
        };
      },
      providesTags: ["ActiveBackdoor"],
    }),

    getActiveBackdoorById: builder.query<IActiveBackdoor, string>({
      query: (id) => `/v1/backdoor/${id}`,
    }),

    createActiveBackdoor: builder.mutation<
      IActiveBackdoor,
      IActiveBackdoorCreate
    >({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/backdoor`,
          body,
        };
      },
      invalidatesTags: ["ActiveBackdoor"],
    }),

    deleteActiveBackdoor: builder.mutation<string, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/v1/backdoor/${id}`,
        };
      },
      invalidatesTags: ["ActiveBackdoor"],
    }),

    refreshActiveBackdoor: builder.mutation<void, void>({
      query: () => {
        return {
          method: "POST",
          url: `/v1/backdoor/refresh`,
        };
      },
      invalidatesTags: ["ActiveBackdoor"],
    }),
  }),
});

export const {
  useGetActiveBackdoorsQuery,
  useGetActiveBackdoorByIdQuery,
  useCreateActiveBackdoorMutation,
  useRefreshActiveBackdoorMutation,
  useLazyGetActiveBackdoorsPageQuery,
  useDeleteActiveBackdoorMutation,
} = activeBackdoorsApi;
