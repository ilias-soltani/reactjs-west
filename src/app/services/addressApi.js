import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({
    baseUrl:
      "https://nodejs-clothing-brand.vercel.app/api/v1/profile/addresses",
  }),

  tagTypes: ["Address"],
  endpoints: (builder) => ({
    //CRUD
    getAllUserAddresses: builder.query({
      query: () => ({
        url: "/",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "Address", id })),
              { type: "Address", id: "LIST" },
            ]
          : [{ type: "Address", id: "LIST" }],
    }),
    addAddress: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "PATCH",
        body,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [
        {
          type: "Address",
          id: "LIST",
        },
      ],
    }),
    deleteAddress: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
      invalidatesTags: [
        {
          type: "Address",
          id: "LIST",
        },
      ],
    }),
  }),
});
// Dynamic hook
export const {
  useGetAllUserAddressesQuery,
  useGetAddressQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi;
