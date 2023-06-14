import { Box, Link, Typography } from "@mui/material";
import React from "react";
import { Link as BrowserLink } from "react-router-dom";
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
        Welcome to Feed Me! An RSS feed reader to simplify your internet.
        consumption
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Create categories to divide feed groups, and select favorites to view on
        the home page.
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Go to{" "}
        {
          <Link component={BrowserLink} to="/find-feeds">
            Find Feeds
          </Link>
        }{" "}
        to browse news sites.
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        To save a youtube channel or subreddit as an rss feed, add the main url
        of the subreddit or channel.
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Check out the{" "}
        {
          <Link
            component={BrowserLink}
            to="https://github.com/tonadr1022/RSS-Feed">
            GitHub Repo
          </Link>
        }{" "}
        for this site to view the source code.
      </Typography>
    </Box>
  );
};

export default AboutPage;
