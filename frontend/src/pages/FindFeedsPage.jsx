import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import data from "../data/rssData.js";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAddFeedMutation } from "../features/feeds/feedsApiSlice.js";
import { toast } from "react-toastify";
import FeedsTable from "../features/feeds/FeedsTable.jsx";

const topics = [
  "tech",
  "news",
  "business",
  "science",
  "finance",
  "world",
  "politics",
  "sport",
  "travel",
  "food",
  "music",
  "entertainment",
];

const FindFeedsPage = () => {
  const [siteName, setSiteName] = useState("");
  const [topic, setTopic] = useState("");
  const [tableData, setTableData] = useState(data);
  const [
    addFeed,
    { isLoading: addIsLoading, isSuccess: addIsSuccess, isError: addIsError },
  ] = useAddFeedMutation();

  const tableColumns = useMemo(
    () => [
      { accessorKey: "cleanUrl", header: "Site" },
      { accessorKey: "topic", header: "Topic" },
    ],
    []
  );
  useEffect(() => {
    setTableData(
      data.filter(
        (row) =>
          row.cleanUrl.includes(siteName.toLowerCase()) &&
          row.topic.includes(topic.toLowerCase())
      )
    );
  }, [siteName, topic]);

  const handleAdd = async (feed) => {
    try {
      const response = await addFeed({ url: feed.rssUrl }).unwrap();
      console.log(response);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message);
    }
    console.log(feed);
  };

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Typography variant="h2" component="h1">
        Find Feeds
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <TextField
            variant="filled"
            label="Site Name"
            onChange={(e) => setSiteName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sx={{ textAlign: "center" }}>
          <FormControl id="topic-label">
            <InputLabel>Topic</InputLabel>
            <Select
              sx={{ width: "100px" }}
              value={topic}
              labelId="topic-label"
              label="Topic"
              onChange={(e) => setTopic(e.target.value)}>
              <MenuItem value="" sx={{ height: 32 }}></MenuItem>
              {topics.map((topic, i) => (
                <MenuItem key={i} value={topic}>
                  {topic}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        {addIsLoading ? (
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <CircularProgress />
          </Grid>
        ) : null}
        <Grid item xs={12} sx={{ justifySelf: "center" }}>
          <FeedsTable tableData={tableData} handleAdd={handleAdd} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FindFeedsPage;
