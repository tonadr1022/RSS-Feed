import { Button, TextField } from "@mui/material";
import FeedsList from "../components/ui/FeedsList";
import AddFeedForm from "../features/feeds/addFeedForm";
import { useState } from "react";
const FeedsPage = () => {
  const [showAddFeed, setShowAddFeed] = useState(false);
  return (
    <main>
      <Button onClick={() => setShowAddFeed(!showAddFeed)}>Add Feed</Button>
      {showAddFeed && <AddFeedForm />}
      <FeedsList />
    </main>
  );
};

export default FeedsPage;
