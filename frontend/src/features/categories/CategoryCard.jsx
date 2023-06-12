import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useDeleteCategoryMutation } from "./categoriesApiSlice";

/* eslint-disable react/prop-types */
const CategoryCard = ({ category, handleClick, handleDelete }) => {
  return (
    <Card>
      <CardContent>
        <Typography onClick={() => handleClick(category)} variant="h4">
          {category.name}
        </Typography>
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
        <Button onClick={() => handleDelete(category._id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
