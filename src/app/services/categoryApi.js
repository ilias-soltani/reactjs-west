import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nodejs-clothing-brand.vercel.app/api/v1/categories",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
