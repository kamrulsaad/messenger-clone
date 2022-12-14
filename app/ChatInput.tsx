"use client";

import { FormEvent, useState } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/fetchMessages";
import {unstable_getServerSession} from 'next-auth/next'

type Props = {
  session : Awaited<ReturnType<typeof unstable_getServerSession>>
}

function ChatInput({session} : Props) {
  const [input, setInput] = useState("");
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  const addMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input || !session) return;

    const text = input;

    const id = uuid();

    const message: Message = {
      id,
      message: text,
      created_at: Date.now(),
      username: session?.user?.name!,
      profilePic:
        session?.user?.image!,
      email: session?.user?.email!,
    };

    const uploadMessageToUpstash = async () => {
      const data = await fetch("/api/addMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());

      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToUpstash, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });

    setInput("");
  };

  return (
    <form
      onSubmit={addMessage}
      className="flex w-full px-10 py-5 space-x-2 border-t bg-white  border-gray-100 fixed bottom-0 z-50"
    >
      <input
        onChange={(e) => setInput(e.target.value)}
        disabled={!session}
        type="text"
        className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        placeholder="Enter Message"
      />
      <button
        disabled={!input}
        type="submit"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default ChatInput;
