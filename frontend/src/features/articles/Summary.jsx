/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
const Summary = ({ text }) => {
  console.log(text?.summary);
  return (
    text?.summary && (
      <>
        <Typography sx={{ marginTop: 2 }} variant="h5">
          GPT Summary
        </Typography>
        <Typography sx={{ marginTop: 2 }} variant="h6">
          {text.summary.split("\n")[0]}
        </Typography>
        <Typography sx={{ marginTop: 2 }} variant="body1">
          {text.summary.split("\n")[2]}
        </Typography>
      </>
    )
  );
};

export default Summary;
