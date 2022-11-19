"use client";

import fetcher from "../utils/fetchMessages";
import useSWR from "swr";

function MessageList() {
  const { data: messages, error, mutate } = useSWR("/api/getMessages", fetcher);

  return (
    <div>
      {messages?.map((message) => (
        <div key={message.id}>
          <p>{message.message}</p>
        </div>
      ))}
      <p>Message</p>
      <p>Message</p>
      <p>Message</p>
      <p>Message</p>
      <p>Message</p>
    </div>
  );
}

export default MessageList;
