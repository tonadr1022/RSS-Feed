/* eslint-disable react/prop-types */
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Container,
  Modal,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAddFeedMutation, useUpdateFeedMutation } from "./feedsApiSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
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

const FeedModal = ({ feed, setModalIsOpen, setSelectedFeed }) => {
  console.log(feed);
  const [addFeed, { isLoading: addIsLoading }] = useAddFeedMutation();
  const [updateFeed, { isLoading: patchIsLoading }] = useUpdateFeedMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      let response;
      if (feed) {
        data = { ...data, _id: feed._id };
        delete data.url;
        response = await updateFeed(data).unwrap();
        setModalIsOpen(false);
      } else {
        response = await addFeed(data).unwrap();
      }
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  const handleClose = () => {
    setSelectedFeed(null);
    setModalIsOpen(false);
  };

  return (
    <Modal open={true} onClose={handleClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style}>
        <Typography variant="h4" sx={{ marginBottom: 2 }}>
          {feed ? "Update Feed" : "Add Feed"}
        </Typography>
        {(addIsLoading || patchIsLoading) && <p>LOADING</p>}
        <Grid container sx={{ textAlign: "center" }} spacing={2}>
          {!feed && (
            <Grid item xs={12}>
              <TextField
                {...register("url")}
                required
                defaultValue={feed ? feed?.url : ""}
                fullWidth
                autoFocus
                label="Url"
              />
            </Grid>
          )}
          {!feed ? (
            <Grid item xs={12}>
              <Typography textAlign={"center"}>
                Optionally add a title or description
              </Typography>
            </Grid>
          ) : null}
          <Grid item xs={12}>
            <TextField
              {...register("title")}
              required
              fullWidth
              defaultValue={feed ? feed?.title : ""}
              autoFocus
              label="Title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("description")}
              fullWidth
              autoFocus
              defaultValue={feed ? feed?.description : ""}
              label="Description"
              multiline
              minRows={5}
            />
          </Grid>
          {/* <Grid item xs={12}>
            <InputLabel id="shoe-label">Shoe</InputLabel>
            <Select
              labelId="shoe-label"
              sx={{ width: "50%" }}
              required
              defaultValue={feed?.category || ""}
              {...register("shoe")}>
              {categories.map((category, i) => (
                <MenuItem key={category} value={category}>
                  {shoe.nickname}
                </MenuItem>
              ))}
            </Select>
          </Grid> */}
          <Grid item xs={12}>
            <Button type="submit" sx={{ width: "30%" }} variant="contained">
              {feed ? "Update" : "Add"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default FeedModal;
