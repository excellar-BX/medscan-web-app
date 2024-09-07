import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BiLogIn } from "react-icons/bi";

export const fetch = createApi({
  reducerPath: "fetch",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://medscan-backend.vercel.app/api", // Ensure this URL is correct
    prepareHeaders: (headers) => {
      // Retrieve the token from local storage
      const token = localStorage.getItem("token");
      console.log("Token retrieved:", token);
      
      // Set the Authorization header if the token exists
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/auth/profile", // Ensure this endpoint is correct on your backend
        method: "GET",
      }),
      transformResponse: (response) => {
        // Optionally transform the response here if needed
        console.log("getUser response:", response);
        return response;
      },
      // Error handling
      onError: (error) => {
        console.error("Error fetching user profile:", error);
      },
    }),
    getKyc: builder.query({
      query: () => ({
        url: "/kyc/verification", // Verify the correct method and if body is needed
        method: "POST", 
      }),
      transformResponse: (response) => {
        console.log("getKyc response:", response);
        return response;
      },
      // Error handling
      onError: (error) => {
        console.error("Error fetching KYC verification:", error);
      },
    }),
  }),
});

export const { useGetUserQuery, useGetKycQuery } = fetch;
