import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link,
} from "@mui/material";

/* eslint-disable react/prop-types */
const CategoryCard = ({ category, handleClick }) => {
  console.log("cat feeds", category.feeds);
  return (
    <Card>
      <CardContent>
        <Typography variant="h4">{category.name}</Typography>
        {category?.feeds?.length > 0
          ? category.feeds.map((feed, i) => (
              <Link key={i}>
                <Typography
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleClick(feed)}
                  variant="body1">
                  {feed.title}
                </Typography>
              </Link>
            ))
          : null}
      </CardContent>
      <CardActions>
        <Button>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
