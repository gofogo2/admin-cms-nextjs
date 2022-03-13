import { NextApiRequest, NextApiResponse } from "next";

export default function withHandler(
  method: "GET" | "POST" | "DELETE",
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== method) {
      console.log('405');
      return res.status(405).end();
    }
    try {
      console.log('200'); 
      await fn(req, res);
    } catch (error) {
      console.log(error);     
      return res.status(500).json({ error });
    }
  };
}
