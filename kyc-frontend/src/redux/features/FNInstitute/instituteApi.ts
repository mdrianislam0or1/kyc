/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCurrentToken } from "../auth/authSlice";
import { RootState } from "../../store";

export const instituteApi = createApi({
  reducerPath: "instituteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = useCurrentToken(getState() as RootState);
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addInstitute: builder.mutation({
      query: (instituteData) => ({
        url: "/institute/add",
        method: "POST",
        body: instituteData,
      }),
    }),
    getInstitutes: builder.query({
      query: () => "/fnInstitute/all",
    }),

    getSingleInstitute: builder.query({
      query: (instituteId) => `/fnInstitute/${instituteId}`,
    }),

    addUsersRequest: builder.mutation({
      query: ({ instituteId, userNIDs }) => ({
        url: "/fnInstitute/add-users-request",
        method: "POST",
        body: {
          instituteId,
          userNIDs,
        },
      }),
    }),

    verifyOTP: builder.mutation({
      query: ({ instituteId, userNIDs, otp }) => ({
        url: "/fnInstitute/verify-otp",
        method: "POST",
        body: {
          instituteId,
          userNIDs,
          otp,
        },
      }),
    }),
  }),
});

export const {
  useAddInstituteMutation,
  useGetInstitutesQuery,
  useGetSingleInstituteQuery,
  useAddUsersRequestMutation,
  useVerifyOTPMutation,
} = instituteApi;
