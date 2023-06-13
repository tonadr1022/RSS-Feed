/* eslint-disable react/prop-types */
import { useTheme } from "@emotion/react";
import { Star } from "@mui/icons-material";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
const FeedItem = ({
  handleDeleteFeed,
  handleUpdateFeed,
  handleFeedClick,
  feed,
}) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: theme.shadows[24],
        },
      }}>
      <CardContent
        sx={{
          cursor: "pointer",
        }}
        onClick={() => handleFeedClick(feed)}>
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h4" component={"h2"}>
              {feed.title}
            </Typography>
          </Grid>
          <Grid item xs={1}>
            {feed.isFavorite ? <Star fontSize="large" /> : null}
          </Grid>
        </Grid>
        {feed?.category ? (
          <Grid item xs={12}>
            <Typography variant="h6" component={"h3"}>
              {feed.category.name}
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12}>
          {feed?.description ? (
            <Typography variant="body1">{feed.description}</Typography>
          ) : null}
        </Grid>
      </CardContent>
      <CardActions sx={{ justifyContent: "space-evenly" }}>
        <Button onClick={() => handleDeleteFeed(feed.id)}>Delete</Button>
        <Button onClick={() => handleUpdateFeed(feed)}>Edit</Button>
      </CardActions>
    </Card>
  );
};

export default FeedItem;
