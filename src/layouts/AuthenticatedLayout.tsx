import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/utils/hooks/useAuth";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { PropsWithChildren } from "react";

interface AunticatedLayoutProps {}

export const AuthenticatedLayout = ({
  children,
}: PropsWithChildren<AunticatedLayoutProps>) => {
  const { isAuthReady, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && !isAuthenticated) {
      void router.replace("/login");
    }
  }, [isAuthReady, isAuthenticated, router]);

  return (
    <>
      <Head>
        <title>Katchup</title>
        <meta name="description" content="Katchup Twitch App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Navbar />
        {isAuthenticated && <>{children}</>}
      </main>
    </>
  );
};
