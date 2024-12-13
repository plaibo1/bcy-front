import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import { type IClient } from "../../types/api/clientsType";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Client"],
  endpoints: (builder) => ({
    getClients: builder.query<PageResponse<IClient>, PageRequest>({
      query: (pageRequest) => ({
        method: "POST",
        url: `/v1/client/order/page`,
        body: {
          ...pageRequest,
          paging: {
            currentPage: pageRequest.paging?.currentPage || 0,
            recordsOnPage: pageRequest.paging?.recordsOnPage || 10,
          },
        },
      }),
      providesTags: ["Client"],
    }),

    createClient: builder.mutation<IClient, Omit<IClient, "id" | "orders">>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/client`,
          body,
        };
      },
      invalidatesTags: ["Client"],
    }),
  }),
});

export const { useLazyGetClientsQuery, useCreateClientMutation } = clientsApi;
