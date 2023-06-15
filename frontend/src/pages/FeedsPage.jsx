import { Box, IconButton, Typography, Button } from "@mui/material";
import FeedsList from "../features/feeds/FeedsList";
import { useState } from "react";
import FeedModal from "../features/feeds/FeedModal";
import { useGetCategoriesQuery } from "../features/categories/categoriesApiSlice";
import { AddCircleOutline } from "@mui/icons-material";
import MultipleAddModal from "../features/feeds/MultipleAddModal";
const FeedsPage = () => {
  const { data: categories } = useGetCategoriesQuery();

  const [feedModalOpen, setFeedModalOpen] = useState(false);
  const [multipleAddModalOpen, setMultipleAddModalOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [modalType, setModalType] = useState("");

  const handleUpdateFeed = (selectedFeed) => {
    setSelectedFeed(selectedFeed);
    setFeedModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedFeed(null);
    setFeedModalOpen(false);
  };

  const handleMultipleAddModalOpen = (type) => {
    setModalType(type);
    setMultipleAddModalOpen(true);
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
        onClick={() => setFeedModalOpen(true)}>
        <AddCircleOutline fontSize="large" />
      </IconButton>
      <Button onClick={() => handleMultipleAddModalOpen("Reddit")}>
        Add Reddit
      </Button>
      <Button onClick={() => handleMultipleAddModalOpen("YouTube")}>
        Add Youtube
      </Button>
      <FeedsList
        handleUpdateFeed={handleUpdateFeed}
        setModalIsOpen={setFeedModalOpen}
      />
      {multipleAddModalOpen && (
        <MultipleAddModal
          modalType={modalType}
          categories={categories}
          setMultipleAddModalOpen={setMultipleAddModalOpen}
        />
      )}
      {feedModalOpen && (
        <FeedModal
          feed={selectedFeed}
          categories={categories}
          handleModalClose={handleModalClose}
          setModalIsOpen={setFeedModalOpen}
          setSelectedFeed={setSelectedFeed}
        />
      )}
    </Box>
  );
};

export default FeedsPage;
