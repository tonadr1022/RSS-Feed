import React from "react";
import CategoriesList from "../features/categories/CategoriesList";
import { Button, Box } from "@mui/material";
import AddCategoryForm from "../features/categories/AddCategoryForm";
import { useState } from "react";

const CategoriesPage = () => {
  const [formOpen, setFormOpen] = useState(false);
  const handleAddCategory = () => {
    console.log("add cat");
  };
  return (
    <Box
      component={"main"}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {!formOpen && (
        <Button
          sx={{ width: "30%", height: 60, marginBottom: 2 }}
          variant="contained"
          onClick={() => setFormOpen(!formOpen)}>
          Add Category
        </Button>
      )}
      {formOpen && <AddCategoryForm setFormOpen={setFormOpen} />}
      <CategoriesList />
    </Box>
  );
};

export default CategoriesPage;
