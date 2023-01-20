import Head from "next/head";
import { signIn } from "next-auth/react";

export const LoginScreen = () => {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Katchup Login" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen min-w-full bg-background bg-gradient-to-br from-zinc-700 to-slate-400 text-typography">
        <h1 className="text-7xl mb-4">Katchup</h1>
        <h1 className="text-4xl">
          All your chat&apos;s video recommendations - in one place
        </h1>
        <div className="px-8 py-10">
          <div className="grid gap-8 items-start justify-center">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <button
                onClick={() => signIn("twitch", { callbackUrl: "/dashboard" })}
                className="relative px-7 py-4 bg-black rounded-lg leading-none flex items-center divide-x divide-gray-600"
              >
                <span className="flex items-center space-x-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-pink-600 -rotate-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                  <span className="pr-6 text-gray-100">Work in Progress</span>
                </span>
                <span className="pl-6 text-indigo-400 group-hover:text-gray-100 transition duration-200">
                  Sign In
                </span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
