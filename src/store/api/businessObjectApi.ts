import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import {
  IBusinessObject,
  IBusinessObjectCreate,
} from "../../types/api/businessObjectTypes";

export const businessObjectApi = createApi({
  reducerPath: "businessObjectsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
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
          },
        };
      },
    }),

    updateBusinessObject: builder.mutation<
      IBusinessObject,
      IBusinessObjectCreate & { id: string; entityId: string }
    >({
      query: ({ entityId, id, ...body }) => {
        return {
          method: "PATCH",
          url: `/v1/entity/${entityId}/bo/${id}`,
          body: {
            data: body,
          },
        };
      },
    }),
  }),
});

export const {
  useLazyGetBusinessObjectsQuery,
  useUpdateBusinessObjectMutation,
} = businessObjectApi;
