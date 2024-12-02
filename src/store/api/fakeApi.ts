import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeApi = createApi({
  reducerPath: "fakeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    getTodoByID: builder.query<string, number>({
      query: (id) => `/todos/${id}`,
    }),

    getTodos: builder.query<string, void>({
      query: () => `/todos`,
    }),
  }),
});

export const { useGetTodoByIDQuery, useGetTodosQuery } = fakeApi;
