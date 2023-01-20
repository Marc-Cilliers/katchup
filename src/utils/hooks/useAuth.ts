import { useSession } from "next-auth/react";
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
  user?: User;
}

export const useAuth = (): UseAuthReturnType => {
  const { data: session, status } = useSession();

  const isAuthReady = status !== "loading";
  const isAuthenticated = status === "authenticated";

  return {
    isAuthReady,
    isAuthenticated,
    user: session?.user,
  };
};
