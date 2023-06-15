/* eslint-disable react/prop-types */
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Modal,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { useAddFeedMutation } from "./feedsApiSlice";
import { useForm } from "react-hook-form";
import { Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "375px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const MultipleAddModal = ({
  categories,
  modalType,
  setMultipleAddModalOpen,
}) => {
  const [addFeed, { isLoading: addIsLoading }] = useAddFeedMutation();

  const [feedsArr, setFeedsArr] = useState([]);
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const promises = feedsArr.map((submission) => addFeed(submission));
      console.log("promises", promises);
      const results = await Promise.all(promises);
      console.log("res", results);
      setMultipleAddModalOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
  const handleSubmissionChange = (e) => {
    const str = e.target.value;
    const entries = str
      .replace(/ +(?= )/g, "")
      .trim()
      .split(",");
    let formatted;
    if (modalType === "YouTube") {
      formatted = entries.map((entry) => ({ url: entry }));
    } else {
      formatted = entries.map((entry) => {
        const title =
          entry.trim().charAt(0).toUpperCase() + entry.trim().slice(1);
        const url = `https://www.reddit.com/r/${title}`;
        return {
          url: url,
          title: title,
        };
      });
    }
    setFeedsArr(formatted);
  };

  return (
    <Modal open={true} onClose={() => setMultipleAddModalOpen(false)}>
      <Box component="form" onSubmit={onSubmit} sx={style}>
        {addIsLoading && <CircularProgress />}
        <Grid container sx={{ textAlign: "center" }} spacing={1}>
          <Grid item xs={2}>
            <IconButton
              sx={{ marginLeft: -5, marginTop: -4 }}
              onClick={() => setMultipleAddModalOpen(false)}>
              <Cancel fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography sx={{ marginLeft: -1 }} textAlign="start" variant="h4">
              {`Add ${modalType}`}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              textAlign={"center"}
              variant="body2"
              sx={{ marginBottom: 2 }}>
              Instead of finding your own urls, enter names in a comma delimited
              list. For more customization, edit each entry after submission.
              Ensure the URLs look valid before submitting (no spaces).
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              autoFocus
              multiline
              onChange={handleSubmissionChange}
              minRows={5}
              label={
                modalType === "YouTube" ? "YouTube Channels" : "Subreddits"
              }
            />
          </Grid>
          <Grid item xs={12}>
            {modalType === "Reddit" && (
              <Typography>
                {feedsArr.map((subreddit, index) => (
                  <span key={index}>{subreddit.url} </span>
                ))}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" sx={{ width: "30%" }} variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default MultipleAddModal;
