import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const historyFiles = await client.historyFile.findMany();
    console.log(historyFiles);
    res.json({
      ok: true,
      historyFiles,
    });
  } else if (req.method === "POST") {
    console.log("welcome...?");
    console.log(req.body);
    const { Desc, fileName } = req.body.data;
    console.log(` Desc:${Desc} ,  fileName:${fileName}`);
    const historyFile = await client.historyFile.create({
      data: {
        mediaID: 1,
        Desc,
        fileName,
        fileType: "jpg",
        contentsType: 0,
      },
    });
    return res.status(200).json({ ok: true, historyFile });
  }
}
export default withHandler({ methods: ["GET", "POST"], handler });
