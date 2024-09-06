import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://medscan-backend.vercel.app/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
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
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        console.log("createUser mutation started with:", user);
        try {
          const { data } = await queryFulfilled;
          console.log("createUser mutation successful:", data);
        } catch (error) {
          console.error("createUser mutation failed:", error);
        }
      },
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        console.log("loginUser mutation started with:", user);
        try {
          const { data } = await queryFulfilled;
          console.log("loginUser mutation successful:", data);
        } catch (error) {
          console.error("loginUser mutation failed:", error);
        }
      },
    }),
    updateProfile: builder.mutation({
      query: (user) => ({
        url: "/auth/profile",
        method: "PUT",
        body: user,
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        console.log("updateProfile mutation started with:", user);
        try {
          const { data } = await queryFulfilled;
          console.log("updateProfile mutation successful:", data);
        } catch (error) {
          console.error("updateProfile mutation failed:", error);
        }
      },
    }),
    updateKyc: builder.mutation({
      query: (user) => ({
        url: "/kyc/verification",
        method: "POST",
        body: user,
      }),
      onQueryStarted: async (user, { dispatch, queryFulfilled }) => {
        console.log("updateKyc mutation started with:", user);
        try {
          const { data } = await queryFulfilled;
          console.log("updateKyc mutation successful:", data);
        } catch (error) {
          console.error("updateKyc mutation failed:", error);
        }
      },
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateProfileMutation,
  useUpdateKycMutation,
} = api;
