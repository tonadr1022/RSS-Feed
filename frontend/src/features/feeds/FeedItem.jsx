/* eslint-disable react/prop-types */
import { Star } from "@mui/icons-material";
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Box,
} from "@mui/material";
const FeedItem = ({
  handleDeleteFeed,
  handleUpdateFeed,
  handleFeedClick,
  feed,
}) => {
  return (
    <Card>
      <CardContent onClick={() => handleFeedClick(feed)}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            {feed.title}
          </Typography>
          {feed.isFavorite ? <Star fontSize="large" /> : null}
        </Box>
        {feed?.description ? (
          <Typography variant="body1">{feed.description}</Typography>
        ) : null}
      </CardContent>
      <CardActions sx={{ justifyContent: "space-evenly" }}>
        <Button onClick={() => handleDeleteFeed(feed.id)}>Delete</Button>
        <Button onClick={() => handleUpdateFeed(feed)}>Edit</Button>
      </CardActions>
    </Card>
  );
};

export default FeedItem;
