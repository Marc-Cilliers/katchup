import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";
import NextAuth from "next-auth";
import TwitchProvider from "next-auth/providers/twitch";
import axios from "axios";

export default NextAuth({
  providers: [
    TwitchProvider({
      clientId: process.env.TWITCH_CLIENT_ID ?? "",
      clientSecret: process.env.TWITCH_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  events: {
    async signIn(message) {
      axios.post(`${process.env.GLITCH_URL}/signin`, {
        username: message.user.name,
      });
    },
    // async signOut(message) {
    //   axios.post(`${process.env.GLITCH_URL}/signout`, {
    //     userId: (message?.session as any).userId,
    //   });
    // },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.JWT_SECRET,
});
