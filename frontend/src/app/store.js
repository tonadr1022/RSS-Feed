import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../app/api/authSlice";
import { apiSlice } from "./api/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
export default store;
