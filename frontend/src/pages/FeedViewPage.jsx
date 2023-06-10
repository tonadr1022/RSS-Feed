import React from "react";
import { useParams } from "react-router-dom";
import { useGetFeedContentsQuery } from "../features/feedContent/feedContentsApiSlice";
import FeedContentList from "../features/feedContent/FeedContentList";

const FeedViewPage = () => {
  const { feedId: id } = useParams();

  const { data: feedContent, isLoading } = useGetFeedContentsQuery(id);
  const title = feedContent && Object.keys(feedContent)[0];
  return (
    feedContent && (
      <>
        <p>{title}</p>
        <FeedContentList feedContent={feedContent[title]} />
      </>
    )
  );
};

export default FeedViewPage;
