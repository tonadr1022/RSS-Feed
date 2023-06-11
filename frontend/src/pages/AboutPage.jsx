import { Box, Typography } from "@mui/material";
import React from "react";

const pStyle = {
  fontSize: 20,
  textAlign: "center",
  marginTop: 3,
};
const AboutPage = () => {
  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography textAlign="center" variant="h2" component="h1">
        About
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Welcome to Feed Me! This is an RSS feed reader in development
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Create categories to divide feed groups, and select favorites to view on
        the home page.
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Most news sources have RSS feeds, and you can (eventually, not yet)
        enter a YouTube channel name or subreddit name to fetch the feed.
        Support for other platforms may come soon.
      </Typography>
    </Box>
  );
};

export default AboutPage;
