import TableItemText from "@components/TableItemText";
import TableItemButton from "@components/TableItemButton";
import useHistory from "@libs/client/useHistory";
import { HistoryMedia } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
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
  TableRow,
  TextField,
} from "@mui/material";
import TableHeader from "@components/TableHeader";

const ContentSearch: NextPage = () => {
  function createData(id: string, name: string, filename: string) {
    return { id, name, filename };
  }

  const rows = [
    createData("1", "gofogo", "1.jpg"),
    createData("2", "dudfufl", "fd.jpg"),
    createData("3", "yeonwoo", "3fg.jpg"),
    createData("4", "cheon", "ggg.jpg"),
    createData("5", "sujin", "rere.jpg"),
  ];

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center">Seq</TableCell>
              <TableCell align="center">아이디</TableCell>
              <TableCell align="center">이름</TableCell>
              <TableCell align="center">파일명</TableCell>
              <TableCell align="center">관리</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={row.name}>
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.filename}</TableCell>
                <TableCell align="center" className=" bg-red-300">
                  <div>
                    <button className="rounded-md bg-slate-200 px-2 py-1">
                      상세
                    </button>
                    <button className="ml-2 rounded-md bg-slate-200 px-2 py-1">
                      삭제
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={false}>
        <DialogTitle className="p-20">
          업로드 중입니다dkfhjsdkfhdksjfhsdjkfhskfjh...
        </DialogTitle>
        <DialogContent className="flex flex-col">
          <LinearProgress className="h-10" variant="determinate" value={50} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default ContentSearch;
