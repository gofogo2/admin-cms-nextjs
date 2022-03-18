import useHistoryFiles from "@libs/client/useHistoryFiles";
import useMutation from "@libs/client/userMutation";
import {
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
} from "@mui/material";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import client from "@libs/server/client";

interface ModifyForm {
  id: number;
  historyName: string;
  historyCaption?: string;
}

const ContentsAdd: NextPage = () => {
  const [apply, { loading, data }] = useMutation("/api/history-files");
  // const [apply, { loading, data }] = useMutation("/api/history-fil");
  const { historyFiles, isLoading } = useHistoryFiles();
  const [updatedFile, setupdatedFile] = useState("");
  const [fileInfo, setFileInfo] = useState({ Desc: "", fileName: "" });
  const [file, setFile] = useState([]);
  const [pValue, setpValue] = useState(0);
  const [isUpload, setIsUpload] = useState(false);

  const uploadFiles = async () => {
    const formData = new FormData();
    if (file.length != 0) {
      const item = file.pop();
      console.log("gofogo2222:" + item.file);
      formData.append("file", item.file);
      formData.append("seq", item.seq);
      try {
        const res = await axios.post("/api/upload", formData, {
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
          apply({ data: { Desc: fileInfo.Desc, fileName: fileInfo.fileName } });
          setIsUpload(false);
          window.location.reload();
        } else {
          uploadFiles();
        }
      } catch (err) {
        console.log('레알 에러');
        console.log(err);
      }
    }
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const seq = parseInt(e.target.id);
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

  const onValid = (data: ModifyForm) => {
    // console.log(data);
    // alert("");
    // if (loading) return;
    // apply(data);
  };

  const click2 = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("상세 상세");
  };

  const click3 = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    const res = await axios.delete("/api/history-files/"+id);
    // //삭제 수행
    // console.log("삭제 삭제");
  };

  const click = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(fileInfo);
    console.log("일반버튼");
    if (file.length == 0) {
      console.log("등록할 파일이 없습니다");
      return;
    } else {
      setIsUpload(true);
      setpValue(0);
      uploadFiles();
    }
  };

  const { register, handleSubmit, reset, watch } = useForm<ModifyForm>();

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)}>
        <div className="mt-3 flex flex-col border-2 ">
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              미디어
            </span>
            <div className="flex w-5/6 items-center  border-b  pl-2 text-xs font-medium">
              History Wall 01
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              제목
            </span>
            <div className="flex  w-5/6 items-center  border-b pl-2 text-xs font-medium">
              <input
                {...register("historyName", { required: true })}
                type="text"
                className=" border-1 mr-2 h-8 w-full rounded-md border-slate-400"
              ></input>
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              캡션
            </span>
            <div className="flex  w-5/6 items-center  border-b  pl-2 text-xs font-medium">
              <input
                type="text"
                {...register("historyCaption", { required: false })}
                className=" border-1 mr-2 h-8 w-full rounded-md border-slate-400"
              ></input>
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center border-r border-b bg-neutral-100 p-3 text-xs font-medium">
              이미지
            </span>
            <div className="flex w-5/6 flex-col border-b p-5 pl-2 text-xs font-medium">
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
                      {historyFiles?.map((row, i) => (
                        <TableRow key={i + 1}>
                          <TableCell align="center">{i + 1}</TableCell>
                          <TableCell align="center">{row.mediaID}</TableCell>
                          <TableCell align="center">{row.Desc}</TableCell>
                          <TableCell align="center">{row.fileName}</TableCell>
                          <TableCell align="center" className=" bg-red-300">
                            <div>
                              <button
                                onClick={click2}
                                className="rounded-md bg-slate-200 px-2 py-1"
                              >
                                상세
                              </button>
                              <button id={row.id}
                                onClick={click3}
                                className="ml-2 rounded-md bg-slate-200 px-2 py-1"
                              >
                                삭제
                              </button>
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
                <div className="flex items-center justify-around px-5">
                  <input
                    className="h-6 w-1/3"
                    type="file"
                    id="0"
                    onChange={onChange}
                  />
                  <p>Name</p>
                  <input
                    className="h-6 w-1/5"
                    value={fileInfo.Desc}
                    onChange={(e) => {
                      setFileInfo({ ...fileInfo, Desc: e.target.value });
                    }}
                    type="text"
                  />
                  <button
                    onClick={click}
                    className="h-8 w-1/4 rounded-md bg-slate-300"
                  >
                    <span className="text-[0.7rem] font-bold text-gray-700">
                      업로드
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full">
            <span className="flex w-1/6 items-center  border-r bg-neutral-100 p-3 text-xs font-medium">
              히스토리 목록
            </span>
            <div className="flex w-5/6  flex-row items-center   justify-between border-b px-10 pl-7 text-xs font-medium"></div>
          </div>
        </div>
        <div>
          <input type="submit" value="가나다"></input>
        </div>
      </form>
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


// const test = await client.historyFile.findMany();