import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const historyContent = await client.historyContent.findMany({
      orderBy: {
        period: "asc",
      },
    });
    // console.log(historyContent);
    res.json({
      ok: true,
      historyContent,
    });
  } else if (req.method === "POST") {
    const {
      mediaID,
      period,
      contentKorTop,
      contentKorBottom,
      contentEngTop,
      contentEngBottom,
      id,
    } = req.body.dataHistoryContent;

    console.log("mediaID   ::::: " + mediaID);
    const contentKor = `${contentKorTop}\r\n${contentKorBottom}`;
    const contentEng = `${contentEngTop}\r\n${contentEngBottom}`;

    // const item = await client.historyContent.findFirst({
    //   where: {
    //     id,
    //   },
    // });
    const historyContent = await client.historyContent.upsert({
      create: {
        mediaID,
        period,
        contentKor,
        contentEng,
      },
      update: {
        mediaID,
        period,
        contentKor,
        contentEng,
      },
      where: {
        id: id,
      },
    });
    return res.status(200).json({ ok: true, historyContent });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
