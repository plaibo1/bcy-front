import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";
import { type ILandingLead } from "../../types/api/landingLeadsTypes";

export const landingLeadsApi = createApi({
  reducerPath: "landingLeadsApi",
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getLandingLeads: builder.query<PageResponse<ILandingLead>, PageRequest>({
      query: (body) => {
        return {
          url: `/v1/landing-lead/page`,
          method: "POST",
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 50,
            },
            sorts: [{ field: "updated_date", sortType: "DESC", order: 1.0 }],
          },
        };
      },
    }),

    moveToEntity: builder.mutation<
      void,
      { landingLeadIds: React.Key[]; entityId: string }
    >({
      query: ({ landingLeadIds, entityId }) => ({
        url: `/v1/landing-lead/action/move-to-entity`,
        method: "POST",
        body: { landingLeadIds, entityId },
      }),
    }),
  }),
});

export const { useLazyGetLandingLeadsQuery, useMoveToEntityMutation } =
  landingLeadsApi;
