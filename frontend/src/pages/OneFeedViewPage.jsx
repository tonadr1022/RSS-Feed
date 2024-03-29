import { useParams } from "react-router-dom";
import { useGetFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
import FeedContentList from "../features/feedContent/FeedContentList";
import { Typography, CircularProgress, Box } from "@mui/material";
const OneFeedViewPage = () => {
  const { feedId } = useParams();

  const {
    data: feedContent,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetFeedContentsQuery(feedId);
  const title = feedContent && Object.keys(feedContent)[0];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      {isLoading ? (
        <CircularProgress sx={{ marginTop: 20 }} />
      ) : isSuccess ? (
        <>
          <Typography variant="h2" component="h1">
            {title}
          </Typography>
          <FeedContentList feedContent={feedContent[title]} />
        </>
      ) : isError ? (
        <Typography variant="h6" component="p">
          Error: {error.status} {error.message}
        </Typography>
      ) : null}
    </Box>
  );
};

export default OneFeedViewPage;
