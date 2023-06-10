import { Grid, Typography, CircularProgress } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { useGetCategoriesQuery } from "./categoriesApiSlice";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
  const navigate = useNavigate();
  const {
    data: categories,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetCategoriesQuery();

  const handleClick = (item) => {
    if (item?.url) {
      // item is a feed
      navigate(`/feeds/${item._id}`);
    } else if (item?.feeds) {
      // item is a category
      navigate(`/categories/${item._id}`);
    }
  };

  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : isSuccess ? (
        <Grid container spacing={2}>
          {categories.map((category, i) => (
            <Grid item key={i} xs={6} sm={4}>
              <CategoryCard handleClick={handleClick} category={category} />
            </Grid>
          ))}
        </Grid>
      ) : isError ? (
        <Typography variant="h6" component="p">
          Error: {error.status} {error.message}
        </Typography>
      ) : null}
    </>
  );
};

export default CategoriesList;
