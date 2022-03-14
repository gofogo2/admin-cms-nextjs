import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  let user;
  const { email, password } = req.body;
  if (email == "gofogo" && password == "1") {
    console.log(user);
    return res.status(200).json({ ok: true });
  } else {
    return res
      .status(404)
      .json({ ok: false, error: "계정정보가 일치하지 않습니다" });
  }
}
export default withHandler("POST", handler);
