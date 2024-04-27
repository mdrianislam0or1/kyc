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
      query: (instituteId) => `/institute/${instituteId}`,
    }),
    updateInstitute: builder.mutation({
      query: ({ instituteId, instituteData }) => ({
        url: `/institute/${instituteId}`,
        method: "PUT",
        body: instituteData,
      }),
    }),

    deleteInstitute: builder.mutation({
      query: (instituteId) => ({
        url: `/institute/${instituteId}`,
        method: "DELETE",
      }),
    }),

    deleteInstitutes: builder.mutation({
      query: (instituteIds) => ({
        url: "/institute/",
        method: "DELETE",
        body: { instituteIds },
      }),
    }),

    filterInstitutes: builder.mutation({
      query: (filters) => ({
        url: "/institute/filter",
        method: "POST",
        body: filters,
      }),
    }),
  }),
});

export const {
  useAddInstituteMutation,
  useGetInstitutesQuery,
  useGetSingleInstituteQuery,
  useDeleteInstituteMutation,
  useDeleteInstitutesMutation,
  useUpdateInstituteMutation,
  useFilterInstitutesMutation,
} = instituteApi;
