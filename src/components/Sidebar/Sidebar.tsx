import { useAuth } from "@/utils/hooks/useAuth";
import Image from "next/image";
import { signOut } from "next-auth/react";
import { MenuItem } from "./MenuItem";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import { Icon } from "@/icons/Icon";

export const Sidebar = ({ children }: PropsWithChildren<{}>) => {
  const { user } = useAuth();
  const userImage = user?.image;
  const router = useRouter();

  return (
    <div className="relative">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 overflow-y-auto bg-gray-800 flex flex-col justify-start pb-10">
          <div className="border-b border-gray-600 py-2 mb-2">
            {userImage && (
              <div className="flex items-center gap-4">
                <Image
                  src={userImage}
                  width={50}
                  height={50}
                  className="rounded-3xl"
                  alt="User profile picture"
                />
                {user?.name}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-between h-full">
            <ul className="space-y-2">
              <MenuItem
                title="Youtube Videos"
                icon="youtube"
                onClick={() => router.push("/youtube")}
              />
              <MenuItem
                title="Twitch Clips"
                icon="twitchLogo"
                onClick={() => router.push("/twitch/clips")}
              />
              <MenuItem
                title="Twitter Posts (WIP)"
                icon="twitterLogo"
                disabled
              />
            </ul>
            <button
              className="flex items-center justify-start p-2 text-white gap-3 hover:bg-slate-700 rounded-lg w-full h-15 max-h-14"
              onClick={() => signOut()}
            >
              <div className="w-1/4">
                <Icon name="logout" />
              </div>
              <div className="">Sign Out</div>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex p-4 sm:ml-64">{children}</div>
    </div>
  );
};
