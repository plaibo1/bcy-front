import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../consts";

export const getBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  });
};
