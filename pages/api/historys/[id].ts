import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const id = req.query.id;
    // console.log(req);
    // console.log(id);
    const histoyMedia = await client.historyMedia.findFirst({
      where: {
        id: Number(id),
      },
    });
    // console.log(histoyMedia);
    return res.status(200).json({ ok: true, histoyMedia: histoyMedia });
  }
}
export default withHandler({ methods: ["GET"], handler });
