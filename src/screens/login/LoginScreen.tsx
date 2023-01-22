import Head from "next/head";
import { signIn } from "next-auth/react";
import { SignInButton } from "./components/SignInButton";
import { Icon } from "@/icons/Icon";
import { ChatWindow } from "./components/ChatWindow";

export const LoginScreen = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Katchup Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex justify-between h-screen w-screen">
          <LeftSide />
          <RightSide />
        </div>
      </main>
    </>
  );
};

const LeftSide = () => {
  return (
    <div className="pl-5 flex flex-col grow w-4/12 h-screen align-middle">
      <div className="flex flex-col grow justify-center h-full">
        <div>
          <div className="flex flex-row align-middle">
            <h1 className="text-7xl">Without Katchup</h1>
          </div>
          <p className="flex flex-row text-3xl">Only chaos</p>
        </div>
      </div>
      <div className="flex flex-row h-full max-h-80">
        <ChatWindow speed={5000} />
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
        <ul>
          <li></li>
        </ul>
      </div>
      <div className="flex flex-col h-full"></div>
    </div>
  );
};

const RightSide = () => {
  return (
    <div className="pl-20 flex flex-col grow w-8/12 h-screen align-middle bg-gradient-to-br from-fuchsia-700 to-indigo-700">
      <div className="flex flex-col grow justify-center h-full">
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
      <div className="flex flex-row h-full max-h-80">
        <ChatWindow speed={50} dark />
        <div className="flex flex-col justify-between text-2xl ml-5 w-1/2 h-full grow py-5">
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
      <div className="flex flex-col h-full text-2xl gap-2 justify-center">
        <div>
          <p className="text-amber-400 text-xl">
            Q: What is the cost of wielding such power?
          </p>
          <p>A: Completely free! (For now. So get in while you can)</p>
          <p className="text-amber-400 text-xl">
            Q: But how much work goes into setting this up?
          </p>
          <p>A: Ever heard of magic? Click the button below and find out</p>
        </div>
        <div className="py-10 flex flex-row">
          <SignInButton
            onClick={() => signIn("twitch", { callbackUrl: "/dashboard" })}
          />
        </div>
      </div>
    </div>
  );
};
