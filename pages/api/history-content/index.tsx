import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const historyContent = await client.historyContent.findMany();
    console.log(historyContent);
    res.json({
      ok: true,
      historyContent,
    });
  } else if (req.method === "POST") {
    console.log(req.body);
    const { mediaID, period,content,id } = req.body;
    console.log(` content:${period} ,  content:${content}, id:${id},mediaID:${mediaID}`);
    const historyContent = await client.historyContent.upsert({
        create:{
            mediaID,
            period,
            content,

        },
        update:{
            mediaID,
            period,
            content,
        },
        where:{
            id:id
        }
    });
    return res.status(200).json({ ok: true, historyContent });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
