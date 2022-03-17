import type { NextPage } from "next";
import React, { useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";
const Monitoring1: NextPage = () => {
  const [pValue, setpValue] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const [file, setFile] = useState([]);
  const [uploadedFile, setUploadedFile] = useState({});
  const [current, setCurrent] = useState(0);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const seq = parseInt(e.target.id);

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

  const uploadFiles = async () => {
    const formData = new FormData();
    if (file.length != 0) {
      const item = file.pop();
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
          alert("파일 업로드가 완료되었습니다.");
          setUploadedFile({ ok, result });
          setIsUpload(false);
        } else {
          uploadFiles();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file.length == 0) {
      console.log("등록할 파일이 없습니다");
      return;
    } else {
      setIsUpload(true);
      setpValue(0);
      uploadFiles();
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input id="0" type="file" onChange={onChange} />
        </div>
        <div>
          <input id="1" type="file" onChange={onChange} />
        </div>
        <input type="submit" value="upload" />
      </form>
      <Dialog open={isUpload}>
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

export default Monitoring1;
