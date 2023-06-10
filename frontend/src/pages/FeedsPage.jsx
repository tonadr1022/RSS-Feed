import { Box, IconButton, Typography } from "@mui/material";
import FeedsList from "../features/feeds/FeedsList";
import { useState } from "react";
import FeedModal from "../features/feeds/FeedModal";
import { useGetCategoriesQuery } from "../features/categories/categoriesApiSlice";
import { AddCircleOutline } from "@mui/icons-material";
const FeedsPage = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);

  const handleUpdateFeed = (selectedFeed) => {
    setSelectedFeed(selectedFeed);
    setModalIsOpen(true);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h2" component={"h1"}>
        Feeds
      </Typography>
      <IconButton
        variant="contained"
        sx={{ marginBottom: 2, marginTop: 2 }}
        onClick={() => setModalIsOpen(!modalIsOpen)}>
        <AddCircleOutline fontSize="large" />
      </IconButton>
      <FeedsList
        handleUpdateFeed={handleUpdateFeed}
        setModalIsOpen={setModalIsOpen}
      />
      {modalIsOpen && (
        <FeedModal
          feed={selectedFeed}
          categories={categories}
          setModalIsOpen={setModalIsOpen}
          setSelectedFeed={setSelectedFeed}
        />
      )}
    </Box>
  );
};

export default FeedsPage;
