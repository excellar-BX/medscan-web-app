import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BiLogIn } from "react-icons/bi";

export const fetch = createApi({
  reducerPath: "fetch",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://medscan-backend.vercel.app/api", 
    // baseUrl: "http://localhost:5000/api", 
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
        url: "/auth/profile", 
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
        url: "/kyc/verification", 
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
