/* eslint-disable react/prop-types */
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useAddCategoryMutation } from "./categoriesApiSlice";
import { toast } from "react-toastify";
const AddCategoryForm = ({ setFormOpen }) => {
  const [name, setName] = useState("");
  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const handleNameChange = (e) => setName(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addCategory({ name: name }).unwrap();
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
  return (
    <>
      <Button
        sx={{ width: "30%", height: 60, marginBottom: 2 }}
        variant="contained"
        onClick={() => setFormOpen(false)}>
        Close
      </Button>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          sx={{ width: "40%" }}
          label="Name"
          onChange={handleNameChange}
        />
        <Button
          type="submit"
          sx={{ width: "30%", height: 60, marginBottom: 2 }}
          variant="contained">
          Save
        </Button>
      </Box>
    </>
  );
};

export default AddCategoryForm;
