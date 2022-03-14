import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse<ResponseType>) => void
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    if (req.method !== method) {
      console.log("405");
      return res
        .status(405)
        .json({ ok: false, error: "정상적인 접근 경로가 아닙니다." });
    }
    try {
      console.log("계정을 체크한다.");
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, error: "서버에 문제가 있습니다." });
    }
  };
}
