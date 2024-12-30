import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";

import {
  IEntityFieldUpdate,
  type IEntityFieldCreate,
  type IEntityField,
} from "../../types/api/entityFieldsTypes";

/**
 * @implements entity-field-controller
 */
export const entityFieldsApi = createApi({
  reducerPath: "entityFieldsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["EntityFields"],
  endpoints: (builder) => ({
    getEntityFields: builder.query<IEntityField[], string>({
      query: (entityId) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/field/page`,
          body: {
            paging: {
              currentPage: 0,
              recordsOnPage: 100,
            },
          },
        };
      },
      transformResponse: (response: PageResponse<IEntityField>) => {
        const { data } = response;
        if (!data) throw response;

        return data;
      },
      providesTags: ["EntityFields"],
    }),

    createEntityField: builder.mutation<
      IEntityField,
      IEntityFieldCreate & { entityId: string }
    >({
      query: ({ entityId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/field`,
          body,
        };
      },
    }),

    updateEntityField: builder.mutation<
      IEntityField,
      { entityId: string; filedId: string } & IEntityFieldUpdate
    >({
      query: ({ entityId, filedId, ...body }) => {
        return {
          method: "PUT",
          url: `/v1/entity/${entityId}/field/${filedId}`,
          body,
        };
      },
      invalidatesTags: ["EntityFields"],
    }),

    deleteEntityField: builder.mutation<
      void,
      { entityId: string; fieldId: string }
    >({
      query: ({ entityId, fieldId }) => {
        return {
          method: "DELETE",
          url: `/v1/entity/${entityId}/field/${fieldId}`,
        };
      },
      invalidatesTags: ["EntityFields"],
    }),
  }),
});

export const {
  useLazyGetEntityFieldsQuery,
  useDeleteEntityFieldMutation,
  useUpdateEntityFieldMutation,
  useCreateEntityFieldMutation,
} = entityFieldsApi;
