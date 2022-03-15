import nc from "next-connect";
import multer from "multer";
import path from "path";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "@libs/server/withHandler";

//stream 사용을 위하여 fasle 처리
export const config = {
  api: {
    bodyParser: false,
  },
};

//next-connect는 express에서 제공하는
const handler = nc();

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

let upload = multer({
  storage: storage,
});

let uploadFile = upload.single("file");
handler.use(uploadFile);
handler.post(
  async (req: NextApiRequest, res: NextApiResponse<ResponseType>) => {
    console.log("req.file", req.file);
    console.log("req.body", req.body);
    let url = "http://" + req.headers.host;
    let filename = req.file.filename;
    console.log(filename);
    res.status(200).send({
      ok: true,
      result: url + "/public/" + req.file.filename,
    });
  }
);

export default handler;
