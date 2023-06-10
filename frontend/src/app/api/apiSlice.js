import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  keepUnusedDataFor: 60,
  tagTypes: ["User", "Feed", "FeedContent", "Category"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
