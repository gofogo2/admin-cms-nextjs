import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { Console } from "console";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const historyContent = await client.historyContent.findMany({
      orderBy: {
        seq: "asc",
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

    const cnt =
      (await client.historyContent.count({
        where: {
          mediaID,
        },
      })) + 1;

    const contentKor = `${contentKorTop}\r\n${
      contentKorBottom == undefined ? "" : contentKorBottom
    }`;
    const contentEng = `${contentEngTop}\r\n${
      contentKorBottom == undefined ? "" : contentEngBottom
    }`;

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
        seq: cnt,
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
