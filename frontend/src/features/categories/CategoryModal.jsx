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
import { toast } from "react-toastify";
import { useState } from "react";
import { useAddCategoryMutation } from "./categoriesApiSlice";
import { Cancel } from "@mui/icons-material";

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

const CategoryModal = ({ setModalIsOpen }) => {
  const [name, setName] = useState("");
  const [addCategory] = useAddCategoryMutation();
  const handleNameChange = (e) => setName(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCategory({ name: name }).unwrap();
      console.log(response);
      setModalIsOpen(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };

  return (
    <Modal open={true} onClose={() => setModalIsOpen(false)}>
      <Box component="form" onSubmit={handleSubmit} sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={2} textAlign={"center"}>
            <IconButton
              sx={{ marginLeft: -5, marginTop: -3 }}
              onClick={() => setModalIsOpen(false)}>
              <Cancel fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={10}>
            <Typography textAlign={"start"} variant="h4">
              Add Category
            </Typography>
          </Grid>

          <Grid item xs={12} textAlign={"center"}>
            <TextField fullWidth label="Name" onChange={handleNameChange} />
          </Grid>
          <Grid item xs={12} textAlign={"center"}>
            <Button
              type="submit"
              sx={{ width: "30%", height: 60, marginBottom: 2 }}
              variant="contained">
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default CategoryModal;
