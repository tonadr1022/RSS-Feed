/* eslint-disable react/prop-types */
import { toast } from "react-toastify";
import { useDeleteFeedMutation, useGetFeedsQuery } from "./feedsApiSlice";
import { Typography, Button, Grid } from "@mui/material";
import { useState } from "react";
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
    refetch,
  } = useGetFeedsQuery();
  const handleDeleteFeed = async (id) => {
    try {
      const response = await deleteFeed({ id: id });
      refetch();
      console.log("response", response);
    } catch (err) {
      toast.error(err?.data?.message);
    }
  };
  const handleFeedClick = (feed) => {
    navigate(`/feeds/${feed.id}`);
    console.log(feed.title);
  };

  return (
    feeds && (
      <Grid container>
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
    )
  );
};
export default FeedsList;
