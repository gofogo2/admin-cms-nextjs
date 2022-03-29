import { ContentList } from "pages/contentsList";
import { HistoryMedia } from "@prisma/client";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const id = req.query.id.toString();
    const historyContent = await client.historyContent.findMany({
      where: {
        mediaID: Number(id),
      },
      orderBy: {
        period: "asc",
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
export default withHandler({ methods: ["GET"], handler });
