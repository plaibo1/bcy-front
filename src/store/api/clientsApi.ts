import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../consts";
import { type IClient } from "../../types/api/clientsType";
// import { faker } from "@faker-js/faker";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["Client"],

  endpoints: (builder) => ({
    getClients: builder.query<PageResponse<IClient>, PageRequest>({
      query: (body) => {
        console.log("🚀 ~ body:", body);

        return {
          method: "POST",
          url: `/v1/client/order/page`,
          body: {
            ...body,
            paging: {
              currentPage: body.paging?.currentPage || 0,
              recordsOnPage: body.paging?.recordsOnPage || 10,
            },
          },
        };
      },
      providesTags: ["Client"],
    }),

    createClient: builder.mutation<IClient, Omit<IClient, "id" | "orders">>({
      query: (body) => {
        return {
          method: "POST",
          url: `/v1/client`,
          body,
        };
      },
      invalidatesTags: ["Client"],
    }),

    deleteClient: builder.mutation<IClient, string>({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/v1/client/${id}`,
        };
      },
      invalidatesTags: ["Client"],
    }),

    updateClient: builder.mutation<IClient, Partial<IClient>>({
      query: ({ id, ...body }) => {
        return {
          method: "PUT",
          url: `/v1/client/${id}`,
          body,
        };
      },
      invalidatesTags: ["Client"],
    }),

    // ==== only for testing ==== //
    // createFakeClient: builder.mutation<IClient, void>({
    //   query: () => {
    //     const generateFakeClient = () => {
    //       const firstName = faker.person.firstName();
    //       const middleName = faker.person.middleName();
    //       const lastName = faker.person.lastName();
    //       const email = faker.internet.email();
    //       const comment = faker.lorem.sentence();

    //       return {
    //         firstName,
    //         middleName,
    //         lastName,
    //         email,
    //         comment,
    //       };
    //     };
    //     return {
    //       method: "POST",
    //       url: `/v1/client`,
    //       body: generateFakeClient(),
    //     };
    //   },
    // }),
  }),
});

export const {
  useLazyGetClientsQuery,
  useCreateClientMutation,
  useDeleteClientMutation,
  useUpdateClientMutation,

  // useCreateFakeClientMutation,
} = clientsApi;
