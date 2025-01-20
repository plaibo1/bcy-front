import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import { type IOrder, type IOrderCreate } from "../../types/api/ordersType";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Order"],

  endpoints: (builder) => ({
    getOrders: builder.query<PageResponse<IOrder>, PageRequest>({
      query: ({ ...body }) => {
        return {
          method: "POST",
          url: `/v1/order/page`,
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 10,
            },
          },
        };
      },
      providesTags: ["Order"],
    }),

    createOrder: builder.mutation<IOrder, IOrderCreate>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/order`,
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),

    editOrder: builder.mutation<IOrder, IOrder>({
      query: (body) => {
        return {
          method: "PUT",
          url: `/v1/order/${body.id}`,
          body,
        };
      },
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useLazyGetOrdersQuery,
  useCreateOrderMutation,
  useEditOrderMutation,
} = orderApi;
