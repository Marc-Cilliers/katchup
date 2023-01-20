import Head from "next/head";
import { PropsWithChildren } from "react";

interface DefaultLayoutProps {}

export const DefaultLayout = ({
  children,
}: PropsWithChildren<DefaultLayoutProps>) => {
  return (
    <>
      <Head>
        <title>Katchup</title>
        <meta name="description" content="Katchup Twitch App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  );
};
