import { createApi } from "@reduxjs/toolkit/query/react";

import {
  IBusinessObject,
  IBusinessObjectCreate,
} from "../../types/api/businessObjectTypes";

import { getBaseQuery } from "./getBaseQuery";

export const businessObjectApi = createApi({
  reducerPath: "businessObjectsApi",
  baseQuery: getBaseQuery(),
  tagTypes: ["BusinessObject"],

  endpoints: (builder) => ({
    getBusinessObjects: builder.query<
      PageResponse<IBusinessObject>,
      { entityId: string } & PageRequest
    >({
      query: ({ entityId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/bo/page`,
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 10,
            },
            sorts: [{ field: "created_date", sortType: "DESC", order: 1.0 }],
          },
        };
      },
      providesTags: ["BusinessObject"],
    }),

    createBusinessObject: builder.mutation<
      IBusinessObject,
      IBusinessObjectCreate & { entityId: string }
    >({
      query: ({ entityId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/bo`,
          body,
        };
      },
      invalidatesTags: ["BusinessObject"],
    }),

    updateBusinessObject: builder.mutation<
      IBusinessObject,
      Partial<IBusinessObjectCreate> & { id: string; entityId: string }
    >({
      query: ({ entityId, id, ...body }) => {
        return {
          method: "PATCH",
          url: `/v1/entity/${entityId}/bo/${id}`,
          body,
        };
      },
    }),

    deleteBusinessObject: builder.mutation<
      void,
      { entityId: string; id: string }
    >({
      query: ({ entityId, id }) => {
        return {
          method: "DELETE",
          url: `/v1/entity/${entityId}/bo/${id}`,
        };
      },
    }),
  }),
});

export const {
  useLazyGetBusinessObjectsQuery,
  useCreateBusinessObjectMutation,
  useUpdateBusinessObjectMutation,
  useDeleteBusinessObjectMutation,
} = businessObjectApi;
