/* eslint-disable react/prop-types */
import { Grid, Typography, Link } from "@mui/material";
import calcTimeSince from "../../utils/calcTimeSince";
const FeedContentItem = ({ item, type }) => {
  const { timeSince, unit } = calcTimeSince(item.pubDate, new Date().getTime());
  return (
    <Grid item xs={12}>
      <Link href={item.link} target="_blank">
        <Typography variant="body1">
          {item.title} {type === "category" ? item.feedTitle : null}
        </Typography>
      </Link>
      <Typography variant="body2" display="inline-list-item">
        &emsp;&emsp;&emsp;{item.feedTitle}&emsp;&emsp;&emsp;{timeSince} {unit}
        ago
      </Typography>
    </Grid>
  );
};

export default FeedContentItem;
