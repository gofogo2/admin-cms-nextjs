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
  } else if (req.method === "POST") {
    console.log("aaaa");
    console.log(req.body);
    console.log(req.query.id);

    const map = {
      mediaID: "mediaID",
      period: "period",
      contentKor: "contentKor",
      contentEng: "contentEng",
    };

    const schema = {
      mediaID: {
        prop: "mediaID",
        type: Number,
      },
      period: {
        prop: "period",
        type: String,
      },
      contentKor: {
        prop: "contentKor",
        type: String,
      },
      contentEng: {
        prop: "contentEng",
        type: String,
      },
    };
    xlsxFile("./Data.xlsx", { sheet: +req.query.id, schema }).then(
      async ({ rows }) => {
        console.log(rows);

        await client.historyContent.createMany({ data: [...rows] });
      }
    );
    return res.status(200).json({ ok: true });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
