/* eslint-disable react/prop-types */
import { Grid, Typography } from "@mui/material";
import FeedContentItem from "./FeedContentItem";
const FeedContentList = ({ feedContent, type }) => {
  return (
    <Grid container padding={2}>
      {feedContent.map((item, index) => (
        <FeedContentItem key={index} type={type} item={item} />
      ))}
    </Grid>
  );
};

export default FeedContentList;
