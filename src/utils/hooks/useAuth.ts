import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Maybe } from "../utilityTypes";

interface User {
  id?: Maybe<string>;
  name?: Maybe<string>;
  email?: Maybe<string>;
  image?: Maybe<string>;
}

interface UseAuthReturnType {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  user?: User;
}

export const useAuth = (): UseAuthReturnType => {
  const { data: session, status } = useSession();
  const [isAdmin, setIsAdmin] = useState(false);

  const isAuthReady = status !== "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    const checkForAdmin = async (userId?: Maybe<string>) => {
      if (!userId) return;

      const res = await axios.get(`/api/user?userId=${userId}`);
      setIsAdmin(!!res.data.user?.admin);
    };

    checkForAdmin((session?.user as User).id);
  }, [isAuthReady, isAuthenticated, session]);

  return {
    isAuthReady,
    isAuthenticated,
    user: session?.user,
    isAdmin,
  };
};
