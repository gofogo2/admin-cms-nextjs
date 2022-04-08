import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const dateValue = req.query.id;

    let today = new Date();

    const dtString =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    console.log(dateValue);
    const bookDonation = await client.bookDonation.findMany({
      where: {
        CreateString: dateValue,
      },
      orderBy: {
        createAt: "asc",
      },
    });
    console.log(bookDonation);
    res.json({
      ok: true,
      bookDonation,
    });
  }
}
export default withHandler({ methods: ["GET"], handler });
