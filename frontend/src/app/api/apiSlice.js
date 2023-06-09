import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({ baseUrl: "" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User", "Feed"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});
