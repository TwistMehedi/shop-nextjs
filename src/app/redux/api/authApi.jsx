import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/auth/",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    
    registerUser: builder.mutation({
      query: (registerData) => ({
        url: "register",
        method: "POST",
        body: registerData,
      }),
    }),

    verifyEmail: builder.mutation({
      query: (token) => ({
        url: `verify-email?token=${token}`,
        method: "POST",
      }),
    }),

    loginUser: builder.mutation({
      query: (loginData) => ({
        url: "login",
        method: "POST",
        body: loginData
      }),
    }),

  }),
});

export const { useVerifyEmailMutation, useRegisterUserMutation , useLoginUserMutation} = authApi;
