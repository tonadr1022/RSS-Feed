import { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useAddFeedMutation } from "./feedsApiSlice";
import { toast } from "react-toastify";
const AddFeedForm = () => {
  const [addFeed, { isLoading }] = useAddFeedMutation();
  const [urlToAdd, setUrlToAdd] = useState("");
  const onUrlChanged = (e) => {
    console.log("url in field", e.target.value);
    setUrlToAdd(e.target.value);
  };
  const handleAddFeed = async () => {
    try {
      const response = await addFeed({ url: urlToAdd }).unwrap();
      console.log("response", response);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
  return (
    <>
      <TextField label="url" name="feed" onChange={onUrlChanged} />
      <Button onClick={handleAddFeed}>Add</Button>
      {isLoading && <p>LOADING</p>}
    </>
  );
};

export default AddFeedForm;
