/* eslint-disable react/prop-types */
import React from "react";
import { Typography } from "@mui/material";

const ErrorText = ({ error }) => {
  return (
    <>
      <Typography variant="h6" component="p">
        Error, we will get it fixed as soon as possible.
      </Typography>
      <Typography variant="h6" component="p">
        Error: {error?.status} {error?.message}
      </Typography>
    </>
  );
};

export default ErrorText;
