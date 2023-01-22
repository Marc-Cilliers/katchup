import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { faker } from "@faker-js/faker";

type Message = {
  timestamp: string;
  msg: string;
  username: string;
  color: string;
};

const colors = [
  "text-red-500",
  "text-blue-600",
  "text-green-500",
  "text-purple-600",
  "text-yellow-500",
  "text-emerald-400",
  "text-fuchsia-500",
  "text-violet-900",
  "text-orange-300",
  "text-lime-500",
  "text-cyan-500",
];

interface ChatWindowProps {
  speed: number;
  dark?: boolean;
}

export const ChatWindow = ({ speed, dark }: ChatWindowProps) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const bgColor = dark ? "bg-slate-900" : "bg-slate-50";
  const textColor = dark ? "" : "text-slate-900";

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = DateTime.utc().toFormat("h:mm");
      const username = faker.internet.userName();
      const msg = `Watch this next! ${faker.internet.url()}`;
      const color = colors[Math.random() * 11];

      const message = { timestamp, username, msg, color };

      setMessages((messages) => {
        if (messages.length >= 100) {
          messages.splice(30);
        }
        return [message, ...messages];
      });
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${bgColor} w-2/6 h-full flex flex-col-reverse overflow-hidden`}
    >
      {messages.map((m, i) => (
        <div
          key={`${m.msg}-${i}`}
          className={`flex flex-row flex-wrap pl-3 mb-2 ${textColor}`}
        >
          <p className="text-slate-600 mr-2">{m.timestamp}</p>
          <p className={`${colors[i]} mr-2`}>{m.username}:</p>
          <p>{m.msg}</p>
        </div>
      ))}
    </div>
  );
};
