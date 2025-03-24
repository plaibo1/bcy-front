import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";
import { IVR } from "../../types/api/ivrTypes";

export const ivrApi = createApi({
  reducerPath: "ivrApi",
  baseQuery: getBaseQuery(),
  tagTypes: ["IVR"],
  endpoints: (builder) => ({
    getIvr: builder.query<PageResponse<IVR>, PageRequest>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/ivr/page`,
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 10,
            },
            sorts: [{ field: "updated_date", sortType: "DESC", order: 1.0 }],
          },
        };
      },
      providesTags: ["IVR"],
    }),

    moveIvr: builder.mutation<
      IVR,
      { entityId: string; ivrIds: string[]; sum: number }
    >({
      query: ({ entityId, ivrIds, sum }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/ivr/move`,
          body: {
            ivrIds,
            sum,
          },
        };
      },
      invalidatesTags: ["IVR"],
    }),
  }),
});

export const { useLazyGetIvrQuery, useMoveIvrMutation } = ivrApi;
