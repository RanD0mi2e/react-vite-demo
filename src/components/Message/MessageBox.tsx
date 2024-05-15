import { Message, MessageProps } from "./Message";

interface MessagesBoxProps {
  messages: MessageProps[];
}

export const MessagesBox = ({ messages }: MessagesBoxProps) => {
  return messages.map((msg) => <Message key={msg.id} {...msg} />);
};