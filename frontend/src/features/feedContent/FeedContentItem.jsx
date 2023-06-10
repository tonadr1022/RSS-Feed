/* eslint-disable react/prop-types */
import { Grid, Typography, Link } from "@mui/material";
import calcTimeSince from "../../utils/calcTimeSince";
const FeedContentItem = ({ item }) => {
  const { timeSince, unit } = calcTimeSince(item.pubDate, new Date().getTime());
  return (
    <Grid item xs={12}>
      <Link href={item.link}>
        <Typography variant="body1">{item.title}</Typography>
      </Link>
      <Typography variant="body2" display="inline-list-item">
        &emsp;&emsp;&emsp;{item.feedTitle}&emsp;&emsp;&emsp;{timeSince} {unit}
        ago
      </Typography>
    </Grid>
  );
};

export default FeedContentItem;
