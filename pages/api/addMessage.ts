import { Message } from './../../typings.d';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis";

type Data = {
  message: Message;
};

type ErrorData = {
    error : String
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {

    if(req.method !== "POST"){
        res.status(405).json({error : "Method Not Allowed"})
        return
    }

    const {message} = req.body

    const newMessage = {
        ...message, created_at: Date.now()
    };

    await redis.hset("messages", message.id, JSON.stringify(newMessage))

  res.status(200).json({ message: newMessage });
}
