import { createApi } from "@reduxjs/toolkit/query/react";
import { type IBackdoorLead } from "../../types/api/backdoorLeadTypes";
import { getBaseQuery } from "./getBaseQuery";
import { EXCEL_LIMIT } from "../../consts";

export const backdoorLeadApi = createApi({
  reducerPath: "backdoorLeadApi",
  baseQuery: getBaseQuery(),
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
            sorts: [
              { field: "updated_date", sortType: "DESC", order: 1.0 },
              { field: "source", sortType: "ASC", order: 2.0 },
            ],
          },
        };
      },
      providesTags: ["BackdoorLead"],
    }),

    getBackdoorLeadById: builder.query<IBackdoorLead, { id: string }>({
      query: ({ id }) => {
        return {
          url: `/v1/backdoor-lead/${id}`,
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

    // TODO: перенести в отедельный сервис
    getExcelByBackdoorLeadFilters: builder.mutation<Blob, PageRequest>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/backdoor-lead/download/excel/filter`,
          body: {
            ...body,
            paging: {
              currentPage: 0,
              recordsOnPage: EXCEL_LIMIT,
            },
          },
          responseHandler: (response) => response.blob(),
          responseType: "blob" as const,
        };
      },
    }),
  }),
});

export const {
  useLazyGetBackdoorLeadsQuery,
  useGetBackdoorLeadByIdQuery,
  useMoveBackdoorLeadMutation,
  useGetExcelByBackdoorLeadFiltersMutation,
} = backdoorLeadApi;
