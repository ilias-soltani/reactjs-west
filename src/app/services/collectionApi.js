import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nodejs-clothing-brand.vercel.app/api/v1/collections",
  }),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => "/",
    }),
    getCollectionsWithProducts: builder.query({
      query: () => "/products",
    }),
  }),
});

export const { useGetCollectionsQuery, useGetCollectionsWithProductsQuery } =
  collectionApi;
