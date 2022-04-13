import useHistoryFiles from "@libs/client/useHistoryFiles";
import useMutation from "@libs/client/userMutation";
import {
  Button,
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
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import client from "@libs/server/client";
import useHistoryContent from "@libs/client/useHistoryContent";
import useHistory from "@libs/client/useHistory";
import { WindPower } from "@mui/icons-material";

const ContentsAdd: NextPage = () => {
  const [deviceID, setDeviceID] = useState(5);

  const { historyContent, isLoading: historyContentIsLoading } =
    useHistoryContent(deviceID);

  const [applyHistoryFile, { loading, data }] =
    useMutation("/api/history-files");

  const [titleApply, { loading: titleLoading, data: titleData }] =
    useMutation("/api/historys");

  const [
    applyhistoryContent,
    { loading: loadingHistoryContent, data: dataHistoryContent },
  ] = useMutation("/api/history-content");

  const { histoyMedia, isLoading: historyaLoading } = useHistory(deviceID);

  const { historyFiles, isLoading } = useHistoryFiles(deviceID);

  const [fileInfo, setFileInfo] = useState({
    captionEng: "",
    captionKor: "",
    fileName: "",
  });

  const [titleInfo, setTitleInfo] = useState({
    titleKorTop: "",
    titleKorBottom: "",
    titleEngTop: "",
    titleEngBottom: "",
  });
  const [file, setFile] = useState([]);
  const [pValue, setpValue] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [current, setCurrent] = useState({
    id: 0,
    contentKorTop: "",
    contentEngTop: "",
    contentKorBottom: "",
    contentEngBottom: "",
    period: "",
    mediaID: 0,
  });

  const [open, setOpen] = React.useState(false);

  const uploadFiles = async () => {
    const formData = new FormData();
    if (file.length != 0) {
      const item = file.pop();
      formData.append("file", item.file);
      formData.append("seq", item.seq);

      try {
        const res = await axios.post("/api/upload/" + deviceID, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent: any) => {
            let pert = (progressEvent.loaded * 100) / progressEvent.total;
            console.log(pert);
            setpValue(pert);
          },
        });

        const { ok, result } = res.data;

        if (file.length <= 0) {
          //db 업로드
          console.log("result: " + result);
          applyHistoryFile({
            data: {
              captionKor: fileInfo.captionKor,
              captionEng: fileInfo.captionEng,
              fileName: result,
              mediaID: deviceID,
            },
          });
          setIsUpload(false);
          window.location.reload();
        } else {
          uploadFiles();
        }
      } catch (err) {
        console.log("레알 에러");
        console.log(err);
      }
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    console.log(e);
    const seq = parseInt(e.target.id);

    if (e.target.value == "" || e.target.value == undefined) {
      return;
    }

    setFileInfo({ ...fileInfo, fileName: e.target.files[0].name });
    if (file.length <= 0) {
      console.log("최초등록");
      setFile([...file, { seq: seq, file: e.target.files[0] }]);
    } else {
      const isModify = false;
      const temp = [];
      file.forEach((item, i) => {
        if (seq == item.seq) {
          isModify = true;
          console.log("수정");
          e.target.files[0].gofogo = "1";
          temp.push({ seq: seq, file: e.target.files[0] });
        } else {
          temp.push(item);
        }
      });

      if (!isModify) {
        console.log("등록");
        setFile([...file, { seq: seq, file: e.target.files[0] }]);
        //등록
      } else {
        setFile([...temp]);
      }
    }
    file.forEach((item, i) => {
      console.log("wow2:" + item.seq + " " + item.file.name);
    });
  };

  const columns = [
    { id: "seq", label: "Seq", minWidth: 30 },
    { id: "id", label: "ID", minWidth: 30 },
    { id: "period", label: "Period", minWidth: 50 },
    {
      id: "contentKor",
      label: "ContentKor",
      align: "left",
    },
    {
      id: "contentEng",
      label: "ContentEng",
      align: "left",
    },
    {
      id: "management",
      label: "관리",
      align: "center",
    },
  ];

  const textChangeKorTop = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrent({ ...current, contentKorTop: e.target.value });
  };
  const textChangeKorBottom = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrent({ ...current, contentKorBottom: e.target.value });
  };
  const textChangeEngTop = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrent({ ...current, contentEngTop: e.target.value });
  };
  const textChangeEngBottom = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrent({ ...current, contentEngBottom: e.target.value });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClickOpen = (e) => {
    if (e.target.name == "deleteButton") {
      return;
    }
    const id = e.target.parentNode.childNodes[0].textContent - 1;
    const mi = e.target.parentElement.childNodes[1].textContent;
    if (id === -1) {
      return;
    }

    const itemKor = historyContent[id]?.contentKor.split(`\r\n`);
    const itemEng = historyContent[id]?.contentEng.split(`\r\n`);

    setCurrent({
      id: +mi,
      contentKorTop: itemKor[0] != undefined ? itemKor[0] : "",
      contentKorBottom: itemKor[1] != undefined ? itemKor[1] : "",
      contentEngTop: itemEng[0] != undefined ? itemEng[0] : "",
      contentEngBottom: itemEng[1] != undefined ? itemEng[1] : "",
      mediaID: historyContent[id]?.mediaID,
      period: historyContent[id]?.period,
    });
    setOpen(true);
  };

  const handleClose = () => {
    setCurrent({
      id: 0,
      contentKorTop: "",
      contentKorBottom: "",
      contentEngTop: "",
      contentEngBottom: "",
      period: "",
      mediaID: deviceID,
    });
    setOpen(false);
  };

  const click_down_content = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id.split(`_`)[1];
    console.log(id);
    if (historyContent?.length === +id) {
      //마지막
      console.log("변화없음");
    } else {
      //순서변경
      //id 와 id-1의 값을 변경
      console.log("나머지");
      const firstItem = historyContent?.[+id - 1];
      const secondsItem = historyContent?.[+id];
      const item = {
        first: {
          id: firstItem.id,
          seq: firstItem.seq,
        },
        seconds: { id: secondsItem.id, seq: secondsItem.seq },
      };
      const res = await axios.post("/api/history-content/order", item);
      // window.location.reload();
    }
  };
  const click_up_content = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id.split(`_`)[1];
    console.log(id);
    if (+id <= 1) {
      console.log("변화없음");
    } else {
      //순서변경
      //id 와 id+1의 값을 변경
      console.log("나머지");
      const firstItem = historyContent?.[+id - 1];
      const secondsItem = historyContent?.[+id - 2];
      const item = {
        first: {
          id: firstItem.id,
          seq: firstItem.seq,
        },
        seconds: { id: secondsItem.id, seq: secondsItem.seq },
      };

      const res = await axios.post("/api/history-content/order", item);
      // window.location.reload();
    }
  };

  const clickContentDelete = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    const res = await axios.delete("/api/history-content/" + id);
    window.location.reload();
  };

  const modifyContentClick = (e: React.FormEvent<HTMLInputElement>) => {
    applyhistoryContent({ dataHistoryContent: { ...current } });
    setOpen(false);
    if (loadingHistoryContent == false) {
      window.location.reload();
    }
  };

  const addContentClick = (e: React.FormEvent<HTMLInputElement>) => {
    if (current.contentKorTop == "") {
      console.log("no contentKorTop");
      alert("콘텐츠 한글 정보를 입력해주세요.");
      return;
    } else if (current.contentEngTop == "") {
      console.log("no contentEngTop");
      alert("콘텐츠 영어 정보를 입력해주세요.");
      return;
    } else if (current.period == "") {
      console.log("no current.period");
      alert("연도 정보를 입력해주세요.");
      return;
    }

    setCurrent({ ...current, id: 0, mediaID: deviceID });
    applyhistoryContent({
      dataHistoryContent: { ...current, id: 0, mediaID: deviceID },
    });
    if (loadingHistoryContent == false) {
      window.location.reload();
    }
  };

  useEffect(() => {
    //최초 로드 시 타이틀 정보를 가공하여 불러온다.
    if (!historyaLoading) {
      const itemKor = histoyMedia?.historyNameKor.split(`\r\n`);
      const itemEng = histoyMedia?.historyNameEng.split(`\r\n`);

      setTitleInfo({
        titleKorTop: itemKor != undefined ? itemKor[0] : "",
        titleKorBottom: itemKor != undefined ? itemKor[1] : "",
        titleEngTop: itemEng != undefined ? itemEng[0] : "",
        titleEngBottom: itemEng != undefined ? itemEng[1] : "",
      });
    }
  }, [historyaLoading]);

  const changedTitleKorTop = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleInfo({ ...titleInfo, titleKorTop: e.target.value });
  };
  const changedTitleKorBottom = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleInfo({ ...titleInfo, titleKorBottom: e.target.value });
  };
  const changedTitleEngTop = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleInfo({ ...titleInfo, titleEngTop: e.target.value });
  };
  const changedTitleEngBottom = (e: React.FormEvent<HTMLInputElement>) => {
    setTitleInfo({ ...titleInfo, titleEngBottom: e.target.value });
  };

  const clickTitle = (e: React.FormEvent<HTMLInputElement>) => {
    titleApply({
      titleData: {
        historyNameEng: `${titleInfo.titleEngTop}\r\n${titleInfo.titleEngBottom}`,
        historyNameKor: `${titleInfo.titleKorTop}\r\n${titleInfo.titleKorBottom}`,
        id: deviceID,
      },
    });
    if (titleLoading === false) {
      window.location.reload();
    }
  };

  const click_up = async (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.target.id;
    console.log(id);
    if (+id <= 1) {
      console.log("변화없음");
    } else {
      //순서변경
      //id 와 id+1의 값을 변경
      console.log("나머지");
      const firstItem = historyFiles?.[+id - 1];
      const secondsItem = historyFiles?.[+id - 2];
      const item = {
        first: {
          contentsType: firstItem.contentsType,
          id: firstItem.id,
        },
        seconds: { contentsType: secondsItem.contentsType, id: secondsItem.id },
      };

      const res = await axios.post("/api/history-files/order", item);
      window.location.reload();
    }

    // const item = historyFiles?.find((item) => item.contentsType == order);
  };
  const click_down = async (e: React.FormEvent<HTMLInputElement>) => {
    const id = e.target.id;
    console.log("id:" + id);
    if (historyFiles?.length === +id) {
      //마지막
      console.log("변화없음");
    } else {
      //순서변경
      //id 와 id-1의 값을 변경
      console.log("나머지");
      //순서변경
      //id 와 id+1의 값을 변경
      console.log("나머지");
      const firstItem = historyFiles?.[+id - 1];
      const secondsItem = historyFiles?.[+id];
      const item = {
        first: {
          contentsType: firstItem.contentsType,
          id: firstItem.id,
        },
        seconds: { contentsType: secondsItem.contentsType, id: secondsItem.id },
      };
      const res = await axios.post("/api/history-files/order", item);
      window.location.reload();
    }
  };

  const click_delete = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    const res = await axios.delete("/api/history-files/" + id);
    window.location.reload();
  };

  const click_File = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(fileInfo);
    console.log("일반버튼");
    if (file.length == 0) {
      alert("등록 할 파일이 없습니다.");
      return;
    } else {
      setIsUpload(true);
      setpValue(0);
      uploadFiles();
    }
  };

  return (
    <div>
      <div className="mt-3 flex flex-col border-2 ">
        <div className="flex w-full">
          <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
            Media
          </span>
          <div className="flex w-5/6 items-center  border-b  pl-2 text-xs font-medium">
            History Wall 1970s
          </div>
        </div>
        <div className="flex h-32 w-full">
          <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
            Title
          </span>
          <div className="  flex w-5/6 items-center  border-b pl-2 text-xs font-medium">
            <div className="w-2/5 ">
              <div className="flex  items-center">
                <span className="ml-5">타이틀 상단 - 한국어</span>
                <TextField
                  onChange={changedTitleKorTop}
                  value={titleInfo.titleKorTop}
                  className="border-1 ml-2 mr-2 h-8 w-3/5 rounded-md "
                  variant="standard"
                ></TextField>
              </div>
              <div className="mt-3 flex items-center">
                <span className="ml-5 ">타이틀 하단 - 한국어</span>
                <TextField
                  variant="standard"
                  onChange={changedTitleKorBottom}
                  value={titleInfo.titleKorBottom}
                  className="border-1 ml-2 mr-2 h-8 w-3/5 rounded-md"
                ></TextField>
              </div>
            </div>
            <div className="w-2/5 ">
              <div>
                <div className="flex items-center">
                  <span className="ml-5">타이틀 상단 - 영어</span>
                  <TextField
                    onChange={changedTitleEngTop}
                    value={titleInfo.titleEngTop}
                    variant="standard"
                    className="border-1 w-1/16 ml-2 mr-2 h-8 w-3/5 rounded-md border-slate-400"
                  ></TextField>
                </div>
                <div className="mt-3 flex items-center">
                  <span className="ml-5">타이틀 하단 - 영어</span>
                  <TextField
                    onChange={changedTitleEngBottom}
                    value={titleInfo.titleEngBottom}
                    variant="standard"
                    className="border-1 w-1/16 ml-2 mr-2 h-8 w-3/5 rounded-md border-slate-400"
                  ></TextField>
                </div>
              </div>
            </div>
            <Button
              className="ml-5 h-1/2 w-1/6 bg-slate-400"
              variant="contained"
              onClick={clickTitle}
            >
              수정
            </Button>
          </div>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
            Image
          </span>
          <div className="flex w-5/6 flex-col border-b p-5 pl-2 text-xs font-medium">
            <div>
              <TableContainer component={Paper}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Seq</TableCell>
                      <TableCell align="center">ID</TableCell>
                      <TableCell align="center">Caption Kor</TableCell>
                      <TableCell align="center">Caption Eng</TableCell>
                      <TableCell align="center">Filename</TableCell>
                      <TableCell align="center">관리</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {historyFiles?.map((row, i) => (
                      <TableRow key={i + 1}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{row.id}</TableCell>
                        <TableCell align="center">{row.captionKor}</TableCell>
                        <TableCell align="center">{row.captionEng}</TableCell>
                        <TableCell align="center">{row.fileName}</TableCell>
                        <TableCell align="center">
                          <div className="flex w-36">
                            <Button
                              id={`${row.contentsType}`}
                              onClick={click_up}
                              variant="contained"
                              className="ml-2 bg-blue-600"
                            >
                              ▲
                            </Button>
                            <Button
                              id={`${row.contentsType}`}
                              onClick={click_down}
                              variant="contained"
                              className="ml-2 bg-blue-600"
                            >
                              ▼
                            </Button>
                            <Button
                              id={row.id}
                              onClick={click_delete}
                              className="ml-2 rounded-md bg-red-500"
                              variant="contained"
                            >
                              삭제
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="mt-5 flex flex-col space-y-2">
              <span>※ 1920x1080 - JPG, PNG</span>
              <div className="flex items-center justify-center px-5">
                <input
                  className="h-6 w-1/6"
                  type="file"
                  id="0"
                  onChange={onChange}
                />
                <p className="ml-5 ">캡션 한글</p>

                <TextField
                  variant="standard"
                  onChange={(e) => {
                    setFileInfo({ ...fileInfo, captionKor: e.target.value });
                  }}
                  value={fileInfo.captionKor}
                  className="ml-2 h-full w-1/4 justify-center"
                ></TextField>
                <p className="ml-5">캡션 영어</p>
                <TextField
                  variant="standard"
                  className="ml-2 h-full w-1/4 justify-center "
                  value={fileInfo.captionEng}
                  onChange={(e) => {
                    setFileInfo({ ...fileInfo, captionEng: e.target.value });
                  }}
                ></TextField>
                <Button
                  className="ml-12 h-16 w-1/6 bg-slate-400"
                  variant="contained"
                  onClick={click_File}
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full">
          <span className="flex w-1/6 items-center  border-r bg-neutral-100 p-3 text-xs font-medium">
            {`히스토리 `}
          </span>
          <div className="flex w-5/6 flex-row items-center justify-between   border-b  px-10 pl-7 text-xs font-medium">
            <div className="w-full">
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
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
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
                                    {column.id === "seq"
                                      ? i + page * rowsPerPage + 1
                                      : value}
                                    {column.id === "management" ? (
                                      <div className="w-30 flex">
                                        <Button
                                          id={`up_${row.seq}`}
                                          name="deleteButton"
                                          onClick={click_up_content}
                                          variant="contained"
                                          className="ml-2 bg-blue-600"
                                        >
                                          ▲
                                        </Button>
                                        <Button
                                          id={`down_${row.seq}`}
                                          name="deleteButton"
                                          onClick={click_down_content}
                                          variant="contained"
                                          className="ml-2 bg-blue-600"
                                        >
                                          ▼
                                        </Button>
                                        <Button
                                          id={row.id}
                                          name="deleteButton"
                                          className="ml-2 rounded-md bg-red-500"
                                          variant="contained"
                                          onClick={clickContentDelete}
                                        >
                                          삭제
                                        </Button>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                    {}
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
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  component="div"
                  count={
                    historyContent == undefined ? 0 : historyContent?.length
                  }
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
                    label="한글 상단"
                    fullWidth
                    variant="standard"
                    onChange={textChangeKorTop}
                    value={current.contentKorTop}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="한글 하단"
                    fullWidth
                    variant="standard"
                    onChange={textChangeKorBottom}
                    value={current.contentKorBottom}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="영어 상단"
                    fullWidth
                    variant="standard"
                    onChange={textChangeEngTop}
                    value={current.contentEngTop}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="영어 하단"
                    fullWidth
                    variant="standard"
                    onChange={textChangeEngBottom}
                    value={current.contentEngBottom}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose}>취소</Button>
                  <Button onClick={modifyContentClick}>수정</Button>
                </DialogActions>
              </Dialog>
              <div className="mt-5 flex">
                <span className="ml-5 flex items-center justify-center">
                  콘텐츠 상단 - 한국어
                </span>
                <TextField
                  onChange={(e) => {
                    setCurrent({ ...current, contentKorTop: e.target.value });
                  }}
                  className="w-1/4"
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                />
                <span className="ml-5 flex items-center justify-center">
                  콘텐츠 상단 - 영어
                </span>
                <TextField
                  onChange={(e) => {
                    setCurrent({ ...current, contentEngTop: e.target.value });
                  }}
                  className="w-1/4"
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                />
                <span className="ml-5 flex items-center justify-center">
                  기간
                </span>
                <TextField
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                  onChange={(e) => {
                    setCurrent({ ...current, period: e.target.value });
                  }}
                />
              </div>
              <div className="mt-5 flex">
                <span className="ml-5 flex items-center justify-center">
                  콘텐츠 하단 - 한국어
                </span>
                <TextField
                  onChange={(e) => {
                    setCurrent({
                      ...current,
                      contentKorBottom: e.target.value,
                    });
                  }}
                  className="w-1/4"
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                />
                <span className="ml-5 flex items-center justify-center">
                  콘텐츠 하단 - 영어
                </span>
                <TextField
                  onChange={(e) => {
                    setCurrent({
                      ...current,
                      contentEngBottom: e.target.value,
                    });
                  }}
                  className="w-1/4"
                  id="standard-basic"
                  label="Standard"
                  variant="standard"
                />
                <Button
                  className="ml-5 h-14 w-1/6 bg-slate-400"
                  variant="contained"
                  onClick={addContentClick}
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isUpload || loading}>
        <DialogTitle className="px-28 pb-10">업로드 중입니다</DialogTitle>
        <DialogContent className="flex flex-col">
          <LinearProgress
            className="h-10"
            variant="determinate"
            value={pValue}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentsAdd;
