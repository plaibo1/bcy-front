import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";
import {
  ITaskSchedule,
  ITaskScheduleDuration,
} from "../../types/api/leadActionsTypes";
import { EXCEL_LIMIT } from "../../consts";

export const leadActionsApi = createApi({
  reducerPath: "leadActionsApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    scheduleLeads: builder.mutation<void, ITaskSchedule>({
      query: ({ entityId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/lead/task-schedule`,
          body,
        };
      },
    }),

    scheduleLeadsWithDuration: builder.mutation<void, ITaskScheduleDuration>({
      query: ({ entityId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/lead/task-schedule`,
          body,
        };
      },
    }),

    getExcelByIds: builder.mutation<
      Blob,
      { entityId: string; leadIds: string[] }
    >({
      query: ({ entityId, leadIds }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/lead/download/excel`,
          body: leadIds,
          responseHandler: (response) => response.blob(),
          responseType: "blob" as const,
        };
      },
    }),

    getExcelByFilters: builder.mutation<
      Blob,
      PageRequest & { entityId: string }
    >({
      query: ({ entityId, ...body }) => {
        return {
          method: "POST",
          url: `/v1/entity/${entityId}/lead/download/excel/filter`,
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
  useScheduleLeadsMutation,
  useScheduleLeadsWithDurationMutation,
  useGetExcelByIdsMutation,
  useGetExcelByFiltersMutation,
} = leadActionsApi;
