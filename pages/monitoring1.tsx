import type { NextPage } from "next";
import React, { useState } from "react";
import axios from "axios";
const Monitoring1: NextPage = () => {
  const [pValue, setpValue] = useState(0);
  const [file, setFile] = useState();
  const [uploadedFile, setUploadedFile] = useState({});

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0].name);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", { name: "gofogo" });

    try {
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent: any) => {
          let pert = (progressEvent.loaded * 100) / progressEvent.total;
          console.log(pert);
          setpValue(pert / 100);
        },
      });
      console.log(res.data);
      const { ok, result } = res.data;

      setUploadedFile({ ok, result });
    } catch (err) {}
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={onChange} />
        <input type="submit" value="upload" />
      </form>
      <progress value={pValue} />
    </div>
  );
};

export default Monitoring1;
