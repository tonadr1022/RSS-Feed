import { useParams } from "react-router-dom";
import { useGetCategoryFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
import FeedContentList from "../features/feedContent/FeedContentList";
import { Typography } from "@mui/material";

const CategoryFeedsViewPage = () => {
  const { categoryId: id } = useParams();
  console.log("categoryId", id);
  const {
    data: feedContent,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetCategoryFeedContentsQuery(id);
  console.log("status", isLoading, isFetching, isError, isSuccess);
  const title = feedContent && Object.keys(feedContent)[0];
  console.log("feed content", feedContent, title);
  return (
    feedContent && (
      <>
        <Typography variant="h1">{title}</Typography>
        <FeedContentList type={"category"} feedContent={feedContent[title]} />
      </>
    )
  );
};

export default CategoryFeedsViewPage;
