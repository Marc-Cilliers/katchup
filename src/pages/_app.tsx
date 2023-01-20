import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NextPageWithLayout } from "@/utils/types";
import { Analytics } from "@vercel/analytics/react";

type NextPageWithLayoutApp = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: NextPageWithLayoutApp) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout(<Component {...pageProps} />)}
      <Analytics />
    </SessionProvider>
  );
}
