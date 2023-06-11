import { Box, Typography, Button, Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const LandingContent = () => {
  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //   }}>
    <Grid container sx={{ textAlign: "center" }} spacing={3}>
      <Grid item xs={12}>
        <Typography align="center">Welcome to Feed Me!</Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" component={Link} to="/about">
          Learn More Here
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          Add some feeds and put them in categories.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography align="center">
          View your favorite feeds on this home page after assigning favorites
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" component={Link} to="/categories">
          Add Category
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" component={Link} to="/feeds">
          Add Feed
        </Button>
      </Grid>
    </Grid>

    // </Box>
  );
};

export default LandingContent;
