import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const historyFiles = await client.historyFile.findMany();
    // console.log(historyFiles);
    res.json({
      ok: true,
      historyFiles,
    });
  } else if (req.method === "POST") {
    // console.log("welcome...?");
    // console.log(req.body);
    const { captionKor, captionEng, fileName, mediaID } = req.body.data;
    // console.log(
    //   `로그다아아아아! captionKor:${captionKor}, captionEng:${captionEng} ,  fileName:${fileName}`
    // );

    const count = await client.historyFile.findMany({
      where: {
        mediaID,
      },
    });

    const historyFile = await client.historyFile.create({
      data: {
        mediaID: mediaID,
        captionKor,
        captionEng,
        fileName,
        fileType: "png",
        contentsType: count.length + 1,
      },
    });
    return res.status(200).json({ ok: true, historyFile });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
