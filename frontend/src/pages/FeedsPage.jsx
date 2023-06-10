import { Box, Button, TextField } from "@mui/material";
import FeedsList from "../features/feeds/FeedsList";
import { useState } from "react";
import FeedModal from "../features/feeds/FeedModal";
const FeedsPage = () => {
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
      <Button
        variant="contained"
        sx={{ width: "30%", height: 60, marginBottom: 2 }}
        onClick={() => setModalIsOpen(!modalIsOpen)}>
        Add Feed
      </Button>
      <FeedsList
        handleUpdateFeed={handleUpdateFeed}
        setModalIsOpen={setModalIsOpen}
      />
      {modalIsOpen && (
        <FeedModal
          feed={selectedFeed}
          setModalIsOpen={setModalIsOpen}
          setSelectedFeed={setSelectedFeed}
        />
      )}
    </Box>
  );
};

export default FeedsPage;
