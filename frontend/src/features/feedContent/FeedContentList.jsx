/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
import FeedContentItem from "./FeedContentItem";
const FeedContentList = ({ feedContent, type }) => {
  const articles = feedContent?.sortedContent
    ? feedContent.sortedContent
    : feedContent;
  return (
    <Grid container padding={2} spacing={2}>
      {articles.map((item, index) => (
        <FeedContentItem key={index} type={type} item={item} />
      ))}
    </Grid>
  );
};

export default FeedContentList;
