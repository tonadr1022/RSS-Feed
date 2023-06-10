/* eslint-disable react/prop-types */
import {
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
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
        <Typography variant="h4">{feed.title}</Typography>
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
