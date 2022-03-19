import TableItemText from "@components/TableItemText";
import TableItemButton from "@components/TableItemButton";
import useHistory from "@libs/client/useHistory";
import { HistoryMedia } from "@prisma/client";
import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import HistoryContent from "@components/HistoryContent";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
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
import useHistoryContent from "@libs/client/useHistoryContent";



const ContentSearch: NextPage = () => {
  const { historyContent, isLoading } = useHistoryContent();
  const columns = [
    { id: "seq", label: "Seq", minWidth: 30 },
    { id: "id", label: "ID", minWidth: 30 },
    { id: "period", label: "Period", minWidth: 50 },
    {
      id: "content",
      label: "Content",
      align: "left",
    },
  ];

  function createData(
    seq: string,
    id: string,
    period: string,
    content: string
  ) {
    return { seq, id, period, content };
  }

  const rows = [
    createData(
      "1",
      "1",
      "1920",
      "베베베베베베베베베베베베베베베베베베베베베베베베베베베베베베베"
    ),
    createData("2", "2", "1930", "sdsdfsdf"),
    createData("3", "3", "1940", "cvbvcbcvb"),
    createData("4", "4", "1950", "ttwerwerwer"),
    createData("5", "5", "1960", "fghdfkbjds"),
    createData("6", "6", "1970", "ewrerwrwerwer"),
    createData("7", "7", "1980", "fgdgdfgdfg"),
    createData("8", "8", "1990", "werwerrwew"),
    createData("9", "9", "2000", "dfgfdgdfgfdgdfg"),
    createData("10", "10", "2010", "vcbvcbvvcbcvb"),
    createData("11", "11", "2020", "dgdfgdfgfdgdfgdfg"),
    createData("12", "12", "2022", "werwerwerwerwerwer"),
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

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const click = (e: React.FormEvent<HTMLInputElement>) => {};

  return (
    <div>
      <div>{historyContent?.length}</div>
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
              {historyContent
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      onClick={(e) => handleClickOpen()}
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={"row" + i + 1}
                    >
                      {columns.map((column, j) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={j + 1} align={column.align}>
                            {column.id == 'seq'?((i+page*rowsPerPage)+1): value}
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
      <Dialog open={open}>
        <DialogTitle>수정</DialogTitle>
        <DialogContent>
          <DialogContentText>
            히스토리 콘텐츠의 변경 내용을 입력해주세요
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="content"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >취소</Button>
          <Button  onClick={handleClickOpen} >수정</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ContentSearch;
