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
      bookDonations,
      count: bookDonations.length,
    });
  } else if (req.method === "POST") {
    // console.log("req.body   ::::: " + req.body.UserID);
    const { UserID, UserEmail, Create, CreateString } = req.body;

    console.log("userID   ::::: " + UserID);
    const bookDonation = await client.bookDonation.create({
      data: {
        UserID,
        UserEmail,
        Create,
        CreateString,
      },
    });
    return res
      .status(200)
      .json({ ok: true, bookDonation, count: bookDonation });
  }
}
export default withHandler({ methods: ["GET", "POST"], handler });
