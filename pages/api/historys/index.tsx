import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("가가가가");
  if (req.method === "GET") {
    const histoyMedias = await client.historyMedia.findMany();
    res.json({
      ok: true,
      histoyMedias,
    });
  } else if (req.method === "POST") {
    const { historyNameEng, historyNameKor, id } = req.body.titleData;
    const historyMedia = await client.historyMedia.update({
      data: {
        historyNameKor,
        historyNameEng,
      },
      where: {
        id,
      },
    });
    return res.status(200).json({ ok: true, historyMedia });
  }
}
export default withHandler({ methods: ["POST", "GET"], handler });
