import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const histoyMedias = await client.historyMedia.findMany();
    console.log(histoyMedias);
    res.json({
      ok: true,
      histoyMedias,
    });
  } else if (req.method === "POST") {
    const { historyName, historyCaption } = req.body;
    console.log(`${historyName},${historyCaption}`);
    const historyMedia = await client.historyMedia.create({
      data: {
        historyName,
        historyCaption,
      },
    });

    if (!historyMedia) {
      console.log("bbbb");
    } else {
      console.log(historyMedia.id);
    }

    return res.status(200).json({ ok: true, historyMedia });
  }
}
export default withHandler({ methods: ["POST", "GET"], handler });
