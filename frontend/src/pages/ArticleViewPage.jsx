import React from "react";
import { useGetArticleQuery } from "../features/articles/articlesApiSlice";
import { CircularProgress, Typography, Box, Link } from "@mui/material";
import { useLocation } from "react-router-dom";
import calcTimeSince from "../utils/calcTimeSince";
import { Link as RouterLink } from "react-router-dom";
const ArticleViewPage = () => {
  const { isoDate, link: sourceUrl, title } = useLocation().state;
  console.log(sourceUrl);
  const timeNow = new Date();
  const datePub = new Date(isoDate).toLocaleDateString();
  const timePub = new Date(isoDate).toLocaleTimeString();

  const timeSince = calcTimeSince(isoDate, timeNow);
  const { data, isLoading, isSuccess, isError, error } = useGetArticleQuery({
    url: sourceUrl,
  });
  if (isSuccess) console.log("raw", data);
  return (
    <>
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          "& > *": {
            paddingTop: "10px",
          },
        }}>
        <Typography variant="h4" component="h1" textAlign="center">
          {title}
        </Typography>
        <Link component={RouterLink} target="_blank" to={sourceUrl}>
          <Typography variant="h6">Source</Typography>
        </Link>
        <Typography variant="h5" component={"h3"}>
          {timeSince.timeSince} {timeSince.unit} ago
        </Typography>
        <Typography variant="h5" component={"h3"}>
          {datePub} | {timePub}
        </Typography>
      </Box>
      {isLoading ? (
        <CircularProgress />
      ) : isSuccess ? (
        data.article.map((paragraph, i) => (
          <Typography key={i} variant="body2" sx={{ margin: 2 }}>
            {paragraph}
          </Typography>
        ))
      ) : isError ? (
        <Typography variant="h6" component="p">
          Error: {error.status} {error.message}
        </Typography>
      ) : null}
    </>
  );
};

export default ArticleViewPage;
