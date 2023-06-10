import CategoriesList from "../features/categories/CategoriesList";
import { Box, Typography, IconButton } from "@mui/material";
import { AddCircleOutline } from "@mui/icons-material";
import { useState } from "react";
import CategoryModal from "../features/categories/CategoryModal";

const CategoriesPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <Box
      component={"main"}
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h2" component={"h1"}>
        Categories
      </Typography>
      <IconButton
        variant="contained"
        sx={{ marginBottom: 2, marginTop: 2 }}
        onClick={() => setModalIsOpen(!modalIsOpen)}>
        <AddCircleOutline fontSize="large" />
      </IconButton>
      <CategoriesList />
      {modalIsOpen && <CategoryModal setModalIsOpen={setModalIsOpen} />}
    </Box>
  );
};

export default CategoriesPage;
