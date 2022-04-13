import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const id = req.query.id;
    const historyContent = await client.historyContent.findMany({
      where: {
        mediaID: +id,
      },
      orderBy: {
        seq: "asc",
      },
    });
    console.log(historyContent);
    res.json({
      ok: true,
      historyContent,
    });
  } else if (req.method === "DELETE") {
    const id = req.query.id;

    const find = await client.historyContent.findFirst({
      where: {
        id: +id,
      },
    });

    const mediaID = find?.mediaID;

    await client.historyContent.delete({
      where: {
        id: Number(id),
      },
    });

    const item = await client.historyContent.findMany({
      where: {
        mediaID,
      },
      orderBy: {
        seq: "asc",
      },
    });

    // for (let index = 0; index < item.length; index++) {
    //   item[0].seq = index + 1;
    // }

    console.log("###########################");
    console.log(item);
    console.log("###########################");

    item.forEach(async (it, i) => {
      console.log(it);
      console.log(i);
      await client.historyContent.update({
        data: {
          seq: i + 1,
        },
        where: {
          id: it.id,
        },
      });
    });

    return res.status(200).json({ ok: true });
  }
}
export default withHandler({ methods: ["GET", "DELETE", "POST"], handler });
