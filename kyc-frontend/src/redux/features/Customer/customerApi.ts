/* eslint-disable react-hooks/rules-of-hooks */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useCurrentToken } from "../auth/authSlice";
import { RootState } from "../../store";

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api",
    prepareHeaders: (headers, { getState }) => {
      const token = useCurrentToken(getState() as RootState);
      console.log("customer Token: ", token);
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
    credentials: "include",
  }),

  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (customerData) => ({
        url: "/customer/add",
        method: "POST",
        body: customerData,
      }),
    }),
    getCustomers: builder.query({
      query: () => "/auth/users",
    }),
    getCustomer: builder.query({
      query: () => "/auth/profile",
    }),
    getSingleCustomer: builder.query({
      query: (customerId) => `/customer/${customerId}`,
    }),
    updateCustomer: builder.mutation({
      query: ({ customerId, customerData }) => ({
        url: `/customer/${customerId}`,
        method: "PUT",
        body: customerData,
      }),
    }),

    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: `/customer/${customerId}`,
        method: "DELETE",
      }),
    }),

    deleteCustomers: builder.mutation({
      query: (customerIds) => ({
        url: "/customer/",
        method: "DELETE",
        body: { customerIds },
      }),
    }),

    filterCustomers: builder.mutation({
      query: (filters) => ({
        url: "/customer/filter",
        method: "POST",
        body: filters,
      }),
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useGetCustomersQuery,
  useGetCustomerQuery,
  useGetSingleCustomerQuery,
  useDeleteCustomerMutation,
  useDeleteCustomersMutation,
  useUpdateCustomerMutation,
  useFilterCustomersMutation,
} = customerApi;
