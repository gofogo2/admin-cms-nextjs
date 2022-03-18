import TableItemText from "@components/TableItemText";
import TableItemButton from "@components/TableItemButton";
import useHistory from "@libs/client/useHistory";
import { HistoryMedia } from "@prisma/client";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import HistoryContent from "@components/HistoryContent";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import TableHeader from "@components/TableHeader";

const ContentSearch: NextPage = () => {
  const columns = [
    { id: "seq", label: "Seq", minWidth: 170 },
    { id: "period", label: "period", minWidth: 100 },
    {
      id: "content",
      label: "Content",
      minWidth: 170,
      align: "right",
    },
  ];

  function createData(seq: string, period: string, content: string) {
    return { seq, period, content };
  }

  const rows = [
    createData("1", "1920", "블라블라블라블라블라"),
    createData("2", "1930", "sdsdfsdf"),
    createData("3", "1940", "cvbvcbcvb"),
    createData("4", "1950", "ttwerwerwer"),
    createData("5", "1960", "fghdfkbjds"),
    createData("6", "1970", "ewrerwrwerwer"),
    createData("7", "1980", "fgdgdfgdfg"),
    createData("8", "1990", "werwerrwew"),
    createData("9", "2000", "dfgfdgdfgfdgdfg"),
    createData("10", "2010", "vcbvcbvvcbcvb"),
    createData("11", "2020", "dgdfgdfgfdgdfgdfg"),
    createData("12", "2022", "werwerwerwerwerwer"),
  ];

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, i) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={i + 1}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={i + 1} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default ContentSearch;
