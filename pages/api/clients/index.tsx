import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { table } from "console";
import xlsxFile from "read-excel-file/node";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    await client.historyContent.deleteMany();

    const schema = {
      mediaID: {
        prop: "mediaID",
        type: Number,
      },
      Year: {
        prop: "period",
        type: String,
      },
      Kor: {
        prop: "contentKor",
        type: String,
      },
      Eng: {
        prop: "contentEng",
        type: String,
      },
      Seq: {
        prop: "seq",
        type: Number,
      },
    };

    console.log("start");

    xlsxFile("./Data1.xlsx", { sheet: "1970", schema }).then(
      async ({ rows }) => {
        console.log(rows);
        console.log("doing");
        await client.historyContent.createMany({ data: [...rows] });
      }
    );

    xlsxFile("./Data1.xlsx", { sheet: "1980", schema }).then(
      async ({ rows }) => {
        console.log(rows);
        console.log("doing");
        await client.historyContent.createMany({ data: [...rows] });
      }
    );

    xlsxFile("./Data1.xlsx", { sheet: "1990", schema }).then(
      async ({ rows }) => {
        console.log(rows);
        console.log("doing");
        await client.historyContent.createMany({ data: [...rows] });
      }
    );

    xlsxFile("./Data1.xlsx", { sheet: "2000", schema }).then(
      async ({ rows }) => {
        console.log(rows);
        console.log("doing");
        await client.historyContent.createMany({ data: [...rows] });
      }
    );

    xlsxFile("./Data1.xlsx", { sheet: "2010", schema }).then(
      async ({ rows }) => {
        console.log(rows);
        console.log("doing");
        await client.historyContent.createMany({ data: [...rows] });
      }
    );

    xlsxFile("./Data1.xlsx", { sheet: "2020", schema }).then(
      async ({ rows }) => {
        console.log(rows);
        console.log("doing");
        await client.historyContent.createMany({ data: [...rows] });
      }
    );

    console.log("end");

    return res.status(200).json({ ok: true });
  }
}
export default withHandler({ methods: ["POST"], handler });
