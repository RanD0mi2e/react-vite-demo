import { useState } from "react";
import { MessageProps } from "./Message";
import { MessagesBox } from "./MessageBox";
const useMessage = () => {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const addMessage = (
    message: string,
    type: "success" | "warn" | "error" | "default"
  ) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        type,
      },
    ]);
  };

  return [{ addMessage }, <MessagesBox messages={messages} />];
};
