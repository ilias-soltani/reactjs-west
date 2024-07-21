import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nodejs-clothing-brand.vercel.app/api/v1/cart",
  }),
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    getUserCart: builder.query({
      query: () => ({
        url: "/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: ["Cart"],
    }),
    addToCart: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    updateProductQuantity: builder.mutation({
      query: (arg) => ({
        url: `/${arg.id}`,
        method: "PATCH",
        body: { quantity: arg.quantity },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    applyCoupon: builder.mutation({
      query: (coupon) => ({
        url: `/coupon`,
        method: "POST",
        body: { coupon },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
    removeCartItem: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetUserCartQuery,
  useUpdateProductQuantityMutation,
  useRemoveCartItemMutation,
  useApplyCouponMutation,
  useAddToCartMutation,
} = cartApi;
