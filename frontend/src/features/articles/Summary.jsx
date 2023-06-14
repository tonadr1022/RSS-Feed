/* eslint-disable react/prop-types */
import { Typography } from "@mui/material";
const Summary = ({ text }) => {
  console.log(text?.summary);
  return (
    text?.summary && (
      <>
        <Typography sx={{ marginTop: 2 }} variant="h6">
          Summary
        </Typography>
        <Typography sx={{ marginTop: 0 }} variant="body2">
          {text.summary}
        </Typography>
      </>
    )
  );
};

export default Summary;
