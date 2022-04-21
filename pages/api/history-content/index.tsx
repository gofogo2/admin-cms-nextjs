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
      cnt,
    } = req.body.dataHistoryContent;

    let count = 0;

    if (cnt == undefined || cnt == "" || cnt == "0") {
    } else {
      count = +cnt - 1;
    }

    const currentCnt = await client.historyContent.count({
      where: {
        mediaID,
      },
    });

    if (count > currentCnt) {
      count = currentCnt;
    }

    // console.log(`count: ${count}`);

    const contentKor = `${contentKorTop}\r\n${
      contentKorBottom == undefined ? "" : contentKorBottom
    }`;
    const contentEng = `${contentEngTop}\r\n${
      contentKorBottom == undefined ? "" : contentEngBottom
    }`;

    // const historyContent = await client.historyContent.upsert({
    //   create: {
    //     mediaID,
    //     period,
    //     contentKor,
    //     contentEng,
    //     seq: currentCnt,
    //   },
    //   update: {
    //     mediaID,
    //     period,
    //     contentKor,
    //     contentEng,
    //   },
    //   where: {
    //     id: id,
    //   },
    // });

    let list = await client.historyContent.findMany({
      where: {
        mediaID,
      },
    });

    await client.historyContent.deleteMany();

    // console.log(list);

    let newList = [];
    for (let index = 0; index < list.length; index++) {
      if (index < count) {
        //0, 1, 2
        console.log("작을때");
        await client.historyContent.create({
          data: { ...list[index], id: undefined, seq: index + 1 },
        });
      } else if (count == index) {
        console.log("같을떄");
        //3
        await client.historyContent.create({
          data: { mediaID, period, contentKor, contentEng, seq: +cnt },
        });
      } else {
        console.log("클때");
        console.log(
          `index: ${index} count: ${count} data:${list[index].contentKor}`
        );
        await client.historyContent.create({
          data: { ...list[index - 1], id: undefined, seq: index + 1 },
        });
      }
    }

    if (count == currentCnt) {
      await client.historyContent.create({
        data: { mediaID, period, contentKor, contentEng, seq: currentCnt + 1 },
      });
    } else {
      await client.historyContent.create({
        data: { ...list[currentCnt - 1], id: undefined, seq: currentCnt + 1 },
      });
    }

    return res.status(200).json({ ok: true, historyContent });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
