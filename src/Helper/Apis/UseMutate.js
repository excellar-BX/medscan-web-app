import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://meds-scan-backend.onrender.com/api" }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (user) => ({
        url: "/auth/register",
        method: "POST",
        body: user,
      }),
    }),
    loginUser: builder.mutation({
        query: (user) => ({
          url: "/auth/login",
          method: "POST",
          body: user,
        }),
      }),
  }),
});

export const { useCreateUserMutation ,useLoginUserMutation } = api;
