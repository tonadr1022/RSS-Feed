import { apiSlice } from "../../app/api/apiSlice";
const CATEGORIES_URL = "api/categories";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => `${CATEGORIES_URL}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      providesTags: ["Category"],
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "PATCH",
        body: data,
      }),
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      invalidatesTags: ["Category"],
    }),
    deleteCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
