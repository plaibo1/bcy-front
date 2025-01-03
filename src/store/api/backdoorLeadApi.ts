import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import { type IBackdoorLead } from "../../types/api/backdoorLeadTypes";

export const backdoorLeadApi = createApi({
  reducerPath: "backdoorLeadApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["BackdoorLead"],
  endpoints: (builder) => ({
    getBackdoorLeads: builder.query<PageResponse<IBackdoorLead>, PageRequest>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/backdoor-lead/page`,
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 10,
            },
          },
        };
      },
      providesTags: ["BackdoorLead"],
    }),

    moveBackdoorLead: builder.mutation<
      IBackdoorLead,
      { entityId: string; backdoorLeadIds: string[] }
    >({
      query: ({ entityId, backdoorLeadIds }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/backdoor-leads/move`,
          body: {
            backdoorLeadIds,
          },
        };
      },
      invalidatesTags: ["BackdoorLead"],
    }),
  }),
});

export const { useLazyGetBackdoorLeadsQuery, useMoveBackdoorLeadMutation } =
  backdoorLeadApi;
