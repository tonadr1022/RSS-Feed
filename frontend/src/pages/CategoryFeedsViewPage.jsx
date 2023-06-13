import { useParams } from "react-router-dom";
import { useGetCategoryFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
import FeedContentList from "../features/feedContent/FeedContentList";
import { Box, Typography, CircularProgress } from "@mui/material";

const CategoryFeedsViewPage = () => {
  const { categoryId: id } = useParams();
  console.log("categoryId", id);
  const {
    data: feedContent,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCategoryFeedContentsQuery(id);

  const title = feedContent && Object.keys(feedContent)[0];
  if (feedContent) {
    console.log(feedContent[title]);
  }
  return (
    <Box component="main" sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h2" component="h1" align="center">
        {title}
      </Typography>
      {isLoading ? (
        <CircularProgress sx={{ margin: "auto", marginTop: 10 }} />
      ) : isSuccess ? (
        <FeedContentList type={"category"} feedContent={feedContent[title]} />
      ) : isError ? (
        <Typography variant="h6" component="p">
          error: {error.status} {error.message}
        </Typography>
      ) : null}
    </Box>
  );
};

export default CategoryFeedsViewPage;
