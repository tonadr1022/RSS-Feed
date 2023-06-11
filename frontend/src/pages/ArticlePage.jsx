import React from "react";
import { useGetArticleQuery } from "../features/articles/articlesApiSlice";
import { CircularProgress, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
const URL =
  "https://www.cnn.com/2023/06/10/us/faith-violence-security-blake-cec/index.html";
const ArticlePage = () => {
  const { url } = useParams();
  const decoded = decodeURIComponent(url);
  const { data, isLoading, isSuccess, isError, error } = useGetArticleQuery({
    url: decoded,
  });
  if (isSuccess) console.log("raw", data.raw);
  return (
    <>
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

export default ArticlePage;
