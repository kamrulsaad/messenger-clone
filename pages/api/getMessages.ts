import { Message } from './../../typings.d';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

type Data = {
  messages: Message[];
};

type ErrorData = {
    error : String
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {

    if(req.method !== "GET"){
        res.status(405).json({error : "Method Not Allowed"})
        return
    }

    const messagesRes = await redis.hvals('messages')
    const messages : Message[] = messagesRes.map((message) => JSON.parse(message)).sort((a,b) => b.created_at - a.created_at)

  res.status(200).json({messages});
}
