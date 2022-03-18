import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
    if (req.method === "DELETE") {
        const id = req.query.id;
        console.log(req);
        console.log(id);
        await client.historyFile.delete({
          where: {
            id: Number(id),
          },
        });
        return res.status(200).json({ ok: true });
      }
}
export default withHandler({ methods: ["DELETE"], handler });
