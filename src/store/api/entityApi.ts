import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import { IEntity, IEntityCreate } from "../../types/api/entityTypes";

/**
 * @implements EntityController
 */
export const entityApi = createApi({
  reducerPath: "entityApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ["Entity"],

  endpoints: (builder) => ({
    getEntities: builder.query<IEntity[], void>({
      query: () => {
        return {
          method: "POST",
          url: "/v1/entity/page",
          body: {
            paging: {
              currentPage: 0,
              recordsOnPage: 100,
            },
          },
        };
      },
      providesTags: ["Entity"],
      transformResponse: (response: PageResponse<IEntity>) => {
        const { data } = response;
        if (!data) throw response;

        return data;
      },
    }),

    getEntityById: builder.query<IEntity, string>({
      query: (id) => `/v1/entity/${id}`,
    }),

    createEntity: builder.mutation<IEntity, IEntityCreate>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/entity`,
          body: {
            ...body,
            color: body.color || "#acd123",
            icon: body.icon || "smile",
          },
        };
      },
    }),

    updateEntity: builder.mutation<string, IEntity>({
      query: ({ id, ...body }) => {
        return {
          method: "PUT",
          url: `/v1/entity/${id}`,
          body,
        };
      },
      invalidatesTags: ["Entity"],
    }),

    deleteEntity: builder.mutation<string, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/v1/entity/${id}`,
        };
      },
      invalidatesTags: ["Entity"],
    }),
  }),
});

export const { useGetEntitiesQuery, useCreateEntityMutation } = entityApi;
