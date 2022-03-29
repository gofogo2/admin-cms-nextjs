import { Update } from "./../../../node_modules/@mui/icons-material/index.d";
import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const id = req.query.id;
    console.log(id);
    const historyFiles = await client.historyFile.findMany({
      where: {
        mediaID: +id,
      },
      orderBy: {
        contentsType: "asc",
      },
    });
    // console.log(historyFiles);
    res.json({
      ok: true,
      historyFiles,
    });
  } else if (req.method === "DELETE") {
    const id = req.query.id;
    console.log("삭제삭제");
    // console.log(id);
    const item = await client.historyFile.findFirst({
      where: {
        id: +id.toString(),
      },
    });

    if (item != undefined || item != null) {
      console.log("삭제할게 존재한다.");
      //삭제
      await client.historyFile.delete({
        where: {
          id: Number(id),
        },
      });

      //나머지 리스트 가져온다.
      const cl = await client.historyFile.findMany({
        where: {
          mediaID: item.mediaID,
        },
      });

      //돌면서 순서 바꾼다.
      (await cl).forEach(async (a, i) => {
        console.log(i);
        console.log(a.id);
        const c2 = await client.historyFile.update({
          data: {
            ...a,
            contentsType: i + 1,
          },
          where: { id: a.id },
        });
      });
    }
    return res.status(200).json({ ok: true });
  }
}
export default withHandler({ methods: ["DELETE", "GET", "POST"], handler });
