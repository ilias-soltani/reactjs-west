import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const colorApi = createApi({
  reducerPath: "colorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nodejs-clothing-brand.vercel.app/api/v1/colors",
  }),
  endpoints: (builder) => ({
    getColorById: builder.query({
      query: (colorId) => `/color/${colorId}`,
    }),
  }),
});

export const { useGetColorByIdQuery } = colorApi;
