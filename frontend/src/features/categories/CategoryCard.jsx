import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Link,
  Grid,
} from "@mui/material";
import { useDeleteCategoryMutation } from "./categoriesApiSlice";

/* eslint-disable react/prop-types */
const CategoryCard = ({ category, handleClick, handleDelete }) => {
  return (
    <Card
      sx={{
        ":hover": {
          boxShadow: 24,
        },
      }}>
      <CardContent
        sx={{
          cursor: "pointer",
        }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography onClick={() => handleClick(category)} variant="h4">
              {category.name}
            </Typography>
          </Grid>
          {category?.feeds?.length > 0
            ? category.feeds.map((feed, i) => (
                <Grid key={i} item xs={12}>
                  <Link>
                    <Typography
                      sx={{ cursor: "pointer", display: "inline" }}
                      onClick={() => handleClick(feed)}
                      variant="body1">
                      {feed.title}
                    </Typography>
                  </Link>
                </Grid>
              ))
            : null}
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={() => handleDelete(category._id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default CategoryCard;
