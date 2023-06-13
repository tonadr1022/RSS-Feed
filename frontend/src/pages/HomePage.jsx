import { useSelector } from "react-redux";
import FeedContentList from "../features/feedContent/FeedContentList";
import { useGetAllFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LandingContent from "../features/info/LandingContent";

const FavoritesFeedContent = () => {
  const {
    data: feedContent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllFeedContentsQuery();
  console.log(feedContent);
  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ marginTop: 10 }} />
      ) : isSuccess && feedContent.feedTitles.length > 0 ? (
        <FeedContentList feedContent={feedContent} />
      ) : isError ? (
        <Typography variant="h6" component="p">
          error: {error.status}
        </Typography>
      ) : (
        <LandingContent />
      )}
    </>
  );
};

const HomePage = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography textAlign="center" variant="h2">
        {userInfo ? "Feed Me" : "Welcome to Feed Me"}
      </Typography>
      {!userInfo ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Typography textAlign="center" variant="h6">
            This is an RSS Feed Reader
          </Typography>

          <Button
            sx={{ margin: 2 }}
            component={Link}
            to="/about"
            variant="contained">
            About
          </Button>
          <Button
            sx={{ margin: 2 }}
            component={Link}
            to="/login"
            variant="contained">
            Login
          </Button>
          <Button
            sx={{ margin: 2 }}
            component={Link}
            to="/register"
            variant="contained">
            Register
          </Button>
        </Box>
      ) : null}
      {userInfo && <FavoritesFeedContent />}
    </Box>
  );
};

export default HomePage;
