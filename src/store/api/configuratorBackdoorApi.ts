import { createApi } from "@reduxjs/toolkit/query/react";
import { getBaseQuery } from "./getBaseQuery";
import {
  IBackdoorConfigurationItem,
  IConfigurationBackdoor,
  ICreateConfiguration,
  IWebhookSource,
} from "../../types/api/configuratorBackdoor";

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
          method: "POST",
          url: `/v1/backdoor/configuration/bitrix-fields`,
          body: {
            bitrixUrl: url,
          },
        };
      },
    }),

    getWebhookSource: builder.query<IWebhookSource, { url: string }>({
      query: ({ url }) => {
        return {
          method: "POST",
          url: `/v1/backdoor/configuration/bitrix-source`,
          body: {
            bitrixUrl: url,
          },
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
          // url: "/v1/backdoor/configuration/page",
          url: "/v1/backdoor/configuration/page-view",
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
  useGetWebhookSourceQuery,
  useCreateConfigurationMutation,
  useUpdateConfigurationMutation,
  useDeleteConfigurationMutation,
} = configuratorBackdoorApi;
