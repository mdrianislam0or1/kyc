/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCurrentToken } from "../auth/authSlice";
import { RootState } from "../../store";

export const addUserInstituteApi = createApi({
  reducerPath: "addUserInstituteApi",
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
    addUsersToInstitute: builder.mutation({
      query: ({ instituteId, userNIDs }) => ({
        url: "/addInstituteUser/addUsers",
        method: "POST",
        body: {
          instituteId,
          userNIDs,
        },
      }),
    }),

    verifyOTPAndAdd: builder.mutation({
      query: ({ instituteId, userNIDs, otp }) => ({
        url: "/addInstituteUser/verifyAndAddUser",
        method: "POST",
        body: {
          instituteId,
          userNIDs,
          otp,
        },
      }),
    }),

    getAddedUsersUnderInstitute: builder.query({
      query: () => "/addInstituteUser/profile",
    }),
  }),
});

export const {
  useAddUsersToInstituteMutation,
  useVerifyOTPAndAddMutation,
  useGetAddedUsersUnderInstituteQuery,
} = addUserInstituteApi;
