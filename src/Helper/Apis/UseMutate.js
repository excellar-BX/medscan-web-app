import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../constant/ServerUrl";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      
      // Log the token for debugging purposes
      console.log("Token used in headers:", token);

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
      onQueryStarted: async (user, { queryFulfilled }) => {
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
      onQueryStarted: async (user, { queryFulfilled }) => {
        console.log("loginUser mutation started with:", user);
        try {
          const { data } = await queryFulfilled;
          
          // Log the token returned after login (if available)
          if (data && data.token) {
            console.log("Token generated after login:", data.token);
          }
          
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
      onQueryStarted: async (user, { queryFulfilled }) => {
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
      onQueryStarted: async (user, { queryFulfilled }) => {
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
