import Head from "next/head";
import { useRouter } from "next/router";
import { useAuth } from "@/utils/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { isAuthReady, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      void router.replace("/youtube");
    } else {
      void router.replace("/login");
    }
  }, [isAuthReady, isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Katchup</title>
        <meta name="description" content="Katchup Twitch App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </>
  );
}
