"use client";

import { FormEvent, useState } from "react";

function ChatInput() {
  const [input, setInput] = useState("");

  const addMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(!input) return;

    const message = input;

    setInput("")
  }

  return (
    <form onSubmit={addMessage} className="flex w-full px-10 py-5 space-x-2 border-t border-gray-100 fixed bottom-0 z-50">
      <input
        onChange={(e) => setInput(e.target.value)}
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
