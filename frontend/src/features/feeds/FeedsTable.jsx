/* eslint-disable react/prop-types */
import React from "react";
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
  IconButton,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const FeedsTable = ({ tableData, handleAdd }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "900px", marginLeft: "auto", marginRight: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <>
              <TableCell align="center">Site</TableCell>
              <TableCell align="center">Topic</TableCell>
              <TableCell align="center"></TableCell>
            </>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.slice(0, 50).map((row, i) => (
            <TableRow key={i}>
              <TableCell align="center">{row.cleanUrl}</TableCell>
              <TableCell align="center">{row.topic}</TableCell>
              <TableCell sx={{ padding: 0 }} align="center">
                <IconButton onClick={() => handleAdd(row)}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default FeedsTable;
