import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Maybe } from "../utilityTypes";

interface UseAuthReturnType {
  isAuthReady: boolean;
  isAuthenticated: boolean;
  user?: User;
}

export const useAuth = (): UseAuthReturnType => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(session?.user as User);

  const isAuthReady = status !== "loading";
  const isAuthenticated = status === "authenticated";

  useEffect(() => {
    if (!isAuthReady || !isAuthenticated) return;

    const checkForAdmin = async (userId?: Maybe<string>) => {
      if (!userId) return;

      const res = await axios.get(`/api/user?userId=${userId}`);
      setUser(res.data.user);
    };

    checkForAdmin((session?.user as User).id);
  }, [isAuthReady, isAuthenticated, session]);

  return {
    isAuthReady,
    isAuthenticated,
    user,
  };
};
