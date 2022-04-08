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
import useMutation from "@libs/client/userMutation";

const ContentSearch: NextPage = () => {
  const { historyContent, isLoading } = useHistoryContent();
  const [cccc, { loading: aaaa, data: bbbb }] = useMutation(
    "/api/history-content"
  );
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [current, setCurrent] = useState({
    id: 0,
    content: "",
    period: "",
    mediaID: 0,
  });

  const textChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrent({ ...current, content: e.target.value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (e: React.FormEvent<HTMLInputElement>) => {
    // const id = e.target.parentNode.id - 1;
    const id = e.target.parentNode.childNodes[0].textContent - 1;
    console.log(`id:${id}`);
    setCurrent({
      id: id + 1,
      content: historyContent[id]?.content,
      mediaID: historyContent[id]?.mediaID,
      period: historyContent[id]?.period,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const click = (e: React.FormEvent<HTMLInputElement>) => {
    //api usert
    console.log(current);
    setCurrent({ ...current, id: 0 });
    cccc({ bbbb: { ...current } });
    setOpen(false);
  };

  const addClick = (e: React.FormEvent<HTMLInputElement>) => {
    cccc({ bbbb: { ...current } });
  };

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
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      onClick={(e) => handleClickOpen(e)}
                      hover
                      id={i + 1}
                      role="checkbox"
                      tabIndex={-1}
                      key={"row" + i + 1}
                    >
                      {columns.map((column, j) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={j + 1} align={column.align}>
                            {column.id == "seq"
                              ? i + page * rowsPerPage + 1
                              : value}
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
          count={historyContent == undefined ? 0 : historyContent?.length}
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
            onChange={textChange}
            value={current.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={click}>수정</Button>
        </DialogActions>
      </Dialog>
      <div className="mt-5 flex">
        <span className="ml-5 flex items-center justify-center">MediaID</span>
        <TextField
          id="standard-basic"
          label="Standard"
          onChange={(e) => {
            setCurrent({ ...current, mediaID: Number(e.target.value) });
          }}
          variant="standard"
        />
        <span className="ml-5 flex items-center justify-center">Period</span>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          onChange={(e) => {
            setCurrent({ ...current, period: e.target.value });
          }}
        />
        <span className="ml-5 flex items-center justify-center">Content</span>
        <TextField
          onChange={(e) => {
            setCurrent({ ...current, content: e.target.value });
          }}
          className="w-1/4"
          id="standard-basic"
          label="Standard"
          variant="standard"
        />
        <Button
          className="ml-5 bg-red-500"
          variant="contained"
          onClick={addClick}
        >
          ADD
        </Button>
      </div>
    </div>
  );
};
export default ContentSearch;
