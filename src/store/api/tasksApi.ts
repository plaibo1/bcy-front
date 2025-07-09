import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";
import { ISubTask, ITask } from "../../types/api/tasksTypes";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getTasks: builder.query<PageResponse<ITask>, PageRequest>({
      query: (body) => {
        return {
          url: `/v1/lead-send-task/page-view`,
          method: "POST",
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 50,
            },
            sorts: [{ field: "created_date", sortType: "DESC", order: 1.0 }],
          },
        };
      },
    }),

    getSubTasks: builder.query<PageResponse<ISubTask>, PageRequest>({
      query: (body) => {
        return {
          url: `/v1/lead-send-subtask/page`,
          method: "POST",
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 50,
            },
            // sorts: [{ field: "created_date", sortType: "DESC", order: 1.0 }],
          },
        };
      },
    }),
  }),
});

export const { useLazyGetTasksQuery } = tasksApi;
