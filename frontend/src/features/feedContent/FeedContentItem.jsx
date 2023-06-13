/* eslint-disable react/prop-types */
import { Grid, Typography, Link } from "@mui/material";
import calcTimeSince from "../../utils/calcTimeSince";
import { Link as RouterLink } from "react-router-dom";
const FeedContentItem = ({ item }) => {
  const { timeSince, unit } = calcTimeSince(item.pubDate, new Date().getTime());
  const isYoutubeVideo = item.link.includes("youtube");
  return (
    <Grid item xs={12}>
      {/* <Link href={item.link} target="_blank">
        <Typography variant="body1">
          {item.title} {type === "category" ? item.feedTitle : null}
        </Typography>
      </Link> */}
      <Link
        component={RouterLink}
        to={isYoutubeVideo ? "/youtube-video" : "/article"}
        state={item}>
        <Typography variant="body1">{item.title}</Typography>
      </Link>
      <Typography
        variant="body2"
        display="inline-list-item"
        sx={{ whiteSpace: "pre" }}>
        {item?.feedTitle ? item.feedTitle + "\t\t\t" : null}
        {timeSince ? `${timeSince} ${unit} ago` + "\t\t\t" : null}
        <Link target="_blank" href={item.link}>
          Source
        </Link>
      </Typography>
    </Grid>
  );
};

export default FeedContentItem;
