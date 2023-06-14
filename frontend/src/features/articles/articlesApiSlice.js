import { apiSlice } from "../../app/api/apiSlice";
const ARTICLES_URL = "/api/articles";

export const articlesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query({
      query: (data) => ({
        url: `${ARTICLES_URL}`,
        method: "POST",
        body: data,
        validateStatus: (response, result) => {
          return response.status <= 300 && !result.isError;
        },
      }),
    }),
    getSummary: builder.mutation({
      query: (data) => ({
        url: `${ARTICLES_URL}/summarize`,
        method: "POST",
        body: data,
        validateStatus: (response, result) => {
          return response.status <= 300 && !result.isError;
        },
      }),
    }),
  }),
});

export const { useGetArticleQuery, useGetSummaryMutation } = articlesApiSlice;
