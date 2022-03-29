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
      first: { contentsType: fc, id: fid },
      seconds: { contentsType: sc, id: sid },
    } = req.body;
    console.log(`##############fisrt ${fc} second : ${sid}##################`);
    // console.log(
    //   `fisrt : contentsType:${first.contentsType} id:${first.id} second : contentsType:${seconds.contentsType} id:${seconds.id}`
    // );
    //앞 아이템 변경
    const first = await client.historyFile.update({
      data: { contentsType: +sc },
      where: { id: +fid },
    });

    const second = await client.historyFile.update({
      data: { contentsType: +fc },
      where: { id: +sid },
    });

    //뒤 아이템 변경
    return res.status(200).json({ ok: true, first });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
