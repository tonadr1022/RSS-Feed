import { apiSlice } from "../../app/api/apiSlice";
// import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
const FEEDS_URL = "api/feeds";

// const feedsAdapter = createEntityAdapter({});

// const initialState = feedsAdapter.getInitialState();

export const feedsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFeeds: builder.query({
      query: () => `${FEEDS_URL}`,
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      keepUnusedDataFor: 60,
      transformResponse: (responseData) => {
        // console.log("res data", responseData);
        const loadedFeeds = responseData.map((feed) => {
          feed.id = feed._id;
          return feed;
        });
        //  return feedsAdapter.setAll(initialState, loadedFeeds);
        return loadedFeeds;
      },
      // providesTags: (result, error, arg) =>
      //   result
      //     ? [...result.map(({ id }) => ({ type: "Feed", id })), "Feed"]
      //     : ["Feed"],
      providesTags: ["Feed"],
    }),
    addFeed: builder.mutation({
      query: (data) => ({
        url: `${FEEDS_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feed"],
    }),
    deleteFeed: builder.mutation({
      query: (data) => ({
        url: `${FEEDS_URL}`,
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Feed"],
    }),
    updateFeed: builder.mutation({
      query: (data) => ({
        url: `${FEEDS_URL}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Feed"],
    }),
  }),
});

export const {
  useGetFeedsQuery,
  useAddFeedMutation,
  useDeleteFeedMutation,
  useUpdateFeedMutation,
} = feedsApiSlice;
