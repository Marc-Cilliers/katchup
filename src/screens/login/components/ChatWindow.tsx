export type Message = {
  timestamp: string;
  msg: string;
  username: string;
  color: string;
};

interface ChatWindowProps {
  speed: number;
  messages: Message[];
  className?: string;
  colorfulMessages?: boolean;
}

export const ChatWindow = ({
  messages,
  className,
  colorfulMessages,
}: ChatWindowProps) => {
  return (
    <div
      className={`${className} h-full flex flex-col-reverse overflow-hidden overflow-x-hidden relative`}
    >
      {messages.map((m, i) => {
        return (
          <div
            key={`${m.msg}-${i}`}
            className={`flex flex-row flex-wrap pl-3 mb-2 ${
              colorfulMessages ? m.color : ""
            }`}
          >
            <p className="text-slate-600 mr-2">{m.timestamp}</p>
            <p className={` mr-2`}>{m.username}:</p>
            <p>{m.msg}</p>
          </div>
        );
      })}
    </div>
  );
};
