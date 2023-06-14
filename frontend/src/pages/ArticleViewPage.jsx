import React, { useState } from "react";
import {
  useGetArticleQuery,
  useGetSummaryMutation,
} from "../features/articles/articlesApiSlice";
import { CircularProgress, Typography, Box, Link, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import calcTimeSince from "../utils/calcTimeSince";
import { Link as RouterLink } from "react-router-dom";
import Summary from "../features/articles/Summary";
import { toast } from "react-toastify";
const ArticleViewPage = () => {
  const { isoDate, link: sourceUrl, title } = useLocation().state;
  const [getSummary, { isLoading: sumIsLoading }] = useGetSummaryMutation();
  const [summaryText, setSummaryText] = useState("");
  const timeNow = new Date();
  const datePub = new Date(isoDate).toLocaleDateString();
  const timePub = new Date(isoDate).toLocaleTimeString();
  const timeSince = calcTimeSince(isoDate, timeNow);
  const { data, isLoading, isSuccess, isError, error } = useGetArticleQuery({
    url: sourceUrl,
  });

  const handleSummarize = async () => {
    try {
      const summaryInputData = { url: sourceUrl, pString: data?.pString };
      const response = await getSummary(summaryInputData).unwrap();
      setSummaryText(response);
      console.log("res", response);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
  };
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
        <div style={{ textAlign: "center" }}>
          <CircularProgress sx={{ marginTop: 10 }} />
        </div>
      ) : isSuccess ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
            {!summaryText && !sumIsLoading && (
              <Button
                sx={{ marginTop: 2, marginBottom: 2 }}
                onClick={handleSummarize}>
                Summarize
              </Button>
            )}
            {sumIsLoading && (
              <div style={{ textAlign: "center" }}>
                <CircularProgress sx={{ marginTop: 2 }} />
              </div>
            )}
            {summaryText && <Summary text={summaryText} />}
          </Box>
          {data.article.map((paragraph, i) => (
            <Typography key={i} variant="body2" sx={{ margin: 2 }}>
              {paragraph}
            </Typography>
          ))}
        </>
      ) : isError ? (
        <Typography variant="h6" component="p">
          Error: {error.status} {error.message}
        </Typography>
      ) : null}
    </>
  );
};

export default ArticleViewPage;
