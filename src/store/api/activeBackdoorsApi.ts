import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import {
  IActiveBackdoor,
  IActiveBackdoorCreate,
} from "../../types/api/activeBackdoorsTypes";

export const activeBackdoorsApi = createApi({
  reducerPath: "activeBackdoorsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["ActiveBackdoor"],
  endpoints: (builder) => ({
    getActiveBackdoors: builder.query<IActiveBackdoor[], void>({
      query: () => `/v1/backdoor`,
      providesTags: ["ActiveBackdoor"],
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

    deleteActiveBackdoor: builder.mutation<string, number>({
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
  useCreateActiveBackdoorMutation,
  useRefreshActiveBackdoorMutation,
} = activeBackdoorsApi;
