import Head from "next/head";
import { signIn } from "next-auth/react";
import { SignInButton } from "./components/SignInButton";
import { Icon } from "@/icons/Icon";
import { ChatWindow, Message } from "./components/ChatWindow";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";
import { faker } from "@faker-js/faker";

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

export const LoginScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const timestamp = DateTime.utc().toFormat("h:mm");
      const username = faker.internet.userName();
      const msg = `Watch this next! ${faker.internet.url()}`;
      const color = colors[Math.round(Math.random() * 10)];

      const message = { timestamp, username, msg, color };

      setMessages((messages) => {
        if (messages.length >= 100) {
          messages.splice(30);
        }
        return [message, ...messages];
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Katchup Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-between h-screen w-screen">
          <LeftSide messages={messages} />
          <RightSide messages={messages} />
        </div>
      </main>
    </>
  );
};

const LeftSide = ({ messages }: { messages: Message[] }) => {
  return (
    <div className="pl-5 flex flex-col grow w-4/12 h-screen align-middle  overflow-x-hidden">
      <div className="flex flex-col grow justify-center h-full ml-5">
        <div className="flex flex-row align-middle">
          <h1 className="text-7xl">Without Katchup</h1>
        </div>
        <p className="flex flex-row text-3xl">Only chaos</p>
      </div>
      <div className="flex flex-row h-full max-h-96">
        <div className="flex flex-col justify-between text-lg ml-5 w-1/2 h-full grow py-5">
          <p>Every link posted in your Twitch chat is fear.</p>
          <p>A fear of the unknown.</p>
          <p>What lurks beneath the murky waters of the url?</p>
          <p>Is it a good video? Informative? A meme?</p>
          <p>
            Something so long you&apos;ll need to schedule an appointment to
            watch it?
          </p>
        </div>
        <ChatWindow
          speed={5000}
          className="bg-slate-50 text-slate-900 translate-x-3/4 w-full -ml-10"
          messages={messages}
        />
      </div>
      <div className="flex flex-col h-full"></div>
    </div>
  );
};

const RightSide = ({ messages }: { messages: Message[] }) => {
  return (
    <div className=" flex flex-col grow w-8/12 h-screen align-middle bg-gradient-to-br from-fuchsia-700 to-indigo-700 overflow-x-hidden">
      <div className="flex flex-col grow justify-center h-full  ml-10">
        <div>
          <div className="flex flex-row align-middle">
            <Icon name="twitch" height={60} width={60} />
            <h1 className="text-7xl">With Katchup</h1>
          </div>
          <p className="flex flex-row text-3xl">
            Completely seamless. Blazingly fast. 🚀
          </p>
        </div>
      </div>
      <div className="flex flex-row h-full max-h-96">
        <ChatWindow
          speed={50}
          className="bg-slate-900 w-4/12  -translate-x-1/4"
          messages={messages}
          colorfulMessages
        />
        <div className="flex flex-col justify-between text-2xl w-1/2 h-full grow py-5 -ml-24">
          <div className="flex grow h-full gap-2">
            <p>⚡️ </p>
            <p>No chat moves too fast for the power you now wield</p>
          </div>
          <div className="flex grow h-full gap-2 items-center">
            <p>📺 </p>
            <p>
              Review every video request in detail - in your own space, at your
              own pace
            </p>
          </div>
          <div className="flex grow h-full gap-2 items-end">
            <p>🎉 </p>
            <p>
              Rate every user&apos;s suggestion and keep track of their scores
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full text-2xl gap-2 justify-center ml-10">
        <div>
          <p>Setup your account with a single click below</p>
        </div>
        <div className="py-10 text-lg flex flex-row">
          <SignInButton
            onClick={() => signIn("twitch", { callbackUrl: "/youtube" })}
          />
        </div>
      </div>
    </div>
  );
};
