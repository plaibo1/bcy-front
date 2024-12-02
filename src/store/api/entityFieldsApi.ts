import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";

import {
  type IEntityCreate,
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
    }),

    createEntityField: builder.mutation<
      IEntityField,
      { entityId: string } & IEntityCreate
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
      { entityId: string; id: string } & IEntityCreate
    >({
      query: ({ entityId, id, ...body }) => {
        return {
          method: "PUT",
          url: `/v1/entity/${entityId}/field/${id}`,
          body,
        };
      },
    }),

    deleteEntityField: builder.mutation<
      string,
      { entityId: string; id: string }
    >({
      query: ({ entityId, id }) => {
        return {
          method: "DELETE",
          url: `/v1/entity/${entityId}/field/${id}`,
        };
      },
    }),
  }),
});

export const { useLazyGetEntityFieldsQuery } = entityFieldsApi;
