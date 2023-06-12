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
  FormControlLabel,
  IconButton,
} from "@mui/material";
import { useAddFeedMutation, useUpdateFeedMutation } from "./feedsApiSlice";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Cancel } from "@mui/icons-material";
import { Link } from "react-router-dom";

const style = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "375px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const FeedModal = ({
  feed,
  categories,
  setModalIsOpen,
  handleModalClose,
  setSelectedFeed,
}) => {
  const [addFeed, { isLoading: addIsLoading }] = useAddFeedMutation();
  const [updateFeed, { isLoading: patchIsLoading }] = useUpdateFeedMutation();

  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      let response;
      if (feed) {
        data = { ...data, _id: feed._id };

        delete data.url;
        if (data.category === "") delete data.category;
        response = await updateFeed(data).unwrap();
        handleModalClose();
      } else {
        response = await addFeed(data).unwrap();
        handleModalClose();
      }
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <Modal open={true} onClose={handleModalClose}>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={style}>
        {(addIsLoading || patchIsLoading) && <p>LOADING</p>}
        <Grid container sx={{ textAlign: "center" }} spacing={1}>
          <Grid item xs={2}>
            <IconButton
              sx={{ marginLeft: -5, marginTop: -3 }}
              onClick={handleModalClose}>
              <Cancel fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            {feed ? (
              <Typography
                textAlign={"start"}
                variant="h4"
                sx={{ marginBottom: 2, paddingLeft: "10px" }}>
                Update Feed
              </Typography>
            ) : (
              <Typography
                textAlign={"start"}
                variant="h4"
                sx={{ marginBottom: 2, paddingLeft: 4 }}>
                Add Feed
              </Typography>
            )}
          </Grid>
          <Grid item xs={12}>
            {feed?.url && (
              <Typography textAlign="center" variant="body2">
                URL: {feed.url}
              </Typography>
            )}
          </Grid>
          {!feed && (
            <Grid item xs={12}>
              <TextField
                {...register("url")}
                required
                defaultValue={feed ? feed?.url : ""}
                fullWidth
                autoFocus={!!feed}
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
              autoFocus={!feed}
              defaultValue={feed ? feed?.title : ""}
              label="Title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              {...register("description")}
              fullWidth
              defaultValue={feed ? feed?.description : ""}
              label="Description"
              multiline
              minRows={5}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("isFavorite")}
                  defaultChecked={feed?.isFavorite}
                />
              }
              label="Favorite"
            />
          </Grid>
          <Grid item xs={12}>
            {categories.length === 0 ? (
              <Button
                component={Link}
                to="/categories"
                variant="contained"
                sx={{ width: "50%" }}>
                Add A Category To Associate!
              </Button>
            ) : (
              <>
                <InputLabel id="category-label">Category</InputLabel>

                <Select
                  labelId="category-label"
                  sx={{ width: "50%" }}
                  defaultValue={feed?.category?._id || ""}
                  {...register("category")}>
                  {categories.map((category, i) => (
                    <MenuItem key={i} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
          </Grid>
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
