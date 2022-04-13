import { HistoryMedia } from "@prisma/client";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { table } from "console";
import xlsxFile from "read-excel-file/node";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "DELETE") {
    const id = +req.query.id;
    await client.historyContent.deleteMany({
      where: {
        mediaID: id,
      },
    });
    return res.status(200).json({ ok: true });
  } else if (req.method === "GET") {
    const id = req.query.id.toString();
    const historyContent = await client.historyContent.findMany({
      where: {
        mediaID: Number(id),
      },
      orderBy: {
        seq: "asc",
      },
    });
    let historyMedia = await client.historyMedia.findFirst({
      where: {
        id: Number(id),
      },
    });
    const historyfiles = await client.historyFile.findMany({
      where: {
        mediaID: Number(id),
      },
      orderBy: {
        contentsType: "asc",
      },
    });

    let ssss;
    ssss = {
      historyNameEng: historyMedia?.historyNameEng,
      historyNameKor: historyMedia?.historyNameKor,
      id: historyMedia?.id,
      top: historyfiles,
      bottom: historyContent,
    };

    // console.log(historyContent);
    return res.status(200).json({ historyMedia: ssss });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
