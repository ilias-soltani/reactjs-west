import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nodejs-clothing-brand.vercel.app/api/v1/products",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (query) => `?${query}`,
    }),
    getProductById: builder.query({
      query: (productId) => `/${productId}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;
