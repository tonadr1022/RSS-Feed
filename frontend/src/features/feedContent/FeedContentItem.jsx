/* eslint-disable react/prop-types */
import { Grid, Typography, Link } from "@mui/material";
import calcTimeSince from "../../utils/calcTimeSince";
import { useNavigate } from "react-router-dom";
const FeedContentItem = ({ item, type }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${encodeURIComponent(item.link)}`);
  };
  const { timeSince, unit } = calcTimeSince(item.pubDate, new Date().getTime());
  return (
    <Grid item xs={12}>
      {/* <Link href={item.link} target="_blank">
        <Typography variant="body1">
          {item.title} {type === "category" ? item.feedTitle : null}
        </Typography>
      </Link> */}
      <Link onClick={handleClick}>
        <Typography variant="body1">
          {item.title} {type === "category" ? item.feedTitle : null}
        </Typography>
      </Link>
      <Typography variant="body2" display="inline-list-item">
        &emsp;&emsp;&emsp;{item.feedTitle}&emsp;&emsp;&emsp;{timeSince} {unit}
        ago &emsp;&emsp;&emsp; <Link href={item.link}>Source</Link>
      </Typography>
    </Grid>
  );
};

export default FeedContentItem;
