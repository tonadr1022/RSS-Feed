import React from "react";
import { Box, Typography } from "@mui/material";

const pStyle = {
  fontSize: 20,
  textAlign: "center",
  marginTop: 3,
};

const HelpPage = () => {
  return (
    <Box
      component="main"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography textAlign="center" variant="h2" component="h1">
        Help
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Please contact ........
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Reddit pages: Subreddit URL
      </Typography>
      <Typography variant="body1" component="p" sx={pStyle}>
        Youtube channels: Channel URL
      </Typography>
    </Box>
  );
};

export default HelpPage;
