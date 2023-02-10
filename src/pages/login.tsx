import { Spinner } from "@/components/Spinner";
import { LoginScreen } from "@/screens/login/LoginScreen";
import { useAuth } from "@/utils/hooks/useAuth";
import { NextPageWithLayout } from "@/utils/types";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DefaultLayout } from "../layouts/DefaultLayout";

const Login: NextPageWithLayout = () => {
  const { isAuthReady, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthReady && isAuthenticated) {
      void router.replace("/dashboard");
    }
  }, [isAuthReady, isAuthenticated, router]);

  if (isAuthReady && !isAuthenticated) return <LoginScreen />;

  return (
    <div className="items-center justify-center flex absolute left-1/2 top-1/2">
      <Spinner />
    </div>
  );
};

Login.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
