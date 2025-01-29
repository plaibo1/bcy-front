import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";
import {
  IBackdoorConfigurationItem,
  IConfigurationBackdoor,
  ICreateConfiguration,
} from "../../types/api/configuratorBackdoor";
import { ACTIVE_BACKDOOR_URL_POSTFIX } from "../../consts";

export const configuratorBackdoorApi = createApi({
  reducerPath: "configuratorBackdoorApi",
  baseQuery: getBaseQuery(),
  tagTypes: ["ConfiguratorBackdoor"],

  endpoints: (builder) => ({
    getWebhookConfigurations: builder.query<
      IConfigurationBackdoor,
      { url: string }
    >({
      query: ({ url }) => {
        return {
          method: "GET",
          url: `${url}/${ACTIVE_BACKDOOR_URL_POSTFIX}`,
        };
      },
    }),

    getConfigurations: builder.query<
      PageResponse<IBackdoorConfigurationItem>,
      PageRequest
    >({
      query: (body) => {
        return {
          method: "POST",
          url: "/v1/backdoor/configuration/page",
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 100,
            },
          },
        };
      },
      providesTags: ["ConfiguratorBackdoor"],
    }),

    createConfiguration: builder.mutation<
      IBackdoorConfigurationItem,
      ICreateConfiguration
    >({
      query: (body) => {
        return {
          method: "POST",
          url: "/v1/backdoor/configuration",
          body,
        };
      },
      invalidatesTags: ["ConfiguratorBackdoor"],
    }),

    updateConfiguration: builder.mutation<
      IBackdoorConfigurationItem,
      { id: string; data: Record<string, string> }
    >({
      query: ({ id, data }) => {
        return {
          method: "PUT",
          url: `/v1/backdoor/configuration/${id}`,
          body: { data },
        };
      },
      invalidatesTags: ["ConfiguratorBackdoor"],
    }),

    deleteConfiguration: builder.mutation<IBackdoorConfigurationItem, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/v1/backdoor/configuration/${id}`,
        };
      },
      invalidatesTags: ["ConfiguratorBackdoor"],
    }),
  }),
});

export const {
  useGetWebhookConfigurationsQuery,
  useGetConfigurationsQuery,
  useCreateConfigurationMutation,
  useUpdateConfigurationMutation,
  useDeleteConfigurationMutation,
} = configuratorBackdoorApi;
