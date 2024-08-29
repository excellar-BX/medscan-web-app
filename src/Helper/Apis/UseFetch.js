import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fetch = createApi({
  reducerPath: "fetch",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://meds-scan-backend.onrender.com/api",
    prepareHeaders: (headers) => {
      // Get the token from local storage (or wherever you store it)
      const token = localStorage.getItem("token");

      // If a token is found, add it to the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/auth/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserQuery } = fetch;
