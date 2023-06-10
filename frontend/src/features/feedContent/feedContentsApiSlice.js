import { apiSlice } from "../../app/api/apiSlice";
const FEED_CONTENTS_URL = "/api/feeds/content";
// const feedContentsAdapter = createEntityAdapter({});

// const initialState = feedContentsAdapter.getInitialState();

export const feedContentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllFeedContents: builder.query({
      query: () => ({
        url: `${FEED_CONTENTS_URL}`,
        validateStatus: (response, result) => {
          return response.status <= 300 && !result.isError;
        },
      }),
      // transformResponse: (responseData) =>
      //   feedContentsAdapter.setAll(initialState, responseData),
      providesTags: ["FeedContent"],
      // providesTags: (result, error, arg) => [
      //   { type: "FeedContent", id: "LIST" },
      //   ...result.ids.map((id) => ({ type: "FeedContent", id })),
      // ],
    }),
    getCategoryFeedContents: builder.query({
      query: (id) => ({
        url: `${FEED_CONTENTS_URL}/?categoryId=${id}`,
        validateStatus: (response, result) => {
          return response.status <= 300 && !result.isError;
        },
      }),
      providesTags: (result, error, id) => [{ type: "FeedContent", id }],
    }),
    getFeedContents: builder.query({
      query: (id) => ({
        url: `${FEED_CONTENTS_URL}/${id}`,
        validateStatus: (response, result) => {
          return response.status <= 300 && !result.isError;
        },
      }),
      providesTags: (result, error, id) => [{ type: "FeedContent", id }],
    }),
  }),
});

export const {
  useGetAllFeedContentsQuery,
  useGetFeedContentsQuery,
  useGetCategoryFeedContentsQuery,
} = feedContentsApiSlice;

// // returns query result
// export const selectFeedContentsResult =
//   feedContentsApiSlice.endpoints.getFeedContents.select();

// // create memoized selector
// const selectFeedContentsData = createSelector(
//   selectFeedContentsResult,
//   (feedContentsResult) => feedContentsResult.data
// );

// // get selectors creates these and renamed them
// export const {
//   selectAll: selectAllFeedContents,
//   selectById: selectFeedContentById,
//   selectIds: selectFeedContentIds,
// } = feedContentsAdapter.getSelectors(
//   (state) => selectFeedContentsData(state) ?? initialState
// );
