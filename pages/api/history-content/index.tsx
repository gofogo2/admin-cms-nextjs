import client from "@libs/server/client";
import withHandler, { ResponseType } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const historyContent = await client.historyContent.findMany();
    // console.log(historyContent);
    res.json({
      ok: true,
      historyContent,
    });
  } else if (req.method === "POST") {
     console.log('aaaaaaaaaaaaaaaaaaaaaa');
    const { mediaID, period,content,id } = req.body.data;
    console.log(`sdfsdfsdfd period:${period} ,  content:${content}, id:${id},mediaID:${mediaID}`);
    const item = await client.historyContent.findFirst({where:{
      id
    }});
    // if(item != undefined){
    //   const historyContent = await client.historyContent.update({
    //     data:{
          

    //     }, where:{
    //       id:item.id
    //     }
    //   });
    // }
    // else
    // {

    // }
    const historyContent = await client.historyContent.upsert({
        create:{
            mediaID,
            period,
            content,
        },
        update:{
          mediaID,
          period,
          content,
        },
        where:{
            id:id
        }
    });
    return res.status(200).json({ ok: true, historyContent });
  }
}
export default withHandler({ methods: ["GET", "POST", "DELETE"], handler });
