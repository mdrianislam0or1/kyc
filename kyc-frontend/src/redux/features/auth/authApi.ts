import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),

    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
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
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useInstituteRegisterMutation,
  useInstituteLoginMutation,
} = authApi;
