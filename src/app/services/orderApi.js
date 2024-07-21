import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nodejs-clothing-brand.vercel.app/api/v1/orders",
  }),
  endpoints: (builder) => ({
    checkoutSession: builder.mutation({
      query: (body) => ({
        url: "/checkout-session",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Order"],
    }),
    getUserOrders: builder.query({
      query: (query) => ({
        url: `/?${query}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Order"],
    }),
  }),
});

export const { useCheckoutSessionMutation, useGetUserOrdersQuery } = orderApi;
