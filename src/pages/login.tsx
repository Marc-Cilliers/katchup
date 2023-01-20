import { LoginScreen } from "@/screens/login/LoginScreen";
import { NextPageWithLayout } from "@/utils/types";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { DefaultLayout } from "../layouts/DefaultLayout";

const Login: NextPageWithLayout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      void router.replace("/dashboard");
    }
  }, [session, router]);

  return <LoginScreen />;
};

Login.getLayout = (page: any) => <DefaultLayout>{page}</DefaultLayout>;

export default Login;
