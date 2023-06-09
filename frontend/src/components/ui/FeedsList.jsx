import { useGetFeedsQuery } from "../../features/feeds/feedsApiSlice";
import { Typography } from "@mui/material";
const FeedsList = () => {
  const {
    data: feeds,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFeedsQuery();

  return (
    feeds &&
    feeds.map((feed) => <Typography key={feed.id}>{feed.title}</Typography>)
  );
};
export default FeedsList;
