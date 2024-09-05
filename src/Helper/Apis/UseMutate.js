import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000/api",
    baseUrl: "https://medscan-backend.vercel.app/api",
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
    updateProfile: builder.mutation({
      query: (user) => ({
        url: "/auth/profile",
        method: "PUT",
        body: user,
      }),
    }),

    updateKyc: builder.mutation({
      query: (user) => ({
        url: "/kyc/verification",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useUpdateKycMutation
} = api;
