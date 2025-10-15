import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utilities/const";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["StCategories"],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "api/categories",
      providesTags: ["StCategories"],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
