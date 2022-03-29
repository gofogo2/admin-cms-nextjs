import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  methods: method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
}

type method = "GET" | "POST" | "DELETE";

export default function withHandler({ methods, handler }: ConfigType) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) {
    // console.log(`req.method:${req.method}`);
    // console.log(`method:${methods.includes(req.method as any)}`);
    if (req.method && !methods.includes(req.method as any)) {
      // console.log("405");
      return res
        .status(405)
        .json({ ok: false, error: "정상적인 접근 경로가 아닙니다." });
    }
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ ok: false, error: "서버에 문제가 있습니다." });
    }
  };
}
