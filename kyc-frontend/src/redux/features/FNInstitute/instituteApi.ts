/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store";
import { selectToken } from "./instituteSlice";

export const instituteApi = createApi({
  reducerPath: "instituteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = selectToken(getState() as RootState);
      console.log("Token: ", token);
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

    instituteRegister: builder.mutation({
      query: (userInfo) => ({
        url: "/fnInstitute/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    instituteLogin: builder.mutation({
      query: (userInfo) => ({
        url: "/fnInstitute/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    getInstitutes: builder.query({
      query: () => "/fnInstitute/all",
    }),

    getAllAddedUser: builder.query({
      query: () => `/addInstituteUser/profile`,
    }),
  }),
});

export const {
  useAddInstituteMutation,
  useInstituteLoginMutation,
  useInstituteRegisterMutation,
  useGetInstitutesQuery,
  useGetAllAddedUserQuery,
} = instituteApi;
