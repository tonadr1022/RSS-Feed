import { useSelector } from "react-redux";
import FeedContentList from "../features/feedContent/FeedContentList";
import { useGetAllFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FavoritesFeedContent = () => {
  const {
    data: feedContent,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllFeedContentsQuery();
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : isSuccess ? (
        <FeedContentList feedContent={feedContent} />
      ) : isError ? (
        <Typography variant="h6" component="p">
          error: {error.status} {error.message}
        </Typography>
      ) : null}
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
            Please login or register
          </Typography>
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
