import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import App from "./App.jsx";
import store from "./app/store.js";
import { Provider } from "react-redux";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import FeedsPage from "./pages/FeedsPage.jsx";
import OneFeedViewPage from "./pages/OneFeedViewPage.jsx";
import CategoryFeedsViewPage from "./pages/CategoryFeedsViewPage.jsx";
import CategoriesPage from "./pages/CategoriesPage.jsx";
import ArticleViewPage from "./pages/ArticleViewPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import YouTubeVideoPage from "./pages/YouTubeVideoPage.jsx";
import PrivateRoute from "./components/ui/PrivateRoute.jsx";
import HelpPage from "./pages/HelpPage.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" index={true} element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/feeds" element={<FeedsPage />} />
        <Route path="/feeds/:feedId" element={<OneFeedViewPage />} />
        <Route
          path="/categories/:categoryId"
          element={<CategoryFeedsViewPage />}
        />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/article" element={<ArticleViewPage />} />
        <Route path="/youtube-video" element={<YouTubeVideoPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
