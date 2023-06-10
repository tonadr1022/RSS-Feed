import { useGetCategoriesQuery } from "./categoriesApiSlice";

const CategoriesList = () => {
  const { data, isLoading } = useGetCategoriesQuery();
  console.log("data", data);
  return data && data.map((category, i) => <p key={i}>{category.name}</p>);
};

export default CategoriesList;
