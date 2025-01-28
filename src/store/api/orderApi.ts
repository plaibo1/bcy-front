import { createApi } from "@reduxjs/toolkit/query/react";
import { type IOrder, type IOrderCreate } from "../../types/api/ordersType";
import { getBaseQuery } from "./getBaseQuery";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: getBaseQuery(),
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

    deleteOrder: builder.mutation<void, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/v1/order/${id}`,
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
  useDeleteOrderMutation,
} = orderApi;
