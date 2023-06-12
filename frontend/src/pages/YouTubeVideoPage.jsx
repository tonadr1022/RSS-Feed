import { Box, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "../components/ui/VideoPlayer";
const YouTubeVideoPage = () => {
  const { isoDate, link: youtubeUrl, title } = useLocation().state;
  const embedSrc = youtubeUrl.replace("watch?v=", "embed/");
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "56.25%",
      }}>
      {/* <Grid container>
        <Grid item xs={12}>
          <iframe
            src={embedSrc}
            style={{ border: "none", width: "100%", height: "40vh" }}
            allowFullScreen></iframe>
        </Grid>
      </Grid> */}
      <VideoPlayer embedSrc={embedSrc} />
    </Box>
  );
};

export default YouTubeVideoPage;
