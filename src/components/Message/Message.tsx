import { FC } from "react";

export interface MessageProps {
  id: number;
  message: string;
  type: "success" | "warn" | "error" | "default";
}

export const Message: FC<MessageProps> = ({ message, type }) => {
  return (
    <div className="message-wrapper">
      {/* <img src="" alt="" /> */}
      <div className={`message message-${type}`}>{message}</div>
    </div>
  );
};
