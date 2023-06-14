import { apiSlice } from "../../app/api/apiSlice";
const CATEGORIES_URL = "api/categories";
const FEED_CONTENTS_URL = "/api/feeds/content";

export const categoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: `${CATEGORIES_URL}`,
        validateStatus: (response, result) => {
          return response.status <= 300 && !result.isError;
        },
      }),

      providesTags: ["Category"],
    }),
    // getCategoryFeedContents: builder.query({
    //   query: (id) => ({
    //     url: `${CATEGORIES_URL}/content/${id}`,
    //     validateStatus: (response, result) => {
    //       return response.status <= 300 && !result.isError;
    //     },
    //   }),
    //   providesTags: (result, error, id) => [{ type: "Category", id }],
    // }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "POST",
        body: data,
        validateStatus: (response, result) => {
          return response.status < 300 && !result.isError;
        },
      }),

      invalidatesTags: ["Category"],
    }),
    updateCategory: builder.mutation({
      query: (data) => ({
        url: `${CATEGORIES_URL}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Category", "Feeds"],
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `${CATEGORIES_URL}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Category", "Feeds"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApiSlice;
