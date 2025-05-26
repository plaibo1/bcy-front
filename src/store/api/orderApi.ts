import { createApi } from "@reduxjs/toolkit/query/react";
import { type IOrder, type IOrderCreate } from "../../types/api/ordersType";
import { getBaseQuery } from "./getBaseQuery";
import { type IBusinessObject } from "../../types/api/businessObjectTypes";

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
            sorts: [
              { field: "clientId", sortType: "DESC", order: 1.0 },
              { field: "status", sortType: "ASC", order: 2.0 },
            ],
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

    getOrderSendingResults: builder.query<
      PageResponse<IBusinessObject>,
      { orderId: string } & PageRequest
    >({
      query: ({ orderId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/order/${orderId}/sending-result/page`,
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

    ordersDownloadExcel: builder.mutation<Blob, { orderId: string }>({
      query: ({ orderId }) => {
        return {
          method: "POST",
          url: `/v1/order/${orderId}/download/excel`,
          responseHandler: (response) => response.blob(),
          responseType: "blob" as const,
        };
      },
    }),
  }),
});

export const {
  useLazyGetOrdersQuery,
  useCreateOrderMutation,
  useEditOrderMutation,
  useDeleteOrderMutation,

  useOrdersDownloadExcelMutation,
  useLazyGetOrderSendingResultsQuery,
} = orderApi;
