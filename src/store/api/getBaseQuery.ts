import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL } from "../../consts";

export const getBaseQuery = () => {
  return fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders(headers) {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", token);
      }
      return headers;
    },
    credentials: "include",
  });
};
