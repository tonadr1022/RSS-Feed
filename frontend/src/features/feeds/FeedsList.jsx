/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useDeleteFeedMutation, useGetFeedsQuery } from "./feedsApiSlice";
import { Typography, Grid, CircularProgress } from "@mui/material";

import FeedItem from "./FeedItem";
import { useNavigate } from "react-router-dom";

const FeedsList = ({ handleUpdateFeed }) => {
  const navigate = useNavigate();
  const [deleteFeed] = useDeleteFeedMutation();
  const {
    data: feeds,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetFeedsQuery();

  const handleDeleteFeed = async (id) => {
    try {
      await deleteFeed({ id: id }).unwrap();
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const handleFeedClick = (feed) => {
    navigate(`/feeds/${feed.id}`);
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ marginTop: 10 }} />
      ) : isSuccess ? (
        <>
          {feeds.length === 0 ? (
            <Typography variant="h6" component="h2">
              Add Some Feeds!
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {feeds.map((feed) => (
                <Grid item key={feed.id} xs={12} sm={6} md={4}>
                  <FeedItem
                    feed={feed}
                    handleFeedClick={handleFeedClick}
                    handleDeleteFeed={handleDeleteFeed}
                    handleUpdateFeed={handleUpdateFeed}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      ) : isError ? (
        <Typography variant="h6" component="p">
          error: {error.status} {error.message}
        </Typography>
      ) : null}
    </>
  );
};
export default FeedsList;
