import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const bookDonations = await client.bookDonation.findMany({
      orderBy: {
        createAt: "asc",
      },
    });
    // console.log(historyContent);
    res.json({
      ok: true,
      count: bookDonations.length,
    });
  }
}
export default withHandler({ methods: ["GET"], handler });
