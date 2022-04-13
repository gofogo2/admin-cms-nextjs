import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "POST") {
    console.log(req.body);
    // console.log(req.body);
    const {
      first: { id: fid, seq: fseq },
      seconds: { id: sid, seq: sseq },
    } = req.body;
    console.log(`##############fisrt ${fid} second : ${sid}##################`);
    console.log(
      `##############fisrt ${fseq} second : ${sseq}##################`
    );
    const first = await client.historyContent.update({
      data: { seq: +sseq },
      where: { id: +fid },
    });

    const second = await client.historyContent.update({
      data: { seq: +fseq },
      where: { id: +sid },
    });

    //뒤 아이템 변경
    return res.status(200).json({ ok: true, first });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
