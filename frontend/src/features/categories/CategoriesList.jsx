import { Grid } from "@mui/material";
import CategoryCard from "./CategoryCard";
import { useGetCategoriesQuery } from "./categoriesApiSlice";
import { useNavigate } from "react-router-dom";

const CategoriesList = () => {
  const navigate = useNavigate();
  const { data: categories } = useGetCategoriesQuery();

  const handleClick = (item) => {
    if (item?.url) {
      navigate(`/feeds/${item._id}`);
    } else {
      console.log("item", item);
    }
  };
  return (
    categories && (
      <Grid container spacing={2}>
        {categories.map((category, i) => (
          <Grid item key={i} xs={6} sm={4}>
            <CategoryCard handleClick={handleClick} category={category} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default CategoriesList;
